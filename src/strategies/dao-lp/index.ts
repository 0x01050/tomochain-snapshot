// Inspired by https://github.com/snapshot-labs/snapshot.js/blob/master/src/strategies/uniswap/index.ts
import { formatUnits } from '@ethersproject/units';
import { multicall } from '../../utils';
import { subgraphRequest } from '../../utils';
import { abi as multicallAbi } from '../../abi/Multicall.json';

export const author = 'anhnt';
export const version = '0.1.0';
import LUAFarmABI from "./lua-farm-abi.json";

import fetch from 'cross-fetch';
import { Interface } from '@ethersproject/abi';
import { Contract } from '@ethersproject/contracts';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import _strategies from '../../strategies';
import Multicaller from '../..//utils/multicaller';
import getProvider from '../..//utils/provider';
import validations from '../..//validations';

import { signMessage, getBlockNumber } from '../../utils/web3';
import { getHash, verify } from '../../sign/utils';
import gateways from '../../gateways.json';
import networks from '../../networks.json';
const Web3 = require('web3')
var BN = Web3.utils.BN;

const abi = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'user',
                type: 'address'
            },
            {
                internalType: 'address',
                name: 'token',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }
];

async function subgraphLuaswapRequest(url: string, query, options: any = {}) {
    const res = await global["fetch"](url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...options?.headers
        },
        body: JSON.stringify(query)
    });
    const { data } = await res.json();
    return data || {};
}

const lpTokenAddress = "0x88ba0bd9e1f90ccc21bdf7d33cb67fa5743da036";
const stakedAddress = "0x8Bcf7880d2Bae3E2705e7D90D28Bd417bd29020d";

async function multicallLuaFarm(network, options, calls) {
    console.log(network.multicall, options, calls[0][0], calls[0][1], calls[0][2])
    console.log(multicallAbi)

    const web3 = new Web3(new Web3.providers.HttpProvider(networks[network].rpc[0]))
    const multi = new web3.eth.Contract(multicallAbi, networks[network].multicall);

    const itf = new Interface(LUAFarmABI);

    try {
        const res = await multi.methods.aggregate(
            calls.map((call) => [
                call[0].toLowerCase(),
                itf.encodeFunctionData(call[1], call[2])
            ])
        ).call({}, options.blockTag);

        return res;
    } catch (e) {
        return Promise.reject(e);
    }
}


export async function strategy(
    space,
    network,
    provider,
    addresses,
    options,
    snapshot
) {
    const blockTag = typeof snapshot === 'number' ? snapshot : 'latest';

    const lpTokenAddress = options.lpTokenAddress.toLowerCase();

    const tokenAddress = options.tokenAddress.toLowerCase();

    var rate;

    // const result = await subgraphRequest(UNISWAP_SUBGRAPH_URL[network], params);
    // get reserve balance
    const pairsInfo = await subgraphLuaswapRequest(
        "https://api.luaswap.org/subgraphs/name/phucngh/Luaswap",
        {
            "operationName": "pairByAddress",
            "variables": {
                "pairAddress": "0x88ba0bd9e1f90ccc21bdf7d33cb67fa5743da036",
                "block": blockTag
            },
            "query": "query pair($pairAddress: Bytes!, $block: Int!) {\n  pairs(where: {id: $pairAddress}, block: {number: $block}) {\n  id\n  reserve0\n  reserve1\n  reserveUSD\n  totalSupply\n  }\n}\n"
        }
    );

    // get staked balance then convert to to LP balance
    let stakedLPBalances = await multicallLuaFarm(
        network,
        addresses.map((address: any) => [
            stakedAddress,
            'userInfo',
            [0, address]
        ]),
        { blockTag }
    );

    // get LP balance
    const lpBalances = await multicall(
        network,
        provider,
        abi,
        addresses.map((address: any) => [
            lpTokenAddress,
            'balanceOf',
            [address]
        ]),
        { blockTag }
    );

    // sum up
    let stakedTDAO = stakedLPBalances.returnData.map((stakedBalance, index) => {
        return lpBalances.returnData[index].add(stakedBalance).mul(
            new BN(pairsInfo[0].reserve0)
        ).div(
            new BN(pairsInfo[0].totalSupply)
        ).div(
            new BN("1000000000000000000")
        );;
    });

    return Object.fromEntries(
        stakedTDAO.map((value, i) => [
          addresses[i],
          parseFloat(formatUnits(value.toString(), options.decimals))
        ])
    );
}

// Inspired by https://github.com/snapshot-labs/snapshot.js/blob/master/src/strategies/uniswap/index.ts
// global['fetch'] = require('cross-fetch');
import { formatUnits } from '@ethersproject/units';
import { multicall } from '../../src/utils';
import { abi as multicallAbi } from '../../src/abi/Multicall.json';
import { Interface } from '@ethersproject/abi';
import LUAFarmABI from "./lua-farm-abi.json";
// const { subgraphRequest } = require('../../src/utils');
const Web3 = require('web3')

const { JsonRpcProvider } = require('@ethersproject/providers');
const snapshot = require('../../');
const networks = require('../../src/networks.json');

const space = 'tomochain';
const network = '88';

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

const options = {
    "address": "0x7B87851f317B0580929884713811BB1055A350Eb",
    "tokenAddress": "0x4EaafA85bDBe9B02930926C594F83e62B036B1be",
    "lpTokenAddress": "0x88ba0bd9e1f90ccc21bdf7d33cb67fa5743da036",
    "symbol": "TDAO_LP",
    "decimals": 18,
    "start": 12240380
};

const blockTag = 43762401;
const lpTokenAddress = "0x88ba0bd9e1f90ccc21bdf7d33cb67fa5743da036";
const stakedAddress = "0x8Bcf7880d2Bae3E2705e7D90D28Bd417bd29020d";
const addresses = ["0x7B87851f317B0580929884713811BB1055A350Eb"]
const tokenAddress = options.tokenAddress.toLowerCase();

var rate;

const params = {
    pairs: {
        __args: {
            where: {
                id: lpTokenAddress
            }
        },
        id: true,
        totalSupply: true,
        reserve0: true,
        reserve1: true,
        token0: {
            id: true
        },
        token1: {
            id: true
        }
    }
};


async function subgraphLuaswapRequest(url, query, options = {}) {
    const res = await global["fetch"](url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // ...options?.headers
        },
        body: JSON.stringify(query)
    });
    const { data } = await res.json();
    return data || {};
}

async function multicallLuaFarm(network, options, calls) {
    console.log(network.multicall, options, calls[0][0], calls[0][1], calls[0][2])
    console.log(multicallAbi)

    const web3 = new Web3(new Web3.providers.HttpProvider(networks[network].rpc))
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


async function getScore() {
    const result = await subgraphLuaswapRequest(
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

    console.log(result);
    
    const stakedLPBalances = await multicallLuaFarm(
        network,
        addresses.map((address) => [
            stakedAddress,
            'userInfo',
            [0, address]
        ]),
        { blockTag }
    );

    console.log(stakedLPBalances);
    

    // console.log("response ", response)
    // return Object.fromEntries(
    //     response.map((value, i) => [
    //         addresses[i],
    //         parseFloat(formatUnits(value.toString(), options.decimals)) * rate
    //     ])
    // );
}

console.log("getting score ....")
getScore()

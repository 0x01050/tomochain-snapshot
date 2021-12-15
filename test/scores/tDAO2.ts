// global['fetch'] = require('cross-fetch');
// const eabi = require('@ethersproject/abi');
// const abi = require("../../src/abi/Multicall.json")
// const { JsonRpcProvider } = require('@ethersproject/providers');
// const snapshot = require('../../');
// const networks = require('../../src/networks.json');
// const Web3 = require('web3')

// const space = 'tomochain';
// const network = '88';
// const strategies = [
//   // {
//   //   name: 'erc20-balance-of',
//   //   params: {
//   //     address: '0x5c8AbFE81Fa1cBd678466A20c711a38f37509c0e',
//   //     symbol: 'tDAO',
//   //     decimals: 18
//   //   }
//   // },
//   {
//     name: 'erc20-balance-of',
//     params: {
//       address: '0x4eaafa85bdbe9b02930926c594f83e62b036b1be',
//       symbol: 'tDAO',
//       decimals: 18
//     }
//   },
//   // {
//   //   name: 'tDao-lp',
//   //   params: {
//   //     address: '0x88ba0bd9e1f90ccc21bdf7d33cb67fa5743da036',
//   //     symbol: 'LUA-V1'
//   //   }
//   // }
// ];

// (async () => {
//   const addresses = [
//     '0x16a73f3A64EcA79E117258e66dFd7071Cc8312A9',
//     // '0x88ba0bd9e1f90ccc21bdf7d33cb67fa5743da036'
//   ];

//   try {
//     // const scores = await snapshot.utils.getScoresDirect(
//     //   space,
//     //   strategies,
//     //   network,
//     //   new JsonRpcProvider("http://127.0.0.1:8545"),
//     //   addresses,
//     //   41808888
//     // );
//     // console.log(scores);
//     const ERC20 = [
//       {
//         "inputs": [
//           {
//             "internalType": "string",
//             "name": "name",
//             "type": "string"
//           },
//           {
//             "internalType": "string",
//             "name": "symbol",
//             "type": "string"
//           }
//         ],
//         "stateMutability": "nonpayable",
//         "type": "constructor"
//       },
//       {
//         "anonymous": false,
//         "inputs": [
//           {
//             "indexed": true,
//             "internalType": "address",
//             "name": "owner",
//             "type": "address"
//           },
//           {
//             "indexed": true,
//             "internalType": "address",
//             "name": "spender",
//             "type": "address"
//           },
//           {
//             "indexed": false,
//             "internalType": "uint256",
//             "name": "value",
//             "type": "uint256"
//           }
//         ],
//         "name": "Approval",
//         "type": "event"
//       },
//       {
//         "anonymous": false,
//         "inputs": [
//           {
//             "indexed": true,
//             "internalType": "address",
//             "name": "from",
//             "type": "address"
//           },
//           {
//             "indexed": true,
//             "internalType": "address",
//             "name": "to",
//             "type": "address"
//           },
//           {
//             "indexed": false,
//             "internalType": "uint256",
//             "name": "value",
//             "type": "uint256"
//           }
//         ],
//         "name": "Transfer",
//         "type": "event"
//       },
//       {
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "owner",
//             "type": "address"
//           },
//           {
//             "internalType": "address",
//             "name": "spender",
//             "type": "address"
//           }
//         ],
//         "name": "allowance",
//         "outputs": [
//           {
//             "internalType": "uint256",
//             "name": "",
//             "type": "uint256"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "spender",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "amount",
//             "type": "uint256"
//           }
//         ],
//         "name": "approve",
//         "outputs": [
//           {
//             "internalType": "bool",
//             "name": "",
//             "type": "bool"
//           }
//         ],
//         "stateMutability": "nonpayable",
//         "type": "function"
//       },
//       {
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "account",
//             "type": "address"
//           }
//         ],
//         "name": "balanceOf",
//         "outputs": [
//           {
//             "internalType": "uint256",
//             "name": "",
//             "type": "uint256"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "inputs": [],
//         "name": "decimals",
//         "outputs": [
//           {
//             "internalType": "uint8",
//             "name": "",
//             "type": "uint8"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "spender",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "subtractedValue",
//             "type": "uint256"
//           }
//         ],
//         "name": "decreaseAllowance",
//         "outputs": [
//           {
//             "internalType": "bool",
//             "name": "",
//             "type": "bool"
//           }
//         ],
//         "stateMutability": "nonpayable",
//         "type": "function"
//       },
//       {
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "spender",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "addedValue",
//             "type": "uint256"
//           }
//         ],
//         "name": "increaseAllowance",
//         "outputs": [
//           {
//             "internalType": "bool",
//             "name": "",
//             "type": "bool"
//           }
//         ],
//         "stateMutability": "nonpayable",
//         "type": "function"
//       },
//       {
//         "inputs": [],
//         "name": "name",
//         "outputs": [
//           {
//             "internalType": "string",
//             "name": "",
//             "type": "string"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "inputs": [],
//         "name": "symbol",
//         "outputs": [
//           {
//             "internalType": "string",
//             "name": "",
//             "type": "string"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "inputs": [],
//         "name": "totalSupply",
//         "outputs": [
//           {
//             "internalType": "uint256",
//             "name": "",
//             "type": "uint256"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "recipient",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "amount",
//             "type": "uint256"
//           }
//         ],
//         "name": "transfer",
//         "outputs": [
//           {
//             "internalType": "bool",
//             "name": "",
//             "type": "bool"
//           }
//         ],
//         "stateMutability": "nonpayable",
//         "type": "function"
//       },
//       {
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "sender",
//             "type": "address"
//           },
//           {
//             "internalType": "address",
//             "name": "recipient",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "amount",
//             "type": "uint256"
//           }
//         ],
//         "name": "transferFrom",
//         "outputs": [
//           {
//             "internalType": "bool",
//             "name": "",
//             "type": "bool"
//           }
//         ],
//         "stateMutability": "nonpayable",
//         "type": "function"
//       }
//     ];
    
//     // const response = await snapshot.utils.multicall(
//     //   network,
//     //   new JsonRpcProvider("http://127.0.0.1:8545"),
//     //   abi.abi,
//     //   addresses.map((address: any) => ["0x4eaafa85bdbe9b02930926c594f83e62b036b1be", 'balanceOf', [address]]),
//     //   { blockTag: 41808888 }
//     // );
//     const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"))
//     const ct = new web3.eth.Contract(abi.abi, "0x862551b81F143e1b812C489601Ac3729C19C9948");
//     let aggrate = await ct.methods.aggregate([
//       ["0x4eaafa85bdbe9b02930926c594f83e62b036b1be", "0x70a0823100000000000000000000000016a73f3a64eca79e117258e66dfd7071cc8312a9" ]
//     ]).call();
//     console.log("aggrate ", aggrate)
//   } catch (e) {
//     console.log('getScores failed');
//     console.error(e);
//   }
//   console.timeEnd('getScores');
// })();

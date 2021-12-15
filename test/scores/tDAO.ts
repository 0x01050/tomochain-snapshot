// global['fetch'] = require('cross-fetch');
// const { JsonRpcProvider } = require('@ethersproject/providers');
// const snapshot = require('../../');
// const networks = require('../../src/networks.json');

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
//     const scores = await snapshot.utils.getScoresDirect(
//       space,
//       strategies,
//       network,
//       new JsonRpcProvider("https://rpc.tomochain.com"),
//       addresses,
//       41801832
//     );
//     console.log(scores);
//   } catch (e) {
//     console.log('getScores failed');
//     console.error(e);
//   }
//   console.timeEnd('getScores');
// })();

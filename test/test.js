const Web3 = require('web3')
const { formatUnits } = require('@ethersproject/units');
const { BigNumber } = require('@ethersproject/bignumber');
var BN = Web3.utils.BN;
const addresses = ["0x7B87851f317B0580929884713811BB1055A350Eb"];
const stakedLPBalances = {
    returnData: [
        '0x00000000000000000000000000000000000000000000004d401293c16bffb2820000000000000000000000000000000000000000000000af2f43876ad9c4cfee00000000000000000000000000000000000000000000001184b9ebec4871fa7800000000000000000000000000000000000000000000000000000000029b4377'
    ]
}
const lpBalances = {
    returnData: [
        '0x0000000000000000000000000000000000000000000000000000000000000'
    ]
};
const pairsInfo = {
    pairs: [
      {
        id: '0x88ba0bd9e1f90ccc21bdf7d33cb67fa5743da036',
        reserve0: '5363977.821250364188580531',
        reserve1: '248253.019664230324871313',
        reserveUSD: '961588.8116689410812961904352045545',
        totalSupply: '1135649.047628159636519283'
      }
    ]
}

// console.log(stakedLPBalances.returnData[0].substring(0, 66))
// console.log(new BN(stakedLPBalances.returnData[0].substring(0, 66)))
// console.log(new BN(lpBalances.returnData[0].substring(0, 66)).toString())
// console.log(
//     new BN(lpBalances.returnData[0].substring(2, 64), 16).add(
//         new BN(stakedLPBalances.returnData[0].substring(2, 64), 16)
//     ).toString()
// )
console.log(

    stakedLPBalances.returnData[0].substring(2, 66).replace(/^0+/, '')
)
// console.log(
//     new BigNumber("4d401293c16bffb2")
// )
console.log(
    new BN("0x4d401293c16bffb282").toString()
)
let stakedTDAO = stakedLPBalances.returnData.map((stakedBalance, index) => {
    return new BN(lpBalances.returnData[index].substring(2, 66), 16).add(
        new BN(stakedBalance.substring(2, 66), 16)
    ).mul(
        new BN(pairsInfo.pairs[0].reserve0)
    ).mul(
        new BN(2)
    )
    .div(
        new BN(pairsInfo.pairs[0].totalSupply)
    ).toString()
});

console.log(
    stakedTDAO
);


console.log(Object.fromEntries(
    stakedTDAO.map((value, i) => [
      addresses[i],
      parseFloat(formatUnits(value.toString(), 18))
    ])
));


const Web3 = require('web3')
var BN = Web3.utils.BN;

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

console.log(
    stakedLPBalances.returnData[0].substr(2, 64)
)
console.log(
    new BN(stakedLPBalances.returnData[0].substr(2, 66), 16).toString()
)
console.log(
    new BN(stakedLPBalances.returnData[0].substr(66, 64+66), 16).toString()
)
console.log(
    new BN(stakedLPBalances.returnData[0].substr(66, 64+66), 16).toString()
)

console.log(
    new BN(lpBalances.returnData[0].substr(2, 66), 16).add(
        new BN(stakedLPBalances.returnData[0].substr(2, 66), 16)
    ).toString()
)
let stakedTDAO = stakedLPBalances.returnData.map((stakedBalance, index) => {
    return new BN(lpBalances.returnData[index].substr(2, 64), 16).add(
        new BN(stakedBalance.substr(2, 64), 16)
    )
    .mul(
        new BN(pairsInfo.pairs[0].reserve0)
    ).div(
        new BN(pairsInfo.pairs[0].totalSupply)
    ).div(
        new BN("1000000000000000000")
    ).toString()
});
console.log(stakedTDAO);

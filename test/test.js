const Web3 = require('web3')
var BN = Web3.utils.BN;

const stakedLPBalances = {
    returnData: [
        '0x0000000000000000000000000000000000000000000000000000000000000000'
        
    ]
}
const lpBalances = stakedLPBalances;
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

let stakedTDAO = stakedLPBalances.returnData.map((stakedBalance, index) => {
    return new BN(lpBalances.returnData[index].substring(2, 66), 16).add(
        new BN(stakedBalance..substring(2, 66), 16)
    )
    .mul(
        new BN(pairsInfo.pairs[0].reserve0)
    ).div(
        new BN(pairsInfo.pairs[0].totalSupply)
    ).div(
        new BN("1000000000000000000")
    )
});
console.log(stakedTDAO);

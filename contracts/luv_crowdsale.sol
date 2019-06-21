pragma solidity ^0.5.2;

import "../node_modules/openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";


contract luv_crowdsale is Crowdsale, MintedCrowdsale, TimedCrowdsale {

    constructor(uint256 rate, address payable wallet, IERC20 token, uint256 openingTime, uint256 closingTime) public
    Crowdsale(rate, wallet, token) TimedCrowdsale(openingTime, closingTime) /*July 1st 2019 GMT to Jan 1st 2030 GMT*/ {
        _initialRate = rate;
    }

    uint256 private _initialRate;

    function getInitialRate() public view returns (uint256) {
        return _initialRate;
    }

    function getCurrentPrice() public view returns (uint256) {
        //in wei
        return uint256(1e18).div(rate());
    }

    function rate() public view returns (uint256) {
        //override of the Crowdsale's rate() function
        //Rate goes down 10 LUV every million Luv sold
        return _initialRate.sub(token().totalSupply().div(1e23));
    }

    function _getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
        //Amounts of tokens you get at the current rate
        return weiAmount.mul(rate());
    }
}
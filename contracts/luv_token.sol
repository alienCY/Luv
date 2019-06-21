pragma solidity ^0.5.2;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

contract luv_token is ERC20Mintable, ERC20Detailed("Luv", "LUV", 18) {
    //Crowdsale must be be added as a minter!! (addMinter)
}
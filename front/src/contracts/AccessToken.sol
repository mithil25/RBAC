// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract AccessToken is ERC20 {
  address public admin;

  event MinterChanged(address indexed from, address to);

  constructor() payable ERC20("Access Token", "ACT") {
    admin = msg.sender; //only initially
  }

  function passMinterRole(address dBank) public returns (bool) {
  	require(msg.sender==admin, 'Error, only owner can change pass minter role');
  	admin = dBank;

    emit MinterChanged(msg.sender, dBank);
    return true;
  }

  function mint(address account, uint256 amount) public {
		_mint(account, amount);
  }

}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Logs getting recorded - creating,deleting,editing,executing and reading(everthing gets recored,so if any changes happens everyone will know about it,no other can hack or change any access or attribute)

// Validations - No  need of repetative validations(example of two organizations)

import "./AccessToken.sol";

contract AccessControl{
    struct Roles{
        string roleName;
        uint level;
    }

    struct Parameters{
        string roleName;
        uint level;
    }

    address internal admin;
    AccessToken private token;

    mapping(address => address) internal verifier;
    mapping(address => Roles) internal role;
    mapping(address => Parameters) internal parameter;
    mapping(address => address[]) internal keyRequest;

    constructor(AccessToken _token){
        admin = msg.sender;
        token = _token;
    }

    event KeySent(address sender,address receiver);
    modifier onlyAdmin{
        require(msg.sender == admin);
        _;
    }

    modifier onlyVerifier{
        require(msg.sender == verifier[admin]);
        _;
    }

    function setRole(address _user,string memory _roleName) public onlyAdmin{
        role[_user].roleName = _roleName;                         
    }

    function setVerifier(address _verifier) public onlyAdmin{
        verifier[_verifier] = msg.sender;
    }

    function sendKey(address _receiver) public{
        emit KeySent(msg.sender,_receiver);
    }

    function sendToken(address _user,uint _amount) public{
        token.transferFrom(address(this),_user,_amount * 1e18);
        role[_user].level = _amount;
    }

    function setParameters(string memory _roleName,uint _level) public{
        parameter[msg.sender].roleName = _roleName;
        parameter[msg.sender].level = _level;
    }

    function verifyToken(address _user) public view onlyVerifier returns(uint){
        return token.balanceOf(_user);
    }

    function verifyRole(address _user,string memory roleName) public view returns(bool){
        if(keccak256(abi.encodePacked(role[_user].roleName)) == keccak256(abi.encodePacked(roleName))){
            return true;
        }
        else {
            return false;
        }
    }

    function checkRequest() public view returns(address [] memory){
        return keyRequest[msg.sender];
    }

    function requestKey(address _user) public{
        if(role[msg.sender].level >= parameter[_user].level){
            keyRequest[_user].push(msg.sender);
        }
    } 
}
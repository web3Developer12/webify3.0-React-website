//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Webify{

    mapping(address=>uint256[]) allowed;
    
    address  owner;
    address  payable receiver;

    constructor(address payable _receiver){
        owner    = msg.sender;
        receiver = _receiver;
    }

    function getAllowedCohort() external view returns(uint256[] memory){
        return allowed[msg.sender];
    }

    function addAllowanceCohort(uint256 id) external {
        allowed[msg.sender].push(id);
    }

    receive() external payable{
        receiver.transfer(address(this).balance);
    }

}
pragma solidity ^0.4.24;

contract Factory {
  address[] public deployedStations;
  address[] public stationManagers;

  function createStation() public returns (address) {
    address newStation = new Station(msg.sender);
    deployedStations.push(newStation);
    stationManagers.push(msg.sender);
  }

  function hardcode() public returns (address) {
    address newStation = new Station(msg.sender);
    return newStation;
  }

  function getStationManagers() public view returns (address[]) {
    return stationManagers;
  }

  function getDeployedStations() public view returns (address[]) {
    return deployedStations;
  }
}

contract Station {
  bool public approved;
  address public manager;
  mapping(address => bool) public operators;

  constructor(address creator) public {
    approved = false;
    manager = creator;
    operators[0x3b3DE2C94e6d0eCA853a0e45Bbf2E10636Cc02aA] = true; 
  }

  modifier restrictedManager() {
    require(msg.sender == manager, "Fuck u");
    _;
  }

  modifier restrictedOperator() {
    require(operators[msg.sender], "Fuck u");
    _;
  }

  function isApproved() public view returns (bool) {
    return approved;
  }

  function approveStation() public {
    approved = true;
  }
}

contract Tokens {
  mapping(address => uint) public tokenHolders;

  function addTokens(address holderAddress, uint quantity) public {
    if (tokenHolders[holderAddress] != 0) {
      tokenHolders[holderAddress] += quantity;
    } else {
      tokenHolders[holderAddress] = quantity;
    }
  }
  function getTokens(address holderAddress) public view returns (uint) {
    return tokenHolders[holderAddress];
  }

  function burnTokens(address holderAddress, uint quantity) public {
    require(tokenHolders[holderAddress] != 0 && tokenHolders[holderAddress] <= quantity, "Suck");
    tokenHolders[holderAddress] -= quantity;
  }
}
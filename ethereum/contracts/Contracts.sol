pragma solidity ^0.4.24;

contract Factory {
  address[] public deployedContracts;

  function createContract(string message) public {
    address newContract = new Contract(message, msg.sender);
    deployedContracts.push(newContract);
  }

  function getDeployedContracts() public view returns (address[]) {
    return deployedContracts;
  }
}

contract Contract {
  string public currentMessage;
  address public manager;

  constructor(string message, address creator) public {
    currentMessage = message;
    manager = creator;
  }

  function changeMessage(string mess) public {
    currentMessage = mess;
  }
}
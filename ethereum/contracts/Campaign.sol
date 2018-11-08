pragma solidity ^0.4.24;

contract CampaignFactory {
  address[] public deployedCampaigns;

  function createCampaign(uint minimum) public {
    address newCampaign = new Campaign(minimum, msg.sender);
    deployedCampaigns.push(newCampaign);
  }
}

contract Campaign {
  struct Request {
    string description;
    uint value;
    address recipient;
    bool complete;
    uint approvalCount;
    mapping(address => bool) approvals;
  }

  address public manager;
  uint public minimumContribution;
  Request[] public requests;
  mapping(address => bool) public approvers;
  uint approversCount;

  modifier restricted() {
    require(msg.sender == manager, "Fuck u");
    _;
  }

  constructor(uint minimum, address creator) public {
    manager = creator;
    minimumContribution = minimum;
  }

  function contribute() public payable {
    require(msg.value > minimumContribution, "Fuck u");
    approversCount++;
    approvers[msg.sender] = true;
  }

  function createRequest(string desc, uint value, address recipient) public restricted {
    require(approvers[msg.sender], "Suck");
    Request memory newRec = Request({
      description: desc,
      value: value,
      recipient: recipient,
      complete: false,
      approvalCount: 0
    });
    requests.push(newRec);
  }

  function approveRequest(uint index) public {
    Request storage request = requests[index];

    require(approvers[msg.sender], "Suck");
    require(!request.approvals[msg.sender], "Suck");

    request.approvals[msg.sender] = true;
    request.approvalCount++;
  }

  function finilizeRequest(uint index) public restricted {
    Request storage request = requests[index];

    require(!request.complete, "Suck");
    require(request.approvalCount > (approversCount / 2), "Suck");
    
    request.recipient.transfer(request.value);
    request.complete = true;
  }
}
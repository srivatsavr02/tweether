pragma solidity >=0.4.22 <0.9.0;

import "./Owned.sol";

contract BaseController is Owned {
    address managerAddr;

    function setManagerAddr(address _managerAddr) public onlyOwner {
        managerAddr = _managerAddr;
    }
}

pragma solidity >=0.4.22 <0.9.0;

import "../helpers/BaseController.sol";
import "../ContractManager.sol";
import "./UserStorage.sol";

contract UserController is BaseController {
    function createUser(
        bytes32 _username,
        bytes32 _firstName,
        bytes32 _lastName,
        string memory _bio,
        string memory _gravatarEmail,
        string memory _profileHash
    ) public returns (uint256) {
        ContractManager _manager = ContractManager(managerAddr);

        address _userStorageAddr = _manager.getAddress("UserStorage");
        UserStorage _storage = UserStorage(_userStorageAddr);

        require(_storage.addresses(msg.sender) == 0);
        require(_storage.usernames(_username) == 0);

        return
            _storage.createUser(
                msg.sender,
                _username,
                _firstName,
                _lastName,
                _bio,
                _gravatarEmail,
                _profileHash
            );
    }
}

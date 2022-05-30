pragma solidity >=0.4.22 <0.9.0;

import "../helpers/BaseStorage.sol";

contract UserStorage is BaseStorage {
    mapping(uint256 => Profile) public profiles;
    mapping(address => uint256) public addresses;
    mapping(bytes32 => uint256) public usernames;
    mapping(uint256 => address) public uidtoaddr;

    struct Profile {
        uint256 id;
        bytes32 username;
        bytes32 firstName;
        bytes32 lastName;
        string bio;
        string gravatarEmail;
        string profileHash;
    }

    uint256 latestUserId = 0;

    function createUser(
        address _address,
        bytes32 _username,
        bytes32 _firstName,
        bytes32 _lastName,
        string memory _bio,
        string memory _gravatarEmail,
        string memory _profileHash
    ) public onlyController returns (uint256) {
        latestUserId++;

        profiles[latestUserId] = Profile(
            latestUserId,
            _username,
            _firstName,
            _lastName,
            _bio,
            _gravatarEmail,
            _profileHash
        );

        addresses[_address] = latestUserId;
        usernames[_username] = latestUserId;
        uidtoaddr[latestUserId] = _address;

        return latestUserId;
    }
}

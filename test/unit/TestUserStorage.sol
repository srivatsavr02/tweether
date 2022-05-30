pragma solidity >=0.4.22 <0.9.0;

import "truffle/Assert.sol";
import "../../contracts/users/UserStorage.sol";

contract TestUserStorage {
    UserStorage userStorage;

    constructor() {
        userStorage = new UserStorage();
        userStorage.setControllerAddr(address(this));
    }

    function testCreateFirstUser() public {
        uint256 _expectedId = 1;
        bytes32 username = bytes32(bytes("tristan"));
        bytes32 firstName = bytes32(bytes("Tristan"));
        bytes32 lastName = bytes32(bytes("Edwards"));

        Assert.equal(
            userStorage.createUser(
                address(0),
                username,
                firstName,
                lastName,
                "I like building stuff",
                "example@example.com",
                ""
            ),
            _expectedId,
            "Should create user with ID 1"
        );
    }
}

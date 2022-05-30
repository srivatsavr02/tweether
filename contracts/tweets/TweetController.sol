pragma solidity >=0.4.22 <0.9.0;

import "../helpers/BaseController.sol";
import "../ContractManager.sol";
import "./TweetStorage.sol";
import "../users/UserStorage.sol";

contract TweetController is BaseController {
    function createTweet(string memory _text, string memory _postHash)
        public
        returns (uint256)
    {
        ContractManager _manager = ContractManager(managerAddr);

        address _userStorageAddr = _manager.getAddress("UserStorage");
        UserStorage _userStorage = UserStorage(_userStorageAddr);
        uint256 _userId = _userStorage.addresses(msg.sender);

        require(_userId != 0);

        address _tweetStorageAddr = _manager.getAddress("TweetStorage");
        TweetStorage _tweetStorage = TweetStorage(_tweetStorageAddr);

        return _tweetStorage.createTweet(_userId, _text, _postHash);
    }

    function tipPost(uint256 _id) public payable {
        ContractManager _manager = ContractManager(managerAddr);

        address _tweetStorageAddr = _manager.getAddress("TweetStorage");
        TweetStorage _tweetStorage = TweetStorage(_tweetStorageAddr);

        require(_id > 0 && _id <= _tweetStorage.getNumTweets());

        (
            uint256 id,
            string memory text,
            uint256 userId,
            uint256 postedAt,
            string memory postHash,
            uint256 tipAmount
        ) = _tweetStorage.tweets(_id);

        address _userStorageAddr = _manager.getAddress("UserStorage");
        UserStorage _userStorage = UserStorage(_userStorageAddr);

        require(
            _userStorage.addresses(msg.sender) != 0 &&
                _userStorage.uidtoaddr(userId) != address(0)
        );

        _tweetStorage.tipPost{value: msg.value}(
            _id,
            _userStorage.uidtoaddr(userId)
        );
    }
}

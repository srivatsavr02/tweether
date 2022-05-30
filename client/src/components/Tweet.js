import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Web3 from "web3";
import Button from "./Button";
import Avatar from "./Avatar";
import { tipPost } from "../web3/tweets";

import { Context } from "../context/Context";
import { SyncTweets } from "../context/Actions";

export default ({ tweet }) => {
  const { id, text, user, postedAt, postHash, tipAmount } = tweet;
  const { username, gravatarEmail, profileHash } = user;
  const { dispatch } = useContext(Context);

  const [tip, setTip] = useState(tipAmount);

  return (
    <div className="tweet">
      <Avatar size={42} src={profileHash} />

      <div className="info">
        <div className="top">
          <Link to={`/profile/${username}`}>
            <a className="username">{username}</a>
          </Link>

          <time>
            <Moment fromNow ago unix>
              {postedAt}
            </Moment>
          </time>
        </div>
        {postHash && (
          <img
            src={`http://localhost:8080/ipfs/${postHash}`}
            alt="img"
            style={{
              maxHeight: "300px",
              width: "100%",
              objectFit: "contain",
              borderRadius: "2%",
            }}
          />
        )}
        <h6>{text}</h6>
        <div style={{ marginTop: "7px" }}>
          <small>TIPS: {Web3.utils.fromWei(tip.toString(), "Ether")} ETH</small>
          <Button
            style={{ float: "right" }}
            onClick={async () => {
              try {
                let tipAmount = Web3.utils.toWei("0.1", "Ether");
                let res = await tipPost(id, tipAmount);
                if (res.tx !== undefined) {
                  alert(`0.1 ETH Tipped!`);
                  setTip(tip + parseInt(tipAmount));
                  dispatch(SyncTweets());
                } else throw res.message;
              } catch (err) {
                alert(`Sorry, we couldn't tip: ${err}`);
              }
            }}
          >
            <small>TIP 0.1 ETH</small>
          </Button>
        </div>
      </div>

      <style jsx>{`
        .tweet {
          padding: 20px;
          border-bottom: 1px solid rgba(151, 151, 151, 0.17);
        }
        .tweet:last-child {
          border-bottom: none;
        }
        .avatar {
          width: 42px;
          height: 42px;
          background-color: gray;
          border-radius: 50%;
          display: inline-block;
        }
        .info {
          display: inline-block;
          vertical-align: top;
          margin-left: 20px;
          width: calc(100% - 62px);
        }
        .top {
          display: flex;
          margin-bottom: 10px;
        }
        a {
          font-size: 17px;
          color: #5d5d65;
          font-weight: 600;
          flex-grow: 1;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        h6 {
          font-size: 16px;
          color: #444448;
          line-height: 24px;
          margin-top: 6px;
          font-weight: 1;
        }
        time {
          font-size: 16px;
          color: rgba(68, 68, 72, 0.45);
        }
      `}</style>
    </div>
  );
};

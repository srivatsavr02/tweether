import { useState, useEffect, useContext } from "react";
import { Context } from "../context/Context";

import Center, { Page } from "../components/Layout";
import {
  getLatestTweetIds,
  getTweetInfo,
  loadTweetsFromTweetPromises,
} from "../web3/tweets";

import TweetList from "../components/TweetList";

export default () => {
  const [tweets, setTweeets] = useState([]);
  const { syncTweets } = useContext(Context);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadLatestTweets = async () => {
      const tweetIds = await getLatestTweetIds(page);

      const tweetPromises = tweetIds.map((tweetId) => {
        return getTweetInfo(tweetId);
      });

      const allTweets = await loadTweetsFromTweetPromises(tweetPromises);

      setTweeets(allTweets);
    };

    loadLatestTweets();
  }, [syncTweets, page]);

  const setPageNo = (no) => {
    if (no < 1) return;
    else if (!tweets.length && no > page) return;
    else if (!tweets.length && no < page) setPage(no);
    else setPage(no);
  };

  return (
    <Page>
      <Center>
        <h2>Latest tweets - Page {page}</h2>

        <TweetList tweets={tweets} />

        <div className="wrapper">
          <div className="pagination">
            <span onClick={() => setPageNo(page - 1)}>❮ Prev</span>
            <span onClick={() => setPageNo(page + 1)}>Next ❯</span>
          </div>
        </div>
      </Center>

      <style jsx>{`
        h2 {
          font-size: 16px;
          color: white;
          letter-spacing: 0.5px;
          text-align: center;
          text-transform: uppercase;
          margin-bottom: 16px;
          margin-top: 4px;
        }
        .wrapper {
          text-align: center;
        }
        .pagination {
          background-color: white;
          display: inline-block;
          margin: 0 auto;
        }

        .pagination span {
          color: black;
          float: left;
          padding: 8px 16px;
          text-decoration: none;
          transition: background-color 0.3s;
          border: 1px solid #ddd;
          cursor: pointer;
        }

        .pagination span:hover {
          background-color: #ddd;
        }
      `}</style>
    </Page>
  );
};

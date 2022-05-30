import { Link } from "react-router-dom";
import Center from "./Layout";
import logotype from "../icons/logotype.svg";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { Login } from "../context/Actions";
import FormModal from "./FormModal";

import { getUserInfo, getLoggedInUserId } from "../web3/users";
import Nav from "./Nav";
import TweetComposer from "./TweetComposer";

function Header() {
  const { user, dispatch } = useContext(Context);

  const [showComposeModal, setShowComposeModal] = useState(false);

  /*
  useEffect(() => {
    const checkUser = async () => {
      const userId = await getLoggedInUserId();
      if (userId !== user.id) {
        const userInfo = await getUserInfo(userId);
        dispatch(Login(userInfo));
      }
    };

    checkUser();
  }, []);
*/
  const toggleComposeModal = () => {
    setShowComposeModal(!showComposeModal);
  };

  return (
    <header>
      <Center>
        <Link to="/">
          <img src={logotype} />
        </Link>
        <nav>
          {user && (
            <Nav userInfo={user} toggleComposeModal={toggleComposeModal} />
          )}
        </nav>
      </Center>

      {showComposeModal && (
        <FormModal onClose={toggleComposeModal}>
          <TweetComposer onClose={toggleComposeModal} />
        </FormModal>
      )}

      <style jsx>{`
        header {
          background-color: #ffffff;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.14);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
        }
      `}</style>
    </header>
  );
}

export default Header;

import { useState, useEffect } from "react";
import "./index.css";
import { eth } from "../web3/provider";
import metamask from "../icons/metamask.svg";

import FormModal from "../components/FormModal";
import Center, { Page } from "../components/Layout";
import Button from "../components/Button";
import RegistrationForm from "../components/RegForm";

function Index() {
  const [showRegModel, setRegModel] = useState(false);

  useEffect(() => {
    async function accounts() {
      try {
        const { ethereum } = window;

        await ethereum.enable();
        const addresses = await eth.getAccounts();
        console.log(addresses);
      } catch (err) {
        console.error("User denied access to their ETH addresses!");
      }
    }

    accounts();
  }, []);

  const toggleRegModel = () => {
    setRegModel(!showRegModel);
  };

  return (
    <Page>
      <Center>
        <h2>
          A <mark>decentralized</mark>, <mark>uncensorable</mark> Twitter clone
          built on Ethereum
        </h2>

        <div className="right-side">
          <Button onClick={toggleRegModel}>
            <div style={{ display: "inline-block", verticalAlign: "middle" }}>
              <img src={metamask} style={{ paddingRight: "10px" }} alt="img" />
            </div>
            <div style={{ display: "inline-block" }}>
              <p>Create your account</p>
            </div>
          </Button>
          <div className="disclaimer">
            <p>
              MetaMask will automatically open and ask you to confirm a
              transaction.
            </p>
            <p>
              Please note that creating an account on the Ethereum blockchain
              costs a small amount of Ether.
            </p>
          </div>
        </div>
      </Center>
      {showRegModel && (
        <FormModal onClose={toggleRegModel}>
          <RegistrationForm onClose={toggleRegModel} />
        </FormModal>
      )}

      <style jsx>{`
        h2 {
          padding-top: 50px;
          font-size: 50px;
          color: #ffffff;
          line-height: 78px;
          position: relative;
          text-transform: uppercase;
          max-width: 520px;
          display: inline-block;
        }
        mark {
          color: inherit;
          background-color: #9f99ec;
          padding: 0 7px;
        }
        .right-side {
          float: right;
          position: relative;
          max-width: 320px;
          text-align: center;
          margin-top: 120px;
        }
        .right-side :global(svg) {
          position: absolute;
          margin-left: -46px;
          margin-top: -8px;
        }
        .disclaimer {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          line-height: 23px;
          font-weight: 400;
          margin-top: 23px;
        }
      `}</style>
    </Page>
  );
}

export default Index;

import React, { useState } from "react";
import TwitterComponent from "./TwitterComponent";
import WalletComponent from "./WalletComponent";
import "./App.css";

function App() {
  const [state, setState] = useState({
    twitterHandle: null,
    Wallet: null,
  });

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="header">CrypticChronicles</h1>
        <p className="sub-text">
          Transforming messages into timeless inscriptions on the blockchain.
          <br />
          Secure, immutable, and forever etched in the digital realm 🔐
        </p>
        <br />
        <div>
          {/* <p>Twitter Handle: {state.twitterHandle || "Not set"}</p> */}
          {/* <p>Wallet: {state.Wallet || "Not set"}</p> */}
          <WalletComponent updateState={updateState} />
          <TwitterComponent updateState={updateState} />
        </div>
      </div>
    </div>
  );
}

export default App;

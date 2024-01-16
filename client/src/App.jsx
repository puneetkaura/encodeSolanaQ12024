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
        <h1 className="header">XCryptic</h1>
        <p className="sub-text">
          Secure, immutable and time-resistant messages beyond alteration.
          <br />
          Try now ⬇
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

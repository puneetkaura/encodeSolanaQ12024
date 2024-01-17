import React, { useState } from "react";
import TwitterComponent from "./TwitterComponent";
import WalletComponent from "./WalletComponent";
import Editor from "./Editor";
import "./App.css";

const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "",
        level: 4,
      },
    },
  ],
};

function App() {
  const [state, setState] = useState({
    twitterHandle: null,
    Wallet: null,
  });

  const [data, setData] = useState(INITIAL_DATA);

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
        <div
          className="editor"
          style={{
            backgroundColor: "#f0f0f0",
            height: "100px",
            fontSize: "14px",
            borderRadius: "8px",
            color: "#3B3B3B",
            fontWeight: "300",
          }}
        >
          <Editor
            data={data}
            onChange={setData}
            editorblock="editorjs-container"
          />
          {/* <button
            className="savebtn"
            onClick={() => {
              alert(JSON.stringify(data));
            }}
          >
            Save
          </button> */}
        </div>
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

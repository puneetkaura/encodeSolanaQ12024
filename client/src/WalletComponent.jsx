import React, { useState, useEffect } from "react";

const WalletComponent = ({ updateState }) => {
  /*
   * This function holds the logic for deciding if a Phantom Wallet is
   * connected or not
   */
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    // We're using optional chaining (question mark) to check if the object is null
    if (window?.solana?.isPhantom) {
      console.log("Phantom wallet found!");
      /*
       * The solana object gives us a function that will allow us to connect
       * directly with the user's wallet
       */
      const response = await window.solana.connect({ onlyIfTrusted: true });
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
      updateState({ Wallet: response.publicKey.toString() })
    } else {
      alert("Solana object not found! Get a Phantom Wallet 👻");
    }
  };

  /*
   * Let's define this method so our code doesn't break.
   * We will write the logic for this next!
   */
  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
      updateState({ Wallet: response.publicKey.toString() })
    }
  };

  /*
   * We want to render this UI when the user hasn't connected
   * their wallet to our app yet.
   */
  const renderNotConnectedContainer = () => (
    <button className="wallet-button" onClick={connectWallet}>
      Connect to Wallet
    </button>
  );

  /*
   * When our component first mounts, let's check to see if we have a connected
   * Phantom Wallet
   */
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    // <div className="App">
    <div className="header-container" style={{ marginBottom: "10px" }}>
      {/* <p className="header">CrypticChronicles</p>
      <p className="sub-text">
        Transforming messages into timeless inscriptions on the blockchain.
        Secure, immutable, and forever etched in the digital realm 🔐
      </p> */}
      {/* Render your connect to wallet button right here */}
      {!walletAddress && renderNotConnectedContainer()}
    </div>
    // </div>
  );
};

export default WalletComponent;

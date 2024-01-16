import React, { useState } from 'react';
import TwitterComponent from './TwitterComponent';
// import WalletComponent from './WalletComponent';

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
      <p>Twitter Handle: {state.twitterHandle || 'Not set'}</p>
      <p>Wallet: {state.Wallet || 'Not set'}</p>
      
      <TwitterComponent updateState={updateState} />
      {/* <WalletComponent updateState={updateState} /> */}
    </div>
  );
}

export default App;

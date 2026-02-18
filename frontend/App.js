import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import GameUI from './GameUI';
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setAccount(accounts[0]);
        setProvider(provider);
        setConnected(true);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setConnected(false);
          setAccount(null);
        }
      });
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>SoundDAO Game</h1>
        {!connected ? (
          <button onClick={connectWallet} className="connect-btn">
            Connect Wallet
          </button>
        ) : (
          <div>
            <p>Connected: {account?.substring(0, 6)}...{account?.substring(38)}</p>
            <GameUI playerAddress={account} provider={provider} />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
  NETWORK_CONFIG,
  CHAIN_ID_HEX,
  NETWORK_PARAMS,
  TOKEN_CONTRACT,
  REQUIRED_TOKEN_BALANCE
} from './contractConfig';
import './styles.css';

const WalletConnect = ({ onConnect }) => {
  const [account, setAccount] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');
  const [tokenBalance, setTokenBalance] = useState('0');

  const checkAndAddNetwork = async () => {
    try {
      // Önce ağı değiştirmeyi dene
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CHAIN_ID_HEX }],
      });
    } catch (switchError) {
      // Ağ yoksa ekle
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [NETWORK_PARAMS],
          });
        } catch (addError) {
          throw new Error('Failed to add KITTYVERSE network');
        }
      } else {
        throw switchError;
      }
    }
  };

  const checkTokenBalance = async (address, provider) => {
    try {
      const contract = new ethers.Contract(
        TOKEN_CONTRACT.address,
        TOKEN_CONTRACT.abi,
        provider
      );
      
      const balance = await contract.balanceOf(address);
      setTokenBalance(balance.toString());
      
      return balance.gte(REQUIRED_TOKEN_BALANCE);
    } catch (err) {
      console.error('Token balance check failed:', err);
      return true; // Token kontrolünü geçici olarak devre dışı bırakıyoruz
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      setError('Please install MetaMask!');
      return;
    }

    try {
      setConnecting(true);
      setError('');

      // Ağı kontrol et ve gerekirse ekle
      await checkAndAddNetwork();

      // Cüzdana bağlan
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts.length > 0) {
        // Token bakiyesini kontrol et (opsiyonel)
        const hasEnoughTokens = await checkTokenBalance(accounts[0], provider);
        
        if (hasEnoughTokens) {
          setAccount(accounts[0]);
          if (onConnect) onConnect(accounts[0]);
        } else {
          setError('Minimum 1 KITTY Token required to play!');
        }
      }
    } catch (err) {
      setError(err.message);
      console.error('Connection error:', err);
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount('');
    setTokenBalance('0');
    if (onConnect) onConnect(null);
  };

  useEffect(() => {
    if (window.ethereum) {
      // Hesap değişikliklerini dinle
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
          if (onConnect) onConnect(accounts[0]);
        }
      };

      // Ağ değişikliğini dinle
      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Cleanup
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [onConnect]);

  return (
    <div className="wallet-container">
      {!account ? (
        <button 
          className="wallet-button"
          onClick={connectWallet}
          disabled={connecting}
        >
          {connecting ? 'Connecting to KITTYVERSE...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="wallet-info">
          <span className="wallet-address">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          {/* Token bakiyesi gösterimi (opsiyonel) */}
          <span className="wallet-balance">
            Balance: {ethers.formatEther(tokenBalance)} KITTY
          </span>
          <button 
            className="wallet-disconnect"
            onClick={disconnectWallet}
          >
            Disconnect
          </button>
        </div>
      )}
      {error && <div className="wallet-error">{error}</div>}
    </div>
  );
};

export default WalletConnect;

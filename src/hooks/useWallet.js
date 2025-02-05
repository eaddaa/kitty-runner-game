import { useState, useCallback, useEffect } from 'react';

export const useWallet = () => {
  const [account, setAccount] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);

  // MetaMask'ın varlığını kontrol et
  const checkIfWalletIsInstalled = () => {
    if (typeof window.ethereum === 'undefined') {
      setError('Please install MetaMask to play!');
      return false;
    }
    return true;
  };

  // Cüzdan bağlantısı
  const connectWallet = useCallback(async () => {
    if (!checkIfWalletIsInstalled()) return;

    try {
      setConnecting(true);
      setError(null);

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (err) {
      setError('Failed to connect wallet: ' + err.message);
    } finally {
      setConnecting(false);
    }
  }, []);

  // Hesap değişikliklerini dinle
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      // Cleanup
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  return {
    account,
    connecting,
    error,
    connectWallet,
    isConnected: !!account
  };
};
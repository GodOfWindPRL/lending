import { chains } from 'configs/chains';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from 'routers';
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";

window.Buffer = window.Buffer || require("buffer").Buffer;

const DEFAULT_CHAIN = chains[0].id;

const App = () => {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (chain?.id !== DEFAULT_CHAIN) {
      // dispatch(changeNetwork(false));
      switchNetwork && switchNetwork(DEFAULT_CHAIN);
    } else {
      // dispatch(changeNetwork(true));
    }
  }, [chain])

  useEffect(() => {
    if (address === undefined) {
      disconnect();
      removeLocalStorage()
    }
  }, [address])

  const removeLocalStorage = () => {
    localStorage.removeItem('wagmi.connectedRdns');
  }

  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
}

export default App;
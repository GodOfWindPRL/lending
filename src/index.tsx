import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GlobalStyle } from './configs/globalStyled';
import "language/I18n";
import "wagmi/window";
import { WagmiConfig } from "wagmi";
import { chains } from "configs/chains";
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const PROJECT_ID = process.env.REACT_APP_PROJECT_ID || "";
if (!PROJECT_ID) {
  throw new Error("Project ID is required");
}
const location = window.location.origin;

const metadata = {
  name: 'MTC.io',
  description: 'MTC...',
  url: `${location}`,
  icons: [`${location}/apple-touch-icon.png`]
}

const wagmiConfig = defaultWagmiConfig({ chains, projectId: PROJECT_ID, metadata })

createWeb3Modal({
  wagmiConfig,
  projectId: PROJECT_ID,
  chains,
  themeVariables: {
    "--w3m-font-family": "Roboto, sans-serif",
    "--w3m-color-mix": "#0C0B0D",
    "--w3m-border-radius-master": "16px",
  },
  themeMode: "dark"
})

root.render(
  <WagmiConfig config={wagmiConfig}>
    <GlobalStyle />
    <App />
    <ToastContainer />
  </WagmiConfig>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

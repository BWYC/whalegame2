import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./config/redux/store";
import { Title } from "./components";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { CoreBlockchain } from "@thirdweb-dev/chains";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

const root = ReactDOM.createRoot(document.getElementById("root"));
const activeChain = CoreBlockchain;

root.render(
  <ThirdwebProvider
    activeChain={activeChain}
    clientId={"65a85b91315ca838d7a8472fb0e64f92"}
  >
    <Provider store={store}>
      <Title />
      <App />
    </Provider>
  </ThirdwebProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotificationOverlay } from "./components/notifications";
import { ThemeProvider } from "./themes";
import { WalletProvider } from "./componentsV3/wallet/WalletProvider";
import { useCreateStore, Provider as ZustandProvider } from "./lib/store";
import { Index } from "./pages";
import { Launches } from "./pages/launches";
import { Auction, Sale } from "./pages/explore";
import { Collection } from "./pages/collection/[slug]";
import { ApplyLaunchPad } from "./pages/applyLaunchpad";
import { User } from "./pages/user/[pubkey]";
import { Token } from "./pages/launchpad";

import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";

import "flowbite";
import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { MarketplaceProvider } from "./context/MarketplaceProvider";
import { Toaster } from "react-hot-toast";

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
  return new Web3Provider(provider);
}

function App() {
  // @ts-ignore
  const createStore = useCreateStore({});

  return (
    <ZustandProvider createStore={createStore}>
      <ThemeProvider
        defaultTheme="light"
        themes={["light", "dark"]}
        attribute="class"
      >
        <WalletProvider>
          <MarketplaceProvider>
            <Toaster />
            <Router>
              <Routes>
                {/* <Route path="/faq">
                <FAQ />
              </Route>
              <Route path="/collection/:slug/activity">
                <CollectionActivity />
              </Route>
              <Route path="/collection/:slug/edit">
                <EditCollection />
              </Route>
              <Route path="/collection/:slug">
                <Collection />
              </Route>
              <Route path="/t/:pubkey">
                <Token />
              </Route>
              <Route path="/user/:pubkey">
                <User />
              </Route>
              <Route path="/privacy">
                <Privacy />
              </Route>
              <Route path="/stake">
                <Stake />
              </Route>
              <Route path="/submissions/:id">
                <SubmissionsUpsert />
              </Route>
              <Route path="/submissions">
                <Submissions />
              </Route>  */}
                <Route path="/" element={<Index />} />
                <Route path="/explore/sale" element={<Sale />} />
                <Route path="/explore/auction" element={<Auction />} />
                <Route path="/collection/:slug" element={<Collection />} />
                <Route path="/user/:pubkey" element={<User />} />
                <Route path="/t" element={<Token />} />
                <Route
                  path="/applylaunch"
                  element={<ApplyLaunchPad loader={false} />}
                />
                <Route path="/launches" element={<Launches />} />
              </Routes>
            </Router>
            <NotificationOverlay />
          </MarketplaceProvider>
        </WalletProvider>
      </ThemeProvider>
    </ZustandProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

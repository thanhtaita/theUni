import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ndfot0xui64cmohw.us.auth0.com"
      clientId="sONjCDPOs75Nt9giLwFKeKctJPDKtWU5"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "this is a test",
        scope: "openid profile email",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

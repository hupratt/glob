import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import register from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./reducers";
import "./i18n";
import posthog from "posthog-js";

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// Analytics
process.env.POSTHOG_KEY &&
  posthog.init(process.env.POSTHOG_KEY, {
    api_host: process.env.POSTHOG_DOMAIN,
    secure_cookie: true,
    cookie_expiration: 99999999999,
  });

// posthog.opt_out_capturing();

/* Allows caching, push notifications and queues offline actions
This action fires a seperate thread to install on
When changed, the old service worker remains active if there are tabs open
This means that in order to use the latest SW after a change you'll need to close the tab */
register();

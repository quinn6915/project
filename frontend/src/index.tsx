import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import "./css/tailwind.css";
import { Provider } from "react-redux";
import { store } from "./store";
import "moment/locale/fr";
import { ToastProvider } from "react-toast-notifications";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={6000}
        placement="bottom-center"
      >
        <App />
      </ToastProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import store, { persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import ScrollToTop from "./ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <ScrollToTop />
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

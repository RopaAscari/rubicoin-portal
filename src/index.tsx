import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";
import "./assets/scss/argon-dashboard-react.scss";
import { BrowserRouter } from "react-router-dom";

import App from "./app/App";
import "./i18n";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmlyMrWqZST5jn58G3y9SiltoC1g5tUm0",
  authDomain: "rubicoin-321a9.firebaseapp.com",
  projectId: "rubicoin-321a9",
  storageBucket: "rubicoin-321a9.appspot.com",
  messagingSenderId: "605608242159",
  appId: "1:605608242159:web:08f7c9df6952ac9baba41a",
  measurementId: "G-T3FC11WB7K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

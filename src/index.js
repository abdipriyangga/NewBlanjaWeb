import React from "react";
import ReactDOM from "react-dom";
import Router from "./pages/Router";
import { Provider } from "react-redux";
import { store, persiststore } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// // CSS Home Page
// import './assets/style/style.css'
// import './assets/style/home.css'
import "./assets/style/category.css";
// import './assets/style/new.css'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate loading={null} persistor={persiststore}>
        <Router />
      </PersistGate>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

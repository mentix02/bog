import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import store from "./store";
import BaseRouter from "./routes";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <BaseRouter />
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;

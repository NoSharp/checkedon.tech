import ReactDOM from "react-dom";
import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Setup from "./pages/Setup";
import NoPage from "./pages/NoPage";
import Account from "./pages/Account";
import Login from "./pages/Login";
import "./index.css";


export default function App() {
  return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="setup" element={<Setup />} />
            <Route path="login" element={<Login />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </HashRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

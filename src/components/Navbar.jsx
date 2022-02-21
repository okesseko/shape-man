import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import logo from "../../img/logo.png";

const Navbar = () => {
  return (
    <nav className="fixed flex w-screen justify-between bg-green-400">
      <Link to="/">
        <img className="ml-2" src={logo} width={150} />
      </Link>
      <ul className="flex items-center">
        <li className="my-3 mx-6 text-xl">
          <Link to="/about">About</Link>
        </li>
        <li className="my-3 mx-6 text-xl">
          <Link to="/install">Install</Link>
        </li>
        <li className="my-3 mx-6 text-xl">
          <button className="rounded-full bg-black px-4 py-2">
            Connect Wallet
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

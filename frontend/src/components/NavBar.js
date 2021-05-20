import React, { Component } from "react";
import logo from "../components/FYP Logo.ico";

/* Simple navigation bar on top of the website (UI)*/
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-custom nav-color ">
        <div className="navbar-brand navbar-customs logo nav-adjust">
          <a href="/">
            <img
              src={logo}  /* Website Logo */
              width="85"
              alt=""
              className="d-inline-block align-lef mr-2"
            ></img>
          </a>
          <a href="/" className="top style3">
            BLOCKY-RESUME  {/* Website Name */}
          </a> 
        </div>

        <div>
          <a className="top" href="/">
            ACCOUNT ADDRESS : {this.props.cbAddress} {/* ETH Wallet Address(MetaMask) */}
          </a>
        </div>
      </nav>
    );
  }
}

export default NavBar;

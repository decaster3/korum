import React from "react"
import logo from "../styles/logo.png"
import {Web3Provider} from "react-web3"

const Wrapper = props => (
  <Web3Provider>
    <div>
      <nav className="navbar">
        <ul className="nav">
          <div className="navbar-brand">
            <img src={logo} width="80" height="70" alt="" />
          </div>
        </ul>
      </nav>
      <div className="container top-margin">{props.children}</div>
    </div>
  </Web3Provider>
)

export default Wrapper

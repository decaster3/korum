import React from "react"
import logo from "../styles/logo.png"

const Wrapper = props => (
  <div>
    <nav className="navbar">
      <ul className="nav">
        <li className="nav-item">
          <div className="navbar-brand">
            <img src={logo} width="40" height="35" alt="" />
          </div>
        </li>
        <li className="nav-item d-flex align-items-center">
          <div className="menu icon" />
        </li>
      </ul>
    </nav>
    <div className="container top-margin">{props.children}</div>
  </div>
)

export default Wrapper

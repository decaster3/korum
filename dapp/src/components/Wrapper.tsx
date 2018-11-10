import React from "react"
import logo from "../styles/logo.png"

const Wrapper = props => (
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
)

export default Wrapper

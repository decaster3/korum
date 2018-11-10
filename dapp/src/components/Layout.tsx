import React from "react"
import {Route, Switch} from "react-router-dom"
import Station from "./Station"
import Operator from "./Operator"
import Consumer from "./Consumer"
import Wrapper from "./Wrapper"

const Layout = () => (
  <Wrapper>
    <Switch>
      <Route path="/" exact={true} component={Station} />
      <Route path="/operator" exact={true} component={Operator} />
      <Route path="/consumer" exact={true} component={Consumer} />
    </Switch>
  </Wrapper>
)

export default Layout

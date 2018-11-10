import React from "react"
import {Route, Switch} from "react-router-dom"
import Station from "./Station"
import Operator from "./Operator"
import Wrapper from "./Wrapper"

const Layout = () => (
  <Wrapper>
    <Switch>
      <Route path="/" exact={true} component={Station} />
      <Route path="/operator" exact={true} component={Operator} />
    </Switch>
  </Wrapper>
)

export default Layout

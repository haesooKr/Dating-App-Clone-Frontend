import React from "react";
import './App.scss';

import {
  NavBar,
  Home,
  Login,
  Find,
  Matches,
  Room,
  Profile,
  Delete,
  Register,
} from "./Components";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { UnPrivateRoute, PrivateRoute } from './hocs'

function App() {
  return (
    <Router>
      <NavBar />
      <Route exact path="/" component={Home} />
      <UnPrivateRoute path="/login" component={Login} />
      <UnPrivateRoute path="/register" component={Register} />
      <PrivateRoute path="/find" roles={["user"]} component={Find} />
      <PrivateRoute path="/matches" roles={["user"]} component={Matches} />
      <PrivateRoute path="/profile" roles={["user"]} component={Profile} />
      <PrivateRoute path="/delete" roles={["user"]} component={Delete} />
      <PrivateRoute path="/room/:roomId" roles={["user"]} component={Room} />
    </Router>
  );
}

export default App;

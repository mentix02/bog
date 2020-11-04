import React from "react";

import Home from "./pages/Home";
import Write from "./pages/Write";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import PostDetail from "./pages/PostDetail";

import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

const BaseRouter = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/sign-in" component={SignIn} />
    <Route path="/sign-up" component={SignUp} />
    <Route path="/post/:slug" component={PostDetail} />
    <Route path="/profile/:slug" component={Profile} />
    <Route path="/not-found" component={NotFound} />
    <PrivateRoute>
      <Route path="/write" component={Write} />
      <Route path="/dashboard" component={Dashboard} />
    </PrivateRoute>
    <Route component={NotFound} />
  </Switch>
);

export default BaseRouter;

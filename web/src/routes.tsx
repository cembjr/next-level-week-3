import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LandingPage } from "./pages/Landing";
import { OrphanagesMapPage } from "./pages/OrphanagesMap";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/orphanages" component={OrphanagesMapPage} />
      </Switch>
    </BrowserRouter>
  );
};

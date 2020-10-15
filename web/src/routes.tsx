import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateOrphanage from "./pages/CreateOrphanage/CreateOrphanage";
import { LandingPage } from "./pages/Landing";
import Orphanage from "./pages/Orphanage/Orphanage";
import { OrphanagesMapPage } from "./pages/OrphanagesMap";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/app" component={OrphanagesMapPage} />
        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
};

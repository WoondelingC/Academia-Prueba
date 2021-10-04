import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { HashRouter as Router, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import AppTaks from "../components/Taks/AppTaks";
import { AuthRouter } from "./AuthRouter";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";
import { login } from "../actions/auth";
import Loading from "../components/Loading";
import { ListarCard } from "../actions/cardAction";
import Pokemon from "../components/app/Pokemon";
import Pokedex from "../components/app/Pokedex";

const AppRouter = () => {
  const [checking, setChecking] = useState(true);
  const [isLooggedIn, setsIsLoogedIn] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setsIsLoogedIn(true);
        dispatch(ListarCard(user.uid));
      } else {
        setsIsLoogedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking]);

  if (checking) {
    return <Loading />;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRouter
            path="/auth"
            component={AuthRouter}
            isAuthenticated={isLooggedIn}
          />

          <PrivateRouter
            exact
            path="/agregar"
            component={AppTaks}
            isAuthenticated={isLooggedIn}
          />

          <PrivateRouter
            exact
            path="/"
            component={Pokedex}
            isAuthenticated={isLooggedIn}
          />

          <PrivateRouter
            exact
            path="/:pokemonId"
            component={Pokemon}
            isAuthenticated={isLooggedIn}
          />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;

import { Routes } from "../enums/enums";
import { useDispatch, useSelector } from "react-redux";
import React, { FC, useEffect, useState } from "react";
import { RootState } from "@reducers/combinedReducers";
import {
  Route,
  Redirect,
  RouteProps,
  useHistory, 
  RouteComponentProps,
} from "react-router";
import { UpdateTransitionAction } from "@actions/updateTransition";

const AuthenticateRoute: FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isAuth, setAuth] = useState(true);
  const [isAuthLoaded, setAuthLoaded] = useState(false);
  const token = useSelector((state: RootState) => state.token.token);
  const transitionState = useSelector((state: RootState) => state.transition) as any;

  useEffect(() => {
    determineAuth();
    history.listen((location: any) => {
      dispatch(UpdateTransitionAction(true))
    });
  }, [history]);

  if (!Component) {
    return null;
  }

  async function determineAuth() {
    if (token?.token === null) {
      setAuth(false);
      history.push(`/${Routes.Unauthorized}`);
    }
    setAuthLoaded((prevState) => !prevState);
  }

  return (
    <React.Fragment>
      {isAuthLoaded ? (
        <Route
          {...rest}
          render={(props: RouteComponentProps<{}>) =>
            isAuth ? (
              <Component {...props} />
            ) : (
              {
                /*<Redirect
                to={{
                  pathname: `/${Routes.Unauthorized}`,
                  state: { from: 'props.location' },
                }}
              />*/
              }
            )
          }
        />
      ) : null}
    </React.Fragment>
  );
};

export default AuthenticateRoute;

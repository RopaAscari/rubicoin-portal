import styled from "styled-components";
import { Routes } from "../enums/enums";
import LoginPage from "@pages/Login/Login";
import { useLazyQuery } from "@apollo/client";
import MiningPage from "@pages/Mining/Mining";
import WalletPage from "@pages/Wallet/Wallet";
import { AnimatePresence } from "framer-motion";
import SearchWidget from "@pages/Search/Search";
import ProfilePage from "@pages/Profile/Profile";
import { GET_USER_WALLET } from "@queries/queries";
import React, { useEffect, useState } from "react";
import SettingsPage from "@pages/Settings/Settings";
import RegisterPage from "@pages/Register/Register";
import NotFoundPage from "@pages/NotFound/NotFound";
import { useDispatch, useSelector } from "react-redux";
import DashboardPage from "@pages/Dashboard/Dashboard";
import { RootState } from "@reducers/combinedReducers";
import AuthenticateRoute from "../utils/routeAuthentication";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UnauthorizedPage from "@pages/Unauthorized/Unauthorized";
import { DashboardLayout } from "@layouts/AppLayout/DashboardLayout";
import RenderDelegate from "../components/RenderDelegate/RenderDelegate";
import AddPaymentMethodPage from "@pages/Wallet/AddPaymentMethod/AddPaymentMethod";
import ResetPasswordPage from "@pages/ForgetPassword/ResetPassword/ResetPassword";
import SendVerificationCodePage from "@pages/ForgetPassword/SendVerificationCode/SendVerificationCode";
import ValidateVerificationCodePage from "@pages/ForgetPassword/ValidateVerificationCode/ValidateVerificationCode";
import { SetWalletAction } from "@actions/setWalletAction";

type Props = {};
const BaseContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette,
}));

export const Router: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useState("");
  const [getUserWallet] = useLazyQuery(GET_USER_WALLET);
  const user = useSelector((state: RootState) => state.user?.user);
  const walletState = useSelector((state: RootState) => state.wallet?.wallet);

  useEffect(() => {
    if (user?.walletConnected as boolean) {
      getWalletData();
    }
  }, []);

  const getWalletData = async () => {
    const wallet = await (
      await getUserWallet({ variables: { uid: user?.id } })
    ).data.getUserWallet;

    dispatch(SetWalletAction({ ...wallet, ...{ isHidden: walletState?.isHidden }}));
  };

  return (
    <BaseContainer>
      <BrowserRouter>
        <AnimatePresence exitBeforeEnter>
          <Switch>
            <Route
              path={`${Routes.Base}/${Routes.Login}`}
              component={LoginPage}
            />
            <Route
              path={`${Routes.Base}/${Routes.Register}`}
              component={RegisterPage}
            />
            <Route
              path={`${Routes.Base}/${Routes.Unauthorized}`}
              component={UnauthorizedPage}
            />
            <Route
              path={`/${Routes.App}`}
              render={({ match: { url } }) => (
                <DashboardLayout onSearch={(param) => setSearchParam(param)}>
                  <RenderDelegate
                    condition={searchParam.length > 0}
                    renderComponent={<SearchWidget param={searchParam} />}
                    fallBackComponent={
                      <React.Fragment>
                        <AuthenticateRoute
                          path={`${url}/${Routes.Dashboard}`}
                          component={DashboardPage}
                        />

                        <Route
                          path={`${url}/${Routes.Wallet}`}
                          render={({ match: { url } }) => (
                            <React.Fragment>
                              <AuthenticateRoute
                                exact
                                path={`${url}`}
                                component={WalletPage}
                              />
                              <AuthenticateRoute
                                exact
                                path={`${url}/${Routes.AddPaymentMethod}`}
                                component={AddPaymentMethodPage}
                              />{" "}
                            </React.Fragment>
                          )}
                        />

                        <AuthenticateRoute
                          path={`${url}/${Routes.Mining}`}
                          component={MiningPage}
                        />

                        <AuthenticateRoute
                          path={`${url}/${Routes.Settings}`}
                          component={SettingsPage}
                        />

                        <AuthenticateRoute
                          path={`${url}/${Routes.Profile}`}
                          component={ProfilePage}
                        />
                      </React.Fragment>
                    }
                  ></RenderDelegate>
                </DashboardLayout>
              )}
            />

            <Route
              path={`/${Routes.ForgetPassword}`}
              render={({ match: { url } }) => (
                <>
                  <Route
                    path={`${url}/${Routes.SendCode}`}
                    component={SendVerificationCodePage}
                  />

                  <Route
                    path={`${url}/${Routes.VerifyCode}`}
                    component={ValidateVerificationCodePage}
                  />

                  <Route
                    path={`${url}/${Routes.ResetPassword}`}
                    component={ResetPasswordPage}
                  />
                </>
              )}
            />
            <Route path={Routes.Base} render={({ match: { url } }) => <></>} />
            <Route component={NotFoundPage} />
          </Switch>
        </AnimatePresence>
      </BrowserRouter>
    </BaseContainer>
  );
};

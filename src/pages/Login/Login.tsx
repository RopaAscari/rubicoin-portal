import * as React from "react";
import { History } from "history";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import MDBox from "@components/MDBox";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import { Routes } from "../../enums/enums";
import MDButton from "@components/MDButton";
import { useMutation } from "@apollo/client";
import { InputAdornment } from "@mui/material";
import MDTypography from "@components/MDTypography";
import { AUTHETICATE_USER } from "@queries/queries";
import { useDispatch, useSelector } from "react-redux";
import { SetUserAction } from "@actions/setUserAction";
import { motion, AnimatePresence } from "framer-motion";
import { SetTokenAction } from "@actions/setTokenAction";
import { parseGQLErrors, sanitizeJWT } from "@utils/index";
import bgImage from "@assets/images/intial-background.jpg";
import BasicLayout from "@layouts/BasicLayout/BasicLayout";
import { CustomInput, Field } from "@components/Field/Field";
import { Email } from "@styled-icons/material-outlined/Email";
import { getUserIPAddress } from "../../provider/api/getUserIpAddress";
import RenderDelegate from "@components/RenderDelegate/RenderDelegate";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

type Props = {
  history: History;
};

const LoginPage: React.FunctionComponent<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({} as any);

  const [rememberMe, setRememberMe] = useState(false);
  const [authenticate] = useMutation(AUTHETICATE_USER);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = async(event: any) => {
    event.preventDefault();

    setErrors({});
    setLoading((prevstate) => !prevstate);

    const ipAddress = (await getUserIPAddress()).ipAddress
    // eslint-disable-next-line no-console
    authenticate({
      variables: { email, password, ipAddress },
    })
      .then((response) => {
        const token = response.data.authenticateUser.token;
        const user = sanitizeJWT(jwtDecode(token));

        dispatch(SetUserAction(user));
        dispatch(
          SetTokenAction({
            token: token,
            refreshToken: null,
          })
        );

        setLoading((prevstate) => !prevstate);

        props.history.push(`${Routes.App}/${Routes.Dashboard}`);
      })
      .catch((error) => {
        const message = parseGQLErrors(error);

        setErrors({
          message: message,
        });

        toast.error(message);
        setLoading((prevstate) => !prevstate);
      });
  };

  return (
    <BasicLayout image={bgImage}>
      <AnimatePresence>
        <motion.aside
          initial={{ x: 500 }}
          animate={{
            x: 0,
            transition: { duration: 0.5, type: "spring" },
          }}
          exit={{
            x: -500,
            transition: { duration: 0.5, type: "spring" },
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Card>
              <MDBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MDTypography
                  variant="h4"
                  fontWeight="medium"
                  color="white"
                  mt={1}
                >
                  Sign in
                </MDTypography>

                {/*<Grid
                  container
                  spacing={3}
                  justifyContent="center"
                  sx={{ mt: 1, mb: 2 }}
                >
                  <Grid item xs={2}>
                    <MDTypography
                      component={MuiLink}
                      href="#"
                      variant="body1"
                      color="white"
                    >
                      <FacebookIcon color="inherit" />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MDTypography
                      component={MuiLink}
                      href="#"
                      variant="body1"
                      color="white"
                    >
                      <GitHubIcon color="inherit" />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MDTypography
                      href="#"
                      color="white"
                      variant="body1"
                      component={MuiLink}
                    >
                      <GoogleIcon color="inherit" />
                    </MDTypography>
                  </Grid>
                </Grid>*/}
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <CustomInput
                      fullWidth
                      type="text"
                      label="Email"
                      error={Object.keys(errors).length > 0}
                      onChange={(
                        e: React.ChangeEvent<
                          HTMLTextAreaElement | HTMLInputElement
                        >
                      ) => setEmail(e.target.value)}

                      inputProps={{
                        endAdornment: (
                           <InputAdornment position="start">
                             {" "}
                             <Email size={23} />
                           </InputAdornment>
                         ),
                       }}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <CustomInput
                      fullWidth
                      label="Password"
                      hasPassword={true}
                      error={Object.keys(errors).length > 0}
                      onChange={(
                        e: React.ChangeEvent<
                          HTMLTextAreaElement | HTMLInputElement
                        >
                      ) => setPassword(e.target.value)}
                      helperText={errors.message}
                    />
                  </MDBox>
                  <Box display="flex"></Box>
                  <Grid
                    container
                    spacing={24}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Grid item xs>
                      <MDBox display="flex" alignItems="center" ml={-1}>
                        <Switch
                          color="info"
                          checked={rememberMe}
                          onChange={handleSetRememberMe}
                        />
                        <MDTypography
                          color="text"
                          variant="button"
                          fontWeight="regular"
                          onClick={handleSetRememberMe}
                          sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                        >
                          &nbsp;&nbsp;Remember me
                        </MDTypography>
                      </MDBox>
                    </Grid>

                    <Grid
                      xs
                      item
                      container
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <MDTypography
                        color="text"
                        variant="button"
                        fontWeight="regular"
                        sx={{ cursor: "pointer", userSelect: "none" }}
                        onClick={() =>
                          props.history.push(
                            `${Routes.ForgetPassword}/${Routes.SendCode}`
                          )
                        }
                      >
                        Forgot Password?
                      </MDTypography>
                    </Grid>
                  </Grid>

                  <MDBox mt={4} mb={1}>
                    <MDButton
                      disabled={loading}
                      variant="gradient"
                      color="info"
                      onClick={handleSubmit}
                      fullWidth
                    >
                      <RenderDelegate
                        condition={loading}
                        fallBackComponent={<span>Sign In</span>}
                        renderComponent={
                          <CircularProgress color="info" size={25} />
                        }
                      />
                    </MDButton>
                  </MDBox>
                  <MDBox mt={3} mb={1} textAlign="center">
                    <MDTypography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <MDTypography
                        color="info"
                        textGradient
                        component={Link}
                        variant="button"
                        fontWeight="medium"
                        sx={{ cursor: "pointer" }}
                        onClick={() => props.history.push(`${Routes.Register}`)}
                      >
                        Sign up
                      </MDTypography>
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Box>
        </motion.aside>
      </AnimatePresence>
    </BasicLayout>
  );
};

export default LoginPage;

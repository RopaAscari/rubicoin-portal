import * as React from "react";
import jwtDecode from "jwt-decode";
import toast from "react-hot-toast";
import Link from "@mui/material/Link";
import MDBox from "@components/MDBox";
import MDInput from "@components/MDInput";
import { useDispatch } from "react-redux";
import { Routes } from "../../enums/enums";
import MDButton from "@components/MDButton";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import Checkbox from "@mui/material/Checkbox";
import SendIcon from '@mui/icons-material/Send';
import { useFormControls } from "@utils/useForm";
import { REGISTER_USER } from "@queries/queries";
import MDTypography from "@components/MDTypography";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Card, CircularProgress, InputAdornment } from "@mui/material";
import { SetUserAction } from "@actions/setUserAction";
import { motion, AnimatePresence } from "framer-motion";
import { SetTokenAction } from "@actions/setTokenAction";
import { parseGQLErrors, sanitizeJWT } from "@utils/index";
import bgImage from "@assets/images/bg-sign-in-basic.jpeg";
import BasicLayout from "@layouts/BasicLayout/BasicLayout";
import RenderDelegate from "@components/RenderDelegate/RenderDelegate";

type Props = {
  history: any;
};

const RegisterPage: React.FunctionComponent<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const [register] = useMutation(REGISTER_USER);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { errors, formIsValid, handleInputValue, handleFormSubmit } =
    useFormControls();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setLoading((prevstate) => !prevstate);

    register({
      variables: {
        email,
        lastName,
        password,
        firstName,
        phoneNumber,
      },
    })
      .then((response) => {
        const token = response.data.registerUser.token;
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
        toast.error(parseGQLErrors(error));
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
          <Card>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={-3}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography
                variant="h4"
                fontWeight="medium"
                color="white"
                mt={1}
              >
                Join us today
              </MDTypography>
              <MDTypography
                display="block"
                variant="body1"
                color="white"
                my={1}
              >
                Creating an account is fast and simple.
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput
                    fullWidth
                    type="firstName"
                    label="First Name"
                    id="outlined-error"
                    error={Object.keys(errors).length > 0}
                    onChange={(e: any) => setFirstName(e.target.value)}
                    //helperText={errors.length > 0 ? errors.email : ""}
                  />
                </MDBox>

                <MDBox mb={2}>
                  <MDInput
                    fullWidth
                    type="lastName"
                    label="Last Name"
                    id="outlined-error"
                    error={Object.keys(errors).length > 0}
                    onChange={(e: any) => setLastName(e.target.value)}
                    // FormHelperTextProps={{ backgroundColor: "red" }}
                    //helperText={errors.length > 0 ? errors.email : ""}
                  />
                </MDBox>

                <MDBox mb={2}>
                  <MDInput
                    fullWidth
                    type="phoneNumber"
                    id="outlined-error"
                    label="Phone Number"
                    error={Object.keys(errors).length > 0}
                    onChange={(e: any) => setPhoneNumber(e.target.value)}
                    // FormHelperTextProps={{ backgroundColor: "red" }}
                    //helperText={errors.length > 0 ? errors.email : ""}
                  />
                </MDBox>

                <MDBox mb={2}>
                  <MDInput
                    fullWidth
                    type="email"
                    label="Email"
                    id="outlined-error"
                    error={Object.keys(errors).length > 0}
                    onChange={(e: any) => setEmail(e.target.value)}
                    // FormHelperTextProps={{ backgroundColor: "red" }}
                    //helperText={errors.length > 0 ? errors.email : ""}
                  />
                </MDBox>

                <MDBox mb={2}>
                  <MDInput
                    fullWidth
                    type="password"
                    label="Password"
                    id="outlined-error"
                    error={Object.keys(errors).length > 0}
                    onChange={(e: any) => setPassword(e.target.value)}
                    // FormHelperTextProps={{ backgroundColor: "red" }}
                    //helperText={errors.length > 0 ? errors.email : ""}
                  />
                </MDBox>

                <MDBox display="flex" alignItems="center" ml={-1}>
                  <Checkbox />
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                  >
                    &nbsp;&nbsp;I agree the&nbsp;
                  </MDTypography>
                  <MDTypography
                    component="a"
                    href="#"
                    variant="button"
                    fontWeight="bold"
                    color="info"
                    textGradient
                  >
                    Terms and Conditions
                  </MDTypography>
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                    <RenderDelegate
                      condition={loading}
                      fallBackComponent={<span>Sign Up</span>}
                      renderComponent={
                        <CircularProgress color="inherit" size={25} />
                      }
                    />
                  </MDButton>
                </MDBox>
                <MDBox mt={3} mb={1} textAlign="center">
                  <MDTypography variant="button" color="text">
                    Already have an account?{" "}
                    <MDTypography
                      color="info"
                      textGradient
                      component={Link}
                      variant="button"
                      fontWeight="medium"
                      sx={{ cursor: "pointer" }}
                      onClick={() => props.history.push(`${Routes.Login}`)}
                    >
                      Sign In
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </motion.aside>
      </AnimatePresence>
    </BasicLayout>
  );
};

export default RegisterPage;

import * as React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Card } from "@mui/material";
import MDBox from "@components/MDBox";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import MDButton from "@components/MDButton";
import Timer from "@components/Timer/Timer";
import { useMutation } from "@apollo/client";
import { parseGQLErrors } from "@utils/index";
import ReactCodeInput from "react-code-input";
import { Routes, VerificationTypes } from "@enums/enums";
import MDTypography from "@components/MDTypography";
import { RootState } from "@reducers/combinedReducers";
import BasicLayout from "@layouts/BasicLayout/BasicLayout";
import bgImage from "@assets/images/intial-background.jpg";
import RenderDelegate from "@components/RenderDelegate/RenderDelegate";
import { VERIFY_CODE, SEND_VERIFICATION_CODE } from "@queries/queries";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { History } from "history";

const inputProps = {
  //  className: reactCodeInput,
  inputStyle: {
    fontFamily: "monospace",
    margin: "6px",
    MozAppearance: "textfield",
    width: "30px",
    borderRadius: "3px",
    fontSize: "14px",
    height: "45px",
    paddingLeft: "7px",
    backgroundColor: "white",
    color: "lightskyblue",
    border: "1px solid lightskyblue",
  },
  inputStyleInvalid: {
    fontFamily: "monospace",
    margin: "4px",
    MozAppearance: "textfield",
    width: "15px",
    borderRadius: "3px",
    fontSize: "14px",
    height: "26px",
    paddingLeft: "7px",
    backgroundColor: "black",
    color: "red",
    border: "1px solid red",
  },
};

type Props = {
  history: History;
};

export default function ValidateVerificationCodePage({ history }: Props) {
  
  const [code, setPinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verifyEmailCode] = useMutation(VERIFY_CODE);
  const [btnIsPressed, setBtnIsPressed] = useState(false);
  const [isVerifyingCode, setVerifyCodeState] = useState(false);
  const [sendVerificationCode] = useMutation(SEND_VERIFICATION_CODE);
  const [isResettingPassword, setResetPasswordState] = useState(false);

  const email = useSelector((state: RootState) => state.recovery.recovery?.email);

  const sendCode = () => {
    setLoading((prevState) => !prevState);

    sendVerificationCode({
      variables: {
        email,
        phoneNumber,
        verficationType: VerificationTypes.Email,
      },
    })
      .then((response) => {
        if (response.data.sendVerificationCode.success) {

          setLoading((prevState) => !prevState);
          toast.success("Your code was sent to your email address");
          history.push(`/${Routes.ForgetPassword}/${Routes.ResetPassword}`);
        }
      })
      .catch((error) => {
        setLoading((prevState) => !prevState);
        toast.error(parseGQLErrors(error));
      });
  };

  const verifyCode = () => {
    setLoading((prevState) => !prevState);

    verifyEmailCode({
      variables: {
        email,
        code,
      },
    })
      .then((response) => {
        if (response.data.verifyCode.verified) {
          setLoading((prevState) => !prevState);

          history.push(`/${Routes.ForgetPassword}/${Routes.ResetPassword}`);
        }
      })
      .catch((error) => {
        setLoading((prevState) => !prevState);
        toast.error(parseGQLErrors(error));
      });
  };

  const handlePinChange = (pinCode: string) => {
    setPinCode(pinCode);
    setBtnIsPressed(false);
  };

  return (
    <BasicLayout image={bgImage}>
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
            py={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
              Verify Code
            </MDTypography>
            <MDTypography display="block" variant="body1" color="white" my={1}>
              Enter the verficiation code in your email address
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={4}>
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{}}
                >
                  <ReactCodeInput
                    fields={6}
                    type="text"
                    name="code"
                    value={code}
                    isValid={true}
                    inputMode="numeric"
                    onChange={handlePinChange}   
                    style={{ borderWidth: 0 }}    
                         
                  />
                </Grid>

                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{}}
                >
                  {" "}
                  <Timer resendCode={sendCode} />
                </Grid>
              </MDBox>
              <MDBox mt={2} mb={1}>
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  onClick={verifyCode}
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading || code.length < 6}
                >
                  <RenderDelegate
                    condition={loading}
                    fallBackComponent={<span>Confirm</span>}
                    renderComponent={
                      <CircularProgress color="info" size={25} />
                    }
                  />
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </motion.aside>
    </BasicLayout>
  );
}

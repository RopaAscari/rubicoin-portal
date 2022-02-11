import * as React from "react";
import { useState } from "react";
import { History } from "history";
import toast from "react-hot-toast";
import MDBox from "@components/MDBox";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import MDButton from "@components/MDButton";
import { useMutation } from "@apollo/client";
import { parseGQLErrors } from "@utils/index";
import MDTypography from "@components/MDTypography";
import { Routes, VerificationTypes } from "@enums/enums";
import { SEND_VERIFICATION_CODE } from "@queries/queries";
import BasicLayout from "@layouts/BasicLayout/BasicLayout";
import bgImage from "@assets/images/intial-background.jpg";
import { Card, Grid, InputAdornment } from "@mui/material";
import { CustomInput, Field } from "@components/Field/Field";
import { Email } from "@styled-icons/material-outlined/Email"
import { ArrowBack } from "@styled-icons/ionicons-solid/ArrowBack";
import { SetRecoveryOptions } from "@actions/setRecoveryOptions";
import RenderDelegate from "@components/RenderDelegate/RenderDelegate";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

type Props = {
  history: History;
};

export const Back = styled(ArrowBack)`
  color: white;
  margin-top: 1rem;
  margin-right: 1rem;
  font-weight: bold;
`;

export default function SendVerificationCodePage({ history }: Props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sendVerificationCode] = useMutation(SEND_VERIFICATION_CODE);

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

          dispatch(
            SetRecoveryOptions({
              email,
              phoneNumber,
              verficationType: VerificationTypes.Email,
            })
          );

          toast.success("Your code was sent to your email address");
          history.push(`/${Routes.ForgetPassword}/${Routes.VerifyCode}`);
        }
      })
      .catch((error) => {
        setLoading((prevState) => !prevState);
        toast.error(parseGQLErrors(error));
      });
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
            <Grid container justifyContent="center" >
              

              <MDTypography
                variant="h3"
                fontWeight="medium"
                color="white"
                mt={1}
              >
                Reset Password
              </MDTypography>
            </Grid>
            <MDTypography display="block" variant="body1" color="white" my={1}>
              You will receive an e-mail in maximum 60 seconds
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={4}>
                <CustomInput
                  fullWidth
                  type="text"
                  label="Email"
                  placeholder="Enter your email address"
                  onChange={(e: any) => setEmail(e.target.value)}
                  inputProps={{ endAdornment: (  <InputAdornment position="start"> <Email size={20}/></InputAdornment>)}}                                       
                />
              </MDBox>
              <MDBox mt={6} mb={1}>
                <MDButton
                  fullWidth
                  color="info"
                  disabled={loading}
                  variant="gradient"
                  onClick={sendCode}
                >
                  <RenderDelegate
                    condition={loading}
                    fallBackComponent={<span>Send Code</span>}
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

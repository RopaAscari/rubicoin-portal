import * as React from "react";
import { useState } from "react";
import { History } from "history";
import toast from "react-hot-toast";
import { Card, CircularProgress } from "@mui/material";
import MDBox from "@components/MDBox";
import { Routes } from "@enums/enums";
import { motion } from "framer-motion";
import MDInput from "@components/MDInput";
import MDButton from "@components/MDButton";
import { useMutation } from "@apollo/client";
import { parseGQLErrors } from "@utils/index";
import { RESET_PASSWORD } from "@queries/queries";
import MDTypography from "@components/MDTypography";
import BasicLayout from "@layouts/BasicLayout/BasicLayout";
import bgImage from "@assets/images/bg-sign-in-basic.jpeg";
import RenderDelegate from "@components/RenderDelegate/RenderDelegate";
import { RootState } from "@reducers/combinedReducers";
import { useSelector } from "react-redux";

type Props = {
  history: History;
};

export default function ResetPasswordPage({ history }: Props) {

  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetPassword] = useMutation(RESET_PASSWORD);

  const email = useSelector((state: RootState) => state.recovery.recovery?.email);

  const resetUserPassword = () => {
    setLoading((prevState) => !prevState);

    resetPassword({
      variables: {
        email,
        oldPassword,
        newPassword,
      },
    })
      .then((response) => {
        if (response.data.resetPassword) {
          setLoading((prevState) => !prevState);

          toast.success("Your password was successfully changed");

          setTimeout(() => {
            history.push(`/${Routes.Login}`);
          }, 1500);
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
            <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
              Reset Password
            </MDTypography>
            <MDTypography display="block" variant="body1" color="white" my={1}>
              Enter your old and new passwords below
            </MDTypography>
          </MDBox>

          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={4}>
                <MDInput
                  fullWidth
                  type="password"
                  variant="outlined"
                  label="Old Password"
                  onChange={(e: any) => setOldPassword(e.target.value)}
                />
              </MDBox>

              <MDBox mb={4}>
                <MDInput
                  fullWidth
                  type="password"
                  variant="outlined"
                  label="New Password"
                  onChange={(e: any) => setNewPassword(e.target.value)}
                />
              </MDBox>

              <MDBox mt={6} mb={1}>
                <MDButton disabled={loading} variant="gradient" color="info" fullWidth onClick={resetUserPassword}>
                  <RenderDelegate
                    condition={loading}
                    fallBackComponent={<span>Submit</span>}
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

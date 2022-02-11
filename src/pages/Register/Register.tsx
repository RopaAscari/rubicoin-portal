import * as yup from "yup";
import * as React from "react";
import jwtDecode from "jwt-decode";
import toast from "react-hot-toast";
import Link from "@mui/material/Link";
import MDBox from "@components/MDBox";
import { useForm } from "react-hook-form";
import MDButton from "@components/MDButton";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import Checkbox from "@mui/material/Checkbox";
import { REGISTER_USER } from "@queries/queries";
import MDTypography from "@components/MDTypography";
import { CustomInput } from "@components/Field/Field";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { SetUserAction } from "@actions/setUserAction";
import { motion, AnimatePresence } from "framer-motion";
import { SetTokenAction } from "@actions/setTokenAction";
import { parseGQLErrors, sanitizeJWT } from "@utils/index";
import bgImage from "@assets/images/intial-background.jpg";
import BasicLayout from "@layouts/BasicLayout/BasicLayout";
import { PasswordField, Routes } from "../../enums/enums";
import { Email } from "@styled-icons/material-outlined/Email";
import { Password } from "@styled-icons/material-rounded/Password";
import { PersonBadge } from "@styled-icons/bootstrap/PersonBadge";
import CountrySelect from "@components/CountrySelect/CountrySelect";
import RenderDelegate from "@components/RenderDelegate/RenderDelegate";
import { getUserIPAddress } from "../../provider/api/getUserIpAddress";
import ProvinceSelect from "@components/ProvinceSelect/ProvinceSelect";
import { TelephoneInboundFill } from "@styled-icons/bootstrap/TelephoneInboundFill";
import {
  Card,
  InputAdornment,
  CircularProgress,
  FormHelperText,
} from "@mui/material";

type Props = {
  history: any;
};

const RegisterPage: React.FunctionComponent<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [registerUser] = useMutation(REGISTER_USER);

  const [country, setCountry] = useState([] as any);
  const [province, setProvince] = useState([] as any);
  const [currentProvinces, setCurrentProvinces] = useState([] as any);

  const passwordRegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const SignupSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(phoneRegExp, "Phone number is not valid"),
    email: yup
      .string()
      .email("Email address is invalid")
      .max(255)
      .required("Email is required"),
    password: yup
      .string()
      .required()
      .min(8, "Must be at least 8 characters")
      .matches(
        passwordRegExp,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    country: yup.array().required("Country is required"),
    province: yup.string().required("Province is required"),
    termsAgreed: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .default(false),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const handleRegistration = async (data: any) => {
    setLoading((prevstate) => !prevstate);

    const country = {
      name: data.country[0],
      code: data.country[1],
    };

    const userIP = await getUserIPAddress();

    registerUser({
      variables: {
        email: data.email, 
        lastName: data.lastName,
        password: data.password,
        province: data.province,  
        countryName: country.name,
        countryCode: country.code,
        firstName: data.firstName,
        ipAddress: userIP.ipAddress,
        phoneNumber: data.phoneNumber,
        termsAgreed: data.termsAgreed,
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
                  <CustomInput
                    fullWidth
                    type="text"
                    label="First Name"
                    placeholder="Enter your first name"
                    helperText={errors?.firstName?.message}
                    error={errors?.firstName?.message !== undefined}
                    {...register("firstName", {
                      required: true,
                      maxLength: 80,
                    })}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          {" "}
                          <PersonBadge size={20} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </MDBox>

                <MDBox mb={2}>
                  <CustomInput
                    fullWidth
                    type="text"
                    label="Last Name"
                    placeholder="Enter your last name"
                    helperText={errors?.lastName?.message}
                    error={errors?.lastName?.message !== undefined}
                    {...register("lastName", { required: true, maxLength: 80 })}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          {" "}
                          <PersonBadge size={20} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </MDBox>

                <MDBox mb={2}>
                  <CustomInput
                    fullWidth
                    type="text"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    helperText={errors?.phoneNumber?.message}
                    error={errors?.phoneNumber?.message !== undefined}
                    {...register("phoneNumber", {
                      required: true,
                      maxLength: 80,
                    })}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          {" "}
                          <TelephoneInboundFill size={20} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </MDBox>

                <MDBox mb={2}>
                  <CustomInput
                    fullWidth
                    type="email"
                    label="Email"
                    helperText={errors?.email?.message}
                    placeholder="Enter your email address"
                    error={errors?.email?.message !== undefined}
                    {...register("email", { required: true, maxLength: 80 })}
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
                    type="password"
                    label="Password"
                    hasPassword={true}
                    placeholder="Enter your password"
                    helperText={errors?.password?.message}
                    error={errors?.password?.message !== undefined}
                    {...register("password", { required: true, maxLength: 80 })}
                    inputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {" "}
                          <Password size={20} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </MDBox>

                <MDBox mb={2}>
                  <CountrySelect
                    name="country"
                    label="Country"
                    placeholder="Select Country"
                    helperText={errors.country?.message}
                    error={errors.country?.message !== undefined}
                    onChange={(e, provinces) => {
                      setCountry(e.target.value);
                      setCurrentProvinces(provinces);
                      setValue("country", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    country={country}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <ProvinceSelect
                    name="province"
                    label="Province"
                    placeholder="Select Province"
                    error={errors.province?.message !== undefined}
                    helperText={errors.province?.message}
                    onChange={(e) => {
                      setProvince(e.target.value);
                      setValue("province", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    selectedProvince={province}
                    provinces={currentProvinces}
                  />
                </MDBox>
                <MDBox display="flex" alignItems="center" ml={-1}>
                  <Checkbox
                    color="info"
                    onChange={(e) => {
                      setValue("termsAgreed", e.target.checked, {
                        shouldValidate: true,
                      });
                    }}
                  />
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

                <RenderDelegate
                  condition={errors?.termsAgreed?.message !== undefined}
                  fallBackComponent={<></>}
                  renderComponent={
                    <FormHelperText sx={{ color: "text.error" }}>
                      {errors?.termsAgreed?.message}
                    </FormHelperText>
                  }
                />

                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    fullWidth
                    onClick={handleSubmit(handleRegistration)}
                  >
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

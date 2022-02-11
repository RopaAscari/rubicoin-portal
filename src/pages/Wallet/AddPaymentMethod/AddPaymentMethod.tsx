import toast from "react-hot-toast";
import MDBox from "@components/MDBox";
import { useSelector } from "react-redux";
import MDButton from "@components/MDButton";
import { useMutation } from "@apollo/client";
import { parseGQLErrors } from "@utils/index";
import { CardForm } from "@constants/constants";
import { Field } from "@components/Field/Field";
import { Routes, Transition } from "@enums/enums";
import "react-credit-cards/es/styles-compiled.css";
import React, { useEffect, useState } from "react";
import Cards, { Focused } from "react-credit-cards";
import { RootState } from "@reducers/combinedReducers";
import { useHistory, useLocation } from "react-router";
import { CREATE_PAYMENT_METHOD } from "@queries/queries";
import HOCWrapper from "@components/HOCWrapper/HOCWrapper";
import CountrySelect from "@components/CountrySelect/CountrySelect";
import RenderDelegate from "@components/RenderDelegate/RenderDelegate";
import ProvinceSelect from "@components/ProvinceSelect/ProvinceSelect";
import { Grid, CircularProgress, styled, TextField } from "@mui/material";
import usePreviousLocation from "@components/UsePreviousLocation/usePreviousLocation";


type Props = {};

const AddPaymentMethodPage: React.FC<Props> = () => {
  const history = useHistory();
  const [errors, setErrors] = useState({
    cvc: { message: null, hasError: true },
    city: { message: null, hasError: true },
    name: { message: null, hasError: true },
    number: { message: null, hasError: true },
    expiry: { message: null, hasError: true },
    address: { message: null, hasError: true },
    country: { message: null, hasError: true },
    province: { message: null, hasError: true },
    postalCode: { message: null, hasError: true },
  } as CardForm);

  const [interaction, setInteraction] = useState(false);

  const [cvc, setCvc] = useState("");
  const [focused,   setFocused] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [currentProvinces, setCurrentProvinces] = useState([] as any);

  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState([] as any);
  const [province, setProvince] = useState([] as any);
  const [postalCode, setPostalCode] = useState("");

  const [issuer, setIssuer] = useState("");
  const prevLocation = usePreviousLocation();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user?.user);
  const [createPaymentMethod] = useMutation(CREATE_PAYMENT_METHOD);

  const handleInputFocus = (e: any) => {
    setFocused(e.target.name);
  };

  const validationHandler = (field: string, value: string) => {
    if (field == "cvc") {
      let message = null;
      let hasError = false;

      if (value.length > 0 && value.length !== 3) {
        hasError = true;
        message = "CVC must be 3 digits";
      } else if (value.length === 0) {
        hasError = true;
        message = "CVC is required";
      }

      setErrors({ ...errors, ...{ cvc: { message, hasError } } });
    }

    if (field == "number") {
      let message = null;
      let hasError = false;

      if (value.length > 0 && value.length !== 16) {
        hasError = true;
        message = "Card number must be 16 digits";
      } else if (value.length === 0) {
        hasError = true;
        message = "Card number is required";
      }

      setErrors({ ...errors, ...{ number: { message, hasError } } });
    }

    if (field == "expiry") {
      let message = null;
      let hasError = false;

      if (
        value.substring(2, 4) <
        new Date().getFullYear().toString().substring(2, 4)
      ) {
        hasError = true;
        message = "Expiry Date cannot be in the past";
      } else if (value.length === 0) {
        hasError = true;
        message = "Expiry Date is required";
      }

      setErrors({ ...errors, ...{ expiry: { message, hasError } } });
    }

    if (field == "name") {
      let message = null;
      let hasError = false;

      if (value.length === 0) {
        hasError = true;
        message = "Name is required";
      }

      setErrors({ ...errors, ...{ name: { message, hasError } } });
    }

    if (field == "address") {
      let message = null;
      let hasError = false;

      if (value.length === 0) {
        hasError = true;
        message = "Address is required";
      }

      setErrors({ ...errors, ...{ address: { message, hasError } } });
    }

    if (field == "city") {
      let message = null;
      let hasError = false;

      if (value.length === 0) {
        hasError = true;
        message = "City is required";
      }

      setErrors({ ...errors, ...{ city: { message, hasError } } });
    }

    if (field == "province") {
      let message = null;
      let hasError = false;
      

      if (value.length === 0) {
        hasError = true;
        message = "Province is required";
      }

      setErrors({ ...errors, ...{ province: { message, hasError } } });
    }

    if (field == "country") {
      let message = null;
      let hasError = false;
      if (value.length === 0) {
        hasError = true;
        message = "Country is required";
      }

      setErrors({ ...errors, ...{ country: { message, hasError } } });
    }

    if (field == "postalCode") {
      let message = null;
      let hasError = false;

      if (value.length === 0) {
        hasError = true;
        message = "Postal Code is required";
      }

      setErrors({ ...errors, ...{ postalCode: { message, hasError } } });
    }
  };

  const validator = (
    event: React.ChangeEvent<HTMLInputElement> | any,
    stateDispatcher: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const field = event.target.name;
    const value = event.target.value;

    setInteraction(true);
    stateDispatcher(value);
    validationHandler(field, value);
  };

  const isFormValid = () => {
    return Object.values(errors).every(
      (error: any) => error.hasError === false
    );
  };

  const isEmpty = (value: string) => {
    return value == "" || value == null || value == undefined;
  };

  const formatExpiryDate = (date: string) => {
    if (date.length === 2) {
    }
  };

  const addPaymentMethod = () => {
    setLoading((prevState) => !prevState);

    createPaymentMethod({
      variables: {
        uid: user?.id,
        cvc,
        city,
        issuer,
        address,
        cardNumber,
        expiryDate,
        postalCode,
        cardHolderName,
        country:country[0],
        province : province[0],      
      },
    })
      .then((response) => {
        if (response.data.createPaymentMethod) {
          toast.success("Card added");
          setLoading((prevState) => !prevState);

          setTimeout(() => {
            navigateBack();
          }, 1000);
        } else {
          toast.error("Card couldn't be added.");
        }
      })
      .catch((error) => {
        toast.error(parseGQLErrors(error));
        setLoading((prevState) => !prevState);
      });
  };

  const navigateBack = () => {
    history.push(`/${Routes.App}/${Routes.Wallet}`, {
      from: Routes.AddPaymentMethod,
    });
  };

  return (
    <HOCWrapper transition={Transition.Horizontal}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <Cards
            cvc={cvc}
            name={cardHolderName}
            preview={true}
            expiry={expiryDate}
            number={cardNumber}
            focused={focused as Focused}
            callback={(data, isValid) => {
              setIssuer(data.issuer);
            }}
          />
        </Grid>

        <Grid container spacing={3} ml={2} mt={3} sx={{ width: 600 }}>
          <Grid item xs={0} md={5}>
            <Field
              type="tel"
              color="info"
              name="number"
              label="Card Number"
              inputProps={{
                maxLength: 16,
                borderColor: "red",
                autoComplete: "off",
              }}
              placeholder="Card Number"
              autoComplete="new-password"
              onFocus={handleInputFocus}
              InputLabelProps={{
                sx:(theme) =>  ({
                  color: "label.main",
                })
              }}
              error={errors.number?.message !== null}
              helperText={errors.number?.message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                validator(e, setCardNumber)
              }
            />
          </Grid>
          <Grid item xs={0} md={5}>
            <Field
              type="tel"
              color="info"
              name="expiry"
              label="Expiry Date"
              placeholder="Expiry Date"
              onFocus={handleInputFocus}
              inputProps={{ maxLength: 4 }}
              InputLabelProps={{
                sx:(theme) =>  ({
                  color: "label.main",
                })
              }}
              error={errors.expiry?.message !== null}
              helperText={errors.expiry?.message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                validator(e, setExpiryDate)
              }
            />
          </Grid>
          <Grid item xs={0} md={5}>
            <Field
              type="tel"
              name="cvc"
              label="CVC"
              color="info"
              placeholder="CVC"
              inputProps={{ maxLength: 3 }}
              onFocus={handleInputFocus}
              InputLabelProps={{
                sx:(theme) =>  ({
                  color: "label.main",
                })
              }}
              error={errors.cvc?.message !== null}
              helperText={errors.cvc?.message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                validator(e, setCvc)
              }
            />
          </Grid>
          <Grid item xs={0} md={5}>
            <Field
              type="text"
              name="name"
              color="info"
              label="Card Holder Name"
              onFocus={handleInputFocus}
              placeholder="Card Holder Name"
              InputLabelProps={{
                sx:(theme) =>  ({
                  color: "label.main",
                })
              }}
              error={errors.name?.message !== null}
              helperText={errors.name?.message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                validator(e, setCardHolderName)
              }
            />
          </Grid>

          <Grid item xs={12}>
            {/*
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveCard" value="yes" />
              }
              label="By continuing you agree to our terms and conditions"
            />*/}
          </Grid>
        </Grid>
      </Grid>
      <Grid container alignItems="center" justifyContent="center">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ width: "60%", marginTop: 3 }}
        >
          <Field
            fullWidth
            type="text"
            color="info"
            name="address"
            label="Billing Address"
            InputLabelProps={{
              sx:(theme) =>  ({
                color: "label.main",
              })
            }}
            placeholder="Billing Address"
            onFocus={handleInputFocus}
            error={errors.address?.message !== null}
            helperText={errors.address?.message}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              validator(e, setAddress)
            }
          />

          <Grid
            item
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%", marginTop: 5 }}
          >
            <Field
              fullWidth
              color="info"
              type="text"
              name="city"
              label="City"
              placeholder="City"
              InputLabelProps={{
                sx:(theme) =>  ({
                  color: "label.main",
                })
              }}
              style={{ marginRight: 10 }}
              onFocus={handleInputFocus}
              error={errors.city?.message !== null}
              helperText={errors.city?.message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                validator(e, setCity)
              }
            />
            <Field
              fullWidth
              type="text"
              color="info"
              label="Postal Code"
              name="postalCode"
              style={{ marginLeft: 10 }}
              placeholder="Postal Code"
              onFocus={handleInputFocus}
              InputLabelProps={{
                sx:(theme) =>  ({
                  color: "label.main",
                })
              }}
              error={errors.postalCode?.message !== null}
              helperText={errors.postalCode?.message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                validator(e, setPostalCode)
              }
            />
          </Grid>
          <Grid
            item
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%", marginTop: 5 }}
          >
            <CountrySelect
              name="country"
              label="Country"
              placeholder="Select Country"
              onFocus={handleInputFocus}
              style={{ marginRight: 10 }}
              error={errors.province?.message !== null}
              helperText={errors.province?.message}
              onChange={(country, provinces) => {
                validator(country, setCountry);
                setCurrentProvinces(provinces);
              }}
              country={country}
            />

            <ProvinceSelect
              name="province"
              label={'Province'}
              placeholder="Select Province"
              onFocus={handleInputFocus}
              style={{ marginRight: 10 }}
              error={errors.province?.message !== null}
              onChange={(province) => {
                validator(province, setProvince);
              }}
              selectedProvince={province}
              provinces={currentProvinces}
            />
          </Grid>

          <Grid
            container
            alignItems="space-between"
            justifyContent="space-between"
          >
            <MDBox mt={4} mb={1} sx={{ width: 150 }}>
              <MDButton
                fullWidth
                color="error"
                variant="contained"
                onClick={navigateBack}
              >
                <span>Cancel</span>
              </MDButton>
            </MDBox>
            <MDBox mt={4} mb={1} sx={{ width: 150 }}>
              <MDButton
                fullWidth
                color="info"
                variant="gradient"
                disabled={!isFormValid() || loading}
                onClick={addPaymentMethod}
              >
                <RenderDelegate
                  condition={loading}
                  fallBackComponent={<span>Add</span>}
                  renderComponent={<CircularProgress color="info" size={25} />}
                />
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>
      </Grid>
    </HOCWrapper>
  );
};

export default AddPaymentMethodPage;

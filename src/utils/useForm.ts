import React from "react";

const initialFormValues = {
  lastName: "",
  password: "",
  email: "",
  message: "",
  firstName: "",
  phoneNumber: "",
  success: false,
  formSubmitted: false,
};

export const useFormControls = () => {
  // We'll update "values" as the form updates
  const [values, setValues] = React.useState(initialFormValues);
  // "errors" is used to check the form for errors
  const [errors, setErrors] = React.useState({} as any);
  const validate: any = (fieldValues = values) => {
    let temp: any = { ...errors };

    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "This field is required.";

    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "This field is required.";

    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required.";
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Email is not valid.";
    }

    if ("phoneNumber" in fieldValues) {
      temp.phoneNumber = fieldValues.phoneNumber
        ? ""
        : "This field is required.";
      if (fieldValues.phoneNumber)
        temp.phoneNumber = fieldValues.phoneNumber.match(
          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        )
          ? ""
          : "Phone number is not valid.";
    }

    if ("password" in fieldValues) {
      temp.password = fieldValues.password ? "" : "This field is required.";
      if (fieldValues.password)
        temp.password =
          fieldValues.password.length >= 8
            ? ""
            : "Password must be 8 characters long.";
    }

    if ("message" in fieldValues)
      temp.message = fieldValues.message ? "" : "This field is required.";

    setErrors({
      ...temp,
    });
    // this function will check if the form values are valid
  };
  const handleInputValue: any = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
    // this function will be triggered by the text field's onBlur and onChange events
  };
  const handleFormSubmit = async (e: any) => {
    // this function will be triggered by the submit event
  };
  const formIsValid = (): boolean => {
    return Object.values(errors).every((x) => x === "");
    // this function will check if the form values and return a boolean value
  };
  return {
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    errors,
  };
};

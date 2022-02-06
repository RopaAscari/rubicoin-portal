import { styled } from "@mui/material/styles";
import errorIcon from '@assets/images/error-icon.jpg';
import TextField, { TextFieldProps } from "@mui/material/TextField";

type Props = {
  ownerState: any;
};

export default styled<any>(TextField)(({ theme, ownerState }) => {
  const { palette, functions } = theme;
  const { error, success, disabled } = ownerState;

  const {
    grey,
    transparent,
    error: colorError,
    success: colorSuccess,
  } = palette;
  const { pxToRem } = functions;

  // styles for the input with error={true}
  const errorStyles = () => ({
    backgroundImage:
      `url(${errorIcon})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: `right ${pxToRem(12)} top ${pxToRem(12)}`,
    backgroundSize: `${pxToRem(25)} ${pxToRem(25)}`,

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: colorError.main,
    },
    "& .Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline, &:after": {
        borderColor: colorError.main,
      },
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: colorError.main,
    },
  });

  // styles for the input with success={true}
  const successStyles = () => ({
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'%3E%3Cpath fill='%234CAF50' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: `right ${pxToRem(12)} center`,
    backgroundSize: `${pxToRem(16)} ${pxToRem(16)}`,


   
    "& .Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline, &:after": {
        borderColor: colorSuccess.main,
      },
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: colorSuccess.main,
    },
  });

  return {
    backgroundColor: disabled ? `${grey[200]} !important` : transparent.main,
    pointerEvents: disabled ? "none" : "auto",
    ...(error && errorStyles()),
    ...(success && successStyles()),
  };
});

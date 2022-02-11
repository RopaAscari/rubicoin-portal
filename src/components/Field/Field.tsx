import { useSelector } from "react-redux";
import { PasswordField } from "@enums/enums";
import { forwardRef, useState } from "react";
import { INPUT_THEME } from "@constants/constants";
import { RootState } from "@reducers/combinedReducers";
import RenderDelegate from "@components/RenderDelegate/RenderDelegate";
import { Visibility } from "@styled-icons/material-twotone/Visibility";
import { IconButton, InputAdornment, styled, TextField } from "@mui/material";
import { VisibilityOff } from "@styled-icons/material-twotone/VisibilityOff";

type Props = {
  type: any;
  inputProps: any;
  hasPassword: boolean;
};

export const Field = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#308AF9",
  },
  // "& .MuiFormLabel-root": {
  //   color: "red",
  // },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#4D4E4F",
    },
    color: "white",
    background: "#0c0c0c",
    borderRadius: 10,
    "&:hover fieldset": {
      color: "white",
      borderColor: "#308AF9",
    },
    "&.Mui-focused fieldset": {
      color: "white",
      borderColor: "#308AF9",
    },
  },
}));

export const CustomInput = forwardRef<typeof TextField, Props>(
  ({ hasPassword, inputProps, type, ...rest }: Props, ref) => {
    const [passwordState, setPasswordState] = useState({
      visible: false,
      field: PasswordField.PASSWORD,
    });

    const theme = useSelector((state: RootState) => state.theme.theme.name);

    return (
      <Field
        {...rest}
        type={hasPassword? passwordState.field : type}
        ref={ref as any}
        InputLabelProps={INPUT_THEME[theme]}
        InputProps={
          hasPassword
            ? {...{
                endAdornment: (
                  <InputAdornment position="end">
                    <RenderDelegate
                      condition={!passwordState.visible}
                      renderComponent={
                        <IconButton
                          onClick={() =>
                            setPasswordState({
                              visible: true,
                              field: PasswordField.TEXT,
                            })
                          }
                        >
                          <Visibility size={25} />
                        </IconButton>
                      }
                      fallBackComponent={
                        <IconButton
                          onClick={() =>
                            setPasswordState({
                              visible: false,
                              field: PasswordField.PASSWORD,
                            })
                          }
                        >
                          <VisibilityOff size={25} />
                        </IconButton>
                      }
                    />
                  </InputAdornment>
                ),
              }, ...{inputProps }}
            : inputProps
        }
      />
    );
  }
) as any;

import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,

  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { useSelector } from "react-redux";
import { INPUT_THEME } from "@constants/constants";
import { RootState } from "@reducers/combinedReducers";
import { makeStyles } from '@mui/styles';

type Props = {
  name: any;
  label: any;
  error?: any;
  style?: any;
  provinces: any;
  helperText?: any;
  placeholder: any;
  selectedProvince: any;
  onFocus?: (e: any) => void;
  onChange: (province: any) => void;
};

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  inputLabel: {
    color: "lightgray",
    "&.Mui-focused": {
      color: "orange"
    }
  },
  select: {
    color: "black",
    "&:before": {
      // changes the bottom textbox border when not focused
      borderColor: "red"
    },
    "&:after": {
      // changes the bottom textbox border when clicked/focused.  thought it would be the same with input label
      borderColor: "green"
    }
  }
}));

const Menu = styled(MenuItem)(({ theme }) => ({
  menu: {
    "& .MuiPaper-root": {
      backgroundColor: "lightblue",
    },
  },
}));

const ProvinceSelect: React.FC<Props> = ({
  name,
  error,
  label,
  onFocus,
  onChange,
  provinces,
  helperText,
  placeholder,
  selectedProvince,
}: Props) => {
  const classes = useStyles();
  const theme = useSelector((state: RootState) => state.theme.theme.name);

  return (
    <FormControl sx={{ width: "100%" }}>
      <Select
        name={name}
        label={label}
        displayEmpty
        //className={classes.select}
        error={error}
        onFocus={onFocus}
        onChange={onChange}
        inputProps={{
          ...INPUT_THEME[theme],
          ...{
            "aria-label": "Without label",
            bgColor: "black",
          },
        }}
        value={selectedProvince}
        sx={{
          background: (theme) => theme.palette.background.default,
          fieldset: {
            border: "1px solid #3A3A3A",
          },
          "&:hover": {
            "&& fieldset": {
              border: "1px solid #308AF9",
            },
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              "& .MuiMenuItem-root.Mui-selected": {
                backgroundColor: "#343434",
              },
              "& .MuiMenuItem-root:hover": {
                backgroundColor: "#343434",
              },
              "& .MuiMenuItem-root.Mui-selected:hover": {
                backgroundColor: "#343434",
              },
            },
          },
        }}
      >
        <Menu
          value=""
          sx={{
            background: (theme: any) => theme.palette.background.default,
          }}
        >
          <em>{placeholder}</em>
        </Menu>
        {provinces.map((province: any, index: any) => {
          return (
            <Menu
              sx={{
                background: (theme: any) => theme.palette.background.default,
              }}
              value={province[0]}
            >
              {province[0]}
            </Menu>
          );
        })}
      </Select>
      <FormHelperText sx={{ color: "text.error" }}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default ProvinceSelect;

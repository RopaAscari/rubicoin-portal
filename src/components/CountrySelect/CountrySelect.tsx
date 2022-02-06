import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { allCountries } from "country-region-data";

type Props = {
  name: any;
  error: any;
  style: any;
  country: any;
  classes?: any;
  helperText: any;
  placeholder: any;
  onFocus: (e: any) => void;
  onChange: (country: any, province: any) => void;
};

const Menu = styled(MenuItem)(({ theme }) => ({
  menu: {
    "& .MuiPaper-root": {
      backgroundColor: "lightblue",
    },
  },
}));

const SelectApi = styled(Select)(({ theme }) => ({
  select: {
    "&:before": {
      borderColor: "red",
    },
    "&:hover:not(.Mui-disabled):before": {
      borderColor: "red",
    },
  },
}));

const styles = (theme: any) => ({
  select: {
    "&:before": {
      borderColor: "red",
    },
  },
});

const CountrySelect: React.FC<Props> = ({
  name,
  error,
  country,
  onFocus,
  onChange,
  placeholder,
  helperText,
}: Props) => {
  return (
    <FormControl sx={{ width: "100%", marginRight: 1 }}>
      <SelectApi
        name={name}
        displayEmpty
        error={error}
        value={country}
        onFocus={onFocus}
        onChange={(e: any) => {
          const name = e.target.name;
          const value = e.target.value;
          const country = { target: { name: name, value: value } };

          const provinces = value[2];
          onChange(country, provinces);
        }}
        sx={{
          background: (theme) => theme.palette.background.default,
          "fieldset": {
            border: "1px solid #3A3A3A"
          },
          "&:hover": {
            "&& fieldset": {
              border: "1px solid #308AF9",
            },
          },
        }}
        inputProps={{
          "aria-label": "Without label",
          bgColor: "black",
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              "& .MuiMenuItem-root.Mui-selected": {
                  
                backgroundColor: "#343434",
              },
              "& .MuiMenuItem-root:hover": {
                color:"red",
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
        disabled={true}
          value=""
          sx={{
             
            background: (theme) => theme.palette.background.default,
          }}
        >
          <em>{placeholder}</em>
        </Menu>
        {allCountries.map((country: any, index) => {
          return (
            <Menu
              sx={{
                background: (theme) => theme.palette.background.default,
              }}
              value={country}
            >
              {country[0]}
            </Menu>
          );
        })}
      </SelectApi>
      <FormHelperText sx={{ color: "text.error" }}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default CountrySelect;

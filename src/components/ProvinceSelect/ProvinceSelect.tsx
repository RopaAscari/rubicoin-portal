import React, { useState } from "react";
import { FormControl, FormHelperText, MenuItem, Select, styled } from "@mui/material";

type Props = {
  name: any;
  error: any;
  style: any;
  provinces: any;
  helperText?: any;
  placeholder: any;
  selectedProvince: any;
  onFocus : (e:any) => void;
  onChange: (province: any) => void;
};

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
  onFocus,
  onChange,
  provinces,
  helperText, 
  placeholder,
  selectedProvince,
}: Props) => {
  return (
    <FormControl sx={{ width: "100%", marginLeft: 1 }}>
      <Select
        name={name}
        displayEmpty
        error={error}
        onFocus={onFocus}
        onChange={onChange}
        value={selectedProvince}
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
            background: (theme) => theme.palette.background.default,
          }}
        >
          <em>{placeholder}</em>
        </Menu>
        {provinces.map((province: any, index: any) => {
          return (
            <Menu
              sx={{
                background: (theme) => theme.palette.background.default,
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

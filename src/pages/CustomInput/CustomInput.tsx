import * as React from 'react';
import { useInput } from '@mui/base';
import { styled } from '@mui/system';

const blue = {
  200: '#80BFFF',
  400: '#3399FF',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledInputElement = styled('input')(
  ({ theme }) => `
  width: 100%;
  font-size: 0.875rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.5;
  color: white;
  background: black;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 8px;
  padding: 12px 12px;
  transition: all 200ms ease;

  &:hover {
    background: black;
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:focus {
    outline: 0.5px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
    outline-offset: 0.5px;
  }
`,
);

export const CustomInput = React.forwardRef(function CustomInput(props: any, ref: any) {
  const { getRootProps, getInputProps } = useInput(props as any, ref as any);

  return (
    <div {...getRootProps()}>
      <StyledInputElement {...props} {...getInputProps()} />
    </div>
  );
});

import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import AppLogo from '@assets/images/logo.png';

type Props  = {
  sx: any
};

export default function Logo({ sx }: Props) {
  return <Box component="img" src={AppLogo} sx={{ width: 40, height: 40, ...sx }} />;
}

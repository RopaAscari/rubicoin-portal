import PropTypes from 'prop-types';
// material
import { useMediaQuery } from '@mui/material';

// ----------------------------------------------------------------------

type Width =  'xsDown' | 'smDown' | 'mdDown' | 'lgDown' | 'xlDown' |'xsUp' |'smUp' |'mdUp' | 'lgUp' | 'xlUp'

type Props = {
  width: Width,
  children: any
}


export default function MHidden({ width, children }: Props) {
  const breakpoint = width.substring(0, 2);

  const hiddenUp = useMediaQuery((theme: any) => theme.breakpoints.up(breakpoint));
  const hiddenDown = useMediaQuery((theme: any) => theme.breakpoints.down(breakpoint));

  if (width.includes('Down')) {
    return hiddenDown ? null : children;
  }

  if (width.includes('Up')) {
    return hiddenUp ? null : children;
  }

  return null;
}

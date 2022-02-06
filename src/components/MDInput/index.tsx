
import { forwardRef } from "react";
import MDInputRoot from "@components/MDInput/MDInputRoot";

const defaultProps: any = {
  error: false,
  success: false,
  disabled: false,
}

type Props = {
  error: boolean,
  success: boolean,
  disabled: boolean,
}

const MDInput = forwardRef(({ error, success, disabled, ...rest }:Props, ref) => (
  <MDInputRoot {...rest} ref={ref as any} ownerState={{ error, success, disabled }} />
)) as any;

MDInput.defaultProps = defaultProps;
export default MDInput;

import { forwardRef } from "react";
import MDButtonRoot from "@components/MDButton/MDButtonRoot";

type Size = "small" | "medium" | "large";
type Variant = "text" | "contained" | "outlined" | "gradient";
type Color =
  | "white"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "light"
  | "dark";

type Props = {
  size: Size;
  color: Color;
  variant: Variant;
  circular: boolean;
  iconOnly: boolean;
  children?: React.ReactNode;
};

const MDButton = forwardRef(
  (
    { color, variant, size, circular, iconOnly, children, ...rest }: Props,
    ref
  ) => {
    // const [controller] = useMaterialUIController();
    // const { darkMode } = controller;

    return (
      <MDButtonRoot
        {...rest}
        ref={ref as any}
        color="primary"
        variant={variant === "gradient" ? "contained" : variant}
        size={size}
        ownerState={{ color, variant, size, circular, iconOnly }}
      >
        {children}
      </MDButtonRoot>
    );
  }
) as any;

// Setting default values for the props of MDButton
MDButton.defaultProps = {
  size: "medium",
  variant: "contained",
  color: "white",
  circular: false,
  iconOnly: false,
};

export default MDButton;

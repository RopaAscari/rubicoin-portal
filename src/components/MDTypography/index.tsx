import { forwardRef } from "react";
import PropTypes from "prop-types";
import MDTypographyRoot from "./MDTypographyRoot";
import { useMaterialUIController } from "@context/index";

const defaultProps: any = {
  color: "dark",
  fontWeight: false,
  textTransform: "none",
  verticalAlign: "unset",
  textGradient: false,
  opacity: 1,
};

type FontWeight = "light" | "regular" | "medium" | "bold";
type TextTransform = "none" | "capitalize" | "uppercase" | "lowercase";
type VerticalAlign =
  | "unset"
  | "baseline"
  | "sub"
  | "super"
  | "text-top"
  | "text-bottom"
  | "middle"
  | "top"
  | "bottom";

type Props = {
  color: string;
  fontWeight: FontWeight;
  textTransform: TextTransform;
  verticalAlign: VerticalAlign;
  textGradient: boolean;
  children?: React.ReactNode;
  opacity: number;
};

const MDTypography = forwardRef(
  (
    {
      color,
      fontWeight,
      textTransform,
      verticalAlign,
      textGradient,
      opacity,
      children,
      ...rest
    }: Props,
    ref
  ) => {
    //  const [controller] = useMaterialUIController();
    //  const { darkMode } = controller;

    return (
      <MDTypographyRoot
        {...rest}
        ref={ref as any}
        ownerState={{
          color,
          textTransform,
          verticalAlign,
          fontWeight,
          opacity,
          textGradient,
          // darkMode,
        }}
      >
        {children}
      </MDTypographyRoot>
    );
  }
) as any;

MDTypography.defaultProps = defaultProps;
export default MDTypography;

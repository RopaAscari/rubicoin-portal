import { BoxTypeMap } from "@mui/material";
import { forwardRef } from "react";
import MDBoxRoot from "./MDBoxRoot";

const defaultProps: any = {
  opacity: 1,
  color: "dark",
  shadow: "none",
  borderRadius: "none",
  bgColor: "transparent",
  variant: "contained" as Variant,
  coloredShadow: "none" as ColoredShadow,
};

type Variant = "contained" | "gradient";
type ColoredShadow =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "light"
  | "dark"
  | "none";

type Props = {
  color: string;
  shadow: string;
  bgColor: string;
  opacity: number;
  variant: Variant;
  borderRadius: string;
  children?: React.ReactNode;
  coloredShadow: ColoredShadow;
}  & BoxTypeMap;

const MDBox = forwardRef(
  (
    {
      variant,
      bgColor,
      color,
      opacity,
      borderRadius,
      shadow,
      coloredShadow,
      ...rest
    }: Props,
    ref
  ) => (
    <MDBoxRoot
      {...rest}
      ref={ref}
      ownerState={{
        color,
        variant,
        bgColor,
        shadow,
        opacity,
        borderRadius,
        coloredShadow,
      }}
    />
  )
) as any;


MDBox.defaultProps = defaultProps;

export default MDBox;

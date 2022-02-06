import PropTypes from "prop-types";
import { useEffect } from "react";
import MDBox from "@components/MDBox";
import { useLocation } from "react-router-dom";
import { useMaterialUIController, setLayout } from "@context/index";

type Props = {
  children: any;
  background: "white" | "light" | "default";
};

function PageLayout({ background, children }: Props) {
  const [, dispatch] = useMaterialUIController();
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "page");
  }, [pathname]);

  return (
    <MDBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgColor={background}
      sx={{ overflowX: "hidden" }}
    >
      {children}
    </MDBox>
  );
}

PageLayout.defaultProps = {
  background: "default",
};

export default PageLayout;

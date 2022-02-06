
import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import MDBox from "@components/MDBox";
import Container from "@mui/material/Container";
import MDTypography from "@components/MDTypography";
import typography from "@theme/shared/base/typography";

type Props = { light: boolean };

function Footer({ light }: Props) {
  const { size } = typography;

  return (
    <MDBox position="absolute" width="100%" bottom={0} py={4}>
      <Container>
        <MDBox
          width="100%"
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          alignItems="center"
          px={1.5}
        >
          <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            color={light ? "white" : "text"}
            fontSize={size.sm}
          >
          Rubicoin © {new Date().getFullYear()} . All Rights Reserved   
          </MDBox>
          <MDBox
            component="ul"
            sx={({ breakpoints }: any) => ({
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              listStyle: "none",
              mt: 3,
              mb: 0,
              p: 0,

              [breakpoints.up("lg")]: {
                mt: 0,
              },
            })}
          >
            <MDBox component="li" pr={2} lineHeight={1}>
 
            </MDBox>
            <MDBox component="li" px={2} lineHeight={1}>

            </MDBox>
            <MDBox component="li" px={2} lineHeight={1}>
              
            </MDBox>
            <MDBox component="li" pl={2} lineHeight={1}>
              
            </MDBox>
          </MDBox>
        </MDBox>
      </Container>
    </MDBox>
  );
}

// Setting default props for the Footer
Footer.defaultProps = {
  light: false,
};

export default Footer;

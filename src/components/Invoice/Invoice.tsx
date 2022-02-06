import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MDBox from "@components/MDBox";
import MDTypography from "@components/MDTypography";
import {FileEarmarkPdfFill} from '@styled-icons/bootstrap/FileEarmarkPdfFill'

type Props = {
  id: string;
  date: string;
  price: string;
  noGutter: boolean;
};

function Invoice({ date, id, price, noGutter }: Props) {
  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      mb={noGutter ? 0 : 1}
    >
      <MDBox lineHeight={1.125}>
        <MDTypography display="block" variant="button" fontWeight="light" sx={{color: 'text.primary'}}>
          {date}
        </MDTypography>
        <MDTypography variant="caption" fontWeight="regular" color="text">
          {id}
        </MDTypography>
      </MDBox>
      <MDBox display="flex" alignItems="center">
        <MDTypography variant="button" fontWeight="regular" color="text">
          {price}
        </MDTypography>
        <MDBox
          display="flex"
          alignItems="center"
          lineHeight={1}
          ml={3}
          sx={{ cursor: "pointer" }}
        >
          <FileEarmarkPdfFill size="20"/>
          <MDTypography variant="button" fontWeight="bold">
            &nbsp;PDF
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

Invoice.defaultProps = {
  noGutter: false,
};

export default Invoice;

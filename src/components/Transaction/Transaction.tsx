import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MDBox from "@components/MDBox";
import MDButton from "@components/MDButton";
import MDTypography from "@components/MDTypography";
import { Color } from "@constants/constants";

type Props = {
  name: any;
  icon: any;
  value:  any;
  color: Color;
  description: string;
};

function Transaction({ color, icon, name, description, value }: Props) {
  return (
    <MDBox key={name} component="li" py={1} pr={2} mb={1} sx={{ color :'text.primary'}}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <MDBox display="flex" alignItems="center">
          <MDBox mr={2}>
            <MDButton variant="outlined" color={color} iconOnly circular>
              <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
            </MDButton>
          </MDBox>
          <MDBox display="flex" flexDirection="column">
            <MDTypography variant="button" fontWeight="medium" gutterBottom sx={{ color :'text.primary'}}>
              {name}
            </MDTypography>
            <MDTypography variant="caption" color="text" fontWeight="regular" sx={{ color :'text.primary'}}>
              {description}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDTypography variant="button" color={color} fontWeight="medium" textGradient sx={{ color :'text.primary'}}>
          {value}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}


export default Transaction;

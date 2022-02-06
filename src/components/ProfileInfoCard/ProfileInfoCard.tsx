/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import { Avatar, Box, Button, Typography } from "@mui/material";

// Material Dashboard 2 PRO React base styles

import pxToRem from "../../utils";

const socialMediaColors: any = {
  facebook: {
    main: "#3b5998",
    dark: "#344e86",
  },

  twitter: {
    main: "#55acee",
    dark: "#3ea1ec",
  },

  instagram: {
    main: "#125688",
    dark: "#0e456d",
  },

  linkedin: {
    main: "#0077b5",
    dark: "#00669c",
  },

  pinterest: {
    main: "#cc2127",
    dark: "#b21d22",
  },

  youtube: {
    main: "#e52d27",
    dark: "#d41f1a",
  },

  vimeo: {
    main: "#1ab7ea",
    dark: "#13a3d2",
  },

  slack: {
    main: "#3aaf85",
    dark: "#329874",
  },

  dribbble: {
    main: "#ea4c89",
    dark: "#e73177",
  },

  github: {
    main: "#24292e",
    dark: "#171a1d",
  },

  reddit: {
    main: "#ff4500",
    dark: "#e03d00",
  },

  tumblr: {
    main: "#35465c",
    dark: "#2a3749",
  },
}

function ProfileInfoCard({ title, description, info, social, action, shadow }: any) {
  const labels: any = [];
  const values: any = [];


  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/)) as any;
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label: any, key: any) => (
    <Box key={label} display="flex" py={1} pr={2}>
      <Typography variant="button" fontWeight="bold" >
        {label}: &nbsp;
      </Typography>
      <Typography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </Typography>
    </Box>
  ));

  // Render the card social media icons
  const renderSocial = social.map(({ link, icon, color }: any) => (
    <Box
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={pxToRem(18)}
      color={socialMediaColors[color]?.main}
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </Box>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow:  "none" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <Typography variant="h6" fontWeight="medium" >
          {title}
        </Typography>
        <Typography component={Link} to={action.route} variant="body2" color="secondary">
          <Tooltip title={action.tooltip} placement="top">
            <Icon>edit</Icon>
          </Tooltip>
        </Typography>
      </Box>
      <Box p={2}>
        <Box mb={2} lineHeight={1}>
          <Typography variant="button" color="text" fontWeight="light">
            {description}
          </Typography>
        </Box>
        <Box >
          <Divider />
        </Box>
        <Box>
          {renderItems}
          <Box display="flex" py={1} pr={2}>
            <Typography variant="button" fontWeight="bold" >
              social: &nbsp;
            </Typography>
            {renderSocial}
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
  shadow: PropTypes.bool,
};

export default ProfileInfoCard;

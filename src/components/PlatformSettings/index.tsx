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

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import { Box, Typography } from "@mui/material";

// Material Dashboard 2 React components


function PlatformSettings() {
  const [followsMe, setFollowsMe] = useState(true);
  const [answersPost, setAnswersPost] = useState(false);
  const [mentionsMe, setMentionsMe] = useState(true);
  const [newLaunches, setNewLaunches] = useState(false);
  const [productUpdate, setProductUpdate] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  return (
    <Card sx={{ boxShadow: "none" }}>
      <Box p={2}>
        <Typography variant="h6" fontWeight="medium">
          platform settings
        </Typography>
      </Box>
      <Box pt={1} pb={2} px={2} lineHeight={1.25}>
        <Typography variant="caption" fontWeight="bold" color="text" >
          account
        </Typography>
        <Box display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <Box mt={0.5}>
            <Switch checked={followsMe} onChange={() => setFollowsMe(!followsMe)} />
          </Box>
          <Box width="80%" ml={0.5}>
            <Typography variant="button" fontWeight="regular" color="text">
              Email me when someone follows me
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <Box mt={0.5}>
            <Switch checked={answersPost} onChange={() => setAnswersPost(!answersPost)} />
          </Box>
          <Box width="80%" ml={0.5}>
            <Typography variant="button" fontWeight="regular" color="text">
              Email me when someone answers on my post
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <Box mt={0.5}>
            <Switch checked={mentionsMe} onChange={() => setMentionsMe(!mentionsMe)} />
          </Box>
          <Box width="80%" ml={0.5}>
            <Typography variant="button" fontWeight="regular" color="text">
              Email me when someone mentions me
            </Typography>
          </Box>
        </Box>
        <Box mt={3}>
          <Typography variant="caption" fontWeight="bold" color="text" >
            application
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <Box mt={0.5}>
            <Switch checked={newLaunches} onChange={() => setNewLaunches(!newLaunches)} />
          </Box>
          <Box width="80%" ml={0.5}>
            <Typography variant="button" fontWeight="regular" color="text">
              New launches and projects
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <Box mt={0.5}>
            <Switch checked={productUpdate} onChange={() => setProductUpdate(!productUpdate)} />
          </Box>
          <Box width="80%" ml={0.5}>
            <Typography variant="button" fontWeight="regular" color="text">
              Monthly product updates
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <Box mt={0.5}>
            <Switch checked={newsletter} onChange={() => setNewsletter(!newsletter)} />
          </Box>
          <Box width="80%" ml={0.5}>
            <Typography variant="button" fontWeight="regular" color="text">
              Subscribe to newsletter
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default PlatformSettings;

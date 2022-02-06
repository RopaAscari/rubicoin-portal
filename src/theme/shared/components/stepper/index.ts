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

// Material Dashboard 2 PRO React base styles
import colors from "@theme/shared/base/colors";
import borders from "@theme/shared/base/borders";
import boxShadows from "@theme/shared/base/boxShadows";

// Material Dashboard 2 PRO React helper functions
import pxToRem from "@theme/shared/functions/pxToRem";
import linearGradient from "@theme/shared/functions/linearGradient";

const { transparent, gradients } = colors;
const { borderRadius } = borders;
const { colored } = boxShadows;

export default {
  styleOverrides: {
    root: {
      background: linearGradient(gradients.info.main, gradients.info.state),
      padding: `${pxToRem(24)} 0 ${pxToRem(16)}`,
      borderRadius: borderRadius.lg,
      boxShadow: colored.info,

      "&.MuiPaper-root": {
        backgroundColor: transparent.main,
      },
    },
  },
};

import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDBox from "@components/MDBox";
import styled from "styled-components";
import MDTypography from "@components/MDTypography";
import pattern from "@assets/images/pattern-tree.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import masterCardLogo from "@assets/images/mastercard.png";
import { Clipboard } from "@styled-icons/bootstrap/Clipboard";
import { Grid, IconButton } from "@mui/material";
import toast from "react-hot-toast";
import { useState } from "react";

const ClipIcon = styled(Clipboard)`
  color: white;
  margin-left: 5px;
`;

type Color =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "dark";

type Props = {
  color: Color;
  number: number;
  holder: string;
  expires: string;
};

function CreditCard({ color, number, holder, expires }: any) {
  const [walletAdress, setWalletAddress] = useState("1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2");
  return (
    <Card
      sx={({
        palette: { gradients },
        functions: { linearGradient },
        boxShadows: { xl },
      }: any) => ({
        background: gradients[color]
          ? linearGradient(gradients[color].main, gradients[color].state)
          : linearGradient(gradients.dark.main, gradients.dark.state),
        boxShadow: xl,
        position: "relative",
      })}
    >
      <MDBox
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        opacity={0.2}
        sx={{
          backgroundImage: `url(${pattern})`,
          backgroundSize: "cover",
        }}
      />
      <MDBox position="relative" zIndex={2} p={2}>
        <MDTypography
          variant="h4"
          color="white"
          fontWeight="medium"
          sx={{ mt: 3, mb: 1, pb: 1 }}
        >
          Wallet Address
        </MDTypography>
        <Grid container>
          <Grid item>
            <MDTypography
              variant="body1"
              color="white"
              sx={{ mt: 1, mb: 5, pb: 1 }}
            >
              {walletAdress}
            </MDTypography>
          </Grid>
          <Grid item>
            <CopyToClipboard text={walletAdress} onCopy={() => toast.success("Copied")}>
              <IconButton>
                <ClipIcon size="22" />
              </IconButton>
            </CopyToClipboard>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

CreditCard.defaultProps = {
  color: "dark",
};

export default CreditCard;

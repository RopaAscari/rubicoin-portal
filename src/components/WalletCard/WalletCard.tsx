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
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { RootState } from "@reducers/combinedReducers";
import { useSelector } from "react-redux";


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

function WalletCard({ color, number, holder, expires, address }: any) {
  const walletState = useSelector(
    (state: RootState) => state.wallet?.wallet
  ) as any;

  const amount = '0.00000000'
  const balance = walletState?.isHidden? amount.replace(/./g, '*') : amount
  return (
    <Card sx={{ boxShadow: 10 }} id="delete-account">
      <MDBox position="relative" zIndex={2} p={2}>
        <MDTypography
          variant="body1"
          fontWeight="light"
          sx={{ color: "text.empty" }}
        >
          Avaliable Balance
        </MDTypography>
        <Grid container>
          <Grid item>
            <MDTypography
              variant="body1"
              color="white"
              sx={{ mt: 1, mb: 5, pb: 1, fontSize: 30 }}
            >
              { balance } BTC
            </MDTypography>
          </Grid>
        </Grid>
        <Button variant="outlined" color="info">
          Withdraw
        </Button>
        <Button variant="outlined" color="info" sx={{ marginLeft: 2 }}>
          Deposit
        </Button>
      </MDBox>
    </Card>
  );
}

WalletCard.defaultProps = {
  color: "dark",
};

export default WalletCard;

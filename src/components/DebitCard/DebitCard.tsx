import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDBox from "@components/MDBox";
import MDButton from "@components/MDButton";
import { CardTypes, Themes } from "@enums/enums";
import VisaLogo from "@assets/images/visa.png";
import MDTypography from "@components/MDTypography";
import pattern from "@assets/images/pattern-tree.svg";
import MasterCardLogo from "@assets/images//mastercard.svg";
import { Delete } from "@styled-icons/fluentui-system-filled/Delete";
import RenderDelegate from "@components/RenderDelegate/RenderDelegate";
import { EditArrowBack } from "@styled-icons/fluentui-system-filled/EditArrowBack";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Grid,
  Modal,
  Slide,
  Typography,
} from "@mui/material";

type Props = {
  card: any;
  color: any;
};

const Transition = React.forwardRef(function Transition(props: any, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DebitCard({ color, card }: Props) {
  const numbers = [...(`${card.cardNumber}` as any)];

  if (numbers.length < 16 || numbers.length > 16) {
    throw new Error(
      "Invalid value for the prop number, the value for the number prop shouldn't be greater than or less than 16 digits"
    );
  }

  const num1 = numbers.slice(0, 4).join("");
  const num2 = numbers.slice(4, 8).join("");
  const num3 = numbers.slice(8, 12).join("");
  const num4 = numbers.slice(12, 16).join("");

  const [isCardDeleteModalOpen, setCardModalOpenOpen] = useState(false);
  const handleCardModalOpen = () => setCardModalOpenOpen(true);
  const handleCardModalClose = () => setCardModalOpenOpen(false);

  const renderCardModal = () => (
    <Dialog
      sx={(theme: any) => ({
        color: theme.palette.base,
      })}
      open={isCardDeleteModalOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCardModalClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        <Typography variant="body1" sx={{ color: "black" }}>
         Card ending in
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want ot remove this payment method
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCardModalClose}>Yes</Button>
        <Button onClick={handleCardModalClose}>No</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Card
      sx={(theme: any) =>
        ({
          background: theme.palette.gradients[color]
            ? theme.functions.linearGradient(
                theme.palette.gradients[color].main,
                theme.palette.gradients[color].state
              )
            : theme.functions.linearGradient(
                theme.palette.gradients.dark.main,
                theme.palette.gradients.dark.state
              ),
          boxShadow: theme.boxShadows.xl,
          position: "relative",
          marginBottom: 3,
        } as any)
      }
    >
      <MDBox
        top={0}
        left={0}
        width="100%"
        height="100%"
        opacity={0.2}
        position="absolute"
        sx={{
          backgroundImage: `url(${pattern})`,
          backgroundSize: "cover",
        }}
      />
      <MDBox position="relative" zIndex={2} p={2}>
        <MDBox color="white" p={1} lineHeight={0} display="inline-block">
          <Icon>wifi</Icon>
        </MDBox>

        <MDBox
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-end"
          mt={{ xs: 2, sm: 0 }}
          ml={{ xs: -1.5, sm: 0 }}
        >
          <MDBox mr={1}>
            <MDButton
              variant="text"
              color="error"
              onClick={handleCardModalOpen}
            >
              <Delete size="25" />
              &nbsp;Delete
            </MDButton>
          </MDBox>
          <MDButton variant="text" color={"dark"}>
            <EditArrowBack size="25" />
            &nbsp;Edit
          </MDButton>
        </MDBox>
        <MDTypography
          variant="h5"
          color="white"
          fontWeight="medium"
          sx={{ mt: 3, mb: 5, pb: 1 }}
        >
          {num1}&nbsp;&nbsp;&nbsp;{num2}&nbsp;&nbsp;&nbsp;{num3}
          &nbsp;&nbsp;&nbsp;{num4}
        </MDTypography>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <MDBox display="flex" alignItems="center">
            <MDBox mr={3} lineHeight={1}>
              <MDTypography
                variant="button"
                color="white"
                fontWeight="regular"
                opacity={0.8}
              >
                Card Holder
              </MDTypography>
              <MDTypography
                variant="h6"
                color="white"
                fontWeight="medium"
                textTransform="capitalize"
              >
                {card.cardHolderName}
              </MDTypography>
            </MDBox>
            <MDBox lineHeight={1}>
              <MDTypography
                variant="button"
                color="white"
                fontWeight="regular"
                opacity={0.8}
              >
                Expires
              </MDTypography>
              <MDTypography variant="h6" color="white" fontWeight="medium">
                {card.expiryDate}
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox display="flex" justifyContent="flex-end" width="20%">
            <RenderDelegate
              condition={card.issuer == CardTypes.Visa}
              renderComponent={
                <MDBox
                  component="img"
                  src={VisaLogo}
                  alt="master card"
                  width="60%"
                  mt={1}
                />
              }
              fallBackComponent={
                <MDBox
                  component="img"
                  src={MasterCardLogo}
                  alt="master card"
                  width="60%"
                  mt={1}
                />
              }
            />
          </MDBox>
        </MDBox>
      </MDBox>
      {renderCardModal()}
    </Card>
  );
}

// Setting default values for the props of MasterCard
DebitCard.defaultProps = {
  color: "dark",
};

// Typechecking props for the MasterCard
DebitCard.propTypes = {
  card: PropTypes.any,
};

export default DebitCard;

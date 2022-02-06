import toast from "react-hot-toast";
import Grid from "@mui/material/Grid";
import MDBox from "@components/MDBox";
import { useLocation } from "react-router";
import { Transition } from "@enums/enums";
import MDButton from "@components/MDButton";
import { parseGQLErrors } from "@utils/index";
import React, { useEffect, useState } from "react";
import { SetUserAction } from "@actions/setUserAction";
import { useDispatch, useSelector } from "react-redux";
import Invoices from "@components/Invoices/Invoices";
import { RootState } from "@reducers/combinedReducers";
import PayeeList from "@components/PayeeList/PayeeList";
import MotionHoc from "@components/MotionHOC/MotionHOC";
import { useLazyQuery, useMutation } from "@apollo/client";
import WalletCard from "@components/WalletCard/WalletCard";
import HOCWrapper from "@components/HOCWrapper/HOCWrapper";
import Transactions from "@components/Transactions/Transactions";
import { CREATE_WALLET, GET_USER_WALLET } from "@queries/queries";
import RenderDelegate from "@components/RenderDelegate/RenderDelegate";
import {
  Backdrop,
  Box,
  Card,
  CircularProgress,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import BillingInformation from "@components/BillingInformation/BillingInformation";
import usePreviousLocation from "@components/UsePreviousLocation/usePreviousLocation";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const WalletPage = () => {
  const dispatch = useDispatch();
  const prevLocation = usePreviousLocation();
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState({} as any);
  const [getUserWallet] = useLazyQuery(GET_USER_WALLET);
  const [createWalletMutation] = useMutation(CREATE_WALLET);
  const user = useSelector((state: RootState) => state.user?.user);
  const walletState = useSelector((state: RootState) => state.wallet?.wallet);

  const [isCardDeleteModalOpen, setCardModalOpenOpen] = React.useState(false);
  const handleCardModalOpen = () => setCardModalOpenOpen(true);
  const handleCardModalClose = () => setCardModalOpenOpen(false);

  const determineTransition = () => {
    if (prevLocation.state?.from) {
      if (["add-payment"].includes(prevLocation.state?.from)) {
        return Transition.Horizontal;
      } else {
        return Transition.Vertical;
      }
    }

    return Transition.Vertical;
  };

  const renderCardModal = () => (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isCardDeleteModalOpen}
      onClose={handleCardModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isCardDeleteModalOpen}>
        <Box sx={modalStyle}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );

  const createWallet = () => {
    setLoading((prevState) => !prevState);

    createWalletMutation({
      variables: { uid: user?.id },
    })
      .then((response) => {
        setTimeout(() => {
          setWallet(response.data.createWallet);

          dispatch(
            SetUserAction({ ...user, ...{ walletConnected: true } } as any)
          );
          setLoading((prevState) => !prevState);
          toast.success("Wallet Created");
        }, 1000);
      })
      .catch((err) => {
        setLoading((prevState) => !prevState);
        toast.success(parseGQLErrors(err));
      });
  };

  return (
    <HOCWrapper transition={determineTransition()}>
      <RenderDelegate
        condition={user?.walletConnected as boolean}
        renderComponent={
          <MDBox
            mt={3}
            sx={{ paddingLeft: 2, paddingRight: 2, height: "100vh" }}
          >
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <Grid container spacing={3}>
                    <Grid item xs={10} xl={6}>
                      <WalletCard
                        color="dark"
                        address={walletState?.walletAddress}
                      />
                      <br></br>
                      <BillingInformation />
                      <br></br>
                    </Grid>
                    <Grid item xs={12} xl={6}>
                      <PayeeList title="Payees" payees={[]} shadow={false} />
                      <br></br>
                      <Invoices invoices={[]} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Transactions transactions={[]} />
                </Grid>
              </Grid>
            </MDBox>
            {renderCardModal()}
          </MDBox>
        }
        fallBackComponent={
          <RenderDelegate
            condition={loading}
            renderComponent={
              <Grid
                container
                spacing={0}
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: "80vh" }}
              >
                <CircularProgress color="success" />
              </Grid>
            }
            fallBackComponent={
              <Grid
                container
                spacing={0}
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: "80vh" }}
              >
                <Box
                  alignItems="center"
                  sx={{ bottom: 30 }}
                  justifyContent="center"
                >
                  <MDButton
                    color="info"
                    variant="contained"
                    onClick={createWallet}
                    style={{ marginLeft: 120, marginBottom: 10 }}
                  >
                    Create Wallet
                  </MDButton>{" "}
                  <Typography variant="body1">
                    {" "}
                    Create a wallet to start making crypto transactions
                  </Typography>
                </Box>
              </Grid>
            }
          />
        }
      />
    </HOCWrapper>
  );
};

//const WalletPageHoc = MotionHoc(WalletPage);

export default WalletPage;

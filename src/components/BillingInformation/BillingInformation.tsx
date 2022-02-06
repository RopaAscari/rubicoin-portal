import Card from "@mui/material/Card";
import MDBox from "@components/MDBox";
import { Routes } from "@enums/enums";
import { useSelector } from "react-redux";
import MDButton from "@components/MDButton";
import { useEffect, useState } from "react";
import MDTypography from "@components/MDTypography";
import { RootState } from "@reducers/combinedReducers";
import DebitCard from "@components/DebitCard/DebitCard";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_PAYMENT_METHODS } from "@queries/queries";
import { useHistory, useLocation } from "react-router-dom";
import RenderDelegate from "@components/RenderDelegate/RenderDelegate";
import usePreviousLocation from "@components/UsePreviousLocation/usePreviousLocation";
import { Backdrop, Box, CircularProgress, Fade, Grid, Modal, Typography } from "@mui/material";

type Props = {};

function BillingInformation({}: Props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([] as any);
  const user = useSelector((state: RootState) => state.user?.user);
  //const { loading, data, error } = useQuery(GET_PAYMENT_METHODS, {variables: { uid: user?.id }});
  const [getMethods] = useLazyQuery(GET_PAYMENT_METHODS, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    getUserPaymentMethods();
  }, []);

  const getUserPaymentMethods = async () => {
    try {
      const cards = await (
        await getMethods({ variables: { uid: user?.id } })
      ).data.getUserPaymentMethods;
      setCards(cards);
      setLoading((prevState) => !prevState);
    } catch (error) {
      setLoading((prevState) => !prevState);
    }
  };

  const renderCards = () => {
    return cards.map((card: any) => {
      return <DebitCard card={card} />;
    });
  };

  return (
    <Card id="delete-account" sx={{ boxShadow: 10 }}>
      <MDBox
        pt={3}
        px={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <MDTypography
          variant="h6"
          fontWeight="medium"
          sx={{ color: "text.primary" }}
        >
          Billing Information
        </MDTypography>
        <MDButton
          variant="outlined"
          color="info"
          size="small"
          onClick={() =>
            history.push(`${Routes.Wallet}/${Routes.AddPaymentMethod}`, {
              from: "wallet",
            })
          }
        >
          Add Card
        </MDButton>
      </MDBox>
      <MDBox color="#0C0C0C" pt={1} pb={2} px={2}>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          color="#0C0C0C"
          p={0}
          m={0}
        >
          <br></br>
          <RenderDelegate
            condition={cards.length > 0 || loading}
            renderComponent={
              <RenderDelegate
                condition={loading}
                renderComponent={<Grid container justifyContent="center"><CircularProgress color="info"/></Grid>}
                fallBackComponent={renderCards()}
              />
            }
            fallBackComponent={
              <Typography
                mt={5}
                mb={5}
                sx={{
                
                  textAlign: "center",
                  color: "text.empty",
                }}
                variant="body1"
              >
                No Payment Information
              </Typography>
            }
          />
        </MDBox>
      </MDBox>

    </Card>
  );
}

export default BillingInformation;

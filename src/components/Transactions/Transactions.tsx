import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDBox from "@components/MDBox";
import { Typography } from "@mui/material";
import MDButton from "@components/MDButton";
import MDTypography from "@components/MDTypography";
import Transaction from "@components/Transaction/Transaction";
import RenderDelegate from "@components/RenderDelegate/RenderDelegate";

type Props = {
  transactions: Array<any>;
};

function Transactions({ transactions }: Props) {
  const renderTransactions = () => {
    return transactions.map((i) => {
      return (
        <Transaction
          color="error"
          icon="expand_more"
          name="Netflix"
          description="27 March 2020, at 12:30 PM"
          value="- $ 2,500"
        />
      );
    });
  };

  return (
    <Card sx={{ height: "40%",boxShadow: 7 }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={3}
        px={2}
      >
        <MDTypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
          sx={{ color: "text.primary" }}
        >
          Your Transaction&apos;s
        </MDTypography>
        <MDButton variant="outlined" color="info" size="small">
          View all
        </MDButton>
      </MDBox>

      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={3}
        px={2}
      >
        <MDBox display="flex" alignItems="flex-end" />
        <MDBox display="flex" alignItems="flex-end">
          <MDBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </MDBox>
          <MDTypography variant="button" color="text" fontWeight="regular">
            23 - 30 March 2020
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <RenderDelegate
          condition={transactions.length > 0}
          renderComponent={renderTransactions()}
          fallBackComponent={
            <Typography
                  variant="body1"
                  sx={{
                    //marginTop: "5%",
                    textAlign: "center",
                    color: "text.empty",               
                  }}
                >
              No Transactions Avaliable
            </Typography>
          }
        />
        {/*     
         <MDBox mb={2}>
          <MDTypography
            variant="caption"
            color="text"
            fontWeight="bold"
            textTransform="uppercase"
          >
            newest
          </MDTypography>
        </MDBox>
         <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <Transaction
            color="error"
            icon="expand_more"
            name="Netflix"
            description="27 March 2020, at 12:30 PM"
            value="- $ 2,500"
          />
          <Transaction
            color="success"
            icon="expand_less"
            name="Apple"
            description="27 March 2020, at 04:30 AM"
            value="+ $ 2,000"
          />
        </MDBox>
        <MDBox mt={1} mb={2}>
          <MDTypography
            variant="caption"
            color="text"
            fontWeight="bold"
            textTransform="uppercase"
          >
            yesterday
          </MDTypography>
        </MDBox>
       <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <Transaction
            color="success"
            icon="expand_less"
            name="Stripe"
            description="26 March 2020, at 13:45 PM"
            value="+ $ 750"
          />
          <Transaction
            color="success"
            icon="expand_less"
            name="HubSpot"
            description="26 March 2020, at 12:30 PM"
            value="+ $ 1,000"
          />
          <Transaction
            color="success"
            icon="expand_less"
            name="Creative Tim"
            description="26 March 2020, at 08:30 AM"
            value="+ $ 2,500"
          />
          <Transaction
            color="dark"
            icon="priority_high"
            name="Webflow"
            description="26 March 2020, at 05:00 AM"
            value="Pending"
          />
        </MDBox>*/}
      </MDBox>
    </Card>
  );
}

export default Transactions;

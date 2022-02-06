
import Card from "@mui/material/Card";
import MDBox from "@components/MDBox";
import MDButton from "@components/MDButton";
import Invoice from "@components/Invoice/Invoice";
import MDTypography from "@components/MDTypography";
import RenderDelegate from "@components/RenderDelegate/RenderDelegate";
import { Typography } from "@mui/material";

type Props = {
  invoices: Array<any>
}

function Invoices({ invoices }: Props) {

  const renderInvoices = () => {
    return invoices.map((i) => {
      return ( <Invoice date="February, 10, 2021" id="#RV-126749" price="$250" />);
    })
  }
  
  return (
    <Card sx={{ boxShadow: 10  }} >
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium" sx={{color: 'text.primary'}}>
          Invoices
        </MDTypography>
        <MDButton variant="outlined" color="info" size="small">
          View all
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <RenderDelegate condition={invoices.length > 0} renderComponent={renderInvoices()} fallBackComponent={<Typography mt={5} mb={5} sx={{  textAlign: "center", marginTop:'10%', color:'text.empty' }} variant="body1">No Invoices Avaliable</Typography>} />
        </MDBox>
      </MDBox>
    </Card>
    
  );
}

export default Invoices;

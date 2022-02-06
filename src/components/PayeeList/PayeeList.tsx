import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import RenderDelegate from "@components/RenderDelegate/RenderDelegate";
import MDButton from "@components/MDButton";

type Props = {
  title: string;
  payees: Array<any>;
  shadow: boolean;
};

function PayeeList({ title, payees, shadow }: Props) {
  const renderPayees = payees.map(
    ({ image, name, description, action }: any) => (
      <Box
        key={name}
        component="li"
        display="flex"
        alignItems="center"
        py={1}
        mb={1}
      >
        <Box mr={2}>
          <Avatar src={image} alt="something here" />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <Typography variant="button" fontWeight="medium">
            {name}
          </Typography>
          <Typography variant="caption" color="text">
            {description}
          </Typography>
        </Box>
        <Box ml="auto">
          {action.type === "internal" ? (
            <Button
              component={Link}
              to={action.route}
              variant="text"
              color="info"
            >
              {action.label}
            </Button>
          ) : (
            <Button
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="text"
              color={action.color}
            >
              {action.label}
            </Button>
          )}
        </Box>
      </Box>
    )
  );

  return (
    <Card sx={{ height: "40%", boxShadow: 7 }}>
      <Box
        pt={2}
        px={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" fontWeight="medium">
          {title}
        </Typography>
        <MDButton variant="outlined" color="info" size="small">
          View all
        </MDButton>
      </Box>
      <Box p={2} alignItems="center" justifyContent="center">
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          p={0}
          m={0}
        >
          <RenderDelegate
            condition={payees.length > 0}
            renderComponent={renderPayees}
            fallBackComponent={
              <Grid item>
                <Typography
                  variant="body1"
                  sx={{
                    //marginTop: "60%",
                    textAlign: "center",
                    color: "text.empty",               
                  }}
                >
                  No Payees Avaliable
                </Typography>
              </Grid>
            }
          />
        </Grid>
      </Box>
    </Card>
  );
}

PayeeList.defaultProps = {
  shadow: true,
};

export default PayeeList;

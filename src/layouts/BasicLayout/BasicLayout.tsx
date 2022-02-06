import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Footer from "@components/Footer";
import MDBox from "@components/MDBox";
//import DefaultNavbar from "@components/DefaultNavbar";
import PageLayout from "@layouts/PageLayout/PageLayout";

type Props = {
  image: string;
  children: any;
};

function BasicLayout({ image, children }: Props) {
  return (
    <PageLayout>
      <MDBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({
            functions: { linearGradient, rgba },
            palette: { gradients },
          } : any) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MDBox px={1} width="100%" height="100vh" mx="auto">
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
      <Footer light />
    </PageLayout>
  );
}

export default BasicLayout;

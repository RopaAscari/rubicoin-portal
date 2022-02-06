import React, { useEffect } from "react";
import FileSaver from "file-saver";
import Grid from "@mui/material/Grid";
import { Box, Card } from "@mui/material";
import MDButton from "@components/MDButton";
import DownloadLink from "react-download-link";
import Mining from "@assets/images/mining.gif";
import Pending from "@assets/images/pending.gif";
import MDTypography from "@components/MDTypography";
import MotionHoc from "@components/MotionHOC/MotionHOC";
import { DESKTOP_APP_NAME } from "@constants/constants";
import RenderDelegate from "@components/RenderDelegate/RenderDelegate";
import { useSelector } from "react-redux";
import { RootState } from "@reducers/combinedReducers";

type Props = {};

const MiningPage: React.FunctionComponent<Props> = (props: Props) => {
  useEffect(() => {
  });

  const user = useSelector((state: RootState) => state.user?.user);

  const downloadMinerApp = () => {
    FileSaver.saveAs(
      `${process.env.PUBLIC_URL} /resource/DesktopApp/${DESKTOP_APP_NAME}`,
      DESKTOP_APP_NAME
    );
  };

  return (
    <RenderDelegate
      condition={user?.miningRigConnected as boolean}
      renderComponent={<a>Mining Rig Connected</a>}
      fallBackComponent={
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ height: "100vh" }}
        >
          <Card sx={{ marginBottom: 20, boxShadow: 10 }}>
            <Box
              alignItems="center"
              justifyContent="center"
              sx={{
                padding: 5,
                marginBottom: 0,
              }}
            >
              <img height="400" width="550" src={Mining} />
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <MDTypography variant="h5" sx={{ color: "text.primary" }}>
                  Miner Tool has not been set up
                </MDTypography>
                <Box mt={2} sx={{ width: 550 }}>
                  <MDTypography
                    variant="body1"
                    align="center"
                    sx={{ color: "text.primary" }}
                  >
                    Download the mining tool. After installing it and loggin in
                    with your account a connection will be established in a few
                    mintues.
                  </MDTypography>
                </Box>
                <br></br>

                <MDButton
                  variant="contained"
                  color="info"
                  onClick={downloadMinerApp}
                >
                  Download Miner Tool
                </MDButton>
              </Grid>
            </Box>
          </Card>
        </Grid>
      }
    />
  );
};

const MiningPageHoc = MotionHoc(MiningPage);

export default MiningPageHoc;

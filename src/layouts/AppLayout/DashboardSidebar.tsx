import { useEffect } from "react";
import { Box, Link, Drawer, Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import sidebarConfig from "./SidebarConfig";
import MiniLogo from "@assets/images/logo.png";
import { styled, alpha } from "@mui/material/styles";
import NoProfile from "@assets/images/noProfile.png";
import { MHidden } from "@components/@material-extend";
import Scrollbar from "@components/Scrollbar/Scrollbar";
import NavSection from "@components/NavSection/NavSection";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { RootState } from "@reducers/combinedReducers";
import Logo from "@components/Logo/Logo";

type Props = {
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
};

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }: any) => ({
  display: "flex",
  alignItems: "center",
  padding: 15,
  borderRadius: 10,
  backgroundColor: `${alpha(theme.palette.sidebarAccount, 0.72)}`,
}));

export default function DashboardSidebar({
  isOpenSidebar,
  onCloseSidebar,
}: Props) {
  const { pathname } = useLocation();

  const user = useSelector((state: RootState) => state.user?.user);

  const username = `${user?.firstName} ${user?.lastName}`;

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: "inline-flex" }}>
          <Logo sx={{}} />
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5, borderRadius: 10 }}>
      
          <AccountStyle>
            <Avatar src={NoProfile} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {username}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                User
              </Typography>
            </Box>
          </AccountStyle>
  
      </Box>

      <NavSection navConfig={sidebarConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
         
              borderColor:'divider',  
              margin: 0,
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}

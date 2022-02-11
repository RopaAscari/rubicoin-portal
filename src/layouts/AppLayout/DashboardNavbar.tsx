import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { Eye } from "@styled-icons/bootstrap/Eye";
import { EyeSlash } from "@styled-icons/bootstrap/EyeSlash";
import menuFill from "@iconify/icons-eva/menu-fill";
import { alpha, styled } from "@mui/material/styles";
import { RootState } from "@reducers/combinedReducers";
import { MHidden } from "@components/@material-extend";
import Searchbar from "@components/SearchBar/Searchbar";
import AccountPopover from "@components/AccountPopover/AccountPopover";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Breadcrumbs,
  Link,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import RenderDelegate from "@components/RenderDelegate/RenderDelegate";
import PayeeListPopover from "@components/PayeeListPopover/PayeeListPopover";
import NotificationsPopover from "../../components/NotificationPopover/NotificationsPopover";
import { SetWalletAction } from "@actions/setWalletAction";
import { UpdateTransitionAction } from "@actions/updateTransition";
import { useHistory } from "react-router";
import { Routes } from "@enums/enums";

type Props = {
  onOpenSidebar: () => void;
  onSearch: (term: string) => void;
};

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const WalletToggle = styled(IconButton)(({ theme }) => ({
  padding: 0,
  marginLeft: 10,
}));

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: 15,
  },
}));

export default function DashboardNavbar({ onSearch, onOpenSidebar }: Props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [breadcrumbs, setBreadCrumbs] = useState([
    <Link
      key="2"
      color="inherit"
      underline="hover"
      //  onClick={navigateBack}
      sx={{ cursor: "pointer" }}
    >
      Wallet
    </Link>,
    <Typography key="3" color="text.primary">
      Add Payment
    </Typography>,
  ] as any);
  const [visible, toggleVisibility] = useState(false);
  const user = useSelector((state: RootState) => state.user?.user);
  const walletState = useSelector(
    (state: RootState) => state.wallet?.wallet
  ) as any;

  const wAddr = visible
    ? `${walletState?.walletAddress.substring(0, 15)}...`
    : `*****************`;

  useEffect(() => {
    history.listen((location: any) => {
      console.log(`LOCATIOn ${location}`)
      if (location.pathname.includes(`${Routes.App}`)) {
        configureBreadCrumbs(location.pathname);
      }
    });
  }, [history]);

  const toggleWalletVisibility = () => {
    toggleVisibility((prevState) => !prevState);
    dispatch(UpdateTransitionAction(false));
    dispatch(
      SetWalletAction({
        ...walletState,
        ...{ isHidden: visible },
      })
    );
  };

  const sanitizeCrumbTitle = (phrase: string) => {
    return phrase
      .replace(/-/g, " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const configureBreadCrumbs = (path: string) => {
    try {
      const mainPath = path.split(`/${Routes.App}/`)[1];

      const subLevels = mainPath.split("/");

      const breadcrumbs = subLevels.map((level, idx) => {
        if (idx !== subLevels.length - 1) {
          return (
            <Link
              key="2"
              color="inherit"
              underline="hover"
              onClick={() => history.push}
              sx={{ cursor: "pointer" }}
            >
              {sanitizeCrumbTitle(level)}
            </Link>
          );
        } else {
          return (
            <Typography key="3" color="text.primary">
              {sanitizeCrumbTitle(level)}
            </Typography>
          );
        }
      });

      setBreadCrumbs(breadcrumbs);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <RootStyle>
      <ToolbarStyle>
        {
          //<MHidden width="lgUp">
        }
        <IconButton
          onClick={onOpenSidebar}
          sx={{ mr: 0, color: "text.disabled" }}
        >
          <Icon icon={menuFill} />
        </IconButton>
        {
          // </MHidden>}
        }

        <Searchbar onSearch={onSearch} />
        <Box sx={{ marginLeft: 3 }}>
          <Stack spacing={2}>
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<NavigateNextIcon fontSize="small" />}
            >
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
        </Box>
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 0 }}>
          <Box sx={{ marginRight: 8 }}>
            <RenderDelegate
              condition={user?.walletConnected as boolean}
              renderComponent={
                <React.Fragment>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#3BDB52", fontSize: 18.5 }}
                  >
                    Wallet Connected
                  </Typography>
                  <Box display="flex">
                    <Typography variant="body2" sx={{ fontSize: 12 }}>
                      {wAddr}
                    </Typography>
                    <RenderDelegate
                      condition={visible}
                      renderComponent={
                        <WalletToggle onClick={toggleWalletVisibility}>
                          <EyeSlash size="22" />
                        </WalletToggle>
                      }
                      fallBackComponent={
                        <WalletToggle onClick={toggleWalletVisibility}>
                          <Eye size="22" />
                        </WalletToggle>
                      }
                    />
                  </Box>
                </React.Fragment>
              }
              fallBackComponent={
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#C43426", fontSize: 18.5 }}
                >
                  Wallet Not Connected
                </Typography>
              }
            />
          </Box>

          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}

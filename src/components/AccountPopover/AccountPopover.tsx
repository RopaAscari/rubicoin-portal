import { Icon } from "@iconify/react";
import { Routes } from "@enums/enums";
import styled from "styled-components";
import { alpha } from "@mui/material/styles";
import React,{ useRef, useState } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import NoProfile from "@assets/images/noProfile.png";
import { useDispatch, useSelector } from "react-redux";
import { SetUserAction } from "@actions/setUserAction";
import { RootState } from "@reducers/combinedReducers";
import personFill from "@iconify/icons-eva/person-fill";
import { SetTokenAction } from "@actions/setTokenAction";
import MenuPopover from "@components/MenuPopover/MenuPopover";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";

const AccountMenu = styled(MenuPopover)(({ theme }) => ({
  //backgroundColor: 'red',
}));

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: homeFill,
    linkTo: `/${Routes.App}/${Routes.Dashboard}`,
  },
  {
    label: "Profile",
    icon: personFill,
    linkTo: `/${Routes.App}/${Routes.Profile}`,
  },
  {
    label: "Settings",
    icon: settings2Fill,
    linkTo: `/${Routes.App}/${Routes.Settings}`,
  },
];

export default function AccountPopover() {
  const history = useHistory();
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const user = useSelector((state: RootState) => state.user?.user);
  const username = `${user?.firstName} ${user?.lastName}`;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const logOut = () => {
    dispatch(SetUserAction(null));
    dispatch(SetTokenAction({ token: null, refreshToken: null}));
    
    history.push(`/${Routes.Login}`)
  }

  return (
    <React.Fragment>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src={NoProfile} sx={{ height: 28, width: 28 }} alt="photoURL" />
      </IconButton>

      <AccountMenu
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220, background: (theme: any) => theme.palette.background.default}}
      >
        <Box sx={{ my: 1.5, px: 2.5}}>
          <Typography variant="subtitle1" noWrap>
            {username}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={logOut}>
            Logout
          </Button>
        </Box>
      </AccountMenu>
    </React.Fragment>
  );
}

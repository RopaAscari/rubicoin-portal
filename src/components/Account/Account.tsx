import React from "react";
import { Menu, Badge, MenuItem, Tooltip, IconButton } from "@mui/material";
import { Routes } from "@enums/enums";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import NoProfile from "@assets/images/noProfile.png";
import { SetUserAction } from "@actions/setUserAction";
import { SetTokenAction } from "@actions/setTokenAction";
import { Users as UsersIcon } from "../../assets/icons/users";

type Props = {};

const Account: React.FunctionComponent<Props> = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();
  const dispatch = useDispatch();
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleContactMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const logOut = () => {
    dispatch(SetTokenAction({ token: null, refreshToken: null }));
    dispatch(SetUserAction(null));

    history.push(`/${Routes.Login}`);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={logOut}>Logout</MenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
      <Tooltip title="Account">
        <IconButton
          edge="end"
          size="small"
          aria-haspopup="true"
          aria-controls={menuId}
          aria-label="account details of current user"
          onClick={handleContactMenuOpen}
          sx={{ ml: 2 }}
        >
          <Badge
            color="secondary"
            variant="dot"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <img
              style={{ width: 25, height: 25 }}
              className="img-xs rounded-circle "
              src={NoProfile}
              alt="profile"
            />
          </Badge>
        </IconButton>
      </Tooltip>
      {renderMenu}
    </React.Fragment>
  );
};

export default Account;

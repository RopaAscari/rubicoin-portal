import React from "react";

import {
  Badge,
  Box,
  IconButton,
  Menu,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { BellFill } from "@styled-icons/bootstrap/BellFill";
import { Bell as BellIcon } from "../../assets/icons/bell";


type Props = {};

const NotificationIcon = styled(BellFill)`
  color: white;
`;
const Notifications: React.FunctionComponent<Props> = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleNotificationMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box sx={{ padding: 2 }} justifyContent="center" alignItems="center">
        <Typography
          noWrap
          component="div"
          variant="h6"
          sx={{
            display: { xs: "none", sm: "block" },
            marginLeft: 1,
            marginTop: 1,
          }}
        >
          Notification Center
        </Typography>

        <Box
          sx={{ height: 400, width: 400 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            noWrap
            component="div"
            variant="subtitle2"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            No notifications avaliable
          </Typography>
        </Box>
      </Box>
    </Menu>
  );

  return (
    <React.Fragment>
      <Tooltip title="Notifications">
        <IconButton
          edge="end"
          size="large"
          aria-haspopup="true"
          aria-controls={menuId}
          aria-label="notifications of current user"
          onClick={handleNotificationMenuOpen}
          sx={{ ml: 1 }}
        >
          <Badge badgeContent={10} color="secondary" variant="standard">
            <BellIcon style={{ fontSize: 28 }} />
          </Badge>
        </IconButton>
      </Tooltip>
      {renderMenu}
    </React.Fragment>
  );
};

export default Notifications;

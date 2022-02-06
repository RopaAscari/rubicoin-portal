//import faker from 'faker';
import PropTypes from "prop-types";
import { noCase } from "change-case";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import { alpha } from "@mui/material/styles";
import personFill from "@iconify/icons-eva/person-fill";
import clockFill from "@iconify/icons-eva/clock-fill";
import { Link as RouterLink } from "react-router-dom";
import { set, sub, formatDistanceToNow } from "date-fns";
import doneAllFill from "@iconify/icons-eva/done-all-fill";
import PayeeVector from "@assets/images/payee.jpg";
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";
import Scrollbar from "@components/Scrollbar/Scrollbar";
import MenuPopover from "@components/MenuPopover/MenuPopover";
import {PersonAdd} from '@styled-icons/evaicons-solid/PersonAdd';
export const mockImgAvatar = (index: any) =>
  `/static/mock-images/avatars/avatar_${index}.jpg`;

const PAYEES = [
  {
    id: 1,
    avatar: null,
    isAccepted: true,
    username: "Danyel Roper",
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
  },
  {
    id: 2,
    avatar: null,
    isAccepted: true,
    username: "Kim Kursty",
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
  },
];

function renderContent(payee: any) {
  const title = (
    <Typography variant="subtitle2">
      {payee.username}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
 
      </Typography>
    </Typography>
  );

  return {
    avatar: (
      <img
        height="50"
        width="50"
        alt={payee.username}
        src={PayeeVector}
      />
    ),
    title,
  };
}

type Props = {
  payee: any;
};

function PayeeItem({ payee }: Props) {
  const { avatar, title } = renderContent(payee);

  return (
    <ListItemButton
      to="#"
      disableGutters
      component={RouterLink}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(payee.isAccepted && {
          bgcolor: "action.selected",
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            <Box
              component={Icon}
              icon={clockFill}
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {formatDistanceToNow(new Date(payee.createdAt))}
          </Typography>
        }
      />
      <PersonAdd size="25"/>
    </ListItemButton>
  );
}

export default function PayeeListPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [payees, setPayees] = useState(PAYEES);
  const totalUnRead = payees.filter((item) => item.isAccepted === false).length;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = () => {
    setPayees(
      payees.map((payee) => ({
        ...payee,
        isAccepted: false,
      }))
    );
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        size="large"
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Icon icon={personFill} width={30} height={30} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{
          width: 360,
          background: (theme: any) => theme.palette.background.default,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Payees</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              You have new payee requests
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Icon icon={doneAllFill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider />

        <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                New
              </ListSubheader>
            }
          >
            {payees.slice(0, 2).map((payee) => (
              <PayeeItem key={payee.id} payee={payee} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                Before that
              </ListSubheader>
            }
          >
            {payees.slice(2, 5).map((payee) => (
              <PayeeItem key={payee.id} payee={payee} />
            ))}
          </List>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple component={RouterLink} to="#">
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

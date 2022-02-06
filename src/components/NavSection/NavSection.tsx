import { useState } from "react";
import { NavigationItem } from "@constants/constants";
import { alpha, useTheme, styled } from "@mui/material/styles";
import { NavLink as RouterLink, useLocation, NavLink } from "react-router-dom";
import {
  Box,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Collapse,
  Typography,
} from "@mui/material";
import sidebarConfig from "../../layouts/AppLayout/SidebarConfig";
type Props = {
  navConfig: NavigationItem[];
};

const ListItemStyle = styled((props) => (
  <ListItemButton disableGutters {...props} />
))<{
  to: string;
  component: ReturnType<NavLink<any>>;
}>(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  //. fontSize: 15,
  textTransform: "capitalize",
  paddingLeft: 15,
  paddingRight: theme.spacing(2.5),
  color: "grey",
  "&:before": {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: "none",
    position: "absolute",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: "#ff7f00",
  },
  "&:hover": {
    color: "#ff7f00",
    backgroundColor: alpha("#ff7f00", theme.palette.action.selectedOpacity),
  },
}));

const ListItemIconStyle = styled(ListItemIcon)<{ active: string }>(
  ({ active }) => ({
    width: 22,
    height: 22,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: active == "true" ? "#ff7f00" : "",
    "&:hover": {
      color: "#ff7f00",
    },
  })
);

function NavItem({ item, active }: any) {
  const theme = useTheme();
  const { title, path, icon, info } = item;
  const isActiveRoot: boolean = active;
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: "#ff7f00",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha("#ff7f00", theme.palette.action.selectedOpacity),
    "&:before": { display: "block" },
  };

  const activeSubStyle = {
    color: "#212B36",
    fontWeight: "fontWeightMedium",
  };

  return (
    <>
      <ListItemStyle
        component={RouterLink as any}
        to={path}
        sx={{
          ...(isActiveRoot && activeRootStyle),
        }}
      >
        <ListItemIconStyle active={isActiveRoot.toString()}>
          {icon && icon}
        </ListItemIconStyle>
        <ListItemText disableTypography primary={title} />
        {info && info}
      </ListItemStyle>
    </>
  );
}

export default function NavSection({ navConfig, ...other }: Props) {
  const { pathname } = useLocation();

  const isPathActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <Box {...other}>
      <List disablePadding>
        {navConfig.map((item) => (
          <NavItem
            key={item.title}
            item={item}
            active={isPathActive(item.path)}
          />
        ))}
      </List>
    </Box>
  );
}

import { useState } from "react";
import { Icon } from "@iconify/react";
import searchFill from "@iconify/icons-eva/search-fill";
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Input,
  Slide,
  Button,
  InputAdornment,
  ClickAwayListener,
  IconButton,
  Card,
} from "@mui/material";
import MDButton from "@components/MDButton";

type Props = {
  onSearch: (term: string) => void;
};

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: "100%",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  height: APPBAR_MOBILE,
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.shadows[9],
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up("md")]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

export default function Searchbar({ onSearch }: Props) {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    onSearch("");
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButton onClick={handleOpen}>
            <Icon icon={searchFill} width={20} height={20} />
          </IconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
      
          <SearchbarStyle>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              onChange={(e) => onSearch(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{
                      fontweight: "light",
                      color: "text.disabled",
                      width: 20,
                      height: 20,
                    }}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: "fontWeightBold" }}
            />
            <MDButton variant="gradient" color="info" onClick={handleClose}>
              Close
            </MDButton>
          </SearchbarStyle>
         
         
        </Slide>
       
      </div>

    </ClickAwayListener>
  );
}

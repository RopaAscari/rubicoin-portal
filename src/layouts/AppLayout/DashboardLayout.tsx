import { useState } from "react";
import styled from "styled-components";
import DashboardNavbar from "@layouts/AppLayout/DashboardNavbar";
import DashboardSidebar from "@layouts/AppLayout/DashboardSidebar";

type Props = {
  children?: React.ReactNode;
  onSearch: (term: string) => void;
};

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  //paddingTop: APP_BAR_MOBILE + 24,
  //paddingBottom: 5,
  // [theme.breakpoints.up('lg')]: {
  paddingTop: APP_BAR_DESKTOP + 24,
  paddingLeft: 15,
  paddingRight: 15,
  //}
}));

export const DashboardLayout = ({ children, onSearch }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <DashboardNavbar
        onSearch={onSearch}
        onOpenSidebar={() => setOpen(true)}
      />
      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <MainStyle>{children}</MainStyle>
    </RootStyle>
  );
};

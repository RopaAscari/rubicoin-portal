import * as React from "react";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type Props = {
    crumbs: Array<any>
}

export default function BreadCrumbNavigator({ crumbs }: Props) {
  function handleClick(event: any) {
    event.preventDefault();
  }

  const renderBreadCrumbs = () => {
     return crumbs.map((breadcrumb, index) => {
         if(index == crumbs.length - 1){
             return (  
             <Typography key="3" color="text.primary">
             {breadcrumb.title}
           </Typography>)
         }
     })
  }

  const breadcrumbs = [
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/wallet"
      onClick={handleClick}
    >
      Wallet
    </Link>,
    <Typography key="3" color="text.primary">
      Add Payment
    </Typography>,
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs 
      aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        {renderBreadCrumbs()}
      </Breadcrumbs>
    </Stack>
  );
}

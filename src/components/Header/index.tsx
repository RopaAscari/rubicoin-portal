import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "@reducers/combinedReducers";
import { Avatar, Box, Typography } from "@mui/material";
import backgroundImage from "@assets/images/bg-profile.jpeg";

const breakpoints = {
  values: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  },
};

function Header({ children }: any) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const user = useSelector((state: RootState) => state.user?.user);
  const handleSetTabValue = (event: any, newValue: any) =>
    setTabValue(newValue);

  return (
    <Box position="relative" mb={5}>
      <Box
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: () => `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
          borderRadius: 4.5,
        }}
      />
   
        {children}
     
    </Box>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;

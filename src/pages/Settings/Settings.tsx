import {
  Box,
  Card,
  Grid,
  Radio,
  Divider,
  CardHeader,
  RadioGroup,
  CardContent,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import darkTheme from "@theme/dark";
import lightTheme from "@theme/light";
import { Themes, Transition } from "@enums/enums";
import React, { useState } from "react";
import { SetThemeAction } from "@actions/setTheme";
import { useDispatch, useSelector } from "react-redux";
import MotionHoc from "@components/MotionHOC/MotionHOC";
import { RootState } from "@reducers/combinedReducers";
import { SettingsNotifications } from "@components/Settings/SettingsNotifications";
import { UpdateTransitionAction } from "@actions/updateTransition";
import HOCWrapper from "@components/HOCWrapper/HOCWrapper";

type Props = {};

const SettingsPage: React.FunctionComponent<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(
    (state: RootState) => state.theme.theme.name
  );
  const [theme, setTheme] = useState(currentTheme);

  const handleChange = (e: any) => {
    let data = null;
    const theme = e.target.value;

    setTheme(theme);

    if (theme == Themes.LIGHT) {
      data = lightTheme;
    } else {
      data = darkTheme;
    }
    dispatch(
      SetThemeAction({
        name: theme,
        data: data,
      })
    );

    dispatch(UpdateTransitionAction(false));
  };

  return (
    <HOCWrapper transition={Transition.Vertical}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          height: "100vh",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={8}>
            {" "}
            <SettingsNotifications />
          </Grid>

          <Grid item xs={4}>
            {" "}
            <Card>
              {" "}
              <CardHeader subheader="Choose your app theme" title="Theme" />
              <Divider
                sx={{ bgcolor: "divider" }}
                style={{
                  border: "none",
                  height: 2,
                  margin: 0,
                }}
              />
              <CardContent>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={theme}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="LIGHT"
                      control={<Radio />}
                      label="Light"
                    />
                    <FormControlLabel
                      value="DARK"
                      control={<Radio />}
                      label="Dark"
                    />
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </HOCWrapper>
  );
};

//const SettingsPageHoc = MotionHoc(SettingsPage);

export default SettingsPage;

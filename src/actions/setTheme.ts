import { Theme } from "@mui/material";
import { SET_THEME_ACTION, SetThemeActionType, Theming } from "@typings/theme";

export function SetThemeAction(theme: Theming | any): SetThemeActionType {
  return {
    type: SET_THEME_ACTION,
    payload: theme,
  };
}

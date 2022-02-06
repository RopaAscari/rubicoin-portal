import { Theme } from "@mui/material";

export const SET_THEME_ACTION='SET_THEME_ACTION';

export interface Theming {
  name: string;
  data: Theme;
}

  export interface ThemeState {
    theme: Theming | null | any;
  }

  export interface SetThemeActionStore {
    type: typeof SET_THEME_ACTION;
    payload: Theming | null | any;
  }

  export type SetThemeActionType = SetThemeActionStore
import {
  ThemeState,
  SET_THEME_ACTION,
  SetThemeActionType,
  Theming,
} from "@typings/theme";
import theme from "@theme/light";
import { Themes } from "@enums/enums";

const initialState: ThemeState = {
  theme: {
    name: Themes.LIGHT,
    data: theme,
  },
};

export default function SetThemeReducer(
  state = initialState,
  action: SetThemeActionType
): ThemeState {
  switch (action.type) {
    case SET_THEME_ACTION:
      return {
        theme: action.payload,
      };
    default:
      return state;
  }
}

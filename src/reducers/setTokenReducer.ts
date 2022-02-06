import {
  TokenState,
  SET_TOKEN_ACTION,
  SetTokenActionType,
} from "@typings/token";

const initialState: TokenState = {
  token: undefined,
};

export default function SetTokenReducer(
  state = initialState,
  action: SetTokenActionType
): TokenState {
  switch (action.type) {
    case SET_TOKEN_ACTION:
      return {
        token: action.payload,
      };
    default:
      return state;
  }
}

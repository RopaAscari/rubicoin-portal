import { Token } from "@constants/constants";
import { SET_TOKEN_ACTION, SetTokenActionType } from "@typings/token";

export function SetTokenAction(token: Token): SetTokenActionType {
  return {
    type: SET_TOKEN_ACTION,
    payload: token,
  };
}
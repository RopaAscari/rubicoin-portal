import { User } from "@constants/constants";
import { SET_USER_ACTION, SetUserActionType } from "@typings/user";

export function SetUserAction(user: User | null): SetUserActionType {
  return {
    type: SET_USER_ACTION,
    payload: user,
  };
}

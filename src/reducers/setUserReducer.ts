import {
  UserState,
  SET_USER_ACTION,
  SetUserActionType,
} from "@typings/user";

export const userInitialState: UserState | null = null;

export default function SetAdminActionReducer(
  state = userInitialState,
  action: SetUserActionType
): UserState | null {
  switch (action.type) {
    case SET_USER_ACTION:
      return {
        user: action.payload,
      };
    default:
      return state;
  }
}

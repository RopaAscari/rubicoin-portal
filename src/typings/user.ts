import { User } from "@constants/constants";

export const SET_USER_ACTION='SET_USER_ACTION'

  export interface UserState {
    user: User | null;
  }
  
  export interface SetUserActionStore {
    type: typeof SET_USER_ACTION;
    payload: User | null;
  }

  export type SetUserActionType = SetUserActionStore
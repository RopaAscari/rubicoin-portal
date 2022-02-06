import { Token } from "@constants/constants";


export const SET_TOKEN_ACTION='SET_TOKEN_ACTION'

  export interface TokenState {
    token: Token | undefined;
  }
  
  export interface SetTokenActionStore {
    type: typeof SET_TOKEN_ACTION;
    payload: Token | undefined;
  }

  export type SetTokenActionType = SetTokenActionStore
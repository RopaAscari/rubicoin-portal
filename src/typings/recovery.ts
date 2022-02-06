import { Recovery } from "@constants/constants";
export const SET_RECOVERY_OPTIONS_ACTION='SET_RECOVERY_OPTIONS_ACTION'

  export interface RecoveryState {
    recovery: Recovery | null;
  }
  
  export interface SetRecoveryOptionsActionStore {
    type: typeof SET_RECOVERY_OPTIONS_ACTION;
    payload: Recovery | null;
  }

  export type SetRecoveryOptionsActionType = SetRecoveryOptionsActionStore
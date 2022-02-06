import { Recovery } from "@constants/constants";
import { SetRecoveryOptionsActionType, SET_RECOVERY_OPTIONS_ACTION } from "@typings/recovery";


export function SetRecoveryOptions(recovery: Recovery): SetRecoveryOptionsActionType {
  return {
    type: SET_RECOVERY_OPTIONS_ACTION,
    payload: recovery,
  };
}
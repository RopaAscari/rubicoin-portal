import {
  RecoveryState,
  SetRecoveryOptionsActionType,
  SET_RECOVERY_OPTIONS_ACTION,
} from "@typings/recovery";

const initialState: RecoveryState = {
  recovery: null,
};

export default function SetRecoveryReducer(
  state = initialState,
  action: SetRecoveryOptionsActionType
): RecoveryState {
  switch (action.type) {
    case SET_RECOVERY_OPTIONS_ACTION:
      return {
        recovery: action.payload,
      };
    default:
      return state;
  }
}

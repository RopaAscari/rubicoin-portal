
import { UPDATE_TRANSITION_ACTION, UpdateTransitionActionType } from "@typings/transition";

export function UpdateTransitionAction(transition: boolean): UpdateTransitionActionType {
  return {
    type: UPDATE_TRANSITION_ACTION,
    payload: transition,
  };
}

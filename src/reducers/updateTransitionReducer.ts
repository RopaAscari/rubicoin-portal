import {
    TransitionState,
    UPDATE_TRANSITION_ACTION,
    UpdateTransitionActionType,
  } from "@typings/transition";
  
  export const transitionInitialState: TransitionState = { enableTransition: true };
  
  export default function UpdateTransitionReducer(
    state = transitionInitialState,
    action: UpdateTransitionActionType
  ): TransitionState | null {
    switch (action.type) {
      case UPDATE_TRANSITION_ACTION:
        return {
          enableTransition: action.payload,
        };
      default:
        return state;
    }
  }
  
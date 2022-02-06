

export const UPDATE_TRANSITION_ACTION='UPDATE_TRANSITION_ACTION'

  export interface TransitionState {
    enableTransition: boolean;
  }
  
  export interface UpdateTransitionActionStore {
    type: typeof UPDATE_TRANSITION_ACTION;
    payload: boolean;
  }

  export type UpdateTransitionActionType = UpdateTransitionActionStore
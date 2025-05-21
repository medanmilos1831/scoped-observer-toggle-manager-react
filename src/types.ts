export interface IToggleState {
  status: boolean;
  payload: any;
  toggle: () => void;
}

export const ON_OFF_SCOPE_APPEND = "onOffManager";

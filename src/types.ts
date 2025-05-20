export interface IEventToggleManagerWrapperState {
  status: boolean;
  payload: any;
  toggle: () => void;
}

export type itemsMapType = { [key: string]: boolean };

export const EVENT_NAME = 'toggleStatus';
export const ON_OFF_SCOPE = 'onOff';
export const ON_OFF_SCOPE_APPEND = 'onOffManager';

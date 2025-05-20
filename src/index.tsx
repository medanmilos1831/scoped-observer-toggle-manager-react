import { useEffect, useState } from 'react';
import { dispatch, subscribe } from 'scoped-observer';
import { EventToggleManager } from './EventToggleManager';
import {
  EVENT_NAME,
  IEventToggleManagerWrapperState,
  ON_OFF_SCOPE,
} from './types';

// Singleton instance of the toggle manager (internal, non-reactive)
const eventToggleManager = new EventToggleManager();

/**
 * A React component wrapper that connects a component to the global
 * EventToggleManager and listens for toggle events in a scoped context.
 *
 * @param name - Unique name for the toggle group (used for scoping).
 * @param children - Render prop that receives the current toggle state.
 * @returns JSX element rendered by the children function.
 */
const EventToggleManagerWrapper = ({
  name,
  children,
}: {
  name: string;
  children: (params: IEventToggleManagerWrapperState) => JSX.Element;
}) => {
  // Local toggle state exposed to children
  const [state, setState] = useState<IEventToggleManagerWrapperState>({
    status: false,
    payload: undefined,
    toggle() {
      eventToggleHandler({
        name,
      });
    },
  });

  // One-time init that adds this toggle to the manager (non-reactive)
  const [__, _] = useState(init);
  function init() {
    eventToggleManager.addItem({
      [name]: state.status,
    });
  }

  useEffect(() => {
    // Subscribe to toggle events for this specific scope
    const unsubscribe = subscribe({
      scope: `${ON_OFF_SCOPE}:${name}`,
      eventName: EVENT_NAME,
      callback(eventData: {
        payload: {
          status: IEventToggleManagerWrapperState['status'];
          data: IEventToggleManagerWrapperState['payload'];
        };
      }) {
        const { status, data } = eventData.payload;

        // Update internal manager state
        eventToggleManager.updateStatus(name, status);

        // Trigger local re-render with updated state
        setState((prev) => ({
          ...prev,
          status,
          payload: data,
        }));
      },
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return <>{children(state)}</>;
};

/**
 * Triggers a toggle event in the global scoped observer system.
 *
 * It dispatches a new boolean state (flipping current) and passes optional payload data.
 *
 * @param name - The unique name of the toggle item.
 * @param payload - Optional data to pass along with the toggle.
 */
function eventToggleHandler({
  name,
  payload = undefined,
}: {
  name: string;
  payload?: any;
}) {
  dispatch({
    scope: `${ON_OFF_SCOPE}:${name}`,
    eventName: EVENT_NAME,
    payload: {
      status: !eventToggleManager.getItem(name), // Flip current toggle state
      data: payload,
    },
  });
}

export { EventToggleManagerWrapper, eventToggleHandler };

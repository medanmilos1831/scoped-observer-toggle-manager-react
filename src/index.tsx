import { useEffect, useState } from 'react';
import { dispatch, subscribe } from 'scoped-observer';
import { IToggleState } from './types';
import { EventScope } from './EventScope';

const { hash } = new EventScope();

// Singleton instance of the toggle manager (internal, non-reactive)

/**
 * A React component wrapper that connects a component to the global
 * EventToggleManager and listens for toggle events in a scoped context.
 *
 * @param name - Unique name for the toggle group (used for scoping).
 * @param children - Render prop that receives the current toggle state.
 * @returns JSX element rendered by the children function.
 */
const ToggleController = ({
  initStatus = false,
  name,
  children,
}: {
  initStatus?: boolean;
  name: string;
  children: (params: IToggleState) => JSX.Element;
}) => {
  // Local toggle state exposed to children
  const [state, setState] = useState<IToggleState>({
    status: initStatus,
    payload: undefined,
    toggle() {
      toggleHandler({
        name,
      });
    },
  });

  useEffect(() => {
    // Subscribe to toggle events for this specific scope
    const unsubscribe = subscribe({
      scope: `${hash}`,
      eventName: name,
      callback({ payload }) {
        // Trigger local re-render with updated state
        setState((prev) => ({
          ...prev,
          status: !prev.status,
          payload: payload,
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
function toggleHandler({
  name,
  payload = undefined,
}: {
  name: string;
  payload?: any;
}) {
  dispatch({
    scope: `${hash}`,
    eventName: name,
    payload,
  });
}

export { ToggleController, toggleHandler };

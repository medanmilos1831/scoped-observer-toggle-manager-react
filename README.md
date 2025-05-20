# Toggle Event Service

A lightweight, event-driven toggle service for React applications.  
Designed for full flexibility, deep encapsulation, and zero direct state access — ideal for managing modals, drawers, or any toggleable UI component.

## ✨ Features

- 🔌 **Plug-and-play**: Drop it into any component.
- 🎯 **Encapsulated State**: Internal manager with no direct external mutations.
- 📡 **Event-based**: Toggle any UI component using scoped events.
- 🚫 **No Redux or context**: Simple by design, no global state libraries.
- 🧩 **Composable**: Works with any UI library (Ant Design, MUI, custom).

---

## 🚀 Installation

```bash
npm install toggle-event-service
```

## 🧠 Core Concepts

This service uses a centralized, encapsulated manager and scoped events to update and toggle UI state.

- Internally Used Tools scoped-observer for event dispatch and subscriptions

- React's useState and useEffect

- Custom EventToggleManager class for non-reactive global state tracking

## 📦 Usage

Wrap your component with EventToggleManagerWrapper

```
import {
  EventToggleManagerWrapper,
  eventToggleHandler,
} from 'toggle-event-service';

const HomePage = () => {
  return (
    <>
        <EventToggleManagerWrapper name="userModal">
            {({ status, payload, toggle }) => {
            return (
                <Modal
                open={status}
                onCancel={() => {
                    toggle();
                }}
                >
                    <ModalComponent />
                </Modal>
            );
            }}
        </EventToggleManagerWrapper>
      </>
  );
};
```

Trigger externally (optional)

```
eventToggleHandler({ name: 'userModal' });
```

or

```
eventToggleHandler({ name: 'userModal', payload: { userId: 42 } });
```

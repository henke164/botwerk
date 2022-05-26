const eventListeners = {};

function addAppEventListener(eventName, cb) {
  if (!eventListeners[eventName]) {
    eventListeners[eventName] = [];
  }

  eventListeners[eventName].push(cb);
}

function emitAppEvent(eventName, value) {
  if (!eventListeners[eventName]) {
    return;
  }

  eventListeners[eventName].forEach((cb) => {
    cb(value);
  });
}

export { emitAppEvent, addAppEventListener };

const eventListeners = {};

function addAppEventListener(eventName, cb) {
  if (!eventListeners[eventName]) {
    eventListeners[eventName] = [];
  }

  eventListeners[eventName].push(cb);
}

function emitAppEvent(eventName, value, ...params) {
  if (!eventListeners[eventName]) {
    return;
  }

  eventListeners[eventName].forEach((cb) => {
    cb(value, ...params);
  });
}

export { emitAppEvent, addAppEventListener };

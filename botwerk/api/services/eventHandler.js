const eventListeners = {};

function addEventListener(channel, cb) {
  if (!eventListeners[channel]) {
    eventListeners[channel] = [];
  }

  eventListeners[channel].push(cb);
}

function emit(channel, value) {
  if (!eventListeners[channel]) {
    return;
  }

  eventListeners[channel].forEach(cb => {
    cb(value);
  });
}

module.exports = {
  emit,
  addEventListener,
}
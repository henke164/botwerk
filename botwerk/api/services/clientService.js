const { v4: uuidv4 } = require('uuid');

function createClient(name) {
  if (!name || name.length === 0) {
    name = "Client-" + Math.floor(Math.random() * 1000);
  }

  return {
    id: uuidv4(),
    name,
    actions: [],
    modelers: [],
    objects: []
  }
}

module.exports = {
  createClient,
};

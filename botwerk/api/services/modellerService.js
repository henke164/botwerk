const defaultContent = `/*
Define your model type here based on the packet content. 
*/

function onSocketPacketReceived(socketIndex, packet) {
/*
   Example:
   if (socketIndex === 0) {
      const { type, data } = JSON.parse(packet);
      if (type === "user_data") {
          return "User"
      }

      if (type === "user_data") {
          return "User"
      }
   }
*/

return null;
}`;

const modellers = [];

createModeller("Default");

function getModellerList() {
  return modellers.map(m => ({ id: m.id, name: m.name }));
}

function removeModeller(id) {
  console.log("Remoing", id);
  const index = modellers.map(m => m.id).indexOf(id);
  console.log("Idx", index);
  if (index < 0) {
    return {
      success: false,
      error: "Modeller not found",
    };
  }

  modellers.splice(index, 1);

  return {
    success: true,
  };
}

function updateModeller(id, name, content) {
  if (modellers.filter(m => m.id !== id).map(m => m.name).includes(name)) {
    return {
      success: false,
      error: "Name already exists",
    };
  }
  
  const index = modellers.map(m => m.id).indexOf(id);
  if (index < 0) {
    return {
      success: false,
      error: "Modeller not found",
    };
  }

  modellers[index] = {
    ...modellers[index],
    name,
    content
  };

  return modellers[index];
}

function createModeller(name) {
  if (modellers.map(m => m.name).includes(name)) {
    return {
      success: false,
      error: "Name already exists"
    };
  }

  const id = Math.floor(Math.random() * 10000);
  const modeller = {
    id,
    name,
    content: defaultContent
  };
  
  modellers.push(modeller);
  
  return {
    success: true,
    modeller
  };
}

module.exports = {
  getModellerList,
  removeModeller,
  updateModeller,
  createModeller,
};
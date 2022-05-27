const { defaultModeller } = require('../utilities/defaultValues');

const modellers = [ defaultModeller ];

function getModellerList() {
  return modellers.map(m => ({ id: m.id, name: m.name }));
}

function removeModeller(id) {
  const index = modellers.map(m => m.id).indexOf(id);
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

  const id = Math.floor(Math.random() * 10000).toString();
  const modeller = {
    id,
    name,
    content: defaultModeller.content,
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
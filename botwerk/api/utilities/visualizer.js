function buildDictionary(object, path, dictionary) {
  const keys = Object.keys(object);
  for (let i = 0; i < keys.length; i++) {
    const currentPath = path === '' ? keys[i] : `${path}.${keys[i]}`;
    if (typeof(object[keys]) === 'object') {
      buildDictionary(object, currentPath, dictionary);
    } else {
      dictionary.push({ path: currentPath, value: object[keys[i]]})
    }
  }
}

function replaceAppearanceValues(appearanceHTML, object) {
  let parsedHTML = appearanceHTML;
  let dictionary = [];
  buildDictionary(object, '', dictionary);
  for (let i = 0; i < dictionary.length; i++) {
    const keyVal = dictionary[i];
    var regex = new RegExp(`{${keyVal.path}}`, 'g');
    parsedHTML = parsedHTML.replace(regex, keyVal.value);
  }

  return parsedHTML;
}

module.exports = {
  replaceAppearanceValues,
};

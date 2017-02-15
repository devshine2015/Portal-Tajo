import objectPath from 'object-path';

export const filterProcessedListByName = ({
  objectsList = {},
  searchString = '',
  path = '',
}) => {
  const result = Object.assign({}, objectsList);

  for (const k in objectsList) {
    if (objectsList.hasOwnProperty(k)) {
      const obj = objectsList[k];
      const propertyToSearch = objectPath.get(obj, path);

      result[k] = Object.assign({}, obj);
      result[k].filteredOut = propertyToSearch.toLowerCase().search(searchString) === -1;
    }
  }
  return result;
};

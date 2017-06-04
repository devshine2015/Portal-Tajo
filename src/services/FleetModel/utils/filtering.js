import { Map } from 'immutable';

function _itContainString(searchString, prop) {
  return prop.toLowerCase().search(searchString) !== -1;
}

export default ({
  objectsList = new Map(),
  searchString = '',
  paths = [''],
}) => {
  const splitteds = paths.map(p => p.split('.'));

  const next = objectsList.update((list) => {
    return list.map((object) => {
      return object.update((obj) => {
        let itFilteredOut;

        splitteds.forEach((splitted) => {
          if (itFilteredOut === false) return;

          const propertyToSearch = obj.getIn(splitted);
          itFilteredOut = !_itContainString(searchString, propertyToSearch);
        });

        return obj.set('filteredOut', itFilteredOut);
      });
    });
  });

  return next;
};

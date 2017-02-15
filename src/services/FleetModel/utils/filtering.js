// import objectPath from 'object-path';
import { Map } from 'immutable';

function _itContainString(searchString, prop) {
  return prop.toLowerCase().search(searchString) !== -1;
}

export const filterProcessedListByName = ({
  objectsList = new Map(),
  searchString = '',
  path = '',
}) => {
  const splitted = path.split('.');

  const next = objectsList.update(list =>
    list.map(object =>
      object.update(obj => {
        const propertyToSearch = obj.getIn(splitted);
        const itFilteredOut = !_itContainString(searchString, propertyToSearch);

        return obj.set('filteredOut', itFilteredOut);
      })
    )
  );

  return next;
};

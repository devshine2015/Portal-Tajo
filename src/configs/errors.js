const failedToFetch = {
  type: 'Failed to fetch',
  internal: false,
};
const resourceNotFound = {
  type: 'Not Found',
  internal: false,
};
const unauthorized = {
  type: 'Unauthorized',
  internal: false,
};

const errors = {
  [failedToFetch.type]: failedToFetch,
  [resourceNotFound.type]: resourceNotFound,
  [unauthorized.type]: unauthorized,
};

function getLocalType(error) {
  return errors[error.message] || {
    type: error.toString(),
  };
}

export default getLocalType;

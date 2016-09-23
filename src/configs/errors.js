const failedToFetch = {
  type: 'Failed to fetch',
  message: 'Server is temporaly down. Please try again later',
  internal: false,
};
const resourceNotFound = {
  type: 'Not Found',
  message: 'Resource is not found. Please contact with administrator',
  internal: false,
};
const unauthorized = {
  type: 'Unauthorized',
  message: 'Username/password combination is wrong.',
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
    message: error.message,
  };
}

export default getLocalType;

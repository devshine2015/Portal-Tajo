const failedToFetch = {
  type: 'Failed to fetch',
  message: 'Server is temporaly down. Please try again later',
};
const resourceNotFound = {
  type: 'Not Found',
  message: 'Resource is not found. Please contact with administrator',
};

const errors = {
  [failedToFetch.type]: failedToFetch,
  [resourceNotFound.type]: resourceNotFound,
};

function getLocalType(error) {
  return errors[error.message] || {
    type: error.toString(),
    message: error.message,
  };
}

export default getLocalType;

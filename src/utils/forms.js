export function validateForm(data) {
  let error = false;

  for(let key in data) {
    if (!data[key]) {
      error = true;
    }
  }

  return error;
};
export function validateForm(data) {
  let error = false;

  for (const key in data) {
    if (!data[key]) {
      error = true;
    }
  }

  return error;
}

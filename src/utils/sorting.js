export function sortByName(a = {}, b = {}) {
  if (a.name === undefined || b.name === undefined) debugger;

  const nameA = a.name.trim().toLowerCase();
  const nameB = b.name.trim().toLowerCase();

  if (nameA < nameB) {
    return -1;
  }

  if (nameA > nameB) {
    return 1;
  }

  return 0;
}

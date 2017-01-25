export function sortByName(a = {}, b = {}) {
  if (a.name === undefined || b.name === undefined) return 0;

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

export const ifArraysEqual = (a1, a2) =>
  (a1.length === a1.length) && a1.every((element, index) => element === a2[index]);

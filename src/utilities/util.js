export const sortName = (a, b) => {
  // remove case senstivity
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // if names are equal
  return 0;
};

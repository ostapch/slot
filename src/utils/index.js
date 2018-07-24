export const flatten = (array) => {
  return array.reduce((accumulator, currentValue) => {
    currentValue = Array.isArray(currentValue) ? flatten(currentValue) : currentValue;
    return accumulator.concat(Array.isArray(currentValue) ? flatten(currentValue) : currentValue);
  }, []);
};

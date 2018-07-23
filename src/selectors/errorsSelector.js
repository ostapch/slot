import { createSelector } from 'reselect';

const getConfiguration = state => state.configuration;
const getSlotState = state => state.slotState;

function resultFunc() {
  return Array.from(arguments).reduce((accumulator, currentValue) => {
    return [
      ...accumulator,
      currentValue.errorCode,
      currentValue.error && JSON.stringify(
        currentValue.error,
        Object.getOwnPropertyNames(currentValue.error),
        2
      )
    ];
  }, []).filter(error => error);
}

export const getErrors = createSelector(
  [getConfiguration, getSlotState],
  resultFunc,
);

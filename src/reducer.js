export function XY_POSITION_CHANGED(state, action, helpers) {
  const tempState = helpers.updatePositionProperties(action, state, helpers);
  return helpers.updateRenderedData(tempState, helpers);
}

export function GRIDDLE_LOADED_DATA_AFTER(state, action, helpers) {
  const tempState = helpers.updatePositionProperties({ yScrollPosition: 0, xScrollPosition: 0, force: true}, state, helpers, true);
  return helpers.updateRenderedData(tempState, helpers);
}

export function GRIDDLE_GET_PAGE_AFTER(state, action, helpers) {
  const tempState = helpers.updatePositionProperties(action, state, helpers);
  return helpers.updateRenderedData(tempState, helpers);
}

export function GRIDDLE_NEXT_PAGE_AFTER(state, action, helpers) {
  return helpers.updateRenderedData(state, helpers);
}

export function GRIDDLE_PREVIOUS_PAGE_AFTER(state, action, helpers) {
  return helpers.updateRenderedData(state, helpers);
}

export function GRIDDLE_FILTERED_AFTER(state, action, helpers) {
  state = helpers.setCurrentPosition(state, 0, 0);
  return helpers.updateRenderedData(state, helpers);
}

export function GRIDDLE_SORT_AFTER(state, action, helpers) {
  return helpers.updateRenderedData(state, helpers);
}

export function GRIDDLE_TOGGLE_COLUMN_AFTER(state, action, helpers) {
  return helpers.updateRenderedData(state, helpers);
}


// export function XY_POSITION_CHANGED(state, action, helpers) {
//   return helpers.updatePositionProperties(action, state, helpers);
// }

// export function GRIDDLE_LOADED_DATA_AFTER(state, action, helpers) {
//   return helpers.updatePositionProperties({ yScrollPosition: 0, xScrollPosition: 0, force: true}, state, helpers, true);
// }

// export function GRIDDLE_FILTERED_AFTER(state, action, helpers) {
//   return helpers.setCurrentPosition(state, 0, 0);
// }

// const actions = ['XY_POSITION_CHANGED', 'GRIDDLE_LOADED_DATA', 'GRIDDLE_GET_PAGE', 'GRIDDLE_NEXT_PAGE',
//                  'GRIDDLE_PREVIOUS_PAGE', 'GRIDDLE_FILTERED', 'GRIDDLE_SORT', 'GRIDDLE_TOGGLE_COLUMN'];

// export function AFTER_REDUCE(state, action, helpers) {
//   if (actions.includes(action.type)) {
//     return helpers.updateRenderedData(state, helpers);
//   }
//   return state;
// }
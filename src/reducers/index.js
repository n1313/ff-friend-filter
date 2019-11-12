import { reducer as userReducer, initialState as userIS } from './user';
import { reducer as subsReducer, initialState as subsIS } from './subs';

export const initialState = {
  ...userIS,
  ...subsIS
};

export function reducer(state, action) {
  if (!action.type) {
    throw new Error(`Action has no type (${action})`);
  }

  const reducers = [userReducer, subsReducer];
  for (let r = 0; r < reducers.length; r++) {
    const result = reducers[r](state, action);
    if (result) {
      return result;
    }
  }
  throw new Error(`Unknown action ${action.type}`);
}

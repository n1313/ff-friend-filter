import { reducer as userReducer, initialState as userIS } from './user';
import { reducer as subsReducer, initialState as subsIS } from './subs';
import { reducer as myReducer, initialState as myIS } from './my';

export const initialState = {
  ...userIS,
  ...subsIS,
  ...myIS
};

export function reducer(state, action) {
  if (!action.type) {
    throw new Error(`Action has no type (${action})`);
  }

  const reducers = [userReducer, subsReducer, myReducer];
  for (let r = 0; r < reducers.length; r++) {
    const result = reducers[r](state, action);
    if (result) {
      return result;
    }
  }
  throw new Error(`Unknown action ${action.type}`);
}

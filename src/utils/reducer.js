export const initialState = {
  user: {
    data: {},
    isPristine: true,
    hasData: false,
    loading: false,
    error: ''
  }
};

export function reducer(state, action) {
  switch (action.type) {
    case 'logout': {
      return initialState;
    }

    case 'submitToken': {
      return {
        ...state,
        user: {
          ...state.user,
          isPristine: false,
          error: ''
        }
      };
    }

    case 'loginStart': {
      return {
        ...state,
        user: {
          ...state.user,
          loading: true
        }
      };
    }

    case 'loginSuccess': {
      return {
        ...state,
        user: {
          data: action.payload,
          isPristine: false,
          hasData: true,
          loading: false,
          error: ''
        }
      };
    }

    case 'loginError': {
      return {
        ...state,
        user: {
          data: {},
          isPristine: false,
          hasData: false,
          loading: false,
          error: String(action.payload)
        }
      };
    }

    default: {
      throw new Error();
    }
  }
}

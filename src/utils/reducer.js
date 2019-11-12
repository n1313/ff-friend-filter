export const initialState = {
  user: {
    data: {},
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

    case 'loginStart': {
      return {
        ...state,
        user: {
          ...state.user,
          loading: true,
          error: ''
        }
      };
    }

    case 'loginSuccess': {
      return {
        ...state,
        user: {
          data: action.payload,
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

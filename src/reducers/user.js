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
    case 'user/logout': {
      return {
        ...state,
        user: {
          ...initialState.user
        }
      };
    }

    case 'user/submitToken': {
      return {
        ...state,
        user: {
          ...state.user,
          isPristine: false,
          error: ''
        }
      };
    }

    case 'user/loginStart': {
      return {
        ...state,
        user: {
          ...state.user,
          loading: true
        }
      };
    }

    case 'user/loginSuccess': {
      const me = action.payload.users;
      return {
        ...state,
        user: {
          data: me,
          isPristine: false,
          hasData: true,
          loading: false,
          error: ''
        },
        allUsers: {
          ...state.allUsers,
          [me.username]: me
        }
      };
    }

    case 'user/error': {
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
      return undefined;
    }
  }
}

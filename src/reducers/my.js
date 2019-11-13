export const initialState = {
  my: {
    data: {},
    hasData: false,
    loading: false,
    error: ''
  }
};

export function reducer(state, action) {
  switch (action.type) {
    case 'my/loadPosts': {
      return {
        ...state,
        my: {
          ...state.my,
          loading: true
        }
      };
    }

    case 'my/loadPostsSuccess': {
      return {
        ...state,
        my: {
          ...state.my,
          data: {
            ...state.my.data,
            ...action.payload
          },
          loading: false,
          hasData: true,
          error: ''
        }
      };
    }

    case 'my/error': {
      return {
        ...state,
        my: {
          data: {},
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

export const initialState = {
  allPosts: {
    data: {},
    loading: false,
    error: ''
  }
};

export function reducer(state, action) {
  switch (action.type) {
    case 'allPosts/load': {
      return {
        ...state,
        allPosts: {
          ...state.allPosts,
          loading: true
        }
      };
    }

    case 'allPosts/success': {
      const postId = action.payload.id;
      return {
        ...state,
        allPosts: {
          ...state.allPosts,
          data: {
            ...state.allPosts.data,
            [postId]: action.payload
          },
          loading: false,
          error: ''
        }
      };
    }

    case 'allPosts/error': {
      return {
        ...state,
        my: {
          data: {},
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

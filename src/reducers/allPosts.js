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
      const newUsers = {};
      action.payload.users.forEach((u) => {
        newUsers[u.id] = u;
      });

      const newComments = {};
      action.payload.comments.forEach((c) => {
        newComments[c.id] = c;
      });

      const postId = action.payload.posts.id;

      return {
        ...state,
        allPosts: {
          ...state.allPosts,
          data: {
            ...state.allPosts.data,
            [postId]: action.payload.posts
          },
          loading: false,
          error: ''
        },
        allUsers: {
          ...state.allUsers,
          ...newUsers
        },
        allComments: {
          ...state.allComments,
          ...newComments
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

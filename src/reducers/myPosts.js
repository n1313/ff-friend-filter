export const initialState = {
  myPosts: {
    data: [],
    hasData: false,
    loading: false,
    error: ''
  }
};

export function reducer(state, action) {
  switch (action.type) {
    case 'myPosts/load': {
      return {
        ...state,
        myPosts: {
          ...state.myPosts,
          loading: true
        }
      };
    }

    case 'myPosts/success': {
      const newUsers = {};
      [action.payload.subscribers, action.payload.users].forEach((list) => {
        list.forEach((u) => {
          newUsers[u.username] = u;
        });
      });

      const postIds = [...state.myPosts.data];
      const newPosts = {};
      action.payload.posts.forEach((p) => {
        newPosts[p.id] = p;
        postIds.push(p.id);
      });
      const onlyUniquePostIds = [...new Set(postIds)];

      return {
        ...state,
        myPosts: {
          ...state.myPosts,
          data: onlyUniquePostIds,
          loading: false,
          hasData: true,
          error: ''
        },
        allPosts: {
          ...state.allPosts,
          data: {
            ...state.allPosts.data,
            ...newPosts
          }
        }
      };
    }

    case 'myPosts/error': {
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

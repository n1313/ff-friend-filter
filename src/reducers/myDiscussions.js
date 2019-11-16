export const initialState = {
  myDiscussions: {
    data: [],
    hasData: false,
    loading: false,
    error: ''
  }
};

export function reducer(state, action) {
  switch (action.type) {
    case 'myDiscussions/load': {
      return {
        ...state,
        myDiscussions: {
          ...state.myDiscussions,
          loading: true
        }
      };
    }

    case 'myDiscussions/success': {
      const newUsers = {};
      [action.payload.subscribers, action.payload.users].forEach((list) => {
        list.forEach((u) => {
          newUsers[u.id] = u;
        });
      });

      const newComments = {};
      action.payload.comments.forEach((c) => {
        newComments[c.id] = c;
      });

      const postIds = [...state.myDiscussions.data];
      const newPosts = {};
      action.payload.posts.forEach((p) => {
        newPosts[p.id] = p;
        postIds.push(p.id);
      });
      const onlyUniquePostIds = [...new Set(postIds)];

      return {
        ...state,
        myDiscussions: {
          ...state.myDiscussions,
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

    case 'myDiscussions/error': {
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

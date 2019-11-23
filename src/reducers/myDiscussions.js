import config from '../utils/config';

export const initialState = {
  myDiscussions: {
    data: [],
    hasData: false,
    loading: false,
    error: '',
    offset: 0,
    max: 0,
    isDone: false
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
      const { payload, offset } = action;

      const newUsers = {};
      [payload.subscribers, payload.users].forEach((list) => {
        list.forEach((u) => {
          newUsers[u.id] = u;
        });
      });

      const newComments = {};
      payload.comments.forEach((c) => {
        newComments[c.id] = c;
      });

      const postIds = [...state.myDiscussions.data];
      const newPosts = {};
      payload.posts.forEach((p) => {
        newPosts[p.id] = p;
        postIds.push(p.id);
      });
      const onlyUniquePostIds = [...new Set(postIds)];

      const current = onlyUniquePostIds.length;
      const total =
        parseInt(state.user.data.statistics.comments, 10) +
        parseInt(state.user.data.statistics.likes, 10);
      const max = Math.min(total, config.maxPosts);
      const isDone = current >= max || offset >= max;

      return {
        ...state,
        myDiscussions: {
          ...state.myDiscussions,
          data: onlyUniquePostIds,
          loading: false,
          hasData: true,
          error: '',
          max,
          offset: offset + 30,
          isDone
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

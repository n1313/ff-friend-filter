export const initialState = {
  subs: {
    data: {},
    hasData: false,
    loading: false,
    error: ''
  }
};

export function reducer(state, action) {
  switch (action.type) {
    case 'subs/load': {
      return {
        ...state,
        subs: {
          ...state.subs,
          loading: true
        }
      };
    }

    case 'subs/success': {
      const [subscriptionsResponse, subscribersResponse] = action.payload;
      const newUsers = {};
      const data = {
        groups: [],
        subscriptions: [],
        subscribers: []
      };
      subscriptionsResponse.subscribers.forEach((u) => {
        if (u.type === 'user') {
          data.subscriptions.push(u.username);
        } else {
          data.groups.push(u.username);
        }
        newUsers[u.username] = u;
      });
      subscribersResponse.subscribers.forEach((u) => {
        data.subscribers.push(u.username);
        newUsers[u.username] = u;
      });

      return {
        ...state,
        subs: {
          ...state.subs,
          data,
          loading: false,
          hasData: true,
          error: ''
        },
        allUsers: {
          ...state.allUsers,
          ...newUsers
        }
      };
    }

    case 'subs/error': {
      return {
        ...state,
        subs: {
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

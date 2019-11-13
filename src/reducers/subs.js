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
    case 'subs/loadSubs': {
      return {
        ...state,
        subs: {
          ...state.subs,
          loading: true
        }
      };
    }

    case 'subs/loadSubsSuccess': {
      const [subscriptionsResponse, subscribersResponse] = action.payload;
      const data = {
        groups: {},
        subscriptions: {},
        subscribers: {}
      };
      subscriptionsResponse.subscribers.forEach((s) => {
        if (s.type === 'user') {
          data.subscriptions[s.username] = s;
        } else {
          data.groups[s.username] = s;
        }
      });
      subscribersResponse.subscribers.forEach((s) => {
        data.subscribers[s.username] = s;
      });
      return {
        ...state,
        subs: {
          ...state.subs,
          data,
          loading: false,
          hasData: true,
          error: ''
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

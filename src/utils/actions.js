import * as api from './api';

const actions = (dispatch, token, username) => {
  const loadSubs = () => {
    dispatch({ type: 'subs/load' });
    return Promise.all([api.getSubscriptions(token, username), api.getSubscribers(token, username)])
      .then((responses) => {
        responses.forEach((r) => {
          if (r.err) {
            throw r.err;
          }
        });
        dispatch({
          type: 'subs/success',
          payload: responses
        });
      })
      .catch((e) => {
        dispatch({ type: 'subs/error', payload: e.toString() });
        throw e;
      });
  };

  const loadMyPosts = (offset = 0) => {
    dispatch({ type: 'myPosts/load' });
    return api
      .getPosts(token, username, offset, false)
      .then((response) => {
        dispatch({
          type: 'myPosts/success',
          payload: response,
          offset
        });
      })
      .catch((e) => {
        dispatch({ type: 'myPosts/error', payload: e.toString() });
        throw e;
      });
  };

  const loadMyDiscussions = (offset = 0) => {
    dispatch({ type: 'myDiscussions/load' });
    return api
      .getMyDiscussions(token, username, offset, false)
      .then((response) => {
        dispatch({
          type: 'myDiscussions/success',
          payload: response,
          offset
        });
      })
      .catch((e) => {
        dispatch({ type: 'myDiscussions/error', payload: e.toString() });
        throw e;
      });
  };

  const loadFullPost = (postId) => {
    dispatch({ type: 'allPosts/load' });
    return api
      .getFullPost(token, postId)
      .then((response) => {
        dispatch({
          type: 'allPosts/success',
          payload: response
        });
      })
      .catch((e) => {
        dispatch({ type: 'allPosts/error', payload: e.toString() });
        throw e;
      });
  };

  return {
    loadSubs,
    loadMyPosts,
    loadMyDiscussions,
    loadFullPost
  };
};

export default actions;

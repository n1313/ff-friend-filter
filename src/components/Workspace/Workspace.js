import React from 'react';
import PropTypes from 'prop-types';

import { getSubscriptions, getSubscribers, getPosts } from '../../utils/api';
import Button from '../Button';
import SubsList from '../SubsList';
import css from './Workspace.css';

const Workspace = ({ token, user, subs, my, dispatch }) => {
  const onLoadSubs = () => {
    dispatch({ type: 'subs/loadSubs' });
    Promise.all([getSubscriptions(token, user.username), getSubscribers(token, user.username)])
      .then((responses) => {
        dispatch({
          type: 'subs/loadSubsSuccess',
          payload: responses
        });
      })
      .catch((e) => {
        dispatch({ type: 'subs/error', payload: e.toString() });
        throw e;
      });
  };

  const onLoadMy = () => {
    dispatch({ type: 'my/loadPosts' });
    getPosts(token, user.username)
      .then((responses) => {
        dispatch({
          type: 'my/loadPostsSuccess',
          payload: responses
        });
      })
      .catch((e) => {
        dispatch({ type: 'my/error', payload: e.toString() });
        throw e;
      });
  };

  const { subscribers, subscriptions, groups } = subs.data;

  return (
    <div className={css.root}>
      <div className={css.subs}>
        {subs.hasData ? (
          <>
            <h3>You are subscribed to {Object.keys(subscriptions).length} users</h3>
            <SubsList subs={subscriptions} />
            <h3>You are subscribed to {Object.keys(groups).length} groups</h3>
            <SubsList subs={groups} />
            <h3>{Object.keys(subscribers).length} people are subscribed to you</h3>
            <SubsList subs={subscribers} />
          </>
        ) : (
          <Button loading={subs.loading} onClick={onLoadSubs}>
            Load subscriptions and subscribers
          </Button>
        )}
        {subs.error ? <p className={css.error}>Error! {subs.error}</p> : false}
      </div>
      <div className={css.my}>
        {my.hasData ? (
          'Yay'
        ) : (
          <Button loading={my.loading} onClick={onLoadMy}>
            Load my data
          </Button>
        )}
        {my.error ? <p className={css.error}>Error! {my.error}</p> : false}
      </div>
    </div>
  );
};

Workspace.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired,
  subs: PropTypes.shape({
    data: PropTypes.shape({
      subscribers: PropTypes.objectOf(PropTypes.shape({})),
      groups: PropTypes.objectOf(PropTypes.shape({})),
      subscriptions: PropTypes.objectOf(PropTypes.shape({}))
    }).isRequired,
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    hasData: PropTypes.bool.isRequired
  }).isRequired,
  my: PropTypes.shape({
    data: PropTypes.shape({}).isRequired,
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    hasData: PropTypes.bool.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default React.memo(Workspace);

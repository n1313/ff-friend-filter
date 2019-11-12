import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import UserButton from '../UserButton';
import { getSubscriptions, getSubscribers } from '../../utils/api';
import css from './Workspace.css';

const Workspace = ({ token, user, subs, dispatch }) => {
  console.log('subs', subs);

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

  const { subscribers, subscriptions, groups } = subs.data;

  const byUsername = (a, b) => a.username.localeCompare(b.username);

  return (
    <div className={css.root}>
      {subs.hasData ? (
        <>
          <h3>You are subscribed to {subscriptions.length} users</h3>
          <ul>
            {subscriptions.sort(byUsername).map((s) => (
              <li key={s.id}>
                <UserButton user={s} />
              </li>
            ))}
          </ul>
          <h3>You are subscribed to {groups.length} groups</h3>
          <ul>
            {groups.sort(byUsername).map((s) => (
              <li key={s.id}>
                <UserButton user={s} />
              </li>
            ))}
          </ul>
          <h3>{subscribers.length} people are subscribed to you</h3>
          <ul>
            {subscribers.sort(byUsername).map((s) => (
              <li key={s.id}>
                <UserButton user={s} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Button loading={subs.loading} onClick={onLoadSubs}>
          Load subscriptions and subscribers
        </Button>
      )}
      {subs.error ? <p className={css.error}>Error! {subs.error}</p> : false}
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
      subscribers: PropTypes.arrayOf(PropTypes.shape({})),
      groups: PropTypes.arrayOf(PropTypes.shape({})),
      subscriptions: PropTypes.arrayOf(PropTypes.shape({}))
    }).isRequired,
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    hasData: PropTypes.bool.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default React.memo(Workspace);

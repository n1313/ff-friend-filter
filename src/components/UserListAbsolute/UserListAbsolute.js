import React from 'react';
import PropTypes from 'prop-types';

import UserButton from '../UserButton';
import css from './UserListAbsolute.css';

const CSS_HEIGHT = 1.5;

const UserListAbsolute = ({ users, subs, reverse, noWarning, noMessage }) => {
  const byLikesAndComments = (a, b) => {
    const result = a.likes + a.comments < b.likes + b.comments;
    return reverse ? !result : result;
  };
  const sortedUserIds = Object.values(users)
    .sort(byLikesAndComments)
    .map((u) => u.user.id);

  const positions = {};
  sortedUserIds.forEach((uid, position) => (positions[uid] = position));

  const iAmSubscribedToThem = (u) => subs.data.subscriptions.indexOf(u.user.id) > -1;
  const getMessage = (u) => (
    <span className={css.message}>
      , {u.likes} likes, {u.comments} comments
      {noWarning || iAmSubscribedToThem(u) ? (
        false
      ) : (
        <span className={css.attention} title={`You are not subscribed to ${u.user.username}`}>
          !
        </span>
      )}
    </span>
  );

  return (
    <ul className={css.root}>
      {Object.values(users).map((u) => {
        return (
          <li
            key={u.user.id}
            className={css.user}
            style={{ height: `${CSS_HEIGHT}em`, top: `${positions[u.user.id] * CSS_HEIGHT}em` }}
          >
            <UserButton user={u.user} />
            {noMessage ? false : getMessage(u)}
          </li>
        );
      })}
    </ul>
  );
};

UserListAbsolute.defaultProps = {
  reverse: false,
  noMessage: false,
  noWarning: false
};

UserListAbsolute.propTypes = {
  users: PropTypes.objectOf(
    PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        statistics: PropTypes.shape({ posts: PropTypes.string.isRequired })
      }),
      likes: PropTypes.number,
      comments: PropTypes.number
    })
  ).isRequired,
  subs: PropTypes.shape({
    data: PropTypes.shape({
      subscribers: PropTypes.arrayOf(PropTypes.string),
      groups: PropTypes.arrayOf(PropTypes.string),
      subscriptions: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    hasData: PropTypes.bool.isRequired
  }).isRequired,
  reverse: PropTypes.bool,
  noMessage: PropTypes.bool,
  noWarning: PropTypes.bool
};

export default React.memo(UserListAbsolute);

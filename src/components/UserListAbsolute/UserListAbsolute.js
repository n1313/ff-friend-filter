import React from 'react';
import PropTypes from 'prop-types';

import NotSubscribed from '../NotSubscribed';
import UserButton from '../UserButton';
import css from './UserListAbsolute.css';

const CSS_HEIGHT = 1.6;

const UserListAbsolute = ({ users, subs, reverse, noWarning, noMessage }) => {
  const byLikesAndComments = (a, b) => {
    const result = b.likes + b.comments - (a.likes + a.comments);
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
      {' '}
      {noWarning || iAmSubscribedToThem(u) ? (
        false
      ) : (
        <NotSubscribed username={u.user.username} />
      )}{' '}
      {u.likes} likes, {u.comments} comments
    </span>
  );

  const userList = Object.values(users);
  const isEmpty = userList.length === 0;

  return (
    <div className={css.root}>
      {isEmpty
        ? 'None so far'
        : userList.map((u, i) => {
            const position = positions[u.user.id];
            const positionDifference = position - i;
            return (
              <div
                key={u.user.id}
                className={css.user}
                style={{ height: `${CSS_HEIGHT}em`, top: `${positionDifference * CSS_HEIGHT}em` }}
              >
                <UserButton user={u.user} />
                {noMessage ? false : getMessage(u)}
              </div>
            );
          })}
    </div>
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
        id: PropTypes.string.isRequired
      }),
      likes: PropTypes.number,
      comments: PropTypes.number
    })
  ).isRequired,
  subs: PropTypes.shape({
    data: PropTypes.shape({
      subscriptions: PropTypes.arrayOf(PropTypes.string)
    }).isRequired
  }).isRequired,
  reverse: PropTypes.bool,
  noMessage: PropTypes.bool,
  noWarning: PropTypes.bool
};

export default React.memo(UserListAbsolute);

import React from 'react';
import PropTypes from 'prop-types';

import UserButton from '../UserButton';
import css from './UserList.css';

const UserList = ({ users, getMessage }) => {
  return (
    <ul className={css.root}>
      {users.map((user) => {
        return (
          <li key={user.id} className={css.user}>
            <UserButton user={user} />
            {getMessage(user)}
          </li>
        );
      })}
    </ul>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      statistics: PropTypes.shape({ posts: PropTypes.string.isRequired })
    })
  ).isRequired,
  getMessage: PropTypes.func.isRequired
};

export default React.memo(UserList);

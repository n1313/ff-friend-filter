import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './UserButton.css';

const UserButton = ({ user, className }) => {
  const cn = cx(css.root, className);
  const defaultUserpic =
    'https://freefeed.net/assets/images/default-userpic-d847c22f553dd76423b3ecd863f16a3c.svg';
  return (
    <a
      href={`https://freefeed.net/${user.username}`}
      className={cn}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={user.profilePictureLargeUrl || defaultUserpic}
        alt={user.username}
        className={css.userpic}
      />
      <span className={css.username}>{user.username}</span>
    </a>
  );
};

UserButton.defaultProps = {
  className: undefined
};

UserButton.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    profilePictureLargeUrl: PropTypes.string
  }).isRequired,
  className: PropTypes.string
};

export default React.memo(UserButton);

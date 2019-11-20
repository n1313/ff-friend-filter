import React from 'react';
import PropTypes from 'prop-types';

import css from './NotSubscribed.css';

const NotSubscribed = ({ username }) => {
  return (
    <span className={css.root} title={username ? `You are not subscribed to ${username}` : false}>
      !
    </span>
  );
};

NotSubscribed.defaultProps = {
  username: ''
};

NotSubscribed.propTypes = {
  username: PropTypes.string
};

export default React.memo(NotSubscribed);

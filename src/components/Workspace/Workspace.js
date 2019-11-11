import React from 'react';
import PropTypes from 'prop-types';

import css from './Workspace.css';

const Workspace = ({ user }) => {
  return (
    <div className={css.root}>
      You have {user.subscribers.length} subscribers and {user.subscriptions.length} subscriptions
    </div>
  );
};

Workspace.propTypes = {
  user: PropTypes.shape({
    subscribers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    subscriptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired
  }).isRequired
};

export default Workspace;

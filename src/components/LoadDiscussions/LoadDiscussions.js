import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import css from './LoadDiscussions.css';

const LoadDiscussions = ({ myDiscussions, loadMyDiscussions, max, total }) => {
  const maxDiscussions = Math.min(max, total);
  const currentDiscussions = myDiscussions.data.length;

  useEffect(() => {
    if (!myDiscussions.loading && !myDiscussions.error && currentDiscussions < maxDiscussions) {
      loadMyDiscussions(currentDiscussions);
    }
  });

  const notDone = maxDiscussions > currentDiscussions;

  return (
    <div className={css.root}>
      {notDone ? (
        <p className={css.loading}>
          Loading your recent discussions... {currentDiscussions}/{maxDiscussions}
        </p>
      ) : (
        false
      )}
      {myDiscussions.error ? <p className={css.error}>Error! {myDiscussions.error}</p> : false}
    </div>
  );
};

LoadDiscussions.propTypes = {
  myDiscussions: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.string),
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    hasData: PropTypes.bool.isRequired
  }).isRequired,
  loadMyDiscussions: PropTypes.func.isRequired,
  max: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default React.memo(LoadDiscussions);

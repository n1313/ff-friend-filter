import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import css from './LoadDiscussions.css';

const LoadDiscussions = ({ myDiscussions, loadMyDiscussions }) => {
  useEffect(() => {
    if (!myDiscussions.loading && !myDiscussions.error && !myDiscussions.isDone) {
      loadMyDiscussions(myDiscussions.offset);
    }
  });

  return (
    <div className={css.root}>
      {myDiscussions.isDone ? (
        false
      ) : (
        <div className={css.loading}>
          Loading your recent discussions...{' '}
          {myDiscussions.max ? `${myDiscussions.data.length}/${myDiscussions.max}` : ''}
        </div>
      )}
      {myDiscussions.error ? <div className={css.error}>Error! {myDiscussions.error}</div> : false}
    </div>
  );
};

LoadDiscussions.propTypes = {
  myDiscussions: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.string),
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    hasData: PropTypes.bool.isRequired,
    isDone: PropTypes.bool.isRequired,
    offset: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
  }).isRequired,
  loadMyDiscussions: PropTypes.func.isRequired
};

export default React.memo(LoadDiscussions);

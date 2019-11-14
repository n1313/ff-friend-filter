import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import css from './LoadPosts.css';

const LoadPosts = ({ myPosts, loadMyPosts, max, total }) => {
  const maxPosts = Math.min(max, total);
  const currentPosts = myPosts.data.length;

  useEffect(() => {
    if (!myPosts.loading && !myPosts.error && currentPosts < maxPosts) {
      loadMyPosts(currentPosts);
    }
  });

  return (
    <div className={css.root}>
      {myPosts.loading ? (
        <p className={css.loading}>
          Loading your recent posts... {currentPosts}/{maxPosts}
        </p>
      ) : (
        false
      )}
      {myPosts.error ? <p className={css.error}>Error! {myPosts.error}</p> : false}
    </div>
  );
};

LoadPosts.propTypes = {
  myPosts: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.string),
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    hasData: PropTypes.bool.isRequired
  }).isRequired,
  loadMyPosts: PropTypes.func.isRequired,
  max: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default React.memo(LoadPosts);

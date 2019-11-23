import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import css from './LoadPosts.css';

const LoadPosts = ({ myPosts, loadMyPosts }) => {
  useEffect(() => {
    if (!myPosts.loading && !myPosts.error && !myPosts.isDone) {
      loadMyPosts(myPosts.offset);
    }
  });

  return (
    <div className={css.root}>
      {myPosts.isDone ? (
        false
      ) : (
        <div className={css.loading}>
          Loading your recent posts... {myPosts.max ? `${myPosts.data.length}/${myPosts.max}` : ''}
        </div>
      )}
      {myPosts.error ? <div className={css.error}>Error! {myPosts.error}</div> : false}
    </div>
  );
};

LoadPosts.propTypes = {
  myPosts: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.string),
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    hasData: PropTypes.bool.isRequired,
    isDone: PropTypes.bool.isRequired,
    offset: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
  }).isRequired,
  loadMyPosts: PropTypes.func.isRequired
};

export default React.memo(LoadPosts);

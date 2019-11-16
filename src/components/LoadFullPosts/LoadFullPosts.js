import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import css from './LoadFullPosts.css';

const LoadFullPosts = ({ allPosts, loadFullPost }) => {
  const totalAllPosts = Object.keys(allPosts.data).length;
  const postsWithoutLikesOrComments = Object.values(allPosts.data).filter(
    (post) => post.omittedComments > 0 || post.omittedLikes > 0
  );

  useEffect(() => {
    if (!allPosts.loading && !allPosts.error && postsWithoutLikesOrComments.length > 0) {
      const postId = postsWithoutLikesOrComments[0].id;
      loadFullPost(postId);
    }
  });

  const notDone = postsWithoutLikesOrComments.length > 0;

  return (
    <div className={css.root}>
      {notDone ? (
        <p className={css.loading}>
          Loading likes and comments... {totalAllPosts - postsWithoutLikesOrComments.length}/
          {totalAllPosts}
        </p>
      ) : (
        false
      )}
      {allPosts.error ? <p className={css.error}>Error! {allPosts.error}</p> : false}
    </div>
  );
};

LoadFullPosts.propTypes = {
  allPosts: PropTypes.shape({
    data: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.string,
        omittedComments: PropTypes.number,
        omittedLikes: PropTypes.number
      })
    ),
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired
  }).isRequired,
  loadFullPost: PropTypes.func.isRequired
};

export default React.memo(LoadFullPosts);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import css from './LoadFullPosts.css';

const LoadFullPosts = ({ allPosts, loadFullPost, myPosts, myDiscussions }) => {
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
  const knownMyPosts = Object.keys(myPosts.data).length;
  const knownMyDiscussions = Object.keys(myDiscussions.data).length;

  return (
    <div className={css.root}>
      {notDone ? (
        <div className={css.loading}>
          Loading likes and comments... {totalAllPosts - postsWithoutLikesOrComments.length}/
          {totalAllPosts}
        </div>
      ) : (
        <div className={css.done}>
          Based on activity in your latest {knownMyPosts} posts and {knownMyDiscussions} posts you
          participated in...
        </div>
      )}
      {allPosts.error ? <div className={css.error}>Error! {allPosts.error}</div> : false}
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
  loadFullPost: PropTypes.func.isRequired,
  myPosts: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  myDiscussions: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default React.memo(LoadFullPosts);

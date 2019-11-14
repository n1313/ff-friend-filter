import React from 'react';
import PropTypes from 'prop-types';

import actions from '../../utils/actions';
import Button from '../Button';
// import SubsList from '../SubsList';
import css from './Workspace.css';

const MAX_POSTS = 60;

const Workspace = ({ token, user, subs, myPosts, myDiscussions, allPosts, dispatch, state }) => {
  const { loadSubs, loadMyPosts, loadMyDiscussions, loadFullPost } = actions(
    dispatch,
    token,
    user.username
  );

  const maxDiscussions =
    parseInt(user.statistics.comments, 10) + parseInt(user.statistics.likes, 10);

  const totalAllPosts = Object.keys(allPosts.data).length;
  const postsWithoutLikesOrComments = Object.values(allPosts.data).filter(
    (post) => post.omittedComments > 0 || post.omittedLikes > 0
  );

  console.log('postsWithoutLikesOrComments', postsWithoutLikesOrComments);

  const onStart = () => {
    return loadSubs()
      .then(async () => {
        let postsOffset = 0;
        while (postsOffset < MAX_POSTS) {
          // eslint-disable-next-line no-await-in-loop
          await loadMyPosts(postsOffset);
          postsOffset += 30;
        }
      })
      .then(async () => {
        let discussionsOffset = 0;
        while (discussionsOffset < MAX_POSTS) {
          // eslint-disable-next-line no-await-in-loop
          await loadMyDiscussions(discussionsOffset);
          discussionsOffset += 30;
        }
      });
    // .then(async () => {
    //   console.log('state', state);
    //   console.log('postsWithoutLikesOrComments', postsWithoutLikesOrComments);

    //   while (postsWithoutLikesOrComments.length > 0) {
    //     const postId = postsWithoutLikesOrComments[0].id;
    //     console.log('postId', postId);
    //     // eslint-disable-next-line no-await-in-loop
    //     await loadFullPost(postId);
    //   }
    // });
  };

  const { subscribers, subscriptions, groups } = subs.data;

  return (
    <div className={css.root}>
      <div className={css.subs}>
        {!subs.hasData && !subs.loading ? <Button onClick={onStart}>Start</Button> : false}
        {subs.hasData ? (
          <p>
            You are subscribed to <em>{subscriptions.length} users</em> and{' '}
            <em>{groups.length} groups</em>. <em>{subscribers.length} users</em> are subscribed to
            you.
          </p>
        ) : (
          false
        )}
        {subs.loading ? <p className={css.loading}>Loading your subscriptions data...</p> : false}
        {subs.error ? <p className={css.error}>Error! {subs.error}</p> : false}
      </div>

      <div className={css.myPosts}>
        {myPosts.loading ? (
          <p className={css.loading}>
            Loading your recent posts... {myPosts.data.length}/
            {Math.min(MAX_POSTS, parseInt(user.statistics.posts, 10))}
          </p>
        ) : (
          false
        )}
        {myPosts.error ? <p className={css.error}>Error! {myPosts.error}</p> : false}
      </div>

      <div className={css.myDiscussions}>
        {myDiscussions.loading ? (
          <p className={css.loading}>
            Loading your recent discussions... {myDiscussions.data.length}/
            {Math.min(MAX_POSTS, maxDiscussions)}
          </p>
        ) : (
          false
        )}
        {myDiscussions.error ? <p className={css.error}>Error! {myDiscussions.error}</p> : false}
      </div>

      <div className={css.allPosts}>
        {allPosts.loading ? (
          <p className={css.loading}>
            Loading likes and comments... {totalAllPosts - postsWithoutLikesOrComments.length}/
            {totalAllPosts}
          </p>
        ) : (
          false
        )}
        {allPosts.error ? <p className={css.error}>Error! {allPosts.error}</p> : false}
      </div>
    </div>
  );
};

Workspace.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    statistics: PropTypes.shape({
      posts: PropTypes.string,
      comments: PropTypes.string,
      likes: PropTypes.string
    })
  }).isRequired,
  subs: PropTypes.shape({
    data: PropTypes.shape({
      subscribers: PropTypes.arrayOf(PropTypes.string),
      groups: PropTypes.arrayOf(PropTypes.string),
      subscriptions: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    hasData: PropTypes.bool.isRequired
  }).isRequired,
  myPosts: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.string),
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    hasData: PropTypes.bool.isRequired
  }).isRequired,
  myDiscussions: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.string),
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    hasData: PropTypes.bool.isRequired
  }).isRequired,
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
  dispatch: PropTypes.func.isRequired
};

export default React.memo(Workspace);

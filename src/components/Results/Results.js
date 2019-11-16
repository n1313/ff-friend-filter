import React from 'react';
import PropTypes from 'prop-types';

import ErrorBoundary from '../ErrorBoundary';
import UserListAbsolute from '../UserListAbsolute';

import css from './Results.css';

const Results = ({ state }) => {
  const { user, subs, myPosts, myDiscussions, allPosts, allUsers, allComments } = state;

  const myUserId = user.data.id;

  const myFans = {};
  myPosts.data.forEach((pid) => {
    const post = allPosts.data[pid];
    post.likes.forEach((uid) => {
      if (!myFans[uid]) {
        myFans[uid] = {
          user: allUsers[uid],
          likes: 0,
          comments: 0
        };
      }
      myFans[uid].likes += 1;
    });
    post.comments.forEach((cid) => {
      const comment = allComments[cid];
      const commentAuthorId = comment.createdBy;
      if (commentAuthorId === myUserId) {
        return;
      }
      if (!myFans[commentAuthorId]) {
        myFans[commentAuthorId] = {
          user: allUsers[commentAuthorId],
          likes: 0,
          comments: 0
        };
      }
      myFans[commentAuthorId].comments += 1;
    });
  });

  const myLoves = {};
  myDiscussions.data.forEach((pid) => {
    const post = allPosts.data[pid];
    const authorUserId = post.createdBy;
    if (authorUserId === myUserId) {
      return;
    }
    if (!myLoves[authorUserId]) {
      myLoves[authorUserId] = {
        user: allUsers[authorUserId],
        likes: 0,
        comments: 0
      };
    }
    if (post.likes.indexOf(myUserId) > -1) {
      myLoves[authorUserId].likes += 1;
    }
    post.comments.forEach((cid) => {
      const comment = allComments[cid];
      if (comment.createdBy === myUserId) {
        myLoves[authorUserId].comments += 1;
      }
    });
  });

  const iHaveFans = Object.keys(myFans).length > 0;
  const iHaveAHeart = Object.keys(myLoves).length > 0;

  return (
    <div className={css.root}>
      <div className={css.columns}>
        {iHaveFans ? (
          <div className={css.theyLikeMe}>
            <h3>They like me</h3>
            <ErrorBoundary>
              <UserListAbsolute users={myFans} subs={subs} />
            </ErrorBoundary>
          </div>
        ) : (
          false
        )}
        {iHaveAHeart ? (
          <div className={css.iLikeThem}>
            <h3>I like them</h3>
            <ErrorBoundary>
              <UserListAbsolute users={myLoves} subs={subs} />
            </ErrorBoundary>
          </div>
        ) : (
          false
        )}
      </div>
    </div>
  );
};

Results.propTypes = {
  state: PropTypes.shape({
    user: PropTypes.shape({
      data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        statistics: PropTypes.shape({
          posts: PropTypes.string,
          comments: PropTypes.string,
          likes: PropTypes.string
        })
      }).isRequired,
      error: PropTypes.string.isRequired,
      loading: PropTypes.bool.isRequired,
      hasData: PropTypes.bool.isRequired
    }).isRequired,
    subs: PropTypes.shape({}).isRequired,
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
          likes: PropTypes.arrayOf(PropTypes.string),
          comments: PropTypes.arrayOf(PropTypes.string),
          omittedComments: PropTypes.number.isRequired,
          omittedLikes: PropTypes.number.isRequired,
          createdBy: PropTypes.string.isRequired
        })
      ),
      error: PropTypes.string.isRequired,
      loading: PropTypes.bool.isRequired
    }).isRequired,
    allUsers: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      })
    ).isRequired,
    allComments: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        createdBy: PropTypes.string.isRequired
      })
    ).isRequired
  })
};

export default React.memo(Results);

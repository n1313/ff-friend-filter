import React from 'react';
import PropTypes from 'prop-types';

import ErrorBoundary from '../ErrorBoundary';
import UserListAbsolute from '../UserListAbsolute';

import css from './Results.css';

const Results = ({ state }) => {
  const { user, subs, myPosts, myDiscussions, allPosts, allUsers, allComments } = state;

  const myUserId = user.data.id;

  const myHaters = {};
  subs.data.subscribers.forEach((uid) => {
    myHaters[uid] = {
      user: allUsers[uid],
      likes: 0,
      comments: 0
    };
  });

  const myHates = {};
  subs.data.subscriptions.forEach((uid) => {
    myHates[uid] = {
      user: allUsers[uid],
      likes: 0,
      comments: 0
    };
  });

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
      if (myHaters[uid]) {
        delete myHaters[uid];
      }
    });
    post.comments.forEach((cid) => {
      const comment = allComments[cid];
      const uid = comment.createdBy;
      if (!uid) {
        return;
      }
      if (uid === myUserId) {
        return;
      }
      if (!myFans[uid]) {
        myFans[uid] = {
          user: allUsers[uid],
          likes: 0,
          comments: 0
        };
      }
      myFans[uid].comments += 1;
      if (myHaters[uid]) {
        delete myHaters[uid];
      }
    });
  });

  const myLoves = {};
  myDiscussions.data.forEach((pid) => {
    const post = allPosts.data[pid];
    const uid = post.createdBy;
    if (uid === myUserId) {
      return;
    }
    if (!myLoves[uid]) {
      myLoves[uid] = {
        user: allUsers[uid],
        likes: 0,
        comments: 0
      };
    }
    if (post.likes.indexOf(myUserId) > -1) {
      myLoves[uid].likes += 1;
      if (myHates[uid]) {
        delete myHates[uid];
      }
    }
    post.comments.forEach((cid) => {
      const comment = allComments[cid];
      if (comment.createdBy === myUserId) {
        myLoves[uid].comments += 1;
        if (myHates[uid]) {
          delete myHates[uid];
        }
      }
    });
  });

  const iHaveFans = Object.keys(myFans).length > 0;
  const iHaveAHeart = Object.keys(myLoves).length > 0;
  const iAmSoHated = Object.keys(myHaters).length > 0;
  const iAmSoHateful = Object.keys(myHates).length > 0;

  return (
    <div className={css.root}>
      <div className={css.body}>
        {iHaveFans ? (
          <div className={css.col}>
            <h3>They like you</h3>
            <p className={css.hint}>
              <small>Your posts have received likes or comments from them</small>
            </p>
            <ErrorBoundary>
              <UserListAbsolute users={myFans} subs={subs} />
            </ErrorBoundary>
          </div>
        ) : (
          false
        )}
        {iHaveAHeart ? (
          <div className={css.col}>
            <h3>You like them</h3>
            <p className={css.hint}>
              <small>You have liked or commented on their posts</small>
            </p>
            <ErrorBoundary>
              <UserListAbsolute users={myLoves} subs={subs} />
            </ErrorBoundary>
          </div>
        ) : (
          false
        )}
        {iAmSoHated ? (
          <div className={css.col}>
            <h3>They don&apos;t like you</h3>
            <p className={css.hint}>
              <small>They are subscribed to you but do neither like nor comment your posts</small>
            </p>
            <ErrorBoundary>
              <UserListAbsolute users={myHaters} subs={subs} noWarning noMessage />
            </ErrorBoundary>
          </div>
        ) : (
          false
        )}
        {iAmSoHateful ? (
          <div className={css.col}>
            <h3>You don&apos;t like them</h3>
            <p className={css.hint}>
              <small>You are subscribed to them but do neither like nor comment their posts</small>
            </p>
            <ErrorBoundary>
              <UserListAbsolute users={myHates} subs={subs} noWarning noMessage />
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
    subs: PropTypes.shape({
      data: PropTypes.shape({
        subscribers: PropTypes.arrayOf(PropTypes.string),
        subscriptions: PropTypes.arrayOf(PropTypes.string)
      }).isRequired
    }),
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
        createdBy: PropTypes.string
      })
    ).isRequired
  })
};

export default React.memo(Results);

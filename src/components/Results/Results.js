import React from 'react';
import PropTypes from 'prop-types';

import ErrorBoundary from '../ErrorBoundary';
import ShareDialog from '../ShareDialog';
import NotSubscribed from '../NotSubscribed';
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
    }
    post.comments.forEach((cid) => {
      const comment = allComments[cid];
      if (comment.createdBy === myUserId) {
        myLoves[uid].comments += 1;
      }
    });
  });

  const myFansCount = Object.keys(myFans).length;
  const myLovesCount = Object.keys(myLoves).length;

  return (
    <div className={css.root}>
      <div className={css.body}>
        <div className={css.col}>
          <h3>They like you ({myFansCount})</h3>
          <p className={css.hint}>
            <small>
              Your posts have received likes or comments from them.
              <br />
              <NotSubscribed /> indicates people that you are not yet subscribed to.
            </small>
          </p>
          <ErrorBoundary>
            <UserListAbsolute users={myFans} subs={subs} />
          </ErrorBoundary>
          <ErrorBoundary>
            <ShareDialog users={myFans} mode="myFans" />
          </ErrorBoundary>
        </div>
        <div className={css.col}>
          <h3>You like them ({myLovesCount})</h3>
          <p className={css.hint}>
            <small>You have liked or commented on their posts.</small>
          </p>
          <ErrorBoundary>
            <UserListAbsolute users={myLoves} subs={subs} />
          </ErrorBoundary>
          <ErrorBoundary>
            <ShareDialog users={myLoves} mode="myLoves" />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

Results.propTypes = {
  state: PropTypes.shape({
    user: PropTypes.shape({
      data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    subs: PropTypes.shape({}),
    myPosts: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    myDiscussions: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    allPosts: PropTypes.shape({
      data: PropTypes.objectOf(
        PropTypes.shape({
          id: PropTypes.string,
          likes: PropTypes.arrayOf(PropTypes.string),
          comments: PropTypes.arrayOf(PropTypes.string),
          createdBy: PropTypes.string.isRequired
        })
      )
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

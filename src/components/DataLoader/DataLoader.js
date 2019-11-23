import React from 'react';
import PropTypes from 'prop-types';

import actions from '../../utils/actions';

import ErrorBoundary from '../ErrorBoundary';
import LoadSubscriptions from '../LoadSubscriptions';
import LoadPosts from '../LoadPosts';
import LoadDiscussions from '../LoadDiscussions';
import LoadFullPosts from '../LoadFullPosts';

import css from './DataLoader.css';

const DataLoader = ({ state, dispatch, token }) => {
  const { user, subs, myPosts, myDiscussions, allPosts } = state;

  const { loadSubs, loadMyPosts, loadMyDiscussions, loadFullPost } = actions(
    dispatch,
    token,
    user.data.username
  );

  const canLoadSubscriptions = true;
  const canLoadPosts = subs.isDone && !myPosts.isDone;
  const canLoadDiscussions = myPosts.isDone && !myDiscussions.isDone;
  const canLoadFullPosts = myDiscussions.isDone;

  return (
    <div className={css.root}>
      {canLoadSubscriptions ? (
        <ErrorBoundary>
          <LoadSubscriptions subs={subs} loadSubs={loadSubs} />
        </ErrorBoundary>
      ) : (
        false
      )}
      {canLoadPosts ? (
        <ErrorBoundary>
          <LoadPosts myPosts={myPosts} loadMyPosts={loadMyPosts} />
        </ErrorBoundary>
      ) : (
        false
      )}
      {canLoadDiscussions ? (
        <ErrorBoundary>
          <LoadDiscussions myDiscussions={myDiscussions} loadMyDiscussions={loadMyDiscussions} />
        </ErrorBoundary>
      ) : (
        false
      )}
      {canLoadFullPosts ? (
        <ErrorBoundary>
          <LoadFullPosts
            allPosts={allPosts}
            loadFullPost={loadFullPost}
            myPosts={myPosts}
            myDiscussions={myDiscussions}
          />
        </ErrorBoundary>
      ) : (
        false
      )}
    </div>
  );
};

DataLoader.propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  state: PropTypes.shape({
    user: PropTypes.shape({
      data: PropTypes.shape({
        username: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    subs: PropTypes.shape({
      isDone: PropTypes.bool.isRequired
    }),
    myPosts: PropTypes.shape({
      isDone: PropTypes.bool.isRequired
    }).isRequired,
    myDiscussions: PropTypes.shape({
      isDone: PropTypes.bool.isRequired
    }).isRequired,
    allPosts: PropTypes.shape({}).isRequired
  })
};

export default DataLoader;

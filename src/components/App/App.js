import React, { useReducer, useEffect } from 'react';
import { useCookie } from '@use-hook/use-cookie';
import 'whatwg-fetch';
import 'milligram/dist/milligram.css';

import { reducer, initialState } from '../../reducers';
import { getWhoAmI } from '../../utils/api';
import actions from '../../utils/actions';

import ErrorBoundary from '../ErrorBoundary';
import Welcome from '../Welcome';
import LoadSubscriptions from '../LoadSubscriptions';
import LoadPosts from '../LoadPosts';
import LoadDiscussions from '../LoadDiscussions';
import LoadFullPosts from '../LoadFullPosts';
import Results from '../Results';
import css from './App.css';

const MAX_POSTS = 120;

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [token, setToken] = useCookie('ffff-token', '');

  const { user, subs, myPosts, myDiscussions, allPosts } = state;

  useEffect(() => {
    if (token && !user.loading && !user.error && !user.hasData) {
      dispatch({ type: 'user/loginStart' });
      getWhoAmI(token)
        .then((response) => {
          if (response.err) {
            dispatch({ type: 'user/error', payload: response.err });
            setToken('');
            return;
          }
          dispatch({
            type: 'user/loginSuccess',
            payload: response
          });
        })
        .catch((e) => {
          dispatch({ type: 'user/error', payload: e.toString() });
          // setToken('');
          throw e;
        });
    }
  });

  const { loadSubs, loadMyPosts, loadMyDiscussions, loadFullPost } = actions(
    dispatch,
    token,
    user.data.username
  );

  const canLoadSubscriptions = true;
  const canLoadPosts = canLoadSubscriptions && subs.hasData && !subs.loading && !subs.error;
  const canLoadDiscussions = canLoadPosts && myPosts.hasData && !myPosts.loading && !myPosts.error;
  const canLoadFullPosts =
    canLoadDiscussions && myDiscussions.hasData && !myDiscussions.loading && !myDiscussions.error;

  // console.log('JSON.stringify(state)', JSON.stringify(state));

  return (
    <div className={css.root}>
      <header>
        <h1 className={css.header}>
          F<span className={css.abbr}>ree</span>F<span className={css.abbr}>eed </span>F
          <span className={css.abbr}>riend </span>F<span className={css.abbr}>inder</span>
        </h1>
      </header>
      <section className={css.welcome}>
        <ErrorBoundary>
          <Welcome token={token} setToken={setToken} user={user} dispatch={dispatch} />
        </ErrorBoundary>
      </section>

      {user.hasData ? (
        <main>
          <div className={css.progressStatus}>
            {canLoadSubscriptions ? (
              <ErrorBoundary>
                <LoadSubscriptions subs={subs} loadSubs={loadSubs} />
              </ErrorBoundary>
            ) : (
              false
            )}
            {canLoadPosts ? (
              <ErrorBoundary>
                <LoadPosts
                  myPosts={myPosts}
                  loadMyPosts={loadMyPosts}
                  max={MAX_POSTS}
                  total={parseInt(user.data.statistics.posts, 10)}
                />
              </ErrorBoundary>
            ) : (
              false
            )}
            {canLoadDiscussions ? (
              <ErrorBoundary>
                <LoadDiscussions
                  myDiscussions={myDiscussions}
                  loadMyDiscussions={loadMyDiscussions}
                  max={MAX_POSTS}
                  total={
                    parseInt(user.data.statistics.comments, 10) +
                    parseInt(user.data.statistics.likes, 10)
                  }
                />
              </ErrorBoundary>
            ) : (
              false
            )}
            {canLoadFullPosts ? (
              <ErrorBoundary>
                <LoadFullPosts allPosts={allPosts} loadFullPost={loadFullPost} />
              </ErrorBoundary>
            ) : (
              false
            )}
          </div>
          <ErrorBoundary>
            <Results state={state} />
          </ErrorBoundary>
        </main>
      ) : (
        false
      )}
    </div>
  );
};

export default App;

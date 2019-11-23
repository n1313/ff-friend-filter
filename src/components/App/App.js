import React, { useReducer, useEffect } from 'react';
import { useCookie } from '@use-hook/use-cookie';
import 'whatwg-fetch';
import 'milligram/dist/milligram.css';

import { reducer, initialState } from '../../reducers';
import { getWhoAmI } from '../../utils/api';

import ErrorBoundary from '../ErrorBoundary';
import Welcome from '../Welcome';
import DataLoader from '../DataLoader';
import Results from '../Results';
import css from './App.css';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  window.__state = state;
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
          throw e;
        });
    }
  });

  const canShowResults =
    !subs.error &&
    subs.hasData &&
    !myPosts.error &&
    myPosts.hasData &&
    !myDiscussions.error &&
    myDiscussions.hasData &&
    !allPosts.error;

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
        <main className={css.main}>
          <ErrorBoundary>
            <DataLoader state={state} dispatch={dispatch} token={token} />
          </ErrorBoundary>
          {canShowResults ? (
            <ErrorBoundary>
              <Results state={state} />
            </ErrorBoundary>
          ) : (
            false
          )}
        </main>
      ) : (
        false
      )}
      <footer className={css.footer}>
        <small>
          Made by{' '}
          <a href="https://freefeed.net/n1313" target="_blank" rel="noreferrer noopener">
            @n1313
          </a>
          . Send me a DM if you have any questions.
        </small>
      </footer>
    </div>
  );
};

export default App;

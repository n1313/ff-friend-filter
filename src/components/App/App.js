import React, { useReducer, useEffect } from 'react';
import { useCookie } from '@use-hook/use-cookie';
import 'whatwg-fetch';
import 'milligram/dist/milligram.css';

import { reducer, initialState } from '../../reducers';
import { getWhoAmI } from '../../utils/api';

import ErrorBoundary from '../ErrorBoundary';
import Welcome from '../Welcome';
import Workspace from '../Workspace';
import css from './App.css';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [token, setToken] = useCookie('ffff-token', '');

  const { user, subs, my } = state;

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
          setToken('');
          throw e;
        });
    }
  });

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
      <main>
        <ErrorBoundary>
          {user.hasData ? (
            <Workspace token={token} user={user.data} subs={subs} my={my} dispatch={dispatch} />
          ) : (
            false
          )}
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default App;

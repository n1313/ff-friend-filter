import React, { useState, useEffect } from 'react';
import { useCookie } from '@use-hook/use-cookie';
import 'whatwg-fetch';
import 'milligram/dist/milligram.css';

import { getWhoAmI } from '../../utils/api';

import Welcome from '../Welcome';
import Workspace from '../Workspace';
import css from './App.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useCookie('ffff-token', '');
  const [user, setUser] = useState({});

  useEffect(() => {
    if (token && !loading && !error && !user.username) {
      setLoading(true);
      getWhoAmI(token)
        .then((response) => {
          if (response.err) {
            setUser({});
            setLoading(false);
            setError(response.err);
            return;
          }
          setUser({
            username: response.users.username,
            profilePictureLargeUrl: response.users.profilePictureLargeUrl,
            subscribers: response.users.subscribers,
            subscriptions: response.users.subscriptions
          });
          setLoading(false);
        })
        .catch((e) => {
          setUser({});
          setLoading(false);
          setError(e.toString());
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
        <Welcome error={error} token={token} setToken={setToken} user={user} setUser={setUser} />
        {loading ? <p className={css.loading}>Loading...</p> : false}
        {error ? <p className={css.error}>Error! {error}</p> : false}
      </section>
      <main>{user.username ? <Workspace user={user} /> : false}</main>
    </div>
  );
};

export default App;

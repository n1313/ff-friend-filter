import React, { useState } from 'react';
import PropTypes from 'prop-types';

import UserButton from '../UserButton';
import css from './Welcome.css';

const Welcome = ({ token, setToken, user, dispatch }) => {
  const [localToken, setLocalToken] = useState('');

  const onSubmit = () => setToken(localToken);
  const onChange = (e) => setLocalToken(e.target.value);
  const onLogout = () => {
    setToken('');
    dispatch({ type: 'logout' });
  };

  const scopes = ['read-my-info', 'read-feeds', 'manage-subscription-requests'];
  const scopesSpans = scopes.map((scope) => <code key={scope}>{scope}</code>);
  const scopesUrl = scopes.join('%20');

  return (
    <div className={css.root}>
      {user.hasData ? (
        <header className={css.iKnowYou}>
          <h3>
            Hello, <UserButton user={user.data} className={css.you} />!
          </h3>
          <button type="button" onClick={onLogout} className={css.logout}>
            Logout
          </button>
        </header>
      ) : (
        false
      )}
      {!token || user.error ? (
        <section className={css.whoAreYou}>
          <h3>Who are you?</h3>
          <p>
            Please give me an access token so that I could authenticate you and run queries on your
            behalf. You can create an access token manually on{' '}
            <a
              href="https://freefeed.net/settings/app-tokens/create"
              target="_blank"
              rel="noopener noreferrer"
            >
              Generate new token
            </a>{' '}
            page (I need the following scopes: {scopesSpans}) or simply
            <br />
            <a
              href={`https://freefeed.net/settings/app-tokens/create?title=FFFF&scopes=${scopesUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className={css.magic}
            >
              click this magic link
            </a>{' '}
            and have most of the work done for you. Then, copy and paste the token in the form
            below.
          </p>
          <form onSubmit={onSubmit} className={css.form}>
            <label htmlFor="token">
              Access token
              <textarea
                onChange={onChange}
                required
                id="token"
                value={localToken}
                className={css.token}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        </section>
      ) : (
        false
      )}

      {user.loading ? <p className={css.loading}>Loading...</p> : false}
      {user.error ? <p className={css.error}>Error! {user.error}</p> : false}
    </div>
  );
};

Welcome.propTypes = {
  user: PropTypes.shape({
    data: PropTypes.shape({
      username: PropTypes.string,
      profilePictureLargeUrl: PropTypes.string
    }).isRequired,
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    hasData: PropTypes.bool.isRequired
  }),
  token: PropTypes.string.isRequired,
  setToken: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default React.memo(Welcome);

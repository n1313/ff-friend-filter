import React, { useState } from 'react';
import PropTypes from 'prop-types';

import UserButton from '../UserButton';
import Button from '../Button';
import css from './Welcome.css';

const Welcome = ({ token, setToken, user, dispatch }) => {
  const [localToken, setLocalToken] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setToken(localToken);
    dispatch({ type: 'user/submitToken' });
  };
  const onChange = (e) => setLocalToken(e.target.value);
  const onLogout = () => {
    setToken('');
    dispatch({ type: 'user/logout' });
  };

  const scopes = ['read-my-info', 'read-users-info', 'read-feeds'];
  const scopesSpans = scopes.map((scope) => (
    <React.Fragment key={scope}>
      {' '}
      <code>{scope}</code>
    </React.Fragment>
  ));
  const scopesUrl = scopes.join('%20');

  const welcomeNode = (
    <header className={css.iKnowYou}>
      <h3>
        Hello, <UserButton user={user.data} className={css.you} />!
      </h3>
      <Button small secondary onClick={onLogout} className={css.logout}>
        Logout
      </Button>
    </header>
  );

  const tokenFormNode = (
    <section className={css.whoAreYou}>
      <h3>What is this?</h3>
      <p>
        This a service that will analyze your FreeFeed account and your recent FreeFeed activity to
        show you data about how your subscribers interact with you, and how you interact with your
        subscribers, like a list of people who like your posts the most, or a list of people whose
        posts you like the most.
      </p>
      <h3>Access token</h3>
      <p>
        Please give me an access token so that I could retrieve the data I need. You can create an
        access token manually on{' '}
        <a
          href="https://freefeed.net/settings/app-tokens/create"
          target="_blank"
          rel="noopener noreferrer"
        >
          Generate new token
        </a>{' '}
        page (with following permissions: {scopesSpans}) or simply{' '}
        <a
          href={`https://freefeed.net/settings/app-tokens/create?title=FFFF&scopes=${scopesUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={css.magic}
        >
          click this magic link
        </a>{' '}
        and have most of the work done for you. Then, copy and paste the token in the form below.
      </p>
      <form onSubmit={onSubmit} className={css.form}>
        <label htmlFor="token">
          Access token
          <textarea onChange={onChange} id="token" value={localToken} className={css.token} />
        </label>
        <Button type="submit" loading={user.loading}>
          Submit
        </Button>
      </form>
    </section>
  );

  if (user.isPristine && !user.error && token) {
    return false;
  }

  return (
    <div className={css.root}>
      {user.hasData ? welcomeNode : tokenFormNode}
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
    hasData: PropTypes.bool.isRequired,
    isPristine: PropTypes.bool.isRequired
  }),
  token: PropTypes.string.isRequired,
  setToken: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default React.memo(Welcome);

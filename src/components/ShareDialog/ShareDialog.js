import React, { useState } from 'react';
import PropTypes from 'prop-types';

import config from '../../utils/config';

import css from './ShareDialog.css';

const ShareDialog = ({ users, mode }) => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);
  const byLikesAndComments = (a, b) => {
    const result = b.likes + b.comments - (a.likes + a.comments);
    return result;
  };

  const userList = Object.values(users)
    .sort(byLikesAndComments)
    .slice(0, 10);
  const isEmpty = userList.length === 0;

  const getUserLine = (u, i) => {
    return `${i + 1}. @${u.user.username}: ${u.likes} likes, ${u.comments} comments`;
  };
  const userListMessage = isEmpty ? 'Nobody!' : userList.map(getUserLine).join('\n');

  const message = `Here are the top 10 people who ${
    mode === 'myFans' ? 'liked me' : 'I liked'
  } on FreeFeed the most (based on ${
    mode === 'myFans'
      ? `my last ${config.maxPosts} posts`
      : `the last ${config.maxPosts} posts I liked/commented on`
  }):\n\n${userListMessage}\n\nGet to know yours at https://n1313.ru/ffff/! #freefeedfriendfinder`;

  return (
    <div className={css.root}>
      <button type="button" className={css.button} onClick={toggleForm}>
        Share!
      </button>
      {showForm ? <textarea className={css.textarea} defaultValue={message} /> : false}
    </div>
  );
};

ShareDialog.propTypes = {
  users: PropTypes.objectOf(
    PropTypes.shape({
      user: PropTypes.shape({
        username: PropTypes.string.isRequired
      }),
      likes: PropTypes.number,
      comments: PropTypes.number
    })
  ).isRequired,
  mode: PropTypes.oneOf(['myFans', 'myLoves']).isRequired
};

export default React.memo(ShareDialog);

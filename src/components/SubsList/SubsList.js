import React from 'react';
import PropTypes from 'prop-types';

import UserButton from '../UserButton';
import css from './SubsList.css';

const SubsList = ({ subs }) => {
  console.log('subs', subs);
  return (
    <ul className={css.root}>
      {Object.keys(subs)
        .sort()
        .map((s) => {
          const user = subs[s];
          const isGroup = user.type === 'group';
          return (
            <li key={user.id}>
              <UserButton user={user} />
              {isGroup ? '' : `, ${user.statistics.posts} posts`}
            </li>
          );
        })}
    </ul>
  );
};

SubsList.propTypes = {
  subs: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      statistics: PropTypes.shape({ posts: PropTypes.string.isRequired })
    })
  ).isRequired
};

export default React.memo(SubsList);

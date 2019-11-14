import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import css from './LoadSubscriptions.css';

const LoadSubscriptions = ({ subs, loadSubs }) => {
  return (
    <div className={css.root}>
      {!subs.hasData && !subs.loading ? <Button onClick={loadSubs}>Start</Button> : false}
      {subs.loading ? <p className={css.loading}>Loading your subscriptions data...</p> : false}
      {subs.error ? <p className={css.error}>Error! {subs.error}</p> : false}
    </div>
  );
};

LoadSubscriptions.propTypes = {
  subs: PropTypes.shape({
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    hasData: PropTypes.bool.isRequired
  }).isRequired,
  loadSubs: PropTypes.func.isRequired
};

export default React.memo(LoadSubscriptions);

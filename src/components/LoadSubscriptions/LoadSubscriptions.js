import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import css from './LoadSubscriptions.css';

const LoadSubscriptions = ({ subs, loadSubs }) => {
  return (
    <div className={css.root}>
      {!subs.hasData && !subs.loading ? <Button onClick={loadSubs}>Start</Button> : false}
      {subs.loading ? <div className={css.loading}>Loading your subscriptions data...</div> : false}
      {subs.error ? <div className={css.error}>Error! {subs.error}</div> : false}
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

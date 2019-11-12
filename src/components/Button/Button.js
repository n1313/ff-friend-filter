import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './Button.css';

const Button = ({ className, children, loading, small, secondary, ...other }) => {
  const cn = cx(
    css.root,
    secondary ? css.secondary : css.primary,
    loading ? css.loading : false,
    small ? css.small : false,
    className
  );

  return (
    <button type="button" {...other} className={cn}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: undefined,
  loading: false,
  small: false,
  secondary: false
};

Button.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  small: PropTypes.bool,
  secondary: PropTypes.bool,
  className: PropTypes.string
};

export default React.memo(Button);

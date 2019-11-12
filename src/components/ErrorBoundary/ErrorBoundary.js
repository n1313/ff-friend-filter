import React from 'react';
import PropTypes from 'prop-types';

import css from './ErrorBoundary.css';

class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: {}, errorInfo: {} };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
  }

  render() {
    const { children } = this.props;
    const { error, errorInfo, hasError } = this.state;

    if (hasError) {
      const errorLocation = errorInfo.componentStack
        ? errorInfo.componentStack
            .split('\n')
            .slice(0, 2)
            .join(' ')
        : '';

      return (
        <div className={css.root}>
          <h4 className={css.header}>Oops!</h4>
          <div className={css.details}>
            {error.name}: {error.message} {errorLocation}
          </div>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node
};

export default ErrorBoundary;

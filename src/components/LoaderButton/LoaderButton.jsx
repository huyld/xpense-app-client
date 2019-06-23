import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Octicon, { Sync } from '@primer/octicons-react';

/**
 * Button with spinning icon
 */
// eslint-disable-next-line react/display-name
const LoaderButton = ({
  isLoading,
  text,
  loadingText,
  className = '',
  disabled = false,
  ...props
}) =>
  <Button
    className={`LoaderButton ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && <Octicon icon={Sync} className="spinning" />}
    {!isLoading ? text : loadingText}
  </Button>;

LoaderButton.propTypes = {
  isLoading: PropTypes.bool,
  text: PropTypes.string,
  loadingText: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default LoaderButton;

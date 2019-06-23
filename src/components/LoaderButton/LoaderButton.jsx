import React from 'react';
import { Button } from 'react-bootstrap';
import Octicon, { Sync } from '@primer/octicons-react';

/**
 * Button with spinning icon
 */
// eslint-disable-next-line react/display-name
export default ({
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

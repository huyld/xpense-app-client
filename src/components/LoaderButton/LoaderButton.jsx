import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

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
    {isLoading && <Glyphicon glyph="refresh" className="spinning" />}
    {!isLoading ? text : loadingText}
  </Button>;

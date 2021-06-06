import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ children, idGoogleSignIn, ...otherProps }) => (
  <button className={`${idGoogleSignIn && 'google-sign-in'} custom-button`} {...otherProps}>
    {children}
  </button>
);

export default CustomButton;
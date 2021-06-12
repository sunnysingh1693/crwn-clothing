import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ children, idGoogleSignIn, ...otherProps }) => (
  <button className={`${idGoogleSignIn && 'google-sign-in'} custom-button`} {...otherProps}>
    {children} {/* {children} is the value/content that we pass in-between the tags of a component.  */}
  </button>
);

export default CustomButton;
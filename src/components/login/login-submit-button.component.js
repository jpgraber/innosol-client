import React, { PropTypes } from 'react';
import Ripple from '../ripple/ripple.component';
import LoadingSpinner from '../loadingSpinner/loading-spinner';
import classNames from 'classnames';
import './login-submit-button.component.css';

const LoginSubmitButton = ({onButtonClick, status}) => {
  const getBtnClassName = () => classNames('login-submitBtn', {'login-submitBtn_inactive': (status === 'authenticating' || status === 'authenticated')});
  const renderLoadingSpinner = () => {
    console.log(status);
    return ( <div className="login-submitBtn-downloadSpinner"><LoadingSpinner success={status === 'authenticated'} /></div> )
  }

  return (
    <div className="login-submit">
      <button className={getBtnClassName()} onClick={onButtonClick}>
        {(status === 'authenticating' || status === 'authenticated') && renderLoadingSpinner()}
        <span className="login-submitBtn_text">Log In</span>
      </button>
    </div>
  );
};

LoginSubmitButton.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired
}

export default LoginSubmitButton;

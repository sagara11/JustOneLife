import React from "react";
import "./styles.scss";
import metaMaskLogo from "../../assets/images/metamask-logo.png";

function LoginForm() {
  return (
    <div className="login-form">
      <h1 className="login-form__title">Medical Records System</h1>
      <div className="login-form__content">
        <h3>Connect your wallet</h3>
        <div className="metamask__wrapper">
          <img src={metaMaskLogo} alt="meta-mask-logo" />
        </div>
      </div>
    </div>
  );
}
export default LoginForm;

import React from "react";
import "./styles.scss";
import loginBackground from "../../assets/images/login-background.jpg";
import LoginForm from "../../features/authentication/LoginForm";
import {Row, Col} from "react-bootstrap";
import Header from "../../components/Header";
import AdditionalRegisterForm from "../../features/authentication/AdditionalRegisterForm";

function AuthenticationPage({register}) {
  return (
    <>
      <Header />
      <div id="authentication-page">
        <Row className="h-100">
          <Col md={5} style={{position: "relative"}}>
            <div className="background__wrapper">
              <img src={loginBackground} alt="login-background" />
            </div>
            <div className="background__wrapper--opacity"></div>
          </Col>
          <Col md={7}>
            <div className="login-form__wrapper">
              {register ? <AdditionalRegisterForm /> : <LoginForm />}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AuthenticationPage;

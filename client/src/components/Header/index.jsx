import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./styles.scss";
import appLogo from "../../assets/images/app-logo.png";

function Header() {
  return (
    <div id="header">
      <Container>
        <Row>
          <Col md={2}>
            <div className="logo__wrapper">
              <img src={appLogo} alt="app-logo" />
            </div>
          </Col>
          <Col md={10}>
            <div className="header-menu__wrapper">
              <a href="/" className="header-menu__item">
                Đăng nhập
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Header;

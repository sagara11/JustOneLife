import React from "react";
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import "./styles.scss";
import appLogo from "../../assets/images/app-logo.png";
import {globalState} from "../../features/global/globalSlice";
import {useDispatch, useSelector} from "react-redux";
import {isEmpty} from "lodash";
import {signout} from "../../features/authentication/authenticationSlice";

function Header() {
  const {currentUser} = useSelector(globalState);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(
      signout({
        publicAddress: currentUser.publicAddress,
      })
    );
  };

  return (
    <div id="header">
      <Container>
        <Row>
          <Col md={3}>
            <div className="logo__wrapper">
              <img src={appLogo} alt="app-logo" />
            </div>
          </Col>
          {currentUser && !isEmpty(currentUser.email) ? (
            <>
              <Col md={6}>
                <div className="header-navbar__wrapper">
                  <div className="header-navbar__item">Home</div>
                  <div className="header-navbar__item">About</div>
                  <div className="header-navbar__item">Research</div>
                  <div className="header-navbar__item">Chat</div>
                </div>
              </Col>
              <Col md={3}>
                <div className="header-submenu__wrapper">
                  <Dropdown>
                    <Dropdown.Toggle as="p" className="header-submenu__toggle">
                      {currentUser.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#" onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>
            </>
          ) : (
            <Col md={9}>
              <div className="header-submenu__wrapper">
                <p className="header-submenu__item">Đăng nhập</p>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
export default Header;

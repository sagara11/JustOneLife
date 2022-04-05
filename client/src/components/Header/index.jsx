import React from "react";
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import "./styles.scss";
import appLogo from "../../assets/images/app-logo.png";
import {globalState} from "../../features/global/globalSlice";
import {useDispatch, useSelector} from "react-redux";
import {isEmpty} from "lodash";
import {signout} from "../../features/authentication/authenticationSlice";
import {NavLink} from "react-router-dom";
import { authorizationState } from '../../features/authorization/authorizationSlice';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

function Header() {
  const {currentUser} = useSelector(globalState);
  const { userRole } = useSelector(authorizationState);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(
      signout({
        publicAddress: currentUser.publicAddress,
      })
    );
  };

  const roleClass = () => {
    if (userRole.includes("ADMIN")) {
      return "admin";
    }
    if (userRole.includes("MANAGER")) {
      return "manager";
    }
    if (userRole.includes("DOCTOR")) {
      return "doctor";
    }

    return "patient"
  }

  const displayRole = () => {
    if (userRole.length === 1) {
      return <span className="user-role__badge">{userRole[0]}</span>
    }

    return <span className={`user-role__badge ${roleClass()}`}>Roles</span>
  }

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
                    <Dropdown.Toggle as="div" className="header-submenu__toggle">
                      {displayRole()}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {
                        userRole.map((role, index) => {
                          return (
                            <Dropdown.Item key={index}>
                              {role}
                            </Dropdown.Item>
                          )
                        })
                      }
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle as="p" className="header-submenu__toggle">
                      <span>{currentUser.name}</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#">
                        <NavLink to={`/user/${currentUser.publicAddress}`} exact>
                          Profile
                        </NavLink>
                      </Dropdown.Item>
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
                <p className="header-submenu__item">Login</p>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
export default Header;

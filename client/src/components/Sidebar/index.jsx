import React from "react";
import "./styles.scss";
import {ImHome} from "react-icons/im";
import {AiFillSafetyCertificate} from "react-icons/ai";
import {IoSettingsSharp, IoDocumentsSharp} from "react-icons/io5";
import {BsPeopleFill, BsFillPersonPlusFill} from "react-icons/bs";
import {MdDocumentScanner} from "react-icons/md";
import {NavLink} from "react-router-dom";
import {globalState} from "../../features/global/globalSlice";
import {useSelector} from "react-redux";

function Sidebar() {
  const {currentUser} = useSelector(globalState);
  return (
    <>
      <div className="sidebar__wrapper">
        <div className="sidebar__list-item">
          <div className="sidebar-top">
            <NavLink
              to={"/"}
              exact
              className={(isActive) =>
                "sidebar__item" + (isActive ? " active-item" : "")
              }
            >
              <ImHome className="sidebar__icon" />
            </NavLink>
            {/* Patient icons */}
            <NavLink
              to={`/medical-record/${currentUser.publicAddress}`}
              className={(isActive) =>
                "sidebar__item" + (isActive ? " active-item" : "")
              }
            >
              <MdDocumentScanner className="sidebar__icon" />
            </NavLink>
            <NavLink
              to={`/vaccination-certificate/${currentUser.publicAddress}`}
              className={(isActive) =>
                "sidebar__item" + (isActive ? " active-item" : "")
              }
            >
              <AiFillSafetyCertificate className="sidebar__icon" />
            </NavLink>
            {/* Doctor icons */}
            <NavLink
              to="/medical-records"
              className={(isActive) =>
                "sidebar__item" + (isActive ? " active-item" : "")
              }
            >
              <IoDocumentsSharp className="sidebar__icon" />
            </NavLink>
            <NavLink
              to="/vaccination-certificates"
              className={(isActive) =>
                "sidebar__item" + (isActive ? " active-item" : "")
              }
            >
              <AiFillSafetyCertificate className="sidebar__icon" />
            </NavLink>
            {/* Manager icons */}
            <NavLink
              to="/doctors"
              className={(isActive) =>
                "sidebar__item" + (isActive ? " active-item" : "")
              }
            >
              <BsPeopleFill className="sidebar__icon" />
            </NavLink>
            {/* Admin icons */}
            <NavLink
              to="/managers"
              className={(isActive) =>
                "sidebar__item" + (isActive ? " active-item" : "")
              }
            >
              <BsFillPersonPlusFill className="sidebar__icon" />
            </NavLink>
          </div>
          <div className="sidebar-bottom">
            <NavLink
              to="/settings"
              className={(isActive) =>
                "sidebar__item" + (isActive ? " active-item" : "")
              }
            >
              <IoSettingsSharp className="sidebar__icon" />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

import React, { useState, useEffect } from "react";
import "./styles.scss";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {globalState} from "../../features/global/globalSlice";
import { useSelector } from 'react-redux';

function UserPage() {
  const { currentUser } = useSelector(globalState);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    console.log(currentUser);
  }, [])

  const convertAddressForDisplay = (address) => {
    return address.substring(0, 4) + "..." + address.substring(address.length - 5, address.length - 1)
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(currentUser.publicAddress);
    setCopy(true);
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className="body__wrapper homepage__wrapper user__wrapper">
        <div className="section-wrapper user-profile__section">
          <div className="user-identities">
            <h1>Your Profile</h1>
            <div className={`identities-container ${copy ? "copied" : ""}`} onClick={copyAddress}>
              <span className="address">{convertAddressForDisplay(currentUser.publicAddress)}</span>
              <span>{currentUser.name}</span>
            </div>
          </div>
          <div className="user-info__container row">
            <div className="col-6">
              <div className="item">
                <label>Email</label>
                <input type="text" disabled className="form-control" value={currentUser.email} />
              </div>
            </div>
            <div className="col-6">
              <div className="item">
                <label>Phone</label>
                <input type="text" disabled className="form-control" value={currentUser.phone} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPage;

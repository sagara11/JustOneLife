import React from "react";
import { BsCalendar2DateFill } from 'react-icons/bs';

function GeneralInfo(props) {
  const {
    address,
    dateOfBirth,
    gender,
    name,
    phone
  } = props.medicalData.generalInfo;

  const displayGender = (gender) => {
    let genderClass = "gender female";
    if (gender === "Male") {
      genderClass = "gender male"
    }

    return genderClass;
  }

  return (
    <div className="row">
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Name</label>
          <div className="data">{name}</div>
        </div>
        <div className="field-input">
          <label htmlFor="">Phone number</label>
          <div className="data">{phone}</div>
        </div>
      </div>
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Date of birth</label>
          <div className="data time-data">
            <div className="icon">
              <BsCalendar2DateFill />
            </div>
            <div className="time">{dateOfBirth}</div>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Gender</label>
          <div className={displayGender(gender)}>{gender}</div>
        </div>
        <div className="field-input">
          <label htmlFor="">Address</label>
          <div className="data address">
            <div className="dot"></div>
            <div className="address-data">{address}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralInfo;

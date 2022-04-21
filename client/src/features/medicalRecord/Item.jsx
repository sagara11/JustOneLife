import React from "react";
import { NavLink } from 'react-router-dom';
import "./styles.scss";

function Item({medicalRecord}) {

  const formatAddress = (address) => {
    return address.substring(0, 4) + "..." + address.substring(address.length - 4, address.length)
  }

  return (
    <div className='medical-item__wrapper'>
      <NavLink className='medical-item__content' to={{pathname: `/medical-record/detail`, state: {medicalData: medicalRecord}}} >
        <div className="list-element">
          <div className="card">
            <div className="card-header">
              <div className='doctor-name'>{medicalRecord.doctorName}</div>
              <div className='doctor-address'>{formatAddress(medicalRecord.doctorAddress)}</div>
            </div>
            <div className="card-body">
              <p className='title'>Bệnh chính: </p>
              <p>{medicalRecord.diagnose.primaryCondition || "..."}</p>
            </div>
          </div>
        </div>
      </NavLink>
      <div className='between'>
        <div className="line"></div>
      </div>
      <div className='medical-item__date'>
        <div className='element-date'>
          <div>Ngày nhập viện</div>
          <span>
            {medicalRecord.patientManagement.admittedHospitalAt || "..."}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Item;

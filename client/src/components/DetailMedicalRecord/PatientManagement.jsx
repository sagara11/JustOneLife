import React from "react";
import { BsCalendar2DateFill } from 'react-icons/bs';

function PatientManagement(props) {
  const {
    admittedHospitalAt,
    medicalFalculty,
  } = props.medicalData.patientManagement;

  return (
    <div className="row">
      <div className="col-6">
        <div className="field-input">
          <label htmlFor="">Ngày nhập viện</label>
          <div className="data">{admittedHospitalAt}</div>
        </div>
      </div>
      <div className="col-6">
        <div className="field-input group-field">
          <label className="title" htmlFor="">Khoa khám bệnh</label>
          <div className="content">
            <div className="sub-title">Khoa</div>
            <div className="data">{medicalFalculty.falculty}</div>
          </div>
          <div className="content">
            <div className="sub-title">Thời gian vào khám</div>
            <div className="data time-data">
              <div className="icon">
                <BsCalendar2DateFill />
              </div>
              <div className="time">{medicalFalculty.time}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientManagement;

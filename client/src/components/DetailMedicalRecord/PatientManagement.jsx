import React from "react";
import { BsCalendar2DateFill } from 'react-icons/bs';

function PatientManagement(props) {
  const {
    admittedHospitalAt,
    changeFalculty,
    medicalFalculty,
  } = props.medicalData.patientManagement;

  return (
    <div className="row">
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Admitted Hospital At</label>
          <div className="data">{admittedHospitalAt}</div>
        </div>
      </div>
      <div className="col-4">
        <div className="field-input group-field">
          <label className="title" htmlFor="">Medical Faculty</label>
          <div className="content">
            <div className="sub-title">Falculty</div>
            <div className="data">{medicalFalculty.falculty}</div>
          </div>
          <div className="content">
            <div className="sub-title">Time</div>
            <div className="data time-data">
              <div className="icon">
                <BsCalendar2DateFill />
              </div>
              <div className="time">{medicalFalculty.time}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="field-input group-field">
          <label className="title" htmlFor="">Change Faculty</label>
          <div className="content">
            <div className="sub-title">Falculty</div>
            <div className="data">{changeFalculty.falculty}</div>
          </div>
          <div className="content">
            <div className="sub-title">Time</div>
            <div className="data time-data">
              <div className="icon">
                <BsCalendar2DateFill />
              </div>
              <div className="time">{changeFalculty.time}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientManagement;

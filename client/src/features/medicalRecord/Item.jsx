import React from "react";
import { NavLink } from 'react-router-dom';
import "./styles.scss";

function Item({medicalRecord}) {
  return (
    <NavLink to={{pathname: `/medical-record/detail`, state: {medicalData: medicalRecord}}} >
      <div className="list-element">
        <div className="card">
          <div className="card-header">
            {medicalRecord.doctorAddress} - {medicalRecord.doctorName}
          </div>
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>{medicalRecord.diagnose.primaryCondition}</p>
              <footer className="blockquote-footer">
                Date{" "}
                <cite title="Source Title">
                  {medicalRecord.patientManagement.admittedHospitalAt}
                </cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default Item;

import React from "react";
import "./styles.scss";

function Item({medicalRecord}) {
  return (
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
  );
}

export default Item;

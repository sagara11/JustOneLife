import React from "react";
import "./styles.scss";

function Item(props) {
  return (
    <div className="list-element">
      <div className="card">
        <div className="card-header">{props.medicalRecord.doctorAddress} - {props.medicalRecord.doctorName}</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>
              {props.medicalRecord.diagnose.primaryCondition}
            </p>
            <footer className="blockquote-footer">
              Date <cite title="Source Title">{props.medicalRecord.patientManagement.admittedHospitalAt}</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default Item;

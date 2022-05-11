import React from "react";
import SubPrescription from "./SubPrescription";

function Prescription(props) {
  const prescriptions = [];
  for (var i = 0; i < props.medicalData.prescription.length; i++) {
    prescriptions.push(
      <SubPrescription
        key={i}
        numberPresciption={i}
        prescription={props.medicalData.prescription[i]}
      />
    );
  }

  return <div>{prescriptions}</div>;
}

export default Prescription;

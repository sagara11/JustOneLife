import React from "react";

function Diagnose(props) {
  const {
    cormobilities,
    emergencyAid,
    medicalFalculty,
    method,
    primaryCondition
  } = props.medicalData.diagnose;

  return (
    <div className="row">
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Medical Falculty</label>
          <div className="data">{medicalFalculty}</div>
        </div>
        <div className="field-input">
          <label htmlFor="">Emergency Aid</label>
          <div className="data">{emergencyAid}</div>
        </div>
      </div>
      <div className="col-4">
        <div className="field-input group-field">
          <label className="title" htmlFor="">Method</label>
          <div className="content">
            <div className="sub-title">Medical Procedure</div>
            <div className="data">{method.medicalProcedure}</div>
          </div>
          <div className="content">
            <div className="sub-title">Surgery</div>
            <div className="data">{method.surgery}</div>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Primary Condition</label>
          <div className="data">{primaryCondition}</div>
        </div>
        <div className="field-input">
          <label htmlFor="">Cormobilites</label>
          <div className="data">{cormobilities}</div>
        </div>
      </div>
    </div>
  );
}

export default Diagnose;

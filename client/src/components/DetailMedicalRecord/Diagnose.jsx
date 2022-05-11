import React from "react";

function Diagnose(props) {
  const {method, medicalProcedure} = props.medicalData.diagnose;

  return (
    <div className="row">
      <div className="col-6">
        <div className="field-input">
          <label htmlFor="">Triệu chứng</label>
          <div className="data">{medicalProcedure}</div>
        </div>
      </div>
      <div className="col-6">
        <div className="field-input group-field">
          <label className="title" htmlFor="">
            Bệnh chính
          </label>
          <div className="content">
            <div className="sub-title">Tên bệnh</div>
            <div className="data">{method.primaryCondition}</div>
          </div>
          <div className="content">
            <div className="sub-title">Mô tả bệnh</div>
            <div className="data">{method.descriptionCondition}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Diagnose;

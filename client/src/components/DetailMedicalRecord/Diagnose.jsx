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
          <label htmlFor="">Khoa khám bệnh</label>
          <div className="data">{medicalFalculty}</div>
        </div>
        <div className="field-input">
          <label htmlFor="">Cấp cứu</label>
          <div className="data">{emergencyAid}</div>
        </div>
      </div>
      <div className="col-4">
        <div className="field-input group-field">
          <label className="title" htmlFor="">Phương pháp</label>
          <div className="content">
            <div className="sub-title">Thủ tục y tế</div>
            <div className="data">{method.medicalProcedure}</div>
          </div>
          <div className="content">
            <div className="sub-title">Phẫu thuật</div>
            <div className="data">{method.surgery}</div>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Bệnh chính</label>
          <div className="data">{primaryCondition}</div>
        </div>
        <div className="field-input">
          <label htmlFor="">Bệnh phụ</label>
          <div className="data">{cormobilities}</div>
        </div>
      </div>
    </div>
  );
}

export default Diagnose;

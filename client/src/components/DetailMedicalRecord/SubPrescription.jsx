import React from "react";

function SubPrescription(props) {
  return (
    <div className="row">
      <div className="col-12">
        <div className="field-input">
          <label className="title" htmlFor="">
            Thuốc {props.prescription.name}
          </label>
          <div className="nested">
            <div className="content">
              <span className="secondary-title">Tên thuốc</span>
              <div className="data">{props.prescription.name}</div>
            </div>
            <div className="content">
              <span className="secondary-title">Cách dùng</span>
              <div className="data">{props.prescription.usage}</div>
            </div>
            <div className="content">
              <span className="secondary-title">Liều lượng</span>
              <div className="data">{props.prescription.level}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubPrescription;

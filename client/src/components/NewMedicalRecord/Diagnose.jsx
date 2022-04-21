import React from "react";

function Diagnose(props) {
  const {
    register
  } = props;

  return (
    <div className="row">
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Khoa khám bệnh</label>
          <input
            {...register("diagnose.medicalFalculty")}
            className="form-control" />
        </div>
        <div className="field-input">
          <label htmlFor="">Cấp cứu</label>
          <input
            {...register("diagnose.emergencyAid")}
            className="form-control" />
        </div>
      </div>
      <div className="col-4">
        <div className="field-input">
          <label className="title" htmlFor="">Phương pháp</label>
          <div className="nested">
            <span className="secondary-title">Thủ tục y tế</span>
            <textarea
              {...register("diagnose.method.medicalProcedure")}
              className="form-control">
            </textarea>
            <span className="secondary-title">Phẫu thuật</span>
            <textarea
              {...register("diagnose.method.surgery")}
              className="form-control">
            </textarea>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Bệnh chính</label>
          <textarea
            {...register("diagnose.primaryCondition")}
            className="form-control">
          </textarea>
        </div>
        <div className="field-input">
          <label htmlFor="">Bệnh phụ</label>
          <textarea
            {...register("diagnose.cormobilities")}
            className="form-control">
          </textarea>
        </div>
      </div>
    </div>
  );
}

export default Diagnose;

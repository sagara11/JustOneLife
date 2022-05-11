import React from "react";

function Diagnose(props) {
  const {
    register
  } = props;

  return (
    <div className="row">
      <div className="col-6">
        <div className="field-input">
          <label htmlFor="">Triệu chứng</label>
          <textarea
            {...register("diagnose.medicalProcedure")}
            className="form-control">
          </textarea>
        </div>
      </div>
      <div className="col-6">
        <div className="field-input">
          <label className="title" htmlFor="">Bệnh chính</label>
          <div className="nested">
            <span className="secondary-title">Tên bệnh</span>
            <textarea
              {...register("diagnose.method.primaryCondition")}
              className="form-control">
            </textarea>
            <span className="secondary-title">Mô tả bệnh</span>
            <textarea
              {...register("diagnose.method.descriptionCondition")}
              className="form-control">
            </textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Diagnose;

import React from "react";

function Diagnose(props) {
  const {
    register
  } = props;

  return (
    <div className="row">
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Medical Falculty</label>
          <input
            {...register("diagnose.medicalFalculty")}
            className="form-control" />
        </div>
        <div className="field-input">
          <label htmlFor="">Emergency Aid</label>
          <input
            {...register("diagnose.emergencyAid")}
            className="form-control" />
        </div>
      </div>
      <div className="col-4">
        <div className="field-input">
          <label className="title" htmlFor="">Method</label>
          <div className="nested">
            <span className="secondary-title">Medical Procedure</span>
            <textarea
              {...register("diagnose.method.medicalProcedure")}
              className="form-control">
            </textarea>
            <span className="secondary-title">Surgery</span>
            <textarea
              {...register("diagnose.method.surgery")}
              className="form-control">
            </textarea>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Primary Condition</label>
          <textarea
            {...register("diagnose.primaryCondition")}
            className="form-control">
          </textarea>
        </div>
        <div className="field-input">
          <label htmlFor="">Cormobilites</label>
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

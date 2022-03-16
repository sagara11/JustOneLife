import React from "react";

function Treatment(props) {
  const {
    register
  } = props;

  return (
    <div className="row">
      <div className="col-4">
        <div className="field-input">
          <label className="title" htmlFor="">General</label>
          <div className="nested">
            <span className="secondary-title">Pulse</span>
            <input
              type="number"
              {...register("treatment.general.pulse")}
              className="form-control" />
            <span className="secondary-title">Blood Temperature</span>
            <input
              type="number"
              {...register("treatment.general.bloodTemperature")}
              className="form-control" />
            <span className="secondary-title">Blood Pressure</span>
            <input
              type="number"
              {...register("treatment.general.bloodPressure")}
              className="form-control" />
            <span className="secondary-title">Breathing</span>
            <input
              type="number"
              {...register("treatment.general.breathing")}
              className="form-control" />
            <span className="secondary-title">Weight</span>
            <input
              type="number"
              {...register("treatment.general.weight")}
              className="form-control" />
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="field-input">
          <label className="title" htmlFor="">System</label>
          <div className="nested">
            <span className="secondary-title">Circulatory System</span>
            <input
              {...register("treatment.system.circulatorySystem")}
              className="form-control" />
            <span className="secondary-title">Respiratory System</span>
            <input
              {...register("treatment.system.respiratorySystem")}
              className="form-control" />
            <span className="secondary-title">Digestive System</span>
            <input
              {...register("treatment.system.digestiveSystem")}
              className="form-control" />
            <span className="secondary-title">Nervous System</span>
            <input
              {...register("treatment.system.nervousSystem")}
              className="form-control" />
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="field-input">
          <label className="title" htmlFor="">Clinical Test</label>
          <div className="nested">
            <span className="secondary-title">Treatment Method</span>
            <textarea
              {...register("treatment.clinicalTest.treatmentMethod")}
              className="form-control">
            </textarea>
            <span className="secondary-title">Patient Medical Status</span>
            <textarea
              {...register("treatment.clinicalTest.patientStatus")}
              className="form-control">
            </textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Treatment;

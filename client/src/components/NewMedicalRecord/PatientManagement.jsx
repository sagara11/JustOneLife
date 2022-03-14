import React from "react";

function PatientManagement(props) {
  const {
    register
  } = props;

  return (
    <div className="row">
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Admitted Hospital At</label>
          <input
            type="date"
            {...register("patientManagement.admittedHospitalAt")}
            className="form-control" />
        </div>
      </div>
      <div className="col-4">
        <div className="field-input">
          <label className="title" htmlFor="">Medical Faculty</label>
          <div className="nested">
            <span className="secondary-title">Falculty</span>
            <input
              {...register("patientManagement.medicalFalculty.falculty")}
              className="form-control" />
            <span className="secondary-title">Time</span>
            <input
              type="date"
              {...register("patientManagement.medicalFalculty.time")}
              className="form-control" />
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="field-input">
          <label className="title" htmlFor="">Change Faculty</label>
          <div className="nested">
            <span className="secondary-title">Falculty</span>
            <input
              {...register("patientManagement.changeFalculty.falculty")}
              className="form-control" />
            <span className="secondary-title">Time</span>
            <input
              type="date"
              {...register("patientManagement.changeFalculty.time")}
              className="form-control" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientManagement;

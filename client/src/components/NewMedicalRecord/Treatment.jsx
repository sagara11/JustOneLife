import React from "react";

function Treatment(props) {
  const {register} = props;

  return (
    <div className="row">
      <div className="col-12">
        <div className="field-input">
          <label className="title" htmlFor="">
            Chung
          </label>
          <div className="nested">
            <span className="secondary-title">Huyết áp</span>
            <input
              type="number"
              {...register("treatment.general.bloodPressure")}
              className="form-control"
            />
            <span className="secondary-title">Nhiệt độ cơ thể</span>
            <input
              type="number"
              {...register("treatment.general.bloodTemperature")}
              className="form-control"
            />
            <span className="secondary-title">Chiều cao</span>
            <input
              type="number"
              {...register("treatment.general.weight")}
              className="form-control"
            />
            <span className="secondary-title">Cân nặng</span>
            <input
              type="number"
              {...register("treatment.general.weight")}
              className="form-control"
            />
            <span className="secondary-title">
              {" "}
              <div className="sub-title">Mạch</div>
            </span>
            <input
              type="number"
              {...register("treatment.general.pulse")}
              className="form-control"
            />
            <span className="secondary-title">Nhịp thở</span>
            <input
              type="number"
              {...register("treatment.general.breathing")}
              className="form-control"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Treatment;

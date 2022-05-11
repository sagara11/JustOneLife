import React from "react";

function SubPrescription(props) {
  const {register} = props;

  return (
    <div className="row">
      <div className="col-12">
        <div className="field-input">
          <label className="title" htmlFor="">
            Thuốc
          </label>
          <div className="nested">
            <span className="secondary-title">Tên thuốc</span>
            <textarea
              {...register(`prescription[${props.numberPresciption}].name`)}
              className="form-control"
            ></textarea>
            <span className="secondary-title">Cách dùng</span>
            <textarea
              {...register(`prescription[${props.numberPresciption}].usage`)}
              className="form-control"
            ></textarea>
            <span className="secondary-title">Liều lượng</span>
            <textarea
              {...register(`prescription[${props.numberPresciption}].level`)}
              className="form-control"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubPrescription;

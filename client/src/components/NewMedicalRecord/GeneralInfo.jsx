import React, { useEffect } from "react";

function GeneralInfo(props) {
  const {register, setValue, preloadData} = props;

  useEffect(() => {
    if (preloadData) {
      setValue("generalInfo.publicAddress", preloadData.user[0].publicAddress);
      setValue("generalInfo.phone", preloadData.user[0].phone);
      setValue("generalInfo.name", preloadData.user[0].name);
    }
  }, [preloadData]);

  return (
    <div className="row">
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Patient public address</label>
          <input
            readOnly
            {...register("generalInfo.publicAddress", {
              required: "This is required.",
            })}
            className="form-control"
          />
        </div>
        <div className="field-input">
          <label htmlFor="">Phone</label>
          <input readOnly {...register("generalInfo.phone")} className="form-control" />
        </div>
      </div>
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Patient name</label>
          <input
            readOnly
            {...register("generalInfo.name", {required: "This is required."})}
            className="form-control"
          />
        </div>
        <div className="field-input">
          <label htmlFor="">Date of birth</label>
          <input
            type="date"
            {...register("generalInfo.dateOfBirth")}
            className="form-control"
          />
        </div>
      </div>
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Gender</label>
          <select className="form-control" {...register("generalInfo.gender")}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="field-input">
          <label htmlFor="">Address</label>
          <input
            {...register("generalInfo.address")}
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
}

export default GeneralInfo;

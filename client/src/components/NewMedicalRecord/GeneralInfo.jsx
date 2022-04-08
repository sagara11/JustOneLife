import React from "react";
import { getUser } from '../../features/authorization/authorizationAPI';

function GeneralInfo(props) {
  const {register, setValue} = props;

  const renderPatientData = async (e) => {
    let patientAddress = e.target.value;
    const userData = await getUser({address: patientAddress});
    if (!userData.data) {
      alert("The system can't find any data related to this public address!");
      setValue("generalInfo.name", "");
      setValue("generalInfo.phone", "");
      return;
    }

    setValue("generalInfo.name", userData.data.name);
    setValue("generalInfo.phone", userData.data.phone);
  }

  return (
    <div className="row">
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Patient public address</label>
          <input
            {...register("generalInfo.publicAddress", {
              required: "This is required.",
            })}
            onBlur={renderPatientData}
            className="form-control"
          />
        </div>
        <div className="field-input">
          <label htmlFor="">Phone</label>
          <input disabled {...register("generalInfo.phone")} className="form-control" />
        </div>
      </div>
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Patient name</label>
          <input
            disabled
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

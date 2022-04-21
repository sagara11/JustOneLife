import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { globalState } from "../global/globalSlice";
import "./styles.scss";
import { createNewVaccineCertificate } from "./vaccineSlice";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect } from "react";
import { fetchUserInSystem } from "../../features/doctor/doctorAPI";

function NewForm() {
  const dispatch = useDispatch();
  const { web3, accounts, currentUser } = useSelector(globalState);

  const { register, handleSubmit, reset } = useForm();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getAllUser = async () => {
      const userListData = await fetchUserInSystem();
      setUserList(userListData.data);
    };

    getAllUser();
  }, []);
  const [selectedOptions, setSelectedOptions] = useState(null);

  const onSubmit = (data) => {
    data.vaccine.patientPublicAddress = selectedOptions.value;
    setSelectedOptions(null);
    dispatch(
      createNewVaccineCertificate({ web3, accounts, currentUser, data })
    );
    reset();
  };
  const animatedComponents = makeAnimated();

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const options = [];

  if (userList) {
    userList.forEach((item) => {
      options.push({
        value: item.publicAddress,
        label: `${item.name} - ${item.publicAddress}`,
      });
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-4">
          <div className="field-input">
            <label htmlFor="">Patient public address</label>
            <Select
              className="form-control"
              closeMenuOnSelect={false}
              components={animatedComponents}
              onChange={handleChange}
              value={selectedOptions}
              options={options}
              placeholder="Search your patient..."
            />
          </div>
          <div className="field-input">
            <label htmlFor="">Location</label>
            <input
              {...register("vaccine.location", {
                required: "This is required.",
              })}
              className="form-control"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="field-input">
            <label htmlFor="">Vaccine</label>
            <input
              {...register("vaccine.name", {
                required: "This is required.",
              })}
              className="form-control"
            />
          </div>
          <div className="field-input">
            <label htmlFor="">Date</label>
            <input
              type="date"
              {...register("vaccine.date", {
                required: "This is required.",
              })}
              className="form-control"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="field-input">
            <label htmlFor="">Lot number</label>
            <input
              {...register("vaccine.lotNumber")}
              className="form-control"
            />
          </div>
        </div>
      </div>
      <div className="button-submit__wrapper">
        <button className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
}

export default NewForm;

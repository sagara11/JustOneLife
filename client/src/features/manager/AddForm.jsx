import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch, useSelector } from "react-redux";
import { setRoleManager } from "../authorization/authorizationSlice";
import { globalState } from "../global/globalSlice";
import { fetchUserInSystem } from "../doctor/doctorAPI";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const AddManagerForm = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { web3, accounts, currentUser } = useSelector(globalState);
  const [userList, setUserList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [];

  if (userList) {
    userList.forEach((item) => {
      options.push({
        value: item.publicAddress,
        label: `${item.name} - ${item.publicAddress}`,
      });
    });
  }

  const AnimatedMulti = () => {
    return (
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        onChange={handleChange}
        value={selectedOptions}
        isMulti
        options={options}
      />
    );
  };

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const onSubmit = async () => {
    for await (const item of selectedOptions) {
      const address = item.value;
      dispatch(setRoleManager({ web3, accounts, currentUser, address }));
    }

    setSelectedOptions([]);
  };

  useEffect(() => {
    const getAllUser = async () => {
      const userListData = await fetchUserInSystem();
      setUserList(userListData.data);
    };

    getAllUser();
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="add-manager-form"
        id="add-manager-form"
      >
        <div className="new-manager">
          <label>Add New Manager</label>
        </div>
        <AnimatedMulti />
        <ErrorMessage
          errors={errors}
          name="address"
          render={({ message }) => <p>{message}</p>}
        />
        <button className="btn btn-primary">ADD</button>
      </form>
    </>
  );
};
export default AddManagerForm;

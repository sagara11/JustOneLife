import React, {useEffect, useState} from "react";
import "./styles.scss";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {useDispatch, useSelector} from "react-redux";
import {setRoleManager} from "../authorization/authorizationSlice";
import {globalState} from "../global/globalSlice";
import {fetchUserInSystem} from "../doctor/doctorAPI";
import Select from "react-select";

const AddManagerForm = () => {
  const {
    handleSubmit,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();
  const {web3, accounts, currentUser} = useSelector(globalState);
  const [userList, setUserList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const options = [];

  if (userList) {
    userList.forEach((item) => {
      options.push({
        value: item.publicAddress,
        label: `${item.name} - ${item.email}`,
      });
    });
  }

  const AnimatedMulti = () => {
    return (
      <Select
        closeMenuOnSelect={false}
        onChange={handleChange}
        value={selectedOption}
        options={options}
      />
    );
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const onSubmit = async () => {
    const addressManager = selectedOption.value;
    dispatch(setRoleManager({web3, accounts, currentUser, address: addressManager}));
    setSelectedOption("");
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
          <label>Thêm quản lý bệnh viện</label>
        </div>
        <AnimatedMulti />
        <ErrorMessage
          errors={errors}
          name="address"
          render={({message}) => <p>{message}</p>}
        />
        <button className="btn btn-primary">THÊM</button>
      </form>
    </>
  );
};
export default AddManagerForm;

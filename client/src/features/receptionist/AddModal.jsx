import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { globalState } from "../global/globalSlice";
import { setRoleDoctor } from "../authorization/authorizationSlice";
import { fetchUserInSystem } from "../doctor/doctorAPI";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { addReceptionist } from './receptionistSlice';

const animatedComponents = makeAnimated();

const AddModal = ({ show, handleCloseAddDoctorModal }) => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(globalState);
  const [userList, setUserList] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [];

  if (userList) {
    userList.forEach((item) => {
      options.push({
        value: {id: item._id, address: item.publicAddress},
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
      const address = item.value.address;
      dispatch(addReceptionist({
        data: {
          receptionist: {
            isReceptionist: true,
            addedBy: currentUser._id
          },
        },
        publicAddress: address
      }));
    }
    setSelectedOptions([]);
  };

  const onHideModal = () => {
    setValue("address", "");
    handleCloseAddDoctorModal();
  };

  useEffect(() => {
    const getAllUser = async () => {
      const userListData = await fetchUserInSystem();
      setUserList(userListData.data);
    };

    getAllUser();
  }, []);

  return (
    <Modal
      show={show}
      onHide={onHideModal}
      centered
      dialogClassName="add-doctor-form__dialog"
      contentClassName="add-doctor-form__content"
    >
      <form
        className="add-doctor-form"
        onSubmit={handleSubmit(onSubmit)}
        id="add-doctor-form"
      >
        <div className="new-doctor">
          <label>Add New Receptionist</label>
        </div>
        <ErrorMessage
          errors={errors}
          name="address"
          render={({ message }) => <p>{message}</p>}
        />
        <AnimatedMulti />
        <button className="btn btn-primary">ADD</button>
      </form>
    </Modal>
  );
};

export default AddModal;

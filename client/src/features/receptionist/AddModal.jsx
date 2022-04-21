import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {globalState} from "../global/globalSlice";
import {fetchUserInSystem} from "../doctor/doctorAPI";
import Select from "react-select";
import {addReceptionist} from "./receptionistSlice";

const AddModal = ({show, handleCloseAddDoctorModal}) => {
  const {
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();
  const {currentUser} = useSelector(globalState);
  const [userList, setUserList] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const options = [];

  if (userList) {
    userList.forEach((item) => {
      options.push({
        value: {id: item._id, address: item.publicAddress},
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
    dispatch(
      addReceptionist({
        data: {
          receptionist: {
            isReceptionist: true,
            addedBy: currentUser._id,
          },
        },
        publicAddress: selectedOption.value.address,
      })
    );
    setSelectedOption("");
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
          render={({message}) => <p>{message}</p>}
        />
        <AnimatedMulti />
        <button className="btn btn-primary">ADD</button>
      </form>
    </Modal>
  );
};

export default AddModal;

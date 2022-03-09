import React from "react";
import "./styles.scss";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {globalState} from "../global/globalSlice";
import {setRoleDoctor} from "../authorization/authorizationSlice";

const AddDoctorForm = ({show, handleCloseAddDoctorModal}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();
  const {web3, accounts, currentUser} = useSelector(globalState);

  const onSubmit = (data) => {
    let {address} = data;
    dispatch(setRoleDoctor({web3, accounts, currentUser, address}));
    setValue("address", "");
  };

  const onHideModal = () => {
    setValue("address", "");
    handleCloseAddDoctorModal();
  };

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
        <ErrorMessage
          errors={errors}
          name="address"
          render={({message}) => <p>{message}</p>}
        />
        <input
          {...register("address", {required: "This is required."})}
          className="form-control"
          placeholder="New doctor address..."
        />
        <button className="btn btn-primary">ADD</button>
      </form>
    </Modal>
  );
};
export default AddDoctorForm;

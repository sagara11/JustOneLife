import React from "react";
import "./styles.scss";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {globalState} from "../global/globalSlice";
import {saveIPFSFile, hasingPassword} from "./medicalRecordSlice";

const PasswordModal = ({show, handleClosePasswordModal, dataRegister}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();
  const {web3, accounts, currentUser} = useSelector(globalState);

  const onSubmit = (data) => {
    const doctorInfo = {
      doctorAddress: currentUser.publicAddress,
      doctorName: currentUser.name,
    };
    const jsonData = JSON.stringify({...dataRegister, ...doctorInfo});
    dispatch(
      hasingPassword({
        password: data,
      })
    );
    dispatch(
      saveIPFSFile({
        web3,
        accounts,
        currentUser,
        file: jsonData,
        patientAddress: data.generalInfo.publicAddress,
      })
    );
  };

  const onHideModal = () => {
    setValue("password", "");
    handleClosePasswordModal();
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
          name="password"
          render={({message}) => <p>{message}</p>}
        />
        <input
          {...register("password", {required: "Please confirm you request"})}
          className="form-control"
          placeholder="Password"
          type="password"
        />
        <button className="btn btn-primary">Confirm</button>
      </form>
    </Modal>
  );
};
export default PasswordModal;

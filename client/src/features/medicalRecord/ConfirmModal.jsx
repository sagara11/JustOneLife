import React from "react";
import "./styles.scss";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {globalState, setConfirm, setHash_1} from "../global/globalSlice";
import medicalRecordServices from "./medicalRecordServices";
import {authenticateIPFSAPI} from "./medicalRecordAPI";

const ConfirmModal = ({
  show,
  handleClosePasswordModal,
  handleOpenConfirmModal,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();
  const {currentUser} = useSelector(globalState);
  const dispatch = useDispatch();

  const hasingPassword = async (payload) => {
    const {password, patientAddress} = payload;
    const medicalRecordService = new medicalRecordServices({password});
    const {hash_1, hash_2} = await medicalRecordService.hashingPassword({
      password,
    });
    const result = await authenticateIPFSAPI({
      hash_2,
      patientAddress,
    });

    return {result: result.data, hash_1: hash_1};
  };

  const onSubmit = async (data) => {
    const {result, hash_1} = await hasingPassword({
      password: data,
      patientAddress: currentUser.publicAddress,
    });

    if (result) {
      dispatch(setHash_1(hash_1));
      dispatch(setConfirm(true));
      handleClosePasswordModal();
    } else {
      dispatch(setConfirm(false));
      handleOpenConfirmModal();
    }
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
export default ConfirmModal;

import React from "react";
import "./styles.scss";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {globalState} from "../global/globalSlice";
import {saveIPFSFile} from "./medicalRecordSlice";
import medicalRecordServices from "./medicalRecordServices";
import {authenticateIPFSAPI} from "./medicalRecordAPI";

const PasswordModal = ({show, handleClosePasswordModal, dataRegister}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();
  const {web3, accounts, currentUser} = useSelector(globalState);

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
    const doctorInfo = {
      doctorAddress: currentUser.publicAddress,
      doctorName: currentUser.name,
    };
    const jsonData = JSON.stringify({...dataRegister, ...doctorInfo});
    const {result, hash_1} = await hasingPassword({
      password: data,
      patientAddress: dataRegister.generalInfo.publicAddress,
    });

    if (result) {
      dispatch(
        saveIPFSFile({
          web3,
          accounts,
          currentUser,
          file: jsonData,
          patientAddress: dataRegister.generalInfo.publicAddress,
          hash_1,
        })
      );
    }
    handleClosePasswordModal();
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

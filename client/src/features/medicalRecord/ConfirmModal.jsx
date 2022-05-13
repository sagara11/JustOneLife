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
  handleCloseConfirmModal,
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
    const {password, userAddress} = payload;
    const medicalRecordService = new medicalRecordServices({password});
    const {hash_1, hash_2} = await medicalRecordService.processHashing(
      password
    );

    const result = await authenticateIPFSAPI({
      hash_2,
      userAddress,
    });

    return {result: result.data, hash_1: hash_1};
  };

  const onSubmit = async (data) => {
    const {result, hash_1} = await hasingPassword({
      password: data.password,
      userAddress: currentUser.publicAddress,
    });

    if (result) {
      console.log("Authenticated success!");
      dispatch(setHash_1(hash_1));
      dispatch(setConfirm(true));
      handleCloseConfirmModal();
    } else {
      alert("Wrong password, please retype your password or send password request to patient again")
      console.log("Authenticated Failed!");
      dispatch(setConfirm(false));
      handleOpenConfirmModal();
    }
  };

  const onHideModal = () => {
    setValue("password", "");
    handleCloseConfirmModal();
  };

  return (
    <Modal
      show={show}
      onHide={onHideModal}
      centered
      dialogClassName="add-doctor-form__dialog"
      contentClassName="add-doctor-form__content"
    >
      <div className="modal-header">Điền mật khẩu</div>
      <form
        className="add-doctor-form"
        onSubmit={handleSubmit(onSubmit)}
        id="add-doctor-form"
      >
        <input
          {...register("password", {required: "Please confirm you request"})}
          className="form-control"
          placeholder="Mật khẩu"
          type="password"
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({message}) => <p>{message}</p>}
        />
        <span className='modal-description'>Mật khẩu này sẽ dùng để giải mã những hồ sơ bệnh án của bạn</span>
        <button className="btn btn-primary">Xác nhận</button>
      </form>
    </Modal>
  );
};
export default ConfirmModal;

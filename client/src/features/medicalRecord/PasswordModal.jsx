import React, { useEffect } from "react";
import "./styles.scss";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { globalState } from "../global/globalSlice";
import { saveIPFSFile } from "./medicalRecordSlice";
import medicalRecordServices from "./medicalRecordServices";
import { authenticateIPFSAPI, getKeyAPI } from "./medicalRecordAPI";
import { deleteWaitingRoomAPI } from '../waitingRoom/waitingRoomAPI';
import { isEmpty } from 'lodash';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsClockHistory } from 'react-icons/bs';

const PasswordModal = ({ show, handleClosePasswordModal, dataRegister, waitingItemId, patientPassword, keyRSA }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { web3, accounts, currentUser } = useSelector(globalState);

  useEffect(() => {
    setValue("passwordPatient", patientPassword);
  }, [patientPassword])

  const hasingPassword = async (payload) => {
    const { passwordPatient, passwordDoctor, patientAddress, doctorAddress } =
      payload;
    const medicalRecordService = new medicalRecordServices({
      passwordPatient,
      passwordDoctor,
    });
    const { hash_1_Patient, hash_2_Patient, hash_1_Doctor, hash_2_Doctor } =
      await medicalRecordService.hashingPassword();

    const resultPatient = await authenticateIPFSAPI({
      hash_2: hash_2_Patient,
      userAddress: patientAddress,
    });

    const resultDoctor = await authenticateIPFSAPI({
      hash_2: hash_2_Doctor,
      userAddress: doctorAddress,
    });

    const getKey = await getKeyAPI({
      publicAddress: currentUser.publicAddress,
      doctorAddress: doctorAddress,
      patientAddress: patientAddress
    });

    return {
      resultPatient: resultPatient.data,
      resultDoctor: resultDoctor.data,
      hash_1_Patient,
      hash_1_Doctor,
      keyLevel_2: getKey.data
    };
  };

  const onSubmit = async (data) => {
    const doctorInfo = {
      doctorAddress: currentUser.publicAddress,
      doctorName: currentUser.name,
    };
    const jsonData = JSON.stringify({ ...dataRegister, ...doctorInfo });
    // const publicKey = await keyRSA.exportKey("pkcs8-public-pem");
    const decrypPatientPassword = await keyRSA.decrypt(patientPassword)
    const { resultPatient, resultDoctor, hash_1_Patient, hash_1_Doctor, keyLevel_2 } =
      await hasingPassword({
        passwordPatient: decrypPatientPassword.toString(),
        passwordDoctor: data.passwordDoctor,
        patientAddress: dataRegister.generalInfo.publicAddress,
        doctorAddress: currentUser.publicAddress,
      });

    if (resultPatient && resultDoctor) {
      dispatch(
        saveIPFSFile({
          web3,
          accounts,
          currentUser,
          file: jsonData,
          patientAddress: dataRegister.generalInfo.publicAddress,
          hash_1_Patient,
          hash_1_Doctor,
          keyLevel_2
        })
      );
      console.log("Authenticated successs");
      await deleteWaitingRoomAPI({id: waitingItemId});
      console.log("waiting item removed");
      handleClosePasswordModal();
    } else {
      console.log("Authenticated failed");
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
      contentClassName="add-doctor-form__content row"
    >
      <form
        className="add-doctor-form"
        onSubmit={handleSubmit(onSubmit)}
        id="add-doctor-form"
      >
        <div className="row signature-confirm">
          <div className="col-6">
            <h5
              className="modal-title signature-title"
              id="exampleModalLongTitle"
            >
              Khóa của bệnh nhân
            </h5>

            {patientPassword &&
              <>
                <span className='confirm-text'>Đã được chấp nhận</span>
                <AiOutlineCheckCircle className='received' />
              </>
            }
            {!patientPassword &&
              <>
                <span className='confirm-text'>Đợi mã xác thực của bệnh nhân...</span>
                <BsClockHistory className='waiting' />
              </>
            }
            <input
              {...register("passwordPatient", {
                required: "Please confirm you request",
              })}
              className="form-control d-none"
              placeholder="Password"
              type="password"
            />
          </div>
          <div className="col-6">
            <ErrorMessage
              errors={errors}
              name="passwordDoctor"
              render={({ message }) => <p>{message}</p>}
            />
            <h5
              className="modal-title signature-title"
              id="exampleModalLongTitle"
            >
              Khóa của bác sĩ
            </h5>
            <input
              {...register("passwordDoctor", {
                required: "Please confirm you request",
              })}
              className="form-control"
              placeholder="Password"
              type="password"
            />
          </div>
        </div>
        <button disabled={isEmpty(patientPassword)} className="btn btn-primary signature-confirm-button">
          Xác nhận
        </button>
      </form>
    </Modal>
  );
};
export default PasswordModal;

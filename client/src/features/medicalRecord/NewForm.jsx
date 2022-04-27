import React, {useEffect, useState} from "react";
import GeneralInfo from "../../components/NewMedicalRecord/GeneralInfo";
import Diagnose from "../../components/NewMedicalRecord/Diagnose";
import PatientManagement from "../../components/NewMedicalRecord/PatientManagement";
import Treatment from "../../components/NewMedicalRecord/Treatment";
import {useForm} from "react-hook-form";
import MedicalMediaStorage from "../../components/NewMedicalRecord/MedicalMediaStorage";
import PasswordModal from "./PasswordModal";
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { globalState } from '../global/globalSlice';
let socket;

const MedicalRecordForm = (props) => {
  const {register, handleSubmit, setValue} = useForm();
  const [show, setShow] = useState(false);
  const [dataRegister, setDataRegister] = useState("");
  const { preloadData } = props;
  const { currentUser } = useSelector(globalState);
  const [patientPassword, setPatientPassword] = useState("");

  useEffect(() => {
    socket = io(process.env.REACT_APP_API_URL || "http://localhost:8080");

    socket.emit('join-patient', preloadData.user[0]._id, (res) => {
      console.log(`Connected to room ${res.data}`);
    });

    socket.on('password-received', (res) => {
      const { password } = res;
      if (password) {
        console.log(`Patient password is ${password}`);
        setPatientPassword(password);
      }
    })
  }, [preloadData])

  const handleClosePasswordModal = () => setShow(false);
  const handleOpenPasswordModal = () => {
    setShow(true);
    socket.emit('request-password', { _id: currentUser._id, name: currentUser.name }, preloadData?.user[0]?._id);
    console.log("Request password from patient....");
  }

  const renderPage = () => {
    const pageNumber = props.page;
    switch (pageNumber) {
      case 0:
        return <GeneralInfo register={register} setValue={setValue} preloadData={preloadData} />;
      case 1:
        return <PatientManagement register={register} setValue={setValue} preloadData={preloadData} />;
      case 2:
        return <Diagnose register={register} setValue={setValue} />;
      case 3:
        return <Treatment register={register} setValue={setValue} />;
      case 4:
        return <MedicalMediaStorage />;
      default:
        return <GeneralInfo register={register} setValue={setValue} preloadData={preloadData} />;
    }
  };

  const onSubmit = (data) => {
    setDataRegister(data)
    handleOpenPasswordModal();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderPage()}
        {props.page === 4 && (
          <button className="btn btn-primary next-button">Lưu</button>
        )}
        {props.page !== 4 && (
          <button
            type="button"
            onClick={props.handleChangePage}
            className="btn btn-primary next-button"
          >
            Tiếp theo
          </button>
        )}
      </form>
      <PasswordModal
        waitingItemId={preloadData._id}
        show={show}
        handleClosePasswordModal={handleClosePasswordModal}
        dataRegister={dataRegister}
        patientPassword={patientPassword}
      />
    </>
  );
};

export default MedicalRecordForm;

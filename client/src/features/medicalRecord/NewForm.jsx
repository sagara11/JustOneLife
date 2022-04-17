import React, {useEffect, useState} from "react";
import GeneralInfo from "../../components/NewMedicalRecord/GeneralInfo";
import Diagnose from "../../components/NewMedicalRecord/Diagnose";
import PatientManagement from "../../components/NewMedicalRecord/PatientManagement";
import Treatment from "../../components/NewMedicalRecord/Treatment";
import {useForm} from "react-hook-form";
import MedicalMediaStorage from "../../components/NewMedicalRecord/MedicalMediaStorage";
import PasswordModal from "./PasswordModal";

const MedicalRecordForm = (props) => {
  const {register, handleSubmit, setValue} = useForm();
  const [show, setShow] = useState(false);
  const [dataRegister, setDataRegister] = useState("");
  const { preloadData } = props;

  const handleClosePasswordModal = () => setShow(false);
  const handleOpenPasswordModal = () => setShow(true);

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
          <button className="btn btn-primary next-button">Submit</button>
        )}
        {props.page !== 4 && (
          <button
            type="button"
            onClick={props.handleChangePage}
            className="btn btn-primary next-button"
          >
            Next
          </button>
        )}
      </form>
      <PasswordModal
        waitingItemId={preloadData._id}
        show={show}
        handleClosePasswordModal={handleClosePasswordModal}
        dataRegister={dataRegister}
      />
    </>
  );
};

export default MedicalRecordForm;

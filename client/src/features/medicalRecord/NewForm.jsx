import React from "react";
import GeneralInfo from "../../components/NewMedicalRecord/GeneralInfo";
import Diagnose from "../../components/NewMedicalRecord/Diagnose";
import PatientManagement from "../../components/NewMedicalRecord/PatientManagement";
import Treatment from "../../components/NewMedicalRecord/Treatment";
import {useForm} from "react-hook-form";
import MedicalMediaStorage from "../../components/NewMedicalRecord/MedicalMediaStorage";
import {useDispatch, useSelector} from "react-redux";
import {saveIPFSFile} from "./medicalRecordSlice";
import {globalState} from "../global/globalSlice";

const MedicalRecordForm = (props) => {
  const dispatch = useDispatch();
  const {web3, accounts, currentUser} = useSelector(globalState);

  const {register, handleSubmit, setValue} = useForm();
  const renderPage = () => {
    const pageNumber = props.page;
    switch (pageNumber) {
      case 0:
        return <GeneralInfo register={register} setValue={setValue} />;
      case 1:
        return <PatientManagement register={register} setValue={setValue} />;
      case 2:
        return <Diagnose register={register} setValue={setValue} />;
      case 3:
        return <Treatment register={register} setValue={setValue} />;
      case 4:
        return <MedicalMediaStorage />;
      default:
        return <GeneralInfo register={register} setValue={setValue} />;
    }
  };

  const onSubmit = (data) => {
    const doctorInfo = {doctorAddress: currentUser.publicAddress, doctorName: currentUser.name}
    const jsonData = JSON.stringify({...data, ...doctorInfo});
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
    </>
  );
};

export default MedicalRecordForm;

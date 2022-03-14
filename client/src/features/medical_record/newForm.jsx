import React from "react";
import GeneralInfo from '../../components/NewMedicalRecord/GeneralInfo';
import Diagnose from '../../components/NewMedicalRecord/Diagnose';
import PatientManagement from '../../components/NewMedicalRecord/PatientManagement';
import Treatment from '../../components/NewMedicalRecord/Treatment';
import { useForm } from 'react-hook-form';
import MedicalMediaStorage from '../../components/NewMedicalRecord/MedicalMediaStorage';

const MedicalRecordForm = (props) => {
  const {
    register,
    handleSubmit,
  } = useForm();
  const renderPage = () => {
    const pageNumber = props.page;
    switch(pageNumber) {
      case 0:
        return <GeneralInfo register={register} />;
      case 1:
        return <PatientManagement register={register} />;
      case 2:
        return <Diagnose register={register} />
      case 3:
        return <Treatment register={register} />
      case 4:
        return <MedicalMediaStorage />;
      default:
        return <GeneralInfo register={register} />
    }
  }

  const onSubmit = (data) => {
    let { generalInfo } = data;
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderPage()}
        {props.page === 4 &&
          <button className="btn btn-primary next-button">Submit</button>
        }
        {props.page !== 4 &&
          <button type="button" onClick={props.handleChangePage} className="btn btn-primary next-button">Next</button>
        }
      </form>
    </>
  );
}

export default MedicalRecordForm;

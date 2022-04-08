import React from "react";
import GeneralInfo from "../../components/DetailMedicalRecord/GeneralInfo";
import Diagnose from "../../components/DetailMedicalRecord/Diagnose";
import PatientManagement from "../../components/DetailMedicalRecord/PatientManagement";
import Treatment from "../../components/DetailMedicalRecord/Treatment";
import MedicalMediaStorage from "../../components/DetailMedicalRecord/MedicalMediaStorage";

const MedicalRecordDetail = (props) => {
  const { medicalData } = props;

  const renderPage = () => {
    const pageNumber = props.page;
    switch (pageNumber) {
      case 0:
        return <GeneralInfo {...medicalData} />;
      case 1:
        return <PatientManagement {...medicalData} />;
      case 2:
        return <Diagnose {...medicalData} />;
      case 3:
        return <Treatment {...medicalData} />;
      case 4:
        return <MedicalMediaStorage />;
      default:
        return <GeneralInfo {...medicalData} />;
    }
  };

  return (
    <>
      <div className="medical-detail__wrapper">
        {renderPage()}
      </div>
    </>
  );
};

export default MedicalRecordDetail;

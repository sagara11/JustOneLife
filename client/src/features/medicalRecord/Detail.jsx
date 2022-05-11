import React, {useEffect, useState} from "react";
import GeneralInfo from "../../components/DetailMedicalRecord/GeneralInfo";
import Diagnose from "../../components/DetailMedicalRecord/Diagnose";
import Prescription from "../../components/DetailMedicalRecord/Prescription";
import PatientManagement from "../../components/DetailMedicalRecord/PatientManagement";
import Treatment from "../../components/DetailMedicalRecord/Treatment";
import MedicalMediaStorage from "../../components/DetailMedicalRecord/MedicalMediaStorage";
import {getTransactionByHashAPI} from "../medicalTransaction/medicalTranscationAPI";

const MedicalRecordDetail = (props) => {
  const {medicalData} = props;
  const [transactionHash, setTransactionHash] = useState("");

  useEffect(() => {
    const getHash = async () => {
      console.log(medicalData.medicalData.ipfsHash);
      const {data} = await getTransactionByHashAPI({
        ipfsHash: medicalData.medicalData.ipfsHash,
      });
      if (data && data.transaction) {
        setTransactionHash(data.transaction.transactionHash);
      }
    };

    getHash();
  }, [medicalData]);

  const formatTransaction = (hash) => {
    if (hash) {
      return (
        hash.substring(0, 5) +
        "....." +
        hash.substring(hash.length - 5, hash.length)
      );
    }

    return "...";
  };

  const renderPage = () => {
    const pageNumber = props.page;
    switch (pageNumber) {
      case 0:
        return (
          <div>
            <GeneralInfo {...medicalData} />
            <h5>Quản lý người bệnh</h5>
            <PatientManagement {...medicalData} />
          </div>
        );
      case 1:
        return <Treatment {...medicalData} />;
      case 2:
        return <Diagnose {...medicalData} />;
      case 3:
        return <Prescription {...medicalData} />;
      default:
        return <GeneralInfo {...medicalData} />;
    }
  };

  return (
    <>
      <div className="medical-detail__wrapper">
        {renderPage()}
        <div className="medical-hash">
          <span>
            {`Xác thực bởi giao dịch: ${formatTransaction(transactionHash)}`}
          </span>
        </div>
      </div>
    </>
  );
};

export default MedicalRecordDetail;

import React, {useState} from "react";
import "./styles.scss";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import List from "../../features/medicalRecord/List";
import Filters from "../../features/medicalRecord/Filters";
import {globalState} from "../../features/global/globalSlice";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import medicalRecordServices from "../../features/medicalRecord/medicalRecordServices";
import ConfirmModal from "../../features/medicalRecord/ConfirmModal";
import {getKeyAPI} from "../../features/medicalRecord/medicalRecordAPI";
import {authorizationState} from "../../features/authorization/authorizationSlice";

const aes256 = require("aes256");

function MedicalRecordPage() {
  const {web3, accounts, currentUser, hash_1, confirm} =
    useSelector(globalState);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [show, setShow] = useState(false);
  const handleCloseConfirmModal = () => setShow(false);
  const handleOpenConfirmModal = () => setShow(true);
  const {userRole} = useSelector(authorizationState);

  useEffect(() => {
    const processMedicalRecord = async () => {
      const getKey = await getKeyAPI({
        publicAddress: currentUser.publicAddress,
        doctorAddress: currentUser.publicAddress,
      });

      const {patientKey} = getKey.data;
      const medicalRecordService = new medicalRecordServices({
        web3,
        accounts,
        currentUser,
      });

      const medicalRecordIPFSSTring =
        await medicalRecordService.getMedicalRecordList();
      console.log(medicalRecordIPFSSTring);

      let medicalRecordList = [];

      for await (const element of medicalRecordIPFSSTring) {
        const file = await axios.get(`https://ipfs.infura.io/ipfs/${element}`);
        const decryptedFile_final = userRole.includes("DOCTOR")
          ? file.data
          : await aes256.decrypt(patientKey, file.data);
        const decryptedFile = await aes256.decrypt(hash_1, decryptedFile_final);
        const decryptedFileObjects = JSON.parse(decryptedFile);
        medicalRecordList.unshift({...decryptedFileObjects, ipfsHash: element});
      }

      setMedicalRecords(medicalRecordList);
    };

    if (confirm || hash_1) {
      processMedicalRecord();
      handleCloseConfirmModal();
    } else {
      handleOpenConfirmModal();
    }
  }, [hash_1, confirm, accounts, currentUser, web3]);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="medical__wrapper">
        <div className="body__wrapper homepage__wrapper">
          <div className="row section-wrapper">
            <div className="col-3 medical-record-list__filter">
              <section className="medicalrecord__section filters__section">
                <div className="section-body">
                  <Filters />
                </div>
              </section>
            </div>
            <div className="col-9">
              <section className="lists__section">
                <div className="section-body">
                  <List medicalRecordList={medicalRecords} />
                  <ConfirmModal
                    show={show}
                    handleCloseConfirmModal={handleCloseConfirmModal}
                    handleOpenConfirmModal={handleOpenConfirmModal}
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MedicalRecordPage;

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

const aes256 = require("aes256");

function MedicalRecordPage() {
  const {web3, accounts, currentUser, hash_1, confirm} =
    useSelector(globalState);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [show, setShow] = useState(false);
  const handleCloseConfirmModal = () => setShow(false);
  const handleOpenConfirmModal = () => setShow(true);

  useEffect(() => {
    const processMedicalRecord = async () => {
      const medicalRecordService = new medicalRecordServices({
        web3,
        accounts,
        currentUser,
      });

      const medicalRecordIPFSSTring =
        await medicalRecordService.getMedicalRecordList();

      let medicalRecordList = [];

      for await (const element of medicalRecordIPFSSTring) {
        const file = await axios.get(`https://ipfs.infura.io/ipfs/${element}`);
        const decryptedFile = await aes256.decrypt(hash_1, file.data);
        const decryptedFileObjects = JSON.parse(decryptedFile);
        medicalRecordList.push({...decryptedFileObjects, ipfsHash: element});
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

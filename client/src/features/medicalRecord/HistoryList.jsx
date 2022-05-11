import React, { useEffect, useState } from "react";
import "./styles.scss";
import HistoryItem from './HistoryItem';
import axios from "axios";
import { getKeyAPI } from './medicalRecordAPI';
import { useSelector } from 'react-redux';
import { globalState } from '../global/globalSlice';

const aes256 = require("aes256");
const {sha256} = require("js-sha256").sha256;

function HistoryList({ historyList, patientPassword, preloadData }) {
  const [encryptedHistoryList, setEncryptedHistoryList] = useState([]);
  const { currentUser } = useSelector(globalState);

  useEffect(() => {
    const renderDecryptedRecords = async () => {
      for await (const element of historyList) {
        const file = await axios.get(`https://ipfs.infura.io/ipfs/${element}`);
        const getKey = await getKeyAPI({
          publicAddress: currentUser.publicAddress,
          doctorAddress: currentUser.publicAddress,
          patientAddress: preloadData?.user[0]?.publicAddress
        })
        const { patientKey } = getKey.data;
        const hash1 = await sha256(patientPassword);
        const decryptedFile = await aes256.decrypt(patientKey, file.data);
        const decryptedObject = await aes256.decrypt(hash1, decryptedFile);
        setEncryptedHistoryList((prev) => {
          return [
            ...prev,
            JSON.parse(decryptedObject)
          ]
        })
      }
    }

    if (historyList && patientPassword) {
      renderDecryptedRecords();
    }
  }, [historyList, patientPassword])

  const renderMedicalRecord = encryptedHistoryList.map((medicalRecord, key) => (
    <HistoryItem key={key} medicalRecord={medicalRecord} />
  ));
  return <div className="history-list">{renderMedicalRecord}</div>;
}

export default HistoryList;

import React, {useEffect, useState} from "react";
import "./styles.scss";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import MedicalRecordForm from "../../features/medicalRecord/NewForm";
import { useLocation } from 'react-router-dom';
import io from "socket.io-client";
import HistoryList from '../../features/medicalRecord/HistoryList';
import { useSelector } from 'react-redux';
import { globalState } from '../../features/global/globalSlice';
import MedicalRecord from "../../contracts/MedicalRecord.json";
import { Modal } from "react-bootstrap";
import { isEmpty } from 'lodash';
import { AiFillLock } from 'react-icons/ai';
const NodeRSA = require("node-rsa");
const keyRSA = new NodeRSA({b: 512});
let socket;

const NewMedicalRecordPage = () => {
  const [page, setPage] = useState(0);
  const [historyList, setHistoryList] = useState([]);
  const [patientPassword, setPatientPassword] = useState("");
  const [show, setShow] = useState(false);
  const { currentUser, web3 } = useSelector(globalState);
  const { state } = useLocation();

  useEffect(() => {
    socket = io(process.env.REACT_APP_API_URL || "http://localhost:8080");

    socket.emit("join-patient", state.preloadData.user[0]._id, (res) => {
      console.log(`Connected to room ${res.data}`);
    });

    socket.on("password-received", (res) => {
      setShow(false);
      const {password} = res;
      const decryptedPassword = keyRSA.decrypt(password);
      if (decryptedPassword) {
        console.log(`Patient password is ${password}`);
        setPatientPassword(decryptedPassword);
      }
    });

    const getHistoryList = async () => {
      let userAddress = state.preloadData?.user[0].publicAddress;
      if (userAddress) {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = MedicalRecord.networks[networkId];
        const instance = new web3.eth.Contract(
          MedicalRecord.abi,
          deployedNetwork && deployedNetwork.address
        );

        const patientRecordList = await instance.methods
          .getMedicalRecord(userAddress, 0)
          .call();

        if (patientRecordList) {
          setHistoryList(patientRecordList);
        }
      }
    }

    if (state.preloadData) {
      getHistoryList();
    }
  }, [state]);

  const formTitle = [
    "Thông tin chung",
    "Chỉ số sinh tồn",
    "Chẩn đoán",
    "Đơn thuốc",
  ];

  const handleChangePage = () => {
    setPage((currentPage) => {
      return currentPage + 1;
    });
  };

  const handleTabClick = (tabIndex) => {
    setPage(tabIndex);
  };

  const setActive = (index) => {
    if (index === page) {
      return "active";
    }

    return "";
  };

  const requestHistoryList = async () => {
    setShow(true);
    const publicKey = await keyRSA.exportKey("pkcs8-public-pem");
    if (socket && !patientPassword) {
      socket.emit(
        "request-password",
        {_id: currentUser._id, name: currentUser.name, publicAddress: currentUser.publicAddress},
        state.preloadData?.user[0]._id,
        publicKey
      )
    }
  }

  const hideModal = () => {
    setShow(false);
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className="body__wrapper medical-record__wrapper">
        <section className="new-medical-record__tab">
          {formTitle.map((title, index) => {
            return (
              <div
                key={"tab-" + index}
                onClick={() => handleTabClick(index)}
                className={"tab__pane " + setActive(index)}
              >
                {title}
              </div>
            );
          })}
        </section>
        <section className="new-medical-record__form medicine-form">
          <MedicalRecordForm preloadData={state.preloadData} page={page} handleChangePage={handleChangePage} patientPassword={patientPassword} socket={socket} keyRSA={keyRSA} />
        </section>
        <section className="new-medical-record__form record-history__wrapper">
          <button disabled={patientPassword} className="btn btn-primary" onClick={requestHistoryList}>Xem bệnh sử </button>
          {isEmpty(patientPassword) ?
            <div className='lock-icon'>
              <AiFillLock/>
            </div>
            : <HistoryList preloadData={state.preloadData} historyList={historyList} patientPassword={patientPassword} />
          }
        </section>
        <WaitingHistoryModal show={show} hideModal={hideModal} />
      </div>
    </>
  );
};

const WaitingHistoryModal = (props) => {
  const { hideModal } = props;
  return (
    <>
      <Modal
        show={props.show}
        onHide={hideModal}
        centered
        dialogClassName="add-doctor-form__dialog"
        contentClassName="add-doctor-form__content row"
      >
        <div className="history-modal-waiting">
          Waiting for patient approve...
        </div>
      </Modal>
    </>
  )
}

export default NewMedicalRecordPage;

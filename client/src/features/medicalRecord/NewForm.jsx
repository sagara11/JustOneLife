import React, {useEffect, useState} from "react";
import GeneralInfo from "../../components/NewMedicalRecord/GeneralInfo";
import Diagnose from "../../components/NewMedicalRecord/Diagnose";
import Prescription from "../../components/NewMedicalRecord/Prescription";
import PatientManagement from "../../components/NewMedicalRecord/PatientManagement";
import Treatment from "../../components/NewMedicalRecord/Treatment";
import {useForm} from "react-hook-form";
import MedicalMediaStorage from "../../components/NewMedicalRecord/MedicalMediaStorage";
import PasswordModal from "./PasswordModal";
import io from "socket.io-client";
import {useSelector} from "react-redux";
import {globalState} from "../global/globalSlice";
let socket;
const NodeRSA = require("node-rsa");
const keyRSA = new NodeRSA({b: 512});

const MedicalRecordForm = (props) => {
  const {register, handleSubmit, setValue} = useForm();
  const [show, setShow] = useState(false);
  const [dataRegister, setDataRegister] = useState("");
  const {preloadData} = props;
  const {currentUser} = useSelector(globalState);
  const [patientPassword, setPatientPassword] = useState("");

  useEffect(() => {
    socket = io(process.env.REACT_APP_API_URL || "http://localhost:8080");

    socket.emit("join-patient", preloadData.user[0]._id, (res) => {
      console.log(`Connected to room ${res.data}`);
    });

    socket.on("password-received", (res) => {
      const {password} = res;
      if (password) {
        console.log(`Patient password is ${password}`);
        setPatientPassword(password);
      }
    });
  }, [preloadData]);

  const handleClosePasswordModal = () => setShow(false);
  const handleOpenPasswordModal = async () => {
    setShow(true);
    const publicKey = await keyRSA.exportKey("pkcs8-public-pem");
    // const privateDer = await key.exportKey("pkcs1-private-pem");

    socket.emit(
      "request-password",
      {
        _id: currentUser._id,
        name: currentUser.name,
        publicAddress: currentUser.publicAddress,
      },
      preloadData?.user[0]?._id,
      publicKey
    );
    console.log(`Request password from patient....with publicKey ${publicKey}`);
  };

  const renderPage = () => {
    const pageNumber = props.page;
    switch (pageNumber) {
      case 0:
        return (
          <div>
            <GeneralInfo
              register={register}
              setValue={setValue}
              preloadData={preloadData}
            />
            <h5>Quản lý người bệnh</h5>
            <PatientManagement
              register={register}
              setValue={setValue}
              preloadData={preloadData}
            />
          </div>
        );
      case 1:
        return (
          <Treatment register={register} setValue={setValue} />
        );
      case 2:
        return <Diagnose register={register} setValue={setValue} />;
      case 3:
        return <Prescription register={register} setValue={setValue} />;
      default:
        return (
          <GeneralInfo
            register={register}
            setValue={setValue}
            preloadData={preloadData}
          />
        );
    }
  };

  const onSubmit = (data) => {
    setDataRegister(data);
    handleOpenPasswordModal();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderPage()}
        {props.page === 3 && (
          <button className="btn btn-primary next-button">Lưu</button>
        )}
        {props.page !== 3 && (
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
        keyRSA={keyRSA}
      />
    </>
  );
};

export default MedicalRecordForm;

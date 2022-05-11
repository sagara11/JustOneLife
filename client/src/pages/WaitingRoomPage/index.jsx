import {ErrorMessage} from "@hookform/error-message";
import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import Select from "react-select";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  fetchUserInSystem,
  fetchFalcutiesData,
  updateFalcuty,
} from "../../features/doctor/doctorAPI";
import {globalState} from "../../features/global/globalSlice";
import {
  createWaitingRoomAPI,
  getWaitingRoomAPI,
} from "../../features/waitingRoom/waitingRoomAPI";
import "./styles.scss";

export default function WaitingRoomPage() {
  const [waitingList, setWaitingList] = useState([]);
  const {currentUser} = useSelector(globalState);
  const [show, setShow] = useState(false);
  const handleCloseConfirmModal = () => setShow(false);
  const handleOpenConfirmModal = () => setShow(true);

  useEffect(() => {
    const getList = async () => {
      const {data} = await getWaitingRoomAPI({
        receptionist: currentUser._id,
      });

      if (data) {
        setWaitingList(data);
      }
    };

    getList();
  }, [currentUser, show]);

  const formatAddress = (address) => {
    return (
      address.substring(0, 4) +
      "..." +
      address.substring(address.length - 4, address.length)
    );
  };

  const openWaitingModal = () => {
    handleOpenConfirmModal();
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="medical-record__wrapper waiting-room__wrapper">
        <div className="waiting-room__container">
          <div className="add-waiting-item">
            <button onClick={openWaitingModal} className="btn btn-primary">
              Bệnh nhân mới
            </button>
          </div>
          {waitingList.map((waitingItem, index) => (
            <div key={index} className="waiting-room__item">
              <div className="item user-info">
                <div className="title">Thông tin</div>
                <span className="item-name">{waitingItem.user[0].name}</span>
                <span className="item-public-address">
                  {formatAddress(waitingItem.user[0].publicAddress)}
                </span>
                <span className="item-phone">{waitingItem.user[0].phone}</span>
              </div>
              <div className="item medical-falculty">
                <div className="title">Khoa khám bệnh</div>
                {waitingItem?.falculty[0]?.name || "No falculty selected"}
              </div>
              <div className="item admitted-date">
                <div className="title">Ngày nhập viện</div>
                {waitingItem.admittedToHospital}
              </div>
            </div>
          ))}
          <WaitingModal
            show={show}
            handleCloseConfirmModal={handleCloseConfirmModal}
            handleOpenConfirmModal={handleOpenConfirmModal}
          />
        </div>
      </div>
    </>
  );
}

function WaitingModal({show, handleCloseConfirmModal, handleOpenConfirmModal}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();
  const [userList, setUserList] = useState([]);
  const [falcutiesList, setFalcutiesList] = useState("");
  const [selectedPatient, setSelectedPatient] = useState();
  const [selectedFalcuties, setSelectedFalcuties] = useState();
  const optionsPatient = [];
  const optionsFalcuties = [];
  const {currentUser} = useSelector(globalState);

  if (userList && falcutiesList) {
    userList.forEach((item) => {
      optionsPatient.push({
        value: item._id,
        label: `${item.name} - ${item.email}`,
      });
    });

    falcutiesList.forEach((item) => {
      optionsFalcuties.push({
        value: item._id,
        label: `${item.name}`,
      });
    });
  }

  const handleChangePatientInfo = (selectedOption) => {
    setSelectedPatient(selectedOption);
  };

  const handleChangeFalcuties = (selectedOption) => {
    setSelectedFalcuties(selectedOption);
  };

  const DoctorInfo = () => {
    return (
      <Select
        className="form-control"
        closeMenuOnSelect={false}
        onChange={handleChangePatientInfo}
        value={selectedPatient}
        options={optionsPatient}
        placeholder="Nhập tên..."
      />
    );
  };

  const Falcuties = () => {
    return (
      <Select
        closeMenuOnSelect={false}
        onChange={handleChangeFalcuties}
        value={selectedFalcuties}
        options={optionsFalcuties}
      />
    );
  };

  const onSubmit = async (input) => {
    const falculty = selectedFalcuties.value;
    await createWaitingRoomAPI({
      receptionist: currentUser._id,
      manager: currentUser.receptionist.addedBy,
      user: selectedPatient.value,
      medicalFalculty: input.medicalFalculty,
      falculty: falculty,
    });

    await updateFalcuty({
      addressDoctor: currentUser.publicAddress,
      falculty: falculty,
    });
    handleCloseConfirmModal();
  };

  const onHideModal = () => {
    setValue("medicalFalculty", "");
    handleCloseConfirmModal();
  };

  useEffect(() => {
    const getAllUser = async () => {
      const userListData = await fetchUserInSystem();
      setUserList(userListData.data);
    };

    const getAllFaculties = async () => {
      const falcutiesDataList = await fetchFalcutiesData();
      setFalcutiesList(falcutiesDataList.data);
    };

    getAllUser();
    getAllFaculties();
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={onHideModal}
        centered
        dialogClassName="add-doctor-form__dialog"
        contentClassName="add-doctor-form__content"
      >
        <form
          className="add-doctor-form"
          onSubmit={handleSubmit(onSubmit)}
          id="add-doctor-form"
        >
          <div className="row doctor-content">
            <div className="col-5">
              <div>
                <label>Khoa</label>
              </div>
              <ErrorMessage
                errors={errors}
                name="address"
                render={({message}) => <p>{message}</p>}
              />
              <Falcuties />
            </div>
            <div className="col-7">
              <div>
                <label>Thêm bệnh nhân mới</label>
              </div>
              <ErrorMessage
                errors={errors}
                name="address"
                render={({message}) => <p>{message}</p>}
              />
              <DoctorInfo />
            </div>
          </div>
          <button className="btn btn-primary">THÊM</button>
        </form>
      </Modal>
    </>
  );
}

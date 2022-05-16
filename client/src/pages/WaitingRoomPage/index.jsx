import { ErrorMessage } from "@hookform/error-message";
import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Select from "react-select";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  fetchUserInSystem,
  fetchFalcutiesData,
  updateFalcuty,
} from "../../features/doctor/doctorAPI";
import { globalState } from "../../features/global/globalSlice";
import {
  createWaitingRoomAPI,
  getWaitingRoomAPI,
} from "../../features/waitingRoom/waitingRoomAPI";
import "./styles.scss";

export default function WaitingRoomPage() {
  const [waitingList, setWaitingList] = useState([]);
  const { currentUser } = useSelector(globalState);
  const [show, setShow] = useState(false);
  const handleCloseConfirmModal = () => setShow(false);
  const handleOpenConfirmModal = () => setShow(true);
  const [falcultiesList, setFalcultiesList] = useState([]);
  const [selectedFalculty, setSelectedFalculty] = useState(null);
  const [showedFalculty, setShowedFalculty] = useState(null);

  useEffect(() => {
    const getList = async () => {
      const { data } = await getWaitingRoomAPI({
        receptionist: currentUser._id,
      });

      if (data) {
        setWaitingList(data);
      }
    };

    getList();
  }, [currentUser, show]);

  useEffect(() => {
    const getAllFaculties = async () => {
      const falcutiesDataList = await fetchFalcutiesData();
      setFalcultiesList(falcutiesDataList.data);
    };

    getAllFaculties();
  }, [show]);

  const formatAddress = (address) => {
    return (
      address.substring(0, 4) +
      "..." +
      address.substring(address.length - 4, address.length)
    );
  };

  const openWaitingModal = (e, itemId) => {
    e.preventDefault();
    if (!itemId) return;
    setSelectedFalculty(itemId);
    handleOpenConfirmModal();
  };

  const openWaitingList = (e, itemId) => {
    e.preventDefault();
    if (!itemId) return;
    setShowedFalculty(itemId);
  };

  const closeWaitingList = (e, itemId) => {
    e.preventDefault();
    if (!itemId) return;
    setShowedFalculty(null);
  };

  const renderFalcultyList =
    falcultiesList &&
    falcultiesList.map((item, key) => (
      <Col md={4} key={key}>
        <div className="faculties-item">
          <div className="item-header">
            <b>Khoa: </b>
            <span style={{ fontSize: "18px" }}>{item.name}</span>
          </div>
          <div className="item-body">
            <p>
              <b>Bệnh nhân đang chờ: </b>
              <span style={{ fontSize: "18px" }}>{item.patientCount}</span>
            </p>
          </div>
          <div className="item-body item-options">
            {showedFalculty && showedFalculty === item._id ? (
              <button
                className="btn btn-primary button-view"
                onClick={(e) => closeWaitingList(e, item._id)}
              >
                Hủy xem
              </button>
            ) : (
              <button
                className="btn btn-primary button-view"
                onClick={(e) => openWaitingList(e, item._id)}
              >
                Xem danh sách
              </button>
            )}
            <button
              className="btn btn-primary"
              onClick={(e) => openWaitingModal(e, item._id)}
            >
              Thêm bệnh nhân
            </button>
          </div>
        </div>
      </Col>
    ));

  const renderWaitingList = waitingList.map(
    (waitingItem, index) =>
      waitingItem?.falculty[0]?._id === showedFalculty && (
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
      )
  );

  return (
    <>
      <Header />
      <Sidebar />
      <div className="medical-record__wrapper waiting-room__wrapper">
        <div className="waiting-room__container">
          <Row>{renderFalcultyList}</Row>
          {showedFalculty && (
            <>
              <h3>Danh sách hàng chờ</h3>
              {renderWaitingList}
            </>
          )}
          <WaitingModal
            show={show}
            handleCloseConfirmModal={handleCloseConfirmModal}
            selectedFalculty={selectedFalculty}
            setShowedFalculty={setShowedFalculty}
          />
        </div>
      </div>
    </>
  );
}

function WaitingModal({
  show,
  handleCloseConfirmModal,
  selectedFalculty,
  setShowedFalculty,
}) {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [userList, setUserList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState();
  const optionsPatient = [];
  const { currentUser } = useSelector(globalState);

  if (userList) {
    userList.forEach((item) => {
      optionsPatient.push({
        value: item._id,
        label: `${item.name} - ${item.email}`,
      });
    });
  }

  const handleChangePatientInfo = (selectedOption) => {
    setSelectedPatient(selectedOption);
  };

  const DoctorInfo = () => {
    return (
      <Select
        className="select-patient"
        closeMenuOnSelect={false}
        onChange={handleChangePatientInfo}
        value={selectedPatient}
        options={optionsPatient}
        placeholder="Nhập tên..."
      />
    );
  };

  const onSubmit = async (input) => {
    const falculty = selectedFalculty;
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
    setShowedFalculty(selectedFalculty);
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

    getAllUser();
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
        <div className="modal-header waiting-room-modal-header">
          Thêm mới bệnh nhân
        </div>
        <form
          className="add-doctor-form"
          onSubmit={handleSubmit(onSubmit)}
          id="add-doctor-form"
        >
          <div className="row doctor-content receptionist-waitingroom__wrapper">
            <div className="col-12">
              <div className="title">
                <label>Bệnh nhân</label>
              </div>
              <ErrorMessage
                errors={errors}
                name="address"
                render={({ message }) => <p>{message}</p>}
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

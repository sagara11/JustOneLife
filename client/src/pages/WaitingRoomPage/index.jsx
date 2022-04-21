import { ErrorMessage } from '@hookform/error-message';
import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Select from "react-select";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { fetchUserInSystem } from '../../features/doctor/doctorAPI';
import { globalState } from '../../features/global/globalSlice';
import { createWaitingRoomAPI, getWaitingRooomAPI } from '../../features/waitingRoom/waitingRoomAPI';
import makeAnimated from "react-select/animated";
import "./styles.scss"

export default function WaitingRoomPage() {
  const [waitingList, setWaitingList] = useState([]);
  const { currentUser } = useSelector(globalState);
  const [show, setShow] = useState(false);
  const handleCloseConfirmModal = () => setShow(false);
  const handleOpenConfirmModal = () => setShow(true);

  useEffect(() => {
    const getList = async () => {
      const {data} = await getWaitingRooomAPI({
        receptionist: currentUser._id,
      });

      if (data) {
        setWaitingList(data);
      }
    }

    getList();
  }, [currentUser, show])

  const formatAddress = (address) => {
    return address.substring(0, 4) + "..." + address.substring(address.length - 4, address.length)
  }

  const openWaitingModal = () => {
    handleOpenConfirmModal();
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className="medical-record__wrapper waiting-room__wrapper">
        <div className="waiting-room__container">
          <div className="add-waiting-item">
            <button onClick={openWaitingModal} className="btn btn-primary">Bệnh nhân mới</button>
          </div>
          {
            waitingList.map((waitingItem, index) =>
              <div key={index} className="waiting-room__item">
                <div className="item user-info">
                  <div className="title">Thông tin</div>
                  <span className='item-name'>{waitingItem.user[0].name}</span>
                  <span className='item-public-address'>{formatAddress(waitingItem.user[0].publicAddress)}</span>
                  <span className="item-phone">{waitingItem.user[0].phone}</span>
                </div>
                <div className="item medical-falculty">
                  <div className="title">Khoa khám bệnh</div>
                  {waitingItem.medicalFalculty || "No falculty selected"}
                </div>
                <div className="item admitted-date">
                  <div className="title">Ngày nhập viện</div>
                  {waitingItem.admittedToHospital}
                </div>
              </div>
            )
          }
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

function WaitingModal({
  show,
  handleCloseConfirmModal,
  handleOpenConfirmModal,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();
  const [userList, setUserList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [];
  const animatedComponents = makeAnimated();
  const {currentUser} = useSelector(globalState);

  if (userList) {
    userList.forEach((item) => {
      options.push({
        value: item._id,
        label: `${item.name} - ${item.publicAddress}`,
      });
    });
  }

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const AnimatedMulti = () => {
    return (
      <Select
        className="form-control"
        closeMenuOnSelect={false}
        components={animatedComponents}
        onChange={handleChange}
        value={selectedOptions}
        isMulti
        options={options}
        placeholder="Nhập tên..."
      />
    );
  };

  const onSubmit = async (input) => {
    const {data} = await createWaitingRoomAPI({
      receptionist: currentUser._id,
      manager: currentUser.receptionist.addedBy,
      user: selectedOptions[0].value,
      medicalFalculty: input.medicalFalculty
    })

    handleCloseConfirmModal();
  }

  const onHideModal = () => {
    setSelectedOptions("");
    setValue("medicalFalculty", "");
    handleCloseConfirmModal();
  }

  useEffect(() => {
    const getAllUser = async () => {
      const userListData = await fetchUserInSystem();
      setUserList(userListData.data);
    };

    getAllUser();
  }, [])

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
          <div className="new-doctor">
            <label>Thêm người bệnh vào phòng chờ</label>
          </div>
          <ErrorMessage
            errors={errors}
            name="address"
            render={({ message }) => <p>{message}</p>}
          />
          <AnimatedMulti />
          <input
            {...register("medicalFalculty", {required: "Required"})}
            className="form-control"
            placeholder="Medical Falculty"
            type="text"
          />
          <button className="btn btn-primary">THÊM</button>
        </form>
      </Modal>
    </>
  );
}

import React, {useEffect, useState} from "react";
import "./styles.scss";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {globalState} from "../global/globalSlice";
import {setRoleDoctor} from "../authorization/authorizationSlice";
import {
  fetchUserInSystem,
  fetchFalcutiesData,
  updateFalcuty,
} from "../doctor/doctorAPI";
import Select from "react-select";

const AddDoctorForm = ({show, handleCloseAddDoctorModal}) => {
  const {
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();
  const {web3, accounts, currentUser} = useSelector(globalState);
  const [userList, setUserList] = useState("");
  const [falcutiesList, setFalcutiesList] = useState("");
  const [selectedDoctorInfo, setSelectedDoctorInfo] = useState();
  const [selectedFalcuties, setSelectedFalcuties] = useState();
  const optionsDoctors = [];
  const optionsFalcuties = [];

  if (userList && falcutiesList) {
    userList.forEach((item) => {
      optionsDoctors.push({
        value: item.publicAddress,
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

  const DoctorInfo = () => {
    return (
      <Select
        closeMenuOnSelect={false}
        onChange={handleChangeDoctorInfo}
        value={selectedDoctorInfo}
        options={optionsDoctors}
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

  const handleChangeDoctorInfo = (selectedOption) => {
    setSelectedDoctorInfo(selectedOption);
  };

  const handleChangeFalcuties = (selectedOption) => {
    setSelectedFalcuties(selectedOption);
  };

  const onSubmit = async () => {
    const addressDoctor = selectedDoctorInfo.value;
    const falcuty = selectedFalcuties.value;
    dispatch(
      setRoleDoctor({
        web3,
        accounts,
        currentUser,
        address: addressDoctor,
      })
    );

    await updateFalcuty({addressDoctor: addressDoctor, falculty: falcuty});
    setSelectedDoctorInfo("");
    setSelectedFalcuties("");
  };

  const onHideModal = () => {
    setValue("address", "");
    handleCloseAddDoctorModal();
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
              <label>Thêm bác sĩ mới</label>
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
  );
};
export default AddDoctorForm;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { globalState } from "../../features/global/globalSlice";
import { getDoctorRoomAPI } from "../../features/waitingRoom/waitingRoomAPI";
import "./styles.scss";

export default function DoctorRoomPage() {
  const [room, setRoom] = useState(null);
  const { currentUser } = useSelector(globalState);
  useEffect(() => {
    const getList = async () => {
      const { data } = await getDoctorRoomAPI({
        patientId: currentUser._id,
      });

      if (data) {
        setRoom(data);
      }
    };

    getList();
  }, [currentUser]);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="medical-record__wrapper waiting-room__wrapper">
        <div className="waiting-room__container">
          <div className="doctor-room__item">
            <h1>Phòng khám</h1>
            {room ? (
              <>
                <div className="item-header">Thông tin phòng khám</div>
                <div className="item-body">
                  <p>
                    <b>Bệnh nhân: </b>
                    <span style={{ fontSize: "18px" }}>{room.user.name}</span>
                  </p>
                  <p>
                    <b>Khoa khám bệnh: </b>
                    <span style={{ fontSize: "18px" }}>
                      {room.falculty.name}
                    </span>
                  </p>
                  <p>
                    <b>Ngày khám: </b>
                    <span style={{ fontSize: "18px" }}>
                      {room.admittedToHospital}
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <h3>Chưa có phòng khám nào</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import "./styles.scss";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { authorizationState } from "../../features/authorization/authorizationSlice";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { globalState } from "../../features/global/globalSlice";

import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
ChartJS.register(...registerables);

const labels = [
  "Jan",
  "Feb",
  "Mac",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
};

function HomePage() {
  const { userRole } = useSelector(authorizationState);
  const { currentUser } = useSelector(globalState);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    async function getMedicalRecordList() {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/medical-transaction`,
        config
      );
      return data;
    }

    if (userRole.includes(process.env.REACT_APP_ROLE_ADMIN)) {
      setDataChart([]);
    }
    if (
      userRole.includes(process.env.REACT_APP_ROLE_MANAGER) &&
      !userRole.includes(process.env.REACT_APP_ROLE_ADMIN)
    ) {
      getMedicalRecordList().then((res) => console.log(res.data.data));
    }
  }, [userRole]);

  if (userRole.includes(process.env.REACT_APP_ROLE_DOCTOR)) {
    return <Redirect to="/waiting-list" />;
  }

  if (currentUser?.receptionist.isReceptionist) {
    return <Redirect to="/waiting-room" />;
  }

  if (userRole.length === 1 && userRole[0] === "PATIENT") {
    return <Redirect to={`/medical-record/${currentUser.publicAddress}`} />;
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className="body__wrapper homepage__wrapper">
        <div className="row section-wrapper">
          <div className="col-12">
            <section className="home__section chart__section">
              <div className="section-header">
                <p>Thống kê hố sơ bệnh án</p>
              </div>
              <div className="section-body">
                <Line
                  data={{
                    labels,
                    datasets: [
                      {
                        data: dataChart,
                        label: "Medical Records",
                        borderColor: "#29a9f5",
                        fill: true,
                      },
                    ],
                  }}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;

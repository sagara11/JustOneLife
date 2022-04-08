import React, { useState } from "react";
import {useLocation} from 'react-router-dom'
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MedicalRecordDetail from '../../features/medicalRecord/Detail';
import "./styles.scss";

function ShowMedicalRecord({medicalRecord}) {
  let { state } = useLocation();
  const [page, setPage] = useState(0);
  const tabTitle = [
    "General Information",
    "Patient Management",
    "Diagnose",
    "Treatment",
    "Medical Media Storage",
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

  return (
    <>
      <Header />
      <Sidebar />
      <div className="body__wrapper medical-record__wrapper">
        <section className="new-medical-record__tab">
          {tabTitle.map((title, index) => {
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
        <section className="new-medical-record__form">
          <MedicalRecordDetail page={page} handleChangePage={handleChangePage} medicalData={state} />
        </section>
      </div>
    </>
  );
}

export default ShowMedicalRecord;

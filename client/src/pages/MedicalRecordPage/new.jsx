import React, { useState } from "react";
import "./styles.scss";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import MedicalRecordForm from '../../features/medical_record/NewForm';

const NewMedicalRecordPage = () => {
  const [page, setPage] = useState(0);
  const formTitle = ["General Information", "Patient Management", "Diagnose", "Treatment", "Medical Media Storage"];

  const handleChangePage = () => {
    setPage((currentPage) => {
      return currentPage + 1;
    });
  }

  const handleTabClick = (tabIndex) => {
    setPage(tabIndex);
  }

  const setActive = (index) => {
    if (index === page) {
      return "active";
    }

    return "";
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className="body__wrapper medical-record__wrapper">
        <section className="new-medical-record__tab">
          {formTitle.map((title, index) => {
            return (
              <div key={"tab-" + index} onClick={() => handleTabClick(index)} className={"tab__pane " + setActive(index)}>{title}</div>
            )
          })}
        </section>
        <section className="new-medical-record__form">
          <MedicalRecordForm page={page} handleChangePage={handleChangePage} />
        </section>
      </div>
    </>
  );
}

export default NewMedicalRecordPage;

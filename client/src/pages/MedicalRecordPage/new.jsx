import React, {useEffect, useState} from "react";
import "./styles.scss";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import MedicalRecordForm from "../../features/medicalRecord/NewForm";
import { useLocation } from 'react-router-dom';

const NewMedicalRecordPage = () => {
  const [page, setPage] = useState(0);
  const { state } = useLocation();

  useEffect(() => {
    console.log("waiting room data" , state.preloadData)
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
          <MedicalRecordForm preloadData={state.preloadData} page={page} handleChangePage={handleChangePage} />
        </section>
      </div>
    </>
  );
};

export default NewMedicalRecordPage;

import React from "react";
import "./styles.scss";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Filters from "../../features/medical_record/Filters";
import List from "../../features/medical_record/List";

function MedicalRecordPage() {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="body__wrapper">
        <div className="body__wrapper homepage__wrapper">
          <div className="row section-wrapper">
            <div className="col-3">
              <section className="medicalrecord__section filters__section">
                <div className="section-body">
                  <Filters />
                </div>
              </section>
            </div>
            <div className="col-9">
              <section className="lists__section">
                <div className="section-body">
                  <List />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MedicalRecordPage;

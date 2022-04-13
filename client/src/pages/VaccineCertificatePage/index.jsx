import React from "react";
import "./styles.scss";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Filters from "../../features/vaccineCertificate/Filters";
import List from "../../features/vaccineCertificate/List";
import NewForm from "../../features/vaccineCertificate/NewForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getVaccineCertificateList,
  vaccineState,
} from "../../features/vaccineCertificate/vaccineSlice";
import { useEffect } from "react";
import { globalState } from "../../features/global/globalSlice";
import { useParams } from "react-router-dom";

function VaccineCertificatePage() {
  const { vaccineList } = useSelector(vaccineState);
  const { web3, accounts, currentUser } = useSelector(globalState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVaccineCertificateList({ web3, accounts, currentUser }));
  }, [accounts, currentUser, dispatch, web3]);

  let { patientPublicAddress } = useParams();

  const isCreating = patientPublicAddress ? false : true;

  return (
    <>
      <Header />
      <Sidebar />
      <div className="body__wrapper">
        <div className="body__wrapper homepage__wrapper">
          <div className="row section-wrapper">
            {isCreating ? (
              <>
                <div className="col-12">
                  <div className="new-certificate-form">
                    <div className="form-title">
                      Add New Vaccine Certificate
                    </div>
                    <div className="form-detail">
                      <NewForm />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-3">
                  <section className="vaccinecertificate__section filters__section">
                    <div className="section-body">
                      <Filters />
                    </div>
                  </section>
                </div>
                <div className="col-9">
                  <section className="lists__section">
                    <div className="section-body">
                      <List vaccineList={vaccineList} />
                    </div>
                  </section>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default VaccineCertificatePage;

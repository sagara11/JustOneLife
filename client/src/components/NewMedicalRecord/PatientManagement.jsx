import { isEmpty } from 'lodash';
import React, { useEffect } from "react";

function PatientManagement(props) {
  const {register, setValue, preloadData} = props;

  useEffect(() => {
    if (preloadData) {
      setValue("patientManagement.medicalFalculty.falculty", preloadData.falculty[0].name);
      setValue("patientManagement.admittedHospitalAt", preloadData.admittedToHospital);
    }
  }, [preloadData])

  return (
    <div className="row">
      <div className="col-6">
        <div className="field-input">
          <label htmlFor="">Ngày nhập viện</label>
          <input
            type="date"
            {...register("patientManagement.admittedHospitalAt")}
            className="form-control" />
        </div>
      </div>
      <div className="col-6">
        <div className="field-input">
          <label className="title" htmlFor="">Khoa khám bệnh</label>
          <div className="nested">
            <span className="secondary-title">Khoa</span>
            <input
              readOnly={!isEmpty(preloadData.falculty[0].name)}
              {...register("patientManagement.medicalFalculty.falculty")}
              className="form-control" />
            <span className="secondary-title">Thời gian vào khám</span>
            <input
              type="date"
              {...register("patientManagement.medicalFalculty.time")}
              className="form-control" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientManagement;

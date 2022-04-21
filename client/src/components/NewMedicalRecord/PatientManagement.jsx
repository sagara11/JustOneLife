import { isEmpty } from 'lodash';
import React, { useEffect } from "react";

function PatientManagement(props) {
  const {register, setValue, preloadData} = props;

  useEffect(() => {
    if (preloadData) {
      setValue("patientManagement.medicalFalculty.falculty", preloadData.medicalFalculty);
      setValue("patientManagement.admittedHospitalAt", preloadData.admittedToHospital);
    }
  }, [preloadData])

  return (
    <div className="row">
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Ngày nhập viện</label>
          <input
            type="date"
            {...register("patientManagement.admittedHospitalAt")}
            className="form-control" />
        </div>
      </div>
      <div className="col-4">
        <div className="field-input">
          <label className="title" htmlFor="">Khoa khám bệnh</label>
          <div className="nested">
            <span className="secondary-title">Khoa</span>
            <input
              readOnly={!isEmpty(preloadData.medicalFalculty)}
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
      <div className="col-4">
        <div className="field-input">
          <label className="title" htmlFor="">Chuyển khoa</label>
          <div className="nested">
            <span className="secondary-title">Khoa</span>
            <input
              {...register("patientManagement.changeFalculty.falculty")}
              className="form-control" />
            <span className="secondary-title">Thời gian</span>
            <input
              type="date"
              {...register("patientManagement.changeFalculty.time")}
              className="form-control" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientManagement;

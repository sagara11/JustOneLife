import React from "react";

function Treatment(props) {
  const {
    register
  } = props;

  return (
    <div className="row">
      <div className="col-4">
        <div className="field-input">
          <label className="title" htmlFor="">Chung</label>
          <div className="nested">
            <span className="secondary-title">            <div className="sub-title">Mạch</div>
</span>
            <input
              type="number"
              {...register("treatment.general.pulse")}
              className="form-control" />
            <span className="secondary-title">Nhiệt độ cơ thể</span>
            <input
              type="number"
              {...register("treatment.general.bloodTemperature")}
              className="form-control" />
            <span className="secondary-title">Huyết áp</span>
            <input
              type="number"
              {...register("treatment.general.bloodPressure")}
              className="form-control" />
            <span className="secondary-title">Nhịp thở</span>
            <input
              type="number"
              {...register("treatment.general.breathing")}
              className="form-control" />
            <span className="secondary-title">Cân nặng</span>
            <input
              type="number"
              {...register("treatment.general.weight")}
              className="form-control" />
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="field-input">
          <label className="title" htmlFor="">Cơ quan người bệnh</label>
          <div className="nested">
            <span className="secondary-title">Hệ tuần hoàn</span>
            <input
              {...register("treatment.system.circulatorySystem")}
              className="form-control" />
            <span className="secondary-title">Hệ hô hấp</span>
            <input
              {...register("treatment.system.respiratorySystem")}
              className="form-control" />
            <span className="secondary-title">Hệ tiêu hóa</span>
            <input
              {...register("treatment.system.digestiveSystem")}
              className="form-control" />
            <span className="secondary-title">Hệ thần kinh</span>
            <input
              {...register("treatment.system.nervousSystem")}
              className="form-control" />
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="field-input">
          <label className="title" htmlFor="">Khám lâm sàng</label>
          <div className="nested">
            <span className="secondary-title">Trạng thái người bệnh</span>
            <textarea
              {...register("treatment.clinicalTest.treatmentMethod")}
              className="form-control">
            </textarea>
            <span className="secondary-title">Phương pháp điều trị</span>
            <textarea
              {...register("treatment.clinicalTest.patientStatus")}
              className="form-control">
            </textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Treatment;

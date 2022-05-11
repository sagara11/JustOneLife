import React from "react";

function Treatment(props) {
  const {
    general,
  } = props.medicalData.treatment;

  const displayNumberData = (number, lowAmount, highAmount) => {
    let numberStatus = "normal";

    if (number > highAmount) {
      numberStatus = "high";
    }

    if (number < lowAmount) {
      numberStatus = "low";
    }

    return `data number-data ${numberStatus}`;
  }

  return (
    <div className="row">
      <div className="col-6">
        <div className="field-input number-data__pillar">
          <label className="title" htmlFor="">Chung</label>
          <div className="content">
            <div className="sub-title">Huyết áp</div>
            <div className={displayNumberData(general?.bloodPressure, 10, 60)}>{general?.bloodPressure}</div>
          </div>
          <div className="content">
            <div className="sub-title">Nhiệt độ cơ thể</div>
            <div className={displayNumberData(general?.bloodTemperature, 5, 20)}>{general?.bloodTemperature}</div>
          </div>
          <div className="content">
            <div className="sub-title">Chiều cao</div>
            <div className={displayNumberData(general?.weight, 40, 70)}>{general?.weight}</div>
          </div>
          <div className="content">
            <div className="sub-title">Cân nặng</div>
            <div className={displayNumberData(general?.weight, 40, 70)}>{general?.weight}</div>
          </div>
        </div>
          <div className="content">
            <div className="sub-title">Nhịp thở</div>
            <div className={displayNumberData(general?.breathing, 10, 20)}>{general?.breathing}</div>
          </div>
          <div className="content">
            <div className="sub-title">Mạch</div>
            <div className={displayNumberData(general?.pulse, 5, 20)}>{general?.pulse}</div>
          </div>
      </div>
    </div>
  );
}

export default Treatment;

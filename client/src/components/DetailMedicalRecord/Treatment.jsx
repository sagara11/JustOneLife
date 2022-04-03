import React from "react";

function Treatment(props) {
  const {
    clinicalTest,
    general,
    system,
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
          <label className="title" htmlFor="">General</label>
          <div className="content">
            <div className="sub-title">Blood pressure</div>
            <div className={displayNumberData(general.bloodPressure, 10, 60)}>{general.bloodPressure}</div>
          </div>
          <div className="content">
            <div className="sub-title">Blood temperature</div>
            <div className={displayNumberData(general.bloodTemperature, 5, 20)}>{general.bloodTemperature}</div>
          </div>
          <div className="content">
            <div className="sub-title">Breathing</div>
            <div className={displayNumberData(general.breathing, 10, 20)}>{general.breathing}</div>
          </div>
          <div className="content">
            <div className="sub-title">Pulse</div>
            <div className={displayNumberData(general.pulse, 5, 20)}>{general.pulse}</div>
          </div>
          <div className="content">
            <div className="sub-title">Weight</div>
            <div className={displayNumberData(general.weight, 40, 70)}>{general.weight}</div>
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="field-input group-field">
          <label className="title" htmlFor="">Clinical Test</label>
          <div className="content">
            <div className="sub-title">Patient Status</div>
            <div className="data">{clinicalTest.patientStatus}</div>
          </div>
          <div className="content">
            <div className="sub-title">Treatment Method</div>
            <div className="data">{clinicalTest.treatmentMethod}</div>
          </div>
        </div>
        <div className="field-input group-field">
          <label className="title" htmlFor="">System</label>
          <div className="content">
            <div className="sub-title">Circulation System</div>
            <div className="data">{system.circulationSystem}</div>
          </div>
          <div className="content">
            <div className="sub-title">Digestive System</div>
            <div className="data">{system.digestiveSystem}</div>
          </div>
          <div className="content">
            <div className="sub-title">Nervous System</div>
            <div className="data">{system.nervousSystem}</div>
          </div>
          <div className="content">
            <div className="sub-title">Respiratory System</div>
            <div className="data">{system.respiratorySystem}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Treatment;

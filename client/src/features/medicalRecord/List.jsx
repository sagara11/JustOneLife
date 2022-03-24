import React from "react";
import "./styles.scss";
import Item from "./Item";

function List(props) {
  const renderMedicalRecord = props.medicalRecordList.map(
    (medicalRecord, key) => <Item key={key} medicalRecord={medicalRecord} />
  );
  return (
    <div className="lists">
      {renderMedicalRecord}
    </div>
  );
}

export default List;

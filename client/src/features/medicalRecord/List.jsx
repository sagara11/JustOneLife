import React from "react";
import "./styles.scss";
import Item from "./Item";

function List({medicalRecordList}) {
  const renderMedicalRecord = medicalRecordList.map((medicalRecord, key) => (
    <Item key={key} medicalRecord={medicalRecord} />
  ));
  return <div className="lists">{renderMedicalRecord}</div>;
}

export default List;

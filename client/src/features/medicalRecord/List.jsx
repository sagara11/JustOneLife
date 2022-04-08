import React, { useEffect, useState } from "react";
import "./styles.scss";
import Item from "./Item";

function List({medicalRecordList}) {
  const [validRecords, setValidRecords] = useState([]);

  useEffect(() => {
    medicalRecordList.map((record) => {
      if (record.generalInfo) {
        setValidRecords((prev) => {
          return [
            ...prev,
            record
          ]
        })
      }
    })
  }, [medicalRecordList])

  const renderMedicalRecord = validRecords.map((medicalRecord, key) => (
    <Item key={key} medicalRecord={medicalRecord} />
  ));
  return <div className="lists">{renderMedicalRecord}</div>;
}

export default List;

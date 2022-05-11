import React from "react";

function HistoryItem({medicalRecord}) {
  console.log(medicalRecord);

  return (
    <div className="history-item">
      <div className="title">Thông tin chung</div>
      <section className="history-item-section">
        <div className="item">
          <div className="item-label">Thời gian nhập viện</div>
          <div className="item-content">{medicalRecord?.patientManagement?.admittedHospitalAt}</div>
        </div>
        <div className="item">
          <div className="item-label">Khoa</div>
          <div className="item-content">{medicalRecord?.patientManagement?.medicalFalculty?.falculty}</div>
        </div>
        <div className="item">
          <div className="item-label">Bác sĩ khám</div>
          <div className="item-content">{medicalRecord?.doctorName} - {medicalRecord?.doctorAddress}</div>
        </div>
      </section>
      <div className="title">Chẩn đoán</div>
      <section className="history-item-section">
        <div className="item">
          <div className="item-label">Bệnh chính</div>
          <div className="item-content">{medicalRecord?.diagnose?.method?.primaryCondition}</div>
        </div>
        <div className="item">
          <div className="item-label">Mô tả</div>
          <div className="item-content">{medicalRecord?.diagnose?.method?.descriptionCondition}</div>
        </div>
      </section>
      <div className="title">Đơn thuốc điều trị</div>
      <section className="history-item-section">
        {
          medicalRecord.prescription && medicalRecord.prescription.map((medicine, index) => {
            return (
              <div className="medicine-item">
                <div className="item">
                  <div className="item-label">Tên thuốc</div>
                  <div className="item-content">{medicine.name}</div>
                </div>
                <div className="item">
                  <div className="item-label">Cách dùng</div>
                  <div className="item-content">{medicine.usage}</div>
                </div>
                <div className="item">
                  <div className="item-label">Liều lượng</div>
                  <div className="item-content">{medicine.level}</div>
                </div>
              </div>
            )
          })
        }
      </section>
    </div>
  );
}

export default HistoryItem;

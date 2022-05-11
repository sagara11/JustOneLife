import React, {useState} from "react";
import SubPrescription from "./SubPrescription";

function Prescription(props) {
  const {register} = props;
  const [prescriptionNumber, setPrescriptionNumber] = useState(1);

  const handleAddPrescription = () => {
    setPrescriptionNumber(prescriptionNumber + 1);
  };

  const prescriptions = [];
  for (var i = 0; i < prescriptionNumber; i++) {
    prescriptions.push(<SubPrescription key={i} numberPresciption={i} register={register} />);
  }

  return (
    <div>
      {prescriptions}
      <button
        type="button"
        onClick={handleAddPrescription}
        className="btn btn-primary"
      >
        Thêm thuốc
      </button>
    </div>
  );
}

export default Prescription;

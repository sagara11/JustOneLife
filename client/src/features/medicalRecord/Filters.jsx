import React from "react";
import "./styles.scss";

function Filters() {
  return (
    <div className="filter-buttons">
      <div className="form-group filter-buttons">
        <label htmlFor="inputState">Bác sĩ</label>
        <select className="form-control">
          <option selected>Chọn...</option>
          <option>...</option>
        </select>
      </div>
      <div className="form-group filter-buttons">
        <label htmlFor="inputState">Ngày khám</label>
        <select className="form-control">
          <option selected>Chọn...</option>
          <option>...</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;

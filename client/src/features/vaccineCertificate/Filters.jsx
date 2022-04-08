import React from "react";
import "./styles.scss";

function Filters() {
  return (
    <div className="filter-buttons">
      <div className="form-group filter-buttons">
        <label htmlFor="inputState">Doctor</label>
        <select className="form-control">
        </select>
      </div>
      <div className="form-group filter-buttons">
        <label htmlFor="inputState">Date</label>
        <select className="form-control">
        </select>
      </div>
      <div className="form-group filter-buttons">
        <label htmlFor="inputState">Doctor</label>
        <select className="form-control">
        </select>
      </div>
    </div>
  );
}

export default Filters;

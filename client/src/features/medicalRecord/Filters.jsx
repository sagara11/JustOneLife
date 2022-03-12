import React from "react";
import "./styles.scss";

function Filters() {
  return (
    <div className="filter-buttons">
      <div class="form-group filter-buttons">
        <label for="inputState">Doctor</label>
        <select class="form-control">
          <option selected>Choose...</option>
          <option>...</option>
        </select>
      </div>
      <div class="form-group filter-buttons">
        <label for="inputState">Date</label>
        <select class="form-control">
          <option selected>Choose...</option>
          <option>...</option>
        </select>
      </div>
      <div class="form-group filter-buttons">
        <label for="inputState">Doctor</label>
        <select class="form-control">
          <option selected>Choose...</option>
          <option>...</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;

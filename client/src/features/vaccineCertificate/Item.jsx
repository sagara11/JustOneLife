import React from "react";
import "./styles.scss";

function Item({ data }) {
  return (
    <div className="list-element">
      <div className="card">
        <div className="card-header">{data["name"]}</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>Địa điểm: {data["location"]}</p>
            <br />
            <p>Số lô: {data["lotNumber"]}</p>
            <footer className="blockquote-footer">
              Ngày tiêm <cite title="Source Title">{data["date"]}</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default Item;

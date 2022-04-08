import React from "react";
import "./styles.scss";

function Item({ data }) {
  return (
    <div className="list-element">
      <div className="card">
        <div className="card-header">{data["name"]}</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>Location: {data["location"]}</p>
            <br />
            <p>Lot number: {data["lotNumber"]}</p>
            <footer className="blockquote-footer">
              Date <cite title="Source Title">{data["date"]}</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default Item;

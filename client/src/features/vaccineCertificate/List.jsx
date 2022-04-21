import React from "react";
import "./styles.scss";
import Item from "./Item";

function List({ vaccineList }) {
  return (
    <div className="lists">
      {vaccineList && vaccineList.map((item, key) => (
        <Item data={item} key={key} />
      ))}
    </div>
  );
}

export default List;

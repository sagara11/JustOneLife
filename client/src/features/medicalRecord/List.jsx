import React from "react";
import "./styles.scss";
import Item from "./Item";

function List() {
  return (
    <div className="lists">
     <Item />
     <Item />
     <Item />
    </div>
  );
}

export default List;

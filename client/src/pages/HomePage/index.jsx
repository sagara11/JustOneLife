import React from "react";
import "./styles.scss";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function HomePage() {
  return (
    <>
      <Header />
      <div className="body__wrapper">
        <Sidebar />
      </div>
    </>
  );
}

export default HomePage;

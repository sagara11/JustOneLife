import React from "react";
import "./styles.scss";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function HomePage() {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="body__wrapper">
      </div>
    </>
  );
}

export default HomePage;

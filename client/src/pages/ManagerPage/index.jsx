import React from "react";
import "./styles.scss";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import loginBackground from "../../assets/images/login-background.jpg";
import AddManagerForm from '../../features/manager/AddForm';

function ManagerPage() {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="body__wrapper manager-add__wrapper">
        <AddManagerForm />
        <img className="background-img" src={loginBackground} alt="" />
        <div className="background__upper"></div>
      </div>
    </>
  );
}

export default ManagerPage;

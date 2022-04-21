import React from "react";
import "./styles.scss";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function HomePage() {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="body__wrapper homepage__wrapper">
        <div className="row section-wrapper">
          <div className="col-7">
            <section className="home__section medical-record__section">
              <div className="section-header">
                <p>Bệnh án </p>
              </div>
              <div className="section-body">
                body
              </div>
              <div className="btn btn-primary">Xem thêm</div>
            </section>
            <section className="home__section medicine__section">
              <div className="section-header">
                <p>Đơn thuốc</p>
              </div>
              <div className="section-body">
                body
              </div>
              <div className="btn btn-primary">Xem thêm</div>
            </section>
          </div>
          <div className="col-5">
            <section className="home__section vaccine__section">
              <div className="section-header">
                <p>Chứng chỉ vaccine</p>
              </div>
              <div className="section-body">
                body
              </div>
              <div className="btn btn-primary">Xem thêm</div>
            </section>
            <section className="home__section post__section">
              <div className="background-image">
                <img src="/covid19-iniciativas-innovacion-social.jpg" alt="" />
              </div>
              <div className="background-cover">
                <div className="post-header">Post title: Research of Covid19 variant</div>
                <div className="post-description">Lorem ipsum</div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;

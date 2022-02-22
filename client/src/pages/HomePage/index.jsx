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
                <p>Last Record</p>
              </div>
              <div className="section-body">
                body
              </div>
              <div className="btn btn-primary">View</div>
            </section>
            <section className="home__section medicine__section">
              <div className="section-header">
                <p>Medicine</p>
              </div>
              <div className="section-body">
                body
              </div>
              <div className="btn btn-primary">View</div>
            </section>
          </div>
          <div className="col-5">
            <section className="home__section vaccine__section">
              <div className="section-header">
                <p>Vaccine certification</p>
              </div>
              <div className="section-body">
                body
              </div>
              <div className="btn btn-primary">View</div>
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

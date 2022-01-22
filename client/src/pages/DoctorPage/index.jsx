import React, {useState} from "react";
import "./styles.scss";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Modal,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import {BsSearch, BsPlusLg} from "react-icons/bs";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";

function DoctorPage() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [show, setShow] = useState(false);

  const handleCloseAddDoctorModal = () => setShow(false);
  const handleOpenAddDoctorModal = () => setShow(true);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="body__wrapper doctor-page__wrapper">
        <Container>
          <div className="doctor-page__body">
            <div className="doctor-page__body--top">
              <h1 className="table__title">Doctor Management</h1>
              <div className="table__services">
                <Row>
                  <Col md={3}>
                    <Button
                      className="table__services--add-button"
                      onClick={handleOpenAddDoctorModal}
                    >
                      <BsPlusLg /> Add Doctor
                    </Button>
                  </Col>
                  <Col md={2}></Col>
                  <Col md={7}>
                    <div className="table__services--search-bar">
                      <InputGroup>
                        <FormControl placeholder="Type to search" />
                        <Button>
                          <BsSearch />
                        </Button>
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </div>
              <Table bordered hover className="table__body">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Public Address</th>
                    <th>Speciality</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(12)].map((x, i) => (
                    <tr key={i}>
                      <td>1</td>
                      <td>John Smith</td>
                      <td>0x8423310d9aF3631f12BcAf861Bc53A881C14f1bE</td>
                      <td>Anesthetics & Recovery</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="doctor-page__body--bottom">
              <Row>
                <Col md={3}>
                  <div className="table-pagination--infor">
                    Showing 1 to 10 of 57 entries
                  </div>
                </Col>
                <Col md={2}></Col>
                <Col md={7}>
                  <Pagination className="table-pagination">
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Ellipsis />

                    <Pagination.Item>{10}</Pagination.Item>
                    <Pagination.Item>{11}</Pagination.Item>
                    <Pagination.Item active>{12}</Pagination.Item>
                    <Pagination.Item>{13}</Pagination.Item>
                    <Pagination.Item disabled>{14}</Pagination.Item>

                    <Pagination.Ellipsis />
                    <Pagination.Item>{20}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                  </Pagination>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
      <Modal
        show={show}
        onHide={handleCloseAddDoctorModal}
        centered
        dialogClassName="add-doctor-form__dialog"
        contentClassName="add-doctor-form__content"
      >
        <form
          className="add-doctor-form"
          onSubmit={handleSubmit(onSubmit)}
          id="add-doctor-form"
        >
          <ErrorMessage
            errors={errors}
            name="address"
            render={({message}) => <p>{message}</p>}
          />
          <input
            {...register("address", {required: "This is required."})}
            className="form-control"
            placeholder="New doctor address..."
          />
          <button className="btn btn-primary">ADD</button>
        </form>
      </Modal>
    </>
  );
}

export default DoctorPage;

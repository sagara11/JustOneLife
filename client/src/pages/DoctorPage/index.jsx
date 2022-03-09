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
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import {BsSearch, BsPlusLg} from "react-icons/bs";
import AddDoctorForm from "../../features/doctor/AddDoctorForm";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {doctorState, getDoctorList} from "../../features/doctor/doctorSlice";
import {globalState} from "../../features/global/globalSlice";

function DoctorPage() {
  const dispatch = useDispatch();
  const {web3, accounts, currentUser} = useSelector(globalState);
  const {doctorList} = useSelector(doctorState);
  const [show, setShow] = useState(false);

  const handleCloseAddDoctorModal = () => setShow(false);
  const handleOpenAddDoctorModal = () => setShow(true);

  useEffect(() => {
    if(!show) {
      dispatch(getDoctorList({web3, accounts, currentUser}));
    }
  }, [accounts, currentUser, dispatch, show, web3]);

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
                  {doctorList.map((doctor, key) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{doctor.name}</td>
                      <td>{doctor.publicAddress}</td>
                      <td>{doctor.specialites}</td>
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
      <AddDoctorForm
        show={show}
        handleCloseAddDoctorModal={handleCloseAddDoctorModal}
      />
    </>
  );
}

export default DoctorPage;

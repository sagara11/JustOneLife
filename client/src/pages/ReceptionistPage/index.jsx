import React, {useEffect, useState} from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { BsPlusLg, BsSearch } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { doctorState, getReceptionist } from '../../features/doctor/doctorSlice';
import { globalState } from '../../features/global/globalSlice';
import AddModal from '../../features/receptionist/AddModal';

function ReceptionistPage() {
  const dispatch = useDispatch();
  const {web3, accounts, currentUser} = useSelector(globalState);
  const {receptionist} = useSelector(doctorState);
  const [show, setShow] = useState(false);

  const handleCloseReceptionistModal = () => setShow(false);
  const handleOpenReceptionistModal = () => setShow(true);

  useEffect(() => {
    dispatch(
      getReceptionist({ managerId: currentUser._id })
    );
  }, [accounts, currentUser, dispatch]);

  const renderReceptionistList = receptionist.data.map((user, key) => (
    <tr key={key}>
      <td>{key}</td>
      <td>{user.name}</td>
      <td>{user.publicAddress}</td>
      <td>
        <button className="btn btn-danger">Revoke role</button>
      </td>
    </tr>
  ));

  const handlePageClick = (event) => {
    console.log("paginate");
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="body__wrapper doctor-page__wrapper">
        <Container>
        <div className="doctor-page__body">
            <h1 className="table__title">Receptionist Management</h1>
            <div className="table__services">
              <Row>
                <Col md={3}>
                  <Button
                    className="table__services--add-button"
                    onClick={handleOpenReceptionistModal}
                  >
                    <BsPlusLg /> Add Receptionist
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
            <Row className="table__pagination">
              <Col md={5}></Col>
              <Col md={7}>
                <ReactPaginate
                  breakLabel="..."
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={1}
                  previousLabel="<"
                  nextLabel=">"
                  renderOnZeroPageCount={null}
                  className="pagination"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  activeClassName="active"
                  previousClassName="page-item"
                  nextClassName="page-item"
                  previousLinkClassName="page-link"
                  nextLinkClassName="page-link"
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                />
              </Col>
            </Row>
            <Table bordered hover className="table__body">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Public Address</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{renderReceptionistList}</tbody>
            </Table>
          </div>
        </Container>
      </div>
      <AddModal
        show={show}
        handleCloseAddDoctorModal={handleCloseReceptionistModal}
      />
    </>
  );
}

export default ReceptionistPage;

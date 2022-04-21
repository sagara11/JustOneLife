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
  Row,
  Table,
} from "react-bootstrap";
import {BsSearch, BsPlusLg} from "react-icons/bs";
import AddDoctorForm from "../../features/doctor/AddDoctorForm";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  doctorState,
  getDoctorList,
  setDoctorListOffsetPage,
} from "../../features/doctor/doctorSlice";
import {globalState} from "../../features/global/globalSlice";
import ReactPaginate from "react-paginate";

function DoctorPage() {
  const dispatch = useDispatch();
  const {web3, accounts, currentUser} = useSelector(globalState);
  const {doctorList} = useSelector(doctorState);
  const [show, setShow] = useState(false);

  const handleCloseAddDoctorModal = () => setShow(false);
  const handleOpenAddDoctorModal = () => setShow(true);
  const perPage = process.env.REACT_APP_DOCTORS_PER_PAGE;
  const currentOffset = doctorList.offset;

  useEffect(() => {
    if (!show) {
      if (currentOffset < 0) return;
      dispatch(
        getDoctorList({
          web3,
          accounts,
          currentUser,
          perPage,
          offset: currentOffset,
        })
      );
    }
  }, [accounts, currentUser, dispatch, currentOffset, perPage, show, web3]);

  const renderDoctorList = doctorList.data.map((doctor, key) => (
    <tr key={key}>
      <td>{key}</td>
      <td>{doctor.name}</td>
      <td>{doctor.publicAddress}</td>
      <td>{doctor.specialites}</td>
    </tr>
  ));

  const handlePageClick = (event) => {
    const newOffset = (event.selected * perPage) % doctorList.data.length;
    dispatch(setDoctorListOffsetPage(newOffset));
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="body__wrapper doctor-page__wrapper">
        <Container>
          <div className="doctor-page__body">
            <h1 className="table__title">Quản lý bác sĩ</h1>
            <div className="table__services">
              <Row>
                <Col md={3}>
                  <Button
                    className="table__services--add-button"
                    onClick={handleOpenAddDoctorModal}
                  >
                    <BsPlusLg /> Thêm mới bác sĩ
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
                  pageCount={doctorList.totalPage}
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
                  <th>Tên</th>
                  <th>Địa chỉ</th>
                  <th>Chuyên khoa</th>
                </tr>
              </thead>
              <tbody>{renderDoctorList}</tbody>
            </Table>
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

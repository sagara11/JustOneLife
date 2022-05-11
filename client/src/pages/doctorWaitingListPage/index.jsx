import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { globalState } from '../../features/global/globalSlice';
import { getWaitingRoomAPI } from '../../features/waitingRoom/waitingRoomAPI';
import AuthorizeContract from "../../contracts/Authorize.json";
import { getUser } from '../../features/authorization/authorizationAPI';
import "./styles.scss"
import { NavLink } from 'react-router-dom';

export default function WaitingListPage() {
  const [waitingList, setWaitingList] = useState([]);
  const { web3, currentUser } = useSelector(globalState);

  useEffect(() => {
    let managerAddress = "";
    let managerId = "";

    const getManager = async () => {
      try {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = AuthorizeContract.networks[networkId];
        const authorizeInstance = new web3.eth.Contract(
          AuthorizeContract.abi,
          deployedNetwork && deployedNetwork.address
        );

        managerAddress = await authorizeInstance.methods.doctorToManager(currentUser.publicAddress).call();
        if (managerAddress) {
          const { data } = await getUser({address: managerAddress});
          if (data) {
            managerId = data._id;
            getList();
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    const getList = async () => {
      const {data} = await getWaitingRoomAPI({
        manager: managerId,
        falculty: currentUser.falculty
      });

      console.log(data);
      if (data) {
        setWaitingList(data);
      }
    }

    getManager();
  }, [currentUser])

  const formatAddress = (address) => {
    return address.substring(0, 4) + "..." + address.substring(address.length - 4, address.length)
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className="medical-record__wrapper waiting-room__wrapper">
        <div className="waiting-room__container">
          <h2>Danh sách chờ</h2>
          {
            waitingList.map((waitingItem, index) =>
              <NavLink key={index} to={{pathname: `/medical-records`, state: {preloadData: waitingItem}}}>
                <div className="waiting-room__item">
                  <div className="item user-info">
                    <div className="title">Thông tin bệnh nhân</div>
                    <span className='item-name'>{waitingItem.user[0].name}</span>
                    <span className='item-public-address'>{formatAddress(waitingItem.user[0].publicAddress)}</span>
                    <span className="item-phone">{waitingItem.user[0].phone}</span>
                  </div>
                  <div className="item medical-falculty">
                    <div className="title">Khoa khám bệnh</div>
                    {waitingItem?.falculty[0].name || "No falculty selected"}
                  </div>
                  <div className="item admitted-date">
                    <div className="title">Ngày khám</div>
                    {waitingItem.admittedToHospital}
                  </div>
                </div>
              </NavLink>
            )
          }
        </div>
      </div>
    </>
  );
}

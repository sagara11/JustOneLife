import React from "react";
import "./styles.scss";
import metaMaskLogo from "../../assets/images/metamask-logo.png";
import {globalState} from "../global/globalSlice";
import {useDispatch, useSelector} from "react-redux";
import {authenticationState, signin, signup} from "./authenticationSlice";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";

function LoginForm() {
  const {web3} = useSelector(globalState);
  const {newUser} = useSelector(authenticationState);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  useEffect(() => {
    const signMessage = async () => {
      const signature = await web3.eth.personal.sign(
        web3.utils.utf8ToHex(
          `I am signing my one-time nonce: ${newUser.nonce}`
        ),
        newUser.publicAddress
      );

      dispatch(
        signin({publicAddress: newUser.publicAddress, signature: signature})
      );
    };
    if (newUser !== null) signMessage();
  }, [dispatch, newUser, web3.eth.personal, web3.utils]);

  const handleClick = async () => {
    let publicAddress;
    await web3.eth.getCoinbase((err, coinbase) => {
      publicAddress = coinbase.toLowerCase();
    });
    dispatch(signup({publicAddress: publicAddress}));
  };

  return (
    <div className="login-form">
      <h1 className="login-form__title">Medical Records System</h1>
      <div className="login-form__content">
        <h3>Connect your wallet</h3>
        <div className="metamask__wrapper" onClick={handleClick}>
          <img src={metaMaskLogo} alt="meta-mask-logo" />
        </div>
      </div>
    </div>
  );
}
export default LoginForm;

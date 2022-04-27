import React from "react";
import "./styles.scss";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {useDispatch, useSelector} from "react-redux";
import {updateAccount} from "./authenticationSlice";
import {globalState} from "../global/globalSlice";
const {sha256} = require("js-sha256").sha256;

function AdditionalRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();

  const {currentUser} = useSelector(globalState);

  const hasingPassword = async (payload) => {
    const hash_1 = await sha256(payload.password);
    const hash_2 = await sha256(hash_1);

    return {hash_1, hash_2};
  };

  const onSubmit = async (data) => {
    const password = data.password;
    const {hash_2} = await hasingPassword({
      password: password,
    });

    if (currentUser) {
      const keyPatient = await sha256(
        password.concat(currentUser.email, currentUser.publicAddress)
      );
      data = {...data, hash_2: hash_2, keyPatient: keyPatient};
      dispatch(
        updateAccount({publicAddress: currentUser.publicAddress, data: data})
      );
    }
  };

  // eslint-disable-next-line no-useless-escape
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="additional-register-form">
      <div className="form-element">
        <label htmlFor="form_username">Tên đăng nhập</label>
        <input
          {...register("name", {required: "This is required."})}
          className="form-control"
          id="form_username"
        />
        <ErrorMessage
          errors={errors}
          name="name"
          render={({message}) => <p>{message}</p>}
        />
      </div>
      <div className="form-element">
        <label htmlFor="form_email">Email</label>
        <input
          className="form-control"
          id="form_email"
          {...register("email", {
            required: "This is required.",
            pattern: {
              value: regexEmail,
              message: "This is wrong type of email.",
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({message}) => <p>{message}</p>}
        />
      </div>
      <div className="form-element">
        <label htmlFor="form_phone">Điện thoại</label>
        <input
          className="form-control"
          id="form_phone"
          {...register("phone", {
            maxLength: {
              value: 12,
              message: "This input require max 12 numbers",
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name="phone"
          render={({message}) => <p>{message}</p>}
        />
      </div>
      <div className="form-element">
        <label htmlFor="form_phone">Mật khẩu</label>
        <input
          className="form-control"
          id="form_password"
          type="password"
          {...register("password")}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({message}) => <p>{message}</p>}
        />
      </div>
      <button className="btn btn-primary" id="form_submit">
        Tiếp tục
      </button>
    </form>
  );
}
export default AdditionalRegisterForm;

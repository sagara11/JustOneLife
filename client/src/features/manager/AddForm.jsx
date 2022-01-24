import React from "react";
import "./styles.scss";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch, useSelector } from 'react-redux';
import { setRoleManager } from '../authorization/authorizationSlice';
import { globalState } from '../global/globalSlice';

const AddManagerForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();
  const {web3, accounts, currentUser} = useSelector(globalState);

  const onSubmit = (data) => {
    let { address } = data;
    dispatch(setRoleManager({web3, accounts, currentUser, address}));
    setValue("address", "");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="add-manager-form" id="add-manager-form">
        <input
          {...register("address", {required: "This is required."})}
          className="form-control"
          placeholder="New manager address..."
        />
        <ErrorMessage
            errors={errors}
            name="address"
            render={({message}) => <p>{message}</p>}
          />
        <button className="btn btn-primary">ADD</button>
      </form>
    </>
  );
}
export default AddManagerForm;

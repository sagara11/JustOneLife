import React from "react";
import "./styles.scss";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";

function AddManagerForm() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className="add-manager-form" onSubmit={handleSubmit(onSubmit)} id="add-manager-form">
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
      <button type="button" className="btn btn-primary">ADD</button>
    </form>
  );
}
export default AddManagerForm;

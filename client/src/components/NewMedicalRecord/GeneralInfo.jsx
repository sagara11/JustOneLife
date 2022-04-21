import React, { useEffect } from "react";

function GeneralInfo(props) {
  const {register, setValue, preloadData} = props;

  useEffect(() => {
    if (preloadData) {
      setValue("generalInfo.publicAddress", preloadData.user[0].publicAddress);
      setValue("generalInfo.phone", preloadData.user[0].phone);
      setValue("generalInfo.name", preloadData.user[0].name);
    }
  }, [preloadData]);

  return (
    <div className="row">
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Địa chỉ công khai</label>
          <input
            readOnly
            {...register("generalInfo.publicAddress", {
              required: "This is required.",
            })}
            className="form-control"
          />
        </div>
        <div className="field-input">
          <label htmlFor="">Điện thoại</label>
          <input readOnly {...register("generalInfo.phone")} className="form-control" />
        </div>
      </div>
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Tên</label>
          <input
            readOnly
            {...register("generalInfo.name", {required: "This is required."})}
            className="form-control"
          />
        </div>
        <div className="field-input">
          <label htmlFor="">Ngày sinh</label>
          <input
            type="date"
            {...register("generalInfo.dateOfBirth")}
            className="form-control"
          />
        </div>
      </div>
      <div className="col-4">
        <div className="field-input">
          <label htmlFor="">Giới tính</label>
          <select className="form-control" {...register("generalInfo.gender")}>
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
          </select>
        </div>
        <div className="field-input">
          <label htmlFor="">Địa chỉ thường trú</label>
          <input
            {...register("generalInfo.address")}
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
}

export default GeneralInfo;

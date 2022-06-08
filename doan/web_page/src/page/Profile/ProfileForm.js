import React, { useEffect, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { DatePicker, Radio } from "antd";
import Toast from "../../components/Toast";
import moment from "moment";
import { useParams } from "react-router-dom";

const EditUser = ({ data, loading }) => {
  const { id } = useParams();
  const [file, setFile] = useState("");
  const [name, setName] = useState("Lê Văn Bình");
  const [email, setEmail] = useState("thanhbinh191099@gmail.com");
  const [phone, setPhone] = useState("0983296832");
  const [birth, setBirth] = useState("19/10/1999");
  const [sex, setSex] = useState("Male");
  const [address, setAddress] = useState("Thái Bình");
  const [name_surname, setName_surname] = useState("Lê Văn Bình");
  const dateFormat = "DD/MM/YYYY";
  const [isEditing, setIsEditing] = useState(false);

  //   useEffect(() => {
  //     if (data) {
  //       setName(data?.name);
  //       setEmail(data.email);
  //       setPhone(data?.phone);
  //       setRole(data.role);
  //       setBirth(
  //         moment(data?.birth).zone("+07:00").format(dateFormat).toString()
  //       );
  //       setSex(data?.sex);
  //       setAddress(data?.address);
  //       setName_surname(data?.name_surname);
  //     }
  //   }, []);

  const saveData = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    // try {
    //   if (file !== "") {
    //     const formData = new FormData();
    //     formData.append("image", file);
    //     await Users.uploadImage(data._id, formData);
    //   }
    //   await Users.updateUser(data._id, {
    //     name,
    //     name_surname,
    //     address,
    //     role,
    //     sex,
    //     phone,
    //     birth,
    //     email,
    //   });
    //   Toast("success", "Update success");
    // } catch (error) {
    //   Toast("error", error.message);
    // }
  };
  const hanldeEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const onChangeDate = (date) => {
    setBirth(date);
  };
  const onChangeGender = (e) => {
    setSex(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeNameSurName = (e) => {
    setName_surname(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="new">
      <div className="newContainer">
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : //   : data.image
                    //   ? data?.image?.imageUrl
                    "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            <div className="formInput upload-btn">
              <label htmlFor="file">
                <AiFillCamera className="upload__icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="right">
            <form action="">
              <div className="formInput">
                <label>User name</label>
                <input
                  type="text"
                  placeholder="User Name"
                  value={name}
                  onChange={onChangeName}
                />
              </div>
              <div className="formInput">
                <label>Name and surname</label>
                <input
                  type="text"
                  placeholder="User"
                  value={name_surname || ""}
                  onChange={onChangeNameSurName}
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={onChangeEmail}
                />
              </div>
              <div className="formInput date-picker">
                <label style={{ paddingBottom: 5 }}>Birth ({dateFormat})</label>
                <DatePicker
                  onChange={onChangeDate}
                  format={dateFormat}
                  style={{
                    width: 200,
                    padding: 5,
                    height: 30,
                  }}
                  value={moment(birth, dateFormat)}
                />
              </div>
              <div className="formInput">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={onChangeAddress}
                />
              </div>
              <div className="formInput">
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={onChangePhone}
                />
              </div>
              <div className="formInput">
                <label>Gender</label>
                <Radio.Group
                  onChange={onChangeGender}
                  value={sex || "Male"}
                  style={{ display: "flex" }}
                >
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                </Radio.Group>
              </div>
              <div className="formInput"></div>
              {isEditing ? (
                <button className="send__btn" onClick={(e) => saveData(e)}>
                  Save
                </button>
              ) : (
                <button className="send__btn" onClick={(e) => hanldeEdit(e)}>
                  Edit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

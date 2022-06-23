import React, { useEffect, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { DatePicker, Radio } from "antd";
import Toast from "../../components/Toast";
import moment from "moment";
import User from "../../services/userServices";
import Loading from "../../components/Loading";

const EditUser = ({ data, loading, setImageUrl }) => {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [name_surname, setName_surname] = useState("");
  const dateFormat = "DD/MM/YYYY";
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (data) {
      setName(data?.name);
      setEmail(data?.email);
      setPhone(data?.phone);
      setBirth(
        moment(data?.birth).zone("+07:00").format(dateFormat).toString()
      );
      setSex(data?.sex);
      setAddress(data?.address);
      setName_surname(data?.name_surname);
    }
  }, [data]);

  const saveData = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    try {
      if (file !== "") {
        const formData = new FormData();
        formData.append("image", file);
        const newImage = await User.uploadImage(data._id, formData);
        setImageUrl(newImage.result.imageUrl);
      }
      let newBirth = birth;
      if (typeof birth === "string") {
        newBirth = moment(birth).zone("+07:00").format(dateFormat).toString();
      }
      await User.updateUser(data._id, {
        name,
        name_surname,
        address,
        sex,
        phone,
        newBirth,
        email,
      });
      Toast("success", "Update success");
    } catch (error) {
      Toast("error", error.message);
    }
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
    return <Loading />;
  } else
    return (
      <div className="new">
        <div className="newContainer">
          <div className="bottom">
            <div className="left">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : data?.image
                    ? data?.image?.imageUrl
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  style={{ display: "none" }}
                  disabled={!isEditing}
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
                    disabled={!isEditing}
                  />
                </div>
                <div className="formInput">
                  <label>Name and surname</label>
                  <input
                    type="text"
                    placeholder="User"
                    value={name_surname || ""}
                    onChange={onChangeNameSurName}
                    disabled={!isEditing}
                  />
                </div>
                <div className="formInput">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={onChangeEmail}
                    disabled
                  />
                </div>
                <div className="formInput date-picker">
                  <label style={{ paddingBottom: 5 }}>
                    Birth ({dateFormat})
                  </label>
                  <DatePicker
                    onChange={onChangeDate}
                    format={dateFormat}
                    style={{
                      width: 200,
                      padding: 5,
                      height: 30,
                    }}
                    value={moment(birth, dateFormat)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="formInput">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={onChangeAddress}
                    disabled={!isEditing}
                  />
                </div>
                <div className="formInput">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={onChangePhone}
                    disabled={!isEditing}
                  />
                </div>
                <div className="formInput">
                  <label>Gender</label>
                  <Radio.Group
                    onChange={onChangeGender}
                    value={sex || "Male"}
                    style={{ display: "flex" }}
                    disabled={!isEditing}
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

import React, { useEffect, useState } from "react";
import "../../assets/css/form.css";
import { AiFillCamera } from "react-icons/ai";
import { DatePicker, Radio } from "antd";
import Toast from "../../components/Toast";
import Users from "../../services/userServices";
import moment from "moment";
import { useParams } from "react-router-dom";
import Modal from "../User/Modal/Modal";
import ChangePasswordForm from "./ChangePasswordForm";
import Loading from "../../components/Loading";

const Profile = () => {
  const { id } = useParams();
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [birth, setBirth] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [name_surname, setName_surname] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const dateFormat = "DD/MM/YYYY";

  const handleOpen = (e) => {
    e.preventDefault();
    setDisabled(true);
  };
  const handleClose = () => setDisabled(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { result } = await Users.getUserById(id);
      setName(result?.name);
      setEmail(result.email);
      setPhone(result?.phone);
      setRole(result?.role);
      setBirth(moment(result?.birth).zone("+07:00").format(dateFormat));
      setSex(result?.sex);
      setImage(result?.image);
      setAddress(result?.address);
      setName_surname(result?.name_surname);
      setLoading(false);
    };
    fetchData();
  }, []);

  const saveData = async (e) => {
    e.preventDefault();
    try {
      if (file !== "") {
        const formData = new FormData();
        formData.append("image", file);
        await Users.uploadImage(id, formData);
      }
      let newBirth = birth;
      if (typeof birth === "string") {
        newBirth = moment(birth).zone("+07:00").format(dateFormat).toString();
      }
      await Users.updateUser(id, {
        name,
        name_surname,
        address,
        role,
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

  const onChangeDate = (date) => {
    setBirth(date);
  };
  const onChangeGender = (e) => {
    setSex(e.target.value);
  };
  const onChangeRole = (e) => {
    setRole(e.target.value);
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
  }
  return (
    <div className="new" style={{ height: "500px" }}>
      <div className="newContainer">
        <div className="top">
          <h1>Profile</h1>
        </div>

        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : image
                  ? image?.imageUrl
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
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="right">
            <form>
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
                    width: 280,
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
              <div className="formInput">
                <label>Role</label>
                <Radio.Group
                  onChange={onChangeRole}
                  value={role || 1}
                  style={{ display: "flex" }}
                >
                  <Radio value={2}>Admin</Radio>
                  <Radio value={1}>User</Radio>
                </Radio.Group>
              </div>

              <button className="send__btn" onClick={(e) => saveData(e)}>
                Send
              </button>
              <button className="send__btn" onClick={handleOpen}>
                Change Password
              </button>
            </form>
          </div>
          <Modal
            disabled={disabled}
            handleClose={handleClose}
            loading={loading}
            width="400px"
            title="Change Password"
          >
            <ChangePasswordForm id={id} />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useEffect } from "react";
import { Input, Checkbox } from "antd";
import { AuthContext } from "../../context/AuthContext";
import Users from "../../services/userServices";

const { TextArea } = Input;

const PaymentForm = ({ setFormValue }) => {
  const { auth } = React.useContext(AuthContext);
  const [disabled, setDisabled] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [note, setNote] = React.useState("");
  const [data, setData] = React.useState({});
  const onChange = (e) => {
    setDisabled(!disabled);
  };
  useEffect(() => {
    setFormValue({ name, phone, note, address, email });
  }, [name, email, address, phone, note]);
  const getDataUser = async () => {
    const data = await Users.getUserById(auth.data._id);
    setData(data?.result);
    if (disabled) {
      setName(data?.result?.name_surname);
      setEmail(data?.result?.email);
      setPhone(data?.result?.phone);
      setAddress(data?.result?.address);
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
    }
  };
  useEffect(() => {
    getDataUser();
  }, [disabled]);
  return (
    <form className="form-container">
      <div className="form-group-input">
        <div className="form-input">
          <label>
            Họ và tên<span>*</span>
          </label>
          <Input
            placeholder="Họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label>
            Số điện thoại<span>*</span>
          </label>
          <Input
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="form-input long">
        <label>
          Email<span>*</span>
        </label>
        <Input
          placeholder="Nhập email để nhận được mã đơn hàng"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-input long">
        <label>
          Địa chỉ<span>*</span>
        </label>
        <Input
          placeholder="Địa chỉ"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      {auth.token && (
        <Checkbox onChange={onChange} style={{ marginBottom: 20 }}>
          Sử dụng thông tin cá nhân
        </Checkbox>
      )}

      <div className="form-input long">
        <label>Ghi chú</label>
        <TextArea
          rows={5}
          value={note}
          placeholder="Ghi chú cho bên giao hàng ...."
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
    </form>
  );
};

export default PaymentForm;

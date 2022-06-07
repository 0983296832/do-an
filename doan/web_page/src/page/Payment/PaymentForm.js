import React from "react";
import { Input, Checkbox } from "antd";
const { TextArea } = Input;

const PaymentForm = () => {
  const [disabled, setDisabled] = React.useState(false);
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    setDisabled(!disabled);
  };
  return (
    <form className="form-container">
      <div className="form-group-input">
        <div className="form-input">
          <label>
            Họ và tên<span>*</span>
          </label>
          <Input placeholder="Họ và tên" disabled={disabled} />
        </div>
        <div className="form-input">
          <label>
            Số điện thoại<span>*</span>
          </label>
          <Input placeholder="Số điện thoại" disabled={disabled} />
        </div>
      </div>

      <div className="form-input long">
        <label>
          Email<span>*</span>
        </label>
        <Input
          placeholder="Nhập email để nhận được mã đơn hàng"
          disabled={disabled}
        />
      </div>
      <div className="form-input long">
        <label>
          Địa chỉ<span>*</span>
        </label>
        <Input placeholder="Địa chỉ" disabled={disabled} />
      </div>
      <Checkbox onChange={onChange} style={{ marginBottom: 20 }}>
        Sử dụng thông tin cá nhân
      </Checkbox>
      <div className="form-input long">
        <label>Ghi chú</label>
        <TextArea rows={5} placeholder="Ghi chú cho bên giao hàng ...." />
      </div>
    </form>
  );
};

export default PaymentForm;

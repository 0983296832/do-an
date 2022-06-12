import React from "react";
import publicIp from "public-ip";
import queryString from "query-string";
import dateFormat from "dateformat";
import sha256 from "sha256";

const HASH_SECRET = process.env.REACT_APP_HASH_SECRET;
const TMNCODE = process.env.REACT_APP_TMNCODE;
const VNP_URL = process.env.REACT_APP_VNP_URL;
const VNP_RETURN = process.env.REACT_APP_VNP_RETURN;

function sortObject(o) {
  const sorted = {};
  const onlyKey = [];
  for (const key in o) {
    if (o.hasOwnProperty(key)) {
      onlyKey.push(key);
    }
  }
  onlyKey.sort();
  Array.from({ length: onlyKey.length }, (elm, idx) => {
    sorted[onlyKey[idx]] = o[onlyKey[idx]];
    return null;
  });
  return sorted;
}

const VnPay = ({ monney, storeOrder, disabled }) => {
  const onSubmit = async () => {
    storeOrder();
    const tmnCode = TMNCODE;
    const secretKey = HASH_SECRET;
    const returnUrl = VNP_RETURN;

    const date = new Date();

    const createDate = dateFormat(date, "yyyymmddHHmmss");
    const orderId = dateFormat(date, "HHmmss");
    const amount = monney;
    const bankCode = "NCB";

    const orderInfo = "Thanh toán hóa đơn giày";
    const orderType = "250000";
    const locale = "vn";
    const currCode = "VND";
    const set_vnp_Params = {};

    set_vnp_Params["vnp_Version"] = "2";
    set_vnp_Params["vnp_Command"] = "pay";
    set_vnp_Params["vnp_TmnCode"] = tmnCode;
    set_vnp_Params["vnp_Locale"] = locale;
    set_vnp_Params["vnp_CurrCode"] = currCode;
    set_vnp_Params["vnp_TxnRef"] = orderId;
    set_vnp_Params["vnp_OrderInfo"] = orderInfo;
    set_vnp_Params["vnp_OrderType"] = orderType;
    set_vnp_Params["vnp_Amount"] = amount * 100;
    set_vnp_Params["vnp_ReturnUrl"] = returnUrl;
    set_vnp_Params["vnp_IpAddr"] = await publicIp.v4();
    set_vnp_Params["vnp_CreateDate"] = createDate;
    set_vnp_Params["vnp_BankCode"] = bankCode;

    const vnp_Params = sortObject(set_vnp_Params);

    const signData =
      secretKey + queryString.stringify(vnp_Params, { encode: false });

    // var sha256 = require('sha256');

    const secureHash = sha256(signData);

    vnp_Params["vnp_SecureHashType"] = "SHA256";
    vnp_Params["vnp_SecureHash"] = secureHash;
    const vnpUrl =
      VNP_URL + "?" + queryString.stringify(vnp_Params, { encode: true });
    window.location.href = vnpUrl;
  };
  const sumQuery = queryString.parse(window.location.search);
  if (JSON.stringify(sumQuery) !== JSON.stringify({})) {
    console.log("get result params", sumQuery);
    const returnSecretHash = sumQuery["vnp_SecureHash"].toString();
    delete sumQuery["vnp_SecureHash"];
    delete sumQuery["vnp_SecureHashType"];
    const returnSignData =
      HASH_SECRET + queryString.stringify(sumQuery, { encode: false });
    const enc256 = sha256(returnSignData);
    if (enc256 === returnSecretHash) {
      console.log("Thanh toán thành công");
    } else console.log("fail checksum");
  }
  return (
    <button className="payment-btn" onClick={onSubmit} disabled={disabled}>
      ĐẶT HÀNG
    </button>
  );
};

export default VnPay;

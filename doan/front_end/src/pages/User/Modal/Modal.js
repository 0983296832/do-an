import EditUser from "../EditUser";

import { Modal } from "antd";

const BasicModal = ({ disabled, handleClose, data }) => {
  return (
    <>
      <Modal
        title="Basic Modal"
        visible={disabled}
        onCancel={handleClose}
        style={{ minWidth: "1000px" }}
        footer={null}
      >
        <EditUser data={data} />
      </Modal>
    </>
  );
};

export default BasicModal;

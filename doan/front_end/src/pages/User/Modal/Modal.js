import { Modal } from "antd";

const BasicModal = ({ disabled, handleClose, children, width, title }) => {
  return (
    <>
      <Modal
        title={title}
        visible={disabled}
        onCancel={handleClose}
        style={{ minWidth: `${width ? width : "1000px"}` }}
        footer={null}
      >
        {children}
      </Modal>
    </>
  );
};

export default BasicModal;

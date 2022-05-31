// import * as React from "react";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
import AddUser from "../AddUser";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "80%",
//   bgcolor: "background.paper",
//   //   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// export default function BasicModal({ disabled, handleClose, data }) {
//   return (
//     <div>
//       <Modal
//         open={disabled}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <AddUser data={data} />
//         </Box>
//       </Modal>
//     </div>
//   );
// }

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
        <AddUser data={data} />
      </Modal>
    </>
  );
};

export default BasicModal;

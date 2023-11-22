import * as React from "react";
import { Box, Modal } from "@mui/material";

interface IModalComponent {
  handleClose: () => void;
  open: boolean;
  children: React.ReactNode;
  style: any;
}

export default function ModalComponent({
  handleClose,
  open,
  children,
  style,
}: IModalComponent) {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </>
  );
}

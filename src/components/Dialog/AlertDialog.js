import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRecoilState } from "recoil";
import { alertDialogInit, alertDialogState } from "./../recoil";
import { GRAY6 } from './../../style/index';

export const AlertDialog = () => {
  const [alertDialogInfo, setAlertDialogInfo] = useRecoilState(alertDialogState);

  const handleClose = () => {
    setAlertDialogInfo({ ...alertDialogInfo, visible:false});
  };

  return (
    <div>
      <Dialog
        open={alertDialogInfo.visible}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> {alertDialogInfo.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{alertDialogInfo.text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: GRAY6 }}>
            취소
          </Button>
          <Button onClick={alertDialogInfo.handleConfirm} style={{ color: "#d32f2f" }}>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

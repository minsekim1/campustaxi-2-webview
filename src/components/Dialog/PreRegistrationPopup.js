import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Link } from "react-router-dom";
import { ORANGE } from "../../style";

export const PreRegistrationPopup = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Dialog
          open={true}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">현재 사전 신청 접수 중입니다!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              1월 말에 정식 배포예정이며 <br />
              사전 신청 유저 대상으로 앱 로그인 시 "얼리어답터" 뱃지를 드립니다! <br />
              많은 신청 부탁드립니다!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => window.open("http://naver.me/5cTafqN7", "_blank")} style={{ color: ORANGE }}>
              사전신청 페이지로
            </Button>
          </DialogActions>
        </Dialog>
        <div>
          <div></div>
        </div>
      </div>
    </>
  );
};

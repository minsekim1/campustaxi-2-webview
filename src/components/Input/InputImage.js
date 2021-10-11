import { GRAY2, GRAY4, GRAY6, GRAY7, GRAY8, GRAY9, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../style";
import { forwardRef, useState, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fal from "@fortawesome/pro-light-svg-icons";
import * as fas from "@fortawesome/free-solid-svg-icons";
import * as far from "@fortawesome/pro-regular-svg-icons";
import { CreateBottomModalState, CropState, SearchPositionState } from "../recoil";
import { useRecoilState } from "recoil";
import { Icon } from "../common/Icon";
import Cropper from "react-easy-crop";

export const InputImage = ({ onChange, placeholder, inputMode, type, readOnly, disabled, defaultValue }) => {
  const [crop, setCrop] = useRecoilState(CropState);
  const [filepath, setFilepath] = useState("")
  
  const onChangeInupt = (e) => {
    try {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        setCrop({ visible: true, file: file, previewURL: reader.result });
      };
      reader.readAsDataURL(file);
    } catch (e) {
      setCrop({ ...crop, visible: false });
    }
  };
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        {/* 바탕사진 및 바탕 임시 회색 */}
        <div
          style={{
            width: SCREEN_WIDTH,
            backgroundImage:
              crop.previewURL != ""
                ? `linear-gradient(to bottom,rgba(0,0,0,0),rgba(255,255,255, 1)),url(${crop.previewURL})`
                : `linear-gradient(to bottom,rgba(200,200,200,1),rgba(200,200,200, 1),rgba(200,200,200, 1),rgba(255,255,255, 0.2))`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: (SCREEN_WIDTH * 200) / 415,
          }}
        />
        {/* 바탕사진 선택버튼 */}
        <div style={{ position: "absolute" }}>
          {crop.previewURL ? (
            <div style={{ display: "flex" }}>
              <div style={inputFileCSSNone} onClick={() => setCrop({ ...crop, visible: true })}>
                <Icon name={"faEdit"} size={"lg"} color={"rgba(73,80,87,0.5)"} />
              </div>
              <div
                style={{ ...inputFileCSSNone, marginLeft: 5 }}
                onClick={() => setCrop({ ...crop, file: "", previewURL: "" })}
              >
                <Icon name={"faTrash"} size={"lg"} color={"rgba(73,80,87,0.5)"} />
              </div>
            </div>
          ) : (
            <label style={inputFileCSS} htmlFor="input-file">
              배경 사진을 선택해주세요!
            </label>
          )}
        </div>
        <input
          value={filepath}
          type="file"
          id="input-file"
          style={{ display: "none" }}
          accept="image/*"
          onChange={onChangeInupt}
        />
      </div>
    </div>
  );
};

const inputFileCSSNone = {
  padding: "6px 12px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  backgroundColor: "rgba(255,255,255,0.8)",
  borderRadius: "20px",
  color: "white",
  cursor: "pointer",
};
const inputFileCSS = {
  fontSize:13,
  padding: "6px 25px",
  backgroundColor: "#FF6600",
  borderRadius: "4px",
  color: "white",
  cursor: "pointer",
};

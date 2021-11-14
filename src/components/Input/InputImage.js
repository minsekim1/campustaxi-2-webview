import { useState, useEffect } from "react";
import { CropInit, CropState, FilePathInit, FilePathState } from "../recoil";
import { useRecoilState } from "recoil";
import { Icon } from "../common/Icon";
import { loadXHR } from "./CommandInput/CImage";
import useWindowDimensions from "../../hook/useWindowDimensions";

export const InputImage = ({ placeholder }) => {
  const [crop, setCrop] = useRecoilState(CropState);
  const [filepath, setFilepath] = useRecoilState(FilePathState);
  const [isCrop, setIsCrop] = useState(false);
const { height, width } = useWindowDimensions();
  //#region 앱껏다 키고 캐쉬 초기화 시 이미지 아닌게 들어깄으면 삭제
  useEffect(() => {
    loadXHR(filepath.file)
      .then((f) => {
        try {
          if (typeof f.type === "string") console.debug(f.type.includes("image"), f);
        } catch (e) {}
      })
      .catch(() => setFilepath(FilePathInit));
  }, []);
  //#endregion

  //#region 편집 후 가져오기
  useEffect(() => {
    if (!crop.visible && isCrop) {
      setFilepath({ file: crop.file, previewURL: crop.previewURL, type: crop.type });
      setIsCrop(false);
      setCrop(CropInit);
    }
  }, [crop.visible]);
  //#endregion
  const onChangeInput = (e) => {
    try {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        setIsCrop(true);
        setCrop({ visible: true, file: file, previewURL: reader.result, type: file.type });
      };
      reader.readAsDataURL(file);
    } catch (e) {
      setIsCrop(false);
      setCrop(CropInit);
    }
  };
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        {/* 바탕사진 및 바탕 임시 회색 */}
        <div
          style={{
            width: width,
            backgroundImage:
              filepath.previewURL != ""
                ? `linear-gradient(to bottom,rgba(0,0,0,0),rgba(255,255,255, 1)),url(${filepath.previewURL})`
                : `linear-gradient(to bottom,rgba(200,200,200,1),rgba(200,200,200, 1),rgba(200,200,200, 1),rgba(255,255,255, 0.2))`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: (width * 200) / 200,
          }}
        />
        {/* 바탕사진 선택버튼 */}
        <div style={{ position: "relative", top: -225 }}>
          {filepath.previewURL != "" ? (
            <div style={{ display: "flex" }}>
              <div
                style={inputFileCSSNone}
                onClick={() => {
                  setCrop({ visible: true, file: filepath.file, previewURL: filepath.previewURL });
                  setIsCrop(true);
                }}
              >
                <Icon name={"faEdit"} size={"lg"} color={"rgba(73,80,87,0.5)"} />
              </div>
              <div style={{ ...inputFileCSSNone, marginLeft: 5 }} onClick={() => setFilepath(FilePathInit)}>
                <Icon name={"faTrash"} size={"lg"} color={"rgba(73,80,87,0.5)"} />
              </div>
            </div>
          ) : (
            <label style={inputFileCSS} htmlFor="input-file">
              {placeholder}
            </label>
          )}
        </div>
        <input
          value={""}
          type="file"
          id="input-file"
          style={{ display: "none" }}
          accept="image/*"
          onChange={onChangeInput}
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
  fontSize: 13,
  padding: "6px 25px",
  backgroundColor: "#FF6600",
  borderRadius: "4px",
  color: "white",
  cursor: "pointer",
};

import { useEffect, useState } from "react";
import { SCREEN_WIDTH } from "./../../../style/index";
import { CropInit, CropState } from "./../../recoil";
import { useRecoilState } from "recoil";
import { Icon } from "./../../common/Icon";

export const CImage = ({ index, data }) => {
  const [source, setSource] = useState(data.content);
  return (
    <div >
      <InputImageInner isBackground={false} isAbsolute={false} index={index} />
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={data.content} width={"100%"} style={{ borderRadius: 20 }}></img>
      </div>
    </div>
  );
};

export const InputImageInner = ({ index }) => {
  const [crop, setCrop] = useRecoilState(CropState);
  const [filepath, setFilepath] = useState({ file: "", previewURL: "" });
  const [isCrop, setIsCrop] = useState(false);

  //#region 편집 후 가져오기
  useEffect(() => {
    if (!crop.visible && isCrop) {
      setFilepath({ file: crop.file, previewURL: crop.previewURL });
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
        setCrop({ visible: true, file: file, previewURL: reader.result });
      };
      reader.readAsDataURL(file);
    } catch (e) {
      setIsCrop(false);
      setCrop(CropInit);
    }
  };

  const style =
    filepath.previewURL != ""
      ? {
          backgroundImage: `url(${filepath.previewURL})`,
          backgroundColor: "transparent",
        }
      : {
          backgroundColor: "rgba(0,0,0,0.1)", //transparent
        };
  return (
    <div>
      <div>
        {/* 바탕사진 및 바탕 임시 회색 */}
        <div
          style={{
            ...style,
            height: ((SCREEN_WIDTH - 64) * 200) / 415,
            width: SCREEN_WIDTH - 64,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* 바탕사진 선택버튼 */}
        <div
          style={{
            position: "relative",
            height:0,
            left: filepath.previewURL == "" ? (SCREEN_WIDTH - 175 - 64) / 2 : (SCREEN_WIDTH - 100 - 64) / 2,
            top: -(((SCREEN_WIDTH - 64) * 200) / 415 / 2 + 15),
          }}
        >
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
              <div
                style={{ ...inputFileCSSNone, marginLeft: 5 }}
                onClick={() => setFilepath({ file: "", previewURL: "" })}
              >
                <Icon name={"faTrash"} size={"lg"} color={"rgba(73,80,87,0.5)"} />
              </div>
            </div>
          ) : (
            <label style={inputFileCSS} htmlFor={"input-file" + index}>
              사진을 선택해주세요.
            </label>
          )}
        </div>
        <input
          type="file"
          id={"input-file" + index}
          value={""}
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

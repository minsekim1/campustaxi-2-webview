import { useEffect, useState } from "react";
import { commandInputListState, CropInit, CropState } from "./../../recoil";
import { useRecoilState } from "recoil";
import { Icon } from "./../../common/Icon";
import useWindowDimensions from "../../../hook/useWindowDimensions";

export const loadXHR = (url)=>{
  return new Promise((resolve, reject) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.onerror = () => {
        // reject(`Network error: ${event}`);
        reject();
      };
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          // reject(`XHR load error: ${xhr.statusText}`);
          reject("");
        }
      };
      xhr.send();
    } catch (err) {
      // reject(err.message);
      reject("");
    }
  });
}

export const CImage = ({ index, data }) => {
  const [commandInputList, setCommandInputList] = useRecoilState(commandInputListState);
  const [crop, setCrop] = useRecoilState(CropState);
  // const [filepath, setFilepath] = useState({ file: "", previewURL: "" });
  const [isCrop, setIsCrop] = useState(false);
  const filepath = commandInputList[index].content;
  const { height, width } = useWindowDimensions();
  //#region 앱껏다 키고 캐쉬 초기화 시 이미지 아닌게 들어깄으면 삭제
  useEffect(() => {
    loadXHR(filepath.file)
      .then((f) => {
        try {
          // if (typeof f.type === "string") console.debug(f.type.includes("image"), f);
        } catch (e) {}
      })
      .catch(() => {
        setCommandInputList([
          ...commandInputList.slice(0, index),
          { ...commandInputList[index], content: { file: "", previewURL: "" } },
          ...commandInputList.slice(index + 1, 999),
        ]);
      });
  }, []);
  //#endregion
  //#region 편집 후 가져오기
  useEffect(() => {
    if (!crop.visible && isCrop) {
      setCommandInputList([
        ...commandInputList.slice(0, index),
        { ...commandInputList[index], content: { file: crop.file, previewURL: crop.previewURL, type: crop.type } },
        ...commandInputList.slice(index + 1, 999),
      ]);
      // setFilepath({ file: crop.file, previewURL: crop.previewURL });
      setIsCrop(false);
      setCrop(CropInit);
    }
  }, [crop.visible]);
  //#endregion
  const onDeletePhoto = () => {
    setCommandInputList([
      ...commandInputList.slice(0, index),
      { ...commandInputList[index], content: { file: "", previewURL: "" } },
      ...commandInputList.slice(index + 1, 999),
    ]);
  };

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

  const style =
    filepath.previewURL !== ""
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
            height: ((width - 64) * 200) / 415,
            width: width - 64,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* 바탕사진 선택버튼 */}
        <div
          style={{
            position: "relative",
            height: 0,
            left: filepath.previewURL == "" ? (width - 175 - 64) / 2 : (width - 100 - 64) / 2,
            top: -(((width - 64) * 200) / 415 / 2 + 15),
          }}
        >
          {filepath.previewURL !== "" ? (
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
              <div style={{ ...inputFileCSSNone, marginLeft: 5 }} onClick={onDeletePhoto}>
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

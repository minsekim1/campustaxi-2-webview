import { SCREEN_WIDTH } from "../../style";
import { useState } from "react";
import { CropState, FilePathInit, FilePathState } from "../recoil";
import { useRecoilState } from "recoil";
import { Icon } from "../common/Icon";

export const CourseImage = ({ isEdit = false }) => {
  const [crop, setCrop] = useRecoilState(CropState);
  const [filepath, setFilepath] = useRecoilState(FilePathState);
  // const [isCrop, setIsCrop] = useState(false);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        {/* 바탕사진 및 바탕 임시 회색 */}
        <div
          style={{
            width: SCREEN_WIDTH,
            backgroundImage: !isEdit
              ? `linear-gradient(to bottom,rgba(0,0,0,0),rgba(255,255,255, 0),rgba(255,255,255, 0),rgba(255,255,255, 0),rgba(255,255,255, 0),rgba(255,255,255, 1)),url(${filepath.previewURL})`
              : filepath.previewURL != ""
              ? `linear-gradient(to bottom,rgba(0,0,0,0),rgba(255,255,255, 1)),url(${filepath.previewURL})`
              : `linear-gradient(to bottom,rgba(200,200,200,1),rgba(200,200,200, 1),rgba(200,200,200, 1),rgba(255,255,255, 0.2))`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: (SCREEN_WIDTH * 200) / 200,
          }}
        />
        {/* 바탕사진 */}
        {isEdit ? (
          <div style={{ position: "relative", top: -125 }}>
            {filepath.previewURL != "" ? (
              <div style={{ display: "flex" }}>
                <div style={inputFileCSSNone}>
                  <Icon name={"faEdit"} size={"lg"} color={"rgba(73,80,87,0.5)"} />
                </div>
                <div style={{ ...inputFileCSSNone, marginLeft: 5 }} onClick={() => setFilepath(FilePathInit)}>
                  <Icon name={"faTrash"} size={"lg"} color={"rgba(73,80,87,0.5)"} />
                </div>
              </div>
            ) : (
              <label style={inputFileCSS} />
            )}
          </div>
        ) : (
          false
        )}
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
  backgroundColor: "transparent",
  borderRadius: "4px",
  color: "white",
  cursor: "pointer",
};

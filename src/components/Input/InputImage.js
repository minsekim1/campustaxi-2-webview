import { GRAY2, GRAY6, GRAY7, GRAY8, GRAY9, SCREEN_WIDTH } from "../../style";
import { forwardRef, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fal from "@fortawesome/pro-light-svg-icons";
import * as fas from "@fortawesome/free-solid-svg-icons";
import * as far from "@fortawesome/pro-regular-svg-icons";
import { CreateBottomModalState, SearchPositionState } from "../recoil";
import { useRecoilState } from "recoil";
import { Icon } from "../common/Icon";

export const InputImage = ({ onChange, placeholder, inputMode, type, readOnly, disabled, defaultValue }) => {
  const [image, setImage] = useState({ file: "", previewURL: "" });
  const onChangeInupt = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImage({
        file: file,
        previewURL: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        
				<div>
					메인 사진을 선택해주세요
				</div>
        <div
          style={{
            width: SCREEN_WIDTH,
            backgroundImage: `linear-gradient(to bottom,rgba(0,0,0,0),rgba(255,255,255, 1)),url(${image.previewURL})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: 200,
          }}
        />
        <div style={{ marginTop: 16 }}>
          <input
            type="file"
            accept="image/jpg,impge/png,image/jpeg,image/gif"
            name="profile_img"
            defaultValue={defaultValue}
            onChange={onChangeInupt}
						style={{
							width: SCREEN_WIDTH*0.8,
              backgroundColor: GRAY2,
              padding: 10,
              borderRadius: 10,
              fontSize: 13,
              color: GRAY7,
            }}
            autoComplete={"true"}
          />
        </div>
      </div>
    </div>
  );
};

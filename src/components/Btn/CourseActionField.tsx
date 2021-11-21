import React from "react";

import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";

import { Icon } from "../common/Icon";
import useWindowDimensions from "../../hook/useWindowDimensions";
import { Checkbox } from "@mui/material";
import { styleCenter } from "../../style";

import { useRecoilState } from "recoil";
import { commandType, loadingState, shareModalState, userDataState } from "../recoil";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { CItem } from "../Input/CommandInput/CItem";

const fontStyle = {
  fontSize: 15,
  fontWeight: 900,
};

export const CourseActionField = ({ disable = false, url = "" }) => {
  const [modalInfo, setModalInfo] = useRecoilState(shareModalState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [userData] = useRecoilState(userDataState);

  const onCopy = () => {
    alert("URL로 복사되었습니다.");
  };

  return (
    <>
      <div
        style={{
          ...styleCenter,
          ...fontStyle,
          marginBottom: 16,
          borderWidth: 0,
          borderStyle: "solid",
          padding: 16,
          borderRadius: 16,
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <div style={{ flex: 1, ...styleCenter }}>
        {/* 좋아요버튼 */}
          <Checkbox
            disabled={!userData}
            icon={<Icon name={"faHeart"} size={36} type={"light"} color={"gray"} />}
            checkedIcon={<Icon name={"faHeart"} size={36} color={"#ff6d75"} />}
          />
          <div style={{ marginLeft: 8 }}>1.1k</div>
        </div>
        <div style={{ flex: 1, ...styleCenter }} onClick={() => !userData ? alert("로그인이 필요한 기능입니다!") : setModalInfo({ visible: !modalInfo.visible })}>
          {/* 공유버튼 */}
          <Icon name={"faShareAlt"} size={36} type={"regular"} color={!userData ?'gray' :"#007aff"} />
          <div style={{ marginLeft: 20 }}>공유</div>
        </div>
        <div style={{ flex: 1, ...styleCenter }}>
          {/* URL 복사 버튼 */}
          <CopyToClipboard text={location.href} onCopy={onCopy}>
            <div style={{ ...fontStyle }}>
              <div style={styleCenter}>URL</div>
              <div style={styleCenter}>COPY</div>
            </div>
          </CopyToClipboard>
        </div>
      </div>
    </>
  );
};
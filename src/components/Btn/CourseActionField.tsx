import React, { useEffect, useRef } from "react";

import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";

import { Icon } from "../common/Icon";
import useWindowDimensions from "../../hook/useWindowDimensions";
import { Checkbox, SwitchUnstyled } from "@mui/material";
import { GRAY7, GRAY8, styleCenter } from "../../style";

import { useRecoilState } from "recoil";
import { commandType, loadingState, shareModalState, userDataState } from "../recoil";

import { FcExpand, FcExport, FcIdea, FcLike, FcReading, FcReadingEbook, FcSettings, FcShare, FcShop } from "react-icons/fc";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CItem } from "../Input/CommandInput/CItem";
import { GoLinkExternal } from "react-icons/go";
import {  useHistory, useParams } from "react-router";
import { CourseType } from "../../types/Course";
import { getfetch, postfetch } from "../common";
import _ from "lodash";
import { Switch } from "@material-ui/core";

const fontStyle = {
  fontSize: 15,
  fontWeight: 900,
};
type Props = {
  disable?: boolean;
  course?: CourseType;
  mutate?: any;
}
export const CourseActionField = ({ mutate, disable = false, course }: Props) => {
  const [modalInfo, setModalInfo] = useRecoilState(shareModalState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [userData, setUserData] = useRecoilState(userDataState);
  const { id: courseId }: { id: string | undefined } = useParams();
  const isLikeRef = useRef<boolean>(userData ? userData.like_courses.map((d) => d.id).includes(Number(courseId)) : false)
  const onCopy = () => alert("URL로 복사되었습니다.")

  //#region Like
  const onClickLike = async (courseId: string | undefined) => {
    isLikeRef.current = !isLikeRef.current

    if (userData?.id && courseId) {
      if (isLikeRef.current) {
        // 좋아요 추가
        const list = _.uniq(userData.like_courses.map((d) => d.id).concat(Number(courseId)))
        await postfetch(`/users/${userData.id}`, JSON.stringify({ like_courses: list }), true, "PUT").then((d) => d && d.id ? setUserData(d) : false);
        // 좋아요 게시글에 반영
        mutate();
      } else {
        // 좋아요 삭제
        const list = userData.like_courses.map((d) => d.id).filter((id) => id !== Number(id))
        await postfetch(`/users/${userData.id}`, JSON.stringify({ like_courses: list }), true, "PUT").then((d) => d && d.id ? setUserData(d) : false);
        // 좋아요 게시글에 반영
        mutate();
      }
    }
  }
  //#endregion
  return (
    <>
      <div
        style={{
          ...styleCenter,
          ...fontStyle,
          marginBottom: 0,
          borderWidth: 0,
          borderStyle: "solid",
          padding: 16,
          borderRadius: 16,
          marginTop: 8,
          filter: disable ? 'grayscale(100%)' : "",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <div style={{ flex: 1, ...styleCenter }}>
          {/* 좋아요버튼 */}
          <Checkbox
            onClick={() => onClickLike(courseId)}
            defaultChecked={disable || isLikeRef.current}
            disabled={!userData || disable}
            icon={<Icon name={"faHeart"} size={36} type={"light"} color={"gray"} />}
            checkedIcon={<Icon name={"faHeart"} size={36} color={"#ff6d75"} />}
          />
          <div style={{ marginLeft: 12 }}>
            <div style={{ ...styleCenter, fontSize: 9, fontWeight: 'normal' }}>좋아요</div>
            <div style={{ ...styleCenter, fontSize: 13, fontWeight: 'normal', marginTop: -1 }}>
              {course ? course?.like_users.length : '1.1k'}
            </div>
          </div>
        </div>
        <div style={{ flex: 1, ...styleCenter }} onClick={() => disable ? () => { } : !userData ? alert("로그인이 필요한 기능입니다!") : setModalInfo({ visible: !modalInfo.visible })}>

          {/* 공유버튼 */}
          <Icon name={"faShareAlt"} size={32} type={"solid"} color={!userData ? 'gray' : "#0066d3"} />
          <div style={{ marginLeft: 12 }}>
            <div style={{ ...styleCenter, fontSize: 9, fontWeight: 'normal' }}>SNS</div>
            <div style={{ ...styleCenter, fontSize: 13, fontWeight: 'normal', marginTop: -1 }}>공유</div>
          </div>
        </div>
        <div style={{ flex: 1, ...styleCenter }}>

          {/* 조회수 통계 버튼 */}
          <div style={{ ...fontStyle, ...styleCenter, }}>
            <FcReading size={32} />
            <div style={{ marginLeft: 2 }}>
              <div style={{ ...styleCenter, fontSize: 9, fontWeight: 'normal' }}>조회수</div>
              <div style={{ ...styleCenter, fontSize: 13, fontWeight: 'normal', marginTop: 0 }}>
                {course ? (course?.views ?? 0) : '1.1k'}
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, ...styleCenter }}>

          {/* URL 복사 버튼 */}
          <CopyToClipboard text={location.href} onCopy={disable ? () => { } : onCopy}>
            <div style={{ ...fontStyle, ...styleCenter, }}>
              <GoLinkExternal style={{ ...styleCenter }} size={32} color={GRAY7} />
              <div style={{ marginLeft: 2 }}>
                <div style={{ ...styleCenter, fontSize: 11, fontWeight: 'normal' }}>URL</div>
                <div style={{ ...styleCenter, fontSize: 9, fontWeight: 'normal', marginTop: -4 }}>copy</div>
              </div>
            </div>
          </CopyToClipboard>
        </div>
      </div>
    </>
  );
};
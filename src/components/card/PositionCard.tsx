import { GRAY1, GRAY6, GRAY7, GRAY8, textOverflowHidden } from "../../style";
import { Icon } from "../common/Icon";
import { GRAY4 } from "../../style/index";
import useSWR from "swr";
import { fetcherBlob, fetcherGetImageByKeyword } from "../../hook/useSWR/fetcher";
import { CircularProgress, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { EndPosImageState, StartPosImageState } from "../recoil";

type Props = {
  title: string;
  desc: string;
  address: string;
  url: string;
  img: string | undefined | null; //null 이면 not found image undefined이면 loading
  onClick?: () => void;
  onClickDelete?: () => void;
  imgWidth?: string;
  padding?: string;
  noImg?: boolean;
  isStartPos?: boolean;
  isEndPos?: boolean;
};
export const PositionCard = ({
  title,
  desc,
  address,
  url,
  img,
  onClick,
  onClickDelete,
  imgWidth = "100%",
  padding = "16px 16px 0 16px",
  noImg = false,
  isStartPos = false,
  isEndPos = false,
}: Props) => {
  const [image, setImage] = useState<null | undefined | string>(noImg ? null : img);
  const setStartPosImage = useSetRecoilState(StartPosImageState);
  const setEndPosImage = useSetRecoilState(EndPosImageState);

  //#region 이미지 가져오기
  useEffect(() => {
    if (!noImg && img === undefined)
      fetch(`/v1/search/image?query=${title}&sort=date`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Naver-Client-Id": "yeoXdUtxPpcjkxR4G932",
          "X-Naver-Client-Secret": "TChrYL1rxH",
        },
      })
        .then((d) => d.json())
        .then((d) => {
          if (d.items && d.items.length > 0) {
            if (isStartPos) setStartPosImage(d.items[0].thumbnail);
            if (isEndPos) setEndPosImage(d.items[0].thumbnail);
            setImage(d.items[0].thumbnail);
          } else {
            if (isStartPos) setStartPosImage(null);
            if (isEndPos) setEndPosImage(null);
            setImage(null);
          }
        });
    else if (typeof img === 'string') setImage(img)
  }, []);
  //#endregion

  const onClickDeleteInner = () => {
    if (typeof onClickDelete === "function") onClickDelete();
    if (isStartPos) setStartPosImage(null);
    if (isEndPos) setEndPosImage(null);
  };

  return (
    <div style={{ padding: padding, display: "flex", flex: 1 }} onClick={onClick ? onClick : () => { }}>
      {noImg ? (
        false
      ) : (
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          {image === undefined ? (
            <div
              style={{
                backgroundColor: GRAY1,
                width: "4em",
                height: "4em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <CircularProgress size={18} />
            </div>
          ) : image === null ? (
            <div
              style={{
                backgroundColor: GRAY1,
                width: "4em",
                height: "4em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <div style={{ fontSize: 8, fontWeight: "bold", textAlign: "center" }}>Not Found Image</div>
            </div>
          ) : (
            <img
              alt={" "}
              src={image}
              width={imgWidth}
              style={{ borderRadius: 12, height: "4em", width: "4em" }}
              onError={() => setImage(null)}
            />
          )}
        </div>
      )}
      <div style={{ flex: 4, marginLeft: noImg ? 8 : 16, alignSelf: "center" }}>
        <div style={{ ...textOverflowHidden, fontSize: 12, color: GRAY7 }}>{address}</div>
        <div style={{ ...textOverflowHidden, fontSize: 15, color: GRAY8 }}>{title}</div>
        <div style={{ ...textOverflowHidden, fontSize: 13, color: GRAY6 }}>{desc}</div>
      </div>
      {typeof onClickDelete === "function" ? (
        <div style={{ position: "relative", width: 16, height: 28, top: -8 }} onClick={onClickDeleteInner}>
          <Icon type={"regular"} name={"faTrashAlt"} size={"sm"} color={GRAY4} />
        </div>
      ) : (
        false
      )}
    </div>
  );
};
export const PositionCardReverse = ({
  title,
  desc,
  address,
  url,
  img,
  onClick,
  onClickDelete,
  imgWidth = "100%",
  padding = "16px 16px 0 16px",
  noImg = false,
}: Props) => {
  const [image, setImage] = useState<null | undefined | string>(noImg ? null : img);

  //#region 이미지 가져오기
  useEffect(() => {
    if (!noImg && img === undefined)
      fetch(`/v1/search/image?query=${title}&sort=date`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Naver-Client-Id": "yeoXdUtxPpcjkxR4G932",
          "X-Naver-Client-Secret": "TChrYL1rxH",
        },
      })
        .then((d) => d.json())
        .then((d) => {
          if (d.items && d.items.length > 0) setImage(d.items[0].thumbnail);
          else setImage(null);
        });
    else if(typeof img === 'string' )setImage(img)
  }, []);
  //#endregion

  return (
    <div style={{ padding: padding, display: "flex", flex: 1 }} onClick={onClick ? onClick : () => { }}>
      <div style={{ flex: 4, marginLeft: noImg ? 8 : 16, alignSelf: "center" }}>
        <div style={{ ...textOverflowHidden, fontSize: 12, color: GRAY7 }}>{address}</div>
        <div style={{ ...textOverflowHidden, fontSize: 15, color: GRAY8 }}>{title}</div>
        <div style={{ ...textOverflowHidden, fontSize: 13, color: GRAY6 }}>{desc}</div>
      </div>
      {noImg ? (
        false
      ) : (
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          {image === undefined ? (
            <div
              style={{
                backgroundColor: GRAY1,
                width: "4em",
                height: "4em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <CircularProgress size={18} />
            </div>
          ) : image === null ? (
            <div
              style={{
                backgroundColor: GRAY1,
                width: "4em",
                height: "4em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <div style={{ fontSize: 8, fontWeight: "bold", textAlign: "center" }}>Not Found Image</div>
            </div>
          ) : (
            <img
              alt={" "}
              src={image}
              width={imgWidth}
              style={{ borderRadius: 12, height: "4em", width: "4em" }}
              onError={() => setImage(null)}
            />
          )}
        </div>
      )}
      {typeof onClickDelete === "function" ? (
        <div style={{ position: "relative", width: 16, height: 28, top: -8 }} onClick={onClickDelete}>
          <Icon type={"regular"} name={"faTrashAlt"} size={"sm"} color={GRAY4} />
        </div>
      ) : (
        false
      )}
    </div>
  );
};

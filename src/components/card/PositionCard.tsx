import { GRAY1, GRAY6, GRAY7, GRAY8, textOverflowHidden } from "../../style";
import { Icon } from "../common/Icon";
import { GRAY4 } from "../../style/index";
import useSWR from "swr";
import { fetcherBlob, fetcherGetImageByKeyword } from "../../hook/useSWR/fetcher";
import { CircularProgress, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  title: string;
  desc: string;
  address: string;
  url: string;
  img: string | undefined | null;
  onClick?: () => void;
  onClickDelete?: () => void;
  imgWidth?: string;
  padding?: string;
  noImg?: boolean;
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
}: Props) => {
  const [image, setImage] = useState(img);

  useEffect(() => setImage(img), [img]);
  return (
    <div style={{ padding: padding, display: "flex", flex: 1 }} onClick={onClick ? onClick : () => { }}>
      {noImg ? false : <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
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
      </div>}
      <div style={{ flex: 4, marginLeft: noImg ? 8 :16, alignSelf: "center" }}>
        <div style={{ ...textOverflowHidden, fontSize: 12, color: GRAY7 }}>{address}</div>
        <div style={{ ...textOverflowHidden, fontSize: 15, color: GRAY8 }}>{title}</div>
        <div style={{ ...textOverflowHidden, fontSize: 13, color: GRAY6 }}>{desc}</div>
      </div>
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
}: Props) => {
  //#region image
  const { data: image, error } = useSWR(img ?? null, fetcherBlob);
  //#endregion

  return (
    <div style={{ padding: padding, display: "flex", flex: 1 }} onClick={onClick ? onClick : () => { }}>
      <div style={{ flex: 4, marginLeft: 16, alignSelf: "center" }}>
        <div style={{ ...textOverflowHidden, fontSize: 12, color: GRAY7 }}>{address}</div>
        <div style={{ ...textOverflowHidden, fontSize: 15, color: GRAY8 }}>{title}</div>
        <div style={{ ...textOverflowHidden, fontSize: 13, color: GRAY6 }}>{desc}</div>
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img
          alt={" "}
          src={image}
          width={imgWidth}
          style={{ borderRadius: 12, maxHeight: "5em", maxWidth: "5em" }}
        ></img>
      </div>
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

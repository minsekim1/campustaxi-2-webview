import { CPlace } from "./CPlace";
import { CTextarea } from "./CTextarea";
import { CImage } from './CImage';
import { CH } from './CH';
import { CTag } from './CTag';
import { CContour } from './CContour';
import { CProduct } from "./CProduct";
import { ContentItemType } from "../../../types/Command";
import { memo } from "react";
import _ from "lodash";

type Props = {
  index: number;
  data: ContentItemType;
  disable: boolean;
}
export const CItem = ({ index, data, disable = false }: Props) => {
  switch (data.type) {
    case "text":
      return <CTextarea index={index} data={data} disable={disable} />;
    case "place":
      return <CPlace index={index} data={data} />;
    case "product":
      return <CProduct index={index} data={data} />;
    case "image":
      return <CImage index={index} data={data} />;
    case "h1":
      return <CH index={index} data={data} type={'h1'} disable={disable} />;
    case "h2":
      return <CH index={index} data={data} type={"h2"} disable={disable} />;
    case "h3":
      return <CH index={index} data={data} type={"h3"} disable={disable} />;
    case "tag":
      return <CTag disable={disable} index={index} data={data} />;
    case "contour":
      return <CContour index={index} data={data} />;
    default:
      return <></>;
  }
};
export const MCItem = memo(CItem, isEqual);
function isEqual(prevProps: any, nextProps: any) {
  let checkProps = ['index', 'data', 'disable'];
  return _.isMatch(_.pick(prevProps, checkProps), _.pick(nextProps, checkProps));
}

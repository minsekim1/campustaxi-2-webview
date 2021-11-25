import { CPlace } from "./CPlace";
import { CTextarea } from "./CTextarea";
import { CImage } from './CImage';
import { CH } from './CH';
import { CTag } from './CTag';
import { CContour } from './CContour';
import { CProduct } from "./CProduct";

export const CItem = ({ index, data, disable=false }) => {
  switch (data.type) {
    case "text":
      return <CTextarea index={index} />;
    case "place":
      return <CPlace index={index} data={data} />;
    case "product":
      return <CProduct index={index} data={data} />;
    case "image":
      return <CImage index={index} data={data} />;
    case "h1":
      return <CH index={index} data={data} type={'h1'} />;
    case "h2":
      return <CH index={index} data={data} type={"h2"} />;
    case "h3":
      return <CH index={index} data={data} type={"h3"} />;
    case "tag":
      return disable ? <></> : <CTag disable={disable} index={index} data={data} />;
    case "contour":
      return <CContour index={index} data={data} />;
    default:
      return <></>;
  }
};

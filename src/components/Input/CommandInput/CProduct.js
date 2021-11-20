import { noTags } from "../../modal/CourseProductModal";
import { PositionCard } from "./../../card/PositionCard";
import { numberWithCommas } from "./../../modal/CourseProductModal";

export const CProduct = ({ index, data }) => {
  const product = data.content;
  return (
    <PositionCard
      address={`${product.category1} > ${product.category2} > ${product.category3} > ${product.category4}`}
      title={noTags(product.title)}
      desc={`최저가 ${numberWithCommas(product.lprice)}원`}
      url={""}
      imgWidth={70}
      img={product.image}
      onClick={() => {}}
    />
  );
};

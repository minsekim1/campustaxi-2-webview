import { PositionCard } from './../../card/PositionCard';

export const CPlace = ({index, data}) => {
  return (
      <PositionCard
        key={index.toString()}
        address={data.content.address_name}
        title={data.content.place_name}
        desc={data.content.category_name}
        url={data.content.place_url}
        img={"https://picsum.photos/200"}
        imgWidth={70}
        // onClick={() => onClick(data.content)}
      />
  );
}
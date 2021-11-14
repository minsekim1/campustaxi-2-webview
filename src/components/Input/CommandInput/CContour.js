import useWindowDimensions from '../../../hook/useWindowDimensions';

export const CContour = ({ index, data }) => {
  const { height, width } = useWindowDimensions();
  return <div style={{ width: width * 0.8, height: 2, backgroundColor: "black", marginTop: 11, borderRadius: 10 }} />;
};
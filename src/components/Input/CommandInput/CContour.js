import useWindowDimensions from '../../../hook/useWindowDimensions';

export const CContour = ({ index, data }) => {
  const { height, width } = useWindowDimensions();
  return <div style={{ width: width  - 32, height: 2, backgroundColor: "black", marginTop: 11,marginBottom:11, borderRadius: 10 }} />;
};
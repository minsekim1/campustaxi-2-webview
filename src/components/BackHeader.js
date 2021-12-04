import { Icon } from "./common/Icon";
import { GRAY1, GRAY8, GRAY9 } from "./../style/index";
import { useHistory } from "react-router-dom";

export const BackHeader = ({color=GRAY9}) => {
  const history = useHistory();
  const goBack = () => history.goBack();

  return (
    <div
      onClick={goBack}
      style={{
        position: "absolute",
        margin: 16,
        backgroundColor: 'white',
        borderRadius: 100,
        width: 20,
        height: 20,
        boxShadow: `0 0 4px 4px ${GRAY1}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center'
      }}
    >
      <Icon name={"faChevronLeft"} color={color} type={"light"} />
    </div>
  );
};

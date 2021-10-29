import { Icon } from "./common/Icon";
import { GRAY8 } from "./../style/index";
import { useHistory } from "react-router-dom";

export const BackHeader = ({}) => {
  const history = useHistory();
  const goBack = () => history.goBack();

  return (
    <div onClick={goBack} style={{ position: "absolute", padding: 16 }}>
      <Icon name={"faChevronLeft"} color={GRAY8} type={"light"} />
    </div>
  );
};

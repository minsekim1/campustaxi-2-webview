import { BottomSheet } from "react-spring-bottom-sheet";
import { useRecoilState } from 'recoil';
import { BottomModalState } from "../components/recoil";
import "react-spring-bottom-sheet/dist/style.css";

export const BottomModal = () => {
  const [visible, setVisible] = useRecoilState(BottomModalState);
  return (
    <>
      <BottomSheet
        open={visible}
        onDismiss={() => setVisible(false)}
        snapPoints={({ minHeight, maxHeight }) => [maxHeight * 0.8, maxHeight]}
        defaultSnap={({ lastSnap, snapPoints }) => [snapPoints]}
      >
        <div>
          <p>Using</p>
          <div>
            <div className="bg-gray-200 block rounded-md h-10 w-full my-10" />
            <p>The height adjustment is done automatically, it just works™!</p>
            <div className="bg-gray-200 block rounded-md h-10 w-full my-10" />
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

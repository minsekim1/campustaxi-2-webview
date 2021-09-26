import { BottomSheet } from "react-spring-bottom-sheet";
import { useRecoilState } from 'recoil';
import { BottomModalState, CreateBottomModalState } from "../components/recoil";
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
          <p>검색</p>
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
export const CreateBottomModal = () => {
  const [visible, setVisible] = useRecoilState(CreateBottomModalState);
  return (
    <>
      <BottomSheet
        blocking={false}
        open={visible}
        onDismiss={() => setVisible(false)}
        snapPoints={({ minHeight, maxHeight }) => [maxHeight * 0.2, maxHeight*0.7]}
        defaultSnap={({ lastSnap, snapPoints }) => [snapPoints]}
      >
        <div>
          <p>채팅방을 만들어보세요!</p>
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

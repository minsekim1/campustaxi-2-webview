import { useRecoilState } from "recoil";
import { CropState } from "./../recoil";
import { useState, useCallback } from "react";
import { GRAY6, ORANGE, SCREEN_HEIGHT, SCREEN_WIDTH } from "./../../style/index";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../common/function/getCroppedImg";

export const CropScreen = () => {
  const [crop, setCrop] = useRecoilState(CropState);

  const [cropXY, setCropXY] = useState({ x: 0, y: 0 });
  const [rotation] = useState(0); //setRotation
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState();
  const [, setCroppedImage] = useState(); //croppedImage

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(crop.previewURL, croppedAreaPixels, rotation);
      setCroppedImage(croppedImage);
      setCrop({ visible: false, file: croppedImage, previewURL: croppedImage, type:crop.type });
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, crop.previewURL, setCrop]);

  return (
    <div>
      {/* 바탕사진 수정 창 */}
      {crop.visible ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            zIndex: 4,
            backgroundColor: "white",
          }}
        >
          <div
            onClick={onCropComplete}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0px",
              color: ORANGE,
              position: "relative",
              zIndex: 20,
              backgroundColor: "white",
            }}
          >
            <div style={{ paddingLeft: 16, color: GRAY6 }} onClick={() => setCrop({ ...crop, visible: false })}>
              취소
            </div>
            <div style={{ paddingRight: 16 }} onClick={showCroppedImage}>
              완료
            </div>
          </div>
          <Cropper
            image={crop.previewURL}
            crop={cropXY}
            zoom={zoom}
            aspect={200 / 200}
            onCropChange={setCropXY}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      ) : (
        false
      )}
    </div>
  );
};

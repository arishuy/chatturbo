import { useState, useCallback, useRef, ReactEventHandler } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import styles from "../../../styles/components/avatar/AvatarEditor.module.css";

export function getCroppedImg(
  image: HTMLImageElement,
  crop: Crop,
  fileName: string
) {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");

  // New lines to be added
  if (ctx) {
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  } else {
    console.error("Failed to obtain 2D context");
  }

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
        (blob) => {
            if (blob) {
                 const file = new File([blob], fileName, {
                   type: "image/jpeg",
                 });
              resolve(file);
                          }
      },
      "image/jpeg",
    );
  });
  // return canvas.toDataURL("image/jpeg");
}

type Props = {
  sourceImg: string;
  onUploadImage: (image: any) => void;
  setCompletedCrop: (crop: any) => void;
};
function AvatarEditor({ sourceImg, onUploadImage, setCompletedCrop }: Props) {
  const [crop, setCrop] = useState<Crop>({
    unit: "px", // Can be 'px' or '%'
    x: 0,
    y: 0,
    width: 150,
    height: 150,
  });

  const onLoad: ReactEventHandler<HTMLImageElement> = useCallback(
    (event) => {
      const img = event.target as HTMLImageElement;
      onUploadImage(img);
      let newCrop: Crop = {
        unit: "px",
        x: (img.width - crop.width) / 2,
        y: (img.height - crop.height) / 2,
        width: crop.width,
        height: crop.height,
      };
      setCrop(newCrop);
    },
    [crop.width, crop.height]
  );

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <ReactCrop
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
        circularCrop={true}
        keepSelection={true}
        minWidth={200}
        minHeight={200}
        className={styles.crop}
        aspect={1}
      >
        <img src={sourceImg} onLoad={onLoad} style={{ maxHeight: "70vh" }} />
      </ReactCrop>
    </div>
  );
}

export default AvatarEditor;

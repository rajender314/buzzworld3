import { PiModal } from "pixel-kit";
import { useEffect, useState } from "react";
import CrossLogo from "@app/assets/images/cross.svg";
import { getBlobImage } from "@app/helpers/helpers";
import PreviewContainer from "./img-preview.component";

export default function ImgPreview({ selectedFile, sendEventData }: any) {
  const [isOpen, setOpen] = useState(false);
  const [preview, setPreview] = useState<string>("");
  useEffect(() => {
    const blobUrl = selectedFile.url
      ? selectedFile.url
      : getBlobImage(selectedFile);
    setPreview(blobUrl);
    setOpen(true);
  }, [selectedFile]);
  //  function setUploadPreview(selectedFile: any) {
  //    const objectUrl: any = URL.createObjectURL(selectedFile)
  //	return objectUrl;
  //    //return () => URL.revokeObjectURL(objectUrl)
  //  }
  function onClose() {
    setOpen(false);
    const obj = {
      success: true,
    };
    sendEventData(obj);
  }
  return (
    <PiModal isOpen={isOpen} width="auto">
      <PreviewContainer onClick={() => onClose()}>
        <img className="cross-img" alt="loading" src={CrossLogo} />
        <img className="preview-image" src={preview} alt="loading" />
      </PreviewContainer>
    </PiModal>
  );
}

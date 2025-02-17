import UploadImg from "@app/assets/images/Upload icon.svg";
import { TextContainer, UploadText } from "./upload.component";

export default function UploaderText() {
  return (
    <TextContainer>
      <img src={UploadImg} alt="loading" />
      <UploadText>
        Drag and drop or <span>choose a file</span> to upload. .jpg, .png,
        .jpeg, .pdf file types are supported.
      </UploadText>
    </TextContainer>
  );
}

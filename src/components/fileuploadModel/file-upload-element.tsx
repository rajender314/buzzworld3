import uploadImg from "@app/assets/images/Upload icon.svg";
import { UploadIcon } from "./fileuploadModel.component";
import { HeaderText } from "../adminaddrowmodel/adminaddrowmodel.component";

export default function FileUploadElement() {
  return (
    <HeaderText>
      <div className="icon_container">
        <UploadIcon src={uploadImg} onClick={() => {}} />
      </div>
      <div>
        <p className="browse_text">
          Drag & drop files or <span>Browse</span>
        </p>
      </div>
    </HeaderText>
  );
}

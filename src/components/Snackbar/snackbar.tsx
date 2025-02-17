import { PiModal, PiModalHeader, PiTypography } from "pixel-kit";
import { useCallback, useEffect, useState } from "react";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
} from "../fileuploadModel/fileuploadModel.component";

type Props = {
  message: string;
  triggerEvent: any;
};
function Snackbar({ message, triggerEvent }: Props) {
  const [popupMessageShow, setPopupMessageShow] = useState(false);
  const popupMessageClose = useCallback(() => {
    triggerEvent("close");
    setPopupMessageShow(false);
  }, [triggerEvent]);
  useEffect(() => {
    setPopupMessageShow(true);
    setTimeout(() => {
      popupMessageClose();
    }, 2000);
  }, [popupMessageClose]);

  return (
    <PiModal className="rajenders" isOpen={popupMessageShow}>
      <PopupHeaderContentDiv>
        <PiModalHeader>
          <PopupHeaderDiv>
            <PiTypography component="h3">{message}</PiTypography>
            {/* {
                  <CloseButton
                    onClick={() => popupMessageClose()}
                    title="close"
                    className="Hover"
                  >
                    <img src={CrossLogo} alt="loading"/>
                  </CloseButton>
                } */}
          </PopupHeaderDiv>
        </PiModalHeader>
      </PopupHeaderContentDiv>
    </PiModal>
  );
}

export default Snackbar;

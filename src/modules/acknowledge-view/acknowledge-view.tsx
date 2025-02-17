import { useEffect, useState } from "react";
import { FieldDetails } from "@app/components/parts-purchase-components/parts-purchase-detail-view-content/parts-purchase-detail-view-content-components";
import CancelIcon from "@app/assets/images/filters-cancel.svg";
import SuccessIcon from "@app/assets/images/green-tick-icon.svg";
import { PiModal, PiModalBody, PiSpinner, PiTooltip } from "pixel-kit";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import CrossLogo from "@app/assets/images/cross.svg";
import { AcknowledgeContainer } from "../access-denied/component/access-denied.component";

export default function Acknowledge({
  isSuccess,
  acknoledgeMsg,
  sendData,
}: any) {
  const [loading, setLoading] = useState(true);
  function closeModel() {
    sendData({ close: true });
  }
  useEffect(() => {
    (async () => {
      if (acknoledgeMsg) {
        setLoading(false);
        setTimeout(() => {
          closeModel();
        }, 10000);
      }
    })();
  }, []);

  return (
    <PiModal isOpen width={450}>
      {loading && (
        <SpinnerDiv style={{ height: "100%" }}>
          <PiSpinner color="primary" size={50} libraryType="atalskit" />
        </SpinnerDiv>
      )}
      <div style={{ padding: "10px", position: "relative" }}>
        <PiModalBody>
          <CloseButton
            onClick={() => closeModel()}
            title="close"
            className="acknowledge-close"
            style={{
              position: "absolute",
              right: "8px",
              justifyContent: "end",
            }}
          >
            <img src={CrossLogo} alt="loading" />
          </CloseButton>
          {!loading && (
            <FieldDetails
              className="field-details"
              style={{
                justifyContent: "center",
                display: "flex",
                padding: "20px 0px",
              }}
            >
              <AcknowledgeContainer>
                <img src={isSuccess ? SuccessIcon : CancelIcon} alt="img" />
                <PiTooltip content={acknoledgeMsg} libraryType="atalskit">
                  <div className="message ellipse">{acknoledgeMsg}</div>
                </PiTooltip>
              </AcknowledgeContainer>
            </FieldDetails>
          )}
        </PiModalBody>
      </div>
    </PiModal>
  );
}

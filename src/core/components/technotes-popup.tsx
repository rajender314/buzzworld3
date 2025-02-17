import {
  PiModal,
  PiTypography,
  PiModalBody,
  PiButton,
  PiModalFooter,
} from "pixel-kit";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import GenerateHTML from "@app/components/Quote-components/Quote-detail-view-content/QuoteNotes/generateHTML";
import CrossLogo from "@app/assets/images/cross.svg";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import { useEffect, useState } from "react";
import { TechNotesHeader } from "@app/components/RepairItems/item-internal-notes.component";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import EndpointUrl from "../apiEndpoints/endPoints";

export default function TechNotesView({
  title,
  notesFor,
  detailViewNotes,
  technote,
  sendData,
}: any) {
  const [openModel, setOpenModel] = useState(false);
  const [updatedNotes, setUpdatedNotes] = useState(false);
  const [serverMsg, setServerMsg] = useState<string>("");
  const [opacity, setOpacity] = useState(false);
  const [popupNotes, setPopupNotes]: any = useState<string>();

  useEffect(() => {
    setOpenModel(true);
  }, []);
  function closeModel() {
    setOpenModel(false);
    sendData({ close: true });
  }
  const triggerNotesData = (e: any) => {
    setUpdatedNotes(e);
    setPopupNotes(e);
  };
  const saveRepairData = () => {
    setOpacity(true);
    const params = {
      technical_note: popupNotes,
    };
    const apiObject = {
      payload: params,
      method: "PATCH",
      apiUrl: `${EndpointUrl.repairItems}/${detailViewNotes.id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          setServerMsg("");
          setOpacity(false);
          sendData({ success: true, updatedNotes });
        } else {
          setServerMsg(response.result.data);
          setOpacity(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  return (
    <div>
      <PiModal isOpen={openModel} width={650}>
        <PopupHeaderContentDiv>
          <TechNotesHeader>
            <PopupHeaderDiv className="show">
              <PiTypography component="h4">{title}</PiTypography>
              <CloseButton
                onClick={() => closeModel()}
                title="close"
                className="Hover"
              >
                <img src={CrossLogo} alt="loading" />
              </CloseButton>
            </PopupHeaderDiv>
          </TechNotesHeader>
          <hr />
        </PopupHeaderContentDiv>
        <PiModalBody>
          <p className="confirm-content">
            <GenerateHTML
              notesFor={notesFor}
              detailViewNotes={detailViewNotes}
              notesToCustomer={technote}
              sendData={triggerNotesData}
            />
          </p>
        </PiModalBody>
        {detailViewNotes.is_edit === false ? (
          <div />
        ) : (
          <PiModalFooter>
            {serverMsg && <small className="server-msg">{serverMsg}</small>}
            <PiButton
              appearance="secondary"
              label="Update"
              onClick={saveRepairData}
              className="Primary"
              isDisabled={opacity || !popupNotes}
            />
          </PiModalFooter>
        )}
      </PiModal>
    </div>
  );
}

import {
  PiButton,
  PiModal,
  PiModalBody,
  PiModalFooter,
  PiModalHeader,
  PiSelectForm,
  PiTypography,
} from "pixel-kit";
import { Fragment, useEffect, useState } from "react";
import CrossLogo from "@app/assets/images/cross.svg";
import { Formik } from "formik";
import { getRepairUsersList } from "@app/modules/repair-detail-view/helpers/repairs-helpers";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import { useParams } from "react-router-dom";
import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
} from "../fileuploadModel/fileuploadModel.component";
import {
  Popup,
  FilterFormFields,
  CloseButton,
} from "../adminaddrowmodel/adminaddrowmodel.component";
import { Width100 } from "../Quote-components/Forms/PartQuote/part-quote.component";
import InternalItemTextBox from "./internal-item-text-box";
import { AssignQCValidationSchema } from "../Quote-components/Forms/PartQuote/part-quote-validation";

export default function AssignQCPopup({ partInfo, sendEventData }: any) {
  const { id }: RouteParams = useParams();
  const [itemAttachments, setItemAttachments] = useState();
  const [openModel, setOpenModel] = useState(false);
  const initialValues = {
    user_id: "",
    internal_item_notes: "",
  };
  const [usersList, setUsersList]: any = useState([]);
  const [serverMsg, setServerMsg] = useState(null);

  useEffect(() => {
    setOpenModel(true);
  }, []);
  useEffect(() => {
    (async () => {
      const users = await getRepairUsersList();
      const mappedUsers = users.map((obj: any) => ({
        ...obj,
        value: obj.id,
        label: obj.name || "No Name",
      }));
      setUsersList(mappedUsers);
    })();
  }, []);
  function closeModel() {
    setOpenModel(false);
    sendEventData({ close: true });
  }
  function handleSubmit(data: any) {
    const params = {
      repairs_id: id,
      type: "assigned_to_qc",
      user_id: data.user_id.id,
      internal_item_notes: itemAttachments,
    };
    const apiObject = {
      payload: params || {},
      method: "PUT",
      apiUrl: `${EndpointUrl.ManuallyRepairStatusUpdate}/${partInfo.repairItemId}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setServerMsg(null);
          sendEventData({
            success: true,
            msg: "Updated Successfully",
          });
        } else {
          setServerMsg(response.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  const triggerEventData = async (e: any) => {
    console.log(e);
    setItemAttachments(e);
  };
  return (
    <Popup>
      <PiModal isOpen={openModel} width={450} height={400}>
        <PopupHeaderContentDiv>
          <PiModalHeader>
            <PopupHeaderDiv>
              <PiTypography component="h3">Assign QC</PiTypography>

              <CloseButton
                onClick={() => closeModel()}
                title="close"
                className="Hover"
              >
                <img src={CrossLogo} alt="loading" />
              </CloseButton>
            </PopupHeaderDiv>
          </PiModalHeader>
          <hr />
        </PopupHeaderContentDiv>
        <Formik
          validationSchema={AssignQCValidationSchema}
          onSubmit={(e: any) => handleSubmit(e)}
          initialValues={initialValues}
          innerRef={() => {}}
        >
          {({ ...formik }: any) => (
            <>
              <PiModalBody>
                <FilterFormFields className="piselect-form">
                  <PiSelectForm
                    name="user_id"
                    label="Assign QC"
                    placeholder="Select"
                    options={usersList}
                    classNamePrefix="react-select"
                    isMandatory
                  />
                </FilterFormFields>
                <Width100>
                  <InternalItemTextBox sendEventData={triggerEventData} />
                </Width100>
              </PiModalBody>

              <PiModalFooter>
                {serverMsg && <div className="server-msg">{serverMsg}</div>}
                <PiButton
                  appearance="primary"
                  label="Assign"
                  onClick={formik.handleSubmit}
                  className="Primary"
                />
              </PiModalFooter>
            </>
          )}
        </Formik>
      </PiModal>
    </Popup>
  );
}

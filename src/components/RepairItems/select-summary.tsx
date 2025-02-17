import {
  PiSideDrawer,
  PiTypography,
  PiSpinner,
  PiButton,
  PiCheckBoxSelectForm,
  PiTextareaForm,
} from "pixel-kit";
import { useCallback, useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import CrossLogo from "@app/assets/images/cross.svg";
import {
  getRepairSummaryData,
  getRepairSummaryList,
} from "@app/modules/repair-detail-view/helpers/repairs-helpers";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import RepairsImg from "@app/assets/images/repairs.svg";
import { RmaFields, SideDrawerW40 } from "../rmaModel/RmaModel.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "../Repair-Components/selectItems/selectItemsModel/selectItem.component";
import { SideDrawerFooter } from "../Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import {
  QuotePopupHeaderContainer,
  Width100,
} from "../Quote-components/Forms/PartQuote/part-quote.component";
import { RepairSummaryValidationSchema } from "../Quote-components/Forms/PartQuote/part-quote-validation";
import { SpinnerDiv } from "../fileuploadModel/fileuploadModel.component";
import { CloseButton } from "../adminaddrowmodel/adminaddrowmodel.component";
import InternalItemTextBox from "./internal-item-text-box";

export default function SelectSummary({ selectedRepair, sendEventData }: any) {
  const [openModel, setOpenModel] = useState(false);
  const [serverMsg, setServerMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summaryList, setSummaryList]: any = useState([]);
  const [itemAttachments, setItemAttachments] = useState();
  const [itemAttachments2, setItemAttachments2] = useState();

  const initialValues = {
    repair_summary:
      selectedRepair && selectedRepair.repair_summary
        ? selectedRepair.repair_summary
        : "",
    comments:
      selectedRepair && selectedRepair.comments ? selectedRepair.comments : "",
  };
  const formik = useRef<any>(null);

  function handleRef(e: any) {
    formik.current = e;
    console.log(formik);
  }
  useEffect(() => {
    (async () => {
      setOpenModel(true);
      const summary = await getRepairSummaryList();
      setSummaryList([...summary]);
      const data = await getRepairSummaryData(selectedRepair.id);
      console.log(data);
      if (data && data.internal_item_notes) {
        setItemAttachments({ ...data.internal_item_notes });
      }
      setLoading(false);
    })();
  }, [selectedRepair.id]);
  function closeModel() {
    setOpenModel(false);
    sendEventData({ close: true });
  }

  function handleSubmit(data: any) {
    const params = {
      ...data,
      internal_item_notes: itemAttachments2,
    };
    const apiObject = {
      payload: params,
      method: "PUT",
      apiUrl: `${EndpointUrl.RepairSummary}/${selectedRepair.id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setServerMsg(null);
          setOpenModel(false);
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
  const onSummaryChange = (e: any) => {
    if (e.length === 0) {
      formik.current.setFieldValue("repair_summary", "");
    }
  };
  const triggerEventData = useCallback(async (e: any) => {
    console.log(e);
    setItemAttachments2(e);
  }, []);

  return (
    <SideDrawerW40>
      <PiSideDrawer isOpen={openModel} width="narrow">
        <SideDrawerContainer>
          <SideDrawerHeader>
            <QuotePopupHeaderContainer>
              <img src={RepairsImg} alt="loading" />
              <PiTypography component="h3">Repair Summary</PiTypography>
            </QuotePopupHeaderContainer>
            <CloseButton
              onClick={() => closeModel()}
              title="close"
              className="Hover"
            >
              <img src={CrossLogo} alt="loading" />
            </CloseButton>
          </SideDrawerHeader>
          {loading && (
            <SpinnerDiv style={{ height: "100%" }}>
              <PiSpinner color="primary" size={50} libraryType="atalskit" />
            </SpinnerDiv>
          )}
          {!loading && (
            <Formik
              validationSchema={RepairSummaryValidationSchema}
              onSubmit={(e: any) => handleSubmit(e)}
              initialValues={initialValues}
              innerRef={(e: any) => handleRef(e)}
            >
              {({ ...formikProps }: any) => (
                <>
                  <FormBodyOverFlow>
                    <RmaFields>
                      <Width100 className="d-flex-row-gap width-100">
                        <PiCheckBoxSelectForm
                          name="repair_summary"
                          label="Repair Summary"
                          placeholder="Select"
                          options={summaryList}
                          onChange={onSummaryChange}
                          isMandatory
                          classNamePrefix="pi-select-height-auto"
                          isDisabled={
                            selectedRepair.status_code === "pending_qc"
                          }
                          isMulti
                        />
                      </Width100>
                      <Width100>
                        <PiTextareaForm
                          name="comments"
                          label="Repair Summary Notes to Customer"
                          libraryType="atalskit"
                          placeholder="Enter Repair Summary Notes"
                          maxLength={255}
                        />
                      </Width100>
                      <Width100>
                        {/* {itemAttachments && ( */}
                        <InternalItemTextBox
                          internalItemNotes={itemAttachments}
                          sendEventData={triggerEventData}
                        />
                        {/* )} */}
                      </Width100>
                    </RmaFields>
                  </FormBodyOverFlow>
                  <SideDrawerFooter>
                    {serverMsg && <div className="server-msg">{serverMsg}</div>}
                    <PiButton
                      appearance="primary"
                      label="Save"
                      onClick={formikProps.handleSubmit}
                    />
                  </SideDrawerFooter>
                </>
              )}
            </Formik>
          )}
        </SideDrawerContainer>
      </PiSideDrawer>
    </SideDrawerW40>
  );
}

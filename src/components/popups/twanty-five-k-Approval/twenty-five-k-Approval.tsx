import {
  PiButton,
  PiDatepickerForm,
  PiSelectForm,
  PiSpinner,
  PiTextareaForm,
  PiToast,
  PiTypography,
} from "pixel-kit";
import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import FilterFieldsContainer from "@app/components/Repair-Components/repair-list-filter/repair-list.component";
import { SideDrawerFooter } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import ApprovalTwentykValidationsSchema from "@app/modules/adminModules/quoteApproval/validation/TwentyFive-Approval-Validation";
import { DateRangePickerDiv } from "@app/components/special-pricing-components/sp-left-filter/sp-left-filter.component";
import { getQuoteApprovalFormData } from "@app/components/Quote-components/quotes-helper";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import CrossLogo from "@app/assets/images/cross.svg";
import { getPermissionObject } from "@app/helpers/componentHelpers";

export default function TwentyFiveApproval({
  displayFields,
  approvalInputData,
  sendModelData,
}: any) {
  const approvalName = "$ 25k+ Approve Questions";
  const [loading, setLoading] = useState(true);
  const [serverMsg, setServerMsg] = useState(null);
  const [TodayDate, SetTodayDate] = useState("");
  const formik = useRef<any>(null);
  const [timeLineList, setTimeLineList] = useState([]);
  const [openSnackbar, setSnackbar] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [approvalFormDataById, setApprovalFormDataById]: any = useState();
  const [initialValues, setInitialValues] = useState({
    timeline: "",
    pain: "",
    decision_making_process: "",
    delivery_due_date: "",
  });
  const [permissionObject, setpermissionObject] = useState<any>({});

  useEffect(() => {
    (async () => {
      const data: any = await getQuoteApprovalFormData(
        "25k_quote_approval",
        approvalInputData
      );
      setApprovalFormDataById(data);

      if (
        data &&
        approvalInputData &&
        approvalInputData.eventFrom === "quote"
      ) {
        setTimeLineList(data.dropdowns.type);
        if (displayFields && displayFields.values) {
          initialValues.timeline = displayFields.values.timeline;
          initialValues.pain = displayFields.values.pain;
          initialValues.decision_making_process =
            displayFields.values.decision_making_process;
          initialValues.delivery_due_date =
            displayFields.values.delivery_due_date;
          setInitialValues(initialValues);
        }

        setLoading(false);
      } else if (data && !approvalInputData) {
        setTimeLineList(data.dropdowns.type);
        if (data && data.values) {
          initialValues.timeline = data.values.timeline;
          initialValues.pain = data.values.pain;
          initialValues.decision_making_process =
            data.values.decision_making_process;
          initialValues.delivery_due_date = data.values.delivery_due_date;
          setInitialValues(initialValues);
        }

        setLoading(false);
      }
      if (window.location.pathname.substring(1) === "quote-approval") {
        const permission = await getPermissionObject(
          window.location.pathname.substring(1)
        );
        setpermissionObject(permission);
      } else {
        const permission = await getPermissionObject("quote_for_parts");
        setpermissionObject(permission);
      }
    })();
  }, [displayFields, initialValues]);
  function handleRef(e: any) {
    formik.current = e;
  }
  useEffect(() => {
    function formatDate(date: Date) {
      const d = new Date(date);
      let month = `${d.getMonth() + 1}`;
      let day = `${d.getDate()}`;
      const year = d.getFullYear();

      if (month.length < 2) month = `0${month}`;
      if (day.length < 2) day = `0${day}`;

      return [year, month, day].join("-");
    }
    SetTodayDate(formatDate(new Date()));
  }, []);

  function submit25kApproval(data: any, type: string) {
    const param = {
      quote_form_values: data,
      type,
      quote_form_id: approvalFormDataById.id,
      quote_id: approvalInputData.quote_id,
    };
    const apiObject = {
      payload: param,
      method: "POST",
      apiUrl: displayFields
        ? EndpointUrl.QuoteInternalApprovalQues
        : `${EndpointUrl.QuoteApproval}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          if (approvalInputData && approvalInputData.eventFrom === "quote") {
            sendModelData({ success: true });
          } else {
            setServerMsg(null);
            setToastMsg("Updated Successfully");
            setSnackbar(true);
          }
        } else {
          setServerMsg(response.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  function decline() {
    if (approvalInputData && approvalInputData.eventFrom === "quote") {
      submit25kApproval(approvalFormDataById.values, "declined");
    }
  }
  function handleSubmit(data: any) {
    console.log(data);

    if (approvalInputData && approvalInputData.eventFrom === "quote") {
      submit25kApproval(data, "approved");
    } else {
      const param = {
        values: data,
        code: "25k_quote_approval",
      };
      const apiObject = {
        payload: param,
        method: "POST",
        apiUrl: displayFields
          ? EndpointUrl.QuoteInternalApprovalQues
          : EndpointUrl.QuoteApproveForms,
        headers: {},
      };
      triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            if (approvalInputData && approvalInputData.eventFrom === "quote") {
              sendModelData({ success: true });
            } else {
              setServerMsg(null);
              setToastMsg("Updated Successfully");
              setSnackbar(true);
            }
          } else {
            setServerMsg(response.result.data);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  }

  function closeModel() {
    sendModelData({ close: true });
  }
  return (
    <>
      {/* <PiSideDrawer isOpen={openModel} width="medium"> */}
      <SideDrawerContainer style={{ width: "100%" }}>
        {!displayFields && (
          <SideDrawerHeader>
            <PiTypography component="h3">{approvalName}</PiTypography>
            {approvalInputData && approvalInputData.eventFrom === "quote" && (
              <CloseButton
                onClick={() => closeModel()}
                title="close"
                className="Hover"
              >
                <img src={CrossLogo} alt="loading" />
              </CloseButton>
            )}
          </SideDrawerHeader>
        )}
        {loading && (
          <SpinnerDiv style={{ height: "100%" }}>
            <PiSpinner color="primary" size={50} libraryType="atalskit" />
          </SpinnerDiv>
        )}
        {!loading && (
          <Formik
            validationSchema={ApprovalTwentykValidationsSchema}
            onSubmit={(e: any) => handleSubmit(e)}
            initialValues={initialValues}
            innerRef={(e: any) => handleRef(e)}
          >
            {({ ...formikProps }: any) => (
              <>
                <FormBodyOverFlow>
                  <FilterFieldsContainer
                    className={
                      approvalInputData &&
                      approvalInputData.eventFrom === "quote"
                        ? "width"
                        : "full-width"
                    }
                  >
                    <div>
                      <PiSelectForm
                        label="Timeline"
                        libraryType="atalskit"
                        name="timeline"
                        placeholder="Select"
                        options={timeLineList}
                        classNamePrefix="react-select"
                        // isMulti
                        isDisabled={!permissionObject.Edit}
                        isMandatory
                      />
                    </div>

                    <div>
                      <PiTextareaForm
                        label="Pain"
                        name="pain"
                        maxLength={200}
                        placeholder="Enter Pain"
                        // value={initialValues.pain}
                        isDisabled={!permissionObject.Edit}
                        isMandatory
                      />
                    </div>
                    <div>
                      <PiTextareaForm
                        label="Decision Making Process"
                        name="decision_making_process"
                        maxLength={200}
                        placeholder="Enter Decision Making Process"
                        // value={initialValues.decision_making_process}
                        isDisabled={!permissionObject.Edit}
                        isMandatory
                      />
                    </div>

                    <DateRangePickerDiv
                      style={{ width: "100%" }}
                      // className="dt-pkr-bg-unset"
                      className={
                        permissionObject.Edit === false
                          ? "dt-pkr-bg-unset"
                          : "dt-pkr-bg-unset"
                      }
                    >
                      {/* <AsyncLabel htmlFor="async-select-example">
                            PO-Date
                          </AsyncLabel> */}
                      <PiDatepickerForm
                        libraryType="atalskit"
                        name="delivery_due_date"
                        label="PO-Date"
                        minDate={TodayDate}
                        placeholder="MM/DD/YYYY"
                        // onChange={() => {}}
                        isDisabled={!permissionObject.Edit}
                        isMandatory
                      />
                    </DateRangePickerDiv>
                  </FilterFieldsContainer>
                </FormBodyOverFlow>
                <SideDrawerFooter
                  style={approvalInputData ? { marginBottom: "60px" } : {}}
                >
                  {serverMsg && <div className="server-msg">{serverMsg}</div>}
                  {window.location.pathname !== "/quote-approval" &&
                    !displayFields && (
                      <div className="Decline">
                        <button type="button" onClick={decline}>
                          Decline
                        </button>
                      </div>
                    )}
                  <PiButton
                    appearance="primary"
                    label={displayFields ? "Save" : "Approve"}
                    libraryType="atalskit"
                    onClick={formikProps.handleSubmit}
                    isDisabled={!permissionObject.Edit}
                  />
                </SideDrawerFooter>
              </>
            )}
          </Formik>
        )}
      </SideDrawerContainer>
      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel={toastMsg}
        message=""
        onClose={async () => setSnackbar(false)}
      />
      {/* </PiSideDrawer> */}
    </>
  );
}

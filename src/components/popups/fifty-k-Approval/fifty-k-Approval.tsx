import {
  PiButton,
  PiRadioGroup,
  PiSpinner,
  PiTextareaForm,
  PiToast,
  PiTypography,
} from "pixel-kit";
import { useEffect, useRef, useState } from "react";
import { Formik, Field } from "formik";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import FilterFieldsContainer from "@app/components/Repair-Components/repair-list-filter/repair-list.component";
import { SideDrawerFooter } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import { AsyncLabel } from "@app/components/rmaModel/RmaModel.component";
import { getQuoteApprovalFormData } from "@app/components/Quote-components/quotes-helper";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import CrossLogo from "@app/assets/images/cross.svg";
import { getPermissionObject } from "@app/helpers/componentHelpers";

export default function FiftykApproval({
  displayFields,
  approvalInputData,
  sendModelData,
}: any) {
  const approvalName = "$ 50k+ Approve Questions";

  const [loading, setLoading] = useState(true);
  const formik = useRef<any>(null);
  const [openSnackbar, setSnackbar] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [serverMsg, setServerMsg] = useState(null);
  const [approvalFormDataById, setApprovalFormDataById]: any = useState();

  const [initialValues, setInitialValues] = useState({
    last_Look: "no",
    current_customer: "no",
    special_Pricing: "no",
    programming_needed: "no",
    reasons: "",
  });
  const [permissionObject, setpermissionObject] = useState<any>({});

  const lastLook = [
    {
      label: "Yes",
      value: "yes",
      //  checked: true,
    },
    {
      label: "No",
      value: "no",
      // checked: false,
    },
  ];

  useEffect(() => {
    (async () => {
      const data: any = await getQuoteApprovalFormData(
        "50k_quote_approval",
        approvalInputData
      );
      setApprovalFormDataById(data);
      if (
        data &&
        approvalInputData &&
        approvalInputData.eventFrom === "quote"
      ) {
        if (displayFields && displayFields.values) {
          initialValues.last_Look = displayFields.values.last_Look;
          initialValues.current_customer =
            displayFields.values.current_customer;
          initialValues.special_Pricing = displayFields.values.special_Pricing;
          initialValues.programming_needed =
            displayFields.values.programming_needed;
          initialValues.reasons = displayFields.values.reasons;
          setInitialValues(initialValues);
        }

        setLoading(false);
      } else if (data && !approvalInputData) {
        if (data && data.values) {
          initialValues.last_Look = data.values.last_Look;
          initialValues.current_customer = data.values.current_customer;
          initialValues.special_Pricing = data.values.special_Pricing;
          initialValues.programming_needed = data.values.programming_needed;
          initialValues.reasons = data.values.reasons;
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
      console.log(data);
    })();
  }, [displayFields, initialValues]);

  const selecPicked = (e: any) => {
    formik.current.setFieldValue("last_Look", e.target.value);
    // initialValues['last_Look'] = e.target.value
    // setInitialValues(initialValues)
  };
  const selectcurrent = (e: any) => {
    formik.current.setFieldValue("current_customer", e.target.value);
    // initialValues['current_customer'] = e.target.value
    // setInitialValues(initialValues)
  };
  const selectPricing = (e: any) => {
    formik.current.setFieldValue("special_Pricing", e.target.value);
    // initialValues['special_Pricing'] = e.target.value
    // setInitialValues(initialValues)
  };
  const selectProgramming = (e: any) => {
    formik.current.setFieldValue("programming_needed", e.target.value);
    // initialValues['programming_needed'] = e.target.value
    // setInitialValues(initialValues)
  };
  function handleRef(e: any) {
    // console.log(e)
    formik.current = e;
  }
  function submit50kApproval(data: any, type: string) {
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
      submit50kApproval(approvalFormDataById.values, "declined");
    }
  }
  function handleSubmit(data: any) {
    console.log(data.budgetry_amount, approvalInputData);
    if (approvalInputData && approvalInputData.eventFrom === "quote") {
      submit50kApproval(data, "approved");
    } else {
      const param = {
        values: data,
        code: "50k_quote_approval",
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
            setServerMsg(null);
            setToastMsg("Updated Successfully");
            setSnackbar(true);
            if (approvalInputData && approvalInputData.eventFrom === "quote") {
              sendModelData({ success: true });
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
            validationSchema={null}
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
                    <div className="current">
                      <div style={{ width: "50%" }}>
                        <AsyncLabel
                          htmlFor="async-select-example"
                          className="css-re7y6x"
                        >
                          Last Look
                        </AsyncLabel>
                        <Field name="last_Look">
                          {({ field }: any) => (
                            <PiRadioGroup
                              libraryType="atalskit"
                              name="last_Look"
                              onChange={selecPicked}
                              options={lastLook}
                              // isChecked={lastLook ? true : false}
                              value={field.value}
                              isDisabled={!permissionObject.Edit}
                            />
                          )}
                        </Field>
                      </div>
                      <div style={{ width: "50%" }}>
                        <AsyncLabel
                          htmlFor="async-select-example"
                          className="css-re7y6x"
                        >
                          Current Customer
                        </AsyncLabel>
                        <Field name="current_customer">
                          {({ field }: any) => (
                            <PiRadioGroup
                              libraryType="atalskit"
                              name="current_customer"
                              onChange={selectcurrent}
                              options={[
                                {
                                  label: "Yes",
                                  value: "yes",
                                },
                                {
                                  label: "No",
                                  value: "no",
                                },
                              ]}
                              value={field.value}
                              isDisabled={!permissionObject.Edit}
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                    <div className="pricings">
                      <div style={{ width: "50%" }}>
                        <AsyncLabel
                          htmlFor="async-select-example"
                          className="css-re7y6x"
                        >
                          Non Standard Pricing
                        </AsyncLabel>
                        <Field name="special_Pricing">
                          {({ field }: any) => (
                            <PiRadioGroup
                              libraryType="atalskit"
                              name="special_Pricing"
                              onChange={selectPricing}
                              options={[
                                {
                                  label: "Yes",
                                  value: "yes",
                                },
                                {
                                  label: "No",
                                  value: "no",
                                },
                              ]}
                              value={field.value}
                              isDisabled={!permissionObject.Edit}
                            />
                          )}
                        </Field>
                      </div>
                      <div style={{ width: "50%" }}>
                        <AsyncLabel
                          htmlFor="async-select-example"
                          className="css-re7y6x"
                        >
                          Programming Needed
                        </AsyncLabel>
                        <Field name="programming_needed">
                          {({ field }: any) => (
                            <PiRadioGroup
                              libraryType="atalskit"
                              name="programming_needed"
                              onChange={selectProgramming}
                              options={[
                                {
                                  label: "Yes",
                                  value: "yes",
                                },
                                {
                                  label: "No",
                                  value: "no",
                                },
                              ]}
                              value={field.value}
                              isDisabled={!permissionObject.Edit}
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                    <div>
                      <PiTextareaForm
                        name="reasons"
                        label="Reasons"
                        libraryType="atalskit"
                        placeholder="Enter Reasons"
                        maxLength={255}
                        isDisabled={!permissionObject.Edit}
                      />
                    </div>
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
    </>
  );
}

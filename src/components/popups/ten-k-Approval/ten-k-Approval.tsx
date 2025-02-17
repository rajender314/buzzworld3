import {
  PiButton,
  PiIconInputForm,
  PiInputForm,
  PiSelectForm,
  PiSpinner,
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
import ApprovalTenkValidationsSchema from "@app/modules/adminModules/quoteApproval/validation/Tenk-Approval-validations-schema";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import { getQuoteApprovalFormData } from "@app/components/Quote-components/quotes-helper";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import CrossLogo from "@app/assets/images/cross.svg";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import { getPermissionObject } from "@app/helpers/componentHelpers";

export default function TenkApproval({
  displayFields,
  approvalInputData,
  sendModelData,
}: any) {
  const approvalName = "$ 10k+ Approve Questions";
  const [serverMsg, setServerMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    budgetry_type: "",
    budgetry_amount: "",
    key_decision_maker: "",
    competitions: "",
  });
  const [budgetryList, setBudgetryList] = useState([]);
  const [openSnackbar, setSnackbar] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const formik = useRef<any>(null);
  const [approvalFormDataById, setApprovalFormDataById]: any = useState();
  const [permissionObject, setpermissionObject] = useState<any>({});

  useEffect(() => {
    (async () => {
      const data: any = await getQuoteApprovalFormData(
        "10k_quote_approval",
        approvalInputData
      );
      console.log(0);
      setApprovalFormDataById(data);
      if (
        approvalInputData &&
        approvalInputData.eventFrom === "quote" &&
        approvalInputData.quoteInfo
      ) {
        initialValues.key_decision_maker = approvalInputData.quoteInfo
          .quote_requested_by
          ? approvalInputData.quoteInfo.quote_requested_by.label
          : "";
      }
      if (
        data &&
        approvalInputData &&
        approvalInputData.eventFrom === "quote"
      ) {
        console.log(displayFields);
        setBudgetryList(data.dropdowns.type);
        if (displayFields && displayFields.values) {
          initialValues.budgetry_amount = displayFields.values.budgetry_amount;
          initialValues.budgetry_type = displayFields.values.budgetry_type;
          initialValues.key_decision_maker =
            displayFields.values.key_decision_maker;
          initialValues.competitions = displayFields.values.competitions;
          setInitialValues(initialValues);
        }

        setLoading(false);
      } else if (data && !approvalInputData) {
        setBudgetryList(data.dropdowns.type);
        if (data && data.values) {
          initialValues.budgetry_amount = data.values.budgetry_amount;
          initialValues.budgetry_type = data.values.budgetry_type;
          initialValues.key_decision_maker = data.values.key_decision_maker;
          initialValues.competitions = data.values.competitions;
          setInitialValues(initialValues);
        }

        setLoading(false);
      }
      if (window.location.pathname.substring(1) === "quote-approval") {
        const permission = await getPermissionObject(
          window.location.pathname.substring(1)
        );
        setpermissionObject(permission);
      } else if (window.location.pathname.substring(1) !== "quote-approval") {
        const permission = await getPermissionObject("quote_for_parts");
        setpermissionObject(permission);
      }
    })();
  }, [displayFields, initialValues]);
  function handleRef(e: any) {
    formik.current = e;
  }
  function submit10kApproval(data: any, type: string) {
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
      submit10kApproval(approvalFormDataById.values, "declined");
    }
  }
  function handleSubmit(data: any) {
    console.log(data, approvalFormDataById);
    if (approvalInputData && approvalInputData.eventFrom === "quote") {
      submit10kApproval(data, "approved");
    } else {
      const param = {
        values: data,
        code: "10k_quote_approval",
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
  const onKeyDown = (e: any) => {
    console.log(e.target.value);

    const number = e.target.value.split(".");
    if (number[1] && number[1].length > 2) {
      e.preventDefault();
      e.stopPropagation();
      console.log(e.target.value);
    }
  };
  return (
    <>
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
            validationSchema={ApprovalTenkValidationsSchema}
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
                        label="Type"
                        libraryType="atalskit"
                        name="budgetry_type"
                        placeholder="Type"
                        options={budgetryList}
                        classNamePrefix="react-select"
                        // isMulti
                        isDisabled={!permissionObject.Edit}
                        isMandatory
                      />
                    </div>

                    <div>
                      <PiInputForm
                        name="competitions"
                        label="Competition"
                        placeholder="Enter Competition"
                        value="competitions"
                        onKeyPress={onKeyDown}
                        isDisabled={!permissionObject.Edit}
                        isMandatory
                      />
                    </div>
                    <div className="icon_input">
                      {/* <PiInputForm
                            name="budgetry_amount"
                            label="Budgetary Amount"
                            placeholder="Budgetary Amount"
                            value={'amount'}
                          /> */}
                      {/* <AsyncLabel htmlFor="async-select-example">
                            Buy Price
                          </AsyncLabel>
                          <Field label="After input" name="budgetry_amount">
                            {({  form, meta }: any) => (
                              <Fragment>
                                <Textfield
                                  name="budgetry_amount"
                                  value={formik.values.budgetry_amount}
                                  elemAfterInput={
                                    <div style={{ marginRight: '10px' }}>$</div>
                                  }
                                  onChange={(e: any) =>
                                    form.setFieldValue(
                                      'budgetry_amount',
                                      e.target.value,
                                    )
                                  }
                                  className="icon-field"
                                />
                                <small className="validation-error">
                                  {meta.touched && meta.error ? meta.error : ''}
                                </small>
                              </Fragment>
                            )}
                          </Field> */}

                      <PiIconInputForm
                        className="gap-10"
                        name="budgetry_amount"
                        label="Budgetary Amount"
                        placeholder="Enter Budgetary Amount"
                        value="amount"
                        maxLength={10}
                        type="string"
                        elemBeforeInput={
                          <div
                            style={{
                              padding: "10px",
                              color: "#6D7992",
                              borderRight: "1px solid #d0d1d3",
                            }}
                          >
                            $
                          </div>
                        }
                        onKeyDown={onKeyDown}
                        isDisabled={!permissionObject.Edit}
                        isMandatory
                      />
                    </div>
                    <div>
                      <PiInputForm
                        name="key_decision_maker"
                        label="Key Decision Maker"
                        value="decision"
                        placeholder="Enter Key Decision Maker"
                        isDisabled={!permissionObject.Edit}
                        isMandatory
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

/* eslint-disable react/no-unstable-nested-components */
import {
  PiTypography,
  PiSpinner,
  PiButton,
  PiCheckbox,
  PiEditor,
  PiToast,
  PiInputForm,
} from "pixel-kit";
import { useCallback, useEffect, useRef, useState } from "react";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import {
  ImgTag,
  SpinnerDiv,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import {
  AsyncSelectDiv,
  SideDrawerFooter,
} from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import CrossLogo from "@app/assets/images/cross.svg";
import { Formik, Field } from "formik";
import { useParams } from "react-router-dom";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";
import { triggerApi } from "@app/services";
import { ApiResponse, FilterColumnProps } from "@app/services/schema/schema";
import { EditorContainer } from "@app/components/RepairNotes/repair-notes.component";
import _ from "lodash";
import { ReactMultiEmail } from "react-multi-email";
import "react-multi-email/style.css";
import { AsyncLabel } from "@app/components/rmaModel/RmaModel.component";
import { AsyncCreatableSelect } from "@atlaskit/select";
import AddLogo from "@app/assets/images/spPlusIcon.svg";
import {
  AddNewEmailContainer,
  FieldContainer,
  OptionsContainer,
} from "./client-approval-form.component";

export default function ClientApprovalForm({
  quoteInfo,
  approvalInputData,
  sendModelData,
  isSendQuoteAgain,
}: any) {
  const { id }: RouteParams = useParams();
  const [loading, setLoading] = useState(true);
  const [serverMsg, setServerMsg] = useState(null);
  const formik = useRef<any>(null);
  const [openSnackbar, setSnackbar] = useState(false);
  const [isCCMailValid, setIsCCMailValid] = useState(true);
  const toastMsg = "";
  const [opacity, setOpacity] = useState(false);
  const emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const initialValues = {
    to_email: quoteInfo.quote_requested_by.email
      ? [
          {
            value: quoteInfo.quote_requested_by.value,
            label: quoteInfo.quote_requested_by.email,
          },
        ]
      : [],
    cc_email: "",
    quote_mail_subject: quoteInfo.quote_mail_subject,
  };
  const [optionsList, setOptionsList]: any = useState([]);
  const { current }: any = useRef({ timer: 0 });
  const [cCEmailused, setCCEmailused]: any = useState([]);
  const [selectedIds, setSelectedIds]: any = useState([]);
  const [toEmailValidMsg, setToEmailValidMsg] = useState("");
  const [notes, setNotes] = useState(quoteInfo.quote_mail_notes);
  const [emailList, setEmailList]: any = useState(
    quoteInfo.quote_requested_by.email
      ? [
          {
            value: quoteInfo.quote_requested_by.value,
            label: quoteInfo.quote_requested_by.email,
          },
        ]
      : []
  );
  const getOptions = useCallback(() => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteOptions}?quote_id=${id}&type=${"print"}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: any) => {
        if (response.result.success) {
          const { data } = response.result;
          let arr = [];
          arr = data.map((item: FilterColumnProps) => ({
            value: item.id,
            label: item.name,
            ...item,
          }));
          if (arr.length === 1) {
            selectedIds.push(arr[0].id);
          }
          setOptionsList(arr);
          setLoading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }, [id]);
  useEffect(() => {
    getOptions();
    if (quoteInfo.owner_email) {
      setCCEmailused([quoteInfo.owner_email]);
    } else {
      setCCEmailused([]);
    }
  }, [getOptions, quoteInfo.owner_email]);
  function handleRef(e: any) {
    formik.current = e;
  }
  function closeModel() {
    sendModelData({ close: true });
  }
  function handleSubmit(data: any) {
    if (data.to_email.length === 0) {
      setToEmailValidMsg("Please Select Email");
    }
    if (
      optionsList.length > 1 &&
      (selectedIds.length === 0 || !isCCMailValid)
    ) {
      return;
    }
    if (data && data.to_email && data.to_email.length !== 0) {
      setOpacity(true);
      const params = {
        type: "submit_for_client_approval",
        option_ids: selectedIds,
        to_emails: data.to_email,
        quote_mail_subject: data.quote_mail_subject,
        cc_emails: cCEmailused,
        quote_mail_notes: notes,
        is_submit_quote_again: isSendQuoteAgain,
      };
      if (isSendQuoteAgain) {
        params.is_submit_quote_again = isSendQuoteAgain;
      }
      const apiObject = {
        payload: params,
        method: "PUT",
        apiUrl: `${EndpointUrl.SubmitClientApprovalApi}/${id}`,
        headers: {},
      };
      triggerApi(apiObject)
        .then(async (response: any) => {
          if (response.result.success) {
            setServerMsg(null);
            setOpacity(false);
            sendModelData({ success: true });
          } else {
            setServerMsg(response.result.data);
            setOpacity(false);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  }

  const onNcrChanged = (e: any, option: any) => {
    if (e.target.checked) {
      selectedIds.push(option.id);
    } else {
      const indx = _.findIndex(selectedIds, { id: option.id });
      selectedIds.splice(indx, 1);
    }
    setSelectedIds(selectedIds);
    console.log(selectedIds);
    formik.current.setFieldValue("selectedOptions", selectedIds);
  };
  const onChangeItemNotes = (e: any) => {
    setNotes(e);
  };
  const onCCEmailChange = (_emails: string[]) => {
    setCCEmailused(_emails);
  };

  const ccEmailValidate = (email: string) => {
    if (email.trim() && email.match(emailRegEx)) {
      setIsCCMailValid(true);
      return true;
    }
    setIsCCMailValid(false);
    return false;
  };
  const filterVendorData = async (inputValue: string) => {
    let data: any;
    if (inputValue.length >= 3) {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.contactList}?search=${inputValue.trim()}&sort=asc`,
        headers: {},
      };
      await triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            let arr = [];
            const list = response.result.data.list
              ? response.result.data.list
              : response.result.data;
            arr = list.map((item: any) => ({
              value: item.primary_email ? item.id : null,
              label: item.primary_email,
              // ...item,
            }));
            arr = arr.filter((item: any) => item.value);
            data = arr;
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
      return data;
    }
    return data;
  };
  const promiseOptions = (inputValue: string) =>
    new Promise((resolve) => {
      if (inputValue.length >= 3) {
        if (current.timer) clearTimeout(current.timer);
        current.timer = setTimeout(() => {
          resolve(filterVendorData(inputValue));
        }, 1000);
      }
    });
  const handleInputChange = (newValue: string) => {
    if (newValue.length >= 3) {
      return newValue;
    }
    return newValue;
  };
  const HandleChange = (form: any, fieldLabel: any, value: any) => {
    if (value.length) {
      form.setFieldValue(fieldLabel, value);
    } else {
      form.setFieldValue(fieldLabel, []);
    }
    setEmailList(value);
    let list = [];
    if (emailList.length) {
      list = [...emailList, ...value];
    } else {
      list = [...value];
    }
    setEmailList(list);
  };

  return (
    <>
      {/* <PiSideDrawer isOpen={openModel} width="medium"> */}
      <SideDrawerContainer>
        <SideDrawerHeader>
          <PiTypography component="h3">
            Submit for Customer Approval
          </PiTypography>
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
                <FormBodyOverFlow
                  style={{ padding: "0 25px", height: "100%" }}
                  className={opacity ? "opacity-on-load" : ""}
                >
                  {opacity && (
                    <SpinnerDiv style={{ position: "absolute", left: "50%" }}>
                      <PiSpinner
                        color="primary"
                        size={50}
                        libraryType="atalskit"
                      />
                    </SpinnerDiv>
                  )}
                  {optionsList.length > 1 && (
                    <>
                      <p className="client-options-list">Sharing Options</p>
                      <OptionsContainer>
                        {optionsList.length > 0 &&
                          optionsList.map((option: any) => (
                            <div className="padding checkbox-form-field">
                              <Field name="supplier">
                                {({ field }: any) => (
                                  <PiCheckbox
                                    helpText=""
                                    isChecked={field.value}
                                    label={`${option.label} (${option.total_price})`}
                                    libraryType="atalskit"
                                    name={option.id}
                                    // value={field.value}
                                    onChange={(e: any) =>
                                      onNcrChanged(e, option)
                                    }
                                    size="medium"
                                  />
                                )}
                              </Field>
                            </div>
                          ))}
                      </OptionsContainer>
                      {formikProps.isSubmitting === true &&
                        selectedIds.length === 0 && (
                          <small className="validation-error">
                            Please select atleast one option
                          </small>
                        )}
                    </>
                  )}

                  <FieldContainer>
                    {/* <PiInputForm
                        name={`to_email`}
                        label="To:"
                        placeholder="To"
                      /> */}
                    {/* <PiTypography component="label">To:</PiTypography> */}
                    {/* <ReactMultiEmail
                        placeholder="To"
                        emails={toEmailused}
                        onChange={onEmailChange}
                        validateEmail={emailValidate}
                        getLabel={(
                          email: string,
                          index: number,
                          removeEmail: (index: number) => void,
                        ) => {
                          return (
                            <div data-tag key={index}>
                              {email}
                              <span
                                data-tag-handle
                                onClick={() => removeEmail(index)}
                              >
                                ×
                              </span>
                            </div>
                          )
                        }}
                      /> */}
                    <Field name="to_email">
                      {({ field, form }: any) => (
                        <AsyncSelectDiv className="pi-select-wrapper">
                          <AsyncLabel
                            htmlFor="async-select-example"
                            className="css-re7y6x"
                          >
                            To
                            <span
                              className="mandatory-star"
                              style={{
                                color: "red",
                                paddingLeft: "4px",
                              }}
                            >
                              *
                            </span>
                          </AsyncLabel>
                          <AsyncCreatableSelect
                            name="to_email"
                            inputId="async-select-example"
                            classNamePrefix={
                              field.value && field.value.length > 0
                                ? "drop-height-80px multi-select react-select"
                                : "react-select"
                            }
                            onInputChange={handleInputChange}
                            loadOptions={promiseOptions}
                            placeholder="Search"
                            onChange={(value, action: any) => {
                              // eslint-disable-next-line no-underscore-dangle
                              if (action.option && action.option.__isNew__) {
                                if (
                                  action.option.label.trim() &&
                                  action.option.label.match(emailRegEx)
                                ) {
                                  setToEmailValidMsg("");
                                  form.setFieldValue("to_email", value);
                                  HandleChange(form, "to_email", value);
                                } else {
                                  setToEmailValidMsg(
                                    "Please enter Valid Email"
                                  );
                                }
                              } else {
                                setToEmailValidMsg("");
                                form.setFieldValue("to_email", value);
                                HandleChange(form, "to_email", value);
                              }
                            }}
                            value={field.value}
                            isClearable={false}
                            noOptionsMessage={(obj: any) =>
                              obj.inputValue
                                ? "Contacts Not Found"
                                : "Search Contact"
                            }
                            isMulti
                            // formatCreateLabel={(e: any) => {
                            //   return (
                            //     <AddNewEmailContainer className="Button-Icon-Display">
                            //       <ImgTag
                            //         src={AddLogo}
                            //         alt="loading"
                            //         className="add-icon"
                            //       />
                            //       <span className="email_text">
                            //         <span>Add this Email? </span>
                            //         {e}
                            //       </span>
                            //     </AddNewEmailContainer>
                            //   );
                            // }}
                            formatCreateLabel={(e: any) => (
                              <AddNewEmailContainer className="Button-Icon-Display">
                                <ImgTag
                                  src={AddLogo}
                                  alt="loading"
                                  className="add-icon"
                                />
                                <span className="email_text">
                                  <span>Add this Email? </span>
                                  {e}
                                </span>
                              </AddNewEmailContainer>
                            )}
                            tabSelectsValue
                          />
                          <small className="validation-error">
                            {toEmailValidMsg}
                          </small>
                        </AsyncSelectDiv>
                      )}
                    </Field>
                  </FieldContainer>
                  {/* <div className="each-div">
                      <PiInputForm
                        name={`cc_email`}
                        label="Cc:"
                        placeholder="Cc"
                      />
                    </div> */}
                  <FieldContainer>
                    <PiTypography component="label">CC:</PiTypography>
                    <ReactMultiEmail
                      placeholder="CC"
                      emails={cCEmailused}
                      onChange={onCCEmailChange}
                      validateEmail={ccEmailValidate}
                      getLabel={(
                        email: string,
                        index: number,
                        removeEmail: any
                      ) => (
                        <div data-tag key={index}>
                          {email}
                          <span
                            data-tag-handle
                            onClick={() => removeEmail(index)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                removeEmail(index);
                              }
                            }}
                            role="button"
                            tabIndex={0}
                          >
                            ×
                          </span>
                        </div>
                      )}
                    />
                    {!isCCMailValid && (
                      <small className="validation-error">
                        Please enter valid Email
                      </small>
                    )}
                  </FieldContainer>
                  <FieldContainer>
                    <PiInputForm
                      name="quote_mail_subject"
                      label="Subject"
                      placeholder="Subject"
                      isDisabled={opacity}
                      // value={'competitions'}
                    />
                    {/* {!isCCMailValid && (
                        <small className="validation-error">
                          Please enter valid Email
                        </small>
                      )} */}
                  </FieldContainer>
                  <EditorContainer className="item-specific-notes">
                    <AsyncLabel htmlFor="async-select-example">Body</AsyncLabel>
                    <PiEditor
                      libraryType="atalskit"
                      onChange={onChangeItemNotes}
                      value={notes}
                    />
                  </EditorContainer>
                </FormBodyOverFlow>
                <SideDrawerFooter>
                  {serverMsg && <div className="server-msg">{serverMsg}</div>}

                  <PiButton
                    appearance="primary"
                    label="Submit"
                    libraryType="atalskit"
                    onClick={formikProps.handleSubmit}
                    isLoading={opacity}
                    isDisabled={opacity}
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

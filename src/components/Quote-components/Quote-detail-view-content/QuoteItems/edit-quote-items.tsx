/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-unstable-nested-components */
import {
  PiSideDrawer,
  PiTypography,
  PiSpinner,
  PiButton,
  PiInputForm,
  PiSelectForm,
  PiTextareaForm,
  PiCheckbox,
  PiIconInputForm,
  PiRadioForm,
  PiTooltip,
  PiEditor,
} from "pixel-kit";
import { useCallback, useEffect, useRef, useState } from "react";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import {
  AsyncSelectDiv,
  SideDrawerFooter,
} from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import {
  AsyncLabel,
  CmpanyOptionDiv,
  RmaFields,
  SideDrawerW40,
} from "@app/components/rmaModel/RmaModel.component";
import CrossLogo from "@app/assets/images/cross.svg";
import { Formik, Field } from "formik";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse, FilterColumnProps } from "@app/services/schema/schema";
import QuotesImg from "@app/assets/images/quotes.svg";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import PastInvoices from "@app/assets/images/email_invoices.svg";
import Popup from "@atlaskit/popup";
import { AsyncSelect } from "@atlaskit/select";
import PastRepairInvoices from "@app/components/Quote-components/quote-list/past-repair-invoices";
import { InlineModelContainer } from "../QuoteInformation/quote-info.component";
import {
  QuoteItemValidationSchema,
  QuoteItemValidationSchema2,
} from "./quote-item-validation";
import { QuotePopupHeaderContainer } from "../../Forms/PartQuote/part-quote.component";

export default function EditQuoteItems({
  quoteDetails,
  quoteInfo,
  sendModelData,
}: any) {
  const [openModel, setOpenModel] = useState(false);
  const [serverMsg, setServerMsg]: any = useState(null);
  const [loading, setLoading] = useState(true);
  const [partDataById, setQuoteDataById]: any = useState();
  const formik = useRef<any>(null);
  const [initialValues, setInitialValues]: any = useState({});
  const { current }: any = useRef({ timer: 0 });
  const [selectedLeadTime, setSelectedLeadTime] = useState();
  const [selectedLeadTimeValue, setSelectedLeadTimeValue] = useState();
  const [leadTimeType, setLeadTimeType] = useState("");
  const [quoteSourceOptions, setQuoteSourceOptions] = useState([]);
  const [quoteLeadTime, setQuoteLeadTime] = useState([]);
  const [isDisableGpDiscount, setIsDisableGpDiscount] = useState(true);
  const [permissionObject, setpermissionObject] = useState<any>({});
  const [notes, setNotes] = useState("");
  const [showExpediteFee, setExpediteFee] = useState(false);
  const [openPastInvoiceData, setPastInvoiceData] = useState<boolean>(false);

  const onChangeSuggedted = () => {
    if (current.timer) clearTimeout(current.timer);
    current.timer = setTimeout(() => {
      if (
        (formik.current &&
          (formik.current.values.iidm_cost === "" ||
            formik.current.values.quote_price === "")) ||
        (partDataById && partDataById.sp)
      ) {
        setIsDisableGpDiscount(true);
        // formik.current.setFieldValue(`discount`, '0')
        // formik.current.setFieldValue(`gp`, '0')
      } else {
        setIsDisableGpDiscount(false);
      }
    }, 1000);
  };
  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("edit_iidm_cost");
      setpermissionObject(permission);
    })();
  }, []);
  const onKeyValueChanges = (value: string, type: string) => {
    // if(!formik.current.values.suggested_price) {
    //  formik.current.handleSubmit();
    // }
    formik.current.validateForm();
    // if (!formik.current.isValid) {
    //  return
    // }
    setServerMsg(null);
    if (
      // partDataById.is_custom &&
      formik.current &&
      (formik.current.values.iidm_cost === "0" ||
        !formik.current.values.iidm_cost)
    ) {
      // setServerMsg('Enter Suggested Price and IIDM Cost')
      return;
    }
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteGP}?type=${type}&item_id=${partDataById.id}&value=${value}&suggested_price=${formik.current.values.suggested_price}&iidm_cost=${formik.current.values.iidm_cost}&quote_price=${formik.current.values.quote_price}&list_price=${formik.current.values.list_price}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response && response.result.success) {
          setServerMsg(null);
          const { data } = response.result;
          formik.current.setFieldValue("discount", data.discount);
          formik.current.setFieldValue("gp", data.gp);
          formik.current.setFieldValue(
            "quote_price",
            data.quote_price
              ? data.quote_price.toString()
              : partDataById.quote_price
          );
          formik.current.setFieldValue(
            "expedite_fee",
            data.expedite_fee
              ? data.expedite_fee.toString()
              : partDataById.quote_price
          );
        } else {
          setServerMsg(response.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const getQuoteSourceOptions = useCallback(() => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteSourceOptions}?sort=asc&is_dropdown=true`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          setQuoteSourceOptions(data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }, []);
  const getQuoteLeadTimeOptions = useCallback(() => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteLeadTimeOptions}?sort=asc&is_dropdown=true`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          setQuoteLeadTime(data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }, []);
  function getDataById(id: string) {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteItems}/${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          setExpediteFee(!!(data.expedite && data.expedite !== "none"));
          setQuoteDataById(data);
          setInitialValues({ ...data });
          setLeadTimeType(data.lead_time.label);
          setSelectedLeadTime(data.lead_time_value);
          setSelectedLeadTimeValue(data.lead_time_value);
          setLoading(false);
          setNotes(data.notes);
          onChangeSuggedted();
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setOpenModel(true);
    setLoading(true);
    // console.log(quoteInfo)
    getDataById(quoteInfo.repairItemId);
    getQuoteSourceOptions();
    getQuoteLeadTimeOptions();
  }, [quoteInfo, getQuoteSourceOptions, getQuoteLeadTimeOptions]);
  function closeModel() {
    setOpenModel(false);
    sendModelData({ close: true });
  }
  function handleSubmit(data: any) {
    console.log(data);
    // if(data.expedite && data.expedite === 'none') {
    //   data.expedite = ''
    // }
    setPastInvoiceData(false);
    const params = {
      ...data,
      notes,
    };
    params.description = params.description.trim();

    const apiObject = {
      payload: params,
      method: "PUT",
      apiUrl: `${EndpointUrl.QuoteItems}/${data.id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setServerMsg(null);
          setOpenModel(false);
          sendModelData({ success: true });
        } else {
          setServerMsg(response.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  function handleRef(e: any) {
    console.log(e);
    formik.current = e;
  }
  function quantityChange(e: any) {
    const extPrice = formik.current.values.quote_price * e.target.value;
    formik.current.setFieldValue("ext_price", extPrice);
  }
  function quoteChange(e: any, type: string) {
    const quantity = formik.current.values.quantity * e.target.value;
    formik.current.setFieldValue("ext_price", quantity);
    if (current.timer) clearTimeout(current.timer);
    current.timer = setTimeout(() => {
      onKeyValueChanges(e.target.value, type);
    }, 1000);
  }

  const onChangeLeadTime = (e: any, action: any) => {
    console.log(e, action);
    setSelectedLeadTime(e);
    setLeadTimeType(e.label);
    if (e.label === "TBD") {
      formik.current.setFieldValue("lead_time_value", "");
    } else if (initialValues.lead_time.label === e.label) {
      formik.current.setFieldValue("lead_time_value", selectedLeadTimeValue);
    } else {
      formik.current.setFieldValue("lead_time_value", "");
    }
  };

  const onNcrChanged = (e: any) => {
    formik.current.setFieldValue("ncnr", e.target.checked);
  };
  const onChangeItemNotes = (e: any) => {
    setNotes(e);
    // setNotes(e)
  };
  const onKeyGPChanges = (value: string, type: string) => {
    if (current.timer) clearTimeout(current.timer);
    current.timer = setTimeout(() => {
      onKeyValueChanges(value, type);
    }, 1000);
  };
  const onKeyDiscountChanges = (value: string, type: string) => {
    if (current.timer) clearTimeout(current.timer);
    current.timer = setTimeout(() => {
      onKeyValueChanges(value, type);
    }, 1000);
  };

  const onExpediteChange = (e: any) => {
    console.log(e.target.value);
    // formik.current.set
    if (e.target.value !== "none") {
      setExpediteFee(true);
      onKeyValueChanges(e.target.value, "expedite");
    } else {
      setExpediteFee(false);
    }
  };

  function iidmCostChange(e: any, type: string) {
    // const quantity = formik.current.values.quantity * e.target.value
    // formik.current.setFieldValue(`ext_price`, quantity)
    if (current.timer) clearTimeout(current.timer);
    current.timer = setTimeout(() => {
      onKeyValueChanges(e.target.value, type);
    }, 1000);
  }

  function displayPastInvoice() {
    setPastInvoiceData(true);
  }
  const triggerRepairInvoice = () => {
    setPastInvoiceData(false);
  };

  const filterVendorData = async (inputValue: string) => {
    let data: any = [];
    if (inputValue.length >= 3) {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.QuoteVendors}?search=${inputValue}&type=new`,
        headers: {},
      };
      await triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            let arr = [];
            const list = response.result.data.list
              ? response.result.data.list
              : response.result.data;
            arr = list.map((item: FilterColumnProps) => ({
              value: item.id,
              label: (
                <CmpanyOptionDiv>
                  <div>
                    <div className="cmpny_name">{item.name}</div>
                    <div className="account_no">
                      {item.code ? item.code : "--"}
                    </div>
                  </div>
                </CmpanyOptionDiv>
              ),
              ...item,
            }));
            data = arr;
          }
        })
        .catch(() => {});
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
    if (value) {
      const obj: any = { value: value.value, label: value.name };
      form.setFieldValue(fieldLabel, obj);
      // setCustomerName(obj)
    } else {
      form.setFieldValue(fieldLabel, value);
    }
  };

  const PastRepairInvoicesMemoized = () => (
    <PastRepairInvoices
      quoteInfo={quoteInfo}
      sendEventData={triggerRepairInvoice}
    />
  );

  return (
    <>
      <SideDrawerW40>
        <PiSideDrawer isOpen={openModel} width="narrow">
          <SideDrawerContainer>
            <SideDrawerHeader>
              <QuotePopupHeaderContainer>
                <img src={QuotesImg} alt="loading" />
                <PiTypography component="h3">Edit Quote Item</PiTypography>
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
                validationSchema={
                  !quoteDetails.is_repair
                    ? QuoteItemValidationSchema
                    : QuoteItemValidationSchema2
                }
                onSubmit={(e: any) => handleSubmit(e)}
                initialValues={initialValues}
                innerRef={(e: any) => handleRef(e)}
                validateOnMount
                validateOnBlur={false}
              >
                {({ ...formikProps }: any) => (
                  <>
                    <FormBodyOverFlow style={{ paddingBottom: "10px" }}>
                      <RmaFields>
                        <div className="width-50">
                          <PiInputForm
                            name="part_number"
                            label="Part Number"
                            placeholder="Part Number"
                            isMandatory
                            isDisabled={
                              !(
                                quoteDetails.is_system_quote &&
                                partDataById.is_custom
                              )
                            }
                            maxLength={45}
                          />
                        </div>
                        <div className="width-50">
                          {/* <PiSelectForm
                              name="manufacturer_id"
                              label="Manufacturer"
                              placeholder="Select"
                              isMulti={false}
                              options={[]}
                              classNamePrefix="react-select"
                              isMandatory
                              isDisabled={quoteDetails.is_system_quote && partDataById.is_custom ? false : true}
                            /> */}
                          <Field name="manufacturer_id">
                            {({ field, form, meta }: any) => (
                              <AsyncSelectDiv>
                                <AsyncLabel
                                  htmlFor="async-select-example"
                                  className="css-re7y6x"
                                >
                                  Manufacturer
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
                                <AsyncSelect
                                  name="manufacturer_id"
                                  inputId="async-select-example"
                                  classNamePrefix="react-select"
                                  onInputChange={handleInputChange}
                                  loadOptions={promiseOptions}
                                  placeholder="Search By Account ID or Manufacturer"
                                  onChange={(value) => {
                                    HandleChange(
                                      form,
                                      "manufacturer_id",
                                      value
                                    );
                                  }}
                                  value={field.value}
                                  isClearable
                                  noOptionsMessage={(obj: any) =>
                                    !obj.inputValue
                                      ? "Search Company Name"
                                      : " Company Name Not Found"
                                  }
                                  isDisabled={
                                    !(
                                      quoteDetails.is_system_quote &&
                                      partDataById.is_custom
                                    )
                                  }
                                />
                                <small className="validation-error">
                                  {meta.touched && meta.error ? meta.error : ""}
                                </small>
                              </AsyncSelectDiv>
                            )}
                          </Field>
                        </div>
                        <div className="width-50">
                          <PiInputForm
                            name="quantity"
                            label="Quantity"
                            type="number"
                            placeholder="Quantity"
                            onChange={(e: any) => quantityChange(e)}
                            isMandatory
                          />
                        </div>
                        <div
                          className="icon_input width-50"
                          style={{
                            position: "relative",
                          }}
                        >
                          {/* <PiInputForm
                            name="quote_price"
                            label="Quote Price"
                            placeholder="Quote Price"
                            onChange={quoteChange}
                            isDisabled={partDataById.is_custom ? false : true}
                          /> */}
                          <PiIconInputForm
                            name="quote_price"
                            label="Quote Price"
                            placeholder="Quote Price"
                            maxLength={10}
                            onChange={(e: any) => quoteChange(e, "quote")}
                            isMandatory
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
                            isDisabled={partDataById.is_sp}
                          />
                          {quoteDetails.is_repair && (
                            <InlineModelContainer>
                              <Popup
                                onClose={() => {}}
                                content={PastRepairInvoicesMemoized}
                                isOpen={openPastInvoiceData}
                                placement="top-end"
                                trigger={() => (
                                  <div className="tooltip">
                                    <PiTooltip
                                      content="Past Repair Prices"
                                      libraryType="atalskit"
                                    >
                                      <div
                                        className="Button-Icon-Display"
                                        style={{
                                          position: "absolute",
                                          top: "0px",
                                          left: "100px",
                                        }}
                                      >
                                        <div
                                          className="edit-item icon-bg-hover"
                                          onClick={() => displayPastInvoice()}
                                          onKeyDown={(event) => {
                                            if (
                                              event.key === "Enter" ||
                                              event.key === " "
                                            ) {
                                              displayPastInvoice();
                                            }
                                          }}
                                          role="button"
                                          tabIndex={0}
                                        >
                                          <img
                                            src={PastInvoices}
                                            alt="chevron-right"
                                            style={{
                                              width: "20px",
                                              height: "20px",
                                              cursor: "pointer",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </PiTooltip>
                                  </div>
                                )}
                              />
                            </InlineModelContainer>
                          )}
                        </div>
                        <div className="icon_input width-50">
                          {/* <PiInputForm
                            name="ext_price"
                            label="Ext Price"
                            placeholder="Ext Price"
                            isDisabled={partDataById.is_custom ? false : true}
                          /> */}
                          <PiIconInputForm
                            name="ext_price"
                            label="Ext Price"
                            placeholder="Ext Price"
                            maxLength={10}
                            isMandatory
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
                            isDisabled
                          />
                        </div>
                        {!quoteDetails.is_repair && (
                          <div className="icon_input width-50">
                            {/* <PiInputForm
                            name="list_price"
                            label="List Price"
                            placeholder="List Price"
                            isDisabled={partDataById.is_custom ? false : true}
                          /> */}

                            <PiIconInputForm
                              name="list_price"
                              label="List Price"
                              placeholder="List Price"
                              maxLength={10}
                              isMandatory
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
                              isDisabled={!partDataById.is_custom}
                            />
                          </div>
                        )}
                        {!partDataById.is_custom && (
                          <div className="icon_input width-50">
                            {/* <PiInputForm
                            name="suggested_price"
                            label="Suggested Price"
                            placeholder="Suggested Price"
                            isDisabled={partDataById.is_custom ? false : true}
                          /> */}
                            <PiIconInputForm
                              name="suggested_price"
                              label="Suggested Price"
                              placeholder="Suggested Price"
                              maxLength={10}
                              isMandatory
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
                              // onChange={onChangeSuggedted}
                              isDisabled={!partDataById.is_custom}
                            />
                          </div>
                        )}
                        {!quoteDetails.is_repair && (
                          <div className="width-50">
                            <PiInputForm
                              name="customer_stock_code"
                              label="Customer Stock Code"
                              placeholder="Enter Customer Stock Code"
                              maxLength={45}
                              // isDisabled={partDataById.is_custom ? false : true}
                              // isMandatory
                            />
                          </div>
                        )}
                        <div className="icon_input width-50">
                          {/* <PiInputForm
                            name="iidm_cost"
                            label="IIDM Cost"
                            placeholder="IIDM Cost"
                            isDisabled={partDataById.is_custom ? false : true}
                          /> */}
                          <PiIconInputForm
                            name="iidm_cost"
                            label="IIDM Cost"
                            placeholder="IIDM Cost"
                            maxLength={30}
                            isMandatory
                            type="string"
                            onChange={(e: any) =>
                              iidmCostChange(e, "iidm_cost")
                            }
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
                            allowedDecimalsPoints={6}
                            // onChange={onChangeSuggedted}
                            isDisabled={!permissionObject.edit_iidm_cost}
                          />
                        </div>
                        {quoteDetails.is_repair && (
                          <>
                            <div className="icon_input width-50">
                              <PiIconInputForm
                                name="cost_value"
                                label="Average Cost"
                                placeholder="Average Cost"
                                maxLength={10}
                                isMandatory
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
                                isDisabled
                              />
                            </div>
                            <div className="icon_input width-50">
                              <PiIconInputForm
                                name="tech_estimated_cost"
                                label="Technician Estimated Cost"
                                placeholder="Technician Estimated Cost"
                                maxLength={10}
                                isMandatory
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
                                // onChange={onChangeSuggedted}
                                isDisabled={!quoteDetails.is_repair}
                              />
                            </div>
                          </>
                        )}
                        <div className="icon_input width-50">
                          <PiIconInputForm
                            name="discount"
                            label="Discount Price"
                            placeholder="Enter Discount Price"
                            maxLength={5}
                            isMandatory
                            onChange={(e: any) =>
                              onKeyDiscountChanges(e.target.value, "discount")
                            }
                            elemBeforeInput={
                              <div
                                style={{
                                  padding: "10px",
                                  color: "#6D7992",
                                  borderRight: "1px solid #d0d1d3",
                                }}
                              >
                                %
                              </div>
                            }
                            isDisabled={
                              isDisableGpDiscount || partDataById.is_sp
                            }
                            type="string"
                          />
                        </div>
                        <div className="icon_input width-50">
                          {/* <PiInputForm
                            name="gp"
                            label="Gross Profit"
                            placeholder="Gross Profit"
                            isDisabled
                          /> */}
                          <PiIconInputForm
                            name="gp"
                            label="Gross Profit"
                            placeholder="Enter Gross Profit"
                            maxLength={5}
                            onChange={(e: any) =>
                              onKeyGPChanges(e.target.value, "gp")
                            }
                            isMandatory
                            elemBeforeInput={
                              <div
                                style={{
                                  padding: "10px",
                                  color: "#6D7992",
                                  borderRight: "1px solid #d0d1d3",
                                }}
                              >
                                %
                              </div>
                            }
                            type="string"
                            isDisabled={partDataById.is_sp}
                          />
                        </div>
                        {!quoteDetails.is_repair && (
                          <div className="width-50">
                            <PiSelectForm
                              name="source"
                              label="Source"
                              placeholder="Select"
                              isMulti={false}
                              options={quoteSourceOptions}
                              classNamePrefix="react-select"
                              isMandatory
                              // isDisabled
                            />
                          </div>
                        )}
                        <div className="width-50">
                          <PiSelectForm
                            name="lead_time"
                            label="Turn Around Time"
                            placeholder="Select"
                            isMulti={false}
                            options={quoteLeadTime}
                            classNamePrefix="react-select"
                            onChange={(e: any, actionMeta: any) =>
                              onChangeLeadTime(e, actionMeta)
                            }
                            isMandatory
                            // isDisabled
                          />
                        </div>
                        {selectedLeadTime && leadTimeType !== "TBD" && (
                          <div className="width-50">
                            <PiInputForm
                              name="lead_time_value"
                              label={leadTimeType}
                              placeholder={leadTimeType}
                            />
                          </div>
                        )}
                        {!quoteDetails.is_repair && (
                          <div className="width-100 checkbox-form-field">
                            <Field name="ncnr">
                              {({ field }: any) => (
                                <PiCheckbox
                                  helpText=""
                                  isChecked={field.value}
                                  label="NCNR"
                                  libraryType="atalskit"
                                  name="ncnr"
                                  // value={field.value}
                                  onChange={onNcrChanged}
                                  size="medium"
                                />
                              )}
                            </Field>
                          </div>
                        )}
                        {quoteDetails.is_repair && (
                          <div className="width-100 checkbox-form-field">
                            <div className="radios">
                              <PiRadioForm
                                libraryType="atalskit"
                                label="Expedite"
                                className="kers"
                                name="expedite"
                                onChange={onExpediteChange}
                                options={[
                                  {
                                    label: "None",
                                    value: "none",
                                  },
                                  {
                                    label: "Rush",
                                    value: "rush",
                                  },
                                  {
                                    label: "Emergency",
                                    value: "emergency",
                                  },
                                ]}
                              />
                            </div>
                          </div>
                        )}
                        {quoteDetails.is_repair && showExpediteFee && (
                          <div className="icon_input width-50">
                            <PiIconInputForm
                              name="expedite_fee"
                              label="Expedite Fee"
                              placeholder="Enter Expedite Fee"
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
                              isDisabled
                            />
                          </div>
                        )}
                        <div className="width-100">
                          <PiTextareaForm
                            name="description"
                            label="Item Description"
                            libraryType="atalskit"
                            placeholder="Description"
                            maxLength={255}
                            defaultValue={partDataById.description}
                            isDisabled={!partDataById.is_custom}
                          />
                        </div>
                        <div className="width-100" style={{ height: "100%" }}>
                          {/* <PiTextareaForm
                              name={'notes'}
                              onChange={onChangeItemNotes}
                              value={notes}
                              label="Item Notes"
                              placeholder="Item Notes"
                            /> */}
                          <AsyncLabel
                            htmlFor="async-select-example"
                            style={{ marginBottom: "4px" }}
                          >
                            Item Notes
                          </AsyncLabel>
                          <PiEditor
                            libraryType="atalskit"
                            onChange={onChangeItemNotes}
                            value={notes}
                          />
                        </div>
                      </RmaFields>
                    </FormBodyOverFlow>
                    <SideDrawerFooter>
                      {serverMsg && (
                        <div className="server-msg">{serverMsg}</div>
                      )}
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
      {/* {openPastInvoiceData && (
        <PastRepairInvoices
          quoteInfo={quoteInfo}
          sendEventData={triggerRepairInvoice}
        ></PastRepairInvoices>
      )} */}
    </>
  );
}

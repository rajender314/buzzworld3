/* eslint-disable no-shadow */
import {
  PiButton,
  PiIconInputForm,
  PiInputForm,
  PiSpinner,
  PiTextareaForm,
  PiToast,
} from "pixel-kit";
import { useEffect, useRef, useState } from "react";
import { Formik, Form, FieldArray, Field } from "formik";
import { AsyncSelectDiv } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import SpPlusIconImg from "@app/assets/images/spPlusIcon.svg";
import RowDelImg from "@app/assets/images/row_delete_img.svg";
import { AsyncLabel } from "@app/components/rmaModel/RmaModel.component";
import { AsyncSelect } from "@atlaskit/select";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import { useParams } from "react-router-dom";
import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";
import ItemInformationFormValidationSchema from "../purchase-form-validation/item-Information-form-validations";
import {
  ContactFormField,
  CostField,
  FormField,
  ItemInfoAddRowContainer,
  ItemInfoContainer,
  PartPurchaseAddAnotherRowBtn,
  PartsPurchaseSideDrawerContainer,
  RequestorInformationBottomDrawerFooter,
  RequestorInformationFromContainer,
  VendorContactContainer,
} from "../parts-purchase-form.tsx/parts-purchase-form-components";

type Props = {
  repairItemId: any;
  prefillFormData: any;
  sendItemInfoData: any;
  itemInformation: any;
  vendorAttachemts: any;
  prefillJobNumber: any;
};
export default function IteminformationForm({
  repairItemId,
  prefillFormData,
  sendItemInfoData,
  itemInformation,
  vendorAttachemts,
  prefillJobNumber,
}: Props) {
  const { id }: RouteParams = useParams();
  const { current }: any = useRef({ timer: 0 });
  const [opacity, setOpacity] = useState(false);
  const [cost, setCost]: any = useState("");
  const [showErrormsg, setShowErrorMsg] = useState();
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const requestorInformation = itemInformation[0];
  const vendorInformation = itemInformation[1];
  const [vendorAttachemtsArray, setvendorAttachemtsArray] = useState<any>([
    vendorAttachemts,
  ]);
  const [mfgOptions, setMfgOptions]: any = useState([]);
  const [initialValues, setInitialValues] = useState({
    // job_number: prefillJobNumber ? prefillJobNumber : "",
    item_info: [
      {
        job_number: prefillJobNumber || "",
        qty: "",
        mfg_part_number: "",
        mfg_name: "",
        description: "",
        vendor_part_number: "",
        cost: "",
        extended_cost: "",
        special_notes: "",
        item_notes: "",
      },
    ],
  });
  const [openSnackbar, setSnackbar] = useState(false);
  const formik = useRef<any>(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (prefillFormData) {
      // initialValues.item_info = prefillFormData.item_info
      // setInitialValues(initialValues)
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [prefillFormData]);

  useEffect(() => {
    if (vendorAttachemts === "") {
      setvendorAttachemtsArray([]);
    } else {
      setvendorAttachemtsArray([vendorAttachemts]);
    }
    // getMfgname();
  }, []);

  function handleRef(e: any) {
    formik.current = e;
    console.log(formik.current);
  }
  const handleSubmit = () => {
    if (formik.current.isValid) {
      setOpacity(true);
      formik.current.values.item_info.map((obj: any) => {
        if (obj.mfg_part_number) {
          obj.mfg_part_number = obj.mfg_part_number.trim();
        }
        if (obj.vendor_part_number) {
          obj.vendor_part_number = obj.vendor_part_number.trim();
        }
        return obj;
      });
      const apiObject = {
        payload: {
          // requested_by: requestorInformation.requested_by.value
          //   ? requestorInformation.requested_by.value
          //   : "",
          technician_id: requestorInformation.technician.value
            ? requestorInformation.technician.value
            : "",
          part_urgency_id: requestorInformation.urgency.value
            ? requestorInformation.urgency.value
            : "",
          requested_date: requestorInformation.date_requested
            ? requestorInformation.date_requested
            : "",
          vendor_id: vendorInformation.vendor_id
            ? vendorInformation.vendor_id
            : "",
          vendor_contact_name: vendorInformation.vendor_contact_name
            ? vendorInformation.vendor_contact_name
            : "",
          vendor_website: vendorInformation.vendor_website
            ? vendorInformation.vendor_website
            : "",
          vendor_phone: vendorInformation.vendor_phone
            ? vendorInformation.vendor_phone
            : "",
          vendor_quote_number: vendorInformation.vendor_quote_number
            ? vendorInformation.vendor_quote_number
            : "",
          vendor_email: vendorInformation.email ? vendorInformation.email : "",
          // shipping_costs: vendorInformation.shipping_costs
          //   ? vendorInformation.shipping_costs
          //   : "",
          vendor_acc_number: vendorInformation.vendor_acc_number
            ? vendorInformation.vendor_acc_number
            : "",
          items: formik.current.values.item_info
            ? formik.current.values.item_info
            : "",
          attachments: vendorAttachemtsArray || [],
          // job_number: formik.current.values.job_number,
        },
        method: "POST",
        apiUrl: `${EndpointUrl.createPartsPurchase}`,
        headers: {},
      };
      triggerApi(apiObject)
        .then((response: any) => {
          if (response.result.success && response.result.status_code === 200) {
            sendItemInfoData({ id: response.result.data });
            // setOpacity(false);
            setShowErrorPopup(false);
            //  setShowPopupmessage(true);
            //  sendModelData({ success: true });
            //  sendPartsPurchaseData(true);
            // setOpacity(false);
            // setLoading(true);
            // setLoading(false);
            // setShowErrorMsg(false);
            // setOrderCreated(true);
          } else if (response.result.success === false) {
            setOpacity(false);

            // setShowPopupmessage(true);
            // sendModelData({ success: true });
            // // setLoading(false);

            setShowErrorMsg(response.result.data);
            setShowErrorPopup(true);
          } else {
            // setTimeout(() => {
            //   setOpacity(false);
            // }, 5000);
          }
        })
        .catch((err: string) => {
          setTimeout(() => {
            setOpacity(false);
          }, 5000);
          console.log(err);
        });
    }
  };

  // const getMfgname = () => {
  //   setOpacity(true);
  //   const apiObject = {
  //     payload: {},
  //     method: "GET",
  //     apiUrl: `${EndpointUrl.ppVendorList}?status=true&search=${"name"}`,
  //     headers: {},
  //   };
  //   triggerApi(apiObject)
  //     .then((response: any) => {
  //       if (response.result.success && response.result.status_code === 200) {
  //         setOpacity(false);

  //         setMfgName(
  //           response.result.data.list.map((item: any) => {
  //             return {
  //               value: item.id,
  //               label: item.name,
  //             };
  //           })
  //         );
  //       } else if (response.result.success === false) {
  //         setOpacity(false);
  //       }
  //     })
  //     .catch((err: string) => {
  //       console.log(err);
  //     });
  // };
  const getJobNumbers = async (searchValue: string) => {
    let data: any = [];
    if (searchValue.length >= 3) {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.getSysproJobInformation}?job_id=${searchValue}&repair_id=${id || ""}&repair_item_id=${repairItemId || ""}`,
        headers: {},
      };
      await triggerApi(apiObject)
        .then((res: any) => {
          if (res.result.success && res.result.status_code === 200) {
            const arr: any =
              res.result.data && res.result.data.label ? [res.result.data] : [];
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
  const promiseOptions = (searchValue: string) =>
    new Promise((resolve) => {
      if (current.timer) clearTimeout(current.timer);
      current.timer = setTimeout(() => {
        resolve(getJobNumbers(searchValue));
      }, 1000);
    });
  const handleInputChanges = (newValue: string) => {
    if (newValue.length >= 3) {
      return newValue;
    }
    return newValue;
  };

  const addRow = (pushData: any, formHandleSubmit: any) => {
    formHandleSubmit();

    if (formik.current.isValid) {
      const newValues = {
        job_number: prefillJobNumber || "",
        qty: "",
        mfg_part_number: "",
        mfg_name: "",
        description: "",
        vendor_part_number: "",
        cost: "",
        extended_cost: "",
        special_notes: "",
        item_notes: "",
      };
      pushData(newValues);
      initialValues.item_info.push(newValues);
      setInitialValues(initialValues);
    }
  };
  const onItemQtyChange = (e: any, i: number) => {
    const exCost: any =
      e.target.value * formik.current.values.item_info[i].cost;
    const finalExCost = exCost?.toLocaleString(undefined, {
      minimumFractionDigits: 6,
      maximumFractionDigits: 6,
    });
    if (cost && cost.length) {
      formik.current.setFieldValue(`item_info.${i}.extended_cost`, finalExCost);
    }
  };
  const onCostChange = (e: any, i: number) => {
    setCost(e.target.value);
    const exCost: any = formik.current.values.item_info[i].qty * e.target.value;
    const finalExCost = exCost?.toLocaleString(undefined, {
      minimumFractionDigits: 6,
      maximumFractionDigits: 6,
    });
    formik.current.setFieldValue(`item_info.${i}.extended_cost`, finalExCost);
  };
  const [newInputValue, setNewInputValue]: any = useState();

  const getManufacturers = async (manufacturersearchValue: string) => {
    setMfgOptions([]);
    let list: any = [];
    if (manufacturersearchValue.length >= 3) {
      setNewInputValue(manufacturersearchValue);
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.ppVendorList}?status=true&search=${manufacturersearchValue}`,

        headers: {},
      };
      await triggerApi(apiObject)
        .then((res: any) => {
          if (res.result.success && res.result.status_code === 200) {
            const { data } = res.result;
            let arr = [];
            arr = data.list.map((item: any) => ({
              ...item,
              value: item.id,
              label: item.name.toUpperCase(),
            }));
            list = arr;
            setMfgOptions(list);
          } else {
            setMfgOptions([]);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
      return list;
    }
    return list;
  };
  const manufacturerpromiseOptions = (manufacturersearchValue: string) =>
    new Promise((resolve) => {
      setNewInputValue("");
      if (current.timer) clearTimeout(current.timer);
      current.timer = setTimeout(() => {
        resolve(getManufacturers(manufacturersearchValue));
      }, 1000);
    });

  const onManufacturerInputChange = (Value: string) => {
    if (Value.length >= 3) {
      return Value.toUpperCase();
    }
    return Value.toUpperCase();
  };

  const blurEvent = (form: any, fieldLabel: any) => {
    console.log(fieldLabel);
    // form.setFieldValue(`date_range`, '123')
    if (newInputValue && mfgOptions.length === 0) {
      form.setFieldValue(fieldLabel, {
        value: newInputValue,
        label: newInputValue,
        code: null,
      });
    }
  };
  return (
    <>
      <PartsPurchaseSideDrawerContainer>
        {!loading && (
          <Formik
            initialValues={initialValues}
            validationSchema={ItemInformationFormValidationSchema}
            onSubmit={() => handleSubmit()}
            innerRef={(e: any) => handleRef(e)}
            validateOnMount
          >
            {({ values, handleSubmit }) => (
              <>
                <Form style={{ flex: "1", overflow: "auto" }}>
                  <FieldArray name="item_info">
                    {({ remove, push }) => (
                      <FormBodyOverFlow
                        className={opacity ? "opacity-on-load" : ""}
                      >
                        {opacity && (
                          <SpinnerDiv
                            style={{
                              position: "absolute",
                              left: "50%",
                              zIndex: "1",
                            }}
                            className="zindex"
                          >
                            <PiSpinner
                              color="primary"
                              size={50}
                              libraryType="atalskit"
                            />
                          </SpinnerDiv>
                        )}
                        <RequestorInformationFromContainer>
                          {values.item_info.length > 0 &&
                            values.item_info.map((friend, index) => (
                              <ItemInfoContainer
                                className={
                                  index !== values.item_info.length - 1
                                    ? "card-separator"
                                    : ""
                                }
                              >
                                <VendorContactContainer>
                                  <ContactFormField>
                                    <AsyncSelectDiv>
                                      <AsyncLabel
                                        htmlFor="async-select-example"
                                        className="mandatory"
                                      >
                                        Job Number
                                      </AsyncLabel>
                                      <Field
                                        name={`item_info.${index}.job_number`}
                                      >
                                        {({ field, form, meta }: any) => (
                                          <>
                                            <AsyncSelect
                                              name={`item_info.${index}.job_number`}
                                              inputId="async-select-example"
                                              classNamePrefix="react-select"
                                              onInputChange={handleInputChanges}
                                              loadOptions={promiseOptions}
                                              placeholder="Search Job Number"
                                              onChange={(value) => {
                                                form.setFieldValue(
                                                  `item_info.${index}.job_number`,
                                                  value
                                                );
                                              }}
                                              isClearable
                                              // value={field.value}
                                              isDisabled={opacity}
                                              value={field.value}
                                            />
                                            <small className="validation-error date-range-validation-error">
                                              {meta.touched && meta.error
                                                ? meta.error
                                                : ""}
                                              {/* {console.log(meta)} */}
                                            </small>
                                          </>
                                        )}
                                      </Field>
                                    </AsyncSelectDiv>
                                  </ContactFormField>
                                  {/* <PiSelectForm
                                      name={`item_info.${index}.mfg_name`}
                                      label="Manufacturer Name"
                                      placeholder="Select Mfg Name"
                                      isMulti={false}
                                      options={mfgname}
                                      isDisabled={opacity}
                                      isClearable={true}
                                      isMandatory
                                      classNamePrefix="react-select"
                                    /> */}
                                  <ContactFormField>
                                    <AsyncSelectDiv>
                                      <AsyncLabel
                                        htmlFor="async-select-example"
                                        className="mandatory"
                                      >
                                        Manufacturer Name
                                      </AsyncLabel>
                                      <Field
                                        name={`item_info.${index}.mfg_name`}
                                      >
                                        {({ field, form, meta }: any) => (
                                          <>
                                            <AsyncSelect
                                              name={`item_info.${index}.mfg_name`}
                                              inputId="async-select-example"
                                              classNamePrefix="react-select"
                                              onInputChange={
                                                onManufacturerInputChange
                                              }
                                              loadOptions={
                                                manufacturerpromiseOptions
                                              }
                                              placeholder="Search Manufacturer"
                                              onChange={(value) => {
                                                if (value) {
                                                  form.setFieldValue(
                                                    `item_info.${index}.mfg_name`,
                                                    {
                                                      label: value.label,
                                                      value: value.value,
                                                      code: value.code,
                                                    }
                                                  );
                                                } else {
                                                  setNewInputValue("");
                                                  form.setFieldValue(
                                                    `item_info.${index}.mfg_name`,
                                                    null
                                                  );
                                                }
                                              }}
                                              isClearable
                                              // value={field.value}
                                              isDisabled={opacity}
                                              noOptionsMessage={() =>
                                                "No Manufacturers Found"
                                              }
                                              onBlur={() => {
                                                blurEvent(
                                                  form,
                                                  `item_info.${index}.mfg_name`
                                                );
                                              }}
                                              value={field.value}
                                            />
                                            <small className="validation-error date-range-validation-error">
                                              {meta.touched && meta.error
                                                ? meta.error
                                                : ""}
                                            </small>
                                          </>
                                        )}
                                      </Field>
                                    </AsyncSelectDiv>
                                  </ContactFormField>
                                </VendorContactContainer>
                                <VendorContactContainer>
                                  <ContactFormField>
                                    <PiInputForm
                                      name={`item_info.${index}.mfg_part_number`}
                                      label=" Manufacturer Part No"
                                      type="text"
                                      placeholder="Enter Mfg Part Number"
                                      isDisabled={opacity}
                                      convertToCapital
                                    />
                                  </ContactFormField>

                                  <ContactFormField>
                                    <PiInputForm
                                      name={`item_info.${index}.qty`}
                                      label="Quantity "
                                      isMandatory
                                      type="text"
                                      placeholder="Enter Quantity"
                                      onChange={(e: any) => {
                                        onItemQtyChange(e, index);
                                      }}
                                      isDisabled={opacity}
                                    />
                                  </ContactFormField>
                                </VendorContactContainer>

                                <VendorContactContainer>
                                  <ContactFormField className="cost_icon_input">
                                    <PiIconInputForm
                                      name={`item_info.${index}.cost`}
                                      label="Cost"
                                      type="string"
                                      isMandatory
                                      isDisabled={opacity}
                                      onChange={(e: any) => {
                                        onCostChange(e, index);
                                      }}
                                      allowedDecimalsPoints={6}
                                      placeholder="Enter Cost"
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
                                    />
                                  </ContactFormField>

                                  <ContactFormField>
                                    <CostField className="cost_icon_input">
                                      <PiIconInputForm
                                        name={`item_info.${index}.extended_cost`}
                                        label="Extended Cost"
                                        isDisabled
                                        placeholder="Enter Extended Cost"
                                        type="text"
                                        // value={extendedCost}
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
                                      />
                                    </CostField>
                                  </ContactFormField>
                                </VendorContactContainer>
                                <ContactFormField className="width-100">
                                  <PiInputForm
                                    name={`item_info.${index}.vendor_part_number`}
                                    label="Vendor Part Number"
                                    type="text"
                                    placeholder="Enter Vendor Part Number"
                                    isMandatory
                                    isDisabled={opacity}
                                    convertToCapital
                                  />
                                </ContactFormField>

                                <FormField>
                                  <PiTextareaForm
                                    helpText=""
                                    label="Description"
                                    libraryType="atalskit"
                                    minimumRows={3}
                                    name={`item_info.${index}.description`}
                                    placeholder="Enter Description"
                                    isDisabled={opacity}
                                    isMandatory
                                    convertToCapital
                                  />
                                </FormField>
                                <FormField style={{ margin: "10px 0" }}>
                                  <PiTextareaForm
                                    helpText=""
                                    label="Item Special Notes"
                                    libraryType="atalskit"
                                    minimumRows={3}
                                    name={`item_info.${index}.special_notes`}
                                    placeholder="Enter Item Special Notes"
                                    isDisabled={opacity}
                                  />
                                </FormField>
                                <FormField style={{ margin: "10px 0" }}>
                                  <PiTextareaForm
                                    helpText=""
                                    label="Item Notes"
                                    libraryType="atalskit"
                                    minimumRows={3}
                                    name={`item_info.${index}.item_notes`}
                                    placeholder="Enter Item Notes"
                                    isDisabled={opacity}
                                  />
                                </FormField>

                                <ItemInfoAddRowContainer
                                  className={opacity ? "isDisable" : ""}
                                >
                                  {index === values.item_info.length - 1 && (
                                    <PartPurchaseAddAnotherRowBtn>
                                      <div
                                        className="add-row-div"
                                        onClick={() =>
                                          addRow(push, handleSubmit)
                                        }
                                        onKeyDown={(event) => {
                                          if (
                                            event.key === "Enter" ||
                                            event.key === " "
                                          ) {
                                            addRow(push, handleSubmit);
                                          }
                                        }}
                                        role="button"
                                        tabIndex={0}
                                      >
                                        <img
                                          src={SpPlusIconImg}
                                          alt="loading"
                                        />
                                        <p className="add-row-text">
                                          Add another row{" "}
                                        </p>
                                      </div>
                                    </PartPurchaseAddAnotherRowBtn>
                                  )}

                                  {index !== 0 && (
                                    <PartPurchaseAddAnotherRowBtn
                                      className="row-del-img-div"
                                      onClick={() => {
                                        remove(index);
                                      }}
                                      onKeyDown={(event) => {
                                        if (
                                          event.key === "Enter" ||
                                          event.key === " "
                                        ) {
                                          remove(index);
                                        }
                                      }}
                                      role="button"
                                      tabIndex={0}
                                    >
                                      <img
                                        className="row-del-img"
                                        src={RowDelImg}
                                        alt="loading"
                                        title="Delete Row"
                                      />
                                    </PartPurchaseAddAnotherRowBtn>
                                  )}
                                </ItemInfoAddRowContainer>
                              </ItemInfoContainer>
                            ))}
                        </RequestorInformationFromContainer>
                      </FormBodyOverFlow>
                    )}
                  </FieldArray>
                </Form>

                <RequestorInformationBottomDrawerFooter>
                  {showErrorPopup && (
                    <div
                      style={{
                        color: "red",
                        marginRight: "auto",
                        padding: "0 24px",
                      }}
                    >
                      {showErrormsg || ""}
                    </div>
                  )}
                  <PiButton
                    appearance="primary"
                    label="Create"
                    libraryType="atalskit"
                    onClick={handleSubmit}
                    isDisabled={opacity}
                  />
                </RequestorInformationBottomDrawerFooter>
              </>
            )}
          </Formik>
        )}
      </PartsPurchaseSideDrawerContainer>
      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel="Parts Purchase"
        message="Parts Purchase Created Successfully"
        onClose={async () => setSnackbar(false)}
      />
    </>
  );
}

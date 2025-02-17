import { useState, useEffect, useRef } from "react";
import { Formik, Field } from "formik";
import {
  PiInputForm,
  PiTypography,
  PiButton,
  PiModal,
  PiModalHeader,
  PiModalBody,
  PiModalFooter,
  PiTextareaForm,
  PiSpinner,
  PiSelectForm,
  PiCheckbox,
} from "pixel-kit";
import { ApiResponse, AddProps, PageProps } from "@app/services/schema/schema";
import { triggerApi } from "@app/services/api-services";
import {
  addSchema,
  VendorSchema,
} from "@app/modules/contacts/validation/addValidations";
import {
  FilterFormFields,
  InnerBody,
  CloseButton,
  Popup,
  InnerBodyQuantity,
} from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { AsyncSelect } from "@atlaskit/select";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
  SpinnerDiv,
} from "../fileuploadModel/fileuploadModel.component";
import { AsyncLabel } from "../rmaModel/RmaModel.component";
import CrossLogo from "../../assets/images/cross.svg";
import { AsyncSelectDiv } from "../Repair-Components/selectItems/AddPartRepair/add-part-repair.component";

type Props = {
  onChildClick: any;
  props: PageProps;
  sendEventData: any;
};

export default function AddRowModel({
  onChildClick,
  props,
  sendEventData,
}: Props) {
  const [openModel, setOpenModel] = useState(false);
  const [nameErr, setNameErr] = useState("");
  const [loading, setloading] = useState(true);
  const [isChecked] = useState(true);
  const [serverMsg, setServerMsg] = useState(null);
  const [areaValue, setareaValue] = useState("");
  const [headerLabel, setHeaderLable] = useState<string>("");
  const { current }: any = useRef({ timer: 0 });
  const [addVendorerrormsg, setAddvendorErrormsg]: any = useState();
  const [showerrormsg, setShowErromsg] = useState(false);
  const [supierName, setSuplierName]: any = useState("");
  const formik = useRef<any>(null);
  const [initialValues, setInitialValues]: any = useState({
    name: "",
    description: "",
    status: isChecked === true ? "true" : "false",
    quantity: "",
    mapping_accountype_id: "",
    code: "",
    supplier_name: "",
    supplier_code: "",
    is_different_pricing: "",
    pos_mail: "",
    // pos_test_mail: "",
  });
  const [accountTypeList, setAccountTypeList] = useState<any>([]);
  function importAccountTypes() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.importAccountTypes}?is_dropdown=true`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setAccountTypeList(response.result.data);
        }
      })
      .catch(() => {});
  }
  useEffect(() => {
    setHeaderLable(`Add ${props.displayLabel}`);
    setOpenModel(true);
    if (props.pageLabel === "Account_Types") {
      importAccountTypes();
    }
    if (props.pageLabel !== "PO_Min_Qty") {
      let values;
      if (props.pageLabel === "Account_Types") {
        values = {
          name: "",
          description: "",
          status: isChecked === true ? "true" : "false",
          quantity: "1",
          mapping_accountype_id: "",
          code: "",
          supplier_name: "",
          supplier_code: "",
          is_different_pricing: "",
        };
      } else {
        values = {
          name: "",
          description: "",
          status: isChecked === true ? "true" : "false",
          quantity: "1",
          mapping_accountype_id: "",
          code: "",
          supplier_name: "",
          supplier_code: "",
          is_different_pricing: "",
        };
      }

      setInitialValues(values);
      setTimeout(() => {
        setloading(false);
      }, 100);
    } else if (props.pageLabel === "PO_Min_Qty") {
      const values = {
        name: "name",
        description: "description",
        status: isChecked === true ? "true" : "false",
        quantity: "",
        mapping_accountype_id: "",
        code: "",
        supplier_name: "",
        is_different_pricing: "",
        supplier_code: "",
      };
      setInitialValues(values);
      setTimeout(() => {
        setloading(false);
      }, 100);
    }
  }, []);

  function resetForm() {
    formik.current.setFieldValue("supplier_code", "");
    formik.current.setFieldValue("pos_mail", "");
    // formik.current.setFieldValue(`pos_test_mail`, "");

    initialValues.supplier_code = "";
    initialValues.supplier_name = "";
    initialValues.pos_mail = "";

    setInitialValues(initialValues);
    setareaValue("");
    setServerMsg(null);
  }
  function handleTextArea(e: any) {
    setareaValue(e.target.value);
  }

  const submitFormApi = (data: any, url: string) => {
    if (props.pageLabel !== "PO_Min_Qty" && props.pageLabel !== "Vendors") {
      const apiObject = {
        payload: {
          name: data.name.trim(),
          description: data.description,
          status: isChecked === true,
          mapping_accountype_id: data.mapping_accountype_id
            ? data.mapping_accountype_id.value
            : "",
          code: data.code ? data.code : "",
        },
        method: "POST",
        apiUrl: url,
        headers: {},
      };
      triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            setServerMsg(null);
            setOpenModel(false);
            sendEventData({ success: true });
            // onChildClick({ success: true })
          } else {
            setServerMsg(response.result.data);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    } else if (props.pageLabel === "PO_Min_Qty") {
      const apiObject = {
        payload: {
          quantity: data.quantity,
        },
        method: "POST",
        apiUrl: url,
        headers: {},
      };
      triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response && response.result.success) {
            setServerMsg(null);
            setOpenModel(false);
            sendEventData({ success: true });
          } else {
            setServerMsg(response ? response.result.data : "Failed To Save");
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    } else if (props.pageLabel === "Vendors") {
      console.log(data);

      const apiObject = {
        payload: {
          name: data.supplier_name ? data.supplier_name : "",
          description: data.description ? data.description : "",
          status: isChecked === true,

          code: data.supplier_code.value ? data.supplier_code.value : "",
          is_different_pricing: data.is_different_pricing
            ? data.is_different_pricing
            : null,
          pos_mail: data.pos_mail ? data.pos_mail : "",
          // pos_test_mail: data.pos_test_mail ? data.pos_test_mail : "",
        },
        method: "POST",
        apiUrl: url,
        headers: {},
      };
      triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            sendEventData({ success: true, vendors: true });

            setShowErromsg(false);
          } else if (response.result.success === false) {
            setAddvendorErrormsg(response.result.data);
            setShowErromsg(true);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  };
  function handleSubmit(data: AddProps) {
    let apiCall = "";
    if (props.pageLabel === "Account_Types") {
      apiCall = "v1/AccountTypes";
    } else if (props.pageLabel === "Classifications") {
      apiCall = "v1/Classifications";
    } else if (props.pageLabel === "Industry") {
      apiCall = "v1/Industry";
    } else if (props.pageLabel === "Sales_Potential") {
      apiCall = "v1/SalesPotential";
    } else if (props.pageLabel === "Contact_Types") {
      apiCall = "v1/ContactTypes";
    } else if (props.pageLabel === "Branches") {
      apiCall = EndpointUrl.branchList;
    } else if (props.pageLabel === "quote-type") {
      apiCall = EndpointUrl.QuoteTypes;
    } else if (props.pageLabel === "Vendors") {
      apiCall = EndpointUrl.vendorList;
    } else if (props.pageLabel === "PO_Min_Qty") {
      apiCall = "v1/Quantity";
    }

    submitFormApi(data, apiCall);
  }

  function handleRef(e: any) {
    formik.current = e;
  }
  function closeModel() {
    setOpenModel(false);
    const data = {
      name: "",
      description: "",
      status: "",
      quantity: "",
    };
    onChildClick(data);
  }
  const getSelectItems = async (searchValue: string) => {
    let options: any = [];
    if (searchValue && searchValue.length >= 7) {
      const apiObject = {
        payload: { supplier: searchValue },
        method: "POST",
        apiUrl: `${EndpointUrl.VendorCodeSearch}`,
        headers: {},
      };
      await triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.status_code === 200 && response.result.success) {
            setSuplierName(response.result.data.supplier_name);
            setShowErromsg(false);
            initialValues.supplier_name = response.result.data.supplier_name
              ? response.result.data.supplier_name
              : "";

            setInitialValues(initialValues);

            const arr: any = [
              {
                value: response.result.data.supplier,
                label: response.result.data.supplier,
              },
            ];
            options = arr;
          } else if (response.result.success === false) {
            setAddvendorErrormsg(response.result.data);
            setShowErromsg(true);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
      return options;
    }
    return options;
  };
  const promiseOptions = (searchValue: string) =>
    new Promise((resolve) => {
      if (current.timer) clearTimeout(current.timer);
      current.timer = setTimeout(() => {
        resolve(getSelectItems(searchValue));
      }, 1000);
    });
  const handleInputChanges = (newValue: string) => {
    // setIssearch(true);

    // setSysproIdSearchValue(newValue);
    if (newValue && newValue.length >= 7) {
      setShowErromsg(false);

      return newValue;
    }
    if (newValue && newValue.length < 7) {
      setShowErromsg(true);
      setAddvendorErrormsg("Search Code Seven Characters required");
    }
    return newValue;
  };

  const onSelectItemChange = (value: any) => {
    initialValues.supplier_code = value || "";
    initialValues.supplier_name = supierName || "";
    setInitialValues(initialValues);
  };
  const onNcrChanged = (e: any) => {
    formik.current.setFieldValue("is_different_pricing", e.target.checked);
  };

  return (
    <Popup>
      <PiModal isOpen={openModel} width={450}>
        <PopupHeaderContentDiv>
          <PiModalHeader>
            <PopupHeaderDiv>
              <PiTypography component="h3">{headerLabel}</PiTypography>

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
        {loading && (
          <SpinnerDiv>
            <PiSpinner color="primary" size={50} libraryType="atalskit" />
          </SpinnerDiv>
        )}
        {!loading && (
          <Formik
            validationSchema={
              props.pageLabel === "Vendors" ? VendorSchema : addSchema
            }
            onSubmit={(e: any) => handleSubmit(e)}
            nameErr={nameErr}
            setNameErr={setNameErr}
            initialValues={initialValues}
            innerRef={(e: any) => handleRef(e)}
            onReset={() => resetForm()}
            // initialStatus={isChecked}
          >
            {({ ...formikProps }: any) => (
              <>
                <PiModalBody>
                  <FilterFormFields>
                    {props.pageLabel === "Vendors" && (
                      <InnerBodyQuantity>
                        <AsyncSelectDiv style={{ margin: "10px 0" }}>
                          <AsyncLabel
                            htmlFor="async-select-example"
                            className="css-re7y6x"
                          >
                            Vendor Code (Syspro ID)
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
                          <Field name="supplier_code">
                            {({ field, form, meta }: any) => (
                              <>
                                <AsyncSelect
                                  name="supplier_code"
                                  inputId="async-select-example"
                                  classNamePrefix="multi-select job-number"
                                  onInputChange={handleInputChanges}
                                  loadOptions={promiseOptions}
                                  placeholder="Search Code"
                                  onChange={(value) => {
                                    form.setFieldValue("supplier_code", value);
                                    onSelectItemChange(value);
                                  }}
                                  isClearable
                                  value={field.value}
                                />
                                <small className="validation-error date-range-validation-error">
                                  {meta.touched && meta.error ? meta.error : ""}
                                </small>
                              </>
                            )}
                          </Field>
                        </AsyncSelectDiv>
                      </InnerBodyQuantity>
                    )}
                    {props.pageLabel === "Vendors" && (
                      <InnerBody style={{ margin: "12px 0" }}>
                        <PiInputForm
                          name="supplier_name"
                          label="Name"
                          libraryType="atalskit"
                          type="text"
                          placeholder="Enter Name"
                          className="Name"
                          maxLength={30}
                          onChange={() => setServerMsg(null)}
                          // isMandatory
                          isDisabled
                        />

                        {/* <PiSelectForm
                              name={"status"}
                              label={"Status"}
                              placeholder={isChecked ? "Active" : "InActive"}
                              // isDisabled={true}
                              classNamePrefix="react-select"
                              options={
                                isChecked
                                  ? [
                                      {
                                        value: "false",
                                        label: "InActive",
                                      },
                                    ]
                                  : [
                                      {
                                        value: "true",
                                        label: "Active",
                                      },
                                    ]
                              }
                              onChange={changeValue}
                            /> */}
                        <PiTextareaForm
                          name="description"
                          label="Description"
                          value={areaValue}
                          onChange={(e: any) => handleTextArea(e)}
                          libraryType="atalskit"
                          placeholder="Enter Description"
                          maxLength={255}
                        />

                        <div className="width-100 checkbox-form-field">
                          <Field name="is_different_pricing">
                            {({ field }: any) => (
                              <PiCheckbox
                                helpText=""
                                isChecked={field.value}
                                label="Is Different Pricing"
                                libraryType="atalskit"
                                name="is_different_pricing"
                                // value={field.value}
                                onChange={(e: any) => onNcrChanged(e)}
                                size="medium"
                              />
                            )}
                          </Field>
                        </div>

                        <PiTextareaForm
                          name="pos_mail"
                          label="POS Mail"
                          // value={posmailValue}
                          // onChange={handlePosmailChange}
                          libraryType="atalskit"
                          placeholder="Enter Mail"
                          // maxLength={255}
                        />
                        {/* <PiTextareaForm
                              name="pos_test_mail"
                              label="POS Test Mail"
                              // value={posmailValue}
                              // onChange={handlePosmailChange}
                              libraryType="atalskit"
                              placeholder="Enter Test Mail"
                              // maxLength={255}
                            /> */}
                      </InnerBody>
                    )}

                    {props.pageLabel !== "PO_Min_Qty" &&
                      props.pageLabel !== "Vendors" && (
                        <InnerBody>
                          <PiInputForm
                            name="name"
                            label="Name"
                            libraryType="atalskit"
                            type="text"
                            placeholder="Name"
                            className="Name"
                            maxLength={30}
                            onChange={() => setServerMsg(null)}
                            isMandatory
                          />
                          {props.pageLabel === "Account_Types" && (
                            <PiSelectForm
                              name="mapping_accountype_id"
                              label="Account Type Mapped With"
                              placeholder="Select"
                              options={accountTypeList}
                              classNamePrefix="react-select"
                            />
                          )}

                          <PiSelectForm
                            name="status"
                            label="Status"
                            placeholder={isChecked ? "Active" : "InActive"}
                            isDisabled
                            classNamePrefix="react-select"
                            options={
                              isChecked
                                ? [
                                    {
                                      value: "false",
                                      label: "InActive",
                                    },
                                  ]
                                : [
                                    {
                                      value: "true",
                                      label: "Active",
                                    },
                                  ]
                            }
                          />
                          <PiTextareaForm
                            name="description"
                            label="Description"
                            value={areaValue}
                            onChange={(e: any) => handleTextArea(e)}
                            libraryType="atalskit"
                            placeholder="Description"
                            maxLength={255}
                          />
                        </InnerBody>
                      )}
                    {props.pageLabel === "PO_Min_Qty" && (
                      <InnerBodyQuantity>
                        <PiInputForm
                          name="quantity"
                          label="Quantity"
                          libraryType="atalskit"
                          type="number"
                          placeholder="Enter Quantity"
                          maxLength={10}
                        />
                      </InnerBodyQuantity>
                    )}
                  </FilterFormFields>
                </PiModalBody>
                {showerrormsg && (
                  <span
                    style={{
                      margin: "0 24px",
                      fontSize: "16px",
                      color: "red",
                    }}
                  >
                    {addVendorerrormsg || ""}
                  </span>
                )}
                <PiModalFooter>
                  {serverMsg && <div className="server-msg">{serverMsg}</div>}

                  <PiButton
                    appearance="secondary"
                    label="Reset"
                    onClick={formikProps.resetForm}
                    type="reset"
                    className="Secondary"
                  />

                  <PiButton
                    appearance="primary"
                    label="Add"
                    onClick={formikProps.handleSubmit}
                    className="Primary"
                  />
                </PiModalFooter>
              </>
            )}
          </Formik>
        )}
      </PiModal>
    </Popup>
  );
}

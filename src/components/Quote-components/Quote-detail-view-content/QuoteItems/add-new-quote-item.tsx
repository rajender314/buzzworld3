import {
  PiCheckbox,
  PiIconInputForm,
  PiInputForm,
  PiSelectForm,
  PiSpinner,
  PiTextareaForm,
} from "pixel-kit";
import { useEffect, useRef, useState } from "react";
import { AddAnotherRowBtn } from "@app/components/special-pricing-components/pricing-rule-configuarotor/pricing-rule-configurator.component";
import { Formik, Form, FieldArray, Field } from "formik";
import SpPlusIconImg from "@app/assets/images/spPlusIcon.svg";
import {
  AsyncLabel,
  CmpanyOptionDiv,
  RmaFields,
} from "@app/components/rmaModel/RmaModel.component";
import { AsyncSelect } from "@atlaskit/select";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse, FilterColumnProps } from "@app/services/schema/schema";
import deleteIcon from "@app/assets/images/delete-icon.svg";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import { AsyncSelectDiv } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import { CustomQuoteItemsValidationSchema } from "@app/components/RepairItems/repair-items-validator";
import {
  ImgTag,
  SpinnerDiv,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import { LinkWithIcon } from "@app/components/secondaryheader/secondaryheader.component";
import { AddNewItemDescription } from "../QuoteInformation/quote-info.component";
import {
  getQuoteLeadTimeOptions,
  getQuoteSourceOptions,
} from "../../quotes-helper";

export default function AddNewQuotePart({ quoteDetails, sendData }: any) {
  const formik = useRef<any>(null);
  const { current }: any = useRef({ timer: 0 });
  const [initialValues, setInitialValues]: any = useState({
    custom_part_items: [
      {
        supplier: "",
        part_number: "",
        quantity: "",
        description: "",
        quote_price: "",
        list_price: "",
        // suggested_price: '',
        customer_stock_code: "",
        iidm_cost: "",
        lead_time_value: "",
        notes: "",
        ncnr: !!quoteDetails.is_system_quote,
        lead_time: "",
        source: "",
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [quoteSourceOptions, setQuoteSourceOptions] = useState([]);
  const [quoteLeadTime, setQuoteLeadTime] = useState([]);
  const [selectedVendor, setSelectedVendor]: any = useState();
  const [vendorList, setVendorList]: any = useState([]);
  const [newInputValue, setNewInputValue]: any = useState();
  const getQuoteVendorList = () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteVendors}?is_system_quote=true`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          setSelectedVendor(data);
          initialValues.custom_part_items[0].supplier = data;
          setInitialValues(initialValues);
          setLoading(false);
        }
      })

      .catch(() => {});
  };
  useEffect(() => {
    (async () => {
      const data: any = await getQuoteSourceOptions();
      const list: any = await getQuoteLeadTimeOptions();
      setQuoteLeadTime(list);
      setQuoteSourceOptions(data);
      if (quoteDetails && quoteDetails.is_system_quote) {
        getQuoteVendorList();
      } else {
        setLoading(false);
      }
    })();
  }, []);
  function handleRef(e: any) {
    formik.current = e;
    sendData(formik);
  }

  // eslint-disable-next-line no-unused-vars
  const addRow = (pushData: (e: any) => void, handleSubmit: any) => {
    handleSubmit();
    if (formik.current.isValid === true) {
      const newValues = {
        supplier:
          quoteDetails && quoteDetails.is_system_quote ? selectedVendor : "",
        part_number: "",
        description: "",
        quantity: "",
        quote_price: "",
        list_price: "",
        // suggested_price: '',
        customer_stock_code: "",
        iidm_cost: "",
        lead_time_value: "",
        notes: "",
        ncnr: !!quoteDetails.is_system_quote,
        source: "",
        lead_time: "",
      };
      pushData(newValues);
      initialValues.custom_part_items.push(newValues);
      setInitialValues(initialValues);
    }
  };

  const filterVendorData = async (inputValue: string) => {
    let data: any = [];
    if (inputValue.length >= 3) {
      setNewInputValue(inputValue);
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.QuoteVendors}?search=${inputValue}&type=new&status[0]=true`,
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
              ...item,
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
            }));
            data = arr;
            setVendorList([...data]);
          }
        })
        .catch(() => {});
      return data;
    }
    return data;
  };
  const promiseOptions = (inputValue: string) =>
    new Promise((resolve) => {
      setNewInputValue("");
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
  const HandleChange = (
    form: any,
    fieldLabel: any,
    value: any,
    index: number,
    // eslint-disable-next-line no-unused-vars
    replace: (index1?: any, value1?: any) => void,
    fieldName: string
  ) => {
    if (value) {
      const obj = { value: value.id, label: value.name, code: value.code };
      form.setFieldValue(fieldLabel, obj);
    } else {
      setNewInputValue("");
      // initialValues[fieldLabel]  =''
      // setInitialvalues(initialValues)
      if (fieldName === "supplier") {
        const newValues = {
          // supplier: '',
          // part_number:
          //  formik.current.values.custom_part_items[index].part_number,
          // description:
          //  formik.current.values.custom_part_items[index].description,

          supplier: "",
          part_number:
            formik.current.values.custom_part_items[index].part_number,
          quantity: formik.current.values.custom_part_items[index].quantity,
          description:
            formik.current.values.custom_part_items[index].description,
          quote_price:
            formik.current.values.custom_part_items[index].quote_price,
          list_price: formik.current.values.custom_part_items[index].list_price,
          // suggested_price: '',
          customer_stock_code:
            formik.current.values.custom_part_items[index].customer_stock_code,
          iidm_cost: formik.current.values.custom_part_items[index].iidm_cost,
          lead_time_value:
            formik.current.values.custom_part_items[index].lead_time_value,
          notes: formik.current.values.custom_part_items[index].notes,
          ncnr: formik.current.values.custom_part_items[index].ncnr,
          source: formik.current.values.custom_part_items[index].source,
          lead_time: formik.current.values.custom_part_items[index].lead_time,
        };
        replace(index, newValues);
      }
    }
  };
  const blurEvent = (form: any, fieldLabel: any) => {
    // form.setFieldValue(`date_range`, '123')
    if (newInputValue && vendorList.length === 0) {
      form.setFieldValue(fieldLabel, {
        value: newInputValue,
        label: newInputValue,
        code: null,
      });
    }
  };

  const onNcrChanged = (e: any, indx: number) => {
    formik.current.setFieldValue(
      `custom_part_items.${indx}.ncnr`,
      e.target.checked
    );
  };
  const onChangeLeadTime = (e: any, action: any, indx: number) => {
    if (e.label === "TBD") {
      formik.current.setFieldValue(
        `custom_part_items.${indx}.lead_time_value`,
        ""
      );
    } else {
      formik.current.setFieldValue(
        `custom_part_items.${indx}.lead_time_value`,
        ""
      );
    }

    if (e) {
      initialValues.custom_part_items[indx].lead_time = e;
      setInitialValues(initialValues);
    } else {
      initialValues.custom_part_items[indx].lead_time = "";
      setInitialValues(initialValues);
    }
  };
  return (
    <>
      {loading && (
        <SpinnerDiv style={{ height: "100%" }}>
          <PiSpinner color="primary" size={50} libraryType="atalskit" />
        </SpinnerDiv>
      )}
      {!loading && (
        <Formik
          validationSchema={() =>
            CustomQuoteItemsValidationSchema(quoteDetails)
          }
          initialValues={initialValues}
          innerRef={(e: any) => handleRef(e)}
          validateOnMount
          onSubmit={() => {}}
        >
          {({ values, handleSubmit }: any) => (
            <Form>
              <FieldArray name="custom_part_items">
                {({ remove, push, replace }) => (
                  <>
                    <FormBodyOverFlow style={{ padding: "0 10px" }}>
                      {values.custom_part_items.length > 0 &&
                        values.custom_part_items.map(
                          (friend: any, index: any) => (
                            <>
                              <RmaFields
                                // className="pd-left-zero"
                                style={{ justifyContent: "flex-start" }}
                              >
                                <div className="calc-width-33">
                                  <Field
                                    name={`custom_part_items.${index}.supplier`}
                                  >
                                    {({ field, form, meta }: any) => {
                                      console.log(field);
                                      return (
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
                                            name={`custom_part_items.${index}.supplier`}
                                            inputId="async-select-example"
                                            classNamePrefix="react-select"
                                            onInputChange={handleInputChange}
                                            loadOptions={promiseOptions}
                                            placeholder="Search"
                                            onChange={(value) => {
                                              HandleChange(
                                                form,
                                                `custom_part_items.${index}.supplier`,
                                                value,
                                                index,
                                                replace,
                                                "supplier"
                                              );
                                            }}
                                            // value={supplier}
                                            value={field.value}
                                            onBlur={() => {
                                              blurEvent(
                                                form,
                                                `custom_part_items.${index}.supplier`
                                              );
                                            }}
                                            isClearable
                                          />
                                          <small className="validation-error">
                                            {meta.touched && meta.error
                                              ? meta.error
                                              : ""}
                                          </small>
                                        </AsyncSelectDiv>
                                      );
                                    }}
                                  </Field>
                                </div>

                                <div className="custom-part calc-width-33">
                                  <PiInputForm
                                    name={`custom_part_items.${index}.part_number`}
                                    libraryType="atalskit"
                                    type="text"
                                    placeholder="Part Number"
                                    label="Part Number"
                                    isMandatory
                                    maxLength={45}
                                  />
                                </div>
                                <div className="custom-part calc-width-33">
                                  <PiInputForm
                                    name={`custom_part_items.${index}.quantity`}
                                    libraryType="atalskit"
                                    type="number"
                                    placeholder="Quantity"
                                    label="Quantity"
                                    isMandatory
                                    maxLength={10}
                                  />
                                </div>
                                <div className="custom-part calc-width-33 icon_input ">
                                  <PiIconInputForm
                                    name={`custom_part_items.${index}.quote_price`}
                                    libraryType="atalskit"
                                    type="string"
                                    placeholder="Quote Price"
                                    label="Quote Price"
                                    isMandatory
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
                                </div>
                                {/* <div className="custom-part calc-width-33 icon_input">
                                      <PiIconInputForm
                                        name={`custom_part_items.${index}.suggested_price`}
                                        libraryType="atalskit"
                                        type="string"
                                        placeholder="Suggested Price"
                                        label="Suggested Price"
                                        elemBeforeInput={
                                          <div
                                            style={{
                                              padding: '10px',
                                              color: '#6D7992',
                                              borderRight: '1px solid #d0d1d3',
                                            }}
                                          >
                                            $
                                          </div>
                                        }
                                        isMandatory
                                      />
                                    </div> */}
                                <div className="custom-part calc-width-33 icon_input">
                                  <PiIconInputForm
                                    name={`custom_part_items.${index}.list_price`}
                                    libraryType="atalskit"
                                    type="string"
                                    placeholder="List Price"
                                    label="List Price"
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
                                    isMandatory
                                  />
                                </div>
                                <div className="custom-part calc-width-33 icon_input">
                                  <PiIconInputForm
                                    name={`custom_part_items.${index}.iidm_cost`}
                                    libraryType="atalskit"
                                    type="string"
                                    placeholder="IIDM Cost"
                                    label="IIDM Cost"
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
                                    isMandatory
                                  />
                                </div>
                                {quoteDetails.is_repair === false && (
                                  <div className="calc-width-33">
                                    <PiSelectForm
                                      name={`custom_part_items.${index}.source`}
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
                                <div className="calc-width-33">
                                  <PiSelectForm
                                    name={`custom_part_items.${index}.lead_time`}
                                    label="Turn Around Time"
                                    placeholder="Select"
                                    isMulti={false}
                                    options={quoteLeadTime}
                                    classNamePrefix="react-select"
                                    onChange={(e: any, actionMeta: any) =>
                                      onChangeLeadTime(e, actionMeta, index)
                                    }
                                    isMandatory
                                  />
                                </div>
                                {initialValues.custom_part_items[index] &&
                                  initialValues.custom_part_items[index]
                                    .lead_time &&
                                  initialValues.custom_part_items[index]
                                    .lead_time.label !== "TBD" && (
                                    <div className="calc-width-33">
                                      <PiInputForm
                                        name={`custom_part_items.${index}.lead_time_value`}
                                        label={
                                          initialValues.custom_part_items[index]
                                            .lead_time
                                            ? initialValues.custom_part_items[
                                                index
                                              ].lead_time.label
                                            : ""
                                        }
                                        placeholder={
                                          initialValues.custom_part_items[index]
                                            .lead_time
                                            ? initialValues.custom_part_items[
                                                index
                                              ].lead_time.label
                                            : ""
                                        }
                                      />
                                    </div>
                                  )}
                                <div className="width-100 checkbox-form-field">
                                  <Field
                                    name={`custom_part_items.${index}.ncnr`}
                                  >
                                    {({ field }: any) => {
                                      console.log(field.value);
                                      return (
                                        <PiCheckbox
                                          helpText=""
                                          isChecked={field.value}
                                          label="NCNR"
                                          libraryType="atalskit"
                                          name="ncnr"
                                          // value={field.value}
                                          onChange={(e: any) =>
                                            onNcrChanged(e, index)
                                          }
                                          size="medium"
                                        />
                                      );
                                    }}
                                  </Field>
                                </div>
                                {/* <div  onClick={() => addRow(values, push)}>+</div> */}
                              </RmaFields>
                              <AddNewItemDescription className="add-new-item-description">
                                <PiTextareaForm
                                  name={`custom_part_items.${index}.description`}
                                  libraryType="atalskit"
                                  placeholder="Description"
                                  label="Description"
                                />
                                <AddAnotherRowBtn className="row-del-img-div">
                                  {/* <img
                                        className="row-del-img"
                                        src={RowDelImg}
                                        alt="loading"
                                        title="Delete Row"
                                        onClick={() => remove(index)}
                                      /> */}
                                  <LinkWithIcon
                                    className="Icon-space secondary-button  "
                                    style={{
                                      background: "#ffffff",
                                      border: "2px solid #d0daec",
                                      color: "#124eb0",
                                      height: "36px",
                                      alignSelf: "flex-end",
                                      justifySelf: "flex-end",
                                      marginBottom: "8px",
                                    }}
                                    onClick={() => remove(index)}
                                  >
                                    <ImgTag
                                      src={deleteIcon}
                                      alt="loading"
                                      style={{ marginRight: "4px" }}
                                    />
                                    <span className=" ">Delete Row</span>
                                  </LinkWithIcon>
                                </AddAnotherRowBtn>
                              </AddNewItemDescription>
                            </>
                          )
                        )}
                      <AddAnotherRowBtn className="repair-select-add-row">
                        <div
                          className="add-row-div"
                          onClick={() => addRow(push, handleSubmit)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              addRow(push, handleSubmit);
                            }
                          }}
                          role="button"
                          tabIndex={0}
                        >
                          <img src={SpPlusIconImg} alt="loading" />
                          <p className="add-row-text">Add another row</p>
                        </div>
                      </AddAnotherRowBtn>
                    </FormBodyOverFlow>
                    {/* {quoteDetails && quoteDetails.is_system_quote === true && (
                          <SideDrawerFooter>
                            {serverMsg && (
                              <div className="server-msg">{serverMsg}</div>
                            )}
                            <PiButton
                              appearance="primary"
                              label={'Add Item'}
                              onClick={addNewPart}
                            />
                          </SideDrawerFooter>
                        )} */}
                  </>
                )}
              </FieldArray>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}

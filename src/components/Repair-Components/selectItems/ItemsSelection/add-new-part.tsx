import { PiInputForm, PiTextareaForm } from "pixel-kit";
import { useRef, useState } from "react";
import { CustomPartItemsValidationSchema } from "@app/components/RepairItems/repair-items-validator";
import {
  RepairItemsColumn,
  NewPartItemsField,
  AddNewPartFieldsWrapper,
} from "@app/components/RepairItems/repair-items.component";
import { AddAnotherRowBtn } from "@app/components/special-pricing-components/pricing-rule-configuarotor/pricing-rule-configurator.component";
import { Formik, Form, FieldArray, Field } from "formik";
import SpPlusIconImg from "@app/assets/images/spPlusIcon.svg";
import {
  AsyncLabel,
  CmpanyOptionDiv,
} from "@app/components/rmaModel/RmaModel.component";
import { AsyncSelect } from "@atlaskit/select";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse, FilterColumnProps } from "@app/services/schema/schema";
import deleteIcon from "@app/assets/images/delete-icon.svg";
import {
  LinkWithIcon,
  ImgTag,
} from "@app/components/secondaryheader/secondaryheader.component";
import { AsyncSelectDiv } from "../AddPartRepair/add-part-repair.component";
import { FormBodyOverFlow } from "../../checksIns/assignLocation/assign-location.component";

export default function AddNewPart({ from, sendData }: any) {
  const formik = useRef<any>(null);
  const { current }: any = useRef({ timer: 0 });
  const initialValues = {
    custom_part_items: [
      {
        supplier: "",
        part_number: "",
        description: "",
        serial_number: "",
      },
    ],
  };
  const [vendorList, setVendorList]: any = useState([]);
  const [newInputValue, setNewInputValue]: any = useState();
  function handleRef(e: any) {
    console.log(e);

    formik.current = e;
    sendData(formik);
  }
  function submitForm(data: any) {
    console.log(data);
  }
  const addRow = (
    // eslint-disable-next-line no-unused-vars
    pushData: (e: any) => void,
    handleSubmit: any
  ) => {
    console.log(formik);
    handleSubmit();
    if (formik.current.isValid === true) {
      const newValues = {
        supplier: "",
        part_number: "",
        description: "",
        serial_number: "",
      };
      pushData(newValues);
      // initialValues.custom_part_items.push(newValues)
      // setInitialvalues(initialValues)
    }
  };

  const filterVendorData = async (inputValue: string) => {
    let data: any = [];
    if (inputValue.length >= 3) {
      setNewInputValue(inputValue);
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl:
          from === "repairs"
            ? `${EndpointUrl.RepairVendors}?search=${inputValue}&type=new`
            : `${EndpointUrl.QuoteCustomerDropdown}?search=${inputValue}&type=new`,
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
        .catch((err: string) => {
          console.log(err);
        });
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
    // eslint-disable-next-line no-shadow, no-unused-vars
    replace: (index: number, value: any) => void,
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
          supplier: "",
          part_number:
            formik.current.values.custom_part_items[index].part_number,
          description:
            formik.current.values.custom_part_items[index].description,
          serial_number:
            formik.current.values.custom_part_items[index].serial_number,
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

  return (
    <Formik
      validationSchema={CustomPartItemsValidationSchema}
      onSubmit={(e: any) => submitForm(e)}
      initialValues={initialValues}
      innerRef={(e: any) => handleRef(e)}
      validateOnMount
    >
      {({ values, handleSubmit }: any) => (
        <Form>
          <FieldArray name="custom_part_items">
            {({ remove, push, replace }) => (
              <FormBodyOverFlow style={{ paddingLeft: "4px" }}>
                {values.custom_part_items.length > 0 &&
                  values.custom_part_items.map((friend: any, index: any) => (
                    <AddNewPartFieldsWrapper
                      className={
                        index !== values.custom_part_items.length - 1
                          ? "card-separator"
                          : ""
                      }
                      style={{ paddingTop: "0px" }}
                    >
                      <NewPartItemsField className="pd-left-zero">
                        <RepairItemsColumn
                          style={{
                            width: "100%",
                            minWidth: "unset",
                            height: "76px",
                          }}
                        >
                          <Field name={`custom_part_items.${index}.supplier`}>
                            {({ field, form, meta }: any) => (
                              <AsyncSelectDiv className="manufacter-select">
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
                                  classNamePrefix="react-select "
                                  className="margin"
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
                                  focus={(e: any) => console.log(e)}
                                  noOptionsMessage={(obj: any) =>
                                    !obj.inputValue
                                      ? "Search Manufacturer Name"
                                      : " Manufacturer Not Found"
                                  }
                                  isClearable
                                />
                                <small className="validation-error">
                                  {meta.touched && meta.error ? meta.error : ""}
                                </small>
                              </AsyncSelectDiv>
                            )}
                          </Field>
                        </RepairItemsColumn>
                        {/* <RepairItemsColumn
                                  style={{ width: '100%', minWidth: 'unset' }}
                                >
                                  <Field
                                    name={`custom_part_items.${index}.part_number`}
                                  >
                                    {({ field, form, meta }: any) => {
                                      return (
                                        <AsyncSelectDiv>
                                          <AsyncLabel
                                            htmlFor="async-select-example"
                                            className="css-re7y6x"
                                          >
                                            Part Number
                                          </AsyncLabel>
                                          <AsyncSelect
                                            name={`custom_part_items.${index}.part_number`}
                                            inputId="async-select-example"
                                            classNamePrefix="react-select"
                                            onInputChange={handleInputChange}
                                            loadOptions={promisePartNoOptions}
                                            placeholder="Search"
                                            onChange={(value) => {
                                              HandleChange(
                                                form,
                                                `custom_part_items.${index}.part_number`,
                                                value,
                                                index,
                                                replace,
                                                'part_number',
                                              )
                                            }}
                                            //value={partNumber}
                                            value={field.value}
                                            onBlur={() => {
                                              blurPartNoEvent(
                                                form,
                                                `custom_part_items.${index}.part_number`,
                                              )
                                            }}
                                            focus={(e: any) => console.log(e)}
                                            isClearable
                                          />
                                          <small className="validation-error">
                                            {meta.touched && meta.error
                                              ? meta.error
                                              : ''}
                                          </small>
                                        </AsyncSelectDiv>
                                      )
                                    }}
                                  </Field>
                                </RepairItemsColumn> */}
                        <RepairItemsColumn
                          className="custom-part"
                          style={{
                            width: "100%",
                            minWidth: "unset",
                            height: "76px",
                          }}
                        >
                          <PiInputForm
                            name={`custom_part_items.${index}.part_number`}
                            libraryType="atalskit"
                            type="text"
                            placeholder="Part Number"
                            label="Part Number"
                            className="add-new-part-field"
                            isMandatory
                            maxLength={45}
                          />
                        </RepairItemsColumn>
                        <RepairItemsColumn
                          className="custom-part"
                          style={{
                            width: "100%",
                            minWidth: "unset",
                            height: "76px",
                          }}
                        >
                          <PiInputForm
                            name={`custom_part_items.${index}.serial_number`}
                            libraryType="atalskit"
                            type="text"
                            placeholder="Serial No"
                            label="Serial No"
                            isMandatory
                          />
                        </RepairItemsColumn>
                        {/* <div  onClick={() => addRow(values, push)}>+</div> */}
                      </NewPartItemsField>

                      <RepairItemsColumn className="add-new-item-description">
                        <div className="add-new-description">
                          <PiTextareaForm
                            name={`custom_part_items.${index}.description`}
                            libraryType="atalskit"
                            placeholder="Description"
                            label="Description"
                          />
                        </div>
                        <AddAnotherRowBtn className="row-del-img-div">
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
                        {/* <AddAnotherRowBtn className="row-del-img-div">
                                    <img
                                      className="row-del-img"
                                      src={RowDelImg}
                                      alt="loading"
                                      title="Delete Row"
                                      onClick={() => remove(index)}
                                    />
                                  </AddAnotherRowBtn> */}
                      </RepairItemsColumn>
                    </AddNewPartFieldsWrapper>
                  ))}
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
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
}

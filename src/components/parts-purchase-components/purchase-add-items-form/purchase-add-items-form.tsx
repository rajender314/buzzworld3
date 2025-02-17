import {
  PiButton,
  PiIconInputForm,
  PiInputForm,
  PiSideDrawer,
  PiSpinner,
  PiTextareaForm,
  PiToast,
  PiTypography,
} from "pixel-kit";
import { useRef, useState } from "react";
import { Formik, Form, FieldArray, Field } from "formik";

import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";

import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";

import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import CrossLogo from "@app/assets/images/cross.svg";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import SpPlusIconImg from "@app/assets/images/spPlusIcon.svg";
import RowDelImg from "@app/assets/images/row_delete_img.svg";
import PurchasePrice from "@app/assets/images/partspurchase-detailview.svg";

import { AsyncLabel } from "@app/components/rmaModel/RmaModel.component";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";

import { AsyncSelectDiv } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import { AsyncSelect } from "@atlaskit/select";
import { PoFormField } from "../po-information-form/po-information-form-components";
import {
  ItemInfoAddRowContainer,
  PartPurchaseAddAnotherRowBtn,
  PartsPurchaseSideDrawerContainer,
  PoPopupHeaderContainer,
  PurchaseFormSideDrawer,
  RequestorInformationBottomDrawerFooter,
} from "../parts-purchase-form.tsx/parts-purchase-form-components";
import PurchaseAddFormValidationSchema from "./purchase-add-items-form-validation";

type Props = {
  sendAddItemAction: any;
  PurchaseId: any;
};
export default function PurchaseaddItemsForm({
  sendAddItemAction,
  PurchaseId,
}: Props) {
  const { current }: any = useRef({ timer: 0 });
  const [opacity, setOpacity] = useState(false);
  const [QtyValue, setQtyValue]: any = useState();
  const [cost, setCost]: any = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showErrormsg, setShowErrorMsg] = useState();
  const [mfgOptions, setMfgOptions]: any = useState([]);
  const [initialValues, setInitialValues] = useState({
    items: [
      {
        job_number: "",
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

  const formik = useRef<any>(null);
  // useEffect(() => {
  //   getMfgname();
  // }, []);

  function handleRef(e: any) {
    formik.current = e;
  }

  const handleSubmitForm = (data: any) => {
    if (formik.current.isValid) {
      setOpacity(true);
      data.items.map((obj: any) => {
        if (obj.mfg_part_number) {
          obj.mfg_part_number = obj.mfg_part_number.trim();
        }
        return obj;
      });
      setTimeout(() => {
        const params = {
          ...data,
          part_purchase_id: PurchaseId || "",
        };
        const apiObject = {
          payload: params,
          method: "POST",
          apiUrl: `${EndpointUrl.AddPurchaseItems}`,
          headers: {},
        };
        triggerApi(apiObject)
          .then((response: any) => {
            if (
              response.result.success &&
              response.result.status_code === 200
            ) {
              setShowPopup(true);
              // setOpacity(false)
              setShowErrorPopup(false);
              setTimeout(() => {
                sendAddItemAction({ success: true });
              }, 500);
            } else if (response.result.success === false) {
              setShowErrorPopup(true);
              setShowErrorMsg(response.result.data);
              setOpacity(false);
            }
          })
          .catch((err: string) => {
            console.log(err);
          });
      }, 500);
    }
  };

  // const getMfgname = () => {
  //   setOpacity(true);
  //   const apiObject = {
  //     payload: {},
  //     method: "GET",
  //     apiUrl: `${EndpointUrl.ppVendorList}?status=true`,
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
        apiUrl: `${EndpointUrl.getSysproJobInformation}?job_id=${searchValue}`,
        headers: {},
      };
      await triggerApi(apiObject)
        .then((res: any) => {
          if (res.result.success && res.result.status_code === 200) {
            const arr: any = [res.result.data];

            // let arr: any = [
            //   {
            //     value: res.result.data.job_id,
            //     label: res.result.data.job_id,
            //   },
            // ];

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

  const addRow = (
    index: number,
    values: any,
    pushData: any,
    handleSubmit: any
  ) => {
    handleSubmit();

    if (formik.current.isValid) {
      const newValues = {
        job_number: "",
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
      initialValues.items.push(newValues);
      setInitialValues(initialValues);
    }
  };
  const onCostChange = (e: any, i: number) => {
    setCost(e.target.value);
    const exCost: any = QtyValue * e.target.value;
    const finalExCost = exCost?.toLocaleString(undefined, {
      minimumFractionDigits: 6,
      maximumFractionDigits: 6,
    });
    formik.current.setFieldValue(`items.${i}.extended_cost`, finalExCost);
  };
  const onItemQtyChange = (e: any, i: number) => {
    setQtyValue(e.target.value);
    const exCost: any = e.target.value * cost;
    const finalExCost = exCost?.toLocaleString(undefined, {
      minimumFractionDigits: 6,
      maximumFractionDigits: 6,
    });
    if (cost && cost.length) {
      formik.current.setFieldValue(`items.${i}.extended_cost`, finalExCost);
    }
  };
  const [newInputValue, setNewInputValue]: any = useState();
  const getManufacturers = async (manufacturersearchValue: string) => {
    let list: any = [];
    setMfgOptions([]);
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
              value: item.id,
              label: item.name.toUpperCase(),
            }));
            list = arr;
            setMfgOptions(list);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
      return list;
    }
    return list;
  };
  function closeModel() {
    sendAddItemAction({ closePopup: true });
  }
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
    // form.setFieldValue(`date_range`, '123')
    if (newInputValue && mfgOptions.length === 0) {
      form.setFieldValue(fieldLabel, {
        value: newInputValue,
        label: newInputValue,
      });
    }
  };
  return (
    <>
      <PartsPurchaseSideDrawerContainer>
        <PurchaseFormSideDrawer>
          <PiSideDrawer isOpen width="narrow">
            <SideDrawerContainer className="po-info-sidebar">
              <SideDrawerHeader>
                <PoPopupHeaderContainer>
                  <img
                    src={PurchasePrice}
                    alt="loading"
                    className="po-info-form-img"
                  />
                  <PiTypography component="h3">Add Items</PiTypography>
                </PoPopupHeaderContainer>

                <CloseButton
                  onClick={() => closeModel()}
                  title="close"
                  className="Hover"
                >
                  <img src={CrossLogo} alt="loading" />
                </CloseButton>
              </SideDrawerHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={PurchaseAddFormValidationSchema}
                onSubmit={handleSubmitForm}
                innerRef={(e: any) => handleRef(e)}
                validateOnMount
              >
                {({ values, handleSubmit }) => (
                  <>
                    <Form style={{ flex: "1", overflow: "auto" }}>
                      <FieldArray name="items">
                        {({ remove, push }) => (
                          <FormBodyOverFlow
                            style={{ padding: "25px" }}
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
                            {values.items.length > 0 &&
                              values.items.map((item, index) => (
                                <div
                                  className={
                                    index !== values.items.length - 1
                                      ? "pp-add-fields-container card-separator"
                                      : "pp-add-fields-container"
                                  }
                                >
                                  <PoFormField>
                                    <AsyncSelectDiv>
                                      <AsyncLabel
                                        htmlFor="async-select-example"
                                        className="mandatory"
                                      >
                                        Job Number
                                      </AsyncLabel>
                                      <Field name={`items.${index}.job_number`}>
                                        {({ field, form, meta }: any) => (
                                          <>
                                            <AsyncSelect
                                              name={`items.${index}.job_number`}
                                              inputId="async-select-example"
                                              classNamePrefix="react-select"
                                              onInputChange={handleInputChanges}
                                              loadOptions={promiseOptions}
                                              placeholder="Search Job Number"
                                              onChange={(value) => {
                                                form.setFieldValue(
                                                  `items.${index}.job_number`,
                                                  value
                                                );
                                              }}
                                              isClearable
                                              isDisabled={opacity}
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
                                  </PoFormField>
                                  {/* <PoFormContentContainer> */}
                                  <PoFormField>
                                    <AsyncSelectDiv>
                                      <AsyncLabel
                                        htmlFor="async-select-example"
                                        className="mandatory"
                                      >
                                        Manufacturer Name
                                      </AsyncLabel>
                                      <Field name={`items.${index}.mfg_name`}>
                                        {({ field, form, meta }: any) => (
                                          <>
                                            <AsyncSelect
                                              name={`items.${index}.mfg_name`}
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
                                                    `items.${index}.mfg_name`,
                                                    value
                                                  );
                                                } else {
                                                  setNewInputValue("");
                                                  form.setFieldValue(
                                                    `items.${index}.mfg_name`,
                                                    ""
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
                                                  `items.${index}.mfg_name`
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
                                  </PoFormField>

                                  <PoFormField>
                                    <PiInputForm
                                      name={`items.${index}.mfg_part_number`}
                                      label=" Manufacturer Part Number"
                                      type="text"
                                      // isMandatory
                                      placeholder="Enter Manufacturer Part Number"
                                      isDisabled={opacity}
                                      convertToCapital
                                    />
                                  </PoFormField>
                                  {/* </PoFormContentContainer> */}
                                  {/* <PoFormContentContainer> */}
                                  <PoFormField>
                                    <PiInputForm
                                      name={`items.${index}.qty`}
                                      label="Quantity"
                                      isMandatory
                                      type="text"
                                      placeholder="Enter quantity"
                                      onChange={(e: any) => {
                                        onItemQtyChange(e, index);
                                      }}
                                      isDisabled={opacity}
                                    />
                                  </PoFormField>
                                  <PoFormField>
                                    <PiInputForm
                                      name={`items.${index}.vendor_part_number`}
                                      label="Vendor Part Number"
                                      type="text"
                                      placeholder="Enter Vendor Part Number"
                                      isMandatory
                                      isDisabled={opacity}
                                      convertToCapital
                                    />
                                  </PoFormField>
                                  {/* </PoFormContentContainer> */}
                                  {/* <PoFormContentContainer> */}
                                  <PoFormField className="icon_input">
                                    <PiIconInputForm
                                      name={`items.${index}.cost`}
                                      label="Cost"
                                      type="string"
                                      isMandatory
                                      onChange={(e: any) => {
                                        onCostChange(e, index);
                                      }}
                                      allowedDecimalsPoints={6}
                                      isDisabled={opacity}
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
                                  </PoFormField>
                                  <PoFormField className="icon_input">
                                    <PiIconInputForm
                                      name={`items.${index}.extended_cost`}
                                      label="Extended Cost"
                                      isDisabled
                                      placeholder="Enter Extended Cost"
                                      type="text"
                                      allowedDecimalsPoints={6}
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
                                  </PoFormField>
                                  {/* </PoFormContentContainer> */}

                                  <div style={{ width: "100%" }}>
                                    <PiTextareaForm
                                      helpText=""
                                      label="Description"
                                      libraryType="atalskit"
                                      minimumRows={3}
                                      name={`items.${index}.description`}
                                      placeholder="Enter Description"
                                      isDisabled={opacity}
                                      isMandatory
                                      convertToCapital
                                    />
                                  </div>
                                  <div style={{ width: "100%" }}>
                                    <PiTextareaForm
                                      helpText=""
                                      label="Item Special Notes"
                                      libraryType="atalskit"
                                      minimumRows={3}
                                      name={`items.${index}.special_notes`}
                                      placeholder="Enter Item Special Notes"
                                      isDisabled={opacity}
                                    />
                                  </div>
                                  <div style={{ width: "100%" }}>
                                    <PiTextareaForm
                                      helpText=""
                                      label="Item Notes"
                                      libraryType="atalskit"
                                      minimumRows={3}
                                      name={`items.${index}.item_notes`}
                                      placeholder="Enter Item Notes"
                                      isDisabled={opacity}
                                    />
                                  </div>
                                  <ItemInfoAddRowContainer
                                    className={opacity ? "isDisable" : ""}
                                    style={{ width: "100%" }}
                                  >
                                    {index === values.items.length - 1 && (
                                      <PartPurchaseAddAnotherRowBtn>
                                        <div
                                          className="add-row-div"
                                          onClick={() =>
                                            addRow(
                                              index,
                                              values,
                                              push,
                                              handleSubmit
                                            )
                                          }
                                          onKeyDown={(event) => {
                                            if (
                                              event.key === "Enter" ||
                                              event.key === " "
                                            ) {
                                              addRow(
                                                index,
                                                values,
                                                push,
                                                handleSubmit
                                              );
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
                                            Add another row
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
                                </div>
                              ))}
                          </FormBodyOverFlow>
                        )}
                      </FieldArray>
                    </Form>

                    <RequestorInformationBottomDrawerFooter className="po-sidebar-footer">
                      {showErrorPopup && (
                        <div style={{ color: "red" }}>{showErrormsg || ""}</div>
                      )}
                      <PiButton
                        appearance="primary"
                        label="Save"
                        libraryType="atalskit"
                        onClick={handleSubmit}
                        isDisabled={opacity}
                      />
                    </RequestorInformationBottomDrawerFooter>
                  </>
                )}
              </Formik>
            </SideDrawerContainer>
          </PiSideDrawer>
        </PurchaseFormSideDrawer>
      </PartsPurchaseSideDrawerContainer>
      <PiToast
        className={showPopup ? "show" : ""}
        headerLabel="Add Items"
        message="Items Added Successfully "
        onClose={async () => setShowPopup(false)}
      />
    </>
  );
}

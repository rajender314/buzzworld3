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
import { useEffect, useRef, useState } from "react";
import { Formik, Field } from "formik";

import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import CrossLogo from "@app/assets/images/cross.svg";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import PurchasePrice from "@app/assets/images/partspurchase-detailview.svg";
import { AsyncLabel } from "@app/components/rmaModel/RmaModel.component";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import { AsyncSelect } from "@atlaskit/select";
import { AsyncSelectDiv } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import { useParams } from "react-router-dom";
import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";
import PurchaseEditFormValidationSchema from "./purchase-items-edit-form-validation";
import { PoFormField } from "../po-information-form/po-information-form-components";
import {
  PartsPurchaseSideDrawerContainer,
  PoPopupHeaderContainer,
  PurchaseFormSideDrawer,
  RequestorInformationBottomDrawerFooter,
} from "../parts-purchase-form.tsx/parts-purchase-form-components";

type Props = {
  sendItemAction: any;
  Itemformation: any;
  PurchaseId: any;
  Mtplx: any;
};
export default function PurchaseItemEditForm({
  sendItemAction,
  Itemformation,
  PurchaseId,
  Mtplx,
}: Props) {
  const formik = useRef<any>(null);
  const { id }: RouteParams = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const [mfgOptions, setMfgOptions] = useState([]);
  const { current }: any = useRef({ timer: 0 });
  const [QtyValue, setQtyValue]: any = useState();
  const [cost, setCost]: any = useState("");
  const [showErrormsg, setShowErrorMsg] = useState();
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const obj: any = {
    label:
      Itemformation && Itemformation.mfg_name ? Itemformation.mfg_name : "",
    value:
      Itemformation && Itemformation.manufacturer_id
        ? Itemformation.manufacturer_id
        : "",
  };

  const [initialValues, setInitialValues] = useState<any>({
    job_number:
      Itemformation && Itemformation.job_number ? Itemformation.job_number : "",
    mfg_name: obj || "",
    mfg_part_number:
      Itemformation && Itemformation.mfg_part_number
        ? Itemformation.mfg_part_number
        : "",
    qty: Itemformation && Itemformation.qty ? Itemformation.qty : "",
    vendor_part_number:
      Itemformation && Itemformation.vendor_part_number
        ? Itemformation.vendor_part_number
        : "",
    cost:
      Itemformation && Itemformation.cost
        ? Itemformation.cost.replace(",", "")
        : "",
    extended_cost:
      Itemformation && Itemformation.extended_cost
        ? Itemformation.extended_cost.replace(",", "")
        : "",
    adjusted_cost:
      Itemformation && Itemformation.adjusted_cost
        ? Itemformation.adjusted_cost.replace(",", "")
        : "",
    description:
      Itemformation && Itemformation.description
        ? Itemformation.description
        : "",
    special_notes:
      Itemformation && Itemformation.special_notes
        ? Itemformation.special_notes
        : "",
    item_notes: Itemformation && Itemformation.notes ? Itemformation.notes : "",
  });
  useEffect(() => {
    // getMfgname();
    initialValues.mfg_name = obj;
    setInitialValues(initialValues);
    setCost(
      Itemformation && Itemformation.cost
        ? Itemformation.cost.replace(",", "")
        : ""
    );
    setQtyValue(Itemformation && Itemformation.qty ? Itemformation.qty : "");
  }, []);

  function handleRef(e: any) {
    formik.current = e;
  }

  function handleSubmit(data: any) {
    setOpacity(true);
    if (data.mfg_part_number) {
      data.mfg_part_number = data.mfg_part_number.trim();
    }
    setTimeout(() => {
      const params = {
        ...data,
        item_id:
          Itemformation && Itemformation.item_id ? Itemformation.item_id : "",
      };
      const apiObject = {
        payload: params,
        method: "PUT",
        apiUrl: `${EndpointUrl.ChangePartPurchaseItemInfo}/${PurchaseId || ""}`,
        headers: {},
      };
      triggerApi(apiObject)
        .then((response: any) => {
          if (response.result.success && response.result.status_code === 200) {
            setShowPopup(true);
            // setOpacity(false)
            setTimeout(() => {
              sendItemAction({ success: true });
            }, 2000);
            // setOpacity(false)
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

  function closeModel() {
    sendItemAction({ closePopup: true });
  }
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

  //         setMfgOptions(
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

  const onCostChange = (e: any) => {
    setCost(e.target.value);
    const exCost: any = QtyValue * e.target.value;
    // eslint-disable-next-line radix
    const adjCost: any = parseFloat(e.target.value) + parseFloat(Mtplx);
    const finalAdjCost = adjCost?.toLocaleString(undefined, {
      minimumFractionDigits: 6,
      maximumFractionDigits: 6,
    });
    console.log(e.target.value, 201);
    const finalExCost = exCost?.toLocaleString(undefined, {
      minimumFractionDigits: 6,
      maximumFractionDigits: 6,
    });
    formik.current.setFieldValue("adjusted_cost", finalAdjCost);

    formik.current.setFieldValue("extended_cost", finalExCost);
  };
  const onItemQtyChange = (e: any) => {
    setQtyValue(e.target.value);
    const exCost: any = e.target.value * cost;
    if (cost && cost.length) {
      formik.current.setFieldValue("extended_cost", exCost);
    } else {
      formik.current.setFieldValue("extended_cost", exCost);
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
              ...item,
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
        code: null,
      });
    }
  };
  const getJobNumbers = async (searchValue: string) => {
    let list: any = [];
    if (searchValue.length >= 3) {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.getSysproJobInformation}?job_id=${searchValue}&repair_id=${id}`,
        headers: {},
      };
      await triggerApi(apiObject)
        .then((res: any) => {
          if (res.result.success && res.result.status_code === 200) {
            const arr: any =
              res.result.data && res.result.data.label ? [res.result.data] : [];
            list = arr;
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
      return list;
    }
    return list;
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
                  <PiTypography component="h3">
                    Edit Item Information
                  </PiTypography>
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
                onSubmit={(e: any) => handleSubmit(e)}
                initialValues={initialValues}
                innerRef={(e: any) => handleRef(e)}
                validateOnMount
                validationSchema={PurchaseEditFormValidationSchema}
              >
                {({ ...formikProps }: any) => (
                  <>
                    <FormBodyOverFlow
                      className={
                        opacity ? "opacity-on-load side-bar" : "side-bar"
                      }
                      style={{ margin: "16px 0", padding: "0 25px" }}
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
                      <div className="pp-add-fields-container">
                        <PoFormField>
                          <AsyncSelectDiv>
                            <AsyncLabel
                              htmlFor="async-select-example"
                              className="mandatory"
                            >
                              Job Number
                            </AsyncLabel>
                            <Field name="job_number">
                              {({ field, form, meta }: any) => (
                                <>
                                  <AsyncSelect
                                    name="job_number"
                                    inputId="async-select-example"
                                    classNamePrefix="react-select"
                                    onInputChange={handleInputChanges}
                                    loadOptions={promiseOptions}
                                    placeholder="Search Job Number"
                                    onChange={(value) => {
                                      form.setFieldValue("job_number", value);
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
                        <PoFormField>
                          <AsyncSelectDiv>
                            <AsyncLabel
                              htmlFor="async-select-example"
                              className="mandatory"
                            >
                              Manufacturer Name
                            </AsyncLabel>
                            <Field name="mfg_name">
                              {({ field, form, meta }: any) => (
                                <>
                                  <AsyncSelect
                                    name="mfg_name"
                                    inputId="async-select-example"
                                    classNamePrefix="react-select"
                                    onInputChange={onManufacturerInputChange}
                                    loadOptions={manufacturerpromiseOptions}
                                    placeholder="Search Manufacturer"
                                    onChange={(value) => {
                                      if (value) {
                                        form.setFieldValue("mfg_name", {
                                          label: value.label,
                                          value: value.value,
                                          code: value.code,
                                        });
                                      } else {
                                        setNewInputValue("");
                                        form.setFieldValue("mfg_name", null);
                                      }
                                    }}
                                    // value={mfgValue}
                                    isDisabled={opacity}
                                    noOptionsMessage={() =>
                                      "No Manufacturers Found"
                                    }
                                    onBlur={() => {
                                      blurEvent(form, "mfg_name");
                                    }}
                                    value={field.value}
                                    isClearable
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
                            name="mfg_part_number"
                            label="Manufacturer Part Number"
                            type="text"
                            placeholder="Enter Mfg Part Number"
                            // isMandatory
                            isDisabled={opacity}
                            convertToCapital
                          />
                        </PoFormField>

                        <PoFormField>
                          <PiInputForm
                            name="qty"
                            label="Quantity"
                            type="text"
                            placeholder="Enter quantity"
                            isMandatory
                            onChange={(e: any) => {
                              onItemQtyChange(e);
                            }}
                            isDisabled={opacity}
                          />
                        </PoFormField>

                        <PoFormField>
                          <PiInputForm
                            name="vendor_part_number"
                            label="Vendor Part Number"
                            type="text"
                            placeholder="Enter Vendor Part Number"
                            isMandatory
                            isDisabled={opacity}
                            convertToCapital
                          />
                        </PoFormField>

                        <PoFormField className="cost_icon_input">
                          <PiIconInputForm
                            name="cost"
                            label="Cost"
                            type="string"
                            placeholder="Enter Cost"
                            isMandatory
                            onChange={(e: any) => {
                              onCostChange(e);
                            }}
                            allowedDecimalsPoints={6}
                            isDisabled={opacity}
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

                        <PoFormField className="cost_icon_input">
                          <PiIconInputForm
                            name="extended_cost"
                            label="Extended Cost"
                            placeholder="Enter Extended Cost"
                            type="text"
                            isDisabled
                            isMandatory
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
                        <PoFormField className="cost_icon_input">
                          <PiIconInputForm
                            name="adjusted_cost"
                            label="Adjusted Cost"
                            type="text"
                            placeholder="Enter Cost"
                            isDisabled
                            isMandatory
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
                        <div style={{ width: "100%" }}>
                          <PiTextareaForm
                            helpText=""
                            label="Description"
                            libraryType="atalskit"
                            minimumRows={3}
                            name="description"
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
                            name="special_notes"
                            placeholder="Enter Special Notes"
                            isDisabled={opacity}
                          />
                        </div>
                        <div style={{ width: "100%" }}>
                          <PiTextareaForm
                            helpText=""
                            label="Item Notes"
                            libraryType="atalskit"
                            minimumRows={3}
                            name="item_notes"
                            placeholder="Enter Item Notes"
                            isDisabled={opacity}
                          />
                        </div>
                      </div>
                    </FormBodyOverFlow>
                    <RequestorInformationBottomDrawerFooter className="po-sidebar-footer">
                      {showErrorPopup && (
                        <div style={{ color: "red" }}>{showErrormsg || ""}</div>
                      )}
                      <PiButton
                        appearance="primary"
                        label="Save"
                        libraryType="atalskit"
                        onClick={formikProps.handleSubmit}
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
        headerLabel="Edit Items"
        message="Items Edited Successfully "
        onClose={async () => setShowPopup(false)}
      />
    </>
  );
}

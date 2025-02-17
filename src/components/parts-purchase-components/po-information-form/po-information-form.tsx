import {
  PiButton,
  PiDatepickerForm,
  PiInputForm,
  PiSideDrawer,
  PiSpinner,
  PiTextareaForm,
  PiToast,
  PiTypography,
} from "pixel-kit";
import { useEffect, useRef, useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import CrossLogo from "@app/assets/images/cross.svg";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import { AsyncLabel } from "@app/components/rmaModel/RmaModel.component";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import PoinfoImg from "@app/assets/images/purchase-order-info.svg";
import moment from "moment";
import {
  PoFormContentContainer,
  PoFormField,
} from "./po-information-form-components";
import PoInformationFormValidationSchema from "./po-form-validation";
import {
  DateRangePickerDiv,
  PartsPurchaseSideDrawerContainer,
  PoPopupHeaderContainer,
  PurchaseFormSideDrawer,
  RequestorInformationBottomDrawerFooter,
} from "../parts-purchase-form.tsx/parts-purchase-form-components";

type Props = {
  sendPoInfoData: any;
  Poformation: any;
  partpurchaseid: any;
};
export default function PoformationForm({
  sendPoInfoData,
  Poformation,
  partpurchaseid,
}: Props) {
  const formik = useRef<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const [TodayDate, SetTodayDate] = useState("");
  const [serverMsg, setServerMsg] = useState("");

  const initialValues = {
    purchase_order_info: [
      {
        purchase_order_number:
          Poformation && Poformation.purchase_order_number
            ? Poformation.purchase_order_number
            : "",
        confirmed_delivery_date:
          Poformation && Poformation.confirmed_delivery_date
            ? moment(Poformation.confirmed_delivery_date).format("YYYY-MM-DD")
            : "",
        tracking_number:
          Poformation && Poformation.tracking_number
            ? Poformation.tracking_number
            : "",
        follow_up_date:
          Poformation && Poformation.follow_up_date
            ? moment(Poformation.follow_up_date).format("YYYY-MM-DD")
            : "",

        order_notes:
          Poformation && Poformation.order_notes ? Poformation.order_notes : "",
        id:
          Poformation && Poformation.purchase_order_id
            ? Poformation.purchase_order_id
            : "",
      },
    ],
  };
  useEffect(() => {
    function formatDate(date: Date) {
      const d = new Date(date);
      let month = `${d.getMonth() + 1}`;
      let day = `${d.getDate()}`;
      const year = d.getFullYear();

      if (month.length < 2) month = `0${month}`;
      if (day.length < 2) day = `0${day}`;

      return [year, month, day].join("-");
    }
    SetTodayDate(formatDate(new Date()));
  }, []);
  function handleRef(e: any) {
    formik.current = e;
  }

  function handleSubmitForm(data: any) {
    if (formik.current.isValid) {
      setOpacity(true);

      setTimeout(() => {
        const params = {
          ...data,
          part_purchase_id: partpurchaseid || "",
        };
        const apiObject = {
          payload: params,
          method: "POST",
          apiUrl: `${EndpointUrl.SavePoInfo}`,
          headers: {},
        };
        triggerApi(apiObject)
          .then((response: any) => {
            if (
              response.result.success &&
              response.result.status_code === 200
            ) {
              setServerMsg("");
              setShowPopup(true);
              // setOpacity(false);
              setTimeout(() => {
                sendPoInfoData({ AddPoinfoSuccess: true });
              }, 1000);
            } else if (response.result.success === false) {
              setServerMsg(response.result.data);
              setOpacity(false);
            }
          })
          .catch((err: string) => {
            console.log(err);
          });
      }, 500);
    }
  }

  function closeModel() {
    sendPoInfoData({ closeModel: true });
  }

  return (
    <>
      <PartsPurchaseSideDrawerContainer>
        <PurchaseFormSideDrawer>
          <PiSideDrawer isOpen width="narrow">
            <SideDrawerContainer className="po-info-sidebar">
              <SideDrawerHeader>
                <PoPopupHeaderContainer>
                  <img
                    src={PoinfoImg}
                    alt="loading"
                    className="po-info-form-img"
                  />
                  <PiTypography component="h3">
                    Purchase Order Information
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
                initialValues={initialValues}
                validationSchema={PoInformationFormValidationSchema}
                onSubmit={(e: any) => handleSubmitForm(e)}
                innerRef={(e: any) => handleRef(e)}
                validateOnMount
              >
                {({ values, handleSubmit }) => (
                  <>
                    <Form style={{ flex: "1", overflow: "auto" }}>
                      <FieldArray name="purchase_order_info">
                        {() => (
                          <FormBodyOverFlow
                            style={{ padding: "25px" }}
                            className={opacity ? "opacity-on-load" : ""}
                          >
                            {opacity && (
                              <SpinnerDiv
                                style={{
                                  position: "absolute",
                                  left: "50%",
                                  zIndex: "9999",
                                }}
                              >
                                <PiSpinner
                                  color="primary"
                                  size={50}
                                  libraryType="atalskit"
                                />
                              </SpinnerDiv>
                            )}
                            {values.purchase_order_info.length > 0 &&
                              values.purchase_order_info.map(
                                (_: any, index: number) => (
                                  <div
                                    className={
                                      index !==
                                      values.purchase_order_info.length - 1
                                        ? "card-separator"
                                        : ""
                                    }
                                  >
                                    <PoFormContentContainer>
                                      <PoFormField>
                                        <PiInputForm
                                          name={`purchase_order_info.${index}.purchase_order_number`}
                                          label="Purchase Order Number"
                                          type="text"
                                          placeholder="Enter Purchase Order Number"
                                          isDisabled={opacity}
                                          isMandatory
                                          maxLength={12}
                                        />
                                      </PoFormField>

                                      <PoFormField>
                                        <PiInputForm
                                          name={`purchase_order_info.${index}.tracking_number`}
                                          label="Tracking Number"
                                          type="text"
                                          placeholder="Enter Purchase Tracking Number"
                                          isDisabled={opacity}
                                        />
                                      </PoFormField>
                                    </PoFormContentContainer>
                                    <PoFormContentContainer>
                                      <PoFormField>
                                        <AsyncLabel htmlFor="async-select-example">
                                          Estimate Delivery Date
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
                                        <DateRangePickerDiv
                                          style={{ width: "100%" }}
                                          className="dt-pkr-bg-unset"
                                        >
                                          <PiDatepickerForm
                                            dateFormat="MM/DD/YYYY"
                                            helpText=""
                                            placeholder="Select Delivery Date"
                                            libraryType="atalskit"
                                            name={`purchase_order_info.${index}.confirmed_delivery_date`}
                                            isDisabled={opacity}
                                            isMandatory
                                            minDate={TodayDate}
                                          />
                                        </DateRangePickerDiv>
                                      </PoFormField>
                                      <PoFormField>
                                        <AsyncLabel htmlFor="async-select-example">
                                          Follow up Date
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
                                        <DateRangePickerDiv
                                          style={{ width: "100%" }}
                                          className="dt-pkr-bg-unset"
                                        >
                                          <PiDatepickerForm
                                            dateFormat="MM/DD/YYYY"
                                            helpText=""
                                            placeholder="Select Follow Up Date"
                                            libraryType="atalskit"
                                            name={`purchase_order_info.${index}.follow_up_date`}
                                            isMandatory
                                            isDisabled={opacity}
                                            minDate={TodayDate}
                                          />
                                        </DateRangePickerDiv>
                                      </PoFormField>
                                    </PoFormContentContainer>
                                    <div>
                                      <PiTextareaForm
                                        helpText=""
                                        label="Order Notes"
                                        libraryType="atalskit"
                                        minimumRows={3}
                                        name={`purchase_order_info.${index}.order_notes`}
                                        placeholder="Enter Order Notes"
                                        isDisabled={opacity}
                                      />
                                    </div>
                                    {/* <ItemInfoAddRowContainer
                                        className={opacity ? "isDisable" : ""}
                                        style={{ justifyContent: "flex-end" }}
                                      >
                                        {index ===
                                          values.purchase_order_info.length -
                                            1 &&
                                          (ppStatus === "Requested" ||
                                            ppStatus === "Ordered") && (
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
                                          <PurchaseItemEditContainer
                                            style={{
                                              alignSelf: "center",
                                              marginBottom: "10px",
                                            }}
                                            onClick={() => {
                                              remove(index);
                                            }}
                                          >
                                            <img
                                              className="row-del-img"
                                              src={deleteIcon}
                                              alt="loading"
                                              title="Delete Item"
                                            />
                                          </PurchaseItemEditContainer>
                                        )}
                                      </ItemInfoAddRowContainer> */}
                                  </div>
                                )
                              )}
                          </FormBodyOverFlow>
                        )}
                      </FieldArray>
                    </Form>

                    <RequestorInformationBottomDrawerFooter
                      style={{ paddingRight: "24px" }}
                    >
                      {serverMsg && (
                        <div className="server-msg">{serverMsg}</div>
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
        headerLabel="PO Information"
        message="Saved Successfully "
        onClose={async () => setShowPopup(false)}
      />
    </>
  );
}

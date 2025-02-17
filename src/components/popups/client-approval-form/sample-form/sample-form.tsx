import {
  PiTypography,
  PiButton,
  PiInputForm,
  PiToast,
  PiSelectForm,
  PiRadioGroup,
  PiDatepickerForm,
  PiTextareaForm,
} from "pixel-kit";
import { useEffect, useRef, useState } from "react";
// import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
// import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import { SideDrawerFooter } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import { AsyncLabel } from "@app/components/rmaModel/RmaModel.component";
import { Formik, Field } from "formik";
// import EndpointUrl from "@app/core/apiEndpoints/endPoints";

// import { triggerApi } from "@app/services";
import { Width100 } from "@app/components/Quote-components/Forms/PartQuote/part-quote.component";
// import { TermsValidationsSchema } from "@app/modules/adminModules/termsCondition/validation/TermsValidationSchema";
// import { EditorContainer } from "@app/components/RepairNotes/repair-notes.component";
// import GlobalVariables from "@app/core/globalVariables/globalVariables";
// import DropdownMenu, {
//   DropdownItemCheckbox,
//   DropdownItemCheckboxGroup,
// } from "@atlaskit/dropdown-menu";
import { CheckboxSelect } from "@atlaskit/select";
// import component from "@app/modules/Quotes-detail-view/component";
// import { JobFields } from "@app/components/Jobs-components/job-check-list/jobModel/job-model-component";
import { DateRangePickerDiv } from "@app/components/special-pricing-components/sp-left-filter/sp-left-filter.component";
import { InventoryWarehousedata } from "@app/components/userRolePermissions/permissionBox/qc-control-component";

export default function SampleForm() {
  const approvalName = "Form";
  //   let [item, setItem]: any = useState([]);
  //   const [item, setItem] = useState(GlobalVariables.properties);
  const [openSnackbar, setSnackbar] = useState(false);
  const [serverMsg, setServerMsg] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [toastMsg] = useState("");
  const [TodayDate, SetTodayDate] = useState("");
  const [minDate, setMinDate]: any = useState("");
  const [itemsList]: any = useState([
    { label: "Case - corroded", value: "case - corroded" },
    { label: "Case - damaged", value: "case - damaged" },
    { label: "Case - dirty", value: "case - dirty" },
    { label: "Case - missing parts", value: "case - missing parts" },
    { label: "Chassis - corrosion", value: "chassis - corrosion" },
  ]);
  const [initialValues, setInitialValues] = useState({
    prepared_for: "",
    rma_no: "",
    po_no: "",
    manufacture: "",
    evoluation_Summary: "",
    model: "",
    serial: "",
    date: "",
    customer: "",
    radio: "",
    checkbox: "",
  });
  const formik = useRef<any>(null);

  const selectPricing = (e: any) => {
    // console.log(e.label);

    formik.current.setFieldValue("radio", e.target.value);
    initialValues.radio = e.target.value;
    setInitialValues(initialValues);
  };
  // const selectPricings = (e: any) => {
  //   console.log(e.label);

  //   //  formik.current.setFieldValue("radio", e.label);
  //   //  initialValues["radio"] = e.label;
  //   //  setInitialValues(initialValues);
  // };
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
    // setOpenModel(true);
    SetTodayDate(formatDate(new Date()));
  }, []);
  function onDateChange(event: any) {
    setMinDate(event);
  }
  function handleRef(e: any) {
    formik.current = e;
  }
  function handleSubmit(data: any) {
    console.log(data);
  }

  return (
    <>
      <SideDrawerContainer>
        <SideDrawerHeader>
          <PiTypography component="h3">{approvalName}</PiTypography>
        </SideDrawerHeader>
        {/* {loading && (
          <SpinnerDiv style={{ height: "100%" }}>
            <PiSpinner color="primary" size={50} libraryType="atalskit" />
          </SpinnerDiv>
        )} */}
        {/* {!loading && ( */}
        <Formik
          // validationSchema={TermsValidationsSchema}
          onSubmit={(e: any) => handleSubmit(e)}
          initialValues={initialValues}
          innerRef={(e: any) => handleRef(e)}
        >
          {({ ...formikProps }: any) => (
            <>
              <FormBodyOverFlow>
                <InventoryWarehousedata>
                  <Width100 className="d-flex-row-gap width-100">
                    <Field name="">
                      {() => (
                        <>
                          <div className="web">
                            <PiInputForm
                              name="prepared_for"
                              label="Prepared for *"
                              type="text"
                              placeholder="Prepared for"
                              className="Name"
                              maxLength={30}
                              onChange={() => setServerMsg(null)}
                              // value={unitMeasure}
                              // isDisabled
                            />
                          </div>
                          <div className="web">
                            <PiInputForm
                              name="rma_no"
                              label="RMA Number *"
                              type="text"
                              placeholder="RMA number "
                              className="Name"
                              maxLength={30}
                              onChange={() => setServerMsg(null)}
                              // value={unitMeasure}
                              // isDisabled
                            />
                          </div>
                          <div className="web">
                            <PiInputForm
                              name="po_no"
                              label="PO number *"
                              type="text"
                              placeholder="Po Number "
                              className="Name"
                              maxLength={30}
                              onChange={() => setServerMsg(null)}
                              // value={unitMeasure}
                              // isDisabled
                            />
                          </div>

                          <DateRangePickerDiv
                            style={{ width: "50%" }}
                            className="dt-pkr-bg-unset"
                          >
                            <AsyncLabel htmlFor="async-select-example">
                              Date *
                            </AsyncLabel>
                            <div className="web">
                              <PiDatepickerForm
                                helpText=""
                                libraryType="atalskit"
                                name="date"
                                minDate={TodayDate}
                                onChange={(e: any) => onDateChange(e)}
                                value={minDate}
                                placeholder="MM/DD/YYYY"
                              />
                            </div>
                          </DateRangePickerDiv>

                          <div className="web">
                            <PiInputForm
                              name="manufacture"
                              label="Manufacture *"
                              type="text"
                              placeholder="manufacture"
                              className="Name"
                              maxLength={30}
                              onChange={() => setServerMsg(null)}
                              // value={unitMeasure}
                              // isDisabled
                            />
                          </div>
                          <div className="web">
                            <PiInputForm
                              name="model"
                              label="Model number*"
                              type="text"
                              placeholder="Model number"
                              className="Name"
                              maxLength={30}
                              onChange={() => setServerMsg(null)}
                              // value={unitMeasure}
                              // isDisabled
                            />
                          </div>
                          <div className="web">
                            <PiInputForm
                              name="serial"
                              label="Serial number*"
                              type="text"
                              placeholder="Serial number"
                              className="Name"
                              maxLength={30}
                              onChange={() => setServerMsg(null)}
                              // value={unitMeasure}
                              // isDisabled
                            />
                          </div>
                          <div>
                            <div className="web1">
                              <PiSelectForm
                                name="evoluation_Summary"
                                label="Evoluation Summary"
                                placeholder="Select"
                                isMulti
                                options={itemsList}
                                classNamePrefix="react-select"

                                // isDisabled={customerName ? false : true}
                              />
                            </div>
                            <div className="web1">
                              <PiTextareaForm
                                name="customer"
                                label=" Problems Reported By Customer"
                                // value={areaValue}
                                // onChange={handleTextArea}

                                libraryType="atalskit"
                                placeholder="Problems Reported By Customer"
                                maxLength={100}
                              />
                            </div>
                          </div>
                          <div className="web">
                            <p className="reapir">Repair summary</p>
                            <CheckboxSelect
                              inputId="checkbox-select-example"
                              className="checkbox-select"
                              classNamePrefix="select"
                              name="checkbox"
                              options={[
                                {
                                  label: "Case - corroded",
                                  value: "case - corroded",
                                },
                                {
                                  label: "Case - damaged",
                                  value: "case - damaged",
                                },
                                {
                                  label: "Case - dirty",
                                  value: "case - dirty",
                                },
                                {
                                  label: "Case - missing parts",
                                  value: "case - missing parts",
                                },
                                {
                                  label: "Chassis - corrosion",
                                  value: "chassis - corrosion",
                                },
                              ]}
                              placeholder="Choose a summary"
                            />
                          </div>

                          <div>
                            <AsyncLabel
                              htmlFor="async-select-example"
                              className="css-re7y6x"
                            >
                              Radio
                            </AsyncLabel>
                            <Field name="radio">
                              {({ field }: any) => (
                                <PiRadioGroup
                                  libraryType="atalskit"
                                  name="radio"
                                  onChange={selectPricing}
                                  options={[
                                    {
                                      label: "Yes",
                                      value: "yes",
                                    },
                                    {
                                      label: "No",
                                      value: "no",
                                    },
                                  ]}
                                  value={field.value}
                                />
                              )}
                            </Field>
                          </div>
                        </>
                      )}
                    </Field>
                  </Width100>
                </InventoryWarehousedata>
              </FormBodyOverFlow>
              <SideDrawerFooter>
                {serverMsg && <div className="server-msg">{serverMsg}</div>}
                <PiButton
                  appearance="primary"
                  label="Save"
                  onClick={formikProps.handleSubmit}
                />
              </SideDrawerFooter>
            </>
          )}
        </Formik>
        {/* )} */}
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

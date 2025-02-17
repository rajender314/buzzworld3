import { useEffect, useRef, useState } from "react";
import {
  PiDatepickerForm,
  PiButton,
  PiSelectForm,
  PiInputForm,
  PiSideDrawer,
  PiTypography,
  PiToast,
  PiSpinner,
} from "pixel-kit";
import { Formik } from "formik";
import {
  AsyncLabel,
  RmaFields,
  SideDrawerW40,
} from "@app/components/rmaModel/RmaModel.component";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import { SideDrawerFooter } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import {
  QuotePopupHeaderContainer,
  Width100,
} from "@app/components/Quote-components/Forms/PartQuote/part-quote.component";
import { DateRangePickerDiv } from "@app/components/special-pricing-components/sp-left-filter/sp-left-filter.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import Loader from "@app/components/Loader/loader";
import _ from "lodash";
import moment from "moment";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import Timer from "@app/assets/images/Timer.svg";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
// import PiSideDrawer, {
//   PiSideDrawerProps,
// } from "pixel-kit/dist/components/sideDrawer/sideDrawer";
// import Timer from "../../../../assets/images/Timer.svg";
import CrossLogo from "@app/assets/images/cross.svg";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import TimerValidation from "@app/components/Jobs-components/new-time-entry-manualForm/Validation/Timer-validation-schema";

type Props = {
  // eslint-disable-next-line no-unused-vars
  addTimeentryStatus: (e: any) => {};
  jobInfos: any;
};

export default function TimeEntryManual({
  addTimeentryStatus,
  jobInfos,
}: Props) {
  // const [jobId, setJobId] = useState(jobTime);
  const [TodayDate, SetTodayDate] = useState("");
  const [selectValues, setSelectValues]: any = useState();
  // let [selectedDate, setSelectedDate] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const [serverMsg, setServerMsg] = useState(null);
  const [select, setSelect]: any = useState("");
  const [item, setItem]: any = useState([]);
  const formik = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  // let [technicianId, setTechnicianId]: any = useState([]);
  const [workCenter, setWorkCenter]: any = useState();
  const [popupMessageShow, setPopupMessageShow] = useState(false);
  // const [toastMsg, setToastMsg] = useState("");
  const [initialValues, setInitialValues] = useState({
    technician: "",
    selected_time: "",
    start_date: moment(new Date()).format("YYYY-MM-DD"),
    work_center: "",
    job_id: "",
  });
  const [opacity, setOpacity] = useState(false);

  function getSelectItems() {
    setLoading(true);
    setItem([]);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.getJobEmployee}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.status_code === 200 && response.result.success) {
          setItem(response.result.data);
          setLoading(false);
          setServerMsg(null);
        } else {
          setServerMsg(response.result.data);
          setLoading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getSelectItems();
    setOpenModel(true);
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
    console.log(formik);
  }

  const onTechnicalJobChange = (value: any) => {
    setWorkCenter(value);
    setSelectValues(value);
    setSelect(value);
    const index = _.findIndex(item, { value: value.value });
    initialValues.work_center = item[index].work_center;
    setInitialValues({ ...initialValues });

    formik.current.setFieldValue("work_center", item[index].work_center);
    formik.current.setFieldValue("technician", value);
  };

  function closeModel() {
    addTimeentryStatus({ closeModel: true });
  }
  function handleSubmit(data: any) {
    setOpacity(true);
    const apiObject = {
      payload: {
        ItemTransactionDate: data.start_date,
        LRunTimeHours: data.selected_time,
        Job: jobInfos.job_id,
        LWorkCentre:
          selectValues && selectValues.work_center
            ? selectValues.work_center
            : "",
        LEmployee: data.technician.value,
        lemployeeratind: "2",
        LOperation: "1",
        LWcRateInd: "3",
        employee_name: data.technician.label,
      },
      method: "POST",
      apiUrl: `${EndpointUrl.saveWorkingHours}`,
      headers: {},
    };
    triggerApi(apiObject).then((response: any) => {
      if (response.result.success) {
        setOpacity(false);
        setServerMsg(null);
        setLoading(false);
        setOpenModel(false);
        setTimeout(() => {
          addTimeentryStatus({ addTimeEntry: true });
        }, 1000);
        setPopupMessageShow(true);
      } else {
        setOpacity(false);
        setServerMsg(response.result.data);
        // setOpenModel(false)
        //  setTimeout(() => {
        //  addTimeentryStatus({ addTimeEntry: true })
        // }, 1000)
      }
    });
  }
  const onTimeChange = (e: any) => {
    formik.current.setFieldValue("selected_time", e.target.value);
    if (e.target.value === "00:00") {
      formik.current.setFieldValue("selected_time", "");
    }
  };

  return (
    <>
      <PiToast
        className={popupMessageShow ? "show" : ""}
        headerLabel="Time Created Successfully"
        message=""
        onClose={async () => setPopupMessageShow(false)}
      />
      <SideDrawerW40>
        <PiSideDrawer isOpen={openModel} width="narrow">
          <SideDrawerContainer>
            <SideDrawerHeader>
              <QuotePopupHeaderContainer>
                <div className="Timer">
                  <img src={Timer} alt="loading" className="Timer" />
                </div>
                <PiTypography component="h3">Add Time Entry</PiTypography>
              </QuotePopupHeaderContainer>

              <CloseButton
                onClick={() => closeModel()}
                title="close"
                className="Hover"
              >
                <img src={CrossLogo} alt="loading" />
              </CloseButton>
            </SideDrawerHeader>

            {loading && <Loader />}
            {!loading && (
              <Formik
                validationSchema={TimerValidation}
                onSubmit={(e: any) => handleSubmit(e)}
                initialValues={initialValues}
                // onReset={resetForm}
                innerRef={(e: any) => handleRef(e)}

                //
              >
                {({ ...formikProps }: any) => (
                  <>
                    <FormBodyOverFlow
                      className={opacity ? "opacity-on-load" : ""}
                    >
                      {opacity && (
                        <SpinnerDiv
                          style={{ position: "absolute", left: "50%" }}
                        >
                          <PiSpinner
                            color="primary"
                            size={50}
                            libraryType="atalskit"
                          />
                        </SpinnerDiv>
                      )}
                      <RmaFields>
                        <Width100 className="d-flex-row-gap width-100">
                          <div className="tabsd">
                            <div>
                              <PiSelectForm
                                name="technician"
                                isMandatory
                                label="Employee Name"
                                placeholder="Select"
                                isMulti={false}
                                options={item}
                                value={select}
                                onChange={(value) => {
                                  onTechnicalJobChange(value);
                                }}
                                classNamePrefix="react-select"
                                isClearable
                              />
                            </div>

                            <div>
                              <PiInputForm
                                name="work_center"
                                label="Work Center"
                                libraryType="atalskit"
                                type="text"
                                isMandatory
                                placeholder="Work center"
                                className="Name"
                                maxLength={30}
                                onChange={() => {}}
                                value={workCenter}
                                isDisabled
                              />
                            </div>

                            <DateRangePickerDiv
                              style={{ width: "100%" }}
                              className="dt-pkr-bg-unset"
                            >
                              <AsyncLabel htmlFor="async-select-example">
                                Date
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
                              <PiDatepickerForm
                                helpText=""
                                libraryType="atalskit"
                                name="start_date"
                                // minDate={TodayDate}
                                maxDate={TodayDate}
                                // onChange={onDateChange}
                                // value={selectedDate}
                                placeholder="MM/DD/YYYY"
                                isMandatory
                              />
                            </DateRangePickerDiv>

                            <div style={{ marginTop: "8px" }}>
                              {/* <Field name={`selected_time`}>
                                  {({ field, form, meta }: any) => {
                                    return (
                                      <>
                                        <TimeField
                                          value={field.value}
                                          //colon="."
                                          input={
                                            <PiInput
                                              name="selected_time"
                                              label="Spent Time (Hours)"
                                              helpText={
                                                meta.touched && meta.error
                                                  ? meta.error
                                                  : ''
                                              }
                                            />
                                          }
                                          onChange={onTimeChange}
                                        />
                                      </>
                                    )
                                  }}
                                </Field> */}
                              <PiInputForm
                                name="selected_time"
                                label="Spent Time (Hours)"
                                placeholder="Spent Time (Hours)"
                                onChange={onTimeChange}
                                type="string"
                                isMandatory
                              />
                            </div>
                          </div>
                        </Width100>
                      </RmaFields>
                    </FormBodyOverFlow>
                    <SideDrawerFooter>
                      {/* <PiButton
                  appearance="secondary"
                  label={"Cancel"}
                  onClick={formik.resetForm}
                /> */}
                      {serverMsg && (
                        <div className="server-msg">{serverMsg}</div>
                      )}
                      <PiButton
                        appearance="primary"
                        label="Add"
                        //  onClick={() => console.log(selectedDate)}
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
        </PiSideDrawer>
      </SideDrawerW40>
    </>
  );
}

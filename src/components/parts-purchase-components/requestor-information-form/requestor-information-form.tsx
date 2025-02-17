import {
  PiButton,
  PiDatepickerForm,
  PiSelectForm,
  PiSpinner,
  PiToast,
} from "pixel-kit";
import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import FilterFieldsContainer from "@app/components/Repair-Components/repair-list-filter/repair-list.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { AsyncLabel } from "@app/components/rmaModel/RmaModel.component";
import { removeLocalStorage } from "@app/core/localStorage/localStorage";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import moment from "moment";
import ReuestorInformationFormValidationSchema from "../purchase-form-validation/requestor-information-form-validations";
import {
  DateRangePickerDiv,
  FormBodyOverFlow,
  PartsPurchaseSideDrawerContainer,
  RequestorInformationBottomDrawerFooter,
} from "../parts-purchase-form.tsx/parts-purchase-form-components";

type Props = {
  prefillFormData: any;
  tabIndexEvent: any;
  sendModelData: any;
};

export default function RequestorinformationForm({
  prefillFormData,
  tabIndexEvent,
  sendModelData,
}: Props) {
  const [users, setUsers] = useState([]);
  const [urgencyOptions, setUrgencyOptions] = useState([]);
  const [opacity, setOpacity] = useState(false);
  const [openSnackbar, setSnackbar] = useState(false);
  const formik = useRef<any>(null);
  const [TodayDate, SetTodayDate] = useState("");
  const [initialValues, setInitialValues] = useState({
    // requested_by: "",
    technician: "",
    urgency: "",
    date_requested: "",
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (prefillFormData) {
      setOpacity(true);

      // initialValues["technician"] =
      //   prefillFormData &&
      //   prefillFormData.requestor_info &&
      //   prefillFormData.requestor_info.technician;
      // initialValues["urgency"] = prefillFormData.requestor_info.priority;
      // initialValues["date_requested"] = moment(
      //   prefillFormData.requestor_info.date_requested
      // ).format("YYYY-MM-DD");

      setTimeout(() => {
        setOpacity(false);

        formik.current.setFieldValue(
          "technician",
          prefillFormData &&
            prefillFormData.requestor_info &&
            prefillFormData.requestor_info.technician
            ? prefillFormData.requestor_info.technician
            : ""
        );
        formik.current.setFieldValue(
          "urgency",
          prefillFormData.requestor_info.priority
        );
        formik.current.setFieldValue(
          "date_requested",
          moment(
            prefillFormData.requestor_info.date_requested,
            "MM-DD-YYYY"
          ).format("YYYY-MM-DD")
        );
      }, 500);
    } else {
      setLoading(false);
    }
  }, [prefillFormData]);

  // useEffect(() => {
  //   if (technicianId) {
  //     Users();
  //   } else {
  //     setOpacity(false);
  //   }
  // }, [technicianId]);
  function Users() {
    setOpacity(true);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.PartsUsers}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success && response.result.status_code === 200) {
          setUsers(
            response.result.data.list.map((item: any) => ({
              value: item.id,
              label: item.name,
            }))
          );
          if (!prefillFormData) {
            initialValues.date_requested = moment(new Date()).format(
              "YYYY-MM-DD"
            );
          }

          setOpacity(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
        setOpacity(false);
      });
  }
  function getUrgencyOptions() {
    setOpacity(true);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.PartsPurchaseFormUrgencyDropDownOptions}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success && response.result.status_code === 200) {
          setUrgencyOptions(
            response.result.data.map((item: any) => ({
              value: item.value,
              label: item.label,
            }))
          );
          setOpacity(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
        setOpacity(false);
      });
  }
  useEffect(() => {
    getUrgencyOptions();
    // UserRoles();
    Users();
  }, []);
  useEffect(() => {
    removeLocalStorage("part_purchase_form");
  }, []);
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
    if (formik.current) {
      tabIndexEvent(formik.current);
    }
  }

  const handleSubmit = () => {
    if (formik.current.isValid) {
      sendModelData(formik.current.values);
    }
  };

  // function UserRoles() {
  //   setOpacity(true);
  //   const apiObject = {
  //     payload: {},
  //     method: "GET",
  //     apiUrl: `${EndpointUrl.PartsUserRoles}`,
  //     headers: {},
  //   };
  //   triggerApi(apiObject)
  //     .then((response: any) => {
  //       if (response.result.success && response.result.status_code === 200) {
  //         response.result.data.list.map((item: any) => {
  //           return item.code === "technician" ? setTechnicianId(item.id) : "";
  //         });
  //       }
  //     })
  //     .catch((err: string) => {
  //       console.log(err);
  //     });
  // }

  // const onRequestedChange = (e: any) => {
  //   if (e !== null) {
  //     initialValues["requested_by"] = e.value;
  //     setInitialValues(initialValues);
  //   } else {
  //     initialValues["requested_by"] = "";
  //     setInitialValues(initialValues);
  //     console.log(e);
  //   }
  // };
  const onRequestedDateChange = (e: any) => {
    initialValues.date_requested = e;
    setInitialValues(initialValues);
  };

  const onUrgencyChange = (e: any) => {
    if (e !== null) {
      initialValues.urgency = e.value;
      setInitialValues(initialValues);
    } else {
      initialValues.urgency = "";
      setInitialValues(initialValues);
    }
  };
  return (
    <>
      <PartsPurchaseSideDrawerContainer>
        {!loading && (
          <Formik
            validationSchema={ReuestorInformationFormValidationSchema}
            onSubmit={handleSubmit}
            initialValues={initialValues}
            innerRef={(e: any) => handleRef(e)}
            validateOnMount
          >
            {({ ...formikProps }: any) => (
              <>
                <FormBodyOverFlow
                  className={opacity ? "opacity-on-load" : ""}
                  style={{ padding: "16px 24px" }}
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
                  <FilterFieldsContainer>
                    {/* <div>
                        <PiSelectForm
                          name="requested_by"
                          label="Requested By"
                          placeholder="Select Requested By"
                          isMulti={false}
                          options={users}
                          // defaultValue={users[0]}
                          onChange={(e: any) => {
                            onRequestedChange(e);
                          }}
                          isClearable={true}
                          classNamePrefix="react-select"
                          libraryType="atalskit"
                          isMandatory
                          isDisabled={opacity}
                        />
                      </div> */}
                    <div>
                      <PiSelectForm
                        name="technician"
                        label="Technician"
                        placeholder="Select Technician"
                        isMulti={false}
                        options={users}
                        // onChange={onAccTypeChange}
                        isClearable
                        classNamePrefix="react-select"
                        isMandatory
                        isDisabled={opacity}
                      />
                    </div>
                    <div className={opacity ? "disable" : ""}>
                      <AsyncLabel
                        htmlFor="async-select-example"
                        style={{ marginBottom: "4px" }}
                      >
                        Date Requested
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
                        className="dt-pkr-bg-unset react-select"
                      >
                        <PiDatepickerForm
                          dateFormat="MM/DD/YYYY"
                          helpText=""
                          placeholder="Select Date Requested"
                          libraryType="atalskit"
                          minDate={TodayDate}
                          name="date_requested"
                          onChange={(e: any) => {
                            onRequestedDateChange(e);
                          }}
                          isDisabled={opacity}
                        />
                      </DateRangePickerDiv>
                    </div>
                    <div>
                      <PiSelectForm
                        name="urgency"
                        label="Urgency"
                        placeholder="Select Urgency"
                        isMulti={false}
                        options={urgencyOptions}
                        onChange={(e) => {
                          onUrgencyChange(e);
                        }}
                        isClearable
                        classNamePrefix="react-select"
                        isMandatory
                        isDisabled={opacity}
                      />
                    </div>
                  </FilterFieldsContainer>
                </FormBodyOverFlow>
                <RequestorInformationBottomDrawerFooter>
                  <PiButton
                    appearance="primary"
                    label="Next"
                    libraryType="atalskit"
                    onClick={formikProps.handleSubmit}
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
        headerLabel=""
        message=""
        onClose={async () => setSnackbar(false)}
      />
    </>
  );
}

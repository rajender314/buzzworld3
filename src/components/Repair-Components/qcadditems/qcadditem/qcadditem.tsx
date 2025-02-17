import {
  PiButton,
  PiEditor,
  PiRadioForm,
  PiSelectForm,
  PiSideDrawer,
  PiSpinner,
  PiTextArea,
  PiTypography,
  PiTextareaForm,
} from "pixel-kit";
import { useEffect, useRef, useState } from "react";
import CrossLogo from "@app/assets/images/cross.svg";

import { Formik } from "formik";
import {
  AsyncLabel,
  RmaFields,
  SideDrawerW40,
} from "@app/components/rmaModel/RmaModel.component";
import { Width100 } from "@app/components/Quote-components/Forms/PartQuote/part-quote.component";
import { triggerApi } from "@app/services";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { ApiResponse } from "@app/services/schema/schema";
import Loader from "@app/components/Loader/loader";

import AddIcons from "@app/assets/images/QA.svg";

import { JobPopupHeaderContainer } from "@app/components/Jobs-components/job-check-list/jobModel/job-model-component";
import { QuoteActivityPill } from "@app/core/components/gridStatus/gridStatus.component";
import { getStatusClassName } from "@app/modules/Quotes/Repair-Quotes/helpers/quote-helpers";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import QcValidation from "../validations/Qc-Control-Validation";
import {
  DetailViewStatusDropdowns,
  PartItemDetail,
} from "./qcadditem.component";
import {
  RepairDetailsContain,
  UserRolesField,
} from "../qcItemDetails/qcItemDetails-details.component";
import { FormBodyOverFlow } from "../../checksIns/assignLocation/assign-location.component";
import { SideDrawerFooter } from "../../selectItems/AddPartRepair/add-part-repair.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "../../selectItems/selectItemsModel/selectItem.component";
import { CloseButton } from "../../../adminaddrowmodel/adminaddrowmodel.component";

export default function QCAddItem({ partInfo, sendEventData }: any) {
  const [headerTitle, setHeaderTitle] = useState("");
  const [qcdescriptions, setQcDescriptions]: any = useState("");
  const [repairItemsQc, setRepairItemsQc]: any = useState([]);
  const [openModel, setOpenModel] = useState(true);
  const [statusQc, setStatusQc]: any = useState();
  const [statusQcId, setStatusQcId]: any = useState([]);
  const [controlOptions, setControlOptions]: any = useState([]);
  const [controlList, setControlList]: any = useState(controlOptions);
  const [repairQCPost, setRepairQCPost] = useState();
  const [loading, setLoading] = useState(true);
  const options = [
    {
      label: "Yes",
      value: "Yes",
    },
    {
      label: "No",
      value: "No",
    },
    {
      label: "N/A",
      value: "na",
    },
  ];
  const formik = useRef<any>(null);
  const [opacity, setOpacity] = useState(false);
  const myContainer = useRef<any>(null);
  const [selectedControl, setSelectedControl]: any = useState();

  // useEffect(() => {
  //   console.log(partInfo.repairItemId);
  //   if (partInfo) {
  //     QCGetData(partInfo.id);
  //   } else {
  //     setLoading(false);
  //   }
  //   setSideDrawer(true);
  // }, []);

  const [initialValues, setInitialValues]: any = useState({
    select_control: "",
    options: options || "",
    qc_comments: "",
    qc_statuses_id: "",
    part_notes: "",
  });

  const [selectName, setSelectName]: any = useState();
  const [serverMsg, setServerMsg] = useState(null);
  useEffect(() => {
    setHeaderTitle("QC Checklist");
  }, []);

  function closeModel() {
    setOpenModel(false);
    sendEventData({
      close: true,
    });
  }

  const updateDelivedStatus = (e: any) => {
    setStatusQc(e);
    console.log(e);
    setStatusQcId(e);
  };

  function onDescriptionChange(e: any) {
    setQcDescriptions(e.target.value);
  }
  async function getQcControlList() {
    let data: any = [];
    setRepairQCPost(repairQCPost);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QCcontrol}?status[0]=true`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const res = response.result.data.list;
          let list = [];
          list = res.map((item: any) => ({
            value: item.id,
            label: item.name,
            ...item,
          }));

          data = list;
          setControlList(data);
        }
      })
      .catch(() => {});
    return data;
  }
  function QCGetData() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.RepairItemsQc}/${partInfo.repairItemId}`,
      headers: {},
    };
    triggerApi(apiObject).then((response: any) => {
      if (
        response.result.success &&
        response.result.data &&
        response.result.data.id
      ) {
        const { data } = response.result;
        setStatusQc(data.qc_status.label);
        const qcProperties: any = data.qc_properties || [];

        qcProperties.map((obj: any) => {
          if (data.qc_status_code === "qc_pass") {
            obj.isDisabled = true;
          }
          return obj;
        });

        setRepairItemsQc([...qcProperties]);
        const obj = {
          label: data.control_name,
          value: data.id,
        };
        setSelectedControl(obj);
        const statusObj = {
          label: data.qc_status.label,
          value: data.qc_status.value,
        };
        setSelectName(data.control_name);
        setControlOptions(obj);
        setStatusQcId(statusObj);
        initialValues.select_control = obj;
        initialValues.qc_statuses_id = data.qc_status;
        initialValues.part_notes = data.part_notes;
        setInitialValues(initialValues);
        if (data.qc_properties) {
          data.qc_properties.forEach((data2: any) => {
            let valueToUpdate = data2.selected_value;
            if (
              data2.selected_value === "pass" ||
              data2.selected_value === "Pass"
            ) {
              valueToUpdate = "Yes";
            } else if (
              data2.selected_value === "fail" ||
              data2.selected_value === "Fail"
            ) {
              valueToUpdate = "No";
            }
            initialValues[data2.names] = valueToUpdate;
          });
          setInitialValues(initialValues);
        }

        setQcDescriptions(data.qc_comments ? data.qc_comments : "");
        setServerMsg(null);
        setLoading(false);
      } else {
        setLoading(false);
        if (response.result.status_code !== 200) {
          setServerMsg(response.result.data);
        }
      }
    });
  }

  const [selectedStatus, setSelectedStatus] = useState<any>([]);

  function QcStatus() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QcRepairStatuses}`,
      headers: {},
    };
    triggerApi(apiObject).then((response: any) => {
      if (response.result.success && response.result.status_code === 200) {
        const options2 = response.result.data.list;
        const statusOptions: any = [];

        if (options2 && options2.length > 0) {
          options2.map((item: any) => {
            if (item.name === "Pass" || item.name === "Fail") {
              statusOptions.push({
                label: item.name,
                name: item.id,
                value: item.id,
                // display: item.status,
              });
            }
            return item;
          });
        }
        setSelectedStatus(statusOptions);
      }
    });
  }
  useEffect(() => {
    (async () => {
      await getQcControlList();
      QCGetData();
      QcStatus();
    })();
  }, []);

  function handleRef(e: any) {
    formik.current = e;
  }
  function onSelectItemChange(e: any) {
    setSelectedControl(e);
    setServerMsg(null);
    setOpacity(true);
    setRepairQCPost(repairQCPost);
    initialValues.select_control = e;
    setInitialValues(initialValues);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QCcontrol}/${e.id}?item_id=${partInfo.repairItemId}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        setOpacity(false);
        if (response.result.status_code === 200 && response.result.success) {
          const { data } = response.result;
          setServerMsg(null);
          setSelectName(data.name);
          const QcProperties = data.properties;
          const obj = {
            label: data.name,
            value: data.id,
          };
          setControlOptions(obj);
          console.log(obj);
          setTimeout(() => {
            initialValues.select_control = obj;
            setInitialValues(initialValues);
            setLoading(false);
          }, 1000);
          QcProperties.map((data2: any) => {
            let valueToUpdate = data2.selected_value;
            if (data2.selected_value === "pass") {
              valueToUpdate = "Yes";
            } else if (data2.selected_value === "fail") {
              valueToUpdate = "No";
            }

            initialValues[data2.names] = valueToUpdate;
            formik.current.setFieldValue(data2.names, valueToUpdate);
            return data2;
          });
          setInitialValues(initialValues);

          // QcProperties.map((data2: any) => {
          //   initialValues[data2.names] = data2.selected_value;
          //   setInitialValues(initialValues);
          //   formik.current.setFieldValue(data2.names, data2.selected_value);
          //   return data2;
          // });
          setQcDescriptions(data.qc_comments ? data.qc_comments : "");
          const control = QcProperties;
          setRepairItemsQc(control);
        } else {
          setServerMsg(response.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  const formSubmit = () => {
    formik.current.handleSubmit();
    if (
      formik.current &&
      formik.current.errors &&
      Object.keys(formik.current.errors)[0] === "qc_statuses_id"
    ) {
      if (myContainer && myContainer.current) {
        myContainer.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        myContainer.current.focus({ preventScroll: true });
      }
    }
  };

  function handleSubmit(data: any) {
    console.log(data, formik, repairItemsQc);

    setOpacity(true);
    const results = repairItemsQc;
    const qc_properties: any = [];
    results.map((values: any, i: any) => {
      let flag_value;
      const name1 = values.names;
      if (values.component !== "TextArea") {
        if (Object.keys(data).includes(values.names)) {
          flag_value = data[name1];
        } else {
          flag_value = values.selected_value;
        }

        const res = {
          order_id: i + 1,
          label: values.label,
          names: values.names,
          component: "Radio",
          options: [
            {
              label: "Yes",
              value: "Yes",
            },
            {
              label: "No",
              value: "No",
            },
            {
              label: "N/A",
              value: "na",
            },
          ],
          selected_value: flag_value,
        };

        qc_properties.push(res);
      }
      return values;
    });

    const Params = {
      control_name: selectName || "",
      qc_properties: qc_properties || "",
      repair_items_id: partInfo.repairItemId ? partInfo.repairItemId : "",
      qc_statuses_id: data.qc_statuses_id ? data.qc_statuses_id.value : "",
      qc_control_id: selectedControl ? selectedControl.value : "",
      qc_comments: qcdescriptions,
      part_notes: data.part_notes,
    };
    const apiObject = {
      payload: Params,
      method: "PUT",
      apiUrl: `${EndpointUrl.RepairItemsQc}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success) {
          setOpacity(false);
          setServerMsg(null);
          setOpenModel(false);
          sendEventData({
            success: true,
            msg: "Updated Successfully",
          });
          // setOpenModel(false)
        } else if (response.result.status_code === 422) {
          setServerMsg(response.result.data);
          setOpacity(false);
        }
      })
      .catch(() => {});
  }

  return (
    <SideDrawerW40>
      <PiSideDrawer isOpen={openModel} width="medium">
        <SideDrawerContainer>
          <SideDrawerHeader>
            <JobPopupHeaderContainer>
              <img src={AddIcons} alt="create-qc" className="qcicon" />

              <PiTypography component="h3">{headerTitle}</PiTypography>
              {/* <div className="hi"> */}
              <QuoteActivityPill
                className={getStatusClassName(
                  statusQc && statusQc.label
                    ? statusQc.label
                    : statusQc || "In Progress"
                )}
              >
                {statusQc && statusQc.label && statusQc.label
                  ? statusQc.label
                  : statusQc || "In Progress"}
              </QuoteActivityPill>

              {/* </div> */}
            </JobPopupHeaderContainer>
            <CloseButton
              onClick={() => closeModel()}
              title="close"
              className="Hover"
            >
              <img src={CrossLogo} alt="loading" />
            </CloseButton>
          </SideDrawerHeader>

          {loading ? (
            <Loader />
          ) : (
            <Formik
              validationSchema={QcValidation}
              onSubmit={(e: any) => handleSubmit(e)}
              initialValues={initialValues}
              innerRef={(e: any) => handleRef(e)}
              validateOnMount
            >
              {() => (
                <>
                  <FormBodyOverFlow
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
                    <RmaFields>
                      <Width100 className="d-flex-row-gap width-100">
                        <UserRolesField>
                          <PiSelectForm
                            name="select_control"
                            label="Checklist"
                            placeholder="Select Control"
                            isMulti={false}
                            onChange={(e: any) => {
                              onSelectItemChange(e);
                            }}
                            options={controlList}
                            // defaultValue={controlOptions}
                            classNamePrefix="react-select"
                            isDisabled={!!(statusQc && statusQc === "Pass")}
                            isMandatory
                          />
                        </UserRolesField>

                        <RepairDetailsContain>
                          <PartItemDetail className="qcControl">
                            {repairItemsQc &&
                              repairItemsQc.length > 0 &&
                              repairItemsQc.map((item: any) => (
                                <div className="qc_quetions">
                                  {item && item.component === "TextArea" ? (
                                    <div className="qcdata label ">
                                      <div>
                                        {item && item.label ? item.label : ""}:{" "}
                                      </div>
                                      <div className="lead">
                                        <AsyncLabel htmlFor="async-select-example" />
                                        <div className="web">
                                          <PiEditor
                                            libraryType="atalskit"
                                            onChange={(e: any) =>
                                              onDescriptionChange(e)
                                            }
                                            value={qcdescriptions}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="qcdata">
                                      <AsyncLabel htmlFor="async-select-example">
                                        {item.names}
                                      </AsyncLabel>

                                      <div className="radios">
                                        <PiRadioForm
                                          libraryType="atalskit"
                                          className="kers"
                                          name={item.names}
                                          options={options}
                                          isDisabled={item.isDisabled}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            <DetailViewStatusDropdowns
                              className="Dropdown"
                              ref={myContainer}
                            >
                              <>
                                <PiSelectForm
                                  placeholder="Status"
                                  isMulti={false}
                                  options={selectedStatus}
                                  label="Status"
                                  defaultValue={statusQcId}
                                  onChange={(e: any) => updateDelivedStatus(e)}
                                  className="select-width"
                                  classNamePrefix="react-select"
                                  name="qc_statuses_id"
                                  isDisabled={
                                    !!(statusQc && statusQc === "Pass")
                                  }
                                  isMandatory
                                />
                                <div className="lead">
                                  <div className="web">
                                    <PiTextareaForm
                                      libraryType="atalskit"
                                      // onChange={onDescriptionChange}
                                      // value={qcdescriptions}
                                      label="Part Notes"
                                      name="part_notes"
                                      placeholder="Type here..."
                                    />
                                  </div>
                                </div>
                                <div className="lead">
                                  <div className="web">
                                    <PiTextArea
                                      libraryType="atalskit"
                                      onChange={(e: any) =>
                                        onDescriptionChange(e)
                                      }
                                      value={qcdescriptions}
                                      label="QC Comments to Customer"
                                      name="qc_comments"
                                      placeholder="Type here..."
                                      isDisabled={
                                        !!(statusQc && statusQc === "Pass")
                                      }
                                    />
                                  </div>
                                </div>
                              </>
                            </DetailViewStatusDropdowns>
                          </PartItemDetail>
                        </RepairDetailsContain>
                      </Width100>
                    </RmaFields>
                  </FormBodyOverFlow>
                  <SideDrawerFooter>
                    {serverMsg && <div className="server-msg">{serverMsg}</div>}
                    <PiButton
                      type="submit"
                      appearance="primary"
                      label="Save"
                      libraryType="atalskit"
                      onClick={() => formSubmit()}
                      isDisabled={!!(statusQc && statusQc === "Pass")}
                    />
                  </SideDrawerFooter>
                </>
              )}
            </Formik>
          )}
        </SideDrawerContainer>
      </PiSideDrawer>
    </SideDrawerW40>
  );
}

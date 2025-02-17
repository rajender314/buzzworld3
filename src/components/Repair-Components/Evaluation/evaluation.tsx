/* eslint-disable react/no-unstable-nested-components */
import {
  PiButton,
  PiCheckBoxSelect,
  PiEditor,
  PiIconInput,
  PiInput,
  PiLabelName,
  PiSelect,
  PiSideDrawer,
  PiSpinner,
  PiTypography,
} from "pixel-kit";
import { ChangeEvent, useEffect, useState } from "react";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import CrossLogo from "@app/assets/images/cross.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";

import {
  PartInfoFlagProps,
  RouteParams,
} from "@app/modules/repair-detail-view/schema/repairs";
import { useParams } from "react-router-dom";
import GlobalVariables from "@app/core/globalVariables/globalVariables";
import { EditorContainer } from "@app/components/RepairNotes/repair-notes.component";
import {
  AsyncLabel,
  RmaFields,
} from "@app/components/rmaModel/RmaModel.component";
import {
  getEvaluationSummaryList,
  getRepairUsersList,
} from "@app/modules/repair-detail-view/helpers/repairs-helpers";
import RepairsImg from "@app/assets/images/repairs.svg";
import {
  QuotePopupHeaderContainer,
  Width100,
} from "@app/components/Quote-components/Forms/PartQuote/part-quote.component";
import InternalItemTextBox from "@app/components/RepairItems/internal-item-text-box";
import {
  EvaluationSummary,
  RadioLabel,
  RepairStatusRadio,
} from "./evaluation.component";
import {
  RepairDetailsContainer,
  PartItemDetails,
  PartNumber,
  ManufacterName,
  FormatOptionLabel,
} from "../LocationAssign/location-assign.component";
import { FormBodyOverFlow } from "../checksIns/assignLocation/assign-location.component";
import { SideDrawerFooter } from "../selectItems/AddPartRepair/add-part-repair.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "../selectItems/selectItemsModel/selectItem.component";

type SendEventProps = {
  success?: boolean;
  close?: boolean;
  msg?: string;
};

type Props = {
  partInfo: PartInfoFlagProps;
  // eslint-disable-next-line no-unused-vars
  sendEventData: (e: SendEventProps) => {};
};
export default function Evaluation({ partInfo, sendEventData }: Props) {
  const { id }: RouteParams = useParams();
  const [openSideDrawer, setSideDrawer] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [repairItemDetails, setRepairItemDetails]: any = useState({});
  const [repairTypeList, setRepairTypeList]: any = useState(
    GlobalVariables.radioItemList
  );
  const [repairType, setRepairType] = useState<string>("repairable");
  const [summaryList, setSummaryList]: any = useState([]);
  const [selectedSummary, setSelectedSummary]: any = useState([]);
  const [usersList, setUsersList]: any = useState([]);
  const [selectedTechnician, setSelectedTechnician]: any = useState();
  const [estimatedTime, setEstimatedTime] = useState("");
  const [techPrice, setTechPrice] = useState("");
  const [showFormatValidation, setShowTimeFormatValid] = useState("");
  const [partsCost, setPartsCost] = useState("");
  const [suggestedPriceValidation, setSuggestedPriceValidation] = useState("");
  const [partsCostValidation, setPartsCostValidation] = useState("");
  const [itemAttachments, setItemAttachments] = useState();

  useEffect(() => {
    (async () => {
      const users = await getRepairUsersList();
      const upDatedUsersList = users.map((obj: any) => ({
        ...obj,
        value: obj.id,
        label: obj.name || "No Name",
      }));

      setUsersList([...upDatedUsersList]);
    })();
  }, []);
  function getDataById(id2: string) {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.repairItems}/${id2}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          setRepairItemDetails(data);
          setSelectedTechnician(data.technician_id);
          setLoading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  useEffect(() => {
    setSideDrawer(true);
    // setRepairTypeList(GlobalVariables.radioItemList)
    setHeaderTitle("Evaluate Repair Item");
    getDataById(partInfo.repairItemId ? partInfo.repairItemId : "");
    GlobalVariables.radioItemList.map((obj: any) => {
      if (obj.value === "repairable") {
        obj.checked = true;
      } else {
        obj.checked = false;
      }
      return obj;
    });
    setRepairTypeList(GlobalVariables.radioItemList);
  }, [partInfo]);

  useEffect(() => {
    (async () => {
      const summary = await getEvaluationSummaryList();
      setSummaryList([...summary]);
    })();
  }, []);

  function closeModel() {
    setSideDrawer(false);
    sendEventData({
      close: true,
    });
  }

  const [serverMsg, setServerMsg] = useState(null);
  const [technote, setTechNote] = useState<string>("");
  const onChangeItemNotes = (e: string) => {
    setTechNote(e);
  };
  const [isSubmitted, setIsSubmitted] = useState(false);
  const updateEvaluation = () => {
    setIsSubmitted(true);
    if (repairType === "repairable") {
      if (!estimatedTime) {
        setShowTimeFormatValid("Please Enter Estimated Repair Hrs");
      }
      if (!partsCost) {
        setPartsCostValidation("Please Enter Estimated Parts Cost");
      }
      if (!techPrice) {
        setSuggestedPriceValidation("Please Enter Technician Suggested Price");
      }
    } else if (repairType === "outsource") {
      if (!techPrice) {
        setSuggestedPriceValidation("Please Enter Technician Suggested Price");
      }
    } else {
      setShowTimeFormatValid("");
      setPartsCostValidation("");
      setSuggestedPriceValidation("");
    }
    if (
      selectedSummary.length === 0 ||
      // estimatedTime === '' ||
      // techPrice === '' ||
      suggestedPriceValidation ||
      showFormatValidation ||
      partsCostValidation
      // partsCost === ''
    ) {
      return;
    }
    const params = {
      repair_type: repairType,
      repairs_id: id,
      technical_note: technote,
      evaluation_summary: selectedSummary,
      estimated_hrs: estimatedTime,
      tech_sugg_price: techPrice,
      technician_id: selectedTechnician,
      internal_item_notes: itemAttachments,
      estimated_parts_cost: partsCost,
    };
    const apiObject = {
      payload: params || {},
      method: "PUT",
      apiUrl: `${EndpointUrl.itemsEvaluate}/${repairItemDetails.id}`,
      // apiUrl: "testing",
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setServerMsg(null);
          sendEventData({
            success: true,
            msg: "Updated Successfully",
          });
        } else {
          setServerMsg(response.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const [isStatusChanged, setIsStatusChanged] = useState(false);
  const statusChange = (e: ChangeEvent<HTMLInputElement>, value: string) => {
    setIsStatusChanged(true);
    setTimeout(() => {
      setIsStatusChanged(false);
      setRepairType(value);
    }, 0);

    // if (value === "repairable") {
    setSuggestedPriceValidation("");
    setShowTimeFormatValid("");
    setPartsCostValidation("");
    // }

    repairTypeList.map((obj: any) => {
      if (obj.value === value) {
        obj.checked = true;
      } else {
        obj.checked = false;
      }
      return true;
    });
    setRepairTypeList([...repairTypeList]);

    setEstimatedTime("");
    setTechPrice("");
    setPartsCost("");
  };
  const selectSummary = (e: any) => {
    setSelectedSummary(e);
  };

  const onTimeChange = (e: any) => {
    const val = e.target.value.trim();
    const validPrice = /^\d*(\.\d{0,4})?$/gm;
    setEstimatedTime(e.target.value);
    if (e.target.value === "") {
      setShowTimeFormatValid("Please Enter Estimated Repair Hrs");
    } else if (!/^(?![,.0]*$)/gm.test(val)) {
      setShowTimeFormatValid("Estimated Repair Hrs cannot be zero");
    } else if (!validPrice.test(val)) {
      setShowTimeFormatValid("Please enter valid time");
    } else {
      setShowTimeFormatValid("");
    }
    // formik.current.setFieldValue(`selected_time`, e.target.value)
    // if (e.target.value === '00:00') {
    //  formik.current.setFieldValue(`selected_time`, '')
    // }
  };
  const changeTechPrice = (e: any) => {
    const val = e.trim();
    const validPrice = /^\d*(\.\d{0,4})?$/gm;
    setTechPrice(val);

    if (val === "") {
      setSuggestedPriceValidation("Please enter Technician Suggested Price");
    } else if (!/^(?![,.0]*$)/gm.test(val)) {
      setSuggestedPriceValidation("Suggested Price cannot be zero");
    } else if (!validPrice.test(val)) {
      setSuggestedPriceValidation("Please enter valid price");
    } else {
      setSuggestedPriceValidation("");
    }
  };
  const changePartsPrice = (e: any) => {
    const val = e.trim();
    const validPrice = /^\d*(\.\d{0,4})?$/gm;

    if (val === "") {
      setPartsCostValidation("Please enter Estimated Parts Cost");
    } else if (!/^(?![,.0]*$)/gm.test(val)) {
      setPartsCostValidation("Estimated Parts Cost cannot be zero");
    } else if (!validPrice.test(val)) {
      setPartsCostValidation("Please enter valid price");
    } else {
      setPartsCostValidation("");
    }
    setPartsCost(val);
  };

  const selectTechnician = (e: any) => {
    setSelectedTechnician(e);
  };

  const triggerEventData = async (e: any) => {
    setItemAttachments(e);
  };
  function validatealphanumeric(key: any) {
    const keycode = key.which ? key.which : key.keyCode;
    const t = key.target.value;
    if (
      !(keycode === 8 || keycode === 46) &&
      (keycode < 48 || keycode > 57) &&
      (keycode < 97 || keycode > 122)
    ) {
      return false;
    }
    if (
      key !== 37 &&
      key !== 39 &&
      key.target.selectionStart > t.indexOf(".")
    ) {
      key.target.value =
        t.indexOf(".") >= 0
          ? t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 2)
          : t;
      return false;
    }
    return true;
  }
  function MemoizedFormatOptionLabel(data: any) {
    const { name, label, total_hours } = data;
    return (
      <FormatOptionLabel>
        <div className="cmpny_name">{name || label || "No Name"}</div>
        <div className="account_no">
          -&nbsp;
          {total_hours}
        </div>
      </FormatOptionLabel>
    );
  }
  return (
    <PiSideDrawer isOpen={openSideDrawer} width="medium">
      <SideDrawerContainer>
        <SideDrawerHeader>
          <QuotePopupHeaderContainer>
            <img src={RepairsImg} alt="loading" />
            <PiTypography component="h3">{headerTitle}</PiTypography>
          </QuotePopupHeaderContainer>
          <CloseButton
            onClick={() => closeModel()}
            title="close"
            className="Hover"
          >
            <img src={CrossLogo} alt="loading" />
          </CloseButton>
        </SideDrawerHeader>
        <FormBodyOverFlow>
          {loading && (
            <SpinnerDiv style={{ height: "100%" }}>
              <PiSpinner color="primary" size={50} libraryType="atalskit" />
            </SpinnerDiv>
          )}
          {!loading && (
            <RepairDetailsContainer>
              <PartItemDetails>
                <div className="part-parent">
                  <ManufacterName>
                    {repairItemDetails.manufacturer_id
                      ? repairItemDetails.manufacturer_id.label
                      : "-"}
                  </ManufacterName>
                  <PartNumber>
                    {repairItemDetails.part_number
                      ? repairItemDetails.part_number.label
                      : "-"}
                  </PartNumber>
                </div>
                <div className="card">
                  <div className="repair-description">
                    {repairItemDetails.description
                      ? repairItemDetails.description
                      : "-"}
                  </div>
                  <div className="quantity-parent">
                    <PiLabelName
                      description={
                        repairItemDetails.quantity
                          ? repairItemDetails.quantity
                          : "-"
                      }
                      label="Quantity"
                    />
                    <PiLabelName
                      description={
                        repairItemDetails.priority
                          ? repairItemDetails.priority.label
                          : "-"
                      }
                      label="Priority"
                    />
                    <PiLabelName
                      description={
                        repairItemDetails.serial_number
                          ? repairItemDetails.serial_number
                          : "-"
                      }
                      label="Serial No"
                    />
                  </div>
                </div>

                <EvaluationSummary>
                  <PiCheckBoxSelect
                    libraryType="atalskit"
                    variant="outlined"
                    name="select"
                    label="Summary"
                    onChange={(e) => selectSummary(e)}
                    options={summaryList}
                    placeholder="Select"
                    classNamePrefix="pi-select-height-auto"
                    isMulti
                    isMandatory
                  />
                  {selectedSummary.length === 0 && isSubmitted && (
                    <small
                      className="validation-error"
                      style={{ marginTop: "-10px" }}
                    >
                      Please select Summary
                    </small>
                  )}
                  <RepairStatusRadio>
                    <div className="repair-Status-label">Repair Status</div>
                    <div className="container">
                      {repairTypeList.map((obj: any) => (
                        <div className="radio">
                          <input
                            id={obj.id}
                            name={obj.name}
                            type="radio"
                            onChange={(e) => statusChange(e, obj.value)}
                            // className={true ? 'active' : null}
                            checked={obj.checked}
                          />
                          <RadioLabel
                            htmlFor={obj.htmlFor}
                            className="radio-label"
                          >
                            {obj.label}
                          </RadioLabel>
                        </div>
                      ))}
                    </div>
                    <RmaFields>
                      <div
                        className="width-50 assign-tech"
                        style={{ alignItems: "center" }}
                      >
                        <PiSelect
                          libraryType="atalskit"
                          variant="outlined"
                          name="technicain"
                          label="Assign Technician"
                          onChange={(e) => selectTechnician(e)}
                          options={usersList}
                          placeholder="Select"
                          value={selectedTechnician}
                          isMandatory
                          formatOptionLabel={(e: any) =>
                            MemoizedFormatOptionLabel(e)
                          }
                        />
                        {!selectedTechnician && isSubmitted && (
                          <small
                            className="validation-error"
                            style={{ marginTop: "0" }}
                          >
                            Please select Technician
                          </small>
                        )}
                      </div>
                      {repairType === "repairable" && !isStatusChanged && (
                        <>
                          <div className="width-50">
                            {/* <TimeField
                            value={estimatedTime}
                            colon="."
                            input={
                              <PiInput
                                name="selected_time"
                                label="Estimated Repair Hrs"
                              />
                            }
                            onChange={onTimeChange}
                          />
                          {(estimatedTime === '' ||
                            estimatedTime === '00.00') &&
                            isSubmitted && (
                              <small
                                className="validation-error"
                                style={{ marginTop: '0' }}
                              >
                                Please enter Estimated Repair Hrs
                              </small>
                            )} */}
                            <PiInput
                              name="estimated_hrs"
                              label="Estimated Repair Hrs"
                              placeholder="Estimated Repair Hrs"
                              isMandatory
                              onChange={onTimeChange}
                              // type="number"
                              onKeyPress={(e: any) => validatealphanumeric(e)}
                            />
                            {showFormatValidation && isSubmitted && (
                              <small
                                className="validation-error"
                                style={{ marginTop: "0" }}
                              >
                                {showFormatValidation}
                              </small>
                            )}
                          </div>

                          <div className="icon_input width-50 pd-0">
                            <PiIconInput
                              className="gap-10"
                              name="price"
                              label="Estimated Parts Cost"
                              placeholder="Estimated Parts Cost"
                              value={partsCost}
                              maxLength={10}
                              type="string"
                              onChange={changePartsPrice}
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
                              onKeyPress={(e: any) => {
                                const key = e.charCode ? e.charCode : e.keyCode;
                                const t = e.target.value;
                                if (
                                  key !== 37 &&
                                  key !== 39 &&
                                  e.target.selectionStart > t.indexOf(".")
                                ) {
                                  e.target.value =
                                    t.indexOf(".") >= 0
                                      ? t.substr(0, t.indexOf(".")) +
                                        t.substr(t.indexOf("."), 2)
                                      : t;
                                  return true;
                                }
                                return true;
                              }}
                            />
                            {partsCostValidation && isSubmitted && (
                              <small
                                className="validation-error"
                                style={{ marginTop: "0" }}
                              >
                                {partsCostValidation}
                              </small>
                            )}
                          </div>
                        </>
                      )}
                      {(repairType === "repairable" ||
                        repairType === "outsource") &&
                        !isStatusChanged && (
                          <div
                            className={`icon_input width-50 pd-0 ${repairType === "outsource" ? "pd-3" : ""}`}
                          >
                            <PiIconInput
                              className="gap-10"
                              name="price"
                              label="Technician Suggested Price"
                              placeholder="Technician Suggested Price"
                              value={techPrice}
                              maxLength={10}
                              type="string"
                              onChange={changeTechPrice}
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
                              onKeyPress={(e: any) => {
                                const key = e.charCode ? e.charCode : e.keyCode;
                                const t = e.target.value;
                                if (
                                  key !== 37 &&
                                  key !== 39 &&
                                  e.target.selectionStart > t.indexOf(".")
                                ) {
                                  e.target.value =
                                    t.indexOf(".") >= 0
                                      ? t.substr(0, t.indexOf(".")) +
                                        t.substr(t.indexOf("."), 2)
                                      : t;
                                  return true;
                                }
                                return true;
                              }}
                            />
                            {suggestedPriceValidation && isSubmitted && (
                              <small
                                className="validation-error"
                                style={{ marginTop: "0" }}
                              >
                                {suggestedPriceValidation}
                              </small>
                            )}
                          </div>
                        )}
                    </RmaFields>
                    <EditorContainer
                      className="item-specific-notes"
                      style={{ paddingTop: "10px", paddingBottom: "10px" }}
                    >
                      <AsyncLabel htmlFor="async-select-example">
                        Technician Notes to Customer
                      </AsyncLabel>
                      <PiEditor
                        libraryType="atalskit"
                        onChange={onChangeItemNotes}
                        value={technote}
                      />
                    </EditorContainer>
                    {/* <div>
                        <PiTextArea
                          name="description"
                          label="Internal Item Notes"
                          libraryType="atalskit"
                          placeholder="Enter Internal Item Notes"
                          maxLength={255}
                          onChange={onNotesChange}
                        />
                      </div> */}
                    <Width100>
                      <InternalItemTextBox sendEventData={triggerEventData} />
                    </Width100>
                  </RepairStatusRadio>
                </EvaluationSummary>
              </PartItemDetails>
            </RepairDetailsContainer>
          )}
        </FormBodyOverFlow>
        <SideDrawerFooter>
          {serverMsg && (
            <div className="server-msg" title={serverMsg}>
              {serverMsg}
            </div>
          )}
          <PiButton
            appearance="primary"
            label="Update Evaluation"
            onClick={updateEvaluation}
          />
        </SideDrawerFooter>
      </SideDrawerContainer>
    </PiSideDrawer>
  );
}

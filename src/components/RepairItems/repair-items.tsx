/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
import {
  PiButton,
  PiCheckbox,
  PiConfirmModel,
  PiToast,
  PiTooltip,
  PiTypography,
} from "pixel-kit";
import { useCallback, useEffect, useRef, useState } from "react";
import AddLogo from "@app/assets/images/Plus.svg";

import { getPermissionObject } from "@app/helpers/componentHelpers";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { useHistory, useParams } from "react-router-dom";
import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";
import { token, triggerApi } from "@app/services";
import { ApiResponse, ProfileProps } from "@app/services/schema/schema";
import ThemecolorEdit from "@app/assets/images/themecolorEdit.svg";
import { QuoteActivityPill } from "@app/core/components/gridStatus/gridStatus.component";
import { getStatusClassName } from "@app/modules/Quotes/Repair-Quotes/helpers/quote-helpers";
import { getUserLoggedPermission } from "@app/helpers/helpers";
import AddIcons from "@app/assets/images/qc_checklist.svg";
import {
  CardBottomDetails,
  CardTopDetails,
  CardViews,
} from "@app/core/components/ItemsCard/item-card.component";
import RepairSummaryIcon from "@app/assets/images/repair_summary.svg";
import Repair from "@app/assets/images/repairs_error.svg";
import EyeIcon from "@app/assets/images/eyeIcon.svg";
import WoToeTag from "@app/assets/images/Toe-Tag-Scanner.svg";
import ReactToPrint from "react-to-print";
import PartsPurchase from "@app/assets/images/partspurchase-detailview.svg";
import Avatar from "@app/assets/images/avator.svg";
import NotesLog from "@app/assets/images/notes-log.svg";
import AddTimeEntry from "@app/assets/images/Add_time.svg";
import DropdownMenu, {
  DropdownItemGroup,
  DropdownItem,
} from "@atlaskit/dropdown-menu";
import Button from "@atlaskit/button";
import ChangeStatus from "@app/assets/images/status-change.svg";
import printIcon from "@app/assets/images/print.svg";
import repairIcon from "@app/assets/images/Repair.svg";
import NonrepairIcon from "@app/assets/images/No_Repair.svg";
import OutSourceIcon from "@app/assets/images/Outsource_Repair.svg";
import { DetailViewStatusDropdown } from "../detail-view-header/detail-view-header.component";
import Manual from "../Jobs-components/new-time-entry-manualForm/new-manual-entry-manual";
import ItemInternalNotes from "./item-internal-notes";
import { AvatarSection } from "../RepairInformation/repair-information.component";
import AssignQCPopup from "./assign-qc-popup";
import PartsPurchaseForm from "../parts-purchase-components/parts-purchase-form.tsx/parts-purchase-form";
import WoeTagBody from "./WoeTag.component";
import SelectSummary from "./select-summary";
import useScrollWithShadow from "../scrollbar-shadow/hook";
import {
  ImgTag,
  LinkWithIcon,
} from "../secondaryheader/secondaryheader.component";

import {
  ActionsWrapper,
  ChangeStatusIcon,
  // CardBottomDetails,
  // CardTopDetails,
  ItemCard,
  NoRepairFound,
  RepairCardsHeader,
  RepairItemCardWrapper,
} from "./repair-items.component";
import { RepairInfoSection } from "../detail-view-content/detail-view-content.component";
import Evaluation from "../Repair-Components/Evaluation/evaluation";
import LocationAssign from "../Repair-Components/LocationAssign/location-assign";
import AddItems from "../Repair-Components/addItems/addItems";
import SelectItems from "../Repair-Components/selectItems/selectItemsModel/selectItem";
import QCAddItem from "../Repair-Components/qcadditems/qcadditem/qcadditem";
import SelectCheckInList from "../Repair-Components/checksIns/selectCheckInList/selectCheckInList";

export default function RepairItems({
  repairRef,
  repairInfo,
  repairItemsData,
  sendEventData,
  moveToQuoteEvent,
}: any) {
  // console.log(repairItemsData.list);
  const { id }: RouteParams = useParams();
  const [repairsList, setRepairsList] = useState(repairItemsData.list);
  const [openSelectItems, setOpenSelectItems] = useState(false);
  const [openAddItems, setOpenAddItems] = useState(false);
  const [openQCControl, setOpenQCControl] = useState(false);
  const [partInfo, setpartInfo]: any = useState({ title: "Add" });
  const [showChekInModel, setChekInModel] = useState(false);
  const [openSnackbar, setSnackbar] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [totalCheckedItems, setTotalCheckedItems] = useState([]);
  const [permissionObject, setpermissionObject] = useState<any>({});
  const [serverMsg, setServerMsg] = useState(null);
  const [openConFirm, setConFirm] = useState(false);
  const [openSummaryForm, setOpenSummaryForm] = useState(false);
  const [selectedRepair, setSelectedRepair]: any = useState();
  const [addToQuotePerm, setAddToQuotePerm] = useState<any>({});
  const [confirmText, setConfirmText] = useState<any>();
  const enableShadow = true;
  const { boxShadow, onScrollHandler } = useScrollWithShadow();
  const [repairItemId, setRepairItemId] = useState<any>();
  const [WoToeData, setWoToeData]: any = useState();
  const [openAssignQc, setOpenAssignQc] = useState(false);
  const [openInternalNotes, setOpenInternalNotes] = useState(false);
  const [jobInfos, setjobInfos] = useState({});
  const history = useHistory();
  const [revertStatusObj, setRevertStatusObj]: any = useState();
  const [openNextStatus, setOpenNextStatus] = useState(false);
  const [openEvaluationModel, setOpenEvaluationModel] = useState(false);
  const [itemId, setItemId] = useState("");
  // const pagestyle = `{ size: 240px 444px }`;
  const pagestyle = `

  @media print {
    @page { size: 240px 444px; }
  }
`;
  // useEffect(() => {
  //   if (relatedData.length > 0) {
  //     const indx = _.findIndex(relatedData, {
  //       id_type: "Job ID",
  //     });
  //     console.log(indx);
  //     if (indx > -1) {
  //       const info = {
  //         job_id: relatedData[indx].label,
  //       };
  //       setjobInfos({ ...info });
  //     }
  //   }
  // }, [relatedData]);

  function modelSetToFalse() {
    setOpenAddItems(false);
    setOpenQCControl(false);
    setOpenSelectItems(false);
    setChekInModel(false);
    setOpenNextStatus(false);
    setOpenEvaluationModel(false);
    setOpenSummaryForm(false);
    setOpenQCControl(false);
    setOpenAssignQc(false);
    setOpenInternalNotes(false);
  }
  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("repair-request");
      setpermissionObject(permission);
      const addTo_QuotePerm = await getPermissionObject("add_to_quote");
      setAddToQuotePerm(addTo_QuotePerm);
    })();
  }, []);
  useEffect(() => {
    repairItemsData.list = repairItemsData.list.map((obj: any) => {
      obj.enableCheckbox = true;
      return obj;
    });
    setRepairsList(repairItemsData.list);

    setTotalCheckedItems([]);
  }, [repairItemsData, repairRef]);
  const [displayAddToQuoteBtn, setDisplayAddToQuote] = useState(false);

  function selectCheckBox(e: any, item: any) {
    e.stopPropagation();
    let list: any = [];
    list = repairsList.map((obj: any) => {
      if (obj.id === item.id) {
        if (e.target.checked) {
          obj.isChecked = true;
        } else {
          obj.isChecked = false;
        }
      }
      return obj;
    });
    setRepairsList(list);
    const totalCheckedItemsData = repairsList.filter((ev: any) => ev.isChecked);
    setTotalCheckedItems(totalCheckedItemsData);

    list = repairsList.map((obj: any) => {
      if (totalCheckedItemsData.length > 0) {
        if (item.status_code === "pending_quote") {
          setDisplayAddToQuote(true);
          if (obj.status_code === "pending_quote") {
            obj.enableCheckbox = true;
          } else {
            obj.enableCheckbox = false;
          }
        } else if (item.status_code === "receiving") {
          setDisplayAddToQuote(false);
          if (obj.status_code === "receiving") {
            obj.enableCheckbox = true;
          } else {
            obj.enableCheckbox = false;
          }
        }
      } else {
        obj.enableCheckbox = true;
      }
      return obj;
    });
    setRepairsList(list);
  }

  function selectItems() {
    setOpenSelectItems(true);
  }
  // function addItems() {
  //  setpartInfo({ title: 'Add' })
  //  setOpenAddItems(true)
  // }

  function repaitItemsList() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.repairItems}?repairs_id=${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const data = response.result.data.list;
          setRepairsList([...data]);
          setTotalCheckedItems([]);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
    return true;
  }

  async function triggerQCItemsEvents(e: any) {
    console.log(e);
    if (e.close) {
      repaitItemsList();
      setTimeout(() => {
        modelSetToFalse();
      }, 500);
    }
    if (e.success) {
      setTotalCheckedItems([]);
      setOpenSelectItems(false);
      sendEventData(e);
      setToastMsg(e.msg);
      setSnackbar(true);
      modelSetToFalse();
    }
  }
  async function triggerItemsEvent(e: any) {
    console.log(e);
    if (e.close) {
      repaitItemsList();
      setTimeout(() => {
        modelSetToFalse();
      }, 500);
    }
    if (e.success) {
      setTotalCheckedItems([]);
      setOpenSelectItems(false);
      sendEventData(e);
      setToastMsg(e.msg);
      setSnackbar(true);
      modelSetToFalse();
    }
  }

  function editPartRepair(e: any, id2: string, isEdit: boolean) {
    repaitItemsList();
    e.stopPropagation();
    setpartInfo({
      title: isEdit ? "Edit" : "Repair",
      repairItemId: id2,
      repairStatus: repairItemsData.repair_status,
    });
    setOpenAddItems(true);
  }
  function QcControlEdit(e: any, id2: string) {
    repaitItemsList();
    e.stopPropagation();
    setpartInfo({ title: "Edit", repairItemId: id2 });
    setOpenQCControl(true);
  }

  function checkInItems() {
    setChekInModel(true);
  }

  const moveToNextStatus = (e: any, obj: any) => {
    // e.stopPropagation()
    if (obj.action_label === "Assign to QC") {
      setpartInfo({
        title: "Edit",
        repairItemId: obj.id,
        status: obj.status_code,
      });
      setOpenAssignQc(true);
      return;
    }
    repaitItemsList();
    setItemId(obj.id);

    if (obj.is_action_enable) {
      if (obj.status_code === "receiving") {
        setpartInfo({
          title: "Edit",
          repairItemId: obj.id,
          status: obj.status_code,
        });
        setOpenNextStatus(true);
        console.log(obj);
      } else if (obj.status_code === "checkedin") {
        setpartInfo({
          title: "Edit",
          repairItemId: obj.id,
          status: obj.status_code,
        });
        setOpenNextStatus(true);
      } else if (obj.status_code === "pending_evaluation") {
        setpartInfo({ title: "Edit", repairItemId: obj.id });
        setOpenEvaluationModel(true);
      } else if (obj.status_code === "repairable") {
        setConfirmText("Are you sure you want to assign these item(s) to QC ?");
        setConFirm(true);
      } else if (
        obj.status_code === "parts_received" ||
        obj.status_code === "initial_inspection"
      ) {
        setpartInfo({
          title: "Edit",
          repairItemId: obj.id,
          status: obj.status_code,
          status_manual_key: obj.status_manual_key,
        });
        setConfirmText(
          "Are you sure you want to move this item to Repair In Progress?"
        );
        setConFirm(true);
      } else if (obj.status_code === "repair_pending_invoice") {
        setpartInfo({
          title: "Edit",
          repairItemId: obj.id,
          status: obj.status_code,
          status_manual_key: obj.status_manual_key,
        });
        setConfirmText(
          "Are you sure you want to move this status to Completed?"
        );
        setConFirm(true);
      } else if (obj.status_code === "repair_qc_failed") {
        setpartInfo({
          title: "Edit",
          repairItemId: obj.id,
          status: obj.status_code,
          status_manual_key: obj.status_manual_key,
        });
        setConfirmText(
          "Are you sure you want to move this status to Pending QC?"
        );
        setConFirm(true);
      } else if (
        obj.status_code === "parts_requested" ||
        obj.status_code === "parts_ordered"
      ) {
        setpartInfo({
          title: "Edit",
          repairItemId: obj.id,
          status: obj.status_code,
          status_manual_key: obj.status_manual_key,
        });
        setConfirmText(
          "Are you sure you want to move this status to Initial Inspection?"
        );
        setConFirm(true);
      }
    }
  };
  const moveToQuote = () => {
    setConfirmText("Are you sure you want to add these item(s) to quote ?");
    setConFirm(true);
  };

  const assignToQC = () => {
    const apiObject = {
      payload: { repairs_id: id, type: "assigned_to_qc" },
      method: "PUT",
      apiUrl: `${EndpointUrl.ManuallyRepairStatusUpdate}/${itemId}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const obj = {
            success: true,
          };
          sendEventData(obj);
          setToastMsg("Assigned to QC");
          setSnackbar(true);
        } else {
          const obj = {
            from: undefined,
          };
          moveToQuoteEvent(obj);
          setServerMsg(response.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const moveToRepairInProgress = (key: string) => {
    sendEventData({ showPrint: true });
    const apiObject = {
      payload: { type: key || partInfo.status_manual_key },
      method: "PUT",
      apiUrl: `${EndpointUrl.ManuallyRepairStatusUpdate}/${itemId}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const obj = {
            success: true,
          };
          sendEventData(obj);
          sendEventData({ opacityLoading: false });
          setToastMsg("Updated Successfully");
          setSnackbar(true);
        } else {
          const obj = {
            from: undefined,
          };
          moveToQuoteEvent(obj);
          setServerMsg(response.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const repairSummary = (e: any, obj: any) => {
    setSelectedRepair(obj);
    setOpenSummaryForm(true);
  };
  async function getConfirmModelEvent(e: string) {
    if (
      e === "accept" &&
      confirmText === "Are you sure you want to add these item(s) to quote ?"
    ) {
      const iDList: any = [];
      totalCheckedItems.map((obj: any) => {
        iDList.push(obj.id);
        return iDList;
      });
      const apiObject = {
        payload: { repairs_id: id, item_ids: iDList },
        method: "POST",
        apiUrl: `${EndpointUrl.SaveRepairItemstoQuote}`,
        headers: {},
      };
      triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            const obj = {
              success: true,
            };
            sendEventData(obj);
            setToastMsg("Added to Quote Succesfully");
            setSnackbar(true);
            // const obj2 = {
            //  from: "move_to_quote",
            // };
            // moveToQuoteEvent(obj2);
            history.push(
              `/${response.result.data.redirect_route}${response.result.data.id}`
            );
          } else {
            // const obj = {
            //  from: undefined,
            // };
            // moveToQuoteEvent(obj);
            setServerMsg(response.result.data);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    } else if (
      e === "accept" &&
      repairItemsData.repair_status === "repair_in_progress"
    ) {
      assignToQC();
    } else if (
      e === "accept" &&
      (confirmText ===
        "Are you sure you want to move this item to Repair In Progress?" ||
        confirmText ===
          "Are you sure you want to move this status to Completed?" ||
        confirmText ===
          "Are you sure you want to move this status to Pending QC?" ||
        confirmText ===
          "Are you sure you want to move this status to Initial Inspection?")
    ) {
      moveToRepairInProgress(partInfo.status_manual_key);
    } else if (
      e === "accept" &&
      confirmText ===
        `Are you sure you want to mark it as ${revertStatusObj.name} ?`
    ) {
      console.log(revertStatusObj);
      moveToRepairInProgress(revertStatusObj.code);
    }

    setConFirm(false);
  }

  // const WoeTagDownload = (e: any, obj: any, id: any) => {
  //   console.log(9999);

  //   setRepairItemId(id);
  //   setConfirmPrint(true);
  // }
  // async function printApi(itemId: any) {
  //   console.log(998);
  //   const apiObject = {
  //     payload: {},
  //     method: "GET",
  //     apiUrl: `${EndpointUrl.WoToeTag}?repairs_id=${id}&id=${itemId}`,
  //     headers: {},
  //   };
  //   triggerApi(apiObject)
  //     .then(async (response: any) => {
  //       if (response.result.success && response.result.status_code === 200) {
  //         setWoToeData(response.result.data);
  //         setshowPrint(true);
  //       }
  //     })
  //     .catch((err: string) => {
  //       console.log(err);
  //     });
  // }

  const onBeforeGetContentResolve = useRef(null);

  const handleOnBeforeGetContent = useCallback(
    (id2: any, repairs_id: any) => {
      sendEventData({ showPrint: true });
      return new Promise((resolve: any) => {
        onBeforeGetContentResolve.current = resolve;

        const apiObject = {
          payload: {},
          method: "GET",
          apiUrl: `${EndpointUrl.WoToeTag}?repairs_id=${repairs_id}&id=${id2}`,
          headers: {},
        };
        triggerApi(apiObject)
          .then(async (response: any) => {
            if (
              response.result.success &&
              response.result.status_code === 200
            ) {
              setTimeout(() => {
                setWoToeData(response.result.data);
                sendEventData({ opacityLoading: false });
                resolve();
              }, 250);
            } else {
              setToastMsg("Failed to generate preview");
              setSnackbar(true);
            }
          })
          .catch((err: string) => {
            console.log(err);
          });
      });
    },
    [WoToeData]
  );

  const componentRef = useRef<HTMLDivElement>(null);

  const onHandleDownload = async (id2: any, index: number) => {
    // setloading(true);
    sendEventData({ showPrint: true });

    repairsList.map(async (item: any, i: number) => {
      if (i === index) {
        const apiObject = {
          payload: {},
          method: "GET",
          apiUrl: `${EndpointUrl.DownloadRepairPdf}?id=${id2}&token=${token}`,
          headers: {},
        };
        await triggerApi(apiObject)
          .then((response: ApiResponse) => {
            if (response && response.result.success) {
              // setloading(false);

              // setToastMsg("PDF generated Successfully");

              const downloadUrl = response.result.data;
              window.open(downloadUrl, "_blank");
              sendEventData({ opacityLoading: false });
            } else {
              setTimeout(() => {
                setToastMsg("Failed to generate preview");
                setSnackbar(true);
                sendEventData({ showPrint: false });
              }, 1000);
              // setToastMsg("Failed to generate preview");
              // setSnackbar(true);
              // sendEventData({ showPrint: false });
              // setOpacity(false);
            }
          })
          .catch((err: string) => {
            console.log(err);
          });
      }
      return item;
    });
  };
  const [showpartsurchaseForm, setShowPartsPurchaseForm] =
    useState<boolean>(false);
  const createPP = (itemId2: string) => {
    setRepairItemId(itemId2);
    setShowPartsPurchaseForm(true);
  };
  async function getPartsPurchaseModelEvent(e: any) {
    if (e && e.success) {
      setShowPartsPurchaseForm(false);
    } else {
      setShowPartsPurchaseForm(false);
    }
  }
  const getFontSize = () =>
    WoToeData && WoToeData.storage_location.length > 4 ? "12px" : "16px";
  const viewInternalNotes = (itemId2: string) => {
    setRepairItemId(itemId2);
    setOpenInternalNotes(true);
  };
  const [showTimeEntry, setTimeEntry] = useState(false);
  const addTimeEntry = (itemId2: string, item: any) => {
    setRepairItemId(itemId2);
    const info = {
      job_id: item.job_id,
    };
    setjobInfos({ ...info });
    setTimeEntry(true);
  };

  async function getEventData(e: any) {
    if (e && e.closeModel) {
      setTimeEntry(false);
    } else if (e && e.addTimeEntry) {
      setTimeEntry(false);
    }
  }
  const revertStatus = (e: any, item: any) => {
    console.log(e, item);
    setItemId(item.id);
    setRevertStatusObj(e);
    setConfirmText(`Are you sure you want to mark it as ${e.name} ?`);
    setConFirm(true);
  };

  const customToPrint = (printWindow: any) => {
    // const originScrollContainer = document.querySelector(".scroll-container");

    // printedScrollContainer.scrollTop = originScrollContainer.scrollTop;

    printWindow.contentWindow.print();

    // print must return a Promise
    return Promise.resolve();
  };
  return (
    <>
      <RepairInfoSection ref={repairRef} id="repair-items">
        <RepairCardsHeader>
          <PiTypography component="h4">
            {`Repair Items (${repairItemsData.total_count ? repairItemsData.total_count : "0"})`}
          </PiTypography>
          <div className="cards-btns-group">
            {totalCheckedItems.length === 0 &&
              permissionObject.Edit === true && (
                <>
                  <div className="Button-Icon-Display">
                    <LinkWithIcon
                      className="Icon-space primary-button "
                      onClick={() => selectItems()}
                    >
                      <ImgTag src={AddLogo} alt="loading" />
                      <span className="button-icon-text ">Add Items</span>
                    </LinkWithIcon>
                  </div>
                  {/* <PiButton
                    appearance="primary"
                    label="Add Items"
                    libraryType="atalskit"
                    onClick={selectItems}
                    //isDisabled={!showSelectItemsBtn}
                  /> */}
                </>
              )}
            {totalCheckedItems.length > 0 &&
              permissionObject.Edit === true &&
              !displayAddToQuoteBtn && (
                <PiButton
                  appearance="secondary"
                  label="Check in selected items"
                  libraryType="atalskit"
                  onClick={() => checkInItems()}
                />
              )}
            {repairItemsData.is_display_button &&
              totalCheckedItems.length > 0 &&
              addToQuotePerm.add_to_quote &&
              displayAddToQuoteBtn && (
                <PiButton
                  appearance="secondary"
                  label="Add items to quote"
                  libraryType="atalskit"
                  onClick={moveToQuote}
                />
              )}
          </div>
        </RepairCardsHeader>

        {/* <hr /> */}
        {repairsList.length > 0 && (
          <RepairItemCardWrapper
            onScroll={onScrollHandler}
            className="scrollArea"
            style={enableShadow ? { boxShadow } : {}}
          >
            {repairsList.map((obj: any, index: number) => (
              <ItemCard>
                {/* <CardView>
                    {getUserLoggedPermission() &&
                      (obj.status_code === "receiving" ||
                        ((repairInfo.repair_info.status_code ===
                          "pending_quote" ||
                          repairInfo.repair_info.status_code ===
                            "added_to_quote" ||
                          repairInfo.repair_info.status_code ===
                            "repair_in_progress") &&
                          !obj.is_added_to_quote)) && (
                        <div className="check_box">
                          <PiCheckbox
                            isChecked={obj.isChecked}
                            helpText=""
                            libraryType="atalskit"
                            name={`checkbox${index}`}
                            onChange={(e) => selectCheckBox(e, obj)}
                            size="large"
                            className="repair-item-checkbox"
                            // isDisabled={
                            //   obj.status_code === "receiving"
                            //     ? false
                            //     : true
                            // }
                          />
                        </div>
                      )}
                    {getUserLoggedPermission() &&
                      obj.status_code !== "receiving" &&
                      repairInfo.repair_info.status_code !== "pending_quote" &&
                      repairInfo.repair_info.status_code !== "added_to_quote" &&
                      repairInfo.repair_info.status_code ===
                        "repair_in_progress" && (
                        <div
                          className=""
                          style={{
                            width: "40px",
                            height: "48px",
                            // height: "24%",
                            background: "#f2f7ff",
                            borderTopLeftRadius: "6px",
                            borderBottomLeftRadius: "6px",
                          }}
                        ></div>
                      )}
                  </CardView> */}
                <CardViews
                  className={
                    getUserLoggedPermission() && obj.status_code === "receiving"
                      ? ""
                      : "border-radius"
                  }
                >
                  <CardTopDetails style={{ gap: "16px" }}>
                    {getUserLoggedPermission() &&
                    (obj.status_code === "receiving" ||
                      obj.status_code === "pending_quote") &&
                    !obj.is_added_to_quote ? (
                      <div className="check_box">
                        <PiCheckbox
                          isChecked={obj.isChecked}
                          helpText=""
                          libraryType="atalskit"
                          name={`checkbox${index}`}
                          onChange={(e) => selectCheckBox(e, obj)}
                          size="large"
                          className="repair-item-checkbox"
                          isDisabled={!obj.enableCheckbox}
                        />
                      </div>
                    ) : (
                      <div className="pl-46" />
                    )}

                    <div
                      className="flexed"
                      style={{
                        display: "flex",
                        alignItems: "center",

                        gap: "24px",
                      }}
                    >
                      <div className="">
                        <PiTooltip
                          content={obj.manufacturer}
                          libraryType="atalskit"
                        >
                          <h4 className="semiBoldWt color-dark m-0 item-value-ellipsis">
                            {obj.manufacturer}
                          </h4>
                        </PiTooltip>
                      </div>

                      <div
                        className=" semiBoldWt color-dark m-0"
                        style={{
                          background: "#E3F2FD",
                          padding: "4px",
                          color: "#1976D2",
                          borderRadius: "4px",
                        }}
                      >
                        {obj.priority}
                      </div>
                      {obj.repair_type && (
                        <PiTooltip
                          content={
                            obj.repair_type === "repairable"
                              ? "Repairable"
                              : obj.repair_type === "non_repairable"
                                ? "Non Repairable"
                                : "Out Source"
                          }
                          libraryType="atalskit"
                        >
                          <div
                            className={
                              permissionObject.Edit === true
                                ? "action-item icon-bg-hover"
                                : "no-edit-permission"
                            }
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src={
                                obj.repair_type === "repairable"
                                  ? repairIcon
                                  : obj.repair_type === "non_repairable"
                                    ? NonrepairIcon
                                    : OutSourceIcon
                              }
                              alt="chevron-right"
                              className="qcicon"
                            />
                          </div>
                        </PiTooltip>
                      )}
                    </div>

                    {/* <div className="align-right">$12000</div> */}
                    {/* <div className="align-right">
                      <RoleAddIconImg>
                        <div className="action-item show-details">
                          <img src={AddIcons} alt="chevron-right" />
                        </div>
                      </RoleAddIconImg>
                    </div> */}

                    <div className="align-right">
                      <ActionsWrapper
                        className={
                          permissionObject.Edit === true
                            ? "action-item icon-bg-hover"
                            : "no-edit-permission"
                        }
                      >
                        {obj.is_action_display &&
                          obj.is_action_enable &&
                          !obj.show_dropdown &&
                          getUserLoggedPermission() && (
                            <LinkWithIcon
                              className={
                                obj.is_action_enable === false
                                  ? "hide secondary-button"
                                  : "hide_display hides secondary-button"
                              }
                              onClick={(e) => moveToNextStatus(e, obj)}
                            >
                              <span className=" ">
                                {obj.action_label ? obj.action_label : ""}
                              </span>
                            </LinkWithIcon>
                          )}
                        {obj.show_dropdown && (
                          <DetailViewStatusDropdown>
                            {/* <PiDropdownMenu
                                items={obj.status_dropdown.map((item: any) => {
                                  return {
                                    ...item,
                                    label: item.name,
                                    name: (
                                      <div className="Button-Icon-Display">
                                        <LinkWithIcon className="Icon-space">
                                          <span className="link-icon-text">
                                            {item.name}
                                          </span>
                                        </LinkWithIcon>
                                      </div>
                                    ),
                                  }
                                })}
                                label="Change Status"
                                onOpenChange={(e: any) => revertStatus(e, obj)}
                              /> */}
                            <DropdownMenu
                              trigger={({ triggerRef, ...props }) => (
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                <Button {...props} ref={triggerRef}>
                                  <ChangeStatusIcon>
                                    <img
                                      className="user_image"
                                      src={ChangeStatus}
                                      style={{
                                        height: "20px",
                                        width: "20px",
                                      }}
                                      alt="loading"
                                    />
                                    <span>Change Status</span>
                                  </ChangeStatusIcon>
                                </Button>
                              )}
                            >
                              <DropdownItemGroup>
                                {obj.status_dropdown.map(
                                  (item: ProfileProps) => (
                                    <DropdownItem
                                      onClick={() => revertStatus(item, obj)}
                                      key={obj.id}
                                    >
                                      <div className="Button-Icon-Display">
                                        <LinkWithIcon className="Icon-space">
                                          <span className="link-icon-text">
                                            {item.name}
                                          </span>
                                        </LinkWithIcon>
                                      </div>
                                    </DropdownItem>
                                  )
                                )}
                              </DropdownItemGroup>
                            </DropdownMenu>
                          </DetailViewStatusDropdown>
                        )}

                        <PiTooltip
                          content="Item Internal Notes"
                          libraryType="atalskit"
                        >
                          <div
                            className={
                              permissionObject.Edit === true
                                ? "action-item icon-bg-hover "
                                : "no-edit-permission"
                            }
                            onClick={() => viewInternalNotes(obj.id)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                viewInternalNotes(obj.id);
                              }
                            }}
                            role="button"
                            tabIndex={0}
                          >
                            <img
                              style={{ width: "18px", height: "18px" }}
                              src={NotesLog}
                              alt="chevron-right"
                            />
                          </div>
                        </PiTooltip>
                        {/* <div className="action-item show-details">
                        <img src={ArrowRightIcon} alt="chevron-right" />
                      </div> */}
                        {obj.is_display_time_entry && (
                          <PiTooltip
                            content="Time Entry"
                            libraryType="atalskit"
                          >
                            <div
                              className={
                                permissionObject.Edit === true
                                  ? "action-item icon-bg-hover "
                                  : "no-edit-permission"
                              }
                              onClick={() => addTimeEntry(obj.id, obj)}
                              onKeyDown={(event) => {
                                if (
                                  event.key === "Enter" ||
                                  event.key === " "
                                ) {
                                  addTimeEntry(obj.id, obj);
                                }
                              }}
                              role="button"
                              tabIndex={0}
                            >
                              <img src={AddTimeEntry} alt="chevron-right" />
                            </div>
                          </PiTooltip>
                        )}
                        {obj.is_display_part_purchase && (
                          <PiTooltip
                            content="Create Part Purchase"
                            libraryType="atalskit"
                          >
                            <div
                              className={
                                permissionObject.Edit === true
                                  ? "action-item icon-bg-hover "
                                  : "no-edit-permission"
                              }
                              onClick={() => createPP(obj.id)}
                              onKeyDown={(event) => {
                                if (
                                  event.key === "Enter" ||
                                  event.key === " "
                                ) {
                                  createPP(obj.id);
                                }
                              }}
                              role="button"
                              tabIndex={0}
                            >
                              <img
                                style={{ width: "18px", height: "18px" }}
                                src={PartsPurchase}
                                alt="chevron-right"
                              />
                            </div>
                          </PiTooltip>
                        )}

                        {obj.is_repair_report === true ? (
                          <>
                            {/* <ActionsWrapper
                                className={
                                  permissionObject['Edit'] === true
                                    ? 'action-item'
                                    : 'no-edit-permission'
                                }
                              >
                                <img
                                  src={Download}
                                  alt="chevron-right"
                                  style={{ cursor: 'pointer' }}
                                  title="Repair Report Pdf"
                                  onClick={() => {
                                    onHandleDownload(obj.id, index)
                                  }}
                                />
                              </ActionsWrapper> */}
                            <PiTooltip
                              content="Repair Report"
                              libraryType="atalskit"
                            >
                              <div
                                className={
                                  permissionObject.Edit === true
                                    ? "action-item icon-bg-hover"
                                    : "no-edit-permission"
                                }
                                onClick={() => {
                                  onHandleDownload(obj.id, index);
                                }}
                                onKeyDown={(event) => {
                                  if (
                                    event.key === "Enter" ||
                                    event.key === " "
                                  ) {
                                    onHandleDownload(obj.id, index);
                                  }
                                }}
                                role="button"
                                tabIndex={0}
                              >
                                {/* <PiActionIcon
                                    appearance="print"
                                    onClick={() => {
                                      onHandleDownload(obj.id, index)
                                    }}
                                  /> */}
                                <img
                                  src={printIcon}
                                  alt="chevron-right"
                                  className="qcicon"
                                />
                              </div>
                            </PiTooltip>
                          </>
                        ) : (
                          ""
                        )}
                        {obj.is_display_tag === true ? (
                          <PiTooltip
                            content="Wo Toe Tag"
                            libraryType="atalskit"
                          >
                            <div
                              // onClick={(e) => {
                              //   WoeTagDownload(index, e, obj.id);
                              // }}
                              className={
                                permissionObject.Edit === true
                                  ? "action-item icon-bg-hover"
                                  : "no-edit-permission"
                              }
                              // style={{
                              //   cursor: "pointer",
                              //   display: "flex",
                              //   height: "18px",
                              // }}
                            >
                              <ReactToPrint
                                bodyClass="trigger-print"
                                trigger={() => (
                                  <img
                                    src={WoToeTag}
                                    alt="chevron-right"
                                    style={{ height: "20px" }}
                                  />
                                )}
                                pageStyle={pagestyle}
                                onBeforeGetContent={() =>
                                  handleOnBeforeGetContent(
                                    obj.id,
                                    obj.repairs_id
                                  )
                                }
                                content={() => componentRef.current}
                                print={customToPrint}
                              />
                            </div>
                          </PiTooltip>
                        ) : (
                          ""
                        )}
                        {obj.is_repair_summary && (
                          <PiTooltip
                            content="Repair Summary"
                            libraryType="atalskit"
                          >
                            <div
                              className={
                                permissionObject.Edit === true
                                  ? "action-item icon-bg-hover"
                                  : "no-edit-permission"
                              }
                              onClick={(e) => repairSummary(e, obj)}
                              onKeyDown={(event) => {
                                if (
                                  event.key === "Enter" ||
                                  event.key === " "
                                ) {
                                  repairSummary(event, obj);
                                }
                              }}
                              role="button"
                              tabIndex={0}
                            >
                              <img
                                src={RepairSummaryIcon}
                                alt="chevron-right"
                                className="qcicon"
                              />
                            </div>
                          </PiTooltip>
                        )}
                        {obj.is_qc_display === true ? (
                          <PiTooltip
                            content="QC Checklist"
                            libraryType="atalskit"
                          >
                            <div
                              className={
                                permissionObject.Edit === true
                                  ? "action-item icon-bg-hover"
                                  : "no-edit-permission"
                              }
                              onClick={(e) => QcControlEdit(e, obj.id)}
                              onKeyDown={(event) => {
                                if (
                                  event.key === "Enter" ||
                                  event.key === " "
                                ) {
                                  QcControlEdit(event, obj.id);
                                }
                              }}
                              role="button"
                              tabIndex={0}
                            >
                              <img
                                src={AddIcons}
                                alt="chevron-right"
                                className="qcicon"
                              />
                            </div>
                          </PiTooltip>
                        ) : (
                          ""
                        )}
                        {/* {repairItemsData.repair_status !== 'added_to_quote' &&
                            repairItemsData.repair_status !== 'pending_qc' && ( */}
                        <PiTooltip
                          content={obj.is_edit ? "Edit" : "View Item"}
                          libraryType="atalskit"
                        >
                          <div
                            className={
                              permissionObject.Edit === true
                                ? "action-item icon-bg-hover"
                                : "no-edit-permission"
                            }
                            onClick={(e) =>
                              editPartRepair(e, obj.id, obj.is_edit)
                            }
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                editPartRepair(event, obj.id, obj.is_edit);
                              }
                            }}
                            role="button"
                            tabIndex={0}
                          >
                            <img
                              src={obj.is_edit ? ThemecolorEdit : EyeIcon}
                              alt="chevron-right"
                            />
                          </div>
                        </PiTooltip>
                      </ActionsWrapper>
                    </div>
                  </CardTopDetails>
                  <CardBottomDetails
                    className="with-border-bottom"
                    // style={{ paddingLeft: '54px' }}
                    style={{ paddingLeft: "6px" }}
                  >
                    {/* <div className="w-75px"></div> */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PiTooltip content="Line Number" libraryType="atalskit">
                        <div className="line-number">
                          {obj.line_number ? obj.line_number : ""}
                        </div>
                      </PiTooltip>
                    </div>
                    <div
                      className="flexeds  width-23 "
                      style={{ width: "21%", overflow: "unset" }}
                    >
                      <h4 className="fs-16 semiBoldWt color-dark m-0 item-value-ellipsis">
                        {obj.part_number}
                      </h4>
                      <p
                        className="m-0 line-clamp two-lines"
                        title={obj.description ? obj.description : "-"}
                      >
                        {obj.description}
                      </p>
                    </div>
                    <div
                      className="flexeds  "
                      style={{
                        flex: "1",
                      }}
                    >
                      <div className="d-flex align-center g-16 ">
                        <span className="w-30">Serial No:</span>
                        <h4
                          className=" semiBoldWt color-dark m-0 item-value-ellipsis"
                          title={obj.serial_number ? obj.serial_number : "-"}
                        >
                          {obj.serial_number ? obj.serial_number : "-"}
                        </h4>
                      </div>
                      {getUserLoggedPermission() && (
                        <div className="d-flex  g-16  ">
                          <span className="w-30">Storage Location:</span>
                          <h4
                            className="color-dark m-0 item-value-ellipsis"
                            title={
                              obj.storage_location ? obj.storage_location : "-"
                            }
                          >
                            {obj.storage_location ? obj.storage_location : "-"}
                          </h4>
                        </div>
                      )}
                      <div className="d-flex g-16  ">
                        <span className="w-30">Customer PO:</span>
                        <h4
                          className="color-dark m-0 item-value-ellipsis"
                          title={obj.customer_po ? obj.customer_po : "-"}
                        >
                          {obj.customer_po ? obj.customer_po : "-"}
                        </h4>
                      </div>
                      {obj.job_id && (
                        <div className="d-flex g-16  ">
                          <span className="w-30">Job Number:</span>
                          <h4
                            className="color-dark m-0 item-value-ellipsis"
                            title={obj.job_id ? obj.job_id : "-"}
                          >
                            {obj.job_id ? obj.job_id : "-"}
                          </h4>
                        </div>
                      )}
                    </div>
                    <div
                      className="align-right "
                      style={{ width: "23%", overflow: "unset" }}
                    >
                      <div className="d-flex align-center g-16 mb-8">
                        <span className="w-30">Quantity:</span>
                        <h4
                          className="fs-16 semiBoldWt color-dark m-0 item-value-ellipsis"
                          style={{ flex: "1" }}
                          title={obj.quantity ? obj.quantity : "-"}
                        >
                          {" "}
                          {obj.quantity ? obj.quantity : "-"}
                        </h4>
                      </div>
                      <div className="d-flex align-top g-16 mb-8">
                        <span className="w-30">Assigned Tech:</span>
                        <AvatarSection
                          style={{
                            flex: "1",
                            justifyContent: "flex-end",
                          }}
                        >
                          {obj.assigned_tech && obj.assigned_tech.name && (
                            <img
                              src={
                                obj.assigned_tech && obj.assigned_tech.image_url
                                  ? obj.assigned_tech.image_url
                                  : Avatar
                              }
                              alt="loading"
                            />
                          )}

                          <p
                            className="user-name "
                            style={{
                              textAlign: "right",
                              margin: "0px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              maxWidth: "calc(75%)",
                            }}
                            title={
                              obj.assigned_tech ? obj.assigned_tech.name : "-"
                            }
                          >
                            {obj.assigned_tech ? obj.assigned_tech.name : "-"}
                          </p>
                        </AvatarSection>
                        {/* <h4
                            className="fs-16 semiBoldWt color-dark m-0 item-value-ellipsis"
                            title={
                              obj.assigned_tech ? obj.assigned_tech.name : "-"
                            }
                          >
                            {" "}
                            {obj.assigned_tech ? obj.assigned_tech.name : "-"}
                          </h4> */}
                      </div>
                      <div
                        className="d-flex align-top  mb-8 "
                        style={{ margin: "0px", gap: "0px" }}
                      >
                        <span className="w-30">Due Date:</span>
                        <h4
                          className="fs-16 semiBoldWt color-dark m-0 "
                          style={{
                            textAlign: "right",
                            margin: "0px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",

                            flex: "1",
                          }}
                          title={
                            obj.delivery_due_date ? obj.delivery_due_date : "-"
                          }
                        >
                          {" "}
                          {obj.delivery_due_date ? obj.delivery_due_date : "-"}
                        </h4>
                      </div>
                    </div>
                    <div
                      className="align-right "
                      style={{ width: "22%", overflow: "unset" }}
                    >
                      <h4 className="fs-16 semiBoldWt m-0">
                        {" "}
                        {/* <PiLozenge
                          className="item-status"
                          appearance={getAppearence(obj.status_code)}
                        >
                          {obj.status}
                        </PiLozenge> */}
                        <QuoteActivityPill
                          className={getStatusClassName(
                            obj.status ? obj.status : ""
                          )}
                          style={{
                            whiteSpace: "nowrap",
                            maxWidth: "100%",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {obj.status ? obj.status : ""}
                        </QuoteActivityPill>
                      </h4>
                    </div>
                  </CardBottomDetails>

                  <CardBottomDetails className="align-center pl-8">
                    <div>
                      <div className="d-flex   g-8 mb-8">
                        <div style={{}}>Item Notes:</div>
                        <h4
                          className=" semiBoldWt color-dark m-0 line-clamp two-lines  flex"
                          title={
                            obj.item_notes
                              ? obj.item_notes.replace(/<\/?[^>]+>/gi, "")
                              : "-"
                          }
                        >
                          {" "}
                          {obj.item_notes
                            ? obj.item_notes.replace(/<\/?[^>]+>/gi, "")
                            : "-"}
                        </h4>
                      </div>
                    </div>
                  </CardBottomDetails>
                </CardViews>
              </ItemCard>
            ))}
          </RepairItemCardWrapper>
        )}

        <div style={{ display: "none" }}>
          <WoeTagBody
            ref={componentRef}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
            className="print-preview"
          >
            <div
              style={{
                border: "1px solid #000",
                // background: "sky-blue",
                height: "56px",
              }}
            >
              <div style={{ display: "flex" }}>
                <div
                  className="header"
                  style={{ fontSize: "20px", width: "144px" }}
                >
                  RMA :
                </div>
                <div className="header" style={{ fontSize: "16px", flex: "1" }}>
                  Bin :
                </div>
              </div>

              <div style={{ display: "flex", padding: "2px 6px" }}>
                <div
                  style={{
                    fontSize: "16px",
                    width: "144px",
                    lineHeight: "24px",
                    fontWeight: "700",

                    textTransform: "uppercase",
                  }}
                >
                  {WoToeData && WoToeData.rma_number
                    ? WoToeData.rma_number
                    : "---"}
                </div>

                <div
                  style={{
                    fontSize: getFontSize(),
                    lineHeight: "15px",
                    fontWeight: "700",

                    alignSelf: "center",
                    textTransform: "uppercase",

                    flex: "1",
                  }}
                >
                  {WoToeData && WoToeData.storage_location
                    ? WoToeData.storage_location.toLowerCase().slice(0, 4)
                    : "---"}
                </div>
              </div>
            </div>
            <div
              style={{
                border: "1px solid #000",
                // background: "yellow",
                height: "92px",
              }}
            >
              <div className="header">Customer Info</div>
              <div className="body">
                <div className="body_description">
                  {/* <div>Address </div> */}
                  <p style={{ flex: "1", lineHeight: "15px", margin: "0" }}>
                    {WoToeData && WoToeData.customer_name
                      ? WoToeData.customer_name.toLowerCase().slice(0, 16)
                      : "---"}
                  </p>
                </div>
                <div className="body_description">
                  {/* <div>Contact</div> */}
                  <p style={{ flex: "1", lineHeight: "15px", margin: "0" }}>
                    {WoToeData && WoToeData.contact_name
                      ? WoToeData.contact_name.toLowerCase()
                      : "---"}
                  </p>
                </div>
                <div className="body_description">
                  {/* <div>Phone</div> */}
                  <p style={{ flex: "1", lineHeight: "15px", margin: "0" }}>
                    {WoToeData && WoToeData.phone ? WoToeData.phone : "---"}
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                border: "1px solid #000",

                height: "115px",
              }}
            >
              <div className="header">Item Description</div>
              <div className="body">
                <div className="body_descriptions">
                  <div style={{ fontWeight: "700" }}>Mfg</div>
                  <div
                    style={{
                      flex: "1",
                      textTransform: "capitalize",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {WoToeData && WoToeData.manufacturer
                      ? WoToeData.manufacturer.toLowerCase().slice(0, 16)
                      : "---"}
                  </div>
                </div>
                <div className="body_descriptions">
                  <div style={{ fontWeight: "700" }}>Desc</div>
                  <div
                    style={{
                      flex: "1",
                      textTransform: "capitalize",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {WoToeData && WoToeData.description
                      ? WoToeData.description.toLowerCase().slice(0, 16)
                      : "---"}
                  </div>
                </div>
                <div className="body_descriptions">
                  <div style={{ fontWeight: "700" }}>Part</div>
                  <div
                    style={{
                      flex: "1",
                      textTransform: "capitalize",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {WoToeData && WoToeData.part_number
                      ? WoToeData.part_number.toLowerCase()
                      : "---"}
                  </div>
                </div>
                <div className="body_descriptions">
                  <div style={{ fontWeight: "700" }}>S.No</div>
                  <div
                    style={{
                      flex: "1",
                      textTransform: "capitalize",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {WoToeData && WoToeData.serial_number
                      ? WoToeData.serial_number.slice(0, 16)
                      : "---"}
                  </div>
                </div>
              </div>
            </div>

            {/* Services  */}

            <div
              style={{
                textAlign: "center",

                height: "70px",

                maxWidth: "100%",
              }}
            >
              <img
                // src={Sarc}
                src={WoToeData && WoToeData?.qr_image}
                alt="barcode"
                // style={{ objectFit: "contain", maxWidth: "100%" }}
                style={{ width: "70px" }}
                className="qr"
              />
            </div>

            <div style={{ display: "flex" }}>
              <div
                className="data"
                style={{
                  width: "144px",
                  padding: "13px 15px ",
                  paddingLeft: "18px",
                  paddingBottom: "0px",
                }}
              >
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",

                    textTransform: "uppercase",
                  }}
                >
                  {WoToeData && WoToeData.rma_number
                    ? WoToeData.rma_number
                    : "---"}
                </p>
              </div>
              <div
                style={{
                  fontSize: getFontSize(),
                  padding: "7px 12px 0px 12px ",
                  fontWeight: "700",
                  margin: "0px",

                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  justifySelf: "flex-end",
                  textTransform: "uppercase",
                }}
              >
                <span>
                  {WoToeData && WoToeData.storage_location
                    ? WoToeData.storage_location.slice(0, 4)
                    : "---"}
                </span>
              </div>
            </div>
          </WoeTagBody>
        </div>

        {repairsList.length === 0 && (
          // <NoRepairFound>No repair item(s) found</NoRepairFound>
          <NoRepairFound className="error">
            <img
              src={Repair}
              alt=""
              style={{ display: "block", width: "24px" }}
            />
            <div>Repair item(s) Not Available </div>
          </NoRepairFound>
        )}

        {serverMsg && (
          <div style={{ padding: "10px", display: "flex", float: "left" }}>
            <div className="server-msg">{serverMsg}</div>
          </div>
        )}
      </RepairInfoSection>

      {openSelectItems && (
        <SelectItems sendEventData={(e: any) => triggerItemsEvent(e)} />
      )}
      {/* {openAddItems && <AddJob sendEventData={triggerItemsEvent}></AddJob>} */}
      {openQCControl && (
        <QCAddItem
          partInfo={partInfo}
          sendEventData={(e: any) => triggerQCItemsEvents(e)}
        />
      )}
      {openAddItems && (
        <AddItems
          partInfo={partInfo}
          sendEventData={(e: any) => triggerItemsEvent(e)}
        />
      )}

      {showChekInModel && (
        <SelectCheckInList
          repairsList={repairsList}
          sendEventData={(e: any) => triggerItemsEvent(e)}
        />
      )}

      {openSummaryForm && (
        <SelectSummary
          selectedRepair={selectedRepair}
          sendEventData={(e: any) => triggerItemsEvent(e)}
        />
      )}

      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel={toastMsg}
        message=""
        onClose={async () => setSnackbar(false)}
      />
      <PiConfirmModel
        className={openConFirm ? "show" : ""}
        headerLabel="Confirmation"
        message={confirmText}
        primaryBtnLabel="Accept"
        secondaryBtnLabel="Decline"
        onClose={() => {
          setConFirm(false);
        }}
        onAccept={(e: any) => getConfirmModelEvent(e)}
        onDecline={() => {
          setConFirm(false);
        }}
      />
      {openNextStatus && (
        <LocationAssign
          partInfo={partInfo}
          sendEventData={(e: any) => triggerItemsEvent(e)}
        />
      )}
      {openEvaluationModel && (
        <Evaluation
          partInfo={partInfo}
          sendEventData={(e: any) => triggerItemsEvent(e)}
        />
      )}
      {showpartsurchaseForm && (
        <PartsPurchaseForm
          repairItemId={repairItemId}
          sendModelData={(e: any) => getPartsPurchaseModelEvent(e)}
        />
      )}
      {openAssignQc && (
        <AssignQCPopup
          partInfo={partInfo}
          sendEventData={(e: any) => triggerItemsEvent(e)}
        />
      )}
      {openInternalNotes && (
        <ItemInternalNotes
          repairItemId={repairItemId}
          repairInfo={repairInfo}
          sendEventData={(e: any) => triggerItemsEvent(e)}
        />
      )}

      {showTimeEntry && (
        <Manual
          addTimeentryStatus={(e: any) => getEventData(e)}
          jobInfos={jobInfos}
        />
      )}
    </>
  );
}

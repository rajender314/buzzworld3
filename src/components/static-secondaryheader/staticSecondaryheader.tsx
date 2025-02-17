/* eslint-disable no-nested-ternary */
import {
  PiTypography,
  PiSearch,
  PiToast,
  PiConfirmModel,
  PiTooltip,
} from "pixel-kit";
import {
  useState,
  useEffect,
  lazy,
  Suspense,
  useRef,
  ChangeEvent,
} from "react";
import { AddProps } from "@app/services/schema/schema";
import AddRowModel from "@app/components/adminaddrowmodel";
import FilterIcon from "@app/assets/images/list_filter_icon.svg";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import { useHistory } from "react-router-dom";
import { GlobalUserPermissions } from "@app/helpers/helpers";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import {
  AddUserRightContent,
  ButtonsGroup,
  LeftContent,
  RightContent,
  SaveViewDiv,
} from "./staticSecondaryHeader.component";

import AddLogo from "../../assets/images/Plus.svg";

import {
  AnimSyncImgTag,
  ImgTag,
  LinkWithIcon,
  SecondaryHeaderContainer,
} from "../secondaryheader/secondaryheader.component";
import RepairsHeader from "../repairs-secondary-header";
import QuotesSecondaryHeader from "../Quote-components/Quotes-secondary-header/quotes-secondary-header";
import JobModel from "../Jobs-components/job-check-list/jobModel";
import JobFilter from "../Jobs-components/jobFilter";
import PartsPurchaseForm from "../parts-purchase-components/parts-purchase-form.tsx/parts-purchase-form";
import { FilterIconContainer } from "../Admin layout/adminLayouts.component";
import PartsPurchaseFilter from "../parts-purchase-components/parts-purchase-filter/parts-purchase-filter";
import FiltersResetContainer from "../parts-purchase-components/parts-purchase-filter/parts-purchase-filter-components";
import AddRowModelBranches from "../admin-branches-regions-addrowmodel/admin-branches-regions-addrowmodel";
import RegionFilter from "../Admin layout/region-filters/region-filters";
import ZipCodesFilter from "../Admin layout/zip-codes-filters/zip-codes-filters";
import AdminCommonFilters from "../Admin layout/admin-common-filters";
import SyncLogo from "../../assets/images/sync.svg";
import AnimSyncLogo from "../../assets/images/Animation.gif";
import AddRole from "../popups/addRole/addRole";
import QcAdd from "../popups/QcAdd/Qc-Add";

const AddUser = lazy(() => import("../popups/add-user/add-user"));

export default function StaticSecondaryHeader({
  logo,
  searchEvent,
  props,
  sendEventData,
  gridInfo,
  lastSyncMsg,
}: any) {
  const { current }: any = useRef({ timer: 0 });
  const [searchValue, setSearchValue] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const [permissionObject, setpermissionObject] = useState<any>({});
  const [showCreateJob, setShowCreateJob] = useState<boolean>(false);
  const [popupMessageShow, setPopupMessageShow] = useState(false);
  const [showpartsurchaseForm, setShowPartsPurchaseForm] =
    useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [openregionFilter, setOpenRegionFilter] = useState<boolean>(false);
  const [openzipcodeFilter, setOpenZipcodeFilter] = useState<boolean>(false);
  const [openstatusFilter, setOpenStatusFilter] = useState<boolean>(false);
  const [openbranchModel, setOpenBranchModel] = useState(false);
  const syncTitleHover = "Sync";
  const [showAnimSync, setShowAnimSync] = useState(false);
  const [confirmText, setConfirmText] = useState<any>();
  const [openSyncModel, setOpenSyncModel] = useState(false);
  const [showAdd, setShowadd] = useState<boolean>();
  const [syncpermission, setSyncpermission] = useState<any>({});
  const [toastMsg, setToastMsg] = useState("");
  const [errorTost, setErrorTost] = useState<boolean>(false);
  const [adminEvent, setAdminEvent] = useState(false);
  const history = useHistory();
  const [showPiTost, setShowPiTost] = useState(false);
  const PouplabelMsg = "Added Successfully";
  const [openAdduserModel, setopenAdduserModel] = useState<boolean>(false);
  const [addUserToastMsg, setAddUserToastMsg] = useState("");
  const [openSnackbar, setSnackbar] = useState(false);
  const [openAdduserRoleModel, setopenAdduserRoleModel] =
    useState<boolean>(false);
  const [selectUserRoleType, setSelectUserRoleType] = useState<any>();
  const [defaultPermList, setDefaultPermList] = useState("");
  const [openAddRoleSnackbar, setAddRoleSnackbar] = useState(false);
  const [showAddQcControl, setShowAddQcControl] = useState<boolean>(false);
  const [requestInfo, setRequestInfo]: any = useState();
  const [placeHolderText, setPlaceHolderText]: any = useState("");

  const getPlaceHolgerText = () => {
    if (props.gridName === "Parts Purchase") {
      setPlaceHolderText(
        "Requested ID / Manufacturer Part Number / Vendor Part Number / PO Number"
      );
    } else if (props.gridName === "Jobs") {
      setPlaceHolderText("Job ID / Sales Order ID");
    } else if (props.gridName === "Sales Orders") {
      setPlaceHolderText(
        "Customer ID / Sales Order ID / Customer Name and Quote Number / PO Number"
      );
    } else if (props.gridName === "Admin" && props.pageLabel === "Zipcodes") {
      setPlaceHolderText("Search By Zip Code");
    } else if (
      props.gridName === "Admin" &&
      props.pageLabel === "product_class"
    ) {
      setPlaceHolderText("Search By Product Class");
    } else if (props.gridName === "Admin" && props.pageLabel === "PO_Min_Qty") {
      setPlaceHolderText("Search By Quantity");
    } else if (
      props.gridName === "Admin" &&
      props.pageLabel === "product_category"
    ) {
      setPlaceHolderText("Search By Category");
    } else if (
      props.gridName === "Admin" &&
      props.pageLabel === "Account_Types"
    ) {
      setPlaceHolderText("Search By Account Type");
    } else if (props.gridName === "Admin" && props.pageLabel === "Branches") {
      setPlaceHolderText("Search By Branch");
    } else if (
      props.gridName === "Admin" &&
      props.pageLabel === "Classifications"
    ) {
      setPlaceHolderText("Search By Classification ");
    } else if (
      props.gridName === "Admin" &&
      props.pageLabel === "Contact_Types"
    ) {
      setPlaceHolderText("Search By Contact Type ");
    } else if (props.gridName === "Admin" && props.pageLabel === "Industry") {
      setPlaceHolderText("Search By Industry ");
    } else if (
      props.gridName === "Admin" &&
      props.pageLabel === "quote_types"
    ) {
      setPlaceHolderText("Search By Quote Type ");
    } else if (props.gridName === "Admin" && props.pageLabel === "Vendors") {
      setPlaceHolderText("Search By Vendor ");
    } else if (props.gridName === "Admin" && props.pageLabel === "Territory") {
      setPlaceHolderText("Search By Territory ");
    } else if (
      props.gridName === "Admin" &&
      props.pageLabel === "Sales_Potential"
    ) {
      setPlaceHolderText("Search By Sales Potential ");
    } else if (props.gridName === "Admin" && props.pageLabel === "Regions") {
      setPlaceHolderText("Search By Region ");
    } else if (props.gridName === "Admin" && props.pageLabel === "Warehouse") {
      setPlaceHolderText("Search By Warehouse ");
    } else {
      setPlaceHolderText("Search ");
    }
  };

  useEffect(() => {
    getPlaceHolgerText();
  }, [props.pageLabel]);
  useEffect(() => {
    (async () => {
      await GlobalUserPermissions();
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let permission;
      if (props.gridName === "Parts Purchase") {
        permission = await getPermissionObject("part-purchase");
      } else {
        permission = await getPermissionObject(
          window.location.pathname.substring(1)
        );
      }

      setpermissionObject(permission);
    })();
  }, [window.location.pathname, gridInfo]);

  useEffect(() => {
    (async () => {
      if (window.location.pathname.substring(1) === "qc_control") {
        const permission = await getPermissionObject("qc_control");
        setpermissionObject(permission);
      }
    })();
  }, [window.location.pathname]);
  const [wareHouseSync, setWareHouseSync]: any = useState({});
  useEffect(() => {
    (async () => {
      if (props.pageLabel === "Warehouse") {
        setShowadd(false);
        const wareHouse = await getPermissionObject("warehouse_sync");
        setWareHouseSync(wareHouse);
      } else if (props.pageLabel === "product_class") {
        setShowadd(false);
        const sync_permission = await getPermissionObject("product_class_sync");
        setSyncpermission(sync_permission);
      } else if (props.pageLabel === "product_category") {
        setShowadd(false);
      } else {
        setSyncpermission(false);
        setShowadd(true);
      }
    })();
  }, [props.pageLabel]);

  useEffect(() => {
    setRequestInfo(gridInfo);
    setSearchValue(gridInfo && gridInfo.searchkey ? gridInfo.searchkey : "");
    setSelectUserRoleType(
      gridInfo && gridInfo.userRoleData ? gridInfo.userRoleData : ""
    );
    setDefaultPermList(
      gridInfo && gridInfo.DefPermList ? gridInfo.DefPermList : ""
    );
  }, [gridInfo]);
  function onAdd() {
    if (
      props.pageLabel === "Branches" ||
      props.pageLabel === "Regions" ||
      props.pageLabel === "Territory" ||
      props.pageLabel === "Zipcodes"
    ) {
      setOpenBranchModel(true);
    } else if (props.pageLabel !== "Branches") {
      setOpenModel(true);
    }
  }
  async function getModelEvent(e: AddProps) {
    if (Object.keys(e).length) {
      setOpenModel(false);
      setOpenBranchModel(false);
    }
  }

  function valueChanged(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
    if (current.timer) clearTimeout(current.timer);
    current.timer = setTimeout(() => {
      searchEvent(e.target.value);
    }, 1000);
  }

  function clearSearch() {
    setSearchValue("");
    searchEvent("");
    sendEventData({ searchValue: "" });
  }

  function triggerEvent(e: any) {
    if (e && e.success) {
      setShowPiTost(true);

      setTimeout(() => {
        sendEventData({ success: true });
        setOpenModel(false);
      }, 500);
      // eslint-disable-next-line no-dupe-else-if
    } else if (e && e.vendors && e.success) {
      sendEventData({ success: true, vendors: true });
    }
  }
  function addBranchesEvent(e: any) {
    if (e && e.success) {
      setPopupMessageShow(true);
      setToastMsg(`${e.headerLabel} Successfully`);
      setAdminEvent(true);
      setTimeout(() => {
        sendEventData({ success: true });
        setOpenBranchModel(false);
      }, 500);
    } else if (e && e.closeModel) {
      setOpenBranchModel(false);
    }
  }

  const openAddRow = () => {
    setShowCreateJob(true);
  };

  async function getRmaModelEvent(e: any) {
    console.log(e);
    if (e.success) {
      sendEventData({ success: true });
    }
    setShowCreateJob(false);
    setShowFilters(false);
    setShowPartsPurchaseForm(false);
    setOpenFilter(false);
  }

  const openPartPurchaseForm = () => {
    setShowPartsPurchaseForm(true);
    // history.push("/part-purchase-request-form");
  };
  async function getPurchaseModel(e: any) {
    console.log(e);

    setOpenFilter(false);
    sendEventData({ success: true, ...e });
  }
  async function getRegionsFiltersData(e: any) {
    if (e && e.closeModel) {
      setOpenRegionFilter(false);
    } else {
      sendEventData({ filters: "regionFilters", ...e });
      setOpenRegionFilter(false);
    }
  }
  async function getZipCodesFiltersData(e: any) {
    console.log(e);
    if (e && e.closeModel) {
      setOpenZipcodeFilter(false);
    } else {
      setOpenZipcodeFilter(false);
      sendEventData({ filters: "zipcodeFilters", ...e });
    }
  }
  async function getStatusFiltersData(e: any) {
    console.log(e);
    if (e && e.closeModel) {
      setOpenStatusFilter(false);
    } else {
      setOpenStatusFilter(false);
      sendEventData({ filters: "statusFilters", ...e });
    }
  }
  const openPurchaseFilter = () => {
    setOpenFilter(true);
  };
  const openRegionsFilter = () => {
    setOpenRegionFilter(true);
  };
  const openStatusFilter = () => {
    setOpenStatusFilter(true);
  };
  const openZipCodesFilter = () => {
    setOpenZipcodeFilter(true);
  };
  const onResetRegionFilters = () => {
    const obj = {
      selectedFilters: {
        branch_id: [],
        sales_manager_id: [],
        sales_person_id: [],
        status: [],
      },
      filters: "regionFilters",
    };
    sendEventData(obj);
  };
  const onResetZipCodeFilters = () => {
    const obj = {
      selectedFilters: {
        sales_manager_id: [],
        sales_person_id: [],
        status: [],
      },
      filters: "zipcodeFilters",
    };
    sendEventData(obj);
  };
  const onResetStatusFilters = () => {
    const obj = {
      selectedFilters: {
        status: [],
      },
      filters: "statusFilters",
    };
    sendEventData(obj);
  };
  const onresetFilters = () => {
    const obj = {
      success: true,
      selectedFilters: {
        part_urgency: [],
        status: [],
        technician_id: [],
        part_number: [],
      },
      section: "purchase-filters",
    };
    sendEventData({ ...obj });
  };
  async function getRmaModelEvents(e: any) {
    if (e.success) {
      setTimeout(() => {
        sendEventData({ success: true });
        history.push(`jobs/${e.id}`);
      }, 2000);
    }
    setShowCreateJob(false);
  }
  const wareHousesyncApi = () => {
    setShowAnimSync(true);

    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.getWareHouseSync}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((res: any) => {
        if (res.result.data.success) {
          setToastMsg(res.result.data.message);
          setPopupMessageShow(true);
          sendEventData({
            sync: true,
            msg: res.result.data.message,
            flag: "Warehouse",
          });
          setShowAnimSync(false);
        } else {
          setToastMsg(res.result.data.message);
          setErrorTost(true);
          setShowAnimSync(false);
        }
      })
      .catch((err: string) => {
        setToastMsg("WareHouse Syncing failed");
        setShowAnimSync(false);
        setErrorTost(true);
        console.log(err);
      });
  };
  const onSyncing = () => {
    setConfirmText("Are you sure you want to sync Data?");
    setOpenSyncModel(true);
  };
  const productClasssyncApi = () => {
    setShowAnimSync(true);

    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.getProductClassSync}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((res: any) => {
        if (res.result.data.success) {
          setToastMsg(res.result.data.message);
          setPopupMessageShow(true);
          sendEventData({
            sync: true,
            msg: res.result.data.message,
            flag: "product_class",
          });
          setShowAnimSync(false);
        } else {
          setToastMsg(res.result.data.message);
          setErrorTost(true);
          setShowAnimSync(false);
        }
      })
      .catch((err: string) => {
        setToastMsg("Product Class Syncing failed");
        setErrorTost(true);
        setShowAnimSync(false);
        console.log(err);
      });
  };
  const syncJobDataApi = () => {
    setShowAnimSync(true);

    const apiObject = {
      payload: {},
      method: "POST",
      apiUrl: `${EndpointUrl.SyncJobs}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((res: any) => {
        if (res.result.data.success) {
          setToastMsg(res.result.data.message);
          setPopupMessageShow(true);
          sendEventData({
            sync: true,
            msg: res.result.data.message,
            flag: "jobs",
          });
          setShowAnimSync(false);
        } else if (!res.result.data.success) {
          setToastMsg(res.result.data.message);
          setErrorTost(true);
          setShowAnimSync(false);
        }
      })
      .catch((err: string) => {
        setToastMsg("Jobs Syncing failed");
        setErrorTost(true);
        setShowAnimSync(false);
        console.log(err);
      });
  };
  const syncOrdersDataApi = () => {
    setShowAnimSync(true);

    const apiObject = {
      payload: {},
      method: "POST",
      apiUrl: `${EndpointUrl.SyncSo}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((res: any) => {
        if (res.result.data.success) {
          setToastMsg(res.result.data.message);
          setPopupMessageShow(true);
          sendEventData({
            sync: true,
            msg: res.result.data.message,
            flag: "orders",
          });
          setShowAnimSync(false);
        } else if (!res.result.data.success) {
          setToastMsg(res.result.data.message);
          setErrorTost(true);
          setShowAnimSync(false);
        }
      })
      .catch((err: string) => {
        setToastMsg("Orders Syncing failed");
        setErrorTost(true);
        setShowAnimSync(false);
        console.log(err);
      });
  };
  function getConfirmModelEvent() {
    setShowAnimSync(true);
    setOpenSyncModel(false);

    if (props.pageLabel === "Warehouse") {
      setTimeout(() => {
        wareHousesyncApi();
      }, 1000);
    } else if (props.pageLabel === "product_class") {
      setTimeout(() => {
        productClasssyncApi();
      }, 1000);
    } else if (props.gridName === "Jobs") {
      syncJobDataApi();
    } else if (props.gridName === "Sales Orders") {
      syncOrdersDataApi();
    }
  }

  const addUser = () => {
    setopenAdduserModel(true);
    sendEventData({ openModel: true, flag: "users" });
  };
  async function getAdduserEvent(e: any) {
    if (e && e.closeModel) {
      setopenAdduserModel(false);
      sendEventData({ openModel: false, flag: "users" });
    } else if (e && e.success) {
      setopenAdduserModel(false);
      setSnackbar(true);
      setAddUserToastMsg(" Added Successfully");
      sendEventData({ Id: e.Id, flag: "users" });
    }
  }

  const addUserRole = () => {
    setopenAdduserRoleModel(true);
  };
  function addQcForm() {
    setShowAddQcControl(true);
  }
  async function getAddUserRoleEvent(e: any) {
    if (e && e.closeModel) {
      setopenAdduserRoleModel(false);
    } else if (e && e.handleSubmit) {
      setopenAdduserRoleModel(false);
      setAddRoleSnackbar(true);
      setTimeout(() => {
        sendEventData({ success: true });
      }, 1000);
    }
  }
  async function getAddQcFormEvent(e: any) {
    if (e) {
      setShowAddQcControl(false);
      setAddRoleSnackbar(true);

      setTimeout(() => {
        sendEventData({ id: e });
      }, 1000);
    }
  }
  const syncJobsData = () => {
    setConfirmText("Are you sure you want to sync Data?");
    setOpenSyncModel(true);
  };
  return (
    <SecondaryHeaderContainer>
      <LeftContent
        className={
          props.pageLabel === "users" ||
          props.pageLabel === "user_roles" ||
          props.pageLabel === "qc_control"
            ? "add-users"
            : ""
        }
      >
        <img src={logo} alt="logo" style={{ width: "32px" }} />
        <PiTypography className="page-label" component="h1">
          {props.displayLabel ? props.displayLabel : "Admin"}
        </PiTypography>
      </LeftContent>
      {props.pageLabel !== "qc_control" &&
        props.pageLabel !== "terms-conditions" &&
        props.pageLabel !== "users" &&
        props.pageLabel !== "user_roles" &&
        props.pageLabel !== "quote-approval" && (
          <RightContent>
            {permissionObject.View && (
              <div
                className="globalsearch-width"
                style={
                  props.gridName === "Parts Purchase"
                    ? { width: "56%" }
                    : { width: "38%" }
                }
              >
                <PiSearch
                  libraryType="atalskit"
                  onClear={() => clearSearch()}
                  onValueChange={(e) => valueChanged(e)}
                  placeholder={placeHolderText}
                  value={searchValue}
                />
              </div>
            )}
            <PiToast
              className={
                popupMessageShow ? "show" : errorTost ? "show text-red" : ""
              }
              headerLabel={
                props.pageLabel === "Warehouse"
                  ? "Warehouse"
                  : props.pageLabel === "product_class"
                    ? "Product Class"
                    : adminEvent
                      ? props.pageLabel
                      : ""
              }
              message={toastMsg}
              onClose={async () => {
                setPopupMessageShow(false);
                setErrorTost(false);
              }}
            />
            <PiToast
              className={showPiTost ? "show" : ""}
              headerLabel={PouplabelMsg}
              message=""
              onClose={async () => setShowPiTost(false)}
            />
            <div className="add-Icon">
              {props.gridName === "Admin" && (
                <>
                  {props.pageLabel === "Territory" && permissionObject.View && (
                    <div style={{ display: "flex", gap: "4px" }}>
                      <FilterIconContainer
                        onClick={openRegionsFilter}
                        className={
                          requestInfo.body &&
                          requestInfo.body.selectedCustomFilters &&
                          ((requestInfo.body.selectedCustomFilters
                            .sales_person_id &&
                            requestInfo.body.selectedCustomFilters
                              .sales_person_id.length) ||
                            (requestInfo.body.selectedCustomFilters &&
                              requestInfo.body.selectedCustomFilters.status &&
                              requestInfo.body.selectedCustomFilters.status
                                .length) ||
                            (requestInfo.body.selectedCustomFilters &&
                              requestInfo.body.selectedCustomFilters
                                .branch_id &&
                              requestInfo.body.selectedCustomFilters.branch_id
                                .length) ||
                            (requestInfo.body.selectedCustomFilters &&
                              requestInfo.body.selectedCustomFilters
                                .sales_manager_id &&
                              requestInfo.body.selectedCustomFilters
                                .sales_manager_id.length))
                            ? " open"
                            : ""
                        }
                        title={
                          requestInfo.body &&
                          requestInfo.body.selectedCustomFilters &&
                          ((requestInfo.body.selectedCustomFilters
                            .sales_person_id &&
                            requestInfo.body.selectedCustomFilters
                              .sales_person_id.length) ||
                            (requestInfo.body.selectedCustomFilters.status &&
                              requestInfo.body.selectedCustomFilters.status
                                .length) ||
                            (requestInfo.body.selectedCustomFilters.branch_id &&
                              requestInfo.body.selectedCustomFilters.branch_id
                                .length) ||
                            (requestInfo.body.selectedCustomFilters &&
                              requestInfo.body.selectedCustomFilters
                                .sales_manager_id &&
                              requestInfo.body.selectedCustomFilters
                                .sales_manager_id.length))
                            ? "Filters Applied"
                            : ""
                        }
                      >
                        <img
                          src={FilterIcon}
                          alt="loading"
                          style={{ width: "14px", height: "14px" }}
                        />
                        <div className="filter-text">Filters</div>
                        {requestInfo.body &&
                        requestInfo.body.selectedCustomFilters &&
                        ((requestInfo.body.selectedCustomFilters.branch_id &&
                          requestInfo.body.selectedCustomFilters.branch_id
                            .length) ||
                          (requestInfo.body.selectedCustomFilters
                            .sales_manager_id &&
                            requestInfo.body.selectedCustomFilters
                              .sales_manager_id.length) ||
                          (requestInfo.body.selectedCustomFilters.status &&
                            requestInfo.body.selectedCustomFilters.status
                              .length) ||
                          (requestInfo.body.selectedCustomFilters
                            .sales_person_id &&
                            requestInfo.body.selectedCustomFilters
                              .sales_person_id.length)) ? (
                          <span>
                            {requestInfo.body.selectedCustomFilters.status
                              .length +
                              requestInfo.body.selectedCustomFilters.branch_id
                                .length +
                              requestInfo.body.selectedCustomFilters
                                .sales_manager_id.length +
                              requestInfo.body.selectedCustomFilters
                                .sales_person_id.length}
                          </span>
                        ) : (
                          ""
                        )}
                      </FilterIconContainer>
                      {requestInfo.body &&
                      requestInfo.body.selectedCustomFilters &&
                      requestInfo.body.selectedCustomFilters &&
                      ((requestInfo.body.selectedCustomFilters
                        .sales_person_id &&
                        requestInfo.body.selectedCustomFilters.sales_person_id
                          .length) ||
                        (requestInfo.body.selectedCustomFilters.status &&
                          requestInfo.body.selectedCustomFilters.status
                            .length) ||
                        (requestInfo.body.selectedCustomFilters.branch_id &&
                          requestInfo.body.selectedCustomFilters.branch_id
                            .length) ||
                        (requestInfo.body.selectedCustomFilters
                          .sales_manager_id &&
                          requestInfo.body.selectedCustomFilters
                            .sales_manager_id.length)) ? (
                        <FiltersResetContainer
                          onClick={onResetRegionFilters}
                          className=" open"
                          title={
                            requestInfo.body &&
                            requestInfo.body.selectedCustomFilters &&
                            ((requestInfo.body.selectedCustomFilters
                              .sales_person_id &&
                              requestInfo.body.selectedCustomFilters
                                .sales_person_id.length) ||
                              (requestInfo.body.selectedCustomFilters &&
                                requestInfo.body.selectedCustomFilters.status &&
                                requestInfo.body.selectedCustomFilters.status
                                  .length) ||
                              (requestInfo.body.selectedCustomFilters &&
                                requestInfo.body.selectedCustomFilters
                                  .branch_id &&
                                requestInfo.body.selectedCustomFilters.branch_id
                                  .length) ||
                              (requestInfo.body.selectedCustomFilters &&
                                requestInfo.body.selectedCustomFilters
                                  .sales_manager_id &&
                                requestInfo.body.selectedCustomFilters
                                  .sales_manager_id.length))
                              ? "Reset Filters "
                              : ""
                          }
                        >
                          {/* <img src={ResetFilterIcon} alt="loading" /> */}
                          <span className="clear-text">Clear</span>
                        </FiltersResetContainer>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                  {props.pageLabel === "Zipcodes" && permissionObject.View && (
                    <div style={{ display: "flex", gap: "4px" }}>
                      <FilterIconContainer
                        onClick={openZipCodesFilter}
                        className={
                          requestInfo.body &&
                          requestInfo.body.selectedCustomFilters &&
                          ((requestInfo.body.selectedCustomFilters
                            .sales_person_id &&
                            requestInfo.body.selectedCustomFilters
                              .sales_person_id.length) ||
                            (requestInfo.body.selectedCustomFilters &&
                              requestInfo.body.selectedCustomFilters.status &&
                              requestInfo.body.selectedCustomFilters.status
                                .length) ||
                            (requestInfo.body.selectedCustomFilters &&
                              requestInfo.body.selectedCustomFilters
                                .sales_manager_id &&
                              requestInfo.body.selectedCustomFilters
                                .sales_manager_id.length))
                            ? " open"
                            : ""
                        }
                        title={
                          requestInfo.body &&
                          requestInfo.body.selectedCustomFilters &&
                          ((requestInfo.body.selectedCustomFilters
                            .sales_person_id &&
                            requestInfo.body.selectedCustomFilters
                              .sales_person_id.length) ||
                            (requestInfo.body.selectedCustomFilters.status &&
                              requestInfo.body.selectedCustomFilters.status
                                .length) ||
                            (requestInfo.body.selectedCustomFilters &&
                              requestInfo.body.selectedCustomFilters
                                .sales_manager_id &&
                              requestInfo.body.selectedCustomFilters
                                .sales_manager_id.length))
                            ? "Filters Applied"
                            : ""
                        }
                      >
                        <img
                          src={FilterIcon}
                          alt="loading"
                          style={{ width: "14px", height: "14px" }}
                        />
                        <div className="filter-text">Filters</div>
                        {requestInfo.body &&
                        requestInfo.body.selectedCustomFilters &&
                        ((requestInfo.body.selectedCustomFilters
                          .sales_person_id &&
                          requestInfo.body.selectedCustomFilters.sales_person_id
                            .length) ||
                          (requestInfo.body.selectedCustomFilters
                            .sales_manager_id &&
                            requestInfo.body.selectedCustomFilters
                              .sales_manager_id.length) ||
                          (requestInfo.body.selectedCustomFilters.status &&
                            requestInfo.body.selectedCustomFilters.status
                              .length)) ? (
                          <span>
                            {requestInfo.body.selectedCustomFilters.status
                              .length +
                              requestInfo.body.selectedCustomFilters
                                .sales_manager_id.length +
                              requestInfo.body.selectedCustomFilters
                                .sales_person_id.length}
                          </span>
                        ) : (
                          ""
                        )}
                      </FilterIconContainer>
                      {requestInfo.body &&
                      requestInfo.body.selectedCustomFilters &&
                      ((requestInfo.body.selectedCustomFilters
                        .sales_person_id &&
                        requestInfo.body.selectedCustomFilters.sales_person_id
                          .length) ||
                        (requestInfo.body.selectedCustomFilters.status &&
                          requestInfo.body.selectedCustomFilters.status
                            .length) ||
                        (requestInfo.body.selectedCustomFilters
                          .sales_manager_id &&
                          requestInfo.body.selectedCustomFilters
                            .sales_manager_id.length)) ? (
                        <FiltersResetContainer
                          onClick={onResetZipCodeFilters}
                          className=" open"
                          title={
                            requestInfo.body &&
                            requestInfo.body.selectedCustomFilters &&
                            ((requestInfo.body.selectedCustomFilters
                              .sales_person_id &&
                              requestInfo.body.selectedCustomFilters
                                .sales_person_id.length) ||
                              (requestInfo.body.selectedCustomFilters &&
                                requestInfo.body.selectedCustomFilters.status &&
                                requestInfo.body.selectedCustomFilters.status
                                  .length) ||
                              (requestInfo.body.selectedCustomFilters &&
                                requestInfo.body.selectedCustomFilters
                                  .sales_manager_id &&
                                requestInfo.body.selectedCustomFilters
                                  .sales_manager_id.length))
                              ? "Reset Filters "
                              : ""
                          }
                        >
                          {/* <img src={ResetFilterIcon} alt="loading" /> */}
                          <span className="clear-text">Clear</span>
                        </FiltersResetContainer>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                  {props.pageLabel !== "Zipcodes" &&
                    props.pageLabel !== "Territory" &&
                    props.pageLabel !== "PO_Min_Qty" &&
                    props.pageLabel !== "product_category" &&
                    permissionObject.View && (
                      <div style={{ display: "flex", gap: "4px" }}>
                        <FilterIconContainer
                          onClick={openStatusFilter}
                          className={
                            requestInfo.body &&
                            requestInfo.body.selectedCustomFilters &&
                            requestInfo.body.selectedCustomFilters &&
                            requestInfo.body.selectedCustomFilters.status &&
                            requestInfo.body.selectedCustomFilters.status.length
                              ? " open"
                              : ""
                          }
                          title={
                            requestInfo.body &&
                            requestInfo.body.selectedCustomFilters &&
                            requestInfo.body.selectedCustomFilters.status &&
                            requestInfo.body.selectedCustomFilters.status.length
                              ? "Filters Applied"
                              : ""
                          }
                        >
                          <img
                            src={FilterIcon}
                            alt="loading"
                            style={{ width: "14px", height: "14px" }}
                          />
                          <div className="filter-text">Filters</div>
                          {requestInfo.body &&
                          requestInfo.body.selectedCustomFilters &&
                          requestInfo.body.selectedCustomFilters.status &&
                          requestInfo.body.selectedCustomFilters.status
                            .length ? (
                            <span>
                              {
                                requestInfo.body.selectedCustomFilters.status
                                  .length
                              }
                            </span>
                          ) : (
                            ""
                          )}
                        </FilterIconContainer>
                        {requestInfo.body &&
                        requestInfo.body.selectedCustomFilters &&
                        requestInfo.body.selectedCustomFilters.status &&
                        requestInfo.body.selectedCustomFilters.status.length ? (
                          <FiltersResetContainer
                            onClick={onResetStatusFilters}
                            className=" open"
                            title={
                              requestInfo.body &&
                              requestInfo.body.selectedCustomFilters &&
                              requestInfo.body.selectedCustomFilters &&
                              requestInfo.body.selectedCustomFilters.status &&
                              requestInfo.body.selectedCustomFilters.status
                                .length
                                ? "Reset Filters "
                                : ""
                            }
                          >
                            {/* <img src={ResetFilterIcon} alt="loading" /> */}
                            <span className="clear-text">Clear</span>
                          </FiltersResetContainer>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  {showAdd && permissionObject.Edit && (
                    <LinkWithIcon
                      onClick={() => onAdd()}
                      className={
                        !permissionObject.Edit
                          ? "Icon-space  no-edit-permission "
                          : "Icon-space primary-button"
                      }
                    >
                      <ImgTag src={AddLogo} className="add-icon" />
                      <span className="button-icon-text">Add</span>
                    </LinkWithIcon>
                  )}
                  {((props.pageLabel === "product_class" &&
                    permissionObject.View &&
                    syncpermission.product_class_sync) ||
                    (props.pageLabel === "Warehouse" &&
                      permissionObject.View &&
                      wareHouseSync.warehouse_sync)) && (
                    <ButtonsGroup style={{ margin: "unset" }}>
                      <LinkWithIcon
                        onClick={() => {
                          onSyncing();
                        }}
                      >
                        {!showAnimSync && (
                          <>
                            <ImgTag
                              src={SyncLogo}
                              // className="save-view Export-Image"
                              title={syncTitleHover}
                            />
                            <span
                              className="link-icon-text"
                              title={syncTitleHover}
                            >
                              Sync
                            </span>
                          </>
                        )}
                        {showAnimSync && (
                          <>
                            <AnimSyncImgTag
                              src={AnimSyncLogo}
                              // className="save-view Export-Image"
                              title="Syncing is in progress..."
                              alt="loading"
                            />
                            <span
                              className="link-icon-text"
                              title="Syncing is in progress..."
                            >
                              Sync
                            </span>
                          </>
                        )}
                      </LinkWithIcon>
                    </ButtonsGroup>
                  )}
                </>
              )}
              {props.gridName === "Repairs" && <RepairsHeader />}
              {props.gridName === "Quotes" && (
                <QuotesSecondaryHeader
                  sendEventData={(e: any) => triggerEvent(e)}
                />
              )}

              {props.gridName === "Jobs" && permissionObject.Edit && (
                <div
                  className="Button-Icon-Display"
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <PiTooltip
                    content={lastSyncMsg || "sync"}
                    libraryType="atalskit"
                  >
                    <LinkWithIcon
                      onClick={() => {
                        syncJobsData();
                      }}
                    >
                      {!showAnimSync && (
                        <>
                          <ImgTag src={SyncLogo} />
                          <span className="link-icon-text">Sync</span>
                        </>
                      )}
                      {showAnimSync && (
                        <>
                          <AnimSyncImgTag
                            src={AnimSyncLogo}
                            title="Syncing is in progress..."
                            alt="loading"
                          />
                          <span
                            className="link-icon-text"
                            title="Syncing is in progress..."
                          >
                            Sync
                          </span>
                        </>
                      )}
                    </LinkWithIcon>
                  </PiTooltip>

                  <LinkWithIcon
                    className="Icon-space primary-button"
                    onClick={openAddRow}
                  >
                    <ImgTag src={AddLogo} alt="loading" className="add-icon" />
                    <span className="button-icon-text">Create Job</span>
                  </LinkWithIcon>
                </div>
              )}
              {props.gridName === "Sales Orders" && permissionObject.Edit && (
                <div
                  className="Button-Icon-Display"
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <PiTooltip
                    content={lastSyncMsg || "sync"}
                    libraryType="atalskit"
                  >
                    <LinkWithIcon
                      onClick={() => {
                        syncJobsData();
                      }}
                    >
                      {!showAnimSync && (
                        <>
                          <ImgTag src={SyncLogo} />
                          <span className="link-icon-text">Sync</span>
                        </>
                      )}
                      {showAnimSync && (
                        <>
                          <AnimSyncImgTag
                            src={AnimSyncLogo}
                            title="Syncing is in progress..."
                            alt="loading"
                          />
                          <span
                            className="link-icon-text"
                            title="Syncing is in progress..."
                          >
                            Sync
                          </span>
                        </>
                      )}
                    </LinkWithIcon>
                  </PiTooltip>
                </div>
              )}
              {props.gridName === "Parts Purchase" && permissionObject.View && (
                <>
                  <div style={{ display: "flex", gap: "4px" }}>
                    <FilterIconContainer
                      onClick={openPurchaseFilter}
                      className={
                        requestInfo.body &&
                        requestInfo.body.selectedCustomFilters &&
                        ((requestInfo.body.selectedCustomFilters.part_urgency &&
                          requestInfo.body.selectedCustomFilters.part_urgency
                            .length) ||
                          (requestInfo.body.selectedCustomFilters &&
                            requestInfo.body.selectedCustomFilters.status &&
                            requestInfo.body.selectedCustomFilters.status
                              .length) ||
                          (requestInfo.body.selectedCustomFilters &&
                            requestInfo.body.selectedCustomFilters
                              .technician_id &&
                            requestInfo.body.selectedCustomFilters.technician_id
                              .length) ||
                          (requestInfo.body.selectedCustomFilters &&
                            requestInfo.body.selectedCustomFilters
                              .part_number &&
                            requestInfo.body.selectedCustomFilters.part_number
                              .length) ||
                          (requestInfo.body.selectedCustomFilters &&
                            requestInfo.body.selectedCustomFilters
                              .vendor_name &&
                            requestInfo.body.selectedCustomFilters.vendor_name
                              .length))
                          ? " open"
                          : ""
                      }
                      title={
                        requestInfo.body &&
                        requestInfo.body.selectedCustomFilters &&
                        ((requestInfo.body.selectedCustomFilters.part_urgency &&
                          requestInfo.body.selectedCustomFilters.part_urgency
                            .length) ||
                          (requestInfo.body.selectedCustomFilters.status &&
                            requestInfo.body.selectedCustomFilters.status
                              .length) ||
                          (requestInfo.body.selectedCustomFilters
                            .technician_id &&
                            requestInfo.body.selectedCustomFilters.technician_id
                              .length) ||
                          (requestInfo.body.selectedCustomFilters &&
                            requestInfo.body.selectedCustomFilters
                              .part_number &&
                            requestInfo.body.selectedCustomFilters.part_number
                              .length) ||
                          (requestInfo.body.selectedCustomFilters &&
                            requestInfo.body.selectedCustomFilters
                              .vendor_name &&
                            requestInfo.body.selectedCustomFilters.vendor_name
                              .length))
                          ? "Filters Applied"
                          : ""
                      }
                    >
                      <img
                        src={FilterIcon}
                        alt="loading"
                        style={{ width: "14px", height: "14px" }}
                      />
                      <div className="filter-text">Filters</div>
                      {requestInfo.body &&
                      requestInfo.body.selectedCustomFilters &&
                      ((requestInfo.body.selectedCustomFilters.part_urgency &&
                        requestInfo.body.selectedCustomFilters.part_urgency
                          .length) ||
                        (requestInfo.body.selectedCustomFilters.technician_id &&
                          requestInfo.body.selectedCustomFilters.technician_id
                            .length) ||
                        (requestInfo.body.selectedCustomFilters.status &&
                          requestInfo.body.selectedCustomFilters.status
                            .length) ||
                        (requestInfo.body.selectedCustomFilters.part_number &&
                          requestInfo.body.selectedCustomFilters.part_number
                            .length) ||
                        (requestInfo.body.selectedCustomFilters.vendor_name &&
                          requestInfo.body.selectedCustomFilters.vendor_name
                            .length)) ? (
                        <span>
                          {requestInfo.body.selectedCustomFilters.status
                            .length +
                            requestInfo.body.selectedCustomFilters.part_urgency
                              .length +
                            requestInfo.body.selectedCustomFilters.technician_id
                              .length +
                            requestInfo.body.selectedCustomFilters.part_number
                              .length +
                            requestInfo.body.selectedCustomFilters.vendor_name
                              .length}
                        </span>
                      ) : (
                        ""
                      )}
                    </FilterIconContainer>
                    {requestInfo.body &&
                    requestInfo.body.selectedCustomFilters &&
                    ((requestInfo.body.selectedCustomFilters.part_urgency &&
                      requestInfo.body.selectedCustomFilters.part_urgency
                        .length) ||
                      (requestInfo.body.selectedCustomFilters.status &&
                        requestInfo.body.selectedCustomFilters.status.length) ||
                      (requestInfo.body.selectedCustomFilters.technician_id &&
                        requestInfo.body.selectedCustomFilters.technician_id
                          .length) ||
                      (requestInfo.body.selectedCustomFilters.part_number &&
                        requestInfo.body.selectedCustomFilters.part_number
                          .length) ||
                      (requestInfo.body.selectedCustomFilters.vendor_name &&
                        requestInfo.body.selectedCustomFilters.vendor_name
                          .length)) ? (
                      <FiltersResetContainer
                        onClick={onresetFilters}
                        className="open"
                        title={
                          requestInfo.body &&
                          requestInfo.body.selectedCustomFilters &&
                          ((requestInfo.body.selectedCustomFilters
                            .part_urgency &&
                            requestInfo.body.selectedCustomFilters.part_urgency
                              .length) ||
                            (requestInfo.body.selectedCustomFilters &&
                              requestInfo.body.selectedCustomFilters.status &&
                              requestInfo.body.selectedCustomFilters.status
                                .length) ||
                            (requestInfo.body.selectedCustomFilters &&
                              requestInfo.body.selectedCustomFilters
                                .technician_id &&
                              requestInfo.body.selectedCustomFilters
                                .technician_id.length) ||
                            (requestInfo.body.selectedCustomFilters &&
                              requestInfo.body.selectedCustomFilters
                                .part_number &&
                              requestInfo.body.selectedCustomFilters.part_number
                                .length) ||
                            (requestInfo.body.selectedCustomFilters &&
                              requestInfo.body.selectedCustomFilters
                                .vendor_name &&
                              requestInfo.body.selectedCustomFilters.vendor_name
                                .length))
                            ? "Reset Filters "
                            : ""
                        }
                      >
                        {/* <img src={ResetFilterIcon} alt="loading" /> */}
                        <span className="clear-text">Clear</span>
                      </FiltersResetContainer>
                    ) : (
                      ""
                    )}
                  </div>

                  {permissionObject.Edit && (
                    <div className="Button-Icon-Display">
                      <LinkWithIcon
                        className="Icon-space primary-button"
                        onClick={openPartPurchaseForm}
                      >
                        <ImgTag
                          src={AddLogo}
                          alt="loading"
                          className="add-icon"
                        />
                        <span className="button-icon-text">
                          Create Parts Purchase
                        </span>
                      </LinkWithIcon>
                    </div>
                  )}
                </>
              )}
            </div>
            {openModel && (
              <SaveViewDiv>
                <AddRowModel
                  onChildClick={(e: any) => getModelEvent(e)}
                  props={props}
                  sendEventData={(e: any) => triggerEvent(e)}
                />
              </SaveViewDiv>
            )}
            {openbranchModel && (
              <SaveViewDiv>
                <AddRowModelBranches
                  props={props}
                  sendEventData={(e: any) => addBranchesEvent(e)}
                  paramData={null}
                />
              </SaveViewDiv>
            )}
            {showCreateJob && (
              <JobModel
                sendModelData={(e: any) => getRmaModelEvents(e)}
                // sendEventData={getApiStatus}
              />
            )}
            {showFilters && (
              <JobFilter sendModelDatas={(e: any) => getRmaModelEvent(e)} />
            )}
            {showpartsurchaseForm && (
              <PartsPurchaseForm
                sendModelData={(e: any) => getRmaModelEvent(e)}
                repairItemId={`${""}`}
              />
            )}
            {openFilter && (
              <PartsPurchaseFilter
                sendModelData={(e: any) => getPurchaseModel(e)}
                requestInfo={requestInfo}
                pageLabel={props.pageLabel}
              />
            )}
            {openregionFilter && (
              <RegionFilter
                sendModelData={(e: any) => getRegionsFiltersData(e)}
                requestInfo={requestInfo}
              />
            )}
            {openzipcodeFilter && (
              <ZipCodesFilter
                sendModelData={(e: any) => getZipCodesFiltersData(e)}
                requestInfo={requestInfo}
              />
            )}
            {openstatusFilter && (
              <AdminCommonFilters
                sendModelData={(e: any) => getStatusFiltersData(e)}
                requestInfo={requestInfo}
              />
            )}
          </RightContent>
        )}

      {props.pageLabel === "users" && (
        <AddUserRightContent>
          <LinkWithIcon
            onClick={addUser}
            className={
              !permissionObject.Edit
                ? "Icon-space  no-edit-permission "
                : "Icon-space primary-button"
            }
          >
            <ImgTag src={AddLogo} className="add-icon" alt="loading" />
            <span className="button-icon-text">Add</span>
          </LinkWithIcon>
        </AddUserRightContent>
      )}

      {props.pageLabel === "user_roles" && permissionObject.Edit && (
        <AddUserRightContent>
          <LinkWithIcon
            onClick={addUserRole}
            className={
              !permissionObject.Edit
                ? "Icon-space  no-edit-permission "
                : "Icon-space primary-button"
            }
          >
            <ImgTag src={AddLogo} className="add-icon" alt="loading" />
            <span className="button-icon-text">Add </span>
          </LinkWithIcon>
        </AddUserRightContent>
      )}

      {props.pageLabel === "qc_control" && permissionObject.Edit && (
        <AddUserRightContent>
          <LinkWithIcon
            onClick={() => addQcForm()}
            className={
              !permissionObject.Edit
                ? "Icon-space  no-edit-permission "
                : "Icon-space primary-button"
            }
          >
            <ImgTag src={AddLogo} className="add-icon" alt="loading" />
            <span className="button-icon-text">Add </span>
          </LinkWithIcon>
        </AddUserRightContent>
      )}

      <PiConfirmModel
        className={openSyncModel ? "show" : ""}
        headerLabel="Confirmation"
        message={confirmText}
        primaryBtnLabel="Accept"
        secondaryBtnLabel="Decline"
        onClose={() => {
          setOpenSyncModel(false);
        }}
        onAccept={() => getConfirmModelEvent()}
        onDecline={() => {
          setOpenSyncModel(false);
        }}
      />

      {openAdduserModel && (
        <Suspense fallback={null}>
          <AddUser
            selectedUserType={requestInfo}
            sendModelData={(e: any) => getAdduserEvent(e)}
            editUserDetails={false}
          />
        </Suspense>
      )}
      {openAdduserRoleModel && (
        <AddRole
          selectUserRoleType={selectUserRoleType}
          defaultPermList={defaultPermList}
          sendModelData={(e: any) => getAddUserRoleEvent(e)}
        />
      )}
      {showAddQcControl && (
        <QcAdd
          sendModelData={(e: any) => getAddQcFormEvent(e)}
          setShowAddQcControl={setShowAddQcControl}
          showAddQcControl={showAddQcControl}
        />
      )}

      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel={addUserToastMsg}
        message=""
        onClose={async () => setSnackbar(false)}
      />

      <PiToast
        className={openAddRoleSnackbar ? "show" : ""}
        headerLabel="Added Successfully"
        message=""
        onClose={async () => setAddRoleSnackbar(false)}
      />
    </SecondaryHeaderContainer>
  );
}

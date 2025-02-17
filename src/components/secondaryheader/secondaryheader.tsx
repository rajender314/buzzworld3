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
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from "@atlaskit/dropdown-menu";
import FilterIcon from "@app/assets/images/list_filter_icon.svg";

import { triggerApi, token } from "@app/services/api-services";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
// import PrimaryHeader from './primaryheader.component'
import SaveFilterModel from "@app/components/savefiltermodel";
import {
  ApiResponse,
  GetFilterProps,
  SavedFilterProps,
  SubmitFilterProps,
} from "@app/services/schema/schema";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@app/core/localStorage/localStorage";
import {
  getPermissionObject,
  getUserPermissions,
} from "@app/helpers/componentHelpers";
import { getUserLoggedPermission } from "@app/helpers/helpers";
import {
  SecondaryHeaderContainer,
  LeftContent,
  RightContent,
  DropdownDelete,
  DropdownDiv,
  ImgDiv,
  ButtonsGroup,
  ImgTag,
  LinkWithIcon,
  AnimSyncImgTag,
  SavedViewListContainer,
} from "./secondaryheader.component";
import AnimSyncLogo from "../../assets/images/Animation.gif";
import SyncLogo from "../../assets/images/sync.svg";
import SaveViewLogo from "../../assets/images/saveview.svg";
import ExportLogo from "../../assets/images/Export.svg";
import Trash from "../../assets/images/new_thrash.svg";
import { FilterIconContainer } from "../Admin layout/adminLayouts.component";
// import OrganizationsFilter from './organizations-filters'
import FiltersResetContainer from "../parts-purchase-components/parts-purchase-filter/parts-purchase-filter-components";
// import ContactsFilter from './contacts-filters'
// import PastDueInvoiceFilter from './past-due-invoice-filters'
const OrganizationsFilter = lazy(() => import("./organizations-filters"));
const ContactsFilter = lazy(() => import("./contacts-filters"));
const PastDueInvoiceFilter = lazy(() => import("./past-due-invoice-filters"));

export default function SecondaryHeader({
  logo,
  data,
  searchkey,
  // vendorName,
  onChildClick,
  searchEvent,
  filterEvent,
  filterdelete,
  gridRowCount,
  sendSyncData,
  sendFilterEvent,
  requestInfo,
  sendOpacity,
}: any) {
  const { current }: any = useRef({ timer: 0 });
  const [searchValue, setSearchValue] = useState("");
  const [pageLabel, setPageLabel] = useState(data);
  const [openModel, setOpenModel] = useState(false);
  const [savedFilter, setSavedList] = useState([]);
  const [filterName, setSelectedFiltName] = useState("Default");
  const [filterlistResponse, setFilterlistResponse] = useState([]);
  const [openSyncModel, setOpenSyncModel] = useState(false);
  const [isEditable, setIsEditabe] = useState<any>(false);
  const [isExportable, setExportable] = useState<any>(false);
  const [showFilters, setShowFilters] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [showAnimSync, setShowAnimSync] = useState(false);
  const [popupMessageShow, setPopupMessageShow] = useState(false);
  const [confirmText, setConfirmText] = useState<any>();
  const [gridDataLength, setGridDataLength] = useState<any>();
  const [syncTitleHover, setSyncTitleHover] = useState<string>("Sync");
  const baseUrl = process.env.REACT_APP_API_URL;
  const localStorageData = getLocalStorage("userPermission");
  const [pastDueSyncpermissionObject, setPastDueSyncpermissionObject] =
    useState<any>({});
  const [isFilters, setIsFilters] = useState<boolean>(false);
  const [isSyncable, setSyncable] = useState<any>(false);
  const [placeHolderText, setPlaceHolderText]: any = useState("");
  const [linkWithName, setLinkWithName] = useState("");
  const getPlaceHolgerText = () => {
    if (data === "Past Due Invoices") {
      setPlaceHolderText("Search By Customer ID / Name");
    } else {
      setPlaceHolderText("Name / Company Name / Account Number / Owner");
    }
  };
  const linkWithClassName = () => {
    if (!gridDataLength) {
      setLinkWithName("save-view Export-Image disable-btns");
    } else if (!isExportable) {
      setLinkWithName("save-view Export-Image no-edit-permission");
    } else {
      setLinkWithName("save-view Export-Image");
    }
  };
  useEffect(() => {
    getPlaceHolgerText();
  }, [data]);

  useEffect(() => {
    linkWithClassName();
  }, [gridDataLength, isExportable]);

  useEffect(() => {
    setSearchValue(requestInfo.searchkey);
  }, [searchkey, requestInfo]);

  useEffect(() => {
    console.log(requestInfo);
    if (requestInfo && requestInfo.saveFilterName) {
      setSelectedFiltName(requestInfo.saveFilterName);
    } else {
      setSelectedFiltName("Default");
    }
  }, [requestInfo && requestInfo.saveFilterName]);

  useEffect(() => {
    if (
      requestInfo &&
      requestInfo.body &&
      requestInfo.body.selectedCustomFilters &&
      ((requestInfo.body.selectedCustomFilters.account_type &&
        requestInfo.body.selectedCustomFilters.account_type.length) ||
        (requestInfo.body.selectedCustomFilters.status &&
          requestInfo.body.selectedCustomFilters.status.length) ||
        (requestInfo.body.selectedCustomFilters.classification &&
          requestInfo.body.selectedCustomFilters.classification.length) ||
        (requestInfo.body.selectedCustomFilters.industry &&
          requestInfo.body.selectedCustomFilters.industry.length) ||
        (requestInfo.body.selectedCustomFilters.org_type &&
          requestInfo.body.selectedCustomFilters.org_type.length) ||
        (requestInfo.body.selectedCustomFilters.organization &&
          requestInfo.body.selectedCustomFilters.organization.length) ||
        (requestInfo.body.selectedCustomFilters.branch &&
          requestInfo.body.selectedCustomFilters.branch.length))
    ) {
      setIsFilters(true);
      console.log(requestInfo);
    } else {
      setIsFilters(false);
    }
  }, [requestInfo]);

  function valueChanged(e: ChangeEvent<HTMLInputElement>) {
    removeLocalStorage("gridResponse");
    // setSearchValue(e.target.value)
    // if (e.target.value && e.target.value.length >= 3) {
    //    const interval = setInterval(() => {
    //      searchEvent(e.target.value)
    //    }, 1000)
    //       return () => clearInterval(interval);
    //  }
    setSearchValue(e.target.value);
    if (current.timer) clearTimeout(current.timer);
    current.timer = setTimeout(() => {
      searchEvent(e.target.value);
    }, 1000);
    // setLocalStorage('globalSearch', e.target.value)
  }
  function clearSearch() {
    removeLocalStorage("filter_name");
    setSearchValue("");
    setSelectedFiltName("Default");
    searchEvent("");
  }
  // console.log(props);
  function openModelWindow() {
    setOpenModel(true);
    // console.log(saveFilter(props));
  }

  function syncData() {
    setConfirmText("Are you sure you want to sync Data?");
    setOpenSyncModel(true);
  }
  function getFilterData() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.filterDataApi}?name=${data.toLowerCase()}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const list = response.result.data.saved_filters;
          list.unshift({
            id: "default",
            filter_name: "Default",
            is_delete_option: false,
          });
          if (list && list.length) {
            // console.log(list);
            setFilterlistResponse(list);
            const options = list.map((item: any) => ({
              value: item.id,
              label: (
                <div className="Button-Icon-Display">
                  <LinkWithIcon className="Icon-space">
                    <span className="link-icon-text">{item.filter_name}</span>
                  </LinkWithIcon>
                </div>
              ),
              created_by: item.created_by,
              created_date: item.created_date,
              is_delete_option: item.is_delete_option,
              ...item,
            }));
            setSavedList(options);
            setSyncTitleHover(response.result.data.last_sync_msg);
          }

          // console.log(savedFilter);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  async function getModelEvent(e: SubmitFilterProps) {
    console.log(e);
    if (e.filter_name !== "") {
      setSelectedFiltName(e.filter_name);
      setTimeout(() => {
        getFilterData();
      }, 500);
      setOpenModel(false);
      onChildClick(e);
    } else {
      setOpenModel(false);
    }
  }

  useEffect(() => {
    (async () => {
      // await GlobalUserPermissions()

      // let data = await getUserPermissions(
      //   window.location.pathname.substring(1),
      //   "Edit"
      // );
      const sync_perm = await getPermissionObject("past_due_sync");
      setPastDueSyncpermissionObject(sync_perm);

      const is_Editable = await getUserPermissions(
        window.location.pathname.substring(1),
        "Edit"
      );
      setIsEditabe(is_Editable);
      const exportLabel: any = window.location.pathname
        .substring(1)
        .concat("_export");
      const is_Exportable: any = await getPermissionObject(exportLabel);
      setExportable(is_Exportable[exportLabel]);
      const syncLabel = window.location.pathname.substring(1).concat("_sync");
      const is_Syncable: any = await getPermissionObject(syncLabel);
      setSyncable(is_Syncable[syncLabel]);
    })();
  }, [isEditable, localStorageData]);

  useEffect(() => {
    setGridDataLength(gridRowCount);
  }, [gridRowCount]);

  useEffect(() => {
    if (data !== "Past Due Invoices") {
      getFilterData();
    }
    setSearchValue(searchkey);
    if (
      data === "Account_Types" ||
      data === "Classifications" ||
      data === "Contact_Types" ||
      data === "Industry" ||
      data === "PO_Min_Qty" ||
      data === "Sales_Potential"
    ) {
      setPageLabel("Admin");
    } else if (data === "Vendors") {
      setPageLabel("Pricing");
    } else if (data === "Discount_Codes") {
      setPageLabel("Discount Codes");
    } else if (data === "Special_Pricing") {
      setPageLabel("Special Pricing");
    } else {
      setPageLabel(data);
    }
    console.log(searchkey);
  }, [searchkey]);
  useEffect(() => {
    let syncing;
    const myInterval = setInterval(() => {
      syncing = getLocalStorage("syncing");
      if (syncing === "success") {
        setShowAnimSync(false);
        removeLocalStorage("syncing");
        clearInterval(myInterval);
      }
    }, 5000);
  }, []);
  const onresetFilters = async () => {
    const obj = {
      selectedFilters: {
        status: [],
        account_type: [],
        classification: [],
        industry: [],
        org_type: [],
        organization: [],
      },
      filters: "organizations-filters",
    };
    sendFilterEvent(obj);
  };
  async function onFilterChanged(e: any) {
    setSelectedFiltName(e.filter_name);
    if (e.filter_name === "Default") {
      onresetFilters();
    }
    const index = filterlistResponse.findIndex(
      (element: GetFilterProps) => element.id === e.value
    );
    filterEvent(filterlistResponse[index]);
  }

  function deleteFilterName(item: SavedFilterProps) {
    const id = item.value;
    const url = `${EndpointUrl.userSavedFilters}/`;
    // console.log(a);

    const apiObject = {
      payload: {},
      method: "DELETE",
      apiUrl: url.concat(id),
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          removeLocalStorage("filter_name");
          setSelectedFiltName("Default");
          setToastMsg("Filter Deleted Succesfully");
          getFilterData();
          filterdelete(true);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  async function exportData() {
    const response = (await getLocalStorage("gridResponse")) as string;
    if (response && JSON.parse(response).length) {
      await setGridDataLength(true);
    } else {
      await setGridDataLength(false);
    }
    if (gridDataLength) {
      sendOpacity(true);
      let url: string = localStorage.getItem("appUrl") as string;
      // url = url.replace(`${process.env.REACT_APP_API_URL}`, "");
      if (url) {
        url = url.substring(url.indexOf("&") + 1);
      }

      const expUrl = EndpointUrl.exportFilters.concat(
        `?${url}&grid_name=${data.toLowerCase()}&token=${token}`
      );
      window.location.href = baseUrl + expUrl;

      setTimeout(() => {
        setToastMsg("Data is exported successfully");
        sendOpacity(false);
        setPopupMessageShow(true);
      }, 1000);
    }
  }

  function syncDataApi() {
    setSuccessMsg(
      "Syncing is being processed, an email will be sent to your registered email"
    );
    setToastMsg("Sync");
    setPopupMessageShow(true);
    const params = {
      name:
        data.toLowerCase() === "organizations"
          ? "accounts"
          : data.toLowerCase(),
    };
    const apiObject = {
      payload: params || {},
      method: "POST",
      apiUrl: `${EndpointUrl.syncData}?name=${
        data.toLowerCase() === "organizations" ? "accounts" : data.toLowerCase()
      }`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setLocalStorage("syncing", "success");
        } else {
          setLocalStorage("syncing", "failed");
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  const onPastDueReportSync = () => {
    setConfirmText("Are you sure you want to sync Data?");
    setOpenSyncModel(true);
  };
  const onPastDueReportSyncApi = () => {
    setShowAnimSync(true);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.getPastDueReportSync}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success && response.result.status_code === 200) {
          sendSyncData({ sync: true, msg: response.result.message });
          setShowAnimSync(false);
        } else {
          sendSyncData({ sync: false, msg: response.result.message });
          setShowAnimSync(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const [openPastDueFilters, setPastDueFilters] = useState(false);
  async function getConfirmModelEvent(e: any) {
    if (e === "accept" && pageLabel !== "Past Due Invoices") {
      setShowAnimSync(true);
      setTimeout(() => {
        syncDataApi();
      }, 1000);
    } else if (e === "accept" && pageLabel === "Past Due Invoices") {
      setTimeout(() => {
        onPastDueReportSyncApi();
      }, 1000);
    } else {
      setShowAnimSync(false);
    }
    setOpenSyncModel(false);
  }

  const openOrganizationFilter = () => {
    setShowFilters(true);
  };
  const getOrganizationFilterEvent = async (e: any) => {
    if (e && e.CloseModel) {
      setShowFilters(false);
    } else if (e && e.section === "organizations-filters") {
      setShowFilters(false);
      sendFilterEvent({ filters: "organizations-filters", ...e });
    }
    setPastDueFilters(false);
  };

  return (
    <SecondaryHeaderContainer>
      <LeftContent style={{ width: "unset", marginRight: "16px" }}>
        <img src={logo} alt="loading" />
        <PiTypography component="h1">{pageLabel}</PiTypography>
        {pageLabel !== "Past Due Invoices" && (
          <SavedViewListContainer>
            <PiTooltip content={filterName}>
              {getUserLoggedPermission() && (
                <DropdownMenu trigger={filterName}>
                  <DropdownItemGroup>
                    {savedFilter.map((item: SavedFilterProps) => (
                      <DropdownDiv>
                        <DropdownItem onClick={() => onFilterChanged(item)}>
                          <div className="savedViews">
                            <p>{item.label}</p>
                            {item.is_delete_option && (
                              <DropdownDelete
                                className={
                                  !isEditable
                                    ? "Icon-space no-edit-permission"
                                    : "Icon-space"
                                }
                                onClick={() => deleteFilterName(item)}
                              >
                                <ImgDiv>
                                  <img src={Trash} alt="loading" />
                                </ImgDiv>
                              </DropdownDelete>
                            )}
                          </div>
                        </DropdownItem>
                      </DropdownDiv>
                    ))}
                  </DropdownItemGroup>
                </DropdownMenu>
              )}
            </PiTooltip>
          </SavedViewListContainer>
        )}
      </LeftContent>
      <RightContent>
        {pageLabel !== "Admin" && (
          <div className="quote-search-width" style={{ width: "38%" }}>
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
          className={popupMessageShow ? "show" : ""}
          headerLabel={toastMsg}
          message={successMsg}
          onClose={async () => {
            setPopupMessageShow(false);
            setSuccessMsg("");
          }}
        />
        {requestInfo &&
          requestInfo.body &&
          pageLabel !== "Past Due Invoices" && (
            <ButtonsGroup>
              {openModel && (
                <SaveFilterModel
                  label={data}
                  // userList={userList}
                  onChildClick={(e: any) => getModelEvent(e)}
                />
              )}
              <div className="Button-Icon-Display">
                {getUserLoggedPermission() && (
                  <LinkWithIcon
                    onClick={() => openModelWindow()}
                    className={
                      !isEditable
                        ? "Icon-space no-edit-permission"
                        : "Icon-space"
                    }
                  >
                    <ImgTag
                      src={SaveViewLogo}
                      className="save-view Export-Image"
                    />
                    <span className="link-icon-text">Save View</span>
                  </LinkWithIcon>
                )}
                <PiTooltip content={syncTitleHover} libraryType="atalskit">
                  <LinkWithIcon
                    onClick={() => {
                      syncData();
                    }}
                    className={
                      !isSyncable
                        ? "Icon-space no-edit-permission"
                        : "Icon-space"
                    }
                  >
                    {!showAnimSync && (
                      <>
                        <ImgTag
                          src={SyncLogo}
                          className="save-view Export-Image"
                        />
                        <span className="link-icon-text">Sync</span>
                      </>
                    )}
                    {showAnimSync && (
                      <>
                        <AnimSyncImgTag
                          src={AnimSyncLogo}
                          className="save-view Export-Image"
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
                  // href={baseUrl + exportUrl}
                  className={linkWithName}
                  onClick={() => exportData()}
                >
                  <ImgTag
                    src={ExportLogo}
                    alt="loading"
                    className={linkWithName}
                  />
                  <span className="link-icon-text">Export</span>
                </LinkWithIcon>

                <div style={{ display: "flex", gap: "4px" }}>
                  {pageLabel === "Organizations" && (
                    <>
                      <FilterIconContainer
                        onClick={openOrganizationFilter}
                        className={isFilters ? "open" : ""}
                        title={isFilters ? "Filters Applied" : ""}
                        style={{ marginLeft: "16px" }}
                      >
                        <img src={FilterIcon} alt="loading" />
                        <div className="filter-text">Filters</div>
                        {requestInfo.body &&
                        requestInfo.body.selectedCustomFilters &&
                        ((requestInfo.body.selectedCustomFilters.account_type &&
                          requestInfo.body.selectedCustomFilters.account_type
                            .length) ||
                          (requestInfo.body.selectedCustomFilters
                            .classification &&
                            requestInfo.body.selectedCustomFilters
                              .classification.length) ||
                          (requestInfo.body.selectedCustomFilters.industry &&
                            requestInfo.body.selectedCustomFilters.industry
                              .length) ||
                          (requestInfo.body.selectedCustomFilters.status &&
                            requestInfo.body.selectedCustomFilters.status
                              .length) ||
                          (requestInfo.body.selectedCustomFilters.org_type &&
                            requestInfo.body.selectedCustomFilters.org_type
                              .length)) ? (
                          <span>
                            {requestInfo.body.selectedCustomFilters.status
                              .length +
                              requestInfo.body.selectedCustomFilters
                                .account_type.length +
                              requestInfo.body.selectedCustomFilters
                                .classification.length +
                              requestInfo.body.selectedCustomFilters.industry
                                .length +
                              requestInfo.body.selectedCustomFilters.org_type
                                .length}
                          </span>
                        ) : (
                          ""
                        )}
                      </FilterIconContainer>
                      {isFilters && (
                        <FiltersResetContainer
                          onClick={onresetFilters}
                          className="open"
                          title={isFilters ? "Reset Filters " : ""}
                        >
                          {/* <img src={ResetFilterIcon} alt="loading" /> */}
                          <span className="clear-text">Clear</span>
                        </FiltersResetContainer>
                      )}
                    </>
                  )}

                  {pageLabel === "Contacts" && (
                    <>
                      <FilterIconContainer
                        onClick={openOrganizationFilter}
                        className={isFilters ? "open" : ""}
                        title={isFilters ? "Filters Applied" : ""}
                        style={{ marginLeft: "16px" }}
                      >
                        <img src={FilterIcon} alt="loading" />
                        <div className="filter-text">Filters</div>
                        {requestInfo.body &&
                        requestInfo.body.selectedCustomFilters &&
                        ((requestInfo.body.selectedCustomFilters.status &&
                          requestInfo.body.selectedCustomFilters.status
                            .length) ||
                          (requestInfo.body.selectedCustomFilters
                            .organization &&
                            requestInfo.body.selectedCustomFilters.organization
                              .length)) ? (
                          <span>
                            {requestInfo.body.selectedCustomFilters.status
                              .length +
                              requestInfo.body.selectedCustomFilters
                                .organization.length}
                          </span>
                        ) : (
                          ""
                        )}
                      </FilterIconContainer>
                      {isFilters && (
                        <FiltersResetContainer
                          onClick={onresetFilters}
                          className="open"
                          title={isFilters ? "Reset Filters " : ""}
                        >
                          {/* <img src={ResetFilterIcon} alt="loading" /> */}
                          <span className="clear-text">Clear</span>
                        </FiltersResetContainer>
                      )}
                    </>
                  )}
                </div>
              </div>
            </ButtonsGroup>
          )}
        {pageLabel === "Past Due Invoices" && (
          <ButtonsGroup>
            {pastDueSyncpermissionObject.past_due_sync && (
              <LinkWithIcon
                onClick={() => {
                  onPastDueReportSync();
                }}
              >
                {!showAnimSync && (
                  <>
                    <ImgTag
                      src={SyncLogo}
                      className="save-view Export-Image"
                      title={syncTitleHover}
                    />
                    <span className="link-icon-text" title={syncTitleHover}>
                      Sync
                    </span>
                  </>
                )}
                {showAnimSync && (
                  <>
                    <AnimSyncImgTag
                      src={AnimSyncLogo}
                      className="save-view Export-Image"
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
            )}
            <div style={{ display: "flex", gap: "4px" }}>
              {pageLabel === "Past Due Invoices" && (
                <>
                  <FilterIconContainer
                    onClick={() => setPastDueFilters(true)}
                    className={isFilters ? "open" : ""}
                    title={isFilters ? "Filters Applied" : ""}
                  >
                    <img src={FilterIcon} alt="loading" />
                    <div className="filter-text">Filters</div>
                    {requestInfo &&
                    requestInfo.body &&
                    requestInfo.body.selectedCustomFilters &&
                    requestInfo.body.selectedCustomFilters.branch &&
                    requestInfo.body.selectedCustomFilters.branch.length ? (
                      <span>
                        {requestInfo.body.selectedCustomFilters.branch.length}
                      </span>
                    ) : (
                      ""
                    )}
                  </FilterIconContainer>
                  {isFilters && (
                    <FiltersResetContainer
                      onClick={onresetFilters}
                      className="open"
                      title={isFilters ? "Reset Filters " : ""}
                    >
                      {/* <img src={ResetFilterIcon} alt="loading" /> */}
                      <span className="clear-text">Clear</span>
                    </FiltersResetContainer>
                  )}
                </>
              )}
            </div>
          </ButtonsGroup>
        )}
      </RightContent>

      <PiConfirmModel
        className={openSyncModel ? "show" : ""}
        headerLabel="Confirmation"
        message={confirmText}
        primaryBtnLabel="Accept"
        secondaryBtnLabel="Decline"
        onClose={() => {
          setOpenSyncModel(false);
        }}
        onAccept={(e: any) => getConfirmModelEvent(e)}
        onDecline={() => {
          setOpenSyncModel(false);
        }}
      />

      {showFilters && data === "Organizations" && (
        <Suspense fallback={null}>
          <OrganizationsFilter
            requestInfo={requestInfo}
            sendModelData={getOrganizationFilterEvent}
          />
        </Suspense>
      )}

      {showFilters && data === "Contacts" && (
        <Suspense fallback={null}>
          <ContactsFilter
            requestInfo={requestInfo}
            sendModelData={getOrganizationFilterEvent}
          />
        </Suspense>
      )}
      {openPastDueFilters && (
        <Suspense fallback={null}>
          <PastDueInvoiceFilter
            requestInfo={requestInfo}
            sendModelData={getOrganizationFilterEvent}
          />
        </Suspense>
      )}
    </SecondaryHeaderContainer>
  );
}

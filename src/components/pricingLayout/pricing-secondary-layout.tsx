/* eslint-disable no-nested-ternary */
import {
  PiTypography,
  PiSearch,
  PiIconDropdownMenu,
  PiToast,
  PiSelect,
} from "pixel-kit";
import {
  useState,
  useEffect,
  lazy,
  Suspense,
  useRef,
  ChangeEvent,
} from "react";

import {
  SecondaryHeaderContainer,
  LeftContent,
  RightContent,
  SaveViewDiv,
  ButtonsGroup,
  ImgTag,
  LinkWithIcon,
} from "@app/components/secondaryheader/secondaryheader.component";
import FilterIcon from "@app/assets/images/list_filter_icon.svg";

import { token, triggerApi } from "@app/services/api-services";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
// import PrimaryHeader from './primaryheader.component'
// import FileUploadModel from '@app/components/fileuploadModel'
import { ApiResponse, SaveFilterProps } from "@app/services/schema/schema";
// import MultiEditModel from '@app/components/multiEditModel/multiEditModel'
// import PricingAddRowModel from '@app/components/pricingAddRowModel/pricingAddRowModel'
// import DiscountAddRowModel from '@app/components/discountAddRowModel/discountAddRowModel'
import {
  getLocalStorage,
  removeLocalStorage,
} from "@app/core/localStorage/localStorage";
import {
  getPermissionObject,
  getUserPermissions,
} from "@app/helpers/componentHelpers";
import MultiEditLogo from "../../assets/images/multiEditIcon.svg";
import AddLogo from "../../assets/images/Plus.svg";
import ImportLogo from "../../assets/images/Import.svg";
import ExportLogo from "../../assets/images/Export.svg";
import { FilterIconContainer } from "../Admin layout/adminLayouts.component";
import FiltersResetContainer from "../parts-purchase-components/parts-purchase-filter/parts-purchase-filter-components";
import PricingFilter from "./pricing-filter";

const FileUploadModel = lazy(() => import("@app/components/fileuploadModel"));
const PricingAddRowModel = lazy(
  () => import("@app/components/pricingAddRowModel/pricingAddRowModel")
);
const DiscountAddRowModel = lazy(
  () => import("@app/components/discountAddRowModel/discountAddRowModel")
);
const MultiEditModel = lazy(
  () => import("@app/components/multiEditModel/multiEditModel")
);

// type Props = {
//  logo: string;
//  data: string;
//  searchkey: string;
//  searchEvent: (e: string) => {};
//  onFileSelect: any;

//  gridRowCount: any;
//  selectedVendor: any;
// };
type FileProps = {
  success: boolean;
};

export default function PricingSecondaryLayout({
  logo,
  data,
  searchEvent,
  onFileSelect,
  gridRowCount,
  requestInfo,
  sendEventData,
  branchList,
  branchValue,
  vendorId,
  vendorName,
  selectBranch,
  sendOpacity,
}: any) {
  const { current }: any = useRef({ timer: 0 });
  const [searchValue, setSearchValue] = useState("");
  const [pageLabel, setPageLabel] = useState(data);
  const [openModel, setOpenModel] = useState(false);

  const [isEditable, setIsEditabe] = useState<any>(false);
  const [isExportable, setExportable]: any = useState<any>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const baseUrl = process.env.REACT_APP_API_URL;
  const [toastMsg, setToastMsg] = useState("111");
  const [openMultiModel, setMultiModel] = useState(false);
  const [openAddRowModel, setOpenAddRowModel] = useState(false);
  const [openAddRowDiscountModel, setOpenAddRowDiscountModel] = useState(false);
  const [popupMessageShow, setPopupMessageShow] = useState(false);
  const [gridDataLength, setGridDataLength] = useState<any>();
  // let [branchList, setBranchList]: any = useState([]);
  const onresetFilters = () => {
    const obj = {
      success: true,
      selectedFilters: {
        discount_code: [],
      },
      section: "pricing-filters",
    };
    sendEventData({ ...obj });
  };
  function openAddRow() {
    if (pageLabel === "Pricing") {
      setOpenAddRowModel(true);
    }
  }
  function openAddDiscountRow() {
    setOpenAddRowDiscountModel(true);
  }
  function openModelWindow() {
    setOpenModel(true);
    // console.log(saveFilter(props));
  }
  async function exportData() {
    const response = (await getLocalStorage("gridResponse")) as string;
    if (JSON.parse(response).length) {
      await setGridDataLength(true);
    } else {
      await setGridDataLength(false);
    }
    if (gridDataLength) {
      sendOpacity(true);
      setPopupMessageShow(true);
      let url: string = localStorage.getItem("appUrl") as string;
      // url = url.replace(`${process.env.REACT_APP_API_URL}`, "");
      if (url) {
        url = url.substring(url.indexOf("&") + 1);
      }

      const expUrl = EndpointUrl.exportFilters.concat(
        `?${url}&grid_name=${data.toLowerCase()}&token=${token}`
      );

      // setTimeout(() => {
      //   setToast(false)
      // }, 1500)
      window.location.href = baseUrl + expUrl;
      sendOpacity(false);
      setToastMsg("Data is exported sucessfully");
    }
  }
  const itemsList = [
    {
      id: "1",
      element: (
        <LinkWithIcon onClick={() => openAddRow()}>
          <ImgTag src={AddLogo} className="save-view Export-Image add-icon" />
          <span className="link-icon-text">Add</span>
        </LinkWithIcon>
      ),
    },
    {
      id: "2",
      element: (
        <LinkWithIcon onClick={() => openModelWindow()}>
          <ImgTag
            src={ImportLogo}
            className="save-view Export-Image"
            title="Import"
          />
          <span className="link-icon-text">Import</span>
        </LinkWithIcon>
      ),
    },
    {
      id: "3",
      element: (
        <LinkWithIcon
          // href={baseUrl + exportUrl}
          onClick={() => exportData()}
          className={
            !gridDataLength
              ? "save-view Export-Image disable-btns"
              : !isExportable
                ? "save-view Export-Image no-edit-permission"
                : "save-view Export-Image"
          }
        >
          <ImgTag
            src={ExportLogo}
            className={
              !gridDataLength
                ? "save-view Export-Image disable-btns"
                : !isExportable
                  ? "save-view Export-Image no-edit-permission"
                  : "save-view Export-Image"
            }
          />
          <span
            className={
              !gridDataLength
                ? "link-icon-text disable-btns"
                : !isExportable
                  ? "link-icon-text no-edit-permission"
                  : "link-icon-text"
            }
          >
            Export
          </span>
        </LinkWithIcon>
      ),
    },
  ];
  async function getFilterModelEvent(e: any) {
    setOpenFilter(false);
    sendEventData({ success: true, ...e });
  }

  function valueChanged(e: ChangeEvent<HTMLInputElement>) {
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
  }
  function clearSearch() {
    setSearchValue("");
    searchEvent("");
  }
  // console.log(props);

  function openMultiEditModel() {
    if (gridDataLength) {
      setMultiModel(true);
    }
  }
  function keyUp() {
    // if (e.key === 'Enter') {
    //  if (e.target.value && e.target.value.length >= 3) {
    //    setTimeout(() => {
    //      searchEvent(searchValue)
    //    }, 1000)
    //  }
    // }
  }

  async function getUploadEvent(e: SaveFilterProps) {
    if (e && Object.keys(e).length) {
      setOpenModel(false);
      onFileSelect(e);
    } else {
      setOpenModel(false);
    }
  }

  async function getUploadEvent2(e?: FileProps) {
    console.log(e);
    if (e && e.success) {
      setMultiModel(false);
      onFileSelect(e);
      setPopupMessageShow(true);
      setToastMsg("Saved Succesfully");
    } else {
      setMultiModel(false);
    }
  }
  async function getAddRowEvent(e?: FileProps) {
    console.log(e);

    if (pageLabel === "Pricing") {
      if (e && e.success) {
        setOpenAddRowModel(false);
        onFileSelect(e);
        setPopupMessageShow(true);
        setToastMsg("Added Succesfully");
      } else {
        setOpenAddRowModel(false);
      }
    }
  }
  async function getAddRowDiscountEvent(e?: FileProps) {
    // console.log(e);
    if (e && e.success) {
      setOpenAddRowDiscountModel(false);
      onFileSelect(e);
      setPopupMessageShow(true);
      setToastMsg("Added Succesfully");
    } else {
      setOpenAddRowDiscountModel(false);
    }
  }
  const [isImportable, setImportable] = useState<any>(false);

  useEffect(() => {
    (async () => {
      // await getUserPermissions(window.location.pathname.substring(1), "Edit");
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

      const importLabel: any = window.location.pathname
        .substring(1)
        .concat("_import");
      const is_Importable: any = await getPermissionObject(importLabel);
      setImportable(is_Importable[importLabel]);
    })();
  }, [getLocalStorage("userPermission"), isEditable]);

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
          if (list && list.length) {
            list.unshift({
              id: "default",
              filter_name: "Default",
              is_delete_option: false,
            });
          }

          // console.log(savedFilter);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  const itemsRemoveList = () => {
    itemsList.splice(1, 1);
    return itemsList;
  };
  useEffect(() => {
    setGridDataLength(gridRowCount);
  }, [gridRowCount]);
  useEffect(() => {
    getFilterData();
    itemsRemoveList();
    setSearchValue(requestInfo.searchkey ? requestInfo.searchkey : "");
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
      setPageLabel("Non Standard Pricing ");
    } else {
      setPageLabel(data);
    }
    console.log(requestInfo);
  }, [requestInfo]);
  useEffect(() => {
    let syncing;
    const myInterval = setInterval(() => {
      syncing = getLocalStorage("syncing");
      if (syncing === "success") {
        removeLocalStorage("syncing");
        clearInterval(myInterval);
      }
    }, 5000);
  }, []);

  const [successMsg, setSuccessMsg] = useState("");
  async function exportDataMail() {
    const response = (await getLocalStorage("gridResponse")) as string;
    if (JSON.parse(response).length) {
      await setGridDataLength(true);
    } else {
      await setGridDataLength(false);
    }
    if (gridDataLength) {
      setToastMsg("Export Data");
      setSuccessMsg(
        "Your export is being processed, an email will be sent with the file attachment to your registered email"
      );
      setPopupMessageShow(true);
      let expurl: string = localStorage.getItem("appUrl") as string;
      // url = url.replace(`${process.env.REACT_APP_API_URL}`, "");
      if (expurl) {
        expurl = expurl.substring(expurl.indexOf("&") + 1);
      }

      let export_Url = EndpointUrl.exportDataByMail.concat(
        `?${expurl}&grid_name=${data.toLowerCase()}`
      );
      const url = `${export_Url}&grid_name=${data.toLowerCase()}`;
      export_Url = url;

      // let url2 = `${url}?page=${pageNumber}&sort=${sort}&sort_key=${sortkey}`

      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: url,
        headers: {},
      };
      triggerApi(apiObject)
        .then(() => {})
        .catch((err: string) => {
          console.log(err);
        });
    }
    // setOpenPopupModel(true)
  }

  return (
    <SecondaryHeaderContainer>
      <LeftContent>
        <img src={logo} alt="loading" />
        <PiTypography component="h1">{pageLabel}</PiTypography>
      </LeftContent>
      <RightContent>
        {pageLabel !== "Admin" && (
          <div className="quote-search-width" style={{ width: "40%" }}>
            <PiSearch
              libraryType="atalskit"
              onClear={() => clearSearch()}
              onValueChange={(e) => valueChanged(e)}
              onKeyUp={() => keyUp()}
              placeholder={
                pageLabel === "Pricing"
                  ? "Stock Code / Description"
                  : "Search By Discount Code"
              }
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
        {pageLabel !== "Organizations" && pageLabel !== "Contacts" && (
          <ButtonsGroup>
            {pageLabel === "Discount Codes" && (
              <>
                <div className="More-Options">
                  <PiIconDropdownMenu
                    items={[
                      {
                        id: "1",
                        element: (
                          <LinkWithIcon
                            onClick={() => openMultiEditModel()}
                            className={
                              !isEditable
                                ? "Icon-space no-edit-permission"
                                : !gridDataLength
                                  ? "Icon-space disable-btns"
                                  : "Icon-space"
                            }
                          >
                            <ImgTag
                              src={MultiEditLogo}
                              className="save-view Export-Image"
                              alt="loading"
                            />
                            <span className="link-icon-text">Multi Edit</span>
                          </LinkWithIcon>
                        ),
                      },

                      {
                        id: "3",
                        element: (
                          <LinkWithIcon
                            // href={baseUrl + }
                            onClick={() => exportData()}
                            className={
                              !gridDataLength
                                ? "save-view Export-Image disable-btns"
                                : !isExportable
                                  ? "save-view Export-Image no-edit-permission"
                                  : "save-view Export-Image"
                            }
                          >
                            <ImgTag
                              src={ExportLogo}
                              alt="loading"
                              className={
                                !gridDataLength
                                  ? "save-view Export-Image disable-btns"
                                  : !isExportable
                                    ? "save-view Export-Image no-edit-permission"
                                    : "save-view Export-Image"
                              }
                            />
                            <span className="link-icon-text">Export</span>
                          </LinkWithIcon>
                        ),
                      },
                      {
                        id: "2",
                        element: (
                          <LinkWithIcon
                            onClick={() => openAddDiscountRow()}
                            className={
                              !isEditable
                                ? "no-edit-permission primary-button"
                                : ""
                            }
                          >
                            <ImgTag
                              src={AddLogo}
                              className="save-view Export-Image add-icon"
                              alt="loading"
                            />
                            <span className="button-icon-text">Add</span>
                          </LinkWithIcon>
                        ),
                      },
                    ]}
                    onOpenChange={() => {}}
                  />
                </div>
                <SaveViewDiv>
                  {openMultiModel && (
                    <Suspense fallback={null}>
                      <MultiEditModel
                        reqInfo={requestInfo}
                        // userList={userList}
                        onFileSelect={(e: any) => getUploadEvent2(e)}
                      />
                    </Suspense>
                  )}
                </SaveViewDiv>
                <SaveViewDiv>
                  {openAddRowDiscountModel && (
                    <Suspense fallback={null}>
                      <DiscountAddRowModel
                        reqInfo={requestInfo}
                        onFileSelect={(e: any) => getAddRowDiscountEvent(e)}
                        paramData={null}
                      />
                    </Suspense>
                  )}
                </SaveViewDiv>
                <div className="Button-Icon-Display">
                  <div className="Icon-space">
                    <PiSelect
                      // label={piDropdownlabel}
                      libraryType="atalskit"
                      // name="select"
                      // defaultValue={selectedBrnch}
                      name="branch"
                      className="select-branch-button"
                      onChange={(e: any) => selectBranch(e)}
                      value={branchValue}
                      options={branchList}
                      placeholder="Select"
                      noOptionsMessage={() => "No Branches Found"}
                      // isDisabled={branchList.length > 1 ? false : true}
                    />
                  </div>
                  <LinkWithIcon
                    onClick={() => openMultiEditModel()}
                    className={
                      !isEditable
                        ? "Icon-space no-edit-permission"
                        : !gridDataLength
                          ? "Icon-space disable-btns"
                          : "Icon-space"
                    }
                  >
                    <ImgTag
                      src={MultiEditLogo}
                      className="save-view Export-Image"
                      alt="loading"
                    />
                    <span className="link-icon-text">Multi Edit</span>
                  </LinkWithIcon>

                  <LinkWithIcon
                    // href={baseUrl + exportUrl}
                    onClick={() => exportData()}
                    className={
                      !gridDataLength
                        ? "save-view Export-Image disable-btns Icons-space "
                        : !isExportable
                          ? "save-view Export-Image no-edit-permission Icons-space"
                          : "save-view Export-Image Icons-space"
                    }
                  >
                    <ImgTag
                      src={ExportLogo}
                      alt="loading"
                      className={
                        !gridDataLength
                          ? "save-view Export-Image disable-btns "
                          : !isExportable
                            ? "save-view Export-Image no-edit-permission"
                            : "save-view Export-Image"
                      }
                    />
                    <span className="link-icon-text">Export</span>
                  </LinkWithIcon>

                  <FilterIconContainer
                    style={{ marginRight: "6px" }}
                    onClick={() => setOpenFilter(true)}
                    className={
                      requestInfo.body &&
                      requestInfo.body.selectedCustomFilters &&
                      requestInfo.body.selectedCustomFilters.quantity &&
                      requestInfo.body.selectedCustomFilters.quantity.length
                        ? " open"
                        : ""
                    }
                    title={
                      requestInfo.body &&
                      requestInfo.body.selectedCustomFilters &&
                      requestInfo.body.selectedCustomFilters.quantity &&
                      requestInfo.body.selectedCustomFilters.quantity.length
                        ? "Filters Applied"
                        : ""
                    }
                  >
                    <img
                      src={FilterIcon}
                      alt="loading"
                      className="filter-icon"
                    />

                    <div className="filter-text">Filters</div>

                    {requestInfo.body &&
                    requestInfo.body.selectedCustomFilters &&
                    requestInfo.body.selectedCustomFilters.quantity &&
                    requestInfo.body.selectedCustomFilters.quantity.length ? (
                      <span>
                        {requestInfo.body.selectedCustomFilters.quantity.length}
                      </span>
                    ) : (
                      ""
                    )}
                  </FilterIconContainer>
                  {requestInfo.body &&
                  requestInfo.body.selectedCustomFilters &&
                  requestInfo.body.selectedCustomFilters.quantity &&
                  requestInfo.body.selectedCustomFilters.quantity.length ? (
                    <FiltersResetContainer
                      onClick={onresetFilters}
                      className=" open"
                      title={
                        requestInfo.body &&
                        requestInfo.body.selectedCustomFilters &&
                        requestInfo.body.selectedCustomFilters.quantity &&
                        requestInfo.body.selectedCustomFilters.quantity.length
                          ? "Reset Filters "
                          : ""
                      }
                    >
                      {/* <img src={ResetFilterIcon} alt="loading" /> */}
                      <span className="clear-text Icon-space">Clear</span>
                    </FiltersResetContainer>
                  ) : (
                    ""
                  )}
                  <LinkWithIcon
                    onClick={() => openAddDiscountRow()}
                    className={
                      Object.keys(requestInfo).length === 0 || !isEditable
                        ? " no-edit-permission"
                        : "primary-button"
                    }
                  >
                    <ImgTag
                      src={AddLogo}
                      className="save-view add-icon"
                      alt="loading"
                    />
                    <span className="button-icon-text">Add</span>
                  </LinkWithIcon>
                  {/* <FiltersResetContainer
                      onClick={onresetFilters}
                      className="open"
                      style={{ marginLeft: "8px" }}
                    >
                      <img src={ResetFilterIcon} alt="loading" />
                      <span className="clear-text">Clear</span>
                    </FiltersResetContainer> */}

                  {/* <FiltersResetContainer
                      onClick={onresetFilters}
                      className=" open"
                      title={
                        requestInfo.body &&
                        requestInfo.body.selectedCustomFilters &&
                        requestInfo.body.selectedCustomFilters.quantity &&
                        requestInfo.body.selectedCustomFilters.quantity.length
                          ? "Reset Filters "
                          : ""
                      }
                    >
                      <img src={ResetFilterIcon} alt="loading" />
                      <span className="clear-text">Clear</span>
                    </FiltersResetContainer> */}
                </div>
              </>
            )}
            {(pageLabel === "Pricing" ||
              pageLabel === "Non Standard Pricing") && (
              <>
                <div className="More-Options">
                  <PiIconDropdownMenu
                    items={
                      pageLabel === "Non Standard Pricing"
                        ? itemsRemoveList()
                        : itemsList
                    }
                    onOpenChange={() => {}}
                  />
                </div>
                {pageLabel === "Pricing" && (
                  <>
                    <div className="Button-Icon-Display ">
                      <PiSelect
                        // label={piDropdownlabel}
                        libraryType="atalskit"
                        // name="select"
                        // defaultValue={selectedBrnch}
                        name="branch"
                        className="select-branch-button Icon-space"
                        onChange={(e: any) => selectBranch(e)}
                        value={branchValue}
                        options={branchList}
                        placeholder="Select"
                        noOptionsMessage={() => "No Branches Found"}
                        // isDisabled={branchList.length > 1 ? false : true}
                      />
                      <LinkWithIcon
                        onClick={() => openModelWindow()}
                        className={
                          !isImportable
                            ? "Icon-space no-edit-permission"
                            : "Icon-space"
                        }
                      >
                        <ImgTag
                          src={ImportLogo}
                          className="save-view Export-Image"
                          title="Import"
                          alt="loading"
                        />
                        <span className="link-icon-text">Import</span>
                      </LinkWithIcon>

                      <LinkWithIcon
                        // href={baseUrl + exportUrl}
                        onClick={() => exportDataMail()}
                        className={
                          !gridDataLength
                            ? "Icon-space disable-btns"
                            : !isExportable
                              ? "Icon-space no-edit-permission"
                              : "Icon-space"
                        }
                      >
                        <ImgTag
                          src={ExportLogo}
                          alt="loading"
                          className={
                            !gridDataLength
                              ? "save-view Export-Image disable-btns"
                              : !isExportable
                                ? "save-view Export-Image no-edit-permission"
                                : "save-view Export-Image"
                          }
                        />
                        <span className="link-icon-text">Export</span>
                      </LinkWithIcon>

                      <FilterIconContainer
                        style={{ marginRight: "8px" }}
                        onClick={() => setOpenFilter(true)}
                        className={
                          requestInfo.body &&
                          requestInfo.body.selectedCustomFilters &&
                          requestInfo.body.selectedCustomFilters
                            .discount_code &&
                          requestInfo.body.selectedCustomFilters.discount_code
                            .length
                            ? " open"
                            : ""
                        }
                        title={
                          requestInfo.body &&
                          requestInfo.body.selectedCustomFilters &&
                          requestInfo.body.selectedCustomFilters
                            .discount_code &&
                          requestInfo.body.selectedCustomFilters.discount_code
                            .length
                            ? "Filters Applied"
                            : ""
                        }
                      >
                        <img
                          src={FilterIcon}
                          alt="loading"
                          className="filter-icon"
                        />

                        <div className="filter-text">Filters</div>

                        {requestInfo.body &&
                        requestInfo.body.selectedCustomFilters &&
                        requestInfo.body.selectedCustomFilters.discount_code &&
                        requestInfo.body.selectedCustomFilters.discount_code
                          .length ? (
                          <span>
                            {
                              requestInfo.body.selectedCustomFilters
                                .discount_code.length
                            }
                          </span>
                        ) : (
                          ""
                        )}
                      </FilterIconContainer>

                      {requestInfo.body &&
                      requestInfo.body.selectedCustomFilters &&
                      requestInfo.body.selectedCustomFilters.discount_code &&
                      requestInfo.body.selectedCustomFilters.discount_code
                        .length ? (
                        <FiltersResetContainer
                          onClick={onresetFilters}
                          className="open"
                          title={
                            requestInfo.body &&
                            requestInfo.body.selectedCustomFilters &&
                            requestInfo.body.selectedCustomFilters
                              .discount_code &&
                            requestInfo.body.selectedCustomFilters.discount_code
                              .length
                              ? "Reset Filters "
                              : ""
                          }
                        >
                          {/* <img src={ResetFilterIcon} alt="loading" /> */}
                          <span className="clear-text Icon-space">Clear</span>
                        </FiltersResetContainer>
                      ) : (
                        ""
                      )}
                      <LinkWithIcon
                        onClick={() => openAddRow()}
                        className={
                          Object.keys(requestInfo).length === 0 || !isEditable
                            ? " no-edit-permission"
                            : " primary-button"
                        }
                      >
                        <ImgTag
                          src={AddLogo}
                          className="save-view add-icon"
                          alt="loading"
                        />
                        <span className="button-icon-text">Add</span>
                      </LinkWithIcon>
                    </div>
                    {openAddRowModel && (
                      <Suspense fallback={null}>
                        <PricingAddRowModel
                          reqInfo={requestInfo}
                          paramData={null}
                          onFileSelect={(e: any) => getAddRowEvent(e)}
                          branchValue={branchValue}
                        />
                      </Suspense>
                    )}
                  </>
                )}
              </>
            )}
            {pageLabel !== "Discount Codes" && openModel && (
              <Suspense fallback={null}>
                <FileUploadModel
                  // reqInfo={reqInfo}
                  onFileSelect={(e: any) => getUploadEvent(e)}
                />
              </Suspense>
            )}
          </ButtonsGroup>
        )}
        {openFilter && (
          <PricingFilter
            list={data}
            vid={vendorId}
            vname={vendorName}
            branchid={branchValue}
            requestInfo={requestInfo}
            sendModelData={(e: any) => getFilterModelEvent(e)}
          />
        )}
      </RightContent>
    </SecondaryHeaderContainer>
  );
}

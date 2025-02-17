/* eslint-disable prefer-const */
/* eslint-disable no-nested-ternary */
import { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  PiLeftMenu,
  PiSearch,
  PiSpinner,
  PiServerGrid2,
  PiToast,
} from "pixel-kit";
import TableGrid from "@app/components/tablegrid/tablegrid";
import SideMenuList from "@app/components/sidelist/sidelist";
import {
  // TableListContainer,
  SideMenuContainer,
  // TableContainer,
  Header,
  NoVendorFound,
  SpinnerDiv,
} from "@app/components/commonLayout/commonLayout.component";
import EditIcon from "@app/assets/images/editicon.svg";
import { triggerApi, token } from "@app/services/api-services";
import {
  FilterColumnProps,
  PageProps,
  ApiResponse,
  GridfilterData,
  SidenavProps,
  ColumnHeaders,
  BranchListProps,
} from "@app/services/schema/schema";
import {
  GridReadyEvent,
  ITooltipParams,
  CellClickedEvent,
} from "ag-grid-community";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
// import { SubscribeService } from "@app/services/subscribe-service";
import ModelGrid from "@app/components/modelGrid/modelgrid";
import DiscountAddRowModel from "@app/components/discountAddRowModel/discountAddRowModel";
import {
  getLocalStorage,
  removeLocalStorage,
} from "@app/core/localStorage/localStorage";
import PricingAddRowModel from "@app/components/pricingAddRowModel/pricingAddRowModel";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import { getColumnFilterData } from "@app/helpers/helpers";
import DateIcon from "@app/assets/images/date_picker_icon2.svg";
import AvatarIcon from "@app/assets/images/new_avatar.svg";
import VendorIcon from "@app/assets/images/vendor_logo.svg";
import ClickIcon from "../../assets/images/Click.svg";
import PricingSecondaryLayout from "./pricing-secondary-layout";
import {
  TableContainer,
  TableListContainer,
} from "../Admin layout/adminLayouts.component";

type FileProps = {
  success: boolean;
};
export default function PricingLayout({
  pageLabel,
  apiDataUrl,
  apiData,
  pageLogo,
}: PageProps) {
  // console.log(process.env)
  // const { pageLabel, apiDataUrl, apiData, pageLogo } = props;
  const { current }: any = useRef({ timer: 0 });
  const [columndata, setColumnData]: any = useState([]);
  const [active, setActive] = useState("all");
  const [popupMessageShow, setPopupMessageShow] = useState(false);
  const [SearchValue, setSearchValue] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [modelGridColumnData, setModelGridColumnData] = useState([]);
  const [apiFilterData, setApiFilterData] = useState(null);
  const [vendorName, setVendorName] = useState("");
  // let requestInfo = {}
  const [requestInfo, setRequestInfo]: any = useState({});
  let [branchValue, setBranchValue]: any = useState();
  let [vendorId, setVendorId] = useState("");
  const [openGridModel, setOpenGridModel] = useState(false);
  const [openAddRowDiscountModel, setOpenAddRowDiscountModel] = useState(false);
  const [vendorSpinner, setVendorSpinner] = useState(true);
  const [isVendorList, setIsVendorList] = useState(true);
  const [pricingSearchValue, setPricingSearchValue] = useState<any>();
  const [ShowsFilters, setShowsFilters] = useState<any>();
  let [permissionObject, setpermissionObject] = useState<any>({});
  const [modelGridData, setModelGridData] = useState({
    column_data: [],
    acc_type_pricelist: [],
    description: "",
    discount_code: "",
    id: "",
    list_price: "",
    manufacturer_discount_id: "",
    name: "",
    vendor_id: "",
  });
  const [vendorsList, setVendorList]: any = useState([]);
  const [openAddRowModel, setOpenAddRowModel] = useState(false);
  const [paramData, setParamData] = useState({});
  const [gridDataLength, setGridDataLength] = useState<any>();

  async function getVendorList() {
    let vendor_list: any = [];
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${pageLabel === "Pricing" ? EndpointUrl.PricingVendors : EndpointUrl.DCVendors}?status=true`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          setVendorSpinner(false);
          const data = response.result.data.list;

          let list = [];
          list = data.map((item: any) => ({
            key: item.id,
            label: item.name,
            display: true,
            ...item,
          }));
          vendor_list = list;
          console.log(vendor_list);

          setVendorList([...vendor_list]);
          if (list.length > 0) {
            setIsVendorList(true);
          } else {
            setIsVendorList(false);
          }
        } else {
          setIsVendorList(true);
        }
        return vendor_list;
      })
      .catch((err: string) => {
        console.log(err);
      });
    return vendor_list;
  }
  useEffect(() => {
    if (
      requestInfo &&
      requestInfo.body &&
      requestInfo.body.selectedCustomFilters &&
      requestInfo.body.selectedCustomFilters.quantity &&
      requestInfo.body.selectedCustomFilters.quantity.length
    ) {
      setShowsFilters(true);
    }
  }, [requestInfo]);
  useEffect(() => {
    (async () => {
      permissionObject = await getPermissionObject(
        window.location.pathname.substring(1)
      );
      setpermissionObject({ ...permissionObject });
      console.log(permissionObject);
    })();
  }, [getLocalStorage("userPermission"), pageLabel]);

  const [branchList, setBranchList]: any = useState([]);

  async function getBranchList() {
    let branches: any = [];
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${pageLabel === "Pricing" ? EndpointUrl.PricingBranches : EndpointUrl.DCBranches}?vendor_id=${vendorId}&vendor_name=${vendorName}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          let bList = [];
          bList = response.result.data.list;
          if (response.result.data.total_count) {
            let list = [];
            list = bList.map((item: BranchListProps) => ({
              label: item.name,
              value: item.id,
              ...item,
            }));
            branches = list;
            setBranchList(branches);
          }
          return branches;
        }
        return branches;
      })
      .catch((err: string) => {
        console.log(err);
      });

    return branches;
  }
  async function getOrgNameFilterData(params: Array<FilterColumnProps>) {
    let data = [];
    data = params ? params.map((obj: FilterColumnProps) => obj.name) : [];
    return data;
  }
  async function getModifiedColumnData(columnData: GridfilterData) {
    if (columnData.column_data) {
      await columnData.column_data.map(async (obj: ColumnHeaders) => {
        // obj["filter"] = true;
        // obj["width"] = 250;
        obj.minWidth = 80;
        obj.sortingOrder = ["asc", "desc"];
        obj.enableServerSideSorting = true;
        obj.enableServerSideFilter = true;
        // obj['sortable'] = true;
        obj.resizable = true;
        obj.rowGroup = false;
        obj.editable = false;
        obj.suppressSizeToFit = false;
        obj.filterParams = {};
        obj.filterParams.buttons = ["apply", "reset"];
        obj.filterParams.closeOnApply = true;
        // obj['cellStyle'] = { background : "whitesmoke" }
        if (obj.field === "edit") {
          obj.minWidth = 50;
          obj.width = 50;
        } else {
          obj.minWidth = 180;
          obj.width = 180;
        }
        if (obj.field === "quantity") {
          // obj['cellStyle'] = { cursor: 'pointer'}
        }

        if (obj.type === "number") {
          obj.headerClass = ["header-align-left", "ag-headers-padding-left"];
          obj.cellClass = ["cell-align-left"];
        } else if (obj.type === "price") {
          obj.headerClass = ["header-align-left"];
          obj.cellClass = ["cell-align-left"];
        } else if (obj.type === "text") {
          obj.headerClass = ["ag-customHeader-text", "ag-headers-padding-left"];
          obj.cellClass = ["ag-customCell-text", "ag-cell-padding-left", "222"];
        } else {
          // if (obj.field !== "edit") {
          //  obj["headerClass"] = [
          //    "ag-customHeader-text",
          //    "ag-headers-padding-left",
          //  ];
          //  obj["cellClass"] = [
          //    "ag-customCell-text",
          //    "ag-cell-padding-left",
          //    "32323",
          //  ];
          // }
        }
        if (obj.field === "description") {
          obj.minWidth = 250;
        }
        if (obj.field === "quantity" || obj.field === "discount_code") {
          obj.minWidth = 150;
        }
        if (obj.field === "contact_type") {
          obj.filterParams.values = await getOrgNameFilterData(
            columnData.filters.contact_type
          );
        }
        if (obj.field === "organization") {
          obj.filterParams.values = await getOrgNameFilterData(
            columnData.filters.organization
          );
        }

        if (obj.field === "account_type") {
          obj.filterParams.values = await getOrgNameFilterData(
            columnData.filters.account_type
          );
        }
        if (obj.field === "classification") {
          obj.filterParams.values = await getOrgNameFilterData(
            columnData.filters.classification
          );
        }
        if (obj.field === "industry") {
          obj.filterParams.values = await getOrgNameFilterData(
            columnData.filters.industry
          );
        }
        if (obj.field === "org_type") {
          obj.filterParams.values = await getOrgNameFilterData(
            columnData.filters.org_type
          );
        }
        if (obj.field === "quantity") {
          // obj["filter"] = true;
          obj.filterParams.values = await getOrgNameFilterData(
            columnData.filters.quantity
          );
        }
        if (obj.field === "discount_code") {
          // obj["filter"] = true;
          obj.filterParams.values = await getOrgNameFilterData(
            columnData.filters.discount_code
          );
        }
        if (obj.field === "status") {
          // obj["filter"] = true;
          obj.filterParams.values = await getOrgNameFilterData(
            columnData.filters.status
          );
        }
        if (obj.field === "quantity" && pageLabel === "Pricing") {
          obj.cellStyle = { cursor: "pointer" };
          obj.cellClass = "pricing-click-icon";
          obj.cellRenderer = (params: CellClickedEvent) =>
            `<span class="Icon" ><img src=${ClickIcon} alt='loading'/></span>${params.value}`;
        }
        if (obj.field === "start_date" || obj.field === "end_date") {
          obj.cellStyle = { cursor: "pointer" };
          obj.headerClass = ["ag-header-justify-center"];
          obj.cellClass = "justify-center";
          obj.cellRenderer = (params: any) => {
            console.log(params);
            return params.value
              ? `<span class="Icon-text" ><img src=${DateIcon} alt='loading'/></span>` +
                  `<span class="label">${params.value}</span>`
              : "--";
          };
        }
        if (obj.field === "owner_name" || obj.field === "owner") {
          obj.cellStyle = { cursor: "pointer" };
          obj.cellRenderer = (params: any) =>
            `<span class="Icon-text" ><img src=${AvatarIcon} alt='loading'/></span>` +
            `<span class="label">${params.value}</span>`;
        }
        if (obj.field === "customer_name") {
          obj.cellStyle = { cursor: "pointer" };
          obj.cellRenderer = (params: any) =>
            `<span class="Icon-text" ><img src=${VendorIcon} alt='loading'/></span>` +
            `<span class="label">${params.value}</span>`;
        }

        obj.tooltipValueGetter = (params: ITooltipParams) => params.value;
      });
      return columnData.column_data;
    }
    return columnData.column_data;
  }
  async function getFilterData() {
    let gridFilterData: any;
    // sendModelData({ success: false });
    // sendEventData({ vendorId: vId, vendorName: vendorName });
    console.log(branchValue, 353);
    const apiObject = {
      payload: apiData.params ? apiData.params : {},
      method: "GET",
      apiUrl: `${EndpointUrl.filterDataApi}?name=${pageLabel.toLowerCase()}&vendor_id=${vendorId}&vendor_name=${vendorName}&branch_id=${
        branchValue && typeof branchValue === "object"
          ? branchValue.id
          : branchValue
      }`,
      headers: {},
    };

    await triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          gridFilterData = response.result.data;
          const { filters } = gridFilterData;
          setApiFilterData(filters);
          console.log(permissionObject);
          if (pageLabel === "Pricing") {
            const valueEdit = {
              headerName: "",
              pinned: "right",
              field: "edit",
              cellClass: [
                !permissionObject.Edit
                  ? "edit-icon-cell no-edit-permission"
                  : "edit-icon-cell",
              ],
              suppressColumnsToolPanel: true,
              // hide: true,
              cellStyle: { cursor: "pointer" },
              cellRenderer: () =>
                `<img src=${EditIcon} className='Icon' style='height: 14px; width: 14px' alt='loading'/>`,
            };
            if (permissionObject.Edit) {
              gridFilterData.column_data.push(valueEdit);
            }
          }
          if (pageLabel === "Discount_Codes") {
            const valueEdit = {
              headerName: "",
              pinned: "right",
              field: "edit",
              suppressColumnsToolPanel: true,
              cellClass: [
                !permissionObject.Edit
                  ? "edit-icon-cell no-edit-permission"
                  : "edit-icon-cell",
              ],
              cellStyle: { cursor: "pointer" },
              cellRenderer: () =>
                `<img src=${EditIcon} style='height: 14px; width: 14px' alt='loading'/>`,
            };
            if (permissionObject.Edit) {
              gridFilterData.column_data.push(valueEdit);
            }
          }
          return gridFilterData;
        }
        return gridFilterData;
      })
      .catch((err: string) => {
        console.log(err);
      });

    return gridFilterData;
  }
  useEffect(() => {
    (async () => {
      const data = await getVendorList();
      setVendorList([...data]);
      if (data.length > 0) {
        setIsVendorList(true);
      } else {
        setIsVendorList(false);
      }
      vendorId = data.length ? data[0].key : "";
      setVendorId(vendorId);
      setVendorName(data.length ? data[0].label : "");
      setActive(data.length ? data[0].id : "");

      const localBranches = await getBranchList();
      console.log(localBranches);
      setBranchList([...localBranches]);
      const value = localBranches.length ? localBranches[0] : "";
      console.log(value);
      branchValue = value;
      setBranchValue({ ...value });

      // await getFilterData(
      //   data.length ? data[0].key : "",
      //   data.length ? data[0].label : ""
      // );

      //  let a = GetLanguage('PROFILE_NAME')
      // console.log(a)
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (vendorId && branchValue) {
        const data: any = await getFilterData();
        console.log(data);

        const columndata2 = await getModifiedColumnData(data);

        await setColumnData(columndata2);
      }
    })();
  }, [branchValue]);

  useEffect(() => {
    (async () => {
      if (vendorId && branchValue) {
        const info = {
          body: {
            branch_id:
              branchValue && typeof branchValue === "object"
                ? branchValue.id
                : branchValue,
            vendor_id: vendorId,
            vendor_name: vendorName,
            serverFilterOptions: apiFilterData || {},
          },
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            timezoneoffset: new Date().getTimezoneOffset(),
          },
          url: `${process.env.REACT_APP_API_URL}/${apiDataUrl}`,
        };
        setRequestInfo({ ...info });
      }
    })();
  }, [branchValue]);
  useEffect(() => {
    removeLocalStorage("requestInfo");
    (async () => {
      const modified: any = await getColumnFilterData(pageLabel.toLowerCase());
      setColumnData([...modified.column_data]);
      console.log(branchValue);

      // if (stateMaintain) {
      //  stateMaintain.headers.Authorization = "Bearer " + token;
      //  stateMaintain.body.is_repair =
      //    pageLabel === "Pricing" ? false : true;
      //  const request = stateMaintain;
      //  setRequestInfo({ ...request });
      //  //  setloading(false);
      // }
      console.log(branchValue);
    })();
  }, [pageLabel]);

  useEffect(() => {
    removeLocalStorage("globalSearch");
  }, [permissionObject]);

  const [pageName, setPageName] = useState<string>();
  useEffect(() => {
    if (pageLabel === "Pricing") {
      setPageName("Products");
    } else if (pageLabel === "Discount_Codes") {
      setPageName("Discount Codes");
    } else if (pageLabel === "Special_Pricing") {
      setPageName("Non Standard Pricing");
    } else if (pageLabel === "Organizations") {
      setPageName("Organizations");
    } else if (pageLabel === "Contacts") {
      setPageName("Contacts");
    }
  }, []);

  async function cellClicked(event: CellClickedEvent) {
    if (
      (pageLabel === "Pricing" || pageLabel === "Special_Pricing") &&
      event.colDef.field === "quantity"
    ) {
      const apiObject = {
        payload: apiData.params ? apiData.params : {},
        method: "GET",
        apiUrl: `${EndpointUrl.productsApi}/${event.data.id}?branch_id=${branchValue ? branchValue.id : ""}&vendor_id=${vendorId}&vendor_name=${vendorName}`,
        headers: {},
      };
      triggerApi(apiObject)
        .then(async (response: ApiResponse) => {
          if (response.result.success) {
            const gridFilterData = response.result.data;
            setModelGridData(gridFilterData);
            setOpenGridModel(true);
            const modelGridColumnData2 =
              await getModifiedColumnData(gridFilterData);
            setModelGridColumnData(modelGridColumnData2);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    } else if (event.colDef.field === "edit" && pageLabel === "Pricing") {
      const obj = {
        vendor_id: vendorId,
        vendor_name: vendorName,
        id: event.data.id,
        quantity_id: event.data.quantity_id,
      };
      setParamData(obj);
      setOpenAddRowModel(true);
    } else if (
      event.colDef.field === "edit" &&
      pageLabel === "Discount_Codes"
    ) {
      const obj = {
        vendor_id: vendorId,
        vendor_name: vendorName,
        id: event.data.id,
        quantity_id: event.data.quantity_id,
      };
      setParamData(obj);
      setOpenAddRowDiscountModel(true);
    }
  }

  // async function geUpdatedFilterData(vId?: string, vendorName?: string) {
  //  const apiObject = {
  //    payload: apiData.params ? apiData.params : {},
  //    method: 'GET',
  //    apiUrl: `${
  //      EndpointUrl.filterDataApi
  //    }?name=${pageLabel.toLowerCase()}&vendor_id=${
  //      vId ? vId : vendorId
  //    }&vendor_name=${vendorName}&branch_id=${
  //      branchValue ? branchValue.id : ''
  //    }`,
  //    headers: {},
  //  }

  //  await triggerApi(apiObject)
  //    .then(async (response: ApiResponse) => {
  //      if (response.result.success) {
  //        let gridFilterData = response.result.data
  //        apiFilterData = gridFilterData.filters
  //        setApiFilterData(apiFilterData)
  //      }
  //    })
  //    .catch((err: string) => {
  //      console.log(err)
  //    })

  //  return new Promise((resolve) => {
  //    resolve(columndata)
  //  })
  // }

  async function getBranchList2(vId: string, vendorName2: string) {
    let branches = [];
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${pageLabel === "Pricing" ? EndpointUrl.PricingBranches : EndpointUrl.DCBranches}?vendor_id=${vId}&vendor_name=${vendorName2}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response && response.result.success) {
          let bList = [];
          bList = response.result.data.list;
          setVendorId(vId);
          setVendorName(vendorName2);
          let list = [];
          list = bList.map((item: BranchListProps) => ({
            label: item.name,
            value: item.id,
            ...item,
          }));
          branches = list;
          setBranchList(branches);
          const bval = branchList.length ? branchList[0] : "";
          setBranchValue(bval);
          // let arr = await getFilterData(vId, vendorName);

          // console.log(arr);
          // const info = {
          //   body: {
          //     branch_id: bList.length ? bList[0].id : "",
          //     vendor_id: vId,
          //     vendor_name: vendorName2,
          //     serverFilterOptions: apiFilterData || {},
          //   },
          //   method: "GET",
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //     timezoneoffset: new Date().getTimezoneOffset(),
          //   },
          //   url: `${process.env.REACT_APP_API_URL}/${apiDataUrl}`,
          // };
          // SubscribeService.sendMessage(info);
          // // setLocalStorage('requestInfo', JSON.stringify(requestInfo))
          // // console.log(vendorId)
          // setRequestInfo({ ...info });

          setActive(vId);

          // setColumnData([])
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(branchList);
      }, 200);
    });
  }
  async function onItemClick(obj: SidenavProps) {
    setActive(obj.key);

    // const stateMaintain = await getPricingStateManagement(obj.key);
    // setStateMaintaindata(stateMaintain);
    // console.log(stateMaintain);
    // if (stateMaintain) {
    //  let arr = await geUpdatedFilterData(obj.key, obj.key);
    //  stateMaintain.headers.Authorization = "Bearer " + token;
    //  const request = stateMaintain;
    //  setRequestInfo({ ...request });
    //  setloading(false);
    // } else {
    await getBranchList2(obj.key, obj.label);
    // }
  }
  const [gridApi, setGridApi]: any = useState({});
  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    params.api.hideOverlay();
  };

  async function searchValue(e: string) {
    setSearchParam(e);

    if (e === "" || e.length > 2) {
      // setTimeout(() => {
      //  gridApi.purgeServerSideCache();
      // }, 1000);
      setPricingSearchValue(e);
      const info = {
        ...requestInfo,
      };
      info.searchkey = e;
      setRequestInfo({ ...info });
    }
  }

  async function fileSelect(e: any) {
    console.log(e, 123);
    if (e && e.type === "file_import") {
      await getVendorList();
      setVendorId(e.vendor_id ? e.vendor_id : vendorId);
      setVendorName(e.vendor_name);
      setBranchValue(e.branch_id ? e.branch_id : branchValue);
      await getBranchList2(e.vendor_id, e.vendor_name);
      setActive(e.vendor_id ? e.vendor_id : vendorId);
    } else {
      const pageNo: string = gridApi.paginationGetCurrentPage();
      setVendorId(e.vendor_id ? e.vendor_id : vendorId);
      setVendorName(e.vendor_name);
      setBranchValue(e.branch_id ? e.branch_id : branchValue);
      // getBranchList()
      setTimeout(() => {
        gridApi.refreshServerSideStore({ page: pageNo, purge: false });
      }, 500);
    }
  }
  async function getUploadEvent(e?: FileProps) {
    if (e && e.success) {
      setOpenGridModel(false);
    } else {
      setOpenGridModel(false);
    }
  }

  async function getAddRowDiscountEvent(e: FileProps) {
    const pageNo: string = gridApi.paginationGetCurrentPage();
    if (e.success) {
      setOpenAddRowDiscountModel(false);
      setPopupMessageShow(true);
      gridApi.refreshServerSideStore({ page: pageNo, purge: false });
    } else {
      setOpenAddRowDiscountModel(false);
    }
  }

  async function getEditPricing(e: any) {
    const pageNo: string = gridApi.paginationGetCurrentPage();

    if (e.success) {
      setOpenAddRowModel(false);
      setPopupMessageShow(true);
      gridApi.refreshServerSideStore({ page: pageNo, purge: false });
    } else {
      setOpenAddRowModel(false);
    }
  }

  function getUpdatedVendorList(keyword?: string) {
    let data: any = [];
    setVendorSpinner(true);
    if (keyword === "" || (keyword && keyword.length >= 3)) {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.PricingVendors}?status=true&search=${keyword}`,
        headers: {},
      };

      triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            setVendorSpinner(false);
            let { list } = response.result.data;
            list = list.map((item: any) => ({
              key: item.id,
              label: item.name,
              display: true,
              ...item,
            }));
            data = list;
            setVendorList(data);
            if (list.length > 0) {
              setActive(data.length ? data[0].id : "");
              setIsVendorList(true);
              getBranchList2(data[0].id, data[0].name);
            } else {
              setIsVendorList(false);
            }
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  }

  function valueChanged(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
    if (current.timer) clearTimeout(current.timer);
    current.timer = setTimeout(() => {
      getUpdatedVendorList(
        e.target.value ? encodeURIComponent(e.target.value) : ""
      );
    }, 1000);
  }
  function componentStateChanged() {
    const response = getLocalStorage("gridResponse") as string;
    const length = response ? JSON.parse(response).length : 0;
    setGridDataLength(length);
  }

  function clearSearch() {
    setVendorSpinner(true);
    setSearchValue("");
    getUpdatedVendorList("");
  }
  const triggerFilterEvent = (e: any) => {
    if (e.success && e.section === "pricing-filters") {
      const info = {
        body: {
          grid_name: "Repairs",
          branch_id: branchValue ? branchValue.id : "",
          vendor_id: vendorId,
          vendor_name: vendorName,
          serverFilterOptions: apiFilterData || {},
          selectedCustomFilters: e.selectedFilters,
        },
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          timezoneoffset: new Date().getTimezoneOffset(),
        },
        url: `${process.env.REACT_APP_API_URL}/${apiDataUrl}`,
        searchkey: searchParam || "",
      };
      setRequestInfo({ ...info });
      // setTimeout(() => {
      //  gridApi.purgeServerSideCache()
      // }, 1000)
    }
  };
  const triggerSelectedBranch = async (e: any) => {
    if (e) {
      setBranchValue(e);
      // const Info = {
      //   ...requestInfo,
      // };
      // requestInfo.body.branch_id = e.id;
      // setRequestInfo({ ...Info });
    }
  };
  const [opacity, setOpacity] = useState(false);
  async function triggerOpacity(e: boolean) {
    setOpacity(e);
  }
  return (
    <>
      {
        <Header>
          <PricingSecondaryLayout
            logo={pageLogo}
            data={pageLabel}
            searchEvent={(e: any) => searchValue(e)}
            onFileSelect={(e: any) => fileSelect(e)}
            gridRowCount={gridDataLength}
            branchList={branchList}
            requestInfo={requestInfo}
            sendEventData={triggerFilterEvent}
            vendorId={vendorId}
            vendorName={vendorName}
            branchValue={branchValue}
            selectBranch={triggerSelectedBranch}
            sendOpacity={(e: any) => triggerOpacity(e)}
          />
          {/* {props &&
          (pageLabel === 'Pricing' ||
            pageLabel === 'Discount_Codes') && (
            <div className="Selector-Branch">
              <PiSelect
                // label={piDropdownlabel}
                libraryType="atalskit"
                // name="select"
                //defaultValue={selectedBrnch}
                name={'branch'}
                className="select-branch-button"
                onChange={(e: any) => selectBranch(e)}
                value={branchValue}
                options={branchList}
                placeholder={'Select'}
                noOptionsMessage={() => {
                  return 'No Branches Found'
                }}
                //isDisabled={branchList.length > 1 ? false : true}
              />
            </div>
          )} */}
          <PiToast
            className={popupMessageShow ? "show" : ""}
            headerLabel={
              pageLabel === "Organizations" || pageLabel === "Contacts"
                ? "Created Successfully"
                : "Updated Successfully"
            }
            message=""
            onClose={async () => setPopupMessageShow(false)}
          />
        </Header>
      }
      <div>
        {openGridModel && (
          <ModelGrid
            data={modelGridData}
            onFileSelect={(e: any) => getUploadEvent(e)}
            ColumnData={modelGridColumnData}
          />
        )}

        {openAddRowDiscountModel && (
          <DiscountAddRowModel
            reqInfo={requestInfo}
            onFileSelect={(e: any) => getAddRowDiscountEvent(e)}
            paramData={paramData}
          />
        )}

        {openAddRowModel && (
          <PricingAddRowModel
            reqInfo={requestInfo}
            onFileSelect={(e: any) => getEditPricing(e)}
            paramData={paramData}
          />
        )}
      </div>

      <TableListContainer className="Body-Container">
        <SideMenuContainer>
          <div className="sideList-Search">
            <PiSearch
              libraryType="atalskit"
              onClear={() => clearSearch()}
              onValueChange={(e) => valueChanged(e)}
              placeholder="Search"
              value={SearchValue}
            />
          </div>

          <SideMenuList isActive={active} className="menu-list pricing">
            <div className="left-menu">
              <PiLeftMenu
                activeKey={active}
                onMenuClick={(e) => onItemClick(e)}
                options={vendorsList}
              />
              {!isVendorList && !vendorSpinner && (
                <NoVendorFound> Vendors Not Available</NoVendorFound>
              )}
              {vendorSpinner && (
                <SpinnerDiv style={{ height: "100%" }}>
                  <PiSpinner color="primary" size={30} libraryType="atalskit" />
                </SpinnerDiv>
              )}
            </div>
          </SideMenuList>
        </SideMenuContainer>

        <TableContainer
          className={opacity ? "opacity-on-load pointer-none" : ""}
        >
          <TableGrid>
            <>
              {opacity && (
                <SpinnerDiv
                  style={{ position: "absolute", left: "50%", zIndex: "999" }}
                >
                  <PiSpinner color="primary" size={50} libraryType="atalskit" />
                </SpinnerDiv>
              )}
              {isVendorList && (
                <div className="ag-theme-alpine ag-style">
                  <PiServerGrid2
                    columns={columndata}
                    mode="paginate"
                    searchValue={searchParam}
                    // serverFilterOptions={apiFilterData ? apiFilterData : {}}

                    onCellClicked={(e: CellClickedEvent) => cellClicked(e)}
                    onGridReady={onGridReady}
                    paginationPageSize={25}
                    requestInfo={requestInfo}
                    rowHeight={40}
                    cacheBlockSize={25}
                    sideBar={false}
                    onComponentStateChanged={() => componentStateChanged()}
                    // overlayLoadingTemplate={
                    //    '<span className="ag-overlay-loading-center">Please wait while your rows are loading...</span>'
                    //  }
                    overlayNoRowsTemplate={
                      pricingSearchValue &&
                      pricingSearchValue.length > 0 &&
                      pageLabel === "Discount_Codes"
                        ? "For the searched term, no discount code(s) are available"
                        : ShowsFilters
                          ? "Specified filter data not available"
                          : pricingSearchValue &&
                              pricingSearchValue.length > 0 &&
                              pageLabel === "Pricing"
                            ? "For the searched term, no product(s) are available"
                            : ShowsFilters
                              ? "Specified filter data not available"
                              : "The product(s) are not available"
                    }
                  />
                </div>
              )}
            </>
          </TableGrid>
          {!isVendorList && (
            <div className="no-data-found"> {pageName} Not Available</div>
          )}
        </TableContainer>
      </TableListContainer>
    </>
  );
}

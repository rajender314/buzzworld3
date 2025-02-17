import { useState, useEffect, useContext } from "react";
import { PiConfirmModel, PiServerGrid2, PiToast } from "pixel-kit";
import TableGrid from "@app/components/tablegrid/tablegrid";
import { token, triggerApi } from "@app/services/api-services";
import {
  TableListContainer,
  TableContainer,
  Header,
} from "@app/components/Admin layout/adminLayouts.component";
import { useHistory } from "react-router-dom";
import {
  ApiResponse,
  GridfilterData,
  ColumnHeaders,
  FilterColumnProps,
} from "@app/services/schema/schema";

import {
  GridReadyEvent,
  ITooltipParams,
  CellClickedEvent,
  RowClickedEvent,
} from "ag-grid-community";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
// import Snackbar from '@app/components/Snackbar/snackbar'
import EditModel from "@app/core/components/edit/edit";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import AccesssDenied from "@app/modules/access-denied/component";
import { AuthContext } from "@app/providers";

import {
  getPricingStateManagement,
  setPricingstateManagement,
} from "@app/helpers/helpers";
import QuoteStatusAppearance from "@app/core/components/gridStatus/quote-status-apperance";
import DateIcon from "@app/assets/images/date_picker_icon2.svg";
import AvatarIcon from "@app/assets/images/new_avatar.svg";
import VendorIcon from "@app/assets/images/vendor_logo.svg";
import EditIcon from "@app/assets/images/editicon.svg";
import RmaModel from "@app/components/rmaModel";
import AddRowModelBranches from "@app/components/admin-branches-regions-addrowmodel/admin-branches-regions-addrowmodel";

export default function AdminLayout({
  props,
  interactionData,
  sendAdminEvent,
}: any) {
  const [columndata, setColumnData] = useState([]);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [openRMAModel, setRMAModel] = useState(false);
  const [loading, setloading] = useState(true);
  const [paramData, setParamData] = useState({});
  const history = useHistory();
  const [permissionObject, setpermissionObject] = useState<any>({});
  const authcontextvalue = useContext(AuthContext);
  const [requestInfo, setRequestInfo]: any = useState({});
  const [popupMessageShow, setPopupMessageShow] = useState(false);
  const [editBranchModel, setEditBranchModel] = useState(false);
  const [adminSearchValue, setAdminSearchValue] = useState<any>();
  const [selectedStatus, setSelectedStatus] = useState<any>([]);
  const [columnApi, setcolumnApi]: any = useState();
  const [stateMaintaindata, setStateMaintaindata]: any = useState();
  const [apiFilterData, setApiFilterData]: any = useState([]);
  const [gridApi, setGridApi]: any = useState({});
  const [noDataMsg, setNoDataMsg] = useState("");

  const status = [
    { id: "true", name: "Active", value: "true", label: "Active" },
    { id: "false", name: "InActive", value: "true", label: "Active" },
  ];

  useEffect(() => {
    if (
      requestInfo &&
      requestInfo.body &&
      requestInfo.body.selectedCustomFilters &&
      requestInfo.body.selectedCustomFilters.status &&
      requestInfo.body.selectedCustomFilters.status.length > 0
    ) {
      setSelectedStatus(true);
    } else {
      setSelectedStatus(false);
    }
    console.log(requestInfo.searchkey);
    if (requestInfo && requestInfo.searchkey) {
      setAdminSearchValue(requestInfo.body.searchkey);
    } else {
      setAdminSearchValue("");
    }
  }, [requestInfo]);
  const [showSyncPopup, setshowSyncPopup] = useState<boolean>(false);
  function getOrgNameFilterData(params: Array<FilterColumnProps>) {
    let data = [];
    data = params ? params.map((obj: FilterColumnProps) => obj.name) : [];
    return data;
  }
  function getModifiedColumnData(columnData: GridfilterData) {
    columnData.column_data.map((obj: ColumnHeaders) => {
      // obj["width"] = 250;
      // obj["minWidth"] = 250;
      // obj["maxWidth"] = 700;
      const newObj = obj;

      if (
        permissionObject.Edit &&
        newObj.field === "account_type_mapped_with"
      ) {
        newObj.cellEditor = "makeSelector";
        // obj['editable'] = true
      } else {
        newObj.editable = false;
      }

      newObj.sortingOrder = ["asc", "desc"];
      // obj['editable'] = false
      newObj.enableServerSideSorting = true;
      newObj.enableServerSideFilter = true;
      newObj.sortable = true;
      newObj.resizable = true;
      newObj.filterParams = {};
      if (newObj.field === "status") {
        newObj.filterParams.values = ["Active", "InActive"];
      }

      if (newObj.field === "edit") {
        newObj.minWidth = 50;
        newObj.width = 50;
      } else {
        newObj.minWidth = 150;
        // obj['width'] = 250
      }

      if (newObj.field === "description") {
        newObj.minWidth = 250;
        newObj.width = 250;
      }
      if (newObj.field === "account_type_mapped_with") {
        newObj.minWidth = 140;
        newObj.width = 140;
        // obj['editable'] = true
      }

      if (
        newObj.field === "empty" ||
        newObj.field === "empty1" ||
        newObj.field === "empty2"
      ) {
        newObj.headerClass = "ag-emptyheaders";
        newObj.sortable = false;
        // obj['cellStyle'] = { background: 'whitesmoke', opacity: '0.5' }
      } else {
        newObj.headerClass = "ag-headers-padding-left";
      }

      newObj.suppressSizeToFit = false;
      newObj.filterParams.buttons = ["apply", "reset"];
      newObj.filterParams.closeOnApply = true;
      if (
        newObj.field === "business_phone" ||
        newObj.field === "mobile_phone"
      ) {
        newObj.headerClass = "ag-customHeader-number";
        newObj.cellStyle = {
          "text-align": "center",
        };
      }
      if (newObj.field === "status" && props.gridName === "Repairs") {
        newObj.cellClass = [
          "repairs-ag-status-cell-class",
          "ag-cell-padding-left",
        ];
        // obj["pinned"] = "right";

        newObj.cellRendererFramework = (params: any) =>
          QuoteStatusAppearance(params.value);
      } else if (newObj.field !== "edit") {
        newObj.headerClass = [
          "ag-customHeader-text",
          "ag-headers-padding-left",
        ];
        newObj.cellClass = ["ag-customCell-text", "ag-cell-padding-left"];
      }

      newObj.tooltipValueGetter = (params: ITooltipParams) => params.value;
      if (newObj.field === "owner_name") {
        // obj["filter"] = true;
        newObj.filterParams.values = getOrgNameFilterData(
          columnData.filters.owner_name
        );
      }
      if (props.gridName !== "Admin" && newObj.field === "status") {
        // obj["filter"] = true;
        newObj.filterParams.values = getOrgNameFilterData(
          columnData.filters.status
        );
      }
      if (newObj.field === "rma") {
        newObj.cellClass = ["ag-cell-padding-left", "repair_id_text_cell"];
      }
      if (
        newObj.field === "start_date" ||
        newObj.field === "end_date" ||
        newObj.field === "created_date"
      ) {
        newObj.cellStyle = { cursor: "pointer" };
        newObj.cellRenderer = (params: any) =>
          `<div class="cell-Icon-text"><img src=${DateIcon} alt='loading'/></div>` +
          `<div class="label">${params.value}</div>`;
      }
      if (newObj.field === "owner_name") {
        newObj.cellStyle = { cursor: "pointer" };
        newObj.cellRenderer = (params: any) =>
          `<div class="cell-Icon-text" ><img src=${AvatarIcon} alt='loading'/></div>` +
          `<div class="label">${params.value}</div>`;
      }
      if (newObj.field === "customer_name") {
        newObj.cellStyle = { cursor: "pointer" };
        newObj.cellRenderer = (params: any) =>
          `<div class="cell-Icon-text" ><img src=${VendorIcon} alt='loading'/></div>` +
          `<div class="label">${params.value}</div>`;
      }
      if (newObj.field === "status") {
        newObj.minWidth = 100;
        newObj.maxWidth = 150;
        newObj.cellRendererFramework = (params: any) =>
          QuoteStatusAppearance(params.value);
        // obj['pinned'] = 'right'
      }
      return newObj;
    });
    return columnData.column_data;
  }
  async function getFilterData() {
    const apiObject = {
      payload: props.apiData.params ? props.apiData.params : {},
      method: "GET",
      apiUrl: `${
        EndpointUrl.filterDataApi
      }?name=${props.pageLabel.toLowerCase()}`,
      headers: {},
    };

    await triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const stateMaintain = await getPricingStateManagement(
            props.pageLabel
          );

          setStateMaintaindata({ ...stateMaintain });

          const gridFilterData = response.result.data;
          let apiData: any;
          if (
            props.pageLabel === "Branches" ||
            props.pageLabel === "Regions" ||
            props.pageLabel === "Territory" ||
            props.pageLabel === "Zipcodes"
          ) {
            apiData = gridFilterData.filters;
          } else {
            apiData = {
              status,
            };
          }

          setApiFilterData(apiData);
          const valueEdit = {
            headerName: "",
            pinned: "right",
            field: "edit",

            onCellClicked(params: CellClickedEvent) {
              setParamData(params.data);
              if (
                props.pageLabel === "Branches" ||
                props.pageLabel === "Regions" ||
                props.pageLabel === "Territory" ||
                props.pageLabel === "Zipcodes"
              ) {
                setEditBranchModel(true);
              } else if (props.pageLabel !== "Branches") {
                setOpenEditModel(true);
              } else {
                setRMAModel(true);
              }
            },
            suppressColumnsToolPanel: true,
            cellClass: [
              !permissionObject.Edit
                ? "edit-icon-cell no-edit-permission"
                : "edit-icon-cell",
            ],
            cellStyle: { cursor: "pointer" },
            cellRenderer: () =>
              `<img src=${EditIcon}  alt='loading' style='height: 14px; width: 14px'/>`,
          };
          if (
            permissionObject.Edit &&
            props.pageLabel !== "Warehouse" &&
            props.pageLabel !== "product_class" &&
            props.pageLabel !== "product_category"
            // gridFilterData.column_data &&
            // props.gridName === 'Admin'
          ) {
            gridFilterData.column_data.push(valueEdit);
          }

          const columnData = getModifiedColumnData(gridFilterData);
          setColumnData(columnData);

          if (stateMaintain && stateMaintain.body) {
            stateMaintain.headers.Authorization = `Bearer ${token}`;
            const request = stateMaintain;
            setRequestInfo({ ...request });
            setloading(false);
          } else {
            const info = {
              body: {
                grid_name: "Repairs",
                serverFilterOptions: apiFilterData || {},
              },
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                timezoneoffset: new Date().getTimezoneOffset(),
              },
              url: `${process.env.REACT_APP_API_URL}/${props.apiDataUrl}`,
            };
            setRequestInfo({ ...info });
            // setSelectedStatus(requestInfo.body.selectedCustomFilters.status.length)
            setloading(false);
          }
        }
      })
      .catch(() => {});
  }
  const getNoRowaMsg = () => {
    console.log(requestInfo.searchkey);
    if (requestInfo.searchkey && requestInfo.searchkey.length > 0) {
      setNoDataMsg(
        `The ${props.displayLabel} that you are looking for is not available`
      );
    } else if (selectedStatus) {
      setNoDataMsg("Specified filter data not available");
    } else {
      setNoDataMsg(`The ${props.displayLabel} are not available`);
    }
  };

  useEffect(() => {
    getNoRowaMsg();
  }, [adminSearchValue, selectedStatus, props.displayLabel]);
  useEffect(() => {
    setRMAModel(false);
    (async () => {
      const permission: any = await getPermissionObject(
        window.location.pathname.substring(1)
      );
      setpermissionObject(permission);
    })();
  }, [authcontextvalue]);

  useEffect(() => {
    setRMAModel(false);
    (async () => {
      if (permissionObject.View) {
        await getFilterData();
      } else {
        setloading(false);
      }
    })();
  }, [authcontextvalue, permissionObject]);

  useEffect(() => {
    if (permissionObject.View) {
      const obj = {
        ...requestInfo,
      };
      sendAdminEvent(obj);
    }
    // console.log(requestInfo.body.selectedCustomFilters.status.length, 87878);
  }, [requestInfo]);
  function triggerEvent(e: any) {
    let info: any;
    if (e.success) {
      setTimeout(() => {
        gridApi.refreshServerSideStore({ page: "2", purge: false });
      }, 500);
    } else if (e && e.filters === "regionFilters") {
      info = {
        body: {
          grid_name: "Repairs",
          serverFilterOptions: apiFilterData || {},
          selectedCustomFilters: e.selectedFilters,
        },
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          timezoneoffset: new Date().getTimezoneOffset(),
        },
        url: `${process.env.REACT_APP_API_URL}/${props.apiDataUrl}`,
        searchkey: stateMaintaindata ? stateMaintaindata.searchkey : "",
      };
      setRequestInfo({ ...info });
      setloading(false);
      const params = {
        grid_name: props.pageLabel,
        data: info,
        pageNo: gridApi.paginationGetCurrentPage(),
        columnsStateData: columnApi.getColumnState(),
      };
      setPricingstateManagement(params);
    } else if (e && e.filters === "zipcodeFilters") {
      info = {
        body: {
          grid_name: "Repairs",
          serverFilterOptions: apiFilterData || {},
          selectedCustomFilters: e.selectedFilters,
        },
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          timezoneoffset: new Date().getTimezoneOffset(),
        },
        url: `${process.env.REACT_APP_API_URL}/${props.apiDataUrl}`,
        searchkey: stateMaintaindata ? stateMaintaindata.searchkey : "",
      };
      setRequestInfo({ ...info });
      setloading(false);
      const params = {
        grid_name: props.pageLabel,
        data: info,
        pageNo: gridApi.paginationGetCurrentPage(),
        columnsStateData: columnApi.getColumnState(),
      };
      setPricingstateManagement(params);
    } else if (e && e.filters === "statusFilters") {
      info = {
        body: {
          grid_name: "Repairs",
          serverFilterOptions: {
            status: [
              { id: "true", name: "Active" },
              { id: "false", name: "InActive" },
            ],
          },
          selectedCustomFilters: e.selectedFilters,
        },
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          timezoneoffset: new Date().getTimezoneOffset(),
        },
        url: `${process.env.REACT_APP_API_URL}/${props.apiDataUrl}`,
        searchkey: stateMaintaindata ? stateMaintaindata.searchkey : "",
      };
      setRequestInfo({ ...info });
      setloading(false);
      const params = {
        grid_name: props.pageLabel,
        data: info,
        pageNo: gridApi.paginationGetCurrentPage(),
        columnsStateData: columnApi.getColumnState(),
      };
      setPricingstateManagement(params);
    }
    const obj = {
      ...info,
    };
    obj.searchkey = stateMaintaindata ? stateMaintaindata.searchkey : "";

    setTimeout(() => {
      sendAdminEvent(obj);
    }, 2000);
  }
  useEffect(() => {
    (async () => {
      if (interactionData && !loading) {
        // getGridData(e);
        if (
          interactionData.searchValue === "" ||
          (interactionData.searchValue &&
            interactionData.searchValue.length > 1)
        ) {
          // setLocalStorage('globalSearch', interactionData.searchValue)
          // setTimeout(() => {
          //  gridApi.refreshServerSideStore({ page: '2', purge: false })
          // }, 1000)
          const info = {
            ...requestInfo,
          };

          info.searchkey = interactionData.searchValue;
          setRequestInfo({ ...info });
          setAdminSearchValue(info.searchkey);

          const params = {
            grid_name: props.pageLabel,
            data: info,
            pageNo: gridApi.paginationGetCurrentPage(),
            columnsStateData: columnApi.getColumnState(),
          };
          setPricingstateManagement(params);
        } else {
          const statedata = await getPricingStateManagement(props.pageLabel);
          setStateMaintaindata({ ...statedata });
          if (statedata) {
            statedata.headers.Authorization = `Bearer ${token}`;
          }
          triggerEvent(interactionData);
        }
        // if (props.routeInputs.success) {
        //  setTimeout(() => {
        //    gridApi.refreshServerSideStore({ page: '2', purge: false })
        //  }, 1000)

        // }
      }
    })();
  }, [interactionData]);

  useEffect(() => {
    if (
      interactionData &&
      interactionData.sync &&
      props.pageLabel === interactionData.flag
    ) {
      // getFilterData()

      setTimeout(() => {
        gridApi.refreshServerSideStore({ page: "2", purge: false });
      }, 1000);
    }
  }, [interactionData]);

  // useEffect(() => {
  //  removeLocalStorage('globalSearch')
  // }, [permissionObject])

  const getRowClass = () => {
    if (props.gridName !== "Admin") {
      return "agrow-cursor-pointer";
    }
    return true;
  };

  // useEffect(() => {
  //   if (columnApi && stateMaintaindata && stateMaintaindata.columnsStateData) {
  //     console.log(stateMaintaindata, 123);
  //     columnApi.applyColumnState({
  //       state: stateMaintaindata.columnsStateData,
  //       applyOrder: true,
  //     });
  //   }
  // }, [columnApi, stateMaintaindata]);

  const onGridReady = async (params: GridReadyEvent) => {
    setGridApi(params.api);
    setcolumnApi(params.columnApi);
  };

  async function getEditModelEvent(e: any) {
    if (e.success) {
      setPopupMessageShow(true);
      setTimeout(() => {
        setOpenEditModel(false);
        gridApi.refreshServerSideStore({ page: 2, purge: false });
      }, 500);
    } else {
      setOpenEditModel(false);
    }
  }

  async function getRmaModelEvent() {
    setRMAModel(false);
  }

  const rowClicked = (e: RowClickedEvent) => {
    if (props.gridName === "Repairs") {
      history.push(`/repair-request/${e.data.id}`);
    }
  };

  function dragStopped(e: any) {
    const params = {
      grid_name: props.pageLabel,
      data: {
        ...requestInfo,
        pageNo: e.api.paginationGetCurrentPage(),
        searchkey: interactionData ? interactionData.searchValue : "",
        columnsStateData: e.columnApi.getColumnState(),
      },
    };
    setPricingstateManagement(params);
  }
  async function editBranchesEvent(e: any) {
    if (e && e.success) {
      setPopupMessageShow(true);

      setTimeout(() => {
        gridApi.refreshServerSideStore({ page: 2, purge: false });
        setEditBranchModel(false);
      }, 500);
    } else if (e && e.closeModel) {
      setEditBranchModel(false);
    }
  }

  return (
    <>
      <Header>
        {/* {Object.keys(permissionObject).length > 0 &&
          permissionObject["View"] && ( */}
        {/* <StaticSecondaryHeader
          logo={props.pageLogo}
          data={props.pageLabel}
          searchEvent={searchValue}
          gridData={(data: Array<AddProps>) => setRowData(data)}
          props={props}
          sendEventData={triggerEvent}
          requestInfo={requestInfo}
        ></StaticSecondaryHeader> */}
        {/* )} */}

        {openEditModel && (
          <EditModel
            onChildClick={(e: any) => getEditModelEvent(e)}
            paramData={paramData}
            // gridData={(data: Array<EditProps>) => setRowData(data)}
            props={props}
          />
        )}
        {editBranchModel && (
          <AddRowModelBranches
            sendEventData={(e: any) => editBranchesEvent(e)}
            paramData={paramData}
            props={props}
          />
        )}
        {openRMAModel && (
          <RmaModel
            paramData={paramData}
            sendModelData={() => getRmaModelEvent()}
          />
        )}
        <PiToast
          className={popupMessageShow ? "show" : ""}
          headerLabel={props.displayLabel || props.pageLabel}
          message="Updated Successfully"
          onClose={async () => setPopupMessageShow(false)}
        />
      </Header>
      <TableListContainer>
        {/* <SideMenuContainer>
          <SideMenuList isActive={active} className="active menu-list">
            <PiLeftMenu
              activeKey={activated}
              onMenuClick={(e) => onItemClick(e)}
              options={sidemenuList}
            />
          </SideMenuList>
        </SideMenuContainer> */}
        <TableContainer>
          {Object.keys(permissionObject).length > 0 &&
            permissionObject.View && (
              <TableGrid>
                {
                  <div className="ag-theme-alpine ag-style">
                    <PiServerGrid2
                      getRowClass={getRowClass}
                      columns={columndata}
                      mode="paginate"
                      paginationPageSize={25}
                      cacheBlockSize={25}
                      onGridReady={(e: GridReadyEvent) => onGridReady(e)}
                      pagination
                      requestInfo={requestInfo}
                      onDragStopped={(e: any) => dragStopped(e)}
                      sideBar={false}
                      hiddenByDefault
                      onRowClicked={rowClicked}
                      rowHeight={40}
                      // overlayNoRowsTemplate={`<span className="ag-overlay-loading-center no-data-styles"> The ${props.displayLabel} that you are looking for is not available  </span>`}
                      overlayNoRowsTemplate={noDataMsg}
                      // overlayNoRowsTemplate={
                      //   adminSearchValue && adminSearchValue.length > 0
                      //     ? `The ${props.displayLabel} that you are looking for is not available `
                      //     : selectedStatus
                      //       ? "Specified filter data not available"
                      //       : `The ${props.displayLabel} are not available`
                      // }
                    />
                  </div>
                }
              </TableGrid>
            )}
          {Object.keys(permissionObject).length > 0 &&
            !permissionObject.View && <AccesssDenied />}
        </TableContainer>
        {/* )} */}
        {/* </>
        )} */}
      </TableListContainer>
      {showSyncPopup && (
        <PiConfirmModel
          className={showSyncPopup ? "show show text-red" : ""}
          headerLabel="Syncing"
          message=""
          // secondaryBtnLabel={"Close"}
          onClose={async () => {
            setshowSyncPopup(false);
          }}
        />
      )}
    </>
  );
}

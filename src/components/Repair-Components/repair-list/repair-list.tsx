/* eslint-disable no-nested-ternary */
import { useCallback, useEffect, useState } from "react";
import {
  TableListContainer,
  SideMenuContainer,
  TableContainer,
  Header,
} from "@app/components/Admin layout/adminLayouts.component";
import SideMenuList from "@app/components/sidelist/sidelist";
import { PiLeftMenu, PiServerGrid2 } from "pixel-kit";
import { SidenavProps } from "@app/services/schema/schema";
import { useHistory } from "react-router-dom";
import TableGrid from "@app/components/tablegrid";
import {
  getLocalStorage,
  removeLocalStorage,
} from "@app/core/localStorage/localStorage";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import {
  allowAutoResizeColumns,
  autoSizeAll,
  getColumnFilterData,
  getPricingStateManagement,
  setPricingstateManagement,
} from "@app/helpers/helpers";
import { token } from "@app/services";
import {
  GridReadyEvent,
  RowClickedEvent,
  ColumnVisibleEvent,
} from "ag-grid-community";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import AccesssDenied from "@app/modules/access-denied/component";
import { RepairStatuses } from "@app/modules/organisations/component/organisationRenderdata";
import RepairSecondaryHeader from "./repairs-secondary-header";

export default function RepairsList({
  sideNavData,
  pageLabel,
  gridName,
  routeLabel,
  props,
}: any) {
  // const { sideNavData, pageLabel, gridName, routeLabel } = props;
  const history = useHistory();
  const [activated, setActivated] = useState(pageLabel);
  const [active, setActive] = useState(pageLabel);
  const [requestInfo, setRequestInfo]: any = useState({});
  const [sidemenuList, setSideMenuList] = useState(sideNavData);
  const [loading, setloading] = useState(true);
  const [columndata, setColumnData] = useState([]);
  const [repairSearchValue, setrepairSearchValue] = useState<any>();
  const [ShowsFilters, setShowsFilters] = useState<any>();
  const [columnApi, setcolumnApi]: any = useState();
  const [permissionObject, setpermissionObject] = useState<any>({});
  const localStorageData = getLocalStorage("userPermission");
  const [repairStatusesSideList, RepairStatusesSideList] =
    useState(RepairStatuses);
  useEffect(() => {
    setActivated(window.location.pathname.substring(1));
  }, []);
  useEffect(() => {
    setrepairSearchValue(repairSearchValue);
  }, []);
  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("repair-request");
      setpermissionObject(permission);
    })();
  }, [localStorageData]);
  const gridRequestParams = useCallback(() => {
    const info = {
      body: {
        grid_name: gridName,
        serverFilterOptions: {},
        repair_type: pageLabel,
      },
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        timezoneoffset: new Date().getTimezoneOffset(),
      },
      url: `${process.env.REACT_APP_API_URL}/${EndpointUrl.rmaRequest}`,
    };
    setRequestInfo({ ...info });
    setloading(false);
  }, [gridName]);
  const [filterApiData, setfilterApiData]: any = useState();
  const [stateMaintaindata, setStateMaintaindata]: any = useState();
  const [allowAutoResize, setAllowAutoResize]: any = useState(false);

  useEffect(() => {
    if (columnApi && allowAutoResize) {
      setTimeout(() => {
        autoSizeAll(columnApi);
      }, 2000);
    }
  }, [columnApi, allowAutoResize]);
  useEffect(() => {
    removeLocalStorage("globalSearch");
    removeLocalStorage("requestInfo");
    (async () => {
      const modified: any = await getColumnFilterData(pageLabel);
      const filterApi = modified;
      setfilterApiData(filterApi);
      setColumnData(modified?.column_data);

      const stateMaintain = await getPricingStateManagement(pageLabel);
      setStateMaintaindata(stateMaintain);
      if (stateMaintain && stateMaintain.body) {
        stateMaintain.headers.Authorization = `Bearer ${token}`;

        setrepairSearchValue(stateMaintain.searchkey);
        if (pageLabel !== "repair_request" && pageLabel !== "my_repairs") {
          stateMaintain.body.is_checked = "";
        }
        stateMaintain.body.repair_type = pageLabel;
        const request = stateMaintain;
        setRequestInfo({ ...request });

        setloading(false);
      } else {
        gridRequestParams();
      }
    })();
  }, [gridRequestParams, pageLabel]);

  useEffect(() => {
    let userPerm: any = getLocalStorage("userPermission");
    userPerm = userPerm ? JSON.parse(userPerm) : null;
    const tifOptions: any = [];
    if (userPerm) {
      Object.keys(userPerm.permissions).forEach((key) => {
        tifOptions.push(userPerm.permissions[key]);
      });
      sideNavData.map((obj: any) => {
        // if (permissionObject["None"]) {
        //  obj.display = false;
        // } else {
        //  obj.display = true;
        // }

        if (permissionObject.None) {
          obj.display = false;
        } else {
          obj.display = true;
          if (
            obj.key === "my-repairs" &&
            (userPerm.user_role === "repair_technician" ||
              userPerm.user_role === "repair_manager")
          ) {
            obj.display = true;
          } else if (
            obj.key === "my-repairs" &&
            (userPerm.user_role !== "repair_technician" ||
              userPerm.user_role !== "repair_manager")
          ) {
            obj.display = false;
          }
        }

        return obj;
      });
      setSideMenuList([...sideNavData]);
    }
  }, [permissionObject]);

  useEffect(() => {
    let userPerm: any = getLocalStorage("userPermission");
    userPerm = userPerm ? JSON.parse(userPerm) : null;

    const tifOptions: any = [];
    if (userPerm) {
      Object.keys(userPerm.permissions).forEach((key) => {
        tifOptions.push(userPerm.permissions[key]);
      });
      console.log(tifOptions);
      repairStatusesSideList.map((obj: any) => {
        if (permissionObject.None) {
          obj.display = false;
        } else {
          obj.display = true;
        }
        return obj;
      });
      console.log(repairStatusesSideList, 1533);

      RepairStatusesSideList([...repairStatusesSideList]);
    }
  }, [permissionObject]);

  function onItemClick(obj: SidenavProps) {
    console.log(obj);
    setActivated(obj.key);
    setActive(obj.key);
    history.push(`/${obj.key}`);
  }
  // let gridEvent: GridReadyEvent
  const [gridApi, setGridApi]: any = useState({});
  const onGridReady = async (params: GridReadyEvent) => {
    // setReady(false);
    // gridEvent = params
    // console.log(gridEvent)
    setGridApi(params.api);
    setcolumnApi(params.columnApi);
    // if(loading){
    //   gridEvent.api.showLoadingOverlay()
    // }
    // if (!rowData) {
    //  gridEvent.api.showNoRowsOverlay()
    // }

    // gridEvent.api.showLoadingOverlay()
    // // params.api.purgeServerSideCache([]);
    // params.api.showLoadingOverlay()
    // setTimeout(() => {
    //   gridEvent.api.hideOverlay()
    // }, 500);
  };
  useEffect(() => {
    if (
      requestInfo &&
      requestInfo.body &&
      requestInfo.body.selectedCustomFilters &&
      (requestInfo.body.selectedCustomFilters.status.length ||
        requestInfo.body.selectedCustomFilters.customer_name.length ||
        requestInfo.body?.selectedCustomFilters.technician?.length)
    ) {
      setShowsFilters(true);
    }
  }, [requestInfo]);
  useEffect(() => {
    if (columnApi && stateMaintaindata && stateMaintaindata.columnsStateData) {
      setAllowAutoResize(
        allowAutoResizeColumns(stateMaintaindata.columnsStateData)
      );

      if (!allowAutoResize) {
        console.log(columnApi);
        columnApi.applyColumnState({
          state: stateMaintaindata.columnsStateData,
          applyOrder: true,
        });
      }
    }
  }, [columnApi, stateMaintaindata, allowAutoResize]);

  const rowClicked = (e: RowClickedEvent) => {
    if (gridName === "Repairs") {
      // history.push("/repair-request/" + e.data.id);
      history.push(`/${routeLabel}/${e.data.id}`);
    }
  };
  const getRowClass = () => "agrow-cursor-pointer";
  function dragStopped(e: any) {
    const params = {
      grid_name: pageLabel,
      repair_type: pageLabel,
      data: {
        ...requestInfo,
        repair_type: pageLabel,
        pageNo: e.api.paginationGetCurrentPage(),
        columnsStateData: e.columnApi.getColumnState(),
      },
    };
    setPricingstateManagement(params);
  }
  const sortChanged = (e: any) => {
    if (Object.keys(requestInfo).length) {
      const params = {
        grid_name: pageLabel,
        repair_type: pageLabel,
        data: {
          ...requestInfo,
          repair_type: pageLabel,
          pageNo: e.api.paginationGetCurrentPage(),
          columnsStateData: e.columnApi.getColumnState(),
        },
      };

      setPricingstateManagement(params);
    }
  };

  async function triggerEvent(e: any) {
    const stateMaintain = await getPricingStateManagement(pageLabel);
    setStateMaintaindata({ ...stateMaintain });
    if (
      e.success &&
      (e.searchValue === "" || (e.searchValue && e.searchValue.length > 2))
    ) {
      setrepairSearchValue(e.searchValue);

      const info = {
        ...requestInfo,
      };
      info.searchkey = e.searchValue;
      setRequestInfo({ ...info });

      const params = {
        grid_name: pageLabel.toLowerCase(),
        repair_type: pageLabel,
        data: {
          ...info,
          repair_type: pageLabel,
          pageNo: gridApi ? gridApi.paginationGetCurrentPage() : 0,
          columnsStateData: columnApi ? columnApi.getColumnState() : null,
        },
      };
      setPricingstateManagement(params);
    }
    if (e.success && e.section === "repair-filters") {
      const info = {
        body: {
          grid_name: "Repairs",
          repair_type: pageLabel,
          is_checked: e.isAllItemSDisplay ? "checked" : "",
          serverFilterOptions: filterApiData ? filterApiData.filters : {},
          selectedCustomFilters: e.selectedFilters,
        },
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          timezoneoffset: new Date().getTimezoneOffset(),
        },
        url: `${process.env.REACT_APP_API_URL}/${EndpointUrl.rmaRequest}`,
        searchkey: stateMaintain ? stateMaintain.searchkey : "",
      };
      setRequestInfo({ ...info });
      setloading(false);

      const params = {
        grid_name: pageLabel.toLowerCase(),
        repair_type: pageLabel,
        data: info,
        pageNo: gridApi ? gridApi.paginationGetCurrentPage() : 0,
        columnsStateData: columnApi ? columnApi.getColumnState() : null,
      };
      params.data = {
        ...params.data,
      };
      setPricingstateManagement(params);
    }
  }
  const columnsVisible = (e: ColumnVisibleEvent) => {
    const arr = e.columnApi.getColumnState();
    const arr2 = arr.filter((obj: any) => obj.hide === false);
    if (arr2.length !== 0) {
      sortChanged(e);
    }
  };

  return (
    <>
      <Header>
        <RepairSecondaryHeader
          requestInfo={requestInfo}
          sendEventData={(e: any) => triggerEvent(e)}
          pageLabel={props && pageLabel ? pageLabel : ""}
        />
      </Header>
      <TableListContainer>
        <SideMenuContainer>
          <SideMenuList
            isActive={active}
            className={
              permissionObject.None
                ? "active menu-list  "
                : "active menu-list repairs-div"
            }
          >
            <PiLeftMenu
              activeKey={activated}
              onMenuClick={(e) => onItemClick(e)}
              options={sidemenuList}
            />

            {!permissionObject.None && (
              <div
                style={{
                  margin: "12px 0 12px 18px",
                  fontWeight: "600",
                  color: "#6D7992",
                }}
              >
                Statuses
              </div>
            )}
            <PiLeftMenu
              activeKey={activated}
              onMenuClick={(e) => onItemClick(e)}
              options={RepairStatuses}
            />
          </SideMenuList>
        </SideMenuContainer>
        <TableContainer>
          <TableGrid>
            {Object.keys(permissionObject).length > 0 &&
              permissionObject.View && (
                <div className="ag-theme-alpine ag-style">
                  <PiServerGrid2
                    getRowClass={getRowClass}
                    columns={columndata}
                    mode="paginate"
                    paginationPageSize={25}
                    cacheBlockSize={25}
                    onGridReady={(e: GridReadyEvent) => onGridReady(e)}
                    pagination
                    rowHeight={40}
                    onColumnVisible={(e: any) => columnsVisible(e)}
                    onRowClicked={(e: any) => rowClicked(e)}
                    onDragStopped={(e: any) => dragStopped(e)}
                    onSortChanged={sortChanged}
                    requestInfo={requestInfo}
                    sideBar={false}
                    overlayNoRowsTemplate={
                      repairSearchValue && repairSearchValue.length > 0
                        ? "For the searched term, no repair(s) available"
                        : ShowsFilters
                          ? "Specified filter data not available"
                          : "The Repair(s) are not avilable"
                    }
                  />
                </div>
              )}
          </TableGrid>
          {Object.keys(permissionObject).length > 0 &&
            !loading &&
            !permissionObject.View && <AccesssDenied />}
        </TableContainer>
        {/* )} */}
        {/* </>
        )} */}
      </TableListContainer>
    </>
  );
}

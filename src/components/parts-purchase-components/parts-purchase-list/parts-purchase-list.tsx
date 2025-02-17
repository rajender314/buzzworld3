/* eslint-disable no-nested-ternary */
import { Fragment, useEffect, useState } from "react";
import {
  TableListContainer,
  SideMenuContainer,
  TableContainer,
  Header,
} from "@app/components/Admin layout/adminLayouts.component";
import StaticSecondaryHeader from "@app/components/static-secondaryheader";
import { SidenavProps } from "@app/services/schema/schema";
import PartsPurchase from "@app/assets/images/partsPurchase.svg";
import SideMenuList from "@app/components/sidelist/sidelist";
import { PiLeftMenu, PiServerGrid2 } from "pixel-kit";
import TableGrid from "@app/components/tablegrid/tablegrid";
import { GridReadyEvent, RowClickedEvent } from "ag-grid-community";
import { useHistory } from "react-router-dom";
import { getLocalStorage } from "@app/core/localStorage/localStorage";
import { token } from "@app/services/api-services";
import {
  getColumnFilterData,
  getPricingStateManagement,
  setPricingstateManagement,
} from "@app/helpers/helpers";

import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import AccesssDenied from "@app/modules/access-denied/component";
import { PartsPurchaseStatuses } from "@app/modules/organisations/component/organisationRenderdata";

export default function PartsPurchaseList({
  sideNavData,
  pageLabel,
  props,
}: any) {
  const [sideMenuList, setSideMenuList] = useState(sideNavData);
  const [activated, setActivated] = useState(pageLabel);
  const [active, setActive] = useState(pageLabel);
  const [columndata, setColumnData] = useState([]);
  const history = useHistory();
  const [requestInfo, setRequestInfo]: any = useState({});
  const [filterApiData, setfilterApiData]: any = useState();
  const [columnApi, setcolumnApi]: any = useState();
  const [partSearchValue, setPartSearchValue] = useState<any>();
  const [ShowsFilters, setShowsFilters] = useState<any>();
  const [permissionObject, setpermissionObject] = useState<any>({});
  const localStorageData = getLocalStorage("userPermission");
  const [ppStatusList, setPPStatusList] = useState(PartsPurchaseStatuses);
  const [gridApi, setGridApi]: any = useState({});
  function gridRequestParams() {
    const info = {
      body: {
        grid_name: "Repairs",
        serverFilterOptions: {},
        part_purchase_type: pageLabel,
      },
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        timezoneoffset: new Date().getTimezoneOffset(),
      },
      url: `${process.env.REACT_APP_API_URL}/${EndpointUrl.PartsPurchaseListData}`,
    };
    setRequestInfo({ ...info });
  }
  useEffect(() => {
    setActivated(window.location.pathname.substring(1));
  }, []);
  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("part-purchase");
      setpermissionObject(permission);
    })();
  }, [localStorageData]);
  useEffect(() => {
    (async () => {
      const modified: any = await getColumnFilterData("parts_purchase");

      setColumnData(modified.column_data);
      const filterApi = modified;
      setfilterApiData(filterApi);

      const stateMaintain = await getPricingStateManagement(pageLabel);
      if (stateMaintain && stateMaintain.body) {
        stateMaintain.headers.Authorization = `Bearer ${token}`;
        stateMaintain.body.part_purchase_type = pageLabel;
        const request = stateMaintain;
        setRequestInfo({ ...request });
      } else {
        gridRequestParams();
      }
    })();
  }, [pageLabel]);
  useEffect(() => {
    if (
      requestInfo &&
      requestInfo.body &&
      requestInfo.body.selectedCustomFilters &&
      ((requestInfo.body.selectedCustomFilters.sales_person_id &&
        requestInfo.body.selectedCustomFilters.sales_person_id.length) ||
        (requestInfo.body.selectedCustomFilters &&
          requestInfo.body.selectedCustomFilters.status &&
          requestInfo.body.selectedCustomFilters.status.length) ||
        (requestInfo.body.selectedCustomFilters &&
          requestInfo.body.selectedCustomFilters.branch_id &&
          requestInfo.body.selectedCustomFilters.branch_id.length) ||
        (requestInfo.body.selectedCustomFilters &&
          requestInfo.body.selectedCustomFilters.sales_manager_id &&
          requestInfo.body.selectedCustomFilters.sales_manager_id.length))
    ) {
      setShowsFilters(true);
    }
  }, [requestInfo]);

  useEffect(() => {
    let userPerm: any = getLocalStorage("userPermission");
    userPerm = userPerm ? JSON.parse(userPerm) : null;
    const tifOptions: any = [];
    if (userPerm) {
      Object.keys(userPerm.permissions).forEach((key) => {
        tifOptions.push(userPerm.permissions[key]);
      });
      sideNavData.map((obj: any) => {
        if (permissionObject.None) {
          obj.display = false;
        } else {
          obj.display = true;
        }
        return obj;
      });
      setSideMenuList([...sideNavData]);

      ppStatusList.map((obj: any) => {
        if (permissionObject.None) {
          obj.display = false;
        } else {
          obj.display = true;
        }
        return obj;
      });
      console.log(ppStatusList, 1533);

      setPPStatusList([...ppStatusList]);
    }
  }, [permissionObject]);
  async function triggerEvent(e: any) {
    const stateMaintain = await getPricingStateManagement(pageLabel);
    if (e === "" || e.length > 2) {
      setPartSearchValue(e);
      const info = {
        ...requestInfo,
      };
      info.searchkey = e;
      setRequestInfo({ ...info });
      const params = {
        grid_name: pageLabel.toLowerCase(),
        data: info,
      };
      params.data = {
        ...params.data,
        columnsStateData: columnApi.getColumnState(),
        pageNo: gridApi.paginationGetCurrentPage(),
      };
      setPricingstateManagement(params);
    }
    if (e.success && e.section === "purchase-filters") {
      const info = {
        body: {
          grid_name: "Repairs",
          part_purchase_type: pageLabel,
          serverFilterOptions: filterApiData ? filterApiData.filters : {},
          selectedCustomFilters: e.selectedFilters,
        },
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          timezoneoffset: new Date().getTimezoneOffset(),
        },
        url: `${process.env.REACT_APP_API_URL}/${EndpointUrl.PartsPurchaseListData}`,
        searchkey: stateMaintain ? stateMaintain.searchkey : "",
      };
      setRequestInfo({ ...info });

      const params = {
        grid_name: pageLabel.toLowerCase(),
        data: {
          ...info,
          repair_type: pageLabel,
          pageNo: gridApi ? gridApi.paginationGetCurrentPage() : 0,
          columnsStateData: columnApi ? columnApi.getColumnState() : null,
        },
      };
      setPricingstateManagement(params);
    }
  }
  async function searchValue(e: string) {
    setPartSearchValue(e);
    await triggerEvent(e);
  }

  function getApistatus() {}
  function onItemClick(obj: SidenavProps) {
    setActivated(obj.key);
    setActive(obj.key);
    history.push(`/${obj.key}`);
  }

  const getRowClass = () => "agrow-cursor-pointer";

  const onGridReady = async (params: GridReadyEvent) => {
    setGridApi(params.api);
    setcolumnApi(params.columnApi);
  };
  const rowClicked = (e: RowClickedEvent) => {
    if (pageLabel === "partspurchase") {
      history.push(`/parts-purchase-detail-view/${e.data.id}`);
    } else {
      history.push(`/${pageLabel}/${e.data.id}`);
    }
  };
  function dragStopped(e: any) {
    const params = {
      grid_name: pageLabel,
      data: {
        ...requestInfo,
        pageNo: e.api.paginationGetCurrentPage(),
        columnsStateData: e.columnApi.getColumnState(),
      },
    };
    setPricingstateManagement(params);
  }
  function sortChanged(e: any) {
    dragStopped(e);
  }

  return (
    <>
      <Header>
        <StaticSecondaryHeader
          logo={PartsPurchase}
          data="PartsPrachase"
          searchEvent={(e: any) => searchValue(e)}
          props={props}
          sendEventData={(e: any) => triggerEvent(e)}
          sendPartsPurchaseData={() => getApistatus()}
          gridInfo={requestInfo}
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
            {/* <PiLeftMenu
              activeKey={"all_requests"}
              onMenuClick={(e) => onItemClick(e)}
              options={sideMenuList}
            /> */}

            <PiLeftMenu
              activeKey={activated}
              onMenuClick={(e) => onItemClick(e)}
              options={sideMenuList}
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
              options={PartsPurchaseStatuses}
            />
          </SideMenuList>
        </SideMenuContainer>
        {/* {loading && <Loader />} */}
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
                    onRowClicked={rowClicked}
                    onDragStopped={(e: any) => dragStopped(e)}
                    onSortChanged={(e: any) => sortChanged(e)}
                    onGridReady={(e: GridReadyEvent) => onGridReady(e)}
                    pagination
                    rowHeight={40}
                    sideBar={false}
                    requestInfo={requestInfo}
                    overlayNoRowsTemplate={
                      partSearchValue && partSearchValue.length > 0
                        ? "For the searched term, no part(s) purchase request(s) are available"
                        : ShowsFilters
                          ? "Specified filter data not available"
                          : "The part purchase request(s) are not available"
                    }
                  />
                </div>
              )}
          </TableGrid>
          {Object.keys(permissionObject).length > 0 &&
            !permissionObject.View && <AccesssDenied />}
        </TableContainer>
      </TableListContainer>
    </>
  );
}

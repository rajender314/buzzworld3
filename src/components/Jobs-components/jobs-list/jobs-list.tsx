import { useEffect, useState } from "react";
import {
  TableListContainer,
  SideMenuContainer,
  TableContainer,
  Header,
} from "@app/components/Admin layout/adminLayouts.component";
import StaticSecondaryHeader from "@app/components/static-secondaryheader";
import Jobs from "@app/assets/images/jobs_list.svg";
import SideMenuList from "@app/components/sidelist/sidelist";
import { PiLeftMenu, PiServerGrid2 } from "pixel-kit";
import TableGrid from "@app/components/tablegrid/tablegrid";
import { useHistory } from "react-router-dom";
import { getLocalStorage } from "@app/core/localStorage/localStorage";
import { token } from "@app/services/api-services";
import { GridReadyEvent, RowClickedEvent } from "ag-grid-community";
import {
  getColumnFilterData,
  getPricingStateManagement,
  setPricingstateManagement,
} from "@app/helpers/helpers";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import AccesssDenied from "@app/modules/access-denied/component";

export default function JobList({
  sideNavData,
  apiDataUrl,
  pageLabel,
  props,
}: any) {
  // const { sideNavData, apiDataUrl, pageLabel } = props;

  const [sidemenuList, setSideMenuList]: any = useState(sideNavData);
  const active = "all";
  const [columndata, setColumnData] = useState([]);
  const history = useHistory();
  const [requestInfo, setRequestInfo]: any = useState({});
  const [permissionObject, setpermissionObject] = useState<any>({});
  const localStorageData = getLocalStorage("userPermission");
  const [jobSearchValue, setJobSearchValue] = useState<any>();
  const [gridApi, setGridApi]: any = useState({});
  const [columnApi, setcolumnApi]: any = useState();
  const [lastSyncMsg, setLastSyncMsg] = useState<any>("");
  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("jobs");
      setpermissionObject(permission);
    })();
  }, [localStorageData]);

  const gridRequestParams = () => {
    const info = {
      body: {
        grid_name: "Jobs",
      },
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        timezoneoffset: new Date().getTimezoneOffset(),
      },
      url: `${process.env.REACT_APP_API_URL}/${apiDataUrl}`,
    };
    setRequestInfo({ ...info });
  };
  useEffect(() => {
    (async () => {
      const modified: any = await getColumnFilterData("jobs");
      setLastSyncMsg(modified?.last_sync_msg);
      setColumnData(modified.column_data);
      const stateMaintain = await getPricingStateManagement(pageLabel);
      if (stateMaintain && stateMaintain.body) {
        stateMaintain.headers.Authorization = `Bearer ${token}`;
        const request = stateMaintain;
        setRequestInfo({ ...request });
      } else {
        gridRequestParams();
      }
    })();
  }, [pageLabel]);

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
    }
  }, [permissionObject]);
  async function triggerEvent(e: any) {
    if (e === "" || e.length > 2) {
      setJobSearchValue(e);
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
    } else if (e.sync && e.flag === "jobs") {
      gridRequestParams();
    }
  }
  async function searchValue(e: any) {
    await triggerEvent(e);
  }
  function dragStopped(e: any) {
    const params = {
      grid_name: pageLabel,
      is_repair: pageLabel !== "repair-jobs",
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

  function onItemClick() {
    return true;
  }

  const getRowClass = () => "agrow-cursor-pointer";

  const onGridReady = async (params: GridReadyEvent) => {
    setGridApi(params.api);
    setcolumnApi(params.columnApi);
  };
  const rowClicked = (e: RowClickedEvent) => {
    history.push(`jobs/${e.data.id}`);
  };
  return (
    <>
      <Header>
        <StaticSecondaryHeader
          logo={Jobs}
          data="Jobs"
          searchEvent={(e: any) => searchValue(e)}
          props={props}
          sendEventData={(e: any) => triggerEvent(e)}
          gridInfo={requestInfo}
          lastSyncMsg={lastSyncMsg}
        />
      </Header>
      <TableListContainer>
        <SideMenuContainer>
          <SideMenuList isActive={active} className="active menu-list">
            <PiLeftMenu
              activeKey="all_jobs"
              onMenuClick={() => onItemClick()}
              options={sidemenuList}
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
                    onRowClicked={rowClicked}
                    onDragStopped={(e: any) => dragStopped(e)}
                    onSortChanged={(e: any) => sortChanged(e)}
                    requestInfo={requestInfo}
                    sideBar={false}
                    overlayNoRowsTemplate={
                      jobSearchValue && jobSearchValue.length > 0
                        ? "For the searched term, no job(s) available"
                        : "The job(s) are not available"
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

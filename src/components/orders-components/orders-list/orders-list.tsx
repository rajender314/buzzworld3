import { useEffect, useState } from "react";
import {
  TableListContainer,
  TableContainer,
  Header,
} from "@app/components/Admin layout/adminLayouts.component";
import StaticSecondaryHeader from "@app/components/static-secondaryheader";
import SalesOrder from "@app/assets/images/salesOrder.svg";
import { PiServerGrid2 } from "pixel-kit";
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
import AccesssDenied from "@app/modules/access-denied/component";
import { getPermissionObject } from "@app/helpers/componentHelpers";

export default function OrdersList({
  apiDataUrl,
  pageLabel,
  sideNavData,
  props,
}: any) {
  const [columndata, setColumnData] = useState([]);
  const history = useHistory();
  const [requestInfo, setRequestInfo]: any = useState({});
  const [permissionObject, setpermissionObject] = useState<any>({});
  const [gridApi, setGridApi]: any = useState({});
  const [columnApi, setcolumnApi]: any = useState();
  const localStorageData = getLocalStorage("userPermission");
  const [lastSyncMsg, setLastSyncMsg] = useState<any>("");

  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("orders");
      setpermissionObject(permission);
    })();
  }, [localStorageData]);
  function gridRequestParams() {
    const info = {
      body: {
        grid_name: "Orders",
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

  useEffect(() => {
    (async () => {
      const modified: any = await getColumnFilterData("sales_order");
      setLastSyncMsg(modified?.last_sync_msg);
      setColumnData(modified.column_data);
      const stateMaintain = await getPricingStateManagement(pageLabel);
      console.log(stateMaintain);
      if (stateMaintain && stateMaintain.body) {
        stateMaintain.headers.Authorization = `Bearer ${token}`;
        const request = stateMaintain;
        setRequestInfo({ ...request });
      } else {
        gridRequestParams();
      }
    })();
  }, []);
  useEffect(() => {
    let userPerm: any = getLocalStorage("userPermission");
    userPerm = userPerm ? JSON.parse(userPerm) : null;
    const tifOptions: any = [];
    if (userPerm) {
      Object.keys(userPerm.permissions).forEach((key) => {
        tifOptions.push(userPerm.permissions[key]);
      });
      sideNavData.map((obj: any) => {
        obj.display = true;
        return obj;
      });
    }
  }, []);
  async function triggerEvent(e: any) {
    if (e === "" || e.length > 2) {
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
    } else if (e.sync && e.flag === "orders") {
      gridRequestParams();
    }
  }
  async function searchValue(e: string) {
    await triggerEvent(e);
  }

  const getRowClass = () => "agrow-cursor-pointer";

  const onGridReady = async (params: GridReadyEvent) => {
    setGridApi(params.api);
    setcolumnApi(params.columnApi);
  };
  const rowClicked = (e: RowClickedEvent) => {
    history.push(`/orders-detail-view/${e.data.id}`);
  };
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

  return (
    <>
      <Header>
        <StaticSecondaryHeader
          logo={SalesOrder}
          data="Sales Orders"
          searchEvent={(e: any) => searchValue(e)}
          props={props}
          sendEventData={(e: any) => triggerEvent(e)}
          gridInfo={requestInfo}
          lastSyncMsg={lastSyncMsg}
        />
      </Header>
      <TableListContainer>
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
                    overlayNoRowsTemplate="The order(s) are not available"
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

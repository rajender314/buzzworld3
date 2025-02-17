import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import {
  PiConfirmModel,
  PiDropdownMenu,
  PiServerGrid2,
  PiToast,
} from "pixel-kit";
import TableGrid from "@app/components/tablegrid/tablegrid";
// import SecondaryHeader from '@app/components/secondaryheader/secondaryheader'
import {
  TableListContainer,
  TableContainer,
  Header,
} from "@app/components/commonLayout/commonLayout.component";
import { SubmitFilterProps } from "@app/services/schema/schema";
import { GridReadyEvent, CellClickedEvent } from "ag-grid-community";
import { getLocalStorage } from "@app/core/localStorage/localStorage";
import { token } from "@app/services/api-services";
import {
  getColumnFilterData,
  getPricingStateManagement,
  setPricingstateManagement,
} from "@app/helpers/helpers";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import AccesssDenied from "@app/modules/access-denied/component";
import ReportsPopUp from "../reports-components/AccountNotes-grid-pop-up/reports-grid-pop-up";

const SecondaryHeader = lazy(
  () => import("@app/components/secondaryheader/secondaryheader")
);
export default function ReportsLayout({
  pageLabel,
  apiDataUrl,
  pageLogo,
}: any) {
  // const { pageLabel, apiDataUrl, gridName, pageLogo } = props;
  const [columndata, setColumnData]: any = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [requestInfo, setRequestInfo]: any = useState({});
  const [loading, setloading] = useState(true);
  const [gridApi, setGridApi]: any = useState();
  const [columnsApi, setColumnApi]: any = useState();
  const [stateMaintaindata, setStateMaintaindata]: any = useState();
  const [pageName, setPageName] = useState<string>();
  const [showGripPopup, setShowGridPopup] = useState<boolean>(false);
  const [gridLabel, setgridLabel] = useState<string>("");
  const [cellClickedRow, setCellClickedRow] = useState("");
  const [searchfield, setSearchfield] = useState("");
  const [showSyncPopup, setshowSyncPopup] = useState<boolean>(false);
  const [showSyncMsg, setshowSyncMsg] = useState<string>("");
  const [showConfirmPopup, setShowConfirmPopup] = useState<boolean>(false);
  const [confirmMsg, setConfirmMsg] = useState<string>("");
  const [toastMsg, setToastMsg] = useState<string>("");
  const localStorageData = getLocalStorage("userPermission");
  const [permissionObject, setpermissionObject] = useState<any>({});

  const gridRequestParams = useCallback(() => {
    const info = {
      body: {
        grid_name: pageLabel,
        serverFilterOptions: {},
      },
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        timezoneoffset: new Date().getTimezoneOffset(),
      },
      url: `${process.env.REACT_APP_API_URL}/${apiDataUrl}`,
    };

    setRequestInfo({ ...info });
    console.log(info);
    setloading(false);
  }, [pageLabel]);
  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("past-due-invoices");
      setpermissionObject(permission);
    })();
  }, [localStorageData]);
  const [apiFilterData, setApiFilterData] = useState(null);

  useEffect(() => {
    (async () => {
      const modified: any = await getColumnFilterData("past_due_invoices");
      setColumnData(modified.column_data);
      setApiFilterData(modified.filters);
      const stateMaintain = await getPricingStateManagement(pageLabel);
      setStateMaintaindata(stateMaintain);
      if (stateMaintain) {
        stateMaintain.headers.Authorization = `Bearer ${token}`;
        const request = stateMaintain;
        setSearchfield(stateMaintain.searchkey);
        setRequestInfo({ ...request });
        setloading(false);
      } else {
        gridRequestParams();
      }
    })();
  }, [gridRequestParams, pageLabel]);

  useEffect(() => {
    if (pageLabel === "Past Due Invoices") {
      setPageName("Past Due Invoices");
    }
  }, [pageLabel]);

  useEffect(() => {
    if (gridApi && stateMaintaindata) {
      gridApi.setFilterModel(stateMaintaindata.gridFilter);
    }
  }, [gridApi, stateMaintaindata]);

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
    params.api.hideOverlay();

    if (columnsApi) {
      setTimeout(() => {}, 2000);
    }
  };

  async function clickAlert(e: SubmitFilterProps) {
    console.log(e);
  }
  async function searchValue(e: string) {
    setSearchParam(e);
    if (pageLabel === "Past Due Invoices") {
      const params = {
        grid_name: pageLabel,
        data: {
          ...requestInfo,
          searchkey: searchParam,
          pageNo: gridApi.paginationGetCurrentPage(),
          columnsStateData: columnsApi.getColumnState(),
        },
      };
      setPricingstateManagement(params);

      const info = {
        ...requestInfo,
      };
      info.searchkey = e;
      setRequestInfo({ ...info });
    }
  }

  const cellClicked = (e: CellClickedEvent) => {
    if (e.colDef.headerName === "CRM Notes") {
      setCellClickedRow(
        e && e.data && e.data.customer_id ? e.data.customer_id : ""
      );
      setgridLabel(e.colDef.headerName ? e.colDef.headerName : "");
      setShowGridPopup(true);
    } else if (e.colDef.headerName === "Email Invoices") {
      setCellClickedRow(
        e && e.data && e.data.customer_id ? e.data.customer_id : ""
      );
      setgridLabel(e.colDef.headerName ? e.colDef.headerName : "");
      setShowGridPopup(true);
    }
  };

  async function getEventData() {
    setShowGridPopup(false);
  }
  async function getSyncdata(e: any) {
    console.log(e);
    if (e && e.sync) {
      setshowSyncPopup(true);
      setshowSyncMsg("Sync");
      setToastMsg(e && e.msg ? e.msg : "");
      setTimeout(() => {
        gridRequestParams();
      }, 1000);
      setTimeout(() => {
        setshowSyncPopup(false);
      }, 2000);
    } else {
      // setshowSyncPopup(true)
      setShowConfirmPopup(true);
      setConfirmMsg(e && e.msg ? e.msg : "Failed To Sync");
      setTimeout(() => {
        setshowSyncPopup(false);
      }, 2000);
    }
  }
  const [perPageSize, setPerPageSize] = useState(25);
  const updatePaging = (e: any) => {
    // eslint-disable-next-line radix
    setPerPageSize(parseInt(e.name));
    setRequestInfo({ ...requestInfo });
  };
  const getFilterEvent = async (e: any) => {
    const stateMaintain = await getPricingStateManagement(pageLabel);
    setStateMaintaindata({ ...stateMaintain });
    console.log(e);
    if (e && e.filters === "organizations-filters") {
      const info = {
        body: {
          grid_name: "Repairs",
          serverFilterOptions: apiFilterData || {},
          selectedCustomFilters:
            e && e.selectedFilters ? e.selectedFilters : {},
        },
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          timezoneoffset: new Date().getTimezoneOffset(),
        },
        url: `${process.env.REACT_APP_API_URL}/${apiDataUrl}`,
        searchkey: stateMaintain ? stateMaintain.searchkey : "",
      };
      setRequestInfo({ ...info });
      setloading(false);

      const params = {
        grid_name: pageLabel,
        data: {
          ...info,
          pageNo: gridApi.paginationGetCurrentPage(),
          columnsStateData: columnsApi.getColumnState(),
          saveFilterName: e.filter_name,
        },
      };
      setPricingstateManagement(params);
    }
  };
  function dragStopped(e: any) {
    console.log(e);
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
        {Object.keys(permissionObject).length > 0 && permissionObject.Yes && (
          <Suspense fallback={null}>
            <SecondaryHeader
              logo={pageLogo}
              data={pageLabel}
              searchkey={searchfield}
              onChildClick={(e: any) => clickAlert(e)}
              searchEvent={(e: any) => searchValue(e)}
              gridRowCount={{}}
              sendSyncData={(e: any) => getSyncdata(e)}
              sendFilterEvent={getFilterEvent}
              requestInfo={requestInfo}
            />
          </Suspense>
        )}
      </Header>

      <TableListContainer className="Body-Container">
        <TableContainer style={{ position: "relative" }}>
          <TableGrid>
            <>
              {Object.keys(permissionObject).length > 0 &&
                permissionObject.Yes && (
                  <div className="ag-theme-alpine ag-style">
                    <PiServerGrid2
                      columns={columndata}
                      mode="paginate"
                      onGridReady={onGridReady}
                      onDragStopped={(e: any) => dragStopped(e)}
                      onSortChanged={(e: any) => sortChanged(e)}
                      onCellClicked={(e: CellClickedEvent) => cellClicked(e)}
                      paginationPageSize={perPageSize}
                      requestInfo={requestInfo}
                      rowHeight={40}
                      cacheBlockSize={perPageSize}
                      sideBar={false}
                      overlayNoRowsTemplate={`<span className="ag-overlay-loading-center no-data-styles" >${pageName} Not Available </span>`}
                    />
                  </div>
                )}
              <div
                style={{
                  position: "absolute",
                  bottom: "22px",
                  right: "354px",
                  width: "94px",
                  display: "flex",
                }}
              >
                <PiDropdownMenu
                  items={[
                    { id: 1, name: "25", display: true },
                    { id: 2, name: "50", display: true },
                    { id: 3, name: "75", display: true },
                    { id: 4, name: "100", display: true },
                  ]}
                  label={perPageSize.toString()}
                  onOpenChange={updatePaging}
                />
              </div>
            </>
          </TableGrid>
          {Object.keys(permissionObject).length > 0 &&
            !loading &&
            !permissionObject.Yes && <AccesssDenied />}
        </TableContainer>
      </TableListContainer>
      {showGripPopup && (
        <ReportsPopUp
          sendModelData={() => getEventData()}
          customerId={cellClickedRow || ""}
          gridLabel={gridLabel || ""}
        />
      )}
      {showConfirmPopup && (
        <PiConfirmModel
          className={showConfirmPopup ? "show text-red" : ""}
          headerLabel="Syncing"
          message={confirmMsg}
          primaryBtnLabel="Close"
          onClose={async () => {
            setShowConfirmPopup(false);
          }}
          onAccept={() => setShowConfirmPopup(false)}
        />
      )}
      {showSyncPopup && (
        <PiToast
          className={showSyncPopup ? "show" : ""}
          headerLabel={showSyncMsg}
          message={toastMsg}
          onClose={async () => setshowSyncPopup(false)}
        />
      )}
    </>
  );
}

import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { PiConfirmModel, PiServerGrid2, PiSpinner, PiToast } from "pixel-kit";
import TableGrid from "@app/components/tablegrid/tablegrid";
import {
  TableListContainer,
  TableContainer,
  Header,
} from "@app/components/commonLayout/commonLayout.component";
import { triggerApi, token } from "@app/services/api-services";
import {
  PageProps,
  ApiResponse,
  GetFilterProps,
  SubmitFilterProps,
} from "@app/services/schema/schema";
import {
  PaginationChangedEvent,
  GridReadyEvent,
  CellClickedEvent,
} from "ag-grid-community";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from "@app/core/localStorage/localStorage";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import { LicenseManager } from "ag-grid-enterprise";
import {
  getColumnFilterData,
  getPricingStateManagement,
  setPricingstateManagement,
} from "@app/helpers/helpers";
import AccesssDenied from "@app/modules/access-denied/component";
import { SpinnerDiv } from "../fileuploadModel/fileuploadModel.component";

const SecondaryHeader = lazy(
  () => import("@app/components/secondaryheader/secondaryheader")
);
export default function CommonLayout(props: PageProps) {
  LicenseManager.setLicenseKey(`${process.env.REACT_APP_AG_LICENCE_KEY}` || "");
  const { apiDataUrl, pageLabel, gridName, pageLogo } = props;
  const [columndata, setColumnData]: any = useState([]);
  const sort = "";
  const sortkey = "";
  const [popupMessageShow, setPopupMessageShow] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [requestInfo, setRequestInfo]: any = useState({});
  const [permissionObject, setpermissionObject] = useState<any>({});
  const [openConFirm, setConFirm] = useState(false);
  const [confirmText, setConfirmText] = useState<any>();
  const [openSnackbar, setSnackbar] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [loading, setloading] = useState(true);
  const [gridApi, setGridApi]: any = useState();
  const [columnsApi, setColumnApi]: any = useState();
  const [stateMaintaindata, setStateMaintaindata]: any = useState();
  const localStorageData = getLocalStorage("userPermission");
  const [opacity, setOpacity] = useState(false);
  const [organizationSearchValue, setOrganizationSearchValue] = useState<any>();
  const [ShowsFilters, setShowsFilters] = useState<any>();
  const [searchfield, setSearchfield] = useState("");
  const [apiFilterData, setApiFilterData] = useState(null);
  const [noDataMsg, setNoDataMsg] = useState("");

  const gridRequestParams = useCallback(() => {
    const info = {
      body: {
        grid_name: gridName,
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
    setloading(false);
  }, [gridName, pageLabel]);

  const getNoRowaMsg = () => {
    if (
      pageLabel === "Organizations" &&
      organizationSearchValue &&
      organizationSearchValue.length > 0
    ) {
      setNoDataMsg("For the searched term, organization(s) are nonexistent");
    } else if (ShowsFilters) {
      setNoDataMsg("Specified filter data not available");
    } else if (
      pageLabel === "Contacts" &&
      organizationSearchValue &&
      organizationSearchValue.length > 0
    ) {
      setNoDataMsg("For the searched term, contact(s) are nonexistent");
    } else {
      setNoDataMsg(`The ${pageLabel} are not available`);
    }
  };

  useEffect(() => {
    getNoRowaMsg();
  }, [pageLabel]);
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
          requestInfo.body.selectedCustomFilters.org_type.length))
    ) {
      setShowsFilters(true);
    }
  }, [requestInfo]);
  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject(
        window.location.pathname.substring(1)
      );
      setpermissionObject(permission);
    })();
  }, [localStorageData]);

  useEffect(() => {
    removeLocalStorage("globalSearch");
    removeLocalStorage("requestInfo");
    (async () => {
      const modified: any = await getColumnFilterData(
        pageLabel.toLocaleLowerCase()
      );
      setColumnData(modified.column_data);
      setApiFilterData(modified.filters);
      const stateMaintain = await getPricingStateManagement(pageLabel);
      setStateMaintaindata(stateMaintain);
      if (stateMaintain && stateMaintain.body) {
        stateMaintain.headers.Authorization = `Bearer ${token}`;
        stateMaintain.body.serverFilterOptions = apiFilterData || {};
        const request = stateMaintain;
        setSearchfield(stateMaintain.searchkey);
        setRequestInfo({ ...request });
        setOrganizationSearchValue(stateMaintain.searchkey);
        setloading(false);
      } else {
        gridRequestParams();
      }
    })();
  }, [gridRequestParams, pageLabel]);
  // useEffect(() => {
  //  if (gridApi && stateMaintaindata) {
  //    gridApi.setFilterModel(stateMaintaindata.gridFilter);
  //  }
  // }, [gridApi, stateMaintaindata]);

  const [gridDataLength, setGridDataLength] = useState<any>();
  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
    params.api.hideOverlay();
  };
  const filterChanged = () => {
    setLocalStorage("filter", JSON.stringify(gridApi.getFilterModel()));
    const params = {
      grid_name: pageLabel,
      data: {
        ...requestInfo,
        gridFilter: gridApi.getFilterModel(),
      },
    };
    setPricingstateManagement(params);
  };

  function saveFilterValues(values: SubmitFilterProps) {
    let apiResponse: ApiResponse;
    const params = {
      // filter_data: {
      ...values,
      // },
      grid_name: pageLabel.toLowerCase(),
      is_filter_shared: true,
    };
    const apiObject = {
      payload: params,
      method: "POST",
      apiUrl: `${EndpointUrl.userSavedFilters}`,
      headers: {},
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          apiResponse = response;
          setPopupMessageShow(true);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(apiResponse);
      }, 2000);
    });
  }

  async function clickAlert(e: any) {
    const searchkey: string = searchParam;
    const col_data = columnsApi.getColumnState();
    const fltrstate = requestInfo.body.selectedCustomFilters;
    const { pageNo } = stateMaintaindata;
    const load = {
      ...e,
      filter_data: {
        col_data,
        fltrstate,
        searchkey,
        sort,
        sortkey,
        pageNo,
        // filterrModelData
      },
    };
    saveFilterValues(load);
  }
  async function searchValue(e: string) {
    setSearchParam(e);
    setOrganizationSearchValue(e);
    // setLocalStorage('globalSearch', searchParam)
    if (pageLabel === "Organizations" || pageLabel === "Contacts") {
      // gridChangesFunction(searchParam, gridParams, pageLabel)
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
    // if (e === '' || e.length > 2) {
    //  setTimeout(() => {
    //    gridApi.purgeServerSideCache()
    //  }, 1000)
    // }
  }

  async function filterData(e: GetFilterProps) {
    console.log(e);
    const allColumnIds: any = [];
    if (e.id === "default") {
      setSearchfield("");
      setSearchParam("");
      removeLocalStorage("filter");
      removeLocalStorage("pageNo");
      removeLocalStorage("globalSearch");

      columnsApi.resetColumnState();
      columnsApi.getAllColumns().forEach((column: any) => {
        allColumnIds.push(column.colId);
      });
      columnsApi.autoSizeColumns(allColumnIds);
      const params = {
        grid_name: pageLabel,
        data: {
          ...requestInfo,
          searchkey: "",
          gridFilter: "",
          saveFilterName: e.filter_name,
          pageNo: gridApi.paginationGetCurrentPage(),
          columnsStateData: columnsApi.getColumnState(),
        },
      };
      params.data.body.selectedCustomFilters = {};
      setPricingstateManagement(params);
      const info = {
        ...requestInfo,
      };
      info.searchkey = "";
      info.gridFilter = "";
      info.body.selectedCustomFilters = [];
      setRequestInfo({ ...info });
    } else {
      setTimeout(() => {
        if (e.filter_data.searchkey.length) {
          console.log(e);
          setSearchParam(e.filter_data.searchkey);
          // gridApi.purgeServerSideCache([])
        } else {
          setSearchfield("");
          setSearchParam("");
        }
        // gridApi.paginationGoToPage(e.filter_data.pageNo)
        columnsApi.applyColumnState({
          state: e.filter_data.columnsStateData,
          applyOrder: true,
        });
        // if (
        //  e.filter_data.fltrstate &&
        //  Object.keys(e.filter_data.fltrstate).length
        // ) {
        //  gridApi.setFilterModel(e.filter_data.fltrstate);
        // } else {
        //  gridApi.setFilterModel(null);
        // }
      }, 100);

      const params = {
        grid_name: pageLabel,
        data: {
          ...requestInfo,
          searchkey: e.filter_data.searchkey,
          gridFilter: e.filter_data.fltrstate,
          saveFilterName: e.filter_name,
          pageNo: e.filter_data.pageNo,
          columnsStateData: columnsApi.getColumnState(),
        },
      };
      params.data.body.selectedCustomFilters = e.filter_data.fltrstate;
      setPricingstateManagement(params);

      const info = {
        ...requestInfo,
      };
      info.body.selectedCustomFilters = e.filter_data.fltrstate;
      info.searchkey = e.filter_data.searchkey;
      info.gridFilter = e.filter_data.fltrstate;
      info.columnsStateData = e.filter_data.columnsStateData;
      setRequestInfo({ ...info });
    }

    // gridChangesFunction(searchParam, gridParams, pageLabel)
  }

  function sortChanged() {
    if (pageLabel === "Organizations" || pageLabel === "Contacts") {
      setTimeout(() => {
        const params = {
          grid_name: pageLabel,
          data: {
            ...requestInfo,
            columnsStateData: columnsApi.getColumnState(),
          },
        };
        setPricingstateManagement(params);
      }, 2000);
    }
  }
  function pageChanged(params: PaginationChangedEvent) {
    if (
      (pageLabel === "Organizations" || pageLabel === "Contacts") &&
      params.api.paginationGetCurrentPage() !== 0
    ) {
      const load = {
        grid_name: pageLabel,
        data: {
          ...requestInfo,
          pageNo: gridApi.paginationGetCurrentPage(),
        },
      };
      setPricingstateManagement(load);
    }
  }

  function FirstDataRendered() {
    if (pageLabel === "Organizations" || pageLabel === "Contacts") {
      setTimeout(() => {
        // gridChangesFunction(searchParam, e, pageLabel)
      }, 2000);
    }
  }
  function componentStateChanged() {
    const response = getLocalStorage("gridResponse") as string;
    setGridDataLength(response ? JSON.parse(response).length : 0);
  }

  function dragStopped() {
    if (pageLabel === "Organizations" || pageLabel === "Contacts") {
      const params = {
        grid_name: pageLabel,
        data: {
          ...requestInfo,
          columnsStateData: columnsApi.getColumnState(),
        },
      };
      setPricingstateManagement(params);
    }
  }

  async function isSaveFilterDeleted() {
    setSearchfield("");
    removeLocalStorage("filter");
    removeLocalStorage("pageNo");
    removeLocalStorage("globalSearch");

    gridApi.paginationGoToPage(0);

    columnsApi.resetColumnState();
    gridApi.purgeServerSideCache([]);
    // gridChangesFunction(searchParam, gridParams, pageLabel)
  }
  const [cellClickedRow, setCellClickedRow] = useState("");
  const cellClicked = (e: CellClickedEvent) => {
    if (e.data.is_add_user_display && e.colDef.field === "primary_email") {
      setCellClickedRow(e.data.id);
      setConfirmText(
        "Are you sure you want to add this user to client portal?"
      );
      setConFirm(true);
    } else {
      setCellClickedRow("");
    }
  };
  const getConfirmModelEvent = (e: any) => {
    if (e === "accept") {
      setConFirm(false);
      setOpacity(true);
      const apiObject = {
        payload: { contact_id: cellClickedRow },
        method: "POST",
        apiUrl: `${EndpointUrl.SaveasUser}`,
        headers: {},
      };
      triggerApi(apiObject).then((response: ApiResponse) => {
        if (response && response.result.success) {
          setToastMsg("Added Successfully");
          setSnackbar(true);
          setOpacity(false);
          const info = {
            ...requestInfo,
          };
          setRequestInfo({ ...info });
        } else {
          setConFirm(false);
          setOpacity(false);
          setToastMsg("Failed To Save");
          setSnackbar(true);
        }
      });
    }
  };
  // const autoSize = () => {
  //  if (columnsApi) {
  //    setTimeout(() => {
  //      autoSizeAll(columnsApi)
  //    }, 2000)
  //  }
  // }
  const getFilterEvent = (e: any) => {
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
        searchkey: stateMaintaindata ? stateMaintaindata.searchkey : "",
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
          searchkey: searchParam,
        },
      };
      setPricingstateManagement(params);
    }
  };
  async function triggerOpacity(e: boolean) {
    setOpacity(e);
  }
  return (
    <>
      <Header>
        {Object.keys(permissionObject).length > 0 && permissionObject.View && (
          <Suspense fallback={null}>
            <SecondaryHeader
              logo={pageLogo}
              data={pageLabel}
              searchkey={searchfield}
              onChildClick={(e: any) => clickAlert(e)}
              searchEvent={(e: any) => searchValue(e)}
              filterEvent={(e: any) => filterData(e)}
              filterdelete={() => isSaveFilterDeleted()}
              gridRowCount={gridDataLength}
              sendFilterEvent={getFilterEvent}
              requestInfo={requestInfo}
              sendOpacity={(e: any) => triggerOpacity(e)}
            />
          </Suspense>
        )}
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

      <TableListContainer className="Body-Container">
        {/* {!loading && ( */}
        <TableContainer
          className={opacity ? "opacity-on-load pointer-none" : ""}
        >
          <TableGrid>
            <>
              {opacity && cellClickedRow && (
                <SpinnerDiv
                  style={{ position: "absolute", left: "50%", zIndex: "999" }}
                >
                  <PiSpinner color="primary" size={50} libraryType="atalskit" />
                </SpinnerDiv>
              )}
              {/* <button onClick={autoSize}>sdsd</button> */}
              {Object.keys(permissionObject).length > 0 &&
                permissionObject.View && (
                  <div className="ag-theme-alpine ag-style">
                    <PiServerGrid2
                      columns={columndata}
                      mode="paginate"
                      searchValue={searchParam}
                      // serverFilterOptions={apiFilterData ? apiFilterData : {}}
                      onFilterChanged={() => filterChanged()}
                      onSortChanged={() => sortChanged()}
                      onComponentStateChanged={() => componentStateChanged()}
                      onFirstDataRendered={() => FirstDataRendered()}
                      onGridReady={onGridReady}
                      onPaginationChanged={(e: PaginationChangedEvent) =>
                        pageChanged(e)
                      }
                      onCellClicked={cellClicked}
                      paginationPageSize={25}
                      onDragStopped={() => dragStopped()}
                      requestInfo={requestInfo}
                      rowHeight={40}
                      cacheBlockSize={25}
                      sideBar={false}
                      // overlayLoadingTemplate={
                      //    '<span className="ag-overlay-loading-center">Please wait while your rows are loading...</span>'
                      //  }
                      // overlayNoRowsTemplate={`<span className="ag-overlay-loading-center no-data-styles" >Filtered companies are nonexistent</span>`}
                      overlayNoRowsTemplate={noDataMsg}
                    />
                  </div>
                )}
            </>
          </TableGrid>
          {Object.keys(permissionObject).length > 0 &&
            !loading &&
            !permissionObject.View && <AccesssDenied />}
        </TableContainer>
        {/* )} */}
      </TableListContainer>
      <PiConfirmModel
        className={openConFirm ? "show" : ""}
        headerLabel="Confirmation"
        message={confirmText}
        primaryBtnLabel="Accept"
        secondaryBtnLabel="Decline"
        onClose={() => {
          setConFirm(false);
        }}
        onAccept={getConfirmModelEvent}
        onDecline={() => {
          setConFirm(false);
        }}
      />
      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel={toastMsg}
        message=""
        onClose={async () => setSnackbar(false)}
      />
    </>
  );
}

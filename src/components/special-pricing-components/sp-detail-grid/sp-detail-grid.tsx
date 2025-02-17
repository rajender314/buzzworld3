/* eslint-disable no-use-before-define */
import {
  PiTabGroup,
  PiTabHeaderPanel,
  PiTabHeader,
  PiTabPanel,
  PiSpinner,
  PiPagination,
  PiServerGrid2,
  PiConfirmModel,
  PiToast,
  PiTooltip,
} from "pixel-kit";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import TableGrid from "@app/components/tablegrid";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { getLocalStorage } from "@app/core/localStorage/localStorage";
import { token, triggerApi } from "@app/services";
import { GridReadyEvent, CellClickedEvent } from "ag-grid-community";
import { ApiResponse } from "@app/services/schema/schema";
import { PaginationWrapper } from "@app/components/Repair-Components/selectItems/ItemsSelection/items-selection.component";
import { getColumnFilterData } from "@app/helpers/helpers";
// import LogHistoryDetailGrid from '../logHistoryDetailGrid/loghistory-detail-grid'
import deleteIcon from "@app/assets/images/delete-icon-red.svg";
import ThemecolorEdit from "@app/assets/images/themecolorEdit.svg";
import { useHistory } from "react-router-dom";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import SpItemEdit from "../Forms/sp-items-edit-form/sp-item-edit";
import {
  BlankPageMessage,
  CardContainer,
  CardLeftContent,
  CardRightContent,
  DetailsContent,
  LabelName,
  LogHistoryCard,
  LogHistoryWrapper,
  SPEditDel,
  VendorCount,
  SPItemsGridContainer,
} from "./sp-detail-grid.component";

const LogHistoryDetailGrid = lazy(
  () => import("../logHistoryDetailGrid/loghistory-detail-grid")
);

export default function SpDetailGrid({ spGridProps, sendData }: any) {
  const [loading, setloading] = useState(true);
  const [gridApi, setGridApi]: any = useState();
  const [columnData, setColumnData] = useState([]);
  // let [vendorIdParams, setVendorIdParams]: any = useState()
  // let [stockCodeParams, setStockCodeParams]: any = useState()
  const [tabIndex, setTabIndex] = useState(0);
  const [showNoLogMsg, setShowNoLogMsg] = useState(false);
  const [listColunt, setListCount] = useState(0);
  const [propsData, setPropsData]: any = useState(spGridProps);
  const [openSpItemEdit, setOpenSpItemEdit] = useState(false);
  const [paramData, setParamData] = useState({});
  const [showLogHistoryGrid, setShowLogHistoryGrid] = useState(false);
  const [pageParam, setPageParam] = useState(1);
  const perPage = 25;
  const [logHistoryList, setLogHistoryList] = useState([]);
  const [openSnackbar, setSnackbar] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [gridDataLength, setgridDataLength]: any = useState();
  // let requestInfo: any = {}
  const [requestInfo, setRequestInfo]: any = useState({});
  const url2: any = useRef<any>("");
  const vendorIdParams: any = useRef<any>("");
  const stockCodeParams: any = useRef<any>("");
  const [openConFirm, setConFirm] = useState(false);
  const [confirmText, setConfirmText] = useState<any>();
  const history = useHistory();
  const [permissionObject, setpermissionObject] = useState<any>({});
  const localStorageData = getLocalStorage("userPermission");
  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject(
        window.location.pathname.substring(1)
      );
      setpermissionObject(permission);
    })();
  }, [localStorageData]);

  useEffect(() => {
    (async () => {
      // propsData = props;
      console.log(spGridProps);
      setPropsData(spGridProps);
    })();
  }, [spGridProps]);
  const logHistory = useCallback(() => {
    console.log(url2.current);
    const url3: any = `${url2.current}&page=${pageParam}`;
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: url3,
      headers: {},
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setloading(false);
          const { data } = response.result;
          setShowNoLogMsg(!(data.total_count > 0));
          setLogHistoryList(data.list);
          setListCount(data.total_count);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }, [pageParam]);

  const setAdditionalParams = useCallback(() => {
    if (vendorIdParams.current) {
      // for (const key in vendorIdParams.current) {
      //   if (vendorIdParams.current.hasOwnProperty(key)) {
      //     url2.current = `${url2.current}`.concat(
      //       `&${key}=${vendorIdParams.current[key]}`
      //     );
      //   }
      // }

      Object.keys(vendorIdParams.current).forEach((key) => {
        url2.current = `${url2.current}`.concat(
          `&${key}=${vendorIdParams.current[key]}`
        );
      });
    }
    if (stockCodeParams.current) {
      // for (const key2 in stockCodeParams.current) {
      //   if (stockCodeParams.current.hasOwnProperty(key2)) {
      //     url2.current = `${url2.current}`.concat(
      //       `&${key2}=${stockCodeParams.current[key2]}`
      //     );
      //   }
      // }
      Object.keys(stockCodeParams.current).forEach((key2) => {
        url2.current = `${url2.current}`.concat(
          `&${key2}=${stockCodeParams.current[key2]}`
        );
      });
    }
    if (spGridProps.params.start_date && spGridProps.params.end_date) {
      url2.current = `${url2.current}`.concat(
        "&" +
          `start_date=${spGridProps.params.start_date}&end_date=${spGridProps.params.end_date}`
      );
    }
  }, [spGridProps.params.end_date, spGridProps.params.start_date]);

  const getGridRequestParams = useCallback(() => {
    const info = {
      body: {
        "organization[0]": spGridProps.params.orgId,
        // 'vendor_id[0]': props.params.vendor_id,
        // 'product_ids[0]': props.params.product_ids,
        start_date: spGridProps.params.start_date
          ? spGridProps.params.start_date
          : "",
        end_date: spGridProps.params.end_date
          ? spGridProps.params.end_date
          : "",
        ...vendorIdParams.current,
        ...stockCodeParams.current,
        grid_name: "SP-Items",
        serverFilterOptions: {},
      },
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        timezoneoffset: new Date().getTimezoneOffset(),
      },
      url: `${process.env.REACT_APP_API_URL}/${EndpointUrl.SpecialPrice}`,
    };
    setRequestInfo({ ...info });

    // setLocalStorage('requestInfo', JSON.stringify(requestInfo))
    setloading(false);
  }, [
    spGridProps.params.end_date,
    spGridProps.params.orgId,
    spGridProps.params.start_date,
  ]);
  async function getGridParamsArray(selecteList: any, key: string) {
    if (selecteList) {
      let obj: any = {};

      for (let i = 0; i < selecteList.length; i += 1) {
        obj = {
          ...obj,
          [`${key}[${i}]`]: selecteList[i].value,
        };
      }
      return obj;
    }
    return null;
  }
  async function getProductParamsArray(selecteList: any, key: string) {
    if (selecteList) {
      let obj: any = {};

      for (let i = 0; i < selecteList.length; i += 1) {
        obj = {
          ...obj,
          [`${key}[${i}]`]: selecteList[i].vendor_stock_key,
        };
      }
      return obj;
    }
    return null;
  }
  const piTabSwitchedCondition = useCallback(async () => {
    setloading(true);
    if (tabIndex === 0) {
      vendorIdParams.current = await getGridParamsArray(
        spGridProps.params.vendor_id,
        "vendor_id"
      );
      stockCodeParams.current = await getProductParamsArray(
        spGridProps.params.product_ids,
        "product_ids"
      );
      console.log(vendorIdParams.current);
      // setVendorIdParams(vendorIdParams)
      setAdditionalParams();
      setTimeout(() => {
        logHistory();
      }, 100);
    } else if (tabIndex === 1 && spGridProps.params.orgId) {
      vendorIdParams.current = await getGridParamsArray(
        spGridProps.params.vendor_id,
        "vendor_id"
      );
      // setVendorIdParams(vendorIdParams)
      stockCodeParams.current = await getProductParamsArray(
        spGridProps.params.product_ids,
        "product_ids"
      );
      // setStockCodeParams(stockCodeParams)
      getGridRequestParams();
    }
  }, [
    getGridRequestParams,
    logHistory,
    setAdditionalParams,
    spGridProps.params.orgId,
    spGridProps.params.product_ids,
    spGridProps.params.vendor_id,
    tabIndex,
  ]);

  useEffect(() => {
    const obj = {
      tabIndex,
      gridLength: gridDataLength,
    };

    sendData(obj);
  }, [gridDataLength, tabIndex, sendData]);

  useEffect(() => {
    (async () => {
      const modified: any = await getColumnFilterData("special_pricing");
      setColumnData(modified.column_data);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      setloading(true);
      url2.current = `${EndpointUrl.SPLogHistory}?perPage=${perPage}`;
      // let app_url = `${EndpointUrl.SPLogHistory}?perPage=${perPage}`;
      setPropsData(spGridProps);
      url2.current = `${url2.current}`.concat(
        "&" +
          `organizations_id=${spGridProps.params.orgId ? spGridProps.params.orgId : ""}`
      );
      // setTimeout(() => {
      //  setloading(false)
      // }, 500)
      await piTabSwitchedCondition();
    })();
  }, [spGridProps, tabIndex, piTabSwitchedCondition]);

  // useEffect(() => {
  //  if (gridApi) {
  //    gridApi.refreshServerSideStore({ page: 2, purge: false })
  //  }
  // }, [gridApi, props])

  // function getColumnFilterData() {
  //  const apiObject = {
  //    payload: {},
  //    method: 'GET',
  //    apiUrl: `${EndpointUrl.filterDataApi}?name=special_pricing`,
  //    headers: {},
  //  }

  //  triggerApi(apiObject)
  //    .then((response: ApiResponse) => {
  //      if (response.result.success) {
  //        const data = response.result.data
  //        setColumnData(data.column_data)
  //      }
  //    })
  //    .catch((err: string) => {
  //      console.log(err)
  //    })
  // }

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const onTabChange = (e: any) => {
    setloading(true);
    setTabIndex(e);
    // props.sendData(obj)
    const obj = {
      tabIndex: e,
      gridLength: gridDataLength,
    };

    sendData(obj);
  };
  const onCardClick = (id: string) => {
    const obj: any = {};
    obj.log_history_id = id;
    setPropsData({ ...spGridProps, ...obj });
    setShowLogHistoryGrid(true);

    // history.push('/special-pricing/log-history/' + id, { ...propsData })
  };
  const onPageChange = (e: any) => {
    setPageParam(e);
  };
  const cellClicked = (e: any) => {
    setParamData(e.data);
    if (e.column.colId === "edit") {
      setOpenSpItemEdit(true);
    }
  };
  async function getEditPricing(e: any) {
    const pageNo: string = gridApi.paginationGetCurrentPage();

    if (e.success) {
      setToastMsg("Updated Successfully");
      setSnackbar(true);
      gridApi.refreshServerSideStore({ page: pageNo, purge: false });
    }
    setOpenSpItemEdit(false);
  }
  async function triggerEventData(e: any) {
    if (e.close) {
      setShowLogHistoryGrid(false);
    }
  }
  function componentStateChanged() {
    const response = getLocalStorage("gridResponse") as string;
    const len = response ? JSON.parse(response).length : 0;
    setgridDataLength(len);
  }
  const [deleteSpId, setDeleteSpId] = useState<number>();
  const deleteSpa = (e: any, id: number) => {
    e.stopPropagation();
    setDeleteSpId(id);
    setConfirmText("Are you sure you want to delete this item ?");
    setConFirm(true);
  };
  const editSpa = (e: any, id: string) => {
    e.stopPropagation();
    history.push(`/special-pricing/pricing-rule-configurator/${id}`);
  };
  async function getConfirmModelEvent(e: string) {
    console.log(e);
    if (e === "accept") {
      const apiObject = {
        payload: {},
        method: "DELETE",
        apiUrl: `${EndpointUrl.deleteSpLog}/${deleteSpId}`,
        headers: {},
      };

      triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            setConFirm(false);
            setToastMsg("Deleted Successfully");
            setSnackbar(true);
            logHistory();
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  }
  const getRowClass = (params: any) => {
    if (params.data && params.data.is_gp) {
      return "ag-row-bg-color";
    }
    return "";
  };
  return (
    <>
      <PiTabGroup id="tab" onChange={onTabChange} selected={tabIndex}>
        <PiTabHeaderPanel>
          <PiTabHeader>SPA Logs</PiTabHeader>
          <PiTabHeader>Items</PiTabHeader>
        </PiTabHeaderPanel>
        <PiTabPanel>
          <>
            {loading && (
              <SpinnerDiv style={{ width: "100%" }}>
                <PiSpinner color="primary" size={50} libraryType="atalskit" />
              </SpinnerDiv>
            )}
            {!loading && (
              <LogHistoryWrapper>
                <FormBodyOverFlow style={{ padding: "unset" }}>
                  <CardContainer>
                    {logHistoryList.map((obj: any) => (
                      <LogHistoryCard onClick={() => onCardClick(obj.id)}>
                        <CardLeftContent>
                          <h4 className="card-title">{obj.customer_name}</h4>

                          <DetailsContent>
                            <div>
                              <span className="label">Vendors:</span>
                              <span className="text">{obj.supplier}</span>
                            </div>
                            {obj.discount_codes && (
                              <div>
                                <span className="label">Discount Code(s):</span>
                                <span
                                  className="text"
                                  title={obj.discount_codes}
                                >
                                  {obj.discount_codes}
                                </span>
                              </div>
                            )}
                          </DetailsContent>
                          <DetailsContent>
                            {(obj.starts_with || obj.ends_with) && (
                              <div>
                                <span className="label">Range:</span>
                                <span className="text">
                                  {obj.starts_with ? obj.starts_with : "--"}
                                </span>
                                -
                                <span className="text">
                                  {obj.ends_with ? obj.ends_with : "--"}
                                </span>
                              </div>
                            )}
                            {obj.quote_number && (
                              <div>
                                <span className="label">Quote Number:</span>
                                <span className="text" title={obj.quote_number}>
                                  {obj.quote_number}
                                </span>
                              </div>
                            )}
                          </DetailsContent>
                          <DetailsContent>
                            {obj.item_list && (
                              <div>
                                <span className="label">Items:</span>
                                <span
                                  className="text"
                                  title={obj.item_list ? obj.item_list : "--"}
                                >
                                  {obj.item_list ? obj.item_list : "--"}
                                </span>
                              </div>
                            )}
                          </DetailsContent>
                        </CardLeftContent>

                        <CardRightContent>
                          <VendorCount>
                            <span>{obj.start_date}</span>
                            &nbsp;-&nbsp;
                            <span>{obj.end_date}</span>
                          </VendorCount>
                          <div className="discount-code-section">
                            <LabelName>{obj.products_count} Products</LabelName>
                          </div>
                        </CardRightContent>
                        {permissionObject.Edit && (
                          <SPEditDel>
                            {obj.is_edit && (
                              <PiTooltip content="Edit" libraryType="atalskit">
                                <div
                                  className="edit-del-divs"
                                  onClick={(e: any) => editSpa(e, obj.id)}
                                  onKeyDown={(event) => {
                                    if (
                                      event.key === "Enter" ||
                                      event.key === " "
                                    ) {
                                      editSpa(event, obj.id);
                                    }
                                  }}
                                  role="button"
                                  tabIndex={0}
                                >
                                  <img src={ThemecolorEdit} alt="loading" />
                                </div>
                              </PiTooltip>
                            )}
                            <PiTooltip content="Delete" libraryType="atalskit">
                              <div
                                className="spa-delete"
                                onClick={(e: any) => deleteSpa(e, obj.id)}
                                onKeyDown={(event) => {
                                  if (
                                    event.key === "Enter" ||
                                    event.key === " "
                                  ) {
                                    deleteSpa(event, obj.id);
                                  }
                                }}
                                role="button"
                                tabIndex={0}
                              >
                                <img src={deleteIcon} alt="loading" />
                              </div>
                            </PiTooltip>
                          </SPEditDel>
                        )}
                      </LogHistoryCard>
                    ))}
                    {showNoLogMsg &&
                      // propsData.params.orgId &&
                      logHistoryList.length === 0 && (
                        <DisplayMessageonEmpty msg=" SPA Logs Not Available" />
                      )}
                  </CardContainer>
                </FormBodyOverFlow>
                <PaginationWrapper>
                  {listColunt > 0 && tabIndex === 0 && (
                    <PiPagination
                      onChange={onPageChange}
                      pages={Math.ceil(listColunt / 25)}
                      selectedIndex={pageParam - 1}
                    />
                  )}
                </PaginationWrapper>
              </LogHistoryWrapper>
            )}
            {!propsData.params.orgId && !loading && (
              <FormBodyOverFlow
                style={{ padding: "unset", overflow: "hidden" }}
              >
                <CardContainer>
                  <DisplayMessageonEmpty msg="Please Select Customer Name" />
                </CardContainer>
              </FormBodyOverFlow>
            )}
          </>
        </PiTabPanel>
        <PiTabPanel>
          <>
            {/* {!loading && ( */}
            <FormBodyOverFlow style={{ padding: "unset", overflow: "hidden" }}>
              {loading && propsData.params.orgId && (
                <SpinnerDiv>
                  <PiSpinner color="primary" size={50} libraryType="atalskit" />
                </SpinnerDiv>
              )}
              {!loading && propsData.params.orgId && tabIndex === 1 && (
                <SPItemsGridContainer className="sp-items-grid">
                  <TableGrid>
                    <div className="ag-theme-alpine ag-style">
                      <PiServerGrid2
                        columns={columnData}
                        mode="paginate"
                        paginationPageSize={25}
                        cacheBlockSize={25}
                        pagination
                        requestInfo={requestInfo}
                        rowHeight={40}
                        rowSelection="multiple"
                        onGridReady={(e: GridReadyEvent) => onGridReady(e)}
                        onCellClicked={(e: CellClickedEvent) => cellClicked(e)}
                        onComponentStateChanged={() => componentStateChanged()}
                        getRowClass={getRowClass}
                        sideBar={false}
                        overlayNoRowsTemplate={
                          '<span className="ag-overlay-loading-center no-data-styles"> Data Not Available </span>'
                        }
                      />
                    </div>
                  </TableGrid>
                </SPItemsGridContainer>
              )}
              {!propsData.params.orgId && (
                <CardContainer>
                  <DisplayMessageonEmpty msg="Please Select Customer Name" />
                </CardContainer>
              )}
            </FormBodyOverFlow>
            {/* )} */}
          </>
        </PiTabPanel>
      </PiTabGroup>
      {showLogHistoryGrid && (
        <Suspense fallback={null}>
          <LogHistoryDetailGrid
            propsData={propsData}
            sendEventData={(e: any) => triggerEventData(e)}
          />
        </Suspense>
      )}
      {openSpItemEdit && (
        <SpItemEdit
          onFileSelect={(e: any) => getEditPricing(e)}
          paramData={paramData}
        />
      )}
      {/* {openSnackbar && (
        <Snackbar
          message={toastMsg}
          triggerEvent={async () => setSnackbar(false)}
        />
      )} */}
      <PiConfirmModel
        className={openConFirm ? "show" : ""}
        headerLabel="Confirmation"
        message={confirmText}
        primaryBtnLabel="Proceed"
        secondaryBtnLabel="Cancel"
        onClose={() => {
          setConFirm(false);
        }}
        onAccept={(e: any) => getConfirmModelEvent(e)}
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

export function DisplayMessageonEmpty(props: any) {
  const { msg } = props;
  return <BlankPageMessage>{msg}</BlankPageMessage>;
}

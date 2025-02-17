/* eslint-disable no-nested-ternary */
import { useCallback, useEffect, useState } from "react";
import {
  TableListContainer,
  SideMenuContainer,
  TableContainer,
  Header,
} from "@app/components/Admin layout/adminLayouts.component";
import { SidenavProps } from "@app/services/schema/schema";
import SideMenuList from "@app/components/sidelist/sidelist";
import { PiLeftMenu, PiServerGrid2 } from "pixel-kit";
import TableGrid from "@app/components/tablegrid/tablegrid";
import { GridReadyEvent, RowClickedEvent } from "ag-grid-community";
import { getLocalStorage } from "@app/core/localStorage/localStorage";
import { token } from "@app/services/api-services";
import {
  getColumnFilterData,
  getPricingStateManagement,
  setPricingstateManagement,
} from "@app/helpers/helpers";
import { useHistory } from "react-router-dom";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import AccesssDenied from "@app/modules/access-denied/component";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import NewTab from "@app/assets/images/newtab.svg";
import QuotesSecondaryHeader from "@app/components/Quote-components/Quotes-secondary-header/quotes-secondary-header";

export default function QuoteList({ sideNavData, pageLabel, gridName }: any) {
  const [sidemenuList, setSideMenuList]: any = useState(sideNavData);
  const [active, setActive] = useState(pageLabel);
  const [activated, setActivated] = useState(pageLabel);
  const [loading, setloading] = useState(true);
  const [columndata, setColumnData] = useState([]);
  const history = useHistory();
  const [requestInfo, setRequestInfo]: any = useState({});
  const [gridApi, setGridApi]: any = useState();
  const [quoteSearchValue, setQuoteSearchValue] = useState<any>();
  const [ShowsFilters, setShowsFilters] = useState<any>();
  const [columnApi, setcolumnApi]: any = useState();
  const localStorageData = getLocalStorage("userPermission");

  const quoteType = () => {
    if (pageLabel === "quote_expired") {
      return "expired";
    }
    if (pageLabel === "quote_archived") {
      return "archived";
    }
    return pageLabel;
  };

  const gridRequestParams = useCallback(() => {
    const info = {
      body: {
        grid_name: gridName,
        serverFilterOptions: {},
        is_repair: pageLabel === "quote_for_repair",
        is_system_quote: pageLabel === "system_quotes",
        is_parts_quote: pageLabel !== "all_quotes",
        quote_type: quoteType(),
      },
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        timezoneoffset: new Date().getTimezoneOffset(),
      },
      url: `${process.env.REACT_APP_API_URL}/${EndpointUrl.Quote}`,
    };
    setRequestInfo({ ...info });
    setloading(false);
  }, [gridName, pageLabel]);

  const [filterApiData, setfilterApiData]: any = useState();
  const [stateMaintaindata, setStateMaintaindata]: any = useState();
  const [permissionObject, setpermissionObject] = useState<any>({});

  useEffect(() => {
    if (
      requestInfo &&
      requestInfo.body &&
      requestInfo.body.selectedCustomFilters &&
      ((requestInfo.body.selectedCustomFilters.customer_name &&
        requestInfo.body.selectedCustomFilters.customer_name.length) ||
        (requestInfo.body.selectedCustomFilters.owner_name &&
          requestInfo.body.selectedCustomFilters.owner_name.length) ||
        (requestInfo.body.selectedCustomFilters.status &&
          requestInfo.body.selectedCustomFilters.status.length) ||
        (requestInfo.body.selectedCustomFilters.quoted_by &&
          requestInfo.body.selectedCustomFilters.quoted_by.length) ||
        (requestInfo.body.selectedCustomFilters.items &&
          requestInfo.body.selectedCustomFilters.items.length) ||
        (requestInfo.body.selectedCustomFilters.name &&
          requestInfo.body.selectedCustomFilters.name.length))
    ) {
      setShowsFilters(true);
    }
  }, [requestInfo]);
  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("quote_for_parts");
      setpermissionObject(permission);
    })();
  }, [localStorageData]);
  useEffect(() => {
    (async () => {
      const modified: any = await getColumnFilterData(pageLabel);
      const filterApi = modified;
      setfilterApiData(filterApi);
      setColumnData(modified.column_data);

      const stateMaintain = await getPricingStateManagement(pageLabel);
      setStateMaintaindata(stateMaintain);
      if (stateMaintain && stateMaintain.body) {
        stateMaintain.headers.Authorization = `Bearer ${token}`;
        stateMaintain.body.is_repair = pageLabel === "quote_for_repair";
        stateMaintain.body.is_system_quote = pageLabel === "system_quotes";
        stateMaintain.body.is_parts_quote = pageLabel !== "all_quotes";
        stateMaintain.body.quote_type = quoteType();
        console.log(stateMaintain, 119);
        const request = stateMaintain;
        setRequestInfo({ ...request });
        setloading(false);
      } else {
        gridRequestParams();
      }
    })();
  }, [gridRequestParams, pageLabel]);

  useEffect(() => {
    if (columnApi && stateMaintaindata && stateMaintaindata.columnsStateData) {
      // for (let i = 0; i < stateMaintaindata.columnsStateData.length; i++) {
      //  if (stateMaintaindata.columnsStateData[i].width > 350) {
      //    setAllowAutoResize(false)
      //    break
      //  } else {
      //    setAllowAutoResize(true)
      //  }
      // }
      // setAllowAutoResize(
      //  allowAutoResizeColumns(stateMaintaindata.columnsStateData),
      // )
      // if (!allowAutoResize) {
      // columnApi.applyColumnState({
      //  state: stateMaintaindata.columnsStateData,
      //  applyOrder: true,
      // })
      // }
    }
  }, [columnApi, stateMaintaindata]);

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
          if (
            obj.key === "quotes_for_my_customers" &&
            (userPerm.user_role === "sales_person" ||
              userPerm.user_role === "sales_manager")
          ) {
            obj.display = true;
          } else if (
            obj.key === "quotes_for_my_customers" &&
            (userPerm.user_role !== "sales_person" ||
              userPerm.user_role !== "sales_manager")
          ) {
            obj.display = false;
          }
        }

        return obj;
      });
      setSideMenuList(sideNavData);
    }
  }, [permissionObject]);

  async function triggerEvent(e: any) {
    const stateMaintain = await getPricingStateManagement(pageLabel);
    setStateMaintaindata({ ...stateMaintain });
    if (
      e.success &&
      (e.searchValue === "" || (e.searchValue && e.searchValue.length > 2))
    ) {
      setQuoteSearchValue(e.searchValue);
      const info = {
        ...requestInfo,
      };
      info.searchkey = e.searchValue;
      setRequestInfo({ ...info });
      const params = {
        grid_name: pageLabel.toLowerCase(),
        data: info,
        pageNo: gridApi ? gridApi.paginationGetCurrentPage() : 0,
        columnsStateData: columnApi ? columnApi.getColumnState() : null,
        searchkey: e.searchValue,
      };
      params.data = {
        ...params.data,
        columnsStateData: columnApi.getColumnState(),
        pageNo: gridApi.paginationGetCurrentPage(),
      };
      setPricingstateManagement(params);
    }
    if (e.success && e.section === "quote-filters") {
      const info = {
        body: {
          grid_name: "Repairs",
          serverFilterOptions: filterApiData ? filterApiData.filters : {},
          selectedCustomFilters: e?.selectedFilters,
          is_repair: pageLabel === "quote_for_repair",
          is_system_quote: pageLabel === "system_quotes",
          is_parts_quote: pageLabel !== "all_quotes",
          quote_type: quoteType(),
        },
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          timezoneoffset: new Date().getTimezoneOffset(),
        },
        url: `${process.env.REACT_APP_API_URL}/${EndpointUrl.Quote}`,
        searchkey: quoteSearchValue || "",
      };
      setRequestInfo({ ...info });
      setloading(false);
      const params = {
        grid_name: pageLabel,
        is_repair: pageLabel === "quote_for_repair",
        is_system_quote: pageLabel === "system_quotes",
        is_parts_quote: pageLabel !== "all_quotes",
        data: info,
        pageNo: gridApi ? gridApi.paginationGetCurrentPage() : 0,
        quote_type: quoteType(),
        columnsStateData: columnApi ? columnApi.getColumnState() : null,
      };
      // delete params?.data?.searchkey;
      params.data = {
        ...params.data,
      };
      setPricingstateManagement(params);
    }
  }

  function dragStopped(e: any) {
    const params = {
      grid_name: pageLabel,
      is_repair: pageLabel === "quote_for_repair",
      is_system_quote: pageLabel === "system_quotes",
      is_parts_quote: pageLabel !== "all_quotes",
      quote_type: quoteType(),
      data: {
        ...requestInfo,
        pageNo: e.api.paginationGetCurrentPage(),
        columnsStateData: e.columnApi.getColumnState(),
      },
    };
    delete params.data.searchkey;
    setPricingstateManagement(params);
    setQuoteSearchValue(e.searchValue);
  }
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
    history.push(`/${pageLabel}/${e.data.id}`);
  };
  const sortChanged = (e: any) => {
    const params = {
      grid_name: pageLabel,
      is_repair: pageLabel === "quote_for_repair",
      is_system_quote: pageLabel === "system_quotes",
      is_parts_quote: pageLabel !== "all_quotes",
      quote_type: quoteType(),
      data: {
        ...requestInfo,
        pageNo: e.api.paginationGetCurrentPage(),
        columnsStateData: e.columnApi.getColumnState(),
      },
    };
    delete params.data.searchkey;
    setPricingstateManagement(params);
  };

  const getContextMenuItems = useCallback((params) => {
    const result = [
      {
        name: "Open link in new tab",
        action: () => {
          window.open(
            `${process.env.REACT_APP_REDIRECT_URI}/${pageLabel}/${params.node.data.id}`,
            "_blank",
            "noreferrer"
          );
        },
        icon: `<div style="padding-top:4px"><img src=${NewTab} alt='newtab-icon' /></div>`,
        cssClasses: ["red", "bold"],
      },
      "copy",
      "copyWithHeaders",
      "paste",
      "export",
    ];
    return result;
  }, []);
  return (
    <>
      <Header>
        <QuotesSecondaryHeader
          requestInfo={requestInfo}
          sendEventData={(e: any) => triggerEvent(e)}
          quoteType={() => quoteType()}
        />
      </Header>
      <TableListContainer>
        <SideMenuContainer>
          <SideMenuList isActive={active} className="active menu-list">
            <PiLeftMenu
              activeKey={activated}
              onMenuClick={(e) => onItemClick(e)}
              options={sidemenuList}
            />
          </SideMenuList>
        </SideMenuContainer>
        <TableContainer>
          <TableGrid>
            {Object.keys(permissionObject).length > 0 &&
              permissionObject.View && (
                <div className="ag-theme-alpine ag-style">
                  {/* <button onClick={autoSizeAll}>Auto size</button> */}
                  <PiServerGrid2
                    getRowClass={getRowClass}
                    columns={columndata}
                    mode="paginate"
                    paginationPageSize={25}
                    cacheBlockSize={25}
                    onGridReady={(e: GridReadyEvent) => onGridReady(e)}
                    pagination
                    rowHeight={40}
                    onRowClicked={(e: any) => rowClicked(e)}
                    onDragStopped={(e: any) => dragStopped(e)}
                    onSortChanged={(e: any) => sortChanged(e)}
                    requestInfo={requestInfo}
                    sideBar={false}
                    overlayNoRowsTemplate={
                      pageLabel === "quote_for_repair"
                        ? quoteSearchValue && quoteSearchValue.length > 0
                          ? "For the searched term, no repair quote(s) are available"
                          : ShowsFilters
                            ? "Specified filter data not available"
                            : "There are no quote(s) relating to repair"
                        : pageLabel === "quote_for_parts"
                          ? quoteSearchValue && quoteSearchValue.length > 0
                            ? "For the searched term, no part quote(s) are available"
                            : ShowsFilters
                              ? "Specified filter data not available"
                              : "There are no quote(s) relating to Parts"
                          : pageLabel === "system_quotes" &&
                              quoteSearchValue &&
                              quoteSearchValue.length > 0
                            ? "For the searched term, no system quote(s) are available"
                            : ShowsFilters
                              ? "Specified filter data not available"
                              : pageLabel === "all_quotes" &&
                                  quoteSearchValue &&
                                  quoteSearchValue.length > 0
                                ? "For the searched term, no quote(s) are available"
                                : pageLabel === "quote_expired" &&
                                    quoteSearchValue &&
                                    quoteSearchValue.length > 0
                                  ? "For the searched term, no expired quote(s) are available"
                                  : pageLabel === "quote_archived"
                                    ? quoteSearchValue &&
                                      quoteSearchValue.length > 0
                                      ? "For the searched term, no archived quote(s) are available"
                                      : "There are no quote(s) relating to archived"
                                    : // eslint-disable-next-line no-nested-ternary
                                      pageLabel === "waiting_on_me"
                                      ? quoteSearchValue &&
                                        quoteSearchValue.length > 0
                                        ? "For the searched term, no  waiting on you  quote(s) are available"
                                        : "There are no quote(s) relating to waiting on you"
                                      : pageLabel === "quoted_by" &&
                                          quoteSearchValue &&
                                          quoteSearchValue.length > 0
                                        ? "For the searched term, no  quoted by you quote(s) are available"
                                        : "The Quote(s) are not available"
                    }
                    getContextMenuItems={getContextMenuItems}
                  />
                </div>
              )}
          </TableGrid>
          {Object.keys(permissionObject).length > 0 &&
            !loading &&
            !permissionObject.View && <AccesssDenied />}
        </TableContainer>
      </TableListContainer>
    </>
  );
}

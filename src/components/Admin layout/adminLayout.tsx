import React, {
  useState,
  Fragment,
  useEffect,
} from "react";
import {
  primaryHeaderOptions,
  profileOptions
} from "src/modules/organisations/component/organisationRenderdata";
import { PiGrid, PiLeftMenu, } from "pixel-kit";
import TableGrid from "src/components/tablegrid/tablegrid";
import SideMenuList from "src/components/sidelist/sidelist";

import StaticSecondaryHeader from "src/components/static-secondaryheader/staticSecondaryheader";
import {
  TableListContainer,
  SideMenuContainer,
  TableContainer,
  Header
} from "src/components/Admin layout/adminLayouts.component";
import { useHistory } from "react-router-dom";
import EditIcon from "../../assets/images/editicon.svg";
import { triggerApi } from "src/services/api-services";
import {
  PageProps,
  ApiResponse,
  GridfilterData,
  SidenavProps,
  ColumnHeaders,
  PiMenuOptions,
  EditProps,
  AddProps,
  RowDataProps
} from "src/services/schema/schema";

import {
  GridReadyEvent,
  ITooltipParams,
  PaginationChangedEvent,
  CellClickedEvent,
} from "ag-grid-community";
import {
  setLocalStorage,
  getLocalStorage,
} from "src/core/localStorage/localStorage";
import EndpointUrl from "src/core/apiEndpoints/endPoints";
import Snackbar from "src/components/Snackbar/snackbar";
import { MakeSelector } from "src/core/components/gridDropdown/gridDropdown";
import EditModel from "src/core/components/edit/edit";
import Loader from "../Loader/loader";

export default function AdminLayout(props: PageProps) {
  console.log(props);
  const sidemenuList = props.sideNavData;
  let [rowData, setRowData] = useState<Array<RowDataProps>>([]);
  const [columndata, setColumnData] = useState([]);
  const [active, setActive] = useState("all");
  let [headerLinkactive, setHeaderLinkactive] = useState("dashboard");
  // const headerOptions = primaryHeaderOptions;
  // const profileOptionsData = profileOptions;
  let leftItem = getLocalStorage("leftkey");

  let [openEditModel, setOpenEditModel] = useState(false);
  // let [api, setApi] = useState('');
  // let [Api, setApiApi] = useState('')
  let [loading, setloading] = useState(true)
  let [pageIndex, setPageIndex] = useState(0);
  let [pageNumber, setPageNumber] = useState(1);
  let [activated, setActivated] = useState('')
  let sort = "";
  let sortkey = "";
  let [paramData, setParamData] = useState({});

  const frameworkComponents = {
    makeSelector: MakeSelector
  };

  let [reqUrl, setReqUrl] = useState(
    `${props.apiData.apiUrl}?page=${pageNumber}&sort=${sort}&sort_key=${sortkey}`
  );

  const history = useHistory();

  // console.log(addRow());

  function getFilterData() {
    const apiObject = {
      payload: props.apiData.params ? props.apiData.params : {},
      method: "GET",
      apiUrl: `${EndpointUrl.filterDataApi
        }?name=${props.pageLabel.toLowerCase()}`,
      headers: {}
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setTimeout(() => {
            setloading(false);
          }, 1000);
          // setloading(false);
          let gridFilterData = response.result.data;
          const valueEdit = {
            headerName: "",
            pinned: "right",
            field: "edit",

            onCellClicked: function (params: CellClickedEvent) {
              setParamData(params.data);
              params.api.selectIndex(params.node.rowIndex, false, false);

              setOpenEditModel(true);
            },
            cellStyle: { cursor: "pointer" },
            cellRenderer: () => {
              return `<img src=${EditIcon}  />`;
            }
          };
          gridFilterData.column_data.push(valueEdit);
          const columnData = getModifiedColumnData(gridFilterData);
          setColumnData(columnData);
          console.log(columnData);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  function getModifiedColumnData(columnData: GridfilterData) {
    columnData.column_data.map((obj: ColumnHeaders) => {
      obj["filter"] = true;
      // obj["width"] = 250;
      // obj["minWidth"] = 250;
      // obj["maxWidth"] = 700;
      obj['editable'] = false
      obj["enableServerSideSorting"] = true;
      obj["enableServerSideFilter"] = true;
      obj["sortable"] = true;
      obj["resizable"] = true;
      if (obj.field === "status") {
        obj["cellEditor"] = "makeSelector";
      }
      if (obj.field === "edit") {
        obj["minWidth"] = 50;
        obj["width"] = 50;
      } else {
        obj["minWidth"] = 250;
        obj["width"] = 250;
      }
      obj["suppressSizeToFit"] = false;
      obj["filterParams"] = {};
      obj["filterParams"]["buttons"] = ["apply", "reset"];
      obj["filterParams"]["closeOnApply"] = true;
      if (obj.field === "business_phone" || obj.field === "mobile_phone") {
        obj["headerClass"] = "ag-customHeader-number";
        obj["cellStyle"] = {
          "text-align": "center"
        };
      }

      obj["tooltipValueGetter"] = (params: ITooltipParams) => {
        return params.value;
      };
      return obj;
    });
    return columnData.column_data;
  }

  useEffect(() => {

    if ((leftItem === "account-type") && (props.pageLabel === "Account_Types")) {
      activated = 'account-type';
      setActivated(activated);
    } else if ((leftItem === "classification") && (props.pageLabel === "Classifications")) {
      activated = "classification";
      setActivated(activated);
    } else if ((leftItem === "industry") && (props.pageLabel === "Industry")) {
      activated = "industry";
      setActivated(activated);
    } else if ((leftItem === "sales_potential") && (props.pageLabel === "Sales_Potential")) {
      activated = "sales_potential";
      setActivated(activated);
    } else if ((leftItem === "contact_types") && (props.pageLabel === "Contact_Types")) {
      activated = "contact_types";
      setActivated(activated);
    } else if ((leftItem === "po_min_qty") && (props.pageLabel === "PO_Min_Qty")) {
      activated = "po_min_qty";
      setActivated(activated);
    } else {
      activated = "account-type";
      setActivated(activated);
    }
  }, []);

  function onItemClick(obj: SidenavProps) {
    // getGridData();
    console.log(obj);
    setActive(obj.key);

    localStorage.setItem("leftkey", obj.key);
    setLocalStorage("leftkey", obj.key)
    console.log(localStorage.getItem("leftkey"));
    console.log(getLocalStorage("leftkey"));

    history.replace("/" + obj.key);
  }
  const MenuClick = (menu: SidenavProps) => {
    // localStorage.removeItem("columnState");
    // localStorage.removeItem("filterState");
    // console.log(props.pageLabel);
    // return;

    localStorage.removeItem("search");
    setPageNumber(1);
    pageIndex = 0;
    setPageIndex(pageIndex);
    let baseApi = localStorage.getItem("baseApi") as string;
    reqUrl = `${baseApi}?page=${1}`;
    setReqUrl(reqUrl);
    // console.log(menu);
    setHeaderLinkactive(menu.key);
    // doSomething2(menu);
    history.replace("/" + menu.key);
  };
  useEffect(() => {
    if (props.pageLabel === "Account_Types" ||
      props.pageLabel === "Classifications" ||
      props.pageLabel === "Contact_Types" ||
      props.pageLabel === "Industry" ||
      props.pageLabel === "PO_Min_Qty" ||
      props.pageLabel === "Sales_Potential" ||
      props.pageLabel === "Admin") {
      headerLinkactive = "account-type"
      setHeaderLinkactive(headerLinkactive)
    } else if (props.pageLabel === "Pricing" || props.pageLabel === "Discount_Codes") {
      headerLinkactive = "pricing"
      setHeaderLinkactive(headerLinkactive)
    } else if (props.pageLabel === "Organizations" || props.pageLabel === "Contacts") {
      headerLinkactive = "organisations"
      setHeaderLinkactive(headerLinkactive)
      //  }else{
      //    headerLinkactive = "dashboard"
      //    setHeaderLinkactive(headerLinkactive)
      //  }
    }
  }, []);

  const ProfileClick = (pro: PiMenuOptions) => {
    console.log(pro);
  };

  let gridEvent: GridReadyEvent;

  const onGridReady = async (params: GridReadyEvent) => {
    //setReady(false);
    gridEvent = params;
    console.log(gridEvent);
    // gridEvent.api.showLoadingOverlay()
    // // params.api.purgeServerSideCache([]);
    // // params.api.showLoadingOverlay()
    // setTimeout(() => {
    //   gridEvent.api.hideOverlay()
    // }, 900);

  };

  useEffect(() => {
    getFilterData();
    getGridData();
    setloading(true)
  }, []);

  function getGridData() {
    setloading(true);
    const apiObject = {
      payload: props.apiData.params ? props.apiData.params : {},
      method: "GET",
      apiUrl: props.apiDataUrl ? props.apiDataUrl : EndpointUrl.accountTypes,
      headers: {}
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setTimeout(() => {
            setloading(false);
          }, 1000);
          // setloading(false);
          console.log(gridEvent)
          // gridEvent.api.hideOverlay();
          rowData = response.result.data.list;
          setRowData(rowData);
          console.log(rowData);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  let showToast = false;
  let toastProps = {
    appearance: "error",
    message: ""
  };




  function pageChanged(event: PaginationChangedEvent) {
    // console.log(pageNumber);
    console.log(event.api.paginationGetCurrentPage());
    // pageNumber = event.api.paginationGetCurrentPage();
    // setPageNumber(pageNumber);
    // setStateManagement();
  }


  async function getEditModelEvent(e: EditProps) {
    // console.log(e);
    if (Object.keys(e).length) {
      // setTimeout(() => {
      //   getEditFilterData();
      // }, 500);
      setOpenEditModel(false);
      // onChildClick(e);
    } else {
      setOpenEditModel(false);
    }
  }

  // function getData(data : EditProps) {
  //   // console.log(props.pageLabel)
  //   if (props.pageLabel === "Account_Types") {
  //     Api = `v1/AccountTypes`;
  //     api = `v1/AccountTypes/${paramData.id}`;
  //     setApi(api);
  //     setApiApi(Api);
  //   } else if (props.pageLabel === "Classifications") {
  //     Api = `v1/Classifications`
  //     api = `v1/Classifications/${paramData.id}`
  //     setApi(api)
  //     setApiApi(Api)
  //   } else if (props.pageLabel === "Industry") {
  //     Api = `/v1/Industry`
  //     api = `/v1/Industry/${paramData.id}`
  //     setApi(api)
  //     setApiApi(Api)
  //   } else if (props.pageLabel === "Sales_Potential") {
  //     Api = `/v1/SalesPotential`
  //     api = `/v1/SalesPotential/${paramData.id}`
  //     setApi(api)
  //     setApiApi(Api)
  //   } else if (props.pageLabel === "Contact_Types") {
  //     Api = `/v1/ContactTypes`
  //     api = `/v1/ContactTypes/${paramData}`
  //     setApi(api)
  //     setApiApi(Api)
  //   } else if (props.pageLabel === "PO_Min_Qty") {
  //     Api = `/v1/Quantity`
  //     api = `/v1/Quantity/${paramData}`
  //     setApi(api)
  //     setApiApi(Api)
  //   }
  //   let gridDataById : EditProps;
  //   const apiObject = {
  //     payload: {},
  //     method: "GET",
  //     apiUrl: api,
  //     headers: {}
  //   };

  //   triggerApi(apiObject)
  //     .then((response: ApiResponse) => {
  //       if (response.result.success) {
  //         gridDataById = response.result.data;
  //         if (paramData && gridDataById) {

  //           // arr = Object.keys(gridDataById.multipliers);
  //           if (props.pageLabel !== "PO_Min_Qty") {
  //             data["name"] = gridDataById.name;
  //             console.log(data["name"]);
  //             data["description"] = gridDataById.description;
  //             data["status"] = gridDataById.status
  //             // initialValues["quantity"] = gridDataById.quantity;
  //             console.log(data)

  //           } else if (props.pageLabel === "PO_Min_Qty") {
  //             data["quantity"] = gridDataById.quantity;

  //           }

  //         }
  //         // setInitialValues(initialValues)
  //       }
  //     })
  //     .catch((err: string) => {
  //       console.log(err);
  //     });
  // }


  console.log(paramData)

  async function searchValue(e: string) {
    console.log(e);
    gridEvent.api.setQuickFilter(e);
  }

  return (
    <Fragment>
      <Header>
        <StaticSecondaryHeader
          logo={props.pageLogo}
          data={props.pageLabel}
          searchEvent={searchValue}
          gridData={(data: Array<AddProps>) => setRowData(data)}
          props={props}
        ></StaticSecondaryHeader>
        {showToast && <Snackbar {...toastProps}></Snackbar>}
        {openEditModel && (
          <EditModel
            data={openEditModel}

            onChildClick={getEditModelEvent}
            paramData={paramData}
            gridData={(data: Array<EditProps>) => setRowData(data)}
            props={props}

          ></EditModel>
        )}


      </Header>
      <TableListContainer className="ngirehfgkdjh">
        {props &&
          (props.pageLabel === "Account_Types" ||
            props.pageLabel === "Classifications" ||
            props.pageLabel === "Industry" ||
            props.pageLabel === "Sales_Potential" ||
            props.pageLabel === "Contact_Types" ||
            props.pageLabel === "PO_Min_Qty") && (
            <SideMenuContainer>
              <SideMenuList isActive={active} className="active menu-list">
                <PiLeftMenu
                  activeKey={activated}
                  onMenuClick={e => onItemClick(e)}
                  options={sidemenuList}
                />
              </SideMenuList>
            </SideMenuContainer>
          )}
        {loading && <Loader /> }
            {(!loading) && (
              <>
                <TableContainer>
                  <TableGrid>
                    <div className="ag-theme-alpine ag-style">
                      {!loading && (
                        <>
                          <PiGrid

                            frameworkComponents={frameworkComponents}
                            columns={columndata}
                            mode="static"
                            paginationPageSize={25}
                            cacheBlockSize={25}
                            onGridReady={(e: GridReadyEvent) => onGridReady(e)}
                            rowData={rowData}
                            pagination={true}
                            // onCellValueChanged={cellValueChanged}
                            onPaginationChanged={(e: PaginationChangedEvent) =>
                              pageChanged(e)
                            }
                            rowHeight={40}
                          />
                        </>
                      )}
                    </div>
                  </TableGrid>
                </TableContainer>
              </>
            )}
          {/* </>
        )} */}
      </TableListContainer>
    </Fragment>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Fragment, useEffect } from 'react'
import {
  PiLeftMenu,
  PiServerGrid,
  PiSelect,
  PiSearch,
  PiSpinner,
} from 'pixel-kit'
import TableGrid from 'src/components/tablegrid/tablegrid'
import SecondaryHeader from 'src/components/secondaryheader/secondaryheader'
import SideMenuList from 'src/components/sidelist/sidelist'
import ClickIcon from '../../assets/images/Click.svg'
import {
  TableListContainer,
  SideMenuContainer,
  TableContainer,
  Header,
  NoVendorFound,
  SpinnerDiv,
} from 'src/components/commonLayout/commonLayout.component'
import EditIcon from 'src/assets/images/editicon.svg'
import { triggerApi } from 'src/services/api-services'
import {
  FilterColumnProps,
  PageProps,
  ApiResponse,
  GridfilterData,
  StateMaintainanceProps,
  FilterDataObject,
  GetFilterProps,
  SidenavProps,
  ColumnHeaders,
  BranchListProps,
  SubmitFilterProps,
  BranchSelectProps,
} from 'src/services/schema/schema'
import {
  FilterChangedEvent,
  SortChangedEvent,
  PaginationChangedEvent,
  GridReadyEvent,
  ColumnState,
  ITooltipParams,
  ComponentStateChangedEvent,
  DisplayedColumnsChangedEvent,
  FirstDataRenderedEvent,
  ColumnEverythingChangedEvent,
  VirtualColumnsChangedEvent,
  CellClickedEvent,
  CellValueChangedEvent,
} from 'ag-grid-community'
import EndpointUrl from 'src/core/apiEndpoints/endPoints'
import Snackbar from 'src/components/Snackbar/snackbar'
import { SubscribeService } from 'src/services/subscribe-service'
import ModelGrid from 'src/components/modelGrid/modelgrid'
import Loader from 'src/components/Loader/loader'
import DiscountAddRowModel from 'src/components/discountAddRowModel/discountAddRowModel'
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from 'src/core/localStorage/localStorage'
import { token } from 'src/services/api-services'
import SpecialPricingEditModal from '../specialPricingEditModal/SpecialPricingEditModal'
import PricingAddRowModel from 'src/components/pricingAddRowModel/pricingAddRowModel'

type FileProps = {
  success: boolean
}
export default function CommonLayout(props: PageProps) {
  const [columndata, setColumnData] = useState([])
  const [active, setActive] = useState('all')
  const sort = ''
  const sortkey = ''
  let reqInfo = {
    body: {
      branch_id: '',
      vendor_id: '',
    },
    headers: {
      Authorization: '',
    },
    method: '',
    url: '',
  }

  const [SearchValue, setSearchValue] = useState('')
  let pageIndex = 0
  let pageNumber = 0
  let [searchParam, setSearchParam] = useState('')
  const [modelGridColumnData, setModelGridColumnData] = useState([])
  let [apiFilterData, setApiFilterData] = useState(null)
  // const baseUrl = " https://buzzworlddev-iidm.enterpi.com:8446/v1/Contacts";

  let [requestInfo, setRequestInfo] = useState({})
  let [branchValue, setBranchValue] = useState('')
  let [vendorId, setVendorId] = useState('')
  let [piDropdownlabel, setPiDropdownlabel] = useState('Branch')
  let [loading, setloading] = useState(true)
  let [openGridModel, setOpenGridModel] = useState(false)
  const [openAddRowDiscountModel, setOpenAddRowDiscountModel] = useState(false)
  const [openEditspecialPrice, setEditSpecialPrice] = useState(false)
  let [vendorSpinner, setVendorSpinner] = useState(true)
  const [isVendorList, setIsVendorList] = useState(true)
  //let searchEvent: (e: string) => {};
  let [modelGridData, setModelGridData] = useState({
    column_data: [],
    acc_type_pricelist: [],
    description: '',
    discount_code: '',
    id: '',
    list_price: '',
    manufacturer_discount_id: '',
    name: '',
    vendor_id: '',
  })
  let [vendorsList, setVendorList]: any = useState([])

  function getVendorList() {
    const apiObject = {
      payload: {},
      method: 'GET',
      apiUrl: `${EndpointUrl.vendorList}`,
      headers: {},
    }
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setVendorSpinner(false)
          vendorsList = response.result.data.list

          let list = []
          list = vendorsList.map((item: any) => {
            return {
              key: item.id,
              label: item.name,
              ...item,
            }
          })
          vendorsList = list
          setVendorList(vendorsList)
          // console.log(list);
        }
      })
      .catch((err: string) => {
        console.log(err)
      })
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(vendorsList)
        if (vendorsList.length > 0) {
          setIsVendorList(true)
        } else {
          setIsVendorList(false)
        }
      }, 2000)
    })
  }

  useEffect(() => {
    ;(async () => {
      if (
        props.pageLabel === 'Pricing' ||
        props.pageLabel === 'Discount_Codes' ||
        props.pageLabel === 'Special_Pricing'
      ) {
        removeLocalStorage('test')

        await getVendorList()
        vendorId = vendorsList.length ? vendorsList[0].key : ''
        console.log(vendorId)
        console.log(vendorsList)
        setVendorId(vendorId)
        setActive(vendorsList.length ? vendorsList[0].id : '')

        await getBranchList()
        branchValue = branchList.length ? branchList[0].id : ''
        getFilterData()
      } else {
        getFilterData()
      }
    })()
  }, [])
  let [pageName, setPageName] = useState<string>()
  useEffect(() => {
    if (
      props.pageLabel !== 'Pricing' &&
      props.pageLabel !== 'Discount_Codes' &&
      props.pageLabel !== 'Special_Pricing'
    ) {
      getStateManagement()
    }
    setTimeout(() => {
      if (
        props.pageLabel !== 'Pricing' &&
        props.pageLabel !== 'Discount_Codes' &&
        props.pageLabel !== 'Special_Pricing' &&
        agFilter
      ) {
        setStateManagement()
      }
    }, 2000)

    if (props.pageLabel === 'Pricing') {
      setPageName('Products')
    } else if (props.pageLabel === 'Discount_Codes') {
      setPageName('Discount Codes')
    } else if (props.pageLabel === 'Special_Pricing') {
      setPageName('Special Pricing')
    } else if (props.pageLabel === 'Organizations') {
      setPageName('Organizations')
    } else if (props.pageLabel === 'Contacts') {
      setPageName('Contacts')
    }
  }, [])
  let [branchList, setBranchList]: any = useState([])

  function getBranchList() {
    const apiObject = {
      payload: {},
      method: 'GET',
      apiUrl: `${EndpointUrl.branchList}?vendor_id=${vendorId}`,
      headers: {},
    }
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          let bList = []
          bList = response.result.data.list
          if (response.result.data.total_count) {
            setPiDropdownlabel(bList[0].name)
            let list = []
            list = bList.map((item: BranchListProps) => {
              return {
                label: item.name,
                value: item.id,
                ...item,
              }
            })
            branchList = list
            setBranchList(branchList)
          } else {
            piDropdownlabel = 'Select'
            setPiDropdownlabel(piDropdownlabel)
          }

          branchValue = bList.length ? bList[0].id : ''

          setBranchValue(branchValue)

          requestInfo = {
            body: {
              branch_id: branchValue,
              vendor_id: vendorId,
              serverFilterOptions: apiFilterData ? apiFilterData : {},
            },
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + token,
            },
            url: `${process.env.REACT_APP_API_URL}/${props.apiDataUrl}`,
          }
          //setRequestInfo(requestInfo)

          SubscribeService.sendMessage(requestInfo)
          setLocalStorage('requestInfo', JSON.stringify(requestInfo))
        }
      })
      .catch((err: string) => {
        console.log(err)
      })

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(branchList)
      }, 500)
    })
  }
  //let [test, setTest] = useState('');
  //function testfun() {
  //  return new Promise((resolve) => {
  //    setTimeout(() => {
  //      setTest('222');
  //    }, 2000);
  //  });
  //}

  async function cellClicked(event: CellClickedEvent) {
    // await testfun();
    // return;
    // event.event?.preventDefault();
    if (
      (props.pageLabel === 'Pricing' ||
        props.pageLabel === 'Special_Pricing') &&
      event.colDef.field === 'quantity'
    ) {
      const apiObject = {
        payload: props.apiData.params ? props.apiData.params : {},
        method: 'GET',
        apiUrl: `${EndpointUrl.productsApi}/${event.data.id}?branch_id=${branchValue}&vendor_id=${vendorId}`,
        headers: {},
      }
      triggerApi(apiObject)
        .then(async (response: ApiResponse) => {
          if (response.result.success) {
            let gridFilterData = response.result.data
            setModelGridData(gridFilterData)
            setOpenGridModel(true)
            const modelGridColumnData = getModifiedColumnData(gridFilterData)
            setModelGridColumnData(modelGridColumnData)
          }
        })
        .catch((err: string) => {
          console.log(err)
        })
    }
    if (
      props.pageLabel === 'Special_Pricing' &&
      event.colDef.field === 'quantity'
    ) {
      const apiObject = {
        payload: props.apiData.params ? props.apiData.params : {},
        method: 'GET',
        apiUrl: `${EndpointUrl.specialPricingApi}/${event.data.id}?branch_id=${branchValue}&vendor_id=${vendorId}`,
        headers: {},
      }
      triggerApi(apiObject)
        .then(async (response: ApiResponse) => {
          if (response.result.success) {
            let gridFilterData = response.result.data
            setModelGridData(gridFilterData)
            setOpenGridModel(true)
            const modelGridColumnData = getModifiedColumnData(gridFilterData)
            setModelGridColumnData(modelGridColumnData)
          }
        })
        .catch((err: string) => {
          console.log(err)
        })
    }
    // return event.event?.defaultPrevented;
    // event.event?.defaultPrevented
  }
  let [paramData, setParamData] = useState({})

  function getFilterData(vId?: string) {
    const apiObject = {
      payload: props.apiData.params ? props.apiData.params : {},
      method: 'GET',
      apiUrl: `${
        EndpointUrl.filterDataApi
      }?name=${props.pageLabel.toLowerCase()}&vendor_id=${
        vId ? vId : vendorId
      }&branch_id=${branchValue}`,
      headers: {},
    }

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setTimeout(() => {
            setloading(false)
          }, 1000)

          let gridFilterData = response.result.data

          apiFilterData = gridFilterData.filters
          setApiFilterData(apiFilterData)
          setTimeout(() => {
            setloading(false)
          }, 100)
          console.log(apiFilterData)
          if (props.pageLabel === 'Pricing') {
            const valueEdit = {
              headerName: '',
              pinned: 'right',
              field: 'edit',
              onCellClicked: function (params: CellClickedEvent) {
                setParamData(params.data)
                setOpenAddRowModel(true)
              },
              cellClass: ['edit-icon-cell'],
              cellStyle: { cursor: 'pointer' },
              cellRenderer: () => {
                return `<img src=${EditIcon} />`
              },
            }
            gridFilterData.column_data.push(valueEdit)
          }
          if (props.pageLabel === 'Discount_Codes') {
            const valueEdit = {
              headerName: '',
              pinned: 'right',
              field: 'edit',
              onCellClicked: function (params: CellClickedEvent) {
                setParamData(params.data)
                setOpenAddRowDiscountModel(true)
              },
              cellClass: ['edit-icon-cell'],
              cellStyle: { cursor: 'pointer' },
              cellRenderer: () => {
                return `<img src=${EditIcon} />`
              },
            }
            gridFilterData.column_data.push(valueEdit)
          }
          if (props.pageLabel === 'Special_Pricing') {
            const valueEdit = {
              headerName: '',
              pinned: 'right',
              field: 'edit',
              onCellClicked: function (params: CellClickedEvent) {
                let data = Object.assign(params.data, { vendor_id: vendorId })
                setParamData(data)
                setEditSpecialPrice(true)
              },
              cellClass: ['edit-icon-cell'],
              cellStyle: { cursor: 'pointer' },
              cellRenderer: () => {
                return `<img src=${EditIcon} />`
              },
            }
            gridFilterData.column_data.push(valueEdit)
          }

          requestInfo = {
            body: {
              branch_id: branchValue,
              vendor_id: vId ? vId : vendorId,
              serverFilterOptions: apiFilterData ? apiFilterData : {},
            },
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + token,
            },
            url: `${process.env.REACT_APP_API_URL}/${props.apiDataUrl}`,
          }
          //setRequestInfo(requestInfo)
          setLocalStorage('requestInfo', JSON.stringify(requestInfo))

          SubscribeService.sendMessage(requestInfo)
          const columndata = getModifiedColumnData(gridFilterData)

          setColumnData(columndata)
          console.log(columndata)
        }
      })
      .catch((err: string) => {
        console.log(err)
      })

    return new Promise((resolve) => {
      resolve(true)
    })
  }

  let stateResponse: StateMaintainanceProps[]
  //const [ApiCalled, setApiCalled] = useState(false);

  function getStateManagement() {
    const apiObject = {
      payload: props.apiData.params ? props.apiData.params : {},
      method: 'GET',
      apiUrl: `${
        EndpointUrl.gridStateMaintainance
      }?name=${props.pageLabel.toLowerCase()}`,
      headers: {},
    }
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          if (response.result.data.length) {
            stateResponse = response.result.data

            let index: number = -1
            if (props.pageLabel === 'Contacts') {
              index = stateResponse.findIndex(function (
                element: StateMaintainanceProps,
                index: number,
              ) {
                return element.grid_name === 'contacts'
              })
            }
            if (props.pageLabel === 'Organizations') {
              index = stateResponse.findIndex(function (
                element: StateMaintainanceProps,
                index: number,
              ) {
                return element.grid_name === 'organizations'
              })
            }
            if (index > -1) {
              searchParam = stateResponse[index].data.searchkey
              searchfield = stateResponse[index].data.searchkey
              gridPage = stateResponse[index].data.pageNumber
              setSearchfield(searchfield)
              setSearchParam(searchParam)
              setLocalStorage('test', searchParam)
              setGridPage(gridPage)
              agFilter = stateResponse[index].data
              setAgFilter(stateResponse[index].data)
              console.log(stateResponse[index].data)
            }

            setLocalStorage('pageNo', JSON.stringify(gridPage))
          } else {
            // getGridData();
          }
          //setRequestInfo({
          //  body: {},
          //  method: 'GET',
          //  headers: {
          //    Authorization: 'Bearer ' + token,
          //  },
          //  url: `${process.env.REACT_APP_API_URL}/${props.apiDataUrl}`,
          //})
          setLocalStorage('requestInfo', JSON.stringify(requestInfo))
        }
      })
      .catch((err: string) => {
        console.log(err)
      })
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(stateResponse)
      }, 2000)
    })
  }

  function getOrgNameFilterData(params: Array<FilterColumnProps>) {
    let data = []
    data = params
      ? params.map((obj: FilterColumnProps) => {
          return obj.name
        })
      : []
    return data
  }

  function getModifiedColumnData(columnData: GridfilterData) {
    columnData.column_data.map(async (obj: ColumnHeaders) => {
      // obj["filter"] = true;
      // obj["width"] = 250;
      // obj["minWidth"] = 250;
      obj['enableServerSideSorting'] = true
      obj['enableServerSideFilter'] = true
      //obj['sortable'] = true
      obj['resizable'] = true
      obj['rowGroup'] = false
      obj['editable'] = false
      obj['suppressSizeToFit'] = false
      obj['filterParams'] = {}
      obj['filterParams']['buttons'] = ['apply', 'reset']
      obj['filterParams']['closeOnApply'] = true
      if (obj.field === 'edit') {
        obj['minWidth'] = 50
        obj['width'] = 50
      } else {
        obj['minWidth'] = 180
        obj['width'] = 180
      }
      if (obj.field === 'quantity') {
        // obj['cellStyle'] = { cursor: 'pointer'}
      }
      if (obj.field === 'quantity' && props.pageLabel === 'Pricing') {
        obj['cellStyle'] = { cursor: 'pointer' }
        obj['cellRenderer'] = function (params: CellClickedEvent) {
          return (
            `<span className="Icon" ><img src=${ClickIcon} /></span>` +
            params.value
          )
        }
      }
      if (obj.type === 'number' || obj.type === 'price') {
        obj['headerClass'] = 'ag-customHeader-number'
        obj['cellClass'] = 'ag-customCell-number'
      }
      if (obj.type === 'text') {
        obj['headerClass'] = 'ag-customHeader-text'
        obj['cellClass'] = 'ag-customCell-text'
      }
      if (obj.field === 'description') {
        obj['minWidth'] = 300
      }
      if (obj.field === 'quantity' || obj.field === 'discount_code') {
        obj['minWidth'] = 150
      }

      //   if (obj.field === 'quantity' || obj.field === 'pricing') {

      // }

      if (obj.field === 'contact_type') {
        obj['filterParams']['values'] = getOrgNameFilterData(
          columnData.filters.contact_type,
        )
      }
      if (obj.field === 'organization') {
        obj['filterParams']['values'] = getOrgNameFilterData(
          columnData.filters.organization,
        )
      }

      if (obj.field === 'account_type') {
        obj['filterParams']['values'] = getOrgNameFilterData(
          columnData.filters.account_type,
        )
      }
      if (obj.field === 'classification') {
        obj['filterParams']['values'] = getOrgNameFilterData(
          columnData.filters.classification,
        )
      }
      if (obj.field === 'industry') {
        obj['filterParams']['values'] = getOrgNameFilterData(
          columnData.filters.industry,
        )
      }
      if (obj.field === 'org_type') {
        obj['filterParams']['values'] = getOrgNameFilterData(
          columnData.filters.org_type,
        )
      }
      if (obj.field === 'quantity') {
        // obj["filter"] = true;
        obj['filterParams']['values'] = getOrgNameFilterData(
          columnData.filters.quantity,
        )
      }
      if (obj.field === 'discount_code') {
        // obj["filter"] = true;
        obj['filterParams']['values'] = getOrgNameFilterData(
          columnData.filters.discount_code,
        )
      }

      obj['tooltipValueGetter'] = (params: ITooltipParams) => {
        return params.value
      }
    })
    return columnData.column_data
  }
  function getBranchList2(vendorId: string) {
    const apiObject = {
      payload: {},
      method: 'GET',
      apiUrl: `${EndpointUrl.branchList}?vendor_id=${vendorId}`,
      headers: {},
    }
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          let bList = []
          bList = response.result.data.list
          setVendorId(vendorId)
          let list = []
          list = bList.map((item: BranchListProps) => {
            return {
              label: item.name,
              value: item.id,
              ...item,
            }
          })
          branchList = list
          // branchList = bList;
          setBranchList(branchList)

          if (response.result.data.total_count) {
            setPiDropdownlabel(bList[0].name)
          } else {
            piDropdownlabel = 'Select'
            setPiDropdownlabel(piDropdownlabel)
          }
          branchValue = bList.length ? bList[0].id : ''

          setBranchValue(branchValue)
          await getFilterData(vendorId)

          console.log(vendorId)
          requestInfo = {
            body: {
              branch_id: bList.length ? bList[0].id : '',
              vendor_id: vendorId,
              serverFilterOptions: apiFilterData ? apiFilterData : {},
            },
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + token,
            },
            url: `${process.env.REACT_APP_API_URL}/${props.apiDataUrl}`,
          }
          SubscribeService.sendMessage(requestInfo)
          //setLocalStorage('requestInfo', JSON.stringify(requestInfo))
          //console.log(vendorId)
          //setRequestInfo(requestInfo)
          setLocalStorage('requestInfo', JSON.stringify(requestInfo))

          setActive(vendorId)
          console.log(columndata)
          setColumnData([])
          //gridApi.purgeServerSideCache()
        }
      })
      .catch((err: string) => {
        console.log(err)
      })
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(branchList)
      }, 200)
    })
  }
  async function onItemClick(obj: SidenavProps) {
    //gridApi.setFilterModel(null)
    //removeLocalStorage('filter')

    //requestInfo = {
    //  body: {
    //    branch_id: branchValue,
    //    vendor_id: obj.key,
    //    serverFilterOptions: apiFilterData ? apiFilterData : {},
    //  },
    //  method: 'GET',
    //  headers: {
    //    Authorization: 'Bearer ' + token,
    //  },
    //  url: `${process.env.REACT_APP_API_URL}/${props.apiDataUrl}`,
    //}
    //setLocalStorage('requestInfo', JSON.stringify(requestInfo))
    await getBranchList2(obj.key)
  }

  let columnsStateData: ColumnState[]
  let gridEvent: GridReadyEvent
  let [gridApi, setGridApi]: any = useState({})
  let [columnsApi, setColumnApi]: any = useState({})
  const onGridReady = (params: GridReadyEvent) => {
    //setReady(false);
    gridEvent = params
    console.log(params)
    gridApi = params.api
    setGridApi(gridApi)
    columnsApi = params.columnApi
    setColumnApi(columnsApi)
    // params.api.purgeServerSideCache([]);
    // params.api.showLoadingOverlay()
    //if (
    //  props.pageLabel !== 'Pricing' &&
    //  props.pageLabel !== 'Discount_Codes' &&
    //  props.pageLabel !== 'Special_Pricing' &&
    //  agFilter
    //) {
    //  setStateManagement()
    //}
  }
  let [agFilter, setAgFilter]: any = useState(null)
  const filterChanged = (event: FilterChangedEvent) => {
    if (
      props.pageLabel !== 'Pricing' &&
      props.pageLabel !== 'Discount_Codes' &&
      props.pageLabel !== 'Special_Pricing'
    ) {
      setLocalStorage('filter', JSON.stringify(gridApi.getFilterModel()))
    }
  }
  function setStateManagement2() {
    console.log(gridApi, gridEvent)
    let leftkey: string = getLocalStorage('leftkey') as string
    let searchkey: string = searchParam
    let pageNo: string = gridApi.paginationGetCurrentPage()

    columnsStateData = columnsApi.getColumnState()
    let fltrstate = gridApi.getFilterModel()
    pageNumber = pageNo ? JSON.parse(pageNo) : ''

    let params = {
      grid_name: props.pageLabel.toLowerCase(),
      data: {
        fltrstate,
        columnsStateData,
        leftkey,
        searchkey,
        pageNumber,
        pageIndex,
        sort,
        sortkey,
      },
    }

    saveStateManagement2(params)
  }
  function saveStateManagement2(params: StateMaintainanceProps) {
    const apiObject = {
      payload: params ? params : {},
      method: 'POST',
      apiUrl: `${EndpointUrl.gridStateMaintainance}`,
      headers: {},
    }

    triggerApi(apiObject).then(async (response: ApiResponse) => {
      if (response.result.success) {
        //let index: number = -1;
        stateResponse = response.result.data
        //if (props.pageLabel === 'Contacts') {
        //  index = stateResponse.findIndex(function (
        //    element: StateMaintainanceProps,
        //    index: number
        //  ) {
        //    return element.grid_name === 'contacts';
        //  });
        //}
        //if (props.pageLabel === 'Organizations') {
        //  index = stateResponse.findIndex(function (
        //    element: StateMaintainanceProps,
        //    index: number
        //  ) {
        //    return element.grid_name === 'organizations';
        //  });
        //}
        // agFilter = stateResponse[index].data.pageNumber;
        // setAgFilter(agFilter);
      }
    })
  }

  function setStateManagement() {
    let leftkey: string = getLocalStorage('leftkey') as string
    let searchkey: string = searchParam
    let pageNo: string = getLocalStorage('pageNo') as string
    let fltrstate
    console.log(agFilter)
    if (agFilter) {
      columnsStateData = agFilter.columnsStateData
      fltrstate = agFilter.fltrstate
    }
    if (pageNo) {
      pageNumber = JSON.parse(pageNo)
    }

    let params = {
      grid_name: props.pageLabel.toLowerCase(),
      data: {
        fltrstate,
        columnsStateData,
        leftkey,
        searchkey,
        pageNumber,
        pageIndex,
        sort,
        sortkey,
      },
    }

    saveStateManagement(params)
  }
  function saveStateManagement(params: StateMaintainanceProps) {
    const apiObject = {
      payload: params ? params : {},
      method: 'POST',
      apiUrl: `${EndpointUrl.gridStateMaintainance}`,
      headers: {},
    }

    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          stateResponse = response.result.data
          let index: number = -1
          if (props.pageLabel === 'Contacts') {
            index = stateResponse.findIndex(function (
              element: StateMaintainanceProps,
              index: number,
            ) {
              return element.grid_name === 'contacts'
            })
          }
          if (props.pageLabel === 'Organizations') {
            index = stateResponse.findIndex(function (
              element: StateMaintainanceProps,
              index: number,
            ) {
              return element.grid_name === 'organizations'
            })
          }

          if (gridEvent && index > -1) {
            columnsApi.applyColumnState({
              state: stateResponse[index].data.columnsStateData,
              applyOrder: true,
            })

            gridApi.setFilterModel(stateResponse[index].data.fltrstate)

            let pageno: number = stateResponse[index].data.pageNumber
            gridApi.paginationGoToPage(pageno)

            //gridApi.paginationGoToPage(2)
          }
          // filterGridData = localStorage.getItem("filterState") as string;
          // if (filterGridData) {
          //   gridApi.setFilterModel(JSON.parse(filterGridData));
          // }
        }
      })
      .catch((err: string) => {
        console.log(err)
      })
  }
  const [showToast, setToast] = useState(false)
  let [toastProps, setToastProps] = useState({
    appearance: 'success',
    message: 'Filter Saved Successfully',
  })
  function saveFilterValues(values: SubmitFilterProps) {
    setloading(true)

    let apiResponse: ApiResponse
    let params = {
      // filter_data: {
      ...values,
      // },
      grid_name: props.pageLabel.toLowerCase(),
      is_filter_shared: true,
    }

    const apiObject = {
      payload: params,
      method: 'POST',
      apiUrl: `${EndpointUrl.userSavedFilters}`,
      headers: {},
    }

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setTimeout(() => {
            setloading(false)
          }, 1000)

          apiResponse = response
          let obj = {
            appearance: 'success',
            message: 'Filter Saved Successfully',
          }
          toastProps = obj
          setToastProps(toastProps)
        } else {
          let obj = {
            appearance: 'error',
            message: 'Failed to Save Filter',
          }
          toastProps = obj
          setToastProps(toastProps)
        }
        setToast(true)

        setTimeout(() => {
          setToast(false)
          // setloading(false);
        }, 1500)
      })
      .catch((err: string) => {
        console.log(err)
      })
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(apiResponse)
      }, 2000)
    })
  }

  async function clickAlert(e: SubmitFilterProps) {
    let leftkey: string = getLocalStorage('leftkey') as string
    let searchkey: string = searchParam

    columnsStateData = columnsApi.getColumnState()
    let fltrstate = gridApi.getFilterModel()
    pageNumber = gridPage

    let params = {
      ...e,
      filter_data: {
        columnsStateData,
        fltrstate,
        leftkey,
        searchkey,
        sort,
        sortkey,
        pageNumber,
        // filterrModelData
      },
    }
    saveFilterValues(params)
  }

  async function searchValue(e: string, filterdata?: FilterDataObject) {
    // if (
    //   gridApi.getFilterModel() &&
    //   Object.keys(gridApi.getFilterModel()).length
    // ) {

    // }
    searchParam = e
    setSearchParam(searchParam)
    setLocalStorage('test', searchParam)
    setStateManagement2()
    setTimeout(() => {
      gridApi.purgeServerSideCache()
    }, 1000)

    // let object = gridApi.getFilterModel();
    // gridApi.setFilterModel(object);
  }
  let [searchfield, setSearchfield] = useState('')

  async function filterData(e: GetFilterProps) {
    if (e.id === 'default') {
      searchfield = ''
      setSearchfield(searchfield)
      searchParam = ''
      setSearchParam(searchParam)
      gridPage = 0
      setGridPage(gridPage)
      removeLocalStorage('filter')
      removeLocalStorage('pageNo')

      gridApi.paginationGoToPage(0)

      columnsApi.resetColumnState()
      gridApi.setFilterModel(null)
    } else {
      console.log(e)
      // setGridPage(e.filter_data.pageNumber);
      // localStorage.removeItem("pageNo");
      setTimeout(() => {
        if (e.filter_data.searchkey.length) {
          searchfield = e.filter_data.searchkey
          setSearchfield(searchfield)
          searchParam = e.filter_data.searchkey
          setSearchParam(searchParam)
        }
        setLocalStorage('pageNo', JSON.stringify(e.filter_data.pageNumber))
        gridApi.paginationGoToPage(e.filter_data.pageNumber)
        columnsApi.applyColumnState({
          state: e.filter_data.columnsStateData,
          applyOrder: true,
        })
        if (
          e.filter_data.fltrstate &&
          Object.keys(e.filter_data.fltrstate).length
        ) {
          gridApi.setFilterModel(e.filter_data.fltrstate)
        }
      }, 100)
    }

    setStateManagement2()
  }

  function sortChanged(event: SortChangedEvent) {
    gridEvent = event
    if (
      gridEvent &&
      props.pageLabel !== 'Pricing' &&
      props.pageLabel !== 'Discount_Codes' &&
      props.pageLabel !== 'Special_Pricing'
    ) {
      setStateManagement2()
    }
  }
  function pageChanged(params: PaginationChangedEvent) {
    if (
      props.pageLabel !== 'Pricing' &&
      props.pageLabel !== 'Discount_Codes' &&
      props.pageLabel !== 'Special_Pricing'
    ) {
      gridEvent = params
      console.log(params)
      gridApi = params.api
      setGridApi(gridApi)
      columnsApi = params.columnApi
      setColumnApi(columnsApi)

      setTimeout(() => {
        setStateManagement2()
      }, 2000)
    }

    // let currentPage = event.api.paginationGetCurrentPage();
    // localStorage.setItem("pageNo", JSON.stringify(currentPage));
    // if (event.newPage && !ApiCalled) {
    //   let currentPage = event.api.paginationGetCurrentPage();
    //   localStorage.setItem("pageNo", JSON.stringify(currentPage));
    // }
    // if (gridPage && ApiCalled) {
    //   if (gridPage > event.api.paginationGetCurrentPage()) {
    //     gridPage = gridPage;
    //     let p = localStorage.getItem("pageNo") as string;
    //     let p1 = JSON.parse(p);
    //     event.api.paginationGoToPage(p1);
    //     localStorage.setItem("pageNo", JSON.stringify(gridPage));
    //   } else {
    //     gridPage = event.api.paginationGetCurrentPage();
    //     localStorage.setItem("pageNo", JSON.stringify(gridPage));
    //   }
    // } else {
    //   gridPage = event.api.paginationGetCurrentPage();
    //   localStorage.setItem("pageNo", JSON.stringify(gridPage));
    // }
  }

  function FirstDataRendered(e: FirstDataRenderedEvent) {
    console.log(e)
    //setApiCalled(true);
    setTimeout(() => {
      let filter: string = getLocalStorage('filter') as string
      if (filter) {
        filter = JSON.parse(filter)
        gridApi.setFilterModel(filter)
      }
    }, 1000)

    // const pageToNavigate = JSON.parse(localStorage.getItem("pageNo") as string);
    // e.api.paginationGoToPage(2);
  }
  function componentStateChanged(e: ComponentStateChangedEvent) {
    // gridEvent = e;
    // if (
    //   gridEvent &&
    //   props.pageLabel !== "Pricing" &&
    //   props.pageLabel !== "Discount_Codes"
    // ) {
    //   setStateManagement2();
    // }
  }
  function DisplayedColumnsChanged(e: DisplayedColumnsChangedEvent) {}
  let [gridPage, setGridPage] = useState<number>(0)
  function ColumnEverythingChanged(e: ColumnEverythingChangedEvent) {
    // let p = e.api.paginationGetCurrentPage();
    // setGridPage(p);
  }

  function VirtualColumnsChanged(e: VirtualColumnsChangedEvent) {}

  function fileSelect(e: any) {
    console.log(e, vendorId)
    setVendorId(e.vendor_id)

    setBranchValue(e.branch_id)
    getBranchList()
    setTimeout(() => {
      gridApi.purgeServerSideCache([])
    }, 500)

    // setRequestInfo({
    //   body: {
    //     branch_id: e.branch_id,
    //     vendor_id: e.vendor_id
    //   },
    //   method: "GET",
    //   headers: {
    //     Authorization:
    //       "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiYzg2ZGQwN2U0OTU4MzBiNTI3MDBmMjRkMDRmNzY2NTUzOGYxZmNhNjNjNzUzYTFkMDRkODQwMjYzNTc2MGJjYjExZjY1N2E3YTMxODg1ZGQiLCJpYXQiOjE2NDU2MDQ2NzAuNTA3OTc4LCJuYmYiOjE2NDU2MDQ2NzAuNTA3OTgsImV4cCI6MTY0NjkwMDY3MC40OTgwNzQsInN1YiI6IjQ1NGRiOTFhLWQ1NTYtNDI3Ny1hODZhLTVmM2RkNDQyZjk2YiIsInNjb3BlcyI6W119.z1TwcJFWneOekCD15LDnQBQCfkbSjZ43ro-rUYxbY9iF6BjJZIMPYIBKO6SmvoxyaFhgf0f3FJ-xRTMEIIlu7YiuPXcs43mYLGVUOxgzrJtLpbPL1Vl8i0hAmdFVedj374-QkhgG52qhPPf0Fi_3W0eDlro9NQdj00sKcWbvTL1qTSIIze7ahlE_JQDL_FM_vs0H3L6Fi8s6hdRqXZxYAVOuFetfgbMAQECOOhM9rt2ZnJ6NWh856YOKoDHRIefM4pRfzZfEEqK2aGHldCHpH_18uE6FfAT9Q0hEZjXXwAtOgy7Zc1bCFbQ0lizkAJbSUGG8nqFLHkf--LEa4Zk0cfVriyfgTTcHr7QCxgvwThWMkgV-me69rjykZySdlr5Cdhp-PEQLDhzY5a1b_ATjPexI3oSJnd_WC7t4dLVzzYomVcO3OPMBZe8JfSjkQVwPydNuEo1TX7aspbuG-UQYQWs51ojpDIMD4KsYQ5qDRufy_AAujQmt5KxTCj6AlezZG-fFnPp-1d6stFAC99cGD7RmDfIquNSfuLOEt_D-8Bi7Qy55YD9EvlUr8_BhcUCxUeQrJCqb9mY1VXXRIIV6CoicQrzqw2mYMWDoITy-qTsjD8aF-hAze-D8Gb2D9_fysm-H8DGO9wFL9JGs6r_9aNEVnh2MNWBBbZY2qwGSoBs"
    //   },
    //   url: `https://buzzworlddev-iidm.enterpi.com:8446/${props.apiDataUrl}`
    // });
  }

  function selectBranch(e: BranchSelectProps) {
    //const target = { value: e.value, label: e.label }

    //let selectedBrnch = Object.assign({}, target)
    //setSelectedBrnch(selectedBrnch)
    branchValue = e.id
    setBranchValue(e.id)
    setPiDropdownlabel(e.name)
    requestInfo = {
      body: {
        branch_id: e.id,
        vendor_id: vendorId,
        serverFilterOptions: apiFilterData ? apiFilterData : {},
      },
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      url: `${process.env.REACT_APP_API_URL}/${props.apiDataUrl}`,
    }
    //setRequestInfo(requestInfo)
    setLocalStorage('requestInfo', JSON.stringify(requestInfo))

    gridApi.purgeServerSideCache([])
    SubscribeService.sendMessage(requestInfo)
  }
  async function getUploadEvent(e?: FileProps) {
    if (e && e.success) {
      setOpenGridModel(false)
    } else {
      setOpenGridModel(false)
    }
    //gridApi.purgeServerSideCache([])
  }

  function filterOpened(e: any) {
    console.log(e)
    //getFilterData2()
  }

  function cellValueChanged(event: CellValueChangedEvent) {
    if (props.pageLabel === 'Discount_Codes') {
      let field: string | any = event.colDef.field
      let param = {
        account_type_id: event.data[field.concat('_id')],
        branch_id: branchValue,
        vendor_id: vendorId,
        value: event.value,
        quantity_id: event.data.quantity_id,
      }
      const apiObject = {
        payload: param,
        method: 'PUT',
        apiUrl: `${EndpointUrl.discountCodesApi}/${event.data.id}`,
        headers: {},
      }

      triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            let obj = {
              appearance: 'success',
              message: 'Edited Successfully',
            }
            // toastProps = obj;
            setToastProps(obj)
          } else {
            let obj = {
              appearance: 'error',
              message: response.result.data,
            }
            // toastProps = obj;
            setToastProps(obj)
          }
          setToast(true)

          setTimeout(() => {
            setToast(false)
          }, 1500)
        })
        .catch((err: string) => {
          console.log(err)
        })
    }
  }
  async function getAddRowDiscountEvent(e: FileProps) {
    if (e.success) {
      setOpenAddRowDiscountModel(false)
      let obj = {
        appearance: 'success',
        message: 'Saved Successfully',
      }
      toastProps = obj
      setToastProps(toastProps)
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 1500)
      gridApi.purgeServerSideCache([])
    } else {
      setOpenAddRowDiscountModel(false)
    }
  }

  async function getEditSpecialPrice(e: any) {
    if (e.success) {
      setEditSpecialPrice(false)
      let obj = {
        appearance: 'success',
        message: 'Saved Successfully',
      }
      toastProps = obj
      setToastProps(toastProps)
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 1500)
      gridApi.purgeServerSideCache([])
    } else {
      setEditSpecialPrice(false)
    }
  }

  async function getEditPricing(e: any) {
    if (e.success) {
      setOpenAddRowModel(false)
      let obj = {
        appearance: 'success',
        message: 'Saved Successfully',
      }
      toastProps = obj
      setToastProps(toastProps)
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 1500)
      gridApi.purgeServerSideCache([])
    } else {
      setOpenAddRowModel(false)
    }
  }

  function keyUp(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      setTimeout(() => {
        // searchEvent(`${SearchValue}`);
      }, 1000)
    }
  }

  function dragStopped() {
    if (
      props.pageLabel !== 'Pricing' &&
      props.pageLabel !== 'Discount_Codes' &&
      props.pageLabel !== 'Special_Pricing'
    ) {
      setStateManagement2()
    }
  }

  function valueChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
    let keyword = e.target.value
    console.log(keyword)

    setVendorList([])

    const apiObject = {
      payload: {},
      method: 'GET',
      apiUrl: `${EndpointUrl.vendorList}/?search=${keyword}`,
      headers: {},
    }

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          // let list = []

          let list = response.result.data.list
          list = list.map((item: any) => {
            return {
              key: item.id,
              label: item.name,
              ...item,
            }
          })
          vendorsList = list
          setVendorList(vendorsList)
          if (list.length > 0) {
            setIsVendorList(true)
          } else {
            setIsVendorList(false)
          }
          if (keyword.length && list.length > 0) {
            setIsVendorList(true)
          } else {
            setIsVendorList(false)
          }
        }
      })
      .catch((err: string) => {
        console.log(err)
      })

    //if (keyword !== '') {
    //  const results = vendorsList.filter((user: SidenavProps) => {
    //    return user.label.toLowerCase().startsWith(keyword.toLowerCase())
    //  })
    //  // setFoundUsers(results);
    //  setVendorList(results)
    //} else {
    //  // setFoundUsers(USERS);
    //  setVendorList(vendorsList)
    //}

    //if (vendorsList.length) {
    //  setIsVendorList(true)
    //} else {
    //  setIsVendorList(false)
    //}
  }
  function clearSearch() {
    setIsVendorList(false)
    setTimeout(() => {
      getVendorList()
      setSearchValue('')
    }, 500)

    // searchEvent("");
  }
  const [openAddRowModel, setOpenAddRowModel] = useState(false)

  return (
    <Fragment>
      {showToast && <Snackbar {...toastProps}></Snackbar>}
      <Header>
        <SecondaryHeader
          logo={props.pageLogo}
          data={props.pageLabel}
          searchkey={searchfield}
          onChildClick={clickAlert}
          searchEvent={searchValue}
          filterEvent={filterData}
          onFileSelect={fileSelect}
        ></SecondaryHeader>
        {props &&
          (props.pageLabel === 'Pricing' ||
            props.pageLabel === 'Discount_Codes') && (
            <div className="Selector-Branch">
              <PiSelect
                // label={piDropdownlabel}
                libraryType="atalskit"
                // name="select"
                //defaultValue={selectedBrnch}
                name={piDropdownlabel}
                onChange={(e: any) => selectBranch(e)}
                value={branchValue}
                options={branchList}
                placeholder={piDropdownlabel}
                isDisabled={branchList.length > 1 ? false : true}
              />
            </div>
          )}
      </Header>

      <div>
        {openGridModel && (
          <ModelGrid
            data={modelGridData}
            onFileSelect={getUploadEvent}
            ColumnData={modelGridColumnData}
          ></ModelGrid>
        )}

        {openAddRowDiscountModel && (
          <DiscountAddRowModel
            reqInfo={reqInfo}
            onFileSelect={getAddRowDiscountEvent}
            paramData={paramData}
          ></DiscountAddRowModel>
        )}
        {openEditspecialPrice && (
          <SpecialPricingEditModal
            reqInfo={reqInfo}
            organizationData={[]}
            onFileSelect={getEditSpecialPrice}
            paramData={paramData}
          ></SpecialPricingEditModal>
        )}

        {openAddRowModel && (
          <PricingAddRowModel
            reqInfo={reqInfo}
            onFileSelect={getEditPricing}
            paramData={paramData}
          ></PricingAddRowModel>
        )}
      </div>

      <TableListContainer className="Body-Container">
        {props &&
          (props.pageLabel === 'Pricing' ||
            props.pageLabel === 'Discount_Codes' ||
            props.pageLabel === 'Special_Pricing') && (
            <SideMenuContainer>
              <div className="sideList-Search">
                <PiSearch
                  libraryType="atalskit"
                  onClear={clearSearch}
                  onValueChange={(e) => valueChanged(e)}
                  onKeyUp={(e) => keyUp(e)}
                  placeholder="Search"
                  value={SearchValue}
                />
              </div>

              <SideMenuList isActive={active} className="menu-list">
                <div className="left-menu">
                  <PiLeftMenu
                    activeKey={active}
                    onMenuClick={(e) => onItemClick(e)}
                    options={vendorsList}
                  />
                  {!isVendorList && (
                    <NoVendorFound>No Vendors Found</NoVendorFound>
                  )}
                </div>
              </SideMenuList>
              {vendorSpinner && (
                <SpinnerDiv>
                  <PiSpinner color="primary" size={30} libraryType="atalskit" />
                </SpinnerDiv>
              )}
            </SideMenuContainer>
          )}

        {/*{loading && <Loader />}*/}
        {/*{!loading && (*/}
        <>
          <TableContainer>
            {/* {props &&
                (props.pageLabel === 'Pricing' ||
                  props.pageLabel === 'Discount_Codes') && (
                  <div className="Selector">
                    <PiSelect
                      // label={piDropdownlabel}
                      libraryType="atalskit"
                      // name="select"
                      defaultValue={selectedBrnch}
                      name={piDropdownlabel}
                      onChange={(e: any) => selectBranch(e)}
                      value={branchValue}
                      options={branchList}
                      placeholder={piDropdownlabel}
                    />
                  </div>
                )} */}
            <TableGrid>
              <div className="ag-theme-alpine ag-style">
                {/*{Object.keys(requestInfo).length && !loading && (*/}
                <>
                  <PiServerGrid
                    columns={columndata}
                    mode="paginate"
                    searchValue={searchParam}
                    serverFilterOptions={apiFilterData ? apiFilterData : {}}
                    onFilterChanged={(e: FilterChangedEvent) =>
                      filterChanged(e)
                    }
                    onSortChanged={(e: SortChangedEvent) => sortChanged(e)}
                    onComponentStateChanged={(e: ComponentStateChangedEvent) =>
                      componentStateChanged(e)
                    }
                    onDisplayedColumnsChanged={(
                      e: DisplayedColumnsChangedEvent,
                    ) => DisplayedColumnsChanged(e)}
                    onColumnEverythingChanged={(
                      e: ColumnEverythingChangedEvent,
                    ) => ColumnEverythingChanged(e)}
                    onVirtualColumnsChanged={(e: VirtualColumnsChangedEvent) =>
                      VirtualColumnsChanged(e)
                    }
                    onFirstDataRendered={(e: FirstDataRenderedEvent) =>
                      FirstDataRendered(e)
                    }
                    onCellClicked={(e: CellClickedEvent) => cellClicked(e)}
                    onCellValueChanged={(e: CellValueChangedEvent) =>
                      cellValueChanged(e)
                    }
                    onFilterOpened={filterOpened}
                    onGridReady={onGridReady}
                    onPaginationChanged={(e: PaginationChangedEvent) =>
                      pageChanged(e)
                    }
                    paginationPageSize={25}
                    onDragStopped={dragStopped}
                    //requestInfo={requestInfo}
                    rowHeight={40}
                    // overlayLoadingTemplate={
                    //    '<span className="ag-overlay-loading-center">Please wait while your rows are loading...</span>'
                    //  }
                    overlayNoRowsTemplate={`<span className="ag-overlay-loading-center no-data-styles">No ${pageName} Found </span>`}
                  />
                </>
                {/*)}*/}
              </div>
            </TableGrid>
          </TableContainer>
        </>
        {/*)}*/}
      </TableListContainer>
    </Fragment>
  )
}

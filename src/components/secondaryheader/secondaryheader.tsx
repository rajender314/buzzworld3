/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-script-url */
import {
  PiTypography,
  PiSearch,
  PiSectionMessage,
  PiLozenge,
  PiIconDropdownMenu,
  PiModal,
  PiModalHeader,
  PiModalBody,
} from 'pixel-kit'
import { Fragment, useState, useEffect } from 'react'
import React from 'react'
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu'
import Trash from '../../assets/images/trash.svg'
import ExportLogo from '../../assets/images/Export.svg'
import ImportLogo from '../../assets/images/Import.svg'
import AddLogo from '../../assets/images/addIcon.svg'
import MultiEditLogo from '../../assets/images/multiEditIcon.svg'
import SaveViewLogo from '../../assets/images/saveview.svg'
import CrossLogo from '../../assets/images/cross.svg'
import {
  SecondaryHeaderContainer,
  LeftContent,
  RightContent,
  DropdownDelete,
  DropdownDiv,
  SaveViewDiv,
  ImgDiv,
  ButtonsGroup,
  SearchDiv,
  ImgTag,
  LinkWithIcon,
  ExportIconPopup,
  ExportIconPopupHeader,
} from './secondaryheader.component'
import { triggerApi } from 'src/services/api-services'
import EndpointUrl from 'src/core/apiEndpoints/endPoints'
// import PrimaryHeader from './primaryheader.component'
import SaveFilterModel from 'src/components/savefiltermodel'
import FileUploadModel from 'src/components/fileuploadModel'
import {
  ApiResponse,
  GetFilterProps,
  SavedFilterProps,
  SaveFilterProps,
  SubmitFilterProps,
} from 'src/services/schema/schema'
import { SubscribeService } from 'src/services/subscribe-service'
import MultiEditModel from 'src/components/multiEditModel/multiEditModel'
import PricingAddRowModel from 'src/components/pricingAddRowModel/pricingAddRowModel'
import DiscountAddRowModel from 'src/components/discountAddRowModel/discountAddRowModel'
import SpecialPricingAddRowModel from '../specialPricingAddrowModal/specialPricingAddrowModal'
import { CloseButton } from '../adminaddrowmodel/adminaddrowmodel.component'
import { PopupHeaderDiv } from '../fileuploadModel/fileuploadModel.component'

type Props = {
  logo: string
  data: string
  searchkey: string
  onChildClick: (e: SubmitFilterProps) => {}
  searchEvent: (e: string) => {}
  filterEvent: (e: GetFilterProps) => {}
  onFileSelect: any
}
type FileProps = {
  success: boolean
}
export default function SecondaryHeader({
  logo,
  data,
  searchkey,
  onChildClick,
  searchEvent,
  filterEvent,
  onFileSelect,
}: Props) {
  const [searchValue, setSearchValue] = useState('')
  let [pageLabel, setPageLabel] = useState(data)
  const [openModel, setOpenModel] = useState(false)
  const [openPopupModel, setOpenPopupModel] = useState(false)
  let [savedFilter, setSavedList] = useState([])
  const [filterName, setSelectedFiltName] = useState('Saved Views')
  let [filterlistResponse, setFilterlistResponse] = useState([])
  let [reqInfo, setReqInfo] = useState({
    body: {
      branch_id: '',
      vendor_id: '',
    },
    headers: {
      Authorization: '',
    },
    method: '',
    url: '',
  })
  const [openMultiModel, setMultiModel] = useState(false)
  const [openAddRowModel, setOpenAddRowModel] = useState(false)
  const [openAddRowDiscountModel, setOpenAddRowDiscountModel] = useState(false)
  const [openAddRowSpecialPricing, setOpenAddRowSpecialPricing] = useState(
    false,
  )
  const [organizationData, setOrganizationData] = useState([])
  const itemsList = [
    {
      id: '1',
      element: (
        <LinkWithIcon href="javascript:void(0)" onClick={openAddRow}>
          <ImgTag src={AddLogo} className="save-view Export-Image" />
          <span className="link-icon-text">Add</span>
        </LinkWithIcon>
      ),
    },
    {
      id: '2',
      element: (
        <LinkWithIcon href="javascript:void(0)" onClick={openModelWindow}>
          <ImgTag
            src={ImportLogo}
            className="save-view Export-Image"
            title="Import"
          />
          <span className="link-icon-text">Import</span>
        </LinkWithIcon>
      ),
    },
    {
      id: '3',
      element: (
        <LinkWithIcon
          // href={baseUrl + exportUrl}
          onClick={exportData}
        >
          <ImgTag src={ExportLogo} className="save-view Export-Image" />
          <span className="link-icon-text">Export</span>
        </LinkWithIcon>
      ),
    },
  ]
  let baseUrl = process.env.REACT_APP_API_URL

  function valueChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }
  function clearSearch() {
    setSearchValue('')
    searchEvent('')
  }
  // console.log(props);
  function openModelWindow() {
    setOpenModel(true)
    // console.log(saveFilter(props));
  }
  function openMultiEditModel() {
    setMultiModel(true)
  }
  function keyUp(e: any) {
    if (e.target.value && e.target.value.length >= 3) {
      setTimeout(() => {
        searchEvent(searchValue)
      }, 1000)
    }
  }

  async function getModelEvent(e: SubmitFilterProps) {
    // console.log(e);
    if (e.filter_name !== '') {
      setTimeout(() => {
        getFilterData()
      }, 500)
      setOpenModel(false)
      onChildClick(e)
    } else {
      setOpenModel(false)
    }
  }

  async function getUploadEvent(e: SaveFilterProps) {
    // console.log(e);
    if (Object.keys(e).length) {
      setOpenModel(false)
      onFileSelect(e)
    } else {
      setOpenModel(false)
    }
  }

  async function getUploadEvent2(e?: FileProps) {
    // console.log(e);
    if (e && e.success) {
      setMultiModel(false)
      onFileSelect(e)
      setToast(true)
      let toastMsg = 'Saved Succesfully'
      setToastMsg(toastMsg)
      setTimeout(() => {
        setToast(false)
      }, 1500)
    } else {
      setMultiModel(false)
    }
  }
  async function getAddRowEvent(e?: FileProps) {
    // console.log(e);

    if (pageLabel === 'Pricing') {
      if (e && e.success) {
        setOpenAddRowModel(false)
        onFileSelect(e)
        setToast(true)
        let toastMsg = 'Saved Succesfully'
        setToastMsg(toastMsg)
        setTimeout(() => {
          setToast(false)
        }, 1500)
      } else {
        setOpenAddRowModel(false)
      }
    } else if (pageLabel === 'Special Pricing') {
      if (e && e.success) {
        setOpenAddRowSpecialPricing(false)
        onFileSelect(e)
        setToast(true)
        let toastMsg = 'Saved Succesfully'
        setToastMsg(toastMsg)
        setTimeout(() => {
          setToast(false)
        }, 1500)
      } else {
        setOpenAddRowSpecialPricing(false)
      }
    }
  }
  async function getAddRowDiscountEvent(e?: FileProps) {
    // console.log(e);
    if (e && e.success) {
      setOpenAddRowDiscountModel(false)
      onFileSelect(e)
      setToast(true)
      let toastMsg = 'Saved Succesfully'
      setToastMsg(toastMsg)
      setTimeout(() => {
        setToast(false)
      }, 1500)
    } else {
      setOpenAddRowDiscountModel(false)
    }
  }
  let [exportUrl, setExportUrl] = useState<string>('')

  useEffect(() => {
    SubscribeService.getMessage().subscribe((data: any) => {
      console.log(data)
      if (data) {
        reqInfo = data.data
        setReqInfo(reqInfo)
      }
    })
  }, [])

  useEffect(() => {
    getFilterData()
    itemsRemoveList()
    setSearchValue(searchkey)
    if (
      data === 'Account_Types' ||
      data === 'Classifications' ||
      data === 'Contact_Types' ||
      data === 'Industry' ||
      data === 'PO_Min_Qty' ||
      data === 'Sales_Potential'
    ) {
      setPageLabel('Admin')
    } else if (data === 'Vendors') {
      setPageLabel('Pricing')
    } else if (data === 'Discount_Codes') {
      setPageLabel('Discount Codes')
    } else if (data === 'Special_Pricing') {
      setPageLabel('Special Pricing')
    } else {
      pageLabel = data
      setPageLabel(pageLabel)
    }
    // let url: string = localStorage.getItem("appUrl") as string;
    // // url = url.replace(`${process.env.REACT_APP_API_URL}`, "");
    // if (url) {
    //   url = url.substring(url.indexOf("&") + 1);
    // }

    // exportUrl = EndpointUrl.exportFilters.concat(
    //   "?" + `${url}` + `&grid_name=${data.toLowerCase()}`
    // );
    // console.log(url);
    // setExportUrl(exportUrl);
    // console.log(setSearchValue(searchkey), searchValue);
    // let a: any = localStorage.getItem("searchVal");
    // setSearchValue(a);
    // if (a) {
    //   searchEvent(a);
    // }

    // console.log(subscription);
  }, [searchkey])
  function getFilterData() {
    const apiObject = {
      payload: {},
      method: 'GET',
      apiUrl: `${EndpointUrl.filterDataApi}?name=${data.toLowerCase()}`,
      headers: {},
    }
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setOrganizationData(response.result.data.filters.organization)
          let list = response.result.data.saved_filters
          list.unshift({
            id: 'default',
            filter_name: 'Default',
            is_delete_option: false,
          })

          // console.log(list);
          setFilterlistResponse(list)
          savedFilter = list.map((item: GetFilterProps) => {
            return {
              value: item.id,
              label: item.filter_name,
              created_by: item.created_by,
              created_date: item.created_date,
              is_delete_option: item.is_delete_option,
            }
          })
          setSavedList(savedFilter)

          // console.log(savedFilter);
        }
      })
      .catch((err: string) => {
        console.log(err)
      })
  }
  function openAddRow() {
    if (pageLabel === 'Pricing') {
      setOpenAddRowModel(true)
    } else if (pageLabel === 'Special Pricing') {
      setOpenAddRowSpecialPricing(true)
    }
  }
  function openAddDiscountRow() {
    setOpenAddRowDiscountModel(true)
  }
  function onFilterChanged(e: SavedFilterProps) {
    // console.log(e);
    setSelectedFiltName(e.label)
    var index = filterlistResponse.findIndex(function (
      element: GetFilterProps,
    ) {
      return element.id === e.value
    })
    // console.log(index);
    filterEvent(filterlistResponse[index])
  }

  function deleteFilterName(item: SavedFilterProps) {
    let id = item.value
    let url = `${EndpointUrl.userSavedFilters}/`
    // console.log(a);

    const apiObject = {
      payload: {},
      method: 'DELETE',
      apiUrl: url.concat(id),
      headers: {},
    }
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setToast(true)
          let toastMsg = 'Filter Deleted Succesfully'
          setToastMsg(toastMsg)
          setTimeout(() => {
            setToast(false)
          }, 1500)
          getFilterData()
        }
      })
      .catch((err: string) => {
        console.log(err)
      })
  }

  function exportData() {
    let url: string = localStorage.getItem('appUrl') as string
    // url = url.replace(`${process.env.REACT_APP_API_URL}`, "");
    if (url) {
      url = url.substring(url.indexOf('&') + 1)
    }

    exportUrl = EndpointUrl.exportFilters.concat(
      '?' + `${url}` + `&grid_name=${data.toLowerCase()}`,
    )
    let toastMsg = 'Data is exported sucessfully'
    setToastMsg(toastMsg)
    setToast(true)
    setTimeout(() => {
      setToast(false)
    }, 1500)
    console.log(url)
    setExportUrl(exportUrl)
    console.log(exportUrl)
    window.location.href = baseUrl + exportUrl
    // const apiObject = {
    //   payload: {},
    //   method: "GET",
    //   apiUrl: url,
    //   headers: {}
    // };
    // triggerApi(apiObject)
    //   .then(() => {

    //   })
    //   .catch((err: string) => {
    //     console.log(err);
    //   });
  }
  function closeModel() {
    // console.log(222);
    setOpenPopupModel(false)
  }
  function exportDataMail() {
    // let toastMsg = 'Data is being exporting. Please wait...'
    // setToastMsg(toastMsg)
    // setToast(true)
    // setTimeout(() => {
    //   setToast(false)
    // }, 1500)
    setOpenPopupModel(true)
    let expurl: string = localStorage.getItem('appUrl') as string
    console.log(expurl)
    // url = url.replace(`${process.env.REACT_APP_API_URL}`, "");
    if (expurl) {
      console.log(expurl.indexOf('&'))
      expurl = expurl.substring(expurl.indexOf('&') + 1)
      console.log(expurl)
    }

    let exportUrl = EndpointUrl.exportDataByMail.concat(
      '?' + `${expurl}` + `&grid_name=${data.toLowerCase()}`,
    )
    let url = `${exportUrl}&grid_name=${data.toLowerCase()}`
    exportUrl = url
    setExportUrl(exportUrl)

    // let url2 = `${url}?page=${pageNumber}&sort=${sort}&sort_key=${sortkey}`

    const apiObject = {
      payload: {},
      method: 'GET',
      apiUrl: url,
      headers: {},
    }
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          // setToast(true)
          let toastMsg = response.result.data
          setToastMsg(toastMsg)

          // setTimeout(() => {
          //   // setToast(false)
          //   // setOpenPopupModel(false)
          // }, 1500)
        }
      })
      .catch((err: string) => {
        console.log(err)
      })
    // setOpenPopupModel(true)
  }

  const [toastMsg, setToastMsg] = useState('111')
  const [showToast, setToast] = useState(false)

  const itemsRemoveList = () => {
    itemsList.splice(1, 1)
    return itemsList
  }

  return (
    <Fragment>
      <SecondaryHeaderContainer>
        <LeftContent>
          <img src={logo} alt="loading" />
          <PiTypography component="h1">{pageLabel}</PiTypography>
        </LeftContent>
        <RightContent>
          {pageLabel !== 'Admin' && pageLabel !== 'Discount Codes' && (
            <PiSearch
              libraryType="atalskit"
              onClear={clearSearch}
              onValueChange={(e) => valueChanged(e)}
              onKeyUp={(e) => keyUp(e)}
              placeholder="Search"
              value={searchValue}
              maxLength={15}
            />
          )}
          {showToast && (
            <PiSectionMessage appearance="success" title={toastMsg}>
              <span></span>
            </PiSectionMessage>
          )}
          {pageLabel === 'Discount Codes' && (
            <SearchDiv>
              <PiSearch
                libraryType="atalskit"
                onClear={clearSearch}
                onValueChange={(e) => valueChanged(e)}
                onKeyUp={(e) => keyUp(e)}
                placeholder="Search"
                value={searchValue}
                maxLength={15}
              />
            </SearchDiv>
          )}
          {openPopupModel === true && (
            <>
              <PiModal isOpen={openPopupModel}>
                <ExportIconPopupHeader>
                  <PiModalHeader>
                    <PopupHeaderDiv>
                      {
                        <CloseButton
                          onClick={() => closeModel()}
                          title="close"
                          className="Hover"
                        >
                          {' '}
                          <img src={CrossLogo} alt="loading"></img>{' '}
                        </CloseButton>
                      }
                      <PiTypography component="h4">Export Data</PiTypography>
                      <hr />
                    </PopupHeaderDiv>
                  </PiModalHeader>
                </ExportIconPopupHeader>
                <PiModalBody>
                  <ExportIconPopup>
                    <p>
                      {' '}
                      Your export is being processed, an email will be sent with
                      the file attachment to your registered email
                    </p>
                  </ExportIconPopup>
                </PiModalBody>
              </PiModal>
            </>
          )}
          {/* <SelectDiv>
            <PiSelect
              label="Select Filter Name"
              libraryType="atalskit"
              name="select"
              onChange={e => onFilterChanged(e)}
              options={savedFilter}
              placeholder="select..."
            />
          </SelectDiv> */}
          {pageLabel !== 'Admin' &&
            pageLabel !== 'Pricing' &&
            pageLabel !== 'Discount Codes' &&
            pageLabel !== 'Special Pricing' && (
              <ButtonsGroup>
                <>
                  <DropdownMenu trigger={filterName}>
                    <DropdownItemGroup>
                      {savedFilter.map(function (
                        item: SavedFilterProps,
                        i: number,
                      ) {
                        return (
                          <>
                            <DropdownDiv key={i}>
                              <DropdownItem
                                onClick={() => onFilterChanged(item)}
                              >
                                <p>{item.label}</p>
                                <p>
                                  <small>{item.created_date}</small>
                                </p>
                                <p>
                                  {/* <span>{item.created_by}</span> */}
                                  {item.created_by && (
                                    <PiLozenge
                                      appearance="success"
                                      maxWidth="100px"
                                    >
                                      {item.created_by}
                                    </PiLozenge>
                                  )}
                                </p>
                              </DropdownItem>

                              {item.is_delete_option && (
                                <DropdownDelete
                                  onClick={() => deleteFilterName(item)}
                                >
                                  <ImgDiv>
                                    <img src={Trash} alt="loading" />
                                  </ImgDiv>
                                </DropdownDelete>
                              )}
                            </DropdownDiv>
                          </>
                        )
                      })}
                    </DropdownItemGroup>
                  </DropdownMenu>
                  {/* <p>Filters Applied: {filterName}</p> */}
                  <div className="More-Options">
                    <PiIconDropdownMenu
                      items={[
                        {
                          id: '1',
                          element: (
                            <LinkWithIcon
                              // eslint-disable-next-line no-script-url
                              href="javascript:void(0)"
                              onClick={openModelWindow}
                            >
                              <ImgTag
                                src={SaveViewLogo}
                                className="save-view Export-Image"
                              />
                              <span className="link-icon-text">Save View</span>
                            </LinkWithIcon>
                          ),
                        },
                        {
                          id: '2',
                          element: (
                            <LinkWithIcon
                              href="javascript:void(0)"
                              // href={baseUrl + exportUrl}
                              onClick={exportData}
                            >
                              <ImgTag
                                src={ExportLogo}
                                className="save-view Export-Image"
                              />
                              <span className="link-icon-text">Export</span>
                            </LinkWithIcon>
                          ),
                        },
                      ]}
                      onOpenChange={function noRefCheck() {}}
                    />
                  </div>
                  <SaveViewDiv>
                    {openModel && (
                      <SaveFilterModel
                        data={openModel}
                        // userList={userList}
                        onChildClick={getModelEvent}
                      ></SaveFilterModel>
                    )}
                  </SaveViewDiv>
                  {/* <div className="More-Options">
                  <PiIconDropdownMenu
                    items={[
                      {
                        id: '1',
                        element: (
                          <LinkWithIcon
                            // eslint-disable-next-line no-script-url
                            href="javascript:void(0)"
                            onClick={openModelWindow}
                          >
                            <ImgTag
                              src={SaveViewLogo}
                              className="save-view Export-Image"
                            />
                            <span className="link-icon-text">Save View</span>
                          </LinkWithIcon>
                        ),
                      },
                      {
                        id: '2',
                        element: (
                          <LinkWithIcon
                            // href={baseUrl + exportUrl}
                            onClick={exportData}
                          >
                            <ImgTag
                              src={ExportLogo}
                              className="save-view Export-Image"
                            />
                            <span className="link-icon-text">Export</span>
                          </LinkWithIcon>
                        ),
                      },
                    ]}
                    onOpenChange={function noRefCheck() { }}
                  />
                  </div> */}
                </>
                <div className="Button-Icon-Display">
                  <LinkWithIcon
                    className="Icon-space"
                    // eslint-disable-next-line no-script-url
                    href="javascript:void(0)"
                    onClick={openModelWindow}
                  >
                    <ImgTag
                      src={SaveViewLogo}
                      className="save-view Export-Image"
                    />
                    <span className="link-icon-text">Save View</span>
                  </LinkWithIcon>

                  <LinkWithIcon
                    href="javascript:void(0)"
                    // href={baseUrl + exportUrl}
                    onClick={exportData}
                  >
                    <ImgTag
                      src={ExportLogo}
                      className="save-view Export-Image"
                    />
                    <span className="link-icon-text">Export</span>
                  </LinkWithIcon>
                </div>
              </ButtonsGroup>
            )}
          {(pageLabel === 'Pricing' ||
            pageLabel === 'Discount Codes' ||
            pageLabel === 'Special Pricing') && (
            <ButtonsGroup>
              {pageLabel === 'Discount Codes' && (
                <>
                  <div className="More-Options">
                    <PiIconDropdownMenu
                      items={[
                        {
                          id: '1',
                          element: (
                            <LinkWithIcon
                              // eslint-disable-next-line no-script-url
                              href="javascript:void(0)"
                              onClick={openMultiEditModel}
                            >
                              <ImgTag
                                src={MultiEditLogo}
                                className="save-view Export-Image"
                              />
                              <span className="link-icon-text">Multi Edit</span>
                            </LinkWithIcon>
                          ),
                        },
                        {
                          id: '2',
                          element: (
                            <LinkWithIcon
                              // eslint-disable-next-line no-script-url
                              href="javascript:void(0)"
                              onClick={openAddDiscountRow}
                            >
                              <ImgTag
                                src={AddLogo}
                                className="save-view Export-Image"
                              />
                              <span className="link-icon-text">Add</span>
                            </LinkWithIcon>
                          ),
                        },
                        {
                          id: '3',
                          element: (
                            <LinkWithIcon
                              // href={baseUrl + exportUrl}
                              onClick={exportData}
                            >
                              <ImgTag
                                src={ExportLogo}
                                className="save-view Export-Image"
                              />
                              <span className="link-icon-text">Export</span>
                            </LinkWithIcon>
                          ),
                        },
                      ]}
                      onOpenChange={function noRefCheck() {}}
                    />
                  </div>
                  {/* <div className="More-Options">
                    <PiIconDropdownMenu
                      items={[
                        {
                          id: '1',
                          element: (
                            <LinkWithIcon
                              // eslint-disable-next-line no-script-url
                              href="javascript:void(0)"
                              onClick={openMultiEditModel}
                            >
                              <ImgTag
                                src={MultiEditLogo}
                                className="save-view Export-Image"
                              />
                              <span className="link-icon-text">Multi Edit</span>
                            </LinkWithIcon>
                          ),
                        },
                        {
                          id: '2',
                          element: (
                            <LinkWithIcon
                              // eslint-disable-next-line no-script-url
                              href="javascript:void(0)"
                              onClick={openAddDiscountRow}
                            >
                              <ImgTag
                                src={ExportLogo}
                                className="save-view Export-Image"
                              />
                              <span className="link-icon-text">Add</span>
                            </LinkWithIcon>
                          ),
                        },
                        {
                          id: '3',
                          element: (
                            <LinkWithIcon
                              // href={baseUrl + exportUrl}
                              onClick={exportData}
                            >
                              <ImgTag
                                src={ExportLogo}
                                className="save-view Export-Image"
                              />
                              <span className="link-icon-text">Export</span>
                            </LinkWithIcon>
                          ),
                        },
                      ]}
                      onOpenChange={function noRefCheck() { }}
                    />
                    </div> */}
                  <SaveViewDiv>
                    {openMultiModel && (
                      <MultiEditModel
                        reqInfo={reqInfo}
                        // userList={userList}
                        onFileSelect={getUploadEvent2}
                      ></MultiEditModel>
                    )}
                  </SaveViewDiv>
                  <SaveViewDiv>
                    {openAddRowDiscountModel && (
                      <DiscountAddRowModel
                        reqInfo={reqInfo}
                        onFileSelect={getAddRowDiscountEvent}
                      ></DiscountAddRowModel>
                    )}
                  </SaveViewDiv>
                  <div className="Button-Icon-Display">
                    <LinkWithIcon
                      className="Icon-space"
                      // eslint-disable-next-line no-script-url
                      href="javascript:void(0)"
                      onClick={openMultiEditModel}
                    >
                      <ImgTag
                        src={MultiEditLogo}
                        className="save-view Export-Image"
                      />
                      <span className="link-icon-text">Multi Edit</span>
                    </LinkWithIcon>
                    <LinkWithIcon
                      className="Icon-space"
                      // eslint-disable-next-line no-script-url
                      href="javascript:void(0)"
                      onClick={openAddDiscountRow}
                    >
                      <ImgTag
                        src={AddLogo}
                        className="save-view Export-Image"
                      />
                      <span className="link-icon-text">Add</span>
                    </LinkWithIcon>
                    <LinkWithIcon
                      href="javascript:void(0)"
                      // href={baseUrl + exportUrl}
                      onClick={exportData}
                    >
                      <ImgTag
                        src={ExportLogo}
                        className="save-view Export-Image"
                      />
                      <span className="link-icon-text">Export</span>
                    </LinkWithIcon>
                  </div>
                </>
              )}
              {(pageLabel === 'Pricing' || pageLabel === 'Special Pricing') && (
                <>
                  <div className="More-Options">
                    <PiIconDropdownMenu
                      items={
                        pageLabel === 'Special Pricing'
                          ? itemsRemoveList()
                          : itemsList
                      }
                      onOpenChange={function noRefCheck() {}}
                    />
                  </div>
                  {pageLabel === 'Pricing' && (
                    <>
                      <div className="Button-Icon-Display">
                        <LinkWithIcon
                          className="Icon-space"
                          href="javascript:void(0)"
                          onClick={openAddRow}
                        >
                          <ImgTag
                            src={AddLogo}
                            className="save-view Export-Image"
                          />
                          <span className="link-icon-text">Add</span>
                        </LinkWithIcon>
                        <LinkWithIcon
                          className="Icon-space"
                          href="javascript:void(0)"
                          onClick={openModelWindow}
                        >
                          <ImgTag
                            src={ImportLogo}
                            className="save-view Export-Image"
                            title="Import"
                          />
                          <span className="link-icon-text">Import</span>
                        </LinkWithIcon>

                        <LinkWithIcon
                          href="javascript:void(0)"
                          // href={baseUrl + exportUrl}
                          onClick={exportDataMail}
                        >
                          <ImgTag
                            src={ExportLogo}
                            className="save-view Export-Image"
                          />
                          <span className="link-icon-text">Export</span>
                        </LinkWithIcon>
                      </div>
                      <SaveViewDiv>
                        {openAddRowModel && (
                          <PricingAddRowModel
                            reqInfo={reqInfo}
                            onFileSelect={getAddRowEvent}
                          ></PricingAddRowModel>
                        )}
                      </SaveViewDiv>
                    </>
                  )}
                  {pageLabel === 'Special Pricing' && (
                    <>
                      <div className="Button-Icon-Display">
                        <LinkWithIcon
                          className="Icon-space"
                          href="javascript:void(0)"
                          onClick={openAddRow}
                        >
                          <ImgTag
                            src={AddLogo}
                            className="save-view Export-Image"
                          />
                          <span className="link-icon-text">Add</span>
                        </LinkWithIcon>
                        <LinkWithIcon
                          href="javascript:void(0)"
                          // href={baseUrl + exportUrl}
                          onClick={exportData}
                        >
                          <ImgTag
                            src={ExportLogo}
                            className="save-view Export-Image"
                          />
                          <span className="link-icon-text">Export</span>
                        </LinkWithIcon>
                      </div>
                      <SaveViewDiv>
                        {openAddRowSpecialPricing && (
                          <SpecialPricingAddRowModel
                            reqInfo={reqInfo}
                            organizationData={organizationData}
                            onFileSelect={getAddRowEvent}
                          ></SpecialPricingAddRowModel>
                        )}
                      </SaveViewDiv>
                    </>
                  )}
                </>
              )}
              {/* { pageLabel === 'Pricing' || pageLabel === 'Special Pricing' && (
                    <>
                      <div className="More-Options">
                        <PiIconDropdownMenu
                          items={
                            pageLabel === 'Special Pricing'
                              ? itemsRemoveList()
                              : itemsList
                          }
                          onOpenChange={function noRefCheck() { }}
                        />
                      </div>

                      <SaveViewDiv>
                        {openAddRowModel && (
                          <PricingAddRowModel
                            reqInfo={reqInfo}
                            onFileSelect={getAddRowEvent}
                          ></PricingAddRowModel>
                        )}
                      </SaveViewDiv>
                      <SaveViewDiv>
                        {openAddRowSpecialPricing && (
                          <SpecialPricingAddRowModel
                            reqInfo={reqInfo}
                            organizationData={organizationData}
                            onFileSelect={getAddRowEvent}
                          ></SpecialPricingAddRowModel>
                        )}
                      </SaveViewDiv>
                    </>
                  )} */}
              {pageLabel !== 'Discount Codes' && (
                <>
                  <SaveViewDiv>
                    {openModel && (
                      <FileUploadModel
                        //reqInfo={reqInfo}
                        onFileSelect={getUploadEvent}
                      ></FileUploadModel>
                    )}
                  </SaveViewDiv>
                </>
              )}
            </ButtonsGroup>
          )}
        </RightContent>
      </SecondaryHeaderContainer>
    </Fragment>
  )
}

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Fragment, useEffect, useRef } from 'react'
import { Formik } from 'formik'
import CrossLogo from '../../assets/images/cross.svg'
import { AsyncSelect } from '@atlaskit/select'
import {
  PiTypography,
  PiButton,
  PiModal,
  PiModalHeader,
  PiModalBody,
  PiModalFooter,
  PiSelectForm,
  PiTextareaForm,
  PiInputForm,
  PiInput,
  PiDatePicker,
} from 'pixel-kit'
import { ApiResponse, ReqInfoProps } from 'src/services/schema/schema'
import { SpecialPricevendorEditValidations } from 'src/modules/specialPricing/validation/SpecialPricingVadlidation'
import { FilterFormFields } from 'src/components/multiEditModel/multiEditModel.component'
import EndpointUrl from 'src/core/apiEndpoints/endPoints'
import { triggerApi } from 'src/services/api-services'
import { CloseButton } from '../adminaddrowmodel/adminaddrowmodel.component'
import { PopupHeaderDiv } from '../fileuploadModel/fileuploadModel.component'

type FileProps = {
  success: boolean
}

type Props = {
  reqInfo: ReqInfoProps
  onFileSelect: (e?: FileProps) => {}
  organizationData?: any
  paramData?: any
}

export default function SpecialPricingAddRowModel({
  reqInfo,
  onFileSelect,
  organizationData,
  paramData,
}: Props) {
  console.log(paramData)
  const [openModel, setOpenModel] = useState(false)
  let [vendorsList, setVendorList]: any = useState([])
  let [stockCodeList, setstockCodeList]: any = useState([])
  let [selectStockCode, setSelectStockCode]: any = useState({})
  let [vendorId, setvendorId]: any = useState<object>({})
  let [OrganizationList, setOrganzationList]: any = useState()
  let organizationDatas: any
  let [organizationId, setOrganizationId]: any = useState({
    label: '',
    value: '',
  })
  const [minDate, setMinDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [endDateErr, setEndDateErr] = useState('')
  const [startDateErr, setStartDateErr] = useState('')
  const [stockErr, setStockErr] = useState('')
  const [initialValues, setInitialValues] = useState({
    manufacturer_vendor_id: '',
    // stock_code: "",
    list_price: '',
    special_price: '',
    Organization: '',
    start_date: '',
    end_date: '',
    description: '',
  })
  const [TodayDate, SetTodayDate] = useState('')
  let [serverMsg, setServerMsg] = useState(null)

  // console.log(userList);
  // userList = Promise.resolve(userList).then(function(results) {
  //   console.log(results);
  //   return results.users;
  // });
  useEffect(() => {
    setOpenModel(true)
    // filterStockData(inputValues);
    function formatDate(date: Date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [year, month, day].join('-')
    }
    SetTodayDate(formatDate(new Date()))
  }, [])

  useEffect(() => {
    getVendorList()
    let list = []
    list = organizationData.map((data: any) => {
      return {
        value: data.id,
        label: data.name,
        ...data,
      }
    })
    OrganizationList = list
    setOrganzationList(OrganizationList)
  }, [organizationData])

  function getFilterData() {
    const apiObject = {
      payload: {},
      method: 'GET',
      apiUrl: `${EndpointUrl.specialPricingApi}${
        paramData ? '/' + paramData.id : ''
      }`,
      headers: {},
    }

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          console.log(response.result)
          let GetDetails = response.result.data
          initialValues['list_price'] = GetDetails.list_price
          selectStockCode.list_price = GetDetails.list_price
          setTimeout(() => {
            console.log(initialValues)
            setInitialValues(initialValues)
          }, 1000)
        }
      })
      .catch((err: string) => {
        console.log(err)
      })
  }

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
          vendorsList = response.result.data.list
          let list = []
          list = vendorsList.map((item: any) => {
            return {
              value: item.id,
              label: item.name,
              ...item,
            }
          })
          vendorsList = list
          setVendorList(vendorsList)
        }
      })
      .catch((err: string) => {
        console.log(err)
      })
  }
  const formik = useRef<any>(null)
  function handleSubmit(data: any) {
    let params = {
      vendor_id: data.manufacturer_vendor_id.value,
      stock_code_id: selectStockCode.value,
      list_price: data.list_price,
      special_price: data.special_price,
      organizations_id: data.Organization.value,
      start_date: minDate ? minDate : paramData.start_date,
      end_date: endDate ? endDate : paramData.end_date,
      description: data.description,
    }
    // data.manufacturer_discount_id = data.manufacturer_discount_id.value;
    data['vendor_id'] = reqInfo.body.vendor_id
    const apiObject = {
      payload: data ? params : {},
      method: paramData ? 'PUT' : 'POST',
      apiUrl: `${EndpointUrl.specialPricingApi}${
        paramData ? `/${paramData.id}` : ''
      }`,
      headers: {},
    }

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setServerMsg(null)
          setOpenModel(false)
          onFileSelect({ success: true })
        } else if (response.result.status_code === 422) {
          if (response.result.data.includes('end')) {
            setEndDateErr('Please select the End Date')
          }
          if (response.result.data.includes('start')) {
            setStartDateErr('Please select the Start Date')
          }
          if (response.result.data.includes('stock')) {
            setStockErr('Please search Select Stock Code')
          } else {
            setServerMsg(response.result.data)
          }
        }
      })
      .catch((err: string) => {
        console.log(err)
      })
  }

  function handleRef(e: any) {
    formik.current = e
  }
  function closeModel() {
    setOpenModel(false)
    let data = {
      success: false,
    }
    onFileSelect(data)
  }
  //let stockCodeList: any = [ { label: 'Adelaide', value: 'adelaide' },
  //{ label: 'Brisbane', value: 'brisbane' }]

  const filterStockData = (inputValue: string) => {
    // setstockCodeList([])
    setStockErr('')
    if (inputValue.length >= 4) {
      const apiObject = {
        payload: {},
        method: 'GET',
        apiUrl: `${EndpointUrl.stockCodeApi}?vendor_id=${vendorId.id}&is_dropdown=true&search=${inputValue}`,
        headers: {},
      }
      triggerApi(apiObject)
        .then((response: any) => {
          if (response.result.success) {
            let list = response.result.data
            stockCodeList = list
            setstockCodeList(stockCodeList)
          }
        })
        .catch((err: string) => {
          console.log(err)
        })
      return stockCodeList
    }
  }
  const promiseOptions = (inputValue: string) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterStockData(inputValue))
      }, 1000)
    })

  const handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '')
    if (!paramData) {
      filterStockData(inputValue)
    }
    return inputValue
  }

  const HandleChange = (value: any) => {
    setSelectStockCode(value)
    initialValues['list_price'] = value.list_price
    setTimeout(() => {
      console.log(initialValues)
      setInitialValues(initialValues)
    }, 1000)
  }
  const HandleOrganization = (value: any) => {
    console.log(value)
    setOrganizationId(value)
    initialValues['Organization'] = value.value
    setTimeout(() => {
      setInitialValues(initialValues)
    }, 1000)
  }

  useEffect(() => {
    if (paramData) {
      getFilterData()
    }
  }, [selectStockCode, vendorId, organizationId])

  function onDateChange(event: string) {
    setMinDate(event)
    setStartDateErr('')
  }
  function onChangeEndDate(event: string) {
    setEndDate(event)
    setEndDateErr('')
  }

  // function getFilterData() {
  //   const apiObject = {
  //     payload: {},
  //     method: "GET",
  //     apiUrl: `${EndpointUrl.filterDataApi}?name=special_pricing`,
  //     headers: {}
  //   };
  //   triggerApi(apiObject)
  //     .then((response: ApiResponse) => {
  //       if (response.result.success) {
  //         let list = [];
  //         organizationDatas = response.result.data.filters.organization;
  //         list = organizationDatas.map((data: any) => {
  //           return {
  //             value: data.id,
  //             label: data.name,
  //             ...data
  //           };
  //         })
  //         organizationDatas = list
  //         setOrganizationData(organizationDatas);
  //         getSelectedOrganiztion(organizationDatas)
  //         console.log(response.result.data.filters.organization)
  //       }
  //     })
  //     .catch((err: string) => {
  //       console.log(err);
  //     });
  // }
  return (
    <>
      {' '}
      <Fragment>
        <PiModal isOpen={openModel}>
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
              <PiTypography component="h4">
                {paramData ? 'Update Product' : 'Add Product'}
              </PiTypography>
              <hr />
            </PopupHeaderDiv>
          </PiModalHeader>
          <Formik
            validationSchema={SpecialPricevendorEditValidations}
            onSubmit={handleSubmit}
            initialValues={initialValues}
            innerRef={handleRef}
          >
            {({ ...formik }: any) => {
              return (
                <>
                  <PiModalBody>
                    <FilterFormFields>
                      <>
                        <PiSelectForm
                          name="manufacturer_vendor_id"
                          label="Vendor"
                          placeholder="Vendor"
                          isMulti={false}
                          isDisabled={paramData ? true : false}
                          options={vendorsList}
                          onChange={(value) => {
                            setvendorId(value)
                          }}
                        />
                        <label
                          htmlFor="async-select-example"
                          className="css-re7y6x"
                        >
                          Stock Code
                        </label>
                        <AsyncSelect
                          name="stock_code"
                          inputId="async-select-example"
                          onInputChange={handleInputChange}
                          loadOptions={promiseOptions}
                          isDisabled={vendorId.id ? false : true}
                          onChange={(value) => {
                            HandleChange(value)
                          }}
                          // value={}
                        />
                        <span className="css-gingst">{stockErr}</span>
                        <PiInput
                          name="list_price"
                          label="List Price"
                          libraryType="atalskit"
                          type="text"
                          isDisabled={true}
                          placeholder="List Price"
                          value={selectStockCode.list_price}
                        />
                        <PiInputForm
                          name="special_price"
                          label="Special Price"
                          libraryType="atalskit"
                          type="text"
                          placeholder="Special Price"
                        />
                        <PiSelectForm
                          name="Organization"
                          label="Organization"
                          placeholder="Organization"
                          isDisabled={paramData ? true : false}
                          options={
                            paramData ? organizationDatas : OrganizationList
                          }
                          onChange={(value) => {
                            HandleOrganization(value)
                          }}
                        />
                        <PiDatePicker
                          helpText=""
                          label="Start Date"
                          libraryType="atalskit"
                          name="start_date"
                          minDate={TodayDate}
                          defaultValue={minDate}
                          onChange={onDateChange}
                          placeholder="MM/DD/YYYY"
                        />
                        <span className="css-gingst">{startDateErr}</span>
                        <PiDatePicker
                          // helpText=""
                          label="End Date"
                          libraryType="atalskit"
                          name="end_date"
                          minDate={minDate}
                          onChange={onChangeEndDate}
                          defaultValue={endDate}
                          onKeyDown={function noRefCheck() {}}
                          placeholder="MM/DD/YYYY"
                        />
                        <span className="css-gingst">{endDateErr}</span>
                        <PiTextareaForm
                          name="description"
                          label="Description"
                          libraryType="atalskit"
                          placeholder="Description"
                        />
                      </>
                    </FilterFormFields>
                  </PiModalBody>
                  <PiModalFooter>
                    {serverMsg && <div className="server-msg">{serverMsg}</div>}
                    <PiButton
                      appearance="secondary"
                      label="Cancel"
                      onClick={closeModel}
                    />
                    <PiButton
                      appearance="primary"
                      label={paramData ? 'Update Product' : 'Add Product'}
                      onClick={formik.handleSubmit}
                    />
                  </PiModalFooter>
                </>
              )
            }}
          </Formik>
        </PiModal>
      </Fragment>
    </>
  )
}

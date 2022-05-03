/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Fragment, useEffect } from 'react'
import { Formik } from 'formik'
import CrossLogo from '../../assets/images/cross.svg'
import {
  PiInputForm,
  PiTypography,
  PiButton,
  PiModal,
  PiModalHeader,
  PiModalBody,
  PiModalFooter,
  PiSelectForm,
  PiTextareaForm,
} from 'pixel-kit'
import {
  ApiResponse,
  ReqInfoProps,
  FilterColumnProps,
  PiSelectProps,
  DynamicJsonValidProps,
} from 'src/services/schema/schema'
import { vendorValidations } from 'src/modules/vendor/validation/vendorValidations'
import { FilterFormFields } from 'src/components/multiEditModel/multiEditModel.component'
import EndpointUrl from 'src/core/apiEndpoints/endPoints'
import { triggerApi } from 'src/services/api-services'
import { CloseButton } from '../adminaddrowmodel/adminaddrowmodel.component'
import { PopupHeaderDiv } from '../fileuploadModel/fileuploadModel.component'

import { getLocalStorage } from 'src/core/localStorage/localStorage'
type FileProps = {
  success: boolean
  vendor_id?: string
}

type Props = {
  reqInfo: ReqInfoProps
  onFileSelect: (e?: FileProps) => {}
  paramData?: any
}
let info: ReqInfoProps
export default function PricingAddRowModel({
  reqInfo,
  onFileSelect,
  paramData,
}: Props) {
  const [openModel, setOpenModel] = useState(false)
  let [discountFilters, setdiscountFilters] = useState<PiSelectProps[]>([])
  let [modelLabel, setModelLabel] = useState('Add Products')
  let [serverMsg, setServerMsg] = useState(null)

  console.log(reqInfo)
  let [initialValues, setInitialValues] = useState<DynamicJsonValidProps>({
    manufacturer_discount_id: '',
    stock_code: '',
    list_price: '',
    description: '',
  })
  //const initialValues = {
  //  manufacturer_discount_id: '',
  //  stock_code: '',
  //  list_price: '',
  //  description: '',
  //}
  // console.log(userList);
  // userList = Promise.resolve(userList).then(function(results) {
  //   console.log(results);
  //   return results.users;
  // });
  useEffect(() => {
    setOpenModel(true)
  }, [])

  useEffect(() => {
    ;(async () => {
      let data = getLocalStorage('requestInfo') as string
      info = JSON.parse(data)

      if (paramData) {
        await getProductDetail()

        getFilterData()
        setModelLabel('Update Product')
      } else {
        getFilterData()
        setModelLabel('Add Product')
      }
    })()
  }, [])
  let gridDataById: any

  function getProductDetail() {
    const apiObject = {
      payload: {},
      method: 'GET',
      apiUrl: `${EndpointUrl.productsApi}/${paramData.id}?vendor_id=${info.body.vendor_id}&branch_id=${info.body.branch_id}&quantity=${paramData.quantity_id}&type=edit`,
      headers: {},
    }

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          gridDataById = response.result.data
          initialValues['manufacturer_discount_id'] = gridDataById.discount_code
          initialValues['stock_code'] = gridDataById.name
          initialValues['list_price'] = gridDataById.list_price
          initialValues['description'] = gridDataById.description
        }

        setTimeout(() => {
          setInitialValues(initialValues)
          console.log(initialValues)
        }, 1000)
      })
      .catch((err: string) => {
        console.log(err)
      })

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(gridDataById)
      }, 100)
    })
  }
  function getFilterData() {
    const apiObject = {
      payload: {},
      method: 'GET',
      apiUrl: `${EndpointUrl.filterDataApi}?name=pricing&vendor_id=${info.body.vendor_id}&branch_id=${info.body.branch_id}`,
      headers: {},
    }

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          let gridFilterData = response.result.data
          let filters = []
          filters = gridFilterData.filters.discount_code
          discountFilters = filters.map((item: FilterColumnProps) => {
            return {
              value: item.id,
              label: item.name,
            }
          })
          setdiscountFilters(discountFilters)
        }
      })
      .catch((err: string) => {
        console.log(err)
      })
  }

  // const formik = useRef(null);
  // console.log(formik);
  function handleSubmit(data: any) {
    console.log(data)
    // data.manufacturer_discount_id = data.manufacturer_discount_id.value;
    data['vendor_id'] = info.body.vendor_id
    data['branch_id'] = info.body.branch_id
    const apiObject = {
      payload: data ? data : {},
      method: paramData && paramData.id ? 'PUT' : 'POST',
      apiUrl:
        paramData && paramData.id
          ? `${EndpointUrl.productsApi}/${paramData.id}`
          : `${EndpointUrl.productsApi}`,
      headers: {},
    }
    console.log(data)

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setServerMsg(null)
          setOpenModel(false)
          onFileSelect({ success: true, vendor_id: data['vendor_id'] })
        } else {
          setServerMsg(response.result.data)
        }
      })
      .catch((err: string) => {
        console.log(err)
      })
  }

  function handleRef() {
    // console.log(e);
    // formik.current = e;
  }
  function closeModel() {
    // console.log(222);
    setOpenModel(false)
    let data = {
      success: false,
    }
    onFileSelect(data)
  }
  return (
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
            <PiTypography component="h4">{modelLabel}</PiTypography>
            <hr />
          </PopupHeaderDiv>
        </PiModalHeader>

        <Formik
          validationSchema={vendorValidations}
          onSubmit={handleSubmit}
          initialValues={initialValues}
          innerRef={handleRef}
        >
          {({ ...formik }: any) => {
            return (
              <>
                <PiModalBody>
                  <FilterForm
                    data={discountFilters}
                    initialValues={initialValues}
                    paramData={paramData}
                  />
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
                    label={modelLabel}
                    onClick={formik.handleSubmit}
                  />
                </PiModalFooter>
              </>
            )
          }}
        </Formik>
      </PiModal>
    </Fragment>
  )
}

const FilterForm = ({ data, paramData, initialValues }: any) => {
  return (
    <FilterFormFields>
      <>
        <div className="Discount-dropdown">
          <PiSelectForm
            name="manufacturer_discount_id"
            label="Discount Code"
            placeholder="Discount Code"
            isMulti={false}
            options={data}
            // value="dsdds"
          />
        </div>
        <PiInputForm
          name="stock_code"
          label="Stock Code"
          libraryType="atalskit"
          type="text"
          placeholder="Stock Code"
          isDisabled={paramData ? true : false}
        />
        <PiInputForm
          name="list_price"
          label="List Price"
          libraryType="atalskit"
          type="text"
          placeholder="List Price"
        />
        <PiTextareaForm
          name="description"
          label="Description"
          libraryType="atalskit"
          placeholder="Description"
          defaultValue={initialValues.description}
        />
      </>
    </FilterFormFields>
  )
}

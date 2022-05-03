/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Fragment, useEffect, useRef } from 'react'
import { Formik } from 'formik'
import Validations from 'src/core/validations/validations'
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
  PiSpinner,
} from 'pixel-kit'
import {
  FilterColumnProps,
  ApiResponse,
  ReqInfoProps,
  DynamicJsonValidProps,
} from 'src/services/schema/schema'
import { FilterFormFields } from 'src/components/multiEditModel/multiEditModel.component'
import EndpointUrl from 'src/core/apiEndpoints/endPoints'
import { triggerApi } from 'src/services/api-services'
import { SubscribeService2 } from 'src/services/subscribe-service'
import { CloseButton } from '../adminaddrowmodel/adminaddrowmodel.component'
import {
  InputFields,
  SpinnerDiv,
} from 'src/components/discountAddRowModel/discountAddRowModel.component'
import { PopupHeaderDiv } from '../fileuploadModel/fileuploadModel.component'
type FileProps = {
  success: boolean
}

type Props = {
  reqInfo: ReqInfoProps
  onFileSelect: (e: FileProps) => {}
  paramData?: any
}
let messages: any = {
  quantity_id: {
    dropdown: 'Please select  Quantity',
  },
  description: {
    // required: 'Please enter Description',
    description: ''
  },
  discount_code: {
    required: 'Please enter Discount Code',
  },
}
let object = {
  discount_code: 'required',
  quantity_id: 'dropdown',
  description: 'description',
}
export default function DiscountAddRowModel({
  reqInfo,
  onFileSelect,
  paramData,
}: Props) {
  console.log(reqInfo)
  const [openModel, setOpenModel] = useState(false)
  let [quantity, setquantity] = useState([])
  let [modelLabel, setModelLabel] = useState('Add Discount')
  const [loader, setLoader] = useState(true)
  let [initialValues, setInitialValues] = useState<DynamicJsonValidProps>({
    discount_code: '',
    description: '',
    quantity_id: '',
  })

  useEffect(() => {
    setOpenModel(true)
  }, [])

  useEffect(() => {
    ;(async () => {
      let info: any = localStorage.getItem('requestInfo')
      reqInfo = JSON.parse(info)
      console.log(info)
      console.log(paramData)
      if (paramData) {
        await getDiscountCodes()
        getFilterData()
        setModelLabel('Update Discount')
      } else {
        getFilterData()
        setModelLabel('Add Discount')
      }
    })()
  }, [])
  let gridDataById: any
  function getDiscountCodes() {
    const apiObject = {
      payload: {},
      method: 'GET',
      apiUrl: `${EndpointUrl.discountCodesApi}/${paramData.id}?vendor_id=${reqInfo.body.vendor_id}&branch_id=${reqInfo.body.branch_id}&quantity=${paramData.quantity_id}`,
      headers: {},
    }

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          gridDataById = response.result.data
        }
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

  let [addRowDropdowns, setaddRowDropdowns] = useState<FilterColumnProps[]>([])
  let [validationSchema, setValidationSchema]: any = useState([])

  function getFilterData() {
    // let arr = []
    const apiObject = {
      payload: {},
      method: 'GET',
      apiUrl: `${EndpointUrl.filterDataApi}?name=discount_codes&vendor_id=${reqInfo.body.vendor_id}`,
      headers: {},
    }

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setTimeout(() => {
            setLoader(false)
          }, 100)
          let gridFilterData = response.result.data
          addRowDropdowns = gridFilterData.add_row_dropdowns.multiplier_type
          setaddRowDropdowns(addRowDropdowns)
          let list = gridFilterData.filters.quantity
          console.log(list)
          let arr = list.map((item: FilterColumnProps) => {
            return {
              value: item.id,
              label: item.name,
            }
          })
          setquantity(arr)
          console.log(arr)
          SubscribeService2.sendMessage2(addRowDropdowns)
          for (let i = 0; i < addRowDropdowns.length; i++) {
            initialValues[addRowDropdowns[i].id] = ''

            if (paramData && gridDataById) {
              let arr2 = []
              arr2 = Object.keys(gridDataById.multipliers)
              initialValues['discount_code'] = gridDataById.discount_code
              initialValues['quantity_id'] = gridDataById.quantity_id
              initialValues[addRowDropdowns[i].id] = ''

              for (let j = 0; j < arr2.length; j++) {
                if (addRowDropdowns[i].id === arr2[j]) {
                  console.log(gridDataById.multipliers[arr2[j]])
                  initialValues[addRowDropdowns[i].id] =
                    gridDataById.multipliers[arr2[j]]
                }
                console.log(initialValues)
              }
            }
          }

          // addRowDropdowns.map((obj: any)=> {
          //   if(obj.name === ) {

          //   }
          // })
          setTimeout(() => {
            console.log(initialValues)
            setInitialValues(initialValues)
          }, 1000)

          var json: DynamicJsonValidProps = {}

          for (let i = 0; i < addRowDropdowns.length; i++) {
            json[addRowDropdowns[i].id] = 'required|phone'
            messages[addRowDropdowns[i].id] = {
              required: `Please enter ${addRowDropdowns[i].name}`,
              phone: "Please enter valid number"
            }
            object = {
              ...object,
              ...json,
            }
          }

          validationSchema = Validations(object, messages)
          setValidationSchema(validationSchema)
        }
      })
      .catch((err: string) => {
        console.log(err)
      })
  }
  let [serverMsg, setServerMsg] = useState(null)
  const formik = useRef<any>(null)
  // console.log(formik);
  function handleSubmit(data: any) {
    console.log(data)
    let info: any = localStorage.getItem('requestInfo')
    reqInfo = JSON.parse(info)
    delete data['multiplier_values'];
    // data.quantity_id = data.quantity_id.value;
    data['vendor_id'] = reqInfo.body.vendor_id
    data['branch_id'] = reqInfo.body.branch_id
    data['multiplier_values'] = {
      ...data,
    }
    delete data['multiplier_values'].vendor_id
    delete data['multiplier_values'].branch_id
    delete data['multiplier_values'].quantity_id
    delete data['multiplier_values'].description
    delete data['multiplier_values'].discount_code
    console.log(paramData)
    const apiObject = {
      payload: data ? data : {},
      method: paramData && paramData.id ? 'PUT' : 'POST',
      apiUrl:
        paramData && paramData.id
          ? `${EndpointUrl.discountCodesApi}/${paramData.id}`
          : `${EndpointUrl.discountCodesApi}`,
      headers: {},
    }

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setServerMsg(null)
          setOpenModel(false)
          onFileSelect({ success: true })
        } else {
          setServerMsg(response.result.data)
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
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={initialValues}
          innerRef={handleRef}
        >
          {({ ...formik }: any) => {
            return (
              <>
                <PiModalBody>
                  <div style={{ height: '100%', overflow: 'hidden' }}>
                    <FilterForm
                      data={quantity}
                      rowdropdown={addRowDropdowns}
                      paramData={paramData}
                      loader={loader}
                    />
                  </div>
                </PiModalBody>
                <PiModalFooter>
                  {serverMsg && (
                  <div className="server-msg">{serverMsg}</div>

                  )}
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
      </PiModal >
    </Fragment >
  )
}

const FilterForm = ({ data, rowdropdown, paramData, loader }: any) => {
  console.log(rowdropdown)
  return (
    <FilterFormFields>
      <div>
        <InputFields>
          <PiInputForm
            name="discount_code"
            label="Discount Code"
            libraryType="atalskit"
            type="text"
            placeholder="Discount Code"
            isDisabled={paramData ? true : false}
          />
          <PiSelectForm
            name="quantity_id"
            label="Quantity"
            placeholder="Quantity"
            isMulti={false}
            options={data}
            isDisabled={paramData ? true : false}
          />
        </InputFields>
        <PiTextareaForm
          name="description"
          label="Description"
          libraryType="atalskit"
          placeholder="Description"
        />
      </div>
      <h4 className="form-field-group-header">Multipliers</h4>
      <div className="flexed-container">
        <InputFields className="multipliers-inputs">
          {!loader &&
            rowdropdown.map(function (item: any, i: number) {
              return (
                <PiInputForm
                  name={item.id}
                  label={item.name}
                  libraryType="atalskit"
                  type="text"
                  placeholder={item.name}
                />
              )
            })}
          {loader && (
            <SpinnerDiv>
              <PiSpinner color="primary" size={40} libraryType="atalskit" />
            </SpinnerDiv>
          )}
        </InputFields>
      </div>
    </FilterFormFields>
  )
}

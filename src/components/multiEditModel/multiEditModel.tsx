import React, {useState, Fragment, useEffect, useRef} from 'react';
import {Formik} from 'formik';
import Validations from 'src/core/validations/validations';
import CrossLogo from '../../assets/images/cross.svg';
import {
  PiInputForm,
  PiTypography,
  PiButton,
  PiModal,
  PiModalHeader,
  PiModalBody,
  PiModalFooter,
  PiSelectForm,
} from 'pixel-kit';
import {
  FilterColumnProps,
  DynamicJsonValidProps,
  ApiResponse,
  ReqInfoProps,
} from 'src/services/schema/schema';
import {
  SpinnerDiv,
  FilterFormFields,
} from 'src/components/multiEditModel/multiEditModel.component';
import EndpointUrl from 'src/core/apiEndpoints/endPoints';
import {triggerApi} from 'src/services/api-services';
import {PiSpinner} from 'pixel-kit';
import {InputFields} from 'src/components/discountAddRowModel/discountAddRowModel.component';
import {CloseButton} from '../adminaddrowmodel/adminaddrowmodel.component';
import { PopupHeaderDiv } from '../fileuploadModel/fileuploadModel.component';

type FileProps = {
  success: boolean;
};

type Props = {
  reqInfo: ReqInfoProps;
  onFileSelect: (e?: FileProps) => {};
};

export default function MultiEditModel({ reqInfo, onFileSelect }: Props) {
  const [openModel, setOpenModel] = useState(false);
  let [loading, setloading] = useState(true);
  let [initialValues, setInitialValues] = useState<any>({
    discount_code_ids: [],
    quantity_id: '',
  });
  let [quantity, setquantity] = useState<any>([]);

  // console.log(data);
  // console.log(userList);
  // userList = Promise.resolve(userList).then(function(results) {
  //   console.log(results);
  //   return results.users;
  // });
  useEffect(() => {
    setOpenModel(true);
  }, []);

  useEffect(() => {
    getFilterData();
    getDiscountCodes();
  }, []);
  let messages: any = {
    quantity_id: {
      dropdown: 'Please select  Quantity',
    },
    discount_code_ids: {
      //required: 'Please enter Discount Code',
      multiselect: 'Please select  Discount Code'
    },
  };
  let [addRowDropdowns, setaddRowDropdowns] = useState<FilterColumnProps[]>([]);
  let [discountList, setDiscountList] = useState([]);
  let [validationSchema, setValidationSchema]: any = useState([]);

  function getDiscountCodes() {
    let arr = [];
    const apiObject = {
      payload: {},
      method: 'GET',
      apiUrl: `${EndpointUrl.discountCodesApi}?vendor_id=${
        reqInfo.body.vendor_id
      }&branch_id=${reqInfo.body.branch_id}&is_dropdown=${true}`,
      headers: {},
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setloading(false);
          let gridFilterData = response.result.data;
          let list = gridFilterData;
          arr = list.map((item: FilterColumnProps) => {
            return {
              value: item.id,
              label: item.discount_code,
            };
          });
          discountList = arr;
          setDiscountList(discountList);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  let object = {
    quantity_id: '',
    discount_code_ids: 'multiselect',
  };
  function getFilterData() {
    const apiObject = {
      payload: {},
      method: 'GET',
      apiUrl: `${EndpointUrl.filterDataApi}?name=discount_codes`,
      headers: {},
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setloading(false);
          let gridFilterData = response.result.data;
          quantity = gridFilterData.filters.quantity;
          quantity = quantity.map((item: FilterColumnProps) => {
            return {
              value: item.id,
              label: item.name,
            };
          });
          setquantity(quantity);
          addRowDropdowns = gridFilterData.add_row_dropdowns.multiplier_type;
          setaddRowDropdowns(addRowDropdowns);

          for (let i = 0; i < addRowDropdowns.length; i++) {
            initialValues[addRowDropdowns[i].id] = '';
          }
          var json: DynamicJsonValidProps = {};

          for (let i = 0; i < addRowDropdowns.length; i++) {
            json[addRowDropdowns[i].id] = 'required|phone';
            messages[addRowDropdowns[i].id] = {
              required: `Please enter ${addRowDropdowns[i].name}`,
              phone: "Please enter valid number"
            };
            object = {
              ...object,
              ...json,
            };
          }

          validationSchema = Validations(object, messages);
          setValidationSchema(validationSchema);
          setInitialValues(initialValues);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  let [serverMsg, setServerMsg] = useState(null)

  const formik = useRef<any>(null);
  // console.log(formik);
  function handleSubmit(data: any) {
    console.log(data);
     delete data['multiplier_values'];
    // data.manufacturer_discount_id = data.manufacturer_discount_id.value;
    data['vendor_id'] = reqInfo.body.vendor_id;
    data['branch_id'] = reqInfo.body.branch_id;
    data['multiplier_values'] = {
      ...data,
    };
    delete data['multiplier_values'].vendor_id;
    delete data['multiplier_values'].branch_id;
    delete data['multiplier_values'].quantity_id;
    delete data['multiplier_values'].discount_code_ids;
    const apiObject = {
      payload: data ? data : {},
      method: 'POST',
      apiUrl: `${EndpointUrl.multiEditDiscountCodes}`,
      headers: {},
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
           setServerMsg(null)
          setOpenModel(false);
          onFileSelect({ success: true });
        } else {
           setServerMsg(response.result.data)
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  function handleRef(e: any) {
    console.log(e);

    formik.current = e;
  }
  function closeModel() {
    // console.log(222);
    setOpenModel(false);
    let data = {
      success: false,
    };
    onFileSelect(data);
  }
  return (
    <Fragment>
      <PiModal isOpen={openModel}>
        <PiModalHeader>
          <PopupHeaderDiv>
          {<CloseButton onClick={() => closeModel()} title="close" className="Hover"> <img src={CrossLogo} alt="loading"></img> </CloseButton>}
          <PiTypography component="h4">Multi Edit</PiTypography>
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
                  {loading && (
                    <SpinnerDiv>
                      <PiSpinner
                        color="primary"
                        size={50}
                        libraryType="atalskit"
                      />
                    </SpinnerDiv>
                  )}
                  {!loading && (
                    <FilterForm
                      data={addRowDropdowns}
                      quantity={quantity}
                      discountList={discountList}
                      reqInfo={reqInfo}
                    />
                  )}
                </PiModalBody>
                <PiModalFooter>
                   {serverMsg && (
                  <div className="server-msg">{serverMsg}</div>

                  )}
                  <PiButton
                  className='multi-closebtn'
                    appearance="secondary"
                    label="Cancel"
                    onClick={closeModel}
                  />
                  <PiButton
                    appearance="primary"
                    label="Proceed"
                    onClick={formik.handleSubmit}
                  />
                </PiModalFooter>
              </>
            );
          }}
        </Formik>
      </PiModal>
    </Fragment>
  );
}

const FilterForm = ({ data, discountList, reqInfo }: any) => {
  // console.log(discountList);
  let [quantityList, setQuantityList] = useState([]);
  let [disableQty, setDisableQty] = useState(true);

  function onDiscountChanged(e: any) {
    let params = {
      discount_codes: e,
      branch_id: reqInfo.body.branch_id,
      vendor_id: reqInfo.body.vendor_id,
    };
    const apiObject = {
      payload: params,
      method: 'POST',
      apiUrl: `${EndpointUrl.quantityByDiscountCodes}`,
      headers: {},
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          quantityList = response.result.data;
          if (quantityList.length) {
            setDisableQty(false);
          }
          setQuantityList(quantityList);
        } else {
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  return (
    <FilterFormFields>
      <InputFields>
        <PiSelectForm
          name="discount_code_ids"
          label="Discount Code"
          placeholder="Discount Code"
          isMulti={true}
          options={discountList}
          onChange={(e) => onDiscountChanged(e)}
        />
        <PiSelectForm
          name="quantity_id"
          label="Quantity"
          placeholder="Quantity"
          isMulti={false}
          options={quantityList}
          isDisabled={disableQty}
        />
      </InputFields>
      <PiTypography component="h4">Multipliers</PiTypography>
      <InputFields>
        {data.map(function (item: any, i: number) {
          return (
            <PiInputForm
              name={item.id}
              label={item.name}
              libraryType="atalskit"
              type="text"
              placeholder={item.name}
            />
          );
        })}
      </InputFields>
    </FilterFormFields>
  );
};

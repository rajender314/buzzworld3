/* eslint-disable no-use-before-define */
import { useState, useEffect, useRef } from "react";
import { Formik } from "formik";
import Validations from "@app/core/validations/validations";
import {
  PiInputForm,
  PiTypography,
  PiButton,
  PiModal,
  PiModalHeader,
  PiModalBody,
  PiModalFooter,
  PiSelectForm,
  PiInput,
  PiDatepickerForm,
  PiCheckBoxSelectForm,
  PiSpinner,
} from "pixel-kit";
import {
  FilterColumnProps,
  DynamicJsonValidProps,
  ApiResponse,
  ReqInfoProps,
} from "@app/services/schema/schema";
import {
  SpinnerDiv,
  FilterFormFields,
  MultiplierInputFields,
} from "@app/components/multiEditModel/multiEditModel.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services/api-services";
import { InputFields } from "@app/components/discountAddRowModel/discountAddRowModel.component";
import CrossLogo from "../../assets/images/cross.svg";
import { CloseButton } from "../adminaddrowmodel/adminaddrowmodel.component";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
} from "../fileuploadModel/fileuploadModel.component";

type Props = {
  reqInfo: ReqInfoProps;
  onFileSelect: any;
};

export default function MultiEditModel({ reqInfo, onFileSelect }: Props) {
  const [openModel, setOpenModel] = useState(false);
  const [loading, setloading] = useState(true);
  const [initialValues, setInitialValues] = useState<any>({
    discount_code_ids: "",
    quantity_id: "",
    start_date: "",
    end_date: "",
  });
  const [quantity, setquantity] = useState<any>([]);
  const [serverMsg, setServerMsg] = useState<any>(null);
  const messages: any = {
    quantity_id: {
      dropdown: "Please select  Quantity",
    },
    discount_code_ids: {
      // required: 'Please enter Discount Code',
      multiselect: "Please select  Discount Code",
    },
    start_date: {
      date: "Please select Start Date",
    },
    end_date: {
      date: "Please select End Date",
    },
  };
  let object = {
    quantity_id: "dropdown",
    discount_code_ids: "multiselect",
    start_date: "date",
    end_date: "date",
  };
  const [addRowDropdowns, setaddRowDropdowns] = useState<FilterColumnProps[]>(
    []
  );
  const [discountList, setDiscountList] = useState([]);
  const [validationSchema, setValidationSchema]: any = useState([]);
  // console.log(data);
  // console.log(userList);
  // userList = Promise.resolve(userList).then(function(results) {
  //   console.log(results);
  //   return results.users;
  // });
  function getFilterData() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.filterDataApi}?name=discount_codes`,
      headers: {},
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setloading(false);
          const gridFilterData = response.result.data;
          let qty = gridFilterData.filters.quantity;
          qty = quantity.map((item: FilterColumnProps) => ({
            value: item.id,
            label: item.name,
          }));
          setquantity(qty);
          const rowslist = gridFilterData.add_row_dropdowns.multiplier_type;
          setaddRowDropdowns(rowslist);

          for (let i = 0; i < rowslist.length; i += 1) {
            initialValues[rowslist[i].id] = "";
          }
          const json: DynamicJsonValidProps = {};

          for (let i = 0; i < rowslist.length; i += 1) {
            json[rowslist[i].id] = "required|phone|nonzero";
            messages[rowslist[i].id] = {
              required: `Please enter ${rowslist[i].name}`,
              phone: "Please enter valid number",
              nonzero: "Price cannot be zero",
            };
            object = {
              ...object,
              ...json,
            };
          }

          const schema = Validations(object, messages);
          setValidationSchema(schema);
          setInitialValues(initialValues);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  function getDiscountCodes() {
    let arr = [];
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.discountCodesApi}?vendor_id=${reqInfo.body.vendor_id}&branch_id=${reqInfo.body.branch_id}&is_dropdown=${true}`,
      headers: {},
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setloading(false);
          const gridFilterData = response.result.data;
          const list = gridFilterData;
          arr = list.map((item: FilterColumnProps) => ({
            value: item.id,
            label: item.discount_code,
          }));
          setDiscountList(arr);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  const formik = useRef<any>(null);
  useEffect(() => {
    setOpenModel(true);
  }, []);

  useEffect(() => {
    getFilterData();
    if (reqInfo.body) {
      getDiscountCodes();
    }
  }, []);

  // console.log(formik);
  function handleSubmit(data: any) {
    console.log(data);
    delete data.multiplier_values;
    // data.manufacturer_discount_id = data.manufacturer_discount_id.value;
    data.vendor_id = reqInfo.body.vendor_id;
    data.branch_id = reqInfo.body.branch_id;
    data.multiplier_values = {
      ...data,
    };
    delete data.multiplier_values.vendor_id;
    delete data.multiplier_values.branch_id;
    delete data.multiplier_values.quantity_id;
    delete data.multiplier_values.discount_code_ids;
    delete data.multiplier_values.start_date;
    delete data.multiplier_values.end_date;
    const apiObject = {
      payload: data || {},
      method: "POST",
      apiUrl: `${EndpointUrl.multiEditDiscountCodes}`,
      headers: {},
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setServerMsg("");
          setOpenModel(false);
          onFileSelect({ success: true });
        } else {
          setServerMsg(response.result.data);
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
    const data = {
      success: false,
    };
    onFileSelect(data);
  }
  function updateEvent(e: any) {
    if (e) {
      setServerMsg("Please select Discount Code");
      formik.current.setFieldValue("quantity_id", "");
    } else {
      setServerMsg(null);
    }
  }
  return (
    <PiModal isOpen={openModel}>
      <PopupHeaderContentDiv>
        <PiModalHeader>
          <PopupHeaderDiv>
            <PiTypography component="h3">Multi Edit</PiTypography>
            <CloseButton
              onClick={() => closeModel()}
              title="close"
              className="Hover"
            >
              {" "}
              <img src={CrossLogo} alt="loading" />{" "}
            </CloseButton>
          </PopupHeaderDiv>
        </PiModalHeader>
        <hr />
      </PopupHeaderContentDiv>
      {loading && (
        <SpinnerDiv>
          <PiSpinner color="primary" size={50} libraryType="atalskit" />
        </SpinnerDiv>
      )}
      {!loading && (
        <Formik
          validationSchema={validationSchema}
          onSubmit={(e: any) => handleSubmit(e)}
          initialValues={initialValues}
          innerRef={(e: any) => handleRef(e)}
        >
          {({ ...formikProps }: any) => (
            <>
              <PiModalBody>
                <FilterForm
                  data={addRowDropdowns}
                  quantity={quantity}
                  discountList={discountList}
                  reqInfo={reqInfo}
                  handleEvent={(e: any) => updateEvent(e)}
                />
              </PiModalBody>
              <PiModalFooter>
                {serverMsg && <div className="server-msg">{serverMsg}</div>}
                <PiButton
                  className="multi-closebtn"
                  appearance="secondary"
                  label="Cancel"
                  onClick={() => closeModel()}
                />
                <PiButton
                  appearance="primary"
                  label="Proceed"
                  onClick={formikProps.handleSubmit}
                />
              </PiModalFooter>
            </>
          )}
        </Formik>
      )}
    </PiModal>
  );
}

function FilterForm({ data, discountList, reqInfo, handleEvent }: any) {
  // console.log(discountList);
  const [quantityList, setQuantityList] = useState([]);
  const [minDate, setMinDate] = useState<any>("");
  const [endDate, setEndDate] = useState("");
  const [TodayDate, SetTodayDate] = useState("");

  function onDateChange(event: string) {
    setMinDate(event);
  }
  function onChangeEndDate(event: string) {
    setEndDate(event);
  }

  useEffect(() => {
    function formatDate(date: Date) {
      const d = new Date(date);
      let month = `${d.getMonth() + 1}`;
      let day = `${d.getDate()}`;
      const year = d.getFullYear();

      if (month.length < 2) month = `0${month}`;
      if (day.length < 2) day = `0${day}`;

      return [year, month, day].join("-");
    }
    SetTodayDate(formatDate(new Date()));
  }, []);
  const [selectedDiscountCodes, setSelectedDiscountCodes] = useState([]);
  function onDiscountChanged(e: any) {
    setSelectedDiscountCodes(e);
    if (!e.length) {
      handleEvent(true);
    } else {
      handleEvent(false);
    }
    const params = {
      discount_codes: e,
      branch_id: reqInfo.body.branch_id,
      vendor_id: reqInfo.body.vendor_id,
    };
    const apiObject = {
      payload: params,
      method: "POST",
      apiUrl: `${EndpointUrl.quantityByDiscountCodes}`,
      headers: {},
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setQuantityList(response.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  return (
    <FilterFormFields>
      <InputFields>
        <PiInput
          name="vendor_id"
          label="Vendor"
          libraryType="atalskit"
          type="text"
          isDisabled
          placeholder="Vendor"
          value={reqInfo.body.vendor_name}
        />
        <PiCheckBoxSelectForm
          name="discount_code_ids"
          label="Discount Code"
          placeholder="Select"
          isMulti
          options={discountList}
          onChange={(e) => onDiscountChanged(e)}
          classNamePrefix={
            selectedDiscountCodes.length
              ? "multi-select react-select"
              : "react-select"
          }
          isMandatory
        />
        <div className="Discount-dropdown dt-pkr-bg-unset">
          <PiDatepickerForm
            helpText=""
            label="Start Date"
            libraryType="atalskit"
            name="start_date"
            value={minDate}
            onChange={(e: any) => onDateChange(e)}
            minDate={TodayDate}
            placeholder="MM/DD/YYYY"
            isMandatory
          />
        </div>

        <div className="Discount-dropdown dt-pkr-bg-unset">
          <PiDatepickerForm
            helpText=""
            label="End Date"
            libraryType="atalskit"
            name="end_date"
            minDate={minDate}
            onChange={(e: any) => onChangeEndDate(e)}
            value={endDate}
            placeholder="MM/DD/YYYY"
            isMandatory
          />
        </div>
        <PiSelectForm
          name="quantity_id"
          label="Quantity"
          placeholder="Select"
          isMulti={false}
          options={quantityList}
          isDisabled={!(selectedDiscountCodes.length > 0)}
          classNamePrefix="react-select"
          isMandatory
        />
      </InputFields>
      <div className="InputFields">
        <PiTypography component="h4">Multipliers</PiTypography>

        <MultiplierInputFields>
          {data.map((item: any) => (
            <PiInputForm
              name={item.id}
              label={item.name}
              libraryType="atalskit"
              type="string"
              placeholder={`Enter ${item.name}`}
              maxLength={10}
              isMandatory
            />
          ))}
        </MultiplierInputFields>
      </div>
    </FilterFormFields>
  );
}

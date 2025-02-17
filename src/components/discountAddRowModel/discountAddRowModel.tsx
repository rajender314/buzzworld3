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
  PiTextareaForm,
  PiSpinner,
  PiInput,
  PiDatepickerForm,
} from "pixel-kit";
import {
  FilterColumnProps,
  ApiResponse,
  ReqInfoProps,
  DynamicJsonValidProps,
} from "@app/services/schema/schema";
import {
  FilterFormFields,
  MultiplierInputFields,
} from "@app/components/multiEditModel/multiEditModel.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services/api-services";
import { SubscribeService2 } from "@app/services/subscribe-service";
import {
  InputFields,
  SpinnerDiv,
} from "@app/components/discountAddRowModel/discountAddRowModel.component";
import moment from "moment";
import { CloseButton } from "../adminaddrowmodel/adminaddrowmodel.component";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
} from "../fileuploadModel/fileuploadModel.component";
import CrossLogo from "../../assets/images/cross.svg";
import { AsyncLabel } from "../rmaModel/RmaModel.component";

type Props = {
  reqInfo: ReqInfoProps;
  onFileSelect: any;
  paramData: any;
};
const messages: any = {
  quantity_id: {
    dropdown: "Please select  Quantity",
  },
  description: {
    // required: 'Please enter Description',
    description: "",
  },
  discount_code: {
    required: "Please enter Discount Code",
  },
  start_date: {
    date: "Please select Start Date",
  },
  end_date: {
    date: "Please select End Date",
  },
};
let object = {
  discount_code: "required",
  quantity_id: "dropdown",
  description: "description",
  start_date: "date",
  end_date: "date",
};
export default function DiscountAddRowModel({
  reqInfo,
  onFileSelect,
  paramData,
}: Props) {
  console.log(paramData);
  const [openModel, setOpenModel] = useState(false);
  const [quantity, setquantity] = useState([]);
  const [modelLabel, setModelLabel] = useState("");
  const [loader, setLoader] = useState(true);
  const [loading, setloading] = useState(true);
  let gridDataById: any;
  const [addRowDropdowns, setaddRowDropdowns] = useState<FilterColumnProps[]>(
    []
  );
  const [validationSchema, setValidationSchema]: any = useState([]);
  const [initialValues, setInitialValues] = useState<DynamicJsonValidProps>({
    vendor_id: "",
    discount_code: "",
    description: "",
    quantity_id: "",
    start_date: "",
    end_date: "",
  });
  function getFilterData() {
    // let arr = []
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.filterDataApi}?name=discount_codes&vendor_id=${reqInfo.body.vendor_id}`,
      headers: {},
    };

    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          console.log(gridDataById, paramData);
          setTimeout(() => {
            setLoader(false);
          }, 100);
          const gridFilterData = response.result.data;
          const rowslist = gridFilterData.add_row_dropdowns.multiplier_type;
          setaddRowDropdowns(rowslist);
          const list = gridFilterData.filters.quantity;
          const arr = list.map((item: FilterColumnProps) => ({
            value: item.id,
            label: item.name,
          }));
          setquantity(arr);
          SubscribeService2.sendMessage2(rowslist);
          for (let i = 0; i < rowslist.length; i += 1) {
            initialValues[rowslist[i].id] = "";

            if (paramData && gridDataById) {
              let arr2 = [];
              arr2 = Object.keys(gridDataById.multipliers);
              initialValues.discount_code = gridDataById.discount_code;
              initialValues.quantity_id = gridDataById.quantity_id;
              initialValues.description = gridDataById.description;
              initialValues.vendor_id = paramData.vendor_id;
              initialValues.start_date = moment(
                gridDataById.start_date,
                "MM-DD-YYYY"
              ).format("YYYY-MM-DD");
              initialValues.end_date = moment(
                gridDataById.end_date,
                "MM-DD-YYYY"
              ).format("YYYY-MM-DD");
              initialValues[rowslist[i].id] = "";
              console.log(arr2);
              for (let j = 0; j < arr2.length; j += 1) {
                if (rowslist[i].id === arr2[j]) {
                  console.log(gridDataById.multipliers[arr2[j]]);
                  initialValues[rowslist[i].id] =
                    gridDataById.multipliers[arr2[j]];
                }
                console.log(initialValues);
              }
            }
          }
          await setInitialValues(initialValues);

          setTimeout(() => {
            console.log(initialValues);
            setloading(false);
          }, 1000);

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
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  const [serverMsg, setServerMsg] = useState(null);
  const formik = useRef<any>(null);
  function getDiscountCodes() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.discountCodesApi}/${paramData.id}?vendor_id=${reqInfo.body.vendor_id}&vendor_name=${reqInfo.body.vendor_name}&branch_id=${reqInfo.body.branch_id}&quantity=${paramData.quantity_id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          gridDataById = response.result.data;
          console.log(gridDataById);
          getFilterData();
        }
      })
      .catch((err: string) => {
        console.log(err);
      });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(gridDataById);
      }, 100);
    });
  }

  useEffect(() => {
    setOpenModel(true);
  }, []);

  useEffect(() => {
    (async () => {
      // console.log(paramData)
      if (paramData) {
        setModelLabel("Update Discount Code");
        await getDiscountCodes();
      } else {
        setModelLabel("Add Discount Code");
        getFilterData();
      }
    })();
  }, []);

  // console.log(formik);
  function handleSubmit(data: any) {
    console.log(data);

    if (data.start_date) {
      data.start_date = moment(data.start_date).format("YYYY-MM-DD");
    }
    if (data.end_date) {
      data.end_date = moment(data.end_date).format("YYYY-MM-DD");
    }
    delete data.multiplier_values;
    // data.quantity_id = data.quantity_id.value;
    data.vendor_id = reqInfo.body.vendor_id;
    data.branch_id = reqInfo.body.branch_id;
    data.multiplier_values = {
      ...data,
    };
    delete data.multiplier_values.vendor_id;
    delete data.multiplier_values.branch_id;
    delete data.multiplier_values.quantity_id;
    delete data.multiplier_values.description;
    delete data.multiplier_values.discount_code;
    delete data.multiplier_values.start_date;
    delete data.multiplier_values.end_date;
    console.log(paramData);
    const apiObject = {
      payload: data || {},
      method: paramData && paramData.id ? "PUT" : "POST",
      apiUrl:
        paramData && paramData.id
          ? `${EndpointUrl.discountCodesApi}/${paramData.id}`
          : `${EndpointUrl.discountCodesApi}`,
      headers: {},
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setServerMsg(null);
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
  return (
    <PiModal isOpen={openModel} className="model-class">
      <PopupHeaderContentDiv>
        <PiModalHeader>
          <PopupHeaderDiv>
            <PiTypography component="h3">{modelLabel}</PiTypography>
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
                <div style={{ height: "100%", overflow: "hidden" }}>
                  <FilterForm
                    data={quantity}
                    rowdropdown={addRowDropdowns}
                    paramData={paramData}
                    loader={loader}
                    reqInfo={reqInfo}
                  />
                </div>
              </PiModalBody>
              <PiModalFooter>
                {serverMsg && <div className="server-msg">{serverMsg}</div>}
                <PiButton
                  appearance="secondary"
                  label="Cancel"
                  onClick={() => closeModel()}
                />
                <PiButton
                  appearance="primary"
                  label={modelLabel}
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

function FilterForm({ data, rowdropdown, paramData, loader, reqInfo }: any) {
  const [minDate, setMinDate] = useState(
    paramData ? moment(paramData.start_date).format("YYYY-MM-DD") : ""
  );

  // let [endDate, setEndDate] = useState(
  //  paramData ? moment(paramData.end_date).format('YYYY-MM-DD') : '',
  // )

  const [TodayDate, SetTodayDate] = useState("");
  function onDateChange(event: string) {
    setMinDate(event);
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
  return (
    <FilterFormFields>
      <div>
        <InputFields className="inputs">
          <PiInput
            name="vendor_id"
            label="Vendor"
            libraryType="atalskit"
            type="text"
            isDisabled
            placeholder="Vendor"
            value={paramData ? paramData.vendor_name : reqInfo.body.vendor_name}
          />
          <PiInputForm
            name="discount_code"
            label="Discount Code"
            libraryType="atalskit"
            type="text"
            placeholder="Discount Code"
            isDisabled={paramData}
            isMandatory
          />
          <div className="Discount-dropdown dt-pkr-bg-unset">
            <AsyncLabel
              // htmlFor="async-select-example"
              className="css-re7y6x"
            >
              Start Date
              <span
                className="mandatory-star"
                style={{
                  color: "red",
                  paddingLeft: "4px",
                }}
              >
                *
              </span>
            </AsyncLabel>
            <PiDatepickerForm
              helpText=""
              // label="Start Date"
              libraryType="atalskit"
              name="start_date"
              // value={paramData.start_date}
              onChange={(e: any) => onDateChange(e)}
              minDate={TodayDate}
              placeholder="MM/DD/YYYY"
            />
          </div>

          <div className="Discount-dropdown dt-pkr-bg-unset">
            <AsyncLabel
              // htmlFor="async-select-example"
              className="css-re7y6x"
            >
              End Date
              <span
                className="mandatory-star"
                style={{
                  color: "red",
                  paddingLeft: "4px",
                }}
              >
                *
              </span>
            </AsyncLabel>
            <PiDatepickerForm
              helpText=""
              // label="End Date"
              libraryType="atalskit"
              name="end_date"
              minDate={minDate}
              // onChange={onChangeEndDate}
              // value={endDate}
              placeholder="MM/DD/YYYY"
            />
          </div>
          <PiSelectForm
            name="quantity_id"
            label="Quantity"
            placeholder="Quantity"
            isMulti={false}
            options={data}
            isDisabled={!!paramData}
            classNamePrefix="react-select"
            isMandatory
          />
        </InputFields>

        <PiTextareaForm
          name="description"
          label="Description"
          libraryType="atalskit"
          placeholder="Description"
          maxLength={255}
        />
      </div>
      <div className="InputFields">
        <PiTypography component="h4">Multipliers</PiTypography>

        <MultiplierInputFields>
          {!loader &&
            rowdropdown.map((item: any) => (
              <PiInputForm
                name={item.id}
                label={item.name}
                libraryType="atalskit"
                type="string"
                placeholder={item.name}
                isMandatory
                maxLength={10}
              />
            ))}
          {loader && (
            <SpinnerDiv>
              <PiSpinner color="primary" size={40} libraryType="atalskit" />
            </SpinnerDiv>
          )}
        </MultiplierInputFields>
        {/* </div> */}
      </div>
    </FilterFormFields>
  );
}

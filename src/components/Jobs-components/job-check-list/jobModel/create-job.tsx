import {
  PiButton,
  PiDatepickerForm,
  PiInput,
  PiInputForm,
  PiSelectForm,
  PiSideDrawer,
  PiSpinner,
  PiTextareaForm,
  PiToast,
  PiTypography,
} from "pixel-kit";
import { Fragment, useEffect, useRef, useState } from "react";
import CrossLogo from "@app/assets/images/cross.svg";
import { Formik, Field } from "formik";
import CreateJob from "@app/assets/images/Jobs-logoo.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import _ from "lodash";
import { ApiResponse } from "@app/services/schema/schema";
import { AsyncSelect } from "@atlaskit/select";
import { DateRangePickerDiv } from "@app/components/parts-purchase-components/parts-purchase-form.tsx/parts-purchase-form-components";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import { AsyncSelectDiv } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import {
  CloseButton,
  JobFields,
  JobPopupHeaderContainer,
} from "@app/components/Jobs-components/job-check-list/jobModel/job-model-component";
import {
  AsyncLabel,
  SideDrawerW40,
} from "@app/components/rmaModel/RmaModel.component";
import Loader from "@app/components/Loader/loader";
import {
  CreateJobButtonContainer,
  CreateJobSideDrawerFooter,
  CreateJobValidationMsg,
  FormBodyOverFlows,
} from "@app/components/Jobs-components/job-check-list/jobModel/form/create-job.component";
import JobValidationSchema from "@app/components/Jobs-components/job-check-list/jobModel/jobs-validation-schema";

type Props = {
  sendModelData: any;
};
export default function JobModel({ sendModelData }: Props) {
  const [minDate, setMinDate]: any = useState("");
  const [serverMsg, setServerMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupMessageShow, setPopupMessageShow] = useState(false);
  const page: any = 1;
  const perPage = 15;
  const [TodayDate, SetTodayDate] = useState("");
  const formik = useRef<any>(null);
  const { current }: any = useRef({ timer: 0 });
  const [opacity, setOpacity] = useState(false);
  const [initialValues] = useState({
    order_id: "",
    customer: "",
    select_item: "",
    unit_of_measure: "",
    job_description: "",
    stockcode: "",
    stockcode_des: "",
    warehouse: "",
    lineShipDate: "",
    SalesOrder: "",
    sales_order_line: "",
    Customers: "",
  });
  const [customerName, setCustomerName]: any = useState("");
  const [salesOrders, setSalesOrders]: any = useState("");
  const [customer, setCustomer]: any = useState("");
  const [selectValues, setSelectValues]: any = useState();
  const [itemsList, setItemsList]: any = useState([]);

  function onDateChange(event: any) {
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

  function closeModel() {
    sendModelData({ success: false });
  }

  function handleSubmit(data: any) {
    setOpacity(true);

    const apiObject = {
      payload: {
        job_description:
          data && data.job_description ? data.job_description : "",
        Customer: customer || "",
        stock_code:
          selectValues && selectValues.stockcode ? selectValues.stockcode : "",
        stock_description:
          selectValues && selectValues.stockcode_des
            ? selectValues.stockcode_des
            : "",
        DateCalcMethod: "M",
        SeqCheckReq: "N",
        ConfirmedFlag: "Y",
        HoldFlag: "N",
        Warehouse:
          selectValues && selectValues.warehouse ? selectValues.warehouse : "",

        UnitOfMeasure:
          selectValues && selectValues.unit_of_measure
            ? selectValues.unit_of_measure
            : "",
        CustomerName: customerName || "",
        JobDeliveryDate: minDate || "",
        SalesOrder: salesOrders || "",
        SalesOrderLine:
          selectValues && selectValues.sales_order_line
            ? selectValues.sales_order_line
            : "",
      },
      method: "POST",
      apiUrl: EndpointUrl.SysproJobInsert,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.status_code === 200 && response.result.success) {
          setServerMsg("");
          setPopupMessageShow(true);
          setTimeout(() => {
            sendModelData({
              success: true,
              id: response.result.data.id,
              module: "jobs",
            });
          }, 1000);

          setOpacity(false);
        } else {
          setServerMsg(response.result.data);
          setOpacity(false);
        }
      })
      .catch(() => {});
  }

  function handleRef(e: any) {
    formik.current = e;
  }
  function getItemsList(id: any) {
    let itemslist: any = [];
    setOpacity(true);
    const apiObject = {
      payload: { salesOrder: id.value },
      method: "POST",
      apiUrl: `${EndpointUrl.SalesOrderQuery}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.status_code === 200 && response.result.success) {
          formik.current.setFieldValue(
            "Customers",
            response.result.data.sales_order_info.CustomerName
          );

          setSalesOrders(response.result.data.sales_order_info.SalesOrder);
          setCustomer(response.result.data.sales_order_info.Customer);
          setCustomerName(response.result.data.sales_order_info.CustomerName);
          setOpacity(false);
          let arr = [];
          const list = response.result.data.sales_order_info.items;
          arr = list.map((item: any) => ({
            value: item.value,
            label: item.label,

            ...item,
          }));
          itemslist = arr;
          setItemsList([...itemslist]);

          setOpacity(false);
        } else {
          setServerMsg(response.result.data);
          setOpacity(false);
        }
      })
      .catch(() => {});
    return itemslist;
  }
  const onSelectItemChange = (value: any) => {
    if (value !== null) {
      getItemsList(value);
    } else if (value === null) {
      setCustomerName("");
      formik.current.setFieldValue("order_id", "");
      formik.current.setFieldValue("Customers", "");
      formik.current.setFieldValue("unit_of_measure", "");
      formik.current.setFieldValue("select_item", "");
      formik.current.setFieldValue("warehouse", "");
      formik.current.setFieldValue("sales_order_line", "");
      formik.current.setFieldValue("stockcode_des", "");
    } else {
      setOpacity(false);
      setLoading(false);
    }
  };

  const onSelectItems = (value: any) => {
    setOpacity(true);
    const indx = _.findIndex(itemsList, { value: value.value });
    setSelectValues(value);
    setTimeout(() => {
      formik.current.setFieldValue(
        "unit_of_measure",
        itemsList[indx].unit_of_measure
      );
      formik.current.setFieldValue(
        "stockcode_des",
        itemsList[indx].stockcode_des
      );
      formik.current.setFieldValue("stockcode", itemsList[indx].stockcode);

      formik.current.setFieldValue("warehouse", itemsList[indx].warehouse);

      formik.current.setFieldValue(
        "sales_order_line",
        itemsList[indx].sales_order_line
      );
      setOpacity(false);
    }, 1000);

    if (itemsList[indx].lineShipDate >= TodayDate) {
      formik.current.setFieldValue(
        "lineShipDate",
        itemsList[indx].lineShipDate
      );
    }
  };
  const getSelectItems = async (searchValue: string, flag: string) => {
    let orderlist: any = [];
    if (searchValue.length >= 3) {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl:
          flag === "SalesOrderLists"
            ? `${EndpointUrl.SalesOrderQuery}?search=${searchValue}`
            : `${EndpointUrl.SalesOrderLists}?page=${page}&perPage=${perPage}&search=${searchValue}`,

        headers: {},
      };
      await triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.status_code === 200 && response.result.success) {
            orderlist = response.result.data.data;
            setLoading(false);
            setServerMsg("");
          } else {
            setServerMsg(response.result.data);
            setLoading(false);
          }
        })
        .catch(() => {});
      return orderlist;
    }
    return orderlist;
  };
  const promiseOptions = (searchValue: string) =>
    new Promise((resolve) => {
      if (current.timer) clearTimeout(current.timer);
      current.timer = setTimeout(() => {
        resolve(getSelectItems(searchValue, "customers"));
      }, 1000);
    });
  const handleInputChanges = (newValue: string) => {
    if (newValue.length >= 3) {
      return newValue;
    }
    return newValue;
  };

  return (
    <>
      <PiToast
        className={popupMessageShow ? "show" : ""}
        headerLabel="Job Created Successfully"
        message=""
        onClose={async () => setPopupMessageShow(false)}
      />
      <SideDrawerW40>
        <PiSideDrawer isOpen width="narrow">
          <SideDrawerContainer>
            <SideDrawerHeader>
              <JobPopupHeaderContainer>
                <img src={CreateJob} alt="create-job" />

                <PiTypography component="h3">Create Job</PiTypography>
              </JobPopupHeaderContainer>

              <CloseButton
                onClick={() => closeModel()}
                title="close"
                className="Hover"
              >
                <img src={CrossLogo} alt="create-job" />
              </CloseButton>
            </SideDrawerHeader>
            {loading && <Loader />}
            {!loading && (
              <Formik
                validationSchema={JobValidationSchema}
                onSubmit={(e: any) => handleSubmit(e)}
                initialValues={initialValues}
                innerRef={(e: any) => handleRef(e)}
                validateOnMount
              >
                {({ ...formikProps }: any) => (
                  <>
                    <FormBodyOverFlows
                      className={opacity ? "opacity-on-load" : ""}
                    >
                      {opacity && (
                        <SpinnerDiv
                          style={{ position: "absolute", left: "50%" }}
                        >
                          <PiSpinner
                            color="primary"
                            size={50}
                            libraryType="atalskit"
                          />
                        </SpinnerDiv>
                      )}
                      <JobFields className="create-data">
                        <div className="width-50">
                          <AsyncSelectDiv>
                            <AsyncLabel
                              htmlFor="async-select-example"
                              className="mandatory"
                            >
                              Order ID
                            </AsyncLabel>
                            <Field name="order_id">
                              {({ form, meta }: any) => (
                                <>
                                  <AsyncSelect
                                    name="order_id"
                                    inputId="async-select-example"
                                    classNamePrefix="react-select"
                                    onInputChange={handleInputChanges}
                                    loadOptions={promiseOptions}
                                    placeholder="Search Order ID "
                                    onChange={(value) => {
                                      onSelectItemChange(value);
                                      form.setFieldValue("order_id", value);
                                    }}
                                    isClearable
                                    // value={field.value}
                                    isDisabled={opacity}
                                    noOptionsMessage={(obj: any) =>
                                      !obj.inputValue
                                        ? "Search Order Id"
                                        : "No Order Id Found"
                                    }
                                  />
                                  <small className="validation-error date-range-validation-error">
                                    {meta.touched && meta.error
                                      ? meta.error
                                      : ""}
                                  </small>
                                </>
                              )}
                            </Field>
                          </AsyncSelectDiv>
                        </div>
                        <div className="width-50">
                          <PiInputForm
                            placeholder="Customer name"
                            label="Customer"
                            libraryType="atalskit"
                            name="Customers"
                            onChange={() => setServerMsg("")}
                            isDisabled
                            isMandatory
                          />
                        </div>
                        <div className="width-50">
                          <PiSelectForm
                            name="select_item"
                            label="Select An Item"
                            placeholder="Select"
                            isMulti={false}
                            options={itemsList}
                            onChange={(value) => {
                              onSelectItems(value);
                            }}
                            classNamePrefix="react-select"
                            isMandatory
                          />
                        </div>

                        <div className="width-50">
                          <PiInputForm
                            name="unit_of_measure"
                            label="Unit Of Measure"
                            libraryType="atalskit"
                            type="text"
                            placeholder="Unit Of Measure"
                            className="Name"
                            maxLength={30}
                            onChange={() => setServerMsg("")}
                            isDisabled
                            isMandatory
                          />
                        </div>
                        <div className="width-50">
                          <PiTextareaForm
                            name="job_description"
                            label="Job Description"
                            libraryType="atalskit"
                            placeholder="Enter Job Description"
                            maxLength={100}
                            isMandatory
                          />
                        </div>
                        <div className="width-50">
                          <PiTextareaForm
                            name="stockcode_des"
                            label="Item Description"
                            libraryType="atalskit"
                            placeholder="Item Description"
                            maxLength={30}
                            onChange={() => setServerMsg("")}
                            isDisabled
                          />
                        </div>
                        <div className="width-50">
                          <PiInputForm
                            name="warehouse"
                            label="Warehouse"
                            libraryType="atalskit"
                            type="text"
                            placeholder="Warehouse"
                            className="Name"
                            maxLength={30}
                            onChange={() => setServerMsg("")}
                            isDisabled
                            isMandatory
                          />
                        </div>
                        <div className="width-50 stock">
                          <PiInputForm
                            name="stockcode"
                            label="Stock Code"
                            libraryType="atalskit"
                            type="text"
                            placeholder="Stock Code"
                            className="Name"
                            maxLength={30}
                            onChange={() => setServerMsg("")}
                            isDisabled
                          />
                        </div>

                        <DateRangePickerDiv
                          style={{
                            gap: "4px",
                          }}
                          className="dt-pkr-bg-unset width-50"
                        >
                          <AsyncLabel
                            htmlFor="async-select-example"
                            className="mandatory"
                          >
                            Delivery Due Date
                          </AsyncLabel>
                          <PiDatepickerForm
                            helpText=""
                            libraryType="atalskit"
                            name="lineShipDate"
                            minDate={TodayDate}
                            onChange={(e:any) => onDateChange(e)}
                            value={minDate}
                            placeholder="MM/DD/YYYY"
                          />
                        </DateRangePickerDiv>
                        <div className="width-50 stock">
                          <PiInput
                            placeholder="SalesOrder"
                            label="Sales Order"
                            libraryType="atalskit"
                            name="Sales Order"
                            value={salesOrders}
                            isDisabled
                          />
                        </div>
                        <div className="width-50">
                          <PiInputForm
                            name="sales_order_line"
                            label="Sales Order Line"
                            libraryType="atalskit"
                            type="text"
                            placeholder="Sales Order Line"
                            className="Name"
                            maxLength={30}
                            onChange={() => setServerMsg("")}
                            isDisabled
                            // value={salesOrdersLine}
                            isMandatory
                          />
                        </div>
                        <div className="width-50" />
                      </JobFields>
                    </FormBodyOverFlows>
                    <CreateJobSideDrawerFooter
                      className={serverMsg === "" ? "is-serverMsg" : ""}
                    >
                      {serverMsg && (
                        <CreateJobValidationMsg>
                          {serverMsg && serverMsg ? serverMsg : ""}
                        </CreateJobValidationMsg>
                      )}
                      <CreateJobButtonContainer
                        className={serverMsg === "" ? "" : "flex-1"}
                      >
                        <PiButton
                          appearance="primary"
                          label="Create Job"
                          onClick={formikProps.handleSubmit}
                          isDisabled={!!opacity}
                        />
                      </CreateJobButtonContainer>
                    </CreateJobSideDrawerFooter>
                  </>
                )}
              </Formik>
            )}
          </SideDrawerContainer>
        </PiSideDrawer>
      </SideDrawerW40>
    </>
  );
}

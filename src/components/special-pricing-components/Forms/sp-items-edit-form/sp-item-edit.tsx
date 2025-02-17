import {
  PiModal,
  PiModalHeader,
  PiTypography,
  PiSpinner,
  PiModalBody,
  PiModalFooter,
  PiButton,
  PiInputForm,
  PiSelectForm,
  PiIconInputForm,
} from "pixel-kit";
import { useCallback, useEffect, useRef, useState } from "react";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
  SpinnerDiv,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import CrossLogo from "@app/assets/images/cross.svg";
import { Formik, Field } from "formik";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import DatePicker from "react-datepicker";
import { AsyncLabel } from "@app/components/rmaModel/RmaModel.component";
import moment from "moment";
import { FilterFormFields } from "@app/components/multiEditModel/multiEditModel.component";
import { DateRangePickerDiv } from "../../sp-left-filter/sp-left-filter.component";
import { IconFieldWrapper } from "../../logHistoryDetailGrid/logHistoryDetailGrid.component";
import SpItemValidationSchema from "./sp-item-validation";

type Props = {
  onFileSelect: any;
  paramData: any;
};

export default function SpItemEdit({ onFileSelect, paramData }: Props) {
  const [openModel, setOpenModel] = useState(false);
  const [serverMsg, setServerMsg] = useState(null);
  const [loading, setloading] = useState(true);
  const [initialValues, setInitialValues] = useState<any>({
    value: "",
    fixed_price: "",
    buy_side_discount: "",
    type: "",
    date_range: "",
    buy_price: "",
  });
  const [dateRange, setDateRange]: any = useState([
    new Date(moment(paramData.start_date, "MM-DD-YYYY").toISOString() as any),
    new Date(moment(paramData.end_date, "MM-DD-YYYY").toISOString() as any),
  ]);
  console.log(dateRange);
  const [startDate, endDate] = dateRange;
  const minDate = new Date();
  const [startdate, setStartdate]: any = useState(
    moment(paramData.start_date, "MM-DD-YYYY").format("YYYY-MM-DD")
  );
  const [enddate, setEnddate]: any = useState(
    moment(paramData.end_date, "MM-DD-YYYY").format("YYYY-MM-DD")
  );
  console.log(startdate);
  const formik = useRef<any>(null);

  const pricingRuleType = [
    { label: "Markup", value: "markup" },
    { label: "Discount", value: "discount" },
  ];
  function handleRef(e: any) {
    console.log(e);
    formik.current = e;
  }
  const onDateRangeChange = (update: any, form: any) => {
    console.log(form);
    form.setFieldValue("date_range", update);
    setStartdate(moment(update[0]).format("YYYY-MM-DD"));
    setEnddate(moment(update[1]).format("YYYY-MM-DD"));
    setDateRange(update);
  };
  const getSpItemById = useCallback(() => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.SpecialPrice}/${paramData.id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          setServerMsg(null);
          const { data } = response.result;
          initialValues.value = data.value;
          initialValues.fixed_price = data.fixed_price;
          initialValues.buy_price = data.buy_price;
          initialValues.buy_side_discount = data.buy_side_discount;
          initialValues.type = data.type;
          initialValues.discount_code = data.discount_code;
          initialValues.vendor_name = data.vendor_name;
          initialValues.stock_code = data.stock_code;
          initialValues.date_range = ["123"];
        } else {
          setServerMsg(response.result.data);
        }
        await setInitialValues(initialValues);
        setloading(false);
      })
      .catch((err: string) => {
        console.log(err);
      });
  }, [initialValues, paramData.id]);
  useEffect(() => {
    console.log(new Date());
    setOpenModel(true);
    getSpItemById();
  }, [getSpItemById]);

  function closeModel() {
    setOpenModel(false);
    const data = {
      success: false,
    };
    onFileSelect(data);
  }

  function handleSubmit(data: any) {
    console.log(data);
    delete data.stock_code;
    delete data.vendor_name;
    delete data.discount_code;
    delete data.date_range;
    data.start_date = startdate;
    data.end_date = enddate;
    const apiObject = {
      payload: data || {},
      method: "PATCH",
      apiUrl: `${EndpointUrl.SpecialPrice}/${paramData.id}`,
      headers: {},
    };
    console.log(data);

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
  const onChangeMarkupType = (e: any) => {
    if (e) {
      // do nothing
      initialValues.type = e;
      setInitialValues(initialValues);
    } else {
      initialValues.type = "";
      setInitialValues(initialValues);
      formik.current.setFieldValue("value", "");
    }
  };
  return (
    <PiModal isOpen={openModel}>
      <PopupHeaderContentDiv>
        <PiModalHeader>
          <PopupHeaderDiv>
            <PiTypography component="h3">
              Update Non Standard Pricing
            </PiTypography>
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
          validationSchema={SpItemValidationSchema}
          onSubmit={(e: any) => handleSubmit(e)}
          initialValues={initialValues}
          innerRef={(e: any) => handleRef(e)}
        >
          {({ ...formikProps }: any) => (
            <>
              <PiModalBody>
                <FilterFormFields>
                  <div className="Feilds">
                    <div className="TwoInput">
                      <PiInputForm
                        name="stock_code"
                        label="Stock Code"
                        placeholder="Stock Code"
                        type="text"
                        isDisabled
                      />
                      <PiInputForm
                        name="vendor_name"
                        label="Supplier"
                        libraryType="atalskit"
                        type="text"
                        placeholder="Supplier"
                        isDisabled
                      />
                    </div>
                    <div className="TwoInput">
                      <PiInputForm
                        name="discount_code"
                        label="Discount Code"
                        libraryType="atalskit"
                        type="text"
                        placeholder="Select Discount Code"
                        isDisabled
                      />
                      <IconFieldWrapper className="icon_input">
                        {/* <AsyncLabel htmlFor="async-select-example">
                                Fixed Sale Price
                                <span
                                  className="mandatory-star"
                                  style={{
                                    color: 'red',
                                    paddingLeft: '4px',
                                  }}
                                >
                                  *
                                </span>
                              </AsyncLabel>
                              <Field label="After input" name="fixed_price">
                                {({ fieldProps, form, meta }: any) => (
                                  <Fragment>
                                    <Textfield
                                      {...fieldProps}
                                      name="fixed_price"
                                      value={formik.values.fixed_price}
                                      elemAfterInput={
                                        <div style={{ marginRight: '10px', color: '#6d7992' }}>
                                          $
                                        </div>
                                      }
                                      onChange={(e: any) =>
                                        onValueChange(e, form, 'fixed_price')
                                      }
                                      className="icon-field"
                                      placeholder='Fixed Sale Price'
                                    />
                                    <small className="validation-error">
                                      {meta.touched && meta.error
                                        ? meta.error
                                        : ''}
                                    </small>
                                  </Fragment>
                                )}
                              </Field> */}

                        <PiIconInputForm
                          name="fixed_price"
                          label="Fixed Sale Price"
                          placeholder="Fixed Sale Price"
                          maxLength={15}
                          type="string"
                          elemBeforeInput={
                            <div
                              style={{
                                padding: "10px",
                                color: "#6D7992",
                                borderRight: "1px solid #d0d1d3",
                              }}
                            >
                              $
                            </div>
                          }
                        />
                      </IconFieldWrapper>
                    </div>

                    <div className="TwoInput">
                      <PiSelectForm
                        name="type"
                        label="Type"
                        placeholder="Type"
                        isMulti={false}
                        options={pricingRuleType}
                        classNamePrefix="react-select"
                        isClearable
                        onChange={(e: any) => onChangeMarkupType(e)}
                      />
                      <IconFieldWrapper className="icon_input">
                        {/* <AsyncLabel htmlFor="async-select-example">
                                Value
                                <span
                                  className="mandatory-star"
                                  style={{
                                    color: 'red',
                                    paddingLeft: '4px',
                                  }}
                                >
                                  *
                                </span>
                              </AsyncLabel>
                              <Field label="After input" name="value">
                                {({ fieldProps, form, meta }: any) => (
                                  <Fragment>
                                    <Textfield
                                      {...fieldProps}
                                      name="value"
                                      value={formik.values.value}
                                      elemAfterInput={
                                        <div style={{ marginRight: '10px', color: '#6d7992' }}>
                                          %
                                        </div>
                                      }
                                      onChange={(e: any) =>
                                        onValueChange(e, form, 'value')
                                      }
                                      className="icon-field"
                                      placeholder='Value'
                                    />
                                    <small className="validation-error">
                                      {meta.touched && meta.error
                                        ? meta.error
                                        : ''}
                                    </small>
                                  </Fragment>
                                )}
                              </Field> */}
                        <PiIconInputForm
                          name="value"
                          label="Value"
                          placeholder="Value"
                          maxLength={15}
                          type="string"
                          elemBeforeInput={
                            <div
                              style={{
                                padding: "10px",
                                color: "#6D7992",
                                borderRight: "1px solid #d0d1d3",
                              }}
                            >
                              %
                            </div>
                          }
                          isDisabled={!initialValues.type}
                        />
                      </IconFieldWrapper>
                    </div>
                    <div className="TwoInput">
                      <DateRangePickerDiv
                        className="each-div item-edit"
                        style={{ width: "100%" }}
                      >
                        <AsyncLabel htmlFor="async-select-example">
                          Date Range
                        </AsyncLabel>
                        <Field name="date_range">
                          {({ form, meta }: any) => (
                            <>
                              <DatePicker
                                name="date_range"
                                selectsRange
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(update: any) =>
                                  onDateRangeChange(update, form)
                                }
                                placeholderText="Start & End Date"
                                className="date-range-input"
                                minDate={minDate}
                              />
                              <small className="validation-error date-range-validation-error">
                                {meta.touched && meta.error ? meta.error : ""}
                              </small>
                            </>
                          )}
                        </Field>
                      </DateRangePickerDiv>
                      <IconFieldWrapper className="icon_input">
                        {/* <AsyncLabel htmlFor="async-select-example">
                                Buy Side Discount
                                <span
                                  className="mandatory-star"
                                  style={{
                                    color: 'red',
                                    paddingLeft: '4px',
                                  }}
                                >
                                  *
                                </span>
                              </AsyncLabel>
                              <Field label="After input" name="buy_side_discount">
                                {({ fieldProps, form, meta }: any) => (
                                  <Fragment>
                                    <Textfield
                                      {...fieldProps}
                                      name="buy_side_discount"
                                      value={formik.values.buy_side_discount}
                                      elemAfterInput={
                                        <div style={{ marginRight: '10px', color: '#6d7992' }}>
                                          %
                                        </div>
                                      }
                                      onChange={(e: any) =>
                                        onValueChange(e, form, 'buy_side_discount')
                                      }
                                      className="icon-field"
                                      placeholder='Buy Side Discount'
                                    />
                                    <small className="validation-error">
                                      {meta.touched && meta.error
                                        ? meta.error
                                        : ''}
                                    </small>
                                  </Fragment>
                                )}
                              </Field> */}

                        <PiIconInputForm
                          name="buy_side_discount"
                          label="Purchase Discount"
                          placeholder="Purchase Discount"
                          maxLength={15}
                          type="string"
                          elemBeforeInput={
                            <div
                              style={{
                                padding: "10px",
                                color: "#6D7992",
                                borderRight: "1px solid #d0d1d3",
                              }}
                            >
                              %
                            </div>
                          }
                        />
                      </IconFieldWrapper>
                    </div>
                    <div className="TwoInput">
                      <div className="icon_input">
                        <PiIconInputForm
                          name="buy_price"
                          label="Buy Price"
                          placeholder="Buy Price"
                          maxLength={15}
                          type="string"
                          elemBeforeInput={
                            <div
                              style={{
                                padding: "10px",
                                color: "#6D7992",
                                borderRight: "1px solid #d0d1d3",
                              }}
                            >
                              $
                            </div>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </FilterFormFields>
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
                  label="Update"
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

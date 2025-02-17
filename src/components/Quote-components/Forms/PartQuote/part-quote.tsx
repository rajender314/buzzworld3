import {
  PiSideDrawer,
  PiTypography,
  PiSpinner,
  PiButton,
  PiInputForm,
  PiSelectForm,
  PiToast,
} from "pixel-kit";
import { useCallback, useEffect, useRef, useState } from "react";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import {
  ImgTag,
  SpinnerDiv,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import {
  AsyncSelectDiv,
  SideDrawerFooter,
} from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import {
  AsyncLabel,
  CmpanyOptionDiv,
  RmaFields,
} from "@app/components/rmaModel/RmaModel.component";
import CrossLogo from "@app/assets/images/cross.svg";
import { Formik, Field } from "formik";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse, FilterColumnProps } from "@app/services/schema/schema";
import { AsyncCreatableSelect } from "@atlaskit/select";
import moment from "moment";
import QuotesImg from "@app/assets/images/quotes.svg";
import { LinkWithIcon } from "@app/components/secondaryheader/secondaryheader.component";
import AddLogo from "@app/assets/images/Plus.svg";
import AddNewComapny from "@app/components/Quote-components/Forms/PartQuote/quote-add-new-company";
import { PartQuoteValidationSchema } from "@app/components/Quote-components/Forms/PartQuote/part-quote-validation";
import { QuotePopupHeaderContainer, Width100 } from "./part-quote.component";

export default function PartQuote({ sendModelData }: any) {
  const [openModel, setOpenModel] = useState(false);
  const [serverMsg, setServerMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opacity, setOpacity] = useState(false);
  const initialValues = {
    customer_id: "",
    start_date: moment(new Date()).format("YYYY-MM-DD"),
    project_name: "",
    quote_type: "",
  };
  const formik = useRef<any>(null);
  const { current }: any = useRef({ timer: 0 });
  const [permissionObj, setpermissionObj]: any = useState({});
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [quoteTypes, setQuoteTypes] = useState([]);
  const [openSnackbar, setSnackbar] = useState(false);
  const [toastMsg, setToastMsg] = useState("Updated Successfully");
  function handleRef(e: any) {
    formik.current = e;
  }
  const userPermissions = useCallback(async () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.userPermissions}`,
      headers: {},
    };
    await triggerApi(apiObject).then((response: ApiResponse) => {
      const obj = response.result.data;
      setpermissionObj({ ...obj });
      if (obj.user_type === "2") {
        if (formik) {
          formik.current.setFieldValue(
            "customer_id",
            obj.user_organization_info
          );
        }
      }
    });
    return true;
  }, []);
  const getQuoteTypes = useCallback(() => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteQuoteTypes}?is_dropdown=true&status[0]=true&sort=asc`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          let arr = [];
          arr = data.map((item: FilterColumnProps) => ({
            value: item.id,
            label: item.name,
            ...item,
          }));
          setQuoteTypes(arr);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    (async () => {
      setLoading(false);
      setOpenModel(true);
      getQuoteTypes();
      await userPermissions();
    })();
  }, [userPermissions, getQuoteTypes]);
  function closeModel() {
    setOpenModel(false);
    sendModelData({ success: false });
  }

  function handleSubmit(data: any) {
    console.log(data);
    setOpacity(true);
    setIsBtnLoading(true);
    const params = {
      // ...data,
      start_date: moment(data.start_date).format("YYYY-MM-DD"),
      customer_id: data.customer_id.value,
      project_name: data.project_name,
      quote_type: data.quote_type,
    };
    const apiObject = {
      payload: params,
      method: "POST",
      apiUrl: `${EndpointUrl.Quote}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setServerMsg(null);
          sendModelData({
            success: true,
            id: response.result.data,
            module: "quotes",
          });
          setOpacity(false);
        } else {
          setServerMsg(response.result.data);
          setOpacity(false);
          setLoading(false);
          setIsBtnLoading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  const filterVendorData = async (inputValue: string) => {
    let data: any = [];
    if (inputValue.length >= 3) {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.QuoteCustomerDropdown}?search=${inputValue}`,
        headers: {},
      };
      await triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            let arr = [];
            const list = response.result.data.list
              ? response.result.data.list
              : response.result.data;
            arr = list.map((item: FilterColumnProps) => ({
              value: item.id,
              label: (
                <CmpanyOptionDiv>
                  <div>
                    <div className="cmpny_name">{item.name}</div>
                    <div className="account_no">
                      {item.account_number ? item.account_number : "--"}
                    </div>
                  </div>
                  <div className="cmpny_address">{item.address1}</div>
                </CmpanyOptionDiv>
              ),
              ...item,
            }));
            data = arr;
          }
        })
        .catch(() => {});
      return data;
    }
    return data;
  };
  const promiseOptions = (inputValue: string) =>
    new Promise((resolve) => {
      if (inputValue.length >= 3) {
        if (current.timer) clearTimeout(current.timer);
        current.timer = setTimeout(() => {
          resolve(filterVendorData(inputValue));
        }, 1000);
      }
    });
  const handleInputChange = (newValue: string) => {
    if (newValue.length >= 3) {
      return newValue;
    }
    return newValue;
  };
  const [openAddNewCmpny, setAddNewCmpny] = useState(false);
  const [searchedCmpny, setSearchedCmpny] = useState();
  const HandleChange = (form: any, fieldLabel: any, value: any) => {
    // eslint-disable-next-line no-underscore-dangle
    if (value && value.__isNew__) {
      setSearchedCmpny(value);
      setAddNewCmpny(true);
    } else if (value) {
      const obj: any = { value: value.value, label: value.name };
      form.setFieldValue(fieldLabel, obj);
      // setCustomerName(obj)
    } else {
      form.setFieldValue(fieldLabel, value);
    }
  };
  const triggerModelEvent = (e: any) => {
    if (e.close) {
      setAddNewCmpny(false);
    }
    if (e.success) {
      setToastMsg("Account Created Successfully");
      setSnackbar(true);
      formik.current.setFieldValue("customer_id", e.data);
      setAddNewCmpny(false);
    }
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  function FormatCreateLabel() {
    return (
      <div className="Button-Icon-Display">
        <LinkWithIcon className="Icon-space primary-button in-dropdown">
          <ImgTag src={AddLogo} alt="loading" className="add-icon" />
          <span className="button-icon-text">Create Account</span>
        </LinkWithIcon>
      </div>
    );
  }
  return (
    <PiSideDrawer isOpen={openModel} width="narrow">
      <SideDrawerContainer>
        <SideDrawerHeader>
          <QuotePopupHeaderContainer>
            <img src={QuotesImg} alt="loading" />
            <PiTypography component="h3">Create Quote</PiTypography>
          </QuotePopupHeaderContainer>
          <CloseButton
            onClick={() => closeModel()}
            title="close"
            className="Hover"
          >
            <img src={CrossLogo} alt="loading" />
          </CloseButton>
        </SideDrawerHeader>
        {loading && (
          <SpinnerDiv style={{ height: "100%" }}>
            <PiSpinner color="primary" size={50} libraryType="atalskit" />
          </SpinnerDiv>
        )}
        {!loading && (
          <Formik
            validationSchema={PartQuoteValidationSchema}
            onSubmit={(e: any) => handleSubmit(e)}
            initialValues={initialValues}
            innerRef={(e: any) => handleRef(e)}
          >
            {({ ...formikProps }: any) => (
              <>
                <FormBodyOverFlow className={opacity ? "opacity-on-load" : ""}>
                  {opacity && (
                    <SpinnerDiv
                      style={{
                        position: "absolute",
                        left: "50%",
                        zIndex: "1",
                      }}
                      className="zindex"
                    >
                      <PiSpinner
                        color="primary"
                        size={50}
                        libraryType="atalskit"
                      />
                    </SpinnerDiv>
                  )}
                  <RmaFields>
                    <Width100 className="d-flex-row-gap width-100">
                      <Field name="customer_id">
                        {({ field, form, meta }: any) => (
                          <AsyncSelectDiv>
                            <AsyncLabel
                              htmlFor="async-select-example"
                              className="css-re7y6x"
                            >
                              Company Name
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
                            <AsyncCreatableSelect
                              name="customer_id"
                              inputId="async-select-example"
                              classNamePrefix="react-select"
                              onInputChange={handleInputChange}
                              loadOptions={promiseOptions}
                              placeholder="Search By Account ID or Company Name"
                              onChange={(value) => {
                                HandleChange(form, "customer_id", value);
                              }}
                              value={field.value}
                              isClearable
                              noOptionsMessage={(obj: any) =>
                                !obj.inputValue
                                  ? "Search Company Name"
                                  : " Company Name Not Found"
                              }
                              isDisabled={permissionObj.user_type === "2"}
                              // allowCreateWhileLoading
                              formatCreateLabel={() => FormatCreateLabel()}
                            />
                            <small className="validation-error">
                              {meta.touched && meta.error ? meta.error : ""}
                            </small>
                          </AsyncSelectDiv>
                        )}
                      </Field>
                      <div>
                        <PiInputForm
                          name="project_name"
                          label="Project Name"
                          libraryType="atalskit"
                          type="text"
                          placeholder="Enter Project Name"
                        />
                      </div>
                      <div>
                        <PiSelectForm
                          name="quote_type"
                          label="Quote Type"
                          placeholder="Quote Type"
                          isMulti={false}
                          options={quoteTypes}
                          classNamePrefix="react-select"
                          isMandatory
                        />
                      </div>
                      {/* <DateRangePickerDiv
                            style={{ width: "100%" }}
                            className="dt-pkr-bg-unset"
                          >
                            <AsyncLabel htmlFor="async-select-example">
                              Quote Start Date
                            </AsyncLabel>
                            <PiDatepickerForm
                              helpText=""
                              libraryType="atalskit"
                              name="start_date"
                              minDate={TodayDate}
                              placeholder="MM/DD/YYYY"
                            />
                          </DateRangePickerDiv> */}
                    </Width100>
                  </RmaFields>
                </FormBodyOverFlow>
                <SideDrawerFooter>
                  {serverMsg && <div className="server-msg">{serverMsg}</div>}
                  <PiButton
                    appearance="primary"
                    label="Create Quote"
                    onClick={formikProps.handleSubmit}
                    isDisabled={!!(opacity || isBtnLoading)}
                  />
                </SideDrawerFooter>
              </>
            )}
          </Formik>
        )}
      </SideDrawerContainer>
      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel={toastMsg}
        message=""
        onClose={async () => setSnackbar(false)}
      />
      {openAddNewCmpny && (
        <AddNewComapny
          searchedCmpny={searchedCmpny}
          sendModelEvent={triggerModelEvent}
        />
      )}
    </PiSideDrawer>
  );
}

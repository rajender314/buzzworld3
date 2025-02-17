import {
  PiButton,
  PiInputForm,
  PiModal,
  PiModalBody,
  PiModalFooter,
  PiModalHeader,
  PiSelectForm,
  PiSpinner,
  PiTypography,
} from "pixel-kit";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  CloseButton,
  Popup,
} from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
  SpinnerDiv,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import CrossLogo from "@app/assets/images/cross.svg";
import { Formik, Field } from "formik";
import { AsyncSelect } from "@atlaskit/select";
import { AsyncSelectDiv } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import {
  AsyncLabel,
  CmpanyOptionDiv,
} from "@app/components/rmaModel/RmaModel.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse, FilterColumnProps } from "@app/services/schema/schema";
import { InputFields } from "@app/components/discountAddRowModel/discountAddRowModel.component";
import { FilterFormFields } from "@app/components/multiEditModel/multiEditModel.component";
import _ from "lodash";
import { AddCompanyValidationSchema } from "./part-quote-validation";
// import AddCompanyValidationSchema from "@app/components/Quote-components/Forms/PartQuote/part-quote-validation";

export default function AddNewComapny({ searchedCmpny, sendModelEvent }: any) {
  const [openModel, setOpenModel] = useState(false);
  const [loading, setloading] = useState(true);
  const [serverMsg, setServerMsg] = useState(null);
  const formik = useRef<any>(null);
  const initialValues = {
    customer_id: searchedCmpny ? searchedCmpny.label : "",
    owner: "",
    account_type: "",
    website: "",
    territory: "",
    state: "",
    phone: "",
    city: "",
    zipcode: "",
    street_1: "",
    street_2: "",
    street_3: "",
  };
  const { current }: any = useRef({ timer: 0 });
  const [opacity, setOpacity] = useState<boolean>(false);
  const [accountTypes, setAccountTypes]: any = useState([]);
  const getAccountTypes = () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.accountTypes}?sort=asc&status[0]=true`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const data = response.result.data.list;
          let arr = [];
          arr = data.map((item: FilterColumnProps) => ({
            value: item.dynamics_code,
            label: item.name,
            ...item,
          }));
          setAccountTypes(arr);
        }
      })
      .catch(() => {});
  };
  const [stateOptions, setStateptions] = useState<any>([]);
  function getStates() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.GetStates}?country_id=${"255"}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success) {
          setStateptions(
            response.result.data.list.map((item: any) => ({
              value: item.iso_code,
              label: item.name,
              ...item,
            }))
          );
        }
      })
      .catch(() => {});
  }
  useEffect(() => {
    setOpenModel(true);
    getAccountTypes();
    getStates();
    setloading(false);
  }, []);
  function closeModel() {
    setOpenModel(false);
    sendModelEvent({ close: true });
  }

  function handleSubmit(data: any) {
    // console.log(formik.current)
    setOpacity(true);
    const indx = _.findIndex(accountTypes, { id: data.account_type.id });
    if (indx > -1) {
      data.account_type = {
        label: accountTypes[indx].label,
        value: accountTypes[indx].dynamics_code,
        id: accountTypes[indx].id,
      };
    }

    data.state = {
      label: data.state.label,
      value: data.state.value,
      id: data.state.id,
    };
    const apiObject = {
      payload: data,
      method: "POST",
      apiUrl: `${EndpointUrl.organisationList}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success) {
          const list = response.result.data;
          setServerMsg(null);
          sendModelEvent({ success: true, data: list });
          setOpenModel(false);
        } else {
          setServerMsg(response.result.data);
        }
        setOpacity(false);
      })
      .catch(() => {});
  }

  function handleRef(e: any) {
    formik.current = e;
  }
  const filterVendorData = async (inputValue: string, flag: string) => {
    let data: any = [];
    if (inputValue.length >= 3) {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl:
          flag === "customers"
            ? `${EndpointUrl.QuoteCustomerDropdown}?search=${inputValue}`
            : `${EndpointUrl.zipcodesList}?search=${inputValue}`,
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
              label:
                flag === "customers" ? (
                  <CmpanyOptionDiv>
                    <div>
                      <div className="cmpny_name">{item.name}</div>
                      <div className="account_no">
                        {item.account_number ? item.account_number : "--"}
                      </div>
                    </div>
                    <div className="cmpny_address">{item.address1}</div>
                  </CmpanyOptionDiv>
                ) : (
                  item.zipcode
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
  const promiseOptions = (inputValue: string, flag: string) =>
    new Promise((resolve) => {
      if (inputValue.length >= 3) {
        if (current.timer) clearTimeout(current.timer);
        current.timer = setTimeout(() => {
          resolve(filterVendorData(inputValue, flag));
        }, 1000);
      }
    });
  const handleInputChange = (newValue: string) => {
    if (newValue.length >= 3) {
      return newValue;
    }
    return newValue;
  };

  const HandleZipChange = (form: any, fieldLabel: any, value: any) => {
    if (value) {
      const obj: any = { value: value.value, label: value.zipcode };
      form.setFieldValue(fieldLabel, obj);
      // setCustomerName(obj)
    } else {
      form.setFieldValue(fieldLabel, value);
    }
  };

  return (
    <Popup>
      <PiModal isOpen={openModel} width={800}>
        <PopupHeaderContentDiv>
          <PiModalHeader>
            <PopupHeaderDiv>
              <PiTypography component="h3">Create Account</PiTypography>

              <CloseButton
                onClick={() => closeModel()}
                title="close"
                className={
                  opacity ? "pointer-none opacity-on-load Hover" : "Hover"
                }
              >
                <img src={CrossLogo} alt="loading" />
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
            validationSchema={AddCompanyValidationSchema}
            onSubmit={(e: any) => handleSubmit(e)}
            initialValues={initialValues}
            innerRef={(e: any) => handleRef(e)}
          >
            {({ ...formikProps }: any) => (
              <>
                <PiModalBody>
                  <div>
                    <FilterFormFields
                      style={{ position: "relative" }}
                      className={opacity ? "opacity-on-load " : ""}
                    >
                      {opacity && (
                        <SpinnerDiv
                          style={{
                            position: "absolute",
                            zIndex: "1",
                            left: "50%",
                            top: "0",
                          }}
                        >
                          <PiSpinner
                            color="primary"
                            size={50}
                            libraryType="atalskit"
                          />
                        </SpinnerDiv>
                      )}
                      <InputFields className="add-compny-fields">
                        <PiInputForm
                          name="customer_id"
                          label="Account Name"
                          libraryType="atalskit"
                          type="text"
                          placeholder="Enter Account Name"
                          className="field"
                          isMandatory
                          isDisabled={opacity}
                        />

                        <PiInputForm
                          name="phone"
                          label="Phone Number"
                          libraryType="atalskit"
                          type="phone_number"
                          placeholder="Enter Phone Number"
                          className="field"
                          isMandatory
                          isDisabled={opacity}
                        />
                        <PiSelectForm
                          name="account_type"
                          label="Account Type"
                          libraryType="atalskit"
                          placeholder="Select"
                          classNamePrefix="react-select"
                          options={accountTypes}
                          isDisabled={opacity}
                          isMandatory
                        />
                        <PiInputForm
                          name="website"
                          label="Website"
                          libraryType="atalskit"
                          type="text"
                          placeholder="Enter Website"
                          className="field"
                          isDisabled={opacity}
                        />
                      </InputFields>
                      <p className="address-heading">Address</p>
                      <div style={{ minHeight: "250px" }}>
                        <InputFields className="add-compny-fields">
                          <PiInputForm
                            name="street_1"
                            label="Street 1"
                            libraryType="atalskit"
                            type="text"
                            placeholder="Enter Street 1"
                            className="field"
                            isMandatory
                            isDisabled={opacity}
                          />
                          <PiInputForm
                            name="street_2"
                            label="Street 2"
                            libraryType="atalskit"
                            type="text"
                            placeholder="Enter Street 2"
                            className="field"
                            isDisabled={opacity}
                          />
                          <PiInputForm
                            name="street_3"
                            label="Street 3"
                            libraryType="atalskit"
                            type="text"
                            placeholder="Enter Street 3"
                            className="field"
                            isDisabled={opacity}
                          />
                          <div>
                            <PiInputForm
                              name="city"
                              label="City"
                              libraryType="atalskit"
                              type="text"
                              placeholder="Enter City"
                              className="field"
                              isDisabled={opacity}
                              isMandatory
                            />
                          </div>
                          <PiSelectForm
                            name="state"
                            label="State"
                            libraryType="atalskit"
                            placeholder="Select"
                            classNamePrefix="react-select"
                            options={stateOptions}
                            isDisabled={opacity}
                            isMandatory
                          />

                          {/* <PiInputForm
                            name="zipcode"
                            label="ZIP"
                            libraryType="atalskit"
                            type="number"
                            placeholder="Enter ZIP"
                            className="field"
                            isMandatory
                          /> */}
                          <Field name="zipcode">
                            {({ field, form, meta }: any) => (
                              <AsyncSelectDiv className="quote-add-company">
                                <AsyncLabel
                                  htmlFor="async-select-example"
                                  className="label"
                                >
                                  ZIP Code
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
                                <AsyncSelect
                                  name="zipcode"
                                  inputId="async-select-example"
                                  classNamePrefix="react-select"
                                  onInputChange={handleInputChange}
                                  loadOptions={(e: string) =>
                                    promiseOptions(e, "zipcode")
                                  }
                                  placeholder="Search By ZIP Code"
                                  onChange={(value) => {
                                    HandleZipChange(form, "zipcode", value);
                                  }}
                                  value={field.value}
                                  isClearable
                                  noOptionsMessage={(obj: any) =>
                                    !obj.inputValue
                                      ? "Search ZIP Code"
                                      : " ZIP Code Not Found"
                                  }
                                  isDisabled={opacity}
                                />
                                <small className="validation-error">
                                  {meta.touched && meta.error ? meta.error : ""}
                                </small>
                              </AsyncSelectDiv>
                            )}
                          </Field>
                        </InputFields>
                      </div>
                    </FilterFormFields>
                  </div>
                </PiModalBody>

                <PiModalFooter>
                  {serverMsg && <div className="server-msg">{serverMsg}</div>}
                  <PiButton
                    appearance="primary"
                    label="Create"
                    onClick={formikProps.handleSubmit}
                    className="Primary"
                    isDisabled={opacity}
                  />
                </PiModalFooter>
              </>
            )}
          </Formik>
        )}
      </PiModal>
    </Popup>
  );
}

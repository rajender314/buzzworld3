import {
  PiModal,
  PiModalHeader,
  PiTypography,
  PiSpinner,
  PiModalBody,
  PiInputForm,
  PiModalFooter,
  PiButton,
  PiCheckbox,
} from "pixel-kit";
import { useEffect, useRef, useState } from "react";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import { InputFields } from "@app/components/discountAddRowModel/discountAddRowModel.component";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
  SpinnerDiv,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import { FilterFormFields } from "@app/components/multiEditModel/multiEditModel.component";
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
import { OptionsContainer } from "@app/components/popups/client-approval-form/client-approval-form.component";
import _ from "lodash";
import { QuoteAddContactSchema } from "@app/components/Quote-components/Forms/PartQuote/part-quote-validation";
import { getContactTypes } from "../../quotes-helper";

export default function QuotesAddContact({
  searchedName,
  quoteDetails,
  sendModelEvent,
}: any) {
  const [openModel, setOpenModel] = useState(false);
  const [loading, setloading] = useState(true);
  const [serverMsg, setServerMsg] = useState(null);
  const formik = useRef<any>(null);
  const initialValues = {
    customer_id: quoteDetails
      ? { label: quoteDetails.customer_name, value: quoteDetails.customer_id }
      : "",
    email: "",
    first_name: searchedName || "",
    last_name: "",
    phone: "",
    title: "",
    pricing_rules: [
      {
        supplier: "",
      },
    ],
  };
  const { current }: any = useRef({ timer: 0 });
  const [opacity, setOpacity] = useState<boolean>(false);
  const [contactTypes, setContactTypes] = useState([]);
  const [selectedIds, setSelectedIds]: any = useState([]);

  useEffect(() => {
    (async () => {
      setOpenModel(true);
      const data: any = await getContactTypes();
      console.log(data);
      setContactTypes(data);
      setloading(false);
    })();
  }, []);
  function closeModel() {
    setOpenModel(false);
    sendModelEvent({ close: true });
  }

  function handleSubmit(data: any) {
    setOpacity(true);
    const params = {
      ...data,
      option_ids: selectedIds,
    };
    delete params.pricing_rules;
    // return
    const apiObject = {
      payload: params,
      method: "POST",
      apiUrl: `${EndpointUrl.contactList}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success) {
          const data2 = response.result.data;
          setServerMsg(null);
          sendModelEvent({ success: true, data: data2 });
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

  const onNcrChanged = (e: any, option: any, indx: number) => {
    if (e.target.checked) {
      selectedIds.push(option.id);
    } else {
      const indx2 = _.findIndex(selectedIds, { id: option.id });
      selectedIds.splice(indx2, 1);
    }
    setSelectedIds(selectedIds);
    formik.current.setFieldValue(
      `pricing_rules.${indx}.supplier`,
      e.target.checked
    );
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
  const HandleChange = (form: any, fieldLabel: any, value: any) => {
    // eslint-disable-next-line no-underscore-dangle
    if (!value.__isNew__) {
      if (value) {
        const obj: any = { value: value.value, label: value.name };
        form.setFieldValue(fieldLabel, obj);
        // setCustomerName(obj)
      } else {
        form.setFieldValue(fieldLabel, value);
      }
    }
  };
  return (
    <PiModal isOpen={openModel} width={600}>
      <PopupHeaderContentDiv>
        <PiModalHeader>
          <PopupHeaderDiv>
            <PiTypography component="h3">Create Contact</PiTypography>

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
          validationSchema={QuoteAddContactSchema}
          onSubmit={(e: any) => handleSubmit(e)}
          initialValues={initialValues}
          innerRef={(e: any) => handleRef(e)}
        >
          {({ ...formikProps }: any) => (
            <>
              <PiModalBody>
                <div
                  style={{ position: "relative" }}
                  className={opacity ? "opacity-on-load " : ""}
                >
                  {opacity && (
                    <SpinnerDiv
                      style={{
                        position: "absolute",
                        zIndex: "1",
                        left: "45%",
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
                  <FilterFormFields>
                    <InputFields>
                      <Field name="customer_id">
                        {({ field, form, meta }: any) => (
                          <AsyncSelectDiv className="quote-add-company">
                            <AsyncLabel
                              htmlFor="async-select-example"
                              className="label"
                            >
                              Account Name
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
                              name="customer_id"
                              inputId="async-select-example"
                              classNamePrefix="react-select"
                              onInputChange={handleInputChange}
                              loadOptions={promiseOptions}
                              placeholder="Search By Account Name"
                              onChange={(value) => {
                                HandleChange(form, "customer_id", value);
                              }}
                              value={field.value}
                              isClearable
                              noOptionsMessage={(obj: any) =>
                                !obj.inputValue
                                  ? "Search Account Name"
                                  : " Account Name Not Found"
                              }
                              isDisabled
                            />
                            <small className="validation-error">
                              {meta.touched && meta.error ? meta.error : ""}
                            </small>
                          </AsyncSelectDiv>
                        )}
                      </Field>
                      <PiInputForm
                        name="first_name"
                        label="First Name"
                        libraryType="atalskit"
                        type="text"
                        placeholder="Enter First Name"
                        className="field"
                        isDisabled={opacity}
                        isMandatory
                      />
                      <PiInputForm
                        name="last_name"
                        label="Last Name"
                        libraryType="atalskit"
                        type="text"
                        placeholder="Enter Last Name"
                        className="field"
                        isDisabled={opacity}
                        isMandatory
                      />
                      <PiInputForm
                        name="email"
                        label="Email ID"
                        libraryType="atalskit"
                        type="text"
                        placeholder="Enter Email ID"
                        className="field"
                        isDisabled={opacity}
                        isMandatory
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
                      <PiInputForm
                        name="title"
                        label="Title"
                        libraryType="atalskit"
                        type="text"
                        placeholder="Enter Title"
                        className="field"
                        isDisabled={opacity}
                        maxLength={40}
                      />
                    </InputFields>
                  </FilterFormFields>
                  {contactTypes && contactTypes.length > 0 && (
                    <>
                      <p className="address-heading">Contact Types</p>
                      <OptionsContainer>
                        {contactTypes.length > 0 &&
                          contactTypes.map((option: any, index: number) => (
                            <div className="padding checkbox-form-field">
                              <Field name={`pricing_rules.${index}.supplier`}>
                                {({ field }: any) => (
                                  <PiCheckbox
                                    helpText=""
                                    isChecked={field.value}
                                    label={`${option.name}`}
                                    libraryType="atalskit"
                                    name="supplier"
                                    // value={field.value}
                                    onChange={(e: any) => {
                                      onNcrChanged(e, option, index);
                                    }}
                                    size="medium"
                                  />
                                )}
                              </Field>
                            </div>
                          ))}
                      </OptionsContainer>
                    </>
                  )}
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
  );
}

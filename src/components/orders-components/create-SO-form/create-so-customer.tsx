import { AsyncSelect } from "@atlaskit/select";
import {
  PiButton,
  PiModal,
  PiModalBody,
  PiModalFooter,
  PiSelectForm,
  PiSpinner,
  PiTypography,
} from "pixel-kit";
import { useRef, useState } from "react";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
  SpinnerDiv,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import {
  AsyncLabel,
  CmpanyOptionDiv,
} from "@app/components/rmaModel/RmaModel.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse, FilterColumnProps } from "@app/services/schema/schema";
import {
  CloseButton,
  FilterFormFields,
  Popup,
} from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import CrossLogo from "@app/assets/images/cross.svg";
import { AsyncSelectDiv } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import { Formik, Field } from "formik";
import { UsersFormFields } from "@app/components/popups/add-user/add-users-components";
import { TechNotesHeader } from "@app/components/RepairItems/item-internal-notes.component";
import { CreateSOCustomerSchema } from "./create-so-form.validation";

export default function CreateSOCustomer({ sendData }: any) {
  const [opacity, setOpacity] = useState(false);
  const [serverMsg, setServerMsg] = useState<string>();
  const { current }: any = useRef({ timer: 0 });
  const [openModel, setOpenModel] = useState(true);
  const filterVendorData = async (inputValue: string) => {
    let options: any = [];
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
            const list = response.result.data
              ? response.result.data
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
            options = arr;
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
      return options;
    }
    return options;
  };
  const formik = useRef<any>(null);
  function handleRef(e: any) {
    formik.current = e;
  }
  const initialValues = {
    supplier: "",
    contact: "",
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
  const [customerByOrg, setCustomerByOrg]: any = useState([]);
  function getCustomerListByOrg(id: string) {
    setOpacity(true);
    let options: any = [];
    setCustomerByOrg([]);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.customerDropdown}?organization[0]=${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success) {
          setOpacity(false);

          let arr = [];
          const list = response.result.data.contacts;
          arr = list.map((item: FilterColumnProps) => ({
            value: item.id,
            label: item.name,
            ...item,
          }));
          options = arr;
          setCustomerByOrg([...options]);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  const HandleChange = (fieldLabel: any, value: any) => {
    if (value) {
      setOpacity(true);
      const obj: any = {
        value: value.value,
        label: value.name,
        account_number: value.account_number,
      };
      setServerMsg("");
      formik.current.setFieldValue(fieldLabel, obj);
      getCustomerListByOrg(value.value);
    } else {
      formik.current.setFieldValue(fieldLabel, "");
    }
  };

  function closeModel() {
    sendData({
      close: true,
    });
    setOpenModel(false);
  }

  function handleSubmit(data: any) {
    sendData({
      success: true,
      data: { selectedContact: data.contact, customerName: data.supplier },
    });
    setOpenModel(false);
  }
  return (
    // <Popup>
    //  <PiModal isOpen={openModel} width={450}>
    //    <div style={{ position: 'relative' }}>
    //      <PopupHeaderContentDiv>
    //        <TechNotesHeader>
    //          <PopupHeaderDiv className="show">
    //            <PiTypography component="h4">{'Select Customer'}</PiTypography>
    //            <CloseButton
    //              onClick={() => closeModel()}
    //              title="close"
    //              className="Hover"
    //            >
    //              <img src={CrossLogo} alt="loading" />
    //            </CloseButton>
    //          </PopupHeaderDiv>
    //        </TechNotesHeader>
    //        <hr />
    //      </PopupHeaderContentDiv>

    //      <div>
    //        <PiModalBody>
    //          {opacity && (
    //            <SpinnerDiv
    //              style={{ position: 'absolute', left: '45%', top: '0' }}
    //            >
    //              <PiSpinner color="primary" size={50} libraryType="atalskit" />
    //            </SpinnerDiv>
    //          )}
    //          <FilterFormFields
    //            className={opacity ? 'opacity-on-load' : ''}
    //            style={{ minHeight: '250px' }}
    //          >
    //            <AsyncSelectDiv>
    //              <AsyncLabel
    //                htmlFor="async-select-example"
    //                className="css-re7y6x"
    //              >
    //                Customer (Syspro ID)
    //                <span
    //                  className="mandatory-star"
    //                  style={{
    //                    color: 'red',
    //                    paddingLeft: '4px',
    //                  }}
    //                >
    //                  *
    //                </span>
    //              </AsyncLabel>
    //              <AsyncSelect
    //                name={`supplier`}
    //                inputId="async-select-example"
    //                classNamePrefix="react-select"
    //                onInputChange={handleInputChange}
    //                loadOptions={promiseOptions}
    //                placeholder="Search By Account ID or Company Name"
    //                onChange={(value) => {
    //                  HandleChange(`supplier`, value)
    //                }}
    //                value={customerName}
    //                isClearable
    //                noOptionsMessage={(obj: any) => {
    //                  return !obj.inputValue
    //                    ? 'Search Customer Name'
    //                    : ' Customer Name Not Found'
    //                }}
    //                isDisabled={opacity}
    //              />
    //            </AsyncSelectDiv>
    //            <div style={{ marginTop: '10px' }}>
    //              <PiSelect
    //                name="priority"
    //                label="Quote Requested By"
    //                placeholder="Select"
    //                isMulti={false}
    //                options={customerByOrg}
    //                classNamePrefix="react-select"
    //                onChange={onChangeRequestedBy}
    //                isMandatory
    //                isDisabled={opacity}
    //              />
    //            </div>
    //          </FilterFormFields>
    //        </PiModalBody>
    //        <PiModalFooter>
    //          {serverMsg && <small className="server-msg">{serverMsg}</small>}
    //          <PiButton
    //            appearance="secondary"
    //            label={'Update'}
    //            onClick={updateData}
    //            className="Primary"
    //            isDisabled={opacity}
    //          />
    //        </PiModalFooter>
    //      </div>
    //    </div>
    //  </PiModal>
    // </Popup>

    <Popup>
      <PiModal isOpen={openModel} width={450} height={500}>
        <PopupHeaderContentDiv>
          <TechNotesHeader>
            <PopupHeaderDiv>
              <PiTypography component="h3">Select Customer</PiTypography>

              <CloseButton
                onClick={() => closeModel()}
                title="close"
                className="Hover"
              >
                <img src={CrossLogo} alt="loading" />
              </CloseButton>
            </PopupHeaderDiv>
          </TechNotesHeader>
          <hr />
        </PopupHeaderContentDiv>
        <Formik
          validationSchema={CreateSOCustomerSchema}
          onSubmit={(e: any) => handleSubmit(e)}
          initialValues={initialValues}
          innerRef={(e: any) => handleRef(e)}
        >
          {({ ...formikProps }: any) => (
            <>
              <PiModalBody>
                <UsersFormFields
                  className={opacity ? "admin-opacity-on-load " : ""}
                >
                  {opacity && (
                    <SpinnerDiv
                      style={{
                        position: "absolute",
                        zIndex: "1",
                      }}
                    >
                      <PiSpinner
                        color="primary"
                        size={50}
                        libraryType="atalskit"
                      />
                    </SpinnerDiv>
                  )}
                  <FilterFormFields className="piselect-form">
                    <Field name="supplier">
                      {({ field, meta }: any) => (
                        <AsyncSelectDiv>
                          <AsyncLabel
                            htmlFor="async-select-example"
                            className="css-re7y6x"
                          >
                            Customer (Syspro ID)
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
                            name="supplier"
                            inputId="async-select-example"
                            classNamePrefix="react-select"
                            onInputChange={handleInputChange}
                            loadOptions={promiseOptions}
                            placeholder="Search By Account ID or Company Name"
                            onChange={(value) => {
                              HandleChange("supplier", value);
                            }}
                            value={field.value}
                            isClearable
                            noOptionsMessage={(obj: any) =>
                              !obj.inputValue
                                ? "Search Customer Name"
                                : " Customer Name Not Found"
                            }
                            isDisabled={opacity}
                          />
                          <small className="validation-error date-range-validation-error">
                            {meta.touched && meta.error ? meta.error : ""}
                          </small>
                        </AsyncSelectDiv>
                      )}
                    </Field>
                    <div style={{ marginTop: "10px" }}>
                      <PiSelectForm
                        name="contact"
                        label="Quote Requested By"
                        placeholder="Select"
                        isMulti={false}
                        options={customerByOrg}
                        classNamePrefix="react-select"
                        isMandatory
                        isDisabled={opacity}
                      />
                    </div>
                  </FilterFormFields>
                </UsersFormFields>
              </PiModalBody>
              <PiModalFooter>
                {serverMsg && <div className="server-msg">{serverMsg}</div>}
                <PiButton
                  appearance="secondary"
                  label="Update"
                  onClick={formikProps.handleSubmit}
                  className="Primary"
                  isDisabled={opacity}
                />
              </PiModalFooter>
            </>
          )}
        </Formik>
      </PiModal>
    </Popup>
  );
}

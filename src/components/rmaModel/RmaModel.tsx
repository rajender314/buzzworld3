import {
  PiButton,
  PiInputForm,
  PiSelectForm,
  PiSideDrawer,
  PiSpinner,
  PiToast,
  PiTypography,
  PiCreateSelectForm,
} from "pixel-kit";
import { useCallback, useEffect, useRef, useState } from "react";
import { Formik, Field } from "formik";
import {
  AsyncLabel,
  CmpanyOptionDiv,
  RmaFields,
  SideDrawerW40,
} from "@app/components/rmaModel/RmaModel.component";
import { AsyncCreatableSelect } from "@atlaskit/select";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse, FilterColumnProps } from "@app/services/schema/schema";
import { getRepairPriorityApi } from "@app/helpers/helpers";
import RepairsImg from "@app/assets/images/repairs.svg";
import AddLogo from "@app/assets/images/Plus.svg";
import { CloseButton } from "../adminaddrowmodel/adminaddrowmodel.component";
import CrossLogo from "../../assets/images/cross.svg";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "../Repair-Components/selectItems/selectItemsModel/selectItem.component";
import { SideDrawerFooter } from "../Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import { FormBodyOverFlow } from "../Repair-Components/checksIns/assignLocation/assign-location.component";
import {
  ImgTag,
  SpinnerDiv,
} from "../fileuploadModel/fileuploadModel.component";
import { QuotePopupHeaderContainer } from "../Quote-components/Forms/PartQuote/part-quote.component";
import RmaValidationSchema from "./rma-validation.schema";
import { LinkWithIcon } from "../secondaryheader/secondaryheader.component";
import AddNewComapny from "../Quote-components/Forms/PartQuote/quote-add-new-company";
import QuotesAddContact from "../Quote-components/Quote-detail-view-content/QuoteInformation/quotes-add-contact";

type Props = {
  paramData: any;
  sendModelData: any;
};
export default function RmaModel({ paramData, sendModelData }: Props) {
  const [openModel, setOpenModel] = useState(false);
  const [serverMsg, setServerMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const { current }: any = useRef({ timer: 0 });
  const [initialValues, setInitialValues] = useState({
    customer_id: "",
    priority: "",
    contact_id: "",
    sales_person_name: "",
  });
  const formik = useRef<any>(null);
  const [permissionObj, setpermissionObj]: any = useState({});
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [repairPriorityLevel, setRepairPriorityLevel]: any = useState([]);
  const [openAddNewCmpny, setAddNewCmpny] = useState(false);
  const [searchedCmpny, setSearchedCmpny] = useState();
  const [toastMsg, setToastMsg] = useState("Updated Successfully");
  const [openSnackbar, setSnackbar] = useState(false);
  const [openAddContact, setOpenAddContact] = useState(false);
  const [searchedName, setSearchedName] = useState();

  const [opacity, setOpacity] = useState(false);
  const [selectedCustomer, setSelectedCustomer]: any = useState({});
  const [customerByOrg, setCustomerByOrg]: any = useState([]);
  const [salesPersonName, setSalesPersonName]: any = useState("");
  function getCustomerListByOrg(id: string) {
    setOpacity(true);
    setCustomerByOrg([]);
    setSalesPersonName("");
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
          setSalesPersonName(response.result.data.sales_person.name);
          formik.current.setFieldValue(
            "sales_person_name",
            response.result.data.sales_person.name
          );
          arr = list.map((item: FilterColumnProps) => ({
            value: item.id,
            label: item.name,
            ...item,
          }));
          setCustomerByOrg([...arr]);
          if (response.result.data.is_contact_prefill) {
            formik.current.setFieldValue(
              "contact_id",
              response.result.data.contact_data
            );
          } else {
            formik.current.setFieldValue("contact_id", "");
          }
        }
      })
      .catch(() => {});
  }
  const HandleChange = (value: any) => {
    // eslint-disable-next-line no-underscore-dangle
    if (value && value.__isNew__) {
      setSearchedCmpny(value);
      setAddNewCmpny(true);
    } else if (value) {
      initialValues.customer_id = value.value;
      const obj: any = {
        value: value.value,
        label: value.name ? value.name : value.label,
      };
      formik.current.setFieldValue("customer_id", obj);
      const obj2: any = {
        customer_name: value.name ? value.name : value.label,
        customer_id: value.value,
      };
      setSelectedCustomer(obj2);
      getCustomerListByOrg(value.value);
    } else {
      initialValues.customer_id = "";
      // initialValues['sales_person_name'] = ''
      initialValues.contact_id = "";
      setSalesPersonName("");
      setSelectedCustomer(null);
      setCustomerByOrg([]);
      formik.current.setFieldValue("customer_id", value);
      formik.current.setFieldValue("contact_id", "");
      formik.current.setFieldValue("sales_person_name", "");
    }
    setInitialValues(initialValues);
  };
  async function userPermissions() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.userPermissions}`,
      headers: {},
    };
    await triggerApi(apiObject).then((response: ApiResponse) => {
      const { data } = response.result;
      setpermissionObj(data);
      if (data.user_type === "2") {
        HandleChange(permissionObj.user_organization_info);
      }
    });
    return true;
  }
  useEffect(() => {
    (async () => {
      await userPermissions();
      const priorityList = await getRepairPriorityApi();
      setRepairPriorityLevel([...priorityList]);
      formik.current.setFieldValue("priority", priorityList[0]);
    })();
  }, []);
  const getDataById = useCallback(
    (id: string) => {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.rmaRequest}/${id}`,
        headers: {},
      };
      triggerApi(apiObject)
        .then((response: any) => {
          if (response.result.success) {
            const { data } = response.result;
            setSalesPersonName(data.owner_name);
            initialValues.priority = data.priority;
            initialValues.contact_id = data.contact_id;
            setInitialValues(initialValues);
            setLoading(false);
          }
        })
        .catch(() => {});
    },
    [initialValues]
  );
  useEffect(() => {
    if (paramData) {
      getDataById(paramData.id);
    } else {
      setLoading(false);
    }
    setOpenModel(true);
  }, [paramData, getDataById]);

  function closeModel() {
    setOpenModel(false);
    sendModelData({ success: false });
  }
  function handleSubmit(data: any) {
    setIsBtnLoading(true);
    setOpacity(true);
    const param = {
      ...data,
    };
    param.customer_id = data.customer_id.value;
    param.sales_person_name = salesPersonName;
    param.priority = data.priority.value;
    param.contact_id = data.contact_id.value;

    // if (!param['customer_id'] || !param['priority'] || !param['contact_id']) {
    //  return
    // }

    const apiObject = {
      payload: param,
      method: "POST",
      apiUrl: EndpointUrl.rmaRequest,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success) {
          setOpacity(false);
          setServerMsg(null);
          setOpenModel(false);
          setLoading(true);
          sendModelData({
            success: true,
            id: response.result.data,
            module: "repairs",
          });
        } else {
          setOpacity(false);
          setServerMsg(response.result.data);
          setIsBtnLoading(false);
          setLoading(false);
        }
      })
      .catch(() => {});
  }
  function handleRef(e: any) {
    formik.current = e;
  }
  const filterCustomerData = async (inputValue: string, flag: string) => {
    let data: any = [];
    // setstockCodeList([])
    if (inputValue.length >= 3) {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl:
          flag === "users"
            ? `${EndpointUrl.users}?search=${inputValue}&user_role=technician`
            : `${EndpointUrl.customerDropdown}?search=${inputValue}`,
        headers: {},
      };
      await triggerApi(apiObject)
        .then((response: any) => {
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
      if (current.timer) clearTimeout(current.timer);
      current.timer = setTimeout(() => {
        resolve(filterCustomerData(inputValue, "customers"));
      }, 1000);
    });
  const handleInputChange = (newValue: string) => newValue;

  function selectCustomer(e: any) {
    initialValues.contact_id = e.value;
    setInitialValues(initialValues);
  }

  const selectPriority = (e: any) => {
    initialValues.priority = e.value;
    setInitialValues(initialValues);
  };

  const triggerModelEvent = (e: any) => {
    if (e.close) {
      setAddNewCmpny(false);
    }
    if (e.success) {
      setToastMsg("Account Created Successfully");
      setSnackbar(true);
      formik.current.setFieldValue("customer_id", e.data);
      const obj2: any = {
        customer_name: e.data.name ? e.data.name : e.data.label,
        customer_id: e.data.value,
      };
      setSelectedCustomer(obj2);
      setAddNewCmpny(false);
    }
  };
  const triggerEvent = (e: any) => {
    if (e.close) {
      setOpenAddContact(false);
    }
    if (e.success) {
      setToastMsg("Contact Created Successfully");
      setSnackbar(true);
      formik.current.setFieldValue("contact_id", e.data);
      // getCustomerListByOrg(selectedCustomer.customer_id)
      setOpenAddContact(false);
    }
  };

  function formatCreateAccount() {
    return (
      <div className="Button-Icon-Display">
        <LinkWithIcon className="Icon-space primary-button in-dropdown">
          <ImgTag src={AddLogo} alt="loading" className="add-icon" />
          <span className="button-icon-text ">Create Account</span>
        </LinkWithIcon>
      </div>
    );
  }

  function formatCreateContact(ev: any) {
    setSearchedName(ev);
    return (
      <div
        className="Button-Icon-Display"
        onClick={() => setOpenAddContact(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            setOpenAddContact(true);
          }
        }}
        role="button"
        tabIndex={0}
      >
        <LinkWithIcon className="Icon-space primary-button in-dropdown">
          <ImgTag src={AddLogo} alt="loading" className="add-icon" />
          <span className="button-icon-text ">Create Contact</span>
        </LinkWithIcon>
      </div>
    );
  }
  return (
    <SideDrawerW40>
      <PiSideDrawer isOpen={openModel} width="narrow">
        <SideDrawerContainer>
          <SideDrawerHeader>
            <QuotePopupHeaderContainer>
              <img src={RepairsImg} alt="loading" />
              <PiTypography component="h3">
                {paramData ? "Update RMA" : "Create RMA"}
              </PiTypography>
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
              validationSchema={RmaValidationSchema}
              onSubmit={(e: any) => handleSubmit(e)}
              initialValues={initialValues}
              innerRef={(e: any) => handleRef(e)}
            >
              {({ ...formikProps }: any) => (
                <>
                  <FormBodyOverFlow
                    className={opacity ? "opacity-on-load" : ""}
                  >
                    {opacity && (
                      <SpinnerDiv style={{ position: "absolute", left: "50%" }}>
                        <PiSpinner
                          color="primary"
                          size={50}
                          libraryType="atalskit"
                        />
                      </SpinnerDiv>
                    )}
                    <RmaFields>
                      <div className="width-100">
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
                        <Field name="customer_id">
                          {({ field, meta }: any) => (
                            <>
                              <AsyncCreatableSelect
                                name="customer_id"
                                inputId="async-select-example"
                                classNamePrefix="react-select"
                                onInputChange={handleInputChange}
                                loadOptions={promiseOptions}
                                placeholder="Search By Company Name"
                                onChange={(value) => {
                                  HandleChange(value);
                                }}
                                isClearable
                                isDisabled={permissionObj.user_type === "2"}
                                value={field.value}
                                noOptionsMessage={(obj: any) =>
                                  !obj.inputValue
                                    ? "Search Company Name"
                                    : " Company Name Not Found"
                                }
                                // isMulti
                                formatCreateLabel={() => formatCreateAccount()}
                              />
                              <small className="validation-error">
                                {meta.touched && meta.error ? meta.error : ""}
                              </small>
                            </>
                          )}
                        </Field>
                      </div>
                      <div className="width-50">
                        <PiSelectForm
                          name="priority"
                          label="Priority Level"
                          placeholder="Select"
                          isMulti={false}
                          options={repairPriorityLevel}
                          onChange={selectPriority}
                          classNamePrefix="react-select"
                          // isMandatory
                          isDisabled={opacity}
                        />
                      </div>
                      <div className="width-50">
                        <PiInputForm
                          name="sales_person_name"
                          label="Sales Person Name"
                          placeholder="Sales Person Name"
                          value={salesPersonName}
                          isDisabled
                        />
                      </div>
                      <div className="width-50">
                        <PiCreateSelectForm
                          name="contact_id"
                          label="Contact Name"
                          placeholder="Select"
                          classNamePrefix="react-select"
                          isMulti={false}
                          options={customerByOrg}
                          onChange={(e: any) => selectCustomer(e)}
                          isMandatory
                          isDisabled={opacity}
                          // eslint-disable-next-line react/jsx-no-bind
                          formatCreateLabel={formatCreateContact}
                          isValidNewOption={() => !!selectedCustomer}
                        />
                      </div>
                    </RmaFields>
                  </FormBodyOverFlow>
                  <SideDrawerFooter>
                    {serverMsg && <div className="server-msg">{serverMsg}</div>}
                    <PiButton
                      appearance="primary"
                      label={paramData ? "Update" : "Create"}
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
        {openAddContact && (
          <QuotesAddContact
            searchedName={searchedName}
            quoteDetails={selectedCustomer}
            sendModelEvent={triggerEvent}
          />
        )}
      </PiSideDrawer>
    </SideDrawerW40>
  );
}

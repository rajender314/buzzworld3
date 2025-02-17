import { useState, useEffect, useRef } from "react";
import { Formik } from "formik";
import {
  PiInputForm,
  PiTypography,
  PiButton,
  PiModal,
  PiModalHeader,
  PiModalBody,
  PiModalFooter,
  PiTextareaForm,
  PiSpinner,
  PiSelectForm,
} from "pixel-kit";
import { ApiResponse, PageProps } from "@app/services/schema/schema";
import { triggerApi } from "@app/services/api-services";
import {
  addBranchSchema,
  addRegionSchema,
  addTerritorySchema,
  addZipCodesSchema,
} from "@app/modules/contacts/validation/addValidations";
import {
  FilterFormFields,
  InnerBody,
  CloseButton,
  Popup,
} from "@app/components/adminaddrowmodel/adminaddrowmodel.component";

import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { AsyncSelect } from "@atlaskit/select";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
  SpinnerDiv,
} from "../fileuploadModel/fileuploadModel.component";
import BranchesInnerBody from "./admin-branches-regions-addrowmodel-components";
import { AsyncSelectDiv } from "../Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import { AsyncLabel } from "../rmaModel/RmaModel.component";
import CrossLogo from "../../assets/images/cross.svg";

type Props = {
  props: PageProps;
  sendEventData: any;
  paramData: any;
};

export default function AddRowModelBranches({
  props,
  sendEventData,
  paramData,
}: Props) {
  const [loading, setloading] = useState(false);
  const [serverMsg, setServerMsg] = useState(null);
  const [areaValue, setareaValue] = useState("");
  const [headerLabel, setHeaderLable] = useState<string>("");
  const [branchUserOptions, setBranchUserOptions] = useState<any>([]);
  const [branchRegionOptions, setBranchRegionOptions] = useState<any>([]);
  const [branchNameOptions, setBranchNameOptions] = useState<any>([]);
  const [isChecked, setIsChecked] = useState(true);
  const [opacity, setOpacity] = useState(false);
  const [selectedZipCodes, setSelectedZipCodes]: any = useState([]);
  const [zipCodevalues, setZipcodevalues]: any = useState([]);
  const { current }: any = useRef({ timer: 0 });
  const [initialValues, setInitialValues] = useState<any>({
    name: "",
    address: "",
    branch_manager_id: "",
    branch_id: "",
    city: "",
    description: "",
    email: "",
    fax: "",
    phone: "",
    sales_region_id: "",
    state: "",
    zip: "",
    status: "",
  });
  const getSchema = () => {
    if (props.pageLabel === "Branches") {
      return addBranchSchema;
    }
    if (props.pageLabel === "Regions") {
      return addRegionSchema;
    }
    if (props.pageLabel === "Territory") {
      return addTerritorySchema;
    }
    if (props.pageLabel === "Zipcodes") {
      return addZipCodesSchema;
    }
    return "";
  };
  function getBranchUsers() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.BranchUsers}?status[0]=true`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success) {
          setBranchUserOptions(
            response.result.data.list.map((item: any) => ({
              value: item.id,
              label: item.name,
            }))
          );
          if (!paramData) {
            setloading(false);
          }
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  function getSalesPersons() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.salesPerson}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success) {
          if (!paramData) {
            setloading(false);
          }
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  function getBranchRegions() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.BranchRegions}?status[0]=true`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success) {
          setBranchRegionOptions(
            response.result.data.list.map((item: any) => ({
              value: item.id,
              label: item.name,
            }))
          );
          if (!paramData) {
            setloading(false);
          }
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  function getBranchNames() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.branchNames}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success) {
          setBranchNameOptions(
            response.result.data.list.map((item: any) => ({
              value: item.id,
              label: item.name,
            }))
          );
          if (!paramData) {
            setloading(false);
          }
          // setloading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  function getData() {
    let apiCall = "";
    if (props.pageLabel === "Branches") {
      apiCall = `${EndpointUrl.branchList}/${paramData.id}`;
    } else if (props.pageLabel === "Regions") {
      apiCall = `${EndpointUrl.regionsList}/${paramData.id}`;
    } else if (props.pageLabel === "Territory") {
      apiCall = `${EndpointUrl.territoryList}/${paramData.id}`;
    } else if (props.pageLabel === "Zipcodes") {
      apiCall = `${EndpointUrl.zipcodesList}/${paramData.id}`;
    }

    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: apiCall,
      headers: {},
    };

    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success) {
          const { data } = response.result;
          if (paramData && data) {
            if (props.pageLabel === "Branches") {
              initialValues.name = data.name ? data.name : "";
              initialValues.phone = data.phone ? data.phone : "";
              initialValues.email = data.email ? data.email : "";
              initialValues.branch_id = data.branch_id ? data.branch_id : "";
              initialValues.branch_manager_id = data.branch_manager_id
                ? data.branch_manager_id
                : "";
              initialValues.address = data.address ? data.address : "";
              initialValues.sales_region_id = data.sales_region_id
                ? data.sales_region_id
                : "";
              initialValues.state = data.state ? data.state : "";
              initialValues.city = data.city ? data.city : "";
              initialValues.zip = data.zip ? data.zip : "";
              initialValues.fax = data.fax ? data.fax : "";

              initialValues.description = data.description
                ? data.description
                : "";

              const objActive = { label: "Active", value: "true" };
              const objInActive = { label: "InActive", value: "false" };
              initialValues.status =
                data.status === "Active" ? objActive : objInActive;

              setInitialValues({ ...initialValues });
              setTimeout(() => {
                setloading(false);
              }, 100);
            } else if (props.pageLabel === "Regions") {
              initialValues.name = data.name ? data.name : "";
              initialValues.description = data.description
                ? data.description
                : "";
              initialValues.region_manager_id = data.region_manager_id
                ? data.region_manager_id
                : "";
              const objActive = { label: "Active", value: "true" };
              const objInActive = { label: "InActive", value: "false" };
              initialValues.status =
                data.status === "Active" ? objActive : objInActive;

              setInitialValues({ ...initialValues });
              setTimeout(() => {
                setloading(false);
              }, 100);
            } else if (props.pageLabel === "Territory") {
              initialValues.name = data.name ? data.name : "";
              initialValues.territory_code = data.territory_code
                ? data.territory_code
                : "";
              initialValues.br_notify_email = data.br_notify_email
                ? data.br_notify_email
                : "";
              initialValues.sales_person_id = data.sales_person_id
                ? data.sales_person_id
                : "";
              initialValues.branch_id = data.branch_id ? data.branch_id : "";
              initialValues.sales_region_id = data.sales_region_id
                ? data.sales_region_id
                : "";
              initialValues.sales_manager_id = data.sales_manager_id
                ? data.sales_manager_id
                : "";
              initialValues.description = data.description
                ? data.description
                : "";
              const objActive = { label: "Active", value: "true" };
              const objInActive = { label: "InActive", value: "false" };
              initialValues.status =
                data.status === "Active" ? objActive : objInActive;
              setSelectedZipCodes(data.zipcode_id ? data.zipcode_id : []);
              setZipcodevalues(data.zipcode_id ? data.zipcode_id : []);
              setInitialValues({ ...initialValues });
              setTimeout(() => {
                setloading(false);
              }, 100);
            } else if (props.pageLabel === "Zipcodes") {
              initialValues.zipcode = data.zipcode ? data.zipcode : "";
              initialValues.city = data.city ? data.city : "";
              initialValues.state_abr = data.state_abr ? data.state_abr : "";
              initialValues.country = data.country ? data.country : "";
              const objActive = { label: "Active", value: "true" };
              const objInActive = { label: "InActive", value: "false" };
              initialValues.status =
                data.status === "Active" ? objActive : objInActive;
              setInitialValues({ ...initialValues });
              setTimeout(() => {
                setloading(false);
              }, 100);
            }
          }
        } else {
          setTimeout(() => {
            setloading(false);
          }, 3000);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getSchema();
    if (!paramData && props.pageLabel === "Branches") {
      setloading(true);
      const value = {
        name: "",
        address: "",
        branch_manager_id: "",
        branch_id: "",
        city: "",
        description: "",
        email: "",
        fax: "",
        phone: "",
        sales_region_id: "",
        state: "",
        zip: "",
      };
      setInitialValues(value);
      setHeaderLable("Add Branch");
      getBranchUsers();
      getBranchRegions();
    } else if (paramData && props.pageLabel === "Branches") {
      setloading(true);

      const values = {
        name: "",
        address: "",
        branch_manager_id: "",
        branch_id: "",
        city: "",
        description: "",
        email: "",
        fax: "",
        phone: "",
        sales_region_id: "",
        state: "",
        zip: "",
        status:
          isChecked === true
            ? {
                value: "true",
                label: "Active",
              }
            : {
                value: "false",
                label: "InActive",
              },
      };
      setInitialValues(values);
      setHeaderLable("Update Branch");
      getBranchUsers();
      getBranchRegions();
      getData();
      setInitialValues(values);
    } else if (!paramData && props.pageLabel === "Regions") {
      setloading(true);

      const values = {
        name: "",
        description: "",
        region_manager_id: "",
      };
      setInitialValues(values);
      setHeaderLable("Add Region");
      getBranchUsers();
    } else if (paramData && props.pageLabel === "Regions") {
      setloading(true);

      const values = {
        name: "",
        description: "",
        region_branch_manager_id: "",
        status:
          isChecked === true
            ? {
                value: "true",
                label: "Active",
              }
            : {
                value: "false",
                label: "InActive",
              },
      };
      setInitialValues(values);
      setHeaderLable("Update Region");
      getBranchUsers();
      getData();
    } else if (!paramData && props.pageLabel === "Territory") {
      setloading(true);
      const values = {
        name: "",
        description: "",
        territory_code: "",
        br_notify_email: "",
        sales_person_id: "",
        sales_manager_id: "",
        branch_id: "",
        sales_region_id: "",
        zipcode_id: selectedZipCodes || [],
      };
      setInitialValues(values);
      setHeaderLable("Add Territory");
      getBranchUsers();
      getBranchRegions();
      getBranchNames();
      getSalesPersons();
    } else if (paramData && props.pageLabel === "Territory") {
      setloading(true);
      const values = {
        name: "",
        description: "",
        territory_code: "",
        br_notify_email: "",
        sales_person_id: "",
        sales_manager_id: "",
        branch_id: "",
        sales_region_id: "",
        status:
          isChecked === true
            ? {
                value: "true",
                label: "Active",
              }
            : {
                value: "false",
                label: "InActive",
              },
        zipcode_id: selectedZipCodes || [],
      };
      setInitialValues(values);
      setHeaderLable("Update Territory");
      getBranchUsers();
      getBranchRegions();
      getData();
      getBranchNames();
      getSalesPersons();
    } else if (!paramData && props.pageLabel === "Zipcodes") {
      setloading(true);
      const values = {
        zipcode: "",
        city: "",
        state_abr: "",
        country: "",
      };
      setInitialValues(values);
      setHeaderLable("Add Zip Code");
      setTimeout(() => {
        setloading(false);
      }, 500);
    } else if (paramData && props.pageLabel === "Zipcodes") {
      setloading(true);

      const values = {
        zipcode: "",
        city: "",
        state_abr: "",
        country: "",
        status:
          isChecked === true
            ? {
                value: "true",
                label: "Active",
              }
            : {
                value: "false",
                label: "InActive",
              },
      };
      setInitialValues(values);
      setHeaderLable("Update Zip Code");
      getData();
    }
  }, [props.pageLabel]);

  function resetForm() {
    if (paramData) {
      setSelectedZipCodes(zipCodevalues && zipCodevalues ? zipCodevalues : []);
      setareaValue(paramData.description ? paramData.description : "");
    } else {
      initialValues.name = "";
      initialValues.phone = "";
      initialValues.email = "";
      initialValues.branch_id = "";
      initialValues.branch_manager_id = "";
      initialValues.address = "";
      initialValues.sales_region_id = "";
      initialValues.state = "";
      initialValues.city = "";
      initialValues.zip = "";
      initialValues.fax = "";
      initialValues.description = "";
      initialValues.region_manager_id = "";
      setInitialValues({ ...initialValues });
      setareaValue("");
      setSelectedZipCodes([]);
    }
    setServerMsg(null);
  }
  function handleTextArea(e: any) {
    setareaValue(e.target.value);
  }

  function handleSubmit(data: any) {
    setOpacity(true);
    let apiCall: any;
    if (!paramData && props.pageLabel === "Branches") {
      apiCall = `${EndpointUrl.branchList}`;
    } else if (paramData && props.pageLabel === "Branches") {
      apiCall = `${EndpointUrl.branchList}/${paramData.id}`;
    } else if (!paramData && props.pageLabel === "Regions") {
      apiCall = `${EndpointUrl.createRegions}`;
    } else if (paramData && props.pageLabel === "Regions") {
      apiCall = `${EndpointUrl.createRegions}/${paramData.id}`;
    } else if (!paramData && props.pageLabel === "Territory") {
      apiCall = `${EndpointUrl.createTerritory}`;
    } else if (paramData && props.pageLabel === "Territory") {
      apiCall = `${EndpointUrl.createTerritory}/${paramData.id}`;
    } else if (!paramData && props.pageLabel === "Zipcodes") {
      apiCall = `${EndpointUrl.zipcodesList}`;
    } else if (paramData && props.pageLabel === "Zipcodes") {
      apiCall = `${EndpointUrl.zipcodesList}/${paramData.id}`;
    }

    const Params = {
      id: paramData && paramData.id ? paramData.id : "",
      ...data,
    };
    const apiObject = {
      payload: {
        ...Params,
        zipcode_id: selectedZipCodes || [],
      },
      method: paramData && paramData.id ? "PUT" : "POST",
      apiUrl: apiCall,

      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success) {
          setServerMsg(null);
          setOpacity(false);
          setTimeout(() => {
            sendEventData({ success: true, headerLabel });
          }, 200);
        } else {
          setOpacity(false);
          setServerMsg(response.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  function closeModel() {
    // let data = {
    //   name: "",
    //   description: "",
    //   status: "",
    //   quantity: "",
    // };
    sendEventData({ closeModel: true });
  }

  function changeValue(e: any) {
    setIsChecked(!isChecked);
    console.log(e);
  }
  const onZipCodeInputChange = (newValue: any) => {
    if (newValue.length >= 3) {
      return newValue;
    }
    return newValue;
  };
  const zipCodesData = async (inputValue: string) => {
    let data: any = [];
    if (inputValue.length >= 3) {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.ZipCodesSearch}?search=${inputValue}`,
        headers: {},
      };
      await triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            let arr = [];
            const list = response.result.data.list
              ? response.result.data.list
              : response.result.data;
            arr = list.map((item: any) => ({
              id: item.value,

              name: item.label,
              ...item,
            }));
            data = arr;
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
      return data;
    }
    return data;
  };
  const promiseZipCodeOptions = (inputValue: string) =>
    new Promise((resolve) => {
      if (inputValue.length >= 3) {
        if (current.timer) clearTimeout(current.timer);
        current.timer = setTimeout(() => {
          resolve(zipCodesData(inputValue));
        }, 1000);
      }
    });
  const HandleZipCodesChange = (value: any) => {
    if (value) {
      setSelectedZipCodes(value);
    }
  };
  const statusOptions: any = [
    {
      value: "true",
      label: "Active",
    },
    {
      value: "false",
      label: "InActive",
    },
  ];

  return (
    <Popup>
      <PiModal isOpen width={500}>
        <PopupHeaderContentDiv>
          <PiModalHeader>
            <PopupHeaderDiv>
              <PiTypography component="h3">{headerLabel}</PiTypography>

              <CloseButton
                onClick={() => closeModel()}
                title="close"
                className="Hover"
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
            validationSchema={() => getSchema()}
            onSubmit={(e: any) => handleSubmit(e)}
            initialValues={initialValues}
            innerRef={() => {}}
            onReset={() => resetForm()}
          >
            {({ ...formik }: any) => (
              <>
                <PiModalBody>
                  <FilterFormFields
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
                    {props.pageLabel === "Branches" && (
                      <BranchesInnerBody>
                        <PiInputForm
                          name="name"
                          label="Name"
                          libraryType="atalskit"
                          type="text"
                          placeholder="Enter Name"
                          className="field"
                          maxLength={100}
                          isMandatory
                          isDisabled={opacity}
                        />
                        <PiInputForm
                          name="phone"
                          label="Phone"
                          libraryType="atalskit"
                          type="phone_number"
                          placeholder="Enter Phone Number"
                          className="field"
                          maxLength={16}
                          onChange={() => setServerMsg(null)}
                          // isMandatory
                          isDisabled={opacity}
                        />
                        <div>
                          <PiInputForm
                            name="email"
                            label="Email ID"
                            libraryType="atalskit"
                            type="text"
                            placeholder="Enter Email ID"
                            className="field"
                            onChange={() => setServerMsg(null)}
                            isMandatory
                            isDisabled={opacity}
                          />
                        </div>

                        <PiInputForm
                          name="branch_id"
                          label="Branch ID"
                          libraryType="atalskit"
                          type="text"
                          placeholder="Enter Branch ID"
                          className="width-100"
                          maxLength={30}
                          isMandatory
                          isDisabled={opacity}
                        />
                        <PiSelectForm
                          name="branch_manager_id"
                          label="Branch Manager"
                          libraryType="atalskit"
                          placeholder="Select"
                          classNamePrefix="react-select"
                          options={branchUserOptions}
                          isMandatory
                          isDisabled={opacity}
                        />
                        <div style={{ width: "100%" }}>
                          <PiTextareaForm
                            name="address"
                            label="Address"
                            value={areaValue}
                            onChange={(e: any) => handleTextArea(e)}
                            libraryType="atalskit"
                            placeholder="Enter Address"
                            maxLength={255}
                            isDisabled={opacity}
                          />
                        </div>

                        <PiSelectForm
                          name="sales_region_id"
                          label="Region"
                          libraryType="atalskit"
                          placeholder="Select "
                          classNamePrefix="react-select"
                          options={branchRegionOptions}
                          isMandatory
                          isDisabled={opacity}
                        />

                        {paramData && (
                          <PiSelectForm
                            name="status"
                            label="Status"
                            placeholder={isChecked ? "Active" : "InActive"}
                            // isDisabled={true}
                            classNamePrefix="react-select"
                            options={statusOptions}
                            onChange={(e: any) => changeValue(e)}
                            isDisabled={opacity}
                          />
                        )}
                        <PiInputForm
                          name="state"
                          label="State"
                          libraryType="atalskit"
                          type="text"
                          placeholder="Enter State"
                          className="field"
                          maxLength={30}
                          onChange={() => setServerMsg(null)}
                          isMandatory
                          isDisabled={opacity}
                        />
                        <PiInputForm
                          name="city"
                          label="City"
                          libraryType="atalskit"
                          type="text"
                          placeholder="Enter City"
                          className="field"
                          maxLength={30}
                          onChange={() => setServerMsg(null)}
                          isMandatory
                          isDisabled={opacity}
                        />
                        <PiInputForm
                          name="zip"
                          label="Zip Code"
                          libraryType="atalskit"
                          type="text"
                          placeholder="Enter Zip Code"
                          className="field"
                          maxLength={6}
                          onChange={() => setServerMsg(null)}
                          isMandatory
                          isDisabled={opacity}
                        />

                        <PiInputForm
                          name="fax"
                          label="Fax"
                          libraryType="atalskit"
                          type="text"
                          placeholder="Enter Fax"
                          maxLength={30}
                          isMandatory
                          onChange={() => setServerMsg(null)}
                          isDisabled={opacity}
                        />
                        <div style={{ width: "100%" }}>
                          <PiTextareaForm
                            name="description"
                            label="Description"
                            value={areaValue}
                            onChange={(e: any) => handleTextArea(e)}
                            libraryType="atalskit"
                            placeholder="Enter Description"
                            maxLength={255}
                            isDisabled={opacity}
                          />
                        </div>
                      </BranchesInnerBody>
                    )}
                    {props.pageLabel === "Regions" && (
                      <InnerBody>
                        <PiInputForm
                          name="name"
                          label="Name"
                          libraryType="atalskit"
                          type="text"
                          placeholder="Enter Name"
                          className="Name"
                          isMandatory
                          maxLength={100}
                          isDisabled={opacity}
                        />
                        {paramData && (
                          <PiSelectForm
                            name="status"
                            label="Status"
                            placeholder={isChecked ? "Active" : "InActive"}
                            // isDisabled={true}
                            classNamePrefix="react-select"
                            options={statusOptions}
                            onChange={(e: any) => changeValue(e)}
                            isDisabled={opacity}
                          />
                        )}
                        <PiSelectForm
                          name="region_manager_id"
                          label="Region Manager"
                          libraryType="atalskit"
                          placeholder="Select "
                          classNamePrefix="react-select"
                          options={branchUserOptions}
                          isMandatory
                          isDisabled={opacity}
                        />
                        <PiTextareaForm
                          name="description"
                          label="Description"
                          value={areaValue}
                          onChange={(e: any) => handleTextArea(e)}
                          libraryType="atalskit"
                          placeholder="Enter Description"
                          maxLength={255}
                          isDisabled={opacity}
                        />
                      </InnerBody>
                    )}
                    {props.pageLabel === "Territory" && (
                      <BranchesInnerBody>
                        <PiInputForm
                          name="name"
                          label="Name"
                          type="text"
                          isMandatory
                          placeholder="Enter Name"
                          // className="field"
                          maxLength={100}
                          isDisabled={opacity}
                        />
                        <PiSelectForm
                          name="sales_region_id"
                          label="Region"
                          libraryType="atalskit"
                          placeholder="Select "
                          classNamePrefix="react-select"
                          options={branchRegionOptions}
                          isMandatory
                          isDisabled={opacity}
                        />
                        <PiInputForm
                          name="territory_code"
                          label="Territory Code"
                          libraryType="atalskit"
                          type="text"
                          placeholder="Enter Territory Code"
                          className="width-100"
                          maxLength={30}
                          isMandatory
                          isDisabled={opacity}
                        />
                        <PiSelectForm
                          name="branch_id"
                          label="Branch Name"
                          libraryType="atalskit"
                          placeholder="Select "
                          classNamePrefix="react-select"
                          options={branchNameOptions}
                          isMandatory
                          isDisabled={opacity}
                        />

                        <PiSelectForm
                          name="sales_manager_id"
                          label="Sales Manager"
                          libraryType="atalskit"
                          placeholder="Select "
                          classNamePrefix="react-select"
                          options={branchUserOptions}
                          isMandatory
                          isDisabled={opacity}
                        />

                        <PiSelectForm
                          name="sales_person_id"
                          label="Sales Person"
                          libraryType="atalskit"
                          placeholder="Select "
                          classNamePrefix="react-select"
                          options={branchUserOptions}
                          isMandatory
                          isDisabled={opacity}
                        />
                        <PiInputForm
                          name="br_notify_email"
                          label="Branch Notify Email"
                          libraryType="atalskit"
                          type="text"
                          placeholder="Enter Branch Notify Email"
                          className="field"
                          onChange={() => setServerMsg(null)}
                          isDisabled={opacity}

                          // isMandatory
                        />

                        {paramData && (
                          <PiSelectForm
                            name="status"
                            label="Status"
                            placeholder={isChecked ? "Active" : "InActive"}
                            // isDisabled={true}
                            classNamePrefix="react-select"
                            options={statusOptions}
                            onChange={(e: any) => changeValue(e)}
                            isDisabled={opacity}
                          />
                        )}
                        <AsyncSelectDiv style={{ width: "100%" }}>
                          <AsyncLabel
                            htmlFor="async-select-example"
                            className="css-re7y6x"
                          >
                            Search Zip Code
                          </AsyncLabel>
                          <AsyncSelect
                            name="zipcode_id"
                            inputId="async-select-example"
                            classNamePrefix="multi-select zip-codes"
                            onInputChange={onZipCodeInputChange}
                            loadOptions={promiseZipCodeOptions}
                            placeholder="Search By Zip Code"
                            onChange={(value) => {
                              HandleZipCodesChange(value);
                            }}
                            isClearable
                            value={selectedZipCodes}
                            isMulti
                            isDisabled={opacity}
                          />
                        </AsyncSelectDiv>
                        <div style={{ width: "100%" }}>
                          <PiTextareaForm
                            name="description"
                            label="Description"
                            value={areaValue}
                            onChange={(e: any) => handleTextArea(e)}
                            libraryType="atalskit"
                            placeholder="Enter Description"
                            maxLength={255}
                            isDisabled={opacity}
                          />
                        </div>
                      </BranchesInnerBody>
                    )}
                    {props.pageLabel === "Zipcodes" && (
                      <BranchesInnerBody className="zip-codes-container">
                        <PiInputForm
                          name="zipcode"
                          label="Zip Code"
                          type="number"
                          isMandatory
                          placeholder="Enter Zip Code"
                          maxLength={10}
                          isDisabled={opacity}
                        />
                        <PiInputForm
                          name="city"
                          label="City"
                          type="text"
                          placeholder="Enter city"
                          // maxLength={6}
                          isDisabled={opacity}
                        />
                        <PiInputForm
                          name="state_abr"
                          label="State Abbreviation"
                          type="text"
                          placeholder="Enter state Abbreviation"
                          // maxLength={6}
                          isDisabled={opacity}
                        />
                        <PiInputForm
                          name="country"
                          label="Country"
                          type="text"
                          placeholder="Enter country"
                          // maxLength={6}
                          isDisabled={opacity}
                        />

                        {paramData && (
                          <PiSelectForm
                            name="status"
                            label="Status"
                            placeholder={isChecked ? "Active" : "InActive"}
                            options={statusOptions}
                            classNamePrefix="react-select"
                            onChange={(e: any) => changeValue(e)}
                            isDisabled={opacity}
                          />
                        )}
                      </BranchesInnerBody>
                    )}
                  </FilterFormFields>
                </PiModalBody>

                <PiModalFooter>
                  {serverMsg && <div className="server-msg">{serverMsg}</div>}

                  <PiButton
                    appearance="secondary"
                    label="Reset"
                    onClick={formik.resetForm}
                    type="reset"
                    className="Secondary"
                    isDisabled={loading || opacity}
                  />

                  <PiButton
                    appearance="primary"
                    label={paramData ? "Update" : "Add"}
                    onClick={formik.handleSubmit}
                    className="Primary"
                    isDisabled={loading || opacity}
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

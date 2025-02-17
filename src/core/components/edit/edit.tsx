import { useState, useEffect, useRef } from "react";
import { Formik, Field } from "formik";
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
  PiCheckbox,
} from "pixel-kit";
import { ApiResponse, EditProps, PageProps } from "@app/services/schema/schema";
import { triggerApi } from "@app/services/api-services";
import { FilterFormFields } from "@app/components/savefiltermodel/savefiltermodel.component";
import { EditSchema } from "@app/modules/contacts/validation/adminValidations";
import {
  CloseButton,
  InnerBody,
  Popup,
} from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
  SpinnerDiv,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import { DropDownItemProps } from "pixel-kit/dist/components/select/select";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import CrossLogo from "../../../assets/images/cross.svg";

type Props = {
  onChildClick: any;
  paramData: any;
  props: PageProps;
};

export default function EditModel({ onChildClick, paramData, props }: Props) {
  const [openEditModel, setOpenEditModel] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [api, setApi] = useState("");
  const [serverMsg, setServerMsg] = useState(null);
  const [loading, setloading] = useState(true);
  const [toggleChecked, setToggleChecked] = useState(false);
  // const [posmailValue, setMailValue] = useState("");

  const [initialValues, setInitialValues]: any = useState({
    name: "name",
    description: "description",
    status: "status",
    quantity: "1",
    mapping_accountype_id: "",
    code: "",
    is_different_pricing: "",
    pos_mail: "",
    // pos_test_mail: "",
  });

  const [areaValue, setareaValue] = useState("");
  const [statusSelect, setStatusSelect] = useState("");
  let gridDataById: EditProps;
  const [headerLabel, setHeaderLable] = useState<string>("");
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
  // const { current }: any = useRef({ timer: 0 });
  const formik = useRef<any>(null);

  const [accountTypeList, setAccountTypeList] = useState<any>([]);
  function importAccountTypes() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.importAccountTypes}?is_dropdown=true`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          // accountTypeList = accountTypeList.map((item: DropdownLabelProps) => {
          //  return {
          //    id: item.value,
          //    name: item.label,
          //  }
          // })
          setAccountTypeList(response.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  function getData() {
    let apiCall = "";
    if (props.pageLabel === "Account_Types") {
      apiCall = `v1/AccountTypes/${paramData.id}`;
      setApi(`v1/AccountTypes/${paramData.id}`);
    } else if (props.pageLabel === "Classifications") {
      apiCall = `v1/Classifications/${paramData.id}`;
      setApi(`v1/Classifications/${paramData.id}`);
    } else if (props.pageLabel === "Industry") {
      apiCall = `v1/Industry/${paramData.id}`;
      setApi(`/v1/Industry/${paramData.id}`);
    } else if (props.pageLabel === "Sales_Potential") {
      apiCall = `v1/SalesPotential/${paramData.id}`;
      setApi(`/v1/SalesPotential/${paramData.id}`);
    } else if (props.pageLabel === "Contact_Types") {
      apiCall = `v1/ContactTypes/${paramData.id}`;
      setApi(`/v1/ContactTypes/${paramData.id}`);
    } else if (props.pageLabel === "PO_Min_Qty") {
      apiCall = `v1/Quantity/${paramData.id}`;
      setApi(`v1/Quantity/${paramData.id}`);
    } else if (props.pageLabel === "Branches") {
      apiCall = `${EndpointUrl.branchList}/${paramData.id}`;
      setApi(`${EndpointUrl.branchList}/${paramData.id}`);
    } else if (props.pageLabel === "Vendors") {
      apiCall = `${EndpointUrl.vendorList}/${paramData.id}`;
      setApi(`${EndpointUrl.vendorList}/${paramData.id}`);
    } else if (props.pageLabel === "quote_types") {
      apiCall = `${EndpointUrl.QuoteTypes}/${paramData.id}`;
      setApi(`${EndpointUrl.QuoteTypes}/${paramData.id}`);
    }
    console.log(apiCall);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: apiCall,
      headers: {},
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          gridDataById = response.result.data;
          if (paramData && gridDataById) {
            if (props.pageLabel !== "PO_Min_Qty") {
              initialValues.name = gridDataById.name;
              initialValues.description = gridDataById.description
                ? gridDataById.description
                : "";
              initialValues.pos_mail = gridDataById.pos_mail
                ? gridDataById.pos_mail
                : "";
              // initialValues["pos_test_mail"] = gridDataById.pos_test_mail
              //   ? gridDataById.pos_test_mail
              //   : "";

              // setMailValue(
              //   gridDataById.pos_mail ? gridDataById.pos_mail : ""
              // );
              initialValues.mapping_accountype_id =
                gridDataById.mapping_accountype_id;

              const objActive: any = { label: "Active", value: "true" };
              const objInActive: any = { label: "InActive", value: "false" };
              initialValues.status =
                gridDataById && gridDataById.status === "Active"
                  ? objActive
                  : objInActive;

              initialValues.code = gridDataById.code ? gridDataById.code : "";
              initialValues.is_different_pricing = !!(
                gridDataById.is_different_pricing &&
                gridDataById.is_different_pricing === "Yes"
              );
              setInitialValues(initialValues);
              setareaValue(
                gridDataById.description ? gridDataById.description : ""
              );

              setStatusSelect(paramData.status);
            } else if (props.pageLabel === "PO_Min_Qty") {
              initialValues.quantity = gridDataById.quantity;
              setInitialValues(initialValues);
            }
          }
          // setInitialValues(initialValues)
          setloading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  useEffect(() => {
    setHeaderLable(`Update ${props.displayLabel}`);
    setOpenEditModel(true);
    getData();
    if (props.pageLabel === "Account_Types") {
      importAccountTypes();
    }
    // getFilterData();

    setToggleChecked(paramData.status !== "Inactive");
  }, [paramData]);

  function resetForm(data: EditProps) {
    initialValues.pos_mail = data.pos_mail ? data.pos_mail : "";
    // initialValues["pos_test_mail"] = data.pos_test_mail
    //   ? data.pos_test_mail
    //   : "";

    setInitialValues(initialValues);
    setareaValue(paramData.description ? paramData.description : "");
    // setMailValue(paramData.pos_mail ? paramData.pos_mail : "");
    setStatusSelect(paramData.status);
    setServerMsg(null);
  }

  const handleChange = (e: DropDownItemProps) => {
    if (e.value === "true") {
      setToggleChecked(true);
    } else {
      setToggleChecked(false);
    }
  };

  function handleSubmit(data: EditProps) {
    console.log(data);
    if (props.pageLabel !== "PO_Min_Qty") {
      const apiObject = {
        payload: {
          id: paramData.id,
          name: data.name.trim(),
          description: data.description,
          status: toggleChecked ? "true" : "false",
          mapping_accountype_id: data.mapping_accountype_id
            ? data.mapping_accountype_id.value
            : "",
          code: data.code ? data.code : "",
          is_different_pricing: data.is_different_pricing
            ? data.is_different_pricing
            : false,
          pos_mail: data.pos_mail ? data.pos_mail : "",
          // pos_test_mail: data.pos_test_mail ? data.pos_test_mail : "",
        },
        method: paramData && paramData.id ? "PUT" : "POST",
        apiUrl: api,
        headers: {},
      };
      console.log(apiObject.payload);

      console.log(data);
      triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            setServerMsg(null);
            setOpenEditModel(false);
            setTimeout(() => {
              onChildClick({ success: true });
            }, 500);
          } else {
            setServerMsg(response.result.data);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    } else if (props.pageLabel === "PO_Min_Qty") {
      const apiObject = {
        payload: {
          quantity: data.quantity,
        },
        method: "PUT",
        apiUrl: api,
        headers: {},
      };
      triggerApi(apiObject)
        .then((response: ApiResponse) => {
          console.log(response.result.status_code);
          if (response.result.success) {
            setOpenEditModel(false);
            setTimeout(() => {
              onChildClick({ success: true });
            }, 500);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  }

  function handleRef(e: any) {
    // console.log(e);
    formik.current = e;
  }
  function closeModel() {
    setOpenEditModel(false);
    const data = {
      name: "",
      description: "",
      status: "",
      quantity: "",
    };
    onChildClick(data);
  }

  function handleTextArea(e: any) {
    setareaValue(e.target.value);
  }
  const onNcrChanged = (e: any) => {
    console.log(e);
    formik.current.setFieldValue("is_different_pricing", e.target.checked);
  };

  return (
    <Popup>
      <PiModal isOpen={openEditModel} width={450}>
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
            validationSchema={EditSchema}
            onSubmit={(e: any) => handleSubmit(e)}
            initialValues={initialValues}
            innerRef={(e: any) => handleRef(e)}
            setIsChecked={setIsChecked}
            isChecked={isChecked}
            onReset={(e: any) => resetForm(e)}
          >
            {({ ...formikProps }: any) => (
              <>
                <PiModalBody>
                  {/* <FilterForm
                      formik={formik}
                      options={options}
                      paramData={paramData}
                      initialvalues={initialValues}
                      pageLabel={props.pageLabel}
                      data={data}
                      setIsChecked={setIsChecked}
                      isChecked={isChecked}
                      setToggleChecked={setToggleChecked}
                      toggleChecked={toggleChecked}
                    /> */}

                  <FilterFormFields>
                    <>
                      {props.pageLabel !== "PO_Min_Qty" && (
                        <InnerBody>
                          {props.pageLabel === "Vendors" && (
                            <PiInputForm
                              name="code"
                              label="Code (Syspro ID)"
                              libraryType="atalskit"
                              type="text"
                              placeholder="Code"
                              isDisabled
                            />
                          )}

                          <PiInputForm
                            name="name"
                            label="Name"
                            // onChange={(e: string) => handleChange(e, "name")}
                            libraryType="atalskit"
                            type="text"
                            placeholder="Enter Name"
                            className="Name"
                            onChange={() => setServerMsg(null)}
                            maxLength={30}
                            isMandatory
                            isDisabled={props.pageLabel === "Vendors"}
                          />
                          {props.pageLabel === "Account_Types" && (
                            <PiSelectForm
                              name="mapping_accountype_id"
                              label="Account Type Mapped With"
                              placeholder="Select"
                              options={accountTypeList}
                              classNamePrefix="react-select"
                            />
                          )}

                          <PiSelectForm
                            name="status"
                            label="Status"
                            placeholder={statusSelect}
                            classNamePrefix="react-select"
                            onChange={(e: DropDownItemProps) => handleChange(e)}
                            value={
                              paramData.status === "Active" ? "Active" : "false"
                            }
                            options={statusOptions}
                          />

                          <PiTextareaForm
                            name="description"
                            label="Description"
                            onChange={(e: any) => handleTextArea(e)}
                            libraryType="atalskit"
                            value={areaValue}
                            placeholder="Enter Description"
                            maxLength={255}
                          />

                          {props.pageLabel === "Vendors" && (
                            <div className="width-100 checkbox-form-field">
                              <Field name="is_different_pricing">
                                {({ field }: any) => (
                                  <PiCheckbox
                                    helpText=""
                                    isChecked={field.value}
                                    label="Is Different Pricing"
                                    libraryType="atalskit"
                                    name="is_different_pricing"
                                    // value={field.value}
                                    onChange={(e: any) => onNcrChanged(e)}
                                    size="medium"
                                  />
                                )}
                              </Field>
                            </div>
                          )}
                          {props.pageLabel === "Vendors" && (
                            <PiTextareaForm
                              name="pos_mail"
                              label="POS Mail"
                              // value={posmailValue}
                              // onChange={handlePosmailChange}
                              libraryType="atalskit"
                              placeholder="Enter Mail"
                              // maxLength={255}
                            />
                          )}
                          {/* {props.pageLabel === "Vendors" && (
                                <PiTextareaForm
                                  name="pos_test_mail"
                                  label="POS Test Mail"
                                  // value={posmailValue}
                                  // onChange={handlePosmailChange}
                                  libraryType="atalskit"
                                  placeholder="Enter Test Mail"
                                  // maxLength={255}
                                />
                              )} */}
                        </InnerBody>
                      )}
                      {props.pageLabel === "PO_Min_Qty" && (
                        <InnerBody>
                          <PiInputForm
                            name="quantity"
                            label="Quantity"
                            // onChange={(e: string) => handleChange(e, "name")}
                            libraryType="atalskit"
                            type="number"
                            placeholder="Enter Quantity"
                          />
                        </InnerBody>
                      )}
                    </>
                  </FilterFormFields>
                </PiModalBody>

                <PiModalFooter>
                  {serverMsg && <div className="server-msg">{serverMsg}</div>}
                  <PiButton
                    appearance="secondary"
                    label="Reset"
                    onClick={formikProps.resetForm}
                    className="Secondary"
                    type="reset"
                  />
                  <PiButton
                    appearance="primary"
                    label="Update"
                    onClick={formikProps.handleSubmit}
                    className="Primary"
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

import React, { useState, Fragment, useEffect, useRef } from "react";
import { Formik } from "formik";
import CrossLogo from "../../../assets/images/cross.svg";
import {
  PiInputForm,
  PiTypography,
  PiButton,
  PiModal,
  PiModalHeader,
  PiModalBody,
  PiModalFooter,
  PiTextareaForm,
  PiToggle
} from "pixel-kit";
import {
  ApiResponse,
  EditProps,
  PageProps,
  RowDataProps
} from "src/services/schema/schema";
import { triggerApi } from "src/services/api-services";

import { FilterFormFields } from "src/components/savefiltermodel/savefiltermodel.component";
import { EditSchema } from "src/modules/contacts/validation/adminValidations";
import { CloseButton, InnerBody, ButtonsBody, ShowMessage, ErrorMessage } from "src/components/adminaddrowmodel/adminaddrowmodel.component";
import Snackbar from "src/components/Snackbar";
import { PopupHeaderDiv } from "src/components/fileuploadModel/fileuploadModel.component";
type Props = {
  paramData: any;
  data: boolean;
  onChildClick: (e: EditProps) => {};
  props: PageProps;
  gridData: any;
};

export default function EditModel({ data, onChildClick, paramData, props, gridData }: Props) {
  //   console.log(props.pageLabel)
  // console.log(paramData)
  const [openEditModel, setOpenEditModel] = useState(false);
  const [display, setDisplay] = useState(false);

  let [isChecked, setIsChecked] = useState(true)
  let [api, setApi] = useState('');
  let [Api, setApiApi] = useState('')

  let [toastProps, setToastProps] = useState({
    appearance: "error",
    message: ""
  });

  const [showToast, setToast] = useState(false);
  let [rowData, setRowData] = useState<Array<RowDataProps>>([]);
  let [toggleChecked, setToggleChecked] = useState(false)
  let gridDataById: EditProps;
  useEffect(() => {
    // console.log(props.pageLabel)
    setOpenEditModel(true);
    getData();
    // getFilterData();
    toggleChecked = paramData.status === "Inactive" ? false : true;
    setToggleChecked(toggleChecked)
    if (props.pageLabel !== "PO_Min_Qty") {
      initialValues["name"] = paramData.name;
      console.log(initialValues["name"]);
      initialValues["description"] = paramData.description;
      initialValues["status"] = toggleChecked ? 'true' : 'false';
      // initialValues["quantity"] = gridDataById.quantity;
      console.log(initialValues)
      setInitialValues(initialValues)
    } else if (props.pageLabel === "PO_Min_Qty") {
      initialValues["quantity"] = paramData.quantity;
      setInitialValues(initialValues)
    }

  }, []);
  let [initialValues, setInitialValues] = useState({
    name: "name",
    description: "description",
    status: "status",
    quantity: "quantity"
  })


  const formik = useRef(null);
  // console.log(formik);

  function resetForm(data: EditProps) {
    data = {
      name: data.name,
      description: data.description,
      status: data.status,
      quantity: data.quantity
    }
  }

  function getData() {
    // console.log(props.pageLabel)
    if (props.pageLabel === "Account_Types") {
      Api = `v1/AccountTypes`;
      api = `v1/AccountTypes/${paramData.id}`;
      setApi(api);
      setApiApi(Api);
    } else if (props.pageLabel === "Classifications") {
      Api = `v1/Classifications`
      api = `v1/Classifications/${paramData.id}`
      setApi(api)
      setApiApi(Api)
    } else if (props.pageLabel === "Industry") {
      Api = `/v1/Industry`
      api = `/v1/Industry/${paramData.id}`
      setApi(api)
      setApiApi(Api)
    } else if (props.pageLabel === "Sales_Potential") {
      Api = `/v1/SalesPotential`
      api = `/v1/SalesPotential/${paramData.id}`
      setApi(api)
      setApiApi(Api)
    } else if (props.pageLabel === "Contact_Types") {
      Api = `/v1/ContactTypes`
      api = `/v1/ContactTypes/${paramData.id}`
      setApi(api)
      setApiApi(Api)
    } else if (props.pageLabel === "PO_Min_Qty") {
      Api = `/v1/Quantity`
      api = `/v1/Quantity/${paramData.id}`
      setApi(api)
      setApiApi(Api)
    }

    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: api,
      headers: {}
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          gridDataById = response.result.data;
          if (paramData && gridDataById) {

            // arr = Object.keys(gridDataById.multipliers);
            if (props.pageLabel !== "PO_Min_Qty") {
              initialValues["name"] = gridDataById.name;
              console.log(initialValues["name"]);
              initialValues["description"] = gridDataById.description;
              initialValues["status"] = toggleChecked ? 'true' : 'false';
              // initialValues["quantity"] = gridDataById.quantity;
              console.log(initialValues)
              setInitialValues(initialValues)
            } else if (props.pageLabel === "PO_Min_Qty") {
              initialValues["quantity"] = gridDataById.quantity;
              setInitialValues(initialValues)
            }

          }
          // setInitialValues(initialValues)
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  console.log(initialValues);

  function handleSubmit(data: EditProps) {

    console.log(data);
    if (props.pageLabel !== "PO_Min_Qty") {
    const apiObject = {
      payload: {
        name: data.name,
        description: data.description,
        status: toggleChecked ? "true" : "false",
      },
      method: paramData && paramData.id ? "PUT" : "POST",
      apiUrl: api,
      headers: {}

    };
    console.log(apiObject.payload);


    console.log(data);
    triggerApi(apiObject)

      .then((response: ApiResponse) => {
        console.log(response.result.status_code);
        if (response.result.success === false) {

          if (response.result.data !== "Message:The Name is already taken181/var/www/html/rapidium-core/src/Base/Validations/BaseValidations.php") {
            let obj = {
              appearance: "error",
              message: response.result.data
            };

            toastProps = obj;

            setToastProps(toastProps);


            setToast(true);
            // setTimeout(() => {
            //   setToast(false);
            // }, 2000);

          } else if (response.result.status_code === 422) {

            let obj = {
              appearance: "error",
              message: response.result.data
            };
            toastProps = obj;
            setToastProps(toastProps);

            setToast(true);
            // setTimeout(() => {
            //   setToast(false);
            // }, 2000);
          }
        } else if (response.result.status_code === 200) {
          let obj = {
            appearance: "success",
            message: "Saved Successfully"
          };

          toastProps = obj;
          setToastProps(toastProps);
          setDisplay(true);
          setTimeout(() => {
            setDisplay(true);
            setTimeout(() => {
              setDisplay(false);
              // setOpenModel(false);
              setOpenEditModel(false)
              closeModel()
            }, 2000);
            setOpenEditModel(false)
            getUpdated(data)
          }, 100);
        }
        // getUpdated(data)
      })
      .catch((err: string) => {
        console.log(err);
      });
    }else if (props.pageLabel === "PO_Min_Qty") {
      const apiObject = {
        payload: {
          quantity: data.quantity
        },
        method: paramData && paramData.id ? "PUT" : "POST",
        apiUrl: api,
        headers: {}
  
      };
      console.log(apiObject.payload);
  
  
      console.log(data);
      triggerApi(apiObject)
  
        .then((response: ApiResponse) => {
          console.log(response.result.status_code);
          if (response.result.success === false) {
  
            if (response.result.data !== "Message:The Quantity is already") {
              let obj = {
                appearance: "error",
                message: response.result.data
              };
  
              toastProps = obj;
  
              setToastProps(toastProps);
  
  
              setToast(true);
              // setTimeout(() => {
              //   setToast(false);
              // }, 2000);
  
            } else if (response.result.status_code === 422) {
  
              let obj = {
                appearance: "error",
                message: response.result.data
              };
              toastProps = obj;
              setToastProps(toastProps);
  
              setToast(true);
              // setTimeout(() => {
              //   setToast(false);
              // }, 2000);
            }
          } else if (response.result.status_code === 200) {
            let obj = {
              appearance: "success",
              message: "Saved Successfully"
            };
  
            toastProps = obj;
            setToastProps(toastProps);
            setDisplay(true);
            setTimeout(() => {
              setDisplay(true);
              setTimeout(() => {
                setDisplay(false);
                // setOpenModel(false);
                setOpenEditModel(false)
                closeModel()
              }, 2000);
              setOpenEditModel(false)
              getUpdated(data)
            }, 100);
          }
          // getUpdated(data)
        })
        .catch((err: string) => {
          console.log(err);
        });
    }


  }

  function getUpdated(data: EditProps) {

    let params = {
      data
    };
    console.log(params);
    const apiObject = {
      payload: params,
      method: "GET",
      apiUrl: Api,
      headers: {}
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {

          rowData = response.result.data.list;
          gridData(rowData)
          setRowData(rowData);

        }
      })
      .catch((err: string) => {
        console.log(err);
      });
    // closeModel()
    setOpenEditModel(false)



  }
  function handleRef() {
    // console.log(e);

    // formik.current = e;
  }
  function closeModel() {
    // console.log(222);
    setOpenEditModel(false);
    // setToast(true)
    let data = {
      name: "",
      description: "",
      status: "",
      quantity: ""
    };
    onChildClick(data);
  }
  return (
    <Fragment>
      <ShowMessage>{display && <Snackbar {...toastProps} ></Snackbar>}</ShowMessage>
      <PiModal isOpen={openEditModel} >

        <PiModalHeader>

          <ErrorMessage>{showToast && <Snackbar {...toastProps} ></Snackbar>}</ErrorMessage>
          <PopupHeaderDiv>
            {<CloseButton onClick={() => closeModel()} title="close" className="Hover"> <img src={CrossLogo}></img> </CloseButton>}
            <PiTypography component="h4">Edit</PiTypography>
            <hr />
          </PopupHeaderDiv>

        </PiModalHeader>



        <Formik

          validationSchema={EditSchema}
          onSubmit={handleSubmit}

          initialValues={initialValues}
          innerRef={handleRef}
          setIsChecked={setIsChecked}
          isChecked={isChecked}
          onReset={resetForm}
        >
          {({ ...formik }: any) => {
            return (
              <>
                <PiModalBody>
                  <FilterForm
                    formik={formik}
                    paramData={paramData}
                    initialvalues={initialValues}
                    pageLabel={props.pageLabel}
                    data={data}
                    setIsChecked={setIsChecked}
                    isChecked={isChecked}
                    setToggleChecked={setToggleChecked}
                    toggleChecked={toggleChecked}
                  />
                </PiModalBody>
                <PiModalFooter>
                  <ButtonsBody>
                    <PiButton
                      appearance="secondary"
                      label="Reset"
                      onClick={formik.resetForm}
                      className="Secondary"
                      type="reset"
                    />
                    <PiButton
                      appearance="primary"
                      label="Update"
                      onClick={formik.handleSubmit}
                      className="Primary"
                    />
                  </ButtonsBody>
                </PiModalFooter>
              </>
            );
          }}
        </Formik>

      </PiModal>
    </Fragment>
  );
}

const FilterForm = ({ paramData,setIsChecked, isChecked, toggleChecked, setToggleChecked, pageLabel }: any) => {
  // console.log(rowdropdown);
  // const [isChecked, setIsChecked] = useState(true);

  let [make, setMake] = useState("Active");

  const handleChange = (e: string, type: string) => {
    if (type === "name") {
      // btnDisable(initialvalues.name, e.target.value)
    } else if (type === "description") {
      // btnDisable(initialvalues.description, e.target.value)
    } else if (type === "status") {
      setIsChecked(!isChecked);
      make = "InActive"
      setMake(make)
      setToggleChecked(!toggleChecked)
      // data.status = isChecked == true ? "active" : "inactive"
      // setToggleChecked(!toggleChecked)
      // btnDisable(initialValues.status, e.target.checked)
    }
  }
  if (isChecked) {
    make = "Active";
  } else {
    make = "InActive";
  }
  return (
    <FilterFormFields>
      <>
        {pageLabel !== "PO_Min_Qty" && (
          <InnerBody>
            <PiInputForm
              name="name"
              label="Name"
              // onChange={(e: string) => handleChange(e, "name")}
              libraryType="atalskit"
              type="text"
              placeholder="Name"
              className="Name"
            />
            <PiTextareaForm
              name="description"
              label="Description"
              // onChange={(e: string) => handleChange(e, "description")}
              libraryType="atalskit"
              defaultValue={paramData.description}
              placeholder="Description"
            />
            <PiToggle
              direction="row"
              label="Status"
              name="status"
              isChecked={toggleChecked}
              // isChecked={true}
              onChange={(e: string) => handleChange(e, "status")}
              // onChange={e => handleMakeChange(e)}
              size="regular"
            />
          </InnerBody>
        )}
        {pageLabel === "PO_Min_Qty" && (
          <InnerBody>
            <PiInputForm
              name="quantity"
              label="Quantity"
              // onChange={(e: string) => handleChange(e, "name")}
              libraryType="atalskit"
              type="text"
              placeholder="Quantity"

            />
          </InnerBody>
        )}
      </>
    </FilterFormFields>
  );
};

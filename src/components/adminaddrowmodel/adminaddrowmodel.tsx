import React, { useState, Fragment, useEffect, } from "react";
import { Formik } from "formik";
import CrossLogo from "../../assets/images/cross.svg";
import {
  PiInputForm,
  PiTypography,
  PiButton,
  PiModal,
  PiModalHeader,
  PiModalBody,
  PiModalFooter,
  PiToggle,
  PiTextareaForm
} from "pixel-kit";
import {
  ApiResponse,
  AddProps,
  PageProps,
  RowDataProps,
} from "src/services/schema/schema";
import { triggerApi } from "src/services/api-services";
import { addSchema } from "src/modules/contacts/validation/addValidations";
import { FilterFormFields, InnerBody, ButtonsBody, CloseButton, ErrorMessage, Popup, InnerBodyQuantity, } from "src/components/adminaddrowmodel/adminaddrowmodel.component";

import Snackbar from "src/components/Snackbar/snackbar";
import { PopupHeaderDiv } from "../fileuploadModel/fileuploadModel.component";

type Props = {
  data: boolean;
  onChildClick: (e: AddProps) => {};
  props: PageProps;
  gridData: any;
};

export default function AddRowModel({ data, onChildClick, props, gridData }: Props) {
  let [openModel, setOpenModel] = useState(false);
  let [nameErr, setNameErr] = useState('');
  let [toastProps, setToastProps] = useState({
    appearance: "error",
    message: ""
  });
  const [showToast, setToast] = useState(false);
  const [display, setDisplay] = useState(false);
  let [Api, setApi] = useState('')
  const [isChecked, setIsChecked] = useState(true)

  let [rowData, setRowData] = useState<Array<RowDataProps>>([]);

  useEffect(() => {
    console.log(rowData);
    setOpenModel(true);
    if (props.pageLabel !== "PO_Min_Qty") {
      initialValues = {
        name: "",
        description: "",
        status: isChecked === true ? "true" : "false",
        quantity: "quantity"
      }
      setInitialValues(initialValues)
    } else if (props.pageLabel === "PO_Min_Qty") {
      initialValues = {
        name: "name",
        description: "description",
        status: isChecked === true ? "true" : "false",
        quantity: ""
      }
      setInitialValues(initialValues)
    }
  }, []);


  let [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    status: isChecked === true ? "true" : "false",
    quantity: ""
  });

  function resetForm(data: AddProps) {
    data = {
      name: "",
      description: "",
      status: "true",
      quantity: ""
    }
  }

  // if (initialValues.name === '') {
  //   setNameErr('Name is required');
  // }

  function handleSubmit(data: AddProps) {
    console.log(data);
    // if(data.name === ''){
    //   nameErr = 'Name is required';
    //   return setNameErr(nameErr);
    // }
    console.log(props.pageLabel)
    if (props.pageLabel === "Account_Types") {
      Api = `v1/AccountTypes`
      setApi(Api);
    } else if (props.pageLabel === "Classifications") {
      Api = `v1/Classifications`
      setApi(Api)
    } else if (props.pageLabel === "Industry") {
      Api = `/v1/Industry`
      setApi(Api)
    } else if (props.pageLabel === "Sales_Potential") {
      Api = `/v1/SalesPotential`
      setApi(Api)
    } else if (props.pageLabel === "Contact_Types") {
      Api = `/v1/ContactTypes`
      setApi(Api)
    } else if (props.pageLabel === "PO_Min_Qty") {
      Api = `/v1/Quantity`

      setApi(Api);
    }
    console.log(Api);

    if (props.pageLabel !== "PO_Min_Qty") {
      const apiObject = {
        payload: {
          name: data.name,
          description: data.description,
          status: isChecked === true ? true : false,
        },
        method: "POST",
        apiUrl: Api,
        headers: {}
      };
      triggerApi(apiObject)

        .then((response: ApiResponse) => {
          console.log(response.result.status_code);
          if (response.result.success === false) {
            // apiResponse = response;
            if (response.result.data !== "Message:The Name is already taken181/var/www/html/rapidium-core/src/Base/Validations/BaseValidations.php") {

              // apiResponse = response;
              let obj = {
                appearance: "error",
                message: response.result.data
              };

              toastProps = obj;

              setToastProps(toastProps);


              setToast(true);
              setTimeout(() => {
                // setToast(false);
              }, 2000);

            } else if (response.result.status_code === 422) {
              // apiResponse = response;
              let obj = {
                appearance: "error",
                message: "The Name is already present"
              };
              toastProps = obj;
              setToastProps(toastProps);

              setToast(true);
              setTimeout(() => {
                // setToast(false);
              }, 2000);
            }
          } else if (response.result.status_code === 200) {
            // apiResponse = response;
            let obj = {
              appearance: "success",
              message: "Saved successfully"
            };

            toastProps = obj;
            setToastProps(toastProps);
            setTimeout(() => {
              setDisplay(true);
              setTimeout(() => {
                setDisplay(false);
                setOpenModel(false);
                closeModel()
              }, 2000);
              setOpenModel(false)
              getUpdated(data)
            }, 100);
            // getUpdated();
            // setOpenModel(true)
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
        method: "POST",
        apiUrl: Api,
        headers: {}
      };
      triggerApi(apiObject)

        .then((response: ApiResponse) => {
          console.log(response.result.status_code);
          if (response.result.success === false) {
            // apiResponse = response;
            if (response.result.data !== "Message:The Name is already taken181/var/www/html/rapidium-core/src/Base/Validations/BaseValidations.php") {

              // apiResponse = response;
              let obj = {
                appearance: "error",
                message: response.result.data,
              };

              toastProps = obj;

              setToastProps(toastProps);


              setToast(true);
              setTimeout(() => {
                // setToast(false);
              }, 2000);

            } else if (response.result.status_code === 422) {
              // apiResponse = response;
              let obj = {
                appearance: "error",
                message: response.result.data,
              };
              toastProps = obj;
              setToastProps(toastProps);

              setToast(true);
              setTimeout(() => {
                // setToast(false);
              }, 2000);
            }
          } else if (response.result.status_code === 200) {
            // apiResponse = response;
            let obj = {
              appearance: "success",
              message: "Saved successfully"
            };

            toastProps = obj;
            setToastProps(toastProps);
            setTimeout(() => {
              setDisplay(true);
              setTimeout(() => {
                setDisplay(false);
                setOpenModel(false);
                closeModel()
              }, 2000);
              setOpenModel(false)
              getUpdated(data)
            }, 100);
            // getUpdated();
            // setOpenModel(true)
          }

        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  }

  function handleChange(data: AddProps) {
    console.log(data);
  }

  function getUpdated(data: AddProps) {

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
          console.log(rowData)
          gridData(rowData)
          setRowData(rowData);
          let obj = {
            appearance: "success",
            message: "Saved successfully"
          };

          toastProps = obj;
          setToastProps(toastProps);
          setDisplay(true);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
    // setOpenModel(false)
    setOpenModel(false)
  }



  function handleRef(e: any) {
    console.log(e);

    // formik.current = e;
  }
  function closeModel() {
    // console.log(222);
    setOpenModel(false);
    let data = {
      name: '',
      description: '',
      status: '',
      quantity: '',
    };
    onChildClick(data);
  }

  return (

    <Fragment>
      <ErrorMessage>{display && <Snackbar {...toastProps}></Snackbar>}</ErrorMessage>
      <Popup>
        <PiModal isOpen={openModel}>
          <PiModalHeader>
            <ErrorMessage>
              {showToast && <Snackbar {...toastProps}></Snackbar>}</ErrorMessage>
            <PopupHeaderDiv>
              {<CloseButton onClick={() => closeModel()} title="close" className="Hover"> <img src={CrossLogo}></img> </CloseButton>}
              <PiTypography component="h4">Add </PiTypography>
              <hr />
            </PopupHeaderDiv>
          </PiModalHeader>

          <Formik
            validationSchema={addSchema}
            onSubmit={handleSubmit}
            nameErr={nameErr}
            setNameErr={setNameErr}
            initialValues={initialValues}
            innerRef={handleRef}
            handlechange={handleChange}
            onReset={resetForm}
          // initialStatus={isChecked}

          >
            {({ ...formik }: any) => {
              return (
                <>
                  <PiModalBody>
                    <FilterForm
                      formik={formik}
                      initialValues={initialValues}
                      data={data}
                      pageLabel={props.pageLabel}
                      setIsChecked={setIsChecked}
                      isChecked={isChecked}
                    // setToggleChecked={setToggleChecked}
                    // toggleChecked={toggleChecked}

                    />
                  </PiModalBody>
                  <PiModalFooter>
                    <ButtonsBody>
                      <PiButton
                        appearance="secondary"
                        label="Reset"
                        onClick={formik.resetForm}
                        type="reset"
                        className="Secondary"
                      />
                      <PiButton
                        appearance="primary"
                        label="Add"
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
      </Popup>
    </Fragment>
  );
}


const FilterForm = ({ formik, isChecked, setIsChecked, pageLabel, }: any) => {

  // console.log(onChildClick);
  // const [isChecked, setIsChecked] = useState(true)
  // const [submitDisable, setSubmitDisable] = useState(true)

  // const btnDisable = (prev: string, cur: string) => {
  //   if (prev !== cur) {
  //     setSubmitDisable(false)
  //   } else {
  //     setSubmitDisable(true)
  //   }
  // }
  function changeValue() {
    setIsChecked(!isChecked)
    // onChildClick({});
  }
  const handleChange = (e: string, type: string) => {
    if (type === "name") {
      // btnDisable(initialValues.name, e.target.value)
    } else if (type === "description") {
      // btnDisable(initialValues.description, e.target.value)
    } else if (type === "status") {
      changeValue()
      // btnDisable(initialValues.status, e.target.checked)
    }
  }

  return (
    <Popup>
      <FilterFormFields>
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

              placeholder="Description"
            />
            <PiToggle
              direction="row"
              label={"Active"}
              name="status"
              // isChecked={make ? true : false}
              isChecked={true}
              onChange={(e: string) => handleChange(e, "status")}
              // onChange={e => handleMakeChange(e)}
              size="regular"
            />
          </InnerBody>
        )}
        {pageLabel === "PO_Min_Qty" && (
          <InnerBodyQuantity>
            <PiInputForm
              name="quantity"
              label="Quantity"
              onChange={(e: string) => handleChange(e, "name")}
              libraryType="atalskit"
              type="text"
              placeholder="Quantity"

            />
          </InnerBodyQuantity>
        )}
        {/* <PiSelectForm
        name="status"
        label="Status"
        placeholder={make}
        options={[
          {
            label: 'Active',
            value: '1'
          },
          {
            label: 'InActive',
            value: '2'
          }
        ]}

        onChange={e => handleMakeChange(e)}
      /> */}
      </FilterFormFields>
    </Popup>
  );
};

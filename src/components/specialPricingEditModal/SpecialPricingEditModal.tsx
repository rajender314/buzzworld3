/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Fragment, useEffect } from "react";
import { Formik } from "formik";
import CrossLogo from "../../assets/images/cross.svg";
import {
  PiTypography,
  PiButton,
  PiModal,
  PiModalHeader,
  PiModalBody,
  PiModalFooter,
  PiTextareaForm,
  PiInput,
  PiDatePicker,
  PiInputForm2,
} from "pixel-kit";
import {
  ApiResponse,
  ReqInfoProps,
} from "src/services/schema/schema";
import { SpecialPricevendorEditValidations } from "src/modules/specialPricing/validation/SpecialPricingVadlidation";
import { FilterFormFields } from "src/components/multiEditModel/multiEditModel.component";
import EndpointUrl from "src/core/apiEndpoints/endPoints";
import { triggerApi } from "src/services/api-services";
import { CloseButton } from "../adminaddrowmodel/adminaddrowmodel.component";
import { PopupHeaderDiv } from "../fileuploadModel/fileuploadModel.component";

type FileProps = {
  success: boolean;
};

type Props = {
  reqInfo: ReqInfoProps;
  onFileSelect: (e?: FileProps) => {};
  organizationData?: any;
  paramData?: any;
};

export default function SpecialPricingEditModal({ reqInfo, onFileSelect, organizationData, paramData }: Props) {
  const [openModel, setOpenModel] = useState(false);
  const [TodayDate, SetTodayDate] = useState('');
  const [endDateErr, setEndDateErr] = useState('');
  const [startDateErr, setStartDateErr] = useState('');
  let [gridData, setGridData]: any = useState({});
  const [minDate, setMinDate] = useState<any>(gridData.start_date);
  const [endDate, setEndDate] = useState(gridData.end_date);
  const [specialPrice, setSpecialPrice] = useState<any>()
  const initialValues = {
    manufacturer_vendor_id: "",
    // stock_code: "",
    list_price: "",
    special_price: specialPrice,
    Organization: "",
    start_date: "",
    end_date: "",
    description: ""
  };
  function closeModel() {
    setOpenModel(false);
    let data = {
      success: false
    };
    onFileSelect(data);
  }
  useEffect(() => {
    getFilterData();
  }, [])

  useEffect(() => {
    setOpenModel(true);
    // filterStockData(inputValues);
    function formatDate(date: Date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [year, month, day].join('-');
    }
    SetTodayDate(formatDate(new Date()))

  }, []);


  function getFilterData() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.specialPricingApi}${paramData ? '/' + paramData.id : ''}`,
      headers: {}
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          console.log(response.result)
          let GetDetails = response.result.data;
          setSpecialPrice(GetDetails.special_price)
          setMinDate(GetDetails.start_date)
          setEndDate(GetDetails.end_date)
          setGridData(GetDetails)
          setTimeout(() => {
          }, 1000);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  function onDateChange(event: string) {
    setMinDate(event)
    setStartDateErr('')
  }
  function onChangeEndDate(event: string) {
    setEndDate(event)
    setEndDateErr('')
  }
  function OnSpecialChange(event: any) {
    console.log(event.target.value)
    setSpecialPrice(event.target.value)

  }

  function handleSubmit(data: any) {
  }
  function handleRef(e: any) {
    // formik.current = e;
  }

  const SaveData = () => {
    let params = {
      vendor_id: gridData.vendor_id,
      stock_code_id: gridData.stock_code_id,
      list_price: gridData.list_price,
      special_price: specialPrice,
      organizations_id: gridData.organizations_id,
      start_date: minDate ? minDate : gridData.start_date,
      end_date: endDate ? endDate : gridData.end_date,
      description: gridData.description
    }
    const apiObject = {
      payload: params,
      method: "PUT",
      apiUrl: `${EndpointUrl.specialPricingApi}${paramData ? `/${paramData.id}` : ''}`,
      headers: {}
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setOpenModel(false);
          onFileSelect({ success: true });
        }
        else if (response.result.status_code === 422) {
          if (response.result.data.includes("end")) {
            setEndDateErr("Please select the End Date")
          }
          if (response.result.data.includes("start")) {
            setStartDateErr("Please select the Start Date")
          }
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  return (
    <> <Fragment>
      <PiModal isOpen={openModel}>
        <PiModalHeader>
          <PopupHeaderDiv>
          {
            <CloseButton
              onClick={() => closeModel()}
              title="close"
              className="Hover"
            >
              {" "}
              <img src={CrossLogo} alt="loading"></img>{" "}
            </CloseButton>
          }
          <PiTypography component="h4">Update Product</PiTypography>
          <hr />
          </PopupHeaderDiv>
        </PiModalHeader>
        <Formik
          validationSchema={SpecialPricevendorEditValidations}
          onSubmit={handleSubmit}
          initialValues={initialValues}
          innerRef={handleRef}
        >
          {({ ...formik }: any) => {
            return (
              <>
                <PiModalBody>
                  <FilterFormFields>
                    <>
                      <PiInput
                        name="manufacturer_vendor_id"
                        label="Vendor"
                        libraryType="atalskit"
                        type="text"
                        isDisabled={true}
                        placeholder="Vendor"
                        value={gridData.vendor_name}
                      />
                      <PiInput
                        name="stock_code"
                        label="Stock Code"
                        libraryType="atalskit"
                        type="text"
                        isDisabled={true}
                        placeholder="Stock Code"
                        value={gridData.stock_code}
                      />
                      <PiInput
                        name="list_price"
                        label="List Price"
                        libraryType="atalskit"
                        type="text"
                        isDisabled={true}
                        placeholder="List Price"
                        value={gridData.list_price}
                      />
                      <PiInputForm2
                        name="special_price"
                        label="Special Price"
                        libraryType="atalskit"
                        type="text"
                        placeholder="Special Price"
                        onChange={OnSpecialChange}
                        value={specialPrice}
                      />
                      <PiInput
                        name="Organization"
                        label="Organization"
                        libraryType="atalskit"
                        type="text"
                        isDisabled={true}
                        placeholder="Organization"
                        value={gridData.organization}
                      />
                      <PiDatePicker
                        helpText=""
                        label="Start Date"
                        libraryType="atalskit"
                        name="start_date"
                        minDate={TodayDate}
                        value={minDate}
                        onChange={onDateChange}
                      />
                      <span className="css-gingst">{startDateErr}</span>
                      <PiDatePicker
                        // helpText=""
                        label="End Date"
                        libraryType="atalskit"
                        name="end_date"
                        minDate={minDate}
                        onChange={onChangeEndDate}
                        value={endDate}
                      />
                      <span className="css-gingst">{endDateErr}</span>
                      <PiTextareaForm
                        name="description"
                        label="Description"
                        libraryType="atalskit"
                        placeholder="Description"
                        defaultValue={gridData.description}
                      />
                    </>
                  </FilterFormFields>
                </PiModalBody>
                <PiModalFooter>
                  <PiButton
                    appearance="secondary"
                    label="Cancel"
                    onClick={closeModel}
                  />
                  <PiButton
                    appearance="primary"
                    label={paramData ? "Update Product" : "Add Product"}
                    onClick={SaveData}
                  />
                </PiModalFooter>
              </>
            );
          }}
        </Formik>
      </PiModal>
    </Fragment>
    </>
  );
}

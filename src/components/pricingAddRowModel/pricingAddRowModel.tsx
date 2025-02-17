/* eslint-disable no-use-before-define */
import { useState, useEffect } from "react";
import { Formik } from "formik";
import {
  PiInputForm,
  PiTypography,
  PiButton,
  PiModal,
  PiModalHeader,
  PiModalBody,
  PiModalFooter,
  PiSelectForm,
  PiTextareaForm,
  PiInput,
  PiSpinner,
} from "pixel-kit";
import {
  ApiResponse,
  FilterColumnProps,
  PiSelectProps,
  DynamicJsonValidProps,
} from "@app/services/schema/schema";
import vendorValidations from "@app/modules/vendor/validation/vendorValidations";
import { FilterFormFields } from "@app/components/multiEditModel/multiEditModel.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services/api-services";
import CrossLogo from "../../assets/images/cross.svg";
import { CloseButton } from "../adminaddrowmodel/adminaddrowmodel.component";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
  SpinnerDiv,
} from "../fileuploadModel/fileuploadModel.component";

export default function PricingAddRowModel({
  reqInfo,
  onFileSelect,
  paramData,
  branchValue,
}: any) {
  const [openModel, setOpenModel] = useState(false);
  const [discountFilters, setdiscountFilters] = useState<PiSelectProps[]>([]);
  const [modelLabel, setModelLabel] = useState("");
  const [serverMsg, setServerMsg] = useState(null);
  const [loading, setloading] = useState(true);
  const [initialValues, setInitialValues] = useState<DynamicJsonValidProps>({
    manufacturer_discount_id: "",
    vendor_id: "",
    stock_code: "",
    list_price: "",
    description: "",
    product_class: "",
  });
  let gridDataById: any;

  // const initialValues = {
  //  manufacturer_discount_id: '',
  //  stock_code: '',
  //  list_price: '',
  //  description: '',
  // }

  // console.log(userList);
  // userList = Promise.resolve(userList).then(function(results) {
  //   console.log(results);
  //   return results.users;
  // });
  useEffect(() => {
    setOpenModel(true);
  }, []);
  function getFilterData() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.filterDataApi}?name=pricing&vendor_id=${reqInfo.body.vendor_id}&branch_id=${reqInfo.body.branch_id}`,
      headers: {},
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const gridFilterData = response.result.data;
          let filters = [];
          filters = gridFilterData.filters.discount_code;
          const list = filters.map((item: FilterColumnProps) => ({
            value: item.id,
            label: item.name,
          }));
          setdiscountFilters(list);
          setTimeout(() => {
            setloading(false);
          }, 1000);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  function getProductDetail() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.productsApi}/${paramData.id}?vendor_id=${reqInfo.body.vendor_id}&branch_id=${reqInfo.body.branch_id}&quantity=${paramData.quantity}&type=edit`,
      headers: {},
    };

    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          gridDataById = response.result.data;
          initialValues.manufacturer_discount_id = gridDataById.discount_code;
          initialValues.stock_code = gridDataById.name;
          initialValues.list_price = gridDataById.list_price;
          initialValues.description = gridDataById.description;
          initialValues.vendor_id = paramData.vendor_id;
          initialValues.product_class = gridDataById.product_class;
        }
        await setInitialValues(initialValues);
        getFilterData();
      })
      .catch((err: string) => {
        console.log(err);
      });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(gridDataById);
      }, 100);
    });
  }
  useEffect(() => {
    (async () => {
      // let data = getLocalStorage('requestInfo') as string
      // info = JSON.parse(data)

      if (paramData) {
        setModelLabel("Update Product");
        await getProductDetail();
      } else {
        setModelLabel("Add Product");
        // setloading(false);
        getFilterData();
      }
    })();
  }, []);

  // const formik = useRef(null);
  // console.log(formik);
  function handleSubmit(data: any) {
    // data.manufacturer_discount_id = data.manufacturer_discount_id.value;
    data.vendor_id = reqInfo.body.vendor_id;
    data.branch_id = reqInfo.body.branch_id;
    const apiObject = {
      payload: data || {},
      method: paramData && paramData.id ? "PUT" : "POST",
      apiUrl:
        paramData && paramData.id
          ? `${EndpointUrl.productsApi}/${paramData.id}`
          : `${EndpointUrl.productsApi}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setServerMsg(null);
          setOpenModel(false);
          onFileSelect({
            success: true,
            vendor_id: reqInfo.body.vendor_id,
            branch_id: branchValue || reqInfo.body.branch_id,
          });
        } else {
          setServerMsg(response.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  function handleRef(e: any) {
    console.log(e);
    // formik.current = e;
  }
  function closeModel() {
    // console.log(222);
    setOpenModel(false);
    const data = {
      success: false,
    };
    onFileSelect(data);
  }
  return (
    <PiModal isOpen={openModel}>
      <PopupHeaderContentDiv>
        <PiModalHeader>
          <PopupHeaderDiv>
            <PiTypography component="h3">{modelLabel}</PiTypography>
            <CloseButton
              onClick={() => closeModel()}
              title="close"
              className="Hover"
            >
              {" "}
              <img src={CrossLogo} alt="loading" />{" "}
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
          validationSchema={vendorValidations}
          onSubmit={(e: any) => handleSubmit(e)}
          initialValues={initialValues}
          innerRef={(e: any) => handleRef(e)}
        >
          {({ ...formikProps }: any) => (
            <>
              <PiModalBody>
                <FilterForm
                  data2={discountFilters}
                  initialValues={initialValues}
                  paramData={paramData}
                  reqInfo={reqInfo}
                />
              </PiModalBody>
              <PiModalFooter>
                {serverMsg && <div className="server-msg">{serverMsg}</div>}
                <PiButton
                  appearance="secondary"
                  label="Cancel"
                  onClick={() => closeModel()}
                />
                <PiButton
                  appearance="primary"
                  label={modelLabel}
                  onClick={formikProps.handleSubmit}
                />
              </PiModalFooter>
            </>
          )}
        </Formik>
      )}
    </PiModal>
  );
}

function FilterForm({ data2, paramData, reqInfo, initialValues }: any) {
  const [productClassList, setProductClassList] = useState([]);

  function getProductClassList() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.PricingProductClass}?sort=asc`,
      headers: {},
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          setProductClassList(data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getProductClassList();
  }, []);

  return (
    <FilterFormFields>
      <div className="Feilds">
        <div className="TwoInput">
          <PiInput
            name="vendor_id"
            label="Vendor"
            libraryType="atalskit"
            type="text"
            isDisabled
            placeholder="Vendor"
            value={paramData ? paramData.vendor_name : reqInfo.body.vendor_name}
          />
          <PiInputForm
            name="stock_code"
            label="Stock Code"
            libraryType="atalskit"
            type="text"
            placeholder="Enter Stock Code"
            isDisabled={!!paramData}
            isMandatory
            maxLength={45}
          />
        </div>
        <div className="TwoInput">
          <div style={{ width: "100%", maxWidth: "calc(50% - 8px)" }}>
            <PiSelectForm
              name="manufacturer_discount_id"
              label="Discount Code"
              placeholder="Select"
              isMulti={false}
              options={data2}
              classNamePrefix="react-select"
              isMandatory
              // value="dsdds"
            />
          </div>
          <PiInputForm
            name="list_price"
            label="List Price"
            libraryType="atalskit"
            type="string"
            placeholder="Enter List Price"
            isMandatory
          />
        </div>

        <div className="TwoInput" style={{ width: "calc(50% - 7px)" }}>
          <PiSelectForm
            name="product_class"
            label="Product Class"
            placeholder="Select"
            isMulti={false}
            options={productClassList}
            classNamePrefix="react-select"
            isMandatory
            // value="dsdds"
          />
        </div>

        <PiTextareaForm
          name="description"
          label="Description"
          libraryType="atalskit"
          placeholder="Enter Description"
          defaultValue={initialValues.description}
          maxLength={255}
        />
      </div>
    </FilterFormFields>
  );
}

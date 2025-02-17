import {
  PiButton,
  PiInputForm,
  PiModal,
  PiModalBody,
  PiModalFooter,
  PiModalHeader,
  PiSelectForm,
  PiSpinner,
  PiToast,
  PiTypography,
} from "pixel-kit";
import { useCallback, useEffect, useState } from "react";
import {
  CloseButton,
  FilterFormFields,
  InnerBody,
  Popup,
} from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
  SpinnerDiv,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import CrossLogo from "@app/assets/images/cross.svg";
import { Formik } from "formik";
import { triggerApi } from "@app/services";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { useParams } from "react-router-dom";
import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";
import CreatestocklineitemsformValidationSchema from "./create-stock-line-items-form-validations";

type Props = {
  sendModelData: any;
  getStocklineDetails: any;
};

export default function CreateStockItems({
  sendModelData,
  getStocklineDetails,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [opacity, setOpacity] = useState(false);
  const [wareHouseOptions, setWareHouseOptions] = useState<any>([]);
  const [productClassOptions, setProductClassOptions] = useState<any>([]);
  const [categoryOptions, setCategoryOptions] = useState<any>([]);
  const { id }: RouteParams = useParams();
  const [initialValues, setinitialValues] = useState({
    stock_code: getStocklineDetails.stock_code
      ? getStocklineDetails.stock_code
      : "",
    description: getStocklineDetails.description
      ? getStocklineDetails.description
      : "",
    product_class: getStocklineDetails.product_class
      ? getStocklineDetails.product_class
      : "",
    // vendor_name: getStocklineDetails.name ? getStocklineDetails.name : '',
    stock_uom: getStocklineDetails.stock_uom
      ? getStocklineDetails.stock_uom
      : "",
    ware_house: getStocklineDetails.ware_house
      ? getStocklineDetails.ware_house
      : "",
    supplier: getStocklineDetails.supplier ? getStocklineDetails.supplier : "",
    list_price: getStocklineDetails.list_price
      ? getStocklineDetails.list_price
      : "",
    unit_cost: getStocklineDetails.unit_cost
      ? getStocklineDetails.unit_cost
      : "",
    product_category: getStocklineDetails.product_category
      ? getStocklineDetails.product_category
      : "",
  });

  const closeModel = () => {
    sendModelData({ closeModel: true });
  };
  function handleSubmit(data: any) {
    setOpacity(true);
    setServerMsg("");

    const params = {
      ...data,
      ware_house: data && data.ware_house ? data.ware_house.value : "",
      product_class: data && data.product_class ? data.product_class.value : "",
      quote_id: id,
      item_id:
        getStocklineDetails && getStocklineDetails.item_id
          ? getStocklineDetails.item_id
          : "",
      supplier: data.supplier ? data.supplier.value : "",
      product_category:
        data && data.product_category ? data.product_category.value : "",
    };

    const apiObject = {
      payload: params,
      method: "POST",
      apiUrl: `${EndpointUrl.createStocklineItems}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((res: any) => {
        if (res.result.success && res.result.status_code === 200) {
          setServerMsg("");
          // setOpacity(false);
          setShowPopup(true);
          setTimeout(() => {
            setLoading(false);
            sendModelData({
              success: true,
              inventoryStockItem: true,
              // stockItemInfo: res.result.data.stockItemInfo[0],
              stock_code: data.stock_code,
            });
          }, 1000);
        } else if (res.result.success === false) {
          setServerMsg(res.result.data || "Error while inserted stock code");
          setOpacity(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  // const onProductclassChange = (e: any) => {
  //   initialValues['product_class'] = e.target.value
  //   setinitialValues(initialValues)
  // }
  // const onVendorNameChange = (e: any) => {
  //  initialValues['vendor_name'] = e.target.value
  //  setinitialValues(initialValues)
  // }
  const onOrderUomChange = (e: any) => {
    initialValues.stock_uom = e.target.value;
    setinitialValues(initialValues);
  };
  const onDescriptionChange = (e: any) => {
    initialValues.description = e.target.value;
    setinitialValues(initialValues);
  };
  const onUnitCostChange = (e: any) => {
    initialValues.unit_cost = e.target.value;
    setinitialValues(initialValues);
  };
  const onListPriceChange = (e: any) => {
    initialValues.list_price = e.target.value;
    setinitialValues(initialValues);
  };
  // const onWarehouseChange = (e: any) => {
  //   if (e !== null) {
  //     initialValues["ware_house"] = e.value;
  //     setinitialValues(initialValues);
  //   } else {
  //     initialValues["ware_house"] = "";
  //     setinitialValues(initialValues);
  //   }
  // };
  const onSupplierChange = (e: any) => {
    initialValues.supplier = e.value;
    setinitialValues(initialValues);
  };
  const getWareHouseOptions = useCallback(() => {
    setOpacity(true);

    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.WareHouseOptions}`,
      headers: {},
    };

    triggerApi(apiObject).then(async (res: any) => {
      if (res.result.success) {
        const { data } = res.result;
        setWareHouseOptions(data || []);

        setOpacity(false);
      } else if (res.result.success === false) {
        setOpacity(false);
      }
    });
  }, []);
  const [supplierList, setSupplierList] = useState([]);
  const getSupplierOptions = useCallback(() => {
    setOpacity(true);

    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.getSupplierLists}`,
      headers: {},
    };

    triggerApi(apiObject).then(async (res: any) => {
      if (res.result.success) {
        const { data } = res.result;
        setSupplierList(data || []);

        setOpacity(false);
      } else if (res.result.success === false) {
        setOpacity(false);
      }
    });
  }, []);
  const getProductClassOptions = useCallback(() => {
    setOpacity(true);

    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.ProductClassOptions}`,
      headers: {},
    };

    triggerApi(apiObject).then(async (res: any) => {
      if (res.result.success) {
        const { data } = res.result;
        setProductClassOptions(data || []);
        setOpacity(false);
      } else if (res.result.success === false) {
        setOpacity(false);
      }
    });
  }, []);

  const getCategoryOptions = useCallback(() => {
    setOpacity(true);

    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.ProductCategory}`,
      headers: {},
    };

    triggerApi(apiObject).then(async (res: any) => {
      if (res.result.success) {
        const { data } = res.result;
        // data &&
        //  data.length &&
        //  data.map((item: any) => {
        //    if (item.value === "B" || item.label === "Bought out") {
        //      initialValues["product_category"] = item;
        //      setinitialValues(initialValues);
        //    }
        //  });
        setCategoryOptions(data || []);
        setOpacity(false);
      } else if (res.result.success === false) {
        setOpacity(false);
      }
    });
  }, []);

  useEffect(() => {
    getWareHouseOptions();
    getProductClassOptions();
    getSupplierOptions();
    getCategoryOptions();
  }, [
    getWareHouseOptions,
    getProductClassOptions,
    getSupplierOptions,
    getCategoryOptions,
  ]);

  return (
    <>
      <Popup>
        <PiModal isOpen width={450}>
          <PopupHeaderContentDiv>
            <PiModalHeader>
              <PopupHeaderDiv>
                <PiTypography component="h3">Add Stock Line Items</PiTypography>
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
          {loading ? (
            <SpinnerDiv>
              <PiSpinner color="primary" size={50} libraryType="atalskit" />
            </SpinnerDiv>
          ) : (
            <Formik
              validationSchema={CreatestocklineitemsformValidationSchema}
              onSubmit={(e: any) => handleSubmit(e)}
              initialValues={initialValues}
            >
              {({ ...formik }: any) => (
                <>
                  <PiModalBody>
                    <FilterFormFields
                      style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      className={opacity ? "opacity-on-load" : ""}
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
                      <InnerBody>
                        <PiInputForm
                          name="stock_code"
                          label="Stock Code"
                          libraryType="atalskit"
                          type="text"
                          placeholder="Stock Code"
                          isMandatory
                          maxLength={30}
                        />
                        <PiInputForm
                          name="unit_cost"
                          label="Unit Cost"
                          libraryType="atalskit"
                          type="string"
                          placeholder="Enter Unit Cost"
                          isMandatory
                          onChange={onUnitCostChange}
                        />
                        <PiInputForm
                          name="list_price"
                          label="List Price"
                          libraryType="atalskit"
                          type="string"
                          placeholder="Enter List Price"
                          isMandatory
                          onChange={onListPriceChange}
                        />
                        <PiInputForm
                          name="description"
                          label="Stock Description"
                          libraryType="atalskit"
                          type="text"
                          placeholder="Enter Stock Description"
                          className="Name"
                          maxLength={30}
                          isMandatory
                          onChange={onDescriptionChange}
                        />
                        <PiSelectForm
                          name="product_class"
                          placeholder="Select"
                          isMulti={false}
                          isClearable
                          options={productClassOptions}
                          label="Product Class"
                          isMandatory
                          classNamePrefix="react-select"
                          isDisabled={opacity}
                          // onChange={onWarehouseChange}
                        />
                        <PiSelectForm
                          name="product_category"
                          placeholder="Select"
                          isMulti={false}
                          isClearable
                          options={categoryOptions}
                          label="Category"
                          isMandatory
                          classNamePrefix="react-select"
                          isDisabled={opacity}
                          // onChange={onWarehouseChange}
                        />
                        <PiSelectForm
                          name="supplier"
                          label="Supplier"
                          placeholder="Select supplier"
                          isMandatory
                          libraryType="atalskit"
                          onChange={onSupplierChange}
                          options={supplierList}
                          classNamePrefix="react-select"
                        />
                        {/* <PiInputForm
                              name="product_class"
                              label="Product Class"
                              libraryType="atalskit"
                              type="text"
                              placeholder="Enter Product Class"
                              className="Name"
                              onChange={onProductclassChange}
                              maxLength={30}
                              isMandatory
                            /> */}
                        {/* <PiInputForm
                              name={'vendor_name'}
                              label={'Vendor Name'}
                              libraryType="atalskit"
                              type="text"
                              className="Name"
                              placeholder={'Enter Vendor Name'}
                              isMandatory
                              onChange={onVendorNameChange}
                            /> */}

                        <PiInputForm
                          name="stock_uom"
                          label="Order UOM"
                          placeholder="Enter Order UOM"
                          isMandatory
                          onChange={onOrderUomChange}
                        />
                        <PiSelectForm
                          name="ware_house"
                          placeholder="Select"
                          isMulti={false}
                          isClearable
                          options={wareHouseOptions}
                          label="Warehouse"
                          isMandatory
                          classNamePrefix="react-select"
                          isDisabled={opacity}
                          // onChange={onWarehouseChange}
                        />
                      </InnerBody>
                    </FilterFormFields>
                  </PiModalBody>

                  <PiModalFooter>
                    {serverMsg !== "" && (
                      <div className="server-msg">{serverMsg}</div>
                    )}
                    <PiButton
                      appearance="primary"
                      label="Add"
                      onClick={formik.handleSubmit}
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
      <PiToast
        className={showPopup ? "show" : ""}
        headerLabel=" Create Stock Line Item"
        message="Stock Line Item Created Successfully "
        onClose={async () => setShowPopup(false)}
      />
    </>
  );
}

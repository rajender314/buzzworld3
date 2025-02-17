/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import {
  PiBackSection,
  PiButton,
  PiIconInputForm,
  PiInputForm,
  PiSelectForm,
  PiSpinner,
  PiToast,
  PiTypography,
} from "pixel-kit";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BackSection,
  HeaderContainer,
  RepairIds,
  RepairIdsDiv,
} from "@app/components/detail-view-header/detail-view-header.component";
import RepairsImg from "@app/assets/images/specialPricing.svg";
import SpPlusIconImg from "@app/assets/images/spPlusIcon.svg";
import { AsyncSelect } from "@atlaskit/select";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import { SideDrawerFooter } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import {
  AsyncLabel,
  CmpanyOptionDiv,
} from "@app/components/rmaModel/RmaModel.component";
import { ApiResponse, FilterColumnProps } from "@app/services/schema/schema";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { SideDrawerContainer } from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import { Formik, Form, FieldArray, Field } from "formik";
import {
  PricingConfiguatorFormProps,
  PricingRuleFormProps,
} from "@app/modules/specialPricing/schema/specialPricingSchema";
import moment from "moment";
import {
  SpinnerDiv,
  UploadNote,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import { useHistory, useLocation, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import {
  getLocalStorage,
  setLocalStorage,
} from "@app/core/localStorage/localStorage";
import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";
import OverRideConfirm from "./over-ride-confirm";
import SPPreview from "../sp-preview/sp-preview";
import { ConfiguratorValidationSchema } from "./configurator-validation-schema";
import {
  AddAnotherRowBtn,
  PricingFieldSection,
  PricingRuleField,
} from "./pricing-rule-configurator.component";
import { DateRangePickerDiv } from "../sp-left-filter/sp-left-filter.component";
import BackArrowDiv from "../sp-secondary-header/sp-secondary-header.component";

export default function EditPricingRuleConfigurator() {
  const location: any = useLocation();
  const { id }: RouteParams = useParams();

  const [serverMsg, setServerMsg] = useState(null);
  const { current }: any = useRef({ timer: 0 });
  const [confirmText, setConfirmText] = useState<any>();
  const [openConFirm, setConFirm] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [isApplyBtnLoading, setApplyIsBtnLoading] = useState(false);
  const [initialValues, setInitialvalues]: any = useState({
    account_type: "",
    organizations_id: "",
    date_range: "",
    quote_number: "",
    pricing_rules: [
      {
        supplier: "",
        type: "",
        type_value: "",
        discount_codes: "",
        fixed_value: "",
        item_range_specification: "",
        starting_with: "",
        ending_with: "",
        items: "",
        buy_side_discount: "",
        buy_price: "",
      },
    ],
  });
  const [dateRange, setDateRange] = useState<any>([null, null]);
  const [startDate, endDate] = dateRange;
  const minDate = new Date();
  const [customerName, setCustomerName]: any = useState("");
  const [loading, setloading] = useState(true);
  const pricingRuleType = [
    { label: "Markup", value: "markup" },
    { label: "Discount", value: "discount" },
  ];
  const pricingRangeType = [
    { label: "Item Range", value: "item_range" },
    { label: "Specific Item", value: "specification" },
  ];
  const [openSnackbar, setSnackbar] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const formik = useRef<any>(null);
  const history = useHistory();
  const [accountTypeList, setAccountTypeList] = useState([]);
  const [suppliersList, setSuppliersList] = useState([]);
  const [discountCodes, setDiscountCodes] = useState([]);
  let [isOverRideData, setOverRideData] = useState(false);
  let [isExclude, setIsExclude] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewParams, setPreviewParams] = useState({});
  const [clickedBtnName, setClickedBtnName] = useState("");
  const [spData, setSpData] = useState<Array<PricingRuleFormProps>>();
  const [showAddRow, setShowAddRow] = useState(true);
  const [startdate, setStartdate] = useState(
    location.state ? moment(location.state.start_date).format("YYYY-MM-DD") : ""
  );
  const [enddate, setEnddate] = useState(
    location.state ? moment(location.state.end_date).format("YYYY-MM-DD") : ""
  );
  const [selectedItems, setSelectedItems]: any = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedAccType, setSelectedAccType] = useState("");
  const [selectedDiscontCode, setSelectedDiscontCode] = useState("");

  const SPAEditInfo = useCallback(
    (id2: string) => {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.SPAEditInfo}/${id2}`,
        headers: {},
      };

      triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            setloading(false);

            const { data } = response.result;
            initialValues.account_type = data.account_type;
            initialValues.organizations_id = data.organizations_id;
            initialValues.date_range = [];
            initialValues.quote_number = data.quote_number;
            initialValues.pricing_rules[0].supplier = data.sp_data.supplier;
            initialValues.pricing_rules[0].type = data.sp_data.type;
            initialValues.pricing_rules[0].type_value = data.sp_data.type_value;
            initialValues.pricing_rules[0].discount_codes =
              data.sp_data.discount_codes;
            initialValues.pricing_rules[0].item_range_specification = data
              .sp_data.item_range_specification
              ? data.sp_data.item_range_specification.value
              : data.sp_data.item_range_specification;
            initialValues.pricing_rules[0].starting_with =
              data.sp_data.starting_with;
            initialValues.pricing_rules[0].ending_with =
              data.sp_data.ending_with;
            initialValues.pricing_rules[0].items = data.sp_data.items;
            setStartdate(
              data.start_date
                ? moment(data.start_date, "MM-DD-YYYY").format("YYYY-MM-DD")
                : ""
            );
            setEnddate(
              data.end_date
                ? moment(data.end_date, "MM-DD-YYYY").format("YYYY-MM-DD")
                : ""
            );
            setDateRange([
              new Date(
                moment(data.start_date, "MM-DD-YYYY").format("YYYY-MM-DD")
              ),
              new Date(
                moment(data.end_date, "MM-DD-YYYY").format("YYYY-MM-DD")
              ),
            ]);
            setInitialvalues(initialValues);

            formik.current.setFieldValue(
              `pricing_rules.${0}.item_range_specification`,
              data.sp_data.item_range_specification
            );
            formik.current.setFieldValue(
              `pricing_rules.${0}.items`,
              data.sp_data.items
            );
            formik.current.setFieldValue(
              `pricing_rules.${0}.starting_with`,
              data.sp_data.starting_with
            );
            formik.current.setFieldValue(
              `pricing_rules.${0}.ending_with`,
              data.sp_data.ending_with
            );

            formik.current.setFieldValue(
              `pricing_rules.${0}.fixed_value`,
              data.sp_data.fixed_value
            );
            formik.current.setFieldValue(
              `pricing_rules.${0}.buy_side_discount`,
              data.sp_data.buy_side_discount
            );
            formik.current.setFieldValue(
              `pricing_rules.${0}.buy_price`,
              data.sp_data.buy_price
            );
            setSelectedItems(data.sp_data.items);
            if (data.sp_data.items && data.sp_data.items.length > 1) {
              formik.current.setFieldValue(
                `pricing_rules.${0}.fixed_value`,
                ""
              );
            }
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    },
    [initialValues]
  );

  useEffect(() => {
    SPAEditInfo(id);
    setShowAddRow(false);
  }, [SPAEditInfo, id]);
  const getSpData = useCallback((index: any) => {
    let slicedArray: any = [];
    if (formik.current.values.pricing_rules.length > 1) {
      const data: any = getLocalStorage("FormikArray");
      slicedArray = JSON.parse(data);
      slicedArray.splice(index, 1);
      return slicedArray;
    }
    return slicedArray;
  }, []);
  // const [prefillData, setPrefillData]: any = useState('')

  const getSuppliersList = useCallback(
    (indx?: any) => {
      const params = {
        status: true,
        is_add_row: !!(
          formik.current && formik.current.values.pricing_rules.length > 1
        ),
        sp_data: indx > -1 ? getSpData(indx) : spData,
      };
      const apiObject = {
        payload: params,
        method: "POST",
        apiUrl: `${EndpointUrl.SPVendors}`,
        headers: {},
      };
      triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            const { list } = response.result.data;

            setSuppliersList(list);
            setloading(false);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    },
    [getSpData, spData]
  );
  const getAccountList = () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.SPAccountTypes}?status=true&sort=asc`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          let arr = [];
          const { list } = response.result.data;
          arr = list.map((item: FilterColumnProps) => ({
            value: item.id,
            label: item.name,
            ...item,
          }));
          setAccountTypeList(arr);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAccountList();
    getSuppliersList();
  }, [getSuppliersList]);

  function handleRef(e: any) {
    console.log(e);
    formik.current = e;
    if (formik.current && formik.current.values) {
      setLocalStorage(
        "FormikArray",
        JSON.stringify(formik.current.values.pricing_rules)
      );
    }
  }

  const getDiscountCodes = (indx?: any) => {
    const params = {
      status: true,
      is_add_row: formik.current.values.pricing_rules.length > 1,
      vendor_id: selectedSupplier,
      sp_data: indx > -1 ? getSpData(indx) : spData,
    };
    const apiObject = {
      payload: params,
      method: "POST",
      apiUrl: `${EndpointUrl.SPDiscountCodes}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const { list } = response.result.data;
          setDiscountCodes(list);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const filterCustomerData = async (inputValue: string) => {
    let data: any = [];
    console.log(inputValue);
    if (inputValue.length >= 3) {
      let url = "";
      if (selectedAccType) {
        url = `${EndpointUrl.SPOrgData}?search=${inputValue}&account_type[0]=${selectedAccType}`;
      } else {
        url = `${EndpointUrl.SPOrgData}?search=${inputValue}`;
      }
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: url,
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
              // label: item.name,
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
        .catch((err: string) => {
          console.log(err);
        });
      return data;
    }
    return data;
  };
  const filterDiscountList = async (inputValue: string) => {
    let options: any = [];
    if (inputValue.length >= 1) {
      const params = {
        // status: true,
        // is_add_row:
        //  formik.current.values.pricing_rules.length > 1 ? true : false,
        /// /sp_data: spData,
        // sp_data: getSpData(),
        // vendor_id: selectedSupplier,
        // type:
        //  initialValues.pricing_rules[initialValues.pricing_rules.length - 1]
        //    .item_range_specification,
        // item_search: inputValue,
        // starting_with: '',
        // ending_with: '',
        // discount_code: selectedDiscontCode,
        // items: selectedItems

        status: true,
        is_add_row: formik.current.values.pricing_rules.length > 1,
        vendor_id: selectedSupplier,
        sp_data: spData,
        search: inputValue,
      };
      const apiObject = {
        payload: params,
        method: "POST",
        apiUrl: `${EndpointUrl.SPDiscountCodes}`,
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
              label: item.name,
              ...item,
            }));
            options = arr;
            setDiscountCodes(options);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
      return options;
    }
    return options;
  };
  const filterItemsList = async (inputValue: string, index: any) => {
    let options: any = [];
    if (inputValue.length >= 3) {
      const params = {
        status: true,
        is_add_row: formik.current.values.pricing_rules.length > 1,
        // sp_data: spData,
        sp_data: getSpData(index),
        vendor_id: formik.current.values.pricing_rules[index].supplier.value,
        type: formik.current.values.pricing_rules[index]
          .item_range_specification.value,
        item_search: inputValue,
        starting_with: formik.current.values.pricing_rules[index].starting_with,
        ending_with: formik.current.values.pricing_rules[index].ending_with,
        discount_code:
          formik.current.values.pricing_rules[index].discount_codes,
        pricing_rules_configurator: true,

        // items: selectedItems
      };
      const apiObject = {
        payload: params,
        method: "POST",
        apiUrl: `${EndpointUrl.SPItems}`,
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
              label: item.name,
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
  const promiseOptions = (
    inputValue: string,
    flag: string,
    index: number | null
  ) =>
    new Promise((resolve) => {
      if (current.timer) clearTimeout(current.timer);
      current.timer = setTimeout(() => {
        if (flag === "companylist") {
          resolve(filterCustomerData(inputValue));
        } else if (flag === "discount_list") {
          resolve(filterDiscountList(inputValue));
        } else {
          resolve(filterItemsList(inputValue, index));
        }
      }, 1000);
    });
  const handleInputChange = (newValue: string, index: number) => {
    console.log(newValue, index);
    return newValue;

    // }, 1000)
  };
  const handleOrgInputChange = (newValue: string) => {
    console.log(newValue);
    return newValue;

    // }, 1000)
  };

  const HandleChange = (value: any) => {
    if (value) {
      const obj: any = { value: value.value, label: value.label };
      setCustomerName(obj);
    } else {
      setCustomerName("");
    }
  };

  const resetArrayValues = (
    indx: number,
    replace: (index: number, value: any) => void
  ) => {
    const newValues = {
      supplier: formik.current.values.pricing_rules[indx].supplier,
      type: formik.current.values.pricing_rules[indx].type,
      type_value: formik.current.values.pricing_rules[indx].type_value,
      discount_codes: selectedDiscontCode,
      fixed_value: "",
      item_range_specification: "",
      starting_with: "",
      ending_with: "",
      items: "",
      buy_side_discount: "",
      buy_price: "",
    };
    replace(indx, newValues);
    initialValues.pricing_rules[indx].item_range_specification = "";
    setInitialvalues(initialValues);
  };
  const resetOnItemsChange = (
    indx: number,
    replace: (index: number, value: any) => void
  ) => {
    const newValues = {
      supplier: formik.current.values.pricing_rules[indx].supplier,
      type: formik.current.values.pricing_rules[indx].type,
      type_value: formik.current.values.pricing_rules[indx].type_value,
      discount_codes: formik.current.values.pricing_rules[indx].discount_codes,
      fixed_value: "",
      item_range_specification: "",
      starting_with: "",
      ending_with: "",
      items: "",
      buy_side_discount: "",
      buy_price: "",
    };
    replace(indx, newValues);
    initialValues.pricing_rules[indx].item_range_specification = "";
    setInitialvalues(initialValues);
  };
  const HandleItemsChange = (
    value2: any,
    indx: any,
    replace: (index: number, value: any) => void
  ) => {
    let items = [];
    if (value2.length) {
      items = value2;
      setSelectedItems(items);
      if (value2.length > 1) {
        formik.current.setFieldValue(`pricing_rules.${indx}.fixed_value`, "");
        formik.current.setFieldValue(`pricing_rules.${indx}.buy_price`, "");
      }
    } else {
      resetOnItemsChange(indx, replace);
      setSelectedItems("");
    }
  };
  const submitForm = (data: any) => {
    console.log(data);
  };
  const resetValuesonSupplierChange = (
    e: any,
    indx: number,
    replace: (index: number, value: any) => void
  ) => {
    const newValues = {
      supplier: e,
      type: "",
      type_value: "",
      discount_codes: "",
      fixed_value: "",
      item_range_specification: "",
      starting_with: "",
      ending_with: "",
      items: "",
      buy_side_discount: "",
      buy_price: "",
    };
    replace(indx, newValues);
    initialValues.pricing_rules[indx].item_range_specification = "";
    setInitialvalues(initialValues);
  };

  const getSpecialPrice = () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.SpecialPrice}?organizations_id=${customerName}&page=${1}&perPage=${25}&vendor_id[0]=${selectedSupplier}`,
      headers: {},
    };

    triggerApi(apiObject)
      .then(() => {})
      .catch((err: string) => {
        console.log(err);
      });
  };
  const onSupplierChange = (
    e: any,
    indx: number,
    replace: (index: number, value: any) => void
  ) => {
    if (e) {
      resetValuesonSupplierChange(e, indx, replace);
      setSelectedSupplier(e.value);
      getDiscountCodes();
      getSpecialPrice();
    } else {
      resetValuesonSupplierChange("", indx, replace);
      setSelectedSupplier("");
      getDiscountCodes();
      getSpecialPrice();
    }
  };

  const addRow = (
    values: PricingConfiguatorFormProps,
    pushData: (e: PricingRuleFormProps) => void,
    handleSubmit: any
  ) => {
    handleSubmit();
    if (formik.current.isValid === true) {
      setSelectedDiscontCode("");
      const newValues = {
        supplier: "",
        type: "",
        type_value: "",
        discount_codes: "",
        fixed_value: "",
        item_range_specification: "",
        starting_with: "",
        ending_with: "",
        items: "",
        buy_side_discount: "",
        buy_price: "",
      };
      pushData(newValues);
      // values.pricing_rules.push(newValues)
      initialValues.pricing_rules.push(newValues);
      setInitialvalues(initialValues);
      setSpData(values.pricing_rules);
      // handleSubmit()

      setTimeout(() => {
        getSuppliersList();
      }, 500);
    }
  };
  const onAccTypeChange = (e: any) => {
    if (e) {
      setSelectedAccType(e.value);
    } else {
      setSelectedAccType("");
    }
    formik.current.setFieldValue("organizations_id", "");
  };
  const onItemChange = (
    e: any,
    values: any,
    indx: number,
    replace: (index: number, value: any) => void
  ) => {
    if (e) {
      initialValues.pricing_rules[indx].item_range_specification = e.value;
      setInitialvalues(initialValues);
      if (e.value === "item_range") {
        formik.current.setFieldValue(`pricing_rules.${indx}.items`, "");
        formik.current.setFieldValue(`pricing_rules.${indx}.fixed_value`, "");
        formik.current.setFieldValue(`pricing_rules.${indx}.buy_price`, "");
      } else {
        formik.current.setFieldValue(`pricing_rules.${indx}.starting_with`, "");
        formik.current.setFieldValue(`pricing_rules.${indx}.ending_with`, "");
      }
    } else {
      initialValues.pricing_rules[indx].item_range_specification = "";
      setInitialvalues(initialValues);
      resetOnItemsChange(indx, replace);
    }
    console.log(indx);
    // values.pricing_rules[indx]['item_range_specification'] = e.value
  };
  const onChangeMarkupType = (e: any, indx: number) => {
    if (e) {
      initialValues.pricing_rules[indx].type = e;
      setInitialvalues(initialValues);
    } else {
      initialValues.pricing_rules[indx].type = "";
      setInitialvalues(initialValues);
      formik.current.setFieldValue(`pricing_rules.${indx}.type_value`, "");
    }
  };

  const onDiscountCodesChange = (
    e: any,
    indx: number,
    replace: (index: number, value: any) => void,
    actionMeta: any
  ) => {
    setSelectedDiscontCode(e);
    if (actionMeta.action === "remove-value") {
      resetArrayValues(indx, replace);
    }
    //  if (e && e.length) {
    //  initialValues.pricing_rules[indx].discount_codes = e.value
    //  setInitialvalues(initialValues)
    // } else {
    //  initialValues.pricing_rules[indx].discount_codes = ''
    //  setInitialvalues(initialValues)
    //  resetArrayValues(indx, replace)
    // }
  };
  const onDiscountFocus = (e: any, indx: number) => {
    // formik.current.values.pricing_rules[indx].supplier
    const supplierId = formik.current.values.pricing_rules[indx].supplier
      ? formik.current.values.pricing_rules[indx].supplier.value
      : "";
    setSelectedSupplier(supplierId);
    getDiscountCodes(indx);
  };
  const onSupplierFocus = (e: any, indx: number) => {
    getSuppliersList(indx);
  };
  let [isCheck, setIsCheck] = useState(true);
  const updateSpecialPriceData = (type: string) => {
    setClickedBtnName(type);
    if (formik.current.isValid) {
      if (type === "apply_rule") {
        setApplyIsBtnLoading(true);
      } else {
        setIsBtnLoading(true);
      }
      setloading(true);
      const params: any = {
        organizations_id:
          formik.current.values.organizations_id.id ||
          formik.current.values.organizations_id.value,
        organizations_label:
          formik.current.values.organizations_id.name ||
          formik.current.values.organizations_id.label,
        sp_data: formik.current.values.pricing_rules,
        is_preview: type === "preview_items",
        is_override: isOverRideData,
        is_exclude: isExclude,
        start_date: startdate,
        end_date: enddate,
        is_check: isCheck,
        quote_number: formik.current.values.quote_number,
        sp_card_id: id,
      };

      const apiObject = {
        payload: params,
        method: "POST",
        apiUrl: `${EndpointUrl.SpecialPrice}`,
        headers: {},
      };
      triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            if (response.result.data.is_override_popup === true) {
              const obj = {
                header: "Confirmation",
                content: response.result.data.message,
                props: {
                  label: "sp-override",
                },
              };
              setConfirmText(obj);
              setConFirm(true);
              setloading(false);
            } else if (response.result.data.is_check_popup === true) {
              const obj = {
                header: "Confirmation",
                content: response.result.data.message,
                props: {
                  label: "sp-check",
                },
              };
              setConfirmText(obj);
              setConFirm(true);
              setloading(false);
            } else {
              params.time_stamp = response.result.data.timestamp;
              setPreviewParams(params);
              setShowPreview(type === "preview_items");
              setloading(false);
              if (type === "apply_rule") {
                setPreviewParams(params);
                setToastMsg("Applied Successfully");
                setSnackbar(true);
              }
              // if (type === 'preview_items') {
              //  history.push(
              //    `/special-pricing/pricing-rule-configurator/preview/${data}`, params
              //  )
              // }
            }
          } else {
            setServerMsg(response.result.data);
            setloading(false);
            setIsBtnLoading(false);
            setApplyIsBtnLoading(false);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  };

  const onDateRangeChange = (update: any, form: any) => {
    console.log(update);
    if (!update[0] || !update[1]) {
      form.setFieldValue("date_range", "");
    } else {
      form.setFieldValue("date_range", update);
    }
    setStartdate(update[0] ? moment(update[0]).format("YYYY-MM-DD") : "");
    setEnddate(update[1] ? moment(update[1]).format("YYYY-MM-DD") : "");
    setDateRange(update);
  };

  async function getConfirmModelEvent(e: any) {
    console.log(e);
    if (e.proceed) {
      if (e.selectedId === "override") {
        isOverRideData = true;
        setOverRideData(true);
        updateSpecialPriceData(clickedBtnName);
      } else if (e.selectedId === "exclude") {
        isExclude = true;
        setIsExclude(true);
        updateSpecialPriceData(clickedBtnName);
      } else {
        isCheck = false;
        setIsCheck(isCheck);
        isExclude = false;
        setIsExclude(false);
        updateSpecialPriceData(clickedBtnName);
      }
    } else {
      setIsBtnLoading(false);
      setApplyIsBtnLoading(false);
    }

    setConFirm(false);
  }

  const triggerEventData = async (e: any) => {
    if (e.close) {
      setOverRideData(false);
      setIsExclude(false);
      setIsCheck(isCheck);
      setShowPreview(false);
    }
    setIsBtnLoading(false);
  };
  const triggerSnackBarEvent = async () => {
    setSnackbar(false);
    setTimeout(() => {
      history.push("/special-pricing", previewParams);
    }, 100);
  };
  const onChangeCmpny = (value: any, form: any) => {
    console.log(form, formik, value);
    if (value) {
      const obj: any = { value: value.value, label: value.name };
      formik.current.setFieldValue("organizations_id", obj);
      HandleChange(value);
    } else {
      form.setFieldValue("organizations_id", value);
      HandleChange(value);
    }
  };
  const onDateBlur = (e: any) => {
    const s1: any = new Date(e.target.value.split("-")[0]);
    const s2: any = new Date(e.target.value.split("-")[1]);
    const dateFormat = "DD-MM-YYYY";
    const fromDateFormat = moment(s1).format(dateFormat);
    const toDateFormat = moment(s2).format(dateFormat);
    if (moment(fromDateFormat, dateFormat, true).isValid()) {
      setStartdate(moment(s1).format("YYYY-MM-DD"));
    }
    if (moment(toDateFormat, dateFormat, true).isValid()) {
      setEnddate(moment(s2).format("YYYY-MM-DD"));
    }
    if (
      moment(fromDateFormat, dateFormat, true).isValid() &&
      moment(toDateFormat, dateFormat, true).isValid()
    ) {
      setDateRange([s1, s2]);
    }
  };
  return (
    <>
      <HeaderContainer>
        <BackSection>
          <BackArrowDiv>
            <PiBackSection
              backOptions={{
                name: "",
                route: "/special-pricing",
              }}
            />
          </BackArrowDiv>
          <RepairIdsDiv>
            <img
              className="repair-view-left-image"
              src={RepairsImg}
              alt="loading"
            />
            <RepairIds>
              <div className="id-num">Pricing Rules Configurator</div>
            </RepairIds>
          </RepairIdsDiv>
        </BackSection>
      </HeaderContainer>
      {/* {!showPreview && ( */}
      <SideDrawerContainer
        style={{ overflow: "auto" }}
        className={loading ? "opacity-on-load" : ""}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={ConfiguratorValidationSchema}
          onSubmit={submitForm}
          innerRef={(e: any) => handleRef(e)}
          validateOnMount
        >
          {({ values, isValid, handleSubmit }) => (
            <Form className="form">
              <FieldArray name="pricing_rules">
                {({ insert, remove, push, replace }) => (
                  <>
                    <FormBodyOverFlow
                      style={{
                        padding: "24px",
                        height: "100%",
                        // margin: '0 auto',
                        background: "#fff",
                        width: "100%",
                      }}
                      className="responsive"
                    >
                      <PricingRuleField style={{ gap: "16px" }}>
                        <div className="each-div">
                          <PiSelectForm
                            name="account_type"
                            label="Account Type (Optional)"
                            placeholder="Select"
                            isMulti={false}
                            options={accountTypeList}
                            onChange={onAccTypeChange}
                            isClearable
                            classNamePrefix="react-select"
                            isDisabled={!showAddRow}
                            noOptionsMessage=" Account Type Not Found"
                          />
                        </div>
                        <div className="each-div">
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
                          <Field name="organizations_id">
                            {({ field, form, meta }: any) => (
                              <>
                                <AsyncSelect
                                  name="organizations_id"
                                  inputId="async-select-example"
                                  classNamePrefix="react-select"
                                  onInputChange={handleOrgInputChange}
                                  loadOptions={(e: any) =>
                                    promiseOptions(e, "companylist", null)
                                  }
                                  placeholder="Search"
                                  // onChange={(value) => {
                                  //  setFieldValue(`organizations_id`, value)
                                  //  HandleChange(value)
                                  // }}
                                  onChange={(e: any) => onChangeCmpny(e, form)}
                                  value={field.value}
                                  isClearable
                                  isDisabled={!showAddRow}
                                  // isMulti
                                  noOptionsMessage={(obj: any) =>
                                    !obj.inputValue
                                      ? "Search by Company Name"
                                      : " Company Name Not Found"
                                  }
                                />
                                <small className="validation-error">
                                  {meta.touched && meta.error ? meta.error : ""}
                                </small>
                              </>
                            )}
                          </Field>
                        </div>
                        <DateRangePickerDiv className="each-div">
                          <AsyncLabel htmlFor="async-select-example">
                            Date Range
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
                          <Field name="date_range">
                            {({ field, form, meta }: any) => (
                              <>
                                <DatePicker
                                  name="date_range"
                                  selectsRange
                                  startDate={startDate}
                                  endDate={endDate}
                                  onChange={(update: any) =>
                                    onDateRangeChange(update, form)
                                  }
                                  placeholderText="MM/DD/YYYY-MM/DD/YYYY"
                                  className="date-range-input"
                                  minDate={minDate}
                                  onBlur={onDateBlur}
                                  isClearable
                                />

                                <small className="validation-error">
                                  {meta.touched && meta.error ? meta.error : ""}
                                </small>
                              </>
                            )}
                          </Field>
                        </DateRangePickerDiv>
                        <div className="each-div">
                          <PiInputForm
                            name="quote_number"
                            label="Client Quote Number"
                            placeholder="Enter Client Quote Number"
                            isDisabled={!showAddRow}
                            isMandatory
                          />
                        </div>
                      </PricingRuleField>
                      <PricingFieldSection>
                        <PiTypography component="h4">
                          Pricing Rules
                        </PiTypography>
                        {values.pricing_rules.length > 0 &&
                          values.pricing_rules.map(
                            (friend: any, index: number) => (
                              <div
                                style={{
                                  borderBottom:
                                    "1px solid var(--greyCardBorder)",
                                }}
                              >
                                <PricingRuleField className="pricing-rules-fields-div">
                                  <div
                                    className="w-100-div"
                                    style={{
                                      display: "flex",
                                      gap: "16px",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "calc(50% - 16px)",
                                        display: "flex",
                                        gap: "16px",
                                      }}
                                    >
                                      <div className="w-40-div">
                                        <PiSelectForm
                                          name={`pricing_rules.${index}.supplier`}
                                          label="Suppliers"
                                          placeholder="Select"
                                          isMulti={false}
                                          options={suppliersList}
                                          onChange={(e: any) =>
                                            onSupplierChange(e, index, replace)
                                          }
                                          onFocus={(e: any) =>
                                            onSupplierFocus(e, index)
                                          }
                                          isClearable
                                          classNamePrefix="react-select"
                                          isDisabled={!showAddRow}
                                          isMandatory
                                        />
                                      </div>
                                      <div className="w-40-div">
                                        <PiSelectForm
                                          name={`pricing_rules.${index}.discount_codes`}
                                          label="Discount Codes (Optional)"
                                          placeholder="Select"
                                          classNamePrefix={
                                            selectedDiscontCode.length
                                              ? "multi-select react-select"
                                              : "react-select"
                                          }
                                          isMulti
                                          options={discountCodes}
                                          onChange={(e: any, actionMeta: any) =>
                                            onDiscountCodesChange(
                                              e,
                                              index,
                                              replace,
                                              actionMeta
                                            )
                                          }
                                          onFocus={(e: any) =>
                                            onDiscountFocus(e, index)
                                          }
                                          isDisabled={
                                            !initialValues.pricing_rules[index]
                                              .supplier
                                          }
                                          noOptionsMessage=" Discount Codes Not Found"
                                        />
                                      </div>
                                    </div>
                                    <div
                                      className=""
                                      style={{
                                        display: "flex",
                                        gap: "16px",
                                        width: "calc(50% - 16px)",
                                        // width: " calc(50% - 8px)",
                                        // width: "100%",
                                      }}
                                    >
                                      <div
                                        className={
                                          initialValues.pricing_rules[index]
                                            .item_range_specification ===
                                          "item_range"
                                            ? " w-50-div  w-50-div  d-flex  w-100-div"
                                            : " w-50-div  d-flex w-100-div w-100-div"
                                        }
                                        style={{
                                          display: "flex",
                                          gap: "16px",
                                        }}
                                      >
                                        <div className="item-range-select">
                                          <PiSelectForm
                                            name={`pricing_rules.${index}.item_range_specification`}
                                            label="Item Range / Specific Item (Optional)"
                                            placeholder="Select"
                                            isMulti={false}
                                            options={pricingRangeType}
                                            onChange={(e: any) =>
                                              onItemChange(
                                                e,
                                                values,
                                                index,
                                                replace
                                              )
                                            }
                                            isClearable
                                            classNamePrefix="react-select"
                                            noOptionsMessage=" Item Range / Specific Item Not Found"
                                            isDisabled={
                                              !initialValues.pricing_rules[
                                                index
                                              ].supplier
                                            }
                                          />
                                        </div>
                                        {initialValues.pricing_rules[index]
                                          .item_range_specification ===
                                          "item_range" && (
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              width: "calc(50% - 16px)",
                                            }}
                                          >
                                            <p
                                              className="label"
                                              style={{ margin: "0" }}
                                            >
                                              Item Number Range
                                            </p>
                                            <div
                                              style={{
                                                // width: "calc(50% - 16px)",
                                                width: "100%",
                                                display: "flex",
                                                gap: "16px",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  width: "50%",

                                                  display: "flex",
                                                  marginBottom: "4px",
                                                }}
                                              >
                                                <PiInputForm
                                                  name={`pricing_rules.${index}.starting_with`}
                                                  label=""
                                                  placeholder="Enter Start"
                                                  isDisabled={
                                                    !initialValues
                                                      .pricing_rules[index]
                                                      .supplier
                                                  }
                                                />
                                              </div>
                                              <div
                                                style={{
                                                  width: "50%",

                                                  display: "flex",
                                                  marginBottom: "4px",
                                                }}
                                              >
                                                <PiInputForm
                                                  name={`pricing_rules.${index}.ending_with`}
                                                  label=""
                                                  placeholder="Enter End"
                                                  isDisabled={
                                                    !initialValues
                                                      .pricing_rules[index]
                                                      .supplier
                                                  }
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                        {initialValues.pricing_rules[index]
                                          .item_range_specification ===
                                          "specification" && (
                                          <div
                                            className="reduce-select-dropdown-height items-dropdown"
                                            style={{
                                              width: "calc(50% - 16px)",
                                            }}
                                          >
                                            <AsyncLabel
                                              htmlFor="async-select-example"
                                              className="css-re7y6x"
                                            >
                                              Items
                                            </AsyncLabel>
                                            <Field
                                              name={`pricing_rules.${index}.items`}
                                            >
                                              {({ field, form, meta }: any) => (
                                                <div className="items-async-field">
                                                  <AsyncSelect
                                                    name={`pricing_rules.${index}.items`}
                                                    inputId="async-select-example"
                                                    // classNamePrefix="react-select"
                                                    // classNamePrefix="multi-select react-select"
                                                    classNamePrefix={
                                                      field.value &&
                                                      field.value.length > 1
                                                        ? "multi-select react-select"
                                                        : "react-select"
                                                    }
                                                    onInputChange={(e: any) =>
                                                      handleInputChange(
                                                        e,
                                                        index
                                                      )
                                                    }
                                                    loadOptions={(e: any) =>
                                                      promiseOptions(
                                                        e,
                                                        "itemslist",
                                                        index
                                                      )
                                                    }
                                                    placeholder="Search by Items"
                                                    onChange={(value) => {
                                                      form.setFieldValue(
                                                        `pricing_rules.${index}.items`,
                                                        value
                                                      );
                                                      HandleItemsChange(
                                                        value,
                                                        index,
                                                        replace
                                                      );
                                                    }}
                                                    value={field.value}
                                                    // isClearable
                                                    isMulti
                                                    noOptionsMessage={(
                                                      obj: any
                                                    ) =>
                                                      !obj.inputValue
                                                        ? "Search Item Name"
                                                        : "Item Not Found"
                                                    }
                                                    isDisabled={
                                                      !initialValues
                                                        .pricing_rules[index]
                                                        .supplier
                                                    }
                                                  />
                                                  <small className="validation-error date-range-validation-error">
                                                    {meta.touched && meta.error
                                                      ? meta.error
                                                      : ""}
                                                  </small>
                                                </div>
                                              )}
                                            </Field>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* <div className="w-40-div">
                                  <div>
                                    <PiSelectForm
                                      name={`pricing_rules.${index}.type`}
                                      label="Markup(Our Price) % / Discount(List Price) %"
                                      placeholder="Select"
                                      isMulti={false}
                                      options={pricingRuleType}
                                      onChange={onChangeMarkupType}
                                      //isClearable={true}
                                      classNamePrefix="react-select"
                                      isDisabled={
                                        !initialValues.pricing_rules[index]
                                          .supplier
                                          ? true
                                          : false
                                      }
                                      isMandatory
                                    />
                                  </div>
                                  <div className="label-hidden">
                                    <PiInputForm
                                      name={`pricing_rules.${index}.type_value`}
                                      label="1"
                                      placeholder="0 %"
                                      isDisabled={
                                        !initialValues.pricing_rules[index]
                                          .supplier
                                          ? true
                                          : false
                                      }
                                    />
                                  </div>
                                </div> */}

                                    {/* {initialValues.pricing_rules[index]
                                    .item_range_specification ===
                                    "specification" && (
                                    <div className="icon_input w-100-div">
                                      <PiIconInputForm
                                        name={`pricing_rules.${index}.buy_side_discount`}
                                        label="Purchase Discount"
                                        placeholder="Purchase Discount"
                                        type="number"
                                        elemBeforeInput={
                                          <div
                                            style={{
                                              padding: "10px",
                                              color: "#6D7992",
                                              borderRight: "1px solid #d0d1d3",
                                            }}
                                          >
                                            %
                                          </div>
                                        }
                                        isDisabled={
                                          initialValues.pricing_rules[index]
                                            .item_range_specification ===
                                            "item_range" ||
                                          selectedItems.length > 1
                                            ? true
                                            : false
                                        }
                                      />
                                    </div>
                                  )} */}
                                    {/* <div className="icon_input item-range-select">
                                    <PiIconInputForm
                                      name={`pricing_rules.${index}.fixed_value`}
                                      label="Fixed Sales Price"
                                      placeholder="Fixed Sales Price"
                                      type="string"
                                      elemBeforeInput={
                                        <div
                                          style={{
                                            padding: "10px",
                                            color: "#6D7992",
                                            borderRight: "1px solid #d0d1d3",
                                          }}
                                        >
                                          $
                                        </div>
                                      }
                                      isDisabled={
                                        initialValues.pricing_rules[index]
                                          .item_range_specification ===
                                          "item_range" ||
                                        selectedItems.length > 1
                                          ? true
                                          : false
                                      }
                                    />
                                  </div> */}
                                    {/* {showAddRow && (
                                    <AddAnotherRowBtn className="row-del-img-div">
                                      <img
                                        className="row-del-img"
                                        src={RowDelImg}
                                        alt="loading"
                                        title="Delete Row"
                                        onClick={() => remove(index)}
                                      />
                                    </AddAnotherRowBtn>
                                  )} */}
                                  </div>

                                  <div
                                    style={{
                                      width: "100%",
                                      display: "flex",
                                      gap: "16px",
                                    }}
                                  >
                                    <div style={{ width: "calc(25% - 16px)" }}>
                                      <div>
                                        <PiTypography component="h4">
                                          Buy Side
                                        </PiTypography>
                                      </div>

                                      <div
                                        className="w-50 icon_input "
                                        style={{ display: "flex", gap: "15px" }}
                                      >
                                        <div className="icon_input ">
                                          <PiIconInputForm
                                            name={`pricing_rules.${index}.buy_side_discount`}
                                            label="Purchase Discount"
                                            placeholder="0"
                                            type="string"
                                            elemBeforeInput={
                                              <div
                                                style={{
                                                  padding: "10px",
                                                  color: "#6D7992",
                                                  borderRight:
                                                    "1px solid #d0d1d3",
                                                }}
                                              >
                                                %
                                              </div>
                                            }
                                            isDisabled={
                                              !!(
                                                initialValues.pricing_rules[
                                                  index
                                                ].item_range_specification ===
                                                  "item_range" ||
                                                selectedItems.length > 1
                                              )
                                            }
                                          />
                                        </div>

                                        {initialValues.pricing_rules[index]
                                          .item_range_specification ===
                                          "specification" &&
                                          selectedItems.length < 2 && (
                                            <PiIconInputForm
                                              name={`pricing_rules.${index}.buy_price`}
                                              label="Buy Price"
                                              placeholder="0"
                                              type="string"
                                              elemBeforeInput={
                                                <div
                                                  style={{
                                                    padding: "10px",
                                                    color: "#6D7992",
                                                    borderRight:
                                                      "1px solid #d0d1d3",
                                                  }}
                                                >
                                                  $
                                                </div>
                                              }
                                              isDisabled={
                                                !!(
                                                  !initialValues.pricing_rules[
                                                    index
                                                  ].supplier ||
                                                  selectedItems.length > 1
                                                )
                                              }
                                            />
                                          )}
                                      </div>
                                    </div>

                                    <div style={{ width: "calc(50% - 16px)" }}>
                                      <div>
                                        <PiTypography component="h4">
                                          Sell Side
                                        </PiTypography>
                                      </div>
                                      <div
                                        style={{ display: "flex", gap: "16px" }}
                                      >
                                        <div
                                          style={{
                                            width: "calc(50% - 8px)",
                                            display: "flex",
                                            gap: "16px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              gap: "4px",
                                              width: "100%",
                                            }}
                                          >
                                            <p
                                              className="label"
                                              style={{
                                                whiteSpace: "nowrap",
                                                minWidth: "300px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                margin: "0",
                                              }}
                                              title={`Markup(Our Price) % /
                                              Discount(List Price) %`}
                                            >
                                              Markup(Our Price) % /
                                              Discount(List Price) %
                                            </p>
                                            <div
                                              style={{
                                                display: "flex",
                                                gap: "16px",
                                              }}
                                            >
                                              <PiSelectForm
                                                name={`pricing_rules.${index}.type`}
                                                placeholder="Select"
                                                isMulti={false}
                                                options={pricingRuleType}
                                                onChange={(e: any) =>
                                                  onChangeMarkupType(e, index)
                                                }
                                                // isClearable={true}
                                                classNamePrefix="react-select"
                                                isMandatory
                                                isDisabled={
                                                  !initialValues.pricing_rules[
                                                    index
                                                  ].supplier
                                                }
                                                isClearable
                                                noOptionsMessage="No Data Found"
                                              />

                                              <div
                                                className="w-20-div label-hidden icon_input"
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                  margin: "4px 0 0",
                                                }}
                                              >
                                                <PiIconInputForm
                                                  name={`pricing_rules.${index}.type_value`}
                                                  placeholder="0"
                                                  type="string"
                                                  elemBeforeInput={
                                                    <div
                                                      style={{
                                                        padding: "10px",
                                                        color: "#6D7992",
                                                        borderRight:
                                                          "1px solid #d0d1d3",
                                                      }}
                                                    >
                                                      %
                                                    </div>
                                                  }
                                                  isDisabled={
                                                    !!(
                                                      !initialValues
                                                        .pricing_rules[index]
                                                        .supplier ||
                                                      !initialValues
                                                        .pricing_rules[index]
                                                        .type
                                                    )
                                                  }
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="icon_input">
                                          {initialValues.pricing_rules[index]
                                            .item_range_specification ===
                                            "specification" &&
                                            selectedItems.length < 2 && (
                                              <PiIconInputForm
                                                name={`pricing_rules.${index}.fixed_value`}
                                                label="Fixed Sales Price"
                                                placeholder="0"
                                                type="string"
                                                elemBeforeInput={
                                                  <div
                                                    style={{
                                                      padding: "10px",
                                                      color: "#6D7992",
                                                      borderRight:
                                                        "1px solid #d0d1d3",
                                                    }}
                                                  >
                                                    $
                                                  </div>
                                                }
                                                isDisabled={
                                                  !!(
                                                    initialValues.pricing_rules[
                                                      index
                                                    ]
                                                      .item_range_specification ===
                                                      "item_range" ||
                                                    selectedItems.length > 1
                                                  )
                                                }
                                              />
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </PricingRuleField>
                                {initialValues.pricing_rules[index]
                                  .item_range_specification ===
                                  "item_range" && (
                                  <div style={{ paddingBottom: "10px" }}>
                                    <UploadNote className="for-item-range-notes">
                                      <span className="asterik">*</span>
                                      Discount % will be applied for the items
                                      in the specified series
                                    </UploadNote>
                                  </div>
                                )}
                              </div>
                            )
                          )}
                        {showAddRow && (
                          <AddAnotherRowBtn>
                            <div
                              className="add-row-div"
                              onClick={() => addRow(values, push, handleSubmit)}
                              onKeyDown={(event) => {
                                if (
                                  event.key === "Enter" ||
                                  event.key === " "
                                ) {
                                  addRow(values, push, handleSubmit);
                                }
                              }}
                              role="button"
                              tabIndex={0}
                            >
                              <img src={SpPlusIconImg} alt="loading" />
                              <p className="add-row-text">Add another row</p>
                            </div>
                          </AddAnotherRowBtn>
                        )}
                      </PricingFieldSection>
                    </FormBodyOverFlow>
                    <SideDrawerFooter>
                      {serverMsg && (
                        <div className="server-msg">{serverMsg}</div>
                      )}
                      <PiButton
                        type="submit"
                        appearance="secondary"
                        label="Apply Rule"
                        // isLoading={isApplyBtnLoading ? true : false}
                        isDisabled={isApplyBtnLoading}
                        onClick={() => updateSpecialPriceData("apply_rule")}
                      />
                      <PiButton
                        type="submit"
                        appearance="primary"
                        label="Preview Items"
                        // isLoading={isBtnLoading ? true : false}
                        isDisabled={isBtnLoading}
                        onClick={() => updateSpecialPriceData("preview_items")}
                      />
                    </SideDrawerFooter>
                  </>
                )}
              </FieldArray>
            </Form>
          )}
        </Formik>
      </SideDrawerContainer>
      {/* )} */}
      {loading && (
        <SpinnerDiv style={{ position: "absolute", left: "50%" }}>
          <PiSpinner color="primary" size={50} libraryType="atalskit" />
        </SpinnerDiv>
      )}
      {openConFirm && (
        // <ConfirmPopup
        //  confirmText={confirmText}
        //  sendModelData={getConfirmModelEvent}
        // ></ConfirmPopup>
        <OverRideConfirm
          confirmText={confirmText}
          sendModelData={(e: any) => getConfirmModelEvent(e)}
        />
      )}
      {showPreview && (
        <SPPreview
          previewParams={previewParams}
          sendEventData={triggerEventData}
        />
      )}
      {/* {openSnackbar && (
        <Snackbar message={toastMsg} triggerEvent={triggerSnackBarEvent} />
      )} */}
      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel={toastMsg}
        message=""
        onClose={triggerSnackBarEvent}
      />
    </>
  );
}

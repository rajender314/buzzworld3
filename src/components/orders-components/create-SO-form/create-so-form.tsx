/* eslint-disable no-nested-ternary */
/* eslint-disable radix */
import {
  PiSideDrawer,
  PiTypography,
  PiButton,
  PiInputForm,
  PiDatepickerForm,
  PiSelectForm,
  PiSpinner,
  PiTextareaForm,
  PiDatePicker,
  PiToast,
  PiCheckbox,
  PiInput,
  PiConfirmModel,
  PiTextArea,
  PiSelect,
  PiTooltip,
} from "pixel-kit";
import { useState, useEffect, useRef, useCallback } from "react";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import { JobPopupHeaderContainer } from "@app/components/Jobs-components/job-check-list/jobModel/job-model-component";
import {
  DateRangePickerDiv,
  PartsPurchaseFormContainer,
} from "@app/components/parts-purchase-components/parts-purchase-form.tsx/parts-purchase-form-components";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import { AsyncLabel } from "@app/components/rmaModel/RmaModel.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import PartsPurchase from "@app/assets/images/salesOrder.svg";
import CrossLogo from "@app/assets/images/cross.svg";
import AddLogo from "@app/assets/images/addIcon.svg";
import { Formik, Field } from "formik";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import moment from "moment";
import {
  RepairCardsHeader,
  CardTopDetails,
} from "@app/components/RepairItems/repair-items.component";
import {
  ImgTag,
  LinkWithIcon,
} from "@app/components/secondaryheader/secondaryheader.component";
import ThemecolorEdit from "@app/assets/images/themecolorEdit.svg";
import _ from "lodash";
import {
  CreateJobButtonContainer,
  CreateJobSideDrawerFooter,
  CreateJobValidationMsg,
} from "@app/components/Jobs-components/job-check-list/jobModel/form/create-job.component";
import { AsyncSelect } from "@atlaskit/select";
import PastInvoices from "@app/assets/images/email_invoices.svg";
import { setLocalStorage } from "@app/core/localStorage/localStorage";
import CreateSOCustomer from "./create-so-customer";
import CreateStockItems from "../create-stock-line-items-form/create-stock-line-items-form";
import {
  FieldContainer,
  FormContainer,
  StockLineItemCard,
  Socontainer,
  SoErrorMsgs,
  LineShipeDateContainer,
  CheckboxContainer,
  ItemNotesContainer,
  ProductClassContainer,
  ProductClassValue,
  CardHeader,
  CardBody,
  Container,
  ShippingInstructionsContainer,
} from "./create-so-form-components";
import { CreateSOValidationSchema } from "./create-so-form.validation";
import {
  SalesOrderField,
  SalesOrderInfoDatePicker,
  SalesOrderItemLabel,
  SalesOrderItemValue,
} from "../sales-order-information/sales-order-information-componets";

export default function CreateSOForm({ quoteInfo, sendModelData }: any) {
  const [loading, setLoading] = useState(true);
  const [showQtyValidatin, setShowQtyValidatin] = useState<boolean>(false);
  const [openModel, setOpenModel] = useState(true);
  const [serverMsg, setServerMsg] = useState("");
  const [TodayDate, SetTodayDate] = useState("");
  const formik = useRef<any>(null);
  const { current }: any = useRef({ timer: 0 });
  const ref = useRef<any>(null);
  const myContainer = useRef<any>(null);
  const [stcokLineItemCards, setStcokLineItemsCard]: any = useState([]);
  const [openCustomer, setOpenCustomer] = useState(false);
  const [totalCheckedItems, setTotalCheckedItems] = useState([]);
  const [initialValues, setinitialValues] = useState({
    customer_name: "",
    sales_person: "",
    order_date: "",
    customer_po_number: "",
    customer_email: "",
    invoice_delivery_email: "",
    invoice_terms: "",
    shippingInst_display: "",
    requested_ship_date: moment(new Date()).format("YYYY-MM-DD"),
    order_comment: "",
    shipping_address1: "",
    shipping_address2: "",
    shipping_address3: "",
    shipping_address4: "",
    shipping_address5: "",
    shipping_postal_code: "",
    ordered_by: "",
    ship_to_name: "",
    br_tech: "",
  });
  const lineShipDate: any = moment(new Date()).format("MM-DD-YYYY");
  const customerShipDate: any = moment(new Date()).format("MM-DD-YYYY");
  const [stocklineItems, setStocklineItems]: any = useState([]);
  const [changedCustomerDate, setChangedCustomerdate] = useState<any>("");
  const [changedlineDate, setChangedLinedate] = useState<any>("");
  const [errorMsg, seterrorMsg]: any = useState();
  const [showStocklineModel, setShowStocklineModel] = useState(false);
  const [stockLineDetails, setStockLineDeatils]: any = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [itemIndexs, setItemIndexs] = useState<any>();
  const [itemIndex, setItemIndex] = useState<any>();
  const [qtyItemIndex, setQtyItemIndex] = useState<any>();
  const [wareHouseItemIndex, setWareHouseItemIndex] = useState<any>();
  const [qtyValue, setQtyValue] = useState<any>();
  const [wareHouseValue, setWareHouseValue] = useState<any>();
  const [wareHouseOptions, setWareHouseOptions] = useState<any>([]);
  const [productClassOptions, setProductClassOptions] = useState<any>([]);
  const [isNewStockCodeAdded, setisNewStockCodeAdded] = useState(false);

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [qtyEdit, setQtyEdit] = useState<boolean>(false);
  const [showQtyValidationMsg, setShowQtyValidationMsg] = useState("");
  const [deepCopy, setdeepCopy]: any = useState([]);
  const [productClassValue, setProductClassValue] = useState<any>();
  const [desValue, setDesValue] = useState<any>();

  const [productClassIndex, setProductClassIndex] = useState<any>();
  const [desIndex, setDesClassIndex] = useState<any>();
  const [errorPopupLable, setErrorPopupLable] = useState("Order Quantity");
  const [isCreateJob, setIscreateJob] = useState<boolean>(false);
  const [isShippinst, setIsShippingInst] = useState<boolean>(false);
  const [noShippingsMsg, setNoshippingMsg] = useState<boolean>(true);
  const [selectedContact, setSelectedContact] = useState<any>();
  const [newCustomer, setNewCustomer] = useState<any>();
  const [opacity, setOpacity] = useState(false);
  const [newInputValue, setNewInputValue]: any = useState();
  const [isCollectCheckbox, setIsCollectCheckbox] = useState<boolean>(false);
  const [collectNumberValue, setCollectNumberValue] = useState<any>("");
  const [invoiceTerms, setInvoiceTerms] = useState([]);
  const [shippingInstructions, setShippingInstructions] = useState([]);
  function handleRef(e: any) {
    formik.current = e;
  }

  async function stocklineItemDetails(flag?: any) {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.StocklineItemDetails}?quote_id=${quoteInfo.id ? quoteInfo.id : ""}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then((res: any) => {
        if (res.result.success && res.result.status_code === 200) {
          setStocklineItems(res.result.data);
          let stock_cards: any = [];
          if (flag === "new_stock_code") {
            const data = res.result.data.stockItemInfo;
            for (let i = 0, len = deepCopy.length; i < len; i += 1) {
              for (let j = 0, len2 = data.length; j < len2; j += 1) {
                if (deepCopy[i].item_id === data[j].item_id) {
                  data.splice(j, 1);
                  len2 = data.length;
                }
              }
            }
            stock_cards = [...deepCopy, ...data];
            setStcokLineItemsCard(stock_cards);
            const list: any = _.cloneDeep(res.result.data.stockItemInfo);
            setdeepCopy(list);
          } else {
            stock_cards = res.result.data.stockItemInfo;
            setStcokLineItemsCard(stock_cards);
          }
          setdeepCopy(_.cloneDeep(stock_cards));

          seterrorMsg(res.result.data.warningMsg);
        } else if (res.result.success === false) {
          setLoading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  function getSalesOrderDetails(id: string, flag?: string) {
    setOpacity(true);
    setinitialValues({
      customer_name: "",
      sales_person: "",
      order_date: "",
      customer_po_number: "",
      customer_email: "",
      invoice_delivery_email: "",
      invoice_terms: "",
      shippingInst_display: "",
      requested_ship_date: moment(new Date()).format("YYYY-MM-DD"),
      order_comment: "",
      shipping_address1: "",
      shipping_address2: "",
      shipping_address3: "",
      shipping_address4: "",
      shipping_address5: "",
      shipping_postal_code: "",
      ordered_by: "",
      ship_to_name: "",
      br_tech: "",
    });
    if (id) {
      const apiObject = {
        payload: {
          customer: id,
          quote_id: quoteInfo.id,
        },
        method: "POST",
        apiUrl: `${EndpointUrl.CustomerDetails}`,
        headers: {},
      };
      triggerApi(apiObject)
        .then((res: any) => {
          if (res.result.success && res.result.status_code === 200) {
            const { data } = res.result;

            const initial_values: any = data.customerInfo;

            const obj = {
              label: quoteInfo.payterms.label,
              value: quoteInfo.payterms.xcode,
            };

            initial_values.customer_po_number = data.customerInfo
              .customer_po_number
              ? data.customerInfo.customer_po_number
              : "";
            initial_values.customer_email = quoteInfo.quote_requested_by.email
              ? quoteInfo.quote_requested_by.email
              : "";

            setinitialValues({ ...initial_values });
            setOpacity(false);
            setLoading(false);
            formik.current.setFieldValue(
              "invoice_terms",
              flag === "customerChanged"
                ? data?.customerInfo?.invoice_terms
                : quoteInfo.payterms
                  ? obj
                  : data.customerInfo.invoice_terms
            );

            formik.current.setFieldValue(
              "order_date",
              data.customerInfo.order_date ||
                moment(new Date()).format("YYYY-MM-DD")
            );
            formik.current.setFieldValue(
              "requested_ship_date",
              data.customerInfo.requested_ship_date ||
                moment(new Date()).format("YYYY-MM-DD")
            );
            formik.current.setFieldValue(
              "ordered_by",
              selectedContact
                ? selectedContact.label
                : quoteInfo.quote_requested_by.label
            );
            formik.current.setFieldValue(
              "ship_to_name",
              data?.customerInfo?.ship_to_name ||
                data.customerInfo.customer_name ||
                ""
            );

            formik.current.setFieldValue(
              "customer_name",
              data?.customerInfo?.customer_name || ""
            );

            formik.current.setFieldValue(
              "br_tech",
              stocklineItems?.brTechInfo || ""
            );

            formik.current.setFieldValue(
              "shippingInst_display",
              data?.customerInfo?.shippingInst_display || ""
            );
            formik.current.setFieldValue(
              "shipping_instrs",
              data?.customerInfo?.shipping_instrs || ""
            );
            formik.current.setFieldValue(
              "shipping_address1",
              data?.customerInfo?.shipping_address1 || ""
            );
            formik.current.setFieldValue(
              "shipping_address2",
              data?.customerInfo?.shipping_address2 || ""
            );
            formik.current.setFieldValue(
              "shipping_address3",
              data?.customerInfo?.shipping_address3 || ""
            );
            formik.current.setFieldValue(
              "shipping_address4",
              data?.customerInfo?.shipping_address4 || ""
            );
            formik.current.setFieldValue(
              "shipping_address5",
              data?.customerInfo?.shipping_address5 || ""
            );
            formik.current.setFieldValue(
              "shipping_postal_code",
              data?.customerInfo?.shipping_postal_code || ""
            );
            if (data?.customerInfo?.shipping_collect) {
              formik.current.setFieldValue(
                "shipping_collect",
                data.customerInfo.shipping_collect
              );
              setIsCollectCheckbox(true);
              setCollectNumberValue(data.customerInfo.shipping_collect);
            }
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    } else {
      setLoading(false);
      setOpacity(false);
    }
  }

  function getInvoiceTermOptions() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.InvoiceTerms}?is_dropdown=true`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((res: any) => {
        if (res.result.success && res.result.status_code === 200) {
          setInvoiceTerms(res.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  const getWareHouseOptions = useCallback(() => {
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
      }
    });
  }, []);
  const getProductClassOptions = useCallback(() => {
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
      }
    });
  }, []);
  useEffect(() => {
    (async () => {
      if (quoteInfo && quoteInfo.id) {
        await stocklineItemDetails();
        if (quoteInfo.is_repair || quoteInfo.is_system_quote) {
          setIscreateJob(true);
        }
      }
      getInvoiceTermOptions();
      getWareHouseOptions();
      getProductClassOptions();
    })();
  }, [quoteInfo]);

  useEffect(() => {
    if (stocklineItems && !isNewStockCodeAdded) {
      getSalesOrderDetails(newCustomer || quoteInfo.account_number);
    }
  }, [stocklineItems]);

  useEffect(() => {
    function formatDate(date: Date) {
      const d = new Date(date);
      let month = `${d.getMonth() + 1}`;
      let day = `${d.getDate()}`;
      const year = d.getFullYear();

      if (month.length < 2) month = `0${month}`;
      if (day.length < 2) day = `0${day}`;

      return [year, month, day].join("-");
    }
    SetTodayDate(formatDate(new Date()));
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setQtyItemIndex("");
        setWareHouseItemIndex("");
        setProductClassIndex("");
        setItemIndex("");
        setItemIndexs("");
        setDesClassIndex("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [
    qtyItemIndex,
    wareHouseItemIndex,
    productClassIndex,
    itemIndex,
    itemIndexs,
    desIndex,
  ]);

  const formSubmit = () => {
    formik.current.handleSubmit();
    if (
      formik.current &&
      formik.current.errors &&
      (Object.keys(formik.current.errors)[0] === "customer_po_number" ||
        Object.keys(formik.current.errors)[0] === "order_date" ||
        Object.keys(formik.current.errors)[0] === "requested_ship_date" ||
        Object.keys(formik.current.errors)[0] === "ordered_by")
    ) {
      if (myContainer && myContainer.current) {
        myContainer.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        myContainer.current.focus({ preventScroll: true });
      }
    }
  };

  function handleSubmit(data: any) {
    setServerMsg("");
    setOpacity(true);

    if (stcokLineItemCards && stcokLineItemCards.length > 0) {
      stcokLineItemCards.map((obj: any) => {
        if (obj.line_ship_date === "" && obj.customer_request_date === "") {
          obj.line_ship_date = moment(new Date()).format("YYYY-MM-DD");
          obj.customer_request_date = moment(new Date()).format("YYYY-MM-DD");
        }
        if (obj.customer_request_date === "") {
          obj.customer_request_date = moment(new Date()).format("YYYY-MM-DD");
        }
        if (obj.line_ship_date === "") {
          obj.line_ship_date = moment(new Date()).format("YYYY-MM-DD");
        }
        // if (obj.line_ship_date) {
        //   obj.line_ship_date = moment(obj.line_ship_date, "MM-DD-YYYY").format('YYYY-MM-DD')
        // }
        // if (obj.customer_request_date) {
        //   obj.customer_request_date = moment(obj.customer_request_date, "MM-DD-YYYY").format(
        //     'YYYY-MM-DD',
        //   )
        // }
        return obj;
      });
    }

    setStcokLineItemsCard(stcokLineItemCards);

    const params = {
      br_tech: data.br_tech ? data.br_tech : "",
      customer_email: data.customer_email ? data.customer_email : "",
      customer_name: data.customer_name ? data.customer_name : "",
      invoice_delivery_email: data.invoice_delivery_email
        ? data.invoice_delivery_email
        : "",
      customer_po_number: data.customer_po_number
        ? data.customer_po_number.trim()
        : "",
      invoice_terms: data.invoice_terms ? data.invoice_terms : "",
      order_date: data.order_date ? data.order_date : "",
      order_comment: data.order_comment ? data.order_comment : "",
      special_instructions: data.ordered_by ? data.ordered_by : "",
      requested_ship_date: data.requested_ship_date
        ? data.requested_ship_date
        : "",
      sales_person: data.sales_person ? data.sales_person : "",
      shipping_address1: data.shipping_address1 ? data.shipping_address1 : "",
      shipping_address2: data.shipping_address2 ? data.shipping_address2 : "",
      // shipping_address3: data.shipping_address3 ? data.shipping_address3 : "",
      shipping_address4: data.shipping_address4 ? data.shipping_address4 : "",
      shipping_address5: data.shipping_address5 ? data.shipping_address5 : "",
      shipping_address_location: data.shipping_address_location
        ? data.shipping_address_location
        : "",
      shipping_instrs: data.shipping_instrs ? data.shipping_instrs : "",
      shipping_instrs_cod: data.shipping_instrs_cod
        ? data.shipping_instrs_cod
        : "",
      shipping_postal_code: data.shipping_postal_code
        ? data.shipping_postal_code
        : "",
      taxable_status: data.taxable_status ? data.taxable_status : "",
      terms_code: data.terms_code ? data.terms_code : "",
      quote_number: quoteInfo.quote_no,
      quote_id: quoteInfo.id,
      customer: data.customer ? data.customer : quoteInfo.account_number,
      shipping_collect: !isCollectCheckbox
        ? ""
        : data.shipping_collect && data.shipping_collect.trim(),
      ship_to_name: data.ship_to_name ? data.ship_to_name : "",
      items:
        totalCheckedItems && isChecked
          ? totalCheckedItems
          : stcokLineItemCards || "",
      quote_requested_by: selectedContact,
    };
    const apiObject = {
      payload: params,
      method: "POST",
      apiUrl: `${EndpointUrl.CreateSalesOrder}`,
      // apiUrl: `test`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((res: any) => {
        if (res.result.success && res.result.status_code === 200) {
          setLoading(false);
          setShowPopup(true);
          setOpenModel(false);

          setTimeout(() => {
            sendModelData({
              success: true,
              id: res.result.data.salesOrderId,
              jobErr: res.result.data.jobWarningMsgs,
            });
          }, 1000);
          setOpacity(false);
        } else {
          setOpacity(false);
          setServerMsg(res.result.data);
          setLoading(false);
        }
      })
      .catch((err: string) => {
        setLoading(false);
        setOpacity(false);
        setServerMsg("Something went wrong");
        console.log(err);
      });
  }
  const onSaveLineDate = (e: any, i: number) => {
    const data = stocklineItems;
    const dupData: any = data.stockItemInfo;
    console.log(dupData, stocklineItems);
    stcokLineItemCards[i].line_ship_date = e;
    setStcokLineItemsCard(stcokLineItemCards);
    deepCopy[i].line_ship_date = e;
    setdeepCopy(deepCopy);
    setItemIndex("");
  };

  const onChangelineShipDate = (e: any, i: number) => {
    console.log(e);
    onSaveLineDate(e, i);
  };

  const onEditLineDate = (data: any, i: any) => {
    console.log(data);

    setItemIndex(i);
    setChangedLinedate(data);
  };
  const onEditCustomerDate = (data: any, i: any) => {
    setItemIndexs(i);
    setChangedCustomerdate(data);
  };
  const onSaveCustomerDate = (e: any, i: number) => {
    stcokLineItemCards[i].customer_request_date = e;
    setStcokLineItemsCard(stcokLineItemCards);
    deepCopy[i].customer_request_date = e;
    setdeepCopy(deepCopy);
    setItemIndexs("");
  };
  const onChangeCustomerShipDate = (e: any, i: number) => {
    onSaveCustomerDate(e, i);
  };

  function onShowStockLineModel(e: any, data: any) {
    console.log(data);
    // setLoading(true);
    setOpacity(true);
    const apiObject = {
      payload: {
        stock_code: data || "",
        quote_id: quoteInfo.id,
      },
      method: "POST",
      apiUrl: `${EndpointUrl.getStocklineItemsDeaitls}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((res: any) => {
        if (res.result.success && res.result.status_code === 200) {
          const result = res.result.data;
          setStockLineDeatils(...result);
          setOpacity(false);
          setTimeout(() => {
            setShowStocklineModel(true);
            setLoading(false);
          }, 500);
        } else {
          setOpacity(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  async function onSoaction(e: any) {
    if (e && e.closeModel) {
      setShowStocklineModel(false);
    }
    if (e && e.success) {
      if (e.inventoryStockItem) {
        setisNewStockCodeAdded(true);
      }

      setShowStocklineModel(false);
      stocklineItemDetails("new_stock_code");
    }
  }

  function onCheckboxChange(e: any, data: any) {
    setIsChecked(true);
    let values: any = [];
    let checked_items: any = [];
    values = stcokLineItemCards.map((obj: any) => {
      if (obj.item_id === data.item_id) {
        if (e.target.checked) {
          obj.is_checked = true;
        } else {
          obj.is_checked = false;
        }
      }
      return obj;
    });
    setStockLineDeatils(values);
    checked_items = values.filter((ev: any) => ev.is_checked);
    setTotalCheckedItems(checked_items);
  }
  const onQtyEdit = (itemData: any, i: any) => {
    setQtyItemIndex(i);
    setQtyValue(itemData.orderQty ? itemData.orderQty : "");
  };
  const onWareHouseEdit = (itemData: any, i: any) => {
    setWareHouseItemIndex(i);
    setWareHouseValue([
      {
        label: itemData,
        value: itemData,
      },
    ]);
  };
  const resetWareHouse = () => {
    setWareHouseItemIndex("");
  };
  const onPrClassEdit = (itemData: any, i: number) => {
    setProductClassIndex(i);

    setProductClassValue({
      label: itemData.productClass,
      value: itemData.productClass,
    });
  };
  const onDesEdit = (itemData: any, i: number) => {
    setDesClassIndex(i);
    setDesValue(itemData.stockDesc ? itemData.stockDesc : "");
  };
  const onQtyChange = (e: any) => {
    setQtyValue(e.target.value);
    setShowQtyValidatin(false);
  };
  const onWareHouseChange = (e: any) => {
    setWareHouseValue(e);
  };
  const saveWareHouse = (i: number) => {
    stcokLineItemCards[i].warehouse =
      wareHouseValue && wareHouseValue.value ? [wareHouseValue.value] : "";
    setStcokLineItemsCard(stcokLineItemCards);
    deepCopy[i].warehouse =
      wareHouseValue && wareHouseValue.value ? [wareHouseValue.value] : "";
    setdeepCopy(deepCopy);
    setWareHouseItemIndex("");
  };
  const saveQtyValue = (i: number) => {
    // let initialQty: any = deepCopy[i].orderQty
    // let eachItemPrice: any =
    //  deepCopy[i].stockPrice.replace(',', '') / parseInt(initialQty)
    // let upDatedPrice = parseInt(qtyValue) * eachItemPrice

    const qtyRegex = /^(?!0)[0-9]+$/gm;

    const qtyZerovalidateRegex = /^0+(\.\d+)?$/;
    const nonZeroPart: any = parseInt(qtyValue);

    if (qtyZerovalidateRegex.test(qtyValue) && qtyValue !== "") {
      setShowQtyValidatin(true);
      setErrorPopupLable("Order Quantity");
      setShowQtyValidationMsg("Order Quantity should be minimum 1");
    } else if (!qtyRegex.test(nonZeroPart) && qtyValue !== "") {
      setShowQtyValidatin(true);
      setErrorPopupLable("Order Quantity");
      setShowQtyValidationMsg("Order Quantity not valid");
    } else if (qtyValue === "") {
      setShowQtyValidatin(true);
      setErrorPopupLable("Order Quantity");
      setShowQtyValidationMsg("Please Enter Order Quantity");
    } else {
      const storedQtyValues: any = [];
      const qtyEntry: any = { index: i, value: qtyValue };
      storedQtyValues.push(qtyEntry);

      setLocalStorage("soQuantity", JSON.stringify(storedQtyValues));
      stcokLineItemCards[i].orderQty = parseInt(qtyValue);
      setStcokLineItemsCard(stcokLineItemCards);
      deepCopy[i].orderQty = parseInt(qtyValue);
      setdeepCopy(deepCopy);
      setQtyItemIndex("");
    }
  };
  const savePrclassValue = (i: number) => {
    if (productClassValue === "") {
      setShowQtyValidatin(true);
      setErrorPopupLable("Product Class");
      setShowQtyValidationMsg("Product Class is required! ");
    } else {
      stcokLineItemCards[i].productClass =
        productClassValue && productClassValue.value
          ? productClassValue.value
          : "";
      setStcokLineItemsCard(stcokLineItemCards);
      deepCopy[i].productClass =
        productClassValue && productClassValue.value
          ? productClassValue.value
          : "";
      setdeepCopy(deepCopy);
      setProductClassIndex("");
    }
  };
  const saveDesValue = (i: number) => {
    if (desValue === "") {
      setShowQtyValidatin(true);
      setErrorPopupLable("Stock Description");
      setShowQtyValidationMsg("Stock Description is required! ");
    } else {
      stcokLineItemCards[i].stockDesc = desValue;
      deepCopy[i].stockDesc = desValue;
      setdeepCopy(deepCopy);
      setStcokLineItemsCard(stcokLineItemCards);
      setDesClassIndex("");
    }
  };
  const resetPrclassValue = () => {
    setProductClassIndex("");
  };
  const resetDesValue = () => {
    setDesClassIndex("");
  };
  const resetQty = () => {
    setQtyEdit(false);
    setQtyItemIndex("");
  };
  const onItemNotesChanges = (e: any, i: number) => {
    stcokLineItemCards[i].notes = e.target.value;
    setStcokLineItemsCard(stcokLineItemCards);

    deepCopy[i].notes = e.target.value;
    setdeepCopy(deepCopy);
  };
  const onProductClassChange = (e: any) => {
    setProductClassValue(e);
  };
  const onDesChange = (e: any) => {
    setDesValue(e.target.value);
  };

  function onCreateJobCheckboxChange(e: any, data: any) {
    let stock_values: any = [];
    let deep_copy: any = [];
    stock_values = stcokLineItemCards.map((obj: any) => {
      if (obj.item_id === data.item_id) {
        if (e.target.checked) {
          obj.is_create_job = true;
        } else {
          obj.is_create_job = false;
        }
      }
      return obj;
    });
    setStcokLineItemsCard(stock_values);

    deep_copy = deepCopy.map((obj: any) => {
      if (obj.item_id === data.item_id) {
        if (e.target.checked) {
          obj.is_create_job = true;
        } else {
          obj.is_create_job = false;
        }
      }
      return obj;
    });
    setdeepCopy(deep_copy);
  }
  const onShippingInstructionsInputChange = (Value: string) => {
    if (Value.length) {
      return Value;
    }
    return null;
  };
  const getShippingInst = async (shippingInstValue: string) => {
    let list: any = [];
    setIsShippingInst(false);
    setShippingInstructions([]);

    if (shippingInstValue.length) {
      setNewInputValue(shippingInstValue);

      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.ShippingInstructions}?search=${shippingInstValue}`,

        headers: {},
      };
      await triggerApi(apiObject)
        .then((res: any) => {
          if (res.result.success && res.result.status_code === 200) {
            const { data } = res.result;
            if (data && data.shippingInst && data.shippingInst.length === 0) {
              setNoshippingMsg(false);
            }
            let arr = [];
            arr = data.shippingInst.map((item: any) => ({
              value: item.value,
              label: item.label,
            }));

            list = arr;
            setShippingInstructions(list);
          } else {
            setShippingInstructions([]);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
      return list;
    }
    return list;
  };
  const shippingInstpromiseOptions = (shippingInstValue: string) =>
    new Promise((resolve) => {
      setNewInputValue("");
      if (current.timer) clearTimeout(current.timer);
      current.timer = setTimeout(() => {
        resolve(getShippingInst(shippingInstValue));
      }, 1000);
    });

  const onShippingInstructionsChange = (value: any) => {
    if (value !== null) {
      formik.current.setFieldValue("shippingInst_display", value);
      formik.current.setFieldValue("shipping_instrs", value);
      formik.current.setFieldValue("shipping_instrs_cod", value.value);
    } else {
      formik.current.setFieldValue("shippingInst_display", null);
      setIsShippingInst(true);
    }
  };
  const blurEvent = (form: any, fieldLabel: any) => {
    if (newInputValue && shippingInstructions.length === 0) {
      if (isShippinst) {
        formik.current.setFieldValue(fieldLabel, null);
        formik.current.setFieldValue("shipping_instrs", null);
        formik.current.setFieldValue("shipping_instrs_cod", "");
      } else {
        setNoshippingMsg(true);

        formik.current.setFieldValue(fieldLabel, {
          value: newInputValue,
          label: newInputValue,
        });
        formik.current.setFieldValue("shipping_instrs", {
          value: newInputValue,
          label: newInputValue,
        });
        formik.current.setFieldValue("shipping_instrs_cod", "");
        form.setFieldValue("shippingInst_display", {
          value: newInputValue,
          label: newInputValue,
        });
      }
    }
  };
  const onCollectNumberChange = (e: any) => {
    setCollectNumberValue(e.target.value);
  };
  const onCollectCheckboxChange = () => {
    setIsCollectCheckbox(!isCollectCheckbox);
    formik.current.setFieldValue("shipping_collect", collectNumberValue);
  };

  const triggerCustomer = (e: any) => {
    if (e.success) {
      formik.current.setFieldValue(
        "customer",
        e.data.customerName.account_number
      );

      formik.current.setFieldValue(
        "customer_email",
        e.data.selectedContact.email
      );
      setSelectedContact(e.data.selectedContact);
      setNewCustomer(e.data.customerName.account_number);
      setOpenCustomer(false);
      getSalesOrderDetails(
        e.data.customerName.account_number,
        "customerChanged"
      );
    } else {
      setOpenCustomer(false);
    }
  };
  return (
    <>
      <Socontainer>
        <PiSideDrawer isOpen={openModel} width="medium">
          <SideDrawerContainer>
            <SideDrawerHeader>
              <JobPopupHeaderContainer>
                <img src={PartsPurchase} alt="create-job" />

                <PiTypography component="h3">Create Sales Order</PiTypography>
              </JobPopupHeaderContainer>

              <CloseButton
                onClick={() =>
                  sendModelData({
                    close: true,
                    isNewStockCodeAdded,
                  })
                }
                title="close"
                className="Hover"
              >
                <img src={CrossLogo} alt="create-job" />
              </CloseButton>
            </SideDrawerHeader>
            {loading && (
              <SpinnerDiv style={{ height: "100%" }}>
                <PiSpinner color="primary" size={50} libraryType="atalskit" />
              </SpinnerDiv>
            )}
            {!loading && stocklineItems && (
              <Formik
                validationSchema={CreateSOValidationSchema}
                onSubmit={(e: any) => handleSubmit(e)}
                initialValues={initialValues}
                innerRef={(e: any) => handleRef(e)}
                // validateOnMount={true}
              >
                {() => (
                  <>
                    <PartsPurchaseFormContainer
                      className={opacity ? "opacity-on-load" : ""}
                    >
                      {opacity && (
                        <SpinnerDiv
                          style={{
                            position: "absolute",
                            left: "50%",
                            zIndex: "1",
                          }}
                          className="zindex"
                        >
                          <PiSpinner
                            color="primary"
                            size={50}
                            libraryType="atalskit"
                          />
                        </SpinnerDiv>
                      )}
                      <FormContainer id="form-container">
                        <FieldContainer>
                          <SalesOrderField>
                            <PiInputForm
                              libraryType="atalskit"
                              name="ordered_by"
                              label="Ordered By"
                              placeholder="Enter"
                              isDisabled={opacity}
                              isMandatory
                            />
                          </SalesOrderField>

                          <SalesOrderField style={{ position: "relative" }}>
                            <PiInputForm
                              libraryType="atalskit"
                              name="customer"
                              label="Customer (Syspro ID)"
                              isDisabled
                              isMandatory
                              placeholder="Enter Customer"
                            />
                            {/* {quoteInfo && !quoteInfo.is_repair && ( */}
                            <PiTooltip
                              content="Change Customer"
                              libraryType="atalskit"
                            >
                              <div
                                style={{
                                  position: "absolute",
                                  right: "69px",
                                }}
                                onClick={() => setOpenCustomer(true)}
                                onKeyDown={(event) => {
                                  if (
                                    event.key === "Enter" ||
                                    event.key === " "
                                  ) {
                                    setOpenCustomer(true);
                                  }
                                }}
                                role="button"
                                tabIndex={0}
                              >
                                <img
                                  src={PastInvoices}
                                  alt="chevron-right"
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    cursor: "pointer",
                                  }}
                                />
                              </div>
                            </PiTooltip>
                            {/* )} */}
                          </SalesOrderField>

                          <SalesOrderField>
                            <PiInputForm
                              libraryType="atalskit"
                              name="customer_name"
                              label="Customer Name"
                              isDisabled
                              isMandatory
                            />
                          </SalesOrderField>
                        </FieldContainer>

                        <FieldContainer>
                          <SalesOrderField>
                            <SalesOrderInfoDatePicker className="dt-pkr-bg-unset">
                              <AsyncLabel
                                htmlFor="async-select-example"
                                className="quote-date-label"
                              >
                                Order Date
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

                              <PiDatepickerForm
                                helpText=""
                                libraryType="atalskit"
                                minDate={TodayDate}
                                name="order_date"
                                placeholder="MM/DD/YYYY"
                                isDisabled={opacity}
                                isMandatory
                              />
                            </SalesOrderInfoDatePicker>
                          </SalesOrderField>

                          <SalesOrderField>
                            <SalesOrderInfoDatePicker className="dt-pkr-bg-unset">
                              <AsyncLabel
                                htmlFor="async-select-example"
                                className="quote-date-label"
                              >
                                Ship Date
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
                              <PiDatepickerForm
                                // dateFormat="MM-DD-YYYY"
                                helpText=""
                                libraryType="atalskit"
                                minDate={TodayDate}
                                name="requested_ship_date"
                                placeholder="MM/DD/YYYY"
                                isDisabled={opacity}
                              />
                            </SalesOrderInfoDatePicker>
                          </SalesOrderField>

                          <SalesOrderField>
                            <PiInputForm
                              libraryType="atalskit"
                              name="customer_email"
                              placeholder=" Enter Ack Delivery Email"
                              type="email"
                              label="Ack Delivery Email"
                              isDisabled={opacity}
                            />
                          </SalesOrderField>
                        </FieldContainer>

                        <FieldContainer ref={myContainer}>
                          <SalesOrderField>
                            <PiInputForm
                              libraryType="atalskit"
                              name="invoice_delivery_email"
                              placeholder=" Enter Invoice Delivery Email"
                              type="email"
                              label="Invoice Delivery Email"
                              isDisabled={opacity}
                            />
                          </SalesOrderField>
                          <SalesOrderField id="po-number">
                            <PiInputForm
                              libraryType="atalskit"
                              name="customer_po_number"
                              label="PO Number"
                              placeholder="Enter PO Number"
                              type="text"
                              maxLength={30}
                              isMandatory
                              isDisabled={opacity}
                            />
                          </SalesOrderField>

                          <SalesOrderField>
                            {quoteInfo && quoteInfo.is_repair && (
                              <PiInputForm
                                libraryType="atalskit"
                                name="br_tech"
                                label="BR Tech"
                                placeholder="Enter BR Tech"
                                type="text"
                                maxLength={30}
                                isDisabled={opacity}
                              />
                            )}
                          </SalesOrderField>
                        </FieldContainer>

                        <FieldContainer>
                          <SalesOrderField className="hide-form-field">
                            <PiInputForm
                              libraryType="atalskit"
                              name="sales_person"
                              label="Sales Person"
                              isMandatory
                              // onChange={customerPonumberChange}
                              isDisabled
                            />
                          </SalesOrderField>

                          <SalesOrderField>
                            <PiSelectForm
                              name="invoice_terms"
                              placeholder="Select"
                              isMulti={false}
                              options={invoiceTerms}
                              label="Invoice Terms"
                              isMandatory
                              classNamePrefix="react-select"
                              isDisabled={opacity}
                            />
                          </SalesOrderField>

                          <SalesOrderField>
                            <ShippingInstructionsContainer>
                              <AsyncLabel
                                htmlFor="async-select-example"
                                className="mandatory"
                              >
                                Shipping Instructions
                              </AsyncLabel>
                              <CheckboxContainer className="collect-checkbox">
                                <PiCheckbox
                                  isChecked={isCollectCheckbox}
                                  helpText=""
                                  libraryType="atalskit"
                                  name="collect_checkbox"
                                  onChange={() => onCollectCheckboxChange()}
                                  size="large"
                                  className="repair-item-checkbox"
                                  isDisabled={opacity}
                                />
                                <AsyncLabel
                                  htmlFor="async-select-example"
                                  className="collet-check-box"
                                >
                                  Collect
                                </AsyncLabel>
                              </CheckboxContainer>
                              <Field name="shippingInst_display">
                                {({ field, form, meta }: any) => (
                                  <>
                                    <AsyncSelect
                                      name="shippingInst_display"
                                      inputId="async-select-example"
                                      classNamePrefix="react-select"
                                      onInputChange={
                                        onShippingInstructionsInputChange
                                      }
                                      loadOptions={shippingInstpromiseOptions}
                                      placeholder="Select Shipping Instructions"
                                      onChange={(value) => {
                                        onShippingInstructionsChange(value);
                                        form.setFieldValue(
                                          "shippingInst_display",
                                          value
                                        );
                                      }}
                                      isClearable
                                      value={field.value}
                                      isDisabled={loading}
                                      noOptionsMessage={() =>
                                        noShippingsMsg
                                          ? "Search Shipping Instructions"
                                          : "No Shipping Instructions Found"
                                      }
                                      onBlur={() => {
                                        blurEvent(form, "shippingInst_display");
                                      }}
                                    />
                                    <small className="validation-error date-range-validation-error">
                                      {meta.touched && meta.error
                                        ? meta.error
                                        : ""}
                                    </small>
                                  </>
                                )}
                              </Field>
                            </ShippingInstructionsContainer>

                            {/* <PiSelectForm
                                name="shippingInst_display"
                                placeholder="Select"
                                isMulti={false}
                                options={shippingInstructions}
                                label="Shipping Instructions"
                                classNamePrefix="react-select"
                                isDisabled={opacity}
                                isMandatory
                              /> */}
                          </SalesOrderField>

                          <SalesOrderField>
                            {isCollectCheckbox && (
                              <PiInputForm
                                libraryType="atalskit"
                                name="shipping_collect"
                                label="Collect Number"
                                placeholder="Enter Collect Number"
                                type="text"
                                onChange={onCollectNumberChange}
                                // isMandatory
                                isDisabled={opacity}
                              />
                            )}
                          </SalesOrderField>
                        </FieldContainer>

                        <FieldContainer>
                          <SalesOrderField>
                            <PiInputForm
                              libraryType="atalskit"
                              name="ship_to_name"
                              label="Ship To Name"
                              placeholder="Enter Ship To Name"
                              isDisabled={opacity}
                            />
                          </SalesOrderField>
                          <SalesOrderField>
                            <PiInputForm
                              libraryType="atalskit"
                              name="shipping_address1"
                              placeholder="Enter Address"
                              label="Address 1"
                              isDisabled={opacity}
                            />
                          </SalesOrderField>

                          <SalesOrderField>
                            <PiInputForm
                              libraryType="atalskit"
                              name="shipping_address2"
                              placeholder="Enter Address"
                              label="Address 2"
                              isDisabled={opacity}
                            />
                          </SalesOrderField>

                          {/* <SalesOrderField>
                              <PiInputForm
                                libraryType="atalskit"
                                name="shipping_address3"
                                placeholder="Enter Address"
                                label="Address 3"
                                isDisabled={opacity}
                              />
                            </SalesOrderField> */}
                          {/* <SalesOrderField>
                              <PiInputForm
                                libraryType="atalskit"
                                name="shipping_instrs_cod"
                                placeholder="Enter"
                                label="Instru tions Code"
                              />
                            </SalesOrderField> */}
                        </FieldContainer>

                        <FieldContainer>
                          <SalesOrderField>
                            <PiInputForm
                              libraryType="atalskit"
                              name="shipping_address4"
                              placeholder="Enter Address"
                              label="City"
                              isDisabled={opacity}
                            />
                          </SalesOrderField>

                          <SalesOrderField>
                            <PiInputForm
                              libraryType="atalskit"
                              name="shipping_address5"
                              placeholder="Enter Address"
                              label="State"
                              isDisabled={opacity}
                            />
                          </SalesOrderField>

                          <SalesOrderField>
                            <PiInputForm
                              libraryType="atalskit"
                              name="shipping_postal_code"
                              placeholder="Enter Postal Code"
                              label="Postal Code"
                              isDisabled={opacity}
                            />
                          </SalesOrderField>
                        </FieldContainer>

                        {/* <SalesOrderField style={{ width: "258px" }}>
                            <PiInputForm
                              libraryType="atalskit"
                              name="invoice_delivery_email"
                              placeholder=" Enter Invoice Delivery Email"
                              type="email"
                              label="Invoice Delivery Email"
                              isDisabled={opacity}
                            />
                          </SalesOrderField> */}
                        <SalesOrderInfoDatePicker className="dt-pkr-bg-unset">
                          <PiTextareaForm
                            helpText=""
                            label="Order Comments"
                            libraryType="atalskit"
                            minimumRows={3}
                            name="order_comment"
                            placeholder="Enter Comments"
                            isDisabled={opacity}
                          />
                        </SalesOrderInfoDatePicker>
                      </FormContainer>
                      <>
                        {stcokLineItemCards &&
                          stcokLineItemCards.length > 0 && (
                            <RepairCardsHeader>
                              <PiTypography component="h4">
                                {stcokLineItemCards &&
                                stcokLineItemCards.length > 1
                                  ? "Items"
                                  : "Item"}
                              </PiTypography>
                            </RepairCardsHeader>
                          )}

                        {stcokLineItemCards &&
                          stcokLineItemCards.length > 0 && (
                            <div>
                              {stcokLineItemCards &&
                                stcokLineItemCards.length > 0 &&
                                stcokLineItemCards.map(
                                  (data: any, index: number) => (
                                    <StockLineItemCard>
                                      <CardTopDetails>
                                        <CardHeader>
                                          {stcokLineItemCards &&
                                            stcokLineItemCards.length > 1 && (
                                              <CheckboxContainer>
                                                <PiCheckbox
                                                  isChecked={data.is_checked}
                                                  helpText=""
                                                  libraryType="atalskit"
                                                  name={`checkbox${index}`}
                                                  onChange={(e) =>
                                                    onCheckboxChange(e, data)
                                                  }
                                                  size="large"
                                                  className="repair-item-checkbox"
                                                  isDisabled={opacity}
                                                />
                                              </CheckboxContainer>
                                            )}
                                          <div>
                                            <h4>
                                              <span>
                                                {data && data.stockCode
                                                  ? data.stockCode
                                                  : "-"}
                                              </span>
                                            </h4>
                                          </div>
                                          {isCreateJob &&
                                            !data.isManuallyAddedRepairQuoteItem && (
                                              <CheckboxContainer
                                                style={{
                                                  marginLeft: "auto",
                                                }}
                                                className={
                                                  !data.is_checked
                                                    ? "create-job-disable"
                                                    : ""
                                                }
                                              >
                                                <PiCheckbox
                                                  isChecked={data.is_create_job}
                                                  label="Create Job"
                                                  helpText=""
                                                  libraryType="atalskit"
                                                  name={`createjob_checkbox${index}`}
                                                  onChange={(e) =>
                                                    onCreateJobCheckboxChange(
                                                      e,
                                                      data
                                                    )
                                                  }
                                                  size="large"
                                                  className="repair-item-checkbox"
                                                  isDisabled={
                                                    opacity || !data.is_checked
                                                  }
                                                />
                                              </CheckboxContainer>
                                            )}
                                          {/* <div
                                                  className=" "
                                                  style={{ marginLeft: "auto" }}
                                                >
                                                  Check box
                                                  <p
                                                    className="m-0 line-clamp three-lines font_color"
                                                    title={"-"}
                                                  >

                                                    <span className="font_color semiBoldWt">
                                                      {data && data.stockDesc
                                                        ? data.stockDesc
                                                        : "-"}
                                                    </span>
                                                  </p>
                                                </div> */}
                                        </CardHeader>

                                        <CardBody>
                                          <Container>
                                            <SalesOrderItemLabel
                                              className={
                                                index === qtyItemIndex
                                                  ? "on-qty-edit"
                                                  : ""
                                              }
                                            >
                                              {!qtyEdit &&
                                                index !== qtyItemIndex && (
                                                  <>
                                                    <div
                                                      style={{
                                                        display: "inline-block",
                                                        margin: "0px",
                                                      }}
                                                      onClick={() => {
                                                        onQtyEdit(data, index);
                                                      }}
                                                      onKeyDown={(event) => {
                                                        if (
                                                          event.key ===
                                                            "Enter" ||
                                                          event.key === " "
                                                        ) {
                                                          onQtyEdit(
                                                            data,
                                                            index
                                                          );
                                                        }
                                                      }}
                                                      role="button"
                                                      tabIndex={0}
                                                    >
                                                      Order Quantity
                                                      <img
                                                        src={ThemecolorEdit}
                                                        style={{
                                                          paddingLeft: "8px",
                                                          cursor: "pointer",
                                                        }}
                                                        className={
                                                          opacity
                                                            ? "isHidden"
                                                            : "edit-icon"
                                                        }
                                                        alt="loading"
                                                      />
                                                    </div>

                                                    <SalesOrderItemValue>
                                                      {data && data.orderQty
                                                        ? data.orderQty
                                                        : ""}
                                                    </SalesOrderItemValue>
                                                  </>
                                                )}
                                              {index === qtyItemIndex && (
                                                <span ref={ref}>
                                                  <PiInput
                                                    type="string"
                                                    name="qty"
                                                    onChange={(e) => {
                                                      onQtyChange(e);
                                                    }}
                                                    value={qtyValue}
                                                    label="Order Quantity"
                                                    placeholder="Enter Quantity"
                                                    isIcons
                                                    // isMandatory
                                                    emitSave={() => {
                                                      saveQtyValue(index);
                                                    }}
                                                    emitUndo={resetQty}
                                                    maxLength={8}
                                                    isMandatory
                                                  />
                                                </span>
                                              )}
                                            </SalesOrderItemLabel>

                                            <SalesOrderItemLabel>
                                              {index !== wareHouseItemIndex && (
                                                <>
                                                  <div
                                                    style={{
                                                      display: "inline-block",
                                                      margin: "0px",
                                                    }}
                                                    onClick={() => {
                                                      onWareHouseEdit(
                                                        data.warehouse,
                                                        index
                                                      );
                                                    }}
                                                    onKeyDown={(event) => {
                                                      if (
                                                        event.key === "Enter" ||
                                                        event.key === " "
                                                      ) {
                                                        onWareHouseEdit(
                                                          data.warehouse,
                                                          index
                                                        );
                                                      }
                                                    }}
                                                    role="button"
                                                    tabIndex={0}
                                                  >
                                                    Warehouse
                                                    <img
                                                      src={ThemecolorEdit}
                                                      style={{
                                                        paddingLeft: "8px",
                                                        cursor: "pointer",
                                                      }}
                                                      className={
                                                        opacity
                                                          ? "isHidden"
                                                          : "edit-icon"
                                                      }
                                                      alt="loading"
                                                    />
                                                  </div>

                                                  <SalesOrderItemValue>
                                                    {/* {data.warehouse.join(
                                                          ", "
                                                        )} */}
                                                    {data.warehouse &&
                                                    data.warehouse
                                                      ? data.warehouse
                                                      : "--"}
                                                  </SalesOrderItemValue>
                                                </>
                                              )}
                                              {index === wareHouseItemIndex && (
                                                <span ref={ref}>
                                                  <PiSelect
                                                    name="ware_house"
                                                    placeholder="Select"
                                                    isMulti={false}
                                                    options={wareHouseOptions}
                                                    label="Warehouse"
                                                    isMandatory
                                                    classNamePrefix="react-select"
                                                    isDisabled={opacity}
                                                    isIcons
                                                    value={wareHouseValue}
                                                    emitSave={() => {
                                                      saveWareHouse(index);
                                                    }}
                                                    emitUndo={resetWareHouse}
                                                    onChange={(e) => {
                                                      onWareHouseChange(e);
                                                    }}
                                                  />
                                                </span>
                                              )}
                                            </SalesOrderItemLabel>

                                            <SalesOrderItemLabel>
                                              <p
                                                style={{
                                                  margin: "0px",
                                                }}
                                              >
                                                Order UOM
                                              </p>

                                              <SalesOrderItemValue
                                                style={{
                                                  textAlign: "left",
                                                }}
                                              >
                                                {data && data.stockUom
                                                  ? data.stockUom
                                                  : "-"}
                                              </SalesOrderItemValue>
                                            </SalesOrderItemLabel>
                                          </Container>

                                          <Container>
                                            <SalesOrderItemLabel>
                                              <p
                                                style={{
                                                  margin: "0px",
                                                }}
                                              >
                                                {" "}
                                                Price
                                              </p>

                                              <SalesOrderItemValue
                                                style={{
                                                  paddingRight: "0px",
                                                }}
                                              >
                                                {data.stockPrice &&
                                                data.stockPrice
                                                  ? `$ ${data.stockPrice}`
                                                  : ""}
                                              </SalesOrderItemValue>
                                            </SalesOrderItemLabel>

                                            <SalesOrderItemLabel>
                                              {index !== productClassIndex && (
                                                <>
                                                  <div
                                                    style={{
                                                      display: "inline-block",
                                                      margin: "0px",
                                                    }}
                                                    onClick={() => {
                                                      onPrClassEdit(
                                                        data,
                                                        index
                                                      );
                                                    }}
                                                    onKeyDown={(event) => {
                                                      if (
                                                        event.key === "Enter" ||
                                                        event.key === " "
                                                      ) {
                                                        onPrClassEdit(
                                                          data,
                                                          index
                                                        );
                                                      }
                                                    }}
                                                    role="button"
                                                    tabIndex={0}
                                                  >
                                                    Product Class
                                                    <img
                                                      src={ThemecolorEdit}
                                                      style={{
                                                        paddingLeft: "8px",
                                                        cursor: "pointer",
                                                      }}
                                                      className={
                                                        opacity
                                                          ? "isHidden"
                                                          : "edit-icon"
                                                      }
                                                      alt="loading"
                                                    />
                                                  </div>
                                                  <ProductClassValue>
                                                    {data && data.productClass
                                                      ? data.productClass
                                                      : "---"}
                                                  </ProductClassValue>
                                                </>
                                              )}
                                              {index === productClassIndex && (
                                                <span ref={ref}>
                                                  <PiSelect
                                                    name="product_class"
                                                    placeholder="Select"
                                                    isMulti={false}
                                                    options={
                                                      productClassOptions
                                                    }
                                                    libraryType="atalskit"
                                                    label="Product Class"
                                                    isMandatory
                                                    isIcons
                                                    onChange={(e: any) => {
                                                      onProductClassChange(e);
                                                    }}
                                                    emitSave={() => {
                                                      savePrclassValue(index);
                                                    }}
                                                    emitUndo={resetPrclassValue}
                                                    value={productClassValue}
                                                  />
                                                </span>
                                              )}
                                            </SalesOrderItemLabel>

                                            <SalesOrderItemLabel>
                                              <>
                                                <p
                                                  style={{
                                                    margin: "0px",
                                                  }}
                                                >
                                                  Lead Time
                                                </p>

                                                <SalesOrderItemValue>
                                                  {data &&
                                                  data.lead_time_value +
                                                    data.lead_time_label
                                                    ? `${data.lead_time_value} ${data.lead_time_label}`
                                                    : "-"}
                                                </SalesOrderItemValue>
                                              </>
                                            </SalesOrderItemLabel>
                                          </Container>

                                          <div
                                            style={{
                                              display: "flex",
                                              gap: "16px",
                                              alignItems: "flex-start",
                                              height: "70px",
                                            }}
                                          >
                                            <LineShipeDateContainer>
                                              {index !== itemIndex && (
                                                <>
                                                  <div
                                                    style={{
                                                      margin: "0px",
                                                    }}
                                                    onClick={() => {
                                                      onEditLineDate(
                                                        data.line_ship_date ===
                                                          ""
                                                          ? moment(
                                                              lineShipDate,
                                                              "MM-DD-YYYY"
                                                            ).format(
                                                              "YYYY-MM-DD"
                                                            )
                                                          : data.line_ship_date,
                                                        index
                                                      );
                                                    }}
                                                    onKeyDown={(event) => {
                                                      if (
                                                        event.key === "Enter" ||
                                                        event.key === " "
                                                      ) {
                                                        onEditLineDate(
                                                          data.line_ship_date ===
                                                            ""
                                                            ? moment(
                                                                lineShipDate,
                                                                "MM-DD-YYYY"
                                                              ).format(
                                                                "YYYY-MM-DD"
                                                              )
                                                            : data.line_ship_date,
                                                          index
                                                        );
                                                      }
                                                    }}
                                                    role="button"
                                                    tabIndex={0}
                                                  >
                                                    Line Ship Date
                                                    <img
                                                      src={ThemecolorEdit}
                                                      style={{
                                                        paddingLeft: "8px",
                                                        cursor: "pointer",
                                                      }}
                                                      className={
                                                        opacity
                                                          ? "isHidden"
                                                          : "edit-icon"
                                                      }
                                                      alt="loading"
                                                    />
                                                  </div>
                                                  <h4
                                                    className="  color-dark m-0 items-ellipse"
                                                    title="Line Ship Date"
                                                  >
                                                    <span>
                                                      {data.line_ship_date ===
                                                      ""
                                                        ? lineShipDate
                                                        : moment(
                                                            data.line_ship_date,
                                                            "YYYY-MM-DD"
                                                          ).format(
                                                            "MM-DD-YYYY"
                                                          )}
                                                    </span>
                                                  </h4>
                                                </>
                                              )}
                                              {index === itemIndex && (
                                                <DateRangePickerDiv
                                                  ref={ref}
                                                  style={{
                                                    width: "100%",
                                                  }}
                                                  className="dt-pkr-bg-unset so-line-date "
                                                >
                                                  <PiDatePicker
                                                    helpText=""
                                                    libraryType="atalskit"
                                                    minDate="minedate"
                                                    name="line_date"
                                                    placeholder="MM/DD/YYYY"
                                                    onChange={(e: any) => {
                                                      onChangelineShipDate(
                                                        e,
                                                        index
                                                      );
                                                    }}
                                                    label="Line Ship Date"
                                                    isMandatory
                                                    value={changedlineDate}
                                                  />
                                                </DateRangePickerDiv>
                                              )}
                                            </LineShipeDateContainer>
                                            <LineShipeDateContainer>
                                              {index !== itemIndexs && (
                                                <>
                                                  <div
                                                    style={{
                                                      margin: "0px",
                                                    }}
                                                    onClick={() => {
                                                      onEditCustomerDate(
                                                        data.customer_request_date ===
                                                          ""
                                                          ? moment(
                                                              customerShipDate,
                                                              "MM-DD-YYYY"
                                                            ).format(
                                                              "YYYY-MM-DD"
                                                            )
                                                          : data.customer_request_date,
                                                        index
                                                      );
                                                    }}
                                                    onKeyDown={(event) => {
                                                      if (
                                                        event.key === "Enter" ||
                                                        event.key === " "
                                                      ) {
                                                        onEditCustomerDate(
                                                          data.customer_request_date ===
                                                            ""
                                                            ? moment(
                                                                customerShipDate,
                                                                "MM-DD-YYYY"
                                                              ).format(
                                                                "YYYY-MM-DD"
                                                              )
                                                            : data.customer_request_date,
                                                          index
                                                        );
                                                      }
                                                    }}
                                                    role="button"
                                                    tabIndex={0}
                                                  >
                                                    Customer Request Date
                                                    <img
                                                      src={ThemecolorEdit}
                                                      style={{
                                                        paddingLeft: "8px",
                                                        cursor: "pointer",
                                                      }}
                                                      className={
                                                        opacity
                                                          ? "isHidden"
                                                          : "edit-icon"
                                                      }
                                                      alt="loading"
                                                    />
                                                  </div>
                                                  <h4
                                                    className="fs-10 semiBoldWt color-dark m-0 items-ellipse"
                                                    title="Customer Request Date"
                                                  >
                                                    <span>
                                                      {data.customer_request_date ===
                                                      ""
                                                        ? customerShipDate
                                                        : moment(
                                                            data.customer_request_date,
                                                            "YYYY-MM-DD"
                                                          ).format(
                                                            "MM-DD-YYYY"
                                                          )}
                                                    </span>
                                                  </h4>
                                                </>
                                              )}
                                              {index === itemIndexs && (
                                                <DateRangePickerDiv
                                                  ref={ref}
                                                  style={{
                                                    width: "100%",
                                                  }}
                                                  className="dt-pkr-bg-unset so-line-date "
                                                >
                                                  <PiDatePicker
                                                    // dateFormat="MM/DD/YYYY"
                                                    helpText=""
                                                    libraryType="atalskit"
                                                    minDate="minDate"
                                                    name=""
                                                    placeholder="MM/DD/YYYY"
                                                    onChange={(e: any) => {
                                                      onChangeCustomerShipDate(
                                                        e,
                                                        index
                                                      );
                                                    }}
                                                    label=" Customer Request Date"
                                                    isMandatory
                                                    value={changedCustomerDate}
                                                  />
                                                </DateRangePickerDiv>
                                              )}
                                            </LineShipeDateContainer>
                                          </div>
                                          <ProductClassContainer
                                            style={{
                                              width: "unset",
                                              flexDirection: "column",
                                              gap: "8px",
                                              height: "70px",
                                            }}
                                          >
                                            {index !== desIndex && (
                                              <>
                                                <div
                                                  style={{
                                                    display: "inline-block",
                                                    margin: "0px",
                                                    color: "#4e586d",
                                                    fontWeight: "400",
                                                  }}
                                                  onClick={() => {
                                                    onDesEdit(data, index);
                                                  }}
                                                  onKeyDown={(event) => {
                                                    if (
                                                      event.key === "Enter" ||
                                                      event.key === " "
                                                    ) {
                                                      onDesEdit(data, index);
                                                    }
                                                  }}
                                                  role="button"
                                                  tabIndex={0}
                                                >
                                                  Stock Description
                                                  <img
                                                    src={ThemecolorEdit}
                                                    style={{
                                                      paddingLeft: "8px",
                                                      cursor: "pointer",
                                                    }}
                                                    className={
                                                      opacity
                                                        ? "isHidden"
                                                        : "edit-icon"
                                                    }
                                                    alt="loading"
                                                  />
                                                </div>

                                                <ProductClassValue>
                                                  {data && data.stockDesc
                                                    ? data.stockDesc
                                                    : "---"}
                                                </ProductClassValue>
                                              </>
                                            )}

                                            {index === desIndex && (
                                              <span ref={ref}>
                                                <PiInput
                                                  libraryType="atalskit"
                                                  name="Stock_Description"
                                                  placeholder="Enter Stock Description"
                                                  label="Stock Description"
                                                  isMandatory
                                                  isIcons
                                                  onChange={(e: any) => {
                                                    onDesChange(e);
                                                  }}
                                                  emitSave={() => {
                                                    saveDesValue(index);
                                                  }}
                                                  maxLength={50}
                                                  emitUndo={resetDesValue}
                                                  value={desValue}
                                                />
                                              </span>
                                            )}
                                          </ProductClassContainer>

                                          <ItemNotesContainer>
                                            <PiTextArea
                                              name="item_notes"
                                              helpText=""
                                              label="Item Notes"
                                              libraryType="atalskit"
                                              onChange={(e: any) => {
                                                onItemNotesChanges(e, index);
                                              }}
                                              placeholder="Enter Item Notes"
                                              isDisabled={opacity}
                                              // value={""}
                                              defaultValue={
                                                data.notes
                                                  ? data.notes.replace(
                                                      /<\/?[^>]+>/gi,
                                                      ""
                                                    )
                                                  : ""
                                              }
                                            />
                                          </ItemNotesContainer>
                                        </CardBody>
                                      </CardTopDetails>
                                    </StockLineItemCard>
                                  )
                                )}
                            </div>
                          )}
                        {errorMsg && errorMsg && errorMsg.length > 0 && (
                          <>
                            {errorMsg.map((data: any) => (
                              <SoErrorMsgs>
                                <div>Stock Code {data} does not exist</div>
                                <PiTooltip
                                  content="Add Item In Syspro"
                                  libraryType="atalskit"
                                >
                                  <div className="tooltip bottom">
                                    <LinkWithIcon
                                      onClick={(e: any) => {
                                        onShowStockLineModel(e, data);
                                      }}
                                    >
                                      <ImgTag src={AddLogo} />
                                    </LinkWithIcon>
                                  </div>
                                </PiTooltip>
                              </SoErrorMsgs>
                            ))}
                          </>
                        )}
                      </>
                    </PartsPurchaseFormContainer>

                    <CreateJobSideDrawerFooter
                      className={serverMsg === "" ? "is-serverMsg" : ""}
                    >
                      {serverMsg && (
                        <CreateJobValidationMsg>
                          {serverMsg && serverMsg ? serverMsg : ""}
                        </CreateJobValidationMsg>
                      )}
                      <CreateJobButtonContainer
                        className={serverMsg === "" ? "" : "flex-1"}
                      >
                        <PiButton
                          appearance="primary"
                          label="Create"
                          onClick={() => {
                            formSubmit();
                          }}
                          isDisabled={
                            isChecked &&
                            totalCheckedItems &&
                            totalCheckedItems.length > 0
                              ? false
                              : isChecked &&
                                  totalCheckedItems &&
                                  totalCheckedItems.length === 0
                                ? true
                                : stcokLineItemCards &&
                                    stcokLineItemCards.length === 0
                                  ? true
                                  : opacity
                          }
                        />
                      </CreateJobButtonContainer>
                    </CreateJobSideDrawerFooter>
                  </>
                )}
              </Formik>
            )}
          </SideDrawerContainer>
        </PiSideDrawer>
      </Socontainer>
      {showStocklineModel && (
        <CreateStockItems
          sendModelData={(e: any) => onSoaction(e)}
          getStocklineDetails={stockLineDetails || ""}
        />
      )}
      <PiToast
        className={showPopup ? "show" : ""}
        headerLabel="Create Sales Order"
        message="Sales Order Created Successfully "
        onClose={async () => setShowPopup(false)}
      />
      <PiConfirmModel
        className={showQtyValidatin ? "show show text-red" : ""}
        headerLabel={errorPopupLable}
        message={showQtyValidationMsg}
        secondaryBtnLabel="Close"
        onClose={async () => {
          setShowQtyValidatin(false);
        }}
        onDecline={() => {
          setShowQtyValidatin(false);
        }}
      />
      {openCustomer && (
        <CreateSOCustomer sendData={(e: any) => triggerCustomer(e)} />
      )}
    </>
  );
}

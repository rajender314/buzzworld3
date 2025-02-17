/* eslint-disable no-nested-ternary */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  PiAttachmentList,
  PiLabelName,
  PiSelect,
  PiTypography,
  PiToast,
  PiUploader,
  PiButton,
  PiConfirmModel,
  PiInput,
  PiSpinner,
  PiTooltip,
} from "pixel-kit";
import {
  DetailContent,
  DetailPageSection,
  RepairInfoSection,
  TabContainer,
} from "@app/components/detail-view-content/detail-view-content.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi, token } from "@app/services";
import {
  ItemCard,
  NoRepairFound,
  RepairCardBody,
  RepairCardsHeader,
  RepairItemCardWrapper,
} from "@app/components/RepairItems/repair-items.component";
import {
  UserNameField,
  AvatarSection,
} from "@app/components/RepairInformation/repair-information.component";
import Avatar from "@app/assets/images/avator.svg";
import PoinfoImg from "@app/assets/images/purchase-order-info.svg";
import VendorNameIcon from "@app/assets/images/vendor_logo.svg";
import DateIcon from "@app/assets/images/Podate_icon.svg";
import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";
import _ from "lodash";
import Loader from "@app/components/Loader/loader";
import ThemecolorEdit from "@app/assets/images/themecolorEdit.svg";
import RightArrowIcon from "@app/assets/images/poinfo-right-arrow.svg";
import QuoteStatusAppearance from "@app/core/components/gridStatus/quote-status-apperance";
import { downloadFile } from "@app/helpers/helpers";
// import RowDelImg from "@app/assets/images/row_delete_img.svg";
import deleteIcon from "@app/assets/images/delete-icon-red.svg";

import {
  SpinnerDiv,
  UploadNote,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import RelatedToCard from "@app/core/components/related-to-card";
import { ApiResponse } from "@app/services/schema/schema";
import AddLogo from "@app/assets/images/Plus.svg";

import {
  ImgTag,
  LinkWithIcon,
} from "@app/components/secondaryheader/secondaryheader.component";
import formatPhoneNumbers from "@app/components/popups/add-user/formate-phone-number";

import { CardViews } from "@app/core/components/ItemsCard/item-card.component";
import { QuoteActivityPill } from "@app/core/components/gridStatus/gridStatus.component";
import { getStatusClassName } from "@app/modules/Quotes/Repair-Quotes/helpers/quote-helpers";
import PartItemsView from "./part-items-view";
import useScrollWithShadow from "../../scrollbar-shadow/hook";
import PurchaseaddItemsForm from "../purchase-add-items-form/purchase-add-items-form";
import PurchaseItemEditForm from "../purchase-items-edit-form/purchase-items-edit-form";
import PoformationForm from "../po-information-form/po-information-form";
import {
  DateSection,
  FieldDetails,
  ItemsIconHeaderContainer,
  PartsPurchaseField,
  PoContent,
  PoContentContainer,
  PoDate,
  PoId,
  POInfoTitleContainer,
  PoWrapper,
  PPItemCardTopDetails,
  PPManufacturerAvatarSection,
  PurchaseItemEditContainer,
  PurchaseOrderInfoContentContainer,
  PurchaseOrderInfoSection,
  RequestorInfoSection,
  UserRoleDropdown,
  VendorEmail,
  VendorEmailContainer,
} from "./parts-purchase-detail-view-content-components";

type Props = {
  partsPurchaseInfo: any;
  sendEventData: any;
  partpurchaseid: any;
};

export default function PartsPurchaseDetailViewContent({
  partsPurchaseInfo,
  sendEventData,
  partpurchaseid,
}: Props) {
  const [urgencyOptions, setUrgencyOptions]: any = useState();
  const [statusOptions, setStatusOptions]: any = useState();
  const [attachmentsList, setAttachmentsList]: any = useState();
  const [loading, setLoading] = useState(true);
  const [showPopupmessage, setShowPopupmessage] = useState(false);
  const [deleteDocument, setDeletedDocument] = useState(false);
  const [isUrgencyEdit, setUrgencyEdit] = useState<boolean>(false);
  const [isStatusEdit, setStatusEdit] = useState<boolean>(false);
  const [VendorPhoneEdit, setVendorPhoneEdit] = useState<boolean>(false);
  const [shippingCostEdit, setShippingcostEdit] = useState<boolean>(false);
  const [showpoForm, setShowPOform] = useState(false);
  const [statuValue, setStatusValue]: any = useState();
  const [urgencyValue, setUrgencyValue]: any = useState();
  const [statusUpdated, setStatusUpdated] = useState(false);
  const [urgencyUpdated, setUrgencyUpdated] = useState(false);
  const [phonenumberUpdated, setPhonenumberUpdated] = useState(false);
  const [poFormInfo, setPoFormInfo]: any = useState();
  const [vendorErrormsg, setVendorErrormsg] = useState<any>();
  const [vendorphValue, setVendorphValue]: any = useState<any>("");
  const [shippingCostValue, setShippingCostValue] = useState<any>("");
  const [isnumberValid, setValidnumber] = useState<boolean>();
  const [isCostValid, setValidCost] = useState<boolean>();
  const [showVendorPopup, setShowvendorPnpopup] = useState<boolean>();
  const [showShippingpoup, setShippingppoup] = useState<boolean>();
  const [showEditItemForm, setShowEditItemForm] = useState(false);
  const [showaddItemsForm, setShowAdditemsForm] = useState(false);
  const [itemsData, setItemsData] = useState<any>();
  const enableShadow = true;
  const { boxShadow, onScrollHandler } = useScrollWithShadow();
  const [openConFirm, setConFirm] = useState(false);
  const [itemId, setItemId] = useState<any>("");
  const [partsPurchaseDetails, setPartsPurchaseDetails] = useState<any>();
  const { id }: RouteParams = useParams();
  const [poiLoading, setPOILoading] = useState(false);
  const [addItemsLoading, setAddItemsLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [urgencyLoading, setUrgencyLoading] = useState(false);
  const [docLoading, setDocLoading] = useState(false);
  const [vendorPnloading, setVendorPnloading] = useState(false);
  const [shippingCostloading, setShippingcostloading] = useState(false);
  const [isEditEnable, setIsEditEnable] = useState(false);
  const [relatedData, setRelatedData] = useState([]);
  const ref = useRef<any>(null);
  const [openPartItems, setOpenPartItems] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const [orderedItemsArray, setOrderedItemsArray]: any = useState([]);
  const [showStatusChangeErr, setStatusChangeErr] = useState<boolean>();
  function getUrgencyOptions() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.PartsPurchaseFormUrgencyDropDownOptions}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success && response.result.status_code === 200) {
          const { data } = response.result;
          setUrgencyOptions(
            data && data.length
              ? data.map((item: any) => ({
                  value: item.value,
                  label: item.label,
                }))
              : []
          );
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  const getPurchaseStatusOptions = () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.getPartsPurchaseStatus}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success && response.result.status_code === 200) {
          const { data } = response.result;
          setStatusOptions(data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const [fileValidMsg, setFileValidMsg] = useState<string>("");
  useEffect(() => {
    if (partsPurchaseInfo) {
      getUrgencyOptions();
      getPurchaseStatusOptions();
      setLoading(false);
    }
  }, []);
  const getRelatedData = useCallback(() => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.RelatedData}?part_purchase_id=${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          setRelatedData(data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }, [id]);
  useEffect(() => {
    getRelatedData();
  }, [getRelatedData]);
  useEffect(() => {
    if (loading === false && partsPurchaseInfo) {
      setPartsPurchaseDetails(partsPurchaseInfo);
      let arr: any = [];
      arr = partsPurchaseInfo.part_items;
      partsPurchaseInfo.part_items.filter(
        (obj: any) => obj.status_code === "part_items_ordered"
      );
      setOrderedItemsArray(arr);
      console.log(23232);
    }
  }, [loading, partsPurchaseInfo]);
  useEffect(() => {
    (async () => {
      const permission: any = await getPermissionObject("part-purchase");

      if (permission.Edit) {
        setIsEditEnable(true);
      } else {
        setIsEditEnable(false);
      }
    })();
  }, [partsPurchaseDetails]);

  useEffect(() => {
    if (loading === false) {
      const attachments =
        partsPurchaseDetails && partsPurchaseDetails.attachment_info
          ? partsPurchaseDetails.attachment_info
          : "";

      if (attachments && attachments.length) {
        attachments.map((obj: any) => {
          obj.downloadUrl = obj.url;
          obj.largeimage = obj.url;
          obj.name = obj.original_filename;
          return obj;
        });
      }

      setAttachmentsList(attachments);
    }
  }, [partsPurchaseDetails, loading]);

  useEffect(() => {
    const handler = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setStatusEdit(false);
        setUrgencyEdit(false);
        setVendorPhoneEdit(false);
        // if (!isCostValid) {
        //   setShippingcostEdit(false);
        // }
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isStatusEdit, isUrgencyEdit, VendorPhoneEdit, shippingCostEdit]);

  const onUrgencyChange = (e: any) => {
    setUrgencyValue(e);
  };
  const onStatusChange = (e: any) => {
    setStatusValue(e);
  };
  const [serverMsg, setServerMsg] = useState("");
  const getPartsPurchaseInfo = (flag: string) => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.partPurchaseDetailview}?id=${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((res: any) => {
        if (res.result.success && res.result.status_code === 200) {
          if (flag === "statusUpdate") {
            setStatusUpdated(true);
          } else if (flag === "urgencyUpdate") {
            setUrgencyUpdated(true);
          } else if (flag === "itemDelete") {
            setDeletedDocument(true);
          } else if (flag === "docUpload") {
            setShowPopupmessage(true);
          } else if (flag === "vendorPn") {
            setPhonenumberUpdated(true);
          } else if (flag === "shippingCost") {
            setPhonenumberUpdated(true);
          }
          setShippingcostloading(false);
          setPartsPurchaseDetails(res.result.data);
          sendEventData({ success: res.result.data });
          setPOILoading(false);
          setAddItemsLoading(false);
          setStatusLoading(false);
          setUrgencyLoading(false);
          setAddItemsLoading(false);
          setDocLoading(false);
          setVendorPnloading(false);
          setVendorPhoneEdit(false);
          setShippingcostEdit(false);
        } else if (res.result.success === false) {
          setPOILoading(false);
          setAddItemsLoading(false);
          setStatusLoading(false);
          setUrgencyLoading(false);
          setVendorPnloading(false);
          setVendorPhoneEdit(false);
          setShippingcostloading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const saveStatusApi = (list?: any) => {
    setServerMsg("");
    setStatusLoading(true);
    const apiObject = {
      payload: {
        part_status_id: statuValue.value ? statuValue.value : "",
        item_id: list || "",
      },
      method: "PUT",
      apiUrl: `${EndpointUrl.editPartPurchaseStatus}/${partsPurchaseDetails && partsPurchaseDetails.requestor_info && partsPurchaseDetails.requestor_info.part_purchase_id ? partsPurchaseDetails.requestor_info.part_purchase_id : " "}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success && response.result.status_code === 200) {
          setServerMsg("");
          getPartsPurchaseInfo("statusUpdate");
          setLoading(false);
          setStatusEdit(false);
        } else if (response.result.success === false) {
          setServerMsg(response.result.data);
          setLoading(false);
          setStatusEdit(false);
          setStatusLoading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const saveStatus = () => {
    if (statuValue.status_code === "partially_received") {
      partsPurchaseInfo.part_items.map((obj: any) => {
        obj.isChecked = true;
        return obj;
      });
      setPartsPurchaseDetails(partsPurchaseInfo);

      if (orderedItemsArray.length) {
        setStatusChangeErr(false);
        setOpenPartItems(true);
      } else {
        setVendorErrormsg("Ordered Items Not Found");
        setStatusChangeErr(true);
      }
      return;
    }
    saveStatusApi();
  };

  const resetStatus = () => {
    setStatusEdit(false);
  };
  const saveUrgency = () => {
    setUrgencyLoading(true);
    const apiObject = {
      payload: {
        part_urgency_id: urgencyValue.value ? urgencyValue.value : "",
      },
      method: "PUT",
      apiUrl: `${EndpointUrl.editPartPurchaseStatus}/${partsPurchaseDetails && partsPurchaseDetails.requestor_info && partsPurchaseDetails.requestor_info.part_purchase_id ? partsPurchaseDetails.requestor_info.part_purchase_id : " "}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success && response.result.status_code === 200) {
          setUrgencyEdit(false);
          getPartsPurchaseInfo("urgencyUpdate");
        } else if (response.result.success === false) {
          setUrgencyLoading(false);
          setUrgencyEdit(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const resetUrgency = () => {
    setUrgencyEdit(false);
  };

  async function onDrop(files: Array<File>) {
    if (!files.length) {
      setFileValidMsg("Invalid File");
      return;
    }
    setFileValidMsg("");
    const formData = new FormData();
    for (let i = 0; i < files.length; i += 1) {
      formData.append(`files[${i}]`, files[i]);
    }

    formData.append("container", "part_purchase");
    formData.append("part_purchase_id", id);
    setDocLoading(true);
    await axios({
      url: process.env.REACT_APP_API_URL + EndpointUrl.PartPurchaseUpload,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },

      data: formData,
    })
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          getPartsPurchaseInfo("docUpload");
        } else if (res.status !== 200) {
          setDocLoading(false);
        }
      })
      .catch((err: string) => {
        console.log(err, "Error");
      });
  }

  const deleteImgFile = async (e: any) => {
    setDocLoading(true);
    const apiObject = {
      payload: {},
      method: "DELETE",
      apiUrl: `${EndpointUrl.Attachments}/${e.attachment_id}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then(async (response: any) => {
        if (response.result.success) {
          setTimeout(() => {
            setDeletedDocument(true);
          }, 500);

          const indx = _.findIndex(attachmentsList, { id: e.attachment_id });
          attachmentsList.splice(indx, 1);
          setAttachmentsList([...attachmentsList]);
          setDocLoading(false);
        } else if (response.result.success === false) {
          setDocLoading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };

  async function onPoaction(e: any) {
    if (e && e.closeModel) {
      setShowPOform(false);
    } else if (e && e.AddPoinfoSuccess) {
      setShowPOform(false);
      setPOILoading(true);
      getPartsPurchaseInfo("POadd");
    }
  }
  const openPoForm = (data: any) => {
    if (isEditEnable) {
      setShowPOform(true);
    }
    setPoFormInfo(data);
  };
  const addPo = () => {
    setShowPOform(true);
  };

  const saveVendorPhone = () => {
    if (!isnumberValid && vendorphValue !== "") {
      setShowvendorPnpopup(true);
      setVendorErrormsg("Vendor Phone number not valid ! ");
    } else if (vendorphValue === "") {
      setShowvendorPnpopup(true);
      setVendorErrormsg("Please Enter Vendor phone number ! ");
    } else {
      setVendorPnloading(true);
      const apiObject = {
        payload: {
          vendor_phone: vendorphValue || "",
        },
        method: "PUT",
        apiUrl: `${EndpointUrl.ChangePartPurchaseVendorInfo}/${partsPurchaseDetails && partsPurchaseDetails.requestor_info && partsPurchaseDetails.requestor_info.part_purchase_id ? partsPurchaseDetails.requestor_info.part_purchase_id : " "}`,
        headers: {},
      };
      triggerApi(apiObject)
        .then((response: any) => {
          if (response.result.success && response.result.status_code === 200) {
            getPartsPurchaseInfo("vendorPn");
          } else if (response.result.success === false) {
            setVendorPnloading(false);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  };
  const saveShippingCost = () => {
    if (!isCostValid && shippingCostValue !== "") {
      setShippingppoup(true);
      setVendorErrormsg("Shipping Cost not valid ! ");
    } else if (shippingCostValue === "") {
      setVendorErrormsg("Please Enter Shipping cost ! ");
      setShippingppoup(true);
    } else {
      setShippingcostloading(true);
      const apiObject = {
        payload: {
          shipping_costs: shippingCostValue || "",
        },
        method: "PUT",
        apiUrl: `${EndpointUrl.ChangePartPurchaseVendorInfo}/${partsPurchaseDetails && partsPurchaseDetails.requestor_info && partsPurchaseDetails.requestor_info.part_purchase_id ? partsPurchaseDetails.requestor_info.part_purchase_id : " "}`,
        headers: {},
      };
      triggerApi(apiObject)
        .then((response: any) => {
          if (response.result.success && response.result.status_code === 200) {
            getPartsPurchaseInfo("shippingCost");
          } else if (response.result.success === false) {
            setShippingcostloading(false);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  };
  const resetVendorPhone = () => {
    setVendorPhoneEdit(false);
    setVendorphValue("");
    setShowvendorPnpopup(false);
  };
  const resetShippingCost = () => {
    setShippingcostEdit(false);
    setShippingCostValue("");
    setShippingppoup(false);
  };
  const onVendorPhoneChange = (e: any) => {
    setShowvendorPnpopup(false);
    const phoneValue = formatPhoneNumbers(e.target.value);
    const phoneRegex = /^(\+1[-. ]?)?(\(?\d{3}\)?[-. ]?)?\d{3}[-. ]\d{4}$/;
    const isValidPhone = phoneRegex.test(phoneValue);

    setValidnumber(isValidPhone);
    setVendorphValue(phoneValue);
  };
  const onKeyEnterShippingCost = (e: any) => {
    if (
      !/[\d.\b]/.test(e.key) &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Enter"].includes(
        e.key
      )
    ) {
      e.preventDefault();
    } else if (
      e.target.value?.includes(".") &&
      e.target.value.split(".")[1].length >= 2 &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Enter"].includes(
        e.key
      )
    ) {
      e.preventDefault();
    }
  };

  const onShippingCostChange = (e: any) => {
    setShippingppoup(false);
    const CostValue = e.target.value;
    const phoneRegex =
      /^(0(\.0{1,2})?|([1-9]\d*|0)(\.\d{1,3})?|([1-9]\d{2,}))$/;
    const isValidCost = phoneRegex.test(CostValue.replace(/[^\d.]/g, ""));
    setValidCost(isValidCost);
    setShippingCostValue(CostValue.replace(/[^\d.]/g, ""));
  };
  const onClosePopup = () => {
    setShowvendorPnpopup(false);
    setShippingppoup(false);
    setStatusChangeErr(false);
  };
  const openEditItemForm = (data: any, i: number) => {
    partsPurchaseInfo.part_items.map((item: any, index: number) => {
      if (index === i) {
        setShowEditItemForm(true);
        setItemsData(data);
      }
      return item;
    });
  };
  const openAdditemForm = () => {
    setShowAdditemsForm(true);
  };

  async function onItemaction(e: any) {
    if (e && e.closePopup) {
      setShowEditItemForm(false);
    } else if (e && e.success) {
      setShowEditItemForm(false);
      setAddItemsLoading(true);
      getRelatedData();
      getPartsPurchaseInfo("editItems");
    }
  }
  async function onAddItemaction(e: any) {
    if (e && e.closePopup) {
      setShowAdditemsForm(false);
    } else if (e && e.success) {
      setShowAdditemsForm(false);
      setAddItemsLoading(true);
      getRelatedData();
      getPartsPurchaseInfo("addItems");
    }
  }
  const onItemDelete = (data: any) => {
    setConFirm(true);
    setItemId(data && data.item_id ? data.item_id : "");
  };
  const [itemsServerMsg, setItemsServerMsg] = useState("");
  const onDeleteItem = () => {
    if (openConFirm) {
      setConFirm(false);
      setOpacity(true);
      const apiObject = {
        payload: {
          item_id: itemId,
        },
        method: "DELETE",
        apiUrl: `${EndpointUrl.DeletePurchaseItem}/${partsPurchaseDetails && partsPurchaseDetails.requestor_info && partsPurchaseDetails.requestor_info.part_purchase_id ? partsPurchaseDetails.requestor_info.part_purchase_id : " "}`,
        headers: {},
      };
      triggerApi(apiObject)
        .then((response: any) => {
          if (response.result.success && response.result.status_code === 200) {
            getRelatedData();
            setOpacity(false);
            setItemsServerMsg("");
            getPartsPurchaseInfo("itemDelete");
          } else if (response.result.success === false) {
            setOpacity(false);
            setItemsServerMsg(response.result.data);
            setTimeout(() => {
              setItemsServerMsg("");
            }, 3000);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  };
  const onStatusEdit = () => {
    statusOptions.map((item: any) => {
      if (
        item.label === partsPurchaseDetails.requestor_info.status &&
        isEditEnable
      ) {
        setStatusEdit(true);
        setStatusValue(item);
      }
      return item;
    });
  };

  const onUrgencyEdit = () => {
    urgencyOptions.map((item: any) => {
      if (item.label === partsPurchaseDetails.requestor_info.urgency) {
        setUrgencyEdit(true);
        setUrgencyValue({
          value: item.value,
          label: item.label,
        });
      }
      return item;
    });
  };
  const onVendorPhoneEdit = () => {
    setVendorphValue(partsPurchaseInfo.vendor_info.vendor_phone);
    setValidnumber(true);
    setVendorPhoneEdit(true);
  };
  const onShippingcostEdit = () => {
    setShippingcostEdit(true);
    setValidCost(true);
    setShippingCostValue(
      partsPurchaseInfo?.vendor_info?.shipping_costs.replace(/[^\d.]/g, "")
    );
  };

  const triggerItems = (e: any) => {
    if (e.close) {
      setOpenPartItems(false);
    } else if (e.success) {
      saveStatusApi(e.selectedList);
      setOpenPartItems(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <DetailPageSection>
          <DetailContent>
            <TabContainer>
              <RequestorInfoSection>
                <div className="rep-label-typo">
                  <PiTypography component="h4">
                    Requestor Information
                  </PiTypography>
                </div>

                <FieldDetails
                  className="field-details"
                  style={{ marginTop: "24px" }}
                >
                  <UserNameField
                    className="calc-width-33"
                    // style={{ padding: "18px 0px" }}
                  >
                    <p> Technician</p>
                    <AvatarSection>
                      <img src={Avatar} alt="loading" />
                      <p className="user-name">
                        {partsPurchaseDetails &&
                        partsPurchaseDetails.requestor_info &&
                        partsPurchaseDetails.requestor_info.technician_name
                          ? partsPurchaseDetails.requestor_info.technician_name
                          : "-"}
                      </p>
                    </AvatarSection>
                  </UserNameField>

                  <UserNameField
                    className="calc-width-33"
                    // style={{ padding: "18px 0px" }}
                  >
                    <p> Date Requested</p>
                    <DateSection>
                      <img src={DateIcon} alt="loading" />
                      <p className="user-name">
                        {partsPurchaseDetails &&
                        partsPurchaseDetails.requestor_info &&
                        partsPurchaseDetails.requestor_info.requested_date
                          ? partsPurchaseDetails.requestor_info.requested_date
                          : "-"}
                      </p>
                    </DateSection>
                  </UserNameField>
                  {statusLoading && (
                    <PartsPurchaseField className="calc-width-33">
                      <SpinnerDiv
                        style={{
                          height: "unset",
                          minHeight: "unset",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <PiSpinner
                          color="primary"
                          size={30}
                          libraryType="atalskit"
                        />
                      </SpinnerDiv>
                    </PartsPurchaseField>
                  )}

                  {!statusLoading && (
                    <PartsPurchaseField className="calc-width-33">
                      {!isStatusEdit && (
                        <>
                          <PiLabelName
                            description={QuoteStatusAppearance(
                              partsPurchaseDetails &&
                                partsPurchaseDetails.requestor_info.status
                                ? partsPurchaseDetails.requestor_info.status
                                : "---"
                            )}
                            label="Status"
                            isEditIcon={
                              !!(
                                statusOptions &&
                                statusOptions.length > 0 &&
                                isEditEnable
                              )
                            }
                            emitSave={onStatusEdit}
                          />

                          {/* {statusOptions &&
                            statusOptions.length &&
                            isEditEnable && (
                              <img
                                src={ThemecolorEdit}
                                className={"edit-icon"}
                                alt="loading"
                                onClick={() => {
                                  onStatusEdit();
                                }}
                              />
                            )} */}
                        </>
                      )}

                      {isStatusEdit && (
                        <UserRoleDropdown
                          className="user_role_dropdown"
                          style={{ width: "223px", margin: "0" }}
                          ref={ref}
                        >
                          <PiSelect
                            label="Status"
                            libraryType="atalskit"
                            name="select_status"
                            onChange={(e) => {
                              onStatusChange(e);
                            }}
                            value={statuValue}
                            options={statusOptions}
                            placeholder="select Status"
                            isIcons
                            emitSave={saveStatus}
                            emitUndo={resetStatus}
                          />
                        </UserRoleDropdown>
                      )}
                    </PartsPurchaseField>
                  )}
                  {urgencyLoading && (
                    <PartsPurchaseField className="calc-width-33">
                      <SpinnerDiv
                        style={{
                          height: "unset",
                          minHeight: "unset",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <PiSpinner
                          color="primary"
                          size={30}
                          libraryType="atalskit"
                        />
                      </SpinnerDiv>
                    </PartsPurchaseField>
                  )}
                  {!urgencyLoading && (
                    <PartsPurchaseField
                      className="calc-width-33"
                      style={{ flexDirection: "column" }}
                    >
                      {!isUrgencyEdit && (
                        <PiLabelName
                          description={
                            partsPurchaseDetails &&
                            partsPurchaseDetails.requestor_info.urgency
                              ? partsPurchaseDetails.requestor_info.urgency
                              : "---"
                          }
                          label="Urgency"
                          isEditIcon={
                            !!(
                              urgencyOptions &&
                              urgencyOptions.length > 0 &&
                              isEditEnable
                            )
                          }
                          emitSave={onUrgencyEdit}
                        />
                      )}

                      {isUrgencyEdit && (
                        <UserRoleDropdown
                          className="user_role_dropdown"
                          style={{ width: "223px" }}
                          ref={ref}
                        >
                          <PiSelect
                            label="Urgency"
                            libraryType="atalskit"
                            name="select_urgency"
                            onChange={(e) => {
                              onUrgencyChange(e);
                            }}
                            value={urgencyValue}
                            options={urgencyOptions}
                            placeholder="select urgency"
                            isIcons
                            emitSave={saveUrgency}
                            emitUndo={resetUrgency}
                          />
                        </UserRoleDropdown>
                      )}
                    </PartsPurchaseField>
                  )}
                </FieldDetails>
                {serverMsg && <div className="server-msg">{serverMsg}</div>}
              </RequestorInfoSection>

              <RequestorInfoSection>
                <div className="rep-label-typo">
                  <PiTypography component="h4">Vendor Information</PiTypography>
                </div>

                <FieldDetails
                  className="field-details"
                  style={{ marginTop: "24px" }}
                >
                  <UserNameField
                    className="calc-width-33"
                    // style={{ padding: "18px 0px" }}
                  >
                    <p> Vendor Name</p>
                    <AvatarSection>
                      {partsPurchaseDetails &&
                      partsPurchaseDetails.vendor_info &&
                      partsPurchaseDetails.vendor_info.vendor_name ? (
                        <img
                          src={VendorNameIcon}
                          alt="loading"
                          style={{ borderRadius: "unset" }}
                        />
                      ) : (
                        ""
                      )}

                      <p className="user-name">
                        {partsPurchaseDetails &&
                        partsPurchaseDetails.vendor_info &&
                        partsPurchaseDetails.vendor_info.vendor_name
                          ? partsPurchaseDetails.vendor_info.vendor_name
                          : "-"}
                      </p>
                    </AvatarSection>
                  </UserNameField>

                  <UserNameField
                    className="calc-width-33"
                    // style={{ padding: "18px 0px" }}
                  >
                    <p>Vendor Contact Name</p>
                    <AvatarSection>
                      <img src={Avatar} alt="loading" />
                      <p className="user-name">
                        {partsPurchaseDetails &&
                        partsPurchaseDetails.vendor_info &&
                        partsPurchaseDetails.vendor_info.vendor_contact_name
                          ? partsPurchaseDetails.vendor_info.vendor_contact_name
                          : "-"}
                      </p>
                    </AvatarSection>
                  </UserNameField>

                  <PartsPurchaseField className="calc-width-33">
                    <VendorEmailContainer>
                      <VendorEmail>
                        <p>Vendor Email</p>
                      </VendorEmail>
                      <p
                        style={{
                          marginTop: "4px",
                          textTransform: "unset",
                        }}
                      >
                        {partsPurchaseDetails &&
                        partsPurchaseDetails.vendor_info &&
                        partsPurchaseDetails.vendor_info.vendor_email
                          ? partsPurchaseDetails.vendor_info.vendor_email
                          : "---"}
                      </p>
                    </VendorEmailContainer>
                  </PartsPurchaseField>

                  {vendorPnloading && (
                    <PartsPurchaseField className="calc-width-33">
                      <SpinnerDiv
                        style={{
                          height: "unset",
                          minHeight: "unset",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <PiSpinner
                          color="primary"
                          size={30}
                          libraryType="atalskit"
                        />
                      </SpinnerDiv>
                    </PartsPurchaseField>
                  )}

                  {!vendorPnloading && (
                    <PartsPurchaseField className="calc-width-33">
                      <div>
                        {!VendorPhoneEdit && (
                          <PiLabelName
                            description={
                              partsPurchaseDetails &&
                              partsPurchaseDetails.vendor_info &&
                              partsPurchaseDetails.vendor_info.vendor_phone
                                ? partsPurchaseDetails.vendor_info.vendor_phone
                                : "-"
                            }
                            label="Vendor Phone Number"
                            isEditIcon={
                              !VendorPhoneEdit &&
                              partsPurchaseDetails &&
                              partsPurchaseDetails.requestor_info.status ===
                                "Requested" &&
                              isEditEnable
                            }
                            emitSave={() => {
                              onVendorPhoneEdit();
                            }}
                          />
                        )}
                      </div>
                      {VendorPhoneEdit && (
                        <div ref={ref}>
                          <PiInput
                            name="vendor_phone"
                            onChange={(e) => {
                              onVendorPhoneChange(e);
                            }}
                            value={vendorphValue}
                            label="Vendor Phone Number"
                            placeholder="Enter Vendor Phone Number"
                            isIcons
                            emitSave={saveVendorPhone}
                            emitUndo={resetVendorPhone}
                            maxLength={16}
                          />
                        </div>
                      )}
                    </PartsPurchaseField>
                  )}
                  <PartsPurchaseField className="calc-width-33">
                    <PiLabelName
                      description={
                        partsPurchaseDetails &&
                        partsPurchaseDetails.vendor_info &&
                        partsPurchaseDetails.vendor_info.vendor_website
                          ? partsPurchaseDetails.vendor_info.vendor_website
                          : "-"
                      }
                      label="Vendor Website"
                    />
                  </PartsPurchaseField>

                  <PartsPurchaseField className="calc-width-33">
                    <PiLabelName
                      description={
                        partsPurchaseDetails &&
                        partsPurchaseDetails.vendor_info &&
                        partsPurchaseDetails.vendor_info.vendor_quote_number
                          ? partsPurchaseDetails.vendor_info.vendor_quote_number
                          : "-"
                      }
                      label="Vendor Quote Number"
                    />
                  </PartsPurchaseField>
                  {shippingCostloading && (
                    <PartsPurchaseField className="calc-width-33">
                      <SpinnerDiv
                        style={{
                          height: "unset",
                          minHeight: "unset",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <PiSpinner
                          color="primary"
                          size={30}
                          libraryType="atalskit"
                        />
                      </SpinnerDiv>
                    </PartsPurchaseField>
                  )}
                  {!shippingCostloading && (
                    <PartsPurchaseField className="calc-width-33">
                      {!shippingCostEdit && (
                        <PiLabelName
                          description={
                            partsPurchaseDetails &&
                            partsPurchaseDetails.vendor_info &&
                            partsPurchaseDetails.vendor_info.shipping_costs
                              ? `$ ${partsPurchaseDetails.vendor_info.shipping_costs}`
                              : "-"
                          }
                          label="Shipping and Other Fees"
                          isEditIcon={
                            !shippingCostEdit &&
                            partsPurchaseDetails &&
                            partsPurchaseDetails.requestor_info.status ===
                              "Requested" &&
                            isEditEnable
                          }
                          emitSave={() => {
                            onShippingcostEdit();
                          }}
                        />
                      )}
                      {shippingCostEdit && (
                        <div ref={ref}>
                          <PiInput
                            name="shipping_cost"
                            onChange={(e) => {
                              onShippingCostChange(e);
                            }}
                            onKeyDown={(e) => {
                              onKeyEnterShippingCost(e);
                            }}
                            type="string"
                            label="Shipping and Other Fees"
                            placeholder="Enter Shipping and Other Fees"
                            isIcons
                            emitSave={saveShippingCost}
                            emitUndo={resetShippingCost}
                            value={shippingCostValue}
                          />
                        </div>
                      )}
                    </PartsPurchaseField>
                  )}

                  <PartsPurchaseField className="calc-width-33">
                    <PiLabelName
                      description={
                        partsPurchaseDetails &&
                        partsPurchaseDetails.vendor_info &&
                        partsPurchaseDetails.vendor_info.mtplx
                          ? `$ ${partsPurchaseDetails.vendor_info.mtplx}`
                          : "-"
                      }
                      label="MTPLX"
                    />
                  </PartsPurchaseField>
                </FieldDetails>
              </RequestorInfoSection>

              <RepairInfoSection>
                <RepairCardsHeader style={{ marginBottom: "10px" }}>
                  <div>
                    <PiTypography component="h4">{`Item Information (${partsPurchaseDetails && partsPurchaseDetails.part_items.length})`}</PiTypography>
                  </div>
                  <div className="cards-btns-group">
                    {partsPurchaseDetails &&
                      partsPurchaseDetails.requestor_info.status ===
                        "Requested" &&
                      isEditEnable && (
                        <ItemsIconHeaderContainer>
                          {partsPurchaseDetails &&
                            partsPurchaseDetails.part_items &&
                            partsPurchaseDetails.part_items.length > 0 && (
                              <div className="Button-Icon-Display">
                                <LinkWithIcon
                                  className="Icon-space primary-button "
                                  onClick={() => {
                                    openAdditemForm();
                                  }}
                                >
                                  <ImgTag src={AddLogo} alt="loading" />
                                  <span className="button-icon-text ">
                                    Add Items
                                  </span>
                                </LinkWithIcon>
                              </div>
                            )}
                        </ItemsIconHeaderContainer>
                      )}
                  </div>
                </RepairCardsHeader>
                {addItemsLoading && (
                  <SpinnerDiv style={{ height: "100%" }}>
                    <PiSpinner
                      color="primary"
                      size={50}
                      libraryType="atalskit"
                    />
                  </SpinnerDiv>
                )}
                {!addItemsLoading && (
                  <div
                    className={opacity ? "opacity-on-load" : ""}
                    style={{ position: "relative" }}
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
                    <RepairItemCardWrapper
                      onScroll={onScrollHandler}
                      className="scrollArea pp-item-cards"
                      style={enableShadow ? { boxShadow } : {}}
                    >
                      {partsPurchaseDetails &&
                        partsPurchaseDetails.part_items &&
                        partsPurchaseDetails.part_items.length > 0 &&
                        partsPurchaseDetails.part_items.map(
                          (info: any, index: number) => (
                            <ItemCard>
                              <CardViews style={{ alignItems: "unset " }}>
                                <PPItemCardTopDetails>
                                  <div>
                                    <PPManufacturerAvatarSection>
                                      <img src={VendorNameIcon} alt="loading" />
                                      <span className="user-name">
                                        {info && info.mfg_name
                                          ? info.mfg_name.toUpperCase()
                                          : "-"}
                                      </span>
                                    </PPManufacturerAvatarSection>
                                  </div>
                                  <div style={{ display: "flex", gap: "10px" }}>
                                    {info.status_code && (
                                      <h4 className="fs-16 semiBoldWt m-0">
                                        <QuoteActivityPill
                                          className={getStatusClassName(
                                            info.status_code
                                              ? info.status_code
                                              : ""
                                          )}
                                          style={{
                                            whiteSpace: "nowrap",
                                            maxWidth: "100%",
                                            textOverflow: "ellipsis",
                                          }}
                                        >
                                          {info.status ? info.status : ""}
                                        </QuoteActivityPill>
                                      </h4>
                                    )}

                                    {partsPurchaseDetails &&
                                      partsPurchaseDetails.requestor_info
                                        .status === "Requested" &&
                                      isEditEnable && (
                                        <div style={{ display: "flex" }}>
                                          <PurchaseItemEditContainer
                                            title="Edit Item"
                                            className="open"
                                            onClick={() => {
                                              openEditItemForm(info, index);
                                            }}
                                          >
                                            <img
                                              src={ThemecolorEdit}
                                              alt="chevron-right"
                                            />
                                          </PurchaseItemEditContainer>
                                          {partsPurchaseDetails &&
                                            partsPurchaseDetails.part_items &&
                                            partsPurchaseDetails.part_items
                                              .length > 1 && (
                                              <PurchaseItemEditContainer
                                                onClick={() => {
                                                  onItemDelete(info);
                                                }}
                                              >
                                                <img
                                                  className="row-del-img"
                                                  src={deleteIcon}
                                                  alt="loading"
                                                  title="Delete Item"
                                                />
                                              </PurchaseItemEditContainer>
                                            )}
                                        </div>
                                      )}
                                  </div>
                                </PPItemCardTopDetails>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "24px",
                                  }}
                                >
                                  <PiTooltip
                                    content="Line Number"
                                    libraryType="atalskit"
                                  >
                                    <div
                                      className="line-number"
                                      style={{ marginLeft: "10px" }}
                                    >
                                      {info.line_number ? info.line_number : ""}
                                    </div>
                                  </PiTooltip>
                                  <FieldDetails
                                    className="field-details"
                                    style={{ marginTop: "24px" }}
                                  >
                                    <PartsPurchaseField className="calc-width-33">
                                      <PiLabelName
                                        description={
                                          info && info.job_number
                                            ? info.job_number.label.toUpperCase()
                                            : "-"
                                        }
                                        label="Job Number"
                                        isCopyIcon={
                                          !!(info && info.job_number.label)
                                        }
                                      />
                                    </PartsPurchaseField>
                                    <PartsPurchaseField className="calc-width-33">
                                      <PiLabelName
                                        description={
                                          info && info.vendor_part_number
                                            ? info.vendor_part_number.toUpperCase()
                                            : "-"
                                        }
                                        label="Vendor Part Number"
                                        isCopyIcon={
                                          !!(info && info.vendor_part_number)
                                        }
                                      />
                                    </PartsPurchaseField>
                                    <PartsPurchaseField className="calc-width-33">
                                      <PiLabelName
                                        description={
                                          info && info.qty ? info.qty : "-"
                                        }
                                        label="Quantity"
                                        isCopyIcon={!!(info && info.qty)}
                                      />
                                    </PartsPurchaseField>

                                    <PartsPurchaseField className="calc-width-33">
                                      <PiLabelName
                                        description={
                                          info && info.notes
                                            ? info.notes.toUpperCase()
                                            : "---"
                                        }
                                        label="Item Notes"
                                        isCopyIcon={!!(info && info.notes)}
                                      />
                                    </PartsPurchaseField>
                                    <PartsPurchaseField className="calc-width-33">
                                      <PiLabelName
                                        description={
                                          info && info.cost
                                            ? `$ ${info.cost}`
                                            : "-"
                                        }
                                        label="Cost"
                                        isCopyIcon={!!(info && info.cost)}
                                      />
                                    </PartsPurchaseField>
                                    <PartsPurchaseField className="calc-width-33">
                                      <PiLabelName
                                        description={
                                          info && info.special_notes
                                            ? info.special_notes.toUpperCase()
                                            : "---"
                                        }
                                        label="Item Special Notes"
                                        isCopyIcon={
                                          !!(info && info.special_notes)
                                        }
                                      />
                                    </PartsPurchaseField>
                                    <PartsPurchaseField className="calc-width-33">
                                      <PiLabelName
                                        description={
                                          info && info.mfg_part_number
                                            ? info.mfg_part_number.toUpperCase()
                                            : "-"
                                        }
                                        label="Manufacturer Part Number"
                                        isCopyIcon={
                                          !!(info && info.mfg_part_number)
                                        }
                                      />
                                    </PartsPurchaseField>

                                    <PartsPurchaseField className="calc-width-33">
                                      <PiLabelName
                                        description={
                                          info && info.extended_cost
                                            ? `$ ${info.extended_cost}`
                                            : "-"
                                        }
                                        label="Extended Cost"
                                        isCopyIcon={
                                          !!(info && info.extended_cost)
                                        }
                                      />
                                    </PartsPurchaseField>

                                    <PartsPurchaseField className="calc-width-33">
                                      <PiLabelName
                                        description={
                                          info && info.adjusted_cost
                                            ? `$ ${info.adjusted_cost}`
                                            : "-"
                                        }
                                        label="Adjusted Cost "
                                        isCopyIcon={
                                          !!(info && info.adjusted_cost)
                                        }
                                      />
                                    </PartsPurchaseField>
                                    <PartsPurchaseField className="calc-width-33">
                                      <PiLabelName
                                        description={
                                          info && info.description
                                            ? info.description.toUpperCase()
                                            : "-"
                                        }
                                        label="Description"
                                        isCopyIcon={
                                          !!(info && info.description)
                                        }
                                      />
                                    </PartsPurchaseField>
                                  </FieldDetails>
                                </div>
                                {/* <PPItemCardMainDetails
                                    className={
                                      index ===
                                      partsPurchaseDetails.part_items.length - 1
                                        ? ""
                                        : "section-divider"
                                    }
                                  >

                                  </PPItemCardMainDetails> */}
                              </CardViews>
                            </ItemCard>
                          )
                        )}

                      {partsPurchaseDetails &&
                        partsPurchaseDetails.part_items &&
                        partsPurchaseDetails.part_items.length === 0 && (
                          <RequestorInfoSection
                            style={{ marginBottom: "10px" }}
                          >
                            <ItemsIconHeaderContainer className="no-items-found-container">
                              <NoRepairFound
                                style={{
                                  height: "unset",
                                  marginBottom: "8px",
                                }}
                              >
                                Items Not Found
                              </NoRepairFound>
                              {isEditEnable &&
                                partsPurchaseDetails &&
                                partsPurchaseDetails.requestor_info.status ===
                                  "Requested" && (
                                  <div className="Button-Icon-Display">
                                    <LinkWithIcon
                                      className="Icon-space primary-button "
                                      onClick={() => {
                                        openAdditemForm();
                                      }}
                                    >
                                      <ImgTag src={AddLogo} alt="loading" />
                                      <span className="button-icon-text ">
                                        Add Items
                                      </span>
                                    </LinkWithIcon>
                                  </div>
                                )}
                            </ItemsIconHeaderContainer>
                          </RequestorInfoSection>
                        )}
                    </RepairItemCardWrapper>
                    {itemsServerMsg && (
                      <div className="server-msg">{itemsServerMsg}</div>
                    )}
                  </div>
                )}
              </RepairInfoSection>

              <RequestorInfoSection>
                <RepairCardsHeader>
                  <PiTypography component="h4">Documents</PiTypography>
                  <div className="cards-btns-group">
                    {isEditEnable && (
                      <PiUploader
                        dropzoneProps={{
                          accept: [
                            "image/png",
                            "image/jpg",
                            "image/jpeg",
                            "application/pdf",
                          ],
                          disabled: false,
                          maxSize: 10485760,
                          multiple: true,
                          noDrag: false,
                          text: (
                            <PiButton
                              appearance="secondary"
                              label="Upload"
                              libraryType="atalskit"
                              onClick={() => {}}
                            />
                          ),
                        }}
                        onUpload={(e: Array<File>) => onDrop(e)}
                      />
                    )}
                  </div>
                </RepairCardsHeader>

                {/* <hr /> */}

                <RepairCardBody
                  className={
                    isEditEnable ? "documents-body" : "documents-body is-icons"
                  }
                  style={{
                    maxHeight: "200px",
                    minHeight: "200px",
                  }}
                >
                  <div
                    className={
                      docLoading
                        ? "documents-body opacity-on-load"
                        : "documents-body"
                    }
                    style={{ position: "relative" }}
                  >
                    {!docLoading &&
                      attachmentsList &&
                      attachmentsList.length === 0 && (
                        <NoRepairFound> Documents Not Available</NoRepairFound>
                      )}
                    {docLoading && (
                      <SpinnerDiv style={{ position: "absolute", left: "50%" }}>
                        <PiSpinner
                          color="primary"
                          size={50}
                          libraryType="atalskit"
                        />
                      </SpinnerDiv>
                    )}
                    {attachmentsList && attachmentsList.length > 0 && (
                      <PiAttachmentList
                        attachmentItems={
                          partsPurchaseDetails &&
                          partsPurchaseDetails.attachment_info
                        }
                        onClickDelete={deleteImgFile}
                        onClickDownload={downloadFile}
                        onClickPreview={() => {}}
                      />
                    )}
                  </div>
                </RepairCardBody>
                <UploadNote className="for-add-repair">
                  The maximum file upload size is 10 MB.
                </UploadNote>
                <UploadNote className="for-add-repair">
                  .jpg, .png, .jpeg, .pdf file types are supported.
                </UploadNote>
                <small
                  className="validation-error date-range-validation-error"
                  style={{
                    position: "relative",
                    top: "10px",
                    fontSize: "14px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {fileValidMsg}
                </small>
              </RequestorInfoSection>
            </TabContainer>
            <div style={{ width: "25%" }}>
              <RelatedToCard
                relatedData={relatedData}
                pageLabel="Partpurchase"
              />

              <PurchaseOrderInfoSection>
                {poiLoading && (
                  <SpinnerDiv style={{ height: "100%" }}>
                    <PiSpinner
                      color="primary"
                      size={50}
                      libraryType="atalskit"
                    />
                  </SpinnerDiv>
                )}
                {!poiLoading && (
                  <PurchaseOrderInfoContentContainer>
                    <POInfoTitleContainer>
                      <PiTypography component="h4">
                        Purchase Order Information
                      </PiTypography>
                      {/* {partsPurchaseDetails &&
                        partsPurchaseDetails.purchase_order_info &&
                        partsPurchaseDetails.purchase_order_info.length > 0 &&
                        isEditEnable &&
                        ((partsPurchaseDetails &&
                          partsPurchaseDetails.requestor_info.status ===
                            "Requested") ||
                          (partsPurchaseDetails &&
                            partsPurchaseDetails.requestor_info.status ===
                              "Ordered")) && (
                          <AddNewPOIconContainer
                            className="open"
                            title="Add PO"
                            onClick={addNewPo}
                          >
                            <img src={AddNewPO} alt="upload" />
                          </AddNewPOIconContainer>
                        )} */}
                    </POInfoTitleContainer>
                    {partsPurchaseDetails &&
                      partsPurchaseDetails.purchase_order_info &&
                      partsPurchaseDetails.purchase_order_info.length > 0 && (
                        <PoWrapper
                          onScroll={onScrollHandler}
                          className="scrollArea"
                          style={enableShadow ? { boxShadow } : {}}
                        >
                          {partsPurchaseDetails &&
                            partsPurchaseDetails.purchase_order_info &&
                            partsPurchaseDetails.purchase_order_info.map(
                              (data: any) => (
                                <PoContentContainer
                                  onClick={() => {
                                    openPoForm(data);
                                  }}
                                >
                                  <PoContent>
                                    <div className="po_div">
                                      <img src={PoinfoImg} alt="PO Info Img" />
                                    </div>
                                    <PoId>{data.purchase_order_number}</PoId>
                                  </PoContent>
                                  <PoContent>
                                    <div className="po_date">
                                      <img src={DateIcon} alt="Delete Icon" />
                                    </div>
                                    <PoDate>
                                      {data.confirmed_delivery_date}
                                      <span>
                                        <img
                                          src={RightArrowIcon}
                                          alt="right arrow"
                                        />
                                      </span>
                                    </PoDate>
                                  </PoContent>
                                </PoContentContainer>
                              )
                            )}
                        </PoWrapper>
                      )}

                    {partsPurchaseDetails &&
                      partsPurchaseDetails.purchase_order_info &&
                      partsPurchaseDetails.purchase_order_info.length === 0 && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <PoContent
                            style={{
                              color: "#6d7992",
                              marginBottom: "8px",
                              fontSize: "14px",
                              fontWeight: "500",
                              lineHeight: "24px",
                            }}
                          >
                            POs Not Found
                          </PoContent>
                          {isEditEnable &&
                            ((partsPurchaseDetails &&
                              partsPurchaseDetails.requestor_info.status ===
                                "Requested") ||
                              (partsPurchaseDetails &&
                                partsPurchaseDetails.requestor_info.status ===
                                  "Ordered")) && (
                              <div className="Button-Icon-Display">
                                <LinkWithIcon
                                  className="Icon-space primary-button "
                                  onClick={addPo}
                                >
                                  <ImgTag src={AddLogo} alt="loading" />
                                  <span className="button-icon-text ">
                                    Add PO
                                  </span>
                                </LinkWithIcon>
                              </div>
                            )}
                        </div>
                      )}
                  </PurchaseOrderInfoContentContainer>
                )}
                {showpoForm && (
                  <PoformationForm
                    sendPoInfoData={(e: any) => onPoaction(e)}
                    Poformation={poFormInfo}
                    partpurchaseid={partpurchaseid}
                  />
                )}
                {showEditItemForm && (
                  <PurchaseItemEditForm
                    sendItemAction={(e: any) => onItemaction(e)}
                    Mtplx={
                      partsPurchaseDetails &&
                      partsPurchaseDetails.vendor_info &&
                      partsPurchaseDetails.vendor_info.mtplx
                        ? partsPurchaseDetails.vendor_info.mtplx
                        : ""
                    }
                    Itemformation={itemsData && itemsData ? itemsData : ""}
                    PurchaseId={
                      partsPurchaseDetails &&
                      partsPurchaseDetails.requestor_info &&
                      partsPurchaseDetails.requestor_info.part_purchase_id
                        ? partsPurchaseDetails.requestor_info.part_purchase_id
                        : " "
                    }
                  />
                )}
                {showaddItemsForm && (
                  <PurchaseaddItemsForm
                    sendAddItemAction={(e: any) => onAddItemaction(e)}
                    PurchaseId={
                      partsPurchaseDetails &&
                      partsPurchaseDetails.requestor_info &&
                      partsPurchaseDetails.requestor_info.part_purchase_id
                        ? partsPurchaseDetails.requestor_info.part_purchase_id
                        : " "
                    }
                  />
                )}
              </PurchaseOrderInfoSection>
            </div>
          </DetailContent>
        </DetailPageSection>
      )}
      <PiToast
        className={
          showPopupmessage ||
          deleteDocument ||
          statusUpdated ||
          urgencyUpdated ||
          phonenumberUpdated
            ? "show"
            : ""
        }
        headerLabel={
          deleteDocument
            ? "Deleted Successfully"
            : showPopupmessage
              ? "Uploaded Successfully"
              : statusUpdated
                ? "Status Changed Successfully"
                : urgencyUpdated
                  ? "Urgency Changed Successfully"
                  : phonenumberUpdated
                    ? "Vendor Information Changed Successfully"
                    : ""
        }
        message=""
        onClose={async () => {
          setShowPopupmessage(false);
          setDeletedDocument(false);
          setStatusUpdated(false);
          setUrgencyUpdated(false);
          setPhonenumberUpdated(false);
        }}
      />
      <PiConfirmModel
        className={
          showStatusChangeErr || showVendorPopup || showShippingpoup
            ? "show text-red"
            : ""
        }
        headerLabel={
          showVendorPopup
            ? "Vendor Phone Number"
            : showShippingpoup
              ? "Shipping Cost"
              : showStatusChangeErr
                ? "Warning"
                : ""
        }
        message={vendorErrormsg}
        secondaryBtnLabel="Close"
        onClose={async () => {
          setShowvendorPnpopup(false);
          setShippingppoup(false);
          setStatusChangeErr(false);
        }}
        onDecline={onClosePopup}
      />
      <PiConfirmModel
        className={openConFirm ? "show" : ""}
        headerLabel="Confirmation"
        message="Are you sure you want to delete this Item"
        primaryBtnLabel="Yes"
        secondaryBtnLabel="No"
        onClose={() => {
          setConFirm(false);
        }}
        onAccept={onDeleteItem}
        onDecline={() => {
          setConFirm(false);
        }}
      />
      {openPartItems && (
        <PartItemsView
          partsPurchaseList={partsPurchaseDetails}
          sendModelData={triggerItems}
        />
      )}
    </>
  );
}

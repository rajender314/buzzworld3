import {
  PiSideDrawer,
  PiTabGroup,
  PiTabHeader,
  PiTabHeaderPanel,
  PiTabPanel,
  PiToast,
  PiTypography,
} from "pixel-kit";
import { lazy, Suspense, useEffect, useState } from "react";
import CrossLogo from "@app/assets/images/cross.svg";
import PartsPurchase from "@app/assets/images/partspurchase-detailview.svg";
import {
  CloseButton,
  JobPopupHeaderContainer,
} from "@app/components/Jobs-components/job-check-list/jobModel/job-model-component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";

// import VendorinformationForm from '../vendor-Information-form/vendor-Information-form'
// import IteminformationForm from "../item-Information-form/item-Information-form";
import { useHistory } from "react-router-dom";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import RequestorinformationForm from "../requestor-information-form/requestor-information-form";
import {
  PartsPurchaseTabs,
  PurchaseFormSideDrawer,
} from "./parts-purchase-form-components";

const IteminformationForm = lazy(
  () => import("../item-Information-form/item-Information-form")
);
const VendorinformationForm = lazy(
  () => import("../vendor-Information-form/vendor-Information-form")
);

type Props = {
  repairItemId: string;
  sendModelData: any;
};
export default function PartsPurchaseForm({
  repairItemId,
  sendModelData,
}: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const [showPopupmessage, setShowPopupmessage] = useState(false);
  const payload: any = [];
  const history = useHistory();
  const [isallow, setisAllow] = useState(true);
  const [isVendorFormValid, setisVendorFormValid] = useState(true);
  const [vendorAttachements, setVendorAttachents] = useState<any>("");
  const [prefillFormData, setPrefillFormData] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [secondformIsValid, setSecondFormIsValid] = useState(false);
  const [prefillJobNumber, setPrefillJobNumber] = useState();
  const getJobNumber = async () => {
    const apiObject = {
      payload: { repair_item_id: repairItemId || "" },
      method: "POST",
      apiUrl: `${EndpointUrl.getRepairItemJobId}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then((res: any) => {
        if (res.result.success && res.result.status_code === 200) {
          setPrefillJobNumber(res.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  function getPartPurchaseFormData() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.PPRMA}/${repairItemId || ""}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success) {
          setPrefillFormData(response.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if (repairItemId) {
      getPartPurchaseFormData();
    }
  }, []);
  function tabChange(indx: number) {
    if (
      (indx === 1 && formIsValid) ||
      (indx === 0 && secondformIsValid) ||
      (indx === 2 && formIsValid && secondformIsValid)
    ) {
      setTabIndex(indx);
    } else if (formIsValid && indx !== 2) {
      setTabIndex(indx);
    }
  }

  useEffect(() => {
    if (repairItemId) {
      getJobNumber();
    }
  }, [repairItemId]);

  function closeModel() {
    sendModelData({ success: false });
  }

  async function getRequestorInformation(e: any) {
    if (e) {
      setTabIndex(tabIndex + 1);
      payload.push(e);
    }
  }

  async function getVendorInformation(e: any) {
    if (e) {
      setTabIndex(tabIndex + 1);
      payload.push(e);
    }
  }
  async function getVendorUploadData(e: any) {
    if (e && e.vendorData) {
      setVendorAttachents(
        e && e.vendorData && e.vendorData[0] ? e.vendorData[0] : ""
      );
    }
  }

  async function getApiStatus(e: any) {
    if (e && e.id) {
      setShowPopupmessage(true);
      setTimeout(() => {
        history.push(`/parts-purchase-detail-view/${e.id}`);
      }, 1500);
      setTimeout(() => {
        sendModelData({ success: true });
      }, 1000);
    }
  }

  async function getabIndex(e: any) {
    if (e) {
      setFormIsValid(e.isValid);
      payload.push(e.values);
    }
    if (formIsValid) {
      setisAllow(false);
    } else {
      setisAllow(true);
    }
  }

  async function getabIndex2(e: any) {
    if (e) {
      setSecondFormIsValid(e.isValid);
      payload.push(e.values);
    }
    if (secondformIsValid) {
      setisVendorFormValid(false);
    } else {
      setisVendorFormValid(true);
    }
  }
  return (
    <>
      <PurchaseFormSideDrawer>
        <PiSideDrawer isOpen width="narrow">
          <SideDrawerContainer className="po-info-sidebar">
            <SideDrawerHeader>
              <JobPopupHeaderContainer>
                <img src={PartsPurchase} alt="parts-purchase" />

                <PiTypography component="h3">Parts Purchase</PiTypography>
              </JobPopupHeaderContainer>

              <CloseButton
                onClick={() => closeModel()}
                title="close"
                className="Hover"
              >
                <img src={CrossLogo} alt="parts-purchase" />
              </CloseButton>
            </SideDrawerHeader>

            <PartsPurchaseTabs>
              <PiTabGroup
                id="tab"
                onChange={(index: number) => {
                  tabChange(index);
                }}
                selected={tabIndex}
              >
                <PiTabHeaderPanel>
                  <PiTabHeader>Requestor information</PiTabHeader>
                  <div className={isallow ? "not-allow" : ""}>
                    <PiTabHeader>Vendor Information</PiTabHeader>
                  </div>
                  <div className={isVendorFormValid ? "not-allow" : ""}>
                    <PiTabHeader>Item Information</PiTabHeader>
                  </div>
                </PiTabHeaderPanel>

                <PiTabPanel>
                  <RequestorinformationForm
                    prefillFormData={prefillFormData}
                    tabIndexEvent={(e: any) => getabIndex(e)}
                    sendModelData={(e: any) => getRequestorInformation(e)}
                  />
                </PiTabPanel>

                <PiTabPanel>
                  <Suspense fallback={null}>
                    <VendorinformationForm
                      tabIndexEvent={(e: any) => getabIndex2(e)}
                      sendVendorData={(e: any) => getVendorInformation(e)}
                      sendVendorUploadData={(e: any) => getVendorUploadData(e)}
                    />
                  </Suspense>
                </PiTabPanel>

                <PiTabPanel>
                  <Suspense fallback={null}>
                    <IteminformationForm
                      repairItemId={repairItemId || ""}
                      prefillFormData={prefillFormData}
                      sendItemInfoData={(e: any) => getApiStatus(e)}
                      itemInformation={payload}
                      vendorAttachemts={vendorAttachements}
                      prefillJobNumber={prefillJobNumber}
                    />
                  </Suspense>
                </PiTabPanel>
              </PiTabGroup>
            </PartsPurchaseTabs>
          </SideDrawerContainer>
        </PiSideDrawer>
      </PurchaseFormSideDrawer>
      <PiToast
        className={showPopupmessage ? "show" : ""}
        headerLabel="Created Successfully"
        message="Parts Purchase Created"
        onClose={async () => setShowPopupmessage(false)}
      />
    </>
  );
}

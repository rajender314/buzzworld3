import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "@app/components/Loader/loader";
import OrdersDetailViewHeader from "@app/components/orders-components/orders-detail-view-header/orders-detail-view-header";
import PartsPurchaseDetailViewContent from "@app/components/parts-purchase-components/parts-purchase-detail-view-content/parts-purchase-detail-view-content";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import ErrorPage from "@app/components/page-not-found/page-not-found";
import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";

export default function PartsPurchaseDetailView() {
  const [loading, setLoading] = useState(false);
  const [purchaseInfo, setPurchaseInfo] = useState([]);
  const { id }: RouteParams = useParams();
  const [showErrorPage, setShowErrorPage] = useState(false);

  const getPartsPurchaseInfo = () => {
    setLoading(true);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.partPurchaseDetailview}?id=${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((res: any) => {
        if (res.result.success && res.result.status_code === 200) {
          setPurchaseInfo(res.result.data);
          setLoading(false);
        } else if (!res.result.success) {
          setShowErrorPage(true);
          setLoading(false);
        }
      })
      .catch((err: string) => {
        setShowErrorPage(true);
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    getPartsPurchaseInfo();
  }, []);

  async function triggerItemsEvent(e: any) {
    if (e && e.success) {
      setPurchaseInfo(e.success);
    }
  }

  return (
    <div style={{ display: "contents" }}>
      {loading && <Loader />}
      
      {!loading && !showErrorPage && (
        <div style={{ display: "contents" }}>
          <OrdersDetailViewHeader
            headerInfo={purchaseInfo}
            type="PartsPurchase"
          />
          <div className="overflow-scroll">
            <PartsPurchaseDetailViewContent
              partsPurchaseInfo={purchaseInfo}
              sendEventData={(e: any) => triggerItemsEvent(e)}
              partpurchaseid={id}
            />
          </div>
        </div>
      )}

      {showErrorPage && (
        <ErrorPage errorMsg="Parts Purchase Details Not  Found." />
      )}
    </div>
  );
}

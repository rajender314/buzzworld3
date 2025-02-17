import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import JobsDetailViewHeader from "@app/components/jobs-detail-view-header";
import Loader from "@app/components/Loader/loader";

import CreateSalesOrdersViewContent from "@app/components/orders-components/create-sales-orders-view-content";
import OrdersDetailViewHeader from "@app/components/orders-components/orders-detail-view-header/orders-detail-view-header";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";
import { triggerApi } from "@app/services";
import ErrorPage from "@app/components/page-not-found/page-not-found";

export default function OrdersDetailView() {
  const { id }: RouteParams = useParams();
  const [salesOrderInfo, setSalesOrderInfo]: any = useState();
  const [loading, setLoading]: any = useState(true);
  const [showErrorPage, setShowErrorPage] = useState(false);
  function getSalesOrderInformation() {
    setLoading(true);
    const apiObject = {
      payload: { salesOrder: id },
      method: "POST",
      apiUrl: `${EndpointUrl.SalesOrderInfo}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success && response.result.status_code === 200) {
          setSalesOrderInfo(response.result.data);
          setLoading(false);
        } else if (!response.result.success) {
          setShowErrorPage(true);
          setLoading(false);
        }
      })
      .catch((err: string) => {
        setShowErrorPage(true);
        setLoading(false);
        console.log(err);
      });
  }
  useEffect(() => {
    getSalesOrderInformation();
  }, []);

  return (
    <>
      {loading && <Loader />}

      {!loading && !showErrorPage && (
        <>
          <OrdersDetailViewHeader headerInfo={salesOrderInfo} type="orders" />
          <div className="overflow-scroll">
            <CreateSalesOrdersViewContent
              type="ordersDetails"
              salesOrderInfo={salesOrderInfo}
            />
          </div>
        </>
      )}
      {showErrorPage && <ErrorPage errorMsg="Order Details Not  Found." />}
    </>
  );
}

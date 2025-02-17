import EndpointUrl from "@app/core/apiEndpoints/endPoints";

import { PageProps } from "@app/services/schema/schema";
import { JobsSideList } from "@app/modules/organisations/component/organisationRenderdata";
import OrdersList from "@app/components/orders-components/orders-list/orders-list";

export default function Orders() {
  const props: PageProps = {
    pageLabel: "orders",
    displayLabel: "Orders",
    gridName: "Sales Orders",
    sideNavData: JobsSideList,
    apiDataUrl: EndpointUrl.OrdersListData,
    pageLogo: "",
    // sendEvent: ,
    apiData: {
      apiUrl: "",
      params: {},
    },
  };
  return (
    <OrdersList
      apiDataUrl={EndpointUrl.OrdersListData}
      sideNavData={JobsSideList}
      pageLabel="orders"
      props={props}
    />
  );
}

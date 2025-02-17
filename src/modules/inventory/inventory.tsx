/* eslint-disable react/jsx-props-no-spreading */
// import EndpointUrl from "@app/core/apiEndpoints/endPoints";
//
// import { PageProps } from "@app/services/schema/schema";
// import { JobsSideList } from "@app/modules/organisations/component/organisationRenderdata";
import InventoryList from "@app/components/inventory-components/inventory-list/inventory-list";

export default function Inventory() {
  const props: any = {
    pageLabel: "inventory",
    displayLabel: "Inventory",
    // gridName: "SalesOrders",
    // sideNavData: JobsSideList,
    // apiDataUrl: EndpointUrl.OrdersListData,
    pageLogo: "",
    // sendEvent: ,
    apiData: {
      apiUrl: "",
      params: {},
    },
    sideNavData: [],
    apiDataUrl: "",
  };
  return <InventoryList {...props} />;
}

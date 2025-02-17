import EndpointUrl from "@app/core/apiEndpoints/endPoints";

import { PageProps } from "@app/services/schema/schema";
import { PartsPurchaseSideList } from "@app/modules/organisations/component/organisationRenderdata";
import PartsPurchaseList from "@app/components/parts-purchase-components/parts-purchase-list/parts-purchase-list";

export default function OrderedPPListView() {
  const props: PageProps = {
    pageLabel: "partially_received",
    displayLabel: "Parts Purchase",
    gridName: "Parts Purchase",
    sideNavData: PartsPurchaseSideList,
    apiDataUrl: EndpointUrl.PartsPurchaseListData,
    pageLogo: "",
    apiData: {
      apiUrl: "",
      params: {},
    },
  };
  return (
    <PartsPurchaseList
      props={props}
      sideNavData={PartsPurchaseSideList}
      pageLabel="partially_received"
    />
  );
}

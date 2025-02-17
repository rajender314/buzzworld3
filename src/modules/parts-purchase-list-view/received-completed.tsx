import EndpointUrl from "@app/core/apiEndpoints/endPoints";

import { PageProps } from "@app/services/schema/schema";
import { PartsPurchaseSideList } from "@app/modules/organisations/component/organisationRenderdata";
import PartsPurchaseList from "@app/components/parts-purchase-components/parts-purchase-list/parts-purchase-list";

export default function ReceivedCompletedListView() {
  const props: PageProps = {
    pageLabel: "received_and_completed",
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
      sideNavData={PartsPurchaseSideList}
      pageLabel="received_and_completed"
      props={props}
    />
  );
}

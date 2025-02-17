import EndpointUrl from "@app/core/apiEndpoints/endPoints";

import { PageProps } from "@app/services/schema/schema";
import { PartsPurchaseSideList } from "@app/modules/organisations/component/organisationRenderdata";
import PartsPurchaseList from "@app/components/parts-purchase-components/parts-purchase-list/parts-purchase-list";

export default function PartsPurchaseListView() {
  const props: PageProps = {
    pageLabel: "partspurchase",
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
      pageLabel="partspurchase"
      props={props}
    />
  );
}

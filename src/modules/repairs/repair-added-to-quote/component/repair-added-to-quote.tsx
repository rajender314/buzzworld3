/* eslint-disable react/jsx-props-no-spreading */
import { RepairSideList } from "@app/modules/organisations/component/organisationRenderdata";
import { PageProps } from "@app/services/schema/schema";
import RepairsImg from "@app/assets/images/repairs.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import RepairsList from "@app/components/Repair-Components/repair-list/repair-list";

export default function RepairAddedQuote() {
  const props: PageProps = {
    pageLabel: "repair_added_to_quote",
    displayLabel: "Quote",
    gridName: "Repairs",
    sideNavData: RepairSideList,
    apiDataUrl: EndpointUrl.rmaRequest,
    pageLogo: RepairsImg,
    routeLabel: "added_to_quote",
    apiData: {
      apiUrl: "",
      params: {},
    },
  };
  return (
    <RepairsList
      props={props}
      sideNavData={RepairSideList}
      pageLabel="repair_added_to_quote"
      gridName="Repairs"
      routeLabel="added_to_quote"
    />
  );
}

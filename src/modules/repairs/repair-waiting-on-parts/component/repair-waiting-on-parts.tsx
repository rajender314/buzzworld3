/* eslint-disable react/jsx-props-no-spreading */
import { RepairSideList } from "@app/modules/organisations/component/organisationRenderdata";
import { PageProps } from "@app/services/schema/schema";
import RepairsImg from "@app/assets/images/repairs.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import RepairsList from "@app/components/Repair-Components/repair-list/repair-list";

export default function RepairWaitingOnParts() {
  const props: PageProps = {
    pageLabel: "repair_waiting_for_parts",
    displayLabel: "Waiting on Parts",
    gridName: "Repairs",
    sideNavData: RepairSideList,
    apiDataUrl: EndpointUrl.rmaRequest,
    pageLogo: RepairsImg,
    routeLabel: "shipped",
    apiData: {
      apiUrl: "",
      params: {},
    },
  };
  return (
    <RepairsList
      props={props}
      sideNavData={RepairSideList}
      pageLabel="repair_waiting_for_parts"
      gridName="Repairs"
      routeLabel="shipped"
    />
  );
}

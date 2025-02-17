import { RepairSideList } from "@app/modules/organisations/component/organisationRenderdata";
import { PageProps } from "@app/services/schema/schema";
import RepairsImg from "@app/assets/images/repairs.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import RepairsList from "@app/components/Repair-Components/repair-list/repair-list";

export default function RepairRequest() {
  const props: PageProps = {
    pageLabel: "repair_request",
    displayLabel: "My Repairs",
    gridName: "Repairs",
    sideNavData: RepairSideList,
    apiDataUrl: EndpointUrl.rmaRequest,
    pageLogo: RepairsImg,
    routeLabel: "my-repairs",
    apiData: {
      apiUrl: "",
      params: {},
    },
  };
  return (
    <RepairsList
      props={props}
      sideNavData={RepairSideList}
      pageLabel="repair_request"
      gridName="Repairs"
      routeLabel="repair-request"
    />
  );
}

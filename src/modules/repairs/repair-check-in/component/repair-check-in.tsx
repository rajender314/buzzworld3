import { RepairSideList } from "@app/modules/organisations/component/organisationRenderdata";
import { PageProps } from "@app/services/schema/schema";
import RepairsImg from "@app/assets/images/repairs.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import RepairsList from "@app/components/Repair-Components/repair-list/repair-list";

export default function RepairCheckIn() {
  const props: PageProps = {
    pageLabel: "repair_check_in",
    displayLabel: "Check In",
    gridName: "Repairs",
    sideNavData: RepairSideList,
    apiDataUrl: EndpointUrl.rmaRequest,
    pageLogo: RepairsImg,
    routeLabel: "check_in",
    apiData: {
      apiUrl: "",
      params: {},
    },
  };
  return (
    <RepairsList
      props={props}
      sideNavData={RepairSideList}
      pageLabel="repair_check_in"
      gridName="Repairs"
      routeLabel="check_in"
    />
  );
}

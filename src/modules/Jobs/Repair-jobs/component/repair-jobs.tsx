import EndpointUrl from "@app/core/apiEndpoints/endPoints";

import { PageProps } from "@app/services/schema/schema";
import RepairsImg from "@app/assets/images/repairs.svg";
import JobList from "@app/components/Jobs-components/jobs-list/jobs-list";
import { JobsSideList } from "@app/modules/organisations/component/organisationRenderdata";

export default function RepairJobs() {
  const props: PageProps = {
    pageLabel: "repair_jobs",
    displayLabel: "Jobs",
    gridName: "Jobs",
    sideNavData: JobsSideList,
    apiDataUrl: EndpointUrl.getSysproJobs,
    pageLogo: RepairsImg,
    // sendEvent: ,
    apiData: {
      apiUrl: "",
      params: {},
    },
  };
  return (
    <JobList
      sideNavData={JobsSideList}
      apiDataUrl={EndpointUrl.getSysproJobs}
      pageLabel="repair_jobs"
      props={props}
    />
  );
}

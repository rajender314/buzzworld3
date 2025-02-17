import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobsDetailViewContent from "@app/components/Jobs-components/job-check-list/jobs-detail-view-content";
import JobsDetailViewHeader from "@app/components/Jobs-components/job-check-list/jobs-detail-view-header";
import Loader from "@app/components/Loader/loader";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";
import { triggerApi } from "@app/services";
import ErrorPage from "@app/components/page-not-found/page-not-found";
// import InitialVariables from "@app/json/InitialVariables";

export default function JobsDetailedView() {
  const [loading, setLoading] = useState(true);
  const [jobInfo, setJobInfo]: any = useState();
  const { id }: RouteParams = useParams();
  const [showErrorPage, setShowErrorPage] = useState(false);

  const getSelectItems = useCallback(() => {
    setLoading(true);

    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.getJobDetails}?job_id=${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.status_code === 200 && response.result.success) {
          setJobInfo(response.result.data);
          setLoading(false);
        } else if (!response.result.success) {
          setShowErrorPage(true);
          setLoading(false);
        }
      })
      .catch((err: string) => {
        setShowErrorPage(true);
        setLoading(false);
        console.log(err);
      });
  }, [id]);
  useEffect(() => {
    getSelectItems();
  }, [getSelectItems]);

  return (
    <>
      {loading && <Loader />}
      {!loading && !showErrorPage && (
        <>
          <JobsDetailViewHeader jobInfo={jobInfo} />
          <JobsDetailViewContent jobInfo={jobInfo} />
        </>
      )}

      {showErrorPage && <ErrorPage errorMsg="Job Details Not  Found." />}
    </>
  );
}

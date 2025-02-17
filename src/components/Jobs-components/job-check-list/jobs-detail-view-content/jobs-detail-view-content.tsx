import { useCallback, useEffect, useState } from "react";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { useParams } from "react-router-dom";
import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";
import RelatedToCard from "@app/core/components/related-to-card";
import { ApiResponse } from "@app/services/schema/schema";
import JobstimeTracking from "@app/components/Jobs-components/job-check-list/jobs-detail-view-header/jobs-time";
import JobsInformation from "@app/components/Jobs-components/job-checklist-item/JobsInformation";
import {
  DetailContent,
  DetailPageSection,
  RightDetailContent,
  TabContainer,
} from "@app/components/Jobs-components/job-check-list/jobs-detail-view-content/jobs-detail-view-content.component";

type Props = {
  jobInfo: any;
};

export default function JobsDetailViewContent({ jobInfo }: Props) {
  const [jobInfoDetail, setJobInfoDetail]: any = useState(jobInfo);
  const { id }: RouteParams = useParams();
  const [relatedData, setRelatedData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getSelectItems = () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.getJobDetails}?job_id=${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.status_code === 200 && response.result.success) {
          setJobInfoDetail(response.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  async function getEventData(e: any) {
    if (e && e.timeAdded) {
      setJobInfoDetail({});
      getSelectItems();
    }
  }

  const getRelatedData = useCallback(() => {
    setLoading(true);

    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.RelatedData}?job_id=${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const data = response?.result?.data;
          setRelatedData(data);
          setLoading(false);
        } else if (!response.result.success) {
          setLoading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, [id]);

  useEffect(() => {
    getRelatedData();
  }, [getRelatedData]);
  async function getRelatedEventData(e: any) {
    if (e.pageLabel === "Jobs") {
      getRelatedData();
    }
  }
  return (
    <DetailPageSection>
      <DetailContent>
        <TabContainer>
          <JobsInformation jobInfo={jobInfo} />
        </TabContainer>

        <RightDetailContent>
          <RelatedToCard
            relatedData={relatedData}
            pageLabel="Jobs"
            isLoading={loading}
            sendEventData={(e: any) => getRelatedEventData(e)}
          />
          <JobstimeTracking
            sendModelData={(e: any) => getEventData(e)}
            jobInfo={jobInfoDetail}
          />
        </RightDetailContent>
      </DetailContent>
    </DetailPageSection>
  );
}

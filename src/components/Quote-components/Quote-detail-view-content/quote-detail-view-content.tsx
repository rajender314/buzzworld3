import { PiToast } from "pixel-kit";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  DetailPageSection,
  DetailContent,
  TabContainer,
  RightDetailContent,
} from "@app/components/detail-view-content/detail-view-content.component";
import NewActivityLog from "@app/components/NewActivityLog/new-activity-log";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import RelatedToCard from "@app/core/components/related-to-card";
import { getUserLoggedPermission } from "@app/helpers/helpers";
import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import QuoteInternalApproval from "./quote-internal-approval";
import QuoteInformation from "./QuoteInformation/quote-information";
import QuoteItems from "./QuoteItems/quote-items";
import QuoteNotes from "./QuoteNotes/quote-notes";

export default function QuoteDetailViewContent({
  quoteInfo,
  activityLogDetails,
  internalApprovals,
  sendEventData,
}: any) {
  const { id } = useParams<RouteParams>();
  const [quoteDetails, setQuoteDetails] = useState(quoteInfo);
  const [popupMessageShow, setPopupMessageShow] = useState(false);
  const [routeId, setRouteId] = useState<string>(id);
  const [activityDetails, setActivityDetails] = useState(activityLogDetails);
  const [internalApprovalsDetails, setInternalApprovalsDetails] =
    useState(internalApprovals);

  const [relatedData, setRelatedData] = useState([]);
  const getRelatedData = useCallback(() => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.RelatedData}?quote_id=${quoteDetails.id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          setRelatedData(data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }, [quoteDetails.id]);
  useEffect(() => {
    getRelatedData();
  }, [getRelatedData]);
  useEffect(() => {
    setQuoteDetails(quoteInfo);
  }, [quoteInfo]);
  useEffect(() => {
    setRouteId(routeId);
    setActivityDetails(activityLogDetails);
    setInternalApprovalsDetails(internalApprovals);
  }, [activityLogDetails, internalApprovals, routeId]);

  const getQuoteInfo = () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.Quote}/${id}?quote_id=${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          setQuoteDetails({ ...data });
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const resetData = () => {
    getQuoteInfo();
  };
  const triggerEvent = (e: any) => {
    if (e.success && e.section === "quotes_info") {
      getQuoteInfo();
    } else if (e.success === false && e.section === "quotes_info") {
      resetData();
    } else if (e.success === true && e.section === "repair_notes") {
      getQuoteInfo();
    }
  };

  const triggerItemEvent = (e: any) => {
    if (e.success) {
      const obj = {
        success: true,
      };
      sendEventData(obj);
    }
    if (e.from === "item_added") {
      const obj = {
        from: "item_added",
      };
      getQuoteInfo();
      sendEventData(obj);
    }
    if (e.from === "option_deleted") {
      const obj = {
        from: "option_deleted",
      };
      sendEventData(obj);
    }
    if (e.from === "option_deleted") {
      const obj = {
        from: "option_added",
      };
      sendEventData(obj);
    }
  };
  async function getData(e: any) {
    setQuoteDetails({ ...e?.data });
  }
  return (
    <>
      <DetailPageSection>
        <DetailContent>
          <TabContainer>
            <QuoteInformation
              quoteDetails={quoteDetails}
              sendEvent={triggerEvent}
            />
            <QuoteNotes
              quoteDetails={quoteDetails}
              sendQuotesData={(e: any) => getData(e)}
            />
            <QuoteItems
              quoteDetails={quoteDetails}
              sendEventData={triggerItemEvent}
            />
            {getUserLoggedPermission() && (
              <QuoteInternalApproval
                internalApprovalsDetails={internalApprovalsDetails}
              />
            )}
          </TabContainer>
          {getUserLoggedPermission() && (
            <RightDetailContent>
              <RelatedToCard relatedData={relatedData} pageLabel="Quotes" />
              <NewActivityLog activityDetails={activityDetails} />
            </RightDetailContent>
          )}
        </DetailContent>
      </DetailPageSection>
      <PiToast
        className={popupMessageShow ? "show" : ""}
        headerLabel="Updated Successfully"
        message=""
        onClose={async () => setPopupMessageShow(false)}
      />
    </>
  );
}

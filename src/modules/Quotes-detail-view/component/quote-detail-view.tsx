import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "@app/components/Loader/loader";
import QuoteDetailViewContent from "@app/components/Quote-components/Quote-detail-view-content/quote-detail-view-content";
import QuoteDetailViewHeader from "@app/components/Quote-components/Quote-detail-view-header/quote-detail-view-header";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import InitialVariables from "@app/json/InitialVariables";
import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import ErrorPage from "@app/components/page-not-found/page-not-found";

export default function QuoteDetailView() {
  const { id }: RouteParams = useParams();
  // console.log(window.location,window.location.pathname.substring(1).split('/')[0])
  const [quoteInfo, setQuoteInfo] = useState<any>(
    InitialVariables.RepairItemsInitials
  );
  const [loading, setLoading] = useState(true);
  const [permissionObject, setpermissionObject] = useState<any>({});
  const [activityDetails, setActivityDetails] = useState([]);
  const [internalApprovals, setInternalApprovals] = useState([]);
  const [pageOpacity, setPageOpacity] = useState(false);
  const [quoteId, setquoteId] = useState(id);
  const [showErrorPage, setShowErrorPage] = useState(false);

  useEffect(() => {
    setquoteId(quoteId);
  }, [quoteId]);
  const getQuoteInfo = useCallback(
    (e?: any) => {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.Quote}/${quoteId}?quote_id=${quoteId}&type=${window.location.pathname.substring(1).split("/")[0]}`,
        headers: {},
      };
      triggerApi(apiObject)
        .then(async (response: ApiResponse) => {
          if (response.result.success) {
            const { data } = response.result;
            setQuoteInfo({ ...data, ...e });

            setLoading(false);
          } else if (!response.result.success) {
            setShowErrorPage(true);
            setLoading(false);
          }
          setPageOpacity(false);
        })
        .catch((err: string) => {
          setShowErrorPage(true);
          setLoading(false);
          console.log(err);
        });
    },
    [quoteId]
  );
  const getActivityLog = useCallback(async () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteLogs}/${quoteId}?quote_id=${quoteId}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          setActivityDetails(data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
    return true;
  }, [quoteId]);
  const getInternalApprovals = useCallback(async () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteInernalApprovals}/${quoteId}?quote_id=${quoteId}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          setInternalApprovals(data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
    return true;
  }, [quoteId]);
  useEffect(() => {
    (async () => {
      setPageOpacity(true);
      const permission = await getPermissionObject("quote_for_parts");
      setpermissionObject(permission);
      getQuoteInfo();
      await getActivityLog();
      await getInternalApprovals();
    })();
  }, [getActivityLog, getInternalApprovals, getQuoteInfo, quoteId]);

  async function triggerEvent(e: any) {
    if (e.success) {
      getQuoteInfo();
      getActivityLog();
      getInternalApprovals();
    }
    if (e.from === "item_added") {
      getQuoteInfo(e);
      getActivityLog();
      getInternalApprovals();
    }
    if (e.from === "option_deleted") {
      getQuoteInfo(e);
      getActivityLog();
      getInternalApprovals();
    }
    if (e.from === "option_added") {
      // getQuoteInfo(e)
      getActivityLog();
    }
  }
  async function triggerOpacity(e: boolean) {
    setPageOpacity(e);
  }
  async function triggerVersionEvent(e: any) {
    setquoteId(e.newQuoteId);
  }
  return (
    <>
      {!loading && permissionObject.View && !showErrorPage && (
        <>
          <div className={pageOpacity ? "opacity-on-load pointer-none" : ""}>
            <QuoteDetailViewHeader
              quoteInfo={quoteInfo}
              sendEventData={(e: any) => triggerEvent(e)}
              sendOpacity={(e: any) => triggerOpacity(e)}
              sendVersionEvent={(e: any) => triggerVersionEvent(e)}
            />
          </div>
          <div
            className={
              pageOpacity
                ? "opacity-on-load overflow-scroll"
                : "overflow-scroll"
            }
          >
            {pageOpacity && <Loader />}
            <QuoteDetailViewContent
              quoteInfo={quoteInfo}
              activityLogDetails={activityDetails}
              internalApprovals={internalApprovals}
              sendEventData={(e: any) => triggerEvent(e)}
            />
          </div>
        </>
      )}
      {loading && <Loader />}
      {showErrorPage && (
        <ErrorPage errorMsg="Quote Details Not  Found." />
      )}
    </>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import {
  ActivityProps,
  RepairDetailsProps,
  RepairInfoProps,
  RepairItemGridProps,
} from "@app/modules/repair-detail-view/schema/repairs";
import { PiSpinner, PiToast } from "pixel-kit";
import { getUserLoggedPermission } from "@app/helpers/helpers";
import RelatedToCard from "@app/core/components/related-to-card";
import { SpinnerDiv } from "../fileuploadModel/fileuploadModel.component";
import NewActivityLog from "../NewActivityLog/new-activity-log";
import RepairDocuments from "../RepairDocuments";
import RepairItems from "../RepairItems";
import RepairNotes from "../RepairNotes";
import RepairInformation from "../RepairInformation";
import {
  DetailContent,
  DetailPageSection,
  RightDetailContent,
  TabContainer,
} from "./detail-view-content.component";
// import $ from 'jquery'
// import Scrollspy from 'react-scrollspy'

type Props = {
  repairInfo: RepairInfoProps;
  repairItemsData: RepairItemGridProps;
  activityDetails: ActivityProps[];
  sendEventData: any;
};

export default function DetailViewContent({
  repairInfo,
  repairItemsData,
  activityDetails,
  sendEventData,
}: Props) {
  const id = window.location.pathname.substring(1).split("/")[1];
  const repInfoRef = useRef<HTMLElement>(null);
  const repItemsRef = useRef<HTMLElement>(null);
  const docRef = useRef<HTMLElement>(null);
  const [repairDetails, setRepairDetails] =
    useState<RepairInfoProps>(repairInfo);
  const [repairItemsList, setRepairItemsList] =
    useState<RepairItemGridProps>(repairItemsData);
  const [routeId, setRouteId] = useState<string>(id);
  const [popupMessageShow, setPopupMessageShow] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const [relatedData, setRelatedData] = useState([]);

  const getRelatedData = useCallback(() => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.RelatedData}?repairs_id=${routeId}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          setOpacity(false);
          const { data } = response.result;
          setRelatedData(data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }, [routeId]);
  useEffect(() => {
    getRelatedData();
  }, [getRelatedData]);
  useEffect(() => {
    setRepairDetails(repairInfo);
    setRepairItemsList(repairItemsData);
    setRouteId(routeId);
  }, [repairItemsData, activityDetails, repairInfo, routeId]);
  const getRepairInfo = () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.repairInfo}/${routeId}?repairs_id=${routeId}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          data.repair_info.priorityDisplay = data.repair_info.priority;
          const info = data;
          setRepairDetails({ ...info });
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };

  const updateNotestoCustomer = (notesToCustomer: any) => {
    const apiObject = {
      payload: { customer_notes: notesToCustomer },
      method: "PATCH",
      apiUrl: `${EndpointUrl.rmaRequest}/${id}?repairs_id=${routeId}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          getRepairInfo();
          setPopupMessageShow(true);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };

  const updateRepairData = (data: RepairDetailsProps) => {
    console.log(data);
    if (data.section === "repair_notes") {
      updateNotestoCustomer(data.notesToCustomer);
    } else {
      delete data.repairDetails.status;
      const apiObject = {
        payload: data.repairDetails,
        method: "PUT",
        apiUrl: `${EndpointUrl.rmaRequest}/${routeId}?repairs_id=${routeId}`,
        headers: {},
      };
      triggerApi(apiObject)
        .then(async (response: ApiResponse) => {
          if (response.result.success) {
            getRepairInfo();
            setPopupMessageShow(true);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  };

  const resetData = () => {
    getRepairInfo();
    // setRepairDetails({ ...repairInfo })
  };
  const triggerEvent = (e: RepairDetailsProps) => {
    console.log(e);
    if (e.success && e.section === "repairs_info") {
      updateRepairData(e);
    } else if (e.success === false && e.section === "repairs_info") {
      resetData();
    } else if (e.success === true && e.section === "repair_notes") {
      getRepairInfo();
    }
  };

  async function triggerItemsEvent(e: RepairDetailsProps) {
    if (e.success) {
      sendEventData({ success: true });
    }
    setOpacity(false);
  }
  async function triggerMoveToQuoteEvent(e: any) {
    console.log(e);
    if (e.from === "move_to_quote") {
      setOpacity(true);
    } else {
      setOpacity(false);
    }
    getRelatedData();
  }
  // function onUpdateScroll(e: any) {
  //  console.log(e)
  // }
  return (
    <>
      <DetailPageSection className={opacity ? "opacity-on-load" : ""}>
        {opacity && (
          <SpinnerDiv style={{ position: "absolute", left: "50%" }}>
            <PiSpinner color="primary" size={50} libraryType="atalskit" />
          </SpinnerDiv>
        )}
        <DetailContent>
          <TabContainer>
            <RepairInformation
              id="repair-info-id"
              repairRef={repInfoRef}
              repairInfo={repairDetails}
              sendEvent={triggerEvent}
            />
            <RepairNotes repairInfo={repairDetails} sendEvent={triggerEvent} />
            <RepairItems
              repairRef={repItemsRef}
              repairInfo={repairDetails}
              repairItemsData={repairItemsList}
              sendEventData={sendEventData}
              moveToQuoteEvent={(e: any) => triggerMoveToQuoteEvent(e)}
            />
            <RepairDocuments
              repairRef={docRef}
              repairInfo={repairInfo}
              sendEvent={(e: any) => triggerItemsEvent(e)}
            />
            {/* <ActivityLog
            id="repair-activity"
            repairRef={actiLogRef}
            activityDetails={activityLog}
          ></ActivityLog> */}
          </TabContainer>
          {getUserLoggedPermission() && (
            <RightDetailContent>
              <RelatedToCard relatedData={relatedData} />
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

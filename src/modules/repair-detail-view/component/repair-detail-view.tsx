import { useEffect, useState } from "react";
import DetailViewContent from "@app/components/detail-view-content";
import DetailViewHeader from "@app/components/detail-view-header";
import Loader from "@app/components/Loader/loader";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import GlobalVariables from "@app/core/globalVariables/globalVariables";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import InitialVariables from "@app/json/InitialVariables";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import Acknowledge from "@app/modules/acknowledge-view/acknowledge-view";
import ErrorPage from "@app/components/page-not-found/page-not-found";
import { RepairInfoProps, RepairItemGridProps } from "../schema/repairs";

export default function RepairDetailedView() {
  const id = window.location.pathname.substring(1).split("/")[1];
  const [repairInfo, setRepairInfo] = useState<RepairInfoProps>(
    InitialVariables.RepairItemsInitials
  );
  const [loading, setLoading] = useState(true);
  const [permissionObject, setpermissionObject] = useState<any>({});
  const [pageOpacity, setPageOpacity] = useState(false);
  const [acknoledgeMsg, setAcknoledgeMsg]: any = useState();
  const [isSuccess, setIsSuccess]: any = useState(false);
  const [showErrorPage, setShowErrorPage] = useState(false);

  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("repair-request");
      setpermissionObject(permission);
    })();
  }, []);
  const [repairItemsData, setRepairItemsData] = useState<RepairItemGridProps>({
    list: [],
    total_count: 0,
    headers: [],
    global_status: "",
  });
  const [activityDetails, setActivityDetails] = useState([]);

  async function getActivityLog() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.repairLogs}/${id}?repairs_id=${id}`,
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
  }
  const acknowlegeApi = async () => {
    const apiObject = {
      payload: {
        acknowledge_id: window.location.pathname.substring(1).split("/")[2],
        repairs_id: window.location.pathname.substring(1).split("/")[1],
      },
      method: "POST",
      apiUrl: `${EndpointUrl.acknowledge}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setLoading(false);
          setIsSuccess(true);
          setAcknoledgeMsg(response.result.data.message);
        } else {
          setLoading(false);
          setIsSuccess(false);
          setAcknoledgeMsg(response.result.data.message);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  async function repaitItemsList() {
    let options: any = [];
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.repairItems}?repairs_id=${id}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          const obj = { ...data, headers: GlobalVariables.repairItemHeaders };
          console.log(obj);
          options = obj;
          setRepairItemsData({ ...obj });
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
    return options;
  }

  const getRepairInfo = async (replist: any) => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.repairInfo}/${id}?repairs_id=${id}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          data.repair_info.priorityDisplay = data.repair_info.priority;
          setRepairInfo(data);
          const obj = {
            ...replist,
            global_status: data.repair_info.status_code,
          };
          setRepairItemsData({ ...obj });
          if (!window.location.pathname.substring(1).split("/")[2]) {
            setLoading(false);
          }
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
    return true;
  };
  useEffect(() => {
    (async () => {
      const data: any = await repaitItemsList();
      await getActivityLog();
      await getRepairInfo(data);
      if (window.location.pathname.substring(1).split("/")[2]) {
        await acknowlegeApi();
      }
    })();
  }, []);

  async function triggerItemsEvent(e: any) {
    if (e.success) {
      const data: any = await repaitItemsList();
      await getRepairInfo(data);
      await getActivityLog();
    } else if (e && e.showPrint) {
      setPageOpacity(true);
    } else if (e && !e.opacityLoading) {
      setPageOpacity(false);
    }
  }
  return (
    <>
      {!loading && permissionObject.View && !showErrorPage && (
        <>
          <DetailViewHeader repairInfo={repairInfo} />
          <div
            className={
              pageOpacity
                ? "opacity-on-load overflow-scroll"
                : "overflow-scroll"
            }
          >
            {pageOpacity && <Loader />}
            <DetailViewContent
              repairInfo={repairInfo}
              repairItemsData={repairItemsData}
              activityDetails={activityDetails}
              sendEventData={(e?: any) => triggerItemsEvent(e)}
            />
          </div>
        </>
      )}
      {loading && <Loader />}
      {acknoledgeMsg && (
        <Acknowledge
          isSuccess={isSuccess}
          acknoledgeMsg={acknoledgeMsg}
          sendData={() => {
            setAcknoledgeMsg("");
            getActivityLog();
          }}
        />
      )}
      {showErrorPage && <ErrorPage errorMsg="Repair Details Not  Found." />}
    </>
  );
}

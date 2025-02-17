import { useEffect, useState } from "react";
import AdminImg from "@app/assets/images/admin.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { getAdminMenuList } from "@app/helpers/componentHelpers";
import AdminLayout from "@app/components/Admin layout/adminLayout";
import Loader from "@app/components/Loader/loader";

export default function Branches({ gridInteraction, sendAdminEvent }: any) {
  const [interactionData, setinteractionData]: any = useState();
  const [loading, setloading] = useState(true);
  const props = {
    pageLabel: "Branches",
    displayLabel: "Branches",
    gridName: "Admin",
    sideNavData: [],
    apiDataUrl: EndpointUrl.branchList,
    pageLogo: AdminImg,
    apiData: {
      apiUrl: "",
      params: {},
    },
  };

  useEffect(() => {
    (async () => {
      await getAdminMenuList();
      setinteractionData(gridInteraction);
      setloading(false);
    })();
  }, [gridInteraction]);

  const triggerAdminEvent = async (e: any) => {
    console.log(e);
    sendAdminEvent(e);
  };
  return (
    <div style={{ display: "contents" }}>
      {!loading ? (
        <AdminLayout
          props={props}
          interactionData={interactionData}
          sendAdminEvent={triggerAdminEvent}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
}

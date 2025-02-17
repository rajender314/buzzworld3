import { useEffect, useState } from "react";
import AdminImg from "@app/assets/images/admin.svg";
import { getAdminMenuList } from "@app/helpers/componentHelpers";
import AdminLayout from "@app/components/Admin layout/adminLayout";
import Loader from "@app/components/Loader/loader";

export default function PoMinQty({ gridInteraction, sendAdminEvent }: any) {
  const [loading, setloading] = useState(true);
  const [interactionData, setinteractionData]: any = useState();

  const props = {
    pageLabel: "PO_Min_Qty",
    displayLabel: "PO Min Qty",
    gridName: "Admin",
    sideNavData: [],
    apiDataUrl: "v1/Quantity",
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

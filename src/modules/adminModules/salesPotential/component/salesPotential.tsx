import { useEffect, useState } from "react";
import AdminImg from "@app/assets/images/admin.svg";
import { getAdminMenuList } from "@app/helpers/componentHelpers";
import AdminLayout from "@app/components/Admin layout/adminLayout";
import Loader from "@app/components/Loader/loader";

export default function SalesPotential({
  gridInteraction,
  sendAdminEvent,
}: any) {
  const [interactionData, setinteractionData]: any = useState();
  const [loading, setloading] = useState(true);

  const props = {
    pageLabel: "Sales_Potential",
    displayLabel: "Sales Potential",
    gridName: "Admin",
    sideNavData: [],
    apiDataUrl: "v1/SalesPotential",
    pageLogo: AdminImg,
    apiData: {
      apiUrl: AdminImg,
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

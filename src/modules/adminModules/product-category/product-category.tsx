import { useEffect, useState } from "react";
import AdminImg from "@app/assets/images/admin.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { getAdminMenuList } from "@app/helpers/componentHelpers";
import AdminLayout from "@app/components/Admin layout/adminLayout";
import Loader from "@app/components/Loader/loader";

export default function ProductCategory({
  gridInteraction,
  sendAdminEvent,
}: any) {
  const [loading, setloading] = useState(true);
  const [interactionData, setinteractionData]: any = useState();

  const props = {
    pageLabel: "product_category",
    displayLabel: "Product Category",
    gridName: "Admin",
    sideNavData: [],
    apiDataUrl: EndpointUrl.productCategoryList,
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

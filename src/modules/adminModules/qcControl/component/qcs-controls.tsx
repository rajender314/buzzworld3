import { useEffect, useState } from "react";
import { PageProps } from "@app/services/schema/schema";
import AdminImg from "@app/assets/images/admin.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import QcControlPermissions from "@app/components/userRolePermissions/permissionBox/qc-control-permission";
import { getAdminMenuList } from "@app/helpers/componentHelpers";
import Loader from "@app/components/Loader/loader";

export default function QcControl({ gridInteraction }: any) {
  const [loading, setloading] = useState(true);
  const [sidemenuList, setSideMenuList]: any = useState([]);
  const [addQcId, setAddQcId] = useState<any>();

  useEffect(() => {
    (async () => {
      const list = await getAdminMenuList();
      setSideMenuList(list);
      setloading(false);
    })();
  }, []);

  useEffect(() => {
    console.log(gridInteraction, 23);
    if (gridInteraction) {
      setAddQcId(
        gridInteraction && gridInteraction.id ? gridInteraction.id : ""
      );
    }
  }, [gridInteraction]);
  const props: PageProps = {
    pageLabel: "qc_control",
    displayLabel: "QC Forms",
    sideNavData: sidemenuList,
    apiDataUrl: EndpointUrl.permissionList,
    pageLogo: AdminImg,
    apiData: {
      apiUrl: AdminImg,
      params: {},
    },
  };
  return (
    <div style={{ display: "contents" }}>
      {!loading ? (
        <QcControlPermissions props={props} addQcId={addQcId} />
      ) : (
        <Loader />
      )}
    </div>
  );
}

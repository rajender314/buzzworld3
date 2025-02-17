/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import AdminImg from "@app/assets/images/admin.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import UsersList from "@app/components/usersComponents/userslist/userslist";
import { getAdminMenuList } from "@app/helpers/componentHelpers";
import Loader from "@app/components/Loader/loader";

export default function SalesPotential({
  sendAdminEvent,
  gridInteraction,
}: any) {
  const [loading, setloading] = useState(true);
  const [userId, setUserId] = useState<any>("");
  const [isOpenModel, setIsopenModel] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      await getAdminMenuList();

      setloading(false);
    })();
  }, []);
  useEffect(() => {
    if (gridInteraction) {
      setUserId(
        gridInteraction && gridInteraction.Id ? gridInteraction.Id : ""
      );
      setIsopenModel(
        gridInteraction && gridInteraction.openModel
          ? gridInteraction.openModel
          : ""
      );
    }
  }, [gridInteraction]);
  const props: any = {
    pageLabel: "users",
    displayLabel: "Users",
    sideNavData: [],
    apiDataUrl: EndpointUrl.users,
    pageLogo: AdminImg,
    userId,
    isOpenModel,
    apiData: {
      apiUrl: AdminImg,
      params: {},
    },
    sendData: (e: any) => {
      sendAdminEvent(e);
    },
  };
  return (
    <div style={{ display: "contents" }}>
      {!loading ? <UsersList {...props} /> : <Loader />}
    </div>
  );
}

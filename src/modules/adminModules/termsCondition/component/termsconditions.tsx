/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import { PageProps } from "@app/services/schema/schema";
import AdminImg from "@app/assets/images/admin.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import Termsdata from "@app/components/Quote-components/term-data";
import { getAdminMenuList } from "@app/helpers/componentHelpers";

export default function Termsconditions() {
  const [loading, setloading] = useState(true);
  const [sidemenuList, setSideMenuList]: any = useState([]);

  useEffect(() => {
    (async () => {
      const list = await getAdminMenuList();
      setSideMenuList(list);
      setloading(false);
    })();
  }, []);
  const props: PageProps = {
    pageLabel: "terms-conditions",
    displayLabel: "Terms Conditions",
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
      {!loading && <Termsdata {...props} />}
    </div>
  );
}

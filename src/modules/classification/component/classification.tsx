import { Fragment } from "react";
import React from "react";

import { sideList } from "src/modules/organisations/component/organisationRenderdata";
import { PageProps } from "src/services/schema/schema";
import AdminImg from "src/assets/images/admin.svg";
import AdminLayout from "src/components/Admin layout";

export default function Classification() {
  const props: PageProps = {
    pageLabel: "Classifications",
    sideNavData: sideList,
    apiDataUrl: "v1/Classifications",
    pageLogo: AdminImg,
    apiData: {
      apiUrl: "",
      params: {}
    }
  };
  return (
    <Fragment>
      <AdminLayout {...props}></AdminLayout>
    </Fragment>
  );
}

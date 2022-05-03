import { Fragment } from "react";
import React from "react";

import { sideList } from "src/modules/organisations/component/organisationRenderdata";
import { PageProps } from "src/services/schema/schema";
import AdminImg from "src/assets/images/admin.svg";
import AdminLayout from "src/components/Admin layout";

export default function Industry() {
  const props: PageProps = {
    pageLabel: "Industry",
    sideNavData: sideList,
    apiDataUrl: "v1/Industry",
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

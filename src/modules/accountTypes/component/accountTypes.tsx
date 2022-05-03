import { Fragment } from "react";
import React from "react";

import { sideList } from "src/modules/organisations/component/organisationRenderdata";
import { PageProps } from "src/services/schema/schema";
import EndpointUrl from "src/core/apiEndpoints/endPoints";
import AdminImg from "src/assets/images/admin.svg";
import AdminLayout from "src/components/Admin layout";
export default function AccountTypes() {
  const props: PageProps = {
    pageLabel: "Account_Types",
    sideNavData: sideList,
    apiDataUrl: EndpointUrl.accountTypes,
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

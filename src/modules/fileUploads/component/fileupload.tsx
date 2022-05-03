import { Fragment } from "react";
import React from "react";

import CommonLayout from "src/components/commonLayout";
import { sideList } from "src/modules/organisations/component/organisationRenderdata";
import { PageProps } from "src/services/schema/schema";
import EndpointUrl from "src/core/apiEndpoints/endPoints";

export default function AccountTypes() {
  const props: PageProps = {
    pageLabel: "Account Types",
    sideNavData: sideList,
    apiDataUrl: EndpointUrl.accountTypes,
    pageLogo: "",
    apiData: {
      apiUrl: "",
      params: {}
    }
  };
  return (
    <Fragment>
      <CommonLayout {...props}></CommonLayout>
    </Fragment>
  );
}

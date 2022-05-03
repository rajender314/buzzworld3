import { Fragment } from "react";
import React from "react";

import CommonLayout from "src/components/commonLayout";
import { sideList } from "./organisationRenderdata";
import EndpointUrl from "src/core/apiEndpoints/endPoints";
import OrganisationImg from "src/assets/images/organisation.svg";

export default function Organisations() {
  const props = {
    pageLabel: "Organizations",
    sideNavData: sideList,
    apiDataUrl: EndpointUrl.organisationList,
    pageLogo: OrganisationImg,
    apiData: {
      apiUrl: "v1/Organizations",
      params: {}
    }
  };
  return (
    <Fragment>
      <CommonLayout {...props}></CommonLayout>
    </Fragment>
  );
}

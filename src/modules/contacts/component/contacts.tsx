import { Fragment } from "react";
import React from "react";

import CommonLayout from "src/components/commonLayout";
import { sideList } from "src/modules/organisations/component/organisationRenderdata";
import { PageProps } from "src/services/schema/schema";
import EndpointUrl from "src/core/apiEndpoints/endPoints";

import ContactImg from "src/assets/images/contact.svg";
export default function Contacts() {
  const props: PageProps = {
    pageLabel: "Contacts",
    sideNavData: sideList,
    apiDataUrl: EndpointUrl.contactList,
    pageLogo: ContactImg,
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

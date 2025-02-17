/* eslint-disable react/jsx-props-no-spreading */
import CommonLayout from "@app/components/commonLayout";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import OrganisationImg from "@app/assets/images/organisation.svg";
import { sideList } from "./organisationRenderdata";

export default function Organisations() {
  const props = {
    pageLabel: "Organizations",
    sideNavData: sideList,
    apiDataUrl: EndpointUrl.organisationList,
    pageLogo: OrganisationImg,
    apiData: {
      apiUrl: "v1/Organizations",
      params: {},
    },
  };
  return <CommonLayout {...props} />;
}

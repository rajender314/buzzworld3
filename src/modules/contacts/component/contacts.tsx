/* eslint-disable react/jsx-props-no-spreading */
import CommonLayout from "@app/components/commonLayout";
import { sideList } from "@app/modules/organisations/component/organisationRenderdata";
import { PageProps } from "@app/services/schema/schema";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import ContactImg from "@app/assets/images/contact.svg";

export default function Contacts() {
  const props: PageProps = {
    pageLabel: "Contacts",
    sideNavData: sideList,
    apiDataUrl: EndpointUrl.contactList,
    pageLogo: ContactImg,
    apiData: {
      apiUrl: "",
      params: {},
    },
  };
  return <CommonLayout {...props} />;
}

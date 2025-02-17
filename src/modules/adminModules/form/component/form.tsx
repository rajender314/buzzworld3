import { sideList } from "@app/modules/organisations/component/organisationRenderdata";
import { PageProps } from "@app/services/schema/schema";
import AdminImg from "@app/assets/images/admin.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import Formdata from "@app/components/Quote-components/form-data";

export default function Form() {
  const props: PageProps = {
    pageLabel: "form",
    displayLabel: "Form",
    sideNavData: sideList,
    apiDataUrl: EndpointUrl.permissionList,
    pageLogo: AdminImg,
    apiData: {
      apiUrl: AdminImg,
      params: {},
    },
  };
  return <Formdata sideNavData={sideList} props={props} />;
}

/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import { PageProps, ApiResponse } from "@app/services/schema/schema";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import DiscountImg from "@app/assets/images/discountCodes.svg";
import { triggerApi } from "@app/services/api-services";
import { getUserPermissions } from "@app/helpers/componentHelpers";
import AccesssDenied from "@app/modules/access-denied/component";
import PricingLayout from "@app/components/pricingLayout/pricing-layout";

export default function DiscountCodes() {
  const [vendorsList, setVendorList]: any = useState([]);
  const [loading, setloading] = useState(true);
  const [isAllowed, setIsAllowed] = useState<any>(false);
  function getVendorList() {
    let options: any = [];
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.DCVendors}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const data = response.result.data.list;
          let list = [];
          list = data.map((item: any) => ({
            key: item.id,
            label: item.name,
            ...item,
          }));
          options = list;
          setVendorList(options);
          // console.log(list);
        }
      })
      .catch(() => {});
  }
  useEffect(() => {
    (async () => {
      const is_Allowed = await getUserPermissions("discount-codes", "View");
      setloading(false);
      setIsAllowed(is_Allowed);
    })();
  }, []);
  useEffect(() => {
    getVendorList();
  }, []);

  const props: PageProps = {
    pageLabel: "Discount_Codes",
    displayLabel: "Discount Codes",
    sideNavData: vendorsList,
    apiDataUrl: EndpointUrl.discountCodesApi,
    pageLogo: DiscountImg,
    apiData: {
      apiUrl: "",
      params: {},
    },
  };
  return (
    <>
      {/* {loading && <Loader />} */}
      {!loading && (
        <>
          {isAllowed && <PricingLayout {...props} />}
          {!isAllowed && <AccesssDenied />}
        </>
      )}
    </>
  );
}

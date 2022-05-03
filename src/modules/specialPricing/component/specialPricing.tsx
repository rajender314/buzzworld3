import { Fragment, useEffect, useState } from "react";
import React from "react";

import CommonLayout from "src/components/commonLayout";
import { PageProps } from "src/services/schema/schema";
import EndpointUrl from "src/core/apiEndpoints/endPoints";
import PricingImg from "src/assets/images/pricing.svg";
import { triggerApi } from "src/services/api-services";
import { ApiResponse } from "src/services/schema/schema";

export default function SpecialPricing() {
  let [vendorsList, setVendorList]: any = useState([]);
  useEffect(() => {
    getVendorList();
  }, []);
  function getVendorList() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.vendorList}`,
      headers: {}
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          vendorsList = response.result.data.list;
          console.log(vendorsList)
          let list = [];
          list = vendorsList.map((item: any) => {
            return {
              key: item.id,
              label: item.name,
              ...item
            };
          });
          vendorsList = list;
          setVendorList(vendorsList);
          // console.log(list);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  const props: PageProps = {
    pageLabel: "Special_Pricing",
    sideNavData: vendorsList,
    apiDataUrl: EndpointUrl.specialPricingApi,
    pageLogo: PricingImg,
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

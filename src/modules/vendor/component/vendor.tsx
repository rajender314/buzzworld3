import { useEffect, useState } from "react";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import PricingImg from "@app/assets/images/pricing.svg";
import { getUserPermissions } from "@app/helpers/componentHelpers";
import AccesssDenied from "@app/modules/access-denied/component";
import { getLocalStorage } from "@app/core/localStorage/localStorage";
import PricingLayout from "@app/components/pricingLayout/pricing-layout";

export default function Pricing() {
  const [loading, setloading] = useState(true);
  const [isAllowed, setIsAllowed] = useState<any>(null);
  useEffect(() => {
    (async () => {
      const is_Allowed = await getUserPermissions("pricing", "View");
      setIsAllowed(is_Allowed);
      setloading(false);
    })();
  }, [isAllowed, getLocalStorage("userPermission")]);
  useEffect(() => {
    setIsAllowed(isAllowed);
  }, [isAllowed]);

  return (
    <div style={{ display: "contents" }}>
      {!loading && (
        <>
          {isAllowed === true && (
            <PricingLayout
              pageLabel="Pricing"
              apiDataUrl={EndpointUrl.productsApi}
              apiData={{
                apiUrl: "",
                params: {},
              }}
              pageLogo={PricingImg}
            />
          )}
          {isAllowed === false && <AccesssDenied />}
        </>
      )}
    </div>
  );
}

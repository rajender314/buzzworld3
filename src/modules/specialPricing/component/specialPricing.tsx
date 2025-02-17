import { useEffect, useState } from "react";
import SpDetailView from "@app/components/special-pricing-components/sp-detail-view/sp-detail-view";
import { getUserPermissions } from "@app/helpers/componentHelpers";
import AccesssDenied from "@app/modules/access-denied/component";

export default function SpecialPricing() {
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    (async () => {
      const is_allowed = await getUserPermissions("special-pricing", "View");
      setloading(false);
      setIsAllowed(is_allowed);
    })();
  }, []);

  return (
    <div style={{ display: "contents" }}>
      {!loading && (
        <>
          {isAllowed && <SpDetailView />}
          {!isAllowed && <AccesssDenied />}
        </>
      )}
    </div>
  );
}

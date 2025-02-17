import { useEffect, useState } from "react";
import Quotedata from "@app/components/Quote-components/quote-data";
import { getAdminMenuList } from "@app/helpers/componentHelpers";
import Loader from "@app/components/Loader/loader";

export default function Quoteapproval() {
  const [loading, setloading] = useState(true);

  useEffect(() => {
    (async () => {
      await getAdminMenuList();
      setloading(false);
    })();
  }, []);

  return (
    <div style={{ display: "contents" }}>
      {!loading ? <Quotedata displayLabel="Quote Approval" /> : <Loader />}
    </div>
  );
}

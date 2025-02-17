import { lazy, Suspense, useEffect, useState } from "react";
import { Header } from "@app/components/Admin layout/adminLayouts.component";
import getProps from "@app/routes/layout-secondary.helpers";
import AdminImg from "@app/assets/images/admin.svg";

const StaticSecondaryHeader = lazy(
  () => import("@app/components/static-secondaryheader/staticSecondaryheader")
);
export default function LayoutSecondHeader({
  routePath,
  adminGridData,
  sendEvent,
}: any) {
  const [requestInfo, setRequestInfo]: any = useState({});
  const [initialProps, setInitialProps]: any = useState({});
  useEffect(() => {
    setRequestInfo(adminGridData);
  }, [adminGridData]);

  useEffect(() => {
    const data = getProps(routePath);
    console.log(data, 20);
    setInitialProps(data);
  }, [routePath]);
  async function searchValue(e: string) {
    console.log(e);
    const obj = {
      searchValue: e,
    };
    sendEvent(obj);
  }
  async function triggerEvent(e: any) {
    console.log(e);
    const obj = {
      ...e,
    };
    sendEvent(obj);
  }
  return (
    <Header>
      <Suspense fallback={null}>
        <StaticSecondaryHeader
          logo={AdminImg}
          searchEvent={(e: any) => searchValue(e)}
          gridData={() => {}}
          props={initialProps}
          sendEventData={(e: any) => triggerEvent(e)}
          gridInfo={requestInfo}
          data=""
        />
      </Suspense>
    </Header>
  );
}

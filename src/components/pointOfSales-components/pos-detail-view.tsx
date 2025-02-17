import { useCallback, useEffect, useState } from "react";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { getLocalStorage } from "@app/core/localStorage/localStorage";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import AccesssDenied from "@app/modules/access-denied/component/access-denied";
import PointOfSalesList from "./point-of-sales-list";
import POSLeftFilter from "./pos-left-filter";
import {
  SpDetailViewContainer,
  SpLeftFilterContainer,
} from "../special-pricing-components/sp-detail-view/sp-detail-view.component";
import POSSecondaryHeader from "./pos-secondaryheader";
import Loader from "../Loader/loader";

export default function POSDetailView() {
  const [permissionObject, setpermissionObject] = useState<any>({});
  const localStorageData = getLocalStorage("userPermission");

  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject(
        window.location.pathname.substring(1).split("/")[0]
      );
      setpermissionObject(permission);
    })();
  }, [localStorageData]);
  const props: any = {
    apiDataUrl: EndpointUrl.getSalesReport,
  };
  const [spGridProps, setSpGridProps] = useState(props);
  const triggerData = async (e: any) => {
    props.params = e;
    setSpGridProps({ ...props });
  };
  const [posListFlags, setPOSListFlags] = useState();
  const triggerPOSList = useCallback(async (e: any) => {
    setPOSListFlags(e);
  }, []);
  const [pageOpacity, setPageOpacity] = useState(false);
  async function triggerOpacity(e: boolean) {
    setPageOpacity(e);
  }
  return (
    <>
      {Object.keys(permissionObject).length > 0 && permissionObject.Yes && (
        <>
          <POSSecondaryHeader
            posListFlags={posListFlags}
            spGridProps={spGridProps}
            sendOpacity={(e: any) => triggerOpacity(e)}
          />
          <div
            className={
              pageOpacity
                ? "opacity-on-load pos-overflow-scroll"
                : "pos-overflow-scroll"
            }
          >
            {pageOpacity && <Loader />}
            <SpDetailViewContainer>
              <SpLeftFilterContainer>
                <POSLeftFilter sendData={triggerData} />
              </SpLeftFilterContainer>
              <div className="details-right">
                <PointOfSalesList
                  spGridProps={spGridProps}
                  sendData={triggerPOSList}
                />
              </div>
            </SpDetailViewContainer>
          </div>
        </>
      )}
      {Object.keys(permissionObject).length > 0 && !permissionObject.Yes && (
        <AccesssDenied />
      )}
    </>
  );
}

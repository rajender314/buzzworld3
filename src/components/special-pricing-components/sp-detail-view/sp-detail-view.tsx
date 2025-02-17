import { useCallback, useEffect, useState } from "react";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
// import { getLocalStorage } from '@app/core/localStorage/localStorage'
import { getUserPermissions } from "@app/helpers/componentHelpers";
import { useLocation } from "react-router-dom";
import { GlobalUserPermissions } from "@app/helpers/helpers";
import SpDetailGrid from "../sp-detail-grid/sp-detail-grid";
import SpLeftFilter from "../sp-left-filter";
import SpSecondaryHeader from "../sp-secondary-header/sp-secondary-header";
import {
  SpDetailViewContainer,
  SpLeftFilterContainer,
} from "./sp-detail-view.component";

export default function SpDetailView() {
  const location = useLocation();

  const [isAllowed, setIsAllowed] = useState<any>(null);
  const [tabIndex, setTabIndex] = useState(0);
  const props: any = {
    apiDataUrl: EndpointUrl.SpecialPrice,
    params: {
      orgId: "",
    },
  };
  const [spGridProps, setSpGridProps] = useState(props);
  useEffect(() => {
    (async () => {
      await GlobalUserPermissions();
      const Allowed = await getUserPermissions("special-pricing", "View");
      setIsAllowed(Allowed);
    })();
  }, [isAllowed]);
  useEffect(() => {
    setIsAllowed(isAllowed);
  }, [isAllowed]);

  const triggerEventData = async (e: any) => {
    console.log(e);
    props.params = e;
    setSpGridProps({ ...props });
  };
  const [dataFromGrid, setDataFromGrid] = useState();
  const getData = useCallback(async (e: any) => {
    console.log(e);
    setDataFromGrid(e);
    setTabIndex(e);
  }, []);
  const triggerData = (e: any) => {
    if (e && e.success) {
      console.log(spGridProps);
      // spGridProps = props
      setSpGridProps({ ...spGridProps });
    }
  };
  return (
    <>
      <SpSecondaryHeader headerdata={dataFromGrid} sendData={triggerData} />
      <SpDetailViewContainer>
        <SpLeftFilterContainer>
          <SpLeftFilter
            locationData={location}
            tabIndex={tabIndex}
            sendData={triggerEventData}
          />
        </SpLeftFilterContainer>
        <div className="details-right">
          <SpDetailGrid spGridProps={spGridProps} sendData={getData} />
        </div>
      </SpDetailViewContainer>
    </>
  );
}

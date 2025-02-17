import { PiSideDrawer, PiTooltip, PiTypography } from "pixel-kit";
import { useEffect, useState } from "react";
import CrossLogo from "@app/assets/images/cross.svg";
import { ActivityProps } from "@app/modules/repair-detail-view/schema/repairs";
import Avatar from "@app/assets/images/avator.svg";
import { QuoteActivityPill } from "@app/core/components/gridStatus/gridStatus.component";
import { getStatusClassName } from "@app/modules/Quotes/Repair-Quotes/helpers/quote-helpers";
import { FormBodyOverFlow } from "../Repair-Components/checksIns/assignLocation/assign-location.component";
import { CloseButton } from "../adminaddrowmodel/adminaddrowmodel.component";
import {
  Activity,
  ActivityActor,
  ActivityLogByImage,
  ActivityLogData,
  ActivityLogDataContainer,
  ActivityLogDetails,
  ActivityLogInfo,
  ActivityTimeStamp,
  StatusPillContainer,
} from "./activity-log.components";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "../Repair-Components/selectItems/selectItemsModel/selectItem.component";

export default function ViewAllActivity({ activityDetails, sendData }: any) {
  const [openModel, setOpenModel] = useState(false);

  useEffect(() => {
    setOpenModel(true);
  }, []);
  function closeModel() {
    setOpenModel(false);
    const obj = {
      success: false,
    };
    sendData(obj);
  }
  return (
    <PiSideDrawer isOpen={openModel} width="narrow">
      <SideDrawerContainer>
        <SideDrawerHeader>
          <PiTypography component="h3">Activity Log</PiTypography>
          <CloseButton
            onClick={() => closeModel()}
            title="close"
            className="Hover"
          >
            <img src={CrossLogo} alt="loading" />
          </CloseButton>
        </SideDrawerHeader>
        <FormBodyOverFlow style={{ marginRight: "6px" }}>
          {activityDetails && activityDetails.length > 0 && (
            <ActivityLogDataContainer>
              <ActivityLogData
                style={{ overflow: "hidden" }}
                className="activity-log"
              >
                {activityDetails.map((obj: ActivityProps) => (
                  <ActivityLogDetails>
                    <ActivityLogByImage>
                      <img
                        src={obj.image_url ? obj.image_url : Avatar}
                        alt="loading"
                      />
                    </ActivityLogByImage>
                    <ActivityLogInfo>
                      <ActivityActor>{obj.actor}</ActivityActor>
                      {/* <ActivityPill className="approved">
                      Customer Approved
                    </ActivityPill> */}
                      {/* <div>
                          <PiLozenge
                            className="item-status"
                            appearance={getAppearence(obj.status_code)}
                          >
                            {obj.status}
                          </PiLozenge>
                        </div> */}
                      <StatusPillContainer>
                        {/* <PiLozenge
                            className="item-status"
                            appearance={getAppearence(obj.status_code)}
                          >
                            {obj.status}
                          </PiLozenge> */}
                        {/* <PiLabelName
                            description={QuoteStatusAppearance(obj.status)}
                            label=""
                          /> */}
                        <QuoteActivityPill
                          className={getStatusClassName(
                            obj.status ? obj.status : ""
                          )}
                        >
                          {obj.status ? obj.status : ""}
                        </QuoteActivityPill>
                        {obj.stock_code && (
                          <PiTooltip
                            content="Stock Code"
                            libraryType="atalskit"
                          >
                            <ActivityActor>{obj.stock_code}</ActivityActor>
                          </PiTooltip>
                        )}
                      </StatusPillContainer>
                      <Activity>{obj.message}</Activity>
                      <ActivityTimeStamp>
                        <span>{obj.date}</span>
                        <span>{obj.time}</span>
                      </ActivityTimeStamp>
                    </ActivityLogInfo>
                  </ActivityLogDetails>
                ))}
              </ActivityLogData>
            </ActivityLogDataContainer>
          )}
        </FormBodyOverFlow>
      </SideDrawerContainer>
    </PiSideDrawer>
  );
}

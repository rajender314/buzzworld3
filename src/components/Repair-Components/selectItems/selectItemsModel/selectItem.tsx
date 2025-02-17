import { PiSideDrawer, PiTypography } from "pixel-kit";
import { useEffect, useState } from "react";
import CrossLogo from "@app/assets/images/cross.svg";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import RepairsImg from "@app/assets/images/repairs.svg";
import { QuotePopupHeaderContainer } from "@app/components/Quote-components/Forms/PartQuote/part-quote.component";
import { SidePopupWidth60 } from "@app/components/Quote-components/Quote-detail-view-content/QuoteInformation/quote-info.component";
import AddPartRepair from "../AddPartRepair/add-part-repair";
import ItemsSelection from "../ItemsSelection/items-selection";
import { SideDrawerContainer, SideDrawerHeader } from "./selectItem.component";

export default function SelectItems({ sendEventData }: any) {
  const [openSideDrawer, setSideDrawer] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("");
  const [viewIndex, setViewIndex] = useState(0);
  const [partInfo, setpartInfo]: any = useState({ title: "Add" });

  useEffect(() => {
    setSideDrawer(true);
    setHeaderTitle("Add  Items to Repair");
  }, []);

  function closeModel() {
    if (viewIndex === 1) {
      setViewIndex(0);
      setHeaderTitle("Add  Items to Repair");
    } else {
      setSideDrawer(false);
      sendEventData({
        close: true,
      });
    }
  }
  async function triggerItemsEvent(e: any) {
    console.log(e);
    if (e.label === "Add Part to Repair") {
      setHeaderTitle(e.label);
      setpartInfo(e);
      setViewIndex(1);
    }
    if (e.success) {
      setSideDrawer(false);
      sendEventData(e);
    }
  }
  async function triggerEvent(e: any) {
    if (e.success) {
      setSideDrawer(false);
      sendEventData(e);
    }
  }

  return (
    <SidePopupWidth60>
      <PiSideDrawer isOpen={openSideDrawer} width="medium">
        <SideDrawerContainer>
          <SideDrawerHeader>
            <QuotePopupHeaderContainer>
              <img src={RepairsImg} alt="loading" />
              <PiTypography component="h3">{headerTitle}</PiTypography>
            </QuotePopupHeaderContainer>
            <CloseButton
              onClick={() => closeModel()}
              title="close"
              className="Hover"
            >
              <img src={CrossLogo} alt="loading" />
            </CloseButton>
          </SideDrawerHeader>
          {viewIndex === 0 && (
            <ItemsSelection sendEventData={(e: any) => triggerItemsEvent(e)} />
          )}
          {viewIndex === 1 && (
            <AddPartRepair
              partInfo={partInfo}
              sendModelData={(e: any) => triggerEvent(e)}
            />
          )}
        </SideDrawerContainer>
      </PiSideDrawer>
    </SidePopupWidth60>
  );
}

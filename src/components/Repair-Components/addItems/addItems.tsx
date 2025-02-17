import { PiSideDrawer, PiTypography } from "pixel-kit";
import { useEffect, useState } from "react";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import CrossLogo from "@app/assets/images/cross.svg";
import RepairsImg from "@app/assets/images/repairs.svg";
import { QuotePopupHeaderContainer } from "@app/components/Quote-components/Forms/PartQuote/part-quote.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "../selectItems/selectItemsModel/selectItem.component";
import AddPartRepair from "../selectItems/AddPartRepair/add-part-repair";

export default function AddItems({ partInfo, sendEventData }: any) {
  console.log(partInfo);

  const [openSideDrawer, setSideDrawer] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("");

  useEffect(() => {
    setSideDrawer(true);

    setHeaderTitle(`${partInfo.title} Item`);
  }, []);

  function closeModel() {
    setSideDrawer(false);
    sendEventData({
      close: true,
    });
  }

  async function triggerEvent(e: any) {
    if (e.success) {
      setSideDrawer(false);
      sendEventData(e);
    }
  }
  return (
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
        <AddPartRepair
          partInfo={partInfo}
          sendModelData={(e: any) => triggerEvent(e)}
        />
      </SideDrawerContainer>
    </PiSideDrawer>
  );
}

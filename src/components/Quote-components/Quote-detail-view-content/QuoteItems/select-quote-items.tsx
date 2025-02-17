import { PiSideDrawer, PiTypography } from "pixel-kit";
import { useEffect, useState } from "react";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import CrossLogo from "@app/assets/images/cross.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import QuotesImg from "@app/assets/images/quotes.svg";
import QuoteItemSelctionTab from "./quote-items-section-tab";
import { SidePopupWidth60 } from "../QuoteInformation/quote-info.component";
import { QuotePopupHeaderContainer } from "../../Forms/PartQuote/part-quote.component";

export default function QuoteSelectItems({
  selectedOption,
  quoteDetails,
  sendEventData,
}: any) {
  const [openSideDrawer, setSideDrawer] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("");
  const [itemsApiParams, setItemsApiParams]: any = useState();

  useEffect(() => {
    setSideDrawer(true);
    setHeaderTitle("Add Items to Quote");
    const itemsApi = {
      searchUrl: EndpointUrl.QuoteSearchItems,
      flag: "quote_items",
      submitUrl: EndpointUrl.QuoteItems,
      selectedOption,
    };
    setItemsApiParams(itemsApi);
  }, [selectedOption]);

  function closeModel() {
    setSideDrawer(false);
    sendEventData({
      close: true,
    });
  }
  async function triggerItemsEvent(e: any) {
    console.log(e);

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
              <img src={QuotesImg} alt="loading" />
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
          <QuoteItemSelctionTab
            itemsApiParams={itemsApiParams}
            quoteDetails={quoteDetails}
            sendEventData={(e: any) => triggerItemsEvent(e)}
          />
        </SideDrawerContainer>
      </PiSideDrawer>
    </SidePopupWidth60>
  );
}

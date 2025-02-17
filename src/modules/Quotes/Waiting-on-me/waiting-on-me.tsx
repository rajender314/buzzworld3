import QuoteList from "@app/components/Quote-components/quote-list";
import { QuoteSideList } from "@app/modules/organisations/component/organisationRenderdata";

export default function WaitingOnMe() {
  return (
    <QuoteList
      sideNavData={QuoteSideList}
      pageLabel="waiting_on_me"
      gridName="Quotes"
    />
  );
}

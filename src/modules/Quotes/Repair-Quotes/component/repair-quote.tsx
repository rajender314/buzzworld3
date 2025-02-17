import QuoteList from "@app/components/Quote-components/quote-list";
import { QuoteSideList } from "@app/modules/organisations/component/organisationRenderdata";

export default function RepairQuote() {
  return (
    <QuoteList
      sideNavData={QuoteSideList}
      pageLabel="quote_for_parts"
      gridName="Quotes"
    />
  );
}

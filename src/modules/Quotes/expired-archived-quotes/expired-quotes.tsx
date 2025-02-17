import QuoteList from "@app/components/Quote-components/quote-list";
import { QuoteSideList } from "@app/modules/organisations/component/organisationRenderdata";

export default function ExpiredQuotes() {
  return (
    <QuoteList
      sideNavData={QuoteSideList}
      pageLabel="quote_expired"
      gridName="Quotes"
    />
  );
}

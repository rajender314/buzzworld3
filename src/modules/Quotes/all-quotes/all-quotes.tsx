import QuoteList from "@app/components/Quote-components/quote-list";
import { QuoteSideList } from "@app/modules/organisations/component/organisationRenderdata";

export default function AllQuotes() {
  return (
    <QuoteList
      sideNavData={QuoteSideList}
      pageLabel="all_quotes"
      gridName="Quotes"
    />
  );
}

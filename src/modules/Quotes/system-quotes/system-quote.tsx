import QuoteList from "@app/components/Quote-components/quote-list";
import { QuoteSideList } from "@app/modules/organisations/component/organisationRenderdata";

export default function SystemQuotes() {
  return (
    <QuoteList
      sideNavData={QuoteSideList}
      pageLabel="system_quotes"
      gridName="Quotes"
    />
  );
}

import QuoteList from "@app/components/Quote-components/quote-list";
import { QuoteSideList } from "@app/modules/organisations/component/organisationRenderdata";

export default function QuoteforRepair() {
  return (
    <QuoteList
      sideNavData={QuoteSideList}
      pageLabel="quote_for_repair"
      gridName="Quotes"
    />
  );
}

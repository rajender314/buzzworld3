import QuoteList from "@app/components/Quote-components/quote-list";
import { QuoteSideList } from "@app/modules/organisations/component/organisationRenderdata";

export default function QuotesForMyCustomers() {
  return (
    <QuoteList
      sideNavData={QuoteSideList}
      pageLabel="quotes_for_my_customers"
      gridName="Quotes"
    />
  );
}

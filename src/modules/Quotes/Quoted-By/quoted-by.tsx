import QuoteList from "@app/components/Quote-components/quote-list";
import { QuoteSideList } from "@app/modules/organisations/component/organisationRenderdata";

export default function QuotedBy() {
  return (
    <QuoteList
      sideNavData={QuoteSideList}
      pageLabel="quoted_by"
      gridName="Quotes"
    />
  );
}

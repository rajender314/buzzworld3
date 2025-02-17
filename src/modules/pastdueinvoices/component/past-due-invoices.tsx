/* eslint-disable react/jsx-props-no-spreading */
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import PastDueInvoicesImg from "@app/assets/images/past_ due_invoices.svg";

import ReportsLayout from "@app/components/reportsLayout";

export default function PastDueInvoices() {
  return (
    <ReportsLayout
      pageLabel="Past Due Invoices"
      apiDataUrl={EndpointUrl.pastDueInvoicesList}
      pageLogo={PastDueInvoicesImg}
    />
  );
}

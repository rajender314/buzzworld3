import SalesOrderInformation from "../sales-order-information/sales-order-information";

import {
  CreateSalesOrderDetailContent,
  CreateSalesOrderDetailPageSection,
  CreateSalesOrderTabContainer,
} from "./create-sales-orders-view-content-components";

type Props = {
  type: any;
  salesOrderInfo: any;
};
export default function CreateSalesOrdersViewContent(props: Props) {
  const { type, salesOrderInfo } = props;
  return (
    <CreateSalesOrderDetailPageSection>
      <CreateSalesOrderDetailContent>
        <CreateSalesOrderTabContainer>
          <SalesOrderInformation type={type} salesOrderInfo={salesOrderInfo} />
        </CreateSalesOrderTabContainer>
      </CreateSalesOrderDetailContent>
    </CreateSalesOrderDetailPageSection>
  );
}

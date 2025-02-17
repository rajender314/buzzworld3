import { PiBackSection } from "pixel-kit";
import JobsDetailImg from "@app/assets/images/salesOrder-detail-view.svg";
import PurchasePrice from "@app/assets/images/partspurchase-detailview.svg";
import {
  BackSection,
  HeaderContainer,
  RepairIds,
} from "@app/components/detail-view-header/detail-view-header.component";
import { QuoteActivityPill } from "@app/core/components/gridStatus/gridStatus.component";
import { getStatusClassName } from "@app/modules/Quotes/Repair-Quotes/helpers/quote-helpers";
import { BackButton } from "@app/components/special-pricing-components/logHistoryDetailGrid/logHistoryDetailGrid.component";
import ChevronLeft from "@app/assets/images/chevron_left.svg";
import { useHistory } from "react-router-dom";
import { RepairIdsDiv } from "./orders-detail-view-header-components";

export default function OrdersDetailViewHeader({ headerInfo, type }: any) {
  const history = useHistory();
  const closeModel = () => {
    if (
      window.location.pathname.split("/")[1] === "parts-purchase-detail-view"
    ) {
      history.replace("/part-purchase");
    } else {
      history.replace(`/${window.location.pathname.split("/")[1]}`);
    }
  };
  return (
    <HeaderContainer>
      <BackSection style={{ gap: "16px" }}>
        {type === "orders" && (
          <div>
            <PiBackSection
              backOptions={{
                name: "",
                route: "/orders",
              }}
            />
          </div>
        )}
        {type === "PartsPurchase" && (
          <div>
            {/* <PiBackSection
                backOptions={{
                  name: "",
                  route: "/part-purchase",
                }}
              /> */}
            <BackButton onClick={closeModel}>
              <img src={ChevronLeft} alt="loading" />
            </BackButton>
          </div>
        )}

        <RepairIdsDiv>
          {type === "orders" && (
            <img
              className="repair-view-left-image"
              src={JobsDetailImg}
              alt="loading"
            />
          )}
          {type === "PartsPurchase" && (
            <img
              className="repair-view-left-image"
              src={PurchasePrice}
              alt="loading"
            />
          )}
          {type === "orders" && (
            <RepairIds>
              <div className="quote-num-and-status">
                <div className="id-num">
                  #
                  {headerInfo && headerInfo.sales_order_info.SalesOrder
                    ? headerInfo.sales_order_info.SalesOrder
                    : ""}
                </div>
                <QuoteActivityPill
                  className={getStatusClassName(
                    headerInfo.sales_order_info.OrderStatus
                      ? headerInfo.sales_order_info.OrderStatus
                      : ""
                  )}
                >
                  {headerInfo.sales_order_info.OrderStatus
                    ? headerInfo.sales_order_info.OrderStatus
                    : ""}
                </QuoteActivityPill>
              </div>

              <div className="repair-name" title="-">
                {/* {headerInfo.sales_order_info.SalesOrder} */}
              </div>
            </RepairIds>
          )}
          {type === "PartsPurchase" && (
            <RepairIds>
              <div className="quote-num-and-status">
                <div className="id-num">
                  #
                  {headerInfo &&
                  headerInfo.vendor_info &&
                  headerInfo.vendor_info.part_no
                    ? headerInfo.vendor_info.part_no
                    : "-"}
                </div>
                <QuoteActivityPill
                  className={getStatusClassName(
                    headerInfo &&
                      headerInfo.requestor_info &&
                      headerInfo.requestor_info.status
                      ? headerInfo.requestor_info.status
                      : "-"
                  )}
                >
                  {headerInfo &&
                  headerInfo.requestor_info &&
                  headerInfo.requestor_info.status
                    ? headerInfo.requestor_info.status
                    : "-"}
                </QuoteActivityPill>
              </div>

              <div
                className="repair-name"
                title={
                  headerInfo &&
                  headerInfo.vendor_info &&
                  headerInfo.vendor_info.vendor_name
                    ? headerInfo.vendor_info.vendor_name
                    : "-"
                }
              >
                {headerInfo &&
                headerInfo.vendor_info &&
                headerInfo.vendor_info.vendor_name
                  ? headerInfo.vendor_info.vendor_name
                  : "-"}
              </div>
            </RepairIds>
          )}
        </RepairIdsDiv>
      </BackSection>
    </HeaderContainer>
  );
}

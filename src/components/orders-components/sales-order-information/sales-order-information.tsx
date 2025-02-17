/* eslint-disable react/no-unstable-nested-components */
import { PiTypography, PiLabelName, PiConfirmModel } from "pixel-kit";
import { useCallback, useEffect, useState } from "react";
import {
  RepairInfoSection,
  RightDetailContent,
} from "@app/components/detail-view-content/detail-view-content.component";
import {
  RepairCardsHeader,
  CardTopDetails,
} from "@app/components/RepairItems/repair-items.component";
import RelatedToCard from "@app/core/components/related-to-card";
import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";
import { useHistory, useParams } from "react-router-dom";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { ApiResponse } from "@app/services/schema/schema";
import { triggerApi } from "@app/services";
import QuoteStatusAppearance from "@app/core/components/gridStatus/quote-status-apperance";
import {
  RowsOverrideContainer,
  RowsOverrideItemsContainer,
} from "@app/components/special-pricing-components/pricing-rule-configuarotor/pricing-rule-configurator.component";
import { DetailsContent } from "@app/components/special-pricing-components/sp-detail-grid/sp-detail-grid.component";
import {
  SalesOrderField,
  SalesOrderInfoItemCardWrapper,
  SalesOrderInfoTitleContainer,
  SalesInfoItemCard,
  SalesOrderItemValue,
  SalesOrderItemLabel,
  JobWarnItemContainer,
} from "./sales-order-information-componets";

type props = {
  type?: any;
  salesOrderInfo?: any;
};
export default function SalesOrderInformation(Props: props) {
  const { salesOrderInfo } = Props;
  const [OrderInfo, setOrderInfo]: any = useState(salesOrderInfo);
  const { id }: RouteParams = useParams();
  const [relatedData, setRelatedData] = useState([]);
  const [showJobWarnPopup, setShowJobWarnPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setOrderInfo(salesOrderInfo);
  }, [salesOrderInfo]);

  const postalCode: any =
    salesOrderInfo && salesOrderInfo.sales_order_info.ShipPostalCode;

  const getRelatedData = useCallback(() => {
    setLoading(true);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.RelatedData}?sales_order_id=${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          // setOpacity(false);
          const { data } = response.result;
          setRelatedData(data);
          setLoading(false);
        } else if (!response.result.success) {
          setLoading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, [id]);
  useEffect(() => {
    getRelatedData();
  }, [getRelatedData]);
  const history: any = useHistory();
  const jobWarns: any =
    history.location.state && history.location.state.jobWarningMsgs
      ? history.location.state.jobWarningMsgs
      : {};
  useEffect(() => {
    if (jobWarns && jobWarns.length > 0) {
      setShowJobWarnPopup(true);
    } else {
      setShowJobWarnPopup(false);
    }
  }, [jobWarns]);
  async function getWarnPopupEvent(e: any) {
    console.log(e, 7666);
  }

  function JobErrorgMsgs() {
    return (
      <RowsOverrideContainer>
        <DetailsContent
          style={{ flexDirection: "column" }}
          className="flex-wrap"
        >
          <RowsOverrideItemsContainer>
            <JobWarnItemContainer>
              {jobWarns &&
                jobWarns.length > 0 &&
                jobWarns.map((item: any) => <li>{item}</li>)}
            </JobWarnItemContainer>
          </RowsOverrideItemsContainer>
        </DetailsContent>
      </RowsOverrideContainer>
    );
  }
  async function getEventData(e: any) {
    console.log(e, 117);
    if (e.pageLabel === "Order") {
      getRelatedData();
    }
  }
  return (
    <>
      <div style={{ display: "flex" }}>
        <div id="right">
          <RepairInfoSection id="repair-info-id">
            <SalesOrderInfoTitleContainer className="rep-label-typo">
              <PiTypography component="h6">
                Sales Order Information
              </PiTypography>
            </SalesOrderInfoTitleContainer>
            <div className="field-details">
              <SalesOrderField className="calc-width-25">
                <PiLabelName
                  description={
                    OrderInfo && OrderInfo.sales_order_info.Customer
                      ? `${
                          OrderInfo.sales_order_info.Customer
                        } - ${OrderInfo.sales_order_info.CustomerName.replace(/\\/g, "")}`
                      : "-"
                  }
                  label="Customer - Customer Name"
                />
              </SalesOrderField>
              <SalesOrderField className="calc-width-25">
                <PiLabelName
                  description={
                    OrderInfo && OrderInfo.sales_order_info.Salesperson
                      ? OrderInfo.sales_order_info.Salesperson.replace(
                          /\\/g,
                          ""
                        )
                      : "-"
                  }
                  label="Sales Person"
                />
              </SalesOrderField>
              <SalesOrderField className="calc-width-25">
                <PiLabelName
                  description={
                    OrderInfo && OrderInfo.sales_order_info.OrderDate
                      ? OrderInfo.sales_order_info.OrderDate
                      : "-"
                  }
                  label="Order Date"
                />
              </SalesOrderField>
              <SalesOrderField className="calc-width-25">
                <PiLabelName
                  description={
                    OrderInfo && OrderInfo.sales_order_info.CustomerPoNumber
                      ? OrderInfo.sales_order_info.CustomerPoNumber
                      : "-"
                  }
                  label="Customer PO Number "
                />
              </SalesOrderField>

              <SalesOrderField className="calc-width-25 email">
                <PiLabelName
                  description={
                    OrderInfo && OrderInfo.sales_order_info.Email
                      ? OrderInfo.sales_order_info.Email
                      : "-"
                  }
                  label="Email ID"
                />
              </SalesOrderField>
              <SalesOrderField className="calc-width-25">
                <PiLabelName
                  description={
                    OrderInfo && OrderInfo.sales_order_info.InvTermsOverride
                      ? OrderInfo.sales_order_info.InvTermsOverride
                      : "-"
                  }
                  label="Invoice Terms"
                />
              </SalesOrderField>
              <SalesOrderField className="calc-width-25">
                <PiLabelName
                  description={
                    OrderInfo && OrderInfo.sales_order_info.ShippingInstrs
                      ? OrderInfo.sales_order_info.ShippingInstrs
                      : "-"
                  }
                  label="Shipping Instructions"
                />
              </SalesOrderField>
              <SalesOrderField className="calc-width-25">
                <PiLabelName
                  description={
                    OrderInfo && OrderInfo.sales_order_info.ShipAddress1
                      ? OrderInfo.sales_order_info.ShipAddress1.replace(
                          /\\/g,
                          ""
                        ) +
                        (OrderInfo.sales_order_info.ShipAddress2 !== ""
                          ? `, ${OrderInfo.sales_order_info.ShipAddress2.replace(/\\/g, "")}`
                          : "") +
                        (OrderInfo.sales_order_info.ShipAddress3 !== ""
                          ? `, ${OrderInfo.sales_order_info.ShipAddress3.replace(/\\/g, "")}`
                          : "") +
                        (OrderInfo.sales_order_info.ShipAddress4 !== ""
                          ? `, ${OrderInfo.sales_order_info.ShipAddress4.replace(/\\/g, "")}`
                          : "") +
                        (OrderInfo.sales_order_info.ShipAddress5 !== ""
                          ? `, ${OrderInfo.sales_order_info.ShipAddress5.replace(/\\/g, "")}`
                          : "") +
                        (postalCode !== ""
                          ? `, ${postalCode.replace(/\\/g, "")}`
                          : "")
                      : "-"
                  }
                  label="Shipping Address"
                />
              </SalesOrderField>

              <SalesOrderField className="calc-width-25">
                <PiLabelName
                  description={
                    OrderInfo && OrderInfo.sales_order_info.OrderStatus
                      ? QuoteStatusAppearance(
                          OrderInfo.sales_order_info.OrderStatus
                        )
                      : "-"
                  }
                  label="Order Status"
                />
              </SalesOrderField>
            </div>
          </RepairInfoSection>

          <RepairInfoSection style={{ marginTop: "24px" }}>
            <RepairCardsHeader>
              <PiTypography component="h4">
                {OrderInfo &&
                OrderInfo.sales_order_info.items &&
                OrderInfo.sales_order_info.items.length > 1
                  ? "Items"
                  : "Item"}
              </PiTypography>
            </RepairCardsHeader>

            <SalesOrderInfoItemCardWrapper>
              {OrderInfo &&
                OrderInfo.sales_order_info.items &&
                OrderInfo.sales_order_info.items.map((data: any) => (
                  <SalesInfoItemCard>
                    <CardTopDetails>
                      <div
                        className=" with-border-bottom"
                        style={{ background: "#F7FAFF", padding: "16px" }}
                      >
                        <div>
                          <h4>
                            {/* <span className="fs-16 semiBoldWt color-dark m-0 mb-8">
                                      Stock Code :
                                    </span> */}
                            <span>
                              {data && data.stockcode ? data.stockcode : "-"}
                            </span>
                          </h4>
                        </div>
                        <div>
                          <p
                            className="m-0 line-clamp three-lines font_color"
                            title="-"
                          >
                            {/* <span className="fs-16 semiBoldWt color-dark m-0 mb-8">
                                                Stock Description :
                                              </span> */}
                            <span className="font_color semiBoldWt">
                              {data && data.stockcode_des
                                ? data.stockcode_des
                                : "-"}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div style={{ padding: "16px" }}>
                        <div className="container">
                          <SalesOrderItemLabel>
                            <span>Order Quantity</span>

                            <SalesOrderItemValue>
                              {data && data.order_qty
                                ? // eslint-disable-next-line radix
                                  parseInt(data.order_qty.replace(/,/g, ""))
                                : ""}
                            </SalesOrderItemValue>
                          </SalesOrderItemLabel>

                          <SalesOrderItemLabel>
                            <span> Product Class</span>

                            <SalesOrderItemValue>
                              {data && data.product_class
                                ? data.product_class
                                : "-"}
                            </SalesOrderItemValue>
                          </SalesOrderItemLabel>

                          <SalesOrderItemLabel>
                            <span>Warehouse</span>

                            <SalesOrderItemValue>
                              {data && data.warehouse ? data.warehouse : "--"}
                            </SalesOrderItemValue>
                          </SalesOrderItemLabel>

                          <SalesOrderItemLabel>
                            <span>Order UOM</span>

                            <SalesOrderItemValue>
                              {data && data.unit_of_measure
                                ? data.unit_of_measure
                                : "-"}
                            </SalesOrderItemValue>
                          </SalesOrderItemLabel>

                          <SalesOrderItemLabel>
                            <span>Price</span>

                            <SalesOrderItemValue>
                              {data.price && data.price
                                ? `$ ${data.price}`
                                : ""}
                            </SalesOrderItemValue>
                          </SalesOrderItemLabel>
                          <SalesOrderItemLabel>
                            <span>Net Price</span>
                            <SalesOrderItemValue>
                              {data.net_price && data.net_price
                                ? `$ ${data.net_price}`
                                : ""}
                            </SalesOrderItemValue>
                          </SalesOrderItemLabel>
                        </div>
                        <div style={{ display: "flex", gap: "14px" }}>
                          <SalesOrderItemLabel className="line-ship-date w-15">
                            <span>Line Ship Date</span>
                            <SalesOrderItemValue className="line-ship-date-value">
                              {data && data.LineShipDate
                                ? data.LineShipDate
                                : "--"}
                            </SalesOrderItemValue>
                          </SalesOrderItemLabel>
                          <SalesOrderItemLabel className="line-ship-date w-24">
                            <span>Customer Request Date</span>
                            <SalesOrderItemValue className="line-ship-date-value">
                              {data && data.customer_request_date
                                ? data.customer_request_date
                                : "--"}
                            </SalesOrderItemValue>
                          </SalesOrderItemLabel>
                        </div>
                      </div>
                    </CardTopDetails>
                  </SalesInfoItemCard>
                ))}
            </SalesOrderInfoItemCardWrapper>
          </RepairInfoSection>
        </div>

        <RightDetailContent style={{ marginLeft: "24px" }}>
          <RelatedToCard
            relatedData={relatedData}
            pageLabel="Order"
            sendEventData={(e: any) => getEventData(e)}
            isLoading={loading}
          />
        </RightDetailContent>
      </div>

      <PiConfirmModel
        className={showJobWarnPopup ? "show show text-red" : ""}
        headerLabel="Job Warnings"
        message={<JobErrorgMsgs />}
        // secondaryBtnLabel={"Cancel"}
        onClose={() => {
          setShowJobWarnPopup(false);
        }}
        onAccept={(e: any) => getWarnPopupEvent(e)}
        onDecline={() => {
          setShowJobWarnPopup(false);
        }}
      />
    </>
  );
}

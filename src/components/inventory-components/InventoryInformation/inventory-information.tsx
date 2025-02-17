import { PiTypography, PiLabelName } from "pixel-kit";
import { useEffect, useState } from "react";
import { RepairInfoSection } from "@app/components/detail-view-content/detail-view-content.component";
import { UserRoleField } from "@app/components/usersComponents/userslist/userslist.component";

export default function JobsInformation({ stockInfo }: any) {
  const [stockDetailsInfo, setStockDetailsInfo]: any = useState(stockInfo);
  useEffect(() => {
    setStockDetailsInfo(stockInfo);
  }, [stockInfo]);

  return (
    <RepairInfoSection className="hi">
      <div className="rep-label-typo">
        <PiTypography component="h4">Stock Code Information</PiTypography>
      </div>

      <div className="field-details ">
        <UserRoleField className="repiar-infosection-item">
          <PiLabelName
            description={
              stockDetailsInfo &&
              stockDetailsInfo.stockItemInfo &&
              stockDetailsInfo.stockItemInfo.stockCode
                ? stockDetailsInfo.stockItemInfo.stockCode
                : "-"
            }
            label="Stock Code"
          />
        </UserRoleField>
        <UserRoleField className="repiar-infosection-item">
          <PiLabelName
            description={
              stockDetailsInfo &&
              stockDetailsInfo.stockItemInfo &&
              stockDetailsInfo.stockItemInfo.stockDesc
                ? stockDetailsInfo.stockItemInfo.stockDesc
                : "-"
            }
            label="Description"
          />
        </UserRoleField>
        <UserRoleField className="repiar-infosection-item">
          <PiLabelName
            description={
              stockDetailsInfo &&
              stockDetailsInfo.stockItemInfo &&
              stockDetailsInfo.stockItemInfo.stockUom
                ? stockDetailsInfo.stockItemInfo.stockUom
                : "-"
            }
            label="Stock UOM"
          />
        </UserRoleField>
        <UserRoleField className="repiar-infosection-item">
          <PiLabelName
            description={
              stockDetailsInfo &&
              stockDetailsInfo.stockItemInfo &&
              stockDetailsInfo.stockItemInfo.supplier
                ? stockDetailsInfo.stockItemInfo.supplier
                : "-"
            }
            label="Supplier"
          />
        </UserRoleField>
        <UserRoleField className="repiar-infosection-item">
          <PiLabelName
            description={
              stockDetailsInfo &&
              stockDetailsInfo.stockItemInfo &&
              stockDetailsInfo.stockItemInfo.supplierName
                ? stockDetailsInfo.stockItemInfo.supplierName
                : "-"
            }
            label="Supplier Name"
          />
        </UserRoleField>
        <UserRoleField className="repiar-infosection-item">
          <PiLabelName
            description={
              stockDetailsInfo &&
              stockDetailsInfo.stockItemInfo &&
              stockDetailsInfo.stockItemInfo.productClass
                ? stockDetailsInfo.stockItemInfo.productClass
                : "-"
            }
            label="Product Class"
          />
        </UserRoleField>
        <UserRoleField className="repiar-infosection-item">
          <PiLabelName
            description={
              stockDetailsInfo &&
              stockDetailsInfo.stockItemInfo &&
              stockDetailsInfo.stockItemInfo.productClassDesc
                ? stockDetailsInfo.stockItemInfo.productClassDesc
                : "-"
            }
            label="Product Class Description"
          />
        </UserRoleField>
      </div>
    </RepairInfoSection>
  );
}

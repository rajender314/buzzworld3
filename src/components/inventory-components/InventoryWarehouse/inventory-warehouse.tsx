import {
  PiTabGroup,
  PiTabHeaderPanel,
  PiTabPanel,
  PiTypography,
} from 'pixel-kit';
import { Fragment, useEffect, useState } from 'react';
import { FormBodyOverFlow } from '@app/components/Repair-Components/checksIns/assignLocation/assign-location.component';
import { TabParentDiv } from '@app/components/Repair-Components/selectItems/ItemsSelection/items-selection.component';
import { RepairInfoSection } from '../../detail-view-content/detail-view-content.component';
import {
  RepairCardBody,
  RepairItemsRowRow,
  RepairItemsColumn,
} from '../../RepairItems/repair-items.component';
import { NoWareHouseInfoFound } from '../inventory-list/inventory-list-components';

export default function InventoryWarehouse({ stockInfo }: any) {
  const [warehouseDetailsInfo, setWarehouseDetailsInfo]: any = useState(stockInfo);
  useEffect(() => {
    setWarehouseDetailsInfo(stockInfo);
  }, [stockInfo]);

  return (
    <RepairInfoSection className="hii" style={{ padding: '24px', margin: '0' }}>
      <div className="rep-label-typo">
        <PiTypography component="h4">Ware House Information</PiTypography>
      </div>

      <FormBodyOverFlow className="warehouse-deatil">
        <TabParentDiv className="data-detail">
          <PiTabGroup id="" className="warehouses">
            <PiTabHeaderPanel />
            <PiTabPanel>
              <RepairCardBody style={{ height: '100%' }} className="warehouses">
                {warehouseDetailsInfo && warehouseDetailsInfo.length > 0 && (
                  <RepairItemsRowRow className="warehouse_header ">
                    <RepairItemsColumn className="header-label  ">
                      Warehouse
                    </RepairItemsColumn>
                    <RepairItemsColumn className="header-label">
                      Description
                    </RepairItemsColumn>
                    <RepairItemsColumn className="header-label right  ">
                      Qty On Hand
                    </RepairItemsColumn>
                    <RepairItemsColumn className="header-label right  ">
                      Available Qty
                    </RepairItemsColumn>
                    <RepairItemsColumn className="header-label right  ">
                      Qty On Order
                    </RepairItemsColumn>
                    <RepairItemsColumn className="header-label right ">
                      Qty Allocated
                    </RepairItemsColumn>
                    <RepairItemsColumn className="header-label right ">
                      Qty Unallocated
                    </RepairItemsColumn>
                  </RepairItemsRowRow>
                )}

                {warehouseDetailsInfo && warehouseDetailsInfo.length ? (
                  <>
                    {warehouseDetailsInfo.map((data: any) => (
                      <div className="hi">
                        <RepairItemsRowRow className="data warehouse ">
                          <RepairItemsColumn
                            title="warehouse"
                            className="text-ellipsis  "
                          >
                            {data.warehouse}
                          </RepairItemsColumn>
                          <RepairItemsColumn
                            title="description"
                            className="line-clamp three-lines   "
                          >
                            {data.description}
                          </RepairItemsColumn>
                          <RepairItemsColumn
                            title="Qty On Hand"
                            className="line-clamp three-lines right  "
                          >
                            {data.qtyOnHand}
                          </RepairItemsColumn>
                          <RepairItemsColumn
                            title="availableQty"
                            className="line-clamp three-lines right  "
                          >
                            {data.availableQty}
                          </RepairItemsColumn>

                          <RepairItemsColumn
                            title="qtyOnOrder"
                            className="line-clamp three-lines right  "
                          >
                            {data.qtyOnOrder}
                          </RepairItemsColumn>
                          <RepairItemsColumn
                            title="qtyAllocated"
                            className="line-clamp three-lines right  "
                          >
                            {data.qtyAllocated}
                          </RepairItemsColumn>
                          <RepairItemsColumn
                            title="qtyOnOrder"
                            className="line-clamp three-lines right  "
                          >
                            {data.qtyUnallocated}
                          </RepairItemsColumn>
                        </RepairItemsRowRow>
                      </div>
                    ))}
                  </>
                ) : (
                  <NoWareHouseInfoFound>
                    Ware house Information Not Available
                  </NoWareHouseInfoFound>
                )}
              </RepairCardBody>
            </PiTabPanel>
          </PiTabGroup>
        </TabParentDiv>
      </FormBodyOverFlow>
    </RepairInfoSection>
  );
}

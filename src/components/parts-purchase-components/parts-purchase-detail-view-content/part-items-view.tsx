import {
  PiTypography,
  PiLabelName,
  PiModal,
  PiButton,
  PiCheckbox,
} from "pixel-kit";
import {
  ItemCard,
  NoRepairFound,
} from "@app/components/RepairItems/repair-items.component";
import { RepairInfoSection } from "@app/components/detail-view-content/detail-view-content.component";
import { CardViews } from "@app/core/components/ItemsCard/item-card.component";
import VendorNameIcon from "@app/assets/images/vendor_logo.svg";
import { Fragment, useEffect, useState } from "react";
import { QuotePopupHeaderContainer } from "@app/components/Quote-components/Forms/PartQuote/part-quote.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import CrossLogo from "@app/assets/images/cross.svg";
import { SideDrawerFooter } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import PurchasePrice from "@app/assets/images/partspurchase-detailview.svg";
import { QuoteActivityPill } from "@app/core/components/gridStatus/gridStatus.component";
import { getStatusClassName } from "@app/modules/Quotes/Repair-Quotes/helpers/quote-helpers";
import {
  PPItemCardTopDetails,
  PPManufacturerAvatarSection,
  FieldDetails,
  PartsPurchaseField,
  ItemsIconHeaderContainer,
  RequestorInfoSection,
} from "./parts-purchase-detail-view-content-components";

export default function PartItemsView({
  partsPurchaseList,
  sendModelData,
}: any) {
  // eslint-disable-next-line prefer-const
  let [partsItemsArray, setpartsItemsArray]: any = useState([]);
  const [openModel, setOpenModel] = useState(false);
  // eslint-disable-next-line prefer-const
  let [totalCheckedItems, setTotalCheckedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectAllCheck, setSelectAllCheck] = useState(false);

  useEffect(() => {
    setOpenModel(true);
  }, []);
  useEffect(() => {
    (async () => {
      console.log(partsPurchaseList);
      // eslint-disable-next-line prefer-const
      let arr: any = [];
      partsItemsArray =
        partsPurchaseList &&
        // eslint-disable-next-line arrow-body-style
        partsPurchaseList.part_items.filter((obj: any) => {
          return obj.status_code === "part_items_ordered";
        });
      console.log(arr, partsItemsArray);
      await setpartsItemsArray(partsItemsArray);
      setLoading(false);
    })();
  }, [partsPurchaseList]);

  useEffect(() => {
    totalCheckedItems =
      partsItemsArray && partsItemsArray.filter((e: any) => e.isChecked);
    setTotalCheckedItems(totalCheckedItems);
    if (totalCheckedItems.length === partsItemsArray.length) {
      setSelectAllCheck(true);
    } else {
      setSelectAllCheck(false);
    }
  }, [partsItemsArray]);

  useEffect(() => {
    totalCheckedItems =
      partsItemsArray && partsItemsArray.filter((e: any) => e.isChecked);
    setTotalCheckedItems(totalCheckedItems);
  }, [partsItemsArray]);

  function closeModel() {
    setOpenModel(false);
    sendModelData({ close: true });
  }

  const saveChanges = () => {
    const arr: Array<[]> = [];
    totalCheckedItems.map((obj: any) => {
      arr.push(obj.item_id);
      return obj;
    });
    sendModelData({ success: true, selectedList: arr });
  };
  const selectCheckBox = (event: any, ele: any) => {
    event.stopPropagation();
    let arr: any = [];
    arr = partsItemsArray.map((obj: any) => {
      if (obj.item_id === ele.item_id) {
        if (event.target.checked) {
          obj.isChecked = true;
        } else {
          obj.isChecked = false;
        }
      }
      return obj;
    });
    setpartsItemsArray(arr);
  };
  const selectAll = (e: any) => {
    let arr: any = [];
    arr = partsItemsArray.map((obj: any) => {
      obj.isChecked = e.target.checked;
      return obj;
    });
    setpartsItemsArray(arr);
  };

  return (
    <>
      {/* <SideDrawerW60> */}
      <PiModal isOpen={openModel} width={1000}>
        <SideDrawerContainer style={{ overflow: "hidden" }}>
          <SideDrawerHeader>
            <QuotePopupHeaderContainer>
              <img src={PurchasePrice} alt="loading" />
              <PiTypography component="h3">Items Information</PiTypography>
            </QuotePopupHeaderContainer>
            <CloseButton
              onClick={() => closeModel()}
              title="close"
              className="Hover"
            >
              <img src={CrossLogo} alt="loading" />
            </CloseButton>
          </SideDrawerHeader>
          <>
            {!loading && (
              <RepairInfoSection style={{ overflowY: "auto" }}>
                {partsItemsArray && partsItemsArray.length > 1 && (
                  <div className="check_box" style={{ cursor: "pointer" }}>
                    <PiCheckbox
                      isChecked={selectAllCheck}
                      helpText=""
                      libraryType="atalskit"
                      name="checkbox"
                      onChange={(e) => selectAll(e)}
                      size="large"
                      className="repair-item-checkbox"
                      label="Select All"
                    />
                  </div>
                )}
                <div>
                  {partsItemsArray &&
                    partsItemsArray &&
                    partsItemsArray.length > 0 &&
                    partsItemsArray.map((info: any, index: number) => (
                      <ItemCard style={{ paddingBottom: "0" }}>
                        <CardViews style={{ alignItems: "unset " }}>
                          <PPItemCardTopDetails>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                              }}
                            >
                              {partsItemsArray.length > 1 && (
                                <div
                                  className="check_box"
                                  style={{ cursor: "pointer" }}
                                >
                                  <PiCheckbox
                                    isChecked={info.isChecked}
                                    helpText=""
                                    libraryType="atalskit"
                                    name={`checkbox${index}`}
                                    onChange={(e) => selectCheckBox(e, info)}
                                    size="large"
                                    className="repair-item-checkbox"
                                  />
                                </div>
                              )}
                              <div>
                                <PPManufacturerAvatarSection>
                                  <img src={VendorNameIcon} alt="loading" />
                                  <span className="user-name">
                                    {info && info.mfg_name
                                      ? info.mfg_name
                                      : "-"}
                                  </span>
                                </PPManufacturerAvatarSection>
                              </div>
                            </div>
                            <h4 className="fs-16 semiBoldWt m-0">
                              <QuoteActivityPill
                                className={getStatusClassName(
                                  info.status_code ? info.status_code : ""
                                )}
                                style={{
                                  whiteSpace: "nowrap",
                                  maxWidth: "100%",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {info.status ? info.status : ""}
                              </QuoteActivityPill>
                            </h4>
                          </PPItemCardTopDetails>

                          <FieldDetails
                            className="field-details"
                            style={{ marginTop: "0", marginLeft: "10px" }}
                          >
                            <PartsPurchaseField className="calc-width-33">
                              <PiLabelName
                                description={
                                  info && info.vendor_part_number
                                    ? info.vendor_part_number.toUpperCase()
                                    : "-"
                                }
                                label="Vendor Part Number"
                                isCopyIcon={!!(info && info.vendor_part_number)}
                              />
                            </PartsPurchaseField>
                            <PartsPurchaseField className="calc-width-33">
                              <PiLabelName
                                description={
                                  info && info.mfg_part_number
                                    ? info.mfg_part_number.toUpperCase()
                                    : "-"
                                }
                                label="Manufacturer Part Number"
                                isCopyIcon={!!(info && info.mfg_part_number)}
                              />
                            </PartsPurchaseField>
                          </FieldDetails>
                        </CardViews>
                      </ItemCard>
                    ))}
                  {partsItemsArray &&
                    partsItemsArray &&
                    partsItemsArray.length === 0 && (
                      <RequestorInfoSection style={{ marginBottom: "10px" }}>
                        <ItemsIconHeaderContainer className="no-items-found-container">
                          <NoRepairFound
                            style={{ height: "unset", marginBottom: "8px" }}
                          >
                            Ordered Items Not Found
                          </NoRepairFound>
                        </ItemsIconHeaderContainer>
                      </RequestorInfoSection>
                    )}
                </div>
              </RepairInfoSection>
            )}
            <SideDrawerFooter>
              <PiButton
                appearance="primary"
                label="Submit"
                onClick={saveChanges}
                isDisabled={totalCheckedItems.length === 0}
              />
            </SideDrawerFooter>
          </>
        </SideDrawerContainer>
      </PiModal>
    </>
  );
}

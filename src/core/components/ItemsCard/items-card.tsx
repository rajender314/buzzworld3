/* eslint-disable no-nested-ternary */
import {
  PiCheckbox,
  PiConfirmModel,
  PiInput,
  PiTextArea,
  PiTooltip,
} from "pixel-kit";
import { useContext, useEffect, useRef, useState } from "react";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import EditQuoteItems from "@app/components/Quote-components/Quote-detail-view-content/QuoteItems/edit-quote-items";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import ThemecolorEdit from "@app/assets/images/themecolorEdit.svg";
import EyeIcon from "@app/assets/images/eyeIcon.svg";
import { AuthContext } from "@app/providers";
import { getUserLoggedPermission } from "@app/helpers/helpers";
import _ from "lodash";
import IIDMCostIcon from "@app/assets/images/IIDMCostIcon.svg";
import deleteOptionIcon from "@app/assets/images/delete-icon.svg";
import { getStatusClassName } from "@app/modules/Quotes/Repair-Quotes/helpers/quote-helpers";
import useScrollWithShadow from "../../../components/scrollbar-shadow/hook";
import {
  ActionsWrapper,
  CardBottomDetails,
  CardTopDetails,
  CardViews,
  ItemCard,
  NoRepairFound,
  RepairItemCardWrapper,
} from "./item-card.component";
import { QuoteActivityPill } from "../gridStatus/gridStatus.component";

export default function ItemsCard({ quoteDetails, cardItems, sendData }: any) {
  const [repairsList, setRepairsList]: any = useState([]);
  const [openEditItem, setOpenEditItem] = useState(false);
  const [permissionObject, setpermissionObject] = useState<any>({});
  const [quoteInfo, setQuoteInfo]: any = useState({ title: "Add" });
  const [loading, setLoading] = useState(true);
  const [openConFirm, setConFirm] = useState(false);
  const [confirmText, setConfirmText] = useState<any>();
  const userInfo = useContext(AuthContext);
  const deepCopy: any = useRef<any>("");
  const enableShadow = true;
  const { boxShadow, onScrollHandler } = useScrollWithShadow();
  const quoteDetailInfo: any = useRef<any>("");
  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("quote_for_parts");
      setpermissionObject(permission);
    })();
  }, []);
  useEffect(() => {
    quoteDetailInfo.current = quoteDetails;
  }, [quoteDetails]);
  useEffect(() => {
    setLoading(false);
    if (cardItems) {
      let { list } = cardItems;
      list = list.map((obj: any) => {
        obj.isChecked = false;
        if (getUserLoggedPermission() === false) {
          obj.isIndividualEdit = false;
          obj.isItemNotesEdit = false;
        }
        obj.isIndividualEdit = false;

        return obj;
      });
      setRepairsList([...list]);
      deepCopy.current = _.cloneDeep(cardItems.list);
      // setdeepCopy(deepCopy)
    }
  }, [cardItems, userInfo]);

  function selectCheckBox(e: any, item: any) {
    e.stopPropagation();
    const list = repairsList.map((obj: any) => {
      if (obj.id === item.id) {
        if (e.target.checked) {
          obj.isChecked = true;
        } else {
          obj.isChecked = false;
        }
      }
      return obj;
    });
    setRepairsList(list);
    const items = list.filter((ev: any) => ev.isChecked);
    sendData({
      totalCheckedItems: items,
    });
  }
  function editPartRepair(e: any, id: string) {
    e.stopPropagation();
    setQuoteInfo({ title: "Edit", repairItemId: id });
    setOpenEditItem(true);
    sendData({
      flag: "edit_clicked",
      totalCheckedItems: [],
    });
  }

  const updateIIDMCost = (e: any, id: string) => {
    e.stopPropagation();
    setQuoteInfo({ title: "Edit", repairItemId: id });
    setConfirmText("Are you sure you want to update IIDM cost for this item ?");
    setConFirm(true);
  };
  function triggerEditItemEvent(e: any) {
    if (e.close) {
      setOpenEditItem(false);
    }
    if (e.success) {
      sendData({
        success: true,
      });
    }
  }
  const [selectedIdForDelete, setSelectedIdForDelete] = useState("");
  function deleteItem(e: any) {
    setSelectedIdForDelete(e.id);
    setConfirmText("Are you sure you want to delete this item ?");
    setConFirm(true);
  }
  async function getConfirmModelEvent(e: string) {
    if (e === "accept") {
      if (confirmText === "Are you sure you want to delete this item ?") {
        const apiObject = {
          payload: {},
          method: "DELETE",
          apiUrl: `${EndpointUrl.QuoteItems}/${selectedIdForDelete}`,
          headers: {},
        };
        triggerApi(apiObject)
          .then((response: ApiResponse) => {
            if (response.result.success) {
              // let data = response.result.data
              sendData({
                success: true,
                isDeleted: true,
              });
            }
          })
          .catch((err: string) => {
            console.log(err);
          });
      } else if (
        confirmText ===
        "Are you sure you want to update IIDM cost for this item ?"
      ) {
        const apiObject = {
          payload: {},
          method: "PUt",
          apiUrl: `${EndpointUrl.UpdateIIDMCost}/${quoteInfo.repairItemId}`,
          headers: {},
        };
        triggerApi(apiObject)
          .then((response: ApiResponse) => {
            if (response.result.success) {
              sendData({
                success: true,
              });
            }
          })
          .catch((err: string) => {
            console.log(err);
          });
      }
    }
    setConFirm(false);
  }
  const onQuantityChange = (e: any, indx: number) => {
    repairsList[indx].quantity = e.target.value;
    setRepairsList([...repairsList]);
  };
  const updateQuoteItem = (indx: number) => {
    const params = {
      ...repairsList[indx],
    };
    const apiObject = {
      payload: params,
      method: "PUT",
      apiUrl: `${EndpointUrl.QuoteItemQty}/${repairsList[indx].id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          repairsList[indx].isIndividualEdit = false;
          setRepairsList([...repairsList]);
          sendData({
            success: true,
          });
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const emitSaveValues = (indx: number) => {
    updateQuoteItem(indx);
  };

  const undoItemChanges = (indx: number) => {
    if (cardItems) {
      const { list } = cardItems;
      list[indx].isIndividualEdit = false;
      list[indx].isItemNotesEdit = false;
      list[indx].quantity = deepCopy.current[indx].quantity;
      list[indx].notes = deepCopy.current[indx].notes;
      // list = list.map((obj: any, index: number) => {
      //  obj.isChecked = false
      //  if (getUserLoggedPermission() === false) {
      //    obj.isIndividualEdit = false
      //  }
      //  obj.isIndividualEdit = false

      //  return obj
      // })
      setRepairsList([...list]);
    }
  };
  const onItemNotesChange = (e: any, indx: number) => {
    repairsList[indx].notes = e.target.value;
    setRepairsList([...repairsList]);
  };

  return (
    <div>
      {repairsList.length > 0 && (
        <RepairItemCardWrapper
          onScroll={onScrollHandler}
          className="scrollArea"
          style={enableShadow ? { boxShadow } : {}}
        >
          {repairsList.map((obj: any, index: number) => (
            <ItemCard>
              {/* {obj.is_edit && !quoteDetails.is_revised && (
                  <CardView>
                    <div
                      className={
                        obj.gp < 23
                          ? "add-highlight check_box"
                          : "remove-highlight check_box"
                      }
                      style={{ padding: "8px 8px 6px 8px" }}
                    >
                      <PiCheckbox
                        isChecked={obj.isChecked}
                        helpText=""
                        libraryType="atalskit"
                        name={`checkbox${index}`}
                        onChange={(e) => selectCheckBox(e, obj)}
                        size="large"
                        className="repair-item-checkbox"
                      />
                    </div>
                  </CardView>
                )} */}
              <CardViews
                className={
                  obj.is_edit && !quoteDetails.is_revised ? "" : "border-radius"
                }
              >
                <CardTopDetails
                  className={
                    // eslint-disable-next-line radix
                    parseInt(obj.gp) < 23
                      ? "add-highlight check_box"
                      : "remove-highlight check_box"
                  }
                  style={{ gap: "18px" }}
                >
                  {obj.is_edit && !quoteDetails.is_revised ? (
                    <div>
                      <PiCheckbox
                        isChecked={obj.isChecked}
                        helpText=""
                        libraryType="atalskit"
                        name={`checkbox${index}`}
                        onChange={(e) => selectCheckBox(e, obj)}
                        size="large"
                        className="repair-item-checkbox"
                      />
                    </div>
                  ) : (
                    <div className="pl-46" />
                  )}

                  <div
                    className="width-25"
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <h4
                      className="semiBoldWt color-dark m-0 manufacter"
                      title={obj.manufacturer}
                    >
                      {obj.manufacturer}
                    </h4>
                    {obj.expedite && (
                      <div
                        className=" semiBoldWt color-dark m-0"
                        style={{
                          background: "#E3F2FD",
                          padding: "4px",
                          color: "#1976D2",
                          borderRadius: "4px",
                          textTransform: "capitalize",
                        }}
                      >
                        {obj.expedite}
                      </div>
                    )}
                  </div>
                  {/* <div className="align-right semiBoldWt color-dark m-0 mb-8 ">
                      {obj.priority}
                    </div> */}

                  {getUserLoggedPermission() && (
                    <>
                      <div className="d-flex align-center g-8  w-32">
                        <span>GP</span>
                        <h4
                          className={`fs-16 semiBoldWt color-dark m-0 item-value-ellipsis ${obj.gp !== "" && obj.is_gp_negative ? "" : obj.gp !== "" && !obj.is_gp_negative ? "" : ""}`}
                          title={obj.gp !== "" ? `${obj.gp} %` : "-"}
                        >
                          {obj.gp !== "" ? `${obj.gp} %` : "-"}
                        </h4>
                      </div>
                      <div className="d-flex align-center g-8  width-23">
                        <span>Discount</span>
                        <h4
                          className={`fs-16 semiBoldWt color-dark m-0  item-value-ellipsis ${obj.discount !== "" && obj.is_discount_negative ? "" : obj.discount !== "" && !obj.is_discount_negative ? "" : ""}`}
                          title={
                            obj.discount !== "" ? `${obj.discount} %` : "-"
                          }
                        >
                          {obj.discount !== "" ? `${obj.discount} %` : "-"}
                        </h4>
                      </div>
                    </>
                  )}

                  <div className="align-right" style={{ flex: "1" }}>
                    {/* {obj.is_edit && !quoteDetails.is_revised && ( */}
                    <ActionsWrapper
                      className={
                        permissionObject.Edit === true
                          ? "edit-item icon-bg-hover"
                          : "no-edit-permission"
                      }
                    >
                      {/* {quoteDetails.is_repair && (
                          <PiTooltip
                            content="Past Repair Prices"
                            libraryType="atalskit"
                          >
                            <div className="Button-Icon-Display">
                              <div
                                className={
                                  permissionObject['View'] === true
                                    ? ' edit-item icon-bg-hover'
                                    : 'no-edit-permission'
                                }
                                onClick={(e) => displayPastInvoice(e, obj.id)}
                              >
                                <img
                                  src={PastInvoices}
                                  alt="chevron-right"
                                  style={{ width: '20px', height: '20px' }}
                                />
                              </div>
                            </div>
                          </PiTooltip>
                        )} */}

                      {obj.is_edit && !quoteDetails.is_revised && (
                        <>
                          {quoteDetails.is_repair && false && (
                            <PiTooltip
                              content="Update IIDM Cost"
                              libraryType="atalskit"
                            >
                              <div
                                className={
                                  permissionObject.Edit === true
                                    ? " edit-item icon-bg-hover"
                                    : "no-edit-permission"
                                }
                                onClick={(e) => updateIIDMCost(e, obj.id)}
                                onKeyDown={(event) => {
                                  if (
                                    event.key === "Enter" ||
                                    event.key === " "
                                  ) {
                                    updateIIDMCost(event, obj.id);
                                  }
                                }}
                                role="button"
                                tabIndex={0}
                              >
                                <img src={IIDMCostIcon} alt="chevron-right" />
                              </div>
                            </PiTooltip>
                          )}

                          {getUserLoggedPermission() && (
                            <PiTooltip
                              content="Edit Item"
                              libraryType="atalskit"
                            >
                              <div
                                className={
                                  permissionObject.Edit === true
                                    ? " edit-item icon-bg-hover"
                                    : "no-edit-permission"
                                }
                                onClick={(e) => editPartRepair(e, obj.id)}
                                onKeyDown={(event) => {
                                  if (
                                    event.key === "Enter" ||
                                    event.key === " "
                                  ) {
                                    editPartRepair(event, obj.id);
                                  }
                                }}
                                role="button"
                                tabIndex={0}
                              >
                                <img src={ThemecolorEdit} alt="chevron-right" />
                              </div>
                            </PiTooltip>
                          )}
                          <PiTooltip
                            content="Delete Item"
                            libraryType="atalskit"
                          >
                            <div
                              className="quote-item-del-icon icon-bg-hover"
                              onClick={() => deleteItem(obj)}
                              onKeyDown={(event) => {
                                if (
                                  event.key === "Enter" ||
                                  event.key === " "
                                ) {
                                  deleteItem(obj);
                                }
                              }}
                              role="button"
                              tabIndex={0}
                            >
                              <img src={deleteOptionIcon} alt="delet-icon" />
                            </div>
                          </PiTooltip>
                        </>
                      )}
                    </ActionsWrapper>
                    {/* )} */}
                  </div>
                </CardTopDetails>
                <CardBottomDetails
                  className="align-center with-border-bottom"
                  // style={{ paddingLeft: '56px' }}
                >
                  <PiTooltip content="Line Number" libraryType="atalskit">
                    <div className="line-number" style={{ marginLeft: "10px" }}>
                      {obj.line_number ? obj.line_number : ""}
                    </div>
                  </PiTooltip>
                  <div className=" width-25 flexed">
                    <h4
                      className="fs-16 semiBoldWt color-dark m-0 item-value-ellipsis"
                      title={obj.part_number}
                    >
                      {obj.part_number}
                    </h4>
                    <p
                      className="m-0 line-clamp two-lines"
                      title={obj.description ? obj.description : "-"}
                    >
                      {obj.description}
                    </p>
                    {/* <div className="d-flex align-center g-16 ">
                        <span className="w-25">Line Number:</span>
                        <h4
                          className="fs-16 semiBoldWt color-dark m-0  item-value-ellipsis"
                          title={obj.line_number ? obj.line_number : "-"}
                        >
                          {" "}
                          {obj.line_number ? obj.line_number : "-"}
                        </h4>
                      </div> */}
                  </div>
                  <div className="align-right w-32 flexed">
                    {(getUserLoggedPermission() === true ||
                      (getUserLoggedPermission() === false &&
                        obj.is_price_display)) && (
                      <div className="d-flex align-center g-16  ">
                        <span className="eye-icon-span w-25">
                          {obj.indication_msg && (
                            <PiTooltip
                              content={obj.indication_msg}
                              libraryType="atalskit"
                            >
                              <img src={EyeIcon} alt="loading" />
                            </PiTooltip>
                          )}
                          {getUserLoggedPermission() ? "Quote:" : "Unit Price"}
                        </span>

                        <h4
                          className="color-dark m-0  item-value-ellipsis"
                          title={obj.quote_price ? obj.quote_price : "-"}
                        >
                          {obj.quote_price ? obj.quote_price : "-"}
                        </h4>
                      </div>
                    )}
                    {getUserLoggedPermission() && (
                      <>
                        <div className="d-flex align-center g-16 ">
                          <span className="w-25">Suggested:</span>
                          <h4
                            className="fs-16 semiBoldWt color-dark m-0  item-value-ellipsis"
                            title={
                              obj.suggested_price ? obj.suggested_price : "-"
                            }
                          >
                            {" "}
                            {obj.suggested_price ? obj.suggested_price : "-"}
                          </h4>
                        </div>
                        <div className="d-flex align-center g-16  ">
                          <span className="w-25">IIDM Cost:</span>
                          <h4
                            className="fs-16 semiBoldWt color-dark m-0  item-value-ellipsis"
                            title={obj.iidm_cost ? obj.iidm_cost : "-"}
                          >
                            {" "}
                            {obj.iidm_cost ? obj.iidm_cost : "-"}
                          </h4>
                        </div>
                        {getUserLoggedPermission() &&
                          (obj.lead_time_value ||
                            obj.lead_time.label === "TBD") && (
                            <div className="d-flex align-center g-16 ">
                              <span className="w-25">Turn around time:</span>
                              <h4
                                className="fs-16 semiBoldWt color-dark m-0 item-value-ellipsis"
                                title={obj.lead_time_value}
                              >
                                {obj.lead_time_value} {obj.lead_time.label}
                              </h4>
                            </div>
                          )}
                      </>
                    )}
                  </div>
                  <div className="align-right width-23 flexed">
                    {!obj.isIndividualEdit && (
                      <div className="d-flex align-center g-16  ">
                        <span className="w-25">Quantity:</span>
                        <h4
                          className="fs-16 semiBoldWt color-dark m-0 item-value-ellipsis"
                          title={obj.quantity ? obj.quantity : "-"}
                        >
                          {" "}
                          {obj.quantity ? obj.quantity : "-"}
                        </h4>
                        {getUserLoggedPermission() === false && obj.is_edit && (
                          <div
                            className="action-item"
                            onClick={() => {
                              obj.isIndividualEdit = true;
                              setRepairsList([...repairsList]);
                            }}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                obj.isIndividualEdit = true;
                                setRepairsList([...repairsList]);
                              }
                            }}
                            role="button"
                            tabIndex={0}
                          >
                            <img
                              src={ThemecolorEdit}
                              className="edit-icon"
                              alt="loading"
                            />
                          </div>
                        )}
                      </div>
                    )}
                    {obj.isIndividualEdit && (
                      <PiInput
                        name="quantity"
                        label="Quantity"
                        placeholder="Enter"
                        onChange={(e: any) => onQuantityChange(e, index)}
                        value={obj.quantity ? obj.quantity : ""}
                        isIcons
                        emitSave={() => emitSaveValues(index)}
                        emitUndo={() => undoItemChanges(index)}
                      />
                    )}
                    {getUserLoggedPermission() && !quoteDetails.is_repair && (
                      <div className="d-flex align-center g-16 ">
                        <span className="w-25">List:</span>
                        <h4
                          className="fs-16 semiBoldWt color-dark m-0 item-value-ellipsis"
                          title={obj.list_price ? obj.list_price : "-"}
                        >
                          {obj.list_price ? obj.list_price : "-"}
                        </h4>
                      </div>
                    )}

                    <div />
                  </div>
                  <div
                    className="align-right width-20  flexed flex-end"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div className="d-flex  g-8  item-value-ellipsis">
                      {obj.item_status && (
                        <h4 className="fs-16 semiBoldWt m-0">
                          <QuoteActivityPill
                            className={getStatusClassName(
                              obj.item_status ? obj.item_status : ""
                            )}
                            style={{
                              whiteSpace: "nowrap",
                              maxWidth: "100%",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {obj.item_status ? obj.item_status : ""}
                          </QuoteActivityPill>
                        </h4>
                      )}
                    </div>

                    <div className="d-flex  g-8  item-value-ellipsis">
                      {/* <span>Quantity</span> */}
                      <h4
                        className="fs-16 semiBoldWt color-dark m-0 "
                        title={obj.ext_price ? obj.ext_price : "-"}
                        style={{ color: "#6D7992" }}
                      >
                        {obj.ext_price ? obj.ext_price : "-"}
                      </h4>
                    </div>
                  </div>
                </CardBottomDetails>
                <CardBottomDetails className="align-center pl-8">
                  <div>
                    {!obj.isItemNotesEdit && (
                      <div className="d-flex align-center  g-8 mb-16">
                        <div
                          style={{
                            display: "flex",
                            whiteSpace: "nowrap",
                            alignSelf: "flex-start",
                          }}
                        >
                          Item Notes:
                        </div>
                        <h4
                          className="fs-16 semiBoldWt color-dark m-0 line-clamp two-lines "
                          style={{}}
                          title={
                            obj.notes
                              ? obj.notes.replace(/<\/?[^>]+>/gi, "")
                              : "-"
                          }
                          // dangerouslySetInnerHTML={{ __html: obj.notes }}
                        >
                          {obj.notes
                            ? obj.notes.replace(/<\/?[^>]+>/gi, "")
                            : "-"}
                        </h4>
                        {getUserLoggedPermission() === false && obj.is_edit && (
                          <div
                            className="action-item"
                            onClick={() => {
                              obj.isItemNotesEdit = true;
                              setRepairsList([...repairsList]);
                            }}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                obj.isItemNotesEdit = true;
                                setRepairsList([...repairsList]);
                              }
                            }}
                            role="button"
                            tabIndex={0}
                          >
                            <img
                              src={ThemecolorEdit}
                              className="edit-icon"
                              alt="loading"
                            />
                          </div>
                        )}
                      </div>
                    )}
                    {obj.isItemNotesEdit && (
                      <PiTextArea
                        name="notes"
                        label="Item Notes"
                        placeholder="Enter"
                        onChange={(e: any) => onItemNotesChange(e, index)}
                        value={obj.notes ? obj.notes : ""}
                        isIcons
                        emitSave={() => emitSaveValues(index)}
                        emitUndo={() => undoItemChanges(index)}
                      />
                    )}
                  </div>
                </CardBottomDetails>
              </CardViews>
            </ItemCard>
          ))}
        </RepairItemCardWrapper>
      )}
      {!loading && repairsList.length === 0 && (
        <NoRepairFound> Quote item(s) Not found</NoRepairFound>
      )}
      {/* {loading && (
        <SpinnerDiv>
          <PiSpinner color="primary" size={50} libraryType="atalskit" />
        </SpinnerDiv>
      )} */}
      {openEditItem && (
        <EditQuoteItems
          quoteDetails={quoteDetails}
          quoteInfo={quoteInfo}
          sendModelData={(e: any) => triggerEditItemEvent(e)}
        />
      )}

      {/* {openConFirm && (
        <ConfirmPopup
          confirmText={confirmText}
          sendModelData={getConfirmModelEvent}
        ></ConfirmPopup>
      )} */}
      <PiConfirmModel
        className={openConFirm ? "show" : ""}
        headerLabel="Confirmation"
        message={confirmText}
        primaryBtnLabel="Yes"
        secondaryBtnLabel="No"
        onClose={() => {
          setConFirm(false);
        }}
        onAccept={(e: any) => getConfirmModelEvent(e)}
        onDecline={() => {
          setConFirm(false);
        }}
      />
    </div>
  );
}

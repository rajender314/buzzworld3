import {
  PiTypography,
  PiTabGroup,
  PiTabHeader,
  PiTabHeaderPanel,
  PiTabPanel,
  PiSpinner,
  PiToast,
  PiConfirmModel,
  PiTooltip,
} from "pixel-kit";
import { useContext, useEffect, useState } from "react";
import { RepairInfoSection } from "@app/components/detail-view-content/detail-view-content.component";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import {
  ItemCard,
  NoRepairFound,
  RepairCardsHeader,
} from "@app/components/RepairItems/repair-items.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import ItemsCard from "@app/core/components/ItemsCard/items-card";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import { triggerApi } from "@app/services";
import { ApiResponse, FilterColumnProps } from "@app/services/schema/schema";
import { AuthContext } from "@app/providers";
import AddLogo from "@app/assets/images/Plus.svg";
import AddSecondary from "@app/assets/images/Plus_secondary.svg";
import { getUserLoggedPermission } from "@app/helpers/helpers";
import { CardBottomDetail } from "@app/core/components/ItemsCard/item-card.component";
import _ from "lodash";
import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";
import { useParams } from "react-router-dom";
import ThemecolorEdit from "@app/assets/images/themecolorEdit.svg";
import SwapIcon from "@app/assets/images/repeat.svg";
import {
  ImgTag,
  LinkWithIcon,
} from "@app/components/secondaryheader/secondaryheader.component";
import deleteOptionIcon from "@app/assets/images/delete-icon.svg";
import deleteItemIcon from "@app/assets/images/delete.svg";
import ChangeItemsOrder from "./change-items-order";
import BulkEdit from "../../Forms/bulk-edit";
import { TabsListBeforeIcon } from "../QuoteInformation/quote-info.component";
import QuoteSelectItems from "./select-quote-items";
import AddOptions from "../AddOptions/add-options";

export default function QuoteItems({ quoteDetails, sendEventData }: any) {
  const { id }: RouteParams = useParams();
  const [permissionObject, setpermissionObject] = useState<any>({});
  const [openSelectItems, setOpenSelectItems] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [cardItems, setCardItems]: any = useState();
  const [openSnackbar, setSnackbar] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [openAddOptions, setOpenAddOptions] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openConFirm, setConFirm] = useState(false);
  const [confirmText, setConfirmText] = useState<any>();
  const [selectedOption, setselectedOption] = useState("");
  const [optionsList, setOptionsList]: any = useState([]);
  const userInfo = useContext(AuthContext);
  const [openBulkEdit, setOpenBulkEdit] = useState(false);
  const [totalCheckedList, setTotalCheckedList] = useState([]);

  useEffect(() => {
    (async () => {
      setselectedOption("");
      setTabIndex(0);
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("quote_for_parts");
      setpermissionObject(permission);
    })();
  }, [userInfo]);

  const repairItemsList = (optionId: string) => {

    setselectedOption(optionId);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteItems}?quote_id=${quoteDetails.id}&options_id=${optionId}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setLoading(false);
          const { data } = response.result;
          setCardItems({ ...data });
          setTotalItems(data.total_count);
          setTotalCheckedList([]);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
    return true;
  };
  const getOptions = async () => {
    setLoading(true)
    let arr: any = [];
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteOptions}?quote_id=${quoteDetails.id}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then(async (response: any) => {
        if (response.result.success) {
          const { data } = response.result;

          arr = await data.map((item: FilterColumnProps) => ({
            value: item.id,
            label: item.name,
            ...item,
          }));
          setOptionsList(arr);
          if (!selectedOption) {
            setselectedOption(arr[0].id);
          }
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
    return arr;
  };

  const getOptionAndItems = async (selectedOptionID?: any) => {
    const data: any = await getOptions();
    // repairItemsList(selectedOptionID ? selectedOptionID : data[0].id)
    let OptionID = "";
    if (selectedOptionID) {
      OptionID = selectedOptionID;
    } else if (data && data.length && data[0].id) {
      OptionID = data[0].id;
    }
    const indx = _.findIndex(data, { id: OptionID });
    // repairItemsList(
    //   indx > -1 ? OptionID : data && data[tabIndex] ? data[tabIndex].id : ""
    // );

    let result;

    if (indx > -1) {
      result = OptionID;
    } else if (data && data[tabIndex]) {
      result = data[tabIndex].id;
    } else {
      result = "";
    }

    repairItemsList(result);

    // if (selectedOption) {
    //  repairItemsList(selectedOption)
    // } else {
    //  const option = data && data.length > 0 ? data[0].id : ''
    //  setselectedOption(option)
    //  setTabIndex(tabIndex)
    //  //repairItemsList(option)
    // }
  };

  useEffect(() => {
    (async () => {
      if (!quoteDetails.from) {
        await getOptionAndItems(selectedOption);
      }
    })();
  }, [quoteDetails]);

  function selectItems() {
    setOpenSelectItems(true);
    repairItemsList(selectedOption);
  }

  function triggerItemsEvent(e: any) {
    console.log(e);
    if (e.close) {
      setOpenSelectItems(false);
    }
    if (e.success) {
      if (e.isDeleted) {
        setToastMsg("Deleted Successfully");
        const obj = {
          from: "item_added",
        };
        sendEventData(obj);
      } else if (e.success && e.isNewItemAdded) {
        setToastMsg("Added Successfully");
        const obj = {
          from: "item_added",
        };
        sendEventData(obj);
      } else {
        setToastMsg("Updated Successfully");
        const obj = {
          from: "item_added",
        };
        sendEventData(obj);
      }
      setOpenSelectItems(false);
      setSnackbar(true);
      getOptionAndItems(selectedOption);
    }
    if (e.totalCheckedItems) {
      console.log(e);
      setTotalCheckedList(e.totalCheckedItems);
    }
    if (e.flag === "edit_clicked") {
      repairItemsList(selectedOption);
    }
  }
  function ontabChanged(e: number) {
    setTabIndex(e);
    setLoading(true);
    setselectedOption(optionsList[e].id);
    repairItemsList(optionsList[e].id);
    setTotalCheckedList([]);
  }
  function triggerAddOptionEvent(e: any) {
    if (e.close) {
      setOpenAddOptions(false);
    }
    if (e.success) {
      setToastMsg("Updated Successfully");
      setOpenAddOptions(false);
      setSnackbar(true);
      if (e.data) {
        setTabIndex(optionsList.length);
        // const id = e.data.apiResponsedata.data
        setselectedOption(e.data.apiResponsedata.data);
        getOptionAndItems(e.data.apiResponsedata.data);
      }
      const obj = {
        success: true,
        from: "option_added",
      };
      sendEventData(obj);
    }
  }

  function deleteItem() {
    setConfirmText(
      `Are you sure you want to delete these ${totalCheckedList.length} item(s) ?`
    );
    setConFirm(true);
  }
  async function getConfirmModelEvent(e: string) {
    if (confirmText === "Are you sure you want to delete this option ?") {
      if (e === "accept") {
        const apiObject = {
          payload: {},
          method: "DELETE",
          apiUrl: `${EndpointUrl.QuoteOptions}/${selectedOption}`,
          headers: {},
        };
        triggerApi(apiObject)
          .then(async (response: any) => {
            if (response.result.success) {
              // repairItemsList(optionsList[0].id)
              ontabChanged(0);
              setToastMsg("Option deleted Successfully");
              setSnackbar(true);
              getOptionAndItems();
              const obj = {
                from: "option_deleted",
              };
              sendEventData(obj);
            }
          })
          .catch((err: string) => {
            console.log(err);
          });
      }
    } else if (
      confirmText ===
      `Are you sure you want to delete these ${totalCheckedList.length} item(s) ?`
    ) {
      const iDList: any = [];
      totalCheckedList.map((obj: any) => {
        iDList.push(obj.id);
        return iDList;
      });
      if (e === "accept") {
        const apiObject = {
          payload: { ids: iDList },
          method: "POST",
          apiUrl: `${EndpointUrl.QuoteItemsMultipleDelete}`,
          headers: {},
        };
        triggerApi(apiObject)
          .then(async (response: any) => {
            if (response.result.success) {
              repairItemsList(selectedOption);
              setToastMsg("Deleted Successfully");
              setSnackbar(true);
              const obj = {
                from: "item_added",
              };
              sendEventData(obj);
            }
          })
          .catch((err: string) => {
            console.log(err);
          });
      } else {
        repairItemsList(selectedOption);
      }
    }

    setConFirm(false);
  }
  const bulkEdittem = () => {
    setOpenBulkEdit(true);
  };
  const triggerBulkEditEvent = (e: any) => {
    if (e.success) {
      setOpenBulkEdit(false);
      repairItemsList(selectedOption);
      setToastMsg("Updated Successfully");
      setSnackbar(true);
      // const obj = {
      //   from: "item_added",
      // };
      // sendEventData(obj);
    }
    if (e.close) {
      setOpenBulkEdit(false);
    }
  };
  const [openChangeOrder, setChangeOrder] = useState(false);
  const changeItemsOrder = () => {
    setChangeOrder(true);
  };
  const triggerOrderEvent = (e: any) => {
    if (e.close) {
      setChangeOrder(false);
    }
    if (e.success) {
      setToastMsg("Updated Successfully");
      setSnackbar(true);
      setChangeOrder(false);
      repairItemsList(selectedOption);
    }
  };
  const deleteOption = () => {
    setConfirmText("Are you sure you want to delete this option ?");
    setConFirm(true);
  };
  return (
    <>
      <RepairInfoSection id="repair-items">
        <RepairCardsHeader style={{ position: "relative" }}>
          <PiTypography component="h4">{`Quote Items (${totalItems || "0"})`}</PiTypography>
          {quoteDetails.status_code === "open" && !quoteDetails.is_revised && (
            <div
              className={
                permissionObject.Edit === true
                  ? "cards-btns-group"
                  : "no-edit-permission"
              }
            >
              {cardItems &&
                cardItems.list &&
                cardItems.list.length > 0 &&
                optionsList.length < 5 &&
                getUserLoggedPermission() === true && (
                  // <PiButton
                  //   appearance="secondary"
                  //   label="Add Options"
                  //   libraryType="atalskit"
                  //   className="secondary-button"
                  //   onClick={() => {
                  //     setOpenAddOptions(true);
                  //     repairItemsList(selectedOption);
                  //   }}
                  // />
                  <div className="Button-Icon-Display">
                    <LinkWithIcon
                      className="Icon-space secondary-button "
                      style={{ height: "40px" }}
                      onClick={() => {
                        setOpenAddOptions(true);
                        repairItemsList(selectedOption);
                      }}
                    >
                      <ImgTag src={AddSecondary} alt="loading" />
                      <span className="button-icon-text ">Add Options</span>
                    </LinkWithIcon>
                  </div>
                )}
              {/* {!quoteDetails.is_repair && ( */}

              <div className="Button-Icon-Display">
                <LinkWithIcon
                  className="Icon-space primary-button "
                  onClick={() => selectItems()}
                >
                  <ImgTag src={AddLogo} alt="loading" />
                  <span className="button-icon-text ">Add Items</span>
                </LinkWithIcon>
              </div>
              {/* )} */}
              {cardItems && cardItems.list && cardItems.list.length > 1 && (
                <PiTooltip content="Change Items Order" libraryType="atalskit">
                  <div
                    className="quote-option-del-icon edit-icon"
                    onClick={() => changeItemsOrder()}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        changeItemsOrder();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <img src={SwapIcon} alt="Edit-icon" />
                  </div>
                </PiTooltip>
              )}

              {totalCheckedList.length > 0 && (
                <PiTooltip
                  content="Edit Selected Item(s)"
                  libraryType="atalskit"
                >
                  <div
                    className="quote-option-del-icon edit-icon"
                    onClick={() => bulkEdittem()}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        bulkEdittem();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <img src={ThemecolorEdit} alt="Edit-icon" />
                  </div>
                </PiTooltip>
              )}
              {totalCheckedList.length > 0 && (
                <PiTooltip
                  content="Delete Selected Item(s)"
                  libraryType="atalskit"
                >
                  <div
                    className="quote-option-del-icon"
                    onClick={() => deleteItem()}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        deleteItem();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <img src={deleteItemIcon} alt="delet-icon" />
                  </div>
                </PiTooltip>
              )}
              {optionsList.length >= 1 && (
                <PiTooltip
                  content={`Delete ${optionsList && optionsList.length > 1 && optionsList[tabIndex] ? optionsList[tabIndex].name : "Option"}`}
                  libraryType="atalskit"
                >
                  <div
                    className={`${optionsList.length === 1 ? "quote-option-del-icon" : "quote-option-del-icon option-delete-position"}`}
                    onClick={() => deleteOption()}
                    style={{ border: "2px solid var(--themeBlue900)" }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        deleteOption();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <img src={deleteOptionIcon} alt="delet-icon" />
                  </div>
                </PiTooltip>
              )}
            </div>
          )}
        </RepairCardsHeader>
        {optionsList.length > 1 && (
          <PiTabGroup
            id="tab"
            onChange={(e: any) => ontabChanged(e)}
            selected={tabIndex}
          >
            <PiTabHeaderPanel>
              {optionsList &&
                optionsList.map((obj: any) => (
                  <PiTabHeader>
                    <TabsListBeforeIcon className={obj.is_won ? "open" : ""}>
                      {obj.name}
                    </TabsListBeforeIcon>
                  </PiTabHeader>
                ))}
            </PiTabHeaderPanel>
            {optionsList &&
              optionsList.map(() => (
                <PiTabPanel>
                  {!loading && cardItems && (
                    <>
                      {/* <div
                          className={
                            permissionObject['Edit'] === true
                              ? 'option-items'
                              : 'no-edit-permission'
                          }
                        >
                          <PiButton
                            appearance="secondary"
                            label="Select Items"
                            libraryType="atalskit"
                            onClick={selectItems}
                            //className="quote-select-item-btn"
                          />
                          {totalCheckedList.length > 0 && (
                            <div
                              className="quote-option-del-icon"
                              onClick={deleteItem}
                              title="Delete Item"
                            >
                              <img src={deleteIcon} alt="delet-icon" />
                            </div>
                          )}
                        </div> */}
                      <ItemsCard
                        quoteDetails={quoteDetails}
                        cardItems={cardItems}
                        sendData={(e: any) => triggerItemsEvent(e)}
                      />
                    </>
                  )}
                  {/* {loading && (
                      <SpinnerDiv style={{ minHeight: "500px" }}>
                        <PiSpinner
                          color="primary"
                          size={50}
                          libraryType="atalskit"
                        />
                      </SpinnerDiv>
                    )} */}
                </PiTabPanel>
              ))}
          </PiTabGroup>
        )}
        {!loading && quoteDetails && optionsList.length === 1 && (
          <ItemsCard
            quoteDetails={quoteDetails}
            cardItems={cardItems}
            sendData={(e: any) => triggerItemsEvent(e)}
          />
        )}
        {loading && (
          <SpinnerDiv style={{ minHeight: "250px" }}>
            <PiSpinner color="primary" size={50} libraryType="atalskit" />
          </SpinnerDiv>
        )}
        {!loading && cardItems && cardItems.list.length > 0 && (
          <ItemCard className="total-sum-details">
            <CardBottomDetail>
              <div className="align-right width-auto">
                <div className="d-flex align-center g-8 mb-8">
                  <span>Total Items:</span>
                  <h4
                    className="fs-16 semiBoldWt color-dark m-0 total-price-ellipsis"
                    title={cardItems ? cardItems.total_count : "-"}
                  >
                    {cardItems ? cardItems.total_count : "-"}
                  </h4>
                </div>
              </div>
              <div className="align-right width-auto">
                <div className="d-flex align-center g-8 mb-8">
                  <span>Total Quantity:</span>
                  <h4
                    className="fs-16 semiBoldWt color-dark m-0 total-price-ellipsis"
                    title={cardItems ? cardItems.total_quantity : "-"}
                  >
                    {cardItems ? cardItems.total_quantity : "-"}
                  </h4>
                </div>
              </div>
              {(getUserLoggedPermission() ||
                (getUserLoggedPermission() === false &&
                  cardItems.is_total_price_dispay)) && (
                <div className="align-right width-auto">
                  <div className="d-flex align-center g-8 mb-8">
                    <span>Total Price:</span>
                    <h4
                      className="fs-16 semiBoldWt color-dark m-0 total-price-ellipsis"
                      title={cardItems ? cardItems.total_price : "-"}
                    >
                      {cardItems ? cardItems.total_price : "-"}
                    </h4>
                  </div>
                </div>
              )}
            </CardBottomDetail>
          </ItemCard>
        )}

        {!loading && optionsList.length === 0 && (
          <NoRepairFound>Quote item(s) Not Available</NoRepairFound>
        )}
        {/* {loading && (
          <SpinnerDiv>
            <PiSpinner color="primary" size={50} libraryType="atalskit" />
          </SpinnerDiv>
        )} */}
      </RepairInfoSection>
      {openSelectItems && (
        <QuoteSelectItems
          selectedOption={selectedOption}
          quoteDetails={quoteDetails}
          sendEventData={(e: any) => triggerItemsEvent(e)}
        />
      )}
      {/* {openSnackbar && (
        <Snackbar
          message={toastMsg}
          triggerEvent={async () => setSnackbar(false)}
        />
      )} */}
      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel={toastMsg}
        message=""
        onClose={async () => setSnackbar(false)}
      />
      {openAddOptions && (
        <AddOptions
          optionsList={optionsList}
          quoteDetails={quoteDetails}
          sendEventData={(e: any) => triggerAddOptionEvent(e)}
        />
      )}
      {openBulkEdit && (
        <BulkEdit
          quoteDetails={quoteDetails}
          totalCheckedList={totalCheckedList}
          sendEventData={(e: any) => triggerBulkEditEvent(e)}
        />
      )}

      {openChangeOrder && (
        <ChangeItemsOrder
          quoteDetails={quoteDetails}
          cardItems={cardItems}
          sendModelData={(e: any) => triggerOrderEvent(e)}
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
    </>
  );
}

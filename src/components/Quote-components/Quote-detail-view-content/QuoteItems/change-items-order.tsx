/* eslint-disable react/jsx-props-no-spreading */
import { PiTypography, PiSpinner, PiButton, PiModal } from "pixel-kit";
import { Fragment, useEffect, useState } from "react";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import { SideDrawerFooter } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import CrossLogo from "@app/assets/images/cross.svg";
import QuotesImg from "@app/assets/images/quotes.svg";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getUserLoggedPermission } from "@app/helpers/helpers";

import {
  CardTopDetails,
  CardViews,
  ItemCard,
  NoRepairFound,
  RepairItemCardWrapper,
} from "@app/core/components/ItemsCard/item-card.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import { QuotePopupHeaderContainer } from "../../Forms/PartQuote/part-quote.component";

export default function ChangeItemsOrder({
  quoteDetails,
  cardItems,
  sendModelData,
}: any) {
  const [openModel, setOpenModel] = useState(false);
  const [serverMsg, setServerMsg]: any = useState(null);
  const [loading, setLoading] = useState(true);
  const [repairsList, setRepairsList]: any = useState([]);
  const [enableSave, setEnableSave] = useState(false);
  const [dragList, setDragList]: any = useState([]);
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    setEnableSave(true);
    const updatedCards = Array.from(repairsList);
    const [removedCard] = updatedCards.splice(result.source.index, 1);
    updatedCards.splice(result.destination.index, 0, removedCard);
    setRepairsList(updatedCards);

    const arr: any = [];
    updatedCards.map((ele: any, index: number) => {
      const new1 = { id: ele.id, line_number: index + 1 };
      arr.push(new1);
      setDragList(arr);
      return ele;
    });
  };
  useEffect(() => {
    setOpenModel(true);
  }, []);
  useEffect(() => {
    setLoading(false);
    if (cardItems) {
      let { list } = cardItems;
      list = list.map((obj: any) => {
        const newObj = obj;
        newObj.isChecked = false;
        if (getUserLoggedPermission() === false) {
          newObj.isIndividualEdit = false;
          newObj.isItemNotesEdit = false;
        }
        newObj.isIndividualEdit = false;

        return newObj;
      });
      setRepairsList([...list]);
      const arr: any = [];
      list.map((obj: any) => {
        const new1 = { id: obj.id, line_number: obj.line_number };
        arr.push(new1);
        setDragList(arr);
        return obj;
      });
      setLoading(false);
    }
  }, [cardItems]);
  function closeModel() {
    setOpenModel(false);
    sendModelData({ close: true });
  }
  const saveOrder = () => {
    const params = {
      order: dragList,
    };
    const apiObject = {
      payload: params,
      method: "POST",
      apiUrl: `${EndpointUrl.QuoteChangeLineOrder}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setServerMsg(null);
          sendModelData({ success: true });
        } else {
          setServerMsg(response.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  return (
    <>
      {/* <SideDrawerW60> */}
      <PiModal isOpen={openModel} width={1000}>
        <SideDrawerContainer style={{ overflow: "hidden" }}>
          <SideDrawerHeader>
            <QuotePopupHeaderContainer>
              <img src={QuotesImg} alt="loading" />
              <PiTypography component="h3">Change Items Order</PiTypography>
            </QuotePopupHeaderContainer>
            <CloseButton
              onClick={() => closeModel()}
              title="close"
              className="Hover"
            >
              <img src={CrossLogo} alt="loading" />
            </CloseButton>
          </SideDrawerHeader>
          {loading && (
            <SpinnerDiv style={{ height: "100%" }}>
              <PiSpinner color="primary" size={50} libraryType="atalskit" />
            </SpinnerDiv>
          )}
          {!loading && (
            <>
              <p
                className="confirm-popup-options-heading"
                style={{ paddingLeft: "24px", marginBottom: "0" }}
              >
                Drag and Drop the items to change order
              </p>
              {repairsList.length > 0 && (
                <RepairItemCardWrapper
                  className="scrollArea"
                  style={{ padding: "0 16px" }}
                >
                  <DragDropContext
                    onDragEnd={handleDragEnd}
                    onDragUpdate={(e) => console.log(e)}
                  >
                    <Droppable droppableId="cardList" isCombineEnabled>
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {repairsList.map((obj: any, index: number) => (
                            <Draggable
                              key={obj.id}
                              draggableId={obj.id}
                              index={index}
                            >
                              {(provided2) => (
                                <div className="drop-item">
                                  <div
                                    {...provided2.draggableProps}
                                    {...provided2.dragHandleProps}
                                    ref={provided2.innerRef}
                                  >
                                    <ItemCard
                                      key={obj.id}
                                      style={{
                                        cursor: "pointer",
                                        border: "none",
                                      }}
                                    >
                                      <CardViews
                                        className={
                                          obj.is_edit &&
                                          !quoteDetails.is_revised
                                            ? ""
                                            : "border-radius"
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
                                          {/* <div className="pl-46"></div> */}
                                          <div className="line-number">
                                            {obj.line_number
                                              ? obj.line_number
                                              : ""}
                                          </div>

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
                                          </div>

                                          {getUserLoggedPermission() && (
                                            <>
                                              <div className="d-flex align-center g-8  w-32">
                                                <span>Part Number</span>
                                                <h4
                                                  className="fs-16 semiBoldWt color-dark m-0 item-value-ellipsis"
                                                  title={
                                                    obj.part_number
                                                      ? obj.part_number
                                                      : "--"
                                                  }
                                                >
                                                  {obj.part_number
                                                    ? obj.part_number
                                                    : "--"}
                                                </h4>
                                              </div>
                                              <div
                                                className="d-flex align-center g-8"
                                                style={{ width: "30%" }}
                                              >
                                                <span>Description</span>
                                                <h4
                                                  className="fs-16 semiBoldWt color-dark m-0  item-value-ellipsis"
                                                  title={
                                                    obj.description
                                                      ? obj.description
                                                      : "--"
                                                  }
                                                >
                                                  {obj.description
                                                    ? obj.description
                                                    : "--"}
                                                </h4>
                                              </div>
                                            </>
                                          )}

                                          <div
                                            className="align-right"
                                            style={{ flex: "1" }}
                                          />
                                        </CardTopDetails>
                                      </CardViews>
                                    </ItemCard>

                                    {/* <Card id={obj.id} text={obj.id} /> */}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </RepairItemCardWrapper>
              )}
              {!loading && repairsList.length === 0 && (
                <NoRepairFound> Quote item(s) Not found</NoRepairFound>
              )}

              <SideDrawerFooter>
                {serverMsg && <div className="server-msg">{serverMsg}</div>}
                <PiButton
                  appearance="primary"
                  label="Save"
                  onClick={saveOrder}
                  isDisabled={!enableSave}
                />
              </SideDrawerFooter>
            </>
          )}
        </SideDrawerContainer>
      </PiModal>
      {/* </SideDrawerW60> */}
      {/* {openPastInvoiceData && (
        <PastRepairInvoices
          quoteInfo={quoteInfo}
          sendEventData={triggerRepairInvoice}
        ></PastRepairInvoices>
      )} */}
    </>
  );
}

export function Card({ text }: any) {
  return (
    <div className="card" draggable="true">
      {text}
    </div>
  );
}

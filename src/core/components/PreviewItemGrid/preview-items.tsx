import { PiButton, PiCheckbox, PiSpinner } from "pixel-kit";
import { useEffect, useState } from "react";
import { SideDrawerFooter } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import { SelectItemsSpinner } from "@app/components/Repair-Components/selectItems/ItemsSelection/items-selection.component";
import {
  RepairCardBody,
  RepairItemsRowRow,
  RepairItemsColumn,
} from "@app/components/RepairItems/repair-items.component";
import { NoUserFound } from "@app/components/usersComponents/userslist/userslist.component";

export default function PreviewItems({
  itemsApiParams,
  quoteDetails,
  tableInputParams,
  sendEventData,
  sendSubmitData,
}: any) {
  const [selectedQuoteItem, setSelectedQuoteItem]: any = useState([]);
  const [loading, setLoading] = useState(true);
  // const { id }: RouteParams = useParams()
  const [btnLoading, setBtnLoading] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const [updatedSelectedList, setUpdatedSelectedList] = useState([]);
  function getUpdatedSelectedList() {
    const list =
      selectedQuoteItem && selectedQuoteItem.filter((e: any) => e.isChecked);
    setUpdatedSelectedList(list);
    const totalCheckedItems = selectedQuoteItem.filter(
      (e: any) => e.isChecked
    ).length;

    const obj = {
      ...tableInputParams,
      totalCheckedItems,
      previewCheckedList: updatedSelectedList,
    };
    console.log(obj);
    setTimeout(() => {
      sendEventData(obj);
    }, 500);
  }
  useEffect(() => {
    if (tableInputParams) {
      console.log(tableInputParams);
      setSelectedQuoteItem(tableInputParams.selectedItem);
      if (tableInputParams.selectedItem) {
        getUpdatedSelectedList();
      }
    } else {
      console.log(tableInputParams);
    }
    setLoading(false);
  }, [tableInputParams, itemsApiParams]);
  const selectedItemCheckBoxes = (e: any, item: any) => {
    const items = selectedQuoteItem.map((obj: any) => {
      if (obj.id === item.id) {
        if (e.target.checked) {
          obj.isChecked = true;
        } else {
          obj.isChecked = false;
        }
      }
      return obj;
    });
    setSelectedQuoteItem(items);
    getUpdatedSelectedList();
  };

  async function addToQuote() {
    console.log(tableInputParams);
    let allowSubmit = false;
    tableInputParams.selectedItem.map((obj: any) => {
      if (obj.quantity === "") {
        allowSubmit = false;
      } else {
        allowSubmit = true;
      }
      return obj;
    });

    if (allowSubmit) {
      setBtnLoading(true);
      setOpacity(true);
      const obj = {
        ...tableInputParams,
        previewCheckedList: updatedSelectedList,
        quote_id: quoteDetails.id,
        quoteDetails,
        itemsApiParams,
      };
      sendSubmitData(obj);

      // let data: any = await addPartToQuote(obj)
      // console.log(data)
      // setBtnLoading(false)
      // setOpacity(false)
      const obj2 = {
        //  selectItems: selectItems,
        //  totalCount: listColunt,
        previewCheckedList: updatedSelectedList,
        //  totalCheckedItems: selectItems.filter((e: any) => e.isChecked).length,
        // success: data.success,
        // apiResponsedata: data,
      };
      // if (data.success === false) {
      //  setServerMsg(data.data)
      //  setBtnLoading(false)
      // }
      sendEventData(obj2);
    }
  }
  return (
    <>
      <RepairCardBody
        style={{ height: "100%" }}
        className={btnLoading ? "opacity-on-load" : ""}
      >
        <RepairItemsRowRow className="header">
          <RepairItemsColumn className="checkbox">
            {/* <PiCheckbox
                    helpText=""
                    libraryType="atalskit"
                    name="checkbox"
                    onChange={selectedItemsAllCheckBox}
                    size="large"
                    isChecked={selectedItemsSelctAll}
                  /> */}
          </RepairItemsColumn>
          <RepairItemsColumn
            className="header-label min-width-180"
            style={{ textAlign: "left" }}
          >
            Part Number
          </RepairItemsColumn>
          <RepairItemsColumn className="header-label min-width flexed">
            Description
          </RepairItemsColumn>
          <RepairItemsColumn className="header-label">
            Manufacturer
          </RepairItemsColumn>
          <RepairItemsColumn className="header-label">
            Quantity
          </RepairItemsColumn>
        </RepairItemsRowRow>
        <div>
          {!loading &&
            selectedQuoteItem &&
            selectedQuoteItem.length > 0 &&
            selectedQuoteItem.map((obj: any, index: number) => (
              <RepairItemsRowRow
                // className="data item-preview-grid"
                className={btnLoading ? "data  opacity-on-load" : "data "}
              >
                <RepairItemsColumn className="checkbox">
                  <PiCheckbox
                    isChecked={obj.isChecked}
                    helpText=""
                    libraryType="atalskit"
                    name={`checkbox${index}`}
                    onChange={(e) => selectedItemCheckBoxes(e, obj)}
                    size="large"
                    className="repair-item-checkbox"
                  />
                </RepairItemsColumn>

                <RepairItemsColumn
                  title={obj.name || obj.part_number}
                  className="text-ellipsis min-width-180"
                  style={{ textAlign: "left" }}
                >
                  {obj.name || obj.part_number}
                </RepairItemsColumn>
                <RepairItemsColumn
                  title={obj.description}
                  className="line-clamp three-lines min-width flexed"
                  style={{ flex: "1" }}
                >
                  {obj.description}
                </RepairItemsColumn>
                <RepairItemsColumn
                  className="text-ellipsis"
                  title={obj.manufacturer}
                >
                  {obj.manufacturer}
                </RepairItemsColumn>
                <RepairItemsColumn
                  className="text-ellipsis"
                  title={obj.quantity ? obj.quantity : "-"}
                >
                  {obj.quantity ? obj.quantity : "-"}
                </RepairItemsColumn>
              </RepairItemsRowRow>
            ))}
        </div>
        {selectedQuoteItem &&
          selectedQuoteItem.length === 0 &&
          !loading &&
          !btnLoading && <NoUserFound> Items Not Found</NoUserFound>}
        {loading && !btnLoading && (
          <SelectItemsSpinner>
            <PiSpinner color="primary" size={50} libraryType="atalskit" />
          </SelectItemsSpinner>
        )}
        {btnLoading && (
          <SelectItemsSpinner>
            <PiSpinner color="primary" size={50} libraryType="atalskit" />
          </SelectItemsSpinner>
        )}
      </RepairCardBody>
      <SideDrawerFooter
        className={
          itemsApiParams.flag === "quote_options" ||
          itemsApiParams.flag === "quote_items"
            ? "padding-x-zero"
            : ""
        }
      >
        <PiButton
          appearance="primary"
          label={
            updatedSelectedList.length > 0
              ? `Add Selected ${updatedSelectedList.length} Items`
              : "Add Items"
          }
          onClick={() => addToQuote()}
          //  isLoading={btnLoading}
          // isDisabled={updatedSelectedList.length === 0}
          isDisabled={!!(updatedSelectedList.length === 0 || opacity)}
        />
      </SideDrawerFooter>
    </>
  );
}

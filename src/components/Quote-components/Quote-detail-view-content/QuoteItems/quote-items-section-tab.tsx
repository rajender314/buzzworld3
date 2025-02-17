import { AsyncSelect } from "@atlaskit/select";
import {
  PiButton,
  PiSearch,
  PiTabGroup,
  PiTabHeader,
  PiTabHeaderPanel,
  PiTabPanel,
} from "pixel-kit";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import { SideDrawerFooter } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import { TabParentDiv } from "@app/components/Repair-Components/selectItems/ItemsSelection/items-selection.component";
import { SideDrawerSearch } from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import { AsyncLabel } from "@app/components/rmaModel/RmaModel.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import PreviewItems from "@app/core/components/PreviewItemGrid/preview-items";
import SelectItemsGrid from "@app/core/components/selectItemsGrid/select-items-grid";
import { getFilterSupplierData } from "@app/helpers/helpers";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import { Width50 } from "../../Forms/PartQuote/part-quote.component";
import { addPartToQuote } from "../../quotes-helper";
import AddNewQuotePart from "./add-new-quote-item";

export default function QuoteItemSelctionTab({
  itemsApiParams,
  quoteDetails,
  sendEventData,
}: any) {
  const [tabIndex, setTabIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [triggeredItem, setTriggeredItems]: any = useState([]);
  const [tableInputParams, setTableInputParams] = useState();
  const [tableSelectedParams, setTableSelectedParams]: any = useState();
  const [modifiedSelectTab, setModifiedSelectTab]: any = useState([]);
  const [newItemsApiParams, setItemsApiParams]: any = useState(itemsApiParams);
  const [opacity, setOpacity] = useState(false);
  const [customerName, setCustomerName]: any = useState([]);
  const [serverMsg, setServerMsg] = useState<any>(null);
  const { current }: any = useRef({ timer: 0 });
  useEffect(() => {
    setItemsApiParams(itemsApiParams);
    modifiedSelectTab.totalCheckedItems = 0;
    setModifiedSelectTab({ ...modifiedSelectTab });
  }, [itemsApiParams]);
  function tabChange(indx: number) {
    setTabIndex(indx);
  }
  function clearSearch() {
    setSearchValue("");
    const inputParams: any = {
      searchValue: "",
      tabIndex,
      vendorId: customerName,
    };
    setTableInputParams({ ...inputParams });
    setTriggeredItems([]);
  }
  function valueChanged(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
    const inputParams: any = {
      searchValue: e.target.value ? encodeURIComponent(e.target.value) : "",
      tabIndex,
      vendorId: customerName,
    };
    setTableInputParams(inputParams);
    // setTriggeredItems([])

    // if (current.timer) clearTimeout(current.timer)
    // current.timer = setTimeout(() => {
    //  setSearchValue(e.target.value)
    // }, 1000)
  }
  function triggerEvent(e: any) {
    setTriggeredItems(e);
    const selectedParams = {
      searchValue,
      tabIndex,
      selectedItem: e.selectItems,
      previewCheckedList: e.previewCheckedList,
      totalCheckedItems: e.totalCheckedItems,
      formik: e.formik,
    };
    setTableSelectedParams(selectedParams);

    const selectTab = {
      searchValue,
      tabIndex,
      selectedItem: e.selectedItem,
      previewCheckedList: e.previewCheckedList,
      totalCheckedItems: e.totalCheckedItems,
      formik: e.formik,
    };
    setModifiedSelectTab({ ...selectTab });
    sendEventData(e);
  }
  function triggerPreviewEvent(e: any) {
    const selectTab = {
      searchValue,
      tabIndex,
      selectedItem: e.selectedItem,
      previewCheckedList: e.previewCheckedList,
      totalCheckedItems: e.totalCheckedItems,
    };
    setModifiedSelectTab({ ...selectTab });
    sendEventData(e);
  }
  const [formikData, setFormikData]: any = useState();
  const triggerAddNewEvent = (e: any) => {
    console.log(e);
    if (
      e &&
      e.current &&
      e.current.values &&
      e.current.values.custom_part_items.length === 0
    ) {
      setServerMsg("Please add atleast one Item");
      return;
    }
    setServerMsg(null);

    const formikprops = e;
    setFormikData(formikprops);
  };

  async function addSystemQuoteNewPart() {
    let optId: string = "";
    formikData.current.handleSubmit();
    if (!formikData.current.isValid) {
      return;
    }
    const params = {
      quote_id: quoteDetails.id,
      customer_id: quoteDetails.customer_id,
      options_id: itemsApiParams.selectedOption,
      ...formikData.current.values,
    };
    const apiObject = {
      payload: params,
      method: "POST",
      apiUrl: `${EndpointUrl.SystemQuoteItems}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setServerMsg(null);
          optId = response.result.data;
          sendEventData({
            success: true,
            isNewItemAdded: true,
            apiResponsedata: response.result.data,
          });
          return optId;
        }
        setServerMsg(response.result.data);
        return optId;
      })
      .catch(() => {});
    // eslint-disable-next-line consistent-return
    return optId;
  }
  async function addNewPart() {
    formikData.current.handleSubmit();
    let optId: string = "";
    if (quoteDetails.is_system_quote) {
      setOpacity(true);
      const data: any = await addSystemQuoteNewPart();
      optId = data;
      setOpacity(false);
    } else if (formikData && formikData.current.isValid) {
      const selectedIds: any = [];
      if (tableSelectedParams && tableSelectedParams.previewCheckedList) {
        tableSelectedParams.previewCheckedList.map((ele: any) => {
          if (ele.isChecked) {
            const obj: any = {
              // products_id:
              //  (data.itemsApiParams.flag === 'quote_options')
              //    ? ele.id
              //    : ele.product_id,
              description: ele.description,
              part_number: ele.name,
              quantity: ele.quantity,
              supplier: {
                label: ele.manufacturer,
                value: ele.manufacturer_id,
              },
            };
            if (
              itemsApiParams.flag === "quote_options" ||
              itemsApiParams.flag === "quote_items"
            ) {
              obj.products_id = ele.id;
            } else {
              obj.products_id = ele.product_id;
            }
            selectedIds.push(obj);
            // formikData.current.values.custom_part_items.push(obj)
          }
          return true;
        });
      }

      setOpacity(true);
      formikData.current.values.custom_part_items =
        formikData.current.values.custom_part_items.map((obj: any) => {
          if (obj.description) {
            obj.description = obj.description.trim();
          }
          return obj;
        });
      const params = {
        quote_id: quoteDetails.id,
        options_id: newItemsApiParams.selectedOption,
        customer_id: quoteDetails.customer_id,
        ...formikData.current.values,
      };
      const apiObject = {
        payload: params,
        method: "POST",
        apiUrl: `${EndpointUrl.QuoteAddNewPart}`,
        headers: {},
      };
      await triggerApi(apiObject)
        .then(async (response: ApiResponse) => {
          if (response.result.success) {
            const data = {
              data: response.result.data,
            };
            optId = response.result.data;

            sendEventData({
              success: true,
              isNewItemAdded: true,
              apiResponsedata: data,
            });
            setOpacity(false);
          } else {
            setOpacity(false);
          }
        })

        .catch((err: string) => {
          console.log(err);
        });
      return optId;
    }
    return optId;
  }

  const onChangeVendor = (e: any) => {
    let cust_name: any = [];
    if (e.length) {
      // const indx = e.length - 1
      // let obj: any = { value: e[indx].value, label: e[indx].name }
      // customerName.push(obj)
      // setCustomerName([...customerName])
      // console.log(customerName)
      cust_name = e.map((item: any) => ({
        ...item,
        label: item.name,
        value: item.id,
      }));
      setCustomerName([...cust_name]);
    } else {
      cust_name = [];
      setCustomerName(cust_name);
    }
    const inputParams: any = {
      searchValue,
      tabIndex,
      vendorId: customerName,
    };
    setTableInputParams(inputParams);
  };

  const handleOrgInputChange = (newValue: string) => {
    console.log(newValue);
    return newValue;
  };

  const promiseSupplierOptions = (inputValue: string, flag: string) =>
    new Promise((resolve) => {
      if (current.timer) clearTimeout(current.timer);
      current.timer = setTimeout(() => {
        if (flag === "supplierlist") {
          resolve(getFilterSupplierData(inputValue, EndpointUrl.QuoteVendors));
        }
      }, 1000);
    });
  const triggerSubmittedData = async () => {
    let optId;
    if (formikData && formikData.current) {
      const data = await addNewPart();
      optId = data;
    }
    if (
      tableSelectedParams &&
      tableSelectedParams.previewCheckedList &&
      tableSelectedParams.previewCheckedList.length
    ) {
      if (
        formikData &&
        formikData.current &&
        !formikData.current.isValid &&
        tabIndex === 2
      ) {
        return;
      }
      const data = await addPartToQuote({
        ...tableSelectedParams,
        itemsApiParams,
        quoteDetails,
        optId,
      });
      sendEventData({
        success: true,
        isNewItemAdded: true,
        apiResponsedata: data,
      });
    }
  };
  const addNewQuoteData = async () => {
    await triggerSubmittedData();
  };

  return (
    <>
      {tabIndex !== 2 &&
        newItemsApiParams &&
        quoteDetails.is_repair === false &&
        newItemsApiParams.flag !== "quote_options_from_dropdown" && (
          <SideDrawerSearch>
            <Width50
              className="d-flex-row-gap pb-10px pi-select-wrapper"
              style={{ rowGap: "0" }}
            >
              {/* <PiSelect
                label="Select Manufacturer"
                libraryType="atalskit"
                name="select"
                onChange={(e: any) => onChangeVendor(e)}
                classNamePrefix={
                  customerName && customerName.length >= 1
                    ? 'drop-height-80px multi-select react-select'
                    : 'react-select'
                }
                options={quoteVendorList}
                placeholder="Select"
                value={customerName}
                isMulti
              /> */}
              <AsyncLabel htmlFor="async-select-example" className="css-re7y6x">
                Select Manufacturer
              </AsyncLabel>
              <AsyncSelect
                name="supplier"
                inputId="async-select-example"
                onInputChange={handleOrgInputChange}
                loadOptions={(e: any) =>
                  promiseSupplierOptions(e, "supplierlist")
                }
                placeholder="Search"
                classNamePrefix={`${customerName.length > 1 ? "drop-height-80px multi-select react-select" : "drop-height-80px multi-select react-select"}`}
                // onChange={(value) => {
                //  setFieldValue(`organizations_id`, value)
                //  HandleChange(value)
                // }}
                value={customerName}
                onChange={(e: any) => onChangeVendor(e)}
                isClearable
                isMulti
                noOptionsMessage={() => "Supplier Not Found"}
              />
            </Width50>
            <PiSearch
              libraryType="atalskit"
              onClear={() => clearSearch()}
              onValueChange={(e) => valueChanged(e)}
              placeholder="Search By Part Number"
              value={searchValue}
            />
          </SideDrawerSearch>
        )}
      <FormBodyOverFlow
        className={newItemsApiParams.flag === "quote_options" ? "pb-zero" : ""}
      >
        {/* {(quoteDetails.is_system_quote === false ||
          (quoteDetails.is_system_quote && selectedOption)) && ( */}
        <TabParentDiv>
          <PiTabGroup
            id="tab"
            onChange={(e: any) => tabChange(e)}
            selected={tabIndex}
          >
            <PiTabHeaderPanel>
              {(!quoteDetails.is_repair ||
                (quoteDetails.is_repair &&
                  newItemsApiParams.flag ===
                    "quote_options_from_dropdown")) && (
                <PiTabHeader>
                  Search Result (
                  {triggeredItem.totalCount ? triggeredItem.totalCount : 0})
                </PiTabHeader>
              )}
              {(!quoteDetails.is_repair ||
                (quoteDetails.is_repair &&
                  newItemsApiParams.flag ===
                    "quote_options_from_dropdown")) && (
                <PiTabHeader>
                  Selected Items (
                  {modifiedSelectTab.totalCheckedItems
                    ? modifiedSelectTab.totalCheckedItems
                    : 0}
                  )
                </PiTabHeader>
              )}

              {newItemsApiParams &&
                newItemsApiParams.flag !== "quote_options_from_dropdown" && (
                  <PiTabHeader>Add New Items</PiTabHeader>
                )}
            </PiTabHeaderPanel>
            {(!quoteDetails.is_repair ||
              (quoteDetails.is_repair &&
                newItemsApiParams.flag === "quote_options_from_dropdown")) && (
              <PiTabPanel>
                <SelectItemsGrid
                  itemsApiParams={newItemsApiParams}
                  quoteDetails={quoteDetails}
                  tableInputParams={tableInputParams}
                  sendEventData={(e: any) => triggerEvent(e)}
                  sendSubmitData={triggerSubmittedData}
                />
              </PiTabPanel>
            )}
            {(!quoteDetails.is_repair ||
              (quoteDetails.is_repair &&
                newItemsApiParams.flag === "quote_options_from_dropdown")) && (
              <PiTabPanel>
                <PreviewItems
                  itemsApiParams={newItemsApiParams}
                  quoteDetails={quoteDetails}
                  tableInputParams={tableSelectedParams}
                  sendEventData={(e: any) => triggerPreviewEvent(e)}
                  sendSubmitData={triggerSubmittedData}
                />
              </PiTabPanel>
            )}

            <PiTabPanel>
              <AddNewQuotePart
                quoteDetails={quoteDetails}
                sendData={triggerAddNewEvent}
              />
            </PiTabPanel>
          </PiTabGroup>
        </TabParentDiv>
        {/* )} */}
        {/* {quoteDetails &&
          quoteDetails.is_system_quote === true &&
          !selectedOption && (
            <AddNewQuotePart
              from="quotes"
              quoteDetails={quoteDetails}
              itemsApiParams={itemsApiParams}
              sendData={triggerAddNewEvent}
            ></AddNewQuotePart>
          )} */}
      </FormBodyOverFlow>
      {quoteDetails &&
        // quoteDetails.is_system_quote === false &&
        (tabIndex === 2 ||
          (quoteDetails.is_repair &&
            newItemsApiParams.flag !== "quote_options_from_dropdown")) && (
          <SideDrawerFooter>
            {serverMsg && <div className="server-msg">{serverMsg}</div>}
            <PiButton
              label="Add"
              appearance="primary"
              onClick={addNewQuoteData}
              isDisabled={!!(opacity || serverMsg)}
            />
          </SideDrawerFooter>
        )}
    </>
  );
}

import _ from "lodash";
import {
  PiButton,
  PiCheckbox,
  PiInputForm,
  PiPagination,
  PiSpinner,
} from "pixel-kit";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SideDrawerFooter } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import {
  TableDataScroll,
  SelectItemsSpinner,
  PaginationWrapper,
} from "@app/components/Repair-Components/selectItems/ItemsSelection/items-selection.component";
import {
  RepairCardBody,
  RepairItemsColumn,
  RepairItemsRowRow,
} from "@app/components/RepairItems/repair-items.component";
import { NoUserFound } from "@app/components/usersComponents/userslist/userslist.component";
import { triggerApi } from "@app/services";
import { Formik } from "formik";
import Validations from "@app/core/validations/validations";

export default function SelectItemsGrid({
  itemsApiParams,
  quoteDetails,
  tableInputParams,
  sendEventData,
  sendSubmitData,
}: any) {
  const [pageParam, setPageParam] = useState(1);
  const [repairList, setRepairList]: any = useState([]);
  const [listColunt, setListCount] = useState(0);
  const [loading, setLoading] = useState(false);
  // const { id }: any = useParams();
  const perPage = 25;
  const [selectItems, setSelectedItems]: any = useState([]);
  const [searchedVal, setSearchedVal]: any = useState("");
  const [opacity, setOpacity] = useState(false);
  const { current }: any = useRef({ timer: 0 });
  const formik = useRef<any>(null);
  const [initialValues, setInitialValues] = useState<any>({});
  const [validationSchema, setValidationSchema]: any = useState([]);
  const vendorIdParams: any = useRef<any>("");
  function getGridParamsArray(selecteList: any, key: string) {
    if (selecteList) {
      let obj: any = {};

      for (let i = 0; i < selecteList.length; i += 1) {
        obj = {
          ...obj,
          [`${key}[${i}]`]: selecteList[i].value,
        };
      }
      return obj;
    }
    return null;
  }
  const [updatedSelectedList, setUpdatedSelectedList] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);

  function getCheckBoxState(list: any) {
    list.map((ele: any) => {
      selectItems.map((obj: any) => {
        if (obj.id === ele.id && obj.isChecked === true) {
          ele.isChecked = true;
        }
        return obj;
      });
      return ele;
    });
    return list;
  }
  const getRepairList = (searhVal?: string) => {
    console.log(itemsApiParams);
    if (
      (tableInputParams &&
        tableInputParams.searchValue &&
        tableInputParams.searchValue.length >= 3) ||
      itemsApiParams.flag === "quote_options_from_dropdown"
    ) {
      let url = `${itemsApiParams && itemsApiParams.searchUrl}?page=${pageParam}&perPage=${perPage}&search=${searhVal || tableInputParams?.searchValue}&repairs_id=${quoteDetails.id}`;
      if (
        itemsApiParams.flag === "quote_options_from_dropdown" ||
        itemsApiParams.flag === "quote_options"
      ) {
        url = `${itemsApiParams.searchUrl}?page=${pageParam}&perPage=${perPage}&search=${searhVal || tableInputParams?.searchValue}&quote_id=${quoteDetails.id}&options_id=${itemsApiParams.option_id ? itemsApiParams.option_id : ""}&is_new_option=${true}`;
      }
      if (itemsApiParams.flag === "quote_items") {
        url = `${itemsApiParams.searchUrl}?page=${pageParam}&perPage=${perPage}&search=${searhVal || tableInputParams?.searchValue}&quote_id=${quoteDetails.id}&options_id=${itemsApiParams.selectedOption ? itemsApiParams.selectedOption : ""}`;
      }

      if (vendorIdParams.current) {
        console.log(vendorIdParams);
        // eslint-disable-next-line no-restricted-syntax
        for (const key in vendorIdParams.current) {
          if (
            Object.prototype.hasOwnProperty.call(vendorIdParams.current, key)
          ) {
            url = `${url}`.concat(`&${key}=${vendorIdParams.current[key]}`);
          }
        }
      }
      setLoading(true);
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: url,
        headers: {},
      };
      triggerApi(apiObject)
        .then((response: any) => {
          if (response.result.success) {
            const { data } = response.result;
            data.list.map((ele: any) => {
              ele.isChecked = false;
              ele.quantity = ele.quantity ? ele.quantity : "1";
              return ele;
            });

            const bindedCheckBox = getCheckBoxState(data.list);
            const list = bindedCheckBox;
            for (let i = 0; i < list.length; i += 1) {
              formik.current.setFieldValue(
                `quantity_${i}`,
                data.list[i].quantity ? data.list[i].quantity.toString() : "1"
              );
            }

            setRepairList([...data.list]);
            setListCount(data.total_count);

            const obj = {
              selectItems,
              totalCount: listColunt,
              totalCheckedItems: selectItems.filter((e: any) => e.isChecked)
                .length,
            };
            sendEventData(obj);
            setLoading(false);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    console.log(tableInputParams);
    if (tableInputParams) {
      if (
        tableInputParams.searchValue &&
        tableInputParams.searchValue.length > 2
      ) {
        setPageParam(1);
      }
      setSearchedVal(tableInputParams.searchValue);
      if (searchedVal === "") {
        setRepairList([]);
        setListCount(0);
      }
      vendorIdParams.current = getGridParamsArray(
        tableInputParams.vendorId,
        "manufacturer_id"
      );
      console.log(vendorIdParams.current);

      if (current.timer) clearTimeout(current.timer);
      current.timer = setTimeout(() => {
        getRepairList();
      }, 1000);
    }
    if (itemsApiParams.flag === "quote_options_from_dropdown") {
      getRepairList();
    }
    console.log(11);
  }, [tableInputParams, itemsApiParams]);

  useEffect(() => {
    const json: any = {};
    const messages: any = {};
    console.log(repairList);
    for (let i = 0; i < repairList.length; i += 1) {
      initialValues[`quantity_${i}`] = repairList[i].quantity
        ? repairList[i].quantity.toString()
        : "1";
      json[`quantity_${i}`] =
        "numFormatRequired|trim|numFormatMinVal:1|numFormatCharLimit:99999";
      messages[`quantity_${i}`] = {
        numFormatRequired: "Enter Quantity",
        numFormatMinVal: "cannot be zero",
        numFormatCharLimit: "Exceeding character limit",
      };
    }
    const validation = Validations(json, messages);
    setValidationSchema(validation);
    setInitialValues(initialValues);
    console.log(222222222);
  }, [repairList, initialValues]);
  function handleRef(e: any) {
    console.log(e);
    formik.current = e;
  }
  function getUpdatedSelectedList() {
    const list = selectItems.filter((e: any) => e.isChecked);
    setUpdatedSelectedList(list);
    const totalCheckedItems = selectItems.filter(
      (e: any) => e.isChecked
    ).length;
    const obj = {
      selectItems,
      totalCount: listColunt,
      previewCheckedList: list,
      totalCheckedItems,
      formik,
    };
    sendEventData(obj);
    // console.log(updatedSelectedList)
  }
  const selectCheckBoxes = (e: any, item: any) => {
    // to remove duplicates before pushing items
    // for (let j = 0; j < selectItems.length; j++) {
    //  if (item.id === selectItems[j].id) {
    //    selectItems.splice(j, 1)
    //  }
    // }

    // api params functionality
    if (e.target.checked) {
      selectItems.push(item);
    } else {
      const indx = _.findIndex(selectItems, { id: item.id });
      selectItems.splice(indx, 1);
    }
    setSelectedItems(selectItems);
    let list = [];
    list = repairList.map((obj: any) => {
      if (obj.id === item.id) {
        if (e.target.checked) {
          obj.isChecked = true;
        } else {
          obj.isChecked = false;
        }
      }
      return obj;
    });
    setRepairList(list);

    getUpdatedSelectedList();
  };

  async function addToQuote() {
    formik.current.handleSubmit();
    if (!formik.current.isValid) {
      return;
    }
    setBtnLoading(true);
    setOpacity(true);
    const obj = {
      ...tableInputParams,
      previewCheckedList: updatedSelectedList,
      quote_id: quoteDetails.id,
      quoteDetails,
      itemsApiParams,
    };
    // let data: any = await addPartToQuote(obj)
    // console.log(data)
    sendSubmitData(obj);
    // setBtnLoading(false)
    // setOpacity(false)
    const obj2 = {
      selectItems,
      totalCount: listColunt,
      previewCheckedList: updatedSelectedList,
      totalCheckedItems: selectItems.filter((e: any) => e.isChecked).length,
      // success: data.success,
      // apiResponsedata: data,
    };
    // if (data.success === false) {
    //  setServerMsg(data.data)
    // }
    sendEventData(obj2);
  }
  const onPageChange = (e: any) => {
    setLoading(true);
    setPageParam(e);
    setTimeout(() => {
      getRepairList();
    }, 500);
  };
  const serialNoChange = (e: ChangeEvent<HTMLInputElement>, indx: number) => {
    repairList[indx].quantity = e.target.value;
    setRepairList([...repairList]);
  };
  return (
    <>
      <Formik
        validationSchema={validationSchema}
        onSubmit={() => {}}
        initialValues={initialValues}
        innerRef={(e: any) => handleRef(e)}
      >
        {() => (
          <RepairCardBody
            style={{ height: "100%" }}
            className={btnLoading ? "opacity-on-load" : ""}
          >
            <RepairItemsRowRow className="header">
              <RepairItemsColumn className="checkbox" />
              <RepairItemsColumn
                className="header-label min-width-180"
                style={{ textAlign: "left" }}
              >
                Part Number
              </RepairItemsColumn>
              <RepairItemsColumn className="header-label desc">
                Description
              </RepairItemsColumn>
              <RepairItemsColumn className="header-label ">
                Manufacturer
              </RepairItemsColumn>
              <RepairItemsColumn className="header-label ">
                Quantity
              </RepairItemsColumn>
            </RepairItemsRowRow>

            {repairList.length > 0 && (
              <TableDataScroll>
                {!loading &&
                  repairList.map((obj: any, index: number) => (
                    <RepairItemsRowRow
                      className="data grid"
                      key={obj.id}
                      // style={{ width: '100%' }}
                    >
                      <RepairItemsColumn className="checkbox">
                        <PiCheckbox
                          isChecked={obj.isChecked}
                          helpText=""
                          libraryType="atalskit"
                          name={`checkbox${index}`}
                          onChange={(e) => selectCheckBoxes(e, obj)}
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
                        className="line-clamp three-lines desc"
                      >
                        {obj.description}
                      </RepairItemsColumn>
                      <RepairItemsColumn
                        title={obj.manufacturer}
                        className="text-ellipsis"
                      >
                        {obj.manufacturer}
                      </RepairItemsColumn>
                      <RepairItemsColumn
                        className=""
                        style={{ width: "min-content" }}
                      >
                        <div className="input-field">
                          <PiInputForm
                            name={`quantity_${index}`}
                            libraryType="atalskit"
                            type="number"
                            placeholder="Quantity"
                            onChange={(e) => serialNoChange(e, index)}
                            maxLength={5}
                          />
                        </div>
                      </RepairItemsColumn>
                    </RepairItemsRowRow>
                  ))}
              </TableDataScroll>
            )}
            {!listColunt && !loading && !btnLoading && (
              <NoUserFound>Items Not Available</NoUserFound>
            )}
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
        )}
      </Formik>
      {listColunt > 0 && (
        <PaginationWrapper>
          <PiPagination
            onChange={onPageChange}
            pages={Math.ceil(listColunt / 25)}
            selectedIndex={pageParam - 1}
          />
        </PaginationWrapper>
      )}
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
          isLoading={btnLoading}
          // isDisabled={updatedSelectedList.length === 0}
          isDisabled={
            !!(updatedSelectedList.length === 0 || opacity || btnLoading)
          }
        />
      </SideDrawerFooter>
    </>
  );
}

import _ from "lodash";
import {
  PiSearch,
  PiTabGroup,
  PiTabHeaderPanel,
  PiTabHeader,
  PiTabPanel,
  PiCheckbox,
  PiButton,
  PiSpinner,
  PiPagination,
  PiInputForm,
} from "pixel-kit";
import { useRef, useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import {
  RepairCardBody,
  RepairItemsRowRow,
  RepairItemsColumn,
} from "@app/components/RepairItems/repair-items.component";
import { NoUserFound } from "@app/components/usersComponents/userslist/userslist.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { removeLocalStorage } from "@app/core/localStorage/localStorage";
import { triggerApi } from "@app/services";
import { addNewpartData } from "@app/modules/repair-detail-view/helpers/repairs-helpers";
import { Width50 } from "@app/components/Quote-components/Forms/PartQuote/part-quote.component";
import { Formik } from "formik";
import Validations from "@app/core/validations/validations";
import { AsyncSelect } from "@atlaskit/select";
import { AsyncLabel } from "@app/components/rmaModel/RmaModel.component";
import { getFilterSupplierData } from "@app/helpers/helpers";
import AddNewPart from "./add-new-part";
import {
  PaginationWrapper,
  SelectItemsSpinner,
  TableDataScroll,
  TabParentDiv,
} from "./items-selection.component";
import {
  NoItemsFound,
  SideDrawerSearch,
} from "../selectItemsModel/selectItem.component";
import { SideDrawerFooter } from "../AddPartRepair/add-part-repair.component";
import { FormBodyOverFlow } from "../../checksIns/assignLocation/assign-location.component";

type Props = {
  // eslint-disable-next-line no-unused-vars
  sendEventData: (e: any) => {};
};
export default function ItemsSelection({ sendEventData }: Props) {
  // console.log(ItemSelectData)
  const { id }: any = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [showNoData, setShowNoData] = useState(false);
  const { current }: any = useRef({ timer: 0 });
  const [repairList, setRepairList]: any = useState([]);
  const [listColunt, setListCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageParam, setPageParam] = useState(1);
  const [serverMsg, setServerMsg] = useState(null);
  const perPage = 25;
  const vendorIdParams: any = useRef<any>("");
  const [initialValues, setInitialValues] = useState<any>({});
  const formik = useRef<any>(null);
  const [validationSchema, setValidationSchema]: any = useState([]);
  const [selectItems, setSelectedItems]: any = useState([]);
  const [updatedSelectedList, setUpdatedSelectedList] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  useEffect(() => {
    removeLocalStorage("repairSelectAll");
  }, []);

  useEffect(() => {}, []);
  const [tabIndex, setTabIndex] = useState(0);
  function tabChange(indx: number) {
    setTabIndex(indx);
  }
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
    if (searhVal && searhVal.length >= 3) {
      setLoading(true);
      let url = `${EndpointUrl.rMASearchItems}?page=${pageParam}&perPage=${perPage}&search=${searhVal || encodeURIComponent(searhVal)}&repairs_id=${id}`;

      if (vendorIdParams.current) {
        console.log(vendorIdParams);
        // for (const key in vendorIdParams.current) {
        //   if (vendorIdParams.current.hasOwnProperty(key)) {
        //     url = `${url}`.concat(`&${key}=${vendorIdParams.current[key]}`);
        //   }
        // }

        Object.keys(vendorIdParams.current).forEach((key) => {
          if (
            Object.prototype.hasOwnProperty.call(vendorIdParams.current, key)
          ) {
            url = `${url}`.concat(`&${key}=${vendorIdParams.current[key]}`);
          }
        });
      }
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
              ele.customer_po = "";
              return ele;
            });

            const bindedCheckBox = getCheckBoxState(data.list);
            const repair_list = bindedCheckBox;
            for (let i = 0; i < repair_list.length; i += 1) {
              formik.current.setFieldValue(`quantity_${i}`, "1");
            }
            setRepairList([...repair_list]);

            setListCount(data.total_count);

            setShowNoData(!(data.total_count > 0));
            setLoading(false);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    const json: any = {};
    const messages: any = {};

    for (let i = 0; i < repairList.length; i += 1) {
      initialValues[`quantity_${i}`] = "1";
      initialValues[`custpmer_po_${i}`] = "";
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
  function valueChanged(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
    // setSelectedItems([])
    if (e.target.value.length > 2) {
      setPageParam(1);
    }

    if (current.timer) clearTimeout(current.timer);
    current.timer = setTimeout(() => {
      getRepairList(e.target.value ? encodeURIComponent(e.target.value) : "");
    }, 1000);
  }
  async function getGridParamsArray(selecteList: any, key: string) {
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

  function clearSearch() {
    setSearchValue("");
    setShowNoData(false);
    setRepairList([]);
    setListCount(0);
  }
  // function selectAllCheckBox(e: any) {
  //  //to remove duplicates before pushing total
  //  for (let i = 0; i < repairList.length; i++) {
  //    for (let j = 0; j < selectItems.length; j++) {
  //      if (repairList[i].id === selectItems[j].id) {
  //        selectItems.splice(j, 1)
  //      }
  //    }
  //  }

  //  repairList.forEach((obj: any) => {
  //    obj.isChecked = e.target.checked
  //  })

  //  repairList.map((obj: any) => {
  //    if (obj.isChecked) {
  //      selectItems.push(obj)
  //      setSelectedItems([...selectItems])
  //    }
  //  })
  //  console.log(selectItems)
  //  repairSelectAll = e.target.checked
  //  setRepairSelectAll(e.target.checked)
  //  getUpdatedSelectedList()
  // }
  function goToPartRepair() {
    // sendEventData({
    //  label: 'Add Part to Repair',
    //  title: 'Add',
    //  searchedValue: searchValue,
    // })
    setTabIndex(2);
  }
  function addPartToRepair() {
    formik.current.handleSubmit();
    if (!formik.current.isValid) {
      return;
    }
    setBtnLoading(true);
    const selectedIds: any = [];
    selectItems.map((ele: any) => {
      if (ele.isChecked) {
        const obj = {
          products_id: ele.id,
          manufacturer_id: ele.manufacturer_id,
          quantity: ele.quantity,
          customer_po: ele.customer_po,
        };
        selectedIds.push(obj);
      }
      return true;
    });

    const params = {
      repairs_id: id,
      selected_items: selectedIds,
    };
    const apiObject = {
      payload: params,
      method: "POST",
      apiUrl: `${EndpointUrl.repairItems}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success) {
          setServerMsg(null);
          sendEventData({
            success: true,
            msg: "Added Successfully",
          });
        } else {
          setServerMsg(response.result.data);
        }
        setBtnLoading(false);
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  function getUpdatedSelectedList() {
    let list: any = [];
    list = selectItems.filter((e: any) => e.isChecked);
    setUpdatedSelectedList(list);
    // console.log(updatedSelectedList)
  }
  const selectCheckBoxes = (e: any, item: any) => {
    console.log(item);
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
    console.log(selectItems);
    setSelectedItems(selectItems);

    // checkbox bind functionality
    let list: any = [];
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
  const onPageChange = (e: any) => {
    setLoading(true);
    setPageParam(e);
    setTimeout(() => {
      getRepairList();
    }, 500);
  };
  // const selectedItemsAllCheckBox = (e: any) => {
  //  selectItems.forEach((obj: any) => {
  //    obj.isChecked = e.target.checked
  //  })
  //  setSelectedItems(selectItems)
  //  selectedItemsSelctAll = e.target.checked
  //  setSelectedItemsSelctAll(selectedItemsSelctAll)
  //  console.log(selectItems)

  //  getUpdatedSelectedList()
  // }
  const selectedItemCheckBoxes = (e: any, item: any) => {
    let items: any = [];
    items = selectItems.map((obj: any) => {
      if (obj.id === item.id) {
        if (e.target.checked) {
          obj.isChecked = true;
        } else {
          obj.isChecked = false;
        }
      }
      return obj;
    });
    setSelectedItems(items);
    getUpdatedSelectedList();
  };

  const [formikData, setFormikData]: any = useState();
  const triggerEvent = (e: any) => {
    setFormikData(e);
  };
  async function addNewPart() {
    let data: any;
    if (formikData) {
      formikData.current.handleSubmit();
      if (formikData.current.isValid) {
        const selectedIds: any = [];
        selectItems.map((ele: any) => {
          if (ele.isChecked) {
            const obj = {
              products_id: ele.id,
              manufacturer_id: ele.manufacturer_id,
            };
            selectedIds.push(obj);
            // formikData.current.values.custom_part_items.push(obj)
          }
          return true;
        });
        setBtnLoading(true);
        data = await addNewpartData(formikData.current, id);
        console.log(data);
        setBtnLoading(false);
      }
    }
    if (selectItems.length) {
      if (formikData && !formikData.current.isValid && tabIndex === 2) {
        return;
      }
      addPartToRepair();
    } else if (
      formikData &&
      formikData.current.isValid &&
      data.success === true
    ) {
      sendEventData({
        success: true,
        msg: "Added Successfully",
      });
    } else {
      setServerMsg(data ? data.data : "");
    }
  }

  const [customerName, setCustomerName]: any = useState([]);
  const onChangeVendor = async (e: any) => {
    setPageParam(1);
    if (e.length) {
      // const indx = e.length - 1
      // let obj: any = { value: e[indx].value, label: e[indx].name }
      // customerName.push(obj)
      // setCustomerName([...customerName])
      let names = [];
      names = e.map((item: any) => ({
        ...item,
        label: item.name,
        value: item.id,
      }));
      setCustomerName([...names]);
    } else {
      setCustomerName([]);
    }
    vendorIdParams.current = await getGridParamsArray(e, "manufacturer_id");
    getRepairList();
  };
  function handleSubmit() {}
  function handleRef(e: any) {
    formik.current = e;
  }
  const serialNoChange = (e: ChangeEvent<HTMLInputElement>, indx: number) => {
    repairList[indx].quantity = e.target.value;
    setRepairList([...repairList]);
    if (selectItems.length && selectItems[indx] > -1) {
      selectItems[indx].quantity = e.target.value;
      setSelectedItems([...selectItems]);
    }
  };
  const customerPo = (e: ChangeEvent<HTMLInputElement>, indx: number) => {
    repairList[indx].customer_po = e.target.value;
    setRepairList([...repairList]);
    if (selectItems.length && selectItems[indx] > -1) {
      selectItems[indx].customer_po = e.target.value;
      setSelectedItems([...selectItems]);
    }
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
          resolve(getFilterSupplierData(inputValue, EndpointUrl.RepairVendors));
        }
      }, 1000);
    });
  return (
    <>
      {tabIndex !== 2 && (
        <SideDrawerSearch>
          <Width50
            className="d-flex-row-gap pb-10px  pi-select-wrapper"
            style={{ rowGap: "0" }}
          >
            {/* <PiSelect
              label="Select Manufacturer"
              libraryType="atalskit"
              name="select"
              onChange={(e: any) => onChangeVendor(e)}
              classNamePrefix={
                customerName && customerName.length > 1
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
              onChange={onChangeVendor}
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
        style={{ paddingRight: "0px" }}
        className={btnLoading ? "opacity-on-load" : ""}
      >
        <TabParentDiv>
          <PiTabGroup
            id="tab"
            onChange={(e: any) => tabChange(e)}
            selected={tabIndex}
          >
            <PiTabHeaderPanel>
              <PiTabHeader>
                Search Result(
                {listColunt})
              </PiTabHeader>
              <PiTabHeader>
                Selected Items
                {updatedSelectedList.length > 0 && (
                  <span>({updatedSelectedList.length})</span>
                )}
              </PiTabHeader>
              <PiTabHeader>Add New Items</PiTabHeader>
            </PiTabHeaderPanel>
            <PiTabPanel>
              <Formik
                validationSchema={validationSchema}
                onSubmit={() => handleSubmit()}
                initialValues={initialValues}
                innerRef={(e: any) => handleRef(e)}
              >
                {() => (
                  <RepairCardBody
                    style={{ height: "100%", position: "relative" }}
                  >
                    <RepairItemsRowRow className="repair_header">
                      <RepairItemsColumn className="checkbox">
                        {/* <PiCheckbox
                    helpText=""
                    libraryType="atalskit"
                    name="checkbox"
                    onChange={selectAllCheckBox}
                    size="large"
                    isChecked={repairSelectAll}
                    isDisabled={repairList.length === 0 ? true : false}
                  /> */}
                      </RepairItemsColumn>
                      <RepairItemsColumn
                        className="header-label min-width-180"
                        style={{ textAlign: "left" }}
                      >
                        Part Number
                      </RepairItemsColumn>
                      <RepairItemsColumn className="header-label flexed min-width">
                        Description
                      </RepairItemsColumn>
                      <RepairItemsColumn className="header-label">
                        Manufacturer
                      </RepairItemsColumn>
                      <RepairItemsColumn className="header-label">
                        Quantity
                      </RepairItemsColumn>
                      <RepairItemsColumn className="header-label">
                        Customer PO
                      </RepairItemsColumn>
                    </RepairItemsRowRow>

                    {repairList.length > 0 && (
                      <TableDataScroll>
                        {!loading &&
                          repairList.map((obj: any, index: number) => (
                            <RepairItemsRowRow
                              className="data repair_grid "
                              key={obj.id}
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
                                title={obj.name}
                                className="text-ellipsis min-width-180"
                                style={{ textAlign: "left" }}
                              >
                                {obj.name}
                              </RepairItemsColumn>
                              <RepairItemsColumn
                                title={obj.description}
                                className="line-clamp three-lines flexed min-width"
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
                              <RepairItemsColumn
                                style={{ width: "min-content" }}
                              >
                                <div className="input-field">
                                  <PiInputForm
                                    name={`customer_po${index}`}
                                    libraryType="atalskit"
                                    type="string"
                                    placeholder="Customer PO"
                                    onChange={(e) => customerPo(e, index)}
                                    maxLength={15}
                                  />
                                </div>
                              </RepairItemsColumn>
                            </RepairItemsRowRow>
                          ))}
                      </TableDataScroll>
                    )}
                    {!listColunt && !loading && (
                      <NoUserFound> Items Not Found</NoUserFound>
                    )}
                    {(loading || btnLoading) && (
                      <SelectItemsSpinner style={{ position: "absolute" }}>
                        <PiSpinner
                          color="primary"
                          size={50}
                          libraryType="atalskit"
                        />
                      </SelectItemsSpinner>
                    )}
                  </RepairCardBody>
                )}
              </Formik>
            </PiTabPanel>
            <PiTabPanel>
              <RepairCardBody style={{ height: "100%" }}>
                <RepairItemsRowRow className="repair_header">
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
                  <RepairItemsColumn className="header-label flexed min-width">
                    Description
                  </RepairItemsColumn>
                  <RepairItemsColumn className="header-label">
                    Manufacturer
                  </RepairItemsColumn>
                  <RepairItemsColumn className="header-label">
                    Quantity
                  </RepairItemsColumn>
                  <RepairItemsColumn className="header-label">
                    Customer PO
                  </RepairItemsColumn>
                </RepairItemsRowRow>
                <div>
                  {selectItems.length > 0 &&
                    selectItems.map((obj: any, index: number) => (
                      <RepairItemsRowRow
                        className="data repair_grid"
                        key={obj.id}
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
                          title={obj.name}
                          className="text-ellipsis min-width-180"
                          style={{ textAlign: "left" }}
                        >
                          {obj.name}
                        </RepairItemsColumn>
                        <RepairItemsColumn
                          title={obj.description}
                          className="line-clamp three-lines flexed min-width"
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
                          className="text-ellipsis"
                          title={obj.quantity ? obj.quantity : "-"}
                        >
                          {obj.quantity ? obj.quantity : "-"}
                        </RepairItemsColumn>
                        <RepairItemsColumn
                          className="text-ellipsis"
                          title={obj.customer_po ? obj.customer_po : "-"}
                        >
                          {obj.customer_po ? obj.customer_po : "-"}
                        </RepairItemsColumn>
                      </RepairItemsRowRow>
                    ))}
                </div>
                {selectItems.length === 0 && !loading && (
                  <NoUserFound> Items Not Found</NoUserFound>
                )}
              </RepairCardBody>
            </PiTabPanel>
            <PiTabPanel>
              <AddNewPart from="repairs" sendData={triggerEvent} />
            </PiTabPanel>
          </PiTabGroup>
        </TabParentDiv>
      </FormBodyOverFlow>
      <PaginationWrapper className={btnLoading ? "opacity-on-load" : ""}>
        {listColunt > 0 && tabIndex === 0 && (
          <PiPagination
            onChange={onPageChange}
            pages={Math.ceil(listColunt / 25)}
            selectedIndex={pageParam - 1}
          />
        )}
        {/* {selectItems.length > 0 && tabIndex === 1 && (
          <PiPagination
            onChange={onPageChange}
            pages={Math.ceil(selectItems.length / 25)}
            selectedIndex={pageParam - 1}
          />
        )} */}
      </PaginationWrapper>
      {showNoData && tabIndex !== 2 && (
        <NoItemsFound>
          <span className="first-msg">
            Cannot find the product you are looking for
          </span>
          <span
            className="second-msg"
            onClick={() => goToPartRepair()}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                goToPartRepair();
              }
            }}
            role="button"
            tabIndex={0}
          >
            ? Click here to add them
          </span>
        </NoItemsFound>
      )}
      <SideDrawerFooter>
        {serverMsg && (
          <div className="server-msg" title={serverMsg}>
            {serverMsg}
          </div>
        )}
        {tabIndex !== 2 && (
          <PiButton
            appearance="primary"
            label={
              updatedSelectedList.length > 0
                ? `Add Selected ${updatedSelectedList.length} Parts`
                : "Add Parts"
            }
            onClick={() => addNewPart()}
            isLoading={btnLoading}
            isDisabled={updatedSelectedList.length === 0}
          />
        )}
        {tabIndex === 2 && (
          <PiButton
            appearance="primary"
            label="Add New Part"
            onClick={() => addNewPart()}
            isLoading={btnLoading}
            // isDisabled={disableSave}
          />
        )}
      </SideDrawerFooter>
    </>
  );
}

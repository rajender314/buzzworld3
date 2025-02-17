import { AsyncSelect } from "@atlaskit/select";
import { useEffect, useRef, useState } from "react";
import {
  AsyncLabel,
  CmpanyOptionDiv,
} from "@app/components/rmaModel/RmaModel.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse, FilterColumnProps } from "@app/services/schema/schema";
import { PiButton } from "pixel-kit";
import { SideDrawerFooter } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import { filterSupplierData } from "@app/helpers/helpers";
import DatePicker from "react-datepicker";
import moment from "moment";
import {
  DateRangePickerDiv,
  SpFilterPanelDiv,
} from "./sp-left-filter.component";

export default function SpLeftFilter({
  locationData,
  tabIndex,
  sendData,
}: any) {
  const { current }: any = useRef({ timer: 0 });
  const [customerName, setCustomerName]: any = useState();
  const [selectedSupplier, setSelectedSupplier]: any = useState([]);
  const [disableApplyBtn, setDisableApplyBtn] = useState(false);
  const [selectedStock, setSelectedStock]: any = useState();
  const [dateRange, setDateRange]: any = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [filterParams, setFilterParams]: any = useState({});

  useEffect(() => {
    setDisableApplyBtn(tabIndex.tabIndex !== 0);
  }, [tabIndex]);

  const prefillConfigureData = (location_state: any) => {
    console.log(location_state);
    setDateRange([
      new Date(location_state.start_date),
      new Date(location_state.end_date),
    ]);
    const customer_name = {
      value: location_state.organizations_id,
      label: location_state.organizations_label,
    };
    setCustomerName(customer_name);
    const supplierArr: any = [];
    const uniqueIds: any = [];

    let productsArr: any = [];
    location_state.sp_data.map((obj: any) => {
      supplierArr.push(obj.supplier);
      productsArr = obj.items;
      return obj;
    });
    const unique = supplierArr.filter((ele: any) => {
      const isDuplicate = uniqueIds.includes(ele.value);
      if (!isDuplicate) {
        uniqueIds.push(ele.value);

        return true;
      }
      return false;
    });
    const selected_supplier = unique;
    setSelectedSupplier(selected_supplier);
    setSelectedStock(productsArr);
    const fltr_params = {
      vendor_id: selected_supplier,
      product_ids: productsArr,
      orgId: location_state.organizations_id,
      start_date: location_state.start_date
        ? moment(location_state.start_date).format("YYYY-MM-DD")
        : "",
      end_date: location_state.end_date
        ? moment(location_state.end_date).format("YYYY-MM-DD")
        : "",
    };
    setFilterParams(fltr_params);
    sendData(fltr_params);
  };

  useEffect(() => {
    (async () => {
      const location_state = locationData.state;
      if (locationData.state) {
        prefillConfigureData(location_state);
      }
    })();
  }, [locationData.state]);
  const filterCustomerData = async (inputValue: string, flag: string) => {
    let options: any = [];
    // setstockCodeList([])
    if (inputValue.length >= 3) {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl:
          flag === "organisations"
            ? `${EndpointUrl.SPOrgData}?search=${inputValue}`
            : `${EndpointUrl.SPItems}?search=${inputValue}&vendor_id=${filterParams.vendor_id}`,
        headers: {},
      };
      await triggerApi(apiObject)
        .then((response: any) => {
          if (response.result.success) {
            let arr = [];
            const list = response.result.data.list
              ? response.result.data.list
              : response.result.data;
            arr = list.map((item: FilterColumnProps) => ({
              value: item.id,
              // label: item.name,
              label: (
                <CmpanyOptionDiv>
                  <div>
                    <div className="cmpny_name">{item.name}</div>
                    <div className="account_no">
                      {item.account_number ? item.account_number : "--"}
                    </div>
                  </div>
                  <div className="cmpny_address">{item.address1}</div>
                </CmpanyOptionDiv>
              ),
              ...item,
            }));
            options = arr;
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
      return options;
    }
    return options;
  };
  const promiseOptions = (inputValue: string) =>
    new Promise((resolve) => {
      if (current.timer) clearTimeout(current.timer);
      current.timer = setTimeout(() => {
        resolve(filterCustomerData(inputValue, "organisations"));
      }, 1000);
    });
  const filterStockCodeData = async (inputValue: string) => {
    let options: any = [];
    if (inputValue.length >= 3) {
      const params = {
        status: true,
        is_add_row: false,
        // sp_data: spData,
        vendor_id: filterParams.vendor_id,
        type: "specification",
        item_search: inputValue,
      };
      const apiObject = {
        payload: params,
        method: "POST",
        apiUrl: `${EndpointUrl.SPItems}`,
        headers: {},
      };
      await triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            let arr = [];
            const { list } = response.result.data;

            arr = list.map((item: FilterColumnProps) => ({
              value: item.id,
              label: item.name,
              ...item,
            }));
            options = arr;
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
      return options;
    }
    return options;
  };
  const promiseStockCodeOptions = (inputValue: string) =>
    new Promise((resolve) => {
      if (current.timer) clearTimeout(current.timer);
      current.timer = setTimeout(() => {
        resolve(filterStockCodeData(inputValue));
      }, 1000);
    });

  const handleInputChange = (newValue: string) => newValue;

  const HandleChange = (value: any) => {
    console.log(value);
    if (value) {
      setCustomerName({ value: value.value, label: value.name });
    } else {
      setCustomerName("");
      const params = {
        vendor_id: selectedSupplier,
        product_ids: selectedStock,
        orgId: "",
        start_date: dateRange[0]
          ? moment(dateRange[0]).format("YYYY-MM-DD")
          : "",
        end_date: dateRange[1] ? moment(dateRange[1]).format("YYYY-MM-DD") : "",
      };
      setFilterParams(params);
      sendData(params);
    }
    const values = {
      ...filterParams,
      orgId: value ? value.id : null,
    };
    setFilterParams(values);
    // sendData(filterParams)
  };
  const HandleStockCodeChange = (value: any) => {
    if (value) {
      setSelectedStock(value);
    } else {
      setSelectedStock("");
    }
    const params = {
      ...filterParams,
      product_ids: value || null,
    };
    setFilterParams(params);
    // sendData(filterParams)
  };
  const onSupplierChange = (e: any) => {
    let list: any = [];
    if (e.length) {
      list = e.map((item: any) => ({
        ...item,
        label: item.name,
        value: item.value,
      }));
      setSelectedSupplier([...list]);
    } else {
      setSelectedSupplier(list);
    }

    setSelectedStock([]);
    const params = {
      ...filterParams,
      vendor_id: [...list],
    };
    setFilterParams(params);
  };

  // const minDate = new Date()

  const applyFilters = () => {
    sendData(filterParams);
  };
  const clearFilters = async () => {
    setCustomerName("");
    setDateRange([null, null]);
    setSelectedSupplier("");
    setSelectedStock("");
    const params = {
      vendor_id: null,
      product_ids: null,
      orgId: "",
      start_date: "",
      end_date: "",
    };
    setFilterParams(params);
    sendData(params);
  };

  const onDateRangeChanged = (update: any) => {
    console.log(update);
    setDateRange(update);
    const params = {
      ...filterParams,
      start_date: update[0] ? moment(update[0]).format("YYYY-MM-DD") : "",
      end_date: update[1] ? moment(update[1]).format("YYYY-MM-DD") : "",
    };
    setFilterParams(params);
  };

  const handleOrgInputChange = (newValue: string) => newValue;

  const promiseSupplierOptions = (inputValue: string, flag: string) =>
    new Promise((resolve) => {
      if (current.timer) clearTimeout(current.timer);
      current.timer = setTimeout(() => {
        if (flag === "supplierlist") {
          resolve(filterSupplierData(inputValue));
        }
      }, 1000);
    });

  return (
    <>
      <SpFilterPanelDiv>
        <div>
          <AsyncLabel htmlFor="async-select-example">Customer Name</AsyncLabel>
          <AsyncSelect
            name="customer_id"
            inputId="async-select-example"
            classNamePrefix="react-select"
            onInputChange={handleInputChange}
            loadOptions={promiseOptions}
            placeholder="Search"
            onChange={(value) => {
              HandleChange(value);
            }}
            value={customerName}
            isClearable
            noOptionsMessage={(obj: any) =>
              obj.inputValue
                ? "Customer Name Not Found"
                : "Search Customer Name"
            }
          />
        </div>

        <div className="pi-select-wrapper">
          {/* <PiSelect
            name="manufacturer_discount_id"
            label="Supplier"
            placeholder="Supplier"
            isMulti={true}
            options={suppliersList}
            onChange={onSupplierChange}
            value={selectedSupplier}
            classNamePrefix={`${
              selectedSupplier.length > 1
                ? 'drop-height-60px multi-select react-select-input'
                : ' react-select'
            }`}
          /> */}
          <AsyncLabel htmlFor="async-select-example" className="css-re7y6x">
            Supplier
          </AsyncLabel>
          <AsyncSelect
            name="supplier"
            inputId="async-select-example"
            onInputChange={handleOrgInputChange}
            loadOptions={(e: any) => promiseSupplierOptions(e, "supplierlist")}
            placeholder="Search"
            classNamePrefix={`${selectedSupplier.length > 1 ? "drop-height-80px multi-select react-select" : "drop-height-80px multi-select react-select"}`}
            // onChange={(value) => {
            //  setFieldValue(`organizations_id`, value)
            //  HandleChange(value)
            // }}
            value={selectedSupplier}
            onChange={onSupplierChange}
            isClearable
            isMulti
            noOptionsMessage={(obj: any) =>
              obj.inputValue ? "Supplier Not Found" : "Search Supplier"
            }
          />
        </div>
        <DateRangePickerDiv>
          <AsyncLabel htmlFor="async-select-example">Date Range</AsyncLabel>
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={onDateRangeChanged}
            placeholderText="Start & End Date"
            className="date-range-input multi-select"
            // minDate={minDate}
            isClearable
          />
        </DateRangePickerDiv>
        <div
          style={{ marginTop: "6px" }}
          className="reduce-select-dropdown-height"
        >
          <AsyncLabel htmlFor="async-select-example">Stock Code</AsyncLabel>
          <AsyncSelect
            name="customer_id"
            inputId="async-select-example"
            classNamePrefix={
              selectedStock && selectedStock.length >= 1
                ? "drop-height-60px multi-select react-select-input"
                : "react-select"
            }
            className={selectedSupplier.length === 0 ? "opacity-on-load" : ""}
            onInputChange={handleInputChange}
            loadOptions={promiseStockCodeOptions}
            placeholder="Search"
            onChange={(value) => {
              HandleStockCodeChange(value);
            }}
            value={selectedStock}
            isClearable
            isMulti
            isDisabled={selectedSupplier.length === 0}
          />
        </div>
      </SpFilterPanelDiv>
      <SideDrawerFooter className="sp-filter-footer-btns">
        <PiButton
          appearance="secondary"
          label="Cancel"
          onClick={clearFilters}
        />
        <PiButton
          appearance="primary"
          isDisabled={
            !!(
              (!customerName && disableApplyBtn) ||
              (selectedSupplier.length === 0 &&
                selectedSupplier.length === 0 &&
                !customerName &&
                !filterParams.start_date &&
                !filterParams.end_date)
            )
          }
          label="Apply"
          onClick={applyFilters}
        />
      </SideDrawerFooter>
    </>
  );
}

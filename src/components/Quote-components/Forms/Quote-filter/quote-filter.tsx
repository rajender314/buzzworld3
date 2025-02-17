import { AsyncSelect } from "@atlaskit/select";
import {
  PiSideDrawer,
  PiTypography,
  PiSpinner,
  PiButton,
  PiCheckBoxSelect,
} from "pixel-kit";
import { useEffect, useRef, useState } from "react";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import {
  AsyncSelectDiv,
  SideDrawerFooter,
} from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import {
  AsyncLabel,
  CmpanyOptionDiv,
} from "@app/components/rmaModel/RmaModel.component";
import FilterIcon from "@app/assets/images/new_filter_icon.svg";
import CrossLogo from "@app/assets/images/cross.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse, FilterColumnProps } from "@app/services/schema/schema";
import FilterFieldsContainer from "@app/components/Repair-Components/repair-list-filter/repair-list.component";
import { getUserLoggedPermission } from "@app/helpers/helpers";
import {
  QuotePopupHeaderContainer,
  Width100,
} from "../PartQuote/part-quote.component";

export default function QuoteFilter({
  requestInfo,
  sendModelData,
  quoteType,
}: any) {
  const [openModel, setOpenModel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [serverMsg, setServerMsg] = useState("");
  const [customerName, setCustomerName]: any = useState([]);
  const [salePersonData, setSalePersonData]: any = useState([]);
  const [statusData, setStatusData]: any = useState([]);
  const [quotedBy, setQuotedBy]: any = useState([]);
  const [quoteItems, setQuoteItems] = useState([]);
  const [selectedSalesPerson, setSelectedSalesPerson]: any = useState([]);
  const [selectedStatus, setSelectedStatus]: any = useState([]);
  const [selectedQuotedBy, setSelectedQuotedBy]: any = useState([]);
  const { current }: any = useRef({ timer: 0 });
  function getGridFilterList() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.filterDataApi}?name=${"quote_for_parts"}`,
      headers: {},
    };

    triggerApi(apiObject).then(async (response: ApiResponse) => {
      if (response.result.success) {
        setLoading(false);
        const { data } = response.result;
        data.filters.owner_name = data.filters.owner_name.map((item: any) => ({
          value: item.id,
          label: item.name,
          ...item,
        }));
        setSalePersonData(data.filters.owner_name);
        data.filters.status = data.filters.status.map((item: any) => ({
          value: item.id,
          label: item.name,
          ...item,
        }));
        setStatusData(data.filters.status);
        data.filters.quoted_by = data.filters.quoted_by.map((item: any) => ({
          value: item.id,
          label: item.name,
          ...item,
        }));
        setQuotedBy(data.filters.quoted_by);
      }
    });
  }
  useEffect(() => {
    getGridFilterList();
    if (
      requestInfo &&
      requestInfo.body &&
      requestInfo.body.selectedCustomFilters
    ) {
      setCustomerName(
        requestInfo.body.selectedCustomFilters.customer_name
          ? requestInfo.body.selectedCustomFilters.customer_name
          : []
      );
      setQuoteItems(
        requestInfo.body.selectedCustomFilters.items
          ? requestInfo.body.selectedCustomFilters.items
          : []
      );
      setSelectedStatus(
        requestInfo.body.selectedCustomFilters.status
          ? requestInfo.body.selectedCustomFilters.status
          : []
      );
      setSelectedSalesPerson(
        requestInfo.body.selectedCustomFilters.owner_name
          ? requestInfo.body.selectedCustomFilters.owner_name
          : []
      );
      setSelectedQuotedBy(
        requestInfo.body.selectedCustomFilters.quoted_by
          ? requestInfo.body.selectedCustomFilters.quoted_by
          : []
      );
    }
  }, [requestInfo, quoteType]);

  useEffect(() => {
    setOpenModel(true);
  }, []);
  function closeModel() {
    setOpenModel(false);
    sendModelData({ success: false });
  }

  const filterVendorData = async (inputValue: string) => {
    let data: any = [];
    if (inputValue.length >= 3) {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.QuoteCustomerDropdown}?search=${inputValue}`,
        headers: {},
      };
      await triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            let arr = [];
            const list = response.result.data.list
              ? response.result.data.list
              : response.result.data;
            arr = list.map((item: FilterColumnProps) => ({
              value: item.id,
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
              // label: item.name,
              ...item,
            }));
            data = arr;
          }
        })
        .catch(() => {});
      return data;
    }
    return data;
  };

  const filterItemsData = async (inputValue: string) => {
    let data: any = [];
    if (inputValue.length >= 3) {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.QuoteItemsFilterSearch}?search=${inputValue}`,
        headers: {},
      };
      await triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            let arr = [];
            const list = response.result.data.list
              ? response.result.data.list
              : response.result.data;
            arr = list.map((item: FilterColumnProps) => ({
              value: item.vendor_stock_key,
              label: item.name,
              id: item.vendor_stock_key,
            }));
            data = arr;
          }
        })
        .catch(() => {});
      return data;
    }
    return data;
  };
  const promiseOptions = (inputValue: string) =>
    new Promise((resolve) => {
      if (inputValue.length >= 3) {
        if (current.timer) clearTimeout(current.timer);
        current.timer = setTimeout(() => {
          resolve(filterVendorData(inputValue));
        }, 1000);
      }
    });
  const handleInputChange = (newValue: string) => {
    if (newValue.length >= 3) {
      return newValue;
    }
    return newValue;
  };

  function onSalesPersonChange(e: any) {
    setSelectedSalesPerson(e);
  }
  function onStatusChange(e: any) {
    setSelectedStatus(e);
  }
  const HandleChange = (value: any) => {
    if (value.length) {
      // const indx = value.length - 1
      // const obj = {
      //  value: value[indx].value,
      //  label: value[indx].name,
      //  id: value[indx].value,
      //  name: value[indx].name,
      // }
      // customerName.push(obj)
      // setCustomerName([...customerName])
      let customerNameList: any = [];
      customerNameList = value.map((item: any) => ({
        ...item,
        label: item.name,
        value: item.id,
      }));
      setCustomerName([...customerNameList]);
    } else {
      setCustomerName([]);
    }
  };

  function applyFilters() {
    if (
      customerName.length === 0 &&
      quoteItems.length === 0 &&
      selectedStatus.length === 0 &&
      selectedSalesPerson.length === 0 &&
      selectedQuotedBy.length === 0 &&
      quoteItems.length === 0
    ) {
      setServerMsg("Please Select Filters");
      return null;
    }
    const obj = {
      success: true,
      selectedFilters: {
        customer_name: customerName,
        owner_name: selectedSalesPerson,
        status: selectedStatus,
        quoted_by: selectedQuotedBy,
        items: quoteItems,
      },
      section: "quote-filters",
    };
    sendModelData(obj);
    return true;
  }
  function resetFilters() {
    const obj = {
      success: true,
      selectedFilters: {
        customer_name: [],
        owner_name: [],
        status: [],
        quoted_by: [],
        quoteItems: [],
      },
      section: "quote-filters",
    };
    sendModelData(obj);
  }
  const onQuotedByChanged = (e: any) => {
    setSelectedQuotedBy(e);
  };
  const handleItemsInputChange = (newValue: any) => {
    if (newValue.length >= 3) {
      return newValue;
    }
    return newValue;
  };

  const promiseItemsOptions = (inputValue: string) =>
    new Promise((resolve) => {
      if (inputValue.length >= 3) {
        if (current.timer) clearTimeout(current.timer);
        current.timer = setTimeout(() => {
          resolve(
            filterItemsData(inputValue ? encodeURIComponent(inputValue) : "")
          );
        }, 1000);
      }
    });
  const HandleItemsChange = (value: any) => {
    if (value) {
      setQuoteItems(value);
    }
  };
  return (
    <PiSideDrawer isOpen={openModel} width="narrow">
      <SideDrawerContainer>
        <SideDrawerHeader>
          <QuotePopupHeaderContainer>
            <img src={FilterIcon} alt="loading" className="filter-img" />
            <PiTypography component="h3">Filters</PiTypography>
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
            <FormBodyOverFlow>
              <FilterFieldsContainer>
                {getUserLoggedPermission() && (
                  <Width100 className="d-flex-row-gap width-100 pi-select-wrapper">
                    <AsyncSelectDiv>
                      <AsyncLabel
                        htmlFor="async-select-example"
                        className="css-re7y6x"
                      >
                        Company Name
                      </AsyncLabel>
                      <AsyncSelect
                        name="customer_id"
                        inputId="async-select-example"
                        classNamePrefix={
                          customerName && customerName.length >= 1
                            ? "drop-height-80px multi-select react-select"
                            : "drop-height-80px multi-select react-select"
                        }
                        onInputChange={handleInputChange}
                        loadOptions={promiseOptions}
                        placeholder="Search By Company Name"
                        onChange={(value) => {
                          HandleChange(value);
                        }}
                        isClearable
                        noOptionsMessage={(obj: any) =>
                          !obj.inputValue
                            ? "Search Company Name"
                            : " Company Not Found"
                        }
                        value={customerName}
                        isMulti
                      />
                    </AsyncSelectDiv>
                  </Width100>
                )}
                <Width100>
                  <PiCheckBoxSelect
                    name="sales_person"
                    label="Sales Person"
                    placeholder="Select"
                    classNamePrefix="drop-height-80px multi-select react-select"
                    isMulti
                    options={salePersonData}
                    onChange={(e: any) => onSalesPersonChange(e)}
                    value={selectedSalesPerson}
                  />
                </Width100>
                {window.location.pathname !== "/quote_expired" &&
                  window.location.pathname !== "/quote_archived" && (
                    <Width100>
                      <PiCheckBoxSelect
                        name="status"
                        label="Status"
                        placeholder="Select"
                        classNamePrefix="drop-height-80px multi-select react-select"
                        isMulti
                        options={statusData}
                        onChange={(e: any) => onStatusChange(e)}
                        value={selectedStatus}
                      />
                    </Width100>
                  )}
                {quoteType !== "quoted_by" && (
                  <Width100>
                    <PiCheckBoxSelect
                      name="quoted_by"
                      label="Quoted By"
                      placeholder="Select"
                      classNamePrefix="drop-height-80px multi-select react-select"
                      isMulti
                      options={quotedBy}
                      onChange={(e: any) => onQuotedByChanged(e)}
                      value={selectedQuotedBy}
                    />
                  </Width100>
                )}
                <Width100 className="d-flex-row-gap width-100 pi-select-wrapper">
                  <AsyncSelectDiv>
                    <AsyncLabel
                      htmlFor="async-select-example"
                      className="css-re7y6x"
                    >
                      Items
                    </AsyncLabel>
                    <AsyncSelect
                      name="customer_id"
                      inputId="async-select-example"
                      classNamePrefix={
                        quoteItems && quoteItems.length >= 1
                          ? "drop-height-80px multi-select react-select"
                          : "drop-height-80px multi-select react-select"
                      }
                      onInputChange={handleItemsInputChange}
                      loadOptions={promiseItemsOptions}
                      placeholder="Search By Items"
                      onChange={(value) => {
                        HandleItemsChange(value);
                      }}
                      isClearable
                      noOptionsMessage={(obj: any) =>
                        !obj.inputValue ? "Search Item" : " Item Not Found"
                      }
                      value={quoteItems}
                      isMulti
                    />
                  </AsyncSelectDiv>
                </Width100>
              </FilterFieldsContainer>
            </FormBodyOverFlow>
            <SideDrawerFooter>
              {serverMsg &&
                customerName.length === 0 &&
                selectedStatus.length === 0 &&
                selectedSalesPerson.length === 0 && (
                  <small className="server-msg">{serverMsg}</small>
                )}
              <PiButton
                appearance="secondary"
                label="Close & Reset"
                onClick={() => resetFilters()}
                isDisabled={
                  !(
                    customerName.length > 0 ||
                    quoteItems.length > 0 ||
                    selectedStatus.length > 0 ||
                    selectedSalesPerson.length > 0 ||
                    selectedQuotedBy.length > 0
                  )
                }
              />
              <PiButton
                appearance="primary"
                label="Apply"
                onClick={() => applyFilters()}
                isDisabled={
                  !!(
                    customerName.length === 0 &&
                    quoteItems.length === 0 &&
                    selectedStatus.length === 0 &&
                    selectedSalesPerson.length === 0 &&
                    selectedQuotedBy.length === 0
                  )
                }
              />
            </SideDrawerFooter>
          </>
        )}
      </SideDrawerContainer>
    </PiSideDrawer>
  );
}

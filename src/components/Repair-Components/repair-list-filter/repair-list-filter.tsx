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
import {
  AsyncLabel,
  CmpanyOptionDiv,
} from "@app/components/rmaModel/RmaModel.component";
import CrossLogo from "@app/assets/images/cross.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { FilterColumnProps } from "@app/services/schema/schema";
import FilterIcon from "@app/assets/images/new_filter_icon.svg";
import { QuotePopupHeaderContainer } from "@app/components/Quote-components/Forms/PartQuote/part-quote.component";
import FilterFieldsContainer from "./repair-list.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "../selectItems/selectItemsModel/selectItem.component";
import { SideDrawerFooter } from "../selectItems/AddPartRepair/add-part-repair.component";
import { FormBodyOverFlow } from "../checksIns/assignLocation/assign-location.component";

export default function RepairFilterPanel({
  requestInfo,
  sendModelData,
  pageLabel,
}: any) {
  const [openModel, setOpenModel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [serverMsg, setServerMsg] = useState<string>("");
  const { current }: any = useRef({ timer: 0 });
  const [salePersonData, setSalePersonData]: any = useState([]);
  const [statusData, setStatusData]: any = useState([]);
  const [selectedSalesPerson, setSelectedSalesPerson]: any = useState([]);
  const [selectedStatus, setSelectedStatus]: any = useState([]);
  const [customerName, setCustomerName]: any = useState([]);
  const [isAllItemSDisplay, setIsAllItemsDisplay] = useState(true);
  const [showRmaStatus, setShowRmaStatus] = useState<boolean>(false);
  const [showTechnicianFilter, setShowTechnicianFilter] =
    useState<boolean>(false);
  useEffect(() => {
    if (pageLabel === "my_repairs" || pageLabel === "repair_request") {
      setShowRmaStatus(true);
    } else {
      setShowRmaStatus(false);
    }
    if (pageLabel === "my_repairs") {
      setShowTechnicianFilter(false);
    } else {
      setShowTechnicianFilter(true);
    }
  }, [pageLabel]);
  function getFilterData() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.filterDataApi}?name=repair_request`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success) {
          const { data } = response.result;
          data.filters.technician = data.filters.technician.map(
            (obj: FilterColumnProps) => ({
              value: obj.id,
              label: obj.name,
              ...obj,
            })
          );
          setSalePersonData(data.filters.technician);
          data.filters.status = data.filters.status.map(
            (obj: FilterColumnProps) => ({
              value: obj.id,
              label: obj.name,
              ...obj,
            })
          );
          setStatusData(data.filters.status);

          setLoading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  useEffect(() => {
    (async () => {
      setOpenModel(true);
      getFilterData();
      if (requestInfo && requestInfo.body.selectedCustomFilters) {
        setCustomerName(requestInfo.body.selectedCustomFilters.customer_name);
        setSelectedStatus(requestInfo.body.selectedCustomFilters.status);
        setSelectedSalesPerson(
          requestInfo.body.selectedCustomFilters.technician
        );
        setIsAllItemsDisplay(requestInfo.body.is_checked === "checked");
      }
    })();
  }, [requestInfo]);
  function closeModel() {
    setOpenModel(false);
    sendModelData({ success: false });
  }
  const filterCustomerData = async (inputValue: string) => {
    let data: any = [];
    if (inputValue.length >= 3) {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.customerDropdown}?search=${inputValue}`,
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
        .catch((err: string) => {
          console.log(err);
        });
      return data;
    }
    return data;
  };
  const promiseOptions = (inputValue: string) =>
    new Promise((resolve) => {
      if (current.timer) clearTimeout(current.timer);
      current.timer = setTimeout(() => {
        resolve(filterCustomerData(inputValue));
      }, 1000);
    });
  const handleInputChange = (newValue: string) => {
    console.log(newValue);
    return newValue;
  };

  const HandleChange = (value: any) => {
    console.log(value);
    if (value && value.length) {
      // const indx = value.length - 1
      // const obj = {
      //  value: value[indx].value,
      //  label: value[indx].name,
      //  id: value[indx].value,
      //  name: value[indx].name,
      // }
      // customerName.push(obj)
      // setCustomerName([...customerName])
      let Custname = [];
      Custname = value.map((item: any) => ({
        ...item,
        label: item.name,
        value: item.id,
      }));
      setCustomerName([...Custname]);
    } else {
      setCustomerName([]);
    }
  };

  function onSalesPersonChange(e: any) {
    setSelectedSalesPerson(e);
  }
  function onStatusChange(e: any) {
    setSelectedStatus(e);
  }
  function applyFilters() {
    if (
      customerName.length === 0 &&
      selectedStatus.length === 0 &&
      selectedSalesPerson.length === 0 &&
      !isAllItemSDisplay
    ) {
      setServerMsg("Please Select Filters");
      return null;
    }
    const obj = {
      success: true,
      selectedFilters: {
        customer_name: customerName,
        technician: selectedSalesPerson,
        status: selectedStatus,
      },
      section: "repair-filters",
      isAllItemSDisplay,
    };
    sendModelData(obj);
    return true;
  }
  function resetFilters() {
    const obj = {
      success: true,
      selectedFilters: {
        customer_name: [],
        technician: [],
        status: [],
      },
      section: "repair-filters",
      isAllItemSDisplay,
    };
    sendModelData(obj);
  }
  // const onNcrChanged = (e: any) => {
  //   // setIsAllItemsDisplay(e.target.checked);
  // };
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
                {/* <div>
                      <PiCheckbox
                        helpText=""
                        isChecked={isAllItemSDisplay}
                        label="Display All Items"
                        libraryType="atalskit"
                        name="display_all_items"
                        //value={field.value}
                        onChange={onNcrChanged}
                        size="medium"
                      />
                    </div> */}
                <div className="Discount-dropdown pi-select-wrapper">
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
                        : "react-select"
                    }
                    onInputChange={handleInputChange}
                    loadOptions={promiseOptions}
                    placeholder="Search"
                    onChange={(value) => {
                      HandleChange(value);
                    }}
                    value={customerName}
                    noOptionsMessage={(obj: any) =>
                      !obj.inputValue
                        ? "Search Company Name"
                        : " Company Not Found"
                    }
                    isClearable
                    isMulti
                  />
                </div>
                {showTechnicianFilter && (
                  <div>
                    <PiCheckBoxSelect
                      name="sales_person"
                      label="Technician"
                      placeholder="Select"
                      classNamePrefix="drop-height-80px multi-select react-select"
                      isMulti
                      options={salePersonData}
                      onChange={(e: any) => onSalesPersonChange(e)}
                      value={selectedSalesPerson}
                    />
                  </div>
                )}
                {showRmaStatus && (
                  <div>
                    <PiCheckBoxSelect
                      name="status"
                      label="RMA Status"
                      placeholder="Select"
                      classNamePrefix="drop-height-80px multi-select react-select"
                      isMulti
                      options={statusData}
                      onChange={(e: any) => onStatusChange(e)}
                      value={selectedStatus}
                    />
                  </div>
                )}
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
                    isAllItemSDisplay ||
                    customerName.length > 0 ||
                    selectedStatus.length > 0 ||
                    selectedSalesPerson.length > 0
                  )
                }
              />
              <PiButton
                appearance="primary"
                label="Apply"
                onClick={() => applyFilters()}
                isDisabled={
                  !!(
                    !isAllItemSDisplay &&
                    customerName.length === 0 &&
                    selectedStatus.length === 0 &&
                    selectedSalesPerson.length === 0
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

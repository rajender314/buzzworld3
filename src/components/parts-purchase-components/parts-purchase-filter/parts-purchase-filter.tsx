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

import FilterIcon from "@app/assets/images/new_filter_icon.svg";
import CrossLogo from "@app/assets/images/cross.svg";

import FilterFieldsContainer from "@app/components/Repair-Components/repair-list-filter/repair-list.component";
import {
  QuotePopupHeaderContainer,
  Width100,
} from "@app/components/Quote-components/Forms/PartQuote/part-quote.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import { AsyncLabel } from "@app/components/rmaModel/RmaModel.component";
import { AsyncSelect } from "@atlaskit/select";

export default function PartsPurchaseFilter({
  requestInfo,
  sendModelData,
  pageLabel,
}: any) {
  const [statusOptions, setStatusOptions]: any = useState([]);
  const [urgencyOptions, setUrgencyOptions]: any = useState([]);
  const [requestedByOptions, setRequestedByOptions]: any = useState([]);
  const [selectedStatus, setSelectedStatus]: any = useState([]);
  const [selectedUrgency, setSelectedUrgency]: any = useState([]);
  const [selectedReqBy, setSelectedReqBy]: any = useState([]);
  const [selectedPartItems, setSelectedPartItems]: any = useState([]);
  const [opacity, setOpacity] = useState(false);
  const { current }: any = useRef({ timer: 0 });
  const [selectedVendors, setSelectedVendors]: any = useState([]);
  const [showRmaStatus, setShowRmaStatus] = useState<boolean>(false);
  function getGridFilterList() {
    setOpacity(true);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.filterDataApi}?name=${"parts_purchase"}`,
      headers: {},
    };

    triggerApi(apiObject).then(async (response: ApiResponse) => {
      if (response.result.success) {
        setStatusOptions(
          response.result.data.filters.status.map((item: any) => ({
            value: item.id,
            label: item.name,
            ...item,
          }))
        );
        setUrgencyOptions(
          response.result.data.filters.part_urgency.map((item: any) => ({
            value: item.id,
            label: item.name,
            ...item,
          }))
        );
        setRequestedByOptions(
          response.result.data.filters.technician_id.map((item: any) => ({
            value: item.id,
            label: item.name,
            ...item,
          }))
        );
        setOpacity(false);
      }
    });
  }
  useEffect(() => {
    getGridFilterList();
    if (pageLabel === "partspurchase") {
      setShowRmaStatus(true);
    } else {
      setShowRmaStatus(false);
    }
    if (
      requestInfo &&
      requestInfo.body &&
      requestInfo.body.selectedCustomFilters
    ) {
      setSelectedStatus(requestInfo.body.selectedCustomFilters.status);
      setSelectedUrgency(requestInfo.body.selectedCustomFilters.part_urgency);
      setSelectedReqBy(requestInfo.body.selectedCustomFilters.technician_id);
      setSelectedPartItems(requestInfo.body.selectedCustomFilters.part_number);
      setSelectedVendors(
        requestInfo.body.selectedCustomFilters.vendor_name || []
      );
    }
  }, [requestInfo]);

  function closeModel() {
    sendModelData({ success: false });
  }

  function onStatusChange(e: any) {
    setSelectedStatus(e);
  }
  function onRequestedChange(e: any) {
    setSelectedReqBy(e);
  }
  function onUrgencyChange(e: any) {
    setSelectedUrgency(e);
  }
  function applyFilters() {
    if (
      selectedStatus &&
      selectedStatus.length === 0 &&
      selectedUrgency &&
      selectedUrgency.length === 0 &&
      selectedReqBy &&
      selectedReqBy.length === 0 &&
      selectedPartItems &&
      selectedPartItems.length === 0 &&
      selectedVendors &&
      selectedVendors.length === 0
    ) {
      return null;
    }
    const obj = {
      success: true,
      selectedFilters: {
        status: selectedStatus && selectedStatus ? selectedStatus : [],
        part_urgency: selectedUrgency && selectedUrgency ? selectedUrgency : [],
        technician_id: selectedReqBy && selectedReqBy ? selectedReqBy : [],
        part_number:
          selectedPartItems && selectedPartItems ? selectedPartItems : [],
        vendor_name: selectedVendors && selectedVendors ? selectedVendors : [],
      },
      section: "purchase-filters",
    };
    sendModelData(obj);
    return obj;
  }
  function resetFilters() {
    const obj = {
      success: true,
      selectedFilters: {
        part_urgency: [],
        status: [],
        technician_id: [],
        part_number: [],
      },
      section: "purchase-filters",
    };
    sendModelData(obj);
  }
  const handlePartItemsInputChange = (newValue: any) => {
    if (newValue.length >= 3) {
      return newValue;
    }
    return newValue;
  };
  const filterPartItemsData = async (inputValue: string, flag: string) => {
    let data: any = [];
    if (inputValue.length >= 3) {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl:
          flag === "part_number"
            ? `${EndpointUrl.PartsPurchasePartnumberFilterSearch}?search=${inputValue}`
            : `${EndpointUrl.ppVendorList}?status=true&search=${inputValue}`,
        headers: {},
      };
      await triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            let arr = [];
            const list = response.result.data.list
              ? response.result.data.list
              : response.result.data;
            arr = list.map((item: any) => {
              if (flag === "part_number") {
                return {
                  id: item.value,
                  name: item.label,
                  ...item,
                };
              }
              return {
                value: item.id,
                label: item.name,
                ...item,
              };
            });
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
  const promisePartItemOptions = (inputValue: string, flag: string) =>
    new Promise((resolve) => {
      if (inputValue.length >= 3) {
        if (current.timer) clearTimeout(current.timer);
        current.timer = setTimeout(() => {
          resolve(filterPartItemsData(inputValue, flag));
        }, 1000);
      }
    });
  const HandlePartItemsChange = (value: any) => {
    if (value) {
      setSelectedPartItems(value);
    }
  };
  const HandleVendorChange = (value: any) => {
    if (value) {
      setSelectedVendors(value);
    }
  };
  return (
    <PiSideDrawer isOpen width="narrow">
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

        <>
          <FormBodyOverFlow className={opacity ? "opacity-on-load" : ""}>
            {opacity && (
              <SpinnerDiv style={{ position: "absolute", left: "50%" }}>
                <PiSpinner color="primary" size={50} libraryType="atalskit" />
              </SpinnerDiv>
            )}
            <FilterFieldsContainer>
              <Width100>
                <PiCheckBoxSelect
                  name="technician_id"
                  label="Technician"
                  placeholder="Select"
                  isMulti
                  options={requestedByOptions}
                  onChange={(e: any) => onRequestedChange(e)}
                  isClearable
                  classNamePrefix="drop-height-80px multi-select react-select"
                  libraryType="atalskit"
                  value={selectedReqBy}
                  isDisabled={opacity}
                />
              </Width100>
              {showRmaStatus && (
                <Width100>
                  <PiCheckBoxSelect
                    name="status"
                    label="Status"
                    placeholder="Select"
                    classNamePrefix="drop-height-80px multi-select react-select"
                    isMulti
                    options={statusOptions}
                    onChange={(e: any) => onStatusChange(e)}
                    value={selectedStatus}
                    isDisabled={opacity}
                  />
                </Width100>
              )}
              <Width100>
                <PiCheckBoxSelect
                  name="urgency"
                  label="Urgency"
                  placeholder="Select"
                  isMulti
                  options={urgencyOptions}
                  onChange={(e: any) => onUrgencyChange(e)}
                  value={selectedUrgency}
                  isDisabled={opacity}
                  classNamePrefix="drop-height-80px multi-select react-select"
                />
              </Width100>
              <Width100 className="pi-select-wrapper">
                <AsyncSelectDiv>
                  <AsyncLabel
                    htmlFor="async-select-example"
                    className="css-re7y6x"
                  >
                    Part Numbers
                  </AsyncLabel>
                  <AsyncSelect
                    name="part_number"
                    inputId="async-select-example"
                    classNamePrefix={
                      selectedPartItems && selectedPartItems.length >= 1
                        ? "drop-height-80px multi-select react-select"
                        : "drop-height-80px multi-select react-select"
                    }
                    onInputChange={handlePartItemsInputChange}
                    loadOptions={(value: string) =>
                      promisePartItemOptions(value, "part_number")
                    }
                    placeholder="Search By Part Number"
                    onChange={(value) => {
                      HandlePartItemsChange(value);
                    }}
                    isClearable
                    value={selectedPartItems}
                    isMulti
                    isDisabled={opacity}
                  />
                </AsyncSelectDiv>
              </Width100>
              <Width100 className="pi-select-wrapper">
                <AsyncSelectDiv>
                  <AsyncLabel
                    htmlFor="async-select-example"
                    className="css-re7y6x"
                  >
                    Vendors
                  </AsyncLabel>
                  <AsyncSelect
                    name="vendor_name"
                    inputId="async-select-example"
                    classNamePrefix={
                      selectedPartItems && selectedPartItems.length >= 1
                        ? "drop-height-80px multi-select react-select"
                        : "drop-height-80px multi-select react-select"
                    }
                    onInputChange={handlePartItemsInputChange}
                    loadOptions={(value: string) =>
                      promisePartItemOptions(value, "vendor_name")
                    }
                    placeholder="Search By Vendor"
                    onChange={(value) => {
                      HandleVendorChange(value);
                    }}
                    isClearable
                    value={selectedVendors}
                    isMulti
                    isDisabled={opacity}
                  />
                </AsyncSelectDiv>
              </Width100>
            </FilterFieldsContainer>
          </FormBodyOverFlow>
          <SideDrawerFooter>
            <PiButton
              appearance="secondary"
              label="Close & Reset"
              onClick={() => resetFilters()}
              isDisabled={
                !(
                  (selectedStatus && selectedStatus.length > 0) ||
                  (selectedUrgency && selectedUrgency.length > 0) ||
                  (selectedReqBy && selectedReqBy.length > 0) ||
                  (selectedPartItems && selectedPartItems.length > 0) ||
                  (selectedVendors && selectedVendors.length > 0)
                )
              }
            />
            <PiButton
              appearance="primary"
              label="Apply"
              onClick={() => applyFilters()}
              isDisabled={
                !(
                  (selectedStatus && selectedStatus.length > 0) ||
                  (selectedUrgency && selectedUrgency.length > 0) ||
                  (selectedReqBy && selectedReqBy.length > 0) ||
                  (selectedPartItems && selectedPartItems.length > 0) ||
                  (selectedVendors && selectedVendors.length > 0)
                )
              }
            />
          </SideDrawerFooter>
        </>
      </SideDrawerContainer>
    </PiSideDrawer>
  );
}

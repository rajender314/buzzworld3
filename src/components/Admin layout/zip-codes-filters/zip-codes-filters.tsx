import {
  PiSideDrawer,
  PiTypography,
  PiSpinner,
  PiButton,
  PiSelect,
} from "pixel-kit";
import { useEffect, useState } from "react";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import { SideDrawerFooter } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
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

export default function ZipCodesFilter({ requestInfo, sendModelData }: any) {
  const [salesManagerOptions, setSalesManagerOptions]: any = useState([]);
  const [salesPersonOptions, setSalesPersonOptions]: any = useState([]);
  const [statusOptions, setStatusOptions]: any = useState([]);

  //* selectedFilterValues*
  const [selectedSalesManager, setSelectedSalesManager]: any = useState([]);
  const [selectedSalesPerson, setSelectedSalesPerson]: any = useState([]);
  const [selectedStatus, setSelectedStatus]: any = useState([]);

  const [opacity, setOpacity] = useState(false);
  function getRegionsFilterList() {
    setOpacity(true);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.filterDataApi}?name=${"zipcodes"}`,
      headers: {},
    };

    triggerApi(apiObject).then(async (response: ApiResponse) => {
      if (response.result.success) {
        const { data } = response.result;

        setSalesManagerOptions(
          data && data.filters && data.filters.sales_manager_id
            ? data.filters.sales_manager_id.map((item: any) => ({
                value: item.id,
                label: item.name,
                ...item,
              }))
            : []
        );
        setSalesPersonOptions(
          data && data.filters && data.filters.sales_person_id
            ? data.filters.sales_person_id.map((item: any) => ({
                value: item.id,
                label: item.name,
                ...item,
              }))
            : []
        );
        setStatusOptions(
          data.filters.status.map((item: any) => ({
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
    getRegionsFilterList();

    if (
      requestInfo &&
      requestInfo.body &&
      requestInfo.body.selectedCustomFilters &&
      requestInfo.body.selectedCustomFilters
    ) {
      setSelectedSalesManager(
        requestInfo.body.selectedCustomFilters.sales_manager_id
          ? requestInfo.body.selectedCustomFilters.sales_manager_id
          : []
      );
      setSelectedSalesPerson(
        requestInfo.body.selectedCustomFilters.sales_person_id
          ? requestInfo.body.selectedCustomFilters.sales_person_id
          : []
      );
      setSelectedStatus(
        requestInfo.body.selectedCustomFilters.status
          ? requestInfo.body.selectedCustomFilters.status
          : []
      );
    }
  }, [requestInfo]);

  function closeModel() {
    sendModelData({ closeModel: true });
  }

  function onStatusChange(e: any) {
    setSelectedStatus(e);
  }

  function onSalesManagerChange(e: any) {
    setSelectedSalesManager(e);
  }
  function onSalesPersonChange(e: any) {
    setSelectedSalesPerson(e);
  }
  function applyFilters() {
    if (
      selectedStatus &&
      selectedStatus.length === 0 &&
      selectedSalesPerson &&
      selectedSalesPerson.length === 0 &&
      selectedSalesManager &&
      selectedSalesManager.length === 0
    ) {
      return null;
    }
    const obj = {
      selectedFilters: {
        sales_manager_id:
          selectedSalesManager && selectedSalesManager
            ? selectedSalesManager
            : [],
        sales_person_id:
          selectedSalesPerson && selectedSalesPerson ? selectedSalesPerson : [],
        status: selectedStatus && selectedStatus ? selectedStatus : [],
      },
      section: "zip-codes-filters",
    };
    sendModelData(obj);
    return true;
  }
  function resetFilters() {
    const obj = {
      selectedFilters: {
        status: [],
        sales_manager_id: [],
        sales_person_id: [],
      },
      filters: "zipcodeFilters",
    };
    sendModelData(obj);
  }

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
                <PiSelect
                  name="sales_manager"
                  label="Sales Manager"
                  placeholder="Select"
                  isMulti
                  options={salesManagerOptions}
                  value={selectedSalesManager}
                  isDisabled={opacity}
                  onChange={(e: any) => onSalesManagerChange(e)}
                  classNamePrefix="drop-height-80px multi-select react-select"
                />
              </Width100>

              <Width100>
                <PiSelect
                  name="sales_person"
                  label="Sales Person"
                  placeholder="Select"
                  isMulti
                  options={salesPersonOptions}
                  onChange={(e: any) => onSalesPersonChange(e)}
                  value={selectedSalesPerson}
                  isDisabled={opacity}
                  classNamePrefix="drop-height-80px multi-select react-select"
                />
              </Width100>

              <Width100>
                <PiSelect
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
            </FilterFieldsContainer>
          </FormBodyOverFlow>
          <SideDrawerFooter>
            <PiButton
              appearance="secondary"
              label="Close & Reset"
              onClick={() => resetFilters}
              isDisabled={
                !(
                  (selectedSalesManager && selectedSalesManager.length > 0) ||
                  (selectedSalesPerson && selectedSalesPerson.length > 0) ||
                  (selectedStatus && selectedStatus.length > 0)
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
                  (selectedSalesPerson && selectedSalesPerson.length > 0) ||
                  (selectedSalesManager && selectedSalesManager.length > 0)
                )
              }
            />
          </SideDrawerFooter>
        </>
      </SideDrawerContainer>
    </PiSideDrawer>
  );
}

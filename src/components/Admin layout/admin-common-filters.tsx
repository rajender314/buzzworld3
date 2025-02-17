import { PiSideDrawer, PiTypography, PiSelect, PiButton } from "pixel-kit";
import { useEffect, useState } from "react";
import FilterIcon from "@app/assets/images/new_filter_icon.svg";
import CrossLogo from "@app/assets/images/cross.svg";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import { FormBodyOverFlow } from "@app/components/parts-purchase-components/parts-purchase-form.tsx/parts-purchase-form-components";
import {
  QuotePopupHeaderContainer,
  Width100,
} from "@app/components/Quote-components/Forms/PartQuote/part-quote.component";
import FilterFieldsContainer from "@app/components/Repair-Components/repair-list-filter/repair-list.component";
import { SideDrawerFooter } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "../Repair-Components/selectItems/selectItemsModel/selectItem.component";

export default function AdminCommonFilters({
  requestInfo,
  sendModelData,
}: any) {
  const [selectedStatus, setSelectedStatus]: any = useState([]);

  useEffect(() => {
    if (
      requestInfo &&
      requestInfo.body &&
      requestInfo.body.selectedCustomFilters &&
      requestInfo.body.selectedCustomFilters
    ) {
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
  const statusOptions = [
    {
      id: "true",
      name: "Active",
      label: "Active",
      value: "true",
    },
    {
      id: "false",
      name: "InActive",
      label: "InActive",
      value: "false",
    },
  ];
  function onStatusChange(e: any) {
    setSelectedStatus(e);
  }
  function resetFilters() {
    const obj = {
      selectedFilters: {
        status: [],
        branch_id: [],
        sales_manager_id: [],
        sales_person_id: [],
      },
      filters: "statusFilters",
    };
    sendModelData(obj);
  }
  function applyFilters() {
    if (selectedStatus && selectedStatus.length === 0) {
      return null;
    }
    const obj = {
      selectedFilters: {
        status: selectedStatus && selectedStatus ? selectedStatus : [],
        sales_manager_id: [],
        sales_person_id: [],
        branch_id: [],
      },
      section: "statusFilters",
    };
    sendModelData(obj);
    return true;
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
          <FormBodyOverFlow>
            <FilterFieldsContainer style={{ paddingTop: "unset" }}>
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
                />
              </Width100>
            </FilterFieldsContainer>
          </FormBodyOverFlow>
          <SideDrawerFooter>
            <PiButton
              appearance="secondary"
              label="Close & Reset"
              onClick={() => resetFilters()}
              isDisabled={!(selectedStatus && selectedStatus.length > 0)}
            />
            <PiButton
              appearance="primary"
              label="Apply"
              onClick={() => applyFilters()}
              isDisabled={!(selectedStatus && selectedStatus.length > 0)}
            />
          </SideDrawerFooter>
        </>
      </SideDrawerContainer>
    </PiSideDrawer>
  );
}

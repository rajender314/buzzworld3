import {
  PiSideDrawer,
  PiTypography,
  PiSpinner,
  PiButton,
  PiCheckBoxSelect,
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

export default function PastDueInvoiceFilter({
  requestInfo,
  sendModelData,
}: any) {
  const [branchOptions, setBranchOptions]: any = useState([]);
  const [selectedBranch, setSelectedBranch]: any = useState([]);
  const [opacity, setOpacity] = useState(false);
  function getOrganizationsFilters() {
    setOpacity(true);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.filterDataApi}?name=${"past_due_invoices"}`,
      headers: {},
    };

    triggerApi(apiObject).then(async (response: ApiResponse) => {
      if (response.result.success) {
        const { data } = response.result;

        setBranchOptions(
          data &&
            data.filters.branches.map((item: any) => ({
              id: item.value,
              name: item.label,

              ...item,
            }))
        );
        setOpacity(false);
      }
    });
  }

  useEffect(() => {
    getOrganizationsFilters();

    if (
      requestInfo &&
      requestInfo.body &&
      requestInfo.body.selectedCustomFilters
    ) {
      setSelectedBranch(requestInfo.body.selectedCustomFilters.branch);
    }
  }, [requestInfo]);

  function closeModel() {
    sendModelData({ CloseModel: true });
  }

  function applyFilters() {
    if (selectedBranch && selectedBranch.length === 0) {
      return null;
    }
    const obj = {
      selectedFilters: {
        branch: selectedBranch && selectedBranch ? selectedBranch : [],
      },
      section: "organizations-filters",
    };
    sendModelData(obj);
    return obj;
  }
  function resetFilters() {
    const obj = {
      success: true,
      selectedFilters: {
        account_type: [],
        classification: [],
        industry: [],
        organization: [],
        branch: [],
      },
      section: "organizations-filters",
    };
    sendModelData(obj);
  }
  function onStatusChange(e: any) {
    setSelectedBranch(e);
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
                <PiCheckBoxSelect
                  name="branches"
                  label="Branches"
                  placeholder="Select"
                  classNamePrefix="drop-height-80px multi-select react-select"
                  isMulti
                  options={branchOptions}
                  onChange={(e: any) => onStatusChange(e)}
                  value={selectedBranch}
                  isDisabled={opacity}
                />
              </Width100>
            </FilterFieldsContainer>
          </FormBodyOverFlow>
          <SideDrawerFooter>
            <PiButton
              appearance="secondary"
              label="Close & Reset"
              onClick={() => resetFilters()}
              isDisabled={!(selectedBranch && selectedBranch.length > 0)}
            />
            <PiButton
              appearance="primary"
              label="Apply"
              onClick={() => applyFilters()}
              isDisabled={!(selectedBranch && selectedBranch.length > 0)}
            />
          </SideDrawerFooter>
        </>
      </SideDrawerContainer>
    </PiSideDrawer>
  );
}

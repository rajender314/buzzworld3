import {
  PiSideDrawer,
  PiTypography,
  PiSpinner,
  PiButton,
  PiSelect,
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

export default function OrganizationsFilter({
  requestInfo,
  sendModelData,
}: any) {
  const [accountTypeOptions, setAccountTypeOptions]: any = useState([]);
  const [classificationOptions, setClassificationOptions]: any = useState([]);
  const [industryOptions, setIndustryOptions]: any = useState([]);
  const [orgtypeOptions, setOrgtypeOptions]: any = useState([]);
  const [statusOptions, setStatusOptions]: any = useState([]);

  const [selectedAccountType, setSelectedAccountType]: any = useState([]);
  const [selectedClassification, setSelectedClassification]: any = useState([]);
  const [selectedndustry, setSelectedndustry]: any = useState([]);
  const [selectedOrgtype, setSelectedOrgtype]: any = useState([]);
  const [selectedStatus, setSelectedStatus]: any = useState([]);

  const [opacity, setOpacity] = useState(false);
  function getOrganizationsFilters() {
    setOpacity(true);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.filterDataApi}?name=${"organizations"}`,
      headers: {},
    };

    triggerApi(apiObject).then(async (response: ApiResponse) => {
      if (response.result.success) {
        const { data } = response.result;
        setAccountTypeOptions(
          data &&
            data.filters.account_type.map((item: any) => ({
              value: item.id,
              label: item.name,

              ...item,
            }))
        );
        setClassificationOptions(
          data &&
            data.filters.classification.map((item: any) => ({
              value: item.id,
              label: item.name,

              ...item,
            }))
        );
        setIndustryOptions(
          data &&
            data.filters.industry.map((item: any) => ({
              value: item.id,
              label: item.name,

              ...item,
            }))
        );
        setOrgtypeOptions(
          data &&
            data.filters.org_type.map((item: any) => ({
              value: item.id,
              label: item.name,

              ...item,
            }))
        );
        setStatusOptions(
          data &&
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
    getOrganizationsFilters();

    if (requestInfo && requestInfo.body.selectedCustomFilters) {
      setSelectedStatus(requestInfo.body.selectedCustomFilters.status);
      setSelectedAccountType(
        requestInfo.body.selectedCustomFilters.account_type
      );
      setSelectedClassification(
        requestInfo.body.selectedCustomFilters.classification
      );
      setSelectedndustry(requestInfo.body.selectedCustomFilters.industry);
      setSelectedOrgtype(requestInfo.body.selectedCustomFilters.org_type);
    }
  }, [requestInfo]);

  function closeModel() {
    sendModelData({ CloseModel: true });
  }

  function onclassificationChange(e: any) {
    setSelectedClassification(e);
  }
  function onAccountTypeChange(e: any) {
    setSelectedAccountType(e);
  }
  function onIndustryChange(e: any) {
    setSelectedndustry(e);
  }
  function onOrderTypeChange(e: any) {
    setSelectedOrgtype(e);
  }
  function applyFilters() {
    if (
      selectedAccountType &&
      selectedAccountType.length === 0 &&
      selectedClassification &&
      selectedClassification.length === 0 &&
      selectedndustry &&
      selectedndustry.length === 0 &&
      selectedOrgtype &&
      selectedOrgtype.length === 0 &&
      selectedStatus &&
      selectedStatus.length === 0
    ) {
      return null;
    }
    const obj = {
      selectedFilters: {
        status: selectedStatus && selectedStatus ? selectedStatus : [],
        account_type:
          selectedAccountType && selectedAccountType ? selectedAccountType : [],
        classification:
          selectedClassification && selectedClassification
            ? selectedClassification
            : [],
        industry: selectedndustry && selectedndustry ? selectedndustry : [],
        org_type: selectedOrgtype && selectedOrgtype ? selectedOrgtype : [],
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
        status: [],
        classification: [],
        industry: [],
        org_type: [],
      },
      section: "organizations-filters",
    };
    sendModelData(obj);
  }
  function onStatusChange(e: any) {
    setSelectedStatus(e);
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
                  name="account_type"
                  label="Account type"
                  placeholder="Select"
                  isMulti
                  options={accountTypeOptions}
                  onChange={(e: any) => onAccountTypeChange(e)}
                  isClearable
                  classNamePrefix="drop-height-80px multi-select react-select"
                  libraryType="atalskit"
                  value={selectedAccountType}
                  isDisabled={opacity}
                />
              </Width100>
              <Width100>
                <PiCheckBoxSelect
                  name="classification"
                  label="Classification"
                  placeholder="Select"
                  classNamePrefix="drop-height-80px multi-select react-select"
                  isMulti
                  options={classificationOptions}
                  onChange={(e: any) => onclassificationChange(e)}
                  value={selectedClassification}
                  isDisabled={opacity}
                />
              </Width100>
              <Width100>
                <PiCheckBoxSelect
                  name="industry"
                  label="Industry"
                  placeholder="Select"
                  isMulti
                  options={industryOptions}
                  onChange={(e: any) => onIndustryChange(e)}
                  value={selectedndustry}
                  isDisabled={opacity}
                  classNamePrefix="drop-height-80px multi-select react-select"
                />
              </Width100>
              <Width100>
                <PiSelect
                  name="org_type"
                  label="Order Type"
                  placeholder="Select"
                  isMulti
                  options={orgtypeOptions}
                  onChange={(e: any) => onOrderTypeChange(e)}
                  value={selectedOrgtype}
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
              onClick={() => resetFilters()}
              isDisabled={
                !(
                  (selectedStatus && selectedStatus.length > 0) ||
                  (selectedAccountType && selectedAccountType.length > 0) ||
                  (selectedClassification &&
                    selectedClassification.length > 0) ||
                  (selectedndustry && selectedndustry.length > 0) ||
                  (selectedOrgtype && selectedOrgtype.length > 0)
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
                  (selectedAccountType && selectedAccountType.length > 0) ||
                  (selectedClassification &&
                    selectedClassification.length > 0) ||
                  (selectedndustry && selectedndustry.length > 0) ||
                  (selectedOrgtype && selectedOrgtype.length > 0)
                )
              }
            />
          </SideDrawerFooter>
        </>
      </SideDrawerContainer>
    </PiSideDrawer>
  );
}

import {
  PiSideDrawer,
  PiTypography,
  PiSpinner,
  PiButton,
  PiSelect,
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
import { ApiResponse, FilterColumnProps } from "@app/services/schema/schema";
import { AsyncSelect } from "@atlaskit/select";
import { AsyncLabel, CmpanyOptionDiv } from "../rmaModel/RmaModel.component";

export default function ContactsFilter({ requestInfo, sendModelData }: any) {
  const [statusOptions, setStatusOptions]: any = useState([]);
  const [selectedStatus, setSelectedStatus]: any = useState([]);
  const [opacity, setOpacity] = useState(false);
  const { current }: any = useRef({ timer: 0 });
  const [selectedOrgs, setSelectedOrgs]: any = useState([]);
  function getOrganizationsFilters() {
    setOpacity(true);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.filterDataApi}?name=${"contacts"}`,
      headers: {},
    };

    triggerApi(apiObject).then(async (response: ApiResponse) => {
      if (response.result.success) {
        const { data } = response.result;
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
      setSelectedOrgs(requestInfo.body.selectedCustomFilters.organization);
    }
  }, [requestInfo]);

  function closeModel() {
    sendModelData({ CloseModel: true });
  }

  function applyFilters() {
    if (
      selectedOrgs &&
      selectedOrgs.length === 0 &&
      selectedStatus &&
      selectedStatus.length === 0
    ) {
      return null;
    }
    const obj = {
      selectedFilters: {
        status: selectedStatus && selectedStatus ? selectedStatus : [],
        organization: selectedOrgs && selectedOrgs ? selectedOrgs : [],
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
        organization: [],
      },
      section: "organizations-filters",
    };
    sendModelData(obj);
  }
  function onStatusChange(e: any) {
    setSelectedStatus(e);
  }
  const handleItemsInputChange = (newValue: any) => {
    if (newValue.length >= 3) {
      return newValue;
    }
    return newValue;
  };

  const filterItemsData = async (inputValue: string) => {
    let options: any = [];
    if (inputValue.length >= 3) {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.ContactsOrg}?search=${inputValue}`,
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
  const promiseItemsOptions = (inputValue: string) =>
    new Promise((resolve) => {
      if (inputValue.length >= 3) {
        if (current.timer) clearTimeout(current.timer);
        current.timer = setTimeout(() => {
          resolve(filterItemsData(inputValue));
        }, 1000);
      }
    });
  const HandleItemsChange = (value: any) => {
    if (value.length) {
      const list = value.map((item: any) => ({
        ...item,
        label: item.name,
        value: item.id,
      }));
      setSelectedOrgs([...list]);
    } else {
      setSelectedOrgs([]);
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
              <Width100 className="d-flex-row-gap width-100 pi-select-wrapper">
                <AsyncSelectDiv>
                  <AsyncLabel
                    htmlFor="async-select-example"
                    className="css-re7y6x"
                  >
                    Organization
                  </AsyncLabel>
                  <AsyncSelect
                    name="customer_id"
                    inputId="async-select-example"
                    classNamePrefix={
                      selectedOrgs && selectedOrgs.length >= 1
                        ? "drop-height-80px multi-select react-select"
                        : "drop-height-80px multi-select react-select"
                    }
                    onInputChange={handleItemsInputChange}
                    loadOptions={promiseItemsOptions}
                    placeholder="Search By Organization Name"
                    onChange={(value) => {
                      HandleItemsChange(value);
                    }}
                    isClearable
                    noOptionsMessage={(obj: any) =>
                      !obj.inputValue
                        ? "Search Organization"
                        : " Organization Not Found"
                    }
                    value={selectedOrgs}
                    isMulti
                  />
                </AsyncSelectDiv>
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
                  (selectedOrgs && selectedOrgs.length > 0)
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
                  (selectedOrgs && selectedOrgs.length > 0)
                )
              }
            />
          </SideDrawerFooter>
        </>
      </SideDrawerContainer>
    </PiSideDrawer>
  );
}

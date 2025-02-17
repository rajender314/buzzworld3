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
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import FilterFieldsContainer from "@app/components/Repair-Components/repair-list-filter/repair-list.component";
import {
  QuotePopupHeaderContainer,
  Width100,
} from "../Quote-components/Forms/PartQuote/part-quote.component";

export default function PricingFilter({
  requestInfo,
  sendModelData,

  vid,
  vname,
  branchid,
  list,
}: any) {
  const [openModel, setOpenModel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [salePersonData, setSalePersonData]: any = useState([]);
  const [selectedSalesPerson, setSelectedSalesPerson]: any = useState([]);
  const [discountCodes, setDiscountCodes]: any = useState([]);
  const [selectedDiscountCodes, setSelectedDiscountCodes]: any = useState([]);
  // useEffect(() => {
  //   getGridFilterList();
  //   if (
  //     requestInfo &&
  //     requestInfo.body &&
  //     requestInfo.body.selectedCustomFilters
  //   ) {
  //     setSelectedSalesPerson(
  //       requestInfo.body.selectedCustomFilters.quantity
  //         ? requestInfo.body.selectedCustomFilters.quantity
  //         : []
  //     );
  //   }
  //   //console.log(requestInfo)
  // }, [requestInfo]);

  function getGridFilterList() {
    const apiObject = {
      payload: {},
      method: "GET",

      apiUrl: `${EndpointUrl.filterDataApi}?name=${list}&vendor_id=${vid}&vendor_name=${vname}&branch_id=${branchid ? branchid.id : ""}`,
      headers: {},
    };

    triggerApi(apiObject).then(async (response: ApiResponse) => {
      if (response.result.success) {
        setLoading(false);
        const { data } = response.result;
        if (data.filters.quantity) {
          data.filters.quantity = data.filters.quantity.map((item: any) => ({
            value: item.id,
            label: item.name,
            ...item,
          }));
        }
        setSalePersonData(data.filters.quantity);
        if (data.filters.discount_code) {
          data.filters.discount_code = data.filters.discount_code.map(
            (item: any) => ({
              value: item.id,
              label: item.name,
              ...item,
            })
          );
          setDiscountCodes(data.filters.discount_code);
        }
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
      setSelectedDiscountCodes(
        requestInfo.body.selectedCustomFilters.discount_code
          ? requestInfo.body.selectedCustomFilters.discount_code
          : []
      );
      setSelectedSalesPerson(
        requestInfo.body.selectedCustomFilters.quantity
          ? requestInfo.body.selectedCustomFilters.quantity
          : []
      );
    }
    // console.log(requestInfo)
  }, [requestInfo]);

  useEffect(() => {
    setOpenModel(true);
  }, []);
  function closeModel() {
    setOpenModel(false);
    sendModelData({ success: false });
  }

  function onSalesPersonChange(e: any) {
    setSelectedSalesPerson(e);
  }

  function applyFilters() {
    const obj = {
      success: true,
      selectedFilters: {
        quantity: selectedSalesPerson,
        discount_code: selectedDiscountCodes,
      },
      section: "pricing-filters",
    };
    sendModelData(obj);
  }
  function resetFilters() {
    const obj = {
      success: true,
      selectedFilters: {
        quantity: [],
        discount_code: [],
      },
      section: "pricing-filters",
    };
    sendModelData(obj);
  }
  const onDiscountChange = (e: any) => {
    setSelectedDiscountCodes(e);
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
                {list === "Discount_Codes" && (
                  <Width100>
                    <PiCheckBoxSelect
                      name="quantity"
                      label="PO Min Quantity"
                      placeholder="Select"
                      classNamePrefix="drop-height-80px multi-select react-select"
                      isMulti
                      options={salePersonData}
                      onChange={(e: any) => onSalesPersonChange(e)}
                      value={selectedSalesPerson}
                    />
                  </Width100>
                )}
                {list === "Pricing" && (
                  <Width100>
                    <PiCheckBoxSelect
                      name="discount_codes"
                      label="Discount Codes"
                      placeholder="Select"
                      classNamePrefix="drop-height-80px multi-select react-select"
                      isMulti
                      options={discountCodes}
                      onChange={(e: any) => onDiscountChange(e)}
                      value={selectedDiscountCodes}
                    />
                  </Width100>
                )}
              </FilterFieldsContainer>
            </FormBodyOverFlow>
            <SideDrawerFooter>
              <PiButton
                appearance="secondary"
                label="Close & Reset"
                onClick={() => resetFilters()}
                isDisabled={
                  !(
                    selectedSalesPerson.length > 0 ||
                    selectedDiscountCodes.length > 0
                  )
                }
              />
              <PiButton
                appearance="primary"
                label="Apply"
                onClick={() => applyFilters()}
                isDisabled={
                  !!(
                    selectedSalesPerson.length === 0 &&
                    selectedDiscountCodes.length === 0
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

import { PiButton, PiSelect, PiSideDrawer, PiTypography } from "pixel-kit";
import { useEffect, useState } from "react";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import CrossLogo from "@app/assets/images/cross.svg";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import { SideDrawerFooter } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import { RmaFields } from "@app/components/rmaModel/RmaModel.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
// import { useParams } from "react-router-dom";
// import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";
import { getUserLoggedPermission } from "@app/helpers/helpers";
import QuoteItemSelctionTab from "@app/components/Quote-components/Quote-detail-view-content/QuoteItems/quote-items-section-tab";
import { AddOptionsText, ThemeBlueText } from "./add-options.component";

export default function AddOptions({
  optionsList,
  quoteDetails,
  sendEventData,
}: any) {
  // const { id }: RouteParams = useParams();
  const [openSideDrawer, setSideDrawer] = useState(false);
  const [showItemsGrid, setShowItemsGrid] = useState(false);
  const [disableInputFields, setDisableInputFields] = useState(false);
  const [itemsApiParams, setItemsApiParams]: any = useState();
  const [serverMsg, setserverMsg]: any = useState(null);
  useEffect(() => {
    setSideDrawer(true);
    const itemsApi = {
      searchUrl: EndpointUrl.QuoteSearchItems,
      flag: "quote_options",
      submitUrl: EndpointUrl.QuoteOptions,
    };
    setItemsApiParams(itemsApi);
  }, []);

  function closeModel() {
    setSideDrawer(false);
    sendEventData({
      close: true,
    });
  }
  const [selectedOption, setSelectedOption]: any = useState();
  const newOptionName = "";
  const selectOption = (e: any) => {
    if (e) {
      setSelectedOption(e);
    } else {
      setSelectedOption(null);
    }
    const apiParams = {
      searchUrl: EndpointUrl.QuoteItems,
      flag: "quote_options_from_dropdown",
      option_id: e ? e.value : "",
      submitUrl: EndpointUrl.QuoteOptions,
    };
    setItemsApiParams({ ...apiParams });
    setShowItemsGrid(true);
  };
  // const changeOptionName = (e: any) => {
  //   console.log(e);
  //   setNewOptionName(e.target.value);
  // };
  function createNewOption() {
    const params = {
      quote_id: quoteDetails.id,
      is_duplicate: true,
      duplicate_option_id: selectedOption.id,
      option_name: newOptionName,
      customer_id: quoteDetails.customer_id,
    };
    const apiObject = {
      payload: params,
      method: "POST",
      apiUrl: `${EndpointUrl.QuoteOptions}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: any) => {
        if (response.result.success) {
          setserverMsg(null);
          setSideDrawer(false);
          sendEventData({
            success: true,
          });
        } else {
          setserverMsg(response.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  function triggerItemsEvent(e: any) {
    console.log(e);
    if (e.success) {
      setSideDrawer(false);
      sendEventData({
        success: true,
        data: e,
      });
    }
  }

  return (
    <PiSideDrawer isOpen={openSideDrawer} width="medium">
      <SideDrawerContainer>
        <SideDrawerHeader>
          <PiTypography component="h3">Add Option</PiTypography>
          <CloseButton
            onClick={() => closeModel()}
            title="close"
            className="Hover"
          >
            <img src={CrossLogo} alt="loading" />
          </CloseButton>
        </SideDrawerHeader>
        <>
          <FormBodyOverFlow
            className={showItemsGrid ? "flex-unset pb-zero overflow-unset" : ""}
          >
            <RmaFields>
              <div className="width-50">
                <PiSelect
                  label="Duplicate from"
                  libraryType="atalskit"
                  name="select"
                  className={disableInputFields ? "opacity-on-load" : ""}
                  onChange={selectOption}
                  options={optionsList}
                  placeholder="Select"
                  isDisabled={disableInputFields}
                  value={selectedOption}
                  // menuIsOpen
                  // isClearable
                />
              </div>
              {/* <div className="width-50">
                  <PiInput
                    label="Option name"
                    libraryType="atalskit"
                    name="input"
                    onChange={changeOptionName}
                    placeholder="Option name"
                    isDisabled={disableInputFields}
                  />
                </div> */}
            </RmaFields>
            <AddOptionsText>
              <PiTypography component="p">
                Selecting options will duplicate the products
              </PiTypography>
              {!showItemsGrid &&
                getUserLoggedPermission() &&
                !quoteDetails.is_repair && (
                  <ThemeBlueText
                    onClick={() => {
                      setShowItemsGrid(true);
                      setSelectedOption(null);
                      setDisableInputFields(true);
                    }}
                  >
                    <PiTypography component="p">
                      I want to add products from scratch
                    </PiTypography>
                  </ThemeBlueText>
                )}
            </AddOptionsText>
          </FormBodyOverFlow>
          {quoteDetails && !quoteDetails.is_system_quote && showItemsGrid && (
            //  <FormBodyOverFlow>
            <QuoteItemSelctionTab
              itemsApiParams={itemsApiParams}
              quoteDetails={quoteDetails}
              sendEventData={(e: any) => triggerItemsEvent(e)}
            />
            // </FormBodyOverFlow>
          )}
          {quoteDetails && quoteDetails.is_system_quote && showItemsGrid && (
            //  <FormBodyOverFlow>
            <QuoteItemSelctionTab
              selectedOption={selectedOption}
              itemsApiParams={itemsApiParams}
              quoteDetails={quoteDetails}
              sendEventData={(e: any) => triggerItemsEvent(e)}
            />
            // </FormBodyOverFlow>
          )}

          {/* {showItemsGrid && !selectedOption && quoteDetails && quoteDetails.is_system_quote && (
              <FormBodyOverFlow>
                <AddNewQuotePart
                  from="quotes"
                  quoteDetails={quoteDetails}
                  itemsApiParams={itemsApiParams}
                  sendData={triggerAddItemsEvent}
                ></AddNewQuotePart>
              </FormBodyOverFlow>
            )} */}

          <SideDrawerFooter className={showItemsGrid ? "d-none" : ""}>
            {serverMsg && <div className="server-msg">{serverMsg}</div>}
            <PiButton
              appearance="primary"
              label="Add Option"
              onClick={() => createNewOption()}
              isDisabled={!selectedOption}
            />
          </SideDrawerFooter>
        </>
      </SideDrawerContainer>
    </PiSideDrawer>
  );
}

import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  ImgTag,
  LinkWithIcon,
  SecondaryHeaderContainer,
} from "@app/components/secondaryheader/secondaryheader.component";
import { useHistory } from "react-router-dom";
import {
  getPermissionObject,
  getUserPermissions,
} from "@app/helpers/componentHelpers";
import { PiTypography, PiSearch, PiToast } from "pixel-kit";
import QuotesImg from "@app/assets/images/quotes.svg";
import { FilterIconContainer } from "@app/components/Admin layout/adminLayouts.component";
import FilterIcon from "@app/assets/images/list_filter_icon.svg";
import AddLogo from "@app/assets/images/Plus.svg";
import {
  LeftContent,
  RightContent,
} from "@app/components/static-secondaryheader/staticSecondaryHeader.component";
import FiltersResetContainer from "@app/components/parts-purchase-components/parts-purchase-filter/parts-purchase-filter-components";

import {
  getUserLoggedPermission,
  GlobalUserPermissions,
} from "@app/helpers/helpers";
import QuoteFilter from "../Forms/Quote-filter/quote-filter";
import PartQuote from "../Forms/PartQuote/part-quote";

export default function QuotesSecondaryHeader({
  requestInfo,
  sendEventData,
  quoteType,
}: any) {
  const [openAddQuote, setOpenAddQuote] = useState<boolean>(false);
  const history = useHistory();
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const { current }: any = useRef({ timer: 0 });
  const [searchValue, setSearchValue] = useState("");
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [openSnackbar, setSnackbar] = useState(false);
  const [permissionObject, setpermissionObject] = useState<any>({});
  // const localStorageData = getLocalStorage("userPermission");
  useEffect(() => {
    (async () => {
      await GlobalUserPermissions();
      const is_Allowed = await getUserPermissions("quote_for_parts", "Edit");
      setIsAllowed(is_Allowed);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("quote_for_parts");
      setpermissionObject(permission);
    })();
  }, []);
  async function getRmaModelEvent(e: any) {
    if (e.success) {
      setSnackbar(true);
      setTimeout(() => {
        sendEventData({ success: true });
        history.push(`${e.id.redirect_route}${e.id.id}`);
      }, 2000);
    }
    setOpenAddQuote(false);
  }
  async function getFilterModelEvent(e: any) {
    setOpenFilter(false);
    sendEventData({ success: true, ...e });
  }

  function valueChanged(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
    if (current.timer) clearTimeout(current.timer);
    current.timer = setTimeout(() => {
      // searchEvent(e.target.value)
      sendEventData({ success: true, searchValue: e.target.value });
    }, 1000);
  }
  function clearSearch() {
    setSearchValue("");
    sendEventData({ success: true, searchValue: "" });
    // searchEvent('')
  }
  useEffect(() => {
    setSearchValue(requestInfo.searchkey ? requestInfo.searchkey : "");
  }, [requestInfo]);
  const onresetFilters = () => {
    const obj = {
      success: true,
      selectedFilters: {
        customer_name: [],
        owner_name: [],
        status: [],
        quoted_by: [],
      },
      section: "quote-filters",
    };
    sendEventData({ ...obj });
  };

  // console.log(requestInfo.body.selectedCustomFilters.status.length, 900);
  return (
    <SecondaryHeaderContainer>
      <LeftContent>
        <img src={QuotesImg} alt="loading" />
        <PiTypography className="page-label" component="h1">
          Quotes
        </PiTypography>
      </LeftContent>
      <RightContent>
        {!permissionObject.None && (
          <div className="quote-search-width">
            <PiSearch
              libraryType="atalskit"
              onClear={() => clearSearch()}
              onValueChange={(e) => valueChanged(e)}
              // onKeyUp={(e) => keyUp(e)}
              placeholder={
                getUserLoggedPermission() === true
                  ? "Quote ID / Company Name / Sales Person Name / Email"
                  : "Quote ID / Sales Person Name / Email"
              }
              value={searchValue}
            />
          </div>
        )}
        <div className="add-Icon">
          <div style={{ display: "flex", gap: "4px" }}>
            {!permissionObject.None && (
              <FilterIconContainer
                onClick={() => setOpenFilter(true)}
                className={
                  requestInfo.body &&
                  requestInfo.body.selectedCustomFilters &&
                  ((requestInfo.body.selectedCustomFilters.customer_name &&
                    requestInfo.body.selectedCustomFilters.customer_name
                      .length) ||
                    (requestInfo.body.selectedCustomFilters.owner_name &&
                      requestInfo.body.selectedCustomFilters.owner_name
                        .length) ||
                    (requestInfo.body.selectedCustomFilters.status &&
                      requestInfo.body.selectedCustomFilters.status.length) ||
                    (requestInfo.body.selectedCustomFilters.quoted_by &&
                      requestInfo.body.selectedCustomFilters.quoted_by
                        .length) ||
                    (requestInfo.body.selectedCustomFilters.items &&
                      requestInfo.body.selectedCustomFilters.items.length) ||
                    (requestInfo.body.selectedCustomFilters.name &&
                      requestInfo.body.selectedCustomFilters.name.length))
                    ? " open"
                    : ""
                }
                title={
                  requestInfo.body &&
                  requestInfo.body.selectedCustomFilters &&
                  ((requestInfo.body.selectedCustomFilters.customer_name &&
                    requestInfo.body.selectedCustomFilters.customer_name
                      .length) ||
                    (requestInfo.body.selectedCustomFilters.owner_name &&
                      requestInfo.body.selectedCustomFilters.owner_name
                        .length) ||
                    (requestInfo.body.selectedCustomFilters.status &&
                      requestInfo.body.selectedCustomFilters.status.length) ||
                    (requestInfo.body.selectedCustomFilters.quoted_by &&
                      requestInfo.body.selectedCustomFilters.quoted_by
                        .length) ||
                    (requestInfo.body.selectedCustomFilters.items &&
                      requestInfo.body.selectedCustomFilters.items.length) ||
                    (requestInfo.body.selectedCustomFilters.name &&
                      requestInfo.body.selectedCustomFilters.name.length))
                    ? "Filters Applied"
                    : ""
                }
              >
                <img
                  src={FilterIcon}
                  alt="loading"
                  style={{ width: "14px", height: "14px" }}
                />
                <div className="filter-text">Filters</div>
                {!permissionObject.None &&
                requestInfo.body &&
                requestInfo.body.selectedCustomFilters &&
                ((requestInfo.body.selectedCustomFilters.customer_name &&
                  requestInfo.body.selectedCustomFilters.customer_name
                    .length) ||
                  (requestInfo.body.selectedCustomFilters.owner_name &&
                    requestInfo.body.selectedCustomFilters.owner_name.length) ||
                  (requestInfo.body.selectedCustomFilters.status &&
                    requestInfo.body.selectedCustomFilters.status.length) ||
                  (requestInfo.body.selectedCustomFilters.quoted_by &&
                    requestInfo.body.selectedCustomFilters.quoted_by.length) ||
                  (requestInfo.body.selectedCustomFilters.items &&
                    requestInfo.body.selectedCustomFilters.items.length)) ? (
                  <span>
                    {requestInfo.body.selectedCustomFilters.status.length +
                      requestInfo.body.selectedCustomFilters.customer_name
                        .length +
                      requestInfo.body.selectedCustomFilters.items.length +
                      requestInfo.body.selectedCustomFilters.quoted_by.length +
                      requestInfo.body.selectedCustomFilters.owner_name.length}
                  </span>
                ) : (
                  ""
                )}
              </FilterIconContainer>
            )}
            {!permissionObject.None &&
            requestInfo.body &&
            requestInfo.body.selectedCustomFilters &&
            ((requestInfo.body.selectedCustomFilters.customer_name &&
              requestInfo.body.selectedCustomFilters.customer_name.length) ||
              (requestInfo.body.selectedCustomFilters.owner_name &&
                requestInfo.body.selectedCustomFilters.owner_name.length) ||
              (requestInfo.body.selectedCustomFilters.status &&
                requestInfo.body.selectedCustomFilters.status.length) ||
              (requestInfo.body.selectedCustomFilters.quoted_by &&
                requestInfo.body.selectedCustomFilters.quoted_by.length) ||
              (requestInfo.body.selectedCustomFilters.items &&
                requestInfo.body.selectedCustomFilters.items.length)) ? (
              <FiltersResetContainer
                onClick={onresetFilters}
                className=" open"
                title={
                  requestInfo.body &&
                  requestInfo.body.selectedCustomFilters &&
                  ((requestInfo.body.selectedCustomFilters.customer_name &&
                    requestInfo.body.selectedCustomFilters.customer_name
                      .length) ||
                    (requestInfo.body.selectedCustomFilters.owner_name &&
                      requestInfo.body.selectedCustomFilters.owner_name
                        .length) ||
                    (requestInfo.body.selectedCustomFilters.status &&
                      requestInfo.body.selectedCustomFilters.status.length) ||
                    (requestInfo.body.selectedCustomFilters.quoted_by &&
                      requestInfo.body.selectedCustomFilters.quoted_by.length))
                    ? "Reset Filters "
                    : ""
                }
              >
                {/* <img src={ResetFilterIcon} alt="loading" /> */}
                <span className="clear-text">Clear</span>
              </FiltersResetContainer>
            ) : (
              ""
            )}
          </div>

          {isAllowed &&
            window.location.pathname !== "/quote_expired" &&
            window.location.pathname !== "/quote_archived" && (
              <div className="Button-Icon-Display">
                <LinkWithIcon
                  className="Icon-space primary-button "
                  onClick={() => setOpenAddQuote(true)}
                >
                  <ImgTag src={AddLogo} alt="loading" className="add-icon" />
                  <span className="button-icon-text ">Create Quote</span>
                </LinkWithIcon>
              </div>
            )}

          {openAddQuote && (
            <PartQuote sendModelData={(e: any) => getRmaModelEvent(e)} />
          )}
          <PiToast
            className={openSnackbar ? "show" : ""}
            headerLabel="Created Successfully"
            message=""
            onClose={async () => setSnackbar(false)}
          />
          {openFilter && (
            <QuoteFilter
              requestInfo={requestInfo}
              sendModelData={(e: any) => getFilterModelEvent(e)}
              quoteType={quoteType}
            />
          )}
        </div>
      </RightContent>
    </SecondaryHeaderContainer>
  );
}

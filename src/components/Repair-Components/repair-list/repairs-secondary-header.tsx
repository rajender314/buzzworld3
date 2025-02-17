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
import { PiTypography, PiSearch, PiToast, PiToggle } from "pixel-kit";
import { FilterIconContainer } from "@app/components/Admin layout/adminLayouts.component";
import FilterIcon from "@app/assets/images/list_filter_icon.svg";
import AddLogo from "@app/assets/images/Plus.svg";
import {
  LeftContent,
  RightContent,
} from "@app/components/static-secondaryheader/staticSecondaryHeader.component";
import FiltersResetContainer from "@app/components/parts-purchase-components/parts-purchase-filter/parts-purchase-filter-components";
import RepairsImg from "@app/assets/images/repairs.svg";
import RmaModel from "@app/components/rmaModel";
import { GlobalUserPermissions } from "@app/helpers/helpers";
import RepairFilterPanel from "../repair-list-filter/repair-list-filter";

export default function RepairSecondaryHeader({
  requestInfo,
  sendEventData,
  pageLabel,
}: any) {
  const [openAddQuote, setOpenAddQuote] = useState<boolean>(false);
  const history = useHistory();
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const { current }: any = useRef({ timer: 0 });
  const [searchValue, setSearchValue] = useState("");
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [openSnackbar, setSnackbar] = useState(false);
  const [permissionObject, setpermissionObject] = useState<any>({});
  const [isAllItemSDisplay, setIsAllItemsDisplay] = useState<any>();
  const [customerName, setCustomerName]: any = useState([]);
  const [selectedSalesPerson, setSelectedSalesPerson]: any = useState([]);
  const [selectedStatus, setSelectedStatus]: any = useState([]);

  useEffect(() => {
    (async () => {
      await GlobalUserPermissions();
      const is_Allowed = await getUserPermissions("repair-request", "Edit");
      setIsAllowed(is_Allowed);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("repair-request");
      setpermissionObject(permission);
      console.log(pageLabel, 600);
    })();
  }, []);
  async function getRmaModelEvent(e: any) {
    console.log(e);
    if (e.success) {
      setSnackbar(true);
      setTimeout(() => {
        sendEventData({ success: true });
        history.push("");
        history.push(`repair-request/${e.id}`);
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
      sendEventData({ success: true, searchValue: e.target.value });
    }, 1000);
  }
  function clearSearch() {
    setSearchValue("");
    sendEventData({ success: true, searchValue: "" });
  }
  useEffect(() => {
    if (requestInfo.searchkey) {
      setSearchValue(requestInfo.searchkey);
    }
    if (
      requestInfo &&
      requestInfo.body &&
      requestInfo.body.selectedCustomFilters
    ) {
      setCustomerName(requestInfo.body.selectedCustomFilters.customer_name);
      setSelectedStatus(requestInfo.body.selectedCustomFilters.status);
      setSelectedSalesPerson(requestInfo.body.selectedCustomFilters.technician);
      setIsAllItemsDisplay(requestInfo.body.is_checked === "checked");
      console.log(pageLabel, 1066);
    }
  }, [requestInfo]);
  const onresetFilters = () => {
    const obj = {
      success: true,
      selectedFilters: {
        customer_name: [],
        technician: [],
        status: [],
        quoted_by: [],
      },
      section: "repair-filters",
      isAllItemSDisplay,
    };
    sendEventData({ ...obj });
  };
  const onNcrChanged = (e: any) => {
    console.log(e.target.checked);
    const obj = {
      success: true,
      selectedFilters: {
        customer_name: customerName,
        technician: selectedSalesPerson,
        status: selectedStatus,
      },
      section: "repair-filters",
      isAllItemSDisplay: e.target.checked,
    };
    sendEventData({ ...obj });

    setIsAllItemsDisplay(e.target.checked);
  };
  return (
    <SecondaryHeaderContainer>
      <LeftContent>
        <img src={RepairsImg} alt="loading" />
        <PiTypography className="page-label" component="h1">
          Repairs
        </PiTypography>
      </LeftContent>
      <RightContent>
        {!permissionObject.None && (
          <div className="globalsearch-width">
            <PiSearch
              libraryType="atalskit"
              onClear={() => clearSearch()}
              onValueChange={(e) => valueChanged(e)}
              placeholder="RMA ID / Company Name / Sales Person / Items / Vendor Code / Customer PO /Serial number"
              value={searchValue}
            />
          </div>
        )}
        <div className="add-Icon items-center ">
          {(pageLabel === "repair_request" || pageLabel === "my_repairs") &&
            !permissionObject.None && (
              <div className="pi-toggle">
                <PiToggle
                  direction="row"
                  helpText=""
                  isChecked={isAllItemSDisplay}
                  label="Display All Items"
                  name="toggle"
                  onChange={onNcrChanged}
                  size="large"
                />
              </div>
            )}

          <div style={{ gap: "4px", display: "flex" }}>
            {!permissionObject.None && (
              <FilterIconContainer
                onClick={() => setOpenFilter(true)}
                className={
                  requestInfo.body &&
                  requestInfo.body.selectedCustomFilters &&
                  ((requestInfo.body.selectedCustomFilters.customer_name &&
                    requestInfo.body.selectedCustomFilters.customer_name
                      .length) ||
                    (requestInfo.body.selectedCustomFilters.technician &&
                      requestInfo.body.selectedCustomFilters.technician
                        .length) ||
                    (requestInfo.body.selectedCustomFilters.status &&
                      requestInfo.body.selectedCustomFilters.status.length))
                    ? " open"
                    : ""
                }
                title={
                  requestInfo.body &&
                  requestInfo.body.selectedCustomFilters &&
                  ((requestInfo.body.selectedCustomFilters.customer_name &&
                    requestInfo.body.selectedCustomFilters.customer_name
                      .length) ||
                    (requestInfo.body.selectedCustomFilters.technician &&
                      requestInfo.body.selectedCustomFilters.technician
                        .length) ||
                    (requestInfo.body.selectedCustomFilters.status &&
                      requestInfo.body.selectedCustomFilters.status.length))
                    ? "Filters Applied"
                    : ""
                }
              >
                <img src={FilterIcon} alt="loading" />
                <div className="filter-text">Filters</div>
                {!permissionObject.None &&
                requestInfo.body &&
                requestInfo.body.selectedCustomFilters &&
                ((requestInfo.body.selectedCustomFilters.customer_name &&
                  requestInfo.body.selectedCustomFilters.customer_name
                    .length) ||
                  (requestInfo.body.selectedCustomFilters.technician &&
                    requestInfo.body.selectedCustomFilters.technician
                      ?.length) ||
                  (requestInfo.body.selectedCustomFilters.status &&
                    requestInfo.body.selectedCustomFilters.status?.length)) ? (
                  <span>
                    {requestInfo.body.selectedCustomFilters.status.length +
                      requestInfo.body.selectedCustomFilters.customer_name
                        .length +
                      requestInfo.body.selectedCustomFilters.technician.length}
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
              (requestInfo.body.selectedCustomFilters.technician &&
                requestInfo.body.selectedCustomFilters.technician.length) ||
              (requestInfo.body.selectedCustomFilters.status &&
                requestInfo.body.selectedCustomFilters.status.length)) ? (
              <FiltersResetContainer
                onClick={onresetFilters}
                className=" open "
                title={
                  requestInfo.body &&
                  requestInfo.body.selectedCustomFilters &&
                  ((requestInfo.body.selectedCustomFilters.customer_name &&
                    requestInfo.body.selectedCustomFilters.customer_name
                      .length) ||
                    (requestInfo.body.selectedCustomFilters.technician &&
                      requestInfo.body.selectedCustomFilters.technician
                        .length) ||
                    (requestInfo.body.selectedCustomFilters.status &&
                      requestInfo.body.selectedCustomFilters.status.length))
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

          {isAllowed && (
            <div className="Button-Icon-Display">
              <LinkWithIcon
                className="Icon-space primary-button"
                onClick={() => setOpenAddQuote(true)}
              >
                <ImgTag src={AddLogo} alt="loading" />
                <span className="button-icon-text">Create RMA</span>
              </LinkWithIcon>
            </div>
          )}

          {openAddQuote && (
            <RmaModel
              sendModelData={(e: any) => getRmaModelEvent(e)}
              paramData={null}
            />
          )}
          <PiToast
            className={openSnackbar ? "show" : ""}
            headerLabel="Created Successfully"
            message=""
            onClose={async () => setSnackbar(false)}
          />

          {openFilter && (
            <RepairFilterPanel
              requestInfo={requestInfo}
              sendModelData={(e: any) => getFilterModelEvent(e)}
              pageLabel={pageLabel}
            />
          )}
        </div>
      </RightContent>
    </SecondaryHeaderContainer>
  );
}

import EditIcon from "@app/assets/images/editicon.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@app/core/localStorage/localStorage";
import { token, triggerApi } from "@app/services";
import { ApiResponse, FilterColumnProps } from "@app/services/schema/schema";
import { ITooltipParams } from "ag-grid-community";
import QuoteStatusAppearance from "@app/core/components/gridStatus/quote-status-apperance";
import DateIcon from "@app/assets/images/date_picker_icon2.svg";
import AvatarIcon from "@app/assets/images/new_avatar.svg";
import VendorIcon from "@app/assets/images/vendor_logo.svg";
import DownArrowIcon from "@app/assets/images/Standard.svg";
import UrgencyIcon from "@app/assets/images/Emergency_Breakdown.svg";
import ImmediateIcon from "@app/assets/images/Urgency_immediate.svg";
import RushIcon from "@app/assets/images/Rush.svg";
import VendorNewIcon from "@app/assets/images/Vendor_listview.svg";
import addUserIcon from "@app/assets/images/Add_User.svg";
import EyeIcon from "@app/assets/images/email_invoices.svg";
import CmrNotes from "@app/assets/images/cmr_notes.svg";
import { CmpanyOptionDiv } from "@app/components/rmaModel/RmaModel.component";
import { getPermissionObject } from "./componentHelpers";

// import Quotes from '@app/assets/images/Quotes_listview.svg'
const baseUrl = process.env.REACT_APP_API_URL;

export async function GlobalUserPermissions() {
  const apiObject = {
    payload: {},
    method: "GET",
    apiUrl: `${EndpointUrl.userPermissions}`,
    headers: {},
  };
  await triggerApi(apiObject)
    .then((response: ApiResponse) => {
      if (response.result.success) {
        removeLocalStorage("userPermission");
        const userPermissionsData = response.result.data;
        setLocalStorage("userPermission", JSON.stringify(userPermissionsData));
      }
    })
    .catch((err: string) => {
      console.log(err);
    });
  return getLocalStorage("userPermission");
}

export function getBlobImage(fileObject: any) {
  console.log(fileObject);
  const objectUrl: any = URL.createObjectURL(fileObject);
  return objectUrl;
}
export const getAppearence = (status: string) => {
  switch (status) {
    case "receiving": {
      return "inprogress";
    }
    case "checkedin": {
      return "success";
    }
    case "repairable": {
      return "success";
    }
    case "non_repairable": {
      return "removed";
    }
    case "outsource": {
      return "moved";
    }
    case "evaluation": {
      return "success";
    }
    case "open": {
      return "moved";
    }
    case "pending_qc": {
      return "inprogress";
    }
    default: {
      return "default";
    }
  }
};

export const downloadFile = (e: any) => {
  console.log(e);
  if (e && e.attachment_id) {
    const downloadUrl = `${EndpointUrl.DownloadAttachments}/${e.attachment_id}?token=${token}`;
    window.location.href = baseUrl + downloadUrl;
  } else {
    const downloadUrl = `${EndpointUrl.DownloadAttachments}/${e.id}?token=${token}`;
    window.location.href = baseUrl + downloadUrl;
  }
  // const apiObject = {
  //  payload: {},
  //  method: 'GET',
  //  apiUrl: `${EndpointUrl.DownloadAttachments}/${e.id}`,
  //  headers: {},
  // }
  // triggerApi(apiObject)
  //  .then((response: ApiResponse) => {
  //    if (response.result.success) {
  //    }
  //  })
  //  .catch((err: string) => {
  //    console.log(err)
  //  })
  // const url = EndpointUrl.DownloadAttachments.concat(
  //      '?' + `${url}`&token=${token}`,
  //    )
};

export async function deleteImage(e: any) {
  console.log(e);
  let data = false;
  const apiObject = {
    payload: {},
    method: "DELETE",
    apiUrl: `${EndpointUrl.Attachments}/${e.id}`,
    headers: {},
  };
  await triggerApi(apiObject)
    .then((response: ApiResponse) => {
      if (response.result.success) {
        data = true;
      }
    })
    .catch((err: string) => {
      console.log(err);
    });
  return data;
}

export const getTechnicianList = async () => {
  // setstockCodeList([])
  let data: any = [];
  const apiObject = {
    payload: {},
    method: "GET",
    apiUrl: `${EndpointUrl.RepairsAssignee}?user_role=technician&status[0]=${"true"}`,
    headers: {},
  };
  await triggerApi(apiObject)
    .then((response: any) => {
      if (response.result.success) {
        let arr = [];
        const { list } = response.result.data;

        arr = list.map((item: FilterColumnProps) => ({
          value: item.id,
          label: item.name,
          ...item,
        }));
        data = arr;
      }
    })
    .catch((err: string) => {
      console.log(err);
    });
  return data;
};

export const getSuppliersList = async () => {
  let data: any = [];
  const params = {
    status: true,
    is_add_row: false,
  };
  const apiObject = {
    payload: params,
    method: "POST",
    apiUrl: `${EndpointUrl.SPVendors}`,
    headers: {},
  };
  await triggerApi(apiObject)
    .then((response: ApiResponse) => {
      if (response.result.success) {
        const { list } = response.result.data;
        data = list;
      }
    })
    .catch((err: string) => {
      console.log(err);
    });
  return data;
};

export const filterSupplierData = async (inputValue: string) => {
  let data: any = [];
  if (inputValue.length >= 3) {
    const params = {
      status: true,
      is_add_row: false,
      search: inputValue,
    };

    const apiObject = {
      payload: params,
      method: "POST",
      apiUrl: `${EndpointUrl.SPVendors}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          let arr = [];
          const list = response.result.data.list
            ? response.result.data.list
            : response.result.data;
          arr = list.map((item: any) => ({
            ...item,
            value: item.value,
            // label: item.name,
            name: item.label,
            label: (
              <CmpanyOptionDiv>
                <div>
                  <div className="cmpny_name">{item.label}</div>
                  <div className="account_no">
                    {item.code ? item.code : "--"}
                  </div>
                </div>
                {/* <div className="cmpny_address">{item.address1}</div> */}
              </CmpanyOptionDiv>
            ),
          }));
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

export const getFilterSupplierData = async (
  inputValue: string,
  api: string
) => {
  let data: any = [];
  if (inputValue.length >= 3) {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${api}?search=${inputValue}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          let arr = [];
          const list = response.result.data.list
            ? response.result.data.list
            : response.result.data;
          arr = list.map((item: any) => ({
            ...item,
            value: item.value || item.id,
            // label: item.name,
            name: item.label || item.name,
            label: (
              <CmpanyOptionDiv>
                <div>
                  <div className="cmpny_name">{item.name}</div>
                  <div className="account_no">
                    {item.code ? item.code : "--"}
                  </div>
                </div>
                {/* <div className="cmpny_address">{item.address1}</div> */}
              </CmpanyOptionDiv>
            ),
          }));
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
function getOrgNameFilterData(params: Array<any>) {
  let data = [];
  data = params ? params.map((obj: FilterColumnProps) => obj.name) : [];
  return data;
}
async function getModifiedColumnData(data: any, name: string) {
  data.column_data.map((obj: any) => {
    obj.sortingOrder = ["asc", "desc"];
    obj.filterParams = {};
    obj.filterParams.buttons = ["apply", "reset"];
    obj.filterParams.closeOnApply = true;
    obj.resizable = true;
    obj.minWidth = 100;
    obj.suppressColumnStateEvents = true;

    obj.tooltipValueGetter = (params: ITooltipParams) => params.value;
    if (obj.type === "date") {
      obj.maxWidth = 300;
    }
    if (name === "quote_types" && obj.field === "status") {
      obj.filterParams.values = ["Active", "InActive"];
    }

    if (
      obj.field === "start_date" ||
      obj.field === "end_date" ||
      obj.field === "requested_date" ||
      obj.field === "created_date" ||
      obj.field === "order_date" ||
      obj.field === "invoice_date" ||
      obj.field === "date_promised" ||
      obj.field === "delivery_due_date"
    ) {
      obj.cellStyle = { cursor: "pointer" };
      obj.cellRenderer = (params: any) =>
        params.value
          ? `<div class="cell-Icon-text" ><img src=${DateIcon} alt='loading'/ class='radius-none'></div>` +
            `<div class="label">${params.value}</div>`
          : '<div class="label">-</div>';
    }
    if (
      obj.field === "owner_name" ||
      obj.field === "requested_name" ||
      obj.field === "quoted_by" ||
      obj.field === "waiting_on" ||
      obj.field === "technician_name" ||
      obj.field === "technician"
    ) {
      obj.cellStyle = { cursor: "pointer" };
      obj.cellRenderer = (params: any) =>
        params.value
          ? `<div class="cell-Icon-text" ><img class='grid_img_url' src=${params.data[`${obj.field}_img`] ? params.data[`${obj.field}_img`] : AvatarIcon} alt='loading'/></div>` +
            `<div class="label">${params.value}</div>`
          : `<div class="label">${params.value}</div>`;
    }
    if (obj.field === "customer_name") {
      obj.cellStyle = { cursor: "pointer" };
      obj.cellRenderer = (params: any) =>
        `<div class="cell-Icon-text" ><img src=${VendorIcon} alt='loading' class='radius-none'/></div>` +
        `<div class="label">${params.value}</div>`;
    }
    if (obj.field === "vendor_name") {
      obj.cellStyle = { cursor: "pointer" };
      obj.cellRenderer = (params: any) =>
        `<div class="cell-Icon-text" ><img src=${VendorNewIcon} alt='loading' class='radius-none'/></div>` +
        `<div class="label">${params.value}</div>`;
    }
    // if (obj.field === "job_id") {
    //   obj["cellStyle"] = { cursor: "pointer" };
    //   obj["cellRenderer"] = function (params: any) {
    //     return (
    //       `<div class="cell-Icon-text" ><img src=${Jobs} alt='loading'/></div>` +
    //       `<div class="label">${params.value}</div>`
    //     );
    //   };
    // }
    // if (obj.field === "sales_order") {
    //   obj["cellStyle"] = { cursor: "pointer" };
    //   obj["cellRenderer"] = function (params: any) {
    //     return (
    //       `<div class="cell-Icon-text" ><img src=${Sales_order} alt='loading'/></div>` +
    //       `<div class="label">${params.value}</div>`
    //     );
    //   };
    // }
    // if (obj.field === "quote_id" || obj.field === "quote_number") {
    //  obj["cellStyle"] = { cursor: "pointer" };
    //  obj["cellRenderer"] = function (params: any) {
    //    return (
    //      `<span class="Icon-text" ><img src=${Quotes} alt='loading'/></span>` +
    //      `<span class="label">${params.value}</span>`
    //    );
    //  };
    // }
    if (obj.field === "part_urgency" || obj.field === "priority") {
      obj.cellStyle = { cursor: "pointer" };
      obj.cellRenderer = (params: any) => {
        if (params.value === "Emergency Breakdown") {
          return (
            `<div class="cell-Icon-text" ><img src=${UrgencyIcon} alt='loading' /></div>` +
            `<div class="label">${params.value}</div>`
          );
        }
        if (params.value === "Standard") {
          return (
            `<div class="cell-Icon-text" ><img src=${DownArrowIcon} alt='loading' /></div>` +
            `<div class="label">${params.value}</div>`
          );
        }
        if (params.value === "Rush") {
          return (
            `<div class="cell-Icon-text"  ><img src=${RushIcon} alt='loading'/></div>` +
            `<div class="label">${params.value}</div>`
          );
        }
        if (params.value === "Warranty Repair") {
          return (
            `<div class="cell-Icon-text"  ><img src=${ImmediateIcon} alt='loading'/></div>` +
            `<div class="label">${params.value}</div>`
          );
        }
        return "";
      };
      return true;
    }

    if (obj.field === "discount_code") {
      obj.minWidth = 140;
      obj.filterParams.values = getOrgNameFilterData(
        data.filters.discount_code
      );
    }
    if (obj.field === "supplier") {
      obj.minWidth = 140;
      obj.filterParams.values = getOrgNameFilterData(data.filters.supplier);
    }

    if (obj.field === "contact_type") {
      obj.filterParams.values = getOrgNameFilterData(data.filters.contact_type);
    }
    if (obj.field === "organization") {
      obj.filterParams.values = getOrgNameFilterData(data.filters.organization);
    }

    if (obj.field === "account_type") {
      obj.filterParams.values = getOrgNameFilterData(data.filters.account_type);
    }
    if (obj.field === "classification") {
      obj.filterParams.values = getOrgNameFilterData(
        data.filters.classification
      );
    }
    if (obj.field === "industry") {
      obj.filterParams.values = getOrgNameFilterData(data.filters.industry);
    }
    if (obj.field === "org_type") {
      obj.filterParams.values = getOrgNameFilterData(data.filters.org_type);
    }
    if (obj.field === "quantity") {
      // obj["filter"] = true;
      obj.filterParams.values = getOrgNameFilterData(data.filters.quantity);
    }
    if (obj.field === "discount_code") {
      // obj["filter"] = true;
      obj.filterParams.values = getOrgNameFilterData(
        data.filters.discount_code
      );
    }
    if (obj.field === "status") {
      // obj["filter"] = true;
      obj.filterParams.values = getOrgNameFilterData(data.filters.status);
    }

    if (obj.field === "stock_code" || obj.field === "organization") {
      obj.minWidth = 160;
    }
    if (obj.field === "value") {
      obj.minWidth = 180;
    }
    if (
      obj.field === "fixed_price" ||
      obj.field === "buy_price" ||
      obj.field === "list_price" ||
      obj.field === "type" ||
      obj.field === "vendor_name" ||
      obj.field === "account_number" ||
      obj.field === "start_date" ||
      obj.field === "end_date"
    ) {
      obj.minWidth = 140;
    }
    if (obj.field === "description") {
      obj.minWidth = 200;
    }
    if (
      obj.field === "status" ||
      obj.field === "item_status" ||
      obj.field === "order_status" ||
      obj.field === "job_status"
    ) {
      obj.minWidth = 100;
      obj.cellRendererFramework = (params: any) =>
        params.value ? QuoteStatusAppearance(params.value) : "--";
      obj.cellClass = ["ag-customCell-text", "ag-cell-padding-left"];
    }

    if (obj.field === "edit") {
      obj.minWidth = 50;
      obj.width = 50;
      obj.cellClass = "edit-icon-cell";
    }

    if (obj.type === "number" || obj.type === "price") {
      // obj['headerClass'] = [
      //  'ag-customHeader-number',
      //  'ag-headers-padding-right',
      // ]
      // obj['cellClass'] = ['ag-customCell-number', 'ag-cell-padding-right']
      // obj['headerClass'] = ['ag-customHeader-text', 'ag-headers-padding-left']
    } else if (obj.type === "text") {
      obj.headerClass = ["ag-customHeader-text", "ag-headers-padding-left"];
      obj.cellClass = ["ag-customCell-text", "ag-cell-padding-left"];
    } else if (obj.field !== "edit") {
      obj.headerClass = ["ag-customHeader-text", "ag-headers-padding-left"];
      obj.cellClass = ["ag-customCell-text", "ag-cell-padding-left"];
    }
    if (obj.type === "number") {
      obj.headerClass = ["header-align-left", "ag-headers-padding-left"];
      obj.cellClass = ["cell-align-left"];
    } else if (obj.type === "price") {
      obj.headerClass = ["header-align-left", "ag-headers-padding-left"];
      obj.cellClass = ["cell-align-left"];
    }
    // if (
    //  name === 'repair_request' ||
    //  name === 'quote_for_parts' ||
    //  name === 'quote_for_repair' ||
    //  name === 'jobs' ||
    //  name === 'sales_order' ||
    //  name === 'parts_purchase' ||
    //  name === 'system_quotes' ||
    //  name === 'all_quotes' ||
    //  name === 'quote_expired' ||
    //  name === 'quote_archived' ||
    //  name === 'waiting_on_me' ||
    //  name === 'quoted_by'
    // ) {
    // obj['cellClass'] = [
    //  //'repairs-ag-status-cell-class',
    //  'ag-cell-padding-left',
    // ]
    if (
      obj.field === "quote_id" ||
      obj.field === "rma" ||
      obj.field === "job_id" ||
      obj.field === "sales_order" ||
      obj.field === "quote_number" ||
      obj.field === "customer" ||
      obj.field === "part_no"
    ) {
      obj.headerClass = ["header-justify-start"];
      obj.cellClass = ["ag-cell-padding-left", "repair_id_text_cell"];
    }
    // }
    if (obj.field === "primary_email" && name === "contacts") {
      obj.cellStyle = { cursor: "pointer" };
      obj.cellClass = "cell-icon-click";
      obj.cellRenderer = (params: any) => {
        console.log(params);
        // eslint-disable-next-line no-nested-ternary
        return params.data.is_add_user_display
          ? `<div class="Icon-text" title='Add as User'><img src=${addUserIcon} alt='loading'/></div>` +
              `<div class="label">${params.value}</div>`
          : params.data.is_user
            ? `<div class="Icon-text" title='Added to Users List'><img src=${AvatarIcon} alt='loading'/></div>` +
              `<div class="label">${params.value}</div>`
            : `<div class="label">${params.value}</div>`;
      };
    }
    if (obj.headerName === "CRM Notes") {
      obj.cellStyle = { cursor: "pointer" };
      obj.cellRenderer = () => `<div class="cell-Email-icon-text" >
          <img src=${CmrNotes} alt='loading'/>
          </div>`;
    }
    if (obj.headerName === "Email Invoices") {
      obj.cellStyle = { cursor: "pointer" };
      obj.cellRenderer = () => `<div class="cell-Email-icon-text" >
          <img src=${EyeIcon} alt='loading'/>
          </div>`;
    }

    return obj;
  });
  return data;
}
export async function getColumnFilterData(name: string, timestamp?: any) {
  const permissionObject: any = await getPermissionObject(
    window.location.pathname.substring(1)
  );
  let modified: any = {};
  const apiObject = {
    payload: {},
    method: "GET",
    apiUrl: `${EndpointUrl.filterDataApi}?name=${name}&timestamp=${timestamp}`,
    headers: {},
  };

  await triggerApi(apiObject)
    .then(async (response: ApiResponse) => {
      if (response.result.success) {
        const { data } = response.result;
        // if (props.pageLabel === 'Pricing') {
        const valueEdit = {
          headerName: "",
          pinned: "right",
          field: "edit",

          suppressColumnsToolPanel: true,
          // hide: true,
          cellStyle: { cursor: "pointer" },
          cellRenderer: () =>
            `<img src=${EditIcon} className='Icon' style='height: 14px; width: 14px' alt='loading'/>`,
        };
        if (
          permissionObject.Edit &&
          name !== "sp_log_history" &&
          name !== "special_pricing_preview" &&
          name !== "repair_request" &&
          name !== "quote_for_parts" &&
          name !== "quote_for_repair" &&
          name !== "organizations" &&
          name !== "contacts" &&
          name !== "jobs" &&
          name !== "sales_order" &&
          name !== "parts_purchase" &&
          name !== "past_repair_invoice"
        ) {
          data.column_data.push(valueEdit);
        }

        // }

        modified = await getModifiedColumnData(data, name);
        console.log(modified);
        return modified;
      }
      return modified;
    })
    .catch((err: string) => {
      console.log(err);
    });
  return modified;
}

export const setPricingstateManagement = (props: any) => {
  const apiObject = {
    payload: props || {},
    method: "POST",
    apiUrl: `${EndpointUrl.gridStateMaintainance}`,
    headers: {},
  };

  triggerApi(apiObject)
    .then(async () => {})
    .catch((err: string) => {
      console.log(err);
    });
};
let Statedata: any;
export async function getPricingStateManagement(name: string) {
  const apiObject = {
    payload: {},
    method: "GET",
    apiUrl: `${EndpointUrl.gridStateMaintainance}?grid_name=${name}`,
    headers: {},
  };
  await triggerApi(apiObject)
    .then(async (response: ApiResponse) => {
      if (response.result.success) {
        const { data } = response.result;
        // const indx = _.findIndex(data, { grid_name: name })
        // console.log(data[indx].data)
        Statedata = data ? data.data : undefined;
        return Statedata;

        // setRequestInfo({...requestInfo})
      }
      return Statedata;
    })

    .catch((err: string) => {
      console.log(err);
    });
  return Statedata;
}

export const getUserLoggedPermission = () => {
  const userInfo = getLocalStorage("userPermission")
    ? JSON.parse(getLocalStorage("userPermission") as string)
    : null;
  if (userInfo && userInfo.user_type === "1") {
    return true;
  }
  if (userInfo && userInfo.user_type === "2") {
    return false;
  }
  return true;
};

export async function getRepairPriorityApi() {
  let data: any = [];
  const apiObject = {
    payload: {},
    method: "GET",
    apiUrl: `${EndpointUrl.RepairPriority}`,
    headers: {},
  };
  await triggerApi(apiObject)
    .then(async (response: ApiResponse) => {
      if (response.result.success) {
        const list = response.result.data;
        data = list;
      }
    })

    .catch((err: string) => {
      console.log(err);
    });
  return data;
}
// type ConfirmProps = {
//  header: string
//  content: string
//  props: any
// }

// type Props = {
//  data: ConfirmProps
// }
export async function syncData(data: any) {
  // setloading(true)
  const params = {
    name:
      data.props.label.toLowerCase() === "organizations"
        ? "accounts"
        : data.props.label.toLowerCase(),
  };
  const apiObject = {
    payload: params || {},
    method: "POST",
    apiUrl: `${EndpointUrl.syncData}?name=${data.props.label.toLowerCase() === "organizations" ? "accounts" : data.props.label.toLowerCase()}`,
    headers: {},
  };
  await triggerApi(apiObject)
    .then((response: ApiResponse) => {
      if (response.result.success) {
        setLocalStorage("syncing", "success");
      } else {
        setLocalStorage("syncing", "failed");
      }
    })
    .catch((err: string) => {
      console.log(err);
    });
  return true;
}

export function allowAutoResizeColumns(coldata: any) {
  console.log(coldata);
  let allow_resize = false;
  for (let i = 0; i < coldata.length; i += 1) {
    if (coldata[i].width > 350) {
      allow_resize = false;
      break;
    } else {
      allow_resize = true;
    }
  }
  return allow_resize;
}

export const autoSizeAll = (columnApi: any) => {
  const allColumnIds: any = [];
  if (columnApi.getAllColumns()) {
    columnApi.getAllColumns().forEach((column: any) => {
      allColumnIds.push(column.colId);
    });
    console.log(columnApi);
    columnApi.autoSizeColumns(allColumnIds);
  }
};

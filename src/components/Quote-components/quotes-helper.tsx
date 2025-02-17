import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services/api-services";
import { ApiResponse } from "@app/services/schema/schema";

export async function addPartToQuote(data: any) {
  const selectedIds: any = [];
  let apiSuccessData = {};
  console.log(data);
  data.previewCheckedList.map((ele: any) => {
    if (ele.isChecked) {
      const obj: any = {
        // products_id:
        //  (data.itemsApiParams.flag === 'quote_options')
        //    ? ele.id
        //    : ele.product_id,
        manufacturer_id: ele.manufacturer_id,
        quantity: ele.quantity,
      };
      if (
        data.itemsApiParams.flag === "quote_options" ||
        data.itemsApiParams.flag === "quote_items"
      ) {
        obj.products_id = ele.id;
      } else {
        obj.products_id = ele.product_id;
      }
      selectedIds.push(obj);
    }
    return true;
  });

  const params: any = {
    quote_id: data.quote_id || data.quoteDetails.id,
    selected_items: selectedIds,
    customer_id: data.quoteDetails.customer_id,
    duplicate_option_id: data.itemsApiParams.option_id,
  };
  if (data.itemsApiParams.flag === "quote_options") {
    params.is_duplicate = false;
    params.options_id = data.optId;
  } else if (data.itemsApiParams.flag === "quote_options_from_dropdown") {
    params.is_duplicate = true;
  }

  if (data.itemsApiParams.flag === "quote_items") {
    params.options_id = data.optId || data.itemsApiParams.selectedOption;
  }
  const apiObject = {
    payload: params,
    method: "POST",
    apiUrl: data.itemsApiParams.submitUrl,
    headers: {},
  };
  await triggerApi(apiObject)
    .then(async (response: any) => {
      if (response.result.success) {
        //  sendEventData({
        //    success: true,
        //    msg: 'Added Successfully',
        //  })
        apiSuccessData = {
          success: true,
          data: response.result.data,
        };
      } else {
        apiSuccessData = {
          success: true,
          data: "Something went wrong",
        };
      }
    })
    .catch(() => {});
  return apiSuccessData;
}

export async function getQuoteApprovalFormData(code: string, data2: any) {
  let formdata;
  const apiObject = {
    payload: {},
    method: "GET",
    apiUrl:
      data2 && data2.eventFrom === "quote"
        ? `${EndpointUrl.QuoteQuoteApproveForms}?code=${code}`
        : `${EndpointUrl.QuoteApproveForms}?code=${code}`,
    headers: {},
  };
  await triggerApi(apiObject)
    .then((response: ApiResponse) => {
      if (response.result.success) {
        const { data } = response.result;
        formdata = data;
      }
    })
    .catch(() => {});
  return formdata;
}

export async function getContactTypes() {
  let list;
  const apiObject = {
    payload: {},
    method: "GET",
    apiUrl: `${EndpointUrl.ContactTypes}`,
    headers: {},
  };
  await triggerApi(apiObject)
    .then(async (response: any) => {
      if (response.result.success) {
        const data = response.result.data.list;
        list = data;
      }
    })
    .catch(() => {});
  return list;
}

export const getQuoteSourceOptions = async () => {
  let list;
  const apiObject = {
    payload: {},
    method: "GET",
    apiUrl: `${EndpointUrl.QuoteSourceOptions}?sort=asc&is_dropdown=true`,
    headers: {},
  };
  await triggerApi(apiObject)
    .then((response: ApiResponse) => {
      if (response.result.success) {
        const { data } = response.result;
        list = data;
      }
    })
    .catch(() => {});
  return list;
};

export const getQuoteLeadTimeOptions = async () => {
  let list;
  const apiObject = {
    payload: {},
    method: "GET",
    apiUrl: `${EndpointUrl.QuoteLeadTimeOptions}?sort=asc&is_dropdown=true`,
    headers: {},
  };
  await triggerApi(apiObject)
    .then((response: ApiResponse) => {
      if (response.result.success) {
        const { data } = response.result;
        list = data;
      }
    })
    .catch(() => {});
  return list;
};

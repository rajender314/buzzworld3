import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";

export async function addNewpartData(formikData: any, id: string) {
  const isApiSuccess = {
    success: false,
    data: null,
  };

  console.log(formikData.values);
  formikData.values.custom_part_items = formikData.values.custom_part_items.map(
    (obj: any) => {
      if (obj.description) {
        obj.description = obj.description.trim();
      }
      return obj;
    }
  );
  console.log(formikData.values);

  const params = {
    repairs_id: id,
    // selected_items: selectedIds,
    ...formikData.values,
  };
  const apiObject = {
    payload: params,
    method: "POST",
    apiUrl: `${EndpointUrl.AddNewPart}`,
    headers: {},
  };
  await triggerApi(apiObject)
    .then((response: ApiResponse) => {
      if (response.result.success) {
        isApiSuccess.success = true;
        return isApiSuccess;
      }
      isApiSuccess.success = false;
      isApiSuccess.data = response.result.data;
      return isApiSuccess;
    })

    .catch((err: string) => {
      console.log(err);
    });
  return isApiSuccess;
}
export async function getEvaluationSummaryList() {
  let data: any = [];
  const apiObject = {
    payload: {},
    method: "GET",
    apiUrl: `${EndpointUrl.EvaluationSummary}`,
    headers: {},
  };
  await triggerApi(apiObject)
    .then((response: ApiResponse) => {
      if (response.result.success) {
        data = response.result.data.list;
      }
    })
    .catch((err: string) => {
      console.log(err);
    });
  return data;
}

export async function getRepairSummaryList() {
  let data: any = [];
  const apiObject = {
    payload: {},
    method: "GET",
    apiUrl: `${EndpointUrl.RepairSummary}`,
    headers: {},
  };
  await triggerApi(apiObject)
    .then((response: ApiResponse) => {
      if (response.result.success) {
        data = response.result.data.list;
      }
    })
    .catch((err: string) => {
      console.log(err);
    });
  return data;
}

export async function getRepairSummaryData(id: string) {
  let data: any = [];
  const apiObject = {
    payload: {},
    method: "GET",
    apiUrl: `${EndpointUrl.RepairSummary}/${id}`,
    headers: {},
  };
  await triggerApi(apiObject)
    .then((response: ApiResponse) => {
      if (response.result.success) {
        data = response.result.data;
      }
    })
    .catch((err: string) => {
      console.log(err);
    });
  return data;
}
export async function getRepairUsersList() {
  let data: any = [];
  const apiObject = {
    payload: {},
    method: "GET",
    apiUrl: `${EndpointUrl.RepairUsers}?status[0]=true`,
    headers: {},
  };
  await triggerApi(apiObject)
    .then((response: ApiResponse) => {
      if (response.result.success) {
        data = response.result.data.list;
      }
    })
    .catch((err: string) => {
      console.log(err);
    });
  return data;
}

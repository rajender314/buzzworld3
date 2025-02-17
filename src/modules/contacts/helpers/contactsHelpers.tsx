import { GridReadyEvent } from "ag-grid-community";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { getLocalStorage } from "@app/core/localStorage/localStorage";
import { triggerApi } from "@app/services";
import { StateMaintainanceProps } from "@app/services/schema/schema";

function saveStateManagement2(params: StateMaintainanceProps) {
  const apiObject = {
    payload: params || {},
    method: "POST",
    apiUrl: `${EndpointUrl.gridStateMaintainance}`,
    headers: {},
  };
  triggerApi(apiObject).then(async () => {});
}
function setStateManagement2(
  searchParam: any,
  gridEvent: GridReadyEvent,
  pageLabel: string
) {
  const leftkey: string = getLocalStorage("leftkey") as string;
  const searchkey: string = searchParam;
  const pageNo: number = gridEvent.api.paginationGetCurrentPage();

  const columnsStateData = gridEvent.columnApi.getColumnState();
  const fltrstate = gridEvent.api.getFilterModel();
  const pageNumber = pageNo;

  const params = {
    grid_name: pageLabel.toLowerCase(),
    data: {
      fltrstate,
      columnsStateData,
      leftkey,
      searchkey,
      pageNumber,
    },
  };

  saveStateManagement2(params);
}

/**
 * @param {Array<object>} rowData required params
 * @param {GridReadyEvent} gridEvent required params
 * @return {Array} a new row
 */
function gridChangesFunction(
  searchParam: any,
  gridEvent: GridReadyEvent,
  pageLabel: string
): any {
  setStateManagement2(searchParam, gridEvent, pageLabel);
}

export default gridChangesFunction;

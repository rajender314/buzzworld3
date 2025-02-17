import { PiServerGrid2 } from "pixel-kit";
import { useCallback, useEffect, useRef, useState } from "react";
import { getColumnFilterData } from "@app/helpers/helpers";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { token } from "@app/services";
import { getLocalStorage } from "@app/core/localStorage/localStorage";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import AccesssDenied from "@app/modules/access-denied/component";
import { FormBodyOverFlow } from "../Repair-Components/checksIns/assignLocation/assign-location.component";
import { DisplayMessageonEmpty } from "../special-pricing-components/logHistoryDetailGrid/loghistory-detail-grid";
import { CardContainer } from "../special-pricing-components/sp-detail-grid/sp-detail-grid.component";
import TableGrid from "../tablegrid";

export default function PointOfSalesList({ spGridProps, sendData }: any) {
  const [loading, setloading] = useState(true);
  const [columnData, setColumnData] = useState([]);
  const [requestInfo, setRequestInfo]: any = useState({});
  const [propsData, setPropsData]: any = useState(spGridProps);
  const reportParams: any = useRef<any>("");
  const monthParams: any = useRef<any>("");
  const yearParams: any = useRef<any>("");
  const [gridDataLength, setGridDataLength] = useState<any>();
  const [permissionObject, setpermissionObject] = useState<any>({});
  const localStorageData = getLocalStorage("userPermission");
  useEffect(() => {
    sendData({ gridDataLength2: gridDataLength });
  }, [sendData, gridDataLength]);
  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("point-of-sales");
      setpermissionObject(permission);
    })();
  }, [localStorageData]);
  async function getGridParamsArray(selecteList: any, key: string) {
    if (selecteList) {
      let obj: any = {};

      for (let i = 0; i < selecteList.length; i += 1) {
        obj = {
          ...obj,
          [`${key}[${i}]`]: selecteList[i].value,
        };
      }
      return obj;
    }
    return null;
  }
  const getGridRequestParams = () => {
    const info = {
      body: {
        // month: props.params.month || '',
        // year: props.params.year || '',
        ...yearParams.current,
        ...monthParams.current,
        ...reportParams.current,
        grid_name: "point_of_sales",
        serverFilterOptions: {},
      },
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        timezoneoffset: new Date().getTimezoneOffset(),
      },
      url: `${process.env.REACT_APP_API_URL}/${EndpointUrl.getSalesReport}`,
    };
    setRequestInfo({ ...info });
    setloading(false);
  };
  useEffect(() => {
    (async () => {
      setPropsData(spGridProps);
      setloading(true);
      if (spGridProps.params && spGridProps.params.report) {
        const modified: any = await getColumnFilterData(
          `sales_report_${spGridProps.params.report.value}`
        );
        setColumnData(modified.column_data);
        reportParams.current = await getGridParamsArray(
          [spGridProps.params.report],
          "report"
        );
        yearParams.current = await getGridParamsArray(
          [spGridProps.params.year],
          "year"
        );
        monthParams.current = await getGridParamsArray(
          [spGridProps.params.month],
          "month"
        );
      }
      console.log(reportParams);
      if (spGridProps.params) {
        getGridRequestParams();
      }
    })();
  }, [spGridProps]);

  const componentStateChanged = useCallback(() => {
    const response = getLocalStorage("gridResponse") as string;
    const len = response ? JSON.parse(response).length : 0;
    setGridDataLength(len);
  }, [gridDataLength]);
  const getRowClass = (params: any) => {
    if (params.data && params.data.is_gp) {
      return "ag-row-bg-color";
    }
    return "";
  };

  return (
    <>
      {/* {!loading && ( */}
      <FormBodyOverFlow
        className="pos-grid-container"
        style={{ padding: "unset", overflow: "hidden", height: "100%" }}
      >
        {propsData.params && (
          <TableGrid>
            <div className="ag-theme-alpine ag-style">
              <PiServerGrid2
                columns={columnData}
                mode="paginate"
                paginationPageSize={5000}
                cacheBlockSize={5000}
                pagination
                requestInfo={requestInfo}
                rowHeight={40}
                rowSelection="multiple"
                onComponentStateChanged={componentStateChanged}
                getRowClass={getRowClass}
                sideBar={false}
                overlayNoRowsTemplate={
                  '<span className="ag-overlay-loading-center no-data-styles"> Data Not Available </span>'
                }
              />
            </div>
          </TableGrid>
        )}
        {!propsData.params && (
          <CardContainer>
            <DisplayMessageonEmpty msg="Please Select Filters" />
          </CardContainer>
        )}
        {Object.keys(permissionObject).length > 0 &&
          !loading &&
          !permissionObject.Yes && <AccesssDenied />}
      </FormBodyOverFlow>
      {/* )} */}
    </>
  );
}

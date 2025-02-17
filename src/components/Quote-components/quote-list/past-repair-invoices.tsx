import { PiServerGrid2, PiTypography } from "pixel-kit";
import { useState, useCallback, useEffect } from "react";

import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { getColumnFilterData } from "@app/helpers/helpers";
import { token } from "@app/services";
import { ModelGridDiv } from "@app/components/modelGrid/modelgrid.component";
import CrossLogo from "@app/assets/images/cross.svg";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
} from "@app/components/fileuploadModel/fileuploadModel.component";

export default function PastRepairInvoices({ quoteInfo, sendEventData }: any) {
  const [columndata, setColumnData] = useState([]);
  const [requestInfo, setRequestInfo]: any = useState({});

  const gridRequestParams = useCallback(() => {
    const info = {
      body: {
        grid_name: "repair-invoices",
        serverFilterOptions: {},
      },
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        timezoneoffset: new Date().getTimezoneOffset(),
      },
      url: `${process.env.REACT_APP_API_URL}/${EndpointUrl.PastRepairInvoices}/${quoteInfo.repairItemId}`,
    };
    setRequestInfo({ ...info });
  }, [quoteInfo.repairItemId]);

  useEffect(() => {
    (async () => {
      const modified: any = await getColumnFilterData("past_repair_invoice");
      setColumnData(modified.column_data);
      gridRequestParams();
    })();
  }, [gridRequestParams]);
  function closeModel() {
    sendEventData({
      close: true,
    });
  }

  return (
    <div>
      <PopupHeaderContentDiv>
        <PopupHeaderDiv style={{ paddingBottom: "10px " }}>
          <PiTypography component="h3">Past Repair Prices</PiTypography>
          <CloseButton
            onClick={() => closeModel()}
            title="close"
            className="Hover"
          >
            {" "}
            <img src={CrossLogo} alt="loading" />{" "}
          </CloseButton>
        </PopupHeaderDiv>
      </PopupHeaderContentDiv>
      {/* {!loading && columndata.length > 0 && ( */}
      <ModelGridDiv
        className="past-repair-invoice-grid"
        style={{ height: "300px" }}
      >
        <PiServerGrid2
          columns={columndata}
          mode="paginate"
          paginationPageSize={25}
          cacheBlockSize={25}
          pagination={false}
          requestInfo={requestInfo}
          rowHeight={40}
          rowSelection="multiple"
          sideBar={false}
          overlayNoRowsTemplate={
            '<span className="ag-overlay-loading-center no-data-styles"> Data Not Available </span>'
          }
        />
      </ModelGridDiv>
      {/* )} */}
    </div>
  );
}

/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
import { useCallback, useEffect, useState } from "react";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import {
  getLocalStorage,
  setLocalStorage,
} from "@app/core/localStorage/localStorage";
import { autoSizeAll, getColumnFilterData } from "@app/helpers/helpers";
import { token, triggerApi } from "@app/services";
import { GridReadyEvent } from "ag-grid-community";
import {
  PiConfirmModel,
  PiServerGrid,
  PiSideDrawer,
  PiSpinner,
} from "pixel-kit";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import TableGrid from "@app/components/tablegrid";
import { useHistory } from "react-router-dom";
import {
  ImgTag,
  SpinnerDiv,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import GlobalVariables from "@app/core/globalVariables/globalVariables";
import {
  HeaderContainer,
  RepairIdsDiv,
  RepairIds,
  BackSection,
} from "@app/components/detail-view-header/detail-view-header.component";
// import RepairsImg from "@app/assets/images/repairs.svg";
import { SideDrawerContainer } from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import ChevronLeft from "@app/assets/images/chevron_left.svg";
import { LinkWithIcon } from "@app/components/secondaryheader/secondaryheader.component";
import ExportLogo from "@app/assets/images/Export.svg";
import { ApiResponse } from "@app/services/schema/schema";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import SpecialPriceImg from "@app/assets/images/specialPricing.svg";
import {
  BackButton,
  BreadCrumbItem,
  BreadCrumbsDiv,
} from "./logHistoryDetailGrid.component";
import { BlankPageMessage } from "../sp-detail-grid/sp-detail-grid.component";

// import { PiSelectProps } from '@app/services/schema/schema'

// type Props = {
//  propsData: propsDataProps
//  sendEventData: (e: SendDataProps) => void
// }
// type propsDataProps = {
//  apiDataUrl: string
//  log_history_id: string
//  params: SpFltrProps
// }
// type SpFltrProps = {
//  end_date?: string
//  orgId: string
//  start_date?: string
//  vendor_id?: PiSelectProps
// }
// type SendDataProps = {
//  close: boolean
//  target?: string
// }
export default function LogHistoryDetailGrid({
  propsData,
  sendEventData,
}: any) {
  const [columndata, setColumnData] = useState([]);
  const requestInfo = {};
  const [loading, setloading] = useState(true);
  const history = useHistory();
  const [openSideDrawer, setSideDrawer] = useState(false);
  const [columnApi, setcolumnApi]: any = useState();
  const [isExportable, setExportable] = useState<any>(false);
  const localStorageData = getLocalStorage("userPermission");
  const [gridDataLength, setGridDataLength] = useState<any>();

  useEffect(() => {
    (async () => {
      const isexportable: any = await getPermissionObject(
        "special-pricing_export"
      );
      setExportable(isexportable["special-pricing_export"]);
    })();
  }, [localStorageData]);

  useEffect(() => {
    console.log(columnApi);
    if (columnApi) {
      setTimeout(() => {
        autoSizeAll(columnApi);
      }, 2000);
    }
  }, [columnApi]);

  const getGridRequestParams = useCallback(
    (filterData: any) => {
      const info = {
        body: {
          organizations_id: propsData.params ? propsData.params.orgId : "",
          grid_name: "sp_log_history",
          serverFilterOptions: filterData ? filterData.filters : {},
        },
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          timezoneoffset: new Date().getTimezoneOffset(),
        },
        url: `${process.env.REACT_APP_API_URL}/${EndpointUrl.SPLogHistory}/${propsData.log_history_id}`,
      };
      setLocalStorage("requestInfo", JSON.stringify(info));
      setloading(false);
    },
    [propsData.log_history_id, propsData.params]
  );

  useEffect(() => {
    setSideDrawer(true);
    (async () => {
      if (propsData) {
        const modified: any = await getColumnFilterData("sp_log_history");
        setColumnData(modified.column_data);
        getGridRequestParams(modified);
      } else {
        history.push("/special-pricing/");
      }
    })();
  }, [getGridRequestParams, history, propsData]);

  const onGridReady = (params: GridReadyEvent) => {
    setcolumnApi(params.columnApi);
  };
  function componentStateChanged() {
    const response = getLocalStorage("gridResponse") as string;
    const len = response ? JSON.parse(response).length : 0;
    setGridDataLength(len);
  }
  const onBreadCrumbChange = (obj: any) => {
    if (obj.id === "special-pricing") {
      setSideDrawer(false);
      sendEventData({
        close: true,
        target: "special-pricing",
      });
    } else if (obj.id === "pricing") {
      setSideDrawer(false);
      sendEventData({
        close: true,
        target: "pricing",
      });
      history.push("/pricing/");
    }
  };
  function closeModel() {
    setSideDrawer(false);
    sendEventData({
      close: true,
    });
  }

  async function getGridParamsArray(selecteList: any, key: string) {
    if (selecteList) {
      let obj: any = {};

      for (let i = 0; i < selecteList.length; i += 1) {
        obj = {
          ...obj,
          [`${key}[${i}]`]: selecteList[i],
        };
      }
      return obj;
    }
    return null;
  }
  const [opacity, setOpacity] = useState(false);
  const [openConFirm, setConFirm] = useState(false);
  const [confirmText, setConfirmText] = useState<any>();
  const exportData = async () => {
    setOpacity(true);
    const columnsNames: any = [];
    const visibleColumns = columnApi.getAllDisplayedColumns();
    visibleColumns.map((obj: any) => {
      columnsNames.push(obj.colId);
      return obj;
    });
    const filterColumns = await getGridParamsArray(columnsNames, "col_id");
    const response = (await getLocalStorage("gridResponse")) as string;
    if (JSON.parse(response).length) {
      let url: string = localStorage.getItem("appUrl") as string;
      if (url) {
        url = url.substring(url.indexOf("&") + 1);
      }

      let expUrl = EndpointUrl.exportDataByMail.concat(
        `?${url}&id=${propsData.log_history_id}`
      );
      // for (const key in filterColumns) {
      //   if (filterColumns.hasOwnProperty(key)) {
      //     expUrl = `${expUrl}`.concat(`&${key}=${filterColumns[key]}`);
      //   }
      // }

      Object.keys(filterColumns).forEach((key) => {
        expUrl = `${expUrl}`.concat(`&${key}=${filterColumns[key]}`);
      });

      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: expUrl,
        headers: {},
      };
      triggerApi(apiObject)
        .then((res: ApiResponse) => {
          if (res.result.success) {
            setOpacity(false);
            setConfirmText(res.result.data);
            setConFirm(true);
          } else {
            setOpacity(false);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  };

  return (
    <PiSideDrawer isOpen={openSideDrawer} width="full">
      <SideDrawerContainer>
        <HeaderContainer style={{ padding: "8px 41px" }}>
          <BackSection className="sp-preview-header">
            <RepairIdsDiv>
              <BackButton onClick={() => closeModel()}>
                <img src={ChevronLeft} alt="loading" />
              </BackButton>
              <img
                className="repair-view-left-image"
                src={SpecialPriceImg}
                alt="loading"
              />
              <RepairIds>
                <div className="id-num">Pricing Rule Configurator</div>
              </RepairIds>
            </RepairIdsDiv>
            <LinkWithIcon
              onClick={exportData}
              className={
                !gridDataLength
                  ? "save-view Export-Image disable-btns pointer-none"
                  : !isExportable
                    ? "save-view Export-Image no-edit-permission"
                    : "save-view Export-Image"
              }
            >
              <ImgTag
                src={ExportLogo}
                alt="loading"
                className={
                  !gridDataLength
                    ? "save-view Export-Image disable-btns pointer-none"
                    : !isExportable
                      ? "save-view Export-Image no-edit-permission"
                      : "save-view Export-Image"
                }
              />
              <span className="link-icon-text">Export</span>
            </LinkWithIcon>
          </BackSection>
          {/* <RightSideContent>
              <CloseButton
                onClick={() => closeModel()}
                title="close"
                className="Hover"
              >
                <img src={CrossLogo} alt="loading" />
              </CloseButton>
            </RightSideContent> */}
        </HeaderContainer>
        {!loading && propsData && (
          <BreadCrumbsDiv>
            {GlobalVariables.SpBreadCrumbList.map((list: any) => (
              <BreadCrumbItem onClick={() => onBreadCrumbChange(list)}>
                {list.name}
              </BreadCrumbItem>
            ))}
          </BreadCrumbsDiv>
        )}

        <FormBodyOverFlow
          style={{ height: "100%" }}
          className={loading || opacity ? "opacity-on-load" : ""}
        >
          <TableGrid>
            {!loading && propsData && (
              <div className="ag-theme-alpine ag-style">
                <PiServerGrid
                  columns={columndata}
                  mode="paginate"
                  paginationPageSize={25}
                  cacheBlockSize={25}
                  onGridReady={(e: GridReadyEvent) => onGridReady(e)}
                  pagination
                  requestInfo={requestInfo}
                  rowHeight={40}
                  rowSelection="multiple"
                  onComponentStateChanged={() => componentStateChanged()}
                  sideBar={false}
                  overlayNoRowsTemplate={
                    '<span className="ag-overlay-loading-center no-data-styles"> Data Not Available </span>'
                  }
                />
              </div>
            )}
            {!propsData && (
              <DisplayMessageonEmpty msg="Please Select Customer Name" />
            )}
          </TableGrid>
        </FormBodyOverFlow>
        {opacity && (
          <SpinnerDiv style={{ position: "absolute", left: "50%" }}>
            <PiSpinner color="primary" size={50} libraryType="atalskit" />
          </SpinnerDiv>
        )}
        <PiConfirmModel
          className={openConFirm ? "show" : ""}
          headerLabel="Confirmation"
          message={confirmText}
          primaryBtnLabel="OK"
          // secondaryBtnLabel={'Cancel'}
          onClose={() => {
            setConFirm(false);
          }}
          onAccept={() => {
            setConFirm(false);
          }}
          onDecline={() => {
            setConFirm(false);
          }}
        />
      </SideDrawerContainer>
    </PiSideDrawer>
  );
}

export function DisplayMessageonEmpty(props: any) {
  const { msg } = props;
  return <BlankPageMessage>{msg}</BlankPageMessage>;
}

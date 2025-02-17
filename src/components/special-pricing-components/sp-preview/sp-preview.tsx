import {
  PiSpinner,
  PiButton,
  PiSideDrawer,
  PiServerGrid2,
  PiToast,
  PiConfirmModel,
} from "pixel-kit";
import { useCallback, useEffect, useState } from "react";
import {
  ImgTag,
  SpinnerDiv,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import TableGrid from "@app/components/tablegrid/tablegrid";
import { GridReadyEvent } from "ag-grid-community";
import { token, triggerApi } from "@app/services/api-services";
import { useHistory } from "react-router-dom";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import { SideDrawerFooter } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import { ApiResponse } from "@app/services/schema/schema";
import { autoSizeAll, getColumnFilterData } from "@app/helpers/helpers";
import {
  HeaderContainer,
  RepairIdsDiv,
  RepairIds,
  BackSection,
} from "@app/components/detail-view-header/detail-view-header.component";
import { SideDrawerContainer } from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import SpecialPriceImg from "@app/assets/images/specialPricing.svg";
import ChevronLeft from "@app/assets/images/chevron_left.svg";
import { LinkWithIcon } from "@app/components/secondaryheader/secondaryheader.component";
import ExportLogo from "@app/assets/images/Export.svg";
import { getLocalStorage } from "@app/core/localStorage/localStorage";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import { BackButton } from "../logHistoryDetailGrid/logHistoryDetailGrid.component";
import PreviewSideDrawerWrapper from "./sp-preview.component";

export default function SPPreview({ previewParams, sendEventData }: any) {
  const [serverMsg, setServerMsg] = useState(null);
  const [loading, setloading] = useState(true);
  const [columndata, setColumnData]: any = useState([]);
  const history = useHistory();
  // let requestInfo = {}
  const [requestInfo, setRequestInfo]: any = useState({});
  const [openSideDrawer, setSideDrawer] = useState(false);
  const [openSnackbar, setSnackbar] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [isApplyBtnLoading, setApplyIsBtnLoading] = useState(false);
  const [openConFirm, setConFirm] = useState(false);
  const [confirmText, setConfirmText] = useState<any>();
  const [opacity, setOpacity] = useState(false);
  const [columnApi, setcolumnApi]: any = useState();
  // let baseUrl = process.env.REACT_APP_API_URL
  const [isExportable, setExportable] = useState<any>(false);
  const localStorageData = getLocalStorage("userPermission");

  const getGridRequestParams = useCallback(
    (filterData: any) => {
      const info = {
        body: {
          organizations_id: previewParams ? previewParams.organizations_id : "",
          timestamp: previewParams ? previewParams.time_stamp : "",
          grid_name: "Preview",
          serverFilterOptions: filterData ? filterData.filters : {},
        },
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          timezoneoffset: new Date().getTimezoneOffset(),
        },
        url: `${process.env.REACT_APP_API_URL}/${EndpointUrl.SPPreview}`,
      };
      setRequestInfo({ ...info });
      setloading(false);
    },
    [previewParams]
  );

  useEffect(() => {
    if (columnApi) {
      setTimeout(() => {
        autoSizeAll(columnApi);
      }, 2000);
    }
  }, [columnApi]);
  useEffect(() => {
    (async () => {
      const isexportable: any = await getPermissionObject(
        "special-pricing_export"
      );
      setExportable(isexportable["special-pricing_export"]);
    })();
  }, [localStorageData]);
  useEffect(() => {
    (async () => {
      setSideDrawer(true);
      const modified: any = await getColumnFilterData(
        "special_pricing_preview",
        previewParams.time_stamp
      );
      console.log(modified);
      setColumnData(modified.column_data);
      getGridRequestParams(modified);
    })();
  }, [getGridRequestParams, previewParams.time_stamp]);

  const onGridReady = (params: GridReadyEvent) => {
    setcolumnApi(params.columnApi);
  };
  const updateSpecialPriceData = async () => {
    setApplyIsBtnLoading(true);
    setOpacity(true);
    const params = {
      ...previewParams,
      is_preview: false,
    };
    const apiObject = {
      payload: params,
      method: "POST",
      apiUrl: `${EndpointUrl.SpecialPrice}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        setloading(false);
        if (response.result.success) {
          setOpacity(false);
          setServerMsg(null);
          setToastMsg("Applied Successfully");
          setSnackbar(true);
          // requestInfo = {
          //  body: {
          //    organizations_id: props.previewParams
          //      ? props.previewParams.organizations_id
          //      : '',
          //    grid_name: 'Preview',
          //    serverFilterOptions: {},
          //    is_delete: true,
          //  },
          //  method: 'GET',
          //  headers: {
          //    Authorization: 'Bearer ' + token,
          //    timezoneoffset: new Date().getTimezoneOffset(),
          //  },
          //  url: `${process.env.REACT_APP_API_URL}/${EndpointUrl.SPPreview}`,
          // }
          // await setLocalStorage('requestInfo', JSON.stringify(requestInfo))
          // await gridApi.purgeServerSideCache()
          // setTimeout(() => {
          // history.push(`/special-pricing`, params)
          // }, 2000)
        } else {
          setServerMsg(response.result.data);
          setApplyIsBtnLoading(false);
          setOpacity(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  function closeModel() {
    setSideDrawer(false);
    sendEventData({
      close: true,
    });
  }
  const triggerSnackBarEvent = async () => {
    setSnackbar(false);
    if (toastMsg === "Applied Successfully") {
      setTimeout(() => {
        history.push("/special-pricing", previewParams);
      }, 100);
    }
  };

  async function exportData() {
    const response = (await getLocalStorage("gridResponse")) as string;
    if (JSON.parse(response).length) {
      let url: string = localStorage.getItem("appUrl") as string;
      if (url) {
        url = url.substring(url.indexOf("&") + 1);
      }

      const export_Url = EndpointUrl.exportDataByMail.concat(
        `?${url}&grid_name=${"special_pricing_preview"}`
      );

      setOpacity(true);
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: export_Url,
        headers: {},
      };
      triggerApi(apiObject)
        .then((res: ApiResponse) => {
          if (res.result.success) {
            setOpacity(false);
            setConfirmText(res.result.data);
            setConFirm(true);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  }
  return (
    <PreviewSideDrawerWrapper>
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
                onClick={() => exportData()}
                className={
                  !isExportable
                    ? "save-view Export-Image no-edit-permission"
                    : "save-view Export-Image"
                }
              >
                <ImgTag
                  src={ExportLogo}
                  alt="loading"
                  className={
                    !isExportable
                      ? "save-view Export-Image no-edit-permission"
                      : "save-view Export-Image"
                  }
                />
                <span className="link-icon-text">Export</span>
              </LinkWithIcon>
            </BackSection>
          </HeaderContainer>
          <FormBodyOverFlow
            className={loading || opacity ? "opacity-on-load" : ""}
          >
            {!loading && columndata.length > 0 && (
              <TableGrid>
                <div className="ag-theme-alpine ag-style">
                  <PiServerGrid2
                    columns={columndata}
                    mode="paginate"
                    paginationPageSize={25}
                    cacheBlockSize={25}
                    onGridReady={(e: GridReadyEvent) => onGridReady(e)}
                    pagination
                    requestInfo={requestInfo}
                    rowHeight={40}
                    rowSelection="multiple"
                    overlayNoRowsTemplate={
                      '<span className="ag-overlay-loading-center no-data-styles"> Data Not Available </span>'
                    }
                  />
                </div>
              </TableGrid>
            )}
          </FormBodyOverFlow>
          {(loading || opacity) && (
            <SpinnerDiv style={{ position: "absolute", left: "50%" }}>
              <PiSpinner color="primary" size={50} libraryType="atalskit" />
            </SpinnerDiv>
          )}

          <SideDrawerFooter>
            {serverMsg && <div className="server-msg">{serverMsg}</div>}

            <PiButton
              type="submit"
              appearance="primary"
              label="Apply Rule"
              isDisabled={isApplyBtnLoading || opacity}
              onClick={() => updateSpecialPriceData()}
            />
          </SideDrawerFooter>
          {/* {openSnackbar && (
            <Snackbar message={toastMsg} triggerEvent={triggerSnackBarEvent} />
          )} */}
          <PiToast
            className={openSnackbar ? "show" : ""}
            headerLabel={toastMsg}
            message=""
            onClose={triggerSnackBarEvent}
          />
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
    </PreviewSideDrawerWrapper>
  );
}

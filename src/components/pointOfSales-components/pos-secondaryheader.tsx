/* eslint-disable no-nested-ternary */
import {
  RepairIdsDiv,
  RightSideContent,
  HeaderContainer,
  BackSection,
  RepairIds,
} from "@app/components/detail-view-header/detail-view-header.component";
import SpecialPriceImg from "@app/assets/images/specialPricing.svg";
import { useEffect, useState } from "react";
import ExportLogo from "@app/assets/images/Export.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { token, triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import { PiToast } from "pixel-kit";
import SentMailLogo from "@app/assets/images/sent_mail.svg";
import SentReportLogo from "@app/assets/images/sent_report.svg";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import {
  getLocalStorage,
  removeLocalStorage,
} from "../../core/localStorage/localStorage";
import {
  LinkWithIcon,
  ImgTag,
} from "../secondaryheader/secondaryheader.component";

export default function POSSecondaryHeader({
  posListFlags,
  spGridProps,
  sendOpacity,
}: any) {
  // let [permissionObject, setpermissionObject] = useState<any>({})
  const [gridDataLength, setGridDataLength] = useState<any>();
  // let [isExportable, setExportable] = useState<any>(false)

  // const localStorageData = getLocalStorage('userPermission')
  const [toastMsg, setToastMsg] = useState("");
  const [openSnackbar, setSnackbar] = useState(false);
  const [permissionObject, setpermissionObject] = useState<any>({});
  const localStorageData = getLocalStorage("userPermission");

  useEffect(() => {
    console.log(spGridProps);
  }, [spGridProps]);

  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("point-of-sales");
      setpermissionObject(permission);
    })();
  }, [localStorageData]);
  useEffect(() => {
    removeLocalStorage("gridResponse");
  }, []);
  // useEffect(() => {
  //  ;(async () => {
  //    let exportLabel = window.location.pathname.substring(1).concat('_export')
  //    const isexportable: any = await getPermissionObject(exportLabel)
  //    setExportable(isexportable[exportLabel])
  //    const permission = await getPermissionObject(
  //      window.location.pathname.substring(1),
  //    )
  //    setpermissionObject(permission)

  //  })()
  // }, [localStorageData])

  useEffect(() => {
    (async () => {
      setGridDataLength(!!(posListFlags && posListFlags.gridDataLength2 > 0));
      console.log(gridDataLength);
    })();
  }, [posListFlags]);
  const baseUrl = process.env.REACT_APP_API_URL;

  const exportDataMail = async (type: string, newType: string) => {
    sendOpacity(true);

    const response = (await getLocalStorage("gridResponse")) as string;
    if (response && JSON.parse(response).length) {
      await setGridDataLength(true);
    } else {
      await setGridDataLength(false);
    }
    if (gridDataLength) {
      let url: string = localStorage.getItem("appUrl") as string;
      if (url) {
        url = url.substring(url.indexOf("&") + 1);
      }

      const expurl = EndpointUrl.exportSalesReport.concat(
        `?${url}&token=${token}&export-type=${type}&type=${newType}`
      );
      if (type === "download") {
        window.location.href = baseUrl + expurl;
        sendOpacity(false);
      } else {
        const apiObject = {
          payload: {},
          method: "GET",
          apiUrl: expurl,
          headers: {},
        };
        triggerApi(apiObject)
          .then((res: ApiResponse) => {
            if (res && res.result.success) {
              setToastMsg(
                newType === "test_mail"
                  ? "Email send Successfully"
                  : "Report send Successfully"
              );
              setSnackbar(true);
            } else {
              setToastMsg(
                newType === "test_mail"
                  ? "Failed to send Email"
                  : "Failed to send Report"
              );
              setSnackbar(true);
            }
            sendOpacity(false);
          })
          .catch((err: string) => {
            console.log(err);
          });
      }
    }
  };
  return (
    <>
      <HeaderContainer>
        <BackSection>
          <RepairIdsDiv>
            <img
              className="repair-view-left-image"
              src={SpecialPriceImg}
              alt="loading"
            />
            <RepairIds>
              <div className="id-num page-label">Point of Sales</div>
            </RepairIds>
          </RepairIdsDiv>
        </BackSection>
        <RightSideContent>
          <>
            <LinkWithIcon
              // href={baseUrl + exportUrl}
              onClick={() => exportDataMail("download", "")}
              className={
                !permissionObject.Yes
                  ? "save-view Export-Image no-edit-permission"
                  : !gridDataLength || !spGridProps.params
                    ? "save-view Export-Image disable-btns pointer-none"
                    : "save-view Export-Image"
              }
            >
              <ImgTag
                src={ExportLogo}
                alt="loading"
                className={
                  !gridDataLength || !spGridProps.params
                    ? "save-view Export-Image disable-btns"
                    : !permissionObject.Yes
                      ? "save-view Export-Image no-edit-permission"
                      : "save-view Export-Image"
                }
              />
              <span className="link-icon-text">Export</span>
            </LinkWithIcon>
            <LinkWithIcon
              // href={baseUrl + exportUrl}
              onClick={() => exportDataMail("mail", "test_mail")}
              className={
                !permissionObject.Yes
                  ? "save-view Export-Image no-edit-permission"
                  : !gridDataLength || !spGridProps.params
                    ? "save-view Export-Image disable-btns pointer-none"
                    : "save-view Export-Image"
              }
            >
              <ImgTag
                src={SentMailLogo}
                alt="loading"
                className={
                  !gridDataLength || !spGridProps.params
                    ? "save-view Export-Image disable-btns"
                    : // : !isExportable
                      // ? 'save-view Export-Image no-edit-permission'
                      "save-view Export-Image"
                }
              />
              <span className="link-icon-text">Send Test Email</span>
            </LinkWithIcon>
            <LinkWithIcon
              // href={baseUrl + exportUrl}
              onClick={() => exportDataMail("mail", "pos_mail")}
              className={
                !permissionObject.Yes
                  ? "save-view Export-Image no-edit-permission"
                  : !gridDataLength || !spGridProps.params
                    ? "save-view Export-Image disable-btns pointer-none"
                    : "save-view Export-Image"
              }
            >
              <ImgTag
                src={SentReportLogo}
                alt="loading"
                className={
                  !gridDataLength || !spGridProps.params
                    ? "save-view Export-Image disable-btns"
                    : // : !isExportable
                      // ? 'save-view Export-Image no-edit-permission'
                      "save-view Export-Image"
                }
              />
              <span className="link-icon-text">Send Report</span>
            </LinkWithIcon>
          </>
        </RightSideContent>
      </HeaderContainer>
      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel={toastMsg}
        message=""
        onClose={async () => setSnackbar(false)}
      />
    </>
  );
}

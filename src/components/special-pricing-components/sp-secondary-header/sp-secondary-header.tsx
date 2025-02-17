import { PiButton, PiConfirmModel, PiIconDropdownMenu } from "pixel-kit";
import { useEffect, useState } from "react";
import {
  HeaderContainer,
  RepairIdsDiv,
  RepairIds,
  BackSection,
  RightSideContent,
} from "@app/components/detail-view-header/detail-view-header.component";
import SpecialPriceImg from "@app/assets/images/specialPricing.svg";
import { useHistory } from "react-router-dom";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import {
  LinkWithIcon,
  ImgTag,
} from "@app/components/secondaryheader/secondaryheader.component";
import { getLocalStorage } from "@app/core/localStorage/localStorage";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services/api-services";
import ExportLogo from "@app/assets/images/Export.svg";
import ImportLogo from "@app/assets/images/Import.svg";
import BuySideImport from "../sp-file-imports/sp-buy-side-import";

export default function SpSecondaryHeader({ headerdata, sendData }: any) {
  const history = useHistory();
  const [permissionObject, setpermissionObject] = useState<any>({});
  const [gridDataLength, setGridDataLength] = useState<any>();
  const [isExportable, setExportable] = useState<any>(false);
  const [openConFirm, setConFirm] = useState(false);
  const localStorageData = getLocalStorage("userPermission");
  const [openBuySideModel, setBuySideOpenModel] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("");
  const [confirmHeader, setConfirmHeader] = useState("");

  useEffect(() => {
    (async () => {
      const exportLabel = window.location.pathname
        .substring(1)
        .concat("_export");
      const isexportable: any = await getPermissionObject(exportLabel);
      setExportable(isexportable[exportLabel]);
      const permission = await getPermissionObject(
        window.location.pathname.substring(1)
      );
      setpermissionObject(permission);
      const response = getLocalStorage("gridResponse") as string;
      const gridData = response ? JSON.parse(response).length : 0;
      setGridDataLength(gridData);
    })();
  }, [localStorageData]);

  const onConfigure = async () => {
    const permission: any = await getPermissionObject(
      window.location.pathname.substring(1)
    );
    if (permission.Edit) {
      history.push("/special-pricing/pricing-rule-configurator");
    } else {
      history.push("/access-denied");
    }
  };

  async function exportDataMail() {
    // const response = (await getLocalStorage('gridResponse')) as string
    if (headerdata.gridLength) {
      await setGridDataLength(true);
    } else {
      await setGridDataLength(false);
    }
    if (gridDataLength) {
      setConFirm(true);
      setConfirmHeader("Export Data");
      setConfirmMsg(
        "Your export is being processed, an email will be sent with the file attachment to your registered email"
      );
      let expurl: string = localStorage.getItem("appUrl") as string;
      if (expurl) {
        console.log(expurl.indexOf("&"));
        expurl = expurl.substring(expurl.indexOf("&") + 1);
        console.log(expurl);
      }

      let exportUrl = EndpointUrl.exportDataByMail.concat(
        `?${expurl}&grid_name=special_pricing`
      );
      const url = `${exportUrl}`;
      exportUrl = url;
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: url,
        headers: {},
      };
      triggerApi(apiObject)
        .then(() => {})
        .catch((err: string) => {
          console.log(err);
        });
    }
  }

  const getFileType = (event: any) => {
    if (event.id === "1") {
      return "Buy Side";
    }
    if (event.id === "2") {
      return "Sell Side";
    }
    if (event.id === "3") {
      return "Buy Side for All Customers";
    }
    if (event.id === "4") {
      return "Sell Side for All Customers";
    }
    return "";
  };
  const [uploadInputs, setUploadInputs]: any = useState();
  const openDropDown = (e: any) => {
    console.log(e);
    const obj = {
      filetype: getFileType(e),
    };
    setUploadInputs(obj);
    setBuySideOpenModel(true);
  };
  const triggerEventData = (e: any) => {
    if (e && e.close) {
      setBuySideOpenModel(false);
    }
    if (e && e.success) {
      setBuySideOpenModel(false);
      setConfirmHeader("Import Data");
      setConfirmMsg(
        "The import process will be running in the background. Once complete, a mail will be sent to your registered email"
      );
      setConFirm(true);
      sendData({ success: true });
    }
  };
  const getClassName = (): any => {
    if (!isExportable) {
      return "Icon-space no-edit-permission";
    }
    if (!headerdata.gridLength) {
      return "Icon-space disable-btns";
    }
    return "Icon-space";
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
              <div className="id-num page-label">Non Standard Pricing</div>
            </RepairIds>
          </RepairIdsDiv>
        </BackSection>
        <RightSideContent>
          {permissionObject.Edit && (
            <PiButton
              appearance="primary"
              label="Configure"
              onClick={onConfigure}
            />
          )}
          {permissionObject.Edit && (
            <div className="More-Options">
              <PiIconDropdownMenu
                items={[
                  {
                    id: "1",
                    element: (
                      <LinkWithIcon>
                        <ImgTag
                          src={ImportLogo}
                          className="save-view Export-Image"
                        />
                        <span className="link-icon-text">
                          Import Buy Side Data
                        </span>
                      </LinkWithIcon>
                    ),
                  },
                  {
                    id: "2",
                    element: (
                      <LinkWithIcon>
                        <ImgTag
                          src={ImportLogo}
                          className="save-view Export-Image"
                        />
                        <span className="link-icon-text">
                          Import Sell Side Data
                        </span>
                      </LinkWithIcon>
                    ),
                  },
                ]}
                onOpenChange={openDropDown}
              />
            </div>
          )}
          {headerdata && headerdata.tabIndex === 1 && (
            <LinkWithIcon
              // href={baseUrl + exportUrl}
              onClick={() => exportDataMail()}
              className={getClassName as any}
            >
              <ImgTag
                src={ExportLogo}
                alt="loading"
                className={getClassName as any}
              />
              <span className="link-icon-text">Export</span>
            </LinkWithIcon>
          )}
        </RightSideContent>
      </HeaderContainer>
      {/* {openConFirm && (
        <ConfirmPopup
          confirmText={confirmText}
          sendModelData={getConfirmModelEvent}
        ></ConfirmPopup>
      )} */}

      <PiConfirmModel
        className={openConFirm ? "show" : ""}
        headerLabel={confirmHeader}
        message={confirmMsg}
        onClose={async () => {
          setConFirm(false);
          setConfirmMsg("");
        }}
        primaryBtnLabel="Okay"
        onAccept={async () => {
          setConFirm(false);
          setConfirmMsg("");
        }}
      />
      {openBuySideModel && (
        <BuySideImport
          uploadInputs={uploadInputs}
          sendEventData={triggerEventData}
        />
      )}
    </>
  );
}

import {
  PiPermissionsList,
  PiButton,
  PiTypography,
  PiConfirmModel,
} from "pixel-kit";
import { useEffect, useState } from "react";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import {
  PermissionsWrapper,
  PermissionFooter,
} from "../user-role-permissions.component";

export default function PermissionBox({
  permissionData,
  sendEvent,
  resetEvent,
}: any) {
  const [totalPermissions, setTotalPermisssions]: any = useState([]);
  const [selectedPermissions, setSelectedPermissions]: any = useState({});
  const [showSavePanel, setSavePanel] = useState(false);
  const [serverMsg, setServerMsg] = useState(null);
  const [confirmText, setConfirmText] = useState<any>();
  const [openConFirm, setConFirm] = useState(false);
  const [permissionObject, setpermissionObject] = useState<any>({});

  useEffect(() => {
    console.log(permissionData.user_data);
    (async () => {
      setSavePanel(permissionData.showSavePanel);
      setServerMsg(permissionData.serverMsg);
      setSelectedPermissions({
        ...permissionData.user_data.permissions,
      });
      setTotalPermisssions(permissionData.user_data.totalPerm);

      const permission = await getPermissionObject(
        window.location.pathname.substring(1)
      );
      setpermissionObject(permission);
    })();
  }, [permissionData]);
  function manageChildperm(permissionArrray: any, selectedPerms: any) {
    console.log(permissionArrray, selectedPerms);
    permissionArrray.map((obj: any) => {
      obj.children.map((child: any) => {
        if (child.children.length) {
          const a = Object.keys(selectedPerms);
          const index = a.findIndex((element) => element === child.id);
          if (a[index] === child.id && selectedPerms[a[index]] === "0") {
            child.allow_child = false;
          } else {
            child.allow_child = true;
          }
        }
        return child;
      });
      return obj;
    });
    return permissionArrray;
  }
  function permValueChange(e: any, obj: any, val: any) {
    console.log(obj, e, val);
    setSelectedPermissions({ ...e });
    obj.allow_child = !obj.allow_child;
    if (obj.children) {
      obj.children.map((ele: any) => {
        // if (e.hasOwnProperty(ele.id) && ele.type !== 'select') {
        //  e[ele.id] = '0'
        // } else if (e.hasOwnProperty(ele.id) && ele.type === 'select') {
        //  e[ele.id] = { label: 'None', value: '0' }
        // }
        console.log(val, Object.hasOwnProperty.call(e, ele.id), ele.type);
        if (
          val === "2" &&
          Object.hasOwnProperty.call(e, ele.id) &&
          ele.type === "select"
        ) {
          e[ele.id] = { label: "Upto $10k", value: "1" };
        } else if (
          val !== "2" &&
          Object.hasOwnProperty.call(e, ele.id) &&
          ele.type === "select"
        ) {
          e[ele.id] = { label: "None", value: "0" };
        }
        setSelectedPermissions({ ...e });

        return e;
      });
    } else {
      setSelectedPermissions({ ...e });
    }
    setSavePanel(true);
    if (obj.allow_child !== undefined) {
      // setTotalPermisssions([])
      // console.log(totalPermissions)
      const data2 = manageChildperm(totalPermissions, e);
      setTotalPermisssions(data2);
    }
  }

  function savePermissions() {
    setConfirmText("Are you sure you want to update changes?");
    setConFirm(true);
  }
  function getPermissionById(id: string) {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${permissionData.user_data.apiUrls.pageUrl}/${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const data = response.result.data.permissions;
          setSelectedPermissions({ ...data });
          const data2 = manageChildperm(totalPermissions, data);
          console.log(data2);
          setTotalPermisssions(data2);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  async function resetPermission() {
    getPermissionById(permissionData.user_data.id);
    setSavePanel(false);
    setServerMsg(null);
    const updatedData = {
      flag: "proceed",
      perm_data: permissionData,
    };
    resetEvent(updatedData);
  }

  async function getConfirmModelEvent(e: any) {
    console.log(e);
    if (e === "accept") {
      setSavePanel(false);
      const updatedData = {
        flag: "proceed",
        permissions: selectedPermissions,
        perm_data: permissionData,
      };
      sendEvent(updatedData);
    } else {
      resetPermission();
    }
    setConFirm(false);
  }

  return (
    <>
      <PermissionsWrapper style={{ padding: "24px" }}>
        {window.location.pathname.substring(1) === "user_roles" && (
          <PiTypography component="h4">Permissions </PiTypography>
        )}
        <div className={permissionObject.Edit === false ? " pointer-none" : ""}>
          <PiPermissionsList
            inputObject={totalPermissions}
            values={selectedPermissions}
            // eslint-disable-next-line react/jsx-no-bind
            onValueChange={permValueChange}
          />
        </div>
      </PermissionsWrapper>
      {showSavePanel && permissionObject.Edit && (
        <PermissionFooter>
          {serverMsg && <div className="server-msg">{serverMsg}</div>}
          <PiButton
            appearance="secondary"
            label="Cancel"
            onClick={() => resetPermission()}
          />
          <PiButton
            appearance="primary"
            label="Save"
            onClick={() => savePermissions()}
          />
        </PermissionFooter>
      )}
      <PiConfirmModel
        className={openConFirm ? "show" : ""}
        headerLabel="Confirmation"
        message={confirmText}
        primaryBtnLabel="Accept"
        secondaryBtnLabel="Decline"
        onClose={() => {
          setConFirm(false);
        }}
        onAccept={(e: any) => getConfirmModelEvent(e)}
        onDecline={() => {
          setConFirm(false);
        }}
      />
    </>
  );
}

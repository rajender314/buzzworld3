import {
  PiDropdownMenu,
  PiInput,
  PiLeftMenu,
  PiSelect,
  PiSpinner,
  PiTextArea,
  PiToast,
  PiTooltip,
} from "pixel-kit";
import { useContext, useEffect, useState } from "react";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";

import { getPermissionObject } from "@app/helpers/componentHelpers";
import { AuthContext } from "@app/providers";
import AccesssDenied from "@app/modules/access-denied/component";
import {
  NoVendorFound,
  SideMenuContainer,
  SpinnerDiv,
} from "../commonLayout/commonLayout.component";
import SideMenuList from "../sidelist";
import {
  RolesAndPermissionContainer,
  UserRoleSideHeading,
  RoleHeadingDiv,
  RoleHeadingTextDiv,
  Permissions,
  UserRolesFields,
  SortIconDiv,
} from "./user-role-permissions.component";
import AddRole from "../popups/addRole/addRole";
import PermissionBox from "./permissionBox/permissionBox";
import DescSortIcon from "../../assets/images/sort.svg";
import AscSortIcon from "../../assets/images/asc_sort.svg";
import { DetailViewStatusDropdown } from "../detail-view-header/detail-view-header.component";
import { AddUserIconsContainer } from "../usersComponents/userslist/userslist.component";
import { LinkWithIcon } from "../secondaryheader/secondaryheader.component";

export default function UserRolesPermissions({
  sendUserRoleData,
  isUserRoleAdded,
}: any) {
  const [rolesList, setRolesList]: any = useState([]);
  const [activeRole, setActiveRole] = useState("all");

  const [username, setUsername] = useState("");
  const [userdescription, setUserDescription] = useState("");
  const [defaultPermList, setDefaultPermList] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [totalCount, setCount] = useState(null);
  const [openAddRoleModel, setAddRoleModel] = useState(false);
  const [totalPermissions, setTotalPermisssions]: any = useState([]);
  const [userDetails, setUserDetails]: any = useState({});

  const [permissionProps, setPermissionProps]: any = useState(null);
  const [loading, setloading] = useState(true);
  const [statusParam, setStatusParam] = useState(null);
  const [userSpinner, setUserSpinner] = useState(true);
  const statusFilterArray = [
    { label: "All", value: "all" },
    { label: "Active", value: "true" },
    { label: "InActive", value: "false" },
  ];
  const [userRolesTypes, setUserRolesTypes]: any = useState([]);
  const [selectUserRoleType, setSelectUserRoleType]: any = useState();
  const [permissionObject, setpermissionObject] = useState<any>({});
  const authcontextvalue = useContext(AuthContext);
  const [openSnackbar, setSnackbar] = useState(false);
  const [sortUser, setSortUser] = useState("asc");
  const [userStatus, setUserStatus] = useState("");
  const [globalPermsByIDResp, setglobalPermsByIDResp]: any = useState();

  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject(
        window.location.pathname.substring(1)
      );
      setpermissionObject(permission);
    })();
  }, [authcontextvalue]);
  useEffect(() => {
    setUserDetails(userDetails);
  }, [userDetails]);

  async function userRolesTypesApi() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.UserRoleTypes}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          setUserSpinner(false);
          const res = response.result.data;
          // selectUserRoleType = res && res.length ? res[0] : "";
          setSelectUserRoleType(res && res.length ? res[0] : "");
          let list = [];
          list = res.map((item: any) => ({
            id: item.value,
            name: (
              <div className="Button-Icon-Display">
                <LinkWithIcon className="Icon-space">
                  <span className="link-icon-text">{item.label}</span>
                </LinkWithIcon>
              </div>
            ),
            display: true,
            isSelected: item.value === 1,
            ...item,
          }));
          setUserRolesTypes([...list]);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
    return true;
  }

  function manageChildperm(permissionArrray: any) {
    console.log(permissionArrray, globalPermsByIDResp);
    permissionArrray.map((obj: any) => {
      obj.children.map((child: any) => {
        if (child.children.length) {
          const a = Object.keys(globalPermsByIDResp.permissions);
          const index = a.findIndex((element) => element === child.id);
          console.log(globalPermsByIDResp.permissions[a[index]]);
          if (
            a[index] === child.id &&
            globalPermsByIDResp.permissions[a[index]] === "0"
          ) {
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
  function getPermissionList() {
    console.log(globalPermsByIDResp);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.permissionList}?type=${selectUserRoleType.value}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const permList = response.result.data.permissions;
          setDefaultPermList(response.result.data.default);
          sendUserRoleData({
            userRoleData: selectUserRoleType,
            DefPermList: response.result.data.default,
          });

          const tifOptions: any = [];
          Object.keys(permList).forEach((key) => {
            tifOptions.push(permList[key]);
          });
          const data2 = manageChildperm(tifOptions);
          setTotalPermisssions(data2);
          setloading(false);

          const props = {
            user_data: {
              ...globalPermsByIDResp,
              totalPerm: data2,
              apiUrls: {
                pageUrl: EndpointUrl.Userroles,
              },
            },
          };
          setPermissionProps(props);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  async function userRoles(userId?: string) {
    let options: any = [];
    setUserSpinner(true);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: statusParam
        ? `${EndpointUrl.Userroles}?sort=${sortUser}&status[0]=${statusParam}&user_role_type=${selectUserRoleType.value}&is_display_code=no_code`
        : `${EndpointUrl.Userroles}?sort=${sortUser}&user_role_type=${selectUserRoleType.value}&is_display_code=no_code`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          setUserSpinner(false);
          const res = response.result.data.list;
          let list = [];
          list = res.map((item: any) => ({
            key: item.id,
            label: item.name,
            display: true,
            ...item,
          }));
          setCount(response.result.data.total_count);
          const roles = list;
          options = roles;
          setRolesList(roles);
          setActiveRole(userId || list[0].key);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
    return options;
  }
  async function getPermissionById(id?: string) {
    console.log(totalPermissions);
    let globalresp;
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.Userroles}/${id || rolesList[0].id}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const global = response.result.data;
          globalresp = global;
          userDetails.id = global.id;
          userDetails.name = global.name;
          userDetails.description = global.description;
          userDetails.status = global && global.status ? global.status : "";
          // setUserStatus(global.status === "Active" ? true : false);
          setUserStatus(global && global.status ? global.status : "");

          setUsername(global.name);
          setUserDescription(global.description);
          setUserDetails(userDetails);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
    return globalresp;
  }
  useEffect(() => {
    (async () => {
      if (permissionObject.View) {
        await userRolesTypesApi();
      }
    })();
  }, [permissionObject]);
  useEffect(() => {
    (async () => {
      if (permissionObject.View && rolesList.length > 0) {
        const resp: any = await getPermissionById();
        setglobalPermsByIDResp(resp);
      }
    })();
  }, [permissionObject, rolesList]);
  useEffect(() => {
    (async () => {
      if (permissionObject.View && selectUserRoleType) {
        await userRoles();
      }
    })();
  }, [permissionObject, selectUserRoleType, statusParam, sortUser]);

  useEffect(() => {
    (async () => {
      if (permissionObject.View && selectUserRoleType && globalPermsByIDResp) {
        getPermissionList();
      }
    })();
  }, [permissionObject, selectUserRoleType, globalPermsByIDResp]);

  useEffect(() => {
    (async () => {
      if (isUserRoleAdded) {
        const list: any = await userRoles();
        if (list && list.length > 0) {
          getPermissionById(list[0].id);
          // setToastMsg("Added Successfully");
          // setSnackbar(true);
        }
      }
    })();
  }, [isUserRoleAdded]);

  async function onRoleClick(obj: any) {
    setloading(true);
    setActiveRole(obj.key);
    const resp: any = await getPermissionById(obj?.id);
    setglobalPermsByIDResp(resp);
    const data2 = manageChildperm(totalPermissions);
    setTotalPermisssions(data2);
    console.log(resp, 311);
    const props = {
      user_data: {
        ...resp,
        totalPerm: data2,
        apiUrls: {
          pageUrl: EndpointUrl.Userroles,
        },
      },
    };
    setPermissionProps(props);
    setloading(false);
  }
  function proceedSavePermissions(updatedPerms: any) {
    console.log(updatedPerms.permissions);
    const param = {
      permissions: updatedPerms.permissions,
      user_role_type: selectUserRoleType.value,
      ...userDetails,
    };
    const apiObject = {
      payload: param || {},
      method: `${userDetails.id ? "PUT" : "POST"}`,
      apiUrl: userDetails.id
        ? `${EndpointUrl.Userroles}/${userDetails.id}`
        : `${EndpointUrl.Userroles}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          userRoles(userDetails.id);
          setToastMsg(
            userDetails.id ? "Updated Successfully" : "Added Successfully"
          );
          setSnackbar(true);
          // setUserInfo([])
          getPermissionById(userDetails.id);
        } else {
          const props = {
            ...permissionProps,
            serverMsg: response.result.data,
          };
          setPermissionProps(props);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  function onUserNameChange(e: any) {
    userDetails.name = e.target.value;
    setUsername(e.target.value);
    const props = {
      ...permissionProps,
      showSavePanel: true,
      serverMsg: null,
    };
    setPermissionProps(props);
  }
  function onDescriptionChange(e: any) {
    userDetails.description = e.target.value;
    setUserDescription(e.target.value);
    const props = { ...permissionProps, showSavePanel: true };
    setPermissionProps(props);
  }

  function onStatusChange(e: any) {
    setUserStatus(e);
    userDetails.status = e && e ? e : "";
    setUserDetails(userDetails);
    setPermissionProps({ ...permissionProps, showSavePanel: true });
  }
  async function getAddRowEvent(e: any) {
    if (e.success) {
      const list: any = await userRoles();
      if (list && list.length > 0) {
        getPermissionById(list[0].id);
      }
      setToastMsg("Added Successfully");
      setSnackbar(true);
    }
    setAddRoleModel(false);
  }
  async function triggerPermEvent(e: any) {
    console.log(e);
    if (e.flag === "proceed") {
      proceedSavePermissions(e);
    }
  }
  async function triggerResetEvent(e: any) {
    const data = e.perm_data.user_data;
    userDetails.name = data.name;
    userDetails.description = data.description;
    setUsername(data.name);
    setUserDescription(data.description);
    userDetails.status = data.status;
    setUserStatus(data.status);
    setUserDetails(userDetails);
  }

  const changeFilter = async (e: any) => {
    setUserSpinner(true);
    setStatusParam(e.value !== "all" ? e.value : null);
  };
  const onSortChange = async () => {
    setUserSpinner(true);
    setSortUser(sortUser === "asc" ? "desc" : "asc");
  };
  const changeUserRoleType = async (e: any) => {
    sendUserRoleData({ userRoleData: e });
    setSelectUserRoleType(e);
  };
  const statusOptions: any = [
    {
      value: "true",
      label: "Active",
    },
    {
      value: "false",
      label: "InActive",
    },
  ];
  return (
    <>
      {Object.keys(permissionObject).length > 0 && permissionObject.View && (
        <RolesAndPermissionContainer>
          <SideMenuContainer className="menu-inside-menu">
            <div className="sideList-Search">
              <RoleHeadingDiv>
                <RoleHeadingTextDiv style={{ gap: "0px", width: "100%" }}>
                  <UserRoleSideHeading>
                    {selectUserRoleType ? selectUserRoleType.label : "Users"} (
                    {totalCount})
                  </UserRoleSideHeading>
                  {userRolesTypes && userRolesTypes.length > 0 && (
                    <DetailViewStatusDropdown className="admin-user-type">
                      <PiDropdownMenu
                        items={userRolesTypes}
                        label=""
                        onOpenChange={changeUserRoleType}
                      />
                    </DetailViewStatusDropdown>
                  )}
                  <AddUserIconsContainer style={{ marginLeft: "auto" }}>
                    <SortIconDiv onClick={onSortChange}>
                      <PiTooltip content="Sort" libraryType="atalskit">
                        {sortUser === "asc" && (
                          <img src={AscSortIcon} alt="loading" />
                        )}
                        {sortUser === "desc" && (
                          <img src={DescSortIcon} alt="loading" />
                        )}
                      </PiTooltip>
                    </SortIconDiv>
                  </AddUserIconsContainer>
                  {/* <SortIconDiv onClick={onSortChange}>
                    <PiTooltip content="Sort" libraryType="atalskit">
                      {sortUser === "asc" && (
                        <img src={AscSortIcon} alt="loading" />
                      )}
                      {sortUser === "desc" && (
                        <img src={DescSortIcon} alt="loading" />
                      )}
                    </PiTooltip>
                  </SortIconDiv> */}
                </RoleHeadingTextDiv>
                {/* {permissionObject["Edit"] && (
                  // <RoleAddIconImg
                  //   src={AddIcon}
                  //   alt="loading"
                  //   onClick={addUserRole}
                  // />
                  <div style={{ cursor: "pointer" }}>
                    <p onClick={addUserRole} className="add-row-text">
                      Add
                    </p>
                  </div>
                )} */}
              </RoleHeadingDiv>
              {/* {userRolesTypes && userRolesTypes.length > 0 && (
                <PiSelect
                  libraryType="atalskit"
                  name="select"
                  onChange={changeUserRoleType}
                  options={userRolesTypes}
                  placeholder="Select"
                  //label="User Roles Types"
                  defaultValue={selectUserRoleType}
                  noOptionsMessage={() => {
                    return " User Role Types Not Found";
                  }}
                />
              )} */}
              <PiSelect
                libraryType="atalskit"
                name="select"
                onChange={changeFilter}
                options={statusFilterArray}
                placeholder="Filter By"
                defaultValue={{ label: "All", value: "all" }}
              />
            </div>
            {!userSpinner && (
              <SideMenuList isActive={activeRole} className="menu-list">
                {!userSpinner && (
                  <div className="left-menu" style={{ padding: "16px" }}>
                    <PiLeftMenu
                      activeKey={activeRole}
                      onMenuClick={(e) => onRoleClick(e)}
                      options={rolesList}
                    />
                    {!totalCount && (
                      <NoVendorFound> User Roles Not Available</NoVendorFound>
                    )}
                  </div>
                )}
              </SideMenuList>
            )}
            {userSpinner && (
              <SpinnerDiv>
                <PiSpinner color="primary" size={30} libraryType="atalskit" />
              </SpinnerDiv>
            )}
          </SideMenuContainer>
          {totalCount !== 0 && (
            <Permissions>
              <UserRolesFields>
                <div style={{ width: "420px" }}>
                  <PiInput
                    label="Name"
                    libraryType="atalskit"
                    name="input"
                    value={username}
                    placeholder="Enter Name"
                    onChange={(e: any) => onUserNameChange(e)}
                    maxLength={30}
                    isDisabled={!permissionObject.Edit}
                  />
                  <PiTextArea
                    label="Description"
                    libraryType="atalskit"
                    name="textarea"
                    value={userdescription}
                    placeholder="Enter Description"
                    onChange={(e: any) => onDescriptionChange(e)}
                    maxLength={255}
                    isDisabled={!permissionObject.Edit}
                  />
                  {/* <PiToggle
                    direction="row"
                    name="toggle"
                    onChange={changeUserStatus}
                    size="large"
                    isChecked={userStatus}
                    label="Status"
                    isDisabled={!permissionObject["Edit"]}
                  /> */}
                  <PiSelect
                    libraryType="atalskit"
                    name="select"
                    label="Status"
                    onChange={(e: any) => onStatusChange(e)}
                    options={statusOptions}
                    placeholder="Select"
                    value={userStatus}
                  />
                </div>
              </UserRolesFields>
              {loading && (
                <SpinnerDiv style={{ height: "100%" }}>
                  <PiSpinner color="primary" size={50} libraryType="atalskit" />
                </SpinnerDiv>
              )}
              {permissionProps && !loading && (
                <PermissionBox
                  permissionData={permissionProps}
                  sendEvent={(e: any) => triggerPermEvent(e)}
                  resetEvent={(e: any) => triggerResetEvent(e)}
                />
              )}
            </Permissions>
          )}
          {!totalCount && !loading && (
            <Permissions>
              <NoVendorFound style={{ position: "relative" }}>
                User Role Not Found
              </NoVendorFound>
            </Permissions>
          )}
        </RolesAndPermissionContainer>
      )}
      {Object.keys(permissionObject).length > 0 && !permissionObject.View && (
        <AccesssDenied />
      )}

      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel={toastMsg}
        message=""
        onClose={async () => setSnackbar(false)}
      />

      {openAddRoleModel && (
        <AddRole
          selectUserRoleType={selectUserRoleType}
          defaultPermList={defaultPermList}
          sendModelData={(e: any) => getAddRowEvent(e)}
        />
      )}
    </>
  );
}

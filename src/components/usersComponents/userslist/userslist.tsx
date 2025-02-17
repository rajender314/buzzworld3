import {
  PiConfirmModel,
  PiDropdownMenu,
  PiFleUploader,
  PiLabelName,
  PiLeftMenu,
  PiSearch,
  PiSpinner,
  PiTabGroup,
  PiTabHeader,
  PiTabHeaderPanel,
  PiTabPanel,
  PiToast,
} from "pixel-kit";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse, UserListProps } from "@app/services/schema/schema";

import PermissionBox from "@app/components/userRolePermissions/permissionBox/permissionBox";
import {
  getLocalStorage,
  removeLocalStorage,
} from "@app/core/localStorage/localStorage";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import { AuthContext } from "@app/providers";
import AccesssDenied from "@app/modules/access-denied/component";
import QuoteStatusAppearance from "@app/core/components/gridStatus/quote-status-apperance";
import { DetailViewStatusDropdown } from "@app/components/detail-view-header/detail-view-header.component";
import { LinkWithIcon } from "@app/components/secondaryheader/secondaryheader.component";
import {
  NoUserFound,
  PiTabHeaderPanelContainer,
  UserRoleField,
} from "./userslist.component";
import UserDetails from "../userDetails/user-details";
import {
  DetailPageSection,
  TabContainer,
} from "../../detail-view-content/detail-view-content.component";
import Avatar from "../../../assets/images/avator.svg";
import {
  RolesAndPermissionContainer,
  RoleHeadingDiv,
  RoleHeadingTextDiv,
  UserRoleSideHeading,
} from "../../userRolePermissions/user-role-permissions.component";
import SideMenuList from "../../sidelist";
import {
  NoVendorFound,
  SideMenuContainer,
  SpinnerDiv,
} from "../../commonLayout/commonLayout.component";
import {
  FormFlexWrapper,
  ImgUploadDiv,
  ProfilePicAvatar,
  ProfileDetails,
} from "../edit-user-details/edit-user-details.component";

export default function UsersList(props: any) {
  const { sideNavData, sendData, isOpenModel } = props;
  const [rolesList, setRolesList] = useState([]);
  const [loading, setloading] = useState(true);
  const [activeRole, setActiveRole] = useState("all");
  const [openSnackbar, setSnackbar] = useState(false);
  const [totalCount, setCount] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  const [permissionProps, setPermissionProps]: any = useState(null);
  const [totalPermissions, setTotalPermisssions] = useState<any[]>([]);
  const [defaultPermList, setDefaultPermList] = useState("");
  const [SearchValue, setSearchValue] = useState("");
  const { current }: any = useRef({ timer: 0 });
  const { userInfo, setUserInfo }: any = useContext(AuthContext);
  const [usersTypes, setUsersTypes]: any = useState([]);
  const [selectedUserType, setSelectedUserType]: any = useState();
  const [primaryBtnLabel, setprimaryBtnLabel] = useState("Proceed");
  const [secondaryBtnLabel, setsecondaryBtnLabel] = useState("Cancel");
  const [permissionObject, setpermissionObject] = useState<any>({});
  const [currentUser, setCurrentUser]: any = useState({});
  const [userSpinner, setUserSpinner] = useState(true);
  const [selectedFile, setSelectedFile]: any = useState();
  const [preview, setPreview] = useState();
  const [statusEditMode, setStatusEditMode] = useState(false);
  let globalVarPerms: any = [];

  useEffect(() => {
    console.log(selectedUserType);
  }, [selectedUserType]);

  function manageChildperm(permissionArrray: any, selected_perms: any) {
    permissionArrray.map((obj: any) => {
      obj.children.map((child: any) => {
        if (child.children.length) {
          const a = Object.keys(selected_perms);
          const index = a.findIndex((element) => element === child.id);
          if (a[index] === child.id && selected_perms[a[index]] === "0") {
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
  function getUserById(id: string) {
    setloading(true);

    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.users}/${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          setloading(false);
          const { data } = response.result;
          setCurrentUser(data);
          data.permissions =
            data.permissions !== "" ? data.permissions : defaultPermList;
          console.log(data.permissions);

          const data2: any = await manageChildperm(
            totalPermissions.length ? totalPermissions : globalVarPerms,
            data.permissions
          );
          console.log(data2);
          setTotalPermisssions([...data2]);
          const perms = {
            title: "Permissions",
            user_data: {
              ...data,
              totalPerm: data2,
              defaultPermList,
              apiUrls: {
                pageUrl: EndpointUrl.users,
              },
            },
          };
          console.log(perms);
          setPermissionProps({ ...perms });

          // handleClickScroll();
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  function usersList(userID?: string) {
    console.log(selectedUserType);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.users}?search=${SearchValue}&user_type=${selectedUserType ? selectedUserType.value : ""}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setUserSpinner(false);
          const res = response.result.data.list;
          setCount(response.result.data.total_count);

          if (res.length) {
            let list = [];

            list = res.map((item: any) => ({
              key: item.id,
              label: item.name,
              display: true,
              ...item,
              icon: item.image_url ? item.image_url : Avatar,
            }));
            setRolesList(list);
            setActiveRole(userID || list[0].key);
            getUserById(userID || list[0].key);
          } else {
            setRolesList(res);
          }
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  // useEffect(() => {
  //   if (userId) {
  //     usersList(userId);
  //   }
  // }, [userId]);
  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject(
        window.location.pathname.substring(1)
      );
      setpermissionObject(permission);
    })();
  }, []);
  useEffect(() => {
    let userPerm: any = getLocalStorage("userPermission");
    userPerm = userPerm ? JSON.parse(userPerm) : null;

    const tifOptions: any = [];
    if (userPerm) {
      Object.keys(userPerm.permissions).forEach((key) => {
        tifOptions.push(userPerm.permissions[key]);
      });
      console.log(tifOptions);
      sideNavData.map((obj: any) => {
        tifOptions.map((ele: any) => {
          if (Object.prototype.hasOwnProperty.call(ele, obj.key)) {
            obj.display = ele[obj.key].View;
          }
          // if (obj.key === 'qc_control') {
          //  obj.display = true
          // }
          return ele;
        });
        return obj;
      });
    }
  }, [getLocalStorage("userPermission")]);
  async function usersTypesApi() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.UserTypes}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const res = response.result.data;
          sendData(res && res.length ? res[0] : "");
          // selectedUserType = res && res.length ? res[0] : "";
          setSelectedUserType(res && res.length ? res[0] : "");
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
          setUsersTypes(list);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
    return true;
  }
  function getPermissionList() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.permissionList}?type=${selectedUserType ? selectedUserType.value : ""}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const permList = response.result.data.permissions;
          let list: any = [];
          setDefaultPermList(response.result.data.default);
          const tifOptions: any[] = [];
          Object.keys(permList).forEach((key) => {
            tifOptions.push(permList[key]);
          });
          list = tifOptions;
          console.log(list);
          globalVarPerms = list;
          // totalPermissions = list;
          // setTotalPermisssions([...list]);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
    return true;
  }
  useEffect(() => {
    (async () => {
      if (permissionObject.View) {
        await usersTypesApi();
      }
    })();
  }, [permissionObject]);
  useEffect(() => {
    if (permissionObject.View && selectedUserType) {
      if (current.timer) clearTimeout(current.timer);
      current.timer = setTimeout(() => {
        getPermissionList();
        usersList();
      }, 1000);
    }
  }, [permissionObject, selectedUserType, SearchValue]);

  useEffect(() => {
    let syncing;
    const myInterval = setInterval(() => {
      console.log(333333333333);
      syncing = getLocalStorage("syncing");
      if (syncing === "success") {
        removeLocalStorage("syncing");
        clearInterval(myInterval);
      } else {
        clearInterval(myInterval);
      }
    }, 5000);
  }, []);

  // const handleClickScroll = (id: any) => {
  //   const element = document.getElementById(activeRole);
  //   if (element) {
  //     // :point_down: Will scroll smoothly to the top of the next section
  //     element.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  function onRoleClick(e: any) {
    setActiveRole(e.key);
    // let usersLeftMenu: any = document.querySelector(".users-left-menu");
    // let leftMenuContainer: any = usersLeftMenu.querySelector(".css-1sz2h21");
    // let leftMenu: any = leftMenuContainer.querySelector(".left-menu");
    // let menuOption: any = leftMenu.querySelector(".menu-option");
    // let activeMenuItem: any = menuOption.querySelector(
    //   ".active.menu-item-single"
    // );

    // activeMenuItem.setAttribute("id", e.key);

    usersList(e.key);
  }
  const [tabIndex, setTabIndex] = useState(0);
  function tabChange(indx: number) {
    setTabIndex(indx);
  }
  async function proceedSavePermissions(e: any) {
    const param = {
      permissions: e.permissions,
      user_type: selectedUserType ? selectedUserType.value : "",
    };
    const apiObject = {
      payload: param || {},
      method: "PATCH",
      apiUrl: e.perm_data.user_data.id
        ? `${EndpointUrl.users}/${e.perm_data.user_data.id}`
        : `${EndpointUrl.users}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          setToastMsg("Updated Successfully");
          setSnackbar(true);
          const list: any = await usersList();
          if (list && list.length > 0) {
            getUserById(list[0].id);
          }
        } else {
          const perms = {
            ...permissionProps,
            serverMsg: response.result.data,
          };
          setPermissionProps(perms);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  async function triggerPermEvent(e: any) {
    await proceedSavePermissions(e);
    // const data: any = await GlobalUserPermissions();
    // console.log(data);
    setUserInfo({ ...userInfo });
  }

  async function triggerEvent(e: any) {
    console.log(e);
    if (e.success) {
      usersList(e.userId);
    }
  }
  function valueChanged(e: ChangeEvent<HTMLInputElement>) {
    setUserSpinner(true);
    setSearchValue(e.target.value);
    // if (current.timer) clearTimeout(current.timer);
    // current.timer = setTimeout(() => {
    //   getPermissionList();
    //   usersList();
    // }, 1000);
  }
  function clearSearch() {
    setUserSpinner(true);
    setSearchValue("");
    // getPermissionList();
    // usersList();
  }
  const [confirmText, setConfirmText] = useState<any>();
  const [openSyncModel, setOpenSyncModel] = useState(false);

  async function getConfirmModelEvent(e: any) {
    // if (e === 'triggered') {
    //  setShowAnimSync(true)
    // } else {
    //  setShowAnimSync(false)
    // }

    if (e === "accept") {
      if (confirmText === "Are you sure you want to sync Data?") {
        setOpenSyncModel(false);
        setTimeout(() => {
          setprimaryBtnLabel("OK");
          setsecondaryBtnLabel("");
          setConfirmText(
            "Syncing is being processed, an email will be sent to your registered email"
          );
          setOpenSyncModel(true);
        }, 500);
      }
    }
    setOpenSyncModel(false);
  }

  const changeUsersType = async (e: UserListProps) => {
    setUserSpinner(true);
    setSelectedUserType(e);
    sendData(e);
    // getPermissionList();
    // const list: any = await usersList();
    // if (list && list.length > 0) {
    //   getUserById(list[0].id);
    // }
    usersTypes.map((obj: any, index: number) => {
      if (e.value === obj.id) {
        usersTypes[index].isSelected = true;
      } else {
        usersTypes[index].isSelected = false;
      }
      return obj;
    });
    setUsersTypes([...usersTypes]);
  };

  function setUploadPreview() {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl: any = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(objectUrl);
  }
  useEffect(() => {
    setPreview(currentUser.image_url);
  }, [currentUser]);
  const [isNewPicUploaded, setIsNewPicUploaded] = useState(false);
  const uploadProfilePic = (e: any) => {
    if (
      e.length &&
      (e[0].type === "image/png" ||
        e[0].type === "image/jpg" ||
        e[0].type === "image/jpeg")
    ) {
      setSelectedFile(e[0]);
      setUploadPreview();
      const formData = new FormData();
      formData.append("files", e[0]);
      formData.append("container", "profile_images");
      const apiObject = {
        payload: formData,
        method: "POST",
        apiUrl: `${EndpointUrl.userFileUpload}`,
        headers: {},
      };
      triggerApi(apiObject)
        .then(async (response: ApiResponse) => {
          if (response.result.success) {
            setIsNewPicUploaded(true);
          } else {
            setIsNewPicUploaded(false);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      {Object.keys(permissionObject).length > 0 && permissionObject.View && (
        <RolesAndPermissionContainer>
          <SideMenuContainer className="menu-inside-menu">
            <div className="sideList-Search">
              <RoleHeadingDiv>
                <RoleHeadingTextDiv style={{ gap: "0" }}>
                  <UserRoleSideHeading>
                    {selectedUserType ? selectedUserType.label : "Users"} (
                    {totalCount})
                  </UserRoleSideHeading>
                  <DetailViewStatusDropdown className="admin-user-type">
                    <PiDropdownMenu
                      items={usersTypes}
                      label=""
                      onOpenChange={changeUsersType}
                    />
                  </DetailViewStatusDropdown>
                </RoleHeadingTextDiv>
                {/* <AddUserIconsContainer>
                  {isUserSync && (
                    <PiTooltip
                      content={syncTitle ? syncTitle : 'Sync'}
                      libraryType="atalskit"
                    >
                      <RoleAddIconImg
                        src={!showAnimSync ? SyncLogo : AnimSyncLogo}
                        alt="loading"
                        onClick={syncUsers}
                      />
                    </PiTooltip>
                  )}
                </AddUserIconsContainer> */}
              </RoleHeadingDiv>
              {/* {usersTypes && usersTypes.length > 0 && (
                <PiSelect
                  libraryType="atalskit"
                  name="select"
                  onChange={changeUsersType}
                  options={usersTypes}
                  placeholder="Select"
                  defaultValue={selectedUserType}
                  noOptionsMessage={() => {
                    return ' User Types Not Found'
                  }}
                />
              )} */}
              <PiSearch
                libraryType="atalskit"
                onClear={() => clearSearch()}
                onValueChange={(e) => valueChanged(e)}
                placeholder="Search"
                value={SearchValue}
              />
            </div>
            {!userSpinner && (
              <SideMenuContainer
                style={{
                  padding: " 16px 0 0 0",
                  background: "#fff",
                  position: "relative",
                  overflowY: "auto",
                }}
              >
                <SideMenuList
                  isActive={activeRole}
                  className="menu-list menu-inside-menu"
                >
                  {!userSpinner && (
                    <div className="users-left-menu">
                      <PiLeftMenu
                        activeKey={activeRole}
                        onMenuClick={(e) => onRoleClick(e)}
                        options={rolesList}
                      />
                      {!totalCount && (
                        <NoVendorFound>User Not Available</NoVendorFound>
                      )}
                    </div>
                  )}
                </SideMenuList>
              </SideMenuContainer>
            )}

            {userSpinner && (
              <SpinnerDiv>
                <PiSpinner color="primary" size={30} libraryType="atalskit" />
              </SpinnerDiv>
            )}
          </SideMenuContainer>
          <DetailPageSection
            style={{ overflow: "hidden", background: "unset" }}
          >
            <TabContainer
              style={{ display: "flex", height: "100%", overflow: "hidden" }}
            >
              {rolesList.length > 0 && (
                <FormFlexWrapper style={{ gap: "16px", padding: "24px" }}>
                  <ImgUploadDiv style={{ pointerEvents: "none" }}>
                    <ProfilePicAvatar src={preview || Avatar} alt="loading" />
                    <PiFleUploader
                      dropzoneProps={{
                        accept: "image/*",
                        disabled: true,
                        maxFileSizeErroMessage:
                          "Max file uplode size should be 10MB",
                        maxSize: 5242880,
                        multiple: false,
                        noDrag: false,
                        maxFiles: 2,
                        text: "",
                        validFieErrorMessage: "Upload valid file type",
                      }}
                      onUpload={uploadProfilePic}
                    />
                  </ImgUploadDiv>
                  <ProfileDetails className="profile">
                    <PiLabelName
                      description={currentUser.name ? currentUser.name : "-"}
                      label=""
                    />
                    <PiLabelName
                      description={currentUser.email ? currentUser.email : "-"}
                      label=""
                    />

                    <UserRoleField
                      style={{ width: "calc(50% - 12px)", paddingLeft: "6px" }}
                    >
                      {!statusEditMode && (
                        <PiLabelName
                          description={
                            currentUser.status
                              ? QuoteStatusAppearance(currentUser.status.label)
                              : "-"
                          }
                          label=""
                          // isEditIcon={permissionObject["Edit"]}
                          emitSave={() => {
                            setStatusEditMode(true);
                          }}
                        />
                      )}
                    </UserRoleField>
                  </ProfileDetails>
                </FormFlexWrapper>
              )}
              <PiTabGroup
                id="tab"
                onChange={(e: any) => tabChange(e)}
                selected={tabIndex}
                className="pi-tabgroup-class"
              >
                <PiTabHeaderPanelContainer className="ji">
                  <PiTabHeaderPanel>
                    <PiTabHeader>User Profile</PiTabHeader>
                    <PiTabHeader>Permissions</PiTabHeader>
                  </PiTabHeaderPanel>
                </PiTabHeaderPanelContainer>
                <PiTabPanel>
                  {loading && (
                    <SpinnerDiv style={{ height: "100%" }}>
                      <PiSpinner
                        color="primary"
                        size={50}
                        libraryType="atalskit"
                      />
                    </SpinnerDiv>
                  )}
                  {!loading && totalCount !== 0 && (
                    <UserDetails
                      selectedUserType={selectedUserType}
                      userDetails={currentUser}
                      sendEvent={(e: any) => triggerEvent(e)}
                      openAdduserModel={
                        isOpenModel && isOpenModel ? isOpenModel : false
                      }
                      isNewPicUploaded={isNewPicUploaded}
                    />
                  )}
                  {!totalCount && !loading && (
                    <NoUserFound>User Not Available</NoUserFound>
                  )}
                </PiTabPanel>
                <PiTabPanel>
                  {permissionProps && totalCount !== 0 && (
                    <PermissionBox
                      permissionData={permissionProps}
                      sendEvent={(e: any) => triggerPermEvent(e)}
                    />
                  )}
                  {!totalCount && !loading && (
                    <NoUserFound>Permissions Not Found</NoUserFound>
                  )}
                </PiTabPanel>
              </PiTabGroup>
            </TabContainer>
          </DetailPageSection>
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
      <PiConfirmModel
        className={openSyncModel ? "show" : ""}
        headerLabel="Confirmation"
        message={confirmText}
        primaryBtnLabel={primaryBtnLabel}
        secondaryBtnLabel={secondaryBtnLabel}
        onClose={() => {
          setOpenSyncModel(false);
        }}
        onAccept={(e: any) => getConfirmModelEvent(e)}
        onDecline={() => {
          setOpenSyncModel(false);
        }}
      />
    </>
  );
}

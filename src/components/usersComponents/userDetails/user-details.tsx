import {
  PiLabelName,
  PiSelect,
  PiFleUploader,
  PiButton,
  PiToast,
  PiInput,
} from "pixel-kit";
import { lazy, Suspense, useEffect, useState } from "react";
import { RepairInfoSection } from "@app/components/detail-view-content/detail-view-content.component";
import { PermissionFooter } from "@app/components/userRolePermissions/user-role-permissions.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import QuoteStatusAppearance from "@app/core/components/gridStatus/quote-status-apperance";
import ThemecolorEdit from "@app/assets/images/themecolorEdit.svg";
import CamIcon from "@app/assets/images/cam-Icon.svg";

// import AddUser from '@app/components/popups/add-user/add-user'
import {
  ImgTag,
  LinkWithIcon,
} from "@app/components/secondaryheader/secondaryheader.component";
import UserRoleDropdown from "./user-detail.component";
import Avatar from "../../../assets/images/avator.svg";
import { UserRoleField } from "../userslist/userslist.component";
import {
  FormFlexWrapper,
  ImgUploadDiv,
  ProfileDetails,
  ProfilePicAvatar,
} from "../edit-user-details/edit-user-details.component";

const AddUser = lazy(() => import("@app/components/popups/add-user/add-user"));

export default function UserDetails({
  selectedUserType,
  userDetails,
  sendEvent,
  openAdduserModel,
  isNewPicUploaded,
}: any) {
  const [currentUser, setCurrentUser]: any = useState({});
  const [showRoleEditMode, setShowRoleEditMode] = useState(false);
  const [showManagerEditMode, setManagerEditMode] = useState(false);
  const [roleValue, setRoleValue] = useState();
  const [userRoleList, setUserRoleList] = useState([]);
  const [selectedFile, setSelectedFile]: any = useState();
  const [preview, setPreview] = useState();
  const [fileNameParam, setFileNameParam] = useState();
  const [showSavePanel, setSavePanel] = useState(false);
  const [permissionObject, setpermissionObject] = useState<any>({});
  const [openSnackbar, setSnackbar] = useState(false);
  const [selectedManager, setselectedManager] = useState();
  const [selectedPhoneNumber, setselectedPhoneNumber] = useState();
  const [usersList, setUsersList]: any = useState([]);
  const [phoneNumberEditMode, setPhoneNumberEditMode] = useState(false);
  const [statusEditMode, setStatusEditMode] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState();
  const [showEditUserModel, setShowEditUserModel] = useState<boolean>(false);
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
  const getUserRoles = (userTypeId: string) => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.UsersUserroles}?type=dropdown&status[0]=true&user_type=${userTypeId}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          setUserRoleList(data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const getManagerList = (id: string) => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.ManagerList}/${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const data = response.result.data.list;
          let arr: any = [];
          arr = data.map((obj: any) => ({
            value: obj.id,
            label: obj.name,
          }));
          setUsersList([...arr]);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (userDetails.id) {
      getManagerList(userDetails.id);
    }
  }, [userDetails.id]);
  useEffect(() => {
    if (isNewPicUploaded) {
      setSavePanel(true);
    }
  }, [isNewPicUploaded]);
  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject(
        window.location.pathname.substring(1)
      );
      setpermissionObject(permission);
    })();
  }, []);

  useEffect(() => {
    if (
      window.location.pathname.substring(1) !== "user-profile" &&
      permissionObject.Edit
    ) {
      getUserRoles(selectedUserType?.value);
    }
  }, [selectedUserType, permissionObject]);

  useEffect(() => {
    setShowRoleEditMode(false);
    setManagerEditMode(false);
    setPreview(userDetails.image_url);
    setCurrentUser(userDetails);
    console.log(userDetails);
  }, [userDetails]);
  function resetUserDetails() {
    setPhoneNumberEditMode(false);
    setShowRoleEditMode(false);
    setManagerEditMode(false);
    setStatusEditMode(false);
    setPreview(userDetails.image_url);
    setSavePanel(false);
  }
  const onRoleChange = (e: any) => {
    setRoleValue(e.value);
    // setSavePanel(true);
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

  const uploadProfilePic = (e: any) => {
    console.log(e);
    if (
      e.length &&
      (e[0].type === "image/png" ||
        e[0].type === "image/jpg" ||
        e[0].type === "image/jpeg")
    ) {
      setSelectedFile(e[0]);
      setUploadPreview();
      setSavePanel(true);
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
            const { data } = response.result;
            setFileNameParam(data.image_name);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  };
  function updateUserDetails() {
    setShowRoleEditMode(false);
    setManagerEditMode(false);
    setPhoneNumberEditMode(false);
    setStatusEditMode(false);
    let param = {};
    param = {
      permissions: userDetails.permissions,
      image_url: fileNameParam,
      manager_id: selectedManager,
    };
    userRoleList.map((obj: any) => {
      if (obj.value === roleValue || selectedStatus || selectedPhoneNumber) {
        param = {
          user_role_id: roleValue,
          manager_id: selectedManager,
          phone: selectedPhoneNumber,
          status: selectedStatus,
          permissions: obj.permissions,
        };
      }
      return obj;
    });

    const apiObject = {
      payload: param || {},
      method: "PATCH",
      apiUrl: `${window.location.pathname === "/user-profile" ? EndpointUrl.userProfile : EndpointUrl.users}/${currentUser.id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          setSnackbar(true);
          setSavePanel(false);
          setShowRoleEditMode(false);
          setManagerEditMode(false);
          setPhoneNumberEditMode(false);
          setStatusEditMode(false);

          sendEvent({ success: true, userId: currentUser.id });
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  const onManagerChange = (e: any) => {
    setselectedManager(e.value);
  };
  const onStatusChange = (e: any) => {
    setSelectedStatus(e.value);
  };
  const onPhoneNumberChange = (e: any) => {
    setselectedPhoneNumber(e.target.value);
  };
  const editUser = () => {
    setShowEditUserModel(true);
  };
  async function getEditUserEvent(e: any) {
    if (e && e.success) {
      setShowEditUserModel(false);
      setSnackbar(true);
      setTimeout(() => {
        sendEvent({ success: true, userId: e.Id });
      }, 500);
    } else if (e && e.closeModel) {
      setShowEditUserModel(false);
    }
  }
  return (
    <>
      <RepairInfoSection
        className="user-profile-card user-field-details "
        style={{ border: "unset", margin: "unset", overflow: "auto" }}
      >
        <div style={{ whiteSpace: "nowrap" }} className="">
          <FormFlexWrapper style={{ gap: "16px" }}>
            {window.location.pathname.substring(1) === "user-profile" && (
              <>
                <ImgUploadDiv
                  className={
                    openAdduserModel || showEditUserModel
                      ? "pic-upload-disable"
                      : ""
                  }
                >
                  <ProfilePicAvatar src={preview || Avatar} alt="loading" />
                  <PiFleUploader
                    dropzoneProps={{
                      accept: "image/*",
                      disabled: false,
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
                  <div className="profile-pic-actions">
                    <p>
                      <img src={CamIcon} alt="loading" />
                    </p>
                  </div>
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

                  <UserRoleField style={{ width: "calc(50% - 12px)" }}>
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
                    {statusEditMode && (
                      <UserRoleDropdown className="admin user_role_dropdown field-label-div ">
                        <PiSelect
                          name="status"
                          label="Status"
                          placeholder="Select"
                          onChange={onStatusChange}
                          options={statusOptions}
                          isIcons
                          emitSave={() => updateUserDetails()}
                          emitUndo={() => resetUserDetails()}
                        />
                      </UserRoleDropdown>
                    )}
                  </UserRoleField>
                </ProfileDetails>
              </>
            )}
          </FormFlexWrapper>

          <div
            className="user-field-details user-details"
            style={{ marginTop: "24px" }}
          >
            {/* <PiLabelName
              description={currentUser.name ? currentUser.name : "-"}
              label="Name"
            />
            <PiLabelName
              description={currentUser.email ? currentUser.email : "-"}
              label="Email"
            /> */}
            {window.location.pathname.substring(1) !== "user-profile" && (
              <UserRoleField style={{ width: "calc(50% - 12px)" }}>
                {!showRoleEditMode && (
                  <>
                    <PiLabelName
                      description={
                        currentUser.user_role && currentUser.user_role.label
                          ? currentUser.user_role.label
                          : "-"
                      }
                      label="User Role"
                      // isEditIcon={permissionObject["Edit"]}
                      emitSave={() => {
                        setShowRoleEditMode(true);
                      }}
                    />
                    {/* {permissionObject["Edit"] && (
                      <img
                        src={ThemecolorEdit}
                        alt="loading"
                        onClick={() => {
                          setShowRoleEditMode(true);
                        }}
                      />
                    )} */}
                  </>
                )}

                {showRoleEditMode && (
                  <UserRoleDropdown className="admin user_role_dropdown field-label-div ">
                    <PiSelect
                      name="user_role_id"
                      label="User Role"
                      placeholder="User Role"
                      onChange={onRoleChange}
                      options={userRoleList}
                      defaultValue={currentUser.user_role}
                      isIcons
                      emitSave={() => updateUserDetails()}
                      emitUndo={() => resetUserDetails()}
                    />
                  </UserRoleDropdown>
                )}
              </UserRoleField>
            )}

            {window.location.pathname.substring(1) !== "user-profile" && (
              <UserRoleField style={{ width: "calc(50% - 12px)" }}>
                {!showManagerEditMode && (
                  <PiLabelName
                    description={
                      currentUser.manager_id && currentUser.manager_id.label
                        ? currentUser.manager_id.label
                        : "-"
                    }
                    label="Manager"
                    // isEditIcon={permissionObject["Edit"]}
                    emitSave={() => {
                      setManagerEditMode(true);
                    }}
                  />
                )}

                {showManagerEditMode && (
                  <UserRoleDropdown className="admin user_role_dropdown field-label-div ">
                    <PiSelect
                      name="manager_id"
                      label="Manager"
                      placeholder="Manager"
                      onChange={onManagerChange}
                      options={usersList}
                      defaultValue={currentUser.manager_id}
                      isIcons
                      emitSave={() => updateUserDetails()}
                      emitUndo={() => resetUserDetails()}
                    />
                  </UserRoleDropdown>
                )}
              </UserRoleField>
            )}
            <PiLabelName
              description={currentUser.country ? currentUser.country : "-"}
              label="Country"
            />
            <PiLabelName
              description={currentUser.state ? currentUser.state : "-"}
              label="State"
            />
            <PiLabelName
              description={currentUser.city ? currentUser.city : "-"}
              label="City"
            />

            {window.location.pathname.substring(1) !== "user-profile" && (
              <UserRoleField style={{ width: "calc(50% - 12px)" }}>
                {!phoneNumberEditMode && (
                  <PiLabelName
                    description={currentUser.phone ? currentUser.phone : "-"}
                    label="Phone Number"
                    // isEditIcon={permissionObject["Edit"]}
                    emitSave={() => {
                      setPhoneNumberEditMode(true);
                    }}
                  />
                )}
                {phoneNumberEditMode && (
                  <UserRoleDropdown className="admin user_role_dropdown field-label-div ">
                    <PiInput
                      name="phone"
                      label="Phone Number"
                      placeholder="Enter Phone Number"
                      onChange={onPhoneNumberChange}
                      isIcons
                      emitSave={() => updateUserDetails()}
                      emitUndo={() => resetUserDetails()}
                    />
                  </UserRoleDropdown>
                )}
              </UserRoleField>
            )}
            <PiLabelName
              description={
                currentUser.preferred_phone ? currentUser.preferred_phone : "-"
              }
              label="Phone Type"
            />

            <PiLabelName
              description={
                currentUser.branch_id ? currentUser.branch_id.label : "-"
              }
              label="Branch"
            />
          </div>
          {permissionObject.Edit && (
            <div>
              <LinkWithIcon
                className="Icon-space secondary-button  "
                style={{
                  background: "#ffffff",
                  border: "2px solid #d0daec",
                  color: "#124eb0",
                  height: "36px",
                  width: "102px",
                }}
                onClick={editUser}
              >
                <ImgTag
                  src={ThemecolorEdit}
                  alt="loading"
                  style={{ marginRight: "4px" }}
                />
                <span className=" ">Edit</span>
              </LinkWithIcon>
              {/* <PiButton
                  appearance="primary"
                  label={"Edit "}
                  onClick={editUser}
                  isDisabled={opacity}
                /> */}
            </div>
          )}
        </div>
      </RepairInfoSection>
      {showSavePanel && (
        <PermissionFooter>
          <PiButton
            appearance="secondary"
            label="Cancel"
            onClick={() => resetUserDetails()}
          />
          <PiButton
            appearance="primary"
            label="Save"
            onClick={() => updateUserDetails()}
          />
        </PermissionFooter>
      )}
      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel="Updated Successfully"
        message=""
        onClose={async () => setSnackbar(false)}
      />
      {showEditUserModel && (
        <Suspense fallback={null}>
          <AddUser
            selectedUserType={selectedUserType}
            sendModelData={(e: any) => getEditUserEvent(e)}
            userDetails={userDetails}
            editUserDetails
          />
        </Suspense>
      )}
    </>
  );
}

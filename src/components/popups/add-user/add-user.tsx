import { useState, useEffect, useRef } from "react";
import { Formik } from "formik";
import {
  PiInputForm,
  PiTypography,
  PiButton,
  PiModal,
  PiModalHeader,
  PiModalBody,
  PiModalFooter,
  PiSpinner,
  PiSelectForm,
  PiFleUploader,
} from "pixel-kit";
import { ApiResponse } from "@app/services/schema/schema";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services/api-services";
import {
  ImgUploadDiv,
  ProfilePicAvatar,
} from "@app/components/usersComponents/edit-user-details/edit-user-details.component";
import CrossLogo from "../../../assets/images/cross.svg";
import CamIcon from "../../../assets/images/cam-Icon.svg";
import { CloseButton } from "../../adminaddrowmodel/adminaddrowmodel.component";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
  SpinnerDiv,
} from "../../fileuploadModel/fileuploadModel.component";
import {
  UserField,
  UsersFormFields,
  UsersInnerBody,
} from "./add-users-components";
import addUserSchema from "./add-user-validation";
import editUserSchema from "./edit-user-validation";
import Avatar from "../../../assets/images/avator.svg";

export default function AddUser({
  selectedUserType,
  sendModelData,
  userDetails,
  editUserDetails,
}: any) {
  const [modelLabel, setModelLabel] = useState("Add User");
  const [serverMsg, setServerMsg] = useState(null);
  const [loading, setloading] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<boolean>(false);
  const [countryOptions, setCountryOptions] = useState<any>([]);
  const [stateOptions, setStateptions] = useState<any>([]);
  const [enableState, setEnableState] = useState<boolean>(true);
  const [userRoleOptions, setUserRoleOptions] = useState<any>([]);
  const [managerOptions, setManagerOptions] = useState<any>([]);
  const [preview, setPreview] = useState();
  const [selectedFile, setSelectedFile]: any = useState();
  const [fileNameParam, setFileNameParam] = useState("");

  const [initialValues, setinitialValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    user_role_id: "",
    manager_id: "",
    phone: "",
    preferred_phone: "",
    syspro_id: "",
    country: "",
    city: "",
    state: "",
    status: "",
    branch: "",
  });
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
  const [branchList, setBranchList]: any = useState([]);
  function getUserRoles() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.UsersUserroles}?type=dropdown&status[0]=true&user_role_type=${selectedUserType?.value}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const res = response.result.data;
          let list = [];
          list = res.map((item: any) => ({
            value: item.value,
            label: item.label,
          }));
          setUserRoleOptions(list);
        } else {
          setloading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  function getUsersList() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.users}?status[0]=true`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const res = response.result.data.list;
          let list = [];
          list = res.map((item: any) => ({
            value: item.id,
            label: item.name || "No Name",
          }));
          setManagerOptions(list);
          setloading(false);
        } else {
          setloading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  function GetCountries() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.GetCountries}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success) {
          setCountryOptions(
            response.result.data.list.map((item: any) => ({
              value: item.id,
              label: item.name,
            }))
          );
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  const getBranchList = () => {
    const params = {
      page: "1",
      perPage: "25",
      sort: "asc",
    };
    const apiObject = {
      payload: params,
      method: "GET",
      apiUrl: `${EndpointUrl.UserBranches}`,
      headers: {},
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          let data = response.result.data.list;
          data = data.map((obj: any) => ({
            value: obj.id,
            label: obj.name,
          }));
          setBranchList([...data]);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (editUserDetails && userDetails) {
      setloading(true);
      getUserRoles();
      getUsersList();
      setModelLabel("Edit User");
      setPreview(userDetails.image_url);

      const Values = userDetails || "";
      Values.user_role_id =
        userDetails && userDetails.user_role && userDetails.user_role
          ? userDetails.user_role
          : "";

      Values.phone =
        userDetails && userDetails.phone && userDetails.phone
          ? userDetails.phone
          : "";

      setinitialValues({ ...Values });
    } else {
      setloading(true);
      GetCountries();
      getUserRoles();
      getUsersList();
    }
    getBranchList();
  }, [editUserDetails && userDetails]);

  function handleSubmit(data: any) {
    setOpacity(true);

    const obj = {
      ...data,
      image_url: fileNameParam,
      user_type: selectedUserType?.value,
    };
    const params = {
      phone: data.phone ? data.phone : "",
      user_role_id: data.user_role_id ? data.user_role_id.value : "",
      manager_id: data.manager_id ? data.manager_id.value : "",
      status:
        data && data.status && data.status.value && data.status.value
          ? data.status.value
          : "",
      image_url: fileNameParam,
      user_type: selectedUserType?.value,
    };
    const apiObject = {
      payload: editUserDetails ? params : obj,
      method: editUserDetails ? "PATCH" : "POST",
      apiUrl: editUserDetails
        ? `${EndpointUrl.users}/${userDetails && userDetails.id && userDetails.id ? userDetails.id : ""}`
        : `${EndpointUrl.CreateUser}`,
      headers: {},
    };

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setOpacity(false);
          sendModelData({ success: true, Id: response.result.data });
          setServerMsg(null);
          setOpacity(false);
        } else {
          setServerMsg(response.result.data);
          setOpacity(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  const formik = useRef<any>(null);

  function handleRef(e: any) {
    formik.current = e;
    console.log(e, 263);
  }
  function closeModel() {
    if (editUserDetails) {
      sendModelData({ closeModel: true, isEditUser: true });
    } else {
      sendModelData({ closeModel: true });
    }
  }

  function getStates(Id: any) {
    setOpacity(true);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.GetStates}?country_id=${Id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success) {
          setStateptions(
            response.result.data.list.map((item: any) => ({
              value: item.id,
              label: item.name,
            }))
          );

          setEnableState(false);
          setOpacity(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  const onCountryChange = (e: any) => {
    formik?.current?.setFieldValue("state", "");

    if (e && e.value) {
      formik?.current?.setFieldValue("country", e);
      getStates(e.value);
    }
  };
  const onStateChange = (e: any) => {
    formik?.current?.setFieldValue("state", e);
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
            const { data } = response.result;
            setFileNameParam(data.image_name);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  };
  return (
    <PiModal isOpen>
      <PopupHeaderContentDiv>
        <PiModalHeader>
          <PopupHeaderDiv>
            <PiTypography component="h3">{modelLabel}</PiTypography>
            <CloseButton
              onClick={() => closeModel()}
              title="close"
              className="Hover"
            >
              {" "}
              <img src={CrossLogo} alt="loading" />{" "}
            </CloseButton>
          </PopupHeaderDiv>
        </PiModalHeader>
        <hr />
      </PopupHeaderContentDiv>
      {loading && (
        <SpinnerDiv>
          <PiSpinner color="primary" size={50} libraryType="atalskit" />
        </SpinnerDiv>
      )}
      {!loading && (
        <Formik
          validationSchema={editUserDetails ? editUserSchema : addUserSchema}
          onSubmit={(e: any) => handleSubmit(e)}
          initialValues={initialValues}
          innerRef={(e: any) => handleRef(e)}
          validateOnMount
        >
          {({ ...formikProps }: any) => (
            <>
              <PiModalBody>
                <UsersFormFields
                  className={opacity ? "admin-opacity-on-load " : ""}
                >
                  {opacity && (
                    <SpinnerDiv
                      style={{
                        position: "absolute",
                        zIndex: "1",
                      }}
                    >
                      <PiSpinner
                        color="primary"
                        size={50}
                        libraryType="atalskit"
                      />
                    </SpinnerDiv>
                  )}
                  <UsersInnerBody>
                    <UserField className="profile-pic">
                      <ImgUploadDiv style={{ padding: "4px" }}>
                        <ProfilePicAvatar
                          src={preview || Avatar}
                          alt="loading"
                        />{" "}
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
                    </UserField>

                    <UserField className="name-container">
                      <PiInputForm
                        name="first_name"
                        label="First Name"
                        libraryType="atalskit"
                        type="text"
                        placeholder="Enter First Name"
                        maxLength={100}
                        isMandatory={!editUserDetails}
                        isDisabled={opacity || editUserDetails}
                      />
                      <PiInputForm
                        name="last_name"
                        label="Last Name"
                        libraryType="atalskit"
                        type="text"
                        placeholder="Enter Last Name"
                        className="field"
                        maxLength={100}
                        isMandatory={!editUserDetails}
                        isDisabled={opacity || editUserDetails}
                      />
                    </UserField>
                    <UserField>
                      <PiInputForm
                        name="email"
                        label="Email ID"
                        libraryType="atalskit"
                        type="text"
                        placeholder="Enter Email ID"
                        className="field"
                        isMandatory={!editUserDetails}
                        isDisabled={opacity || editUserDetails}
                      />
                    </UserField>
                    <UserField>
                      <PiSelectForm
                        name="user_role_id"
                        label="User Role"
                        libraryType="atalskit"
                        placeholder="Select"
                        classNamePrefix="react-select"
                        options={userRoleOptions}
                        isMandatory
                        isDisabled={opacity}
                        className="field"
                      />
                    </UserField>
                    <UserField>
                      <PiSelectForm
                        name="manager_id"
                        label="Manager"
                        libraryType="atalskit"
                        placeholder="Select"
                        classNamePrefix="react-select"
                        options={managerOptions}
                        isDisabled={opacity}
                        isMandatory
                        className="field"
                      />
                    </UserField>
                    <UserField>
                      <PiInputForm
                        name="phone"
                        label="Phone Number"
                        libraryType="atalskit"
                        type="phone_number"
                        placeholder="Enter Phone Number"
                        className="field"
                        isMandatory
                        isDisabled={opacity}
                      />
                    </UserField>
                    <UserField>
                      <PiInputForm
                        name="preferred_phone"
                        label="Phone Type"
                        libraryType="atalskit"
                        type="text"
                        placeholder="Enter Phone Type"
                        className="field"
                        maxLength={16}
                        onChange={() => setServerMsg(null)}
                        // isMandatory
                        isDisabled={opacity || editUserDetails}
                      />
                    </UserField>
                    {!editUserDetails && (
                      <UserField>
                        <PiSelectForm
                          name="country"
                          label="Country"
                          libraryType="atalskit"
                          placeholder="Select"
                          classNamePrefix="react-select"
                          options={countryOptions}
                          isMandatory
                          isDisabled={opacity || editUserDetails}
                          onChange={(e: any) => onCountryChange(e)}
                        />
                      </UserField>
                    )}
                    {editUserDetails && (
                      <UserField>
                        <PiInputForm
                          name="country"
                          label="Country"
                          libraryType="atalskit"
                          type="text"
                          placeholder="Enter Country"
                          className="field"
                          isMandatory={!editUserDetails}
                          isDisabled={opacity || editUserDetails}
                        />
                      </UserField>
                    )}
                    {!editUserDetails && (
                      <UserField>
                        <PiSelectForm
                          name="state"
                          label="State"
                          libraryType="atalskit"
                          placeholder="Select"
                          classNamePrefix="react-select"
                          options={stateOptions}
                          isMandatory
                          onChange={(e: any) => onStateChange(e)}
                          isDisabled={enableState || opacity || editUserDetails}
                        />
                      </UserField>
                    )}
                    {editUserDetails && (
                      <UserField>
                        <PiInputForm
                          name="state"
                          label="State"
                          libraryType="atalskit"
                          type="text"
                          placeholder="Enter State"
                          className="field"
                          isMandatory={!editUserDetails}
                          isDisabled={opacity || editUserDetails}
                        />
                      </UserField>
                    )}
                    <UserField>
                      <PiInputForm
                        name="city"
                        label="City"
                        libraryType="atalskit"
                        type="text"
                        placeholder="Enter City"
                        className="field"
                        isMandatory={!editUserDetails}
                        isDisabled={opacity || editUserDetails}
                      />
                    </UserField>
                    <UserField>
                      <PiInputForm
                        name="syspro_id"
                        label="Syspro ID"
                        libraryType="atalskit"
                        type="text"
                        placeholder="Enter Syspro Id"
                        className="field"
                        onChange={() => setServerMsg(null)}
                        isDisabled={opacity || editUserDetails}
                        isMandatory={!editUserDetails}
                      />
                    </UserField>
                    {!editUserDetails && (
                      <UserField>
                        <PiSelectForm
                          name="branch"
                          label="Branch"
                          placeholder="Select"
                          libraryType="atalskit"
                          classNamePrefix="react-select"
                          options={branchList}
                          isDisabled={opacity}
                          isMandatory
                        />
                      </UserField>
                    )}
                    {editUserDetails && (
                      <UserField>
                        <PiSelectForm
                          name="status"
                          label="Status"
                          placeholder="Select"
                          libraryType="atalskit"
                          classNamePrefix="react-select"
                          options={statusOptions}
                          isDisabled={opacity}
                        />
                      </UserField>
                    )}
                  </UsersInnerBody>
                </UsersFormFields>
              </PiModalBody>
              <PiModalFooter>
                <div className="server-msg">{serverMsg}</div>

                <PiButton
                  appearance="secondary"
                  label="Cancel"
                  onClick={() => closeModel()}
                  isDisabled={opacity}
                />
                <PiButton
                  appearance="primary"
                  label={editUserDetails ? "Update" : modelLabel}
                  onClick={formikProps.handleSubmit}
                  isDisabled={opacity}
                />
              </PiModalFooter>
            </>
          )}
        </Formik>
      )}
    </PiModal>
  );
}

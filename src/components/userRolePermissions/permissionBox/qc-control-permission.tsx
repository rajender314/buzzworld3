/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import {
  PiButton,
  PiInput,
  PiInputForm,
  PiLeftMenu,
  PiRadioForm,
  PiSelect,
  PiSpinner,
  PiTextArea,
  PiToast,
} from "pixel-kit";
import { useContext, useEffect, useState } from "react";
import {
  NoVendorFound,
  SideMenuContainer,
  SpinnerDiv,
} from "@app/components/commonLayout/commonLayout.component";
import { Formik, FieldArray } from "formik";
import SideMenuList from "@app/components/sidelist";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import QcAdd from "@app/components/popups/QcAdd/Qc-Add";
import AddLogo from "@app/assets/images/Plus_secondary.svg";

import { Field } from "@atlaskit/form";
import { SideDrawerFooter } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import FilterFieldsContainer from "@app/components/Repair-Components/repair-list-filter/repair-list.component";
// import deleteIcon from "@app/assets/images/row_delete_img.svg";
import deleteIcon from "@app/assets/images/delete-icon.svg";

import { getPermissionObject } from "@app/helpers/componentHelpers";
import { AuthContext } from "@app/providers";
import AccesssDenied from "@app/modules/access-denied/component";
import {
  ImgTag,
  LinkWithIcon,
} from "@app/components/secondaryheader/secondaryheader.component";
import { ItemInfoAddRowContainer } from "@app/components/parts-purchase-components/parts-purchase-form.tsx/parts-purchase-form-components";
import qcValidations from "../qcValidations/qcValidation";
import { FormBodyOverFlow, SpinnerDivs } from "./qc-control-component";
import {
  RoleHeadingDiv,
  RoleHeadingTextDiv,
  RolesAndPermissionContainer,
  Permissions,
  UserRoleSideHeading,
  UserRolesFields,
} from "../user-role-permissions.component";

export default function QcControlPermissions({ props, addQcId }: any) {
  const [initialValues, setInitialValues] = useState<any>({
    item_info: [
      {
        orderId: "",
        label: "",
        component: "",
        options: [
          {
            label: "Yes",
            value: "Yes",
          },
          {
            label: "No",
            value: "No",
          },
        ],
        selected_value: "",
        names: "",
      },
    ],
  });
  // const [opacity, setLoading] = useState(false);

  const [rolesList, setRolesList] = useState([]);
  // const [value, setValue]: any = useState("");
  const [userDetail, setUserDetail]: any = useState({});
  const [activeRole, setActiveRole]: any = useState("");
  const [username, setUsername] = useState("");
  const [userdescription, setUserDescription] = useState("");
  const [userproperties, setUserProperties]: any = useState();
  const [totalCount, setCount] = useState(null);
  const [showAddQcControl, setShowAddQcControl] = useState<boolean>(false);
  const [getProps, setGetProp]: any = useState();
  const [serverMsg, setServerMsg] = useState(null);
  const [permissionProps, setPermissionProps]: any = useState(null);
  const [loading, setLoading] = useState(true);
  const [userSpinner, setUserSpinner] = useState(true);
  const [popupMessageShow, setPopupMessageShow] = useState(false);
  const [permissionObject, setpermissionObject] = useState<any>({});
  const authcontextvalue = useContext(AuthContext);
  const [checkdata, updateCheckData] = useState(false);
  const [userStatuss, setUserStatuss] = useState<any>();
  const [PrioritysData, setPrioritysData]: any = useState();
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
  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject(
        window.location.pathname.substring(1)
      );
      setpermissionObject(permission);
    })();
  }, [authcontextvalue]);
  function getPermissions(id: any) {
    setGetProp(id);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QCcontrol}/${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.status_code === 200 && response.result.success) {
          // setUsername(response.result.data.name);
          // setUserDescription(response.result.data.description);

          updateCheckData(false);
          setPrioritysData(response.result.data.properties);
          const contorls = response.result.data;

          userDetail.id = contorls.id;
          userDetail.name = contorls.name;
          userDetail.description = contorls.description;

          userDetail.status = contorls.status;
          setUserStatuss(contorls && contorls.status ? contorls.status : "");
          setUsername(contorls.name);
          setUserDescription(contorls.description);
          setUserDetail(userDetail);

          const dupValues = { ...initialValues };
          dupValues.item_info = [];
          setLoading(false);
          if (response.result.data.properties) {
            setInitialValues({ item_info: [] });
            updateCheckData(false);
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 500);
          } else {
            setInitialValues({
              item_info: [
                {
                  selected_value: "",
                  names: "",
                },
              ],
            });
            updateCheckData(true);
            setTimeout(() => {
              setLoading(false);
            }, 500);
          }

          response.result.data.properties.map((item: any) => {
            const newValues = {
              names: item.names,
              selected_value: item.selected_value,
            };
            dupValues.item_info.push(newValues);
            return item;
          });
          setTimeout(() => {
            setInitialValues(dupValues);
            updateCheckData(true);
            // setLoading(true);
          }, 1000);
          // setLoading(false);
          const perms = {
            user_data: {
              ...contorls,
              apiUrls: {
                pageUrl: EndpointUrl.Userroles,
              },
            },
          };
          setPermissionProps(perms);
        }
      })
      .catch(() => {});
  }

  async function userRoles() {
    let options: any = [];
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QCcontrol}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          setLoading(false);
          setUserSpinner(false);
          const res = response.result.data.list;
          let list = [];
          list = res.map((item: any) => ({
            key: item.id,
            label: item.name,
            display: true,
            ...item,
          }));

          options = list;
          await setRolesList(options);
          setActiveRole(activeRole || list[0].key);
          setCount(response.result.data.total_count);
        }
      })
      .catch(() => {});
    return options;
  }
  useEffect(() => {
    (async () => {
      if (addQcId) {
        await userRoles();
        setActiveRole(addQcId);

        getPermissions(addQcId);

        if (Object.keys(addQcId).length) {
          setShowAddQcControl(false);
        }
      }
    })();
  }, [addQcId]);
  async function getAddRowEvent(e: any) {
    await userRoles();
    setActiveRole(e);

    getPermissions(e);

    if (Object.keys(e).length) {
      setShowAddQcControl(false);
    }
  }
  async function handleReset() {
    getPermissions(getProps);
    if (PrioritysData) {
      setInitialValues({ item_info: [] });
      updateCheckData(true);
    } else {
      setInitialValues({
        item_info: [
          {
            selected_value: "",
            names: "",
          },
        ],
      });
      updateCheckData(true);
    }
  }

  async function onRoleClick(obj: any) {
    setInitialValues({ item_info: [] });
    setActiveRole(obj.key);
    getPermissions(obj.key);
  }
  function onUserNameChange(e: any) {
    setUsername(e.target.value);
  }
  function onPropepertyNameChange(e: any) {
    // userproperties = e.target.value;
    setUserProperties(e.target.value);
  }

  const addRows = (
    values: any,
    pushData: (e: any) => void,
    handleSubmit: any
  ) => {
    const newValues = {
      selected_value: "",
      names: "",
    };
    pushData(newValues);
    initialValues.item_info.push(newValues);
    setInitialValues(initialValues);
  };

  useEffect(() => {
    (async () => {
      const list: any = await userRoles();
      if (list && list.length > 0) {
        getPermissions(list[0].id);
      }
    })();
  }, []);

  function handleSubmit(id: any) {
    setLoading(true);
    const properties: any[] = [];
    id.item_info.map((question: any, i: any) => {
      const res = {
        order_id: i + 1,
        label: "Name",
        names: question.names,
        component: "Radio",
        options: [
          {
            label: "Yes",
            value: "Yes",
          },
          {
            label: "No",
            value: "No",
          },
          {
            label: "N/A",
            value: "na",
          },
        ],
        selected_value: question.selected_value,
      };
      properties.push(res);
      return question;
    });

    const apiObject = {
      payload: {
        id: userDetail && userDetail.id,
        name: username || "",
        description: userdescription || "",
        status: userStatuss,
        properties,
      },
      method: "PUT",
      apiUrl: `${EndpointUrl.QCcontrol}/${getProps}`,
      headers: {},
    };

    triggerApi(apiObject).then((response: ApiResponse) => {
      if (response.result.status_code === 200 && response.result.success) {
        // setUserDetailsId(response.result.data.id);
        userRoles();
        getPermissions(response.result.data.id);
        setPopupMessageShow(true);
        setLoading(true);
        setServerMsg(null);
      } else {
        setLoading(false);
        setServerMsg(response.result.data);
      }
    });
  }
  useEffect(() => {
    setUserDetail(userDetail);
  }, [userDetail]);
  function onDescriptionChange(e: any) {
    setUserDescription(e.target.value);
  }
  // function changeUserStatus(e: any) {
  //   setUserStatus(e.target.value);
  // }
  // function changeUserStatuss(e: any) {
  //   userStatuss = e.target.checked;
  //   setUserStatuss(userStatuss);
  // }
  function onStatusChange(e: any) {
    setUserStatuss(e);
    userDetail.status = e && e.value ? e.value : "";
    setUserDetail(userDetail);
    const perms = { ...permissionProps, showSavePanel: true };
    setPermissionProps(perms);
  }

  return (
    <>
      <PiToast
        className={popupMessageShow ? "show" : ""}
        headerLabel="QC Form Updated Successfully"
        message=""
        onClose={async () => setPopupMessageShow(false)}
      />
      {Object.keys(permissionObject).length > 0 && permissionObject.View && (
        <RolesAndPermissionContainer>
          <SideMenuContainer className="menu-inside-menu">
            <div className="sideList-Search">
              <RoleHeadingDiv>
                <RoleHeadingTextDiv>
                  <UserRoleSideHeading>
                    {props.displayLabel} ({totalCount})
                  </UserRoleSideHeading>
                </RoleHeadingTextDiv>
                {/* {permissionObject["Edit"] && (

                  <div style={{ cursor: "pointer" }}>
                    <p onClick={addQcForm} className="add-row-text">
                      Add
                    </p>
                  </div>
                )} */}
              </RoleHeadingDiv>
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
                      <NoVendorFound> QC Form Not Available</NoVendorFound>
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
          {loading && (
            <Permissions style={{ justifyContent: "center" }}>
              <SpinnerDivs className="spinner">
                <PiSpinner color="primary" size={50} libraryType="atalskit" />
              </SpinnerDivs>
            </Permissions>
          )}
          {totalCount !== 0 && checkdata && !loading && (
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
                    maxLength={300}
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
                    onChange={changeUserStatuss}
                    size="large"
                    isChecked={userStatuss}
                    label="Status"
                    isDisabled={!permissionObject["Edit"]}
                  /> */}
                  <PiSelect
                    libraryType="atalskit"
                    name="select"
                    label="Status"
                    onChange={(e: any) => onStatusChange(e)}
                    options={statusOptions}
                    value={userStatuss}
                    placeholder="Select"
                    isDisabled={!permissionObject.Edit}
                    // label="User Roles Types"
                    // defaultValue={selectUserRoleType}
                    // noOptionsMessage={() => {
                    //   return " User Role Types Not Found";
                    // }}
                  />
                </div>
              </UserRolesFields>
              <Formik
                validationSchema={qcValidations}
                onSubmit={(e: any) => handleSubmit(e)}
                initialValues={initialValues}
                innerRef={() => {}}
                onReset={() => handleReset()}
              >
                {({ values, isValid, ...formik }) => (
                  <>
                    <FieldArray name="item_info">
                      {({ remove, push }) => (
                        <FormBodyOverFlow>
                          {values.item_info.length > 0 &&
                            values.item_info.map(
                              (
                                friend: { selected_value: any },
                                index: number
                              ) => (
                                <>
                                  <FilterFieldsContainer>
                                    <div
                                      style={{
                                        display: "flex",
                                      }}
                                      className="qc-form-container"
                                    >
                                      <div style={{ width: "420px" }}>
                                        <PiInputForm
                                          label="Name"
                                          libraryType="atalskit"
                                          name={`item_info.${index}.names`}
                                          value={userproperties}
                                          placeholder="Name"
                                          onChange={(e: any) =>
                                            onPropepertyNameChange(e)
                                          }
                                          maxLength={300}
                                          isDisabled={!permissionObject.Edit}
                                        />
                                      </div>
                                      <div className="radios">
                                        <Field name="selected_value">
                                          {() => (
                                            <PiRadioForm
                                              libraryType="atalskit"
                                              id="selected_value"
                                              name={`item_info.${index}.selected_value`}
                                              options={[
                                                {
                                                  label: "Yes",
                                                  value: "Yes",
                                                },
                                                {
                                                  label: "No",
                                                  value: "No",
                                                },
                                                {
                                                  label: "N/A",
                                                  value: "na",
                                                },
                                              ]}
                                              // isChecked={lastLook ? true : false}
                                              value={friend.selected_value}
                                              isDisabled={
                                                !permissionObject.Edit
                                              }
                                            />
                                          )}
                                        </Field>
                                      </div>

                                      {index !== 0 && permissionObject.Edit && (
                                        <div className="addicons">
                                          <LinkWithIcon
                                            className="Icon-space secondary-button  "
                                            style={{
                                              background: "#ffffff",
                                              border: "2px solid #d0daec",
                                              color: "#124eb0",
                                              height: "36px",
                                            }}
                                            onClick={() => remove(index)}
                                          >
                                            <ImgTag
                                              src={deleteIcon}
                                              alt="loading"
                                              style={{
                                                marginRight: "4px",
                                              }}
                                            />
                                            <span className=" ">Delete</span>
                                          </LinkWithIcon>
                                        </div>
                                      )}
                                    </div>
                                  </FilterFieldsContainer>
                                  <ItemInfoAddRowContainer
                                    style={{ paddingLeft: "4px" }}
                                  >
                                    {index === values.item_info.length - 1 &&
                                      permissionObject.Edit && (
                                        <div className="add-row-div ">
                                          <LinkWithIcon
                                            className="Icon-space secondary-button  "
                                            style={{
                                              background: "#ffffff",
                                              border: "2px solid #d0daec",
                                              color: "#124eb0",
                                              height: "36px",
                                            }}
                                            onClick={() =>
                                              addRows(
                                                values,
                                                push,
                                                handleSubmit
                                              )
                                            }
                                          >
                                            <ImgTag
                                              style={{
                                                fill: "#124eb0",
                                              }}
                                              src={AddLogo}
                                              alt="loading"
                                            />
                                            <span className=" ">Add</span>
                                          </LinkWithIcon>
                                        </div>
                                      )}
                                    {/*
                                            {index !== 0 && (
                                              <PartPurchaseAddAnotherRowBtn className="row-del-img-div">
                                                <img
                                                  className="row-del-img"
                                                  src={RowDelImg}
                                                  alt="loading"
                                                  title="Delete Row"
                                                  onClick={() => {
                                                    remove(index);
                                                  }}
                                                />
                                              </PartPurchaseAddAnotherRowBtn>
                                            )} */}
                                  </ItemInfoAddRowContainer>
                                  {index === 0 && permissionObject.Edit && (
                                    <div
                                      className="addicon"
                                      style={{
                                        padding: "0px",
                                        paddingLeft: "4px",
                                      }}
                                    >
                                      {/* <LinkWithIcon
                                                  className="Icon-space primary-button  "
                                                  style={{
                                                    background: "#ffffff",
                                                    border: "2px solid #d0daec",
                                                    color: "#124eb0",
                                                    height: "36px",
                                                  }}
                                                  onClick={() =>
                                                    addRows(
                                                      values,
                                                      push,
                                                      handleSubmit
                                                    )
                                                  }
                                                >
                                                  <ImgTag
                                                    style={{
                                                      fill: "#124eb0",
                                                    }}
                                                    src={AddLogo}
                                                    alt="loading"
                                                  />
                                                  <span className=" ">Add</span>
                                                </LinkWithIcon> */}
                                      {/* <RoleAddIconImg
                                                    src={AddIcons}
                                                    alt="loading"
                                                    onClick={() =>
                                                      addRows(
                                                        values,
                                                        push,
                                                        handleSubmit
                                                      )
                                                    }
                                                  />
                                                  <span
                                                    style={{
                                                      fontWeight: "600",
                                                      paddingLeft: "8px",
                                                      fontSize: "14px",
                                                      color: "#124eb0",
                                                      // marginBottom: "5px",
                                                    }}
                                                  >
                                                    Add
                                                  </span> */}
                                    </div>
                                  )}
                                  {index !== 0 && permissionObject.Edit && (
                                    <div
                                      className="addicons"
                                      style={{
                                        padding: "0px",
                                        paddingLeft: "4px",
                                        marginLeft: "0px",
                                      }}
                                    >
                                      {/* <LinkWithIcon
                                                  className="Icon-space primary-button  "
                                                  style={{
                                                    background: "#ffffff",
                                                    border: "2px solid #d0daec",
                                                    color: "#124eb0",
                                                    height: "36px",
                                                  }}
                                                  onClick={() =>
                                                    addRows(
                                                      values,
                                                      push,
                                                      handleSubmit
                                                    )
                                                  }
                                                >
                                                  <ImgTag
                                                    src={AddLogo}
                                                    alt="loading"
                                                  />
                                                  <span className=" ">
                                                    Addds
                                                  </span>
                                                </LinkWithIcon> */}
                                      {/* <RoleAddIconImg
                                                    src={AddIcons}
                                                    alt="loading"
                                                    onClick={() =>
                                                      addRows(
                                                        values,
                                                        push,
                                                        handleSubmit
                                                      )
                                                    }
                                                  />
                                                  <span
                                                    style={{
                                                      fontWeight: "600",
                                                      paddingLeft: "8px",
                                                      fontSize: "14px",
                                                      color: "#124eb0",
                                                      // marginBottom: "5px",
                                                    }}
                                                  >
                                                    Add
                                                  </span> */}

                                      {/* <div
                                                    style={{
                                                      cursor: "pointer",
                                                    }}
                                                  >
                                                    <img
                                                      className="row-del-img"
                                                      src={RowDelImg}
                                                      alt="loading"
                                                      title="Delete Row"
                                                      onClick={() =>
                                                        remove(index)
                                                      }
                                                    />
                                                  </div> */}
                                    </div>
                                  )}
                                </>
                              )
                            )}
                        </FormBodyOverFlow>
                      )}
                    </FieldArray>
                    {permissionObject.Edit && (
                      <SideDrawerFooter>
                        {serverMsg && (
                          <div className="server-msg">{serverMsg}</div>
                        )}
                        <PiButton
                          type="reset"
                          appearance="secondary"
                          label="Cancel"
                          libraryType="atalskit"
                          onClick={formik.handleReset}
                        />
                        <PiButton
                          appearance="primary"
                          label="Save"
                          libraryType="atalskit"
                          onClick={formik.handleSubmit}
                        />
                      </SideDrawerFooter>
                    )}
                  </>
                )}
              </Formik>
            </Permissions>
          )}
          {!totalCount && !loading && (
            <Permissions>
              <NoVendorFound style={{ position: "relative" }}>
                Qc Form Not Available
              </NoVendorFound>
            </Permissions>
          )}
        </RolesAndPermissionContainer>
      )}
      {Object.keys(permissionObject).length > 0 && !permissionObject.View && (
        <AccesssDenied />
      )}

      {showAddQcControl && (
        <QcAdd
          sendModelData={(e: any) => getAddRowEvent(e)}
          setShowAddQcControl={setShowAddQcControl}
          showAddQcControl={showAddQcControl}
        />
      )}
    </>
  );
}

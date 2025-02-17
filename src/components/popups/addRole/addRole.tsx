/* eslint-disable no-use-before-define */
import { useState, useEffect } from "react";
import { Formik } from "formik";
import {
  PiInputForm,
  PiTypography,
  PiButton,
  PiModal,
  PiModalHeader,
  PiModalBody,
  PiModalFooter,
  PiTextareaForm,
  PiSpinner,
  PiSelectForm,
} from "pixel-kit";
import { ApiResponse } from "@app/services/schema/schema";
import { FilterFormFields } from "@app/components/multiEditModel/multiEditModel.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services/api-services";
import { useRolesValidations } from "@app/modules/adminModules/userRoles/validation/userRolesValidation";
import { CloseButton } from "../../adminaddrowmodel/adminaddrowmodel.component";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
  SpinnerDiv,
} from "../../fileuploadModel/fileuploadModel.component";
import CrossLogo from "../../../assets/images/cross.svg";

export default function AddRole({
  selectUserRoleType,
  defaultPermList,
  sendModelData,
}: any) {
  const modelLabel = "Add User Role";
  const [serverMsg, setServerMsg] = useState(null);
  const [loading, setloading] = useState(true);
  const [opacity, setOpacity] = useState<boolean>(false);

  const isChecked = true;

  const initialValues = {
    name: "",
    description: "",
    status:
      isChecked === true
        ? {
            value: "true",
            label: "Active",
          }
        : {
            value: "false",
            label: "InActive",
          },
  };
  console.log(defaultPermList, 444);
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 200);
  }, []);

  function handleSubmit(data: any) {
    console.log(defaultPermList);
    setOpacity(true);
    const obj = {
      ...data,
      permissions: defaultPermList,
      user_role_type: selectUserRoleType.value,
    };
    const apiObject = {
      payload: obj || {},
      method: "POST",
      apiUrl: `${EndpointUrl.Userroles}`,
      headers: {},
    };
    console.log(data);

    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setOpacity(false);

          const obj2 = {
            success: true,
          };
          sendModelData(obj2);

          sendModelData({ handleSubmit: true });
          setServerMsg(null);
        } else {
          setServerMsg(response.result.data);
          setOpacity(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
        setOpacity(false);
      });
  }

  function handleRef() {
    // formik.current = e;
  }
  function closeModel() {
    sendModelData({ closeModel: true });
  }
  async function triggerEvent() {
    setServerMsg(null);
  }

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
          validationSchema={useRolesValidations}
          onSubmit={(e: any) => handleSubmit(e)}
          initialValues={initialValues}
          innerRef={() => handleRef()}
        >
          {({ ...formik }: any) => (
            <>
              <PiModalBody>
                <div className={opacity ? "admin-opacity-on-load " : ""}>
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
                  <FilterForm
                    isChecked={isChecked}
                    sendEvent={() => triggerEvent()}
                  />
                </div>
              </PiModalBody>
              <PiModalFooter>
                {serverMsg && <div className="server-msg">{serverMsg}</div>}
                <PiButton
                  appearance="secondary"
                  label="Cancel"
                  onClick={() => closeModel()}
                  isDisabled={opacity}
                />
                <PiButton
                  appearance="primary"
                  label={modelLabel}
                  onClick={formik.handleSubmit}
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

function FilterForm({ isChecked, sendEvent }: any) {
  return (
    <FilterFormFields>
      <div className="Feilds">
        <PiInputForm
          name="name"
          label="Name"
          libraryType="atalskit"
          type="text"
          placeholder="Name"
          onChange={() => sendEvent(true)}
        />
        <PiTextareaForm
          name="description"
          label="Description"
          libraryType="atalskit"
          placeholder="Description"
          maxLength={255}
        />
        <PiSelectForm
          classNamePrefix="react-select"
          name="status"
          label="Status"
          placeholder={isChecked ? "Active" : "InActive"}
          isDisabled
          options={
            isChecked
              ? [
                  {
                    value: "true",
                    label: "Active",
                  },
                ]
              : [
                  {
                    value: "false",
                    label: "InActive",
                  },
                ]
          }
        />
      </div>
    </FilterFormFields>
  );
}

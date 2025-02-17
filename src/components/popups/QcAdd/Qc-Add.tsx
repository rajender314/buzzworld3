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
  PiToast,
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

export default function QcAdd({
  sendModelData,
  setShowAddQcControl,
  showAddQcControl,
}: any) {
  const [popupMessageShow, setPopupMessageShow] = useState(false);
  const modelLabel = "Add QC Form";
  const [serverMsg, setServerMsg] = useState(null);
  const [loading, setloading] = useState(true);
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
            value: "true",
            label: "Active",
          },
  };
  useEffect(() => {
    setShowAddQcControl(true);
    setTimeout(() => {
      setloading(false);
    }, 200);
  }, []);

  function handleSubmit(data: any) {
    const objs = {
      ...data,
    };

    const apiObject = {
      payload: objs || {},
      method: "POST",
      apiUrl: `${EndpointUrl.QCcontrol}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.status_code === 200 && response.result.success) {
          sendModelData(response.result.data.id);
          setServerMsg(null);
          setShowAddQcControl(false);
          setPopupMessageShow(true);
        } else {
          setServerMsg(response.result.data);
        }
      })
      .catch(() => {});
  }

  function handleRef() {
    // formik.current = e;
  }
  function closeModels() {
    setShowAddQcControl(false);
  }
  async function triggerEvent() {
    setServerMsg(null);
  }

  return (
    <>
      <PiToast
        className={popupMessageShow ? "show" : ""}
        headerLabel="QC Form Created Successfully"
        message=""
        onClose={async () => setPopupMessageShow(false)}
      />
      <PiModal isOpen={showAddQcControl}>
        <PopupHeaderContentDiv>
          <PiModalHeader>
            <PopupHeaderDiv>
              <PiTypography component="h3">{modelLabel}</PiTypography>
              <CloseButton
                onClick={() => closeModels()}
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
                  <FilterForm
                    isChecked={isChecked}
                    sendEvent={() => triggerEvent()}
                  />
                </PiModalBody>
                <PiModalFooter>
                  {serverMsg && <div className="server-msg">{serverMsg}</div>}
                  <PiButton
                    appearance="secondary"
                    label="Cancel"
                    onClick={() => closeModels()}
                  />
                  <PiButton
                    appearance="primary"
                    label={modelLabel}
                    onClick={formik.handleSubmit}
                  />
                </PiModalFooter>
              </>
            )}
          </Formik>
        )}
      </PiModal>
    </>
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
                    value: "false",
                    label: "InActive",
                  },
                ]
              : [
                  {
                    value: "true",
                    label: "Active",
                  },
                ]
          }
        />
      </div>
    </FilterFormFields>
  );
}

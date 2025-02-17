import { PiConfirmModel, PiRadioGroup, PiSpinner, PiToast } from "pixel-kit";
import { useCallback, useEffect, useRef, useState } from "react";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { FilterColumnProps } from "@app/services/schema/schema";
import { Formik, Field } from "formik";
import { SpinnerDiv } from "../fileuploadModel/fileuploadModel.component";
import { OptionsContainer } from "../popups/client-approval-form/client-approval-form.component";
import { FormBodyOverFlow } from "../Repair-Components/checksIns/assignLocation/assign-location.component";

export default function WonConfirmModel({
  wonOrLostType,
  quoteInfo,
  sendData,
}: any) {
  const [optionsList, setOptionsList]: any = useState([]);
  const formik = useRef<any>(null);
  const [opacity, setOpacity] = useState(false);
  const [openConFirm, setConFirm] = useState(false);
  const [openSnackbar, setSnackbar] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [selectedId, setSelectedId]: any = useState("");

  const getOptions = useCallback(async () => {
    let arr: any = [];
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteOptions}?quote_id=${quoteInfo.id}&type=print`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then(async (response: any) => {
        if (response.result.success) {
          const { data } = response.result;

          arr = await data.map((item: FilterColumnProps) => ({
            value: item.id,
            label: `${item.name} (${item.total_price})`,
            ...item,
          }));
          console.log(arr);
          setOptionsList(arr);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
    return arr;
  }, [quoteInfo.id]);
  useEffect(() => {
    console.log(44444);
    setConFirm(true);
  }, []);
  useEffect(() => {
    console.log(12121);
    getOptions();
  }, [getOptions]);

  const handleSubmit = () => {
    if (!selectedId) {
      return;
    }
    setOpacity(true);
    const params = {
      type: wonOrLostType,
      quote_id: quoteInfo.id,
      option_id: selectedId,
    };
    const apiObject = {
      payload: params,
      method: "PUT",
      apiUrl: `${EndpointUrl.QuoteSubmitClientApproval}/${quoteInfo.id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: any) => {
        if (response.result.success) {
          setOpacity(false);
          setToastMsg("Updated Successfully");
          setSnackbar(true);
          sendData({ success: true });
        } else {
          setOpacity(false);
        }
        setConFirm(false);
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  function handleRef(e: any) {
    console.log(e);
    formik.current = e;
  }

  const onNcrChanged = (e: any) => {
    setSelectedId(e.target.id);
  };
  async function getConfirmModelEvent(e: string) {
    if (e === "accept") {
      formik.current.handleSubmit();
    }
  }
  // eslint-disable-next-line react/no-unstable-nested-components
  function OptionList() {
    return (
      <Formik
        validationSchema={null}
        onSubmit={() => handleSubmit()}
        initialValues={{}}
        innerRef={(e: any) => handleRef(e)}
      >
        {({ ...formikProps }: any) => (
          <FormBodyOverFlow
            style={{ padding: "0", height: "100%" }}
            className={opacity ? "opacity-on-load" : ""}
          >
            {opacity && (
              <SpinnerDiv style={{ position: "absolute", left: "50%" }}>
                <PiSpinner color="primary" size={50} libraryType="atalskit" />
              </SpinnerDiv>
            )}
            <p className="confirm-popup-options-heading">
              Please select option
            </p>
            <OptionsContainer>
              {/* {optionsList.length > 0 &&
                    optionsList.map((option: any, index: number) => {
                      return ( */}
              <div className="width-25 checkbox-form-field">
                <Field name="supplier">
                  {() => (
                    // <PiCheckbox
                    //  helpText=""
                    //  isChecked={field.value}
                    //  label={option.label}
                    //  libraryType="atalskit"
                    //  name={option.id}
                    //  //value={field.value}
                    //  onChange={(e: any) => onNcrChanged(e, option)}
                    //  size="medium"
                    /// >
                    <PiRadioGroup
                      libraryType="atalskit"
                      name="radio"
                      value={selectedId}
                      onChange={(e: any) => onNcrChanged(e)}
                      options={optionsList}
                    />
                  )}
                </Field>
              </div>
              {/* //  )
                    //})} */}
            </OptionsContainer>

            {formikProps.isSubmitting === true && !selectedId && (
              <small className="validation-error">
                Please select atleast one option
              </small>
            )}
          </FormBodyOverFlow>
        )}
      </Formik>
    );
  }
  return (
    <>
      <PiConfirmModel
        className={openConFirm ? "show" : ""}
        headerLabel="Confirmation"
        message={<OptionList />}
        primaryBtnLabel="Save"
        secondaryBtnLabel="Cancel"
        onClose={() => {
          setConFirm(false);
          const obj = {
            close: true,
          };
          sendData(obj);
        }}
        onAccept={(e: any) => getConfirmModelEvent(e)}
        onDecline={() => {
          setConFirm(false);
          const obj = {
            close: true,
          };
          sendData(obj);
        }}
      />
      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel={toastMsg}
        message=""
        onClose={async () => setSnackbar(false)}
      />
    </>
  );
}

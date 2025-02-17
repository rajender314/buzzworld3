/* eslint-disable react/no-unstable-nested-components */
import { PiCheckbox, PiSpinner, PiConfirmModel } from "pixel-kit";
import { useCallback, useEffect, useRef, useState } from "react";
import { triggerApi } from "@app/services";
import { OptionsContainer } from "@app/components/popups/client-approval-form/client-approval-form.component";
import { Formik, Field } from "formik";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import _ from "lodash";
import { SpinnerDiv } from "@app/components/multiEditModel/multiEditModel.component";

export default function PrintConfirmModel({
  confirmApiUrl,
  quoteInfo,
  sendData,
  options,
  sendOpacity,
}: any) {
  const [optionsList, setOptionsList]: any = useState([]);
  const formik = useRef<any>(null);
  const [opacity, setOpacity] = useState(false);
  const [openConFirm, setConFirm] = useState(false);
  const [serverMsg, setServerMsg] = useState(null);
  const initialValues = {
    pricing_rules: [
      {
        supplier: "",
      },
    ],
  };
  const [btnDisabled, setBtnDisabled] = useState<any>(false);

  const printApi = useCallback(
    (params: any) => {
      setConFirm(false);
      sendOpacity(true);
      setBtnDisabled(true);
      const apiObject = {
        payload: params,
        method:
          confirmApiUrl === "v1/Quote-SubmitClientApproval" ? "PUT" : "POST",
        apiUrl:
          confirmApiUrl === "v1/Quote-SubmitClientApproval"
            ? `${confirmApiUrl}/${quoteInfo.id}`
            : confirmApiUrl,
        headers: {},
      };
      triggerApi(apiObject)
        .then(async (response: any) => {
          if (response.result.success) {
            setOpacity(false);
            sendOpacity(false);
            setServerMsg(null);
            if (confirmApiUrl === "v1/PrintPdf") {
              const downloadUrl = response.result.data[0].fileURL;
              // window.location.href = downloadUrl
              window.open(downloadUrl, "_blank");
            }

            sendData({ success: true });
          } else {
            setServerMsg(response.result.data);
            setOpacity(false);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    },
    [confirmApiUrl, quoteInfo.id, sendData]
  );
  // const getOptions = useCallback(async () => {
  //  let arr: any = []
  //  const apiObject = {
  //    payload: {},
  //    method: 'GET',
  //    apiUrl: `${EndpointUrl.QuoteOptions}?quote_id=${quoteInfo.id}&type=print`,
  //    headers: {},
  //  }
  //  await triggerApi(apiObject)
  //    .then(async (response: any) => {
  //      if (response.result.success) {
  //        const data = response.result.data
  //        if (data.length === 1) {
  //          const params = {
  //            quote_id: quoteInfo.id,
  //            option_id: [data[0].id],
  //          }
  //          printApi(params)
  //        } else {
  //          arr = await data.map((item: FilterColumnProps) => {
  //            return {
  //              value: item.id,
  //              label: item.name,
  //              ...item,
  //            }
  //          })
  //          console.log(arr)
  //          setOptionsList(arr)
  //        }
  //      } else {
  //      }
  //    })
  //    .catch((err: string) => {
  //      console.log(err)
  //    })
  //  return arr
  // }, [quoteInfo.id, printApi])
  useEffect(() => {
    console.log(44444);
    setConFirm(true);
  }, []);
  // useEffect(() => {
  //  console.log(12121)
  //  getOptions()
  // }, [getOptions])

  useEffect(() => {
    setOptionsList(options);
  }, [options]);
  const [selectedIds, setSelectedIds]: any = useState([]);

  const handleSubmit = () => {
    if (selectedIds.length === 0) {
      return;
    }
    // setOpacity(true)
    let params: any;
    if (confirmApiUrl === "v1/PrintPdf") {
      params = {
        quote_id: quoteInfo.id,
        option_id: selectedIds,
      };
    } else if (confirmApiUrl === "v1/Quote-SubmitClientApproval") {
      params = {
        option_ids: selectedIds,
        type: "submit_for_client_approval",
        is_manual: true,
      };
    }
    printApi(params);
  };

  function handleRef(e: any) {
    console.log(e);
    formik.current = e;
  }

  const onNcrChanged = (e: any, option: any, indx: number) => {
    if (e.target.checked) {
      selectedIds.push(option.id);
    } else {
      const indx2 = _.findIndex(selectedIds, { id: option.id });
      selectedIds.splice(indx2, 1);
    }
    setSelectedIds(selectedIds);
    // formik.current.setFieldValue(`selectedOptions`, selectedIds)
    formik.current.setFieldValue(
      `pricing_rules.${indx}.supplier`,
      e.target.checked
    );
  };
  async function getConfirmModelEvent(e: string) {
    if (e === "accept") {
      formik.current.handleSubmit();
    }
  }
  function OptionList() {
    return (
      <Formik
        validationSchema={null}
        onSubmit={handleSubmit}
        initialValues={initialValues}
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
            {optionsList && optionsList.length > 0 && (
              <>
                <p className="confirm-popup-options-heading">
                  Please select options
                </p>
                <OptionsContainer>
                  {optionsList.length > 0 &&
                    optionsList.map((option: any, index: number) => (
                      <div className="padding checkbox-form-field">
                        <Field name={`pricing_rules.${index}.supplier`}>
                          {({ field }: any) => (
                            <PiCheckbox
                              helpText=""
                              isChecked={field.value}
                              label={`${option.label} (${option.total_price})`}
                              libraryType="atalskit"
                              name="supplier"
                              // value={field.value}
                              onChange={(e: any) => {
                                onNcrChanged(e, option, index);
                                console.log(field.value);
                              }}
                              size="medium"
                            />
                          )}
                        </Field>
                      </div>
                    ))}
                </OptionsContainer>
              </>
            )}
            {optionsList.length === 0 && (
              <p className="confirm-popup-options-heading">No options Found</p>
            )}
            {formikProps.isSubmitting === true && selectedIds.length === 0 && (
              <small className="validation-error">
                Please select atleast one option
              </small>
            )}
            {serverMsg && (
              <small className="validation-error">{serverMsg}</small>
            )}
          </FormBodyOverFlow>
        )}
      </Formik>
    );
  }
  return (
    <PiConfirmModel
      className={openConFirm ? "show" : ""}
      headerLabel="Confirmation"
      message={<OptionList />}
      primaryBtnLabel="Accept"
      secondaryBtnLabel="Decline"
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
      primaryBtnDisable={btnDisabled}
    />
  );
}

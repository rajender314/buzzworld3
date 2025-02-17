/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-shadow */
import { PiConfirmModel } from "pixel-kit";
import { useEffect, useRef, useState } from "react";
import { triggerApi } from "@app/services";
import { Formik, Field } from "formik";
import { AsyncSelectDiv } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import {
  AsyncLabel,
  CmpanyOptionDiv,
} from "@app/components/rmaModel/RmaModel.component";
import { AsyncSelect } from "@atlaskit/select";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { ApiResponse } from "@app/services/schema/schema";
import CloneQuoteValidationSchema from "./clone-quote-company-validation";
import { FormContainer } from "./clone-quote-confirm-model-components";

export default function CloneQuoteConfirmModel({ sendData }: any) {
  const formik = useRef<any>(null);
  const { current }: any = useRef({ timer: 0 });
  const [openConFirm, setConFirm] = useState(false);

  const initialValues = {
    customer_id: "",
  };
  useEffect(() => {
    setConFirm(true);
  }, []);

  const handleSubmit = (data: any) => {
    sendData({ payload: data });
  };

  function handleRef(e: any) {
    formik.current = e;
  }

  async function getConfirmModelEvent(e: string) {
    if (e === "accept") {
      formik.current.handleSubmit();
    }
  }
  const filterVendorData = async (inputValue: string) => {
    let options: any = [];
    if (inputValue.length >= 3) {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.QuoteCustomerDropdown}?search=${inputValue}`,
        headers: {},
      };
      await triggerApi(apiObject)
        .then((res: ApiResponse) => {
          if (res.result.success && res.result.status_code === 200) {
            const list = res.result.data.list
              ? res.result.data.list
              : res.result.data;
            let arr = [];
            arr = list.map((item: any) => ({
              value: item.id,
              label: (
                <CmpanyOptionDiv>
                  <div>
                    <div className="cmpny_name">{item.name}</div>
                    <div className="account_no">
                      {item.account_number ? item.account_number : "--"}
                    </div>
                  </div>
                  <div className="cmpny_address">{item.address1}</div>
                </CmpanyOptionDiv>
              ),
              ...item,
            }));
            options = arr;
            return options;
          }
          return options;
        })
        .catch((err: string) => {
          console.log(err);
        });
      return options;
    }
    return options;
  };
  const promiseOptions = (inputValue: string) =>
    new Promise((resolve) => {
      if (inputValue.length >= 3) {
        if (current.timer) clearTimeout(current.timer);
        current.timer = setTimeout(() => {
          resolve(filterVendorData(inputValue));
        }, 1000);
      }
    });

  const handleInputChange = (newValue: string) => {
    if (newValue.length >= 3) {
      return newValue;
    }
    return newValue;
  };
  const HandleChange = (form: any, fieldLabel: any, value: any) => {
    if (value) {
      const obj: any = { value: value.value, label: value.name };
      form.setFieldValue(fieldLabel, obj);
    } else {
      form.setFieldValue(fieldLabel, value);
    }
  };
  function OptionList() {
    return (
      <Formik
        validationSchema={CloneQuoteValidationSchema}
        onSubmit={(e: any) => handleSubmit(e)}
        initialValues={initialValues}
        innerRef={(e: any) => handleRef(e)}
      >
        {() => (
          <FormContainer>
            <div>
              <Field name="customer_id">
                {({ field, form, meta }: any) => (
                  <AsyncSelectDiv>
                    <AsyncLabel
                      htmlFor="async-select-example"
                      className="mandatory"
                    >
                      Company Name
                    </AsyncLabel>
                    <AsyncSelect
                      name="customer_id"
                      inputId="async-select-example"
                      classNamePrefix="react-select"
                      onInputChange={handleInputChange}
                      loadOptions={promiseOptions}
                      placeholder="Search By Account ID or Company Name"
                      onChange={(value) => {
                        HandleChange(form, "customer_id", value);
                      }}
                      value={field.value}
                      isClearable
                      noOptionsMessage={(obj: any) =>
                        !obj.inputValue
                          ? "Search Company Name"
                          : " Company Name Not Found"
                      }
                    />
                    <small className="validation-error">
                      {meta.touched && meta.error ? meta.error : ""}
                    </small>
                  </AsyncSelectDiv>
                )}
              </Field>
            </div>
          </FormContainer>
        )}
      </Formik>
    );
  }

  return (
    <PiConfirmModel
      className={openConFirm ? "show" : ""}
      headerLabel=""
      message={<OptionList />}
      primaryBtnLabel="Proceed"
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
  );
}

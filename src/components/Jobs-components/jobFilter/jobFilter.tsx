/* eslint-disable no-unused-vars */
import {
  PiButton,
  PiSelect,
  PiSideDrawer,
  PiSpinner,
  PiTypography,
} from "pixel-kit";
import { useEffect, useRef, useState } from "react";

import CrossLogo from "@app/assets/images/cross.svg";
import { Formik } from "formik";

import CreateJob from "@app/assets/images/create-job.svg";
import { triggerApi } from "@app/services";
import { AsyncSelect } from "@atlaskit/select";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { ApiResponse } from "@app/services/schema/schema";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import {
  AsyncSelectDiv,
  SideDrawerFooter,
} from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import {
  AsyncLabel,
  SideDrawerW40,
} from "@app/components/rmaModel/RmaModel.component";
import {
  CloseButton,
  JobFields,
  JobPopupHeaderContainer,
} from "@app/components/Jobs-components/job-check-list/jobModel/job-model-component";

type Props = {
  sendModelDatas: (e: any) => {};
};
export default function JobFilter({ sendModelDatas }: Props) {
  const [openModel, setOpenModel] = useState(false);
  const [serverMsg, setServerMsg] = useState(null);
  const [loading] = useState(true);
  const initialValues = {};
  const formik = useRef<any>(null);
  const [customerName, setCustomerName] = useState([]);
  const { current }: any = useRef({ timer: 0 });
  const HandleChange = (value: any) => {
    if (value) {
      setCustomerName(value);
    }
  };
  function closeModel() {
    setOpenModel(false);
    sendModelDatas({ success: false });
  }
  const filterVendorData = async (inputValue: string) => {
    let data: any = [];
    if (inputValue.length >= 3) {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.QuoteCustomerDropdown}?search=${inputValue}`,
        headers: {},
      };
      await triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            let arr = [];
            const list = response.result.data;
            arr = list.map((item: any) => ({
              value: item.id,
              // label: (
              //  <CmpanyOptionDiv>
              //    <div>
              //      <div className="cmpny_name">{item.name}</div>
              //      {/* <div className="account_no">
              //        {item.account_number ? item.account_number : '--'}
              //      </div> */}
              //    </div>
              //    <div className="cmpny_address">{item.address1}</div>
              //  </CmpanyOptionDiv>
              // ),
              label: item.name,
              ...item,
            }));
            data = arr;
          }
        })
        .catch(() => {});
      return data;
    }
    return data;
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
  const handleInputChanges = (newValue: string) => {
    if (newValue.length >= 3) {
      return newValue;
    }
    return newValue;
  };

  function handleSubmit() {
    setServerMsg(null);
    setServerMsg(null);
  }
  function handleRef(e: any) {
    formik.current = e;
  }
  const opacity = useState(false);
  useEffect(() => {
    setOpenModel(true);
  }, []);
  return (
    <SideDrawerW40>
      <PiSideDrawer isOpen={openModel} width="narrow">
        <SideDrawerContainer>
          <SideDrawerHeader>
            <JobPopupHeaderContainer>
              <img src={CreateJob} alt="loading" />

              <PiTypography component="h3">Filter Job</PiTypography>
            </JobPopupHeaderContainer>

            <CloseButton
              onClick={() => closeModel()}
              title="close"
              className="Hover"
            >
              <img src={CrossLogo} alt="loading" />
            </CloseButton>
          </SideDrawerHeader>

          {loading && (
            <Formik
              // validationSchema={
              //   type === "job"
              //     ? JobValidationSchema
              //     : JobFilterValidationSchema
              // }
              onSubmit={() => handleSubmit()}
              // onReset={handleReset}
              initialValues={initialValues}
              innerRef={(e: any) => handleRef(e)}
            >
              {({ ...formikProps }: any) => (
                <>
                  <FormBodyOverFlow
                    className={opacity ? "opacity-on-load" : ""}
                  >
                    {opacity && (
                      <SpinnerDiv style={{ position: "absolute", left: "50%" }}>
                        <PiSpinner
                          color="primary"
                          size={50}
                          libraryType="atalskit"
                        />
                      </SpinnerDiv>
                    )}
                    <JobFields>
                      <div className="width-50">
                        <AsyncSelectDiv>
                          <AsyncLabel
                            htmlFor="async-select-example"
                            className="css-re7y6x"
                          >
                            Company Name
                          </AsyncLabel>
                          <AsyncSelect
                            name="customer_id"
                            inputId="async-select-example"
                            classNamePrefix="multi-select react-select"
                            onInputChange={handleInputChanges}
                            loadOptions={promiseOptions}
                            placeholder="Search By Company Name"
                            onChange={(value) => {
                              HandleChange(value);
                            }}
                            isClearable
                            value={customerName}
                            isMulti
                          />
                        </AsyncSelectDiv>
                      </div>
                      <div className="width-50">
                        <PiSelect
                          name="filter_assigne"
                          label="Assign to (Optional)"
                          placeholder="Select Assign to"
                          isMulti={false}
                          options={[
                            { label: "Adelaide", value: "adelaide" },
                            { label: "Brisbane", value: "brisbane" },
                            { label: "Canberra", value: "canberra" },
                            { label: "Darwin", value: "darwin" },
                            { label: "Hobart", value: "hobart" },
                            { label: "Melbourne", value: "melbourne" },
                            { label: "Perth", value: "perth" },
                            { label: "Sydney", value: "sydney" },
                          ]}
                          // options={assign}
                          // onChange={filterAssign}
                        />
                      </div>
                    </JobFields>
                  </FormBodyOverFlow>
                  <SideDrawerFooter>
                    {serverMsg && <div className="server-msg">{serverMsg}</div>}
                    <>
                      <PiButton
                        type="reset"
                        appearance="secondary"
                        label="Clear All"
                        isDisabled={!!opacity}
                        onClick={formikProps.handleReset}
                      />
                      <PiButton
                        appearance="primary"
                        label="Apply"
                        onClick={formikProps.handleSubmits}
                        isDisabled={!!opacity}
                      />
                    </>
                  </SideDrawerFooter>
                </>
              )}
            </Formik>
          )}
        </SideDrawerContainer>
      </PiSideDrawer>
    </SideDrawerW40>
  );
}

import {
  PiSideDrawer,
  PiTypography,
  PiSpinner,
  PiInputForm,
  PiSelectForm,
  PiButton,
  PiIconInputForm,
} from "pixel-kit";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import { SideDrawerFooter } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import {
  RmaFields,
  SideDrawerW40,
} from "@app/components/rmaModel/RmaModel.component";
import QuotesImg from "@app/assets/images/quotes.svg";
import CrossLogo from "@app/assets/images/cross.svg";
import { Formik } from "formik";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { QuotePopupHeaderContainer } from "./PartQuote/part-quote.component";

export default function BulkEdit({
  quoteDetails,
  totalCheckedList,
  sendEventData,
}: any) {
  const { id }: RouteParams = useParams();
  const [openModel, setOpenModel] = useState(false);
  const [serverMsg, setServerMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opacity, setOpacity] = useState(false);
  const [selectedLeadTime, setSelectedLeadTime] = useState();
  const [leadTimeType, setLeadTimeType] = useState("");
  const initialValues = {
    discount: "",
    source: "",
    lead_time: "",
    lead_time_value: "",
  };
  const formik = useRef<any>(null);
  const [quoteSourceOptions, setQuoteSourceOptions] = useState([]);
  const [quoteLeadTime, setQuoteLeadTime] = useState([]);
  const BulkEditSchema = Yup.object({
    discount: Yup.number()
      // .required("Please enter Discount Price")
      .max(100, "Discount Price cannot be more than 100")
      .typeError("Discount must be a number")
      .nullable(),
    lead_time_value: Yup.string().when("lead_time", {
      is: (value: any) => value && value.label !== "TBD",
      then: Yup.string()
        .required("Please enter Turn Around Time Value")
        // .matches(/^-?\d+(?:\.\d+)?$/gm, 'Please enter numbers only')
        .trim(),
      otherwise: Yup.string(),
    }),
  });
  const getQuoteSourceOptions = useCallback(async () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteSourceOptions}?sort=asc&is_dropdown=true`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          setQuoteSourceOptions(data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }, []);
  const getQuoteLeadTimeOptions = useCallback(async () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteLeadTimeOptions}?sort=asc&is_dropdown=true`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          setQuoteLeadTime(data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    (async () => {
      setOpenModel(true);
      await getQuoteSourceOptions();
      await getQuoteLeadTimeOptions();
      setLoading(false);
    })();
  }, []);
  function handleRef(e: any) {
    formik.current = e;
  }
  function closeModel() {
    setOpenModel(false);
    sendEventData({ close: true });
  }

  function handleSubmit(data: any) {
    setOpacity(true);
    const iDList: any = [];
    totalCheckedList.map((obj: any) => {
      iDList.push(obj.id);
      return iDList;
    });
    const params = {
      ...data,
      quote_id: id,
      ids: iDList,
      // notes: notes,
    };
    const apiObject = {
      payload: params,
      method: "POST",
      apiUrl: `${EndpointUrl.BulkEditItems}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setServerMsg(null);
          setOpenModel(false);
          setOpacity(false);
          sendEventData({ success: true });
        } else {
          setOpacity(false);
          setServerMsg(response.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  const onChangeLeadTime = (e: any, action: any) => {
    console.log(e, action);
    setSelectedLeadTime(e);
    setLeadTimeType(e.label);
    if (e.label === "TBD") {
      formik.current.setFieldValue("lead_time_value", "");
    }
  };
  return (
    <SideDrawerW40>
      <PiSideDrawer isOpen={openModel} width="narrow">
        <SideDrawerContainer>
          <SideDrawerHeader>
            <QuotePopupHeaderContainer>
              <img src={QuotesImg} alt="loading" />
              <PiTypography component="h3">Edit Quote Items</PiTypography>
            </QuotePopupHeaderContainer>
            <CloseButton
              onClick={() => closeModel()}
              title="close"
              className="Hover"
            >
              <img src={CrossLogo} alt="loading" />
            </CloseButton>
          </SideDrawerHeader>
          {loading && (
            <SpinnerDiv style={{ height: "100%" }}>
              <PiSpinner color="primary" size={50} libraryType="atalskit" />
            </SpinnerDiv>
          )}
          {!loading && (
            <Formik
              validationSchema={BulkEditSchema}
              onSubmit={(e: any) => handleSubmit(e)}
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
                    <RmaFields>
                      <div className="icon_input width-50">
                        <PiIconInputForm
                          name="discount"
                          label="Discount Price"
                          placeholder="Enter Discount Price"
                          maxLength={5}
                          elemBeforeInput={
                            <div
                              style={{
                                padding: "10px",
                                color: "#6D7992",
                                borderRight: "1px solid #d0d1d3",
                              }}
                            >
                              %
                            </div>
                          }
                          type="string"
                        />
                      </div>
                      {!quoteDetails.is_repair && (
                        <div className="width-50 m-0">
                          <PiSelectForm
                            name="source"
                            label="Source"
                            placeholder="Select"
                            isMulti={false}
                            options={quoteSourceOptions}
                            classNamePrefix="react-select"
                            // isDisabled
                          />
                        </div>
                      )}
                      <div className=" width-50">
                        <PiSelectForm
                          name="lead_time"
                          label="Turn Around Time"
                          placeholder="Select"
                          isMulti={false}
                          options={quoteLeadTime}
                          classNamePrefix="react-select"
                          onChange={(e: any, actionMeta: any) =>
                            onChangeLeadTime(e, actionMeta)
                          }
                          // isDisabled
                        />
                      </div>
                      {selectedLeadTime && leadTimeType !== "TBD" && (
                        <div className=" width-50">
                          <PiInputForm
                            name="lead_time_value"
                            label={leadTimeType}
                            placeholder={leadTimeType}
                          />
                        </div>
                      )}
                    </RmaFields>
                  </FormBodyOverFlow>
                  <SideDrawerFooter>
                    {serverMsg && <div className="server-msg">{serverMsg}</div>}
                    <PiButton
                      appearance="primary"
                      label="Save"
                      onClick={formikProps.handleSubmit}
                      isDisabled={!!opacity}
                    />
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

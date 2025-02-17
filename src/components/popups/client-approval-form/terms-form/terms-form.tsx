import {
  PiTypography,
  PiSpinner,
  PiButton,
  PiInputForm,
  PiEditor,
  PiToast,
} from "pixel-kit";
import { useEffect, useRef, useState } from "react";
// import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import { SideDrawerFooter } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import { AsyncLabel } from "@app/components/rmaModel/RmaModel.component";
// import CrossLogo from "@app/assets/images/cross.svg";
import { Formik, Field } from "formik";
// import { DateRangePickerDiv } from "@app/components/special-pricing-components/sp-left-filter/sp-left-filter.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
// import { ApiResponse, FilterColumnProps } from "@app/services/schema/schema";

// import { AsyncSelect } from "@atlaskit/select";
// import moment from "moment";
// import QuotesImg from "@app/assets/images/quotes.svg";
// import { PartQuoteValidationSchema } from "@app/components/Quote-components/Forms/PartQuote/part-quote-validation";
import { Width100 } from "@app/components/Quote-components/Forms/PartQuote/part-quote.component";
import TermsValidationsSchema from "@app/modules/adminModules/termsCondition/validation/TermsValidationSchema";
import { EditorContainer } from "@app/components/RepairNotes/repair-notes.component";
import { InventoryWarehousedata } from "@app/components/userRolePermissions/permissionBox/qc-control-component";
import { getPermissionObject } from "@app/helpers/componentHelpers";

export default function TermsForm() {
  const approvalName = "Quote PDF Print Information";
  // const [openModel, setOpenModel] = useState(false);
  const [putProps, setPutProp]: any = useState();
  const [shipping, setShipping]: any = useState("");
  const [lead, setLead]: any = useState("");
  const [disclainer, setDisclainer]: any = useState("");
  const [terms, setTerms]: any = useState("");
  const [openSnackbar, setSnackbar] = useState(false);
  const [serverMsg, setServerMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [TodayDate, SetTodayDate] = useState("");
  // const [opacity, setOpacity] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [initialValues, setInitialValues] = useState({
    website: "",
    contact_no: "",
    fax_no: "",
    email: "",
    field_service: "",
  });
  const [permissionObject, setpermissionObject] = useState<any>({});

  const formik = useRef<any>(null);
  // const { current }: any = useRef({ timer: 0 });
  function handleRef(e: any) {
    formik.current = e;
  }

  // function closeModel() {
  //   setOpenModel(false);
  //   sendModelData({ success: false });
  // }

  const onshipping = (e: string) => {
    setShipping(e);
  };
  const onleadTime = (e: string) => {
    setLead(e);
  };
  const ondisclainer = (e: string) => {
    setDisclainer(e);
  };
  const onterms = (e: string) => {
    setTerms(e);
  };
  const getTermsAndCondationsData = () => {
    setLoading(true);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.TermsandConditions}?code=${"TERMS"}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((res: any) => {
        if (res.result.success && res.result.status_code === 200) {
          setLoading(false);
          setPutProp(res.result.data.list[0].id || "");
          res.result.data.list.map((data: any) => {
            initialValues.website = data.website;
            setInitialValues(initialValues);
            initialValues.fax_no = data.fax_no;
            setInitialValues(initialValues);
            initialValues.email = data.email;
            setInitialValues(initialValues);
            initialValues.contact_no = data.contact_no;
            setInitialValues(initialValues);
            initialValues.field_service = data.field_service_number;
            setInitialValues(initialValues);
            setShipping(data.shipping_instructions);
            setLead(data.lead_time);
            setDisclainer(data.disclaimer);
            setTerms(data.terms_and_conditions);
            return data;
          });
        } else {
          setLoading(false);
        }
      })
      .catch(() => {});
  };
  useEffect(() => {
    console.log(window.location.pathname.substring(1));
    (async () => {
      const permission = await getPermissionObject(
        window.location.pathname.substring(1)
      );
      setpermissionObject(permission);
    })();
  }, []);
  useEffect(() => {
    getTermsAndCondationsData();
  }, []);

  function handleSubmit(data: any) {
    const apiObject = {
      payload: {
        shipping_instructions: shipping || "",
        lead_time: lead || "",
        disclaimer: disclainer || "",
        terms_and_conditions: terms || "",
        contact_no: data && data.contact_no ? data.contact_no : "",
        fax_no: data && data.fax_no ? data.fax_no : "",
        email: data && data.email ? data.email : "",
        website: data && data.website ? data.website : "",
        field_service_number:
          data && data.field_service ? data.field_service : "",
      },
      method: "PUT",
      apiUrl: `${EndpointUrl.TermsandConditions}/${putProps || ""}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success && response.result.status_code === 200) {
          setServerMsg(null);
          setToastMsg("Updated Successfully");
          setSnackbar(true);
        } else {
          setServerMsg(response.result.data);
        }
      })
      .catch(() => {});
  }

  return (
    <>
      <SideDrawerContainer>
        <SideDrawerHeader>
          <PiTypography component="h3">{approvalName}</PiTypography>
        </SideDrawerHeader>
        {loading && (
          <SpinnerDiv style={{ height: "100%" }}>
            <PiSpinner color="primary" size={50} libraryType="atalskit" />
          </SpinnerDiv>
        )}
        {!loading && (
          <Formik
            validationSchema={TermsValidationsSchema}
            onSubmit={(e: any) => handleSubmit(e)}
            initialValues={initialValues}
            innerRef={(e: any) => handleRef(e)}
          >
            {({ ...formikProps }: any) => (
              <>
                <FormBodyOverFlow>
                  <InventoryWarehousedata>
                    <Width100 className="d-flex-row-gap width-100">
                      <Field name="">
                        {() => (
                          <>
                            <div className="web">
                              <PiInputForm
                                name="website"
                                label="Website"
                                placeholder="Website"
                                type="link"
                                isDisabled={!permissionObject.Edit}
                              />
                            </div>
                            <div className="web">
                              <PiInputForm
                                name="email"
                                label="Email"
                                placeholder="Email"
                                type="email"
                                isDisabled={!permissionObject.Edit}
                              />
                            </div>
                            <div className="web">
                              <PiInputForm
                                name="fax_no"
                                label="Fax"
                                placeholder="Fax"
                                isDisabled={!permissionObject.Edit}
                              />
                            </div>

                            <div className="web">
                              <PiInputForm
                                name="contact_no"
                                label="Customer Service"
                                placeholder="Customer Service"
                                isDisabled={!permissionObject.Edit}
                              />
                            </div>
                            <div className="web">
                              <PiInputForm
                                name="field_service"
                                label="Field Service Number"
                                placeholder="Field Service Number"
                                isDisabled={!permissionObject.Edit}
                              />
                            </div>
                            <EditorContainer className="item-specific-notes">
                              <div className="lead">
                                <AsyncLabel htmlFor="async-select-example">
                                  Shipping Instructions
                                </AsyncLabel>
                                <div className="web">
                                  <PiEditor
                                    libraryType="atalskit"
                                    onChange={onshipping}
                                    value={shipping}
                                    readOnly={!permissionObject.Edit}
                                  />
                                </div>
                              </div>
                              <div className="lead">
                                <AsyncLabel htmlFor="async-select-example">
                                  Lead Time
                                </AsyncLabel>
                                <div className="web">
                                  <PiEditor
                                    libraryType="atalskit"
                                    onChange={onleadTime}
                                    value={lead}
                                    readOnly={!permissionObject.Edit}
                                  />
                                </div>
                              </div>
                              <div className="lead">
                                <AsyncLabel htmlFor="async-select-example">
                                  Disclaimer
                                </AsyncLabel>
                                <div className="web">
                                  <PiEditor
                                    libraryType="atalskit"
                                    onChange={ondisclainer}
                                    value={disclainer}
                                    readOnly={!permissionObject.Edit}
                                  />
                                </div>
                              </div>
                              <div className="lead">
                                <AsyncLabel htmlFor="async-select-example">
                                  Terms and Conditions
                                </AsyncLabel>
                                <div className="web">
                                  <PiEditor
                                    libraryType="atalskit"
                                    onChange={onterms}
                                    value={terms}
                                    readOnly={!permissionObject.Edit}
                                  />
                                </div>
                              </div>
                            </EditorContainer>
                          </>
                        )}
                      </Field>
                    </Width100>
                  </InventoryWarehousedata>
                </FormBodyOverFlow>
                {permissionObject.Edit && (
                  <SideDrawerFooter>
                    {serverMsg && <div className="server-msg">{serverMsg}</div>}
                    <PiButton
                      appearance="primary"
                      label="Update"
                      onClick={formikProps.handleSubmit}
                      isDisabled={!permissionObject.Edit}
                    />
                  </SideDrawerFooter>
                )}
              </>
            )}
          </Formik>
        )}
      </SideDrawerContainer>
      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel={toastMsg}
        message=""
        onClose={async () => setSnackbar(false)}
      />
      {/* </PiSideDrawer> */}
    </>
  );
}

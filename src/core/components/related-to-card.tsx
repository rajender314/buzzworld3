import { useEffect, useRef, useState } from "react";
import {
  JobsRelatedActivityLogWrapper,
  JobsActivityLogContainer,
  JobsRelatedActivityLogHeader,
  JobsRelatedActivityLogTitle,
  JobsRelatedActivityLogDataContainer,
  JobsRelatedActivityLogData,
  JobsRelatedActivityLogDetails,
  JobsRelatedActivityLogInfo,
  JobsRelatedActivityActor,
  RelatedToItems,
  SyncContainer,
  ModalBodyContainer,
  FieldContainer,
  ValidationMsg,
} from "@app/components/Jobs-components/job-checklist-item/JobsRelated/jobs-related.components";
import SyncIcon from "@app/assets/images/addIcon.svg";
import { Formik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import {
  PiButton,
  PiInputForm,
  PiModal,
  PiModalBody,
  PiModalFooter,
  PiSpinner,
  PiToast,
  PiTooltip,
  PiTypography,
} from "pixel-kit";
import { NoRepairFound } from "@app/core/components/ItemsCard/item-card.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
  SpinnerDiv,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import { TechNotesHeader } from "@app/components/RepairItems/item-internal-notes.component";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import SyncDataSchema from "@app/modules/contacts/validation/sync-data-validation";
import CrossLogo from "@app/assets/images/cross.svg";

export default function RelatedToCard({
  relatedData,
  pageLabel,
  sendEventData,
  isLoading,
}: any) {
  const history = useHistory();
  const { id }: RouteParams = useParams();
  const [relatedList, setRelateList] = useState([]);
  const [noDataMsg, setNoDataMsg] = useState("");
  const [tooltipMsg, setTooltipMsg] = useState("");
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [opacity, setOpacity] = useState(false);
  const [showTost, setShowTost] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<any>("");
  const [initialValues] = useState({
    quote_no: "",
  });
  const formik = useRef<any>(null);
  function handleRef(e: any) {
    formik.current = e;
  }
  const getMessage = (): any => {
    if (relatedList && relatedList.length === 0) {
      if (pageLabel === "Partpurchase") {
        return "Related to Jobs are not available";
      }
      if (pageLabel === "Order") {
        return "Related to Quotes are not available";
      }
      if (pageLabel === "Quotes") {
        return "Related to Repairs are not available";
      }
      if (pageLabel === "Jobs") {
        return "Related to Sales order are not available";
      }
    }
    return "Related to records are not available";
  };
  useEffect(() => {
    setRelateList(relatedData);
  }, [relatedData]);
  useEffect(() => {
    const msg = getMessage();
    setNoDataMsg(msg);
  }, [relatedData]);

  const navigateTo = (ele: any) => {
    history.push(`/${ele.navigate_to}`);
  };

  const getToolTip = (IDtype: string) => {
    if (IDtype === "Repair ID") {
      setTooltipMsg("Repairs");
    } else if (IDtype === "Quote ID") {
      setTooltipMsg("Quotes");
    } else if (IDtype === "Job ID") {
      setTooltipMsg("Jobs");
    } else if (IDtype === "Order ID") {
      setTooltipMsg("Sales Order");
    } else if (IDtype === "Parts Purchase ID") {
      setTooltipMsg("Parts Purchase");
    } else {
      setTooltipMsg("Quotes");
    }
  };
  const onShowModel = () => {
    setErrorMsg("");
    setOpenModel(true);
  };
  const closeModel = () => {
    setOpenModel(false);
  };

  const handleSubmit = (data: any) => {
    setErrorMsg("");
    setOpacity(true);
    const params = {
      sales_order_id: "",
      job_id: "",
    };

    if (pageLabel === "Order") {
      params.sales_order_id = id;
    } else if (pageLabel === "Jobs") {
      params.job_id = id;
    }

    const apiObject = {
      payload: { ...params, ...data },
      method: "POST",
      apiUrl: `${EndpointUrl.SyncSoandJobs}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response && response.result.success) {
          setOpenModel(false);
          setShowTost(true);
          setTimeout(() => {
            sendEventData({ pageLabel });
          }, 500);
        } else {
          setErrorMsg(response?.result?.data);
          setOpacity(false);
        }
      })
      .catch((err: string) => {
        setOpacity(false);

        console.log(err);
      });
  };
  return (
    <>
      <JobsRelatedActivityLogWrapper className="open">
        <JobsActivityLogContainer className="open">
          <JobsRelatedActivityLogHeader>
            <JobsRelatedActivityLogTitle>
              Related to
            </JobsRelatedActivityLogTitle>
            {(pageLabel === "Order" || pageLabel === "Jobs") &&
              relatedList?.length === 0 &&
              !isLoading && (
                <PiTooltip content="Add Related" libraryType="atalskit">
                  <SyncContainer onClick={() => onShowModel()}>
                    <img src={SyncIcon} alt="sync" />
                    {/* <span className="link-icon-text">Add</span> */}
                  </SyncContainer>
                </PiTooltip>
              )}
          </JobsRelatedActivityLogHeader>

          <JobsRelatedActivityLogDataContainer className="border-bottom">
            {isLoading && (
              <SpinnerDiv style={{ height: "100%" }}>
                <PiSpinner color="primary" size={30} libraryType="atalskit" />
              </SpinnerDiv>
            )}

            {!isLoading && (
              <JobsRelatedActivityLogData>
                {relatedList &&
                  relatedList.length > 0 &&
                  relatedList.map((obj: any) => (
                    <JobsRelatedActivityLogDetails
                      onClick={() => navigateTo(obj)}
                    >
                      {/* <JobsRelatedActivityLogByImage> */}
                      {/* <img src={OrderIdImg} alt="loading" /> */}
                      {/* </JobsRelatedActivityLogByImage> */}
                      <JobsRelatedActivityLogInfo>
                        <PiTooltip
                          content={`Related to ${tooltipMsg}`}
                          libraryType="atalskit"
                        >
                          <JobsRelatedActivityActor
                            onMouseOver={() => {
                              getToolTip(obj.id_type);
                            }}
                          >
                            <RelatedToItems id_type={obj.id_type}>
                              {/* <div style={{ whiteSpace: "nowrap" }}>
                              {obj.id_type}
                            </div> */}
                              <div className="" title={obj.label}>
                                {obj.label}
                              </div>
                            </RelatedToItems>
                          </JobsRelatedActivityActor>
                        </PiTooltip>
                      </JobsRelatedActivityLogInfo>
                    </JobsRelatedActivityLogDetails>
                  ))}
                {relatedList.length === 0 && (
                  <NoRepairFound style={{ height: "100px" }}>
                    {noDataMsg}
                  </NoRepairFound>
                )}
              </JobsRelatedActivityLogData>
            )}
          </JobsRelatedActivityLogDataContainer>
        </JobsActivityLogContainer>
      </JobsRelatedActivityLogWrapper>
      {openModel && (
        <PiModal isOpen={openModel} width={650} className="pi_modal">
          <PopupHeaderContentDiv>
            <TechNotesHeader>
              <PopupHeaderDiv className="show">
                <PiTypography component="h4">
                  {pageLabel === "Order" ? "Related Orders" : "Related Jobs"}
                </PiTypography>
                <CloseButton
                  onClick={() => closeModel()}
                  title="close"
                  className={opacity ? "Hover event" : "Hover"}
                >
                  <img src={CrossLogo} alt="loading" />
                </CloseButton>
              </PopupHeaderDiv>
            </TechNotesHeader>
            <hr />
          </PopupHeaderContentDiv>

          <Formik
            validationSchema={SyncDataSchema}
            onSubmit={handleSubmit}
            initialValues={initialValues}
            innerRef={(e: any) => handleRef(e)}
          >
            {({ ...formikProps }: any) => (
              <>
                <PiModalBody>
                  <ModalBodyContainer
                    className={opacity ? "opacity-on-load" : ""}
                  >
                    {opacity && (
                      <SpinnerDiv
                        style={{
                          position: "absolute",
                          left: "50%",
                          zIndex: "999",
                          top: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                        className="zindex"
                      >
                        <PiSpinner
                          color="primary"
                          size={50}
                          libraryType="atalskit"
                        />
                      </SpinnerDiv>
                    )}
                    <FieldContainer>
                      <PiInputForm
                        name="quote_no"
                        label="Quote Number"
                        placeholder="Enter Quote Number"
                        isMandatory
                        isDisabled={opacity}
                        maxLength={13}
                      />
                    </FieldContainer>
                    <ValidationMsg className="open" title={errorMsg}>
                      {errorMsg}
                    </ValidationMsg>
                  </ModalBodyContainer>
                </PiModalBody>
                <PiModalFooter>
                  <PiButton
                    appearance="primary"
                    label="Submit"
                    libraryType="atalskit"
                    className="proceed-btn"
                    isDisabled={opacity}
                    onClick={formikProps.handleSubmit}
                  />
                </PiModalFooter>
              </>
            )}
          </Formik>
        </PiModal>
      )}
      <PiToast
        className={showTost ? "show" : ""}
        headerLabel="Related To"
        message="Updated sucessfully"
        onClose={async () => setShowTost(false)}
      />
    </>
  );
}

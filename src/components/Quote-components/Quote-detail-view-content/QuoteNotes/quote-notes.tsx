import {
  PiTabGroup,
  PiTabHeaderPanel,
  PiTabHeader,
  PiEditor,
  PiTabPanel,
  PiButton,
  PiToast,
  PiTypography,
  PiModal,
  PiModalBody,
  PiModalFooter,
  PiTooltip,
} from "pixel-kit";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CloseButton,
  Popup,
} from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import { RepairInfoSection } from "@app/components/detail-view-content/detail-view-content.component";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import {
  EditorContainer,
  ShowContainer,
} from "@app/components/RepairNotes/repair-notes.component";
import { PermissionFooter } from "@app/components/userRolePermissions/user-role-permissions.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import DynamicNotes from "@app/core/components/DynamicNotes/dynamic-notes";
import NotesChat from "@app/core/components/NotesChat/notes-chat";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import { getUserLoggedPermission } from "@app/helpers/helpers";
import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import CrossLogo from "@app/assets/images/cross.svg";
// import ShowMore from "../../../../assets/images/Showmore.svg"
import ShowMore from "@app/assets/images/Showmore.svg";
import { TechNotesHeader } from "@app/components/RepairItems/item-internal-notes.component";
import GenerateHTML from "./generateHTML";

export default function QuoteNotes({ quoteDetails, sendQuotesData }: any) {
  const { id }: RouteParams = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [openSnackbar, setSnackbar] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [opacity, setOpacity] = useState(false);
  const [popupNotes, setPopupNotes]: any = useState();

  useEffect(() => {}, []);
  const [permissionObject, setpermissionObject] = useState<any>({});
  const { current }: any = useRef({ timer: 0 });
  const [notesToCustomer, setNotesToCustomer] = useState(
    quoteDetails.customer_notes
  );
  const [showSavePanel, setSavePanel] = useState(false);

  const showRedDot = quoteDetails.is_internal_notes;
  const [serverMsg, setServerMsg] = useState(null);
  const [openModel, setOpenModel] = useState(false);
  const [quoteInfo, setQuoteInfo] = useState(quoteDetails);

  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("quote_for_parts");
      setpermissionObject(permission);
      console.log(permission);
    })();
  }, []);

  useEffect(() => {
    console.log(quoteDetails.customer_notes);
    setNotesToCustomer(quoteDetails.customer_notes);
  }, [quoteDetails]);
  function tabChange(indx: number) {
    setTabIndex(indx);
  }

  const getQuoteInfo = () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.Quote}/${id}?quote_id=${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          sendQuotesData({ data: response.result.data });
          const { data } = response.result;
          const info = data;
          setQuoteInfo({ ...info });
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };

  const onChangeNotestoCustomer = (e: string) => {
    const notes = e;
    setNotesToCustomer(notes);
  };
  const updateNotestoCustomer = () => {
    setOpacity(true);
    const apiObject = {
      payload: { customer_notes: popupNotes || notesToCustomer },
      method: "PATCH",
      apiUrl: `${EndpointUrl.Quote}/${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          setOpacity(false);
          setNotesToCustomer(popupNotes || notesToCustomer);
          setPopupNotes("");
          getQuoteInfo();
          setOpenModel(false);
          setSavePanel(false);
          setServerMsg(null);
          setToastMsg("Updated Successfully");
          setSnackbar(true);
        } else {
          setOpacity(false);
          setServerMsg(response.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const saveRepairData = () => {
    updateNotestoCustomer();
  };

  const resetData = () => {
    setSavePanel(false);
    setNotesToCustomer(quoteDetails.customer_notes);
    // setRepairDetails({ ...repairInfo })
  };
  const onNotesKeyUp = (e: any) => {
    console.log(e);
    const text = e.target.innerHTML.replace(/<\/?[^>]+>/gi, "");
    console.log(text);
    console.log(quoteDetails.customer_notes);
    if (current.timer) clearTimeout(current.timer);
    current.timer = setTimeout(() => {
      if (text !== "" && text !== quoteDetails.customer_notes) {
        setSavePanel(true);
      }
    }, 500);
  };
  const onNotesKeyDown = (e: any) => {
    const text = e.target.innerHTML.replace(/<\/?[^>]+>/gi, "");
    setTimeout(() => {
      if (text !== "" && e.target.innerHTML !== quoteDetails.customer_notes) {
        setSavePanel(true);
      }
    }, 500);
  };
  function closeModel() {
    setOpenModel(false);
    setPopupNotes("");
  }
  const QuotesHandler = () => {
    setOpenModel(true);
  };
  const triggerNotesData = (e: any) => {
    setPopupNotes(e);
  };
  return (
    <RepairInfoSection id="repair-notes-id" style={{ padding: "17px 24px" }}>
      <div className="rep-label-typo">
        <PiTypography component="h4">Quote Notes</PiTypography>
      </div>
      <PiTabGroup
        id="tab"
        onChange={(e: any) => tabChange(e)}
        selected={tabIndex}
      >
        <PiTabHeaderPanel>
          {getUserLoggedPermission() && (
            <PiTabHeader>Notes to Customer</PiTabHeader>
          )}
          <PiTabHeader>Dynamics Notes</PiTabHeader>
          {getUserLoggedPermission() && (
            <PiTabHeader>
              Internal Notes&nbsp;&nbsp;
              <span
                className={showRedDot ? "notes_red_dot" : ""}
                title="new message"
              />
            </PiTabHeader>
          )}
        </PiTabHeaderPanel>
        {getUserLoggedPermission() && (
          <PiTabPanel>
            <EditorContainer
              className={
                quoteDetails.status_code === "approved" ||
                quoteDetails.status_code === "delivered_to_customer" ||
                quoteDetails.status_code === "won" ||
                quoteDetails.status_code === "lost" ||
                quoteDetails.is_revised === true ||
                permissionObject.Edit === false
                  ? ""
                  : ""
              }
              style={{ position: "relative" }}
            >
              <PiEditor
                libraryType="atalskit"
                onChange={onChangeNotestoCustomer}
                value={notesToCustomer}
                onKeyPress={onNotesKeyUp}
                onKeyDown={onNotesKeyDown}
                readOnly={
                  !!(
                    quoteDetails.status_code === "approved" ||
                    quoteDetails.status_code === "delivered_to_customer" ||
                    quoteDetails.status_code === "won" ||
                    quoteDetails.status_code === "lost" ||
                    quoteDetails.status_code === "quote_expired" ||
                    quoteDetails.status_code === "quote_archived" ||
                    quoteDetails.status_code === "won_so_created" ||
                    quoteDetails.is_revised === true ||
                    permissionObject.Edit === false
                  )
                }
              />
              <PiTooltip content="View Notes" libraryType="atalskit">
                <ShowContainer
                  onClick={() => QuotesHandler()}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      QuotesHandler();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <img src={ShowMore} alt="loading" />
                </ShowContainer>
              </PiTooltip>
            </EditorContainer>
          </PiTabPanel>
        )}
        <PiTabPanel>
          <EditorContainer>
            <DynamicNotes />
          </EditorContainer>
        </PiTabPanel>

        {getUserLoggedPermission() && (
          <PiTabPanel>
            <EditorContainer>
              <NotesChat quoteDetails={quoteDetails} />
            </EditorContainer>
          </PiTabPanel>
        )}
      </PiTabGroup>
      {showSavePanel && (
        <PermissionFooter className="notes_container">
          {serverMsg && (
            <small className="server-msg" style={{ marginRight: "auto" }}>
              {serverMsg}
            </small>
          )}
          <PiButton appearance="secondary" label="Cancel" onClick={resetData} />
          <PiButton
            appearance="primary"
            label="Save"
            onClick={saveRepairData}
          />
        </PermissionFooter>
      )}
      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel={toastMsg}
        message=""
        onClose={async () => setSnackbar(false)}
      />
      <Popup>
        <PiModal isOpen={openModel} width={650}>
          <PopupHeaderContentDiv>
            <TechNotesHeader>
              <PopupHeaderDiv className="show">
                <PiTypography component="h4">Notes to Customer</PiTypography>
                <CloseButton
                  onClick={() => closeModel()}
                  title="close"
                  className="Hover"
                >
                  <img src={CrossLogo} alt="loading" />
                </CloseButton>
              </PopupHeaderDiv>
            </TechNotesHeader>
            <hr />
          </PopupHeaderContentDiv>
          <PiModalBody>
            <p className="confirm-content">
              <GenerateHTML
                notesFor="quote_for_parts"
                detailViewNotes={quoteInfo}
                notesToCustomer={notesToCustomer}
                sendData={triggerNotesData}
              />
            </p>
          </PiModalBody>
          {quoteDetails.status_code === "approved" ||
          quoteDetails.status_code === "delivered_to_customer" ||
          quoteDetails.status_code === "won" ||
          quoteDetails.status_code === "lost" ||
          quoteDetails.status_code === "quote_expired" ||
          quoteDetails.status_code === "quote_archived" ||
          quoteDetails.is_revised === true ||
          permissionObject.Edit === false ? (
            <div />
          ) : (
            <PiModalFooter>
              {serverMsg && <small className="server-msg">{serverMsg}</small>}
              {quoteDetails.status_code === "open" && (
                <PiButton
                  appearance="secondary"
                  label="Update"
                  onClick={saveRepairData}
                  className="Primary"
                  isDisabled={opacity || !popupNotes}
                />
              )}
            </PiModalFooter>
          )}
        </PiModal>
      </Popup>
    </RepairInfoSection>
  );
}

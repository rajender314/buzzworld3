/* eslint-disable react/jsx-props-no-spreading */
import {
  PiAttachmentList,
  PiButton,
  PiEditor,
  PiModal,
  PiModalBody,
  PiModalFooter,
  PiSpinner,
  PiTabGroup,
  PiTabHeader,
  PiTabHeaderPanel,
  PiTabPanel,
  PiToast,
  PiTooltip,
  PiTypography,
  PiUploader,
} from "pixel-kit";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import CrossLogo from "@app/assets/images/cross.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import {
  CustomerNotesProps,
  InternalNotesProps,
} from "@app/modules/repair-detail-view/schema/repairs";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import Notes from "@app/assets/images/Exclude.svg";
import Avatar from "@app/assets/images/avator.svg";
import AtachIon from "@app/assets/images/Attach.svg";
import planeIcon from "@app/assets/images/plane.svg";
import Form, { Field } from "@atlaskit/form";
import ThemecolorEdit from "@app/assets/images/themecolorEdit.svg";
import _ from "lodash";
import {
  deleteImage,
  downloadFile,
  getBlobImage,
  getUserLoggedPermission,
} from "@app/helpers/helpers";
import PdfLogo from "@app/assets/images/pdflogo.svg";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import ShowMore from "@app/assets/images/Showmore.svg";
import ViewMore from "@app/assets/images/down_arrow.svg";
import Viewless from "@app/assets/images/up_arrow.svg";
import TextArea from "@atlaskit/textarea";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
  SpinnerDiv,
  UploadNote,
} from "../fileuploadModel/fileuploadModel.component";
import {
  ImgUploadDiv,
  ProfilePicAvatar,
} from "../usersComponents/edit-user-details/edit-user-details.component";
import { H4Heading } from "../Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import { PermissionFooter } from "../userRolePermissions/user-role-permissions.component";
import {
  CloseButton,
  Popup,
} from "../adminaddrowmodel/adminaddrowmodel.component";
import GenerateHTML from "../Quote-components/Quote-detail-view-content/QuoteNotes/generateHTML";
import {
  ItemNotesMessageBoxWrapper,
  SendAndAttchIconWrapper,
  TechNotesHeader,
} from "../RepairItems/item-internal-notes.component";
import {
  AttacmentIconSection,
  CustomerNotesContainer,
  EditAndDelImg,
  EditAndDelWrapper,
  EditorContainer,
  ItemList,
  MessageBoxWrapper,
  MessageSubmitBtn,
  MessageText,
  NotesImgPreviewContainer,
  NotesMessageBoxForm,
  NotesUploadsWrapper,
  NotesUserInfo,
  NotesUserTitle,
  ScrollContainer,
  ShowContainer,
  ViewMoreContainer,
  ViewMoreInternalNotes,
} from "./repair-notes.component";
import { RepairInfoSection } from "../detail-view-content/detail-view-content.component";
import { NoUserFound } from "../usersComponents/userslist/userslist.component";

type Props = {
  repairInfo: any;
  sendEvent: any;
};
export default function RepairNotes({ repairInfo, sendEvent }: Props) {
  const id = window.location.pathname.substring(1).split("/")[1];
  const elementRef: any = useRef(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [notesToCustomer, setNotesToCustomer] = useState(
    repairInfo.customer_info.customer_notes
  );
  const [eneteredText, setEnteredText] = useState("");
  const [openSnackbar, setSnackbar] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [opacity, setOpacity] = useState(false);
  const [serverMsg, setServerMsg]: any = useState(null);
  const [messageSending, setmessageSending] = useState(false);
  const [interNotes, setInternalNotes] = useState<Array<InternalNotesProps>>(
    []
  );
  const [cutomerNotes, setCutomerNotes]: any = useState<any>([]);
  const [popupNotes, setPopupNotes]: any = useState<string>();
  const { current }: any = useRef({ timer: 0 });
  const [showSavePanel, setSavePanel] = useState(false);
  const [uploadList, setUploadList]: any = useState([]);
  const [attachmentsParam, setAttachmentsParam]: any = useState([]);
  const [editUploadsList, setEditUploadList]: any = useState([]);
  const [fileValidationError, setFileValidationError] = useState("");

  const [expandedItems, setExpandedItems] = useState<any>(() =>
    interNotes.map(() => false)
  );
  const toggleExpansion = (index: any) => {
    setExpandedItems((prevExpandedItems: any) => {
      const newExpandedItems = [...prevExpandedItems];
      newExpandedItems[index] = !newExpandedItems[index];

      return newExpandedItems;
    });
  };
  const getCustomerNotesNotes = () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.CustomerNotesDynamics}?repairs_id=${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          setLoading(false);
          const { data } = response.result;
          // cutomerNotes.map((obj: any) => {
          //  var parser = new DOMParser();
          //  var doc = parser.parseFromString(obj.note, 'text/html');
          //  console.log(doc)
          // })
          setCutomerNotes([...data]);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const getInternalNotes = async () => {
    let list = [];
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.InternalNotes}?repairs_id=${id}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          setLoading(false);
          const data = response.result.data.list;
          data.map((obj: InternalNotesProps) => {
            obj.isEditMsg = false;
            // obj[attachmentsList] = obj.attachmentsList
            // setAttachmentsList([...attachmentsList])

            return obj;
          });
          list = data;
          setInternalNotes([...list]);
          setEnteredText("");
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  function tabChange(indx: number) {
    setTabIndex(indx);
    setLoading(true);
    if (indx === 1) {
      getCustomerNotesNotes();
    } else if (indx === 2) {
      getInternalNotes();
    }
  }
  const [permissionObject, setpermissionObject] = useState<any>({});
  const [openModel, setOpenModel] = useState(false);

  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("repair-request");
      setpermissionObject(permission);
    })();
  }, []);
  useEffect(() => {
    // console.log(repairInfo)
    // getInternalNotes()
    if (getUserLoggedPermission() === false) {
      getCustomerNotesNotes();
    }
    setNotesToCustomer(repairInfo.customer_info.customer_notes);
  }, [repairInfo.customer_info]);

  const updateNotestoCustomer = () => {
    setOpacity(true);
    const apiObject = {
      payload: { customer_notes: popupNotes || notesToCustomer },
      method: "PATCH",
      apiUrl: `${EndpointUrl.rmaRequest}/${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          setOpacity(false);
          setNotesToCustomer(popupNotes || notesToCustomer);
          setOpenModel(false);
          setSavePanel(false);
          setServerMsg(null);
          setToastMsg("Updated Successfully");
          setSnackbar(true);
          setPopupNotes("");
          sendEvent({ success: true, section: "repair_notes" });
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
    setNotesToCustomer(repairInfo.customer_info.customer_notes);
    // setRepairDetails({ ...repairInfo })
  };
  const onChangeNotestoCustomer = (e: string) => {
    setNotesToCustomer(e);

    // if (text.length > 255) {
    //  pieditorValidation = true
    //  setPiEditorValidation(true)
    // } else {
    //  pieditorValidation = false
    //  setPiEditorValidation(false)
    // }

    // if (current.timer) clearTimeout(current.timer)
    // current.timer = setTimeout(() => {
    //  if (text !== '' && repairInfo.customer_info.customer_notes !== e) {
    //    setSavePanel(true)
    //  }
    // }, 500)
  };
  const onNotesKeyDown = (e: any) => {
    const text = e.target.innerHTML.replace(/<\/?[^>]+>/gi, "");

    setTimeout(() => {
      if (
        text !== "" &&
        e.target.innerHTML !== repairInfo.customer_info.customer_notes
      ) {
        setSavePanel(true);
      }
    }, 500);
  };
  const onNotesKeyUp = (e: any) => {
    const text = e.target.innerHTML.replace(/<\/?[^>]+>/gi, "");
    if (current.timer) clearTimeout(current.timer);
    current.timer = setTimeout(() => {
      if (text !== "" && text !== repairInfo.customer_info.customer_notes) {
        setSavePanel(true);
      }
    }, 500);
  };
  const [disabeSubmit, setDisableSubmit] = useState(true);

  const sendMessage = (item?: any) => {
    setDisableSubmit(true);
    setmessageSending(true);
    setTimeout(() => {
      const obj = {
        notes: eneteredText || item.notes,
        repairs_id: id,
        type: "repairs",
        attachments: attachmentsParam,
      };
      const apiObject = {
        payload: obj,
        method: item ? "PUT" : "POST",
        apiUrl: item
          ? `${EndpointUrl.InternalNotes}/${item.id}`
          : `${EndpointUrl.InternalNotes}`,
        headers: {},
      };
      triggerApi(apiObject)
        .then(async (response: ApiResponse) => {
          setmessageSending(false);
          if (response.result.success) {
            getInternalNotes();
            setAttachmentsParam([]);
            setUploadList([]);
            setEditUploadList([]);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
    }, 1000);
  };
  const msgTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredText(e.target.value);
    setDisableSubmit(false);
    setFileValidationError("");
  };
  const individualMsgTextChanged = (
    e: ChangeEvent<HTMLInputElement>,
    itemId: string
  ) => {
    const indx = _.findIndex(interNotes, { id: itemId });
    interNotes[indx].notes = e.target.value;
    setInternalNotes([...interNotes]);
    setDisableSubmit(false);
    setFileValidationError("");
  };
  const editMessage = async (item: any) => {
    await getInternalNotes();
    interNotes.map((obj: any) => {
      if (obj.id === item.id) {
        obj.isEditMsg = true;
      } else {
        obj.isEditMsg = false;
      }
      return obj;
    });
    setInternalNotes([...interNotes]);
  };
  // const deleteMsg = (itemId: string) => {
  //  selectedDeleteMsgId = itemId
  //  setSelectedDeleteMsgId(selectedDeleteMsgId)
  //  let obj = {
  //    header: 'Confirmation',
  //    content: `Are you sure you want to add this message ?`,
  //    props: {
  //      label: '',
  //    },
  //  }
  //  setConfirmText(obj)
  //  setConFirm(true)
  // }

  const uploadItemsApi = (files: Array<File>) => {
    const formData = new FormData();
    // for (let i = 0; i < files.length; i++) {
    //  formData.append(`files[${i}]`, files[i])
    // }
    formData.append("files", files[0]);
    formData.append("container", "internal_notes");
    const apiObject = {
      payload: formData,
      method: "POST",
      apiUrl: `${EndpointUrl.userFileUpload}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          attachmentsParam.push(data);
          setAttachmentsParam([...attachmentsParam]);
          setToastMsg("Uploaded Successfully");
          setSnackbar(true);
        } else {
          setServerMsg("Failed to Upload");
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  function onDrop(files: Array<File>) {
    console.log(files);
    if (files.length) {
      if (
        files[0].type === "image/png" ||
        files[0].type === "image/jpg" ||
        files[0].type === "image/jpeg" ||
        files[0].type === "application/pdf"
      ) {
        setFileValidationError("");
        uploadList.push(files[0]);
        uploadList.map((obj: any) => {
          if (obj.type === "application/pdf") {
            obj.thumbnail = PdfLogo;
          } else {
            obj.thumbnail = getBlobImage(obj);
          }
          return obj;
        });
        setUploadList([...uploadList]);
        console.log(uploadList);
        uploadItemsApi(files);
      }
    } else {
      setFileValidationError("Please upload valid file");
    }
  }
  const removeImg = (indx: number) => {
    uploadList.splice(indx, 1);
    setUploadList([...uploadList]);
    attachmentsParam.splice(indx, 1);
    setAttachmentsParam([...attachmentsParam]);
  };
  const deleteImgFile = async (e: any) => {
    const data = await deleteImage(e);
    if (data === true) {
      getInternalNotes();
      setSnackbar(true);
      setToastMsg("Deleted Successfully");
    }
  };

  const closeModel = () => {
    setOpenModel(false);
    setPopupNotes("");
  };
  const triggerNotesData = (e: any) => {
    setPopupNotes(e);
  };
  return (
    <RepairInfoSection id="repair-notes-id">
      <div className="rep-label-typo">
        <PiTypography component="h4">Repair Notes</PiTypography>
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
            <PiTabHeader>Internal Notes</PiTabHeader>
          )}
        </PiTabHeaderPanel>
        {getUserLoggedPermission() && (
          <PiTabPanel>
            <EditorContainer style={{ position: "relative" }}>
              <PiEditor
                libraryType="atalskit"
                onChange={onChangeNotestoCustomer}
                value={notesToCustomer}
                onKeyPress={onNotesKeyUp}
                onKeyDown={onNotesKeyDown}
                readOnly={!permissionObject.Edit}
              />
              {notesToCustomer && (
                <PiTooltip content="View Notes" libraryType="atalskit">
                  <ShowContainer
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        setOpenModel(true);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    onClick={() => setOpenModel(true)}
                  >
                    <img src={ShowMore} alt="loading" title="View Notes" />
                  </ShowContainer>
                </PiTooltip>
              )}
            </EditorContainer>
          </PiTabPanel>
        )}

        <PiTabPanel>
          <EditorContainer>
            <CustomerNotesContainer className="error">
              {!loading &&
                cutomerNotes.map((obj: CustomerNotesProps) => (
                  <ItemList>
                    <img
                      className="notes-user-img"
                      src={obj.image_url ? obj.image_url : Avatar}
                      alt="loading"
                    />
                    <NotesUserInfo>
                      <h6>{obj.full_name}</h6>
                      <MessageText className="message-subject">
                        {obj.subject}
                      </MessageText>
                      <MessageText
                        className="whitespace-preinline"
                        dangerouslySetInnerHTML={{ __html: obj.note }}
                      />
                    </NotesUserInfo>
                    <MessageText className="time-stamp">
                      {obj.last_modified_date}
                    </MessageText>
                  </ItemList>
                ))}
              {!loading && cutomerNotes.length === 0 && (
                <NoUserFound className="error">
                  <img
                    src={Notes}
                    alt=""
                    style={{ display: "block", width: "24px" }}
                  />
                  <div> Notes Not found from Dynamics </div>
                </NoUserFound>
              )}
              {loading && (
                <SpinnerDiv style={{ height: "100%" }}>
                  <PiSpinner color="primary" size={50} libraryType="atalskit" />
                </SpinnerDiv>
              )}
            </CustomerNotesContainer>
          </EditorContainer>
        </PiTabPanel>

        {getUserLoggedPermission() && (
          <PiTabPanel>
            <EditorContainer>
              <ScrollContainer
                style={{ position: "relative" }}
                className={messageSending ? "opacity-on-load" : ""}
              >
                {messageSending && (
                  <SpinnerDiv style={{ position: "absolute", left: "50%" }}>
                    <PiSpinner
                      color="primary"
                      size={50}
                      libraryType="atalskit"
                    />
                  </SpinnerDiv>
                )}
                <CustomerNotesContainer
                  className="error"
                  style={
                    interNotes.length > 0
                      ? { justifyContent: "flex-start" }
                      : { justifyContent: "center" }
                  }
                >
                  {!loading &&
                    interNotes.length > 0 &&
                    interNotes.map((obj: InternalNotesProps, i: number) => (
                      <ItemList>
                        <img
                          className="notes-user-img"
                          src={obj.image_url ? obj.image_url : Avatar}
                          alt="loading"
                        />
                        <NotesUserInfo>
                          <NotesUserTitle>
                            <h6>{obj.created_by}</h6>
                            <EditAndDelWrapper className="edit-control">
                              {obj.is_edit_enable && (
                                <EditAndDelImg
                                  title="Edit"
                                  onClick={() => editMessage(obj)}
                                  src={ThemecolorEdit}
                                  alt="loading"
                                />
                              )}
                            </EditAndDelWrapper>
                          </NotesUserTitle>
                          {!obj.isEditMsg && (
                            <MessageText
                              className={
                                expandedItems[i]
                                  ? "view_more"
                                  : "whitespace-preinline"
                              }
                              dangerouslySetInnerHTML={{ __html: obj.notes }}
                            />
                          )}
                          {obj.isEditMsg && (
                            <Form onSubmit={() => sendMessage(obj)}>
                              {({ formProps }) => (
                                <NotesMessageBoxForm
                                  className={
                                    permissionObject.Edit === true
                                      ? "text-form"
                                      : "no-edit-permission"
                                  }
                                  {...formProps}
                                >
                                  <Field name="notes" defaultValue="">
                                    {({ fieldProps }: any) => (
                                      <>
                                        {editUploadsList.length > 0 && (
                                          <H4Heading>Preview</H4Heading>
                                        )}
                                        <NotesUploadsWrapper>
                                          {editUploadsList.map(
                                            (obj2: any, index: number) => (
                                              <ImgUploadDiv
                                                onClick={() => removeImg(index)}
                                                onKeyDown={(event) => {
                                                  if (
                                                    event.key === "Enter" ||
                                                    event.key === " "
                                                  ) {
                                                    removeImg(index);
                                                  }
                                                }}
                                                role="button"
                                                tabIndex={0}
                                              >
                                                <img
                                                  className="notes-cross-img"
                                                  alt="loading"
                                                  src={CrossLogo}
                                                />
                                                <ProfilePicAvatar
                                                  src={obj2.thumbnail}
                                                  alt="loading"
                                                />
                                              </ImgUploadDiv>
                                            )
                                          )}
                                        </NotesUploadsWrapper>

                                        <MessageBoxWrapper>
                                          <ItemNotesMessageBoxWrapper className="notes-chat-container">
                                            <TextArea
                                              {...fieldProps}
                                              placeholder="Type here"
                                              className="individual-noteTextField"
                                              value={obj.notes}
                                              onChange={(e: any) =>
                                                individualMsgTextChanged(
                                                  e,
                                                  obj.id
                                                )
                                              }
                                            />
                                            <SendAndAttchIconWrapper>
                                              <AttacmentIconSection>
                                                <PiUploader
                                                  dropzoneProps={{
                                                    accept: [
                                                      "image/png",
                                                      "image/jpg",
                                                      "image/jpeg",
                                                      "application/pdf",
                                                    ],
                                                    disabled: false,
                                                    maxSize: 10485760,
                                                    multiple: false,
                                                    noDrag: false,
                                                    text: (
                                                      <img
                                                        className="attch-icon"
                                                        src={AtachIon}
                                                        alt="loading"
                                                      />
                                                    ),
                                                  }}
                                                  onUpload={(e: Array<File>) =>
                                                    onDrop(e)
                                                  }
                                                />
                                              </AttacmentIconSection>
                                              <MessageSubmitBtn
                                                disabled={disabeSubmit}
                                                onSubmit={() =>
                                                  sendMessage(obj)
                                                }
                                                className={
                                                  disabeSubmit
                                                    ? "disable-btns"
                                                    : ""
                                                }
                                              >
                                                <img
                                                  src={planeIcon}
                                                  alt="loading"
                                                />
                                              </MessageSubmitBtn>
                                            </SendAndAttchIconWrapper>
                                          </ItemNotesMessageBoxWrapper>
                                        </MessageBoxWrapper>
                                      </>
                                    )}
                                  </Field>
                                </NotesMessageBoxForm>
                              )}
                            </Form>
                          )}
                          {obj.attachments.length > 0 && (
                            <PiAttachmentList
                              attachmentItems={obj.attachments}
                              onClickDelete={deleteImgFile}
                              onClickDownload={downloadFile}
                              onClickPreview={() => {}}
                            />
                          )}
                        </NotesUserInfo>

                        <MessageText className="time-stamp">
                          {obj.created_date}
                        </MessageText>
                        {obj.is_edited && (
                          <MessageText title={obj.last_modified_date}>
                            Edited
                          </MessageText>
                        )}
                        <ViewMoreContainer id="741">
                          <PiTooltip
                            content={
                              expandedItems[i] ? "Read Less" : "Read More"
                            }
                            libraryType="atalskit"
                          >
                            <ViewMoreInternalNotes>
                              <span
                                onClick={() => toggleExpansion(i)}
                                ref={elementRef}
                                onKeyDown={(event) => {
                                  if (
                                    event.key === "Enter" ||
                                    event.key === " "
                                  ) {
                                    // removeImg('0');
                                  }
                                }}
                                role="button"
                                tabIndex={0}
                              >
                                <img
                                  src={expandedItems[i] ? Viewless : ViewMore}
                                  alt="loading"
                                />
                              </span>
                            </ViewMoreInternalNotes>
                          </PiTooltip>
                        </ViewMoreContainer>
                      </ItemList>
                    ))}
                  {!loading && interNotes.length === 0 && (
                    <NoUserFound>
                      <div>
                        <img
                          src={Notes}
                          alt=""
                          style={{ display: "block", width: "24px" }}
                        />
                      </div>
                      <div> Notes Not Available</div>
                    </NoUserFound>
                  )}
                  {loading && (
                    <SpinnerDiv style={{ height: "100%" }}>
                      <PiSpinner
                        color="primary"
                        size={50}
                        libraryType="atalskit"
                      />
                    </SpinnerDiv>
                  )}
                </CustomerNotesContainer>
                {uploadList.length > 0 && <H4Heading>Preview</H4Heading>}
                <NotesUploadsWrapper>
                  {uploadList.map((obj: any, index: number) => (
                    <NotesImgPreviewContainer>
                      <ImgUploadDiv
                        onClick={() => removeImg(index)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            removeImg(index);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <img
                          className="notes-cross-img"
                          alt="loading"
                          src={CrossLogo}
                        />
                        <ProfilePicAvatar src={obj.thumbnail} alt="loading" />
                      </ImgUploadDiv>
                    </NotesImgPreviewContainer>
                  ))}
                </NotesUploadsWrapper>
              </ScrollContainer>
              <Form onSubmit={() => sendMessage()}>
                {({ formProps }) => (
                  <NotesMessageBoxForm
                    className={
                      permissionObject.Edit === true
                        ? "text-form"
                        : "no-edit-permission"
                    }
                    {...formProps}
                  >
                    <Field name="notes" defaultValue="">
                      {({ fieldProps }: any) => (
                        <ItemNotesMessageBoxWrapper className="notes-chat-container">
                          <TextArea
                            {...fieldProps}
                            placeholder="Type here"
                            className="noteTextField"
                            value={eneteredText}
                            onChange={msgTextChanged}
                          />
                          <SendAndAttchIconWrapper>
                            <AttacmentIconSection>
                              <PiUploader
                                dropzoneProps={{
                                  accept: [
                                    "image/png",
                                    "image/jpg",
                                    "image/jpeg",
                                    "application/pdf",
                                  ],
                                  disabled: false,
                                  maxSize: 10485760,
                                  multiple: false,
                                  noDrag: false,
                                  text: (
                                    <img
                                      className="attch-icon"
                                      src={AtachIon}
                                      alt="loading"
                                    />
                                  ),
                                }}
                                onUpload={(e: Array<File>) => onDrop(e)}
                              />
                            </AttacmentIconSection>
                            <MessageSubmitBtn
                              disabled={!eneteredText || disabeSubmit}
                              onSubmit={() => sendMessage()}
                              className={disabeSubmit ? "disable-btns" : ""}
                            >
                              <img src={planeIcon} alt="loading" />
                            </MessageSubmitBtn>
                          </SendAndAttchIconWrapper>
                        </ItemNotesMessageBoxWrapper>
                      )}
                    </Field>
                    {fileValidationError !== "" && (
                      <UploadNote className="for-file-error-msg">
                        {fileValidationError}
                      </UploadNote>
                    )}

                    <UploadNote className="for-add-repair">
                      The maximum file upload size is 10 MB.
                    </UploadNote>
                    <UploadNote className="for-add-repair">
                      .jpg, .png, .jpeg, .pdf file types are supported.
                    </UploadNote>
                  </NotesMessageBoxForm>
                )}
              </Form>
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
            isDisabled={opacity}
          />
        </PermissionFooter>
      )}
      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel={toastMsg}
        message=""
        onClose={async () => setSnackbar(false)}
      />
      {/* {openModel && (
        <TechNotesView
          title={'Notes to Customer'}
          detailViewNotes={repairInfo.customer_info}
          notesFor='repair-request'
          technote={notesToCustomer}
          sendData={() => setOpenModel(false)}
        />
      )} */}

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
                notesFor="repair-request"
                detailViewNotes={repairInfo.customer_info}
                notesToCustomer={notesToCustomer}
                sendData={triggerNotesData}
              />
            </p>
          </PiModalBody>
          {permissionObject.Edit === false ? (
            <div />
          ) : (
            <PiModalFooter>
              {serverMsg && <small className="server-msg">{serverMsg}</small>}
              <PiButton
                appearance="secondary"
                label="Update"
                onClick={saveRepairData}
                className="Primary"
                isDisabled={opacity || !popupNotes}
              />
            </PiModalFooter>
          )}
        </PiModal>
      </Popup>
    </RepairInfoSection>
  );
}

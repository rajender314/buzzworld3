/* eslint-disable react/jsx-props-no-spreading */
import {
  PiSideDrawer,
  PiTypography,
  PiSpinner,
  PiAttachmentList,
  PiUploader,
  PiToast,
} from "pixel-kit";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import CrossLogo from "@app/assets/images/cross.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import Form, { Field } from "@atlaskit/form";
import { deleteImage, downloadFile, getBlobImage } from "@app/helpers/helpers";
import { InternalNotesProps } from "@app/modules/repair-detail-view/schema/repairs";
import Avatar from "@app/assets/images/avator.svg";
import ThemecolorEdit from "@app/assets/images/themecolorEdit.svg";
import TextArea from "@atlaskit/textarea";
import AtachIon from "@app/assets/images/Attach.svg";
import planeIcon from "@app/assets/images/plane.svg";
import Notes from "@app/assets/images/Exclude.svg";
import _ from "lodash";
import { ApiResponse } from "@app/services/schema/schema";
import PdfLogo from "@app/assets/images/pdflogo.svg";
import NotesLog from "@app/assets/images/notes-log.svg";
import {
  ItemNotesMessageBoxWrapper,
  NotesCreatedByWrapper,
  NotesCreatedDateWrapper,
  NotesEditorContainer,
  SendAndAttchIconWrapper,
  UserLabelContainer,
} from "./item-internal-notes.component";
import { NoUserFound } from "../usersComponents/userslist/userslist.component";
import {
  ImgUploadDiv,
  ProfilePicAvatar,
} from "../usersComponents/edit-user-details/edit-user-details.component";
import {
  CustomerNotesContainer,
  ItemList,
  NotesUserInfo,
  NotesUserTitle,
  EditAndDelWrapper,
  EditAndDelImg,
  MessageText,
  NotesMessageBoxForm,
  NotesUploadsWrapper,
  AttacmentIconSection,
  MessageSubmitBtn,
  NotesImgPreviewContainer,
} from "../RepairNotes/repair-notes.component";
import { H4Heading } from "../Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "../Repair-Components/selectItems/selectItemsModel/selectItem.component";
import { QuotePopupHeaderContainer } from "../Quote-components/Forms/PartQuote/part-quote.component";
import {
  SpinnerDiv,
  UploadNote,
} from "../fileuploadModel/fileuploadModel.component";
import { CloseButton } from "../adminaddrowmodel/adminaddrowmodel.component";
import { SideDrawerW40 } from "../rmaModel/RmaModel.component";

export default function ItemInternalNotes({
  repairItemId,
  repairInfo,
  sendEventData,
}: any) {
  const [openModel, setOpenModel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [interNotes, setInternalNotes] = useState<Array<any>>([]);
  const [editUploadsList, setEditUploadList]: any = useState([]);
  const [eneteredText, setEnteredText] = useState("");
  const [uploadList, setUploadList]: any = useState([]);
  const [openSnackbar, setSnackbar] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const chatlist: any = useRef<any>("");
  const [attachmentsParam, setAttachmentsParam]: any = useState([]);
  const [fileValidationError, setFileValidationError] = useState("");

  const viewInternalNotes = useCallback(async () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.ItemInternalNotes}?repair_item_id=${repairItemId}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then(async (response: any) => {
        if (response.result.success) {
          const data = response.result.data.list;
          data.map((obj: InternalNotesProps) => {
            obj.isEditMsg = false;
            return obj;
          });
          chatlist.current = data;
          setInternalNotes([...chatlist.current]);
          setLoading(false);

          setEnteredText("");
        } else {
          setLoading(false);
        }
        return chatlist.current;
      })
      .catch((err: string) => {
        console.log(err);
      });
    return chatlist.current;
  }, [repairItemId]);
  useEffect(() => {
    setOpenModel(true);
    viewInternalNotes();
  }, [viewInternalNotes]);

  function closeModel() {
    setOpenModel(false);
    sendEventData({ close: true });
  }

  const [disabeSubmit, setDisableSubmit] = useState(true);
  const sendMessage = (item?: any) => {
    setDisableSubmit(true);
    // setLoading(true)
    setTimeout(() => {
      const obj = {
        notes: eneteredText || item.notes,
        type: "repairs",
        repair_item_id: repairItemId,
        attachments: attachmentsParam,
      };
      const apiObject = {
        payload: obj,
        method: item ? "PUT" : "POST",
        apiUrl: item
          ? `${EndpointUrl.ItemInternalNotes}/${item.id}`
          : `${EndpointUrl.ItemInternalNotes}`,
        headers: {},
      };
      triggerApi(apiObject)
        .then(async (response: ApiResponse) => {
          if (response.result.success) {
            viewInternalNotes();
            setAttachmentsParam([]);
            setUploadList([]);
            setEditUploadList([]);
          }
          setLoading(false);
        })
        .catch((err: string) => {
          console.log(err);
        });
    }, 1000);
  };
  const removeImg = (indx: number) => {
    uploadList.splice(indx, 1);
    setUploadList([...uploadList]);
    attachmentsParam.splice(indx, 1);
    setAttachmentsParam([...attachmentsParam]);
  };

  const removeEditUploadImg = (indx: number) => {
    editUploadsList.splice(indx, 1);
    setEditUploadList([...editUploadsList]);
    attachmentsParam.splice(indx, 1);
    setAttachmentsParam([...attachmentsParam]);
  };
  const individualMsgTextChanged = (
    e: ChangeEvent<HTMLInputElement>,
    itemId: string
  ) => {
    const indx = _.findIndex(interNotes, { id: itemId });
    interNotes[indx].notes = e.target.value;
    setInternalNotes([...interNotes]);
    if (e.target.value) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
    setFileValidationError("");
  };

  const editMessage = async (item: any) => {
    setEditUploadList([]);
    setDisableSubmit(false);
    const data = await viewInternalNotes();
    const updatedNotes = data.map((obj: any) => {
      if (obj.id === item.id) {
        obj.isEditMsg = true;
      } else {
        obj.isEditMsg = false;
      }
      return obj;
    });
    setInternalNotes([...updatedNotes]);
  };
  const uploadItemsApi = (files: Array<File>) => {
    const formData = new FormData();
    // for (let i = 0; i < files.length; i++) {
    //  formData.append(`files[${i}]`, files[i])
    // }
    formData.append("files", files[0]);
    formData.append("container", "item_internal_notes");
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
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  function onEditDrop(files: Array<File>) {
    console.log(files);
    if (files.length) {
      if (
        files[0].type === "image/png" ||
        files[0].type === "image/jpg" ||
        files[0].type === "image/jpeg" ||
        files[0].type === "application/pdf"
      ) {
        setFileValidationError("");
        editUploadsList.push(files[0]);
        editUploadsList.map((obj: any) => {
          if (obj.type === "application/pdf") {
            obj.thumbnail = PdfLogo;
          } else {
            obj.thumbnail = getBlobImage(obj);
          }
          return obj;
        });
        setEditUploadList([...editUploadsList]);
        uploadItemsApi(files);
      }
    } else {
      setFileValidationError("Please upload valid file");
    }
  }
  const deleteImgFile = async (e: any) => {
    const data = await deleteImage(e);
    if (data === true) {
      setToastMsg("Deleted Successfully");
      setSnackbar(true);
      viewInternalNotes();
    }
  };
  const msgTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredText(e.target.value);
    if (e.target.value) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
    setFileValidationError("");
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

  return (
    <SideDrawerW40>
      <PiSideDrawer isOpen={openModel} width="narrow">
        <SideDrawerContainer>
          <SideDrawerHeader>
            <QuotePopupHeaderContainer>
              <img src={NotesLog} alt="loading" />
              <PiTypography component="h3">Item Internal Notes</PiTypography>
            </QuotePopupHeaderContainer>
            <CloseButton
              onClick={() => closeModel()}
              title="close"
              className="Hover"
            >
              <img src={CrossLogo} alt="loading" />
            </CloseButton>
          </SideDrawerHeader>
          {/* {loading && (
              <SpinnerDiv style={{ height: '100%' }}>
                <PiSpinner color="primary" size={50} libraryType="atalskit" />
              </SpinnerDiv>
            )} */}
          <NotesEditorContainer>
            <CustomerNotesContainer
              className="flex-1"
              style={{ maxHeight: "unset" }}
            >
              {!loading &&
                interNotes.length > 0 &&
                interNotes.map((obj: InternalNotesProps) => (
                  <ItemList>
                    <img
                      className="notes-user-img"
                      src={obj.image_url ? obj.image_url : Avatar}
                      alt="loading"
                    />
                    <NotesUserInfo>
                      <UserLabelContainer>
                        <NotesCreatedByWrapper>
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
                              className="item-internal-notes"
                              dangerouslySetInnerHTML={{
                                __html: obj.notes,
                              }}
                            />
                          )}
                        </NotesCreatedByWrapper>

                        <NotesCreatedDateWrapper>
                          <MessageText className="time-stamp">
                            {obj.created_date}
                          </MessageText>
                          {obj.is_edited && (
                            <MessageText title={obj.last_modified_date}>
                              Edited
                            </MessageText>
                          )}
                        </NotesCreatedDateWrapper>
                      </UserLabelContainer>
                      {obj.isEditMsg && (
                        <div>
                          <Form onSubmit={() => sendMessage(obj)}>
                            {({ formProps }) => (
                              <NotesMessageBoxForm
                                // className={
                                //  permissionObject['Edit'] === true
                                //    ? 'text-form'
                                //    : 'no-edit-permission'
                                // }
                                className={
                                  repairInfo.status_code === "approved" ||
                                  repairInfo.status_code ===
                                    "delivered_to_customer" ||
                                  repairInfo.status_code === "won" ||
                                  repairInfo.status_code === "lost" ||
                                  repairInfo.status_code === "quote_expired" ||
                                  repairInfo.status_code === "quote_archived" ||
                                  repairInfo.is_revised === true
                                    ? "no-edit-permission"
                                    : "text-form"
                                }
                                {...formProps}
                              >
                                <Field name="notes" defaultValue="">
                                  {({ fieldProps }: any) => (
                                    <>
                                      {editUploadsList.length > 0 && (
                                        <H4Heading>Preview</H4Heading>
                                      )}
                                      <NotesUploadsWrapper
                                        style={{ flexWrap: "wrap" }}
                                      >
                                        {editUploadsList.map(
                                          (obj2: any, index: number) => (
                                            <ImgUploadDiv
                                              onClick={() =>
                                                removeEditUploadImg(index)
                                              }
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

                                      <ItemNotesMessageBoxWrapper>
                                        <TextArea
                                          {...fieldProps}
                                          placeholder="Type here"
                                          className="individual-noteTextField"
                                          value={obj.notes}
                                          onChange={(e: any) =>
                                            individualMsgTextChanged(e, obj.id)
                                          }
                                          elemAfterInput={
                                            <>
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
                                                    onEditDrop(e)
                                                  }
                                                />
                                              </AttacmentIconSection>
                                              <MessageSubmitBtn
                                                disabled={disabeSubmit}
                                                className={
                                                  disabeSubmit
                                                    ? "disable-btns individual-send-btn"
                                                    : "individual-send-btn"
                                                }
                                                onSubmit={() =>
                                                  sendMessage(obj)
                                                }
                                              >
                                                <img
                                                  src={planeIcon}
                                                  alt="loading"
                                                />
                                              </MessageSubmitBtn>
                                            </>
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
                                                onEditDrop(e)
                                              }
                                            />
                                          </AttacmentIconSection>
                                          <MessageSubmitBtn
                                            disabled={disabeSubmit}
                                            className={
                                              disabeSubmit
                                                ? "disable-btns individual-send-btn"
                                                : "individual-send-btn"
                                            }
                                            onSubmit={() => sendMessage(obj)}
                                          >
                                            <img
                                              src={planeIcon}
                                              alt="loading"
                                            />
                                          </MessageSubmitBtn>
                                        </SendAndAttchIconWrapper>
                                      </ItemNotesMessageBoxWrapper>
                                    </>
                                  )}
                                </Field>
                              </NotesMessageBoxForm>
                            )}
                          </Form>
                        </div>
                      )}
                      {obj.attachments.length > 0 && (
                        <div style={{ marginTop: "10px" }}>
                          <PiAttachmentList
                            attachmentItems={obj.attachments}
                            onClickDelete={(e: any) => deleteImgFile(e)}
                            onClickDownload={(e: any) => downloadFile(e)}
                            onClickPreview={() => {}}
                          />
                        </div>
                      )}
                    </NotesUserInfo>
                  </ItemList>
                ))}
              {!loading && interNotes.length === 0 && (
                <NoUserFound>
                  <img
                    src={Notes}
                    alt=""
                    style={{ display: "block", width: "24px" }}
                  />
                  <div> Notes Not Available </div>
                </NoUserFound>
              )}
              {loading && (
                <SpinnerDiv style={{ height: "100%" }}>
                  <PiSpinner color="primary" size={50} libraryType="atalskit" />
                </SpinnerDiv>
              )}
            </CustomerNotesContainer>
            {uploadList.length > 0 && (
              <>
                <H4Heading>Preview</H4Heading>
                <NotesUploadsWrapper style={{ flexWrap: "wrap" }}>
                  {uploadList.map((obj: any, index: number) => (
                    <NotesImgPreviewContainer>
                      <ImgUploadDiv onClick={() => removeImg(index)}>
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
              </>
            )}
            <div>
              <Form onSubmit={() => sendMessage()}>
                {({ formProps }) => (
                  <NotesMessageBoxForm
                    className={
                      repairInfo.status_code === "approved" ||
                      repairInfo.status_code === "delivered_to_customer" ||
                      repairInfo.status_code === "won" ||
                      repairInfo.status_code === "lost" ||
                      repairInfo.status_code === "quote_expired" ||
                      repairInfo.status_code === "quote_archived" ||
                      repairInfo.is_revised === true
                        ? "no-edit-permission"
                        : "text-form"
                    }
                    {...formProps}
                  >
                    <Field name="notes" defaultValue="">
                      {({ fieldProps }: any) => (
                        <ItemNotesMessageBoxWrapper>
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
                              className={
                                !eneteredText || disabeSubmit
                                  ? "disable-btns"
                                  : ""
                              }
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
            </div>
          </NotesEditorContainer>
        </SideDrawerContainer>
        <PiToast
          className={openSnackbar ? "show" : ""}
          headerLabel={toastMsg}
          message=""
          onClose={async () => setSnackbar(false)}
        />
      </PiSideDrawer>
    </SideDrawerW40>
  );
}

/* eslint-disable react/jsx-props-no-spreading */
import Form, { Field } from "@atlaskit/form";
import { PiUploader, PiAttachmentList, PiSpinner, PiTooltip } from "pixel-kit";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  SpinnerDiv,
  UploadNote,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import { H4Heading } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
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
  MessageBoxWrapper,
  AttacmentIconSection,
  MessageSubmitBtn,
  NotesImgPreviewContainer,
  ScrollContainer,
  ViewMoreContainer,
  ViewMoreInternalNotes,
} from "@app/components/RepairNotes/repair-notes.component";
import {
  ImgUploadDiv,
  ProfilePicAvatar,
} from "@app/components/usersComponents/edit-user-details/edit-user-details.component";
import { NoUserFound } from "@app/components/usersComponents/userslist/userslist.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { deleteImage, downloadFile, getBlobImage } from "@app/helpers/helpers";
import {
  InternalNotesProps,
  RouteParams,
} from "@app/modules/repair-detail-view/schema/repairs";
import Notes from "@app/assets/images/Exclude.svg";
import ShowMore from "@app/assets/images/down_arrow.svg";
import Showless from "@app/assets/images/up_arrow.svg";

import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import Avatar from "@app/assets/images/avator.svg";
import AtachIon from "@app/assets/images/Attach.svg";
import planeIcon from "@app/assets/images/plane.svg";
import PdfLogo from "@app/assets/images/pdflogo.svg";
import ThemecolorEdit from "@app/assets/images/themecolorEdit.svg";
import CrossLogo from "@app/assets/images/cross.svg";
import _ from "lodash";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import TextArea from "@atlaskit/textarea";
import {
  ItemNotesMessageBoxWrapper,
  SendAndAttchIconWrapper,
} from "@app/components/RepairItems/item-internal-notes.component";

export default function NotesChat({ quoteDetails }: any) {
  const elementRef: any = useRef(null);
  const [permissionObject, setpermissionObject] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { id }: RouteParams = useParams();
  const [eneteredText, setEnteredText] = useState("");
  const [interNotes, setInternalNotes] = useState<Array<InternalNotesProps>>(
    []
  );
  const [disabeSubmit, setDisableSubmit] = useState(true);
  const [uploadList, setUploadList]: any = useState([]);
  const [attachmentsParam, setAttachmentsParam]: any = useState([]);
  const [editUploadsList, setEditUploadList]: any = useState([]);
  const [fileValidationError, setFileValidationError] = useState("");
  const [messageSending, setmessageSending] = useState(false);
  const [expandedItems, setExpandedItems] = useState(() =>
    interNotes.map(() => false)
  );
  const toggleExpansion = (index: any) => {
    setExpandedItems((prevExpandedItems) => {
      const newExpandedItems = [...prevExpandedItems];
      newExpandedItems[index] = !newExpandedItems[index];

      return newExpandedItems;
    });
  };
  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("quote_for_parts");
      setpermissionObject(permission);
    })();
  }, []);

  const getInternalNotes = useCallback(async () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteInternalNotes}?quote_id=${id}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          setLoading(false);
          const data = response.result.data.list;
          // interNotes = data;
          data.map((obj: InternalNotesProps) => {
            obj.isEditMsg = false;
            // obj[attachmentsList] = obj.attachmentsList
            // setAttachmentsList([...attachmentsList])

            return obj;
          });
          setInternalNotes([...data]);
          setEnteredText("");
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }, [id]);
  useEffect(() => {
    getInternalNotes();
  }, [getInternalNotes]);

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
    }
  };
  const msgTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredText(e.target.value);
    console.log(e);
    if (e.target.value) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
    setFileValidationError("");
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
    await getInternalNotes();
    setDisableSubmit(false);
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
  const sendMessage = (item?: any) => {
    setDisableSubmit(true);
    setmessageSending(true);
    setTimeout(() => {
      const obj = {
        notes: eneteredText || item.notes,
        quote_id: id,
        type: "repairs",
        attachments: attachmentsParam,
      };
      const apiObject = {
        payload: obj,
        method: item ? "PUT" : "POST",
        apiUrl: item
          ? `${EndpointUrl.QuoteInternalNotes}/${item.id}`
          : `${EndpointUrl.QuoteInternalNotes}`,
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

  return (
    <>
      <ScrollContainer
        style={{ position: "relative" }}
        className={messageSending ? "opacity-on-load" : ""}
      >
        {messageSending && (
          <SpinnerDiv style={{ position: "absolute", left: "50%" }}>
            <PiSpinner color="primary" size={50} libraryType="atalskit" />
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
                        expandedItems[i] ? "view_more" : "whitespace-preinline"
                      }
                      dangerouslySetInnerHTML={{ __html: obj.notes }}
                    />
                  )}
                  {obj.isEditMsg && (
                    <Form onSubmit={() => sendMessage(obj)}>
                      {({ formProps }) => (
                        <NotesMessageBoxForm {...formProps}>
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
                                        individualMsgTextChanged(e, obj.id)
                                      }
                                      // maxLength={255}
                                      isDisabled={!obj.isEditMsg}
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
                                        onSubmit={() => sendMessage(obj)}
                                        className={
                                          disabeSubmit
                                            ? "disable-btns individual-send-btn"
                                            : ""
                                        }
                                      >
                                        <img src={planeIcon} alt="loading" />
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
                <ViewMoreContainer>
                  <PiTooltip
                    content={expandedItems[i] ? "Read Less" : "Read More"}
                    libraryType="atalskit"
                  >
                    <ViewMoreInternalNotes>
                      <span
                        onClick={() => toggleExpansion(i)}
                        ref={elementRef}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            // removeImg('0');
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <img
                          src={expandedItems[i] ? Showless : ShowMore}
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
      </ScrollContainer>
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
              <img className="notes-cross-img" alt="loading" src={CrossLogo} />
              <ProfilePicAvatar src={obj.thumbnail} alt="loading" />
            </ImgUploadDiv>
          </NotesImgPreviewContainer>
        ))}
      </NotesUploadsWrapper>
      <Form onSubmit={() => sendMessage()}>
        {({ formProps }) => (
          <NotesMessageBoxForm
            className={
              quoteDetails.status_code === "quote_expired" ||
              quoteDetails.status_code === "quote_archived" ||
              permissionObject.Edit === false ||
              quoteDetails.is_revised === true
                ? "no-edit-permission"
                : "text-form"
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
                      className={
                        !eneteredText || disabeSubmit ? "disable-btns" : ""
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
    </>
  );
}

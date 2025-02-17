import TextArea from "@atlaskit/textarea";
import { PiAttachmentList, PiTooltip, PiUploader } from "pixel-kit";
import AtachIon from "@app/assets/images/Attach.svg";
import { useEffect, useRef, useState } from "react";
import { getBlobImage } from "@app/helpers/helpers";
import PdfLogo from "@app/assets/images/pdflogo.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import CrossLogo from "@app/assets/images/cross.svg";
import Form, { Field } from "@atlaskit/form";
import _ from "lodash";
import { H4Heading } from "../Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import {
  ImgUploadDiv,
  ProfilePicAvatar,
} from "../usersComponents/edit-user-details/edit-user-details.component";
import { AsyncLabel } from "../rmaModel/RmaModel.component";
import {
  ItemNotesMessageBoxWrapper,
  SendAndAttchIconWrapper,
} from "./item-internal-notes.component";
import {
  NotesMessageBoxForm,
  AttacmentIconSection,
  NotesImgPreviewContainer,
  NotesUploadsWrapper,
} from "../RepairNotes/repair-notes.component";
import { UploadNote } from "../fileuploadModel/fileuploadModel.component";

export default function InternalItemTextBox({
  internalItemNotes,
  sendEventData,
}: any) {
  const [eneteredText, setEnteredText] = useState("");
  const [fileValidationError, setFileValidationError] = useState("");
  const [uploadList, setUploadList]: any = useState([]);
  const [attachmentsParam, setAttachmentsParam]: any = useState([]);
  const [attachmentsParam2, setAttachmentsParam2]: any = useState([]);
  const deepCopy: any = useRef<any>("");
  const msgTextChanged = (e: any) => {
    setEnteredText(e.target.value);
    setFileValidationError("");
    const obj = {
      attachments: attachmentsParam,
      notes: e.target.value,
    };
    sendEventData(obj);
  };

  useEffect(() => {
    setAttachmentsParam2(
      internalItemNotes ? internalItemNotes.attachments : []
    );
    deepCopy.current = _.cloneDeep(
      internalItemNotes ? internalItemNotes.attachments : []
    );
    setEnteredText(internalItemNotes ? internalItemNotes.notes : "");
  }, [internalItemNotes]);
  const uploadItemsApi = (files: Array<File>) => {
    const formData: any = new FormData();
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
          const data2 = [];
          data2.push(data);
          deepCopy.current.push(data);
          //  setAttachmentsParam([...attachmentsParam])
          const obj = {
            attachments: data2,
            notes: eneteredText,
          };
          await sendEventData(obj);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  function onDrop(files: Array<File>) {
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
  return (
    <>
      <div>
        {attachmentsParam2.length > 0 && (
          <PiAttachmentList
            attachmentItems={attachmentsParam2}
            onClickDelete={() => {}}
            onClickDownload={() => {}}
            onClickPreview={() => {}}
          />
        )}
      </div>
      <div style={{ marginTop: "8px" }}>
        <Form
          onSubmit={() => {
            console.log(233);
          }}
        >
          {() => (
            <NotesMessageBoxForm className="seperate-item-text-box">
              <AsyncLabel htmlFor="async-select-example" className="css-re7y6x">
                Internal Item Notes
              </AsyncLabel>
              <Field name="notes" defaultValue="">
                {({ fieldProps }: any) => (
                  <ItemNotesMessageBoxWrapper style={{ marginTop: "6px" }}>
                    <TextArea
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...fieldProps}
                      placeholder="Type here"
                      className={
                        attachmentsParam.length === 0 ? "w-92" : "w-100"
                      }
                      value={eneteredText}
                      onChange={(e: any) => msgTextChanged(e)}
                    />

                    <SendAndAttchIconWrapper>
                      <AttacmentIconSection style={{ marginRight: "0" }}>
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
                              <PiTooltip
                                content="Upload Attachments"
                                libraryType="atalskit"
                              >
                                <img
                                  className="attch-icon"
                                  src={AtachIon}
                                  alt="loading"
                                />
                              </PiTooltip>
                            ),
                          }}
                          onUpload={(e: Array<File>) => onDrop(e)}
                        />
                      </AttacmentIconSection>
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
      </div>
    </>
  );
}

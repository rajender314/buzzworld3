import axios, { AxiosResponse } from "axios";
import _ from "lodash";
import {
  PiAttachmentList,
  PiButton,
  PiSpinner,
  PiToast,
  PiTypography,
  PiUploader,
} from "pixel-kit";
import { useEffect, useState } from "react";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import { deleteImage, downloadFile } from "@app/helpers/helpers";
import { token } from "@app/services";
import { RepairInfoSection } from "../detail-view-content/detail-view-content.component";
import {
  RepairCardsHeader,
  RepairCardBody,
  NoRepairFound,
} from "../RepairItems/repair-items.component";
import {
  SpinnerDiv,
  UploadNote,
} from "../fileuploadModel/fileuploadModel.component";

type Props = {
  repairRef: any;
  repairInfo: any;
  // eslint-disable-next-line no-unused-vars
  sendEvent: (e: any) => void;
};
export default function RepairDocuments({
  repairRef,
  repairInfo,
  sendEvent,
}: Props) {
  const [attachmentsList, setAttachmentsList]: any = useState([]);
  const [openSnackbar, setSnackbar] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [docLoading, setDocLoading] = useState(false);
  const id = window.location.pathname.substring(1).split("/")[1];
  const [permissionObject, setpermissionObject] = useState<any>({});

  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("repair-request");
      setpermissionObject(permission);
    })();
  }, []);
  useEffect(() => {
    const { attachments } = repairInfo;
    attachments.map((obj: any) => {
      obj.downloadUrl = obj.url;
      obj.largeimage = obj.url;
      obj.name = obj.filename;
      obj.size = obj.filesize.toString();

      setDocLoading(false);

      return obj;
    });

    setAttachmentsList(attachments);
  }, [repairInfo, attachmentsList]);
  const [fileValidMsg, setFileValidMsg] = useState<string>("");

  async function onDrop(files: Array<File>) {
    if (!files.length) {
      setFileValidMsg("Invalid File");
      return;
    }
    setFileValidMsg("");
    const formData = new FormData();
    for (let i = 0; i < files.length; i += 1) {
      formData.append(`files[${i}]`, files[i]);
    }

    formData.append("container", "repair_items");
    formData.append("type", "repairs");
    formData.append("item_id", id);
    setDocLoading(true);
    axios({
      url: process.env.REACT_APP_API_URL + EndpointUrl.repairItemsUpload,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },

      data: formData,
    })
      .then((res: AxiosResponse) => {
        console.log(res);
        if (res.status === 200) {
          setToastMsg("Uploaded Successfully");
          setSnackbar(true);
          // setDocLoading(false);
          sendEvent({
            success: true,
          });
        } else if (res.status !== 200) {
          setDocLoading(true);
        }
      })
      .catch(() => {});
  }
  const deleteImgFile = async (e: any) => {
    setDocLoading(true);
    const data = await deleteImage(e);
    if (data === true) {
      const indx = _.findIndex(attachmentsList, { id: e.id });
      console.log(indx);
      attachmentsList.splice(indx, 1);
      setAttachmentsList([...attachmentsList]);
      // console.log(attachmentsList)
      setToastMsg("Deleted Successfully");
      setSnackbar(true);
      setDocLoading(false);
    } else if (data === false) {
      setDocLoading(false);
    }
  };
  return (
    <RepairInfoSection id="repair-docs" ref={repairRef}>
      <RepairCardsHeader>
        <PiTypography component="h4">Documents</PiTypography>
        <div
          className={
            permissionObject.Edit === true
              ? "cards-btns-group"
              : "no-edit-permission"
          }
        >
          {/* <BrowseBtn className="repair-browse-btn">
            <p className="browse-text">Upload</p>
            <InputEle
              type="file"
              onChange={(e: any) => onDrop(e.target.files)}
              multiple
            />
          </BrowseBtn> */}
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
              multiple: true,
              noDrag: false,
              text: (
                <PiButton
                  appearance="secondary"
                  label="Upload"
                  libraryType="atalskit"
                  onClick={() => {}}
                />
              ),
            }}
            onUpload={(e: Array<File>) => onDrop(e)}
          />
        </div>
      </RepairCardsHeader>

      {/* <hr /> */}

      <RepairCardBody
        style={{ position: "relative" }}
        className={
          docLoading ? "documents-body opacity-on-load" : "documents-body"
        }
      >
        {repairInfo.attachments.length === 0 && (
          <NoRepairFound> Documents Not Available</NoRepairFound>
        )}
        {docLoading && (
          <SpinnerDiv style={{ position: "absolute", left: "50%" }}>
            <PiSpinner color="primary" size={50} libraryType="atalskit" />
          </SpinnerDiv>
        )}
        {attachmentsList.length > 0 && (
          <PiAttachmentList
            attachmentItems={repairInfo.attachments}
            onClickDelete={deleteImgFile}
            onClickDownload={downloadFile}
            onClickPreview={() => {}}
          />
        )}
      </RepairCardBody>

      <UploadNote className="for-add-repair">
        The maximum file upload size is 10 MB.
      </UploadNote>
      <UploadNote className="for-add-repair">
        .jpg, .png, .jpeg, .pdf file types are supported.
      </UploadNote>
      <small
        className="validation-error date-range-validation-error"
        style={{
          position: "relative",
          top: "10px",
          fontSize: "14px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {fileValidMsg}
      </small>
      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel={toastMsg}
        message=""
        onClose={async () => setSnackbar(false)}
      />
    </RepairInfoSection>
  );
}

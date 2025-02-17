/* eslint-disable no-nested-ternary */
import {
  PiButton,
  PiInputForm,
  PiSpinner,
  PiToast,
  PiUploader,
} from "pixel-kit";
import { useRef, useState } from "react";
import { Formik, Field } from "formik";
import FilterFieldsContainer from "@app/components/Repair-Components/repair-list-filter/repair-list.component";
import {
  CloseIconRight,
  FileItemList,
  FormBodyOverFlow,
  PreviewText,
  ProgressBarDiv,
  ProgressSection,
  UploadedDataContainer,
  UploadedDefaultImg,
  UploadFileName,
  UploadFileSize,
  UploadItemData,
} from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import {
  AsyncSelectDiv,
  H4Heading,
  UploadWrapper,
} from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import UploaderText from "@app/core/components/Upload/uploadtext";
import {
  SpinnerDiv,
  UploadNote,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import CrossLogo from "@app/assets/images/cross.svg";
import CsvLogo from "@app/assets/images/csvlogo.png";
import XlsxLogo from "@app/assets/images/xlsxlogo.jpg";
import PdfLogo from "@app/assets/images/pdflogo.svg";
import WordLogo from "@app/assets/images/wordlogo.png";
import ProgressBar from "@ramonak/react-progress-bar";
import defaultImg from "@app/assets/images/defaultImg.svg";
import ImgPreview from "@app/core/components/Upload/ImgPreview/img-preview";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { token, triggerApi } from "@app/services";
import axios from "axios";
import { ApiResponse } from "@app/services/schema/schema";
import _ from "lodash";
import { AsyncLabel } from "@app/components/rmaModel/RmaModel.component";
import { AsyncSelect } from "@atlaskit/select";
import formatPhoneNumbers from "@app/components/popups/add-user/formate-phone-number";
import VendorInformationFormValidationSchema from "../purchase-form-validation/vendor-Information-form-validations";
import { RequestorInformationBottomDrawerFooter } from "../parts-purchase-form.tsx/parts-purchase-form-components";

type Props = {
  tabIndexEvent: any;
  sendVendorData: any;
  sendVendorUploadData: any;
};

export default function VendorinformationForm({
  tabIndexEvent,
  sendVendorData,
  sendVendorUploadData,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    vendor_id: "",
    vendor_acc_number: "",
    vendor_contact_name: "",
    email: "",
    vendor_phone: "",
    vendor_website: "",
    vendor_quote_number: "",
    shipping_costs: "",
  });
  const [openSnackbar, setSnackbar] = useState(false);
  const [attachmentsList, setAttachmentsList]: any = useState([]);
  const [uploadList, setUploadList]: any = useState([]);
  const [showProgressBar, setProgressBar] = useState(false);
  const [fileName, setFileName] = useState<string>();
  const [progress, setProgress] = useState<number>(0);
  const [fileSize, setFileSize] = useState<any>();
  const [showPreview, setPreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [fileValidMsg, setFileValidMsg] = useState<string>("");
  const formik = useRef<any>(null);
  const { current }: any = useRef({ timer: 0 });
  const [vendorOptions, setVendorOptions] = useState([]);
  const [newInputValue, setNewInputValue]: any = useState();

  const [vendorList, setVendorList] = useState<any>([]);
  function handleRef(e: any) {
    formik.current = e;
    if (formik.current) {
      tabIndexEvent(formik.current);
    }
  }

  const onVendorWebsiteChange = (e: any) => {
    initialValues.vendor_website = e.target.value;
    setInitialValues(initialValues);
  };
  const onVendorContactChange = (e: any) => {
    initialValues.vendor_contact_name = e.target.value;
    setInitialValues(initialValues);
  };
  const onVendorQuotenumberChange = (e: any) => {
    initialValues.vendor_quote_number = e.target.value;
    setInitialValues(initialValues);
  };
  const onVendorEmailChange = (e: any) => {
    initialValues.email = e.target.value;
    setInitialValues(initialValues);
  };

  async function triggerEventData(e: any) {
    if (e.success) {
      setPreview(false);
    }
  }
  async function onDrop(files: Array<File>) {
    if (files.length) {
      setFileValidMsg("");
      setProgress(0);
      setLoading(true);
      const size = files[0].size / 1024;
      setFileSize(size.toFixed(2));
      setFileName(files[0].name);
    } else {
      setFileValidMsg("Invalid File");
    }
    const formData = new FormData();
    for (let i = 0; i < files.length; i += 1) {
      formData.append(`files[${i}]`, files[i]);
    }
    for (let i = 0; i < files.length; i += 1) {
      uploadList.push(files[i]);
    }
    setTimeout(() => {
      setProgressBar(false);
      setUploadList([...uploadList]);
    }, 200);

    formData.append("container", "part_purchase");
    formData.append("part_purchase_id", "");
    await axios({
      url: process.env.REACT_APP_API_URL + EndpointUrl.PartPurchaseUpload,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },

      data: formData,
    })
      .then((res: any) => {
        const { data } = res.data.result;
        sendVendorUploadData({ vendorData: data || "" });
        setLoading(false);
      })
      .catch((err: string) => {
        console.log(err, "Error");
      });
  }
  const handleSubmit = () => {
    if (formik.current.isValid) {
      sendVendorData(formik.current.values);
    }
  };
  const previewFileBeforeSave = (file: any) => {
    if (
      file.type === "image/jpg" ||
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/svg"
    ) {
      setPreview(true);
      setSelectedFile(file);
    } else {
      const src = URL.createObjectURL(file);
      window.open(src, "_blank");
    }
  };
  const previewFileAfterSave = (file: any) => {
    if (
      file.type === "jpg" ||
      file.type === "jpeg" ||
      file.type === "png" ||
      file.type === "svg"
    ) {
      setPreview(true);
      setSelectedFile(file);
    } else {
      const src = file.url || file.downloadUrl;
      window.open(src, "_blank");
    }
  };
  const deleteImg = (name: string) => {
    const indx = _.findIndex(uploadList, { name });
    uploadList.splice(indx, 1);
    setUploadList([...uploadList]);
  };
  function deleteServerImage(id: any) {
    const apiObject = {
      payload: {},
      method: "DELETE",
      apiUrl: `${EndpointUrl.Attachments}/${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const indx = _.findIndex(attachmentsList, { id });

          console.log(indx);
          attachmentsList.splice(indx, 1);
          setAttachmentsList([...attachmentsList]);
          // console.log(attachmentsList)
          setSnackbar(true);
          //  setToastMsg("Deleted Successfully");
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  const onVendorInputChange = (Value: string) => {
    if (Value.length >= 3) {
      return Value;
    }
    return null;
  };
  const getVendors = async (vendorValue: string) => {
    // formik.current.setFieldValue(`vendor_phone`, "");
    // formik.current.setFieldValue(`email`, "");

    let list: any = [];
    setVendorOptions([]);
    if (vendorValue.length >= 3) {
      setNewInputValue(vendorValue);

      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.ppVendorList}?status=true&search=${vendorValue}`,

        headers: {},
      };
      await triggerApi(apiObject)
        .then((res: any) => {
          if (res.result.success && res.result.status_code === 200) {
            const { data } = res.result;
            let arr = [];
            arr = data.list.map((item: any) => ({
              ...item,
              value: item.id,
              label: item.name,
            }));
            setVendorList(data);

            list = arr;
            setVendorOptions(list);
          } else {
            setVendorOptions([]);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
      return list;
    }
    return list;
  };
  const vendorpromiseOptions = (vendorValue: string) =>
    new Promise((resolve) => {
      setNewInputValue("");
      if (current.timer) clearTimeout(current.timer);
      current.timer = setTimeout(() => {
        resolve(getVendors(vendorValue));
      }, 1000);
    });

  const onVendornameChange = (value: any) => {
    // formik.current.setFieldValue(`vendor_id`, value)
    if (value) {
      vendorList.list.map((item: any) => {
        if (value && value.value === item.id) {
          const phoneValue = formatPhoneNumbers(item.phone_number);
          const emailId = item.email ? item.email.trim().toLowerCase() : "";
          formik.current.setFieldValue("vendor_phone", phoneValue);
          formik.current.setFieldValue("email", emailId || "");
          // setVendorPhoneValue(phoneValue);
          // setEmailValue(emailId);
        }
        return item;
      });
      formik.current.setFieldValue("vendor_id", {
        label: value.label,
        value: value.value,
        code: value.code,
      });
    } else {
      setNewInputValue("");
      formik.current.setFieldValue("vendor_id", null);
    }
  };

  const blurEvent = (form: any, fieldLabel: any) => {
    // form.setFieldValue(`date_range`, '123')
    if (newInputValue && vendorOptions.length === 0) {
      formik.current.setFieldValue(fieldLabel, {
        value: newInputValue,
        label: newInputValue,
        code: null,
      });
    }
  };
  return (
    <>
      <Formik
        validationSchema={VendorInformationFormValidationSchema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
        innerRef={(e: any) => handleRef(e)}
        validateOnMount
      >
        {({ ...formikProps }: any) => (
          <>
            <FormBodyOverFlow
              className={
                loading ? "opacity-on-load vendor-side-bar" : "vendor-side-bar"
              }
            >
              {loading && (
                <SpinnerDiv
                  style={{
                    position: "absolute",
                    left: "50%",
                    zIndex: "9999",
                  }}
                >
                  <PiSpinner color="primary" size={50} libraryType="atalskit" />
                </SpinnerDiv>
              )}
              <FilterFieldsContainer>
                <div>
                  {/* <PiInputForm
                      label="Vendor Name"
                      placeholder="Enter Vendor Name"
                      name="vendor_id"
                      type="text"
                      onChange={(e: any) => {
                        onVendornameChange(e);
                      }}
                      isMandatory
                      isDisabled={loading}
                    /> */}

                  <AsyncSelectDiv>
                    <AsyncLabel
                      htmlFor="async-select-example"
                      className="mandatory"
                    >
                      Vendor Name
                    </AsyncLabel>
                    <Field name="vendor_id">
                      {({ field, form, meta }: any) => (
                        <>
                          <AsyncSelect
                            name="vendor_id"
                            inputId="async-select-example"
                            classNamePrefix="react-select"
                            onInputChange={onVendorInputChange}
                            loadOptions={vendorpromiseOptions}
                            placeholder="Search Vendor"
                            onChange={(value) => {
                              onVendornameChange(value);
                              // form.setFieldValue(`vendor_id`, value)
                            }}
                            isClearable
                            value={field.value}
                            isDisabled={loading}
                            noOptionsMessage={() => "No Vendors Found"}
                            onBlur={() => {
                              blurEvent(form, "vendor_id");
                            }}
                          />
                          <small className="validation-error date-range-validation-error">
                            {meta.touched && meta.error ? meta.error : ""}
                          </small>
                        </>
                      )}
                    </Field>
                  </AsyncSelectDiv>
                </div>

                <div>
                  <PiInputForm
                    type="text  "
                    name="vendor_contact_name"
                    label="Vendor Contact Name"
                    placeholder="Enter Vendor Contact Name"
                    onChange={(e: any) => {
                      onVendorContactChange(e);
                    }}
                    isDisabled={loading}
                  />
                </div>
                <div>
                  <PiInputForm
                    name="email"
                    type="email"
                    label="Vendor Email"
                    placeholder="Enter Vendor Email"
                    onChange={(e: any) => {
                      onVendorEmailChange(e);
                    }}
                    isDisabled={loading}
                  />
                </div>
                <div>
                  <PiInputForm
                    name="vendor_phone"
                    type="phone_number"
                    label="Vendor Phone"
                    placeholder="Enter Vendor Phone"
                    // value={vendorPhoneValue}
                    // isMandatory
                    // maxLength={16}
                    isDisabled={loading}
                  />
                </div>
                <div>
                  <PiInputForm
                    name="vendor_website"
                    label="Vendor Website"
                    placeholder="Enter Vendor Website"
                    onChange={(e: any) => {
                      onVendorWebsiteChange(e);
                    }}
                    isDisabled={loading}

                    // isMandatory
                  />
                </div>
                <div>
                  <PiInputForm
                    name="vendor_quote_number"
                    label="Vendor Quote Number"
                    type="text"
                    placeholder="Enter Vendor Quote Number"
                    onChange={(e: any) => {
                      onVendorQuotenumberChange(e);
                    }}
                    // isMandatory
                    isDisabled={loading}
                  />
                </div>

                {/* <div className="cost_icon_input icon_input">
                    <PiIconInputForm
                      name="shipping_costs"
                      type="string"
                      label="Shipping and Other Fees"
                      placeholder="Enter Shipping and other Fees"
                      onChange={(e: any) => {
                        onShippingCostChange(e);
                      }}
                      isMandatory
                      isDisabled={loading}
                      elemBeforeInput={
                        <div
                          style={{
                            padding: "10px",
                            color: "#6D7992",
                            borderRight: "1px solid #d0d1d3",
                          }}
                        >
                          $
                        </div>
                      }
                    />
                  </div> */}
                <UploadWrapper className="item-specific-notes">
                  <H4Heading>Upload Documents</H4Heading>
                  <PiUploader
                    dropzoneProps={{
                      accept: ["image/*", "application/pdf"],
                      disabled: loading,
                      maxSize: 10485760,
                      multiple: false,
                      noDrag: true,
                      text: <UploaderText />,
                    }}
                    onUpload={(e: Array<File>) => onDrop(e)}
                  />
                  <UploadNote className="for-add-repair">
                    The maximum file upload size is 10 MB.
                  </UploadNote>
                  <UploadNote className="for-file-error-msg">
                    {fileValidMsg}
                  </UploadNote>
                  {attachmentsList.length > 0 &&
                    attachmentsList.map((obj: any) => (
                      <UploadedDataContainer>
                        <FileItemList>
                          <UploadedDefaultImg
                            src={obj.thumbnail}
                            alt="loading"
                          />
                          <UploadFileName>{obj.filename}</UploadFileName>
                          <PreviewText
                            onClick={() => previewFileAfterSave(obj)}
                          >
                            Preview
                          </PreviewText>

                          <UploadFileSize>{`${obj.filesize} KB`}</UploadFileSize>
                        </FileItemList>
                        <CloseIconRight
                          title="Delete"
                          onClick={() => deleteServerImage(obj.id)}
                        >
                          <img src={CrossLogo} alt="loading" />
                        </CloseIconRight>
                      </UploadedDataContainer>
                    ))}
                  {uploadList.map((obj: any) => {
                    console.log(obj);

                    return (
                      <UploadedDataContainer>
                        <FileItemList>
                          <UploadedDefaultImg
                            src={
                              obj.type === "text/csv"
                                ? CsvLogo
                                : obj.type ===
                                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                  ? XlsxLogo
                                  : obj.type === "application/pdf"
                                    ? PdfLogo
                                    : obj.type === "application/msword"
                                      ? WordLogo
                                      : obj.blob_image
                            }
                            alt="loading"
                          />
                          <UploadFileName>{obj.name}</UploadFileName>

                          <PreviewText
                            onClick={() => previewFileBeforeSave(obj)}
                          >
                            Preview
                          </PreviewText>

                          <UploadFileSize>{`${obj.size} KB`}</UploadFileSize>
                        </FileItemList>
                        <CloseIconRight
                          title="Delete"
                          onClick={() => deleteImg(obj.name)}
                        >
                          <img src={CrossLogo} alt="loading" />
                        </CloseIconRight>
                      </UploadedDataContainer>
                    );
                  })}

                  {showProgressBar && (
                    <ProgressSection>
                      <UploadedDefaultImg src={defaultImg} alt="loading" />
                      <ProgressBarDiv>
                        {fileName && (
                          <UploadItemData>
                            <UploadFileName>{fileName}</UploadFileName>
                            <UploadFileSize>{`${fileSize} KB`}</UploadFileSize>
                          </UploadItemData>
                        )}

                        <ProgressBar
                          completed={progress}
                          margin="0 0 10px 0"
                          initCompletedOnAnimation={10}
                          // width="200px"
                          height="10px"
                          bgColor="#1976D2"
                          baseBgColor="#E3EAF6"
                          labelColor="#494F50"
                          labelAlignment="outside"
                          className="progress-bar"
                          isLabelVisible={false}
                        />
                      </ProgressBarDiv>
                    </ProgressSection>
                  )}
                </UploadWrapper>
                {showPreview && (
                  <ImgPreview
                    selectedFile={selectedFile}
                    sendEventData={(e: any) => triggerEventData(e)}
                  />
                )}
              </FilterFieldsContainer>
            </FormBodyOverFlow>
            <RequestorInformationBottomDrawerFooter>
              <PiButton
                appearance="primary"
                label="Next"
                libraryType="atalskit"
                onClick={formikProps.handleSubmit}
                isDisabled={loading}
              />
            </RequestorInformationBottomDrawerFooter>
          </>
        )}
      </Formik>
      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel=""
        message=""
        onClose={async () => setSnackbar(false)}
      />
    </>
  );
}

/* eslint-disable react/no-unstable-nested-components */
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Formik, Field } from "formik";
import {
  PiButton,
  PiUploader,
  PiInputForm,
  PiSelectForm,
  PiSpinner,
  PiTextareaForm,
  PiDatepickerForm,
  PiToast,
  PiSelect,
  PiIconInputForm,
  PiCheckBoxSelect,
  PiConfirmModel,
  PiEditor,
  PiTooltip,
} from "pixel-kit";
import PartRepairValidations from "@app/modules/repairs/repair-request/validation/repair-request";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { token, triggerApi } from "@app/services";
import { ApiResponse, FilterColumnProps } from "@app/services/schema/schema";
import { useParams } from "react-router-dom";
import {
  SpinnerDiv,
  UploadNote,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import { AsyncSelect } from "@atlaskit/select";

import {
  AsyncLabel,
  RmaFields,
} from "@app/components/rmaModel/RmaModel.component";
import ProgressBar from "@ramonak/react-progress-bar";
import defaultImg from "@app/assets/images/defaultImg.svg";
import CrossLogo from "@app/assets/images/cross.svg";
import axios, { AxiosResponse } from "axios";
import UploaderText from "@app/core/components/Upload/uploadtext";
import _ from "lodash";
import ImgPreview from "@app/core/components/Upload/ImgPreview/img-preview";
import {
  getBlobImage,
  getRepairPriorityApi,
  getUserLoggedPermission,
} from "@app/helpers/helpers";
import {
  RouteParams,
  VendorListProps,
} from "@app/modules/repair-detail-view/schema/repairs";
import CsvLogo from "@app/assets/images/csvlogo.png";
import XlsxLogo from "@app/assets/images/xlsxlogo.jpg";
import PdfLogo from "@app/assets/images/pdflogo.svg";
import WordLogo from "@app/assets/images/wordlogo.png";
import { DateRangePickerDiv } from "@app/components/special-pricing-components/sp-left-filter/sp-left-filter.component";
import moment from "moment";
import GlobalVariables from "@app/core/globalVariables/globalVariables";
import {
  getEvaluationSummaryList,
  getRepairUsersList,
} from "@app/modules/repair-detail-view/helpers/repairs-helpers";
import {
  EditorContainer,
  ShowContainer,
} from "@app/components/RepairNotes/repair-notes.component";
import ShowMore from "@app/assets/images/Showmore.svg";
import TechNotesView from "@app/core/components/technotes-popup";
import { FormatOptionLabel } from "../../LocationAssign/location-assign.component";
import {
  RepairStatusRadio,
  RadioLabel,
} from "../../Evaluation/evaluation.component";
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
} from "../../checksIns/assignLocation/assign-location.component";
import {
  AddPartEachFieldDiv,
  AddPartItemContainer,
  AsyncSelectDiv,
  FieldsDisplayFlex,
  H4Heading,
  SideDrawerFooter,
  ThreeByThreeField,
  UploadWrapper,
} from "./add-part-repair.component";

type EventDataProps = {
  close?: boolean;
  success?: boolean;
  msg?: string;
};
type PartInfo = {
  repairItemId: string;
  title: string;
  searchedValue?: string;
  repairStatus?: string;
  is_edit?: boolean;
};
type Props = {
  partInfo: PartInfo;
  // eslint-disable-next-line no-unused-vars
  sendModelData: (e: EventDataProps) => {};
};
export default function AddPartRepair({ partInfo, sendModelData }: Props) {
  const { id }: RouteParams = useParams();
  const { current }: any = useRef({ timer: 0 });
  const [serverMsg, setServerMsg] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues]: any = useState({
    // customer_part_number: '',
    manufacturer_id: "",
    quantity: "1",
    priority: "",
    serial_number: "",
    description: "",
    item_notes: "",
    storage_location: "",
    delivery_due_date: "",
    customer_po: "",
    part_number: partInfo.searchedValue ? partInfo.searchedValue : "",
    date_promised: "",
    evaluation_summary: "",
  });
  const [partNumber, setPartNumber] = useState<any>(
    partInfo.searchedValue ? partInfo.searchedValue : ""
  );
  const [vendorsList, setVendorList] = useState<Array<VendorListProps>>([]);
  const [progress, setProgress] = useState<number>(0);
  const [fileSize, setFileSize] = useState<string>();
  const [fileName, setFileName] = useState<string>();
  const [showPreview, setPreview] = useState(false);
  const [uploadList, setUploadList]: any = useState([]);
  const [showProgressBar, setProgressBar] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [attachmentsList, setAttachmentsList]: any = useState([]);
  const [openSnackbar, setSnackbar] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [repairTypeList, setRepairTypeList] = useState(
    GlobalVariables.radioItemList
  );
  const [repairType, setRepairType] = useState<string>("");
  const [rep_quantity, setRepQuantity] = useState("");
  const [newInputValue, setNewInputValue]: any = useState();
  const [TodayDate, SetTodayDate] = useState("");
  const [repairPriorityLevel, setRepairPriorityLevel]: any = useState([]);
  const [summaryList, setSummaryList]: any = useState([]);
  const [usersList, setUsersList]: any = useState([]);
  const [selectedTechnician, setSelectedTechnician]: any = useState();
  const [selectedQC, setSelectedQC]: any = useState();
  const [openModel, setOpenModel] = useState(false);
  const [newpartNumber, setNewPartNumber]: any = useState("");
  const [partDataById, setPartDataById]: any = useState();
  const formik = useRef<any>(null);
  const [itemSpecificNotes, setItemSpecificNotes] = useState();
  const [technote, setTechNote] = useState<string>("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [confirmText, setConfirmText] = useState<any>();
  const [openConFirm, setConFirm] = useState(false);
  const [filesArray, setFilesArray] = useState<any>([]);
  const [fileValidMsg, setFileValidMsg] = useState<string>("");
  useEffect(() => {
    (async () => {
      const users = await getRepairUsersList();
      const upDatedUsersList = users.map((obj: any) => ({
        ...obj,
        value: obj.id,
        label: obj.name || "No Name",
      }));

      setUsersList([...upDatedUsersList]);
    })();
  }, []);

  function getDataById(id2: string) {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.repairItems}/${id2}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          setPartDataById(data);
          setPartNumber(data.part_number);
          setAttachmentsList(data.attachments);
          console.log(attachmentsList);
          // initialValues['customer_part_number'] = data.customer_part_number
          initialValues.manufacturer_id = data.manufacturer_id;
          initialValues.quantity = data.quantity;
          initialValues.priority = data.priority;
          initialValues.serial_number = data.serial_number || "";
          initialValues.description = data.description || "";
          initialValues.item_notes = data.item_notes || "";
          initialValues.part_number = data.part_number.label || "";
          initialValues.customer_po = data.customer_po || "";
          initialValues.tech_sugg_price = data.tech_sugg_price;
          initialValues.estimated_parts_cost = data.estimated_parts_cost;
          initialValues.estimated_hrs = data.estimated_hrs;
          initialValues.evaluation_summary = data.evaluation_summary;
          initialValues.delivery_due_date = data.delivery_due_date
            ? moment(data.delivery_due_date, "MM-DD-YYYY").format("YYYY-MM-DD")
            : "";
          initialValues.date_promised = data.date_promised
            ? moment(data.date_promised, "MM-DD-YYYY").format("YYYY-MM-DD")
            : "";
          if (data.status_code !== "receiving") {
            initialValues.storage_location = data.storage_location || "";
          }
          setItemSpecificNotes(data.item_notes || "");
          setRepairType(data.repair_type);
          setRepQuantity(data.quantity);
          setInitialValues(initialValues);
          // setSelectedSummary(data.evaluation_summary)
          setSelectedTechnician(data.technician_id);
          setSelectedQC(data.qc_id);
          setTechNote(data.technical_note || "");
          console.log(repairTypeList);
          repairTypeList.map((obj: any) => {
            if (obj.value === data.repair_type) {
              obj.checked = true;
            } else {
              obj.checked = false;
            }
            return true;
          });
          setRepairTypeList([...repairTypeList]);
          setLoading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  useEffect(() => {
    (async () => {
      // getVendorList()
      const priorityList = await getRepairPriorityApi();
      const summary = await getEvaluationSummaryList();
      setSummaryList([...summary]);
      setRepairPriorityLevel([...priorityList]);
      // if (partInfo.title === "Edit") {
      getDataById(partInfo.repairItemId);
      // } else {
      //  setLoading(false);
      // }
    })();
  }, []);

  useEffect(() => {
    function formatDate(date: Date) {
      const d = new Date(date);
      let month = `${d.getMonth() + 1}`;
      let day = `${d.getDate()}`;
      const year = d.getFullYear();

      if (month.length < 2) month = `0${month}`;
      if (day.length < 2) day = `0${day}`;

      return [year, month, day].join("-");
    }
    SetTodayDate(formatDate(new Date()));
  }, []);
  const blurEvent = (fieldLabel: any) => {
    // let obj: any = { value: '123', label: '123' }
    //  setPartNumber(obj)
    if (newInputValue && vendorsList.length === 0) {
      console.log(newInputValue);
      formik.current.setFieldValue(fieldLabel, {
        value: newInputValue,
        label: newInputValue,
      });
    }
  };

  const triggerSubmitApi = (data: any) => {
    console.log(data);
    blurEvent("manufacturer_id");
    setBtnLoading(true);
    const param = {
      ...data,
    };
    const updedFormData: any = new FormData();

    if (!partInfo.repairItemId) {
      updedFormData.append("repairs_id", id);
      updedFormData.append(
        "manufacturer_id",
        data.manufacturer_id.name || data.manufacturer_id.label
      );
      updedFormData.append("priority", data.priority.value);
      updedFormData.append("description", data.description);
      updedFormData.append("item_notes", data.item_notes);
      updedFormData.append("part_number", data.part_number);
      updedFormData.append("serial_number", data.serial_number || "");
      updedFormData.append("container", "repair_items");
      updedFormData.append("item_id", partInfo.repairItemId);
      // updedFormData.append(`customer_part_number`, data.customer_part_number)
      updedFormData.append("quantity", rep_quantity);

      if (data.delivery_due_date) {
        updedFormData.append(
          "delivery_due_date",
          moment(data.delivery_due_date).format("YYYY-MM-DD")
        );
      }
      for (let i = 0; i < filesArray.length; i += 1) {
        updedFormData.append(`files[${i}]`, filesArray[i]);
      }
    } else {
      param.repairs_id = id;
      param.manufacturer_id =
        data.manufacturer_id.id || data.manufacturer_id.value;
      param.priority = data.priority.value;
      param.description = data.description;
      param.item_notes = data.item_notes;
      param.part_number = partNumber.value || "";
      param.serial_number = data.serial_number || "";
      param.part_number_label =
        partNumber.label.trim() !== newpartNumber && newpartNumber.trim()
          ? newpartNumber
          : partNumber.label;
      param.quantity = rep_quantity || "";
      param.delivery_due_date = data.delivery_due_date
        ? moment(data.delivery_due_date).format("YYYY-MM-DD")
        : "";
      param.date_promised = data.date_promised
        ? moment(data.date_promised).format("YYYY-MM-DD")
        : "";
      param.technician_id = selectedTechnician;
      param.technical_note = technote;
      // if (
      //  partDataById.status_code === 'repairable' ||
      //  partDataById.status_code === 'non_repairable' ||
      //  partDataById.status_code === 'outsource'
      // ) {
      param.repair_type = repairType || "";
      // }
      param.item_notes = itemSpecificNotes;
    }

    const apiObject = {
      payload: !partInfo.repairItemId ? updedFormData : param,
      method: partInfo.repairItemId ? "PUT" : "POST",
      apiUrl: partInfo.repairItemId
        ? `${EndpointUrl.repairItems}/${partInfo.repairItemId}`
        : EndpointUrl.customItem,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setServerMsg("");
          sendModelData({
            success: true,
            msg: partInfo.repairItemId
              ? "Updated Successfully"
              : "Added Successfully",
          });
        } else {
          setServerMsg(response.result.data);
        }
        setBtnLoading(false);
      })
      .catch((err: string) => {
        console.log(err);
      });
  };

  function handleSubmit(data: any) {
    console.log(formik);

    if (partInfo.repairItemId && partDataById.quantity !== rep_quantity) {
      setConfirmText(
        "Are you sure you want to edit the Quantity as it affects the Job?"
      );
      setConFirm(true);
    } else {
      triggerSubmitApi(data);
    }
  }
  function handleRef(e: any) {
    console.log(e);
    formik.current = e;
  }
  const filterVendorData = async (inputValue: string) => {
    setPartNumber("");
    let data: any = [];
    if (inputValue.length >= 3) {
      setNewInputValue(inputValue);
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl: `${EndpointUrl.vendorList}?search=${inputValue}`,
        headers: {},
      };
      await triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.success) {
            let arr = [];
            const list = response.result.data.list
              ? response.result.data.list
              : response.result.data;
            arr = list.map((item: FilterColumnProps) => ({
              value: item.id,
              label: item.name,
              ...item,
            }));
            data = arr;
            setVendorList(data);
          }
        })
        .catch((err: string) => {
          console.log(err);
        });
      return data;
    }
    return data;
  };
  const promiseOptions = (inputValue: string) =>
    new Promise((resolve) => {
      if (inputValue.length >= 3) {
        if (current.timer) clearTimeout(current.timer);
        current.timer = setTimeout(() => {
          resolve(filterVendorData(inputValue));
        }, 1000);
      }
    });
  const handleInputChange = (newValue: string) => {
    if (newValue.length >= 3) {
      return newValue;
    }
    return newValue;
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

  const HandleChange = (form: any, fieldLabel: any, value: any) => {
    if (value) {
      form.setFieldValue(fieldLabel, value);
    } else {
      setNewInputValue("");
      form.setFieldValue(fieldLabel, value);
    }
  };

  async function onDrop(files: Array<File>) {
    console.log(files);
    if (files.length) {
      setFileValidMsg("");
      setProgress(0);
      // setProgressBar(true)
      const size = files[0].size / 1024;
      setFileSize(size.toFixed(2));
      setFileName(files[0].name);
      setFilesArray([...files]);
    } else {
      setFileValidMsg("Invalid File");
    }
    const formDatalocal = new FormData();
    for (let i = 0; i < files.length; i += 1) {
      formDatalocal.append(`files[${i}]`, files[i]);
    }
    for (let i = 0; i < files.length; i += 1) {
      uploadList.push(files[i]);
    }
    uploadList.map((obj: any) => {
      obj.filesize = (obj.size / 1024).toFixed(2);
      obj.blob_image = getBlobImage(obj);
      return obj;
    });
    setTimeout(() => {
      setProgressBar(false);
      setUploadList([...uploadList]);
    }, 1000);
    formDatalocal.append("container", "repair_items");
    formDatalocal.append("type", "repair_items");
    formDatalocal.append("item_id", partInfo.repairItemId);
    if (partInfo.repairItemId) {
      return axios({
        url: process.env.REACT_APP_API_URL + EndpointUrl.repairItemsUpload,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },

        data: formDatalocal,
      })
        .then((res: AxiosResponse) => {
          console.log(res);
          if (res.status === 200) {
            setToastMsg("Uploaded Successfully");
            setSnackbar(true);
          } else {
            setServerMsg(res.data.result.data || "Failed to Upload Image");
          }
        })
        .catch((err: string) => {
          console.log(err, "Error");
        });
    }
    return true;
  }
  const deleteImg = (name: string) => {
    const indx = _.findIndex(uploadList, { name });
    uploadList.splice(indx, 1);
    setUploadList([...uploadList]);
  };
  function deleteServerImage(id2: any) {
    const apiObject = {
      payload: {},
      method: "DELETE",
      apiUrl: `${EndpointUrl.Attachments}/${id2}`,
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
          setToastMsg("Deleted Successfully");
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  async function triggerEventData(e: EventDataProps) {
    if (e.success) {
      setPreview(false);
    }
  }
  const statusChange = (e: ChangeEvent<HTMLInputElement>, value: string) => {
    console.log(e);
    setRepairType(value);
    repairTypeList.map((obj: any) => {
      if (obj.value === value) {
        obj.checked = true;
      } else {
        obj.checked = false;
      }
      return true;
    });
    setRepairTypeList([...repairTypeList]);
  };

  async function getConfirmModelEvent(e: string) {
    if (e === "accept") {
      setRepQuantity(rep_quantity);
      triggerSubmitApi(formik.current.values);
    } else {
      setRepQuantity(partDataById.quantity);
      formik.current.setFieldValue("quantity", rep_quantity);
    }
    console.log(formik);

    setConFirm(false);
  }
  const repQuantityChange = (e: any) => {
    formik.current.setFieldValue("quantity", e.target.value);
    setRepQuantity(e.target.value);
  };

  const selectSummary = (e: any) => {
    if (e && e.length) {
      formik.current.setFieldValue("evaluation_summary", e);
    } else if (e && e.length === 0) {
      formik.current.setFieldValue("evaluation_summary", "");
    }
  };
  const selectTechnician = (e: any) => {
    setSelectedTechnician(e);
  };
  const onChangeItemNotes = (e: string) => {
    setTechNote(e);
  };

  const triggerUpdatedNotes = (e: any) => {
    if (e.close) {
      setOpenModel(false);
    }
    if (e.success) {
      setOpenModel(false);
      if (e.updatedNotes) {
        setTechNote(e.updatedNotes);
        setToastMsg("Updated Successfully");
        setSnackbar(true);
      }
    }
  };
  const onChangeItemSpecificNotes = (e: any) => {
    setItemSpecificNotes(e);
  };

  const getImageType = (type: string, BlobImg: any) => {
    switch (type) {
      case "text/csv": {
        return CsvLogo;
      }
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        return XlsxLogo;
      }
      case "application/pdf": {
        return PdfLogo;
      }
      case "application/msword": {
        return WordLogo;
      }
      default: {
        return BlobImg;
      }
    }
  };

  function MemoizedFormatOptionLabel(data: any) {
    return (
      <FormatOptionLabel>
        <div className="cmpny_name">
          {data?.name || data?.label || "No Name"}
        </div>
        <div className="account_no">
          -&nbsp;
          {data?.total_hours}
        </div>
      </FormatOptionLabel>
    );
  }
  return (
    <>
      {loading && (
        <SpinnerDiv style={{ height: "100%" }}>
          <PiSpinner color="primary" size={50} libraryType="atalskit" />
        </SpinnerDiv>
      )}
      {!loading && (
        <Formik
          validationSchema={() => PartRepairValidations(partDataById)}
          onSubmit={(e: any) => handleSubmit(e)}
          initialValues={initialValues}
          innerRef={(e: any) => handleRef(e)}
          validateOnMount
        >
          {({ ...formikProps }: any) => (
            <>
              <FormBodyOverFlow>
                <AddPartItemContainer>
                  {/* <PiTypography component="h6">Part Information</PiTypography> */}
                  <ThreeByThreeField>
                    <FieldsDisplayFlex>
                      <AddPartEachFieldDiv>
                        <Field name="manufacturer_id">
                          {({ field, form, meta }: any) => (
                            <AsyncSelectDiv>
                              <AsyncLabel
                                htmlFor="async-select-example"
                                className="css-re7y6x mandatory"
                              >
                                Manufacturer
                              </AsyncLabel>
                              <AsyncSelect
                                name="manufacturer_id"
                                inputId="async-select-example"
                                className="mt"
                                classNamePrefix="react-select  "
                                onInputChange={handleInputChange}
                                loadOptions={promiseOptions}
                                placeholder="Search"
                                onChange={(value) => {
                                  HandleChange(form, "manufacturer_id", value);
                                }}
                                // value={supplier}
                                value={field.value}
                                onBlur={() => {
                                  blurEvent("manufacturer_id");
                                }}
                                focus={(e: any) => console.log(e)}
                                isDisabled={!!partInfo.repairItemId}
                                isClearable
                              />
                              <small className="validation-error">
                                {meta.touched && meta.error ? meta.error : ""}
                              </small>
                            </AsyncSelectDiv>
                          )}
                        </Field>
                      </AddPartEachFieldDiv>

                      {/* <AddPartEachFieldDiv>
                            <AsyncSelectDiv>
                              <AsyncLabel
                                htmlFor="async-select-example"
                                className="css-re7y6x"
                              >
                                Part Number
                              </AsyncLabel>
                              <AsyncCreatable
                                name="111"
                                inputId="async-select-example"
                                classNamePrefix="react-select"
                                onInputChange={handleInputChange}
                                loadOptions={promiseOptions}
                                placeholder="Search"
                                onChange={(value) => {
                                  HandleChange(value)
                                }}
                                value={partNumber}
                                onBlur={blurEvent}
                                //onCreateOption={handleCreate}
                                isDisabled={
                                  partInfo.repairItemId || !manufacterer
                                    ? true
                                    : false
                                }
                                focus={(e: any) => console.log(e)}
                                formatCreateLabel={(e: string) => {
                                  if (totalCount === 0) {
                                    return (
                                      <AsyncOptionBtn>
                                        <PiButton
                                          appearance="primary"
                                          label={'Add Part Number'}
                                          onClick={() => addNewPart(e)}
                                        />
                                      </AsyncOptionBtn>
                                    )
                                  }
                                }}
                                isClearable
                              />
                            </AsyncSelectDiv>
                          </AddPartEachFieldDiv> */}
                      <AddPartEachFieldDiv>
                        <PiInputForm
                          name="part_number"
                          label="Part Number"
                          libraryType="atalskit"
                          type="text"
                          placeholder="Part Number"
                          // value={partNumber}
                          // isDisabled={disablePartNoField}
                          isDisabled={!partDataById.is_custom}
                          isMandatory
                          onChange={(e: any) =>
                            setNewPartNumber(e.target.value)
                          }
                        />
                      </AddPartEachFieldDiv>
                      <AddPartEachFieldDiv>
                        {/* <PiInputForm
                              name="customer_part_number"
                              label="Customer Part Number"
                              libraryType="atalskit"
                              type="text"
                              placeholder="Customer Part Number"
                              //isDisabled={disablePartNoField}
                            /> */}

                        <PiInputForm
                          name="quantity"
                          label="Quantity"
                          libraryType="atalskit"
                          type="number"
                          placeholder="Quantity"
                          onChange={repQuantityChange}
                          isDisabled={
                            !!(
                              !partDataById.is_edit ||
                              partDataById.status_code === "added_to_quote" ||
                              partDataById.status_code === "repair_in_progress"
                            )
                          }
                          maxLength={10}
                          isMandatory
                        />
                      </AddPartEachFieldDiv>
                    </FieldsDisplayFlex>
                    <FieldsDisplayFlex>
                      <PiSelectForm
                        name="priority"
                        label="Priority"
                        placeholder="Priority"
                        isMulti={false}
                        options={repairPriorityLevel}
                        classNamePrefix="react-select"
                        isDisabled={
                          !(
                            getUserLoggedPermission() === false ||
                            partDataById.is_edit
                          )
                        }
                      />
                      <PiInputForm
                        name="serial_number"
                        label="Serial No"
                        libraryType="atalskit"
                        type="text"
                        placeholder="Serial No"
                        isDisabled={!partDataById.is_edit}
                        isMandatory
                        maxLength={15}
                      />
                      {getUserLoggedPermission() &&
                        partDataById.status_code !== "receiving" && (
                          <PiInputForm
                            name="storage_location"
                            label="Storage Location"
                            libraryType="atalskit"
                            type="text"
                            placeholder="Storage Location"
                            isDisabled={
                              !(
                                getUserLoggedPermission() === false ||
                                partDataById.is_edit
                              )
                            }
                            isMandatory
                          />
                        )}
                    </FieldsDisplayFlex>

                    {partDataById.status_code !== "receiving" &&
                      getUserLoggedPermission() &&
                      partDataById.status_code !== "checkedin" &&
                      partDataById.status_code !== "pending_evaluation" && (
                        <RepairStatusRadio>
                          <div className="repair-Status-label">
                            Repair Status
                          </div>
                          <div
                            className={
                              getUserLoggedPermission() === false ||
                              partDataById.is_edit === false
                                ? "container disable-btns pointer-none"
                                : "container"
                            }
                          >
                            {repairTypeList.map((obj: any) => (
                              <div className="radio">
                                <input
                                  id={obj.id}
                                  name={obj.name}
                                  type="radio"
                                  onChange={(e) => {
                                    statusChange(e, obj.value);
                                  }}
                                  // className={true ? 'active' : null}
                                  checked={obj.checked}
                                />
                                <RadioLabel
                                  htmlFor={obj.htmlFor}
                                  className="radio-label"
                                >
                                  {obj.label}
                                </RadioLabel>
                              </div>
                            ))}
                          </div>
                        </RepairStatusRadio>
                      )}
                    <RmaFields style={{ paddingTop: "0px", gap: "16px" }}>
                      {getUserLoggedPermission() === true && (
                        <DateRangePickerDiv
                          style={{
                            width: "calc(50% - 8px)",
                            marginBottom: "8px",
                          }}
                          className={
                            getUserLoggedPermission() === false ||
                            !partDataById.is_edit
                              ? "dt-pkr-bg-unset"
                              : "dt-pkr-bg-unset"
                          }
                        >
                          <AsyncLabel
                            htmlFor="async-select-example"
                            // className="mandatory"
                          >
                            Approved Date
                          </AsyncLabel>
                          <div style={{ marginTop: "4px" }}>
                            <PiDatepickerForm
                              helpText=""
                              libraryType="atalskit"
                              name="delivery_due_date"
                              minDate={TodayDate}
                              // onChange={onDateChange}
                              // value={minDate}
                              placeholder="MM/DD/YYYY"
                              isDisabled={!partDataById.is_edit}
                            />
                          </div>
                        </DateRangePickerDiv>
                      )}
                      {getUserLoggedPermission() === true && (
                        <DateRangePickerDiv
                          style={{
                            width: "calc(50% - 8px)",
                            marginBottom: "8px",
                          }}
                          className={
                            getUserLoggedPermission() === false ||
                            !partDataById.is_edit
                              ? "dt-pkr-bg-unset"
                              : "dt-pkr-bg-unset"
                          }
                        >
                          <AsyncLabel
                            htmlFor="async-select-example"
                            // className="mandatory"
                          >
                            Date Promised
                          </AsyncLabel>
                          <div style={{ marginTop: "4px" }}>
                            <PiDatepickerForm
                              helpText=""
                              libraryType="atalskit"
                              name="date_promised"
                              minDate={TodayDate}
                              // onChange={onDateChange}
                              // value={minDate}
                              placeholder="MM/DD/YYYY"
                              isDisabled={!partDataById.is_edit}
                            />
                          </div>
                        </DateRangePickerDiv>
                      )}
                      <div className="width-50">
                        <PiInputForm
                          name="customer_po"
                          label="Customer PO"
                          type="text"
                          placeholder="Customer PO"
                          isDisabled={
                            !(
                              getUserLoggedPermission() === false ||
                              partDataById.is_edit
                            )
                          }
                          maxLength={15}
                        />
                      </div>
                      {partDataById.status_code !== "receiving" &&
                        getUserLoggedPermission() &&
                        partDataById.status_code !== "checkedin" &&
                        partDataById.status_code !== "pending_evaluation" && (
                          <>
                            {repairType === "repairable" && (
                              <>
                                <div className="width-50">
                                  <PiInputForm
                                    name="estimated_hrs"
                                    label="Estimated Repair Hrs"
                                    libraryType="atalskit"
                                    type="text"
                                    placeholder="Estimated Repair Hrs"
                                    isDisabled
                                  />
                                </div>

                                <div className="width-50 icon_input">
                                  <PiIconInputForm
                                    name="estimated_parts_cost"
                                    label="Estimated Parts Cost"
                                    placeholder="Estimated Parts Cost"
                                    maxLength={10}
                                    type="string"
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
                                    isDisabled
                                  />
                                </div>
                              </>
                            )}
                            {(repairType === "repairable" ||
                              repairType === "outsource") && (
                              <div className="width-50 icon_input">
                                <PiIconInputForm
                                  name="tech_sugg_price"
                                  label="Technician Suggested Price"
                                  placeholder="Technician Suggested Price"
                                  maxLength={10}
                                  type="string"
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
                                  isDisabled
                                />
                              </div>
                            )}
                          </>
                        )}
                      {partDataById.status_code !== "receiving" &&
                        getUserLoggedPermission() &&
                        partDataById.status_code !== "checkedin" && (
                          <div className="width-50">
                            <PiSelect
                              libraryType="atalskit"
                              variant="outlined"
                              name="select"
                              label="Assign Technician"
                              onChange={(e) => selectTechnician(e)}
                              value={selectedTechnician}
                              // defaultValue={}
                              options={usersList}
                              placeholder="Select"
                              formatOptionLabel={(data: any) =>
                                MemoizedFormatOptionLabel(data)
                              }
                              isDisabled={!partDataById.is_edit}
                              // classNamePrefix="pi-select-height-auto"
                            />
                          </div>
                        )}
                      {partDataById.status_code !== "receiving" &&
                        getUserLoggedPermission() &&
                        partDataById.status_code !== "checkedin" &&
                        selectedQC.label !== null && (
                          <div className="width-50">
                            <PiSelect
                              libraryType="atalskit"
                              variant="outlined"
                              name="select"
                              label="Assign QC"
                              value={selectedQC}
                              options={usersList}
                              placeholder="Select"
                              isDisabled
                            />
                          </div>
                        )}
                    </RmaFields>
                    {/* <EditorContainer
                          className={
                            partInfo.repairStatus === 'repair_in_progress'
                              ? 'item-specific-notes disable-btns pointer-none'
                              : 'item-specific-notes'
                          }
                        >
                          <AsyncLabel htmlFor="async-select-example">
                            Item Specific Notes
                          </AsyncLabel>
                          <PiEditor
                            libraryType="atalskit"
                            onChange={onChangeItemNotes}
                            value={itemNotes}
                          />
                        </EditorContainer> */}
                    {(partDataById.repair_status === "evaluation" ||
                      partDataById.repair_status === "pending_quote" ||
                      partDataById.evaluation_summary) && (
                      <FieldsDisplayFlex
                        style={{ flexDirection: "column", gap: "2px" }}
                      >
                        <Field name="evaluation_summary">
                          {({ field, meta }: any) => (
                            <>
                              <PiCheckBoxSelect
                                libraryType="atalskit"
                                variant="outlined"
                                name="evaluation_summary"
                                label="Summary"
                                onChange={(e) => selectSummary(e)}
                                // value={selectedSummary}
                                value={field.value}
                                // defaultValue={}
                                options={summaryList}
                                placeholder="Select"
                                classNamePrefix="pi-select-height-auto"
                                isMulti
                                isDisabled={!partDataById.is_edit}
                                isMandatory
                              />
                              <small className="validation-error">
                                {meta.touched && meta.error ? meta.error : ""}
                              </small>
                            </>
                          )}
                        </Field>
                      </FieldsDisplayFlex>
                    )}
                    <div
                      style={{
                        paddingTop: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      {/* <PiTextareaForm
                            name="item_notes"
                            label="Item Specific Notes"
                            libraryType="atalskit"
                            placeholder="Item Specific Notes"
                            defaultValue={initialValues.item_notes}
                            maxLength={50}
                            isDisabled={!partDataById.is_edit}
                          /> */}
                      <AsyncLabel htmlFor="async-select-example">
                        Item Specific Notes
                      </AsyncLabel>
                      <PiEditor
                        libraryType="atalskit"
                        onChange={onChangeItemSpecificNotes}
                        value={itemSpecificNotes}
                      />
                    </div>
                    <div style={{ paddingTop: "16px" }}>
                      <PiTextareaForm
                        name="description"
                        label="Description"
                        libraryType="atalskit"
                        placeholder="Description"
                        defaultValue={initialValues.description}
                        maxLength={255}
                        isDisabled={
                          !(
                            getUserLoggedPermission() === false ||
                            partDataById.is_edit
                          )
                        }
                      />
                    </div>
                    {partDataById.status_code !== "receiving" &&
                      partDataById.status_code !== "checkedin" &&
                      partDataById.status_code !== "pending_evaluation" && (
                        <EditorContainer
                          className="item-specific-notes"
                          style={{
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            position: "relative",
                          }}
                        >
                          <AsyncLabel htmlFor="async-select-example">
                            Technician Notes to Customer
                          </AsyncLabel>
                          <PiEditor
                            libraryType="atalskit"
                            onChange={onChangeItemNotes}
                            value={technote}
                            readOnly={
                              !(
                                getUserLoggedPermission() === false ||
                                partDataById.is_edit
                              )
                            }
                          />
                          {partDataById.technical_note && (
                            <PiTooltip
                              content="View Notes"
                              libraryType="atalskit"
                            >
                              <ShowContainer onClick={() => setOpenModel(true)}>
                                <img src={ShowMore} alt="loading" />
                              </ShowContainer>
                            </PiTooltip>
                          )}
                        </EditorContainer>
                      )}
                  </ThreeByThreeField>
                </AddPartItemContainer>
                <UploadWrapper
                  className={
                    partInfo.repairStatus === "repair_in_progress"
                      ? "item-specific-notes"
                      : "item-specific-notes"
                  }
                  style={{ paddingTop: "16px" }}
                >
                  <H4Heading>Upload Documents</H4Heading>
                  <div
                    className={!partDataById.is_edit ? "disable-upload" : ""}
                  >
                    <PiUploader
                      dropzoneProps={{
                        accept: ["image/*", "application/pdf"],
                        disabled: !partDataById.is_edit,
                        maxSize: 10485760,
                        multiple: true,
                        noDrag: false,
                        text: <UploaderText />,
                      }}
                      onUpload={(e: Array<File>) => onDrop(e)}
                    />
                  </div>
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
                        {partDataById.is_edit && (
                          <CloseIconRight
                            title="Delete"
                            onClick={() => deleteServerImage(obj.id)}
                          >
                            <img src={CrossLogo} alt="loading" />
                          </CloseIconRight>
                        )}
                      </UploadedDataContainer>
                    ))}
                  {uploadList.map((obj: any) => {
                    console.log(obj);

                    return (
                      <UploadedDataContainer>
                        <FileItemList>
                          <UploadedDefaultImg
                            src={getImageType(obj.type, obj.blob_image)}
                            alt="loading"
                          />
                          <UploadFileName>{obj.name}</UploadFileName>

                          <PreviewText
                            onClick={() => previewFileBeforeSave(obj)}
                          >
                            Preview
                          </PreviewText>

                          <UploadFileSize>{`${obj.filesize} KB`}</UploadFileSize>
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
              </FormBodyOverFlow>
              <SideDrawerFooter>
                {serverMsg && (
                  <div className="server-msg" title={serverMsg}>
                    {serverMsg}
                  </div>
                )}
                <PiButton
                  appearance="primary"
                  label={`${partInfo && partInfo.title === "Add" ? "Add Items" : "Save"}`}
                  onClick={formikProps.handleSubmit}
                  isLoading={btnLoading}
                  isDisabled={!partDataById.is_edit}
                  // isDisabled={!formik.dirty}
                />
              </SideDrawerFooter>
            </>
          )}
        </Formik>
      )}
      {/* {openSnackbar && (
        <Snackbar
          message={toastMsg}
          triggerEvent={async () => setSnackbar(false)}
        />
      )} */}
      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel={toastMsg}
        message=""
        onClose={async () => setSnackbar(false)}
      />
      {/* {openConFirm && (
        <ConfirmPopup
          confirmText={confirmText}
          sendModelData={getConfirmModelEvent}
        ></ConfirmPopup>
      )} */}
      <PiConfirmModel
        className={openConFirm ? "show" : ""}
        headerLabel="Confirmation"
        message={confirmText}
        primaryBtnLabel="Accept"
        secondaryBtnLabel="Decline"
        onClose={() => {
          setConFirm(false);
        }}
        onAccept={(e: any) => getConfirmModelEvent(e)}
        onDecline={() => {
          setConFirm(false);
        }}
      />

      {openModel && (
        <TechNotesView
          title="Technician Notes to Customer"
          notesFor="repair-request"
          technote={technote}
          detailViewNotes={partDataById}
          sendData={triggerUpdatedNotes}
        />
      )}
    </>
  );
}

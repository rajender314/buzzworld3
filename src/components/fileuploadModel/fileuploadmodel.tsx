import { useState, useEffect, useRef } from "react";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import ArrowLeftIcon from "@atlaskit/icon/glyph/arrow-left";
import { GridReadyEvent } from "ag-grid-community";
import {
  PiTypography,
  PiModal,
  PiModalHeader,
  PiModalBody,
  PiButton,
  PiFleUploader,
  PiModalFooter,
  PiSelect,
  PiCheckbox,
  PiDatePicker,
  PiLabelName,
  PiGrid,
  PiSpinner,
} from "pixel-kit";
import {
  UploadNote,
  UploadDiv,
  ErrorLogDiv,
  ErrorlogPanel,
  DragSection,
  ProductsListDiv,
  DatePickerDiv,
  RowContainer,
  ServerValidation,
  DateStyles,
  CodeMismatchError,
  InsideHeaderLabel,
  InsideHeaderLabelTwo,
  ButtonDivTag,
  TextEle,
  PopupHeaderDiv,
  ImportPopupContainer,
  ImportFileFooter,
  PricingDisclaimer,
  SpinnerDiv,
  DownloadIconContainer,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import {
  ApiResponse,
  BranchListProps,
  UserListProps,
} from "@app/services/schema/schema";
import crossImg from "@app/assets/images/cross.svg";

import { triggerApi, token } from "@app/services/api-services";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { AsyncSelect } from "@atlaskit/select";
import { getFilterSupplierData } from "@app/helpers/helpers";
import DownLoad from "@app/assets/images/download-doc.svg";
import {
  ExportIconPopup,
  ExportIconPopupHeader,
} from "../secondaryheader/secondaryheader.component";
import {
  CloseButton,
  HeaderText,
} from "../adminaddrowmodel/adminaddrowmodel.component";
import FileUploadElement from "./file-upload-element";
import { AsyncLabel } from "../rmaModel/RmaModel.component";

type Props = {
  // reqInfo: ReqInfoProps
  onFileSelect: any;
  // vendorName: any
};

export default function FileUploadModel({ onFileSelect }: Props) {
  const [openModel, setOpenModel] = useState(false);
  const [headerLabel, setHeaderLabel] = useState<string>("Upload Files");
  // const [progressState, setProgressState] = useState(0);
  const [fileValidationError, setFileValidationError] = useState("");
  const [discountData, setDiscountData] = useState({});
  const [pricingdata, setPricingData] = useState({});
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [errorLogMsg, setErrorLogMsg] = useState("");
  const [prodUpdatedMsg, setProdUpdatedMsg] = useState("");
  const [prodAddedMsg, setProdAddedMsg] = useState("");
  const [addProductsList, setAddProductsList] = useState([]);
  const [UpdatedproductsList, setUpdatedProductsList] = useState([]);
  const [discountProductsMsg, setDiscountProductsMsg] = useState<string>("");
  const [fileName, setFileName] = useState("");
  const [openImportingDataPopupModel, setOpenImportingDataPopupModel] =
    useState(false);
  const [priceFileName, setPriceFileName] = useState("");
  const [TodayDate, SetTodayDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const { current }: any = useRef({ timer: 0 });
  let gridEvent: GridReadyEvent;
  const [rowLength, setRowLength] = useState(0);
  const [pricingFileValidationError, setPricingFileValidationError] =
    useState("");
  const [serverMsg, setServerMsg] = useState<any>(null);
  const [branchList, setBranchList] = useState<Array<UserListProps>>([]);
  const [branchValue, setBranchValue]: any = useState(null);
  const [disableProceed, setDisableProceed] = useState(true);
  const [viewMoreBtn, setviewMoreBtn] = useState("View-More");
  const [loader, setLoader] = useState(false);
  const [discountChecked, setDiscountChecked] = useState(false);
  const [pricingChecked, setPricingChecked] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [isStartDate, setIsStartdate] = useState(false);
  const [isEndDate, setIsEnddate] = useState(false);
  const [priceTempTable, setPriceTempTable] = useState(null);
  const [discountTempTable, setDiscountTempTable] = useState(null);
  const [discountCodeParam, setDiscountCodeParam] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pricingImgName, setPricingImgName] = useState("");
  const [originalImgName, setOriginalImgName] = useState("");
  const [sampleHeaders, setSampleHeaders] = useState([]);
  const [uploadedErrors, setUploadedError] = useState([]);
  const [errorType, setErrorType] = useState<string>("");
  const [existingcode, setExistingcode] = useState<string>("");
  const [uplpoadedcode, setUploadedcode] = useState<string>("");
  const [errorLog, setErrorLog] = useState<string>("");
  const [errorColumnData, setErrorColumnData] = useState([]);
  const [errorRowData, setErrorRowData] = useState([]);
  const [cloneRowData, setCloneRowData] = useState([]);
  function getBranchList() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.PricingBranches}?status[0]=true`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          let branchListdata = response.result.data.list;

          let list = [];
          list = branchListdata.map((item: BranchListProps) => ({
            label: item.name,
            value: item.id,
            ...item,
          }));
          branchListdata = list;
          setBranchList(branchListdata);
          setTimeout(() => {}, 500);
          setBranchValue(response.result.data.is_default);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  function getVendorList() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.PricingAllVendors}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          let vendorList = response.result.data.list;

          let list = [];
          list = vendorList.map((item: BranchListProps) => ({
            label: item.name,
            value: item.id,
            ...item,
          }));
          vendorList = list;
          console.log(list);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
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

    setOpenModel(true);
    getBranchList();
    getVendorList();
  }, []);

  const onGridReady = async (params: GridReadyEvent) => {
    gridEvent = params;
  };

  function closeModel() {
    setOpenModel(false);
    if (onFileSelect()) {
      setOpenImportingDataPopupModel(false);
    }
    onFileSelect({});
  }

  function selectBranch(e: any) {
    setBranchValue(e);

    if (
      (pricingFileValidationError === "Pricing File Uploaded" && branchValue) ||
      (fileValidationError === "Discount File Uploaded" && branchValue)
    ) {
      setDisableProceed(false);
    } else {
      setDisableProceed(true);
    }
  }
  const [selectedNewVendor, setSelectedNewVendor]: any = useState();
  const selectVendor = (e: any) => {
    setServerMsg(null);
    if (e) {
      const obj: any = {
        value: e.id,
        label: e.name,
        is_different_pricing: e.is_different_pricing,
      };
      setSelectedNewVendor(obj);
    } else {
      setSelectedNewVendor(null);
    }
  };
  let fileuploadStatus: boolean;
  function fileUpload(files: any, type: string) {
    setLoader(true);
    const formData = new FormData();

    formData.append("files", files[0]);
    formData.append("type", type);

    const apiObject = {
      payload: formData,
      method: "POST",
      apiUrl: `${EndpointUrl.uploadFileApi}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setLoader(false);
          if (type === "discount") {
            const obj = {
              ...response.result.data,
              is_append: discountChecked,
            };
            setDiscountData(obj);
            setFileName(files[0].name);
            setFileValidationError("Discount File Uploaded");
          }
          if (type === "pricing") {
            const obj = {
              ...response.result.data,
              is_append: pricingChecked,
            };
            setPricingData(obj);
            setPriceFileName(files[0].name);
            setPricingFileValidationError("Pricing File Uploaded");
          }
          fileuploadStatus = true;

          setDisableProceed(false);
        } else {
          setLoader(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fileuploadStatus);
      }, 500);
    });
  }

  async function onDrop(files: any, filetype: string) {
    console.log(files, filetype);
    if (
      files[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      files[0].type === "text/csv" ||
      files[0].type === "application/vnd.ms-excel"
    ) {
      // setProgressState(0.8);
      if (files.length > 0) {
        await fileUpload(files, filetype);
      }
    } else {
      if (filetype === "discount") {
        setFileValidationError("Invalid File");
      }
      if (filetype === "pricing") {
        setPricingFileValidationError("Invalid File");
      }
    }
  }

  function proceed() {
    if (startDate.length === 0) {
      setIsStartdate(true);
    } else {
      setIsStartdate(false);
    }
    if (endDate.length === 0) {
      setIsEnddate(true);
    } else {
      setIsEnddate(false);
    }

    if (startDate.length !== 0 && endDate.length !== 0) {
      setHeaderLabel("Import Data");
      const val: any = {
        discount_codes_data: discountCodeParam,
        price_list_data: {
          temp_table: priceTempTable,
          is_append: pricingChecked,
          image_name: pricingImgName,
          original_filename: originalImgName,
        },
        vendor_id: selectedNewVendor.value,
        branch_id: branchValue.value,
        start_date: startDate,
        end_date: endDate,
      };
      if (discountTempTable === null) {
        console.log(val, 349);
        delete val.discount_codes_data;
      }
      const apiObject = {
        payload: val,
        method: "POST",
        apiUrl: `${EndpointUrl.importProductsExcelApi}`,
        headers: {},
      };
      triggerApi(apiObject).then((response: ApiResponse) => {
        if (response.result.success) {
          setOpenModel(false);
          setOpenImportingDataPopupModel(true);
        } else {
          setServerError(response.result.data);
          setOpenImportingDataPopupModel(false);
        }
      });
    }
  }

  function closeImportPopup() {
    setOpenImportingDataPopupModel(false);
    const val = {
      vendor_id: selectedNewVendor.value,
      branch_id: branchValue.value,
      vendor_name: selectedNewVendor.label,
      type: "file_import",
    };
    onFileSelect(val);
  }
  function proceedToSummary() {
    console.log(branchValue);
    setLoader(true);
    setIsBtnLoading(true);
    if (!selectedNewVendor) {
      setServerMsg("Please select Vendor");
      setLoader(false);
      setIsBtnLoading(false);
      return;
    }
    setServerMsg(null);

    const val = {
      discount_codes_data: discountData,
      price_list_data: pricingdata,
      vendor_id: selectedNewVendor.value,
      branch_id: branchValue ? branchValue.value : "",
    };
    const apiObject = {
      payload: val,
      method: "POST",
      apiUrl: `${EndpointUrl.importFileValidation}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setLoader(false);
          if (!response.result.data.error) {
            // console.log(1111111111111111);
            setHeaderLabel("Summary");
            setIsBtnLoading(false);
            if (response.result.data.price_list) {
              setProdAddedMsg(
                response.result.data.price_list.new_products.message
              );
              setProdUpdatedMsg(
                response.result.data.price_list.changes.message
              );
              setAddProductsList(
                response.result.data.price_list.new_products.list
              );
              setUpdatedProductsList(
                response.result.data.price_list.changes.list
              );
              setPriceTempTable(response.result.data.price_list.temp_table);
              setPricingImgName(response.result.data.price_list.image_name);
              setOriginalImgName(
                response.result.data.price_list.original_filename
              );
            }
            setStartDate(
              response.result.data.start_date
                ? response.result.data.start_date
                : startDate
            );
            setEndDate(
              response.result.data.end_date
                ? response.result.data.end_date
                : endDate
            );
            if (response.result.data.discount_codes) {
              setDiscountProductsMsg(
                response.result.data.discount_codes.new_products.message
              );
              console.log(response.result.data.discount_codes.temp_table, 446);
              setDiscountTempTable(
                response.result.data.discount_codes.temp_table
              );
              const obj = {
                ...response.result.data.discount_codes,
                is_append: discountChecked,
              };
              delete obj.new_products;
              setDiscountCodeParam(obj);
            }
          } else {
            setHeaderLabel("Error Log");
            setErrorLogMsg(response.result.data.message);
            setSampleHeaders(response.result.data.sample_headers);
            setUploadedError(response.result.data.uploaded_headers);
            setIsBtnLoading(false);
            setErrorType(response.result.data.type);
            setUploadedcode(response.result.data.uploaded_code);
            setExistingcode(response.result.data.existing_code);
            setErrorLog(response.result.data.error_log);
            setErrorColumnData(response.result.data.column_data);
            setCloneRowData(response.result.data.row_data);

            let data = [];
            data = response.result.data.row_data.slice(0, 7);
            setErrorRowData(data);
            const len = response.result.data.row_data.length;
            setRowLength(len);
          }
        } else {
          setLoader(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  async function onBtnExport() {
    setErrorRowData(cloneRowData.slice());
    const params: any = {
      skipHeader: false,
      skipFooters: true,
      allColumns: true,
      onlySelected: false,
      suppressQuotes: true,
      // eslint-disable-next-line no-useless-concat
      fileName: `${selectedNewVendor.value}` + "error.xlsx",
      columnSeparator: ",",
      exportedRows: "all",
    };
    gridEvent.api.exportDataAsExcel(params);
  }

  function backView(label: string) {
    console.log(label);
    if (label === "Error Log" || label === "Summary") {
      setHeaderLabel("Upload Files");
    }
    if (label === "Products List") {
      setHeaderLabel("Summary");
    }
    if (label === "Import Data") {
      setHeaderLabel("Summary");
    }
  }

  function discountCheckBox(e: any) {
    setDiscountChecked(e.target.checked);
    const obj = {
      ...discountData,
      is_append: discountChecked,
    };
    setDiscountData(obj);
  }

  async function viewMoreItems() {
    setviewMoreBtn(viewMoreBtn === "View-Less" ? "View-More" : "View-Less");
    // exportData();
    // onBtnExport();
    if (viewMoreBtn === "View-Less") {
      setErrorRowData(cloneRowData.slice());
    } else {
      setErrorRowData(cloneRowData.slice(0, 5));
    }
    return cloneRowData;
  }

  function pricingCheckBox(e: any) {
    setPricingChecked(e.target.checked);
    const obj = {
      ...pricingdata,
      is_append: pricingChecked,
    };
    setPricingData(obj);
  }

  function selectStartDate(e: any) {
    setStartDate(e);
    setIsStartdate(false);
    setMinDate(e);
  }
  function selectEndDate(e: any) {
    setEndDate(e);
    setIsEnddate(false);
  }

  const handleOrgInputChange = (newValue: string) => {
    console.log(newValue);
    return newValue;
  };

  const promiseSupplierOptions = (inputValue: string, flag: string) =>
    new Promise((resolve) => {
      if (current.timer) clearTimeout(current.timer);
      current.timer = setTimeout(() => {
        if (flag === "supplierlist") {
          resolve(
            getFilterSupplierData(inputValue, EndpointUrl.PricingAllVendors)
          );
        }
      }, 1000);
    });
  const baseUrl = process.env.REACT_APP_API_URL;

  const sampleDownload = (type: any) => {
    setLoader(true);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.ImportPricing}?type=${type}&token=${token}`,
      headers: {},
    };

    triggerApi(apiObject)
      .then(() => {
        setLoader(false);
        const exportUrl = `${EndpointUrl.ImportPricing}?type=${type}&token=${token}`;
        window.location.href = baseUrl + exportUrl;

        //  if (response.result.success) {
        //    setOpacity(false);
        //    sendModelData({ success: true, Id: response.result.data });
        //    setServerMsg(null);
        //    setOpacity(false);
        //  } else {
        //    setServerMsg(response.result.data);
        //    setOpacity(false);
        //  }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  return (
    <>
      {openImportingDataPopupModel === true && (
        <>
          {/* <ProgressPercent>
                {progressState * 100}% Completed
              </ProgressPercent>
              <SuccessProgressBar value={progressState} /> */}
          {/* <SpinnerDiv>
                <PiSpinner color="primary" size={40} libraryType="atalskit" />
                <p>Importing Data...</p>
              </SpinnerDiv> */}

          <PiModal isOpen={openImportingDataPopupModel}>
            <ExportIconPopupHeader>
              <PiModalHeader>
                <PopupHeaderDiv>
                  <PiTypography component="h3">
                    Imported Data Successfully
                  </PiTypography>
                  <CloseButton
                    onClick={() => closeImportPopup()}
                    title="close"
                    className="Hover"
                  >
                    {" "}
                    <img src={crossImg} alt="loading" />{" "}
                  </CloseButton>
                </PopupHeaderDiv>
              </PiModalHeader>
              <hr />
            </ExportIconPopupHeader>
            <PiModalBody>
              <ExportIconPopup>
                <p>
                  Import process is in progress. An email is sent to your
                  Registered Email.
                </p>
              </ExportIconPopup>
            </PiModalBody>
          </PiModal>
        </>
      )}
      <PiModal isOpen={openModel} width={1000}>
        <ExportIconPopupHeader>
          <PiModalHeader>
            {headerLabel && (
              <PopupHeaderDiv className="Upload-files">
                {headerLabel !== "Upload Files" && (
                  <div
                    className="Back-arrow"
                    onClick={() => backView(headerLabel)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        backView(headerLabel);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Back"
                  >
                    <ArrowLeftIcon label="" />
                  </div>
                )}
                <h3
                  title={headerLabel === "Error Log" ? errorLog : headerLabel}
                >
                  {headerLabel === "Error Log" ? errorLog : headerLabel}
                </h3>
                <CloseButton
                  onClick={() => closeModel()}
                  title="close"
                  className="Hover"
                >
                  <img src={crossImg} alt="loading" />
                </CloseButton>
              </PopupHeaderDiv>
            )}
          </PiModalHeader>
          <hr />
        </ExportIconPopupHeader>
        <PiModalBody>
          {headerLabel === "Upload Files" && (
            <>
              {/* <UploadModalTitle>
                <PiTypography component="h4">Upload Files</PiTypography>
                <UploadImgDiv src={crossImg} onClick={closeModel} />
              </UploadModalTitle> */}
              {/* <DragSection>
                <PiSelect
                  label="Select Branch"
                  libraryType="atalskit"
                  name="select"
                  defaultValue={selectedBrnch}
                  onChange={(e: any) => selectBranch(e)}
                  // value={branchValue}
                  options={branchList}
                  placeholder="Select Branch"
                />
              </DragSection> */}
              <ImportPopupContainer>
                <div className="branch">
                  <div className="selectParentDiv" style={{ gap: "16px" }}>
                    <div className="select-container">
                      <div className="select-width pi-select-wrapper">
                        <AsyncLabel
                          htmlFor="async-select-example"
                          className="css-re7y6x"
                        >
                          Vendor
                        </AsyncLabel>
                        <AsyncSelect
                          name="supplier"
                          inputId="async-select-example"
                          onInputChange={handleOrgInputChange}
                          loadOptions={(e: any) =>
                            promiseSupplierOptions(e, "supplierlist")
                          }
                          placeholder="Search"
                          classNamePrefix="react-select"
                          // onChange={(value) => {
                          //  setFieldValue(`organizations_id`, value)
                          //  HandleChange(value)
                          // }}
                          value={selectedNewVendor}
                          onChange={selectVendor}
                          noOptionsMessage={(obj: any) =>
                            !obj.inputValue
                              ? "Search Supplier Name"
                              : " Supplier Not Found"
                          }
                        />
                      </div>
                    </div>
                    {/* {selectedNewVendor && !selectedNewVendor.is_different_pricing && (
                      <div className="checkbox-field">
                        <div className="width-100 checkbox-form-field">
                          <PiCheckbox
                            helpText=""
                            isChecked={differentPricing}
                            label="Is Different Pricing"
                            libraryType="atalskit"
                            name="is_different_pricing"
                            onChange={(e: any) => onNcrChanged(e)}
                            size="medium"
                          />
                        </div>
                      </div>
                    )} */}
                    <div className="select-container">
                      <div className="select-width pi-select-wrapper">
                        <AsyncLabel
                          htmlFor="async-select-example"
                          className="css-re7y6x"
                        >
                          Branch
                        </AsyncLabel>
                        <PiSelect
                          libraryType="atalskit"
                          variant="outlined"
                          name="select"
                          // defaultValue={selectedBrnch}
                          onChange={(e) => selectBranch(e)}
                          value={branchValue}
                          options={branchList}
                          placeholder="Select Branch"
                          classNamePrefix="react-select"
                          isDisabled={loader}
                          noOptionsMessage={() => "Branch Not Found"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <PricingDisclaimer>
                  {selectedNewVendor &&
                    selectedNewVendor.is_different_pricing === "Yes" && (
                      <div className="message">
                        This vendor has different pricing by Branch
                      </div>
                    )}
                </PricingDisclaimer>
                <RowContainer>
                  <DragSection className="file-import-box">
                    <p className="file-type-label">Upload Discount File</p>

                    <UploadDiv>
                      {/* <div
                        className="icon_container "
                        onClick={() => {
                          console.log((e: DragEvent) => onDrop(e, "discount"));
                        }}
                      >
                        {/* <UploadIcon src={uploadImg} onClick={() => {}} /> */}

                      {/* <img src={uploadImg} alt="" /> */}
                      {/* </div> */}

                      <HeaderText>
                        <PiFleUploader
                          dropzoneProps={{
                            disabled: loader,
                            maxSize: 94371840,
                            multiple: true,
                            noDrag: false,
                            text: <FileUploadElement />,
                          }}
                          onUpload={(e: DragEvent) => onDrop(e, "discount")}
                        />
                      </HeaderText>
                      {/* {filetype === "discount" && ( */}
                      <>
                        <p
                          className="uploaded-file-name"
                          style={{ textAlign: "center", margin: "5px 0px" }}
                        >
                          {fileName}
                        </p>

                        <p
                          className={
                            fileValidationError === "Invalid File"
                              ? "invalid-file-error"
                              : "valid-file"
                          }
                        >
                          {fileValidationError}
                        </p>
                      </>
                      {/* )} */}

                      <UploadNote>
                        (Maximum file size 90MB, Supported file formats XLSX,
                        CSV)
                      </UploadNote>
                      <DownloadIconContainer
                        onClick={() => {
                          sampleDownload("discount_import");
                        }}
                      >
                        <span>Sample File</span>{" "}
                        <img src={DownLoad} alt="loading" />
                      </DownloadIconContainer>
                    </UploadDiv>
                    <PiCheckbox
                      helpText=""
                      isChecked={discountChecked}
                      label="Append to Existing List"
                      libraryType="atalskit"
                      name="checkbox"
                      onChange={(e: any) => discountCheckBox(e)}
                      size="large"
                    />
                    {/* <BrowseBtn>
                      <p className="browse-text">Browse</p>
                      <InputEle
                        type="file"
                        onChange={(e: any) => onFileChange(e, "discount")}
                        multiple
                      />
                    </BrowseBtn> */}
                  </DragSection>
                  <DragSection className="file-import-box">
                    <p className="file-type-label">Upload Pricing File</p>

                    <UploadDiv>
                      {/* <div
                        className="icon_container "
                        onClick={() => {
                          console.log((e: DragEvent) => onDrop(e, "discount"));
                        }}
                      >
                        <UploadIcon src={uploadImg} onClick={() => {}} />
                      </div> */}

                      {/* <img src={uploadImg} alt="" /> */}

                      {/* <UploadIconNext src={uploadImg} /> */}
                      <HeaderText>
                        <PiFleUploader
                          dropzoneProps={{
                            disabled: loader,
                            maxSize: 94371840,
                            multiple: true,
                            noDrag: false,
                            text: <FileUploadElement />,
                          }}
                          onUpload={(e: DragEvent) => onDrop(e, "pricing")}
                        />
                      </HeaderText>
                      {/* {filetype === "pricing" && ( */}
                      <>
                        <p
                          className="uploaded-file-name"
                          style={{ textAlign: "center", margin: "5px 0px" }}
                        >
                          {priceFileName}
                        </p>
                        <p
                          className={
                            pricingFileValidationError === "Invalid File"
                              ? "invalid-file-error"
                              : "valid-file"
                          }
                        >
                          {pricingFileValidationError}
                        </p>
                      </>
                      {/* )} */}

                      <UploadNote>
                        (Maximum file size 90MB, Supported file formats XLSX,
                        CSV)
                      </UploadNote>

                      <DownloadIconContainer
                        onClick={() => {
                          sampleDownload("price_import");
                        }}
                      >
                        <span>Sample File</span>{" "}
                        <img src={DownLoad} alt="loading" />
                      </DownloadIconContainer>
                    </UploadDiv>
                    <TextEle>
                      <PiCheckbox
                        helpText=""
                        isChecked={pricingChecked}
                        label="Append to Existing List"
                        libraryType="atalskit"
                        name="checkbox"
                        onChange={(e: any) => pricingCheckBox(e)}
                        size="large"
                      />
                    </TextEle>
                    {/* <BrowseBtn>
                      <p className="browse-text">Browse</p>
                      <InputEle
                        type="file"
                        onChange={(e: any) => onFileChange(e, "pricing")}
                        multiple
                      />
                    </BrowseBtn> */}
                  </DragSection>
                  {loader && (
                    <SpinnerDiv
                      style={{ position: "absolute", left: "50%", top: "0" }}
                    >
                      <PiSpinner
                        color="primary"
                        size={40}
                        libraryType="atalskit"
                      />
                    </SpinnerDiv>
                  )}
                </RowContainer>
              </ImportPopupContainer>
            </>
          )}
          {headerLabel === "Summary" && (
            <>
              <DatePickerDiv>
                <DateStyles>
                  <PiLabelName label="Start Date" />
                  <PiDatePicker
                    dateFormat="MM/DD/YYYY"
                    // helpText=""
                    // label="Start Date"
                    libraryType="atalskit"
                    name="datePicker"
                    minDate={TodayDate}
                    defaultValue={minDate}
                    onChange={(e: any) => selectStartDate(e)}
                    onKeyDown={() => {}}
                    value={startDate}
                    placeholder="MM/DD/YYYY"
                  />
                  {isStartDate && <small>Please select Start Date</small>}
                </DateStyles>
                <DateStyles>
                  <PiLabelName label="End Date" />
                  <PiDatePicker
                    dateFormat="MM/DD/YYYY"
                    // helpText=""
                    // label="End Date"
                    libraryType="atalskit"
                    name="datePicker"
                    onChange={(e: any) => selectEndDate(e)}
                    onKeyDown={() => {}}
                    value={endDate}
                    minDate={minDate}
                    placeholder="MM/DD/YYYY"
                  />
                  {isEndDate && <small>Please select End Date</small>}
                </DateStyles>
              </DatePickerDiv>

              <ErrorlogPanel>
                <p className="prod-label">Added Discount Products</p>
                <ErrorLogDiv>
                  <div className="log-status-text">{discountProductsMsg}</div>
                </ErrorLogDiv>
              </ErrorlogPanel>

              <ErrorlogPanel>
                <p className="prod-label">Added Pricing Products</p>
                <ErrorLogDiv>
                  <div className="log-status-text success-log-text">
                    {prodAddedMsg}
                  </div>
                </ErrorLogDiv>
              </ErrorlogPanel>
              <ErrorlogPanel>
                <p className="prod-label">Updated Pricing Products</p>
                <ErrorLogDiv>
                  <div className="log-status-text success-log-text">
                    {prodUpdatedMsg}
                  </div>
                </ErrorLogDiv>
              </ErrorlogPanel>
              {/* <PiButton
                className="viewerror-text"
                appearance="secondary"
                label="View Products"
                libraryType="atalskit"
                onClick={viewErrorLog}
              /> */}
            </>
          )}
          {headerLabel === "Error Log" && (
            <>
              {/* <ErrorlogPanel>
                <ErrorLogDiv className="error-msg">
                  <ErrorIcon label="" />
                  <div className="error-log-text">{errorLogMsg}</div>
                </ErrorLogDiv>

                <ol>{errorList && errorList.map(error => <li>{error}</li>)}</ol>

              </ErrorlogPanel> */}
              <ErrorlogPanel>
                <ErrorLogDiv className="error-msg">
                  <ErrorIcon label="" />
                  <div className="error-log-text">{errorLogMsg}</div>
                </ErrorLogDiv>

                {errorType === "code_mismatch" && (
                  <CodeMismatchError>
                    <InsideHeaderLabel>
                      <PiLabelName
                        description={existingcode}
                        label="Existing Code"
                      />
                    </InsideHeaderLabel>
                    <InsideHeaderLabelTwo>
                      <PiLabelName
                        description={uplpoadedcode}
                        label="Uploaded Code"
                      />
                    </InsideHeaderLabelTwo>
                  </CodeMismatchError>
                )}
                {errorType === "list" && (
                  <>
                    <div className="grid-div">
                      <PiGrid
                        className="model-ag-grid"
                        columns={errorColumnData}
                        mode="static"
                        rowData={errorRowData}
                        onGridReady={onGridReady}
                        rowHeight={32}
                      />
                    </div>
                    <ButtonDivTag>
                      {/* {viewMoreBtn !== "View Less" ? */}
                      <PiButton
                        appearance="link"
                        label={rowLength > 5 ? viewMoreBtn : ""}
                        onClick={() => viewMoreItems()}
                      />
                      <div className="Export-link">
                        <PiButton
                          appearance="link"
                          label="Export"
                          onClick={() => onBtnExport()}
                        />
                      </div>

                      {/* : */}
                      {/* <> */}
                      {/* <PiButton
                            appearance="link"
                            label={viewMoreBtn}
                            onClick={viewMoreItems}
                          /> */}
                      {/* <div className="Button-Icon-Display">
                        <LinkWithIcon
                          href="javascript:void(0)"
                          // href={baseUrl + exportUrl}
                          onClick={onBtnExport}
                        >
                          <ImgTag
                            src={ExportLogo}
                            className="save-view Export-Image"
                          />
                          <span className="link-icon-text">Export</span>
                        </LinkWithIcon>
                      </div> */}

                      {/* </> */}
                      {/* } */}
                    </ButtonDivTag>
                  </>
                )}
                {errorType === "headers_mismatch" && (
                  <>
                    <p className="format-label">Sample Format</p>
                    <div className="overflow-table">
                      <table className="table error-list-table">
                        <thead>
                          <tr>
                            {sampleHeaders &&
                              sampleHeaders.map((error: any) => (
                                <th
                                  className={
                                    error.missing
                                      ? "error-mismatch"
                                      : "error-name"
                                  }
                                >
                                  {error.name}
                                </th>
                              ))}
                          </tr>
                        </thead>
                      </table>
                    </div>
                    <p className="format-label">Uploaded Format</p>
                    <div className="overflow-table">
                      <table className="table error-list-table">
                        <thead>
                          <tr>
                            {uploadedErrors &&
                              uploadedErrors.map((error: any) => (
                                <th
                                  className={
                                    error.missing
                                      ? "error-mismatch"
                                      : "error-name"
                                  }
                                >
                                  {error.name}
                                </th>
                              ))}
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </>
                )}
              </ErrorlogPanel>
            </>
          )}
          {headerLabel === "Products List" && (
            <>
              {addProductsList && addProductsList.length && (
                <>
                  <p className="prod-label">Added Products</p>

                  <ProductsListDiv>
                    <ol>
                      {addProductsList &&
                        addProductsList.map((prod) => <li>{prod}</li>)}
                    </ol>
                  </ProductsListDiv>
                </>
              )}
              {UpdatedproductsList && UpdatedproductsList.length > 0 && (
                <>
                  <p className="prod-label">Updated Products</p>

                  <ErrorlogPanel>
                    <ol>
                      {UpdatedproductsList &&
                        UpdatedproductsList.map((prod) => <li>{prod}</li>)}
                    </ol>
                  </ErrorlogPanel>
                </>
              )}
            </>
          )}
        </PiModalBody>
        {headerLabel === "Upload Files" && (
          <ImportFileFooter className="footer" style={{ position: "relative" }}>
            {serverMsg && (
              <div className="server-msg" title={serverMsg}>
                {serverMsg}
              </div>
            )}
            <PiModalFooter>
              {/* <PiButton
                appearance="secondary"
                label="Cancel"
                onClick={closeModel}
              /> */}
              <PiButton
                appearance="primary"
                label="Import"
                libraryType="atalskit"
                // isLoading={isBtnLoading ? true : false}
                isDisabled={disableProceed || isBtnLoading || loader}
                className="proceed-btn"
                onClick={() => proceedToSummary()}
              />
            </PiModalFooter>
          </ImportFileFooter>
        )}
        {headerLabel === "Summary" && (
          <PiModalFooter>
            {/* <PiButton
              appearance="secondary"
              label="Cancel"
              onClick={closeModel}
            /> */}
            <PiButton
              appearance="primary"
              label="Proceed"
              onClick={() => proceed()}
              // isDisabled={!startDate.length || !endDate.length}
            />
          </PiModalFooter>
        )}
        {headerLabel === "Import Data" && (
          <>
            <PiModalBody>
              <ExportIconPopup>
                <p>
                  {" "}
                  The import process will be running in the background. Once
                  complete, a mail will be sent to your registered email
                </p>
              </ExportIconPopup>
            </PiModalBody>
            <PiModalFooter>
              <ServerValidation className="serverErrorValidation">
                {serverError}
              </ServerValidation>
              {/* <PiButton appearance="primary" label="Close" onClick={closeModel} /> */}
              {/* <PiButton
              className="roll-back"
              appearance="secondary"
              label="Roll Back"
              onClick={upload}
            /> */}
            </PiModalFooter>
          </>
        )}
      </PiModal>
    </>
  );
}

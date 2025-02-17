import {
  PiButton,
  PiFleUploader,
  PiGrid,
  PiLabelName,
  PiModal,
  PiSpinner,
  PiTypography,
} from "pixel-kit";
import { Fragment, useEffect, useState } from "react";
import {
  CloseButton,
  HeaderText,
} from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import {
  ButtonDivTag,
  CodeMismatchError,
  DownloadIconContainer,
  DragSection,
  ErrorLogDiv,
  ErrorlogPanel,
  ImportPopupContainer,
  InsideHeaderLabel,
  InsideHeaderLabelTwo,
  RowContainer,
  SpinnerDiv,
  UploadDiv,
  UploadNote,
} from "@app/components/fileuploadModel/fileuploadModel.component";
import FileUploadElement from "@app/components/fileuploadModel/file-upload-element";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { token, triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import { QuotePopupHeaderContainer } from "@app/components/Quote-components/Forms/PartQuote/part-quote.component";
import { SideDrawerHeader } from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import SpecialPriceImg from "@app/assets/images/specialPricing.svg";
import CrossLogo from "@app/assets/images/cross.svg";
import { SideDrawerFooter } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import { GridReadyEvent } from "ag-grid-community";
import DownLoad from "@app/assets/images/download-doc.svg";

export default function BuySideImport({ uploadInputs, sendEventData }: any) {
  const [openModel, setOpenModel] = useState(false);
  const [loader, setLoader] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const [disableProceed, setDisableProceed] = useState(true);
  const [serverMsg, setServerMsg]: any = useState(null);
  const [headerLabel, setHeaderLabel] = useState<string>(
    `${uploadInputs.filetype}`
  );
  const [viewMoreBtn, setviewMoreBtn] = useState("View-More");
  const [rowLength, setRowLength] = useState(0);
  const [cloneRowData, setCloneRowData] = useState([]);
  const [fileValidationError, setFileValidationError] = useState("");
  const [fileName, setFileName] = useState("");
  const baseUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    setOpenModel(true);
  }, []);

  function closeModel() {
    setOpenModel(false);
    const obj = {
      close: true,
    };
    sendEventData(obj);
  }
  let fileuploadStatus: boolean;
  const [uploadResponse, setUploadResponse] = useState();
  function fileUpload(files: any) {
    setLoader(true);
    const formData = new FormData();

    formData.append("files", files[0]);

    const apiObject = {
      payload: formData,
      method: "POST",
      apiUrl: `${EndpointUrl.uploadFileApi}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          setLoader(false);
          setDisableProceed(false);
          setUploadResponse(data);
          setFileValidationError("File Uploaded");
          setFileName(files[0].name);
        } else {
          setLoader(false);
          setDisableProceed(false);
          setFileValidationError("File to Uploaded");
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
  async function onDrop(files: any) {
    setServerMsg("");
    if (
      files[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      files[0].type === "text/csv"
    ) {
      // setProgressState(0.8);
      if (files.length > 0) {
        await fileUpload(files);
      }
    } else {
      setServerMsg("Invalid File");
    }
  }

  const [errorLogMsg, setErrorLogMsg] = useState("");
  const [sampleHeaders, setSampleHeaders] = useState([]);
  const [uploadedErrors, setUploadedError] = useState([]);
  const [errorType, setErrorType] = useState<string>("");
  const [existingcode, setExistingcode] = useState<string>("");
  const [uplpoadedcode, setUploadedcode] = useState<string>("");
  const [errorColumnData, setErrorColumnData] = useState([]);
  const [errorRowData, setErrorRowData] = useState([]);
  let gridEvent: GridReadyEvent;

  const onGridReady = async (params: any) => {
    gridEvent = params;
    console.log(gridEvent);
  };
  const [btnLabel, setBtnLabel] = useState("Proceed");

  const getTypes = () => {
    if (
      uploadInputs.filetype === "Buy Side" ||
      uploadInputs.filetype === "Buy Side for All Customers"
    ) {
      return "1";
    }
    if (
      uploadInputs.filetype === "Sell Side" ||
      uploadInputs.filetype === "Sell Side for All Customers"
    ) {
      return "2";
    }
    return "";
  };
  const proceed = () => {
    setOpacity(true);
    const params = {
      import_file_data: uploadResponse,
      type: getTypes(),
      is_skip: btnLabel === "Skip & Proceed" ? true : null,
    };
    const apiObject = {
      payload: params,
      method: "POST",
      apiUrl:
        uploadInputs.filetype === "Buy Side" ||
        uploadInputs.filetype === "Sell Side"
          ? `${EndpointUrl.SPImportFileValidation}`
          : `${EndpointUrl.SPImportAllCustomers}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setLoader(false);
          setOpacity(false);
          setDisableProceed(false);
          if (
            response.result.data.error &&
            response.result.data.error === false
          ) {
            setHeaderLabel("Summary");
            sendEventData({ success: true });
          } else if (
            response.result.data.error &&
            response.result.data.error === true
          ) {
            setBtnLabel(response.result.data.button_label);
            setHeaderLabel("Error Log");
            setErrorLogMsg(response.result.data.message);
            setSampleHeaders(response.result.data.sample_headers);
            setUploadedError(response.result.data.uploaded_headers);
            setErrorType(response.result.data.type);
            setUploadedcode(response.result.data.uploaded_code);
            setExistingcode(response.result.data.existing_code);
            setErrorColumnData(response.result.data.column_data);
            let data = [];
            data = response.result.data.row_data.slice(0, 7);
            setErrorRowData(data);
            const len = response.result.data.row_data.length;
            setRowLength(len);
            setCloneRowData(response.result.data.row_data);
          } else {
            setOpacity(false);
            setOpenModel(false);
            sendEventData({ success: true });
          }
        } else {
          setServerMsg(response.result.data);
          setLoader(false);
          setOpacity(false);
          setDisableProceed(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };

  function viewMoreItems() {
    setviewMoreBtn(viewMoreBtn === "View-Less" ? "View-More" : "View-Less");
    // exportData();
    // onBtnExport();
    if (viewMoreBtn === "View-Less") {
      setErrorRowData(cloneRowData.slice());
    } else {
      setErrorRowData(cloneRowData.slice(0, 5));
    }
  }
  function onBtnExport() {
    const params = {
      skipHeader: false,
      skipFooters: true,
      allColumns: true,
      onlySelected: false,
      suppressQuotes: true,
      // eslint-disable-next-line no-useless-concat
      fileName: "customer_" + "error.xlsx",
      columnSeparator: ",",
    };
    gridEvent.api.exportDataAsExcel(params);
  }

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
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const getDownloadHeader = () => {
    if (headerLabel === "Buy Side") {
      return "buy_side_import";
    }
    if (headerLabel === "Sell Side") {
      return "sale_side_import";
    }
    if (headerLabel === "Buy Side for All Customers") {
      return "buy_side_for_all_customers";
    }
    if (headerLabel === "Sell Side for All Customers") {
      return "sale_side_for_all_customers";
    }
    return "";
  };
  return (
    <PiModal
      isOpen={openModel}
      width={headerLabel === "Error Log" ? 1000 : 450}
    >
      <SideDrawerHeader>
        <QuotePopupHeaderContainer>
          <img src={SpecialPriceImg} alt="loading" />
          {headerLabel && (
            <PiTypography component="h3">{headerLabel}</PiTypography>
          )}
        </QuotePopupHeaderContainer>
        <CloseButton
          onClick={() => closeModel()}
          title="close"
          className="Hover"
        >
          <img src={CrossLogo} alt="loading" />
        </CloseButton>
      </SideDrawerHeader>

      <FormBodyOverFlow
        className={opacity ? "opacity-on-load" : ""}
        style={{ position: "relative" }}
      >
        {opacity && (
          <SpinnerDiv
            style={{ height: "100%", position: "absolute", left: "50%" }}
          >
            <PiSpinner color="primary" size={50} libraryType="atalskit" />
          </SpinnerDiv>
        )}
        {(headerLabel === "Buy Side" ||
          headerLabel === "Sell Side" ||
          headerLabel === "Buy Side for All Customers" ||
          headerLabel === "Sell Side for All Customers") && (
          <ImportPopupContainer>
            <RowContainer>
              <DragSection
                className="file-import-box"
                style={{ width: "100%" }}
              >
                <UploadDiv>
                  <HeaderText>
                    <PiFleUploader
                      dropzoneProps={{
                        disabled: loader || opacity,
                        maxSize: 94371840,
                        multiple: true,
                        noDrag: false,
                        text: <FileUploadElement />,
                      }}
                      onUpload={(e: DragEvent) => onDrop(e)}
                    />
                  </HeaderText>
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
                  <UploadNote>
                    (Maximum file size 90MB, Supported file formats XLSX, CSV)
                  </UploadNote>
                  <DownloadIconContainer
                    onClick={() => {
                      sampleDownload(getDownloadHeader());
                    }}
                  >
                    <span>Sample File</span>{" "}
                    <img src={DownLoad} alt="loading" />
                  </DownloadIconContainer>
                </UploadDiv>
              </DragSection>
            </RowContainer>
          </ImportPopupContainer>
        )}

        {headerLabel === "Error Log" && (
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
                    rowHeight={40}
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
                                error.missing ? "error-mismatch" : "error-name"
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
                                error.missing ? "error-mismatch" : "error-name"
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
        )}
      </FormBodyOverFlow>
      <SideDrawerFooter>
        {serverMsg && <div className="server-msg">{serverMsg}</div>}
        {btnLabel && (
          <PiButton
            appearance="primary"
            label={btnLabel}
            onClick={proceed}
            isDisabled={disableProceed || loader || opacity}
          />
        )}
      </SideDrawerFooter>
    </PiModal>
  );
}

import React, { useState, Fragment, useEffect } from 'react'
import ErrorIcon from '@atlaskit/icon/glyph/error'
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left'
import { GridReadyEvent } from 'ag-grid-community'
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
} from 'pixel-kit'
import {
  UploadModalTitle,
  UploadImgDiv,
  UploadNote,
  UploadIcon,
  UploadDiv,
  InputEle,
  BrowseBtn,
  ErrorLogDiv,
  ErrorlogPanel,
  DragSection,
  UploadIconNext,
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
} from 'src/components/fileuploadModel/fileuploadModel.component'
import {
  ApiResponse,
  BranchListProps,
  ReqInfoProps,
  UserListProps,
} from 'src/services/schema/schema'
import crossImg from 'src/assets/images/cross.svg'
import uploadImg from 'src/assets/images/upload.svg'
import { triggerApi } from 'src/services/api-services'
import EndpointUrl from 'src/core/apiEndpoints/endPoints'
import {
  ExportIconPopup,
  ExportIconPopupHeader,
} from '../secondaryheader/secondaryheader.component'
import {
  CloseButton,
  HeaderText,
} from '../adminaddrowmodel/adminaddrowmodel.component'
import { getLocalStorage } from 'src/core/localStorage/localStorage'
type Props = {
  //reqInfo: ReqInfoProps
  onFileSelect: (e?: any) => {}
}

export default function FileUploadModel({ onFileSelect }: Props) {
  const [openModel, setOpenModel] = useState(false)
  let [headerLabel, setHeaderLabel] = useState<string>('Upload Files')
  // const [progressState, setProgressState] = useState(0);
  let [fileValidationError, setFileValidationError] = useState('')
  const [discountData, setDiscountData] = useState({})
  const [pricingdata, setPricingData] = useState({})
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const [errorLogMsg, setErrorLogMsg] = useState('')
  const [prodUpdatedMsg, setProdUpdatedMsg] = useState('')
  const [prodAddedMsg, setProdAddedMsg] = useState('')
  const [addProductsList, setAddProductsList] = useState([])
  const [UpdatedproductsList, setUpdatedProductsList] = useState([])
  let [discountProductsMsg, setDiscountProductsMsg] = useState<string>('')
  const [fileName, setFileName] = useState('')
  const [
    openImportingDataPopupModel,
    setOpenImportingDataPopupModel,
  ] = useState(false)
  const [priceFileName, setPriceFileName] = useState('')
  const [TodayDate, SetTodayDate] = useState('')
  const [minDate, setMinDate] = useState('')

  let gridEvent: GridReadyEvent
  let [rowLength, setRowLength] = useState(0)
  let [pricingFileValidationError, setPricingFileValidationError] = useState('')
  let reqInfo: ReqInfoProps
  let data: any = getLocalStorage('requestInfo')
  //if(data) {
  reqInfo = JSON.parse(data)
  console.log(reqInfo)
  //}
  useEffect(() => {
    function formatDate(date: Date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [year, month, day].join('-')
    }
    SetTodayDate(formatDate(new Date()))

    setOpenModel(true)
    getBranchList()
    console.log(reqInfo)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onGridReady = async (params: GridReadyEvent) => {
    // setReady(false);
    gridEvent = params
    console.log(gridEvent)
    // params.api.purgeServerSideCache([]);
    // params.api.showLoadingOverlay();
    // if (props.pageLabel !== "Pricing" && props.pageLabel !== "Discount_Codes") {
    //   setStateManagement();
  }

  let [branchList, setBranchList] = useState<Array<UserListProps>>([])
  function getBranchList() {
    const apiObject = {
      payload: {},
      method: 'GET',
      apiUrl: `${EndpointUrl.branchList}`,
      headers: {},
    }
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          let branchList = response.result.data.list

          let list = []
          list = branchList.map((item: BranchListProps) => {
            return {
              label: item.name,
              value: item.id,
              ...item,
            }
          })
          branchList = list
          console.log(list)
          setBranchList(branchList)
          setTimeout(() => {}, 500)
          setSelectedBrnch(list[0])
          setBranchValue(list[0].id)
          console.log(selectedBrnch)
        }
      })
      .catch((err: string) => {
        console.log(err)
      })
  }

  function closeModel() {
    // console.log(222);
    setOpenModel(false)
    onFileSelect({})
  }
  let [branchValue, setBranchValue] = useState(null)
  let [selectedBrnch, setSelectedBrnch] = useState({
    label: 'All',
    value: 'e02b1134-6e8b-454c-aecc-69e91b2bf3ff',
  })
  let [isBranchSelect, setBranchSelect] = useState(false)
  function selectBranch(e: any) {
    setBranchSelect(false)
    console.log(e, fileValidationError)
    const target = { value: e.value, label: e.label }

    let selectedBrnch = Object.assign({}, target)
    setSelectedBrnch(selectedBrnch)
    branchValue = e.id
    setBranchValue(e.id)
    // console.log(branchValue);

    if (
      (pricingFileValidationError === 'Pricing File Uploaded' && branchValue) ||
      (fileValidationError === 'Discount File Uploaded' && branchValue)
    ) {
      setDisableProceed(false)
    } else {
      setDisableProceed(true)
    }
  }
  let fileuploadStatus: boolean
  function fileUpload(files: any, type: string) {
    let formData
    formData = new FormData()

    formData.append(`files`, files[0])
    formData.append(`type`, type)

    const apiObject = {
      payload: formData,
      method: 'POST',
      apiUrl: `${EndpointUrl.uploadFileApi}`,
      headers: {},
    }
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          if (type === 'discount') {
            let obj = {
              ...response.result.data,
              is_append: discountChecked,
            }
            setDiscountData(obj)
            setFileName(files[0].name)
            fileValidationError = 'Discount File Uploaded'
            setFileValidationError('Discount File Uploaded')
          }
          if (type === 'pricing') {
            let obj = {
              ...response.result.data,
              is_append: pricingChecked,
            }
            setPricingData(obj)
            setPriceFileName(files[0].name)
            pricingFileValidationError = 'Pricing File Uploaded'
            setPricingFileValidationError('Pricing File Uploaded')
          }
          fileuploadStatus = true

          setDisableProceed(false)
        }
      })
      .catch((err: string) => {
        console.log(err)
      })

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fileuploadStatus)
      }, 500)
    })
  }
  let [disableProceed, setDisableProceed] = useState(true)
  let [viewMoreBtn, setviewMoreBtn] = useState('View More')

  async function onFileChange(event: any, filetype: string) {
    console.log(event.target.files, filetype)

    if (
      event.target.files[0].type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      event.target.files[0].type === 'text/csv'
    ) {
      await fileUpload(event.target.files, filetype)
    } else {
      if (filetype === 'discount') {
        setFileValidationError('Invalid File')
      }
      if (filetype === 'pricing') {
        setPricingFileValidationError('Invalid File')
      }
    }
  }

  async function onDrop(files: any, filetype: string) {
    console.log(files, filetype)
    if (
      files[0].type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      files[0].type === 'text/csv'
    ) {
      // setProgressState(0.8);
      if (files.length > 0) {
        await fileUpload(files, filetype)
      }
    } else {
      if (filetype === 'discount') {
        setFileValidationError('Invalid File')
      }
      if (filetype === 'pricing') {
        setPricingFileValidationError('Invalid File')
      }
    }
  }

  let [param, setParam]: any = useState()
  let [discountChecked, setDiscountChecked] = useState(false)
  let [pricingChecked, setPricingChecked] = useState(false)
  let [serverError, setServerError] = useState(null)
  function proceed() {
    if (startDate.length === 0) {
      setIsStartdate(true)
    } else {
      setIsStartdate(false)
    }
    if (endDate.length === 0) {
      setIsEnddate(true)
    } else {
      setIsEnddate(false)
    }

    if (startDate.length !== 0 && endDate.length !== 0) {
      setHeaderLabel('Import Data')
      setOpenImportingDataPopupModel(true)
      param = {
        discount_codes_data: discountCodeParam,
        price_list_data: {
          temp_table: priceTempTable,
          is_append: pricingChecked,
          image_name: pricingImgName,
          original_filename: originalImgName,
        },
        vendor_id: reqInfo.body.vendor_id,
        branch_id: branchValue,
        start_date: startDate,
        end_date: endDate,
      }
      if (discountTempTable === null) {
        delete param.discount_codes_data

        setParam(param)
      }
      const apiObject = {
        payload: param,
        method: 'POST',
        apiUrl: `${EndpointUrl.importProductsExcelApi}`,
        headers: {},
      }
      triggerApi(apiObject).then((response: ApiResponse) => {
        if (response.result.success) {
          setOpenModel(false)
        } else {
          setServerError(response.result.data)
        }
      })
    }
  }

  const [priceTempTable, setPriceTempTable] = useState(null)
  const [discountTempTable, setDiscountTempTable] = useState(null)
  const [discountCodeParam, setDiscountCodeParam] = useState(null)
  let [startDate, setStartDate] = useState('')
  let [endDate, setEndDate] = useState('')
  let [pricingImgName, setPricingImgName] = useState('')
  let [originalImgName, setOriginalImgName] = useState('')
  const [sampleHeaders, setSampleHeaders] = useState([])
  const [uploadedErrors, setUploadedError] = useState([])
  const [errorType, setErrorType] = useState<string>('')
  const [existingcode, setExistingcode] = useState<string>('')
  const [uplpoadedcode, setUploadedcode] = useState<string>('')
  const [errorLog, setErrorLog] = useState<string>('')
  const [errorColumnData, setErrorColumnData] = useState([])
  const [errorRowData, setErrorRowData] = useState([])
  const [cloneRowData, setCloneRowData] = useState([])

  function closeImportPopup() {
    setOpenImportingDataPopupModel(false)
    let param = {
      vendor_id: reqInfo.body.vendor_id,
      branch_id: branchValue,
    }
    onFileSelect(param)
  }
  function proceedToSummary() {
    setIsBtnLoading(true)
    let param = {
      discount_codes_data: discountData,
      price_list_data: pricingdata,
      vendor_id: reqInfo.body.vendor_id,
      branch_id: branchValue,
    }
    const apiObject = {
      payload: param,
      method: 'POST',
      apiUrl: `${EndpointUrl.importFileValidation}`,
      headers: {},
    }
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          if (!response.result.data.error) {
            // console.log(1111111111111111);
            setHeaderLabel('Summary')
            setIsBtnLoading(false)
            if (response.result.data.price_list) {
              setProdAddedMsg(
                response.result.data.price_list.new_products.message,
              )
              setProdUpdatedMsg(response.result.data.price_list.changes.message)
              setAddProductsList(
                response.result.data.price_list.new_products.list,
              )
              setUpdatedProductsList(
                response.result.data.price_list.changes.list,
              )
              setPriceTempTable(response.result.data.price_list.temp_table)
              setPricingImgName(response.result.data.price_list.image_name)
              setOriginalImgName(
                response.result.data.price_list.original_filename,
              )
            }
            setStartDate(
              response.result.data.start_date
                ? response.result.data.start_date
                : startDate,
            )
            setEndDate(
              response.result.data.end_date
                ? response.result.data.end_date
                : endDate,
            )
            if (response.result.data.discount_codes) {
              setDiscountProductsMsg(
                response.result.data.discount_codes.new_products.message,
              )

              setDiscountTempTable(
                response.result.data.discount_codes.temp_table,
              )
              let obj = {
                ...response.result.data.discount_codes,
                is_append: discountChecked,
              }
              delete obj.new_products
              setDiscountCodeParam(obj)
            }
          } else {
            setHeaderLabel('Error Log')
            setErrorLogMsg(response.result.data.message)
            setSampleHeaders(response.result.data.sample_headers)
            setUploadedError(response.result.data.uploaded_headers)
            setIsBtnLoading(false)
            setErrorType(response.result.data.type)
            setUploadedcode(response.result.data.uploaded_code)
            setExistingcode(response.result.data.existing_code)
            setErrorLog(response.result.data.error_log)
            setErrorColumnData(response.result.data.column_data)
            setCloneRowData(response.result.data.row_data)

            let data = []
            data = response.result.data.row_data.slice(0, 7)
            setErrorRowData(data)
            rowLength = response.result.data.row_data.length
            setRowLength(rowLength)
            console.log(rowLength)
          }
        }
      })
      .catch((err: string) => {
        console.log(err)
      })
  }
  function onBtnExport() {
    var params = {
      skipHeader: false,
      skipFooters: true,
      allColumns: true,
      onlySelected: false,
      suppressQuotes: true,
      fileName: 'test2.xlsx',
      columnSeparator: ',',
    }
    gridEvent.api.exportDataAsExcel(params)
  }
  // function exportData() {
  //   let url = `${EndpointUrl.importFileValidation}`;
  //   exportUrl = url;
  //   setExportUrl(exportUrl);
  //   setToast(true);
  //   let toastMsg = "Data Exported Succesfully";
  //   setToastMsg(toastMsg);
  //   setTimeout(() => {
  //     setToast(false);
  //   }, 1500);
  //   // let url2 = `${url}?page=${pageNumber}&sort=${sort}&sort_key=${sortkey}`

  //   const apiObject = {
  //     payload: {},
  //     method: "GET",
  //     apiUrl: url,
  //     headers: {}
  //   };
  //   triggerApi(apiObject)
  //     .then(() => { })
  //     .catch((err: string) => {
  //       console.log(err);
  //     });
  // }
  // function exportData() {
  //   // console.log(gridEvent);
  //   gridEvent.api.exportDataAsExcel();
  // }

  function backView(label: string) {
    console.log(label)
    if (label === 'Error Log' || label === 'Summary') {
      setHeaderLabel('Upload Files')
    }
    if (label === 'Products List') {
      setHeaderLabel('Summary')
    }
    if (label === 'Import Data') {
      setHeaderLabel('Summary')
    }
  }

  function discountCheckBox(e: any) {
    console.log(e.target.checked)
    discountChecked = e.target.checked
    setDiscountChecked(e.target.checked)
    let obj = {
      ...discountData,
      is_append: discountChecked,
    }
    setDiscountData(obj)
  }

  function viewMoreItems() {
    viewMoreBtn = viewMoreBtn === 'View Less' ? 'View More' : 'View Less'
    setviewMoreBtn(viewMoreBtn)
    // exportData();
    // onBtnExport();
    if (viewMoreBtn === 'View Less') {
      setErrorRowData(cloneRowData.slice())
    } else {
      setErrorRowData(cloneRowData.slice(0, 5))
    }
  }

  function pricingCheckBox(e: any) {
    pricingChecked = e.target.checked
    setPricingChecked(e.target.checked)
    let obj = {
      ...pricingdata,
      is_append: pricingChecked,
    }
    setPricingData(obj)
  }
  const [isStartDate, setIsStartdate] = useState(false)
  const [isEndDate, setIsEnddate] = useState(false)

  function selectStartDate(e: any) {
    console.log(e)
    startDate = e
    setStartDate(e)
    setIsStartdate(false)
    setMinDate(e)
  }
  function selectEndDate(e: any) {
    endDate = e
    setEndDate(e)
    setIsEnddate(false)
  }

  return (
    <Fragment>
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
                  {
                    <CloseButton
                      onClick={() => closeImportPopup()}
                      title="close"
                      className="Hover"
                    >
                      {' '}
                      <img src={crossImg} alt="loading"></img>{' '}
                    </CloseButton>
                  }
                  <PiTypography component="h4">Import Data</PiTypography>
                  <hr />
                </PopupHeaderDiv>
              </PiModalHeader>
            </ExportIconPopupHeader>
            <PiModalBody>
              <ExportIconPopup>
                <p>
                  {' '}
                  The import process will be running in the background. Once
                  complete, a mail will be sent to your registered email
                </p>
              </ExportIconPopup>
            </PiModalBody>
          </PiModal>
        </>
      )}
      <PiModal isOpen={openModel} width={1000}>
        <PiModalHeader>
          {headerLabel && (
            <>
              <PopupHeaderDiv className="Upload-files">
                <UploadModalTitle>
                  {headerLabel !== 'Upload Files' && (
                    <div onClick={() => backView(headerLabel)}>
                      <ArrowLeftIcon label="" />
                    </div>
                  )}

                  <PiTypography component="h4">
                    {headerLabel === 'Error Log' ? errorLog : headerLabel}
                  </PiTypography>
                  <UploadImgDiv src={crossImg} onClick={closeModel} />
                </UploadModalTitle>
                <hr />
              </PopupHeaderDiv>
            </>
          )}
        </PiModalHeader>
        <PiModalBody>
          {headerLabel === 'Upload Files' && (
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
                  <div className="select-container">
                    <div className="branch-label-container">
                      <PiLabelName label="Branch" />
                    </div>
                    <PiSelect
                      libraryType="atalskit"
                      variant="outlined"
                      name="select"
                      defaultValue={selectedBrnch}
                      onChange={(e) => selectBranch(e)}
                      // value={branchValue}
                      options={branchList}
                      placeholder="Select Branch"
                    />
                  </div>
                </div>
                {isBranchSelect && (
                  <small className="branch-valid-msg">
                    Please select Branch
                  </small>
                )}
                <RowContainer>
                  <DragSection>
                    <p className="file-type-label">Upload Discount File</p>

                    <UploadDiv>
                      <UploadIcon src={uploadImg} />
                      <HeaderText>
                        <PiFleUploader
                          dropzoneProps={{
                            disabled: false,
                            maxSize: 94371840,
                            multiple: true,
                            noDrag: false,
                            text: 'Drag & Drop Discount file anywhere here',
                          }}
                          onUpload={(e: DragEvent) => onDrop(e, 'discount')}
                        />
                      </HeaderText>
                      {/* {filetype === "discount" && ( */}
                      <>
                        <p style={{ textAlign: 'center',margin: '5px 0px' }}>{fileName}</p>

                        <p
                          className={
                            fileValidationError === 'Invalid File'
                              ? 'invalid-file-error'
                              : 'valid-file'
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
                    </UploadDiv>
                    <PiCheckbox
                      helpText=""
                      isChecked={discountChecked}
                      label="Append to Existing List"
                      libraryType="atalskit"
                      name="checkbox"
                      onChange={discountCheckBox}
                      size="large"
                    />
                    <BrowseBtn>
                      <p className="browse-text">Browse</p>
                      <InputEle
                        type="file"
                        onChange={(e: any) => onFileChange(e, 'discount')}
                        multiple
                      />
                    </BrowseBtn>
                  </DragSection>
                  <DragSection>
                    <p className="file-type-label">Upload Pricing File</p>
                    <UploadDiv>
                      <UploadIconNext src={uploadImg} />

                      <PiFleUploader
                        dropzoneProps={{
                          disabled: false,
                          maxSize: 94371840,
                          multiple: true,
                          noDrag: false,
                          text: 'Drag & Drop Pricing file anywhere here',
                        }}
                        onUpload={(e: DragEvent) => onDrop(e, 'pricing')}
                      />
                      {/* {filetype === "pricing" && ( */}
                      <>
                        <p style={{ textAlign: 'center', margin: '5px 0px' }}>
                          {priceFileName}
                        </p>
                        <p
                          className={
                            pricingFileValidationError === 'Invalid File'
                              ? 'invalid-file-error'
                              : 'valid-file'
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
                    </UploadDiv>
                    <TextEle>
                      <PiCheckbox
                        helpText=""
                        isChecked={pricingChecked}
                        label="Append to Existing List"
                        libraryType="atalskit"
                        name="checkbox"
                        onChange={pricingCheckBox}
                        size="large"
                      />
                    </TextEle>
                    <BrowseBtn>
                      <p className="browse-text">Browse</p>
                      <InputEle
                        type="file"
                        onChange={(e: any) => onFileChange(e, 'pricing')}
                        multiple
                      />
                    </BrowseBtn>
                  </DragSection>
                </RowContainer>
              </ImportPopupContainer>
            </>
          )}
          {headerLabel === 'Summary' && (
            <>
              <DatePickerDiv>
                <DateStyles>
                  <PiDatePicker
                    dateFormat="MM/DD/YYYY"
                    helpText=""
                    label="Start Date"
                    libraryType="atalskit"
                    name="datePicker"
                    minDate={TodayDate}
                    defaultValue={minDate}
                    onChange={selectStartDate}
                    onKeyDown={function noRefCheck() {}}
                    value={startDate}
                    placeholder="MM/DD/YYYY"
                  />
                  {isStartDate && <small>Please select Start Date</small>}
                </DateStyles>
                <DateStyles>
                  <PiDatePicker
                    dateFormat="MM/DD/YYYY"
                    helpText=""
                    label="End Date"
                    libraryType="atalskit"
                    name="datePicker"
                    onChange={selectEndDate}
                    onKeyDown={function noRefCheck() {}}
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

          {headerLabel === 'Error Log' && (
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

                {errorType === 'code_mismatch' && (
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
                {errorType === 'list' && (
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
                        label={rowLength > 5 ? viewMoreBtn : ''}
                        onClick={viewMoreItems}
                      />
                      <PiButton
                        appearance="link"
                        label="Export"
                        onClick={onBtnExport}
                      />

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
                {errorType === 'headers_mismatch' && (
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
                                      ? 'error-mismatch'
                                      : 'error-name'
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
                                      ? 'error-mismatch'
                                      : 'error-name'
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
          {headerLabel === 'Products List' && (
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
        {headerLabel === 'Upload Files' && (
          <PiModalFooter>
            <PiButton
              appearance="secondary"
              label="Cancel"
              onClick={closeModel}
            />
            <PiButton
              appearance="primary"
              label="Proceed"
              libraryType="atalskit"
              isLoading={isBtnLoading ? true : false}
              isDisabled={disableProceed}
              className="proceed-btn"
              onClick={proceedToSummary}
            />
          </PiModalFooter>
        )}
        {headerLabel === 'Summary' && (
          <PiModalFooter>
            <PiButton
              appearance="secondary"
              label="Cancel"
              onClick={closeModel}
            />
            <PiButton
              appearance="primary"
              label="Proceed"
              onClick={proceed}
              //isDisabled={!startDate.length || !endDate.length}
            />
          </PiModalFooter>
        )}
        {headerLabel === 'Import Data' && (
          <PiModalFooter>
            <ServerValidation className="serverErrorValidation">
              {serverError}
            </ServerValidation>
            <PiButton appearance="primary" label="Close" onClick={closeModel} />
            {/* <PiButton
              className="roll-back"
              appearance="secondary"
              label="Roll Back"
              onClick={upload}
            /> */}
          </PiModalFooter>
        )}
      </PiModal>
    </Fragment>
  )
}

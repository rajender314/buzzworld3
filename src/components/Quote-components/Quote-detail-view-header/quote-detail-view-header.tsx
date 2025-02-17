/* eslint-disable react/no-unstable-nested-components */
import {
  PiButton,
  PiConfirmModel,
  PiDropdownMenu,
  PiIconDropdownMenu,
  PiSideDrawer,
  PiTabGroup,
  PiTabHeader,
  PiTabHeaderPanel,
  PiTabPanel,
  PiTextArea,
  PiToast,
  PiTooltip,
  PiTypography,
} from "pixel-kit";
import { useCallback, useEffect, useState } from "react";
import {
  HeaderContainer,
  RepairIdsDiv,
  RepairIds,
  BackSection,
  RightSideContent,
  DetailViewStatusDropdown,
  SaveApproveQuestionTabs,
} from "@app/components/detail-view-header/detail-view-header.component";
// import QuotesImg from '@app/assets/images/quotes.svg'
import AddLogo from "@app/assets/images/Plus.svg";

import QuotesImg from "@app/assets/images/Quotes_listview.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { token, triggerApi } from "@app/services";
import { ApiResponse, FilterColumnProps } from "@app/services/schema/schema";
import { useParams, useHistory } from "react-router-dom";
import { RouteParams } from "@app/modules/repair-detail-view/schema/repairs";
import FiftykApproval from "@app/components/popups/fifty-k-Approval/fifty-k-Approval";
import TenkApproval from "@app/components/popups/ten-k-Approval/ten-k-Approval";
import TwentyFiveApproval from "@app/components/popups/twanty-five-k-Approval/twenty-five-k-Approval";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import ClientApprovalForm from "@app/components/popups/client-approval-form/client-approval-form";
import { SideDrawerW40 } from "@app/components/rmaModel/RmaModel.component";
import { QuoteActivityPill } from "@app/core/components/gridStatus/gridStatus.component";
import { getStatusClassName } from "@app/modules/Quotes/Repair-Quotes/helpers/quote-helpers";
import PrintConfirmModel from "@app/core/components/printConfirmModel/print-confirm-model";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import { SideDrawerHeader } from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";
import CrossLogo from "@app/assets/images/cross.svg";
import { NoUserFound } from "@app/components/usersComponents/userslist/userslist.component";
import CreateSOForm from "@app/components/orders-components/create-SO-form/create-so-form";
import { getUserLoggedPermission } from "@app/helpers/helpers";
import {
  ImgTag,
  LinkWithIcon,
} from "@app/components/secondaryheader/secondaryheader.component";
import { BackButton } from "@app/components/special-pricing-components/logHistoryDetailGrid/logHistoryDetailGrid.component";
import ChevronLeft from "@app/assets/images/chevron_left.svg";
import printIcon from "@app/assets/images/print.svg";
import downloadIcon from "@app/assets/images/download-doc.svg";
import cloneIcon from "@app/assets/images/clone.svg";
import deleteIcon from "@app/assets/images/delete-icon.svg";
import archiveIcon from "@app/assets/images/archive_icon.svg";
import CloneQuoteConfirmModel from "@app/core/components/Clone-Quote-ConfirmModel/clone-quote-confirm-model";
import { ApprovedHeaderLabels } from "../Quote-detail-view-content/QuoteInformation/quote-info.component";
import WonConfirmModel from "../won-confirm";
import { DetailViewHeaderRightIcons } from "../Quote-detail-view-content/AddOptions/add-options.component";

export default function QuoteDetailViewHeader({
  updatedQuoteInfo,
  quoteInfo,
  sendEventData,
  sendOpacity,
  sendVersionEvent,
}: any) {
  const [quoteDetails, setQuoteDetails] = useState(quoteInfo);
  const { id }: RouteParams = useParams();
  const [openSnackbar, setSnackbar] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [openConFirm, setConFirm] = useState(false);
  const [openDeleteConFirm, setOpenDeleteConFirm] = useState(false);
  const [openArchiveConFirm, setOpenArchiveConFirm] = useState(false);
  const [confirmText, setConfirmText] = useState<any>();
  const [openModel, setOpenModel] = useState(false);
  const [openSOModel, setOpenSOModel] = useState(false);
  const [quoteClosePermObject, setQuoteClosePermObject] = useState<any>({});
  const [quoteReOpenPermObject, setQuoteReOpenPermObject] = useState<any>({});
  const [createSoPermObject, setCreateSoPermObject] = useState<any>({});
  const [confirmPrint, setConfirmPrint] = useState(false);
  const [confirmWon, setConfirmWon] = useState(false);
  const [confirmApiUrl, setConfirmApiUrl] = useState("");
  const [confirmHeader, setConfirmHeader] = useState("Confirmation");
  const [showClonepopUp, setShowClonePopUp] = useState<boolean>(false);

  const baseUrl = process.env.REACT_APP_API_URL;
  const [displayFields, setDisplayFields] = useState({
    "10k": false,
    "25k": false,
    "50k": false,
    "10kId": null,
    "25kId": null,
    "50kId": null,
    noData: true,
    values: null,
  });
  const [saveQuestionsList, setSaveQuestionsList]: any = useState([]);
  const [openApprovalQuestions, setOpenApprovalQuestions] = useState(false);
  const [primaryBtnLabel, setprimaryBtnLabel] = useState("Proceed");
  const [secondaryBtnLabel, setsecondaryBtnLabel] = useState("Cancel");
  const history = useHistory();
  const [permissionObject, setpermissionObject] = useState<any>({});
  const [deletePermissionObj, setDeletePermissionObj] = useState<any>({});
  const [sendQuoteAgainPermissionObj, setSendQuoteAgainPermissionObj] =
    useState<any>({});
  const [customerId, setCustomerId] = useState<any>();
  const approvalInputData = {
    eventFrom: "quote",
    quote_id: id,
    quoteInfo,
  };
  const [printList, setPrintList]: any = useState([]);
  const [selectedVersion, setSelectedVersion]: any = useState();
  const [optionsList, setOptionsList]: any = useState([]);
  const [showDeclineTextBox, setDeclineTextBox] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [approvalDeclineComments, setApprovalDeclineComments] = useState("");
  const [declineComments, setDeclineComments] = useState("");
  const [piconfirmClass, setPiconfirmClass] = useState("");
  const [deleteArchiveList, setDeleteArchiveList] = useState<any>([]);
  const getConfirmClass = () => {
    if (openConFirm && confirmHeader) {
      return "show";
    }
    if (openConFirm && !confirmHeader) {
      return "show text-red";
    }
    return "";
  };
  useEffect(() => {
    const piclassname: any = getConfirmClass();
    setPiconfirmClass(piclassname);
  }, [openConFirm, confirmHeader]);

  const onTabChange = (e: number) => {
    if (saveQuestionsList[e].is_enable) {
      displayFields.values = null;
      displayFields.values = saveQuestionsList[e].quote_form_values;
      setDisplayFields(displayFields);
      setOpenModel(true);

      setTabIndex(e);
    }
  };
  const onHandleDownload = () => {
    sendOpacity(true);
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.DownloadPdf}?quote_id=${id}&token=${token}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        sendOpacity(false);
        console.log(response);
        setToastMsg("Downloaded Successfully");
        setSnackbar(true);
        // if (response.result.success) {
        //  setToastMsg('Downloaded Successfully')
        //  setSnackbar(true)
        //  const downloadUrl = response.result.data[0].fileURL
        //  window.location.href = downloadUrl
        // } else {
        //   console.log(222)
        //    window.location.href = baseUrl + `${EndpointUrl.DownloadPdf}?quote_id=${quoteId}&token=${token}`
        // }
        window.location.href = `${baseUrl}${EndpointUrl.DownloadPdf}?quote_id=${id}&token=${token}`;
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const getOptions = useCallback(async () => {
    let arr: any = [];
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteOptions}?quote_id=${id}&type=print`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then(async (response: any) => {
        if (response.result.success) {
          const { data } = response.result;
          arr = data.map((item: FilterColumnProps) => ({
            value: item.id,
            label: item.name,
            ...item,
          }));
          setOptionsList([...arr]);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
    return arr;
  }, [id]);
  const onHandlePrint = async () => {
    console.log(1);
    sendOpacity(true);
    const data = await getOptions();
    sendOpacity(false);

    if (data.length > 1) {
      setConfirmApiUrl(EndpointUrl.PrintPdf);
      setConfirmPrint(true);
    } else if (data.length === 1) {
      const params = {
        quote_id: id,
        option_id: [data[0].id],
      };
      const apiObject = {
        payload: params,
        method: "POST",
        apiUrl: EndpointUrl.PrintPdf,
        headers: {},
      };
      triggerApi(apiObject)
        .then(async (response: any) => {
          if (response.result.success) {
            const downloadUrl = response.result.data[0].fileURL;
            // window.location.href = downloadUrl
            window.open(downloadUrl, "_blank");
          }
          setConFirm(false);
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  };

  const cloneQuote = () => {
    setConfirmText("Are you sure you want to clone this quote ?");
    setShowClonePopUp(true);
  };
  const deleteQuote = () => {
    setConfirmText("Are you sure you want to delete this quote?");
    setOpenDeleteConFirm(true);
  };
  const archiveQuote = () => {
    setConfirmText("Are you sure you want to archive this quote?");
    setOpenArchiveConFirm(true);
  };
  useEffect(() => {
    // setquoteId(quoteInfo.id)
    if (quoteInfo?.is_repair) {
      setPrintList([
        {
          id: "2",
          element: (
            <LinkWithIcon onClick={() => onHandlePrint()}>
              <ImgTag src={printIcon} className="save-view Export-Image" />
              <span className="link-icon-text">Print</span>
            </LinkWithIcon>
          ),
        },
        {
          id: "3",
          element: (
            <LinkWithIcon onClick={() => onHandleDownload()}>
              <ImgTag src={downloadIcon} className="save-view Export-Image" />
              <span className="link-icon-text">Download</span>
            </LinkWithIcon>
          ),
        },
      ]);
      setDeleteArchiveList([
        {
          id: "2",
          element: (
            <LinkWithIcon onClick={() => onHandlePrint()}>
              <ImgTag src={printIcon} className="save-view Export-Image" />
              <span className="link-icon-text">Print</span>
            </LinkWithIcon>
          ),
        },
        {
          id: "3",
          element: (
            <LinkWithIcon onClick={() => onHandleDownload()}>
              <ImgTag src={downloadIcon} className="save-view Export-Image" />
              <span className="link-icon-text">Download</span>
            </LinkWithIcon>
          ),
        },
      ]);
    } else {
      setPrintList([
        {
          id: "2",
          element: (
            <LinkWithIcon onClick={() => onHandlePrint()}>
              <ImgTag src={printIcon} className="save-view Export-Image" />
              <span className="link-icon-text">Print</span>
            </LinkWithIcon>
          ),
        },
        {
          id: "3",
          element: (
            <LinkWithIcon onClick={() => onHandleDownload()}>
              <ImgTag src={downloadIcon} className="save-view Export-Image" />
              <span className="link-icon-text">Download</span>
            </LinkWithIcon>
          ),
        },
      ]);
    }
  }, [quoteInfo.id]);

  useEffect(() => {
    (async () => {
      const deletePerm: any = await getPermissionObject("delete_quote");
      if (!quoteInfo?.is_repair) {
        if (
          quoteInfo?.status_code === "open" ||
          quoteInfo?.status_code.includes("pending_approval")
        ) {
          if (deletePerm.delete_quote) {
            if (quoteInfo?.quote_version?.is_latest_version) {
              setDeleteArchiveList([
                {
                  id: "del",
                  element: (
                    <LinkWithIcon onClick={() => deleteQuote()}>
                      <ImgTag
                        src={deleteIcon}
                        className="save-view dele-Icon"
                        style={{
                          height: "16px",
                          width: "16px",
                          margin: "0 4px",
                        }}
                      />
                      <span className="link-icon-text">Delete</span>
                    </LinkWithIcon>
                  ),
                },
              ]);
              if (
                permissionObject.Edit === true &&
                selectedVersion &&
                selectedVersion?.is_latest_version
              ) {
                setPrintList([
                  {
                    id: "1",
                    element: (
                      <LinkWithIcon
                        onClick={() => cloneQuote()}
                        className={quoteDetails.is_repair ? "display-none" : ""}
                      >
                        <ImgTag
                          src={cloneIcon}
                          className="save-view Export-Image"
                        />
                        <span className="link-icon-text">Clone </span>
                      </LinkWithIcon>
                    ),
                  },
                  {
                    id: "2",
                    element: (
                      <LinkWithIcon onClick={() => onHandlePrint()}>
                        <ImgTag
                          src={printIcon}
                          className="save-view Export-Image"
                        />
                        <span className="link-icon-text">Print</span>
                      </LinkWithIcon>
                    ),
                  },
                  {
                    id: "3",
                    element: (
                      <LinkWithIcon onClick={() => onHandleDownload()}>
                        <ImgTag
                          src={downloadIcon}
                          className="save-view Export-Image"
                        />
                        <span className="link-icon-text">Download</span>
                      </LinkWithIcon>
                    ),
                  },
                  {
                    id: "4",
                    element: (
                      <LinkWithIcon
                        onClick={() => deleteQuote()}
                        // className={quoteDetails.is_repair ? "display-none" : ""}
                      >
                        <ImgTag
                          src={deleteIcon}
                          className="save-view dele-Icon"
                        />
                        <span className="link-icon-text">Delete</span>
                      </LinkWithIcon>
                    ),
                  },
                ]);
              } else {
                setPrintList([
                  {
                    id: "2",
                    element: (
                      <LinkWithIcon onClick={() => onHandlePrint()}>
                        <ImgTag
                          src={printIcon}
                          className="save-view Export-Image"
                        />
                        <span className="link-icon-text">Print</span>
                      </LinkWithIcon>
                    ),
                  },
                  {
                    id: "3",
                    element: (
                      <LinkWithIcon onClick={() => onHandleDownload()}>
                        <ImgTag
                          src={downloadIcon}
                          className="save-view Export-Image"
                        />
                        <span className="link-icon-text">Download</span>
                      </LinkWithIcon>
                    ),
                  },
                  {
                    id: "4",
                    element: (
                      <LinkWithIcon
                        onClick={() => deleteQuote()}
                        // className={quoteDetails.is_repair ? "display-none" : ""}
                      >
                        <ImgTag
                          src={deleteIcon}
                          className="save-view dele-Icon"
                        />
                        <span className="link-icon-text">Delete</span>
                      </LinkWithIcon>
                    ),
                  },
                ]);
              }
            }
          }
        }
      } else if (quoteInfo?.is_repair) {
        setPrintList([
          {
            id: "2",
            element: (
              <LinkWithIcon onClick={() => onHandlePrint()}>
                <ImgTag src={printIcon} className="save-view Export-Image" />
                <span className="link-icon-text">Print</span>
              </LinkWithIcon>
            ),
          },
          {
            id: "3",
            element: (
              <LinkWithIcon onClick={() => onHandleDownload()}>
                <ImgTag src={downloadIcon} className="save-view Export-Image" />
                <span className="link-icon-text">Download</span>
              </LinkWithIcon>
            ),
          },
        ]);
      }
    })();
  }, [quoteInfo, quoteInfo?.id, quoteInfo?.status_code]);

  useEffect(() => {
    (async () => {
      const archiveQuotePerm: any = await getPermissionObject("archive_quote");
      if (!quoteInfo?.is_repair) {
        if (
          quoteInfo?.status_code === "won" ||
          quoteInfo?.status_code === "won_so_created" ||
          quoteInfo?.status_code === "lost" ||
          quoteInfo?.status_code === "delivered_to_customer" ||
          quoteInfo?.status_code === "quote_expired" ||
          quoteInfo.status_code.includes("approved")
        ) {
          if (quoteInfo?.quote_version?.is_latest_version) {
            if (archiveQuotePerm?.archive_quote) {
              setDeleteArchiveList([
                {
                  id: "archive",
                  element: (
                    <LinkWithIcon onClick={() => archiveQuote()}>
                      <ImgTag
                        src={archiveIcon}
                        className="save-view Export-Image"
                      />
                      <span className="link-icon-text">Archive</span>
                    </LinkWithIcon>
                  ),
                },
              ]);
              if (
                permissionObject.Edit === true &&
                selectedVersion &&
                selectedVersion?.is_latest_version
              ) {
                setPrintList([
                  {
                    id: "1",
                    element: (
                      <LinkWithIcon
                        onClick={() => cloneQuote()}
                        className={quoteDetails.is_repair ? "display-none" : ""}
                      >
                        <ImgTag
                          src={cloneIcon}
                          className="save-view Export-Image"
                        />
                        <span className="link-icon-text">Clone </span>
                      </LinkWithIcon>
                    ),
                  },
                  {
                    id: "2",
                    element: (
                      <LinkWithIcon onClick={() => onHandlePrint()}>
                        <ImgTag
                          src={printIcon}
                          className="save-view Export-Image"
                        />
                        <span className="link-icon-text">Print</span>
                      </LinkWithIcon>
                    ),
                  },
                  {
                    id: "3",
                    element: (
                      <LinkWithIcon onClick={() => onHandleDownload()}>
                        <ImgTag
                          src={downloadIcon}
                          className="save-view Export-Image"
                        />
                        <span className="link-icon-text">Download</span>
                      </LinkWithIcon>
                    ),
                  },
                  {
                    id: "archive",
                    element: (
                      <LinkWithIcon onClick={() => archiveQuote()}>
                        <ImgTag
                          src={archiveIcon}
                          className="save-view Export-Image"
                        />
                        <span className="link-icon-text">Archive</span>
                      </LinkWithIcon>
                    ),
                  },
                ]);
              } else {
                setPrintList([
                  {
                    id: "2",
                    element: (
                      <LinkWithIcon onClick={() => onHandlePrint()}>
                        <ImgTag
                          src={printIcon}
                          className="save-view Export-Image"
                        />
                        <span className="link-icon-text">Print</span>
                      </LinkWithIcon>
                    ),
                  },
                  {
                    id: "3",
                    element: (
                      <LinkWithIcon onClick={() => onHandleDownload()}>
                        <ImgTag
                          src={downloadIcon}
                          className="save-view Export-Image"
                        />
                        <span className="link-icon-text">Download</span>
                      </LinkWithIcon>
                    ),
                  },
                  {
                    id: "archive",
                    element: (
                      <LinkWithIcon onClick={() => archiveQuote()}>
                        <ImgTag
                          src={archiveIcon}
                          className="save-view Export-Image"
                        />
                        <span className="link-icon-text">Archive</span>
                      </LinkWithIcon>
                    ),
                  },
                ]);
              }
            }
          }
        }
      } else if (quoteInfo?.is_repair) {
        setPrintList([
          {
            id: "2",
            element: (
              <LinkWithIcon onClick={() => onHandlePrint()}>
                <ImgTag src={printIcon} className="save-view Export-Image" />
                <span className="link-icon-text">Print</span>
              </LinkWithIcon>
            ),
          },
          {
            id: "3",
            element: (
              <LinkWithIcon onClick={() => onHandleDownload()}>
                <ImgTag src={downloadIcon} className="save-view Export-Image" />
                <span className="link-icon-text">Download</span>
              </LinkWithIcon>
            ),
          },
        ]);
      }
    })();
  }, [quoteInfo, quoteInfo?.id, quoteInfo?.status_code]);

  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("quote_for_parts");
      setpermissionObject(permission);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const delpermission = await getPermissionObject("delete_quote");
      setDeletePermissionObj(delpermission);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const sendQuoteAgain = await getPermissionObject("send_to_customer");
      setSendQuoteAgainPermissionObj(sendQuoteAgain);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const quoteClosePerm = await getPermissionObject("quote_close");
      setQuoteClosePermObject(quoteClosePerm);
      const quoteReOpenPerm = await getPermissionObject("quote_reopen");
      setQuoteReOpenPermObject(quoteReOpenPerm);
      const createSoPerm = await getPermissionObject("create_sales_order");
      setCreateSoPermObject(createSoPerm);
      setSelectedVersion(quoteInfo.quote_version);
    })();
  }, [quoteInfo.quote_version]);
  const [quoteStatusList, setQuoteStatusList]: any = useState([]);
  const getQuoteStatus = useCallback(() => {
    let arr: any = [];
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteStatus}/${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const data = response.result.data.list;
          arr = await data.map((item: any) => ({
            ...item,
            name: (
              <div className="Button-Icon-Display">
                <LinkWithIcon className="Icon-space">
                  <span className="link-icon-text">{item.name}</span>
                </LinkWithIcon>
              </div>
            ),
          }));
          setQuoteStatusList([...arr]);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }, [id]);
  const [quoteVersions, setQuoteVersions]: any = useState([]);
  const [isDisplayVersions, setIsDisplayVersions]: any = useState(false);

  const getQuoteVersions = useCallback(() => {
    let arr = [];
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteVersion}?quote_no=${quoteDetails.quote_no}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const data = response.result.data.list;
          // setQuoteVersions(data);
          setIsDisplayVersions(response.result.data.is_version_display);
          arr = await data.map((item: any) => ({
            ...item,
            name: (
              <div className="Button-Icon-Display">
                <LinkWithIcon className="Icon-space">
                  <span className="link-icon-text">{item.name}</span>
                </LinkWithIcon>
              </div>
            ),
          }));
          setQuoteVersions([...arr]);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }, [quoteDetails.quote_no]);

  useEffect(() => {
    getOptions();
  }, [getOptions, quoteInfo]);
  useEffect(() => {
    getQuoteVersions();
  }, [getQuoteVersions]);

  const saveQuestionsApi = useCallback(() => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteApprovalValues}?quote_id=${id}&sort=asc`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          // const data = response.result.data
          // saveQuestionsList = data
          setSaveQuestionsList(response.result.data);
          if (response.result.data && response.result.data.length) {
            response.result.data.map((obj: any) => {
              if (obj.code === "10k_quote_approval") {
                displayFields["10k"] = true;
                displayFields["10kId"] = obj.id;
              }
              if (obj.code === "25k_quote_approval") {
                displayFields["25k"] = true;
                displayFields["25kId"] = obj.id;
              }
              if (obj.code === "50k_quote_approval") {
                displayFields["50k"] = true;
                displayFields["50kId"] = obj.id;
              }
              return obj;
            });
            displayFields.noData = false;
          } else {
            displayFields.noData = true;
          }
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }, [displayFields, id]);
  useEffect(() => {
    setQuoteDetails(updatedQuoteInfo || quoteInfo);
    getQuoteStatus();
    saveQuestionsApi();
  }, [saveQuestionsApi, getQuoteStatus, quoteInfo, updatedQuoteInfo]);

  const [openFiftyApprovalModel, setOpenFiftyApprovalModel] =
    useState<boolean>(false);
  const [openTenApprovalModel, setOpenTenApprovalModel] =
    useState<boolean>(false);
  const [openTwentyFiveApprovalModel, setOpenTwentyFiveApprovalModel] =
    useState<boolean>(false);
  const [openClientApprovalModel, setOpenClientApprovalModel] =
    useState<boolean>(false);
  const [isSendQuoteAgain, setIsSendQuoteAgain] = useState<boolean>(false);
  const submitQuoteApproval = () => {
    if (quoteDetails.label_code === "submit_for_internal_approval") {
      if (quoteDetails.show_gp_confirmation) {
        setConfirmText(
          "Few Quote Items are having GP less than 23%, Do you want to continue ?"
        );
      } else {
        setConfirmText(
          "Are you sure you want to submit this quote for approval ?"
        );
      }
      setConFirm(true);
    } else if (
      quoteDetails.label_code === "10k_quote_approval" ||
      quoteDetails.label_code === "25k_quote_approval" ||
      quoteDetails.label_code === "50k_quote_approval"
    ) {
      saveQuestionsList.map((obj: any) => {
        if (
          obj.code === quoteDetails.label_code &&
          obj.is_saved &&
          quoteDetails.is_questions_saved
        ) {
          setprimaryBtnLabel("Approve");
          setsecondaryBtnLabel("Decline");
          setConfirmText(
            "Are you sure you want to submit this quote for approval ?"
          );
        } else if (
          (obj.code === quoteDetails.label_code && !obj.is_saved) ||
          !quoteDetails.is_questions_saved
        ) {
          setprimaryBtnLabel("Approval Questions");
          setsecondaryBtnLabel("Cancel");
          setConfirmText("Please save approval Questions before approve");
        }
        setConFirm(true);
        return obj;
      });
    } else if (quoteDetails.label_code === "submit_for_client_approval") {
      setOpenClientApprovalModel(true);
      setOpenModel(true);
    } else if (quoteDetails.label_code === "direct_approve") {
      setprimaryBtnLabel("Approve");
      setsecondaryBtnLabel("Decline");
      setConfirmText(
        "Are you sure you want to submit this quote for approval ?"
      );

      setConFirm(true);
    }
  };

  function navigateToSalesOrder() {
    setOpenSOModel(true);
  }
  const submitQuoteApi = () => {
    const apiObject = {
      payload: { quote_id: id },
      method: "POST",
      apiUrl: `${EndpointUrl.QuoteSubmitInternalApproval}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setToastMsg("Submitted for Approval");
          setSnackbar(true);
          const obj = {
            success: true,
            eventFrom: "submit_approval",
          };
          sendEventData(obj);
        } else {
          setConfirmHeader("");
          setsecondaryBtnLabel("");
          setprimaryBtnLabel("OK");
          setConfirmText(response.result.data);
          setConFirm(true);
        }
        sendOpacity(false);
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const cloneQuoteApi = () => {
    const param = {
      quote_id: id,
      customer_id: customerId,
    };
    const apiObject = {
      payload: param,
      method: "POST",
      apiUrl: `${EndpointUrl.QuoteClone}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setToastMsg("Quote Cloned Successfully");
          setSnackbar(true);

          history.push(
            `/${response.result.data.redirect_route}${response.result.data.id}`
          );
          const obj2 = {
            newQuoteId: response.result.data.id,
          };
          sendVersionEvent(obj2);
        } else {
          setConfirmHeader("");
          setsecondaryBtnLabel("OK");
          setprimaryBtnLabel("");
          setConfirmText(response.result.data);
          setConFirm(true);
        }
        sendOpacity(false);
      })
      .catch((err: string) => {
        console.log(err);
      });
  };

  const directApprove = (type?: string) => {
    sendOpacity(true);
    const param = {
      type: type || quoteDetails.label_code,
      quote_id: approvalInputData.quote_id,
      decline_comments: showDeclineTextBox ? approvalDeclineComments : "",
    };
    const apiObject = {
      payload: param,
      method: "POST",
      apiUrl: `${EndpointUrl.QuoteApproval}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          if (type === "rejected") {
            setDeleteArchiveList([]);
            setPrintList([
              {
                id: "1",
                element: (
                  <LinkWithIcon
                    onClick={() => cloneQuote()}
                    className={quoteDetails.is_repair ? "display-none" : ""}
                  >
                    <ImgTag
                      src={cloneIcon}
                      className="save-view Export-Image"
                    />
                    <span className="link-icon-text">Clone </span>
                  </LinkWithIcon>
                ),
              },
              {
                id: "2",
                element: (
                  <LinkWithIcon onClick={() => onHandlePrint()}>
                    <ImgTag
                      src={printIcon}
                      className="save-view Export-Image"
                    />
                    <span className="link-icon-text">Print</span>
                  </LinkWithIcon>
                ),
              },
              {
                id: "3",
                element: (
                  <LinkWithIcon onClick={() => onHandleDownload()}>
                    <ImgTag
                      src={downloadIcon}
                      className="save-view Export-Image"
                    />
                    <span className="link-icon-text">Download</span>
                  </LinkWithIcon>
                ),
              },
            ]);
          }
          setToastMsg("Updated Successfully");
          setSnackbar(true);
          const obj = {
            success: true,
            eventFrom: "submit_approval",
          };
          sendEventData(obj);
          setDeclineTextBox(false);
        } else {
          setConfirmHeader("");
          setsecondaryBtnLabel("");
          setprimaryBtnLabel("OK");
          setConfirmText(response.result.data);
          setConFirm(true);
        }
        sendOpacity(false);
        setDeclineTextBox(false);
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const quoteReviseApi = () => {
    const param = {
      quote_id: approvalInputData.quote_id,
    };
    const apiObject = {
      payload: param,
      method: "POST",
      apiUrl: EndpointUrl.QuoteRevise,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setToastMsg("Quote Revised Successfully");
          setSnackbar(true);
          getQuoteVersions();

          history.push(`/${response.result.data.navigate_to}`);
          setSelectedVersion(quoteVersions[quoteVersions.length - 1]);
          const obj2 = {
            newQuoteId: response.result.data.id,
          };
          sendVersionEvent(obj2);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };

  async function triggerApprovalEvent(e: any) {
    console.log(e);
    if (
      openApprovalQuestions &&
      tabIndex !== 2 &&
      saveQuestionsList.length !== tabIndex + 1
    ) {
      setTabIndex(tabIndex + 1);
      onTabChange(tabIndex + 1);
      saveQuestionsApi();

      if (saveQuestionsList.length === tabIndex) {
        setIsSendQuoteAgain(false);
        setOpenModel(false);
        setOpenApprovalQuestions(false);
      }
    } else {
      if (e.success) {
        setToastMsg("Updated Successfully");
        setSnackbar(true);
        const obj = {
          success: true,
          eventFrom: "submit_approval",
        };
        sendEventData(obj);
      }
      setOpenFiftyApprovalModel(false);
      setOpenTenApprovalModel(false);
      setOpenTwentyFiveApprovalModel(false);
      setOpenClientApprovalModel(false);
      setOpenModel(false);
      setOpenApprovalQuestions(false);
      setIsSendQuoteAgain(false);
    }
  }

  const [actionType, setActionType] = useState("");
  function quoteReopen(type: string) {
    setActionType(type);
    setConfirmText(`Are you sure you want to ${type} this quote ?`);
    setConFirm(true);
    // closeOrOpenQuote('reopen')
  }
  function quoteClose(type: string) {
    setActionType(type);
    setConfirmText(`Are you sure you want to ${type} this quote ?`);
    setConFirm(true);
    // closeOrOpenQuote('close')
  }
  const closeOrOpenQuote = (type: string) => {
    const apiObject = {
      payload: {},
      method: "PUT",
      apiUrl:
        type === "Re Open"
          ? `${EndpointUrl.QuoteReopen}/${id}`
          : `${EndpointUrl.QuoteClose}/${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setToastMsg("Updated Successfully");
          setSnackbar(true);
          const obj = {
            success: true,
            eventFrom: "submit_approval",
          };
          sendEventData(obj);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const [wonOrLostType, setWonOrLostType] = useState("");
  const quoteWonApi = () => {
    const params = {
      type: wonOrLostType,
      quote_id: id,
      option_id: optionsList[0].id,
      comments: declineComments,
    };
    console.log(params);
    const apiObject = {
      payload: params,
      method: "PUT",
      apiUrl: `${EndpointUrl.QuoteSubmitClientApproval}/${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: any) => {
        if (response.result.success) {
          setToastMsg("Updated Successfully");
          setSnackbar(true);
          const obj = {
            success: true,
            eventFrom: "submit_approval",
          };
          sendEventData(obj);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  async function getConfirmModelEvent(e: string) {
    setConfirmHeader("Confirmation");
    setsecondaryBtnLabel("Cancel");
    setprimaryBtnLabel("Proceed");
    sendOpacity(true);
    console.log(confirmText);
    if (
      quoteDetails.status_code !== "pending_approval" &&
      quoteDetails.status_code !== "delivered_to_customer" &&
      quoteDetails.status_code !== "rejected" &&
      quoteDetails.label_code === "submit_for_internal_approval" &&
      (confirmText ===
        "Are you sure you want to submit this quote for approval ?" ||
        confirmText ===
          "Few Quote Items are having GP less than 23%, Do you want to continue ?") &&
      e === "accept"
    ) {
      submitQuoteApi();
    } else if (confirmText === "Are you sure you want to clone this quote ?") {
      cloneQuoteApi();
    } else if (quoteDetails.status_code === "rejected" && e === "accept") {
      closeOrOpenQuote(actionType);
    } else if (
      quoteDetails.status_code === "delivered_to_customer" &&
      e === "accept" &&
      confirmText !==
        "This will move the quote to Open, Do you want to continue ?"
    ) {
      quoteWonApi();
    } else if (
      (quoteDetails.status_code === "open" ||
        quoteDetails.status_code === "pending_approval") &&
      quoteDetails.label_code === "direct_approve" &&
      e === "accept" &&
      confirmText ===
        "Are you sure you want to submit this quote for approval ?"
    ) {
      directApprove();
    } else if (
      quoteDetails.status_code === "pending_approval" &&
      quoteDetails.label_code === "direct_approve" &&
      e === "accept" &&
      !confirmText
    ) {
      directApprove();
    } else if (
      confirmText ===
      "This will move the quote to Open, Do you want to continue ?"
    ) {
      quoteReviseApi();
    } else if (
      (quoteDetails.status_code === "pending_approval_10k" ||
        quoteDetails.status_code === "pending_approval_25k" ||
        quoteDetails.status_code === "pending_approval_50k" ||
        quoteDetails.status_code === "pending_approval") &&
      confirmText ===
        "Are you sure you want to submit this quote for approval ?"
    ) {
      directApprove();
    } else if (
      (quoteDetails.status_code === "pending_approval_10k" ||
        quoteDetails.status_code === "pending_approval_25k" ||
        quoteDetails.status_code === "pending_approval_50k" ||
        quoteDetails.status_code === "pending_approval") &&
      confirmText === "Please save approval Questions before approve"
    ) {
      if (saveQuestionsList.length) {
        setOpenApprovalQuestions(true);
        sendOpacity(false);

        for (let i = 0; i < saveQuestionsList.length; i += 1) {
          if (
            !saveQuestionsList[i].is_saved &&
            !quoteDetails.is_questions_saved
          ) {
            setTabIndex(i);
            onTabChange(i);
            break;
          }
        }
      }
    } else {
      sendOpacity(false);
    }
    setConFirm(false);
  }

  function DeclineToArrove({ sendData }: any) {
    const [approvalDeclineComments2, setApprovalDeclineComments2] =
      useState("");

    const onDeclineComments = (e: any) => {
      setApprovalDeclineComments2(e.target.value);
      sendData(e.target.value);
    };
    return (
      <div>
        Are you sure you want to decline this quote ?
        <div style={{ paddingTop: "10px" }}>
          <PiTextArea
            label="Notes"
            libraryType="atalskit"
            onChange={onDeclineComments}
            value={approvalDeclineComments2}
            placeholder="Type here..."
            name="textarea"
          />
        </div>
      </div>
    );
  }
  function DeclineFromClient({ type, sendData }: any) {
    const [declineComments2, setDeclineComments2] = useState("");
    const [labelName, setLabelname] = useState("");
    const getType = (name: string) => {
      console.log(name);
      if (name === "won") {
        return "approve ?";
      }
      if (name === "lost") {
        return "reject ?";
      }
      return name;
    };
    useEffect(() => {
      const label = getType(type);
      setLabelname(label);
    }, []);
    const onDeclineComments = (e: any) => {
      setDeclineComments2(e.target.value);
      sendData(e.target.value);
    };

    return (
      <div>
        Are you sure you want to mark it as {labelName}
        {getUserLoggedPermission() === false && type === "lost" && (
          <div style={{ paddingTop: "10px" }}>
            <PiTextArea
              label="Comments"
              libraryType="atalskit"
              onChange={onDeclineComments}
              value={declineComments2}
              placeholder="Type here..."
              name="textarea"
            />
          </div>
        )}
      </div>
    );
  }

  const triggerCommentData = (e: any) => {
    setApprovalDeclineComments(e);
  };

  const triggerDeclineComment = (e: any) => {
    setDeclineComments(e);
  };
  const quoteWon = (type: string) => {
    setWonOrLostType(type);
    if (optionsList.length > 1 && type !== "lost") {
      setprimaryBtnLabel("Save");
      setsecondaryBtnLabel("Cancel");
      // setConfirmText(
      //  `Are you sure you want to mark it as ${
      //    getUserLoggedPermission() === false && type === "won"
      //      ? "approve"
      //      : getUserLoggedPermission() === false && type === "lost"
      //      ? "reject"
      //      : type
      //  } ?`
      // );
      setConfirmText(
        <DeclineFromClient type={type} sendData={triggerDeclineComment} />
      );
      setConfirmWon(true);
    } else {
      // setConfirmText(
      //  `Are you sure you want to mark it as ${
      //    getUserLoggedPermission() === false && type === 'won'
      //      ? 'approve'
      //      : getUserLoggedPermission() === false && type === 'lost'
      //      ? 'reject'
      //      : type
      //  } ?`,
      // )
      setConfirmText(
        <DeclineFromClient type={type} sendData={triggerDeclineComment} />
      );
      setConFirm(true);
    }

    // setConFirm(true)
  };

  const triggerData = useCallback(
    async (e: any) => {
      setConfirmPrint(false);
      console.log(e);
      if (confirmApiUrl === "v1/Quote-SubmitClientApproval" && e.success) {
        setToastMsg("Submitted for Approval");
        setSnackbar(true);
        const obj = {
          success: true,
          eventFrom: "submit_approval",
        };
        sendEventData(obj);
      }
    },
    [sendEventData, confirmApiUrl]
  );
  const getCloneData = useCallback(async (e: any) => {
    if (e.close) {
      setShowClonePopUp(false);
    } else if (e.payload) {
      setCustomerId(e.payload.customer_id.value);
      setConfirmText("Are you sure you want to clone this quote ?");
      setConFirm(true);
      setShowClonePopUp(false);
    }
  }, []);

  const triggerWonData = useCallback(async () => {
    setConfirmWon(false);
    const obj = {
      success: true,
      eventFrom: "submit_approval",
    };
    sendEventData(obj);
  }, [sendEventData]);

  const updateDelivedStatus = (e: any) => {
    console.log(e);
    if (optionsList.length > 1 && e.code === "delivered_to_customer") {
      setConfirmApiUrl(EndpointUrl.SubmitClientApprovalApi);
      setConfirmPrint(true);
    } else {
      sendOpacity(true);
      const params = {
        quote_id: id,
        option_ids: [optionsList.length ? optionsList[0].id : ""],
        type: e.code,
        // type: 'submit_for_client_approval',
        is_manual: true,
      };
      const apiObject = {
        payload: params,
        method: "PUT",
        apiUrl: `${EndpointUrl.SubmitClientApprovalApi}/${id}`,
        headers: {},
      };
      triggerApi(apiObject)
        .then(async (response: any) => {
          if (response.result.success) {
            if (e.code === "submit_for_client_approval") {
              setToastMsg("Submitted for Approval");
            } else {
              setToastMsg("Updated Successfully");
            }

            setSnackbar(true);
            const obj = {
              success: true,
              eventFrom: "submit_approval",
            };
            sendEventData(obj);
          } else {
            setConfirmHeader("");
            setsecondaryBtnLabel("OK");
            setprimaryBtnLabel("");
            setConfirmText(response.result.data);
            setConFirm(true);
          }
          sendOpacity(false);
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  };
  const reviseQuote = () => {
    setConfirmText(
      "This will move the quote to Open, Do you want to continue ?"
    );
    setConFirm(true);
  };

  const saveQuestions = () => {
    if (saveQuestionsList.length) {
      setOpenApprovalQuestions(true);
      setTabIndex(0);
      onTabChange(0);
    }
  };
  const onDeclineEvent = () => {
    setConfirmHeader("Confirmation");

    if (
      (quoteDetails.status_code === "open" ||
        quoteDetails.status_code === "pending_approval_10k" ||
        quoteDetails.status_code === "pending_approval_25k" ||
        quoteDetails.status_code === "pending_approval_50k" ||
        quoteDetails.status_code === "pending_approval") &&
      secondaryBtnLabel === "Decline" &&
      !showDeclineTextBox
    ) {
      setDeclineTextBox(true);
      setsecondaryBtnLabel("Proceed");
      setprimaryBtnLabel("");
      setConfirmText(<DeclineToArrove sendData={triggerCommentData} />);
    } else if (showDeclineTextBox) {
      setsecondaryBtnLabel("Cancel");
      setprimaryBtnLabel("Proceed");
      setDeclineTextBox(false);
      directApprove("rejected");
      setConFirm(false);
    } else {
      setsecondaryBtnLabel("Cancel");
      setprimaryBtnLabel("Proceed");
      setConFirm(false);
    }
  };
  const triggerCreateSO = async (e: any) => {
    if (e.success) {
      setOpenSOModel(false);
      console.log(e && e.jobErr ? e.jobErr : "", 9666);
      setTimeout(() => {
        history.push({
          pathname: `/orders-detail-view/${e.id}`,
          state: {
            jobWarningMsgs: e && e.jobErr ? e.jobErr : "",
          },
        });
      }, 500);
    } else if (e.close) {
      setOpenSOModel(false);
    }
  };
  const switchVersions = (e: any) => {
    console.log(e, 1311);
    setSelectedVersion(e);
    const obj = {
      newQuoteId: e.id,
    };
    history.push(`/${e.navigate_to}`);
    sendVersionEvent(obj);
  };
  const closeModel = () => {
    history.replace(`/${window.location.pathname.split("/")[1]}`);
  };
  const deleteQuoteApi = () => {
    sendOpacity(true);

    const apiObject = {
      payload: {},
      method: "DELETE",
      apiUrl: `${EndpointUrl.DeleteQuote}/${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setToastMsg("Quote Deleted Successful");
          setSnackbar(true);
          setTimeout(() => {
            history.replace(`/${window.location.pathname.split("/")[1]}`);
            sendOpacity(false);
          }, 1500);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const archiveQuoteQuoteApi = () => {
    sendOpacity(true);

    const apiObject = {
      payload: {},
      method: "PUT",
      apiUrl: `${EndpointUrl.ArchiveQuote}/${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setToastMsg("Quote Archived Successful");
          setSnackbar(true);
          setDeleteArchiveList([]);
          if (
            permissionObject.Edit === true &&
            selectedVersion &&
            selectedVersion?.is_latest_version
          ) {
            setPrintList([
              {
                id: "1",
                element: (
                  <LinkWithIcon
                    onClick={() => cloneQuote()}
                    className={quoteDetails.is_repair ? "display-none" : ""}
                  >
                    <ImgTag
                      src={cloneIcon}
                      className="save-view Export-Image"
                    />
                    <span className="link-icon-text">Clone </span>
                  </LinkWithIcon>
                ),
              },
              {
                id: "2",
                element: (
                  <LinkWithIcon onClick={() => onHandlePrint()}>
                    <ImgTag
                      src={printIcon}
                      className="save-view Export-Image"
                    />
                    <span className="link-icon-text">Print</span>
                  </LinkWithIcon>
                ),
              },
              {
                id: "3",
                element: (
                  <LinkWithIcon onClick={() => onHandleDownload()}>
                    <ImgTag
                      src={downloadIcon}
                      className="save-view Export-Image"
                    />
                    <span className="link-icon-text">Download</span>
                  </LinkWithIcon>
                ),
              },
            ]);
          } else {
            setPrintList([
              {
                id: "2",
                element: (
                  <LinkWithIcon onClick={() => onHandlePrint()}>
                    <ImgTag
                      src={printIcon}
                      className="save-view Export-Image"
                    />
                    <span className="link-icon-text">Print</span>
                  </LinkWithIcon>
                ),
              },
              {
                id: "3",
                element: (
                  <LinkWithIcon onClick={() => onHandleDownload()}>
                    <ImgTag
                      src={downloadIcon}
                      className="save-view Export-Image"
                    />
                    <span className="link-icon-text">Download</span>
                  </LinkWithIcon>
                ),
              },
            ]);
          }
          const obj = {
            success: true,
          };
          setTimeout(() => {
            sendEventData(obj);
            sendOpacity(false);
          }, 1500);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  async function onDeleteQuote(e: any) {
    if (e === "accept") {
      setOpenDeleteConFirm(false);
      deleteQuoteApi();
    }
  }
  async function onArchiveQuote(e: any) {
    if (e === "accept") {
      setOpenArchiveConFirm(false);
      archiveQuoteQuoteApi();
    }
  }
  const onDeleteCancel = () => {
    setOpenDeleteConFirm(false);
  };
  const onArchiveCancel = () => {
    setOpenArchiveConFirm(false);
  };
  const sendQuoteAgain = () => {
    setIsSendQuoteAgain(true);
    setOpenClientApprovalModel(true);
    setOpenModel(true);
  };

  return (
    <>
      <HeaderContainer>
        <BackSection>
          <RepairIdsDiv>
            <BackButton onClick={closeModel}>
              <img src={ChevronLeft} alt="loading" />
            </BackButton>
            <img
              className="repair-view-left-image"
              src={QuotesImg}
              alt="loading"
            />
            <RepairIds>
              <div className="quote-num-and-status">
                <div className="id-num">
                  #{quoteDetails && quoteDetails ? quoteDetails.quote_no : "-"}
                </div>
                <PiTypography component="label">
                  {quoteDetails.option_won ? quoteDetails.option_won : ""}
                </PiTypography>
                {getUserLoggedPermission() && isDisplayVersions && (
                  <div>
                    <DetailViewStatusDropdown>
                      <PiDropdownMenu
                        items={quoteVersions}
                        label={selectedVersion ? selectedVersion.name : ""}
                        onOpenChange={(e: any) => switchVersions(e)}
                      />
                    </DetailViewStatusDropdown>
                  </div>
                )}
                <QuoteActivityPill
                  className={getStatusClassName(quoteDetails.status)}
                >
                  {quoteDetails.status || quoteDetails.status_code}
                </QuoteActivityPill>
                {quoteStatusList &&
                  quoteStatusList.length > 0 &&
                  getUserLoggedPermission() &&
                  !quoteInfo.is_revised && (
                    <DetailViewStatusDropdown>
                      <PiDropdownMenu
                        items={quoteStatusList}
                        label=""
                        onOpenChange={(e: any) => updateDelivedStatus(e)}
                      />
                    </DetailViewStatusDropdown>
                  )}
              </div>
              <div style={{ display: "flex" }}>
                <div
                  className="repair-name"
                  title={
                    quoteDetails && quoteDetails.customer_name
                      ? quoteDetails.customer_name
                      : "-"
                  }
                >
                  {quoteDetails && quoteDetails.customer_name
                    ? quoteDetails.customer_name
                    : "-"}
                </div>
                {getUserLoggedPermission() &&
                  saveQuestionsList.map((obj: any) => (
                    <ApprovedHeaderLabels
                      className={obj.is_approved ? "enable" : "disable"}
                      title={obj.approval_label}
                      style={{ marginRight: "6px" }}
                    >
                      <PiTypography component="label">
                        {obj.approval_label}
                      </PiTypography>
                    </ApprovedHeaderLabels>
                  ))}
              </div>
            </RepairIds>
          </RepairIdsDiv>
        </BackSection>

        <RightSideContent>
          {!quoteDetails.is_revised && (
            <>
              {quoteDetails &&
                (quoteDetails.status_code === "won" ||
                  quoteDetails.status_code === "won_so_created") &&
                quoteDetails.credit_on_hold === "No" &&
                quoteDetails.is_sales_order_created === false &&
                createSoPermObject.create_sales_order &&
                getUserLoggedPermission() && (
                  <div className="Button-Icon-Display">
                    <LinkWithIcon
                      className="Icon-space primary-button "
                      onClick={() => navigateToSalesOrder()}
                    >
                      <ImgTag src={AddLogo} alt="loading" />
                      <span className="button-icon-text ">
                        Create Sales Order
                      </span>
                    </LinkWithIcon>
                  </div>
                )}
              {getUserLoggedPermission() &&
                quoteDetails.is_display_revise === true && (
                  <div>
                    <PiButton
                      appearance="secondary"
                      label="Revise Quote"
                      libraryType="atalskit"
                      onClick={reviseQuote}
                    />
                  </div>
                )}

              {(quoteDetails.status_code === "open" ||
                quoteDetails.status_code === "pending_approval" ||
                quoteDetails.status_code === "pending_approval_10k" ||
                quoteDetails.status_code === "pending_approval_25k" ||
                quoteDetails.status_code === "pending_approval_50k") &&
                saveQuestionsList.length > 0 &&
                permissionObject.Edit === true &&
                getUserLoggedPermission() && (
                  <PiButton
                    appearance="secondary"
                    label="Approval Questions"
                    onClick={saveQuestions}
                  />
                )}
              {quoteDetails?.is_display &&
                quoteDetails.label &&
                quoteDetails?.is_print_display && (
                  <div className="approve_button">
                    <PiButton
                      appearance="primary"
                      label={quoteDetails.label}
                      onClick={submitQuoteApproval}
                    />
                  </div>
                )}
              {quoteReOpenPermObject.quote_reopen &&
                quoteDetails.status_code === "rejected" && (
                  <PiButton
                    appearance="primary"
                    label="Re Open"
                    onClick={() => quoteReopen("Re Open")}
                  />
                )}
              {quoteClosePermObject.quote_close &&
                quoteDetails.status_code === "rejected" && (
                  <PiButton
                    appearance="secondary"
                    label="Close"
                    onClick={() => quoteClose("Close")}
                  />
                )}
              {sendQuoteAgainPermissionObj?.send_to_customer &&
                quoteDetails?.status_code === "delivered_to_customer" && (
                  <PiButton
                    appearance="primary"
                    label="Resend Quote"
                    onClick={() => sendQuoteAgain()}
                    isDisabled={!(optionsList.length > 0)}
                  />
                )}

              {quoteDetails &&
                quoteDetails.status_code === "delivered_to_customer" &&
                permissionObject.Edit === true && (
                  <>
                    <PiButton
                      appearance="primary"
                      label={getUserLoggedPermission() ? "Won" : "Approve"}
                      onClick={() => quoteWon("won")}
                      isDisabled={!(optionsList.length > 0)}
                    />
                    <PiButton
                      appearance="secondary"
                      label={getUserLoggedPermission() ? "Lost" : "Reject"}
                      onClick={() => quoteWon("lost")}
                      isDisabled={!(optionsList.length > 0)}
                    />
                  </>
                )}
            </>
          )}
          {!quoteDetails?.is_print_display &&
            deletePermissionObj?.delete_quote &&
            selectedVersion &&
            selectedVersion?.is_latest_version &&
            !quoteDetails.is_repair &&
            (quoteInfo?.status_code === "open" ||
              quoteInfo?.status_code.includes("pending_approval")) && (
              <DetailViewHeaderRightIcons>
                <div>
                  <PiTooltip content="Delete Quote" libraryType="atalskit">
                    <div
                      className="quote-option-del-icon"
                      onClick={() => deleteQuote()}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          deleteQuote();
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <img src={deleteIcon} alt="delete-icon" />
                    </div>
                  </PiTooltip>
                </div>
              </DetailViewHeaderRightIcons>
            )}
          {quoteDetails.is_print_display && getUserLoggedPermission() && (
            <DetailViewHeaderRightIcons>
              <div className="no-dropdown">
                {permissionObject.Edit === true &&
                  selectedVersion &&
                  selectedVersion.is_latest_version &&
                  !quoteDetails.is_repair && (
                    <PiTooltip content="Clone Quote" libraryType="atalskit">
                      <div
                        className="quote-option-del-icon"
                        onClick={() => cloneQuote()}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            cloneQuote();
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <img src={cloneIcon} alt="print-icon" />
                      </div>
                    </PiTooltip>
                  )}
                <PiTooltip content="Print" libraryType="atalskit">
                  <div
                    className="quote-option-del-icon"
                    onClick={() => onHandlePrint()}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        onHandlePrint();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <img src={printIcon} alt="print-icon" />
                  </div>
                </PiTooltip>

                <PiTooltip content="Download" libraryType="atalskit">
                  <div
                    className="quote-option-del-icon"
                    onClick={() => onHandleDownload()}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        onHandleDownload();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <img src={downloadIcon} alt="download-icon" />
                  </div>
                </PiTooltip>
              </div>

              <div className="dropdown">
                <PiIconDropdownMenu items={printList} onOpenChange={() => {}} />
              </div>

              {deleteArchiveList?.length > 0 &&
                selectedVersion &&
                selectedVersion?.is_latest_version &&
                !quoteInfo?.is_repair && (
                  <div className="is_display">
                    <PiIconDropdownMenu
                      items={deleteArchiveList}
                      onOpenChange={() => {}}
                    />
                  </div>
                )}
            </DetailViewHeaderRightIcons>
          )}
        </RightSideContent>
      </HeaderContainer>
      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel={toastMsg}
        message=""
        onClose={async () => setSnackbar(false)}
      />

      <PiConfirmModel
        className={piconfirmClass}
        headerLabel={confirmHeader}
        message={confirmText}
        primaryBtnLabel={primaryBtnLabel}
        secondaryBtnLabel={secondaryBtnLabel}
        onClose={() => {
          setConFirm(false);
          setConfirmHeader("Confirmation");
          setsecondaryBtnLabel("Cancel");
          setprimaryBtnLabel("Proceed");
          setDeclineTextBox(false);
        }}
        onAccept={(e: any) => getConfirmModelEvent(e)}
        onDecline={() => onDeclineEvent()}
      />

      <PiConfirmModel
        className={openDeleteConFirm ? "show" : ""}
        headerLabel={confirmHeader}
        message={confirmText}
        primaryBtnLabel={primaryBtnLabel}
        secondaryBtnLabel={secondaryBtnLabel}
        onClose={() => {
          setOpenDeleteConFirm(false);
          setConfirmHeader("Confirmation");
          setsecondaryBtnLabel("Cancel");
          setprimaryBtnLabel("Proceed");
        }}
        onAccept={(e: any) => onDeleteQuote(e)}
        onDecline={() => onDeleteCancel()}
      />
      <PiConfirmModel
        className={openArchiveConFirm ? "show" : ""}
        headerLabel={confirmHeader}
        message={confirmText}
        primaryBtnLabel={primaryBtnLabel}
        secondaryBtnLabel={secondaryBtnLabel}
        onClose={() => {
          setOpenArchiveConFirm(false);
          setConfirmHeader("Confirmation");
          setsecondaryBtnLabel("Cancel");
          setprimaryBtnLabel("Proceed");
        }}
        onAccept={(e: any) => onArchiveQuote(e)}
        onDecline={() => onArchiveCancel()}
      />

      {openFiftyApprovalModel && (
        <PiSideDrawer isOpen={openModel} width="narrow">
          <FiftykApproval
            approvalInputData={approvalInputData}
            sendModelData={(e: any) => triggerApprovalEvent(e)}
          />
        </PiSideDrawer>
      )}
      {openApprovalQuestions && (
        <SideDrawerW40>
          <PiSideDrawer isOpen={openModel} width="narrow">
            <SideDrawerHeader>
              <PiTypography component="h3">Approval Questions</PiTypography>
              {approvalInputData && approvalInputData.eventFrom === "quote" && (
                <CloseButton
                  onClick={() => {
                    setTabIndex(0);
                    setOpenModel(false);
                    setOpenApprovalQuestions(false);
                  }}
                  title="close"
                  className="Hover"
                >
                  <img src={CrossLogo} alt="loading" />
                </CloseButton>
              )}
            </SideDrawerHeader>
            <SaveApproveQuestionTabs>
              {!displayFields.noData && (
                <PiTabGroup id="tab" onChange={onTabChange} selected={tabIndex}>
                  <PiTabHeaderPanel>
                    {saveQuestionsList.map((obj: any) => (
                      <div
                        className={!obj.is_enable ? "disable-btns" : ""}
                        title={obj.hover_msg}
                      >
                        <PiTabHeader>{obj.name}</PiTabHeader>
                      </div>
                    ))}
                  </PiTabHeaderPanel>
                  {displayFields["10k"] && (
                    <PiTabPanel>
                      <TenkApproval
                        displayFields={displayFields}
                        approvalInputData={approvalInputData}
                        sendModelData={(e: any) => triggerApprovalEvent(e)}
                      />
                    </PiTabPanel>
                  )}
                  {displayFields["25k"] && (
                    <PiTabPanel>
                      <TwentyFiveApproval
                        displayFields={displayFields}
                        approvalInputData={approvalInputData}
                        sendModelData={(e: any) => triggerApprovalEvent(e)}
                      />
                    </PiTabPanel>
                  )}
                  {displayFields["50k"] && (
                    <PiTabPanel>
                      <FiftykApproval
                        displayFields={displayFields}
                        approvalInputData={approvalInputData}
                        sendModelData={(e: any) => triggerApprovalEvent(e)}
                      />
                    </PiTabPanel>
                  )}
                </PiTabGroup>
              )}
              {displayFields.noData && (
                <NoUserFound> Data Not Found</NoUserFound>
              )}
            </SaveApproveQuestionTabs>
          </PiSideDrawer>
        </SideDrawerW40>
      )}
      {openTenApprovalModel && (
        <PiSideDrawer isOpen={openModel} width="narrow">
          <TenkApproval
            approvalInputData={approvalInputData}
            sendModelData={(e: any) => triggerApprovalEvent(e)}
          />
        </PiSideDrawer>
      )}
      {openTwentyFiveApprovalModel && (
        <PiSideDrawer isOpen={openModel} width="narrow">
          <TwentyFiveApproval
            approvalInputData={approvalInputData}
            sendModelData={(e: any) => triggerApprovalEvent(e)}
          />
        </PiSideDrawer>
      )}
      {openClientApprovalModel && (
        <SideDrawerW40>
          <PiSideDrawer isOpen={openModel} width="narrow">
            <ClientApprovalForm
              quoteInfo={quoteInfo}
              isSendQuoteAgain={isSendQuoteAgain}
              approvalInputData={approvalInputData}
              sendModelData={(e: any) => triggerApprovalEvent(e)}
            />
          </PiSideDrawer>
        </SideDrawerW40>
      )}
      {confirmPrint === true && (
        <PrintConfirmModel
          confirmApiUrl={confirmApiUrl}
          quoteInfo={quoteInfo}
          sendData={triggerData}
          options={optionsList}
          sendOpacity={(e: boolean) => sendOpacity(e || false)}
        />
      )}
      {showClonepopUp && <CloneQuoteConfirmModel sendData={getCloneData} />}
      {confirmWon && (
        <WonConfirmModel
          wonOrLostType={wonOrLostType}
          quoteInfo={quoteInfo}
          sendData={triggerWonData}
        />
      )}
      {openSOModel && (
        <CreateSOForm quoteInfo={quoteInfo} sendModelData={triggerCreateSO} />
      )}
    </>
  );
}

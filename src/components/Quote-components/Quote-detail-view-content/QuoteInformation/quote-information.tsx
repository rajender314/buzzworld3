/* eslint-disable react/no-unstable-nested-components */
import {
  PiTypography,
  PiLabelName,
  PiAddress,
  PiSelect,
  PiInput,
  PiDateTimePicker,
  PiButton,
  PiConfirmModel,
  PiToast,
  PiCreateSelect,
} from "pixel-kit";
import { useEffect, useState } from "react";
import { RepairInfoSection } from "@app/components/detail-view-content/detail-view-content.component";
import {
  UserNameField,
  AvatarSection,
} from "@app/components/RepairInformation/repair-information.component";
import { UserRoleField } from "@app/components/usersComponents/userslist/userslist.component";
import Avatar from "@app/assets/images/avator.svg";
import QuoteStatusAppearance from "@app/core/components/gridStatus/quote-status-apperance";
import ThemecolorEdit from "@app/assets/images/themecolorEdit.svg";
import moment from "moment";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse, FilterColumnProps } from "@app/services/schema/schema";
import { RFQTimeList } from "@app/modules/Quotes/Repair-Quotes/helpers/quote-helpers";
import { getUserLoggedPermission } from "@app/helpers/helpers";
import {
  LinkWithIcon,
  ImgTag,
} from "@app/components/secondaryheader/secondaryheader.component";
import AddLogo from "@app/assets/images/Plus.svg";
import { useHistory } from "react-router-dom";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import { AvatorDropdown, QuoteInfoDatePicker } from "./quote-info.component";
import QuotesAddContact from "./quotes-add-contact";

export default function QuoteInformation({ quoteDetails, sendEvent }: any) {
  const [quoteCardDetails, setQuoteCardDetails]: any = useState();
  const [permissionObject, setpermissionObject] = useState<any>({});
  const [rfQEdit, setRfQEdit] = useState(false);
  const [editQuoteRequestBy, setEditQuoteRequestBy] = useState(false);
  const [editProjectName, setEditProjectName] = useState(false);
  const [editQuotedBy, setEditQuotedBy] = useState(false);
  const [payTermsEdit, setPayTermsEditEdit] = useState(false);
  const [fobList, setFobList] = useState([]);
  const [payTerms, setPayTerms] = useState([]);
  const [taxableStatus, setTaxableStatus] = useState([]);
  const [quoteTypeEdit, setQuoteTypeEdit] = useState(false);
  const [taxableEdit, setTaxableEdit] = useState(false);
  const [ispoReQuoteEdit, setPoReQuoteEdit] = useState(false);
  const [isFobEdit, setFobEdit] = useState(false);
  const [openConFirm, setConFirm] = useState(false);
  const [confirmText, setConfirmText] = useState<any>();
  const [confirmHeader, setConfirmHeader] = useState("Confirmation");
  const [customerListLoader, setcustomerListLoader] = useState(true);
  const [quoteStatus, setQuoteStatus] = useState("");
  const [openAddContact, setOpenAddContact] = useState(false);
  const [selectedQuoteData, setSelectedQuoteData]: any = useState({
    fob: "",
    rfqDate: "",
    quoteReqBy: "",
    quotedBy: "",
    payterms: "",
    TaxableStatus: "",
    Payterms: "",
    PoRequote: "",
    PoRequoteNumber: "",
  });
  const [openSnackbar, setSnackbar] = useState(false);
  const [quoteTypes, setQuoteTypes] = useState([]);
  const [toastMsg, setToastMsg] = useState("Updated Successfully");
  const [quoteCustomerList, setQuoteCustomerList] = useState([]);
  const [isEditEnable, setIsEditEnable] = useState(false);
  const [quotedByList, setquotedByList] = useState([]);
  const [showPoNumberField, setshowPoNumberField] = useState(false);
  const history = useHistory();
  const [piconfirmClass, setPiconfirmClass] = useState("");
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

  useEffect(() => {
    (async () => {
      const permission: any = await getPermissionObject("quote_for_parts");
      if (quoteCardDetails) {
        setQuoteStatus(quoteCardDetails.status);
        // setSelectedFob(quoteCardDetails.fob_id)
        selectedQuoteData.fob = quoteCardDetails.fob_id;
        selectedQuoteData.quoteType = quoteCardDetails.quote_type;
        selectedQuoteData.rfqDate = quoteCardDetails.rfq_recieved_date;
        selectedQuoteData.quoteReqBy = quoteCardDetails.quote_requested_by;
        selectedQuoteData.quotedBy = quoteCardDetails.quoted_by;
        selectedQuoteData.TaxableStatus = quoteCardDetails.taxable_status;
        selectedQuoteData.Payterms = quoteCardDetails.payterms;
        selectedQuoteData.PoRequote = quoteCardDetails.is_po_requote;
        selectedQuoteData.PoRequoteNumber = quoteCardDetails.po_requote_numer;
        selectedQuoteData.ProjectName = quoteCardDetails.project_name;
        setSelectedQuoteData(selectedQuoteData);
      }
      if (
        permission.Edit &&
        quoteCardDetails &&
        quoteCardDetails.status_code === "open" &&
        getUserLoggedPermission() &&
        quoteCardDetails.is_revised === false &&
        quoteCardDetails.is_repair === false
      ) {
        setIsEditEnable(true);
      } else {
        setIsEditEnable(false);
      }

      // if (quoteCardDetails && quoteCardDetails.is_revised === false) {
      //  setIsEditEnable(true)
      // } else {
      //  setIsEditEnable(false)
      // }
      setpermissionObject(permission);
      setQuoteCardDetails(quoteDetails);
    })();
  }, [quoteCardDetails, quoteDetails]);

  const getQuotedByList = () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteUsers}?quote_id=${quoteDetails.id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const data = response.result.data.list;
          let arr = [];
          arr = data.map((item: FilterColumnProps) => ({
            value: item.id,
            label: item.name || "No Name",
            ...item,
          }));
          setquotedByList(arr);
        }
      })
      .catch(() => {});
  };
  const getQuoteTypes = () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteQuoteTypes}?is_dropdown=true&status[0]=true&sort=asc`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          let arr = [];
          arr = data.map((item: FilterColumnProps) => ({
            value: item.id,
            label: item.name,
            ...item,
          }));
          setQuoteTypes(arr);
        }
      })
      .catch(() => {});
  };
  const getQuoteCustomerDropdown = () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteCustomerDropdown}?organization[0]=${quoteDetails.customer_id}&quote_id=${quoteDetails.id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          setcustomerListLoader(false);
          const data = response.result.data.contacts;
          let arr = [];
          arr = data.map((item: FilterColumnProps) => ({
            value: item.id,
            label: item.name,
            ...item,
          }));

          setQuoteCustomerList(arr);
        }
      })
      .catch(() => {});
  };
  const [searchedName, setSearchedName] = useState();

  const quoteTaxableStatus = () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteTaxableStatus}?is_dropdown=true&quote_id=${quoteDetails.id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          let arr = [];
          arr = data.map((item: FilterColumnProps) => ({
            value: item.id,
            label: item.name,
            ...item,
          }));
          setTaxableStatus(arr);
        }
      })
      .catch(() => {});
  };
  const quotePayTerms = () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteQuotePayTerms}?is_dropdown=true&quote_id=${quoteDetails.id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          let arr = [];
          arr = data.map((item: FilterColumnProps) => ({
            value: item.id,
            label: item.name,
            ...item,
          }));
          setPayTerms(arr);
        }
      })
      .catch(() => {});
  };

  const getFobList = () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.fobList}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response && response.result.success) {
          const data = response.result.data.list;
          // let arr = []
          // arr = data.map((item: any) => {
          //  return {
          //    value: item.id,
          //    label: item.name,
          //    ...item,
          //  }
          // })
          setFobList(data);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (isEditEnable) {
      getQuotedByList();
    }
  }, [isEditEnable, quoteCardDetails]);
  useEffect(() => {
    if (isEditEnable) {
      getQuoteCustomerDropdown();
    }
  }, [isEditEnable, quoteCardDetails]);
  useEffect(() => {
    if (permissionObject.Edit) {
      getQuoteTypes();
    }
  }, [permissionObject, quoteCardDetails]);
  useEffect(() => {
    if (isEditEnable) {
      quoteTaxableStatus();
    }
  }, [isEditEnable, quoteCardDetails]);
  useEffect(() => {
    if (isEditEnable) {
      quotePayTerms();
    }
  }, [isEditEnable, quoteCardDetails]);
  useEffect(() => {
    if (isEditEnable) {
      getFobList();
    }
  }, [isEditEnable]);

  const updateQuoteData = (info: any) => {
    delete quoteCardDetails.status;
    delete quoteDetails.status;
    const newObj = {
      start_date: quoteDetails.start_date
        ? moment(quoteDetails.start_date, "MM-DD-YYYY").format("YYYY-MM-DD")
        : "",
    };
    const params = {
      ...quoteDetails,
      ...newObj,
      ...info,
      po_requote_numer: selectedQuoteData.PoRequoteNumber,
    };
    const apiObject = {
      payload: params,
      method: "PUT",
      apiUrl: `${EndpointUrl.Quote}/${quoteDetails.id}?quote_id=${quoteDetails.id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          setSnackbar(true);
          sendEvent({
            success: true,
            quoteDetails: {
              ...quoteCardDetails,
              ...newObj,
            },
            section: "quotes_info",
          });
          history.push(`/${data.redirect_route}${data.id}`);
        }
      })
      .catch(() => {});
  };
  const saveQuoteData = (data?: any) => {
    updateQuoteData(data);
  };

  // const resetData = () => {
  //  sendEvent({
  //    success: false,
  //    quoteDetails: {
  //      ...quoteCardDetails,
  //    },
  //    section: 'quotes_info',
  //  })
  //  setEditModeOff()
  // }

  // const setEditModeOff = () => {
  //  setRfQEdit(false)
  //  setPayTermsEditEdit(false)
  //  setTaxableEdit(false)
  //  setQuoteTypeEdit(false)
  //  setPoReQuoteEdit(false)
  //  setshowPoNumberField(false)
  //  setEditQuoteRequestBy(false)
  //  setEditQuotedBy(false)
  //  setFobEdit(false)
  // }
  const onRFQDateChanged = (e: any) => {
    // quoteCardDetails.rfq_recieved_date = e
    // setQuoteCardDetails({ ...quoteCardDetails })
    selectedQuoteData.rfqDate = e;
    setSelectedQuoteData({ ...selectedQuoteData });
  };

  const onChangePoQuote = (e: any) => {
    if (e.value === "no") {
      setshowPoNumberField(false);
    } else {
      setshowPoNumberField(true);
    }
  };
  const onChangePoNumber = (e: any) => {
    setSelectedQuoteData({
      ...selectedQuoteData,
      PoRequoteNumber: e.target.value,
    });
    // const updatedQuoteData = { ...selectedQuoteData };
    // updatedQuoteData.PoRequoteNumber = e.target.value;
    // setSelectedQuoteData(updatedQuoteData);

    // selectedQuoteData.PoRequoteNumber = e.target.value;
    // setSelectedQuoteData(selectedQuoteData);
  };
  const selectNowRfqDate = () => {
    const start = moment(moment().utc());
    const remainder = 15 - (start.minute() % 15);

    const dateTime = moment(start).add(remainder, "minutes").utc();

    // console.log(dateTime);
    // console.log(moment(dateTime).format());
    //    console.log(moment().format())
    selectedQuoteData.rfqDate = moment(dateTime).toISOString();
    setSelectedQuoteData({ ...selectedQuoteData });
  };
  const saveDateAndTime = () => {
    if (selectedQuoteData.rfqDate) {
      setConFirm(false);
      setConfirmText("");
      saveQuoteData({ rfq_recieved_date: selectedQuoteData.rfqDate });
    } else {
      setConfirmHeader("");
      setConfirmText("Please select RFQ Received Date and Time ");
      setConFirm(true);
    }
  };
  const triggerEvent = (e: any) => {
    if (e.close) {
      setOpenAddContact(false);
      // setEditQuoteRequestBy(false)
      selectedQuoteData.quoteReqBy = quoteCardDetails.quote_requested_by;
      setSelectedQuoteData({ ...selectedQuoteData });
    }
    if (e.success) {
      setToastMsg("Contact Created Successfully");
      selectedQuoteData.quoteReqBy = e.data;
      setSelectedQuoteData({ ...selectedQuoteData });
      setOpenAddContact(false);
      saveQuoteData({
        quote_requested_by: selectedQuoteData.quoteReqBy,
      });
      setEditQuoteRequestBy(false);
    }
  };

  function FormatCreateLabel(e: any) {
    setSearchedName(e);
    return (
      <div
        className="Button-Icon-Display"
        onClick={() => setOpenAddContact(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            setOpenAddContact(true);
          }
        }}
        role="button"
        tabIndex={0}
      >
        <LinkWithIcon className="Icon-space primary-button in-dropdown">
          <ImgTag src={AddLogo} alt="loading" className="add-icon" />
          <span className="button-icon-text">Create Contact</span>
        </LinkWithIcon>
      </div>
    );
  }
  return (
    <div style={{ display: "contents" }}>
      {quoteCardDetails && (
        <>
          <RepairInfoSection id="repair-info-id">
            <div className="rep-label-typo">
              <PiTypography component="h4">Quote Information</PiTypography>
            </div>
            {/* <hr /> */}
            <div
              className="field-details"
              // style={{ borderBottom: "1px solid var(--greyCardBorder)" }}
            >
              <UserRoleField
                className={
                  getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"
                }
              >
                <PiLabelName
                  description={QuoteStatusAppearance(quoteStatus)}
                  label="Status"
                />
              </UserRoleField>
              <UserRoleField
                className={
                  getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"
                }
              >
                {quoteTypeEdit === false && (
                  <>
                    <PiLabelName
                      description={
                        quoteCardDetails && quoteCardDetails.quote_type.label
                          ? quoteCardDetails.quote_type.label
                          : "-"
                      }
                      label="Quote Type"
                      isEditIcon={isEditEnable}
                      emitSave={() => {
                        setQuoteTypeEdit(true);
                      }}
                    />
                    {/* {permissionObject['Edit'] &&
                      quoteCardDetails.status_code === 'open' && (
                        <img
                          src={ThemecolorEdit}
                          className="edit-icon"
                          alt="loading"
                          onClick={() => {
                            setQuoteTypeEdit(true)
                          }}
                        />
                      )} */}
                  </>
                )}
                {quoteTypeEdit && (
                  <PiSelect
                    name="quote_type"
                    label="Quote Type"
                    placeholder="Select"
                    // onChange={changeRequestedBy}
                    onChange={(e: any) => {
                      selectedQuoteData.quoteType = e;
                      setSelectedQuoteData({ ...selectedQuoteData });
                    }}
                    options={quoteTypes}
                    value={selectedQuoteData.quoteType}
                    isIcons
                    emitSave={() => {
                      setQuoteTypeEdit(false);
                      saveQuoteData({
                        quote_type: selectedQuoteData.quoteType,
                      });
                    }}
                    emitUndo={() => {
                      setQuoteTypeEdit(false);
                      selectedQuoteData.quoteType = quoteCardDetails.quote_type;
                      setSelectedQuoteData({ ...selectedQuoteData });
                    }}
                  />
                )}
              </UserRoleField>
              {getUserLoggedPermission() && !quoteDetails.is_repair && (
                <UserRoleField
                  className={
                    getUserLoggedPermission()
                      ? "calc-width-33"
                      : "calc-width-25"
                  }
                >
                  {rfQEdit === false && (
                    <div className="pilabel-star">
                      <PiLabelName
                        description={
                          selectedQuoteData && selectedQuoteData.rfqDate
                            ? moment(selectedQuoteData.rfqDate).format(
                                "MM-DD-YYYY     h:mm A"
                              )
                            : "-"
                        }
                        label="RFQ Received Date"
                        isEditIcon={isEditEnable}
                        emitSave={() => {
                          setRfQEdit(true);
                        }}
                        isMandatory
                      />
                    </div>
                  )}
                  {rfQEdit && (
                    <QuoteInfoDatePicker className="dt-time-pkr-bg-unset">
                      <div
                        style={{
                          display: "flex",
                          position: "relative",
                          paddingTop: "1px",
                        }}
                      >
                        <PiDateTimePicker
                          dateFormat="MM/DD/YYYY"
                          helpText=""
                          libraryType="atalskit"
                          label="RFQ Received Date"
                          // minDate={TodayDate}
                          timeFormat="hh:mm a"
                          appearance="standard"
                          name="datePicker"
                          placeholder="MM/DD/YYYY"
                          onChange={onRFQDateChanged}
                          value={selectedQuoteData.rfqDate}
                          times={RFQTimeList}
                          isIcons
                          emitSave={() => {
                            setRfQEdit(false);
                            saveDateAndTime();
                          }}
                          emitUndo={() => {
                            setRfQEdit(false);
                            selectedQuoteData.rfqDate =
                              quoteCardDetails.rfq_recieved_date;
                            setSelectedQuoteData({ ...selectedQuoteData });
                          }}
                          datePickerProps={{
                            placeholder: "MM-DD-YYYY",
                          }}
                          timePickerProps={{
                            placeholder: "00:00",
                          }}
                          isMandatory
                        />
                        <PiButton
                          appearance="secondary"
                          label="Now"
                          className="now-btn"
                          onClick={selectNowRfqDate}
                        />
                      </div>
                    </QuoteInfoDatePicker>
                  )}
                </UserRoleField>
              )}
              {getUserLoggedPermission() && (
                <UserRoleField
                  className={
                    getUserLoggedPermission()
                      ? "calc-width-33"
                      : "calc-width-25"
                  }
                >
                  <PiLabelName
                    description={
                      quoteCardDetails && quoteCardDetails.start_date
                        ? quoteCardDetails.start_date
                        : "-"
                    }
                    label="Quote Start Date"
                  />
                </UserRoleField>
              )}
              <UserRoleField
                className={
                  getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"
                }
              >
                {!editProjectName && (
                  <PiLabelName
                    description={
                      quoteCardDetails && quoteCardDetails.project_name
                        ? quoteCardDetails.project_name
                        : "-"
                    }
                    label="Project Name"
                    isEditIcon={isEditEnable}
                    emitSave={() => {
                      setEditProjectName(true);
                    }}
                  />
                )}
                {editProjectName && (
                  <div style={{ paddingTop: "1px" }}>
                    <PiInput
                      name="project_name"
                      label="Project Name"
                      placeholder="Project Name"
                      onChange={(e: any) => {
                        selectedQuoteData.ProjectName = e.target.value;
                        setSelectedQuoteData({ ...selectedQuoteData });
                      }}
                      value={selectedQuoteData.ProjectName}
                      isIcons
                      emitSave={() => {
                        setEditProjectName(false);
                        saveQuoteData({
                          project_name: selectedQuoteData.ProjectName,
                        });
                      }}
                      emitUndo={() => {
                        setEditProjectName(false);
                        selectedQuoteData.project_name =
                          quoteCardDetails.project_name;
                        setSelectedQuoteData({ ...selectedQuoteData });
                      }}
                    />
                  </div>
                )}
              </UserRoleField>
              <UserRoleField
                className={
                  getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"
                }
              >
                <PiLabelName
                  description={
                    quoteCardDetails && quoteCardDetails.account_number
                      ? quoteCardDetails.account_number
                      : "-"
                  }
                  label="Account Number"
                />
              </UserRoleField>
              <UserRoleField
                className={
                  getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"
                }
              >
                {!editQuoteRequestBy && (
                  <div className="pilabel-star">
                    <PiLabelName
                      description={
                        selectedQuoteData && selectedQuoteData.quoteReqBy
                          ? selectedQuoteData.quoteReqBy.label
                          : "-"
                      }
                      label="Quote Requested By"
                      isEditIcon={isEditEnable}
                      emitSave={() => {
                        setEditQuoteRequestBy(true);
                      }}
                      isMandatory
                    />
                  </div>
                )}
                {editQuoteRequestBy && (
                  <PiCreateSelect
                    name="quote_requested_by"
                    label="Quote Requested By"
                    placeholder="Select"
                    // onChange={changeRequestedBy}
                    onChange={(e: any) => {
                      // eslint-disable-next-line no-underscore-dangle
                      if (e.value === "new" || e.__isNew__) {
                        setOpenAddContact(true);
                      } else {
                        selectedQuoteData.quoteReqBy = e;
                        setSelectedQuoteData({ ...selectedQuoteData });
                      }
                    }}
                    options={quoteCustomerList}
                    value={selectedQuoteData.quoteReqBy}
                    isIcons
                    emitSave={() => {
                      setEditQuoteRequestBy(false);
                      saveQuoteData({
                        quote_requested_by: selectedQuoteData.quoteReqBy,
                      });
                    }}
                    emitUndo={() => {
                      setEditQuoteRequestBy(false);
                      selectedQuoteData.quoteReqBy =
                        quoteCardDetails.quote_requested_by;
                      setSelectedQuoteData({ ...selectedQuoteData });
                    }}
                    isMandatory
                    isLoading={customerListLoader}
                    formatCreateLabel={(e: any) => FormatCreateLabel(e)}
                    isValidNewOption={() => true}
                  />
                )}
              </UserRoleField>
              {!editQuotedBy && (
                <UserNameField
                  className={
                    getUserLoggedPermission()
                      ? "calc-width-33"
                      : "calc-width-25"
                  }
                >
                  <AvatorDropdown>
                    <p>Quoted By</p>
                    <div
                      onClick={() => {
                        setEditQuotedBy(true);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          setEditQuotedBy(true);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      {permissionObject.Edit &&
                        quoteCardDetails.status_code === "open" &&
                        quoteCardDetails.is_revised === false &&
                        getUserLoggedPermission() && (
                          <img
                            src={ThemecolorEdit}
                            className="edit-icon"
                            alt="loading"
                          />
                        )}
                    </div>
                  </AvatorDropdown>
                  <AvatarSection>
                    <img
                      style={{ borderRadius: "50%" }}
                      src={
                        selectedQuoteData.quotedBy &&
                        selectedQuoteData.quotedBy.image_url
                          ? selectedQuoteData.quotedBy.image_url
                          : Avatar
                      }
                      alt="loading"
                    />
                    <p className="user-name">
                      {selectedQuoteData && selectedQuoteData.quotedBy
                        ? selectedQuoteData.quotedBy.label
                        : "-"}
                    </p>
                  </AvatarSection>
                </UserNameField>
              )}

              {editQuotedBy && (
                <UserRoleField
                  className={
                    getUserLoggedPermission()
                      ? "calc-width-33"
                      : "calc-width-25"
                  }
                >
                  <PiSelect
                    name="quoted_by"
                    label="Quoted By"
                    placeholder="Select"
                    // onChange={changeQuotedBy}
                    onChange={(e: any) => {
                      // selectedQuoteData.fob = e
                      // setSelectedQuoteData({ ...selectedQuoteData })
                      if (e) {
                        const obj: any = {
                          value: e.value,
                          label: e.name,
                          ...e,
                        };
                        selectedQuoteData.quotedBy = obj;
                        setSelectedQuoteData({ ...selectedQuoteData });
                      } else {
                        selectedQuoteData.quotedBy = e;
                        setSelectedQuoteData({ ...selectedQuoteData });
                      }
                    }}
                    options={quotedByList}
                    defaultValue={selectedQuoteData.quotedBy}
                    isIcons
                    emitSave={() => {
                      setEditQuotedBy(false);
                      saveQuoteData({ quoted_by: selectedQuoteData.quotedBy });
                    }}
                    emitUndo={() => {
                      setEditQuotedBy(false);
                      selectedQuoteData.quotedBy = quoteCardDetails.quoted_by;
                      setSelectedQuoteData({ ...selectedQuoteData });
                    }}
                  />
                </UserRoleField>
              )}

              <UserNameField
                className={
                  getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"
                }
                style={{ padding: "18px 0px" }}
              >
                <AvatorDropdown>
                  <p>Waiting On</p>
                </AvatorDropdown>
                <AvatarSection>
                  {quoteCardDetails &&
                    quoteCardDetails.waiting_on &&
                    quoteCardDetails.waiting_on.label && (
                      <img
                        src={
                          quoteCardDetails.waiting_on &&
                          quoteCardDetails.waiting_on.image_url
                            ? quoteCardDetails.waiting_on.image_url
                            : Avatar
                        }
                        alt="loading"
                      />
                    )}
                  <p className="user-name">
                    {quoteCardDetails && quoteCardDetails.waiting_on
                      ? quoteCardDetails.waiting_on.label
                      : "-"}
                  </p>
                </AvatarSection>
              </UserNameField>
              <UserNameField
                className={
                  getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"
                }
                style={{ padding: "18px 0px" }}
              >
                <p>Owner Name</p>
                <AvatarSection>
                  <img
                    src={
                      quoteCardDetails.owner_img_url
                        ? quoteCardDetails.owner_img_url
                        : Avatar
                    }
                    alt="loading"
                  />
                  <p className="user-name">
                    {quoteCardDetails ? quoteCardDetails.owner_name : "-"}
                  </p>
                </AvatarSection>
              </UserNameField>
              <UserRoleField
                className={
                  getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"
                }
              >
                <PiLabelName
                  description={
                    quoteCardDetails && quoteCardDetails.phone_number
                      ? quoteCardDetails.phone_number
                      : "-"
                  }
                  label="Phone Number"
                />
              </UserRoleField>
              <UserRoleField
                className={
                  getUserLoggedPermission()
                    ? "quote-address calc-width-33"
                    : "quote-address calc-width-25"
                }
              >
                <PiAddress
                  data={{
                    address2: quoteCardDetails
                      ? quoteCardDetails.customer_address1
                      : "-",
                    city: quoteCardDetails
                      ? quoteCardDetails.customer_city
                      : "-",
                    state: quoteCardDetails
                      ? quoteCardDetails.customer_state
                      : "-",
                    zip: quoteCardDetails
                      ? quoteCardDetails.customer_postal_code
                      : "-",
                  }}
                  label="Customer Address"
                />
              </UserRoleField>
            </div>
          </RepairInfoSection>

          <RepairInfoSection id="repair-info-id">
            <div className="rep-label-typo">
              <PiTypography component="h4">Customer Information</PiTypography>
            </div>
            <div className="field-details">
              <UserRoleField
                className={
                  getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"
                }
              >
                {!isFobEdit && (
                  <PiLabelName
                    description={
                      selectedQuoteData.fob ? selectedQuoteData.fob.label : "-"
                    }
                    label="F.O.B"
                    isEditIcon={isEditEnable}
                    emitSave={() => {
                      setFobEdit(true);
                    }}
                  />
                )}
                {isFobEdit && (
                  <PiSelect
                    name="fob_id"
                    label="F.O.B"
                    placeholder="Select"
                    onChange={(e: any) => {
                      selectedQuoteData.fob = e;
                      setSelectedQuoteData({ ...selectedQuoteData });
                    }}
                    options={fobList}
                    value={selectedQuoteData.fob}
                    isIcons
                    emitSave={() => {
                      setFobEdit(false);
                      saveQuoteData({ fob_id: selectedQuoteData.fob });
                    }}
                    emitUndo={() => {
                      setFobEdit(false);
                      selectedQuoteData.fob = quoteCardDetails.fob_id;
                      setSelectedQuoteData({ ...selectedQuoteData });
                    }}
                  />
                )}
              </UserRoleField>
              <UserRoleField
                className={
                  getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"
                }
              >
                {!payTermsEdit && (
                  <PiLabelName
                    description={
                      selectedQuoteData.Payterms &&
                      selectedQuoteData.Payterms.label
                        ? selectedQuoteData.Payterms.label
                        : "-"
                    }
                    label="Pay Terms"
                    isEditIcon={isEditEnable}
                    emitSave={() => {
                      setPayTermsEditEdit(true);
                    }}
                  />
                )}
                {payTermsEdit && (
                  <PiSelect
                    name="payterms"
                    label="Pay Terms"
                    placeholder="Select"
                    onChange={(e: any) => {
                      selectedQuoteData.Payterms = e;
                      setSelectedQuoteData({ ...selectedQuoteData });
                    }}
                    options={payTerms}
                    value={selectedQuoteData.Payterms}
                    isIcons
                    emitSave={() => {
                      setPayTermsEditEdit(false);
                      saveQuoteData({ payterms: selectedQuoteData.Payterms });
                    }}
                    emitUndo={() => {
                      setPayTermsEditEdit(false);
                      selectedQuoteData.Payterms = quoteCardDetails.payterms;
                      setSelectedQuoteData({ ...selectedQuoteData });
                    }}
                  />
                )}
              </UserRoleField>

              <UserRoleField
                className={
                  getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"
                }
              >
                {!taxableEdit && (
                  <PiLabelName
                    description={
                      selectedQuoteData.TaxableStatus.label
                        ? QuoteStatusAppearance(
                            selectedQuoteData.TaxableStatus.label
                          )
                        : "-"
                    }
                    label="Taxable Status"
                    isEditIcon={isEditEnable}
                    emitSave={() => {
                      setTaxableEdit(true);
                    }}
                  />
                )}
                {taxableEdit && (
                  <PiSelect
                    name="taxable_status"
                    label="Taxable Status"
                    placeholder="Select"
                    onChange={(e: any) => {
                      selectedQuoteData.TaxableStatus = e;
                      setSelectedQuoteData({ ...selectedQuoteData });
                    }}
                    options={taxableStatus}
                    value={selectedQuoteData.TaxableStatus}
                    isIcons
                    emitSave={() => {
                      setTaxableEdit(false);
                      saveQuoteData({
                        taxable_status: selectedQuoteData.TaxableStatus,
                      });
                    }}
                    emitUndo={() => {
                      setTaxableEdit(false);
                      selectedQuoteData.TaxableStatus =
                        quoteCardDetails.taxable_status;
                      setSelectedQuoteData({ ...selectedQuoteData });
                    }}
                  />
                )}
              </UserRoleField>
              {/* {quoteDetails.is_repair && ( */}

              {!quoteDetails.is_repair && (
                <UserRoleField
                  className={
                    getUserLoggedPermission()
                      ? "calc-width-33"
                      : "calc-width-25"
                  }
                >
                  {!ispoReQuoteEdit && (
                    <PiLabelName
                      description={
                        selectedQuoteData.PoRequote
                          ? selectedQuoteData.PoRequote.label
                          : "-"
                      }
                      label="PO Requote"
                      isEditIcon={isEditEnable}
                      emitSave={() => {
                        setPoReQuoteEdit(true);
                        if (selectedQuoteData.PoRequote.value === "yes") {
                          setshowPoNumberField(true);
                        } else {
                          setshowPoNumberField(false);
                        }
                      }}
                    />
                  )}
                  {ispoReQuoteEdit && (
                    <PiSelect
                      name="is_po_requote"
                      label="PO Requote"
                      placeholder="Select"
                      onChange={(e: any) => {
                        onChangePoQuote(e);
                        selectedQuoteData.PoRequote = e;
                        setSelectedQuoteData({ ...selectedQuoteData });
                      }}
                      options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                      ]}
                      value={selectedQuoteData.PoRequote}
                      isIcons
                      emitSave={() => {
                        setPoReQuoteEdit(false);
                        setshowPoNumberField(false);
                        if (selectedQuoteData.PoRequote.value === "no") {
                          selectedQuoteData.PoRequoteNumber = null;
                          setSelectedQuoteData(selectedQuoteData);
                        }
                        saveQuoteData({
                          is_po_requote: selectedQuoteData.PoRequote,
                        });
                      }}
                      emitUndo={() => {
                        setPoReQuoteEdit(false);
                        setshowPoNumberField(false);
                        selectedQuoteData.PoRequote =
                          quoteCardDetails.is_po_requote;
                        selectedQuoteData.PoRequoteNumber =
                          quoteCardDetails.po_requote_numer;
                        setSelectedQuoteData({ ...selectedQuoteData });
                      }}
                    />
                  )}
                </UserRoleField>
              )}
              {selectedQuoteData.PoRequote &&
                !quoteDetails.is_repair &&
                selectedQuoteData.PoRequote.value === "yes" &&
                !showPoNumberField && (
                  <UserRoleField
                    className={
                      getUserLoggedPermission()
                        ? "calc-width-33"
                        : "calc-width-25"
                    }
                  >
                    <PiLabelName
                      description={
                        selectedQuoteData.PoRequoteNumber
                          ? selectedQuoteData.PoRequoteNumber
                          : "-"
                      }
                      label="PO Requote Number"
                    />
                  </UserRoleField>
                )}

              {showPoNumberField && (
                <UserRoleField
                  className={
                    getUserLoggedPermission()
                      ? "calc-width-33"
                      : "calc-width-25"
                  }
                  style={{ position: "relative", top: "7px" }}
                >
                  <PiInput
                    name="is_po_requote"
                    label="PO Requote Number"
                    placeholder="PO Requote Number"
                    onChange={onChangePoNumber}
                    value={selectedQuoteData.PoRequoteNumber}
                    maxLength={15}
                  />
                </UserRoleField>
              )}
              <UserRoleField
                className={
                  getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"
                }
              >
                <PiLabelName
                  description={
                    quoteCardDetails && quoteCardDetails.credit_on_hold
                      ? quoteCardDetails.credit_on_hold
                      : "-"
                  }
                  label="Credit On Hold"
                />
              </UserRoleField>
              <UserRoleField
                className={
                  getUserLoggedPermission() ? "calc-width-33" : "calc-width-25"
                }
              >
                <PiLabelName
                  description={
                    quoteCardDetails && quoteCardDetails.credit_limit
                      ? quoteCardDetails.credit_limit
                      : "-"
                  }
                  label="Credit Limit"
                />
              </UserRoleField>
              {/* )} */}
            </div>
            {/* {showSavePanel && (
            <PermissionFooter>
              <PiButton
                appearance="secondary"
                label={'Cancel'}
                onClick={resetData}
              />
              <PiButton
                appearance="primary"
                label={'Save'}
                onClick={saveQuoteData}
              />
            </PermissionFooter>
          )} */}
          </RepairInfoSection>

          <PiConfirmModel
            className={piconfirmClass}
            headerLabel={confirmHeader}
            message={confirmText}
            primaryBtnLabel="OK"
            onClose={() => {
              setConFirm(false);
              setConfirmHeader("Confirmation");
            }}
            onAccept={() => {
              setConFirm(false);
            }}
          />
          <PiToast
            className={openSnackbar ? "show" : ""}
            headerLabel={toastMsg}
            message=""
            onClose={async () => {
              setSnackbar(false);
              setToastMsg("Updated Successfully");
            }}
          />
          {openAddContact && (
            <QuotesAddContact
              searchedName={searchedName}
              quoteDetails={quoteDetails}
              sendModelEvent={triggerEvent}
            />
          )}
        </>
      )}
    </div>
  );
}
